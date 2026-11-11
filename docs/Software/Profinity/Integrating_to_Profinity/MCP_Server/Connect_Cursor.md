---
title: Connect Cursor to Profinity
description: "Add the Profinity MCP server to Cursor, trust its HTTPS certificate, and confirm that Cursor can read live components."
type: task
owner: Documentation
last_reviewed: 2026-11-05
---

# Connect Cursor to Profinity

Connect Cursor on your computer to the Profinity Model Context Protocol (MCP) server so that Cursor can read live components, tags, and alerts.
Before you start, finish [Prepare Profinity for an MCP client](Prepare_Profinity.md), including [storing the token in an environment variable](Prepare_Profinity.md#store-the-token-in-an-environment-variable).
You need the MCP address you chose on that page.

## Add the server

Cursor reads MCP servers from `~/.cursor/mcp.json` for every project, or from `.cursor/mcp.json` in one project.
Use the file in your home directory, so that the server is available in every project and stays out of source control.
On Windows, that file is `%USERPROFILE%\.cursor\mcp.json`.

1. Open `~/.cursor/mcp.json`, or create it when it is not there.
2. Add the `profinity` entry. When the file already lists other servers, add the entry inside the existing `"mcpServers"` object:

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

3. Replace the address with the one you chose in [Choose the MCP server address](Prepare_Profinity.md#choose-the-mcp-server-address).
4. Save the file.
5. Quit Cursor completely, and open it again.

Cursor fills in `${env:PROFINITY_TOKEN}` from the environment it started in, so the token itself is not stored in the file.
Do not type the token into a project's `.cursor/mcp.json`, because everyone who can read the project can then read the token.

## Trust the certificate

Skip this section for an `http://` address.
For an `https://` address, trust the exported certificate in the operating system, as described in [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md), then quit Cursor and open it again.

If Cursor still rejects a certificate that the operating system trusts, see Cursor's own documentation.
The host in the address has to be one of the certificate names in [The certificate Profinity generates](Trust_HTTPS_Certificate.md#the-certificate-profinity-generates).

## Confirm Cursor can read data

1. In Cursor, check that `profinity` is listed as an enabled MCP server.
2. Ask Cursor: "What components are in my active profile?"

A list of component names confirms the connection.
When the list is shorter than you expect, refer to [Fewer results than expected](Connection_Errors.md#fewer-results-than-expected).

## Fix a failed connection

Open Cursor's MCP logs (refer to Cursor's documentation for where they are), and match the log to a row in this table:

| What you see | Cause | What to do |
|--------------|-------|------------|
| The log names a certificate, a self-signed issuer, or a host name mismatch | Cursor treats the certificate as untrusted, or the address is missing from it | Trust the certificate, use a name that is on it, or use the HTTP address on the same computer. Then quit Cursor completely and open it again |
| The log shows 401, or the header still contains `${env:PROFINITY_TOKEN}` | Cursor did not receive the token | Set `PROFINITY_TOKEN` for your login session, then quit Cursor and open it again |
| `profinity` is missing from **Customize** | The file is invalid JSON, or Cursor was last opened before the file was saved | Correct the file, then quit Cursor and open it again |

For a 403 or another response, refer to [MCP connection errors](Connection_Errors.md).
When Cursor can read the instance, install [AI Skills](../../Profinity_AI/AI_Skills/Install_AI_Skills.md) so that Cursor can build dashboards, rules, and other configuration from that data.
