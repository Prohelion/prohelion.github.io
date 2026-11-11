---
title: Prepare Profinity for an MCP client
description: "Turn on the Profinity MCP server, create a service account token, choose an address, and check that the server answers before you connect an AI tool."
type: task
owner: Documentation
last_reviewed: 2026-11-11
---

# Prepare Profinity for an MCP client

Prepare a Profinity instance once so that Claude Code, Cursor, or Codex can read its live data through the Model Context Protocol (MCP) server.
You turn the server on, create a token for the tool to sign in with, choose the address the tool uses, and check that the server answers.

You need:

- An edition with the **AI** licensed feature, which the Server and Enterprise editions include. Refer to [Licensing](../../Licensing.md).
- The **System administration** permission, to turn the server on.
- The **Security administration** permission and the **Profinity Server** licensed feature, to create the service account in **Users & Groups**. Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

!!! warning "Turning on the MCP server restarts Profinity"
    Saving the setting restarts Profinity, and the instance is unavailable to everyone until it is running again.
    Choose a time when a restart does not interrupt the people using it.

## Enable the MCP server

1. In the side menu, select **ADMIN**, then **System Configuration**.
2. Open the **Profinity AI** category and find the **MCP server** group.
3. Turn on **Enable MCP server**.
4. Select **Save**. The web interface shows "Restarting, please wait..." while Profinity restarts.

When the settings load again, **Enable MCP server** shows as on, and the server is ready.
Turning on **Enable Profinity AI** turns the server on too, because Profinity AI uses it, through [AI Chat](../../Profinity_AI/AI_Chat.md) and [AI technicians](../../Profinity_AI/AI_Technicians/index.md), so the server is already on when Profinity AI is in use.
The server can also run on its own, with Profinity AI off, when only an external tool needs it.
For the other settings in the group, refer to [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md).

## Create a service account token

The AI tool sends a token with every call.
A [service account](../../Administration/Users_and_Access/Service_Accounts.md) holds a token that does not expire, so the tool stays connected.
Give the account a role with the **MCP integration**, **View tags**, and **View alerts** permissions.
The **Administrators** role has all three, and a role with only these three is enough for a tool that reads data.

1. In the side menu, select **ADMIN**, then **Users & Groups**.
2. Select **+ Add user**.
3. Enter a name, such as `mcp-service`.
4. Turn on **Service account**.
5. Under **Assigned roles**, choose the role.
6. Select **ADD USER**.
7. Select the new user's row, open the **User Actions** tab, and select **Generate Token**. The dialog shows the token once.
8. Copy the token into a password manager or secrets store.

Selecting **Generate Token** again replaces the token at once, and every tool that holds the old token stops connecting until you give it the new one.

## Store the token in an environment variable

Cursor and Codex read the token from an environment variable named `PROFINITY_TOKEN` each time they start, and Claude Code reads it once, when you add the server.
An app sees only the variables set before it started, so set the variable for your whole sign-in session, as each tab shows.
In each command, replace `<token>` with the service account token.

=== "macOS"

    Run this command so that apps opened from the Dock or Finder see the variable:

    ```bash
    launchctl setenv PROFINITY_TOKEN "<token>"
    ```

    The variable lasts until the computer restarts, so run the command again after a restart, before you open the AI tool.
    For tools you start from Terminal, also add this line to `~/.zprofile`, then open a new Terminal window:

    ```bash
    export PROFINITY_TOKEN="<token>"
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    setx PROFINITY_TOKEN "<token>"
    ```

    Windows saves the variable for your user account.
    Apps and PowerShell windows that you open after the command see it.

=== "Linux"

    Add this line to `~/.profile`, then sign out and sign in again:

    ```bash
    export PROFINITY_TOKEN="<token>"
    ```

After you generate a new token, set the variable again and restart Cursor or Codex.
Claude Code keeps its own copy of the token, so remove its server and add it again, as described in [Connect Claude Code to Profinity](Connect_Claude_Code.md#add-the-server).

## Choose the MCP server address

The MCP address is the Profinity web address with `/api/v2/Ai/Mcp` on the end.
The default ports are 18080 for HTTP and 18443 for HTTPS, set on the **Web** tab described in [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).

=== "Same computer as Profinity"

    When **Redirect all HTTP traffic to HTTPS** is off, use the HTTP address, which needs no certificate:

    ```text
    http://localhost:18080/api/v2/Ai/Mcp
    ```

    When the redirect is on, use `https://localhost:18443/api/v2/Ai/Mcp`, and trust the certificate as described after these tabs.

=== "Another computer"

    A tool on another computer can connect once a Server licence is applied, because until then Profinity listens only on `127.0.0.1`.
    Open the HTTPS port through any firewall between the two computers, then use the HTTPS address:

    ```text
    https://<host>:18443/api/v2/Ai/Mcp
    ```

    Replace `<host>` with the host name or network address of the computer that runs Profinity.
    It must be one of the names listed in [The certificate Profinity generates](Trust_HTTPS_Certificate.md#the-certificate-profinity-generates).

For an HTTPS address, [trust the HTTPS certificate](Trust_HTTPS_Certificate.md) on the computer that runs the AI tool before you check the server.
When Profinity runs on another computer, that page also describes how to copy `profinity_generated.pfx` from its `certificates` folder.

## Check the server answers

Run the check from the computer that runs the AI tool, with the command for your operating system.
The server answers only `POST` requests, so a browser, which sends `GET`, gets `404` from a working server.

=== "macOS"

    For the HTTP address, run:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d "{}" http://localhost:18080/api/v2/Ai/Mcp
    ```

    For an HTTPS address, run this command after you trust the certificate.
    It uses `/usr/bin/curl`, which checks the certificates in the keychain:

    ```bash
    /usr/bin/curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d "{}" https://<host>:18443/api/v2/Ai/Mcp
    ```

=== "Linux"

    For the HTTP address, run:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d "{}" http://localhost:18080/api/v2/Ai/Mcp
    ```

    For an HTTPS address, run this command after you trust the certificate:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d "{}" https://<host>:18443/api/v2/Ai/Mcp
    ```

=== "Windows"

    For the HTTP address, run this command in PowerShell:

    ```powershell
    curl.exe -s -o NUL -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d "{}" http://localhost:18080/api/v2/Ai/Mcp
    ```

    For an HTTPS address, run this command after you trust the certificate.
    Windows checks it against the certificates the operating system trusts:

    ```powershell
    curl.exe -s -o NUL -w "%{http_code}\n" -X POST -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d "{}" https://<host>:18443/api/v2/Ai/Mcp
    ```

In an HTTPS command, replace `<host>` with the host name from your address.
The command sends an empty MCP request with no token, and prints `401`, which means the server is running and is waiting for the token that the AI tool sends.

| What you see | Cause | What to do |
|---|---|---|
| A certificate error | The host name in the address is not one of the certificate names, or the computer does not trust the certificate. | Use a host name from [The certificate Profinity generates](Trust_HTTPS_Certificate.md#the-certificate-profinity-generates), and follow [Fix a certificate error](Trust_HTTPS_Certificate.md#fix-a-certificate-error). |
| `404` | **Enable MCP server** is off, so Profinity has no MCP address. | Turn on **Enable MCP server**, as described in [Enable the MCP server](#enable-the-mcp-server). For the other causes, refer to [MCP connection errors](Connection_Errors.md). |

Next, connect your tool:

- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
- [Connect Cursor to Profinity](Connect_Cursor.md)
