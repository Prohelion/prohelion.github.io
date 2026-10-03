---
title: MCP Server
description: "Model Context Protocol server for AI assistants and MCP-aware tools to query live Profinity data."
---

# MCP Server

Profinity includes a Model Context Protocol (MCP) server, which lets AI assistants and other MCP-aware tools query live data from a Profinity instance over a standard protocol. The server exposes read-only tools for tag discovery, tag values and history, and alert state; it does not expose any tool that writes or changes Profinity data.

## Table of Contents

- [What is MCP?](#what-is-mcp)
- [Enabling the MCP server](#enabling-the-mcp-server)
- [Transport](#transport)
- [Available tools](#available-tools)
- [Authentication and permissions](#authentication-and-permissions)
- [Configuration example](#configuration-example)
- [Use cases](#use-cases)
- [Security considerations](#security-considerations)
- [Related documentation](#related-documentation)

## What is MCP?

The Model Context Protocol (MCP) is a standard protocol that lets AI assistants and other external tools query a system's data without a bespoke integration for each tool. In Profinity, the MCP server answers queries about tags, tag values, and alerts, scoped to the permissions of the authenticated caller.

## Enabling the MCP server

The MCP server is configured from the **Profinity AI** settings page (**Admin > Instance Settings > Profinity AI**), under its own **MCP Server** field group. Enabling **Profinity AI** itself also enables the MCP server, since the assistant depends on it; the MCP server can also be enabled on its own, independently of Profinity AI, for external MCP clients such as Claude Desktop.

!!! warning "Restart Required"
    Enabling or disabling the MCP server takes effect only after Profinity restarts. After saving the configuration, wait approximately 15 seconds for the engine to restart before reloading the page.

<figure markdown>
![Profinity AI settings page showing the MCP Server field group](../../../assets/images/2.3/2.3-ai-assistant-mcp-toggle.png)
<figcaption>MCP Server field group on the Profinity AI settings page (screenshot placeholder — provide SS-52)</figcaption>
</figure>

## Transport

The MCP server uses Streamable HTTP transport (MCP protocol version 2.0 and later), and is stateless — it holds no session state between requests. It is available at:

```text
/api/v2/Ai/Mcp
```

resolved against the Profinity web server's host, port, and protocol.

## Available tools

The MCP server provides ten read-only tools. None of them acknowledge, unacknowledge, silence, or otherwise change alert or tag state — use the REST Alerts API or the Profinity UI for that.

A tag or alert the calling user does not have permission to view is omitted from a tool's response; it is never reported as an error, so a response that looks smaller than expected on a shared instance usually reflects the caller's own permissions rather than a fault.

### get_all_components

The recommended first call. Returns a lightweight list of active component names visible to the caller, for use as the `componentId` argument to other tools.

**Parameters:** none

**Returns:** a collection of component name strings

### search_tags

Searches the live tag tree by name fragment, unit, meta-type, component, or tag-path prefix, without downloading the full catalog. At least one of the filter parameters is required.

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

**Returns:** `{items, count, limit, truncated}`

### get_tag_catalog

Returns the tag catalog for the active profile, nested by segment or as a paginated flat list. Use `get_all_components` first, then scope with `componentId` or `tagPrefix` — an unscoped nested catalog above roughly 200,000 characters is refused.

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

Returns current or historical values for a single canonical tag ID, using the same range and aggregation rules as `POST /api/v2/TagQuerySet`. Omit `start`/`stop` for the current value.

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

Returns the catalog of defined alert rules, independent of whether any rule is currently active.

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

## Authentication and permissions

Every call to the MCP server requires a valid JWT bearer token, checked against the **MCP View** permission at the endpoint itself. Beyond that gate, each tool checks its own domain permission before returning data: the tag-related tools require **Tag View**, and the alert-related tools require **Alerts View**.

The **AI Assistant** permission automatically grants **MCP View**, so a user with access to Profinity AI does not need MCP View granted separately (see [Profinity AI settings](../Administration/Security/AI_Assistant.md)).

To authenticate directly against the MCP server:

1. Create a user account with the required permissions, or use an existing one.
2. Generate a JWT token for the user, through the Profinity API or the user management interface.
3. Include the token in the `Authorization` header of every request:

```text
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

!!! info "Service Accounts"
    For a long-lived integration such as an external MCP client, use a [service account](../Administration/Security/Service_Accounts.md) with the required permissions and a non-expiring token, rather than a personal user account.

## Configuration example

```python
import requests

PROFINITY_MCP_URL = "https://your-profinity-host/api/v2/Ai/Mcp"
TOKEN = "YOUR_JWT_TOKEN_HERE"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

# Discover available components
payload = {
    "method": "tools/call",
    "params": {"name": "get_all_components", "arguments": {}},
}
response = requests.post(PROFINITY_MCP_URL, headers=headers, json=payload)
components = response.json()

# Read the current value of a specific tag
payload = {
    "method": "tools/call",
    "params": {
        "name": "get_tag_sample_by_canonical_id",
        "arguments": {"fullTagId": "MyBMS/DBC/MessageName/SignalName"},
    },
}
response = requests.post(PROFINITY_MCP_URL, headers=headers, json=payload)
sample = response.json()

# Read the last hour of a tag as a time series
payload = {
    "method": "tools/call",
    "params": {
        "name": "get_tag_series",
        "arguments": {
            "fullTagId": "MyBMS/DBC/MessageName/SignalName",
            "start": "-1h",
            "stop": "0m",
            "aggregationWindow": "1m",
            "aggregationFunction": "mean",
        },
    },
}
response = requests.post(PROFINITY_MCP_URL, headers=headers, json=payload)
series = response.json()
```

## Use cases

The MCP server supports:

- AI assistants that answer questions about the current state of a Profinity instance, including [Profinity AI](../Profinity_AI/index.md) itself
- External analysis tools that need read access to tag values or alert history
- Monitoring integrations that poll system state programmatically
- Reporting tools that build on current or historical tag and alert data

## Security considerations

- Every request requires a valid JWT bearer token and the MCP View permission.
- Every tool additionally checks Tag View or Alerts View before returning data, and omits anything the caller cannot see rather than reporting an error.
- All ten tools are read-only; none of them can change tag values, alert state, or configuration.
- MCP traffic is rate-limited per authenticated user.

## Related documentation

- [Profinity AI settings](../Administration/Security/AI_Assistant.md) — enabling the MCP server as part of, or independently of, Profinity AI
- [Service accounts](../Administration/Security/Service_Accounts.md) — long-lived credentials for external MCP clients
- [Profinity AI](../Profinity_AI/index.md) — the built-in assistant that uses this MCP server
- [AI Skills](../Profinity_AI/AI_Skills.md) — an external toolkit that also uses this MCP server, for building dashboards and other config with an AI coding assistant
- [APIs](APIs/index.md) — RESTful API documentation
- [Scripting](Scripting/index.md) — Profinity scripting capabilities
