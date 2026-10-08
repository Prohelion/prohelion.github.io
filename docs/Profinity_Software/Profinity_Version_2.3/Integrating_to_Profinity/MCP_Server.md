---
title: MCP Server
description: "Model Context Protocol server for AI assistants and MCP-aware tools to query live Profinity data."
---

# MCP Server

Profinity includes a Model Context Protocol (MCP) server, which lets AI assistants and other MCP-aware tools query live data from a Profinity instance over a standard protocol. The server exposes read-only tools for tag discovery, tag values and history, and alert state, and it does not expose any tool that writes or changes Profinity data. An MCP client can use it to answer questions about live tags and alerts, to pull history into an analysis tool, or to feed a monitoring or reporting system, all with the permissions of the account it authenticates as.

!!! info "Licence Required"
    The MCP server requires the **AI** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../Administration/Licensing.md) for what each edition includes.

## About MCP

MCP is a standard protocol that lets AI assistants and other external tools query a system's data without a bespoke integration for each tool. In Profinity, the MCP server answers queries about tags, tag values and alerts, scoped to the permissions of the authenticated caller. The built-in [AI Chat](../Profinity_AI/AI_Chat.md) uses the same server.

## Enabling the MCP Server

The MCP server is configured from the **[Profinity AI](../Administration/System_Configuration/AI_Settings.md)** settings page (select **ADMIN** in the side menu, open the **System Configuration** pill, then choose **Profinity AI**), under its own **MCP Server** field group, where the toggle is **Enable MCP Server**. Turning on **Enable Profinity AI** also enables the MCP server, since the assistant depends on it, and the MCP server can be enabled on its own, with Profinity AI left off, for external MCP clients such as Claude Desktop.

!!! warning "Restart Required"
    Enabling or disabling the MCP server takes effect only after Profinity restarts. After saving the configuration, wait for the restart to complete before reloading the page, because the web client shows a restarting message while it waits for the engine to return.

## Transport

The MCP server uses the Streamable HTTP transport and is stateless, so it holds no session state between requests and issues no `Mcp-Session-Id`. It accepts the protocol revisions `2024-11-05`, `2025-03-26`, `2025-06-18`, `2025-11-25` and `2026-07-28`, and an MCP client library negotiates the revision automatically. The endpoint is available at:

```text
/api/v2/Ai/Mcp
```

resolved against the Profinity web server's host, port and protocol.

## Available Tools

The MCP server provides ten read-only tools. None of them acknowledge, unacknowledge, silence, or otherwise change alert or tag state, so those changes are made with the REST Alerts API or the Profinity UI.

A tag or alert the calling user does not have permission to view is omitted from a tool's response and is never reported as an error, so a response that looks smaller than expected on a shared instance usually reflects the caller's own permissions rather than a fault.

### get_all_components

The recommended first call, which returns a lightweight list of active component names visible to the caller, for use as the `componentId` argument to other tools.

**Parameters:** none

**Returns:** a collection of component name strings

### search_tags

Searches the live tag tree by name fragment, unit, meta-type, component, or tag-path prefix, without downloading the full catalogue. At least one of the filter parameters is required.

| Parameter | Type | Description |
|-----------|------|--------------|
| `query` | optional | Case-insensitive substring match against the tag path, its last segment, and its comment |
| `unit` | optional | Exact unit match, case-insensitive (`V` is not the same as `mV`) |
| `componentId` | optional | Restrict to a component name |
| `tagPrefix` | optional | Restrict to a canonical tag path prefix; takes priority over `componentId` when both are set |
| `metaType` | optional | Restrict to a meta-type, for example `dbc.signal` |
| `sampleLeavesOnly` | optional (default: true) | If true, return only tags that carry a value |
| `includeMetadata` | optional (default: true) | If true, include unit, comment, and scaling metadata on each result |
| `limit` | optional (default: 25) | Maximum results, 1–50 |

**Returns:** `{items, count, limit, truncated}`, where `truncated` is true when more tags matched than the `limit` allowed

### get_tag_catalog

Returns the tag catalogue for the active profile, nested by segment or as a paginated flat list. Use `get_all_components` first, then scope with `componentId` or `tagPrefix`, because an unscoped nested catalogue above roughly 200,000 characters is refused.

| Parameter | Type | Description |
|-----------|------|--------------|
| `flat` | optional (default: false) | If true, return a paginated flat list instead of a nested tree |
| `includeSamples` | optional (default: false) | If true, include each tag's current value where available |
| `includeMetadata` | optional (default: false) | If true, include unit, scaling, and comment metadata |
| `componentId` | optional | Restrict to a component name |
| `tagPrefix` | optional | Restrict to a canonical tag path prefix; takes priority over `componentId` when both are set |
| `pageIndex` | optional | Zero-based page index |
| `pageSize` | optional | Page size, 1–500 |
| `sampleLeavesOnly` | optional (default: false) | Flat mode only: keep only tags that carry a value |

