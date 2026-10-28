---
title: Connect Cursor to Profinity
description: "Add the Profinity MCP server to Cursor, trust its HTTPS certificate, and confirm that Cursor can read live components."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Connect Cursor to Profinity

Connect Cursor on your computer to the Profinity Model Context Protocol (MCP) server so Cursor can read live components, tags, and alerts.
Finish [Prepare Profinity for an MCP client](Prepare_Profinity.md) first.
You need the MCP address and the service account token from those pages.
Install [AI Skills](../../Profinity_AI/Install_AI_Skills.md) when you also want Cursor to build dashboards, rules, collections, scripts, plugins, derived tags, or example apps.

Cursor has no setting that turns certificate checking off.
When the address starts with `https://`, Cursor has to trust the Profinity certificate.
Accepting the warning in a browser does not do that.
On the same computer, with **Redirect all Http traffic to Https** off, use the HTTP address from the prepare page and skip the certificate steps.

## Add the server

Cursor reads MCP servers from `~/.cursor/mcp.json` for every project, or from `.cursor/mcp.json` in one project.
Use the file in your home directory so the token is not stored in a project that other people can read.
On Windows, that file is `%USERPROFILE%\.cursor\mcp.json`.

1. Open the MCP file. Create it when it is not there, with `"mcpServers"` as the top-level object.
2. Add the `profinity` entry. When other servers are already in the file, add this entry inside the existing `"mcpServers"` object.
3. Replace the address with the HTTP or HTTPS address from the prepare page.
4. Save the file and quit Cursor completely, then open it again.

```json
{
  "mcpServers": {
    "profinity": {
      "url": "https://localhost:18443/api/v2/Ai/Mcp",
      "headers": {
        "Authorization": "Bearer ${env:PROFINITY_TOKEN}"
      }
    }
  }
}
```

Set `PROFINITY_TOKEN` to the service account token in the environment that starts Cursor.
A copy of Cursor opened from the Dock or the Start menu does not see a variable that you exported in a terminal afterwards.
Set the variable for the login session, or start Cursor from a terminal where it is already set.

Keep a project `.cursor/mcp.json` free of the token.
The `${env:PROFINITY_TOKEN}` form is safe to store in a project.
A token typed directly into the file belongs only in the home-directory file, and that file stays out of source control.

## Trust the certificate

Skip this section when the address is `http://localhost:18080/api/v2/Ai/Mcp`.
For an `https://` address, export `profinity.pem` or `profinity.cer` and trust it in the operating system, as described in [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md).
Then quit Cursor and open it again.

On Windows, Cursor 3.19 and later uses the operating system certificate stores for MCP connections, including an enterprise certificate authority.
Update Cursor when a certificate that the operating system already trusts is still rejected.
The address has to use a host name or network address that is on the certificate.
`localhost` is on the certificate Profinity generates.
A name that was added after the certificate was created is not, until you generate the certificate again.

## Confirm Cursor can read data

1. In Cursor, open **Customize** and confirm that `profinity` is enabled.
2. Ask Cursor: "What components are in my active profile?"
3. Cursor calls `get_all_components`. A list of component names confirms the connection.

An empty list means the active profile has no components, or the service account lacks **View tags**.
Tag values and alerts use the same connection.
Refer to the [MCP tool reference](Tool_Reference.md) for the other tools.

## Fix a failed connection

Open the Output panel with Cmd+Shift+U or Ctrl+Shift+U, and select **MCP Logs**.
Match the log to one of these causes:

- The log names a certificate, a self-signed issuer, or a host name mismatch. Trust the exported certificate, use a host name that is on the certificate, or switch to the HTTP address on the same computer. Quit Cursor completely after changing the trust or the file.
- The log shows 401, or the header still contains `${env:PROFINITY_TOKEN}`. Cursor did not receive the token. Set `PROFINITY_TOKEN` where Cursor starts, or put the token in the home-directory file and reopen Cursor.
- The log shows 403 or another HTTP response. Refer to [MCP connection errors](Connection_Errors.md).
- The server is missing from **Customize**. The MCP file is not valid JSON, or Cursor was not reopened after the file was saved.

A connection that succeeds but returns no tags is covered in [MCP connection errors](Connection_Errors.md).
When Cursor can read the instance, continue with [AI Skills](../../Profinity_AI/AI_Skills.md) to build configuration from that data.
