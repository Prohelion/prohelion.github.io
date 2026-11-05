---
title: Trust the HTTPS certificate
description: "Export the certificate Profinity generates and trust it on macOS, Windows, or Linux, so Cursor, Claude Code, or Codex accepts an HTTPS MCP address."
type: task
owner: Documentation
last_reviewed: 2026-11-05
---

# Trust the HTTPS certificate

Export the certificate Profinity generates and trust it on the computer that runs your AI tool, so the tool accepts an `https://` Model Context Protocol (MCP) address.
Skip this page when you use the HTTP address on the same computer as Profinity.

Accepting the certificate warning in a browser trusts the certificate in that browser only.
Another application, such as an AI tool, needs the certificate trusted in the operating system, or given to it as a file.
The guides for [Claude Code](Connect_Claude_Code.md), [Codex](Connect_Codex.md), and [Cursor](Connect_Cursor.md) give the steps for each tool.
Claude Code on an npm install older than Node.js 22.15 needs an extra step: refer to [Connect Claude Code to Profinity](Connect_Claude_Code.md#trust-the-certificate).

## Before you begin

You need:

- An HTTPS address for the MCP server, from [Choose the MCP server address](Prepare_Profinity.md#choose-the-mcp-server-address).
- A licence that includes Profinity AI, because the MCP server is part of that licensed feature.
  Refer to [Licensing](../../Licensing.md#features-by-edition).
- Access to the computer that runs the AI tool, where you follow every step on this page.
- When Profinity runs on another computer, a copy of `profinity_generated.pfx` from its `certificates` folder, made with a method you trust, such as a USB drive or `scp`.
- Administrator rights (`sudo`) for step 2 when the AI tool runs on Linux.

## The certificate Profinity generates

When [**Cert File**](../../Administration/System_Configuration/Profinity_Web.md#https-certificates) and **Windows Cert Store** are empty, Profinity creates its own certificate the first time HTTPS starts.
The certificate file is `profinity_generated.pfx` in the `certificates` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), and it has no password.
Profinity also creates this file in place of a **Cert File** that is missing, cannot be read, or has a wrong password.
When you set **Cert File** and find `profinity_generated.pfx` in the folder, check **Cert File** and **Cert File Password**.

The certificate names `localhost`, the computer's host name, `127.0.0.1`, `::1`, and the address of each network interface that was up when Profinity created it.
The host in the MCP address has to be one of these names.
An address with any other name gets a certificate error, even when the operating system trusts the certificate.

The default `certificates` folder depends on how Profinity is installed:

| System | Default `certificates` folder |
|--------|-------------------------------|
| macOS | `$HOME/Library/Application Support/Prohelion/Profinity/certificates` |
| Linux | `/var/lib/prohelion/profinity/certificates` |
| Windows desktop | `%LOCALAPPDATA%\Prohelion\Profinity\certificates` |
| Windows service | `certificates` in the artefacts directory of the account the service runs under, as described in [Run Profinity as a Windows service](../../Installation/Run_as_a_Service/Run_as_a_Windows_Service.md) |
| Docker, with the published compose file | `$HOME/Prohelion/certificates` on the host, which is `/app/Prohelion/certificates` in the container |
| Docker, with the one-line installer | `$HOME/profinity-docker/data/certificates`, or `data/certificates` in the folder you gave with `--dir` |

When `PROFINITY_HOME` is set, the folder is `certificates` under that path instead, as described in [Artefacts directory](../../Installation/Artifacts_Directory.md).
To set up a certificate you supply yourself, refer to [HTTPS certificates](../../Administration/System_Configuration/Profinity_Web.md#https-certificates).

## Export and trust the certificate

!!! warning "The file holds a private key with no password"
    Anyone who has a copy of `profinity_generated.pfx` can impersonate the Profinity server.
    If you copied the file from another computer, delete the copy after the export in step 1.

These steps use the certificate Profinity generates.
For a certificate you supplied, export it as described in [Export a certificate you supplied](#export-a-certificate-you-supplied), then continue from step 2.

Follow these steps on the computer that runs the AI tool:

1. Export the public certificate for your operating system.

    === "macOS or Linux"

        Run this command in a terminal:

        ```bash
        openssl pkcs12 -in "<certificates-folder>/profinity_generated.pfx" -nokeys -clcerts -passin pass: | openssl x509 -out "$HOME/profinity.pem"
        ```

        The command writes only the public certificate to `profinity.pem` in your home folder.
        When the file is readable only by the account that runs Profinity, as on a Linux service, put `sudo` before the first `openssl`.

    === "Windows"

        Run these commands in PowerShell:

        ```powershell
        $certificate = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new("<certificates-folder>\profinity_generated.pfx")
        Export-Certificate -Cert $certificate -FilePath "$env:USERPROFILE\Desktop\profinity.cer"
        ```

        PowerShell lists `profinity.cer` on the desktop, which holds the public certificate only.

    Replace `<certificates-folder>` with the folder in [The certificate Profinity generates](#the-certificate-profinity-generates), or with the folder that holds your copy of the file.
    On macOS, write `$HOME`, as the table does, because `~` does not expand inside quotes.
    On Windows, write `%LOCALAPPDATA%` as `$env:LOCALAPPDATA`, the form PowerShell expands.
    If you copied `profinity_generated.pfx` from another computer, delete the copy now.

2. Trust the exported certificate in the operating system.

    === "macOS"

        1. Double-click `profinity.pem` in your home folder.
           Keychain Access opens, and adds the certificate to the login keychain.
           If it asks for a keychain, select **login**.
        2. In Keychain Access, double-click the certificate named Profinity.
           The certificate window opens.
        3. Expand **Trust**, and set **When using this certificate** to **Always Trust**.
        4. Close the certificate window.
           macOS asks for your password.
        5. Enter your password, and select **Update Settings**.
           The certificate shows "This certificate is marked as trusted for this account".

        To trust the certificate from a terminal instead, run this command, and enter your password when macOS asks for it:

        ```bash
        security add-trusted-cert -r trustRoot -k ~/Library/Keychains/login.keychain-db "$HOME/profinity.pem"
        ```

        To limit the trust to HTTPS connections, add `-p ssl` before `-k`.

    === "Windows"

        1. Double-click `profinity.cer` on the desktop, and select **Install Certificate**.
           The Certificate Import Wizard opens.
        2. Select **Current User**, then select **Next**.
        3. Select **Place all certificates in the following store**, then select **Browse**.
        4. Select **Trusted Root Certification Authorities**, then select **OK**.
        5. Select **Next**, then select **Finish**.
           Windows shows a security warning that asks whether to install the certificate.
        6. Select **Yes**.
           Windows reports that the import was successful.

        To trust the certificate from PowerShell instead, run this command, and select **Yes** at the same security warning:

        ```powershell
        Import-Certificate -FilePath "$env:USERPROFILE\Desktop\profinity.cer" -CertStoreLocation Cert:\CurrentUser\Root
        ```

    === "Debian or Ubuntu"

        1. Copy the certificate into the trusted certificates folder:

            ```bash
            sudo cp "$HOME/profinity.pem" /usr/local/share/ca-certificates/profinity.crt
            ```

            The command prints nothing when the copy succeeds.

        2. Update the trusted certificates:

            ```bash
            sudo update-ca-certificates
            ```

            The command reports `1 added`.

    === "Fedora, RHEL, or CentOS"

        1. Copy the certificate into the trusted certificates folder:

            ```bash
            sudo cp "$HOME/profinity.pem" /etc/pki/ca-trust/source/anchors/profinity.pem
            ```

            The command prints nothing when the copy succeeds.

        2. Update the trusted certificates:

            ```bash
            sudo update-ca-trust
            ```

            The command prints nothing when the update succeeds.

    === "Arch Linux"

        Add the certificate to the trusted certificates:

        ```bash
        sudo trust anchor --store "$HOME/profinity.pem"
        ```

        The command prints nothing when it succeeds.

    === "openSUSE or SLES"

        On openSUSE or SUSE Linux Enterprise Server (SLES):

        1. Copy the certificate into the trusted certificates folder:

            ```bash
            sudo cp "$HOME/profinity.pem" /etc/pki/trust/anchors/
            ```

            The command prints nothing when the copy succeeds.

        2. Update the trusted certificates:

            ```bash
            sudo update-ca-certificates
            ```

            The command prints nothing when the update succeeds.

3. If the AI tool is open, quit it.
   Start it again so that it uses the trusted certificate.

## Export a certificate you supplied

When **Cert File** names your own certificate in a `.pfx` or `.p12` file with a **Cert File Password**, export the public certificate from that file in place of step 1.
Then follow steps 2 and 3 of [Export and trust the certificate](#export-and-trust-the-certificate).

=== "macOS or Linux"

    Run this command in a terminal:

    ```bash
    openssl pkcs12 -in "<path-to-your-certificate-file>" -nokeys -clcerts -passin pass:<password> | openssl x509 -out "$HOME/profinity.pem"
    ```

    Replace `<password>` with the **Cert File Password**.
    The command writes only the public certificate to `profinity.pem` in your home folder.

=== "Windows"

    Run these commands in PowerShell, and enter the **Cert File Password** when PowerShell asks for it:

    ```powershell
    $certificate = Get-PfxCertificate -FilePath "<path-to-your-certificate-file>" -Password (Read-Host -AsSecureString "Certificate file password")
    Export-Certificate -Cert $certificate -FilePath "$env:USERPROFILE\Desktop\profinity.cer"
    ```

    PowerShell lists `profinity.cer` on the desktop, which holds the public certificate only.

Replace `<path-to-your-certificate-file>` with the full path of the file that **Cert File** names.

## Check it worked

From the computer that runs the AI tool, run the HTTPS command in [Check the server answers](Prepare_Profinity.md#check-the-server-answers).
The command prints `401` and no certificate error.
A 401 means the server answered and wants a token, so the certificate was accepted.

## Fix a certificate error

| What you see | Cause | What to do |
|--------------|-------|------------|
| The AI tool still reports a certificate error after step 2 | The tool was open when the operating system began to trust the certificate | Quit the tool, start it again, and repeat the check in [Check it worked](#check-it-worked) |
| The check still reports a certificate error after step 2 | The certificate is in a store other than **Trusted Root Certification Authorities** on Windows, or its trust is left at the default on macOS | Repeat step 2, and choose the store or the trust setting the step names |
| You selected **No** at the Windows security warning, or cancelled the macOS password request | The operating system did not add the certificate | Repeat step 2, and confirm the request |
| The certificate error names a different host name or address | The address uses a name missing from the certificate, or the certificate was created before the host name or address changed | Use a name from [The certificate Profinity generates](#the-certificate-profinity-generates), or [create a new certificate](#create-a-new-certificate-after-a-host-name-or-address-changes) |
| The certificate error says that no name matches, even for `localhost` | The certificate came from an older installation and names no host | [Create a new certificate](#create-a-new-certificate-after-a-host-name-or-address-changes) |
| The `openssl` command prints an error, or `profinity.pem` is empty | The path is wrong, or the file has a password | Check the folder against the table in [The certificate Profinity generates](#the-certificate-profinity-generates), and for a file with a password use the command in [Export a certificate you supplied](#export-a-certificate-you-supplied) |
| PowerShell reports an error when it opens the file | The path is wrong, or the file has a password | Check the path, write `%LOCALAPPDATA%` as `$env:LOCALAPPDATA`, and for a file with a password use the commands in [Export a certificate you supplied](#export-a-certificate-you-supplied) |

For other errors, refer to [MCP connection errors](Connection_Errors.md).

## Create a new certificate after a host name or address changes

Profinity creates the certificate once and keeps it, so a new host name or network address is missing from it until you create a new certificate.
The certificate is valid for five years, so note its expiry date and create a new one before then.
On Linux, `openssl x509 -in "$HOME/profinity.pem" -noout -enddate` prints the date, and on macOS and Windows the certificate details show it.

Stop and start Profinity in the way that suits your installation:

| Installation | Stop and start |
|--------------|----------------|
| Windows desktop | Shut down the application, and start it from the Start menu, as described in [Install Profinity on Windows](../../Installation/Windows_Installation.md#install-profinity) |
| Windows service | Stop and start the service as you stop and start any other service on Windows. Refer to [Run Profinity as a Windows service](../../Installation/Run_as_a_Service/Run_as_a_Windows_Service.md) |
| Linux service | Run `sudo systemctl stop profinity.service`, and start it with `sudo systemctl start profinity.service`. Refer to [Run Profinity as a Linux service](../../Installation/Run_as_a_Service/Run_as_a_Linux_Service.md#start-the-service) |
| macOS service | Stop and start the service as you stop and start any other service on macOS. Refer to [Run Profinity as a macOS service](../../Installation/Run_as_a_Service/Run_as_a_macOS_Service.md) |
| Docker | Run `docker compose stop` and `docker compose start` in the folder that holds the compose file. Refer to [Start and stop Profinity](../../Installation/Docker/index.md#start-and-stop-profinity) |

Profinity creates a new certificate when the file is missing.
To keep the old certificate, copy it in step 2, before you delete it:

1. Stop Profinity.
2. Optional: copy `profinity_generated.pfx` from the `certificates` folder to another folder.
3. Delete `profinity_generated.pfx` from the `certificates` folder.
4. Start Profinity.
   Profinity creates a new `profinity_generated.pfx`, with a new key, for the host name and addresses it finds as HTTPS starts.
5. On the computer that runs the AI tool, repeat steps 1 to 3 of [Export and trust the certificate](#export-and-trust-the-certificate).
   When two certificates named Profinity are listed, choose the one with the later expiry date, which is the new one.
   The check in [Check it worked](#check-it-worked) prints `401` with the new address.

Once the new certificate is trusted, you can remove the old one, which has the earlier expiry date, from the operating system.

Next, connect your tool:

- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
- [Connect Cursor to Profinity](Connect_Cursor.md)
