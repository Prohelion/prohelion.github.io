---
title: MCP tool reference
description: "Look up the parameters and return values of the ten read-only tools the Profinity MCP server provides for tags, tag history and alerts."
type: reference
owner: Documentation
last_reviewed: 2026-10-27
---

# MCP tool reference

The Model Context Protocol (MCP) server provides ten read-only tools for tag discovery, tag values and history, and alert state.
Refer to [MCP Server](index.md) for what the server is, and to [Prepare Profinity for an MCP client](Prepare_Profinity.md) for the connection, the token, and the certificate.
In the permission list returned at sign-in, **MCP integration**, **View tags**, and **View alerts** appear as `McpView`, `TagView`, and `AlertsView`.

None of the tools acknowledge, unacknowledge, silence, or otherwise change alert or tag state.
Make those changes with the REST Alerts API or the Profinity UI.

A tag or alert the calling user does not have permission to view is omitted from a tool's response and is never reported as an error.
A response that looks smaller than expected on a shared instance usually reflects the caller's own permissions rather than a fault.

## Scope parameters

`search_tags` and `get_tag_catalog` accept both `componentId` and `tagPrefix` to narrow a result.
When both are set, `tagPrefix` takes priority over `componentId`.

## `get_all_components`

The recommended first call.
It returns a lightweight list of active component names visible to the caller, for use as the `componentId` argument to other tools.

Parameters: none.

Returns: a collection of component name strings.

## `search_tags`

