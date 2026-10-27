---
title: Prepare Profinity for an MCP client
description: "Turn on the Profinity MCP server, create a service account token, and choose an address the AI tool can reach."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Prepare Profinity for an MCP client

Prepare one Profinity instance so Claude Code, Cursor, or Codex can connect to its Model Context Protocol (MCP) server.
You need the **AI** licensed feature, which the **Server** and **Enterprise** editions include, and the **System administration** permission to change the setting.
Refer to [Licensing](../../Licensing.md) and [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
ChatGPT does not use this connection. Refer to [Connect ChatGPT to Profinity](Connect_ChatGPT.md).

## Enable the MCP server

The server stays off until an administrator enables it.
Enabling Profinity AI also enables the server, because [AI Chat](../../Profinity_AI/AI_Chat.md) depends on it.
You can enable the server on its own and leave Profinity AI off when only an external tool needs it.

1. Select **ADMIN** in the side menu, then **System Configuration**.
2. Open the **Profinity AI** category and find the **MCP Server** field group.
3. Switch on **Enable MCP Server**.
4. Select **Save**.

Saving restarts Profinity.
The web interface shows "Restarting, please wait..." and loads the settings again when the engine is running.
The server is not available during that restart.

On an edition without the **AI** feature, **Enable MCP Server** is not shown.
Refer to [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md).

## Create a service account token

Every MCP call needs a bearer token for an account that has **MCP integration**.
Tag tools also need **View tags**, and alert tools also need **View alerts**.
The **Administrators** role includes these permissions.
A dedicated role with only those permissions is enough for a tool that reads data and does not change the instance.

Use a [service account](../../Administration/Users_and_Access/Service_Accounts.md) so the token does not expire while the tool is open.
Creating the account needs **Users & Groups**, which needs the Server licence.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select **Add user**.
3. Enter a name, such as `mcp-service`, and switch on **Service Account**.
4. Under **Assigned roles**, select a role that includes **MCP integration**, **View tags**, and **View alerts**, then save the user.
5. Select the user's row, open the **User Actions** tab, and select **Generate Token**.
6. Copy the token into a secrets manager.

The token is shown once in that dialog.
**Generate Token** replaces any previous token immediately, and every tool that still has the old token stops connecting until you update it.
Refer to [Service accounts](../../Administration/Users_and_Access/Service_Accounts.md).

## Choose the server address

The MCP address is the Profinity web address with `/api/v2/Ai/Mcp` on the end.
Take the ports from the **Web** tab.
The defaults are `18080` for HTTP and `18443` for HTTPS.
Refer to [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).

Use HTTP when the AI tool runs on the same computer as Profinity and **Redirect all Http traffic to Https** is off:

```text
http://localhost:18080/api/v2/Ai/Mcp
```

This address does not use a certificate.
Use it for Cursor, Claude Code, or Codex on that computer when you want to avoid certificate setup.

Use HTTPS when the tool runs on another computer, or when HTTP is redirected to HTTPS:

```text
https://localhost:18443/api/v2/Ai/Mcp
```

Replace `localhost` with the computer's host name or network address when the tool is on another computer.
That host name or address has to be one of the names on the certificate.
The web server port has to be reachable from the tool, including through any firewall.

Without a Server licence, Profinity listens only on `127.0.0.1`, so a tool on another computer cannot connect.
Refer to [Licensing](../../Licensing.md).

## Export the HTTPS certificate

When **Cert File** and the Windows certificate store fields are empty, Profinity creates its own certificate the first time HTTPS starts.
The certificate file is `profinity_generated.pfx` in the `certificates` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md).
It has no password.
It names `localhost`, the computer's host name, and the network addresses on the computer at the time it was created.

Accepting the certificate warning in a browser trusts it for that browser only.
Cursor, Claude Code, and Codex do not use that browser decision.
Trust the exported public certificate in the operating system, or give Claude Code the exported file, as the guide for that tool describes.

On macOS or Linux, export the public certificate from the generated file:

