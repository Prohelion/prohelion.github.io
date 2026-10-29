---
title: Prepare Profinity for an MCP client
description: "Turn on the Profinity MCP server, create a service account token, choose an address, and check that the server answers before you connect an AI tool."
type: task
owner: Documentation
last_reviewed: 2026-10-29
---

# Prepare Profinity for an MCP client

Prepare a Profinity instance once so that Claude Code, Cursor, or Codex can read its live data through the Model Context Protocol (MCP) server.
You switch the server on, create a token for the tool to sign in with, choose the address the tool uses, and check that the server answers.
You need the **System administration** permission, the **AI** licensed feature, which the **Server** and **Enterprise** editions include, and **Users & Groups**, which needs a Server licence.
Refer to [Licensing](../../Licensing.md) and [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

!!! warning "Enabling the MCP server restarts Profinity"
    Saving the setting restarts Profinity, and the instance is unavailable to everyone until it is running again.
    Choose a time when a restart does not interrupt the people using it.

## Enable the MCP server

The server stays off until an administrator enables it.
Enabling Profinity AI also enables the server, because [AI Chat](../../Profinity_AI/AI_Chat.md) depends on it.
You can enable the server on its own and leave Profinity AI off when only an external tool needs it.

1. In the side menu, select **ADMIN > System Configuration**.
2. Open the **Profinity AI** category, and find the **MCP Server** field group.
3. Switch on **Enable MCP Server**.
4. Select **Save**. Profinity restarts, and the web interface shows "Restarting, please wait..." until the engine is running again.

When the settings load again, **Enable MCP Server** shows as on, and the server is ready.
On an edition without the **AI** feature, **Enable MCP Server** is not shown.
For the other settings in this group, refer to [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md).

## Create a service account token

The AI tool sends a token with every call.
Use a [service account](../../Administration/Users_and_Access/Service_Accounts.md), so the token does not expire while the tool is open.
The account needs a role with **MCP integration**, **View tags**, and **View alerts**.
The **Administrators** role includes all three, and a dedicated role with only these permissions is enough for a tool that reads data.

1. In the side menu, select **ADMIN > Users & Groups**.
2. Select **Add user**.
3. Enter a name, such as `mcp-service`, and switch on **Service Account**.
4. Under **Assigned roles**, select the role, then save the user.
5. Select the user's row, open the **User Actions** tab, and select **Generate Token**. The dialog shows the token once.
6. Copy the token into a password manager or secrets store.

Selecting **Generate Token** again replaces the token straight away.
Every tool that holds the old token stops connecting until you give it the new one.

## Store the token in an environment variable

Cursor and Codex read the token from an environment variable named `PROFINITY_TOKEN` each time they start, and Claude Code reads it once, when you add the server.
An app sees only the variables that were set before it started, so set the variable for your login session, not only in one terminal.

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

    The variable is saved for your user account.
    Apps and PowerShell windows opened after the command see it, and windows that were already open do not.

=== "Linux"

    Add this line to `~/.profile`, then sign out and sign in again:

    ```bash
    export PROFINITY_TOKEN="<token>"
    ```

Replace `<token>` with the service account token.
After you generate a new token, set the variable again and restart the AI tool.

## Choose the MCP server address

The MCP address is the Profinity web address with `/api/v2/Ai/Mcp` on the end.
The ports are on the **Web** tab, and the defaults are 18080 for HTTP and 18443 for HTTPS.
Refer to [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).

=== "Same computer as Profinity"

    Use the HTTP address when **Redirect all Http traffic to Https** is off:

    ```text
    http://localhost:18080/api/v2/Ai/Mcp
    ```

    This address needs no certificate.
    When the redirect is on, use `https://localhost:18443/api/v2/Ai/Mcp`, and trust the certificate.

=== "Another computer"

    Use the HTTPS address:

    ```text
    https://<host>:18443/api/v2/Ai/Mcp
    ```

    Replace `<host>` with the host name or network address of the computer that runs Profinity.
    It has to be one of the names on the certificate, and the port has to be open through any firewall between the two computers.
    Without a Server licence, Profinity listens only on `127.0.0.1`, so a tool on another computer cannot connect.

For an HTTPS address, [trust the HTTPS certificate](Trust_HTTPS_Certificate.md) on the computer that runs the AI tool before you continue.

## Check the server answers

Run the check from the computer that runs the AI tool.
Opening the address in a browser does not test the server, so use the command for your operating system and address.

=== "macOS or Linux"

    For the HTTP address, run:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" -H "Accept: application/json, text/event-stream" http://localhost:18080/api/v2/Ai/Mcp
    ```

    For the HTTPS address, run this command with the certificate you exported:

    ```bash
    curl -s -o /dev/null -w "%{http_code}\n" --cacert "$HOME/profinity.pem" -H "Accept: application/json, text/event-stream" https://<host>:18443/api/v2/Ai/Mcp
    ```

=== "Windows"

    Run this command in PowerShell, with the HTTP or HTTPS address:

    ```powershell
    curl.exe -s -o NUL -w "%{http_code}\n" -H "Accept: application/json, text/event-stream" https://<host>:18443/api/v2/Ai/Mcp
    ```

    Windows checks an HTTPS address against the certificates the operating system trusts.

Replace `<host>` with the host name from your address.
The expected output is:

```text
401
```

A `401` means the server is running and is waiting for a token, which the AI tool sends.
A certificate error means the host name is not on the certificate, or the certificate is not trusted.
For any other response, refer to [MCP connection errors](Connection_Errors.md).

Next, connect your tool:

- [Connect Claude Code to Profinity](Connect_Claude_Code.md)
- [Connect Codex to Profinity](Connect_Codex.md)
- [Connect Cursor to Profinity](Connect_Cursor.md)
