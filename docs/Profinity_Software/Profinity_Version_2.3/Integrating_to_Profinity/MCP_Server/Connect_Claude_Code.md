---
title: Connect Claude Code to Profinity
description: "Add the Profinity MCP server to Claude Code, trust its HTTPS certificate, and confirm Claude Code can read live components."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Connect Claude Code to Profinity

Connect Claude Code on your computer to the Profinity Model Context Protocol (MCP) server so Claude Code can read live components, tags, and alerts.
Finish [Prepare Profinity for an MCP client](Prepare_Profinity.md) first.
You need the MCP address and the service account token from that page.
Install [AI Skills](../../Profinity_AI/Install_AI_Skills.md) when you also want Claude Code to build dashboards, rules, collections, scripts, plugins, derived tags, or example apps.

On the same computer, with **Redirect all Http traffic to Https** off, use the HTTP address and skip the certificate steps.
An `https://` address needs the exported Profinity certificate.
Claude Code does not provide a setting that turns certificate checking off.

## Add the server

Quit Claude Code before you add the server, so the new configuration is the one it loads.

In a terminal, add the server for your user.
Replace the address with the HTTP or HTTPS address from the prepare page, and replace `<token>` with the service account token.

```bash
claude mcp add --transport http --scope user profinity https://localhost:18443/api/v2/Ai/Mcp --header "Authorization: Bearer <token>"
```

The command prints `Added ...` when the configuration is saved.
It stores the token in your Claude Code configuration, and the shell keeps the command in its history.
Use the service account token, and protect the computer where Claude Code runs.
Run the command again only after removing the existing server. A second add with the same name reports that `profinity` already exists.

## Trust the certificate

Skip this section when the address is HTTP on the same computer.
For HTTPS, export the public certificate with the command in [Prepare Profinity for an MCP client](Prepare_Profinity.md#export-the-https-certificate).

Claude Code trusts the operating system certificate store when it is the native install, or when an npm install is running on Node.js 22.15 or later.
Trusting the exported certificate in the operating system is then enough.
On an older Node.js, only Claude Code's built-in authorities and `NODE_EXTRA_CA_CERTS` are used.

This command makes the current terminal trust the exported file.
Use the path you wrote `profinity.pem` to:

```bash
export NODE_EXTRA_CA_CERTS="$HOME/profinity.pem"
```

Start Claude Code from that same terminal.
A copy that is already running keeps the certificate list it started with.
Quit it, export the variable, and start Claude Code again from that terminal.
The address has to use a host name that is on the certificate. `localhost` is on the generated certificate.

## Confirm Claude Code can read data

1. In Claude Code, run `/mcp`.
2. Confirm that `profinity` shows a successful connection.
3. Ask: "What components are in my active profile?"

Claude Code calls `get_all_components`.
A list of component names confirms the connection.
You can also run `claude mcp get profinity` in a terminal for the saved address and the connection status.
An empty list means the active profile has no components, or the service account lacks **View tags**.

## Fix a failed connection

Run `/mcp` and read the status beside `profinity`.

- A certificate or handshake error means `NODE_EXTRA_CA_CERTS` is unset in the terminal that started Claude Code, or the address uses a name that is not on the certificate. Export the variable, or trust the certificate in the operating system, then start Claude Code from that terminal.
- A 401 means the token in the header is incomplete or is no longer the current service account token. Add the server again with the current token.
- A 403 means the account lacks **MCP integration**.
- `profinity` is missing. The add command did not save, or Claude Code was started from another user account. Run `claude mcp get profinity`.

The shared HTTP responses are in [Prepare Profinity for an MCP client](Prepare_Profinity.md#when-the-connection-fails).
When Claude Code can read the instance, continue with [AI Skills](../../Profinity_AI/AI_Skills.md).