```bash
openssl pkcs12 -in "<certificates-folder>/profinity_generated.pfx" -nokeys -clcerts -passin pass: | openssl x509 -out "$HOME/profinity.pem"
```

Replace `<certificates-folder>` with the `certificates` folder of the artefacts directory.
On macOS that folder is `~/Library/Application Support/Prohelion/Profinity/certificates`.
On Linux it is `/var/lib/prohelion/profinity/certificates`.
The command writes `profinity.pem` in your home directory.
`-passin pass:` supplies the empty password of the generated file.
When you selected your own certificate and set **Cert File Password**, use that password in place of the empty value.

On Windows, export the public certificate in PowerShell.
This writes `profinity.cer` to the desktop and does not copy the private key:

```powershell
$certificate = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new("$env:LOCALAPPDATA\Prohelion\Profinity\certificates\profinity_generated.pfx")
Export-Certificate -Cert $certificate -FilePath "$env:USERPROFILE\Desktop\profinity.cer"
```

Trust that exported file in the operating system before you connect a tool over HTTPS.

1. On macOS, double-click `profinity.pem`, add it to the login keychain, open the certificate named Profinity, and set **When using this certificate** to **Always Trust**.
2. On Windows, double-click `profinity.cer`, select **Install Certificate**, and place it in **Trusted Root Certification Authorities** for the current user.
3. On Debian or Ubuntu, copy `profinity.pem` to `/usr/local/share/ca-certificates/profinity.crt` and run `update-ca-certificates`. Another Linux distribution uses its own trusted-certificate command.

Quit and reopen the AI tool after the operating system trusts the certificate.
After the host name or a network address changes, stop Profinity, delete `profinity_generated.pfx`, and start Profinity again so it creates a certificate for the new names.
Trust that new certificate again.
For a certificate you supply yourself, refer to [HTTPS certificates](../../Administration/System_Configuration/Profinity_Web.md#https-certificates).

## Check the server from the command line

A browser request is not an MCP request, so opening the address in a browser does not show whether the server is available.
From the computer that runs the AI tool, request the address with the MCP accept header.

For the HTTP address:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -H "Accept: application/json, text/event-stream" http://localhost:18080/api/v2/Ai/Mcp
```

For the HTTPS address, point `--cacert` at the exported certificate:

```bash
curl -s -o /dev/null -w "%{http_code}\n" --cacert "$HOME/profinity.pem" -H "Accept: application/json, text/event-stream" https://localhost:18443/api/v2/Ai/Mcp
```

A response of `401` means the server is running and the request has no token yet.
A certificate error means the host name is not on the certificate, or the exported certificate was not used.
Continue with the guide for your tool and repeat the question there: "What components are in my active profile?"

## When the connection fails

| Response | Cause | What to do |
|----------|-------|------------|
| Certificate error | The tool does not trust the certificate, or the address is not a name on it | Trust the exported certificate, or use the HTTP address on the same computer |
| 401 | The token is missing, incomplete, or expired | Paste the service account token again |
| 403 | The account lacks **MCP integration** | Add that permission to one of the account's roles |
| 404 | The server is unavailable, or the request is not an MCP request | Use the causes under this table |
| 429 with `Too many MCP requests. Please try again later.` | The account sent too many MCP requests | Wait, then retry |

A 404 has these causes:

- **Enable MCP Server** is off.
- The **AI** feature is not licensed.
- Profinity has not finished restarting since the setting was saved.
- The request has no `Accept: application/json, text/event-stream` header. A browser request fails in this way. The AI tool sends the header itself.

A tool that connects but returns no tags or alerts is working.
The account lacks **View tags** or **View alerts**, or the active profile has no matching data.
A component or collection restricted to other roles is also left out.
Refer to [Component and collection security](../../Administration/Users_and_Access/Component_And_Collection_Security.md).

Next, connect the tool:

- [Connect Cursor to Profinity](Connect_Cursor.md)
- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
