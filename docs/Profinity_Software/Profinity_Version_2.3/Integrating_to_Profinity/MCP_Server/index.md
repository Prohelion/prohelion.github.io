---
title: MCP Server
description: "Enable the Profinity MCP server and connect an AI assistant or MCP client to query live tags, history, and alerts, with permissions and troubleshooting."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# MCP Server

Profinity includes a Model Context Protocol (MCP) server, which lets AI assistants and other MCP-aware tools query live data from a Profinity instance over a standard protocol.
The server exposes read-only tools for tag discovery, tag values and history, and alert state, and it does not expose any tool that writes or changes Profinity data.
An MCP client can use it to answer questions about live tags and alerts, to pull history into an analysis tool, or to feed a monitoring or reporting system, all with the permissions of the account it authenticates as.

!!! info "Licence required"
    The MCP server requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions.
    Without it the feature is unavailable.
    Refer to [Licensing](../../Administration/Licensing.md) for what each edition includes.

## About MCP

MCP is a standard protocol that lets AI assistants and other external tools query a system's data without a bespoke integration for each tool.
In Profinity, the MCP server answers queries about tags, tag values and alerts, scoped to the permissions of the authenticated caller.
The built-in [AI Chat](../../Profinity_AI/AI_Chat.md) uses the same server.

## Enabling the MCP server

The MCP server is configured from the **[Profinity AI](../../Administration/System_Configuration/AI_Settings.md)** settings page (select **ADMIN** in the side menu, open the **System Configuration** pill, then choose **Profinity AI**), under its own **MCP Server** field group, where the toggle is **Enable MCP Server**.
Turning on **Enable Profinity AI** also enables the MCP server, since the assistant depends on it, and the MCP server can be enabled on its own, with Profinity AI left off, for external MCP clients such as Claude Desktop.

!!! warning "Restart required"
    Enabling or disabling the MCP server takes effect only after Profinity restarts.
    After saving the configuration, wait for the restart to complete before reloading the page, because the web client shows a restarting message while it waits for the engine to return.

## Transport

An MCP client connects to the endpoint at:

```text
/api/v2/Ai/Mcp
```

resolved against the Profinity web server's host, port and protocol.
An AI tool needs only this address and an `Authorization` header, and [Connect Profinity to AI](../../How_To_Guides/Connect_Profinity_to_AI.md) describes how to set one up.

## Available tools

The MCP server provides ten read-only tools: `get_all_components`, `search_tags`, `get_tag_catalog`, `get_tag_sample_by_canonical_id`, `get_tag_samples`, `get_tag_series`, `get_tag_series_batch`, `get_alert_rules`, `get_active_alerts` and `get_alert_history`.
Refer to [MCP tool reference](Tool_Reference.md) for the parameters and return values of each tool.
A tool omits a tag or alert the calling user cannot view and never reports it as an error, so a response that looks smaller than expected usually reflects the caller's own permissions.

## Authentication and permissions

Every call to the MCP server requires a valid JSON Web Token (JWT) bearer token, checked against the **MCP integration** permission at the endpoint itself.
Beyond that gate, each tool checks its own domain permission before returning data: the tag-related tools require **View tags**, and the alert-related tools require **View alerts**.
In the permission list that the sign-in response returns, these appear as `McpView`, `TagView` and `AlertsView`.

The **Profinity AI** permission automatically grants **MCP integration**, so a user with access to Profinity AI does not need **MCP integration** granted separately (refer to [Profinity AI Settings](../../Administration/System_Configuration/AI_Settings.md)).

To authenticate directly against the MCP server:

1. Create a user account with the required permissions, or use an existing one.
2. Generate a JWT token for the user by signing in through `POST /api/v2/Users/Authenticate`, as described under [Profinity API security](../APIs/index.md#profinity-api-security).
A personal token expires after the **Security Token Expiration (minutes)** setting in **Application Config**, whereas a service account token does not expire.
3. Include the token in the `Authorization` header of every request:

    ```text
    Authorization: Bearer YOUR_JWT_TOKEN_HERE
    ```

An external MCP client that runs for a long time should use a [service account](../../Administration/Users_and_Access/Service_Accounts.md) with the required permissions and a non-expiring token, rather than a personal user account.

## Troubleshooting connections

| Response | Cause | Fix |
|----------|-------|-----|
| 401 | The request has no token, or the token has expired | Sign in again, or use a service account token |
| 403 | The user lacks **MCP integration** | Add the permission to one of the user's roles (refer to [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md)) |
| 404 | The MCP server is not enabled, the **AI** feature is not licensed, Profinity has not restarted since the setting changed, or the request is not a Streamable HTTP MCP request, such as a browser request or one without the `Accept` header | Turn on **Enable MCP Server**, check the licence and restart Profinity |
| 429 with `Too many MCP requests. Please try again later.` | The per-user rate limit on MCP requests was exceeded | Reduce the request rate and retry later |

A tool that returns fewer results than expected, rather than an error, reflects the caller's **View tags** or **View alerts** permission.

## Related documentation

- [Profinity AI Settings](../../Administration/System_Configuration/AI_Settings.md): enabling the MCP server as part of, or independently of, Profinity AI
- [Service Accounts](../../Administration/Users_and_Access/Service_Accounts.md): long-lived credentials for external MCP clients
- [AI Chat](../../Profinity_AI/AI_Chat.md): the built-in assistant that uses this MCP server
- [MCP tool reference](Tool_Reference.md): parameters and return values of the ten tools
- [AI Skills](../../Profinity_AI/AI_Skills.md): an external toolkit that also uses this MCP server, for building dashboards and other configuration with an AI coding assistant
- [APIs](../APIs/index.md): the REST API documentation
- [Scripting](../../Developing_with_Profinity/Scripting/index.md): Profinity scripting capabilities
