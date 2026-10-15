---
title: MCP tool reference
description: "Look up the parameters and return values of the ten read-only tools the Profinity MCP server provides for tags, tag history and alerts."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# MCP tool reference

The MCP server provides ten read-only tools for tag discovery, tag values and history, and alert state.
Refer to [MCP Server](index.md) for how to connect a client, authenticate, and troubleshoot a connection.

None of them acknowledge, unacknowledge, silence, or otherwise change alert or tag state, so those changes are made with the REST Alerts API or the Profinity UI.

A tag or alert the calling user does not have permission to view is omitted from a tool's response and is never reported as an error, so a response that looks smaller than expected on a shared instance usually reflects the caller's own permissions rather than a fault.

## `get_all_components`

The recommended first call, which returns a lightweight list of active component names visible to the caller, for use as the `componentId` argument to other tools.

Parameters: none

Returns: a collection of component name strings

## `search_tags`

Searches the live tag tree by name fragment, unit, meta-type, component, or tag-path prefix, without downloading the full catalogue.
At least one of the filter parameters is required.

| Parameter | Type | Description |
|-----------|------|--------------|
| `query` | optional | Case-insensitive substring match against the tag path, its last segment, and its comment |
| `unit` | optional | Exact unit match, case-insensitive (`V` is not the same as `mV`) |
| `componentId` | optional | Restrict to a component name |
| `tagPrefix` | optional | Restrict to a canonical tag path prefix; takes priority over `componentId` when both are set |
| `metaType` | optional | Restrict to a meta-type, for example `dbc.signal` |
| `sampleLeavesOnly` | optional (default: true) | If true, return only tags that carry a value |
| `includeMetadata` | optional (default: true) | If true, include unit, comment, and scaling metadata on each result |
| `limit` | optional (default: 25) | Maximum results, 1 to 50 |

Returns: `{items, count, limit, truncated}`, where `items` holds one object per matching tag with `fullTagId`, `metaType`, `hasSample` and `isWritable`, plus a `metadata` object when `includeMetadata` is true and the tag has metadata.
`count` is the number of items returned, `limit` is the effective limit after clamping to the 1 to 50 range, and `truncated` is true when more tags matched than the `limit` allowed

## `get_tag_catalog`

Returns the tag catalogue for the active profile, nested by segment or as a paginated flat list.
Use `get_all_components` first, then scope with `componentId` or `tagPrefix`, because an unscoped nested catalogue above roughly 200,000 characters is refused.

| Parameter | Type | Description |
|-----------|------|--------------|
| `flat` | optional (default: false) | If true, return a paginated flat list instead of a nested tree |
| `includeSamples` | optional (default: false) | If true, include each tag's current value where available |
| `includeMetadata` | optional (default: false) | If true, include unit, scaling, and comment metadata |
| `componentId` | optional | Restrict to a component name |
| `tagPrefix` | optional | Restrict to a canonical tag path prefix; takes priority over `componentId` when both are set |
| `pageIndex` | optional | Zero-based page index |
| `pageSize` | optional | Page size, 1 to 500 |
| `sampleLeavesOnly` | optional (default: false) | Flat mode only: keep only tags that carry a value |

Returns: with `flat` true, `{items, totalCount, pageIndex, pageSize}`, where each item is `{fullTagId, metaType, hasSample, isWritable}` plus `sample` when `includeSamples` is true and a value is available, and `metadata` when `includeMetadata` is true and the tag has metadata.
Without `flat`, a tree keyed by path segment whose leaves are the same objects, or the same `{items, totalCount, pageIndex, pageSize}` wrapper when `pageIndex` or `pageSize` is supplied.
A `sample` object holds `utcTimestamp`, `quality`, `reason`, and `value` and `message` when present

## `get_tag_sample_by_canonical_id`

Reads the current value of a single tag by its canonical full tag ID.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagId` | required | Canonical full tag ID, for example `MyBMS/DBC/MessageName/SignalName` |

Returns: an object with `fullTagId`, `utcTimestamp`, `quality`, `reason`, and, only when present, `value`, `message` and a `metadata` object holding any of `unit`, `comment`, `factor` and `offset`.
The `reason` is one of `ok`, `notFound`, `notReadable`, `noValueYet`, `stale` or `error`, so a path that does not exist returns `notFound` rather than nothing.
The result is `null` only when the tag is not visible to the caller

## `get_tag_samples`

Batch-reads current values for up to 50 canonical tag IDs in one call.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagIds` | required | Canonical full tag IDs to read, maximum 50 |

Returns: an array of the same sample objects that `get_tag_sample_by_canonical_id` returns, one per visible requested ID, with blank and duplicate IDs skipped and IDs the caller cannot view omitted

## `get_tag_series`

