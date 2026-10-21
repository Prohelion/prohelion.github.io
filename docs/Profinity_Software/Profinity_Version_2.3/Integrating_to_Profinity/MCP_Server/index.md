---
title: MCP Server
description: "Enable the Profinity MCP server and connect an AI assistant or MCP client to query live tags, history, and alerts, with permissions and troubleshooting."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# MCP Server

Profinity includes a Model Context Protocol (MCP) server, which lets AI assistants and other MCP-aware tools query live data from a Profinity instance over a standard protocol.
The server exposes read-only tools for tag discovery, tag values and history, and alert state.
It does not expose any tool that writes or changes Profinity data.
An MCP client can use it to answer questions about live tags and alerts, to pull history into an analysis tool, or to feed a monitoring or reporting system.
It works with the permissions of the account it authenticates as.

!!! info "Licence required"
    The MCP server requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions.
    Without it the feature is unavailable.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

## About MCP

MCP is a standard protocol that lets AI assistants and other external tools query a system's data without a bespoke integration for each tool.
In Profinity, the MCP server answers queries about tags, tag values and alerts, scoped to the permissions of the authenticated caller.
The built-in [AI Chat](../../Profinity_AI/AI_Chat.md) uses the same server.

## Enabling the MCP server

To configure the MCP server, open the **[Profinity AI](../../Administration/System_Configuration/AI_Settings.md)** settings page.
Select **ADMIN** in the side menu, open the **System Configuration** pill, then choose **Profinity AI**.
The toggle is **Enable MCP Server**, in its own **MCP Server** field group.

Turning on **Enable Profinity AI** also enables the MCP server, because the assistant depends on it.
You can enable the MCP server on its own, with Profinity AI left off, for external MCP clients such as a desktop AI assistant.

!!! warning "Restart required"
    Enabling or disabling the MCP server takes effect only after Profinity restarts.
    After saving the configuration, wait for the restart to complete before reloading the page.
    The web client shows a restarting message while it waits for the engine to return.

## Transport

An MCP client connects to the endpoint at:

```text
/api/v2/Ai/Mcp
```

The address is resolved against the Profinity web server's host, port and protocol.
An AI tool needs only this address and an `Authorization` header.
Refer to [How to connect Profinity to AI tools like Claude or ChatGPT](../../How_To_Guides/Connect_Profinity_to_AI.md) for how to set one up.

## Available tools

The MCP server provides ten read-only tools: `get_all_components`, `search_tags`, `get_tag_catalog`, `get_tag_sample_by_canonical_id`, `get_tag_samples`, `get_tag_series`, `get_tag_series_batch`, `get_alert_rules`, `get_active_alerts` and `get_alert_history`.
Refer to [MCP tool reference](Tool_Reference.md) for the parameters and return values of each tool.
A tool omits a tag or alert the calling user cannot view and never reports it as an error.
A response that looks smaller than expected usually reflects the caller's own permissions.

## Authentication and permissions

Every call to the MCP server requires a valid JSON Web Token (JWT) bearer token.
The endpoint checks the token against the **MCP integration** permission.
Each tool then checks its own permission before returning data:

- The tag-related tools require **View tags**.
- The alert-related tools require **View alerts**.

In the permission list that the sign-in response returns, **MCP integration**, **View tags** and **View alerts** appear as `McpView`, `TagView` and `AlertsView`.

The **Profinity AI** permission automatically grants **MCP integration**.
A user with access to Profinity AI therefore does not need **MCP integration** granted separately (refer to [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md)).

To authenticate directly against the MCP server:

1. Create a user account with the required permissions, or use an existing one.
2. Generate a JWT for the user by signing in through `POST /api/v2/Users/Authenticate`, as described under [Profinity API security](../APIs/index.md#profinity-api-security).
   A personal token expires after the **Security Token Expiration (minutes)** setting in **Application Config**.
   A service account token does not expire.
3. Include the token in the `Authorization` header of every request:

    ```text
    Authorization: Bearer YOUR_JWT_TOKEN_HERE
    ```

An external MCP client that runs for a long time should use a [service account](../../Administration/Users_and_Access/Service_Accounts.md) with the required permissions and a non-expiring token, rather than a personal user account.

## Troubleshooting connections

| Response | Cause | Fix |
|----------|-------|-----|
| 401 | The request has no token, or the token has expired | Sign in again, or use a service account token |
| 403 | The user lacks **MCP integration** | Add the permission to one of the user's roles (refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md)) |
| 404 | The MCP server is not available, or the request is not an MCP request (causes follow the table) | Turn on **Enable MCP Server**, check the licence and restart Profinity |
| 429 with `Too many MCP requests. Please try again later.` | The per-user rate limit on MCP requests was exceeded | Reduce the request rate and retry later |

A 404 has these causes:

- The MCP server is not enabled.
- The **AI** feature is not licensed.
- Profinity has not restarted since the setting changed.
- The request is not a Streamable HTTP MCP request, such as a browser request or one without the `Accept` header.

A tool that returns fewer results than expected, rather than an error, reflects the caller's **View tags** or **View alerts** permission.

## Related documentation

- [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md): enabling the MCP server as part of, or independently of, Profinity AI
- [Service accounts](../../Administration/Users_and_Access/Service_Accounts.md): long-lived credentials for external MCP clients
- [AI Chat](../../Profinity_AI/AI_Chat.md): the built-in assistant that uses this MCP server
- [MCP tool reference](Tool_Reference.md): parameters and return values of the ten tools
- [AI Skills](../../Profinity_AI/AI_Skills.md): an external toolkit that also uses this MCP server, for building dashboards and other configuration with an AI coding assistant
- [Profinity REST APIs](../APIs/index.md): the REST API documentation
- [Profinity Scripting](../../Developing_with_Profinity/Scripting/index.md): Profinity scripting capabilities
