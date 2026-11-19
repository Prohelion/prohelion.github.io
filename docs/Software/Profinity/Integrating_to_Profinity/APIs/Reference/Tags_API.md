---
title: Tags API
description: "Look up the REST API endpoints that return the tag tree, as nested JSON or a paged flat list, and the latest sample of one tag."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Tags API

The Tags API, the Tags group in Swagger, returns the tag tree and the latest sample of one tag.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

To read the latest value of a set of tags, or a window of values with aggregation, refer to [Read real-time and historical tag data](../Read_Tag_Data.md).
`GET /api/v2/Tags` returns the tag tree that **TAG EXPLORER** shows, from the root.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags` | **View tags** | Returns the tag tree as nested JSON, or as a paged flat list of tags. |
| GET | `/api/v2/Tags/Sample/{fullTagPath}` | **View tags** | Returns the latest sample of one tag. Refer to [Read the latest value of one item](../Read_Tag_Data.md#read-the-latest-value-of-one-item). |

The nested form is an object with one key for each segment of the [tag path](../../../Tags/Selecting_Tags/Tag_Tree_Path.md).
Each tag in it, and each entry in the flat form, has `fullTagId`, `metaType`, `hasSample`, which is `true` for a tag that has a value to read, and `isWritable`.
The flat form returns `items`, `totalCount`, `pageIndex`, and `pageSize`.

Both forms hold only the tags on components that [component security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) lets the caller see.
Each query field applies to `GET /api/v2/Tags` only.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `flat` | Boolean, query | `false` | When `true`, returns a paged flat list of tags in place of the nested tree. |
| `samples` | Boolean, query | `false` | When `true`, adds a `sample` object with the latest value to each tag that has one. |
| `includeMetadata` | Boolean, query | `false` | When `true`, adds a `metadata` object with each tag's metadata, such as its unit. |
| `includeMeta` | Boolean, query | `false` | When `true`, includes the `meta` branch beneath each tag, which presents the tag's metadata as tags. |
| `componentId` | Text, query | None | Limits the tree to one component, by name. |
| `tagPrefix` | Text, query | None | Limits the tree to the tags beneath this path. When the request sets both, Profinity uses `tagPrefix`. |
| `pageIndex` | Integer, query | `0` | Flat list only. The page to return, counted from 0. |
| `pageSize` | Integer, query | `25` | Flat list only. The number of tags on a page, from 1 to 500. Profinity changes a value outside that range to the nearest limit. |
| `sampleLeavesOnly` | Boolean, query | `false` | Flat list only. When `true`, keeps only the tags whose `hasSample` is `true`. |
