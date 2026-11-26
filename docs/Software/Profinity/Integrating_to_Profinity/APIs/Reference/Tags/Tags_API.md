---
title: Tags API
description: "Look up the REST API endpoints that return the tag tree, as nested JSON or a paged flat list, and the latest sample of one tag."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Tags API

The Tags API, the Tags group in Swagger, returns the tag tree and the latest sample of one tag.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

To read the latest value of a set of tags, or a window of values with aggregation, refer to [Read real-time and historical tag data](../../Read_Tag_Data.md).

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Tags` | **View tags** | Returns the tag tree as nested JSON, or as a paged flat list of tags. |
| GET | `/api/v2/Tags/Sample/{fullTagPath}` | **View tags** | Returns the latest sample of one tag. Refer to [Read the latest value of one item](../../Read_Tag_Data.md#read-the-latest-value-of-one-item). |

## Tag tree

`GET /api/v2/Tags` returns the tag tree that **TAG EXPLORER** shows, from the root.

The nested form is an object with one key for each segment of the [tag path](../../../../Tags/Selecting_Tags/Tag_Paths.md).
Each tag in it, and each entry in the flat form, has `fullTagId`, `metaType`, `hasSample`, which is `true` for a tag that has a value to read, and `isWritable`.
The flat form returns `items`, `totalCount`, `pageIndex`, and `pageSize`, and lists branch tags such as component roots as well as tags that hold a value.

Both forms hold only the tags on components that [component security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) lets the caller see.

### `GET /api/v2/Tags`

Returns the tag tree, as nested JSON by default or as a paged flat list when `flat` is `true`.
It needs the **View tags** permission, and returns `200`.
Each field below is a query value.

| Field | Type | Default | Effect |
|---|---|---|---|
| `flat` | Boolean, query | `false` | When `true`, returns a paged flat list of tags in place of the nested tree. |
| `samples` | Boolean, query | `false` | When `true`, adds a `sample` object with the latest value to each tag that has one. |
| `includeMetadata` | Boolean, query | `false` | When `true`, adds a `metadata` object with each tag's metadata, such as its unit. |
| `includeMeta` | Boolean, query | `false` | When `true`, includes the `meta` branch beneath each tag, which presents the tag's metadata as tags. |
| `componentId` | Text, query | None | Limits the tree to one component, by name. |
| `tagPrefix` | Text, query | None | Limits the tree to the tags beneath this path. When the request sets both, Profinity uses `tagPrefix`. |
| `pageIndex` | Integer, query | `0` | Flat list only. The page to return, counted from 0. |
| `pageSize` | Integer, query | `25` | Flat list only. The number of tags on a page, from 1 to 500. Profinity changes a value outside that range to the nearest limit. |
| `sampleLeavesOnly` | Boolean, query | `false` | Flat list only. When `true`, keeps only the tags whose `hasSample` is `true`. |

To list the tags of one pump as a flat list, send this request:

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" "http://localhost:18080/api/v2/Tags?flat=true&componentId=<component>"
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri "http://localhost:18080/api/v2/Tags?flat=true&componentId=<component>" -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component>` with the component's name, such as `Pump1`.
- `<token>` with a Bearer token for a user with the **View tags** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON object with `items`, `totalCount`, `pageIndex`, and `pageSize`.
This is the shape, shortened to one tag:

```json
{
  "items": [
    {
      "fullTagId": "Pump1/DBC/Status/MotorTemp",
      "metaType": "dbc.signal",
      "hasSample": true,
      "isWritable": false
    }
  ],
  "totalCount": 1,
  "pageIndex": 0,
  "pageSize": 25
}
```

Leave out `flat` to get the nested form, where the same tag sits at `Pump1`, then `DBC`, then `Status`, then `MotorTemp`.

This endpoint has no errors of its own beyond sign-in and permission.

## Latest sample of one tag

### `GET /api/v2/Tags/Sample/{fullTagPath}`

Returns the latest sample of one tag.
It needs the **View tags** permission, and returns `200` with `fullTagId`, `utcTimestamp`, `quality`, and `reason`, and `value` and `message` where the tag has them.
`quality` is `Good` or `Stale`.
`{fullTagPath}` is the full [tag path](../../../../Tags/Selecting_Tags/Tag_Paths.md), written in the address with its slashes.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Sample/<tag path>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Tags/Sample/<tag path> -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<tag path>` with the full path of the tag, such as `Pump1/DBC/Status/MotorTemp`.
- `<token>` with a Bearer token for a user with the **View tags** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has the tag's `value` and `utcTimestamp`, such as this:

```json
{
  "fullTagId": "Pump1/DBC/Status/MotorTemp",
  "utcTimestamp": "2026-11-20T01:00:00.0000000Z",
  "quality": "Good",
  "reason": "ok",
  "value": 61.5
}
```

`GET /api/v2/Tags/Sample/{fullTagPath}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The address ends after `Sample` with no tag path. | Add the full path of the tag after `Sample/`. |
| `404` | No tag has that path, the tag has no value yet, its latest sample is not `Good` or `Stale`, or [component security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) hides it from the user. | Check the path against `GET /api/v2/Tags`, and that the user can see the component. |
