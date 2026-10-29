---
title: Connect Codex to Profinity
description: "Add the Profinity MCP server to Codex with a service account token, trust its HTTPS certificate, and confirm Codex can read live components."
type: task
owner: Documentation
last_reviewed: 2026-10-29
---

# Connect Codex to Profinity

Connect the Codex command-line client or IDE extension on your computer to the Profinity Model Context Protocol (MCP) server so that Codex can read live components, tags, and alerts.
Before you start, finish [Prepare Profinity for an MCP client](Prepare_Profinity.md), including [storing the token in an environment variable](Prepare_Profinity.md#store-the-token-in-an-environment-variable).
You need the MCP address you chose on that page.

Codex signs in to Profinity with the token in `PROFINITY_TOKEN`.
Profinity does not offer any other sign-in for this server, so do not run `codex mcp login` for it.

## Add the server

Codex stores MCP servers in `~/.codex/config.toml`.
A project can use `.codex/config.toml` instead when only that project needs the connection.

1. Open the configuration file, and add the `profinity` server:

    ```toml
    [mcp_servers.profinity]
    url = "https://localhost:18443/api/v2/Ai/Mcp"
    bearer_token_env_var = "PROFINITY_TOKEN"
    ```

2. Replace the address with the one you chose in [Choose the MCP server address](Prepare_Profinity.md#choose-the-mcp-server-address).
3. Save the file.
4. Quit Codex, and start it again.

`bearer_token_env_var` names the variable that holds the token, so the token itself stays out of the file.
Add the server in the file rather than on the Codex settings screen, because the file is where the variable is named.

## Trust the certificate

Skip this section for an `http://` address.
For an `https://` address, trust the exported certificate in the operating system, as described in [Trust the HTTPS certificate](Trust_HTTPS_Certificate.md), then restart Codex.
As of October 2026, Codex has no setting that points one MCP server at a certificate file, and no setting that turns certificate checking off.
The address has to use a name that is on the certificate, and `localhost` is on the certificate Profinity generates.

When the operating system trusts the certificate and Codex still reports a certificate error, use a certificate from a trusted authority.
Refer to [HTTPS certificates](../../Administration/System_Configuration/Profinity_Web.md#https-certificates).

## Confirm Codex can read data

1. In Codex, run `/mcp`, and confirm that `profinity` is connected. `/mcp verbose` adds the server detail.
2. Ask: "What components are in my active profile?"

Codex calls `get_all_components`, and a list of component names confirms the connection.
When the list is shorter than you expect, refer to [Fewer results than expected](Connection_Errors.md#fewer-results-than-expected).

## Fix a failed connection

Run `/mcp`, and match what Codex shows to a row in this table:

| What you see | Cause | What to do |
|--------------|-------|------------|
| A certificate error | The operating system did not trust the certificate when Codex started, or the address is not a name on it | Trust the certificate, then start Codex again. A certificate from a trusted authority avoids this step |
| Codex asks you to sign in, or `/mcp` offers a login | `PROFINITY_TOKEN` is missing or empty | Set `PROFINITY_TOKEN`, then restart Codex. Do not complete a login for this server |
| A 401 response | The variable holds an old or incomplete token | Set the variable to the current service account token, then restart Codex |
| `profinity` is missing from `/mcp` | The table heading is not `[mcp_servers.profinity]`, or Codex started with a different configuration file | Correct the heading, or add the server to the file Codex uses |

For a 403 or another response, refer to [MCP connection errors](Connection_Errors.md).
When Codex can read the instance, install [AI Skills](../../Profinity_AI/AI_Skills/Install_AI_Skills.md) so that Codex can build dashboards, rules, and other configuration from that data.