Searches the live tag tree by name fragment, unit, meta-type, component, or tag-path prefix, without downloading the full catalogue.
At least one of the filter parameters is required.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `query` | string | No | None | Case-insensitive substring match against the tag path, its last segment, and its comment |
| `unit` | string | No | None | Exact unit match, case-insensitive (`V` is not the same as `mV`) |
| `componentId` | string | No | None | Restrict to a component name. Refer to [Scope parameters](#scope-parameters) |
| `tagPrefix` | string | No | None | Restrict to a canonical tag path prefix. Refer to [Scope parameters](#scope-parameters) |
| `metaType` | string | No | None | Restrict to a meta-type, for example `dbc.signal` |
| `sampleLeavesOnly` | boolean | No | `true` | If true, return only tags that carry a value |
| `includeMetadata` | boolean | No | `true` | If true, include unit, comment, and scaling metadata on each result |
| `limit` | integer | No | 25 | Maximum results, 1 to 50 |

Returns: `{items, count, limit, truncated}`.

- `items` holds one object per matching tag, with `fullTagId`, `metaType`, `hasSample` and `isWritable`.
  Each object also has a `metadata` object when `includeMetadata` is true and the tag has metadata.
- `count` is the number of items returned.
- `limit` is the effective limit after clamping to the 1 to 50 range.
- `truncated` is true when more tags matched than `limit` allowed.

## `get_tag_catalog`

Returns the tag catalogue for the active profile, nested by segment or as a paginated flat list.
Call `get_all_components` first, then scope with `componentId` or `tagPrefix`.
An unscoped nested catalogue of more than roughly 200,000 characters is refused.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `flat` | boolean | No | `false` | If true, return a paginated flat list instead of a nested tree |
| `includeSamples` | boolean | No | `false` | If true, include each tag's current value where available |
| `includeMetadata` | boolean | No | `false` | If true, include unit, scaling, and comment metadata |
| `componentId` | string | No | None | Restrict to a component name. Refer to [Scope parameters](#scope-parameters) |
| `tagPrefix` | string | No | None | Restrict to a canonical tag path prefix. Refer to [Scope parameters](#scope-parameters) |
| `pageIndex` | integer | No | 0 in flat mode | Zero-based page index |
| `pageSize` | integer | No | 25 in flat mode | Page size, 1 to 500 |
| `sampleLeavesOnly` | boolean | No | `false` | Flat mode only: keep only tags that carry a value |

Returns: with `flat` true, `{items, totalCount, pageIndex, pageSize}`.
Each item is `{fullTagId, metaType, hasSample, isWritable}`, plus `sample` when `includeSamples` is true and a value is available, and `metadata` when `includeMetadata` is true and the tag has metadata.

Without `flat`, the result is a tree keyed by path segment, whose leaves are the same objects.
When `pageIndex` or `pageSize` is supplied, the result is the same `{items, totalCount, pageIndex, pageSize}` wrapper instead.

A `sample` object holds `utcTimestamp`, `quality`, `reason`, and `value` and `message` when present.

## `get_tag_sample_by_canonical_id`

Reads the current value of a single tag by its canonical full tag ID.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fullTagId` | string | Yes | None | Canonical full tag ID, for example `MyBMS/DBC/MessageName/SignalName` |

Returns: an object with `fullTagId`, `utcTimestamp`, `quality`, `reason`, and, only when present, `value`, `message` and a `metadata` object holding any of `unit`, `comment`, `factor` and `offset`.
The `reason` is one of `ok`, `notFound`, `notReadable`, `noValueYet`, `stale` or `error`, so a path that does not exist returns `notFound` rather than nothing.
The result is `null` only when the tag is not visible to the caller.

## `get_tag_samples`

Batch-reads current values for up to 50 canonical tag IDs in one call.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fullTagIds` | array of strings | Yes | None | Canonical full tag IDs to read, maximum 50 |

Returns: an array of the same sample objects that `get_tag_sample_by_canonical_id` returns, one per visible requested ID.
Blank and duplicate IDs are skipped, and IDs the caller cannot view are omitted.

## `get_tag_series`

Returns current or historical values for a single canonical tag ID, using the same range and aggregation rules as `POST /api/v2/TagQuerySet` (refer to [Read real-time and historical tag data](../APIs/Read_Tag_Data.md)).
Omit `start` and `stop` for the current value.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fullTagId` | string | Yes | None | Canonical full tag ID |
| `start` | string | No | None | Start of the range, as a relative time such as `-1h` (one hour before now) |
| `stop` | string | No | None | End of the range, such as `0m` (now). Omit for now |
| `aggregationWindow` | string | No | None | Aggregation window, for example `10s`. Used only with a time range |
| `aggregationFunction` | string | No | `max` | `max`, `min`, `mean`, `sum`, `count`, `last`, or `first` |

Returns: an object holding a `measurement` or, when more than one is returned, a `measurements` array.
Each measurement has `tagId`, `label`, `sample`, `dataPoints` and, when known, `unit` and `transmitter`.

- `sample` carries `utcTimestamp`, `quality`, `reason`, and `value` and `message` when present.
  The `reason` is one of `ok`, `stale`, `notFound`, `notReadable`, `notEnabled`, `noValueYet`, `noData`, `budgetExceeded`, `historianUnavailable`, `invalidTimeRange` or `error`.
- `dataPoints` is a list of `{time, value}` pairs.
  It holds the single current value when no `start` or `stop` is given, and is empty when the range returned no points.

An ID that is a container rather than a readable tag is rejected with a validation error.

## `get_tag_series_batch`

Batch-reads time series for up to 20 canonical tag IDs sharing one time range and aggregation.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `fullTagIds` | array of strings | Yes | None | Canonical full tag IDs to read, maximum 20 |
| `start` | string | No | None | Start of the range, as a relative time such as `-1h` (one hour before now) |
| `stop` | string | No | None | End of the range, such as `0m` (now). Omit for now |
| `aggregationWindow` | string | No | None | Aggregation window, for example `10s`. Used only with a time range |
| `aggregationFunction` | string | No | `max` | `max`, `min`, `mean`, `sum`, `count`, `last`, or `first` |

Returns: an array with one entry per visible requested ID, in request order, each shaped like the `get_tag_series` result.
An ID that is a container or is not a valid tag does not return an error.
It returns an entry with an empty `dataPoints` list and a `reason` of `notReadable` or `notFound`.
IDs the caller cannot view are omitted.

## `get_alert_rules`

Returns the catalogue of defined alert rules, independent of whether any rule is currently active.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `componentId` | string | No | None | Restrict to rules scoped under this component |
| `pageIndex` | integer | No | 0 | Zero-based page index |
| `pageSize` | integer | No | 25 | Page size, 1 to 500 |
| `includeDisabled` | boolean | No | `false` | If true, include disabled rules |

Returns: `{items, totalCount, pageIndex, pageSize}`, where each item has `ruleId`, `ruleName`, `displayName`, `description`, `level`, `enabled`, `relatedTags`, `moreInformation`, `sourceKey`, `tagPathPrefix` and `collectionName`.
Text fields can be null when the rule does not define them, and `pageSize` is the effective size after clamping.

## `get_active_alerts`

Returns currently active alerts.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `componentId` | string | No | None | Restrict to alerts under this component or tag path prefix |
| `tagPrefix` | string | No | None | Restrict to alerts whose tag path starts with this prefix |
| `unacknowledgedOnly` | boolean | No | `false` | If true, return only unacknowledged alerts |
| `level` | string | No | None | Restrict to a severity level, for example `Warning` or `Error` |

Returns: `{items, activeTagIds, componentNames}`.
`items` lists the active alerts, and the other two are sorted lists of the tag paths and component names those alerts belong to.
Each alert has `ruleId`, `ruleName`, `displayName`, `description`, `moreInformation`, `relatedTags`, `level`, `message`, `tagId`, `componentName`, `isActive`, `utcTimestamp`, `transition`, `isAcknowledged`, `acknowledgedBy`, `silencedUntilUtc` and `isSilenced`.

## `get_alert_history`

Returns a page of past alert state transitions (raised, cleared, acknowledged, silenced), newest first.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `componentId` | string | No | None | Restrict to alerts under this component or tag path prefix |
| `tagPrefix` | string | No | None | Restrict to alerts whose tag path starts with this prefix |
| `pageIndex` | integer | No | 0 | Zero-based page index |
| `pageSize` | integer | No | 25 | Page size, 1 to 500 |
| `compact` | boolean | No | `false` | If true, return rule definitions once with slim event rows, rather than repeating rule fields on every row |
| `level` | string | No | None | Restrict to a severity level |
| `fromUtc` | string (ISO 8601 date and time) | No | None | Inclusive UTC lower bound |
| `toUtc` | string (ISO 8601 date and time) | No | None | Inclusive UTC upper bound |

Returns: `{items, totalCount, pageIndex, pageSize}`, where each item has the same alert fields as `get_active_alerts` and `transition` records the state change.

With `compact` true the result is `{ruleDefinitions, events, totalCount, pageIndex, pageSize}` instead.

- `ruleDefinitions` is keyed by `ruleId` and holds `ruleId`, `ruleName` and, when present, `displayName`, `description`, `moreInformation` and `message`.
- Each event holds only `ruleId`, `tagId`, `isActive`, `isAcknowledged`, `isSilenced` and, when present, `componentName`, `utcTimestamp` and `transition`.
