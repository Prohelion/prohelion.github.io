---
title: Trust the HTTPS certificate
description: "Export the certificate Profinity generates and trust it in macOS, Windows, or Linux so Cursor, Claude Code, and Codex accept an HTTPS MCP address."
type: task
owner: Documentation
last_reviewed: 2026-10-29
---

# Trust the HTTPS certificate

Export the public certificate that Profinity generates and trust it in the operating system, so an AI tool accepts an `https://` Model Context Protocol (MCP) address.
Skip this page when you use the HTTP address on the same computer as Profinity.
You need an [HTTPS address](Prepare_Profinity.md#choose-the-mcp-server-address) and access to the computer that runs the AI tool.

When **Cert File** and the Windows certificate store fields are empty, Profinity creates its own certificate the first time HTTPS starts.
The certificate file is `profinity_generated.pfx` in the `certificates` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md).
It has no password.
It names `localhost`, the computer's host name, and the network addresses on the computer at the time it was created.

Accepting the certificate warning in a browser trusts it for that browser only.
Cursor, Claude Code, and Codex do not use that browser decision.
Trust the exported public certificate in the operating system, or give Claude Code the exported file, as the guide for that tool describes.

Follow these steps on the computer that runs the AI tool:

1. Export the public certificate for your operating system.

    === "macOS or Linux"

        Export the public certificate from the generated file:

        ```bash
        openssl pkcs12 -in "<certificates-folder>/profinity_generated.pfx" -nokeys -clcerts -passin pass: | openssl x509 -out "$HOME/profinity.pem"
        ```

        Replace `<certificates-folder>` with the `certificates` folder of the artefacts directory.
        On macOS that folder is `~/Library/Application Support/Prohelion/Profinity/certificates`.
        On Linux it is `/var/lib/prohelion/profinity/certificates`.
        The command writes `profinity.pem` in your home directory.
        `-passin pass:` supplies the empty password of the generated file.
        When you selected your own certificate and set **Cert File Password**, use that password in place of the empty value.

    === "Windows"

        Export the public certificate in PowerShell.
        This writes `profinity.cer` to the desktop and does not copy the private key:

        ```powershell
        $certificate = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new("$env:LOCALAPPDATA\Prohelion\Profinity\certificates\profinity_generated.pfx")
        Export-Certificate -Cert $certificate -FilePath "$env:USERPROFILE\Desktop\profinity.cer"
        ```

2. Trust the exported file in the operating system before you connect a tool over HTTPS.

    === "macOS"

        Double-click `profinity.pem`, and add it to the login keychain.
        Open the certificate named Profinity, and set **When using this certificate** to **Always Trust**.

    === "Windows"

        Double-click `profinity.cer`, and select **Install Certificate**.
        Place it in **Trusted Root Certification Authorities** for the current user.

    === "Debian or Ubuntu"

        Copy `profinity.pem` to `/usr/local/share/ca-certificates/profinity.crt`, and run `update-ca-certificates`.
        Another Linux distribution uses its own trusted-certificate command.

Quit and reopen the AI tool after the operating system trusts the certificate.
To confirm the trust, [check that the server answers](Prepare_Profinity.md#check-the-server-answers): a response without a certificate error shows it worked.

After the host name or a network address changes, stop Profinity, delete `profinity_generated.pfx`, and start Profinity again so it creates a certificate for the new names.
Trust that new certificate again.
For a certificate you supply yourself, refer to [HTTPS certificates](../../Administration/System_Configuration/Profinity_Web.md#https-certificates).
