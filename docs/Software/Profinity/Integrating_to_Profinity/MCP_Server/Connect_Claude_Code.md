---
title: Connect Claude Code to Profinity
description: "Add the Profinity MCP server to Claude Code, trust its HTTPS certificate, and confirm Claude Code can read live components."
type: task
owner: Documentation
last_reviewed: 2026-11-05
---

# Connect Claude Code to Profinity

Connect Claude Code on your computer to the Profinity Model Context Protocol (MCP) server so that Claude Code can read live components, tags, and alerts.
Before you start, finish [Prepare Profinity for an MCP client](Prepare_Profinity.md), including [storing the token in an environment variable](Prepare_Profinity.md#store-the-token-in-an-environment-variable).
You need the MCP address you chose on that page.

## Add the server

Quit Claude Code before you add the server, so that it loads the new configuration when it starts.
In a terminal where `PROFINITY_TOKEN` is set, run the command for your operating system:

=== "macOS or Linux"

    ```bash
    claude mcp add --transport http --scope user profinity https://localhost:18443/api/v2/Ai/Mcp --header "Authorization: Bearer $PROFINITY_TOKEN"
    ```

=== "Windows"

    ```powershell
    claude mcp add --transport http --scope user profinity https://localhost:18443/api/v2/Ai/Mcp --header "Authorization: Bearer $env:PROFINITY_TOKEN"
    ```

Replace the address with the one you chose in [Choose the MCP server address](Prepare_Profinity.md#choose-the-mcp-server-address).
The command prints `Added ...` when the configuration is saved.

Unlike Cursor and Codex, Claude Code saves a copy of the token in its own configuration when you add the server.
After you generate a new token, remove the server with `claude mcp remove profinity --scope user`, then run the add command again.
Running the add command a second time without removing the server reports that `profinity` already exists.

## Trust the certificate

Skip this section for an `http://` address.
For an `https://` address, export the public certificate and trust it in the operating system, as described in [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md).

As of November 2026, Claude Code trusts the bundled Mozilla certificates and the operating system's certificate store; an npm install needs Node.js 22.15 or later for the operating system store, and an older Node.js uses only the bundled set plus `NODE_EXTRA_CA_CERTS`.
Refer to [Claude Code network configuration](https://code.claude.com/docs/en/network-config) for the current behaviour.
For the native install, and an npm install on Node.js 22.15 or later, trusting the exported certificate in the operating system is enough.

For an older Node.js on macOS or Linux, set `NODE_EXTRA_CA_CERTS` to the path of the exported certificate file before Claude Code starts.
Run this command, then start Claude Code from the same terminal:

```bash
export NODE_EXTRA_CA_CERTS="$HOME/profinity.pem"
```

The path is where the export command wrote `profinity.pem`.
A copy of Claude Code that is already running keeps the certificates it started with, so quit it and start it again from that terminal.
The address has to use a name on the certificate, as listed in [The certificate Profinity generates](Trust_HTTPS_Certificate.md#the-certificate-profinity-generates).

## Confirm Claude Code can read data

1. In Claude Code, run `/mcp`, and confirm that `profinity` shows a successful connection.
2. Ask: "What components are in my active profile?"

Claude Code calls `get_all_components`, and a list of component names confirms the connection.
To see the saved address and the connection status from a terminal, run `claude mcp get profinity`.
When the list is shorter than you expect, refer to [Fewer results than expected](Connection_Errors.md#fewer-results-than-expected).

## Fix a failed connection

Run `/mcp`, read the status beside `profinity`, and match it to a row in this table:

| What you see | Cause | What to do |
|--------------|-------|------------|
| A certificate or handshake error | Claude Code treats the certificate as untrusted, or the address is missing from it | Trust the certificate in the operating system, or set `NODE_EXTRA_CA_CERTS`, then start Claude Code from that terminal |
| A 401 response | The saved token is missing, incomplete, or replaced | Remove the server, then add it again with the current token |
| `profinity` is missing | The add command did not save, or Claude Code runs under another user account | Run `claude mcp get profinity`, and add the server again |

For a 403 or another response, refer to [MCP connection errors](Connection_Errors.md).
When Claude Code can read the instance, install [AI Skills](../../Profinity_AI/AI_Skills/Install_AI_Skills.md) so that Claude Code can build dashboards, rules, and other configuration from that data.
