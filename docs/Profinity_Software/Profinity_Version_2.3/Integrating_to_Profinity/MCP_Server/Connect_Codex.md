---
title: Connect Codex to Profinity
description: "Add the Profinity MCP server to Codex with a bearer token, trust its HTTPS certificate, and confirm Codex can read live components."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Connect Codex to Profinity

Connect the Codex command-line client or IDE extension on your computer to the Profinity Model Context Protocol (MCP) server.
Codex can then read live components, tags, and alerts.
Finish [Prepare Profinity for an MCP client](Prepare_Profinity.md) first.
You need the MCP address and the service account token from that page.
Install [AI Skills](../../Profinity_AI/Install_AI_Skills.md) when you also want Codex to build dashboards, rules, collections, scripts, plugins, derived tags, or example apps.

Profinity does not offer OAuth for this server.
Do not run `codex mcp login` for it.
Codex sends the service account token from an environment variable named in its configuration.
On the same computer, with **Redirect all Http traffic to Https** off, use the HTTP address and skip the certificate steps.

## Add the server

Codex stores MCP servers in `~/.codex/config.toml`.
A project can use `.codex/config.toml` instead when only that project needs the connection.

1. Set `PROFINITY_TOKEN` to the service account token in the environment that starts Codex.
2. Open the configuration file and add the `profinity` server. Replace the address with the HTTP or HTTPS address from the prepare page.
3. Quit Codex and start it again from that environment.

```toml
[mcp_servers.profinity]
url = "https://localhost:18443/api/v2/Ai/Mcp"
bearer_token_env_var = "PROFINITY_TOKEN"
```

`bearer_token_env_var` is the name of the variable, not the token.
Leave the token out of `config.toml`.
The Codex settings screen can add an HTTP server by URL, and this file is where the bearer token is named.
The same variable has to be set before the IDE extension starts, because a window opened from the desktop does not see a variable exported in a terminal afterwards.

## Trust the certificate

Skip this section when the address is HTTP on the same computer.
For HTTPS, export the public certificate and trust it in the operating system, as described in [Prepare Profinity for an MCP client](Prepare_Profinity.md#export-the-https-certificate).
Codex has no documented setting that points one MCP server at a certificate file, and no setting that turns certificate checking off.
Restart Codex after the operating system trusts the certificate.
Use a host name that is on the certificate. `localhost` is on the certificate Profinity generates.

When the operating system already trusts the certificate and Codex still reports a certificate error, use a certificate from a trusted authority on the [Web](../../Administration/System_Configuration/Profinity_Web.md#https-certificates) tab.
That is the supported way to present HTTPS to a client that does not read the trust store you updated.

## Confirm Codex can read data

1. Start Codex from the environment where `PROFINITY_TOKEN` is set.
2. Run `/mcp` and confirm that `profinity` is connected. `/mcp verbose` adds the server detail.
3. Ask: "What components are in my active profile?"

Codex calls `get_all_components`.
A list of component names confirms the connection.
An empty list means the active profile has no components, or the service account lacks **View tags**.

## Fix a failed connection

- A certificate error means the operating system trust was not in place before Codex started, or the address is not a name on the certificate. Trust the exported certificate, then start Codex again. A certificate from a trusted authority avoids this step.
- Codex asks to authenticate, or `/mcp` offers a login. The bearer variable is missing or empty, so Codex falls through towards OAuth. Set `PROFINITY_TOKEN` and restart Codex. Do not complete an OAuth login for this server.
- A 401 means the variable is set to an old or incomplete token. Generate or copy the current service account token and restart Codex.
- A 403 means the account lacks **MCP integration**.
- `profinity` is absent from `/mcp`. The table heading is not `[mcp_servers.profinity]`, or Codex was started with a different configuration file.

The shared HTTP responses are in [Prepare Profinity for an MCP client](Prepare_Profinity.md#when-the-connection-fails).
When Codex can read the instance, continue with [AI Skills](../../Profinity_AI/AI_Skills.md).