Returns current or historical values for a single canonical tag ID, using the same range and aggregation rules as `POST /api/v2/TagQuerySet` (refer to [Accessing historical data via APIs](../APIs/index.md#accessing-historical-data-via-apis)).
Omit `start`/`stop` for the current value.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagId` | required | Canonical full tag ID |
| `start` | optional | Start of the range, Flux-style, for example `-1h` |
| `stop` | optional | End of the range, for example `0m`, or omitted for now |
| `aggregationWindow` | optional | Aggregation window, for example `10s`, used only with a time range |
| `aggregationFunction` | optional (default: max) | `max`, `min`, `mean`, `sum`, `count`, `last`, or `first` |

Returns: an object holding a `measurement` (or, when more than one is returned, a `measurements` array).
Each measurement has `tagId`, `label`, `sample`, `dataPoints` and, when known, `unit` and `transmitter`.
`sample` carries `utcTimestamp`, `quality`, `reason`, and `value` and `message` when present, where `reason` is one of `ok`, `stale`, `notFound`, `notReadable`, `notEnabled`, `noValueYet`, `noData`, `budgetExceeded`, `historianUnavailable`, `invalidTimeRange` or `error`.
`dataPoints` is a list of `{time, value}` pairs, which holds the single current value when no `start` or `stop` is given and is empty when the range returned no points.
An ID that is a container rather than a readable tag is rejected with a validation error

## `get_tag_series_batch`

Batch-reads time series for up to 20 canonical tag IDs sharing one time range and aggregation.

| Parameter | Type | Description |
|-----------|------|--------------|
| `fullTagIds` | required | Canonical full tag IDs to read, maximum 20 |
| `start` | optional | Start of the range, Flux-style |
| `stop` | optional | End of the range |
| `aggregationWindow` | optional | Aggregation window, used only with a time range |
| `aggregationFunction` | optional (default: max) | `max`, `min`, `mean`, `sum`, `count`, `last`, or `first` |

Returns: an array with one entry per visible requested ID, in request order, each shaped like the `get_tag_series` result.
An ID that is a container or is not a valid tag returns an entry with an empty `dataPoints` list and a `reason` of `notReadable` or `notFound` instead of an error, and IDs the caller cannot view are omitted

## `get_alert_rules`

Returns the catalogue of defined alert rules, independent of whether any rule is currently active.

| Parameter | Type | Description |
|-----------|------|--------------|
| `componentId` | optional | Restrict to rules scoped under this component |
| `pageIndex` | optional (default: 0) | Zero-based page index |
| `pageSize` | optional (default: 25) | Page size, 1 to 500 |
| `includeDisabled` | optional (default: false) | If true, include disabled rules |

Returns: `{items, totalCount, pageIndex, pageSize}`, where each item has `ruleId`, `ruleName`, `displayName`, `description`, `level`, `enabled`, `relatedTags`, `moreInformation`, `sourceKey`, `tagPathPrefix` and `collectionName`.
Text fields can be null when the rule does not define them, and `pageSize` is the effective size after clamping

## `get_active_alerts`

Returns currently active alerts.

| Parameter | Type | Description |
|-----------|------|--------------|
| `componentId` | optional | Restrict to alerts under this component or tag path prefix |
| `tagPrefix` | optional | Restrict to alerts whose tag path starts with this prefix |
| `unacknowledgedOnly` | optional (default: false) | If true, return only unacknowledged alerts |
| `level` | optional | Restrict to a severity level, for example `Warning` or `Error` |

Returns: `{items, activeTagIds, componentNames}`, where `items` lists the active alerts and the other two are sorted lists of the tag paths and component names those alerts belong to.
Each alert has `ruleId`, `ruleName`, `displayName`, `description`, `moreInformation`, `relatedTags`, `level`, `message`, `tagId`, `componentName`, `isActive`, `utcTimestamp`, `transition`, `isAcknowledged`, `acknowledgedBy`, `silencedUntilUtc` and `isSilenced`

## `get_alert_history`

Returns a page of past alert state transitions (raised, cleared, acknowledged, silenced), newest first.

| Parameter | Type | Description |
|-----------|------|--------------|
| `componentId` | optional | Restrict to alerts under this component or tag path prefix |
| `tagPrefix` | optional | Restrict to alerts whose tag path starts with this prefix |
| `pageIndex` | optional (default: 0) | Zero-based page index |
| `pageSize` | optional (default: 25) | Page size, 1 to 500 |
| `compact` | optional (default: false) | If true, return rule definitions once with slim event rows, rather than repeating rule fields on every row |
| `level` | optional | Restrict to a severity level |
| `fromUtc` | optional | Inclusive UTC lower bound |
| `toUtc` | optional | Inclusive UTC upper bound |

Returns: `{items, totalCount, pageIndex, pageSize}`, where each item has the same alert fields as `get_active_alerts` and `transition` records the state change.
With `compact` true the result is `{ruleDefinitions, events, totalCount, pageIndex, pageSize}` instead, where `ruleDefinitions` is keyed by `ruleId` and holds `ruleId`, `ruleName` and, when present, `displayName`, `description`, `moreInformation` and `message`, and each event holds only `ruleId`, `tagId`, `isActive`, `isAcknowledged`, `isSilenced` and, when present, `componentName`, `utcTimestamp` and `transition`