**Returns:** a nested tree, or `{items, totalCount, pageIndex, pageSize}`

### get_tag_sample_by_canonical_id

Reads the current value of a single tag by its canonical full tag ID.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagId` | required | Canonical full tag ID, for example `MyBMS/DBC/MessageName/SignalName` |

**Returns:** an object with value, quality, timestamp, and a reason code (for example `ok`, `notFound`, `noValueYet`, `stale`); `null` only when the tag is not visible to the caller

### get_tag_samples

Batch-reads current values for up to 50 canonical tag IDs in one call.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagIds` | required | Canonical full tag IDs to read, maximum 50 |

**Returns:** an array of per-tag sample objects, one per visible requested ID

### get_tag_series

Returns current or historical values for a single canonical tag ID, using the same range and aggregation rules as `POST /api/v2/TagQuerySet` (see [Accessing Historical Data via APIs](APIs/index.md#accessing-historical-data-via-apis)). Omit `start`/`stop` for the current value.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagId` | required | Canonical full tag ID |
| `start` | optional | Start of the range, Flux-style, for example `-1h` |
| `stop` | optional | End of the range, for example `0m`, or omitted for now |
| `aggregationWindow` | optional | Aggregation window, for example `10s`, used only with a time range |
| `aggregationFunction` | optional (default: max) | `max`, `min`, `mean`, `sum`, `count`, `last`, or `first` |

**Returns:** a single measurement or series object

### get_tag_series_batch

Batch-reads time series for up to 20 canonical tag IDs sharing one time range and aggregation.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagIds` | required | Canonical full tag IDs to read, maximum 20 |
| `start` | optional | Start of the range, Flux-style |
| `stop` | optional | End of the range |
| `aggregationWindow` | optional | Aggregation window, used only with a time range |
| `aggregationFunction` | optional (default: max) | `max`, `min`, `mean`, `sum`, `count`, `last`, or `first` |

**Returns:** one series entry per visible requested ID

### get_alert_rules

Returns the catalogue of defined alert rules, independent of whether any rule is currently active.

| Parameter | Type | Description |
|-----------|------|--------------|
| `componentId` | optional | Restrict to rules scoped under this component |
| `pageIndex` | optional (default: 0) | Zero-based page index |
| `pageSize` | optional (default: 25) | Page size, 1–500 |
| `includeDisabled` | optional (default: false) | If true, include disabled rules |

**Returns:** `{items, totalCount, pageIndex, pageSize}`

### get_active_alerts

Returns currently active alerts.

| Parameter | Type | Description |
|-----------|------|--------------|
| `componentId` | optional | Restrict to alerts under this component or tag path prefix |
| `tagPrefix` | optional | Restrict to alerts whose tag path starts with this prefix |
| `unacknowledgedOnly` | optional (default: false) | If true, return only unacknowledged alerts |
| `level` | optional | Restrict to a severity level, for example `Warning` or `Error` |

**Returns:** a summary of active alerts

### get_alert_history

Returns a page of past alert state transitions (raised, cleared, acknowledged, silenced), newest first.

| Parameter | Type | Description |
|-----------|------|--------------|
| `componentId` | optional | Restrict to alerts under this component or tag path prefix |
| `tagPrefix` | optional | Restrict to alerts whose tag path starts with this prefix |
| `pageIndex` | optional (default: 0) | Zero-based page index |
| `pageSize` | optional (default: 25) | Page size, 1–500 |
| `compact` | optional (default: false) | If true, return rule definitions once with slim event rows, rather than repeating rule fields on every row |
| `level` | optional | Restrict to a severity level |
| `fromUtc` | optional | Inclusive UTC lower bound |
| `toUtc` | optional | Inclusive UTC upper bound |

**Returns:** a page of alert history events

## Authentication and Permissions

Every call to the MCP server requires a valid JSON Web Token (JWT) bearer token, checked against the **MCP integration** permission at the endpoint itself. Beyond that gate, each tool checks its own domain permission before returning data: the tag-related tools require **View tags**, and the alert-related tools require **View alerts**. In the permission list that the sign-in response returns, these appear as `McpView`, `TagView` and `AlertsView`.

The **Profinity AI** permission automatically grants **MCP integration**, so a user with access to Profinity AI does not need **MCP integration** granted separately (see [Profinity AI Settings](../Administration/System_Configuration/AI_Settings.md)).

To authenticate directly against the MCP server:

1. Create a user account with the required permissions, or use an existing one.
2. Generate a JWT token for the user by signing in through `POST /api/v2/Users/Authenticate`, as described under [Profinity API Security](APIs/index.md#profinity-api-security). A personal token expires after the **Security Token Expiration (minutes)** setting in **Application Config**, whereas a service account token does not expire.
3. Include the token in the `Authorization` header of every request:

    ```text
    Authorization: Bearer YOUR_JWT_TOKEN_HERE
    ```

!!! info "Service Accounts for Long-Lived Clients"
    An external MCP client that runs for a long time should use a [service account](../Administration/Users_and_Access/Service_Accounts.md) with the required permissions and a non-expiring token, rather than a personal user account.

## Troubleshooting Connections

| Response | Cause | Fix |
|----------|-------|-----|
| 401 | The request has no token, or the token has expired | Sign in again, or use a service account token |
| 403 | The user lacks **MCP integration** | Add the permission to one of the user's roles (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)) |
| 404 | The MCP server is not enabled, the **AI** feature is not licensed, or Profinity has not restarted since the setting changed | Turn on **Enable MCP Server**, check the licence and restart Profinity |
| 429 with `Too many MCP requests. Please try again later.` | The per-user rate limit on MCP requests was exceeded | Reduce the request rate and retry later |

A tool that returns fewer results than expected, rather than an error, reflects the caller's **View tags** or **View alerts** permission.

## Example Client Calls

Most MCP clients, including the official MCP SDKs, perform the protocol handshake automatically, so only the endpoint URL and the `Authorization` header need to be supplied. A client that speaks the protocol directly must send an `initialize` request first, follow it with the `notifications/initialized` notification, and then call tools with `tools/call`, using JavaScript Object Notation Remote Procedure Call (JSON-RPC) 2.0 messages that carry `jsonrpc` and `id` fields. The Streamable HTTP transport requires an `Accept` header that lists both `application/json` and `text/event-stream`, and the server may answer a POST with either a JSON body or a single server-sent event, so a direct client must handle both.

The following Python example is an advanced, hand-written client that performs that handshake and calls three of the tools. It negotiates the `2025-11-25` revision, one of the revisions listed under [Transport](#transport). A client that uses an MCP library needs only the endpoint URL and the `Authorization` header, and [Connect Profinity to AI](../How_To_Guides/Connect_Profinity_to_AI.md) describes how to set one up.

```python
import json
import requests

PROFINITY_MCP_URL = "https://your-profinity-host/api/v2/Ai/Mcp"
TOKEN = "YOUR_JWT_TOKEN_HERE"
PROTOCOL_VERSION = "2025-11-25"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
}

next_id = 0


def read_message(response):
    """Return the JSON-RPC message from a JSON or server-sent event response."""
    response.raise_for_status()
    if response.headers.get("Content-Type", "").startswith("text/event-stream"):
        for line in response.text.splitlines():
            if line.startswith("data:"):
                return json.loads(line[len("data:"):].strip())
        raise RuntimeError("No data event in response")
    return response.json()


def call(method, params=None):
    """Send a JSON-RPC request and return its result."""
    global next_id
    next_id += 1
    payload = {"jsonrpc": "2.0", "id": next_id, "method": method, "params": params or {}}
    message = read_message(requests.post(PROFINITY_MCP_URL, headers=headers, json=payload))
    if "error" in message:
        raise RuntimeError(message["error"])
    return message["result"]


def call_tool(name, arguments):
    """Call a tool and decode the text content it returns."""
    result = call("tools/call", {"name": name, "arguments": arguments})
    return [json.loads(item["text"]) for item in result["content"] if item["type"] == "text"]


# Handshake: initialize, then confirm with the initialized notification.
init = call(
    "initialize",
    {
        "protocolVersion": PROTOCOL_VERSION,
        "capabilities": {},
        "clientInfo": {"name": "example-client", "version": "1.0"},
    },
)
headers["MCP-Protocol-Version"] = init["protocolVersion"]
requests.post(
    PROFINITY_MCP_URL,
    headers=headers,
    json={"jsonrpc": "2.0", "method": "notifications/initialized"},
).raise_for_status()

# Discover available components
components = call_tool("get_all_components", {})

# Read the current value of a specific tag
sample = call_tool(
    "get_tag_sample_by_canonical_id",
    {"fullTagId": "MyBMS/DBC/MessageName/SignalName"},
)

# Read the last hour of a tag as a time series
series = call_tool(
    "get_tag_series",
    {
        "fullTagId": "MyBMS/DBC/MessageName/SignalName",
        "start": "-1h",
        "stop": "0m",
        "aggregationWindow": "1m",
        "aggregationFunction": "mean",
    },
)
```

The `2026-07-28` revision changes the handshake, so a client that must use that revision should rely on an MCP client library rather than hand-written JSON-RPC.

## Related Documentation

- [Profinity AI Settings](../Administration/System_Configuration/AI_Settings.md): enabling the MCP server as part of, or independently of, Profinity AI
- [Service Accounts](../Administration/Users_and_Access/Service_Accounts.md): long-lived credentials for external MCP clients
- [AI Chat](../Profinity_AI/AI_Chat.md): the built-in assistant that uses this MCP server
- [AI Skills](../Profinity_AI/AI_Skills.md): an external toolkit that also uses this MCP server, for building dashboards and other configuration with an AI coding assistant
- [APIs](APIs/index.md): the REST API documentation
- [Scripting](../Developing_with_Profinity/Scripting/index.md): Profinity scripting capabilities
