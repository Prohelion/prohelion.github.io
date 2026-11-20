---
title: Tag collections API
description: "Look up the REST API endpoints that read, save, and delete tag collections, with the permission and query fields each one takes."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Tag collections API

The Tag collections API, the TagCollections group in Swagger, reads, saves, and deletes the [tag collections](../../../../Tags/Collections/index.md) of the active profile.
Its endpoints match the **COLLECTIONS** editor under **TAG UTILITIES**.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

`{collectionId}` is the collection's identifier, which stays the same when the collection is renamed.
The built-in **(All Tags)** collection has the identifier `All`.
It is read-only: reads include it, and a save or delete cannot change it.

## Collections document

These endpoints read or save the whole collections document, with JSON request and response bodies, and delete one collection.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Collections` | **View tag collections** | Reads the collections document. |
| PUT | `/api/v2/Tags/Collections` | **Modify tag collections** | Saves the collections document. |
| DELETE | `/api/v2/Tags/Collections/{collectionId}` | **Modify tag collections** | Deletes a collection. |

### `GET /api/v2/Tags/Collections`

Reads the collections document of the active profile.
The response lists the built-in **(All Tags)** collection first, followed by the collections and groups in the profile, with `200`.
A profile with no collections file returns the built-in collection alone.
It needs the **View tag collections** permission.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Collections
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Get -Uri http://localhost:18080/api/v2/Tags/Collections -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **View tag collections**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON document with a `collections` list.

`GET /api/v2/Tags/Collections` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `409` with the reason the file cannot be read | The collections file on disk cannot be read, and an empty document here could invite a save over the access settings it holds. | Fix the file on disk, or upload a corrected collections file. Nothing was changed. |

### `PUT /api/v2/Tags/Collections`

Saves the collections document of the active profile, and reloads the rules that use it.
It needs the **Modify tag collections** permission, and returns `200` with `{ "message": "Collections successfully saved" }`.

A save replaces the whole collections document, so Profinity deletes any collection that the body leaves out.
A save keeps the access settings that each collection already holds, whatever the body says.
To add a collection to the ones you have, read the document with `GET /api/v2/Tags/Collections` first, remove the read-only entry whose `id` is `All`, and add the new collection to its `collections` list.
Profinity keeps the file that a save replaces as `<file>.bak`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `version` | Text | None | The document version, such as `2.3`. |
| `collections` | List | None | The collections and groups to keep. A save deletes any collection left out. |

To save a document that holds one collection of the temperature tags on a pump, send this request:

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/Tags/Collections \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"version": "2.3", "collections": [{"collection": {"id": "pump-temperatures", "displayName": "Pump temperatures", "scope": "<component>", "expression": "tag.MatchesName(\"*Temp*\")"}}]}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/Tags/Collections -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"version": "2.3", "collections": [{"collection": {"id": "pump-temperatures", "displayName": "Pump temperatures", "scope": "<component>", "expression": "tag.MatchesName(\"*Temp*\")"}}]}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<token>` with a token from a user who has **Modify tag collections**.
- `<component>` with the name of the pump's component, such as `Pump1`.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The `scope` limits the collection to the tags beneath that component, and the `expression` keeps the tags whose name contains `Temp`, as described in [Tag expressions](../../../../Tags/Selecting_Tags/Tag_Expressions.md).
The response confirms the save:

```json
{
  "message": "Collections successfully saved"
}
```

The save worked when the response holds this message and `GET /api/v2/Tags/Collections/pump-temperatures/Members` lists the pump's temperature tags.

`PUT /api/v2/Tags/Collections` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You must provide a collections payload." or "Collections payload could not be parsed." | The body is missing, is not JSON, or is not a collections document. | Send the collections document as JSON, in the shape that `GET /api/v2/Tags/Collections` returns. |
| `400` with "Collection id 'All' is reserved." | The body still holds the built-in `All` entry, or another collection that uses that identifier. | Remove that entry, and give any other collection its own identifier. |
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with the reason | The document fails a check, for example it leaves out a collection that a rule uses. Nothing is saved. | Correct the part the message names, or put the collection back. |
| `409` with the reason the file cannot be read | The collections file on disk cannot be read, and a save would replace it along with the access settings it holds. | Fix the file on disk, or upload a corrected collections file. Nothing was changed. |

### `DELETE /api/v2/Tags/Collections/{collectionId}`

Deletes one collection from the active profile.
It needs the **Modify tag collections** permission, and returns `200` with `{ "message": "Collection '<collectionId>' deleted." }`.

Profinity refuses a delete of a collection that any rule, rule inside a group, or group scope uses, unless the request sets `unlink` to `true`.
With `unlink` set, Profinity first removes the collection from the scope of each rule set, group, and rule that names it, and then deletes it.
Profinity keeps each file that the delete replaces as `<file>.bak`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `unlink` | Boolean, query | `false` | When `true`, removes the collection from the rules, groups, and rule sets that use it before the delete. |

=== "macOS or Linux"

    ```bash
    curl -X DELETE "http://localhost:18080/api/v2/Tags/Collections/<collectionId>?unlink=true" \
      -H "Authorization: Bearer <token>"
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Delete -Uri http://localhost:18080/api/v2/Tags/Collections/<collectionId>?unlink=true -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<collectionId>` with the identifier of the collection, such as `pump-temperatures`.
- `<token>` with a token from a user who has **Modify tag collections**.

Leave out `?unlink=true` to refuse the delete when a rule uses the collection.
Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The delete worked when the response is `{ "message": "Collection 'pump-temperatures' deleted." }`.

`DELETE /api/v2/Tags/Collections/{collectionId}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Built-in collection 'All' cannot be deleted." | The identifier is `All`, which is the built-in collection. Profinity refuses this even with no profile loaded. | Leave the built-in collection in place. |
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "Cannot delete collection '…' because it is referenced by one or more rules files." | A rule, rule inside a group, or group scope uses the collection, and `unlink` is not `true`. | Remove the collection from those rules, or repeat the request with `unlink=true`. |
| `400` with "Collection '…' was not found." | The profile holds no collection with that identifier. | Check the identifier against `GET /api/v2/Tags/Collections`. |
| `400` with "Collections file not found" and the file name, or the reason the file cannot be read | The profile has no collections file, or the file cannot be read. | Save a collections document first, or fix the file on disk. |

## Collection catalogue and members

These endpoints list the collections that the caller can see and the tags in a collection.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Collections/Catalog` | **View tags** | Returns the groups and collections that the caller can see, as a tree. |
| GET | `/api/v2/Tags/Collections/{collectionId}/Members` | **View tags** | Lists the full paths of the tags in a collection that the caller can see. |

### `GET /api/v2/Tags/Collections/Catalog`

Returns the groups and collections that the caller can see, as a tree, with `200`.
It needs the **View tags** permission.
With no profile loaded, it returns only the built-in **(All Tags)** collection, when the caller can see it.

In the response, `tree` is a list of nodes with a `kind` of `group` or `collection`.
A collection node has an `id` and a `displayName`, and a group node has a `name`, a `displayName`, and `children`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Collections/Catalog
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Get -Uri http://localhost:18080/api/v2/Tags/Collections/Catalog -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **View tags**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON document with a `tree` list.

This endpoint has no errors of its own beyond sign-in and permission.

### `GET /api/v2/Tags/Collections/{collectionId}/Members`

Lists the full paths of the tags in a collection that the caller can see.
It needs the **View tags** permission, and returns `200` with `collectionId`, `fullTagIds`, and `matchCount`.
Tags hidden from the caller are neither counted nor returned.
To check a collection membership expression before you save it, refer to the [Tag expressions API](Tag_Expressions_API.md).

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Collections/<collectionId>/Members
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Get -Uri http://localhost:18080/api/v2/Tags/Collections/<collectionId>/Members -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<collectionId>` with the identifier of the collection, such as `pump-temperatures`.
- `<token>` with a token from a user who has **View tags**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The response lists the tags, for example:

```json
{
  "collectionId": "pump-temperatures",
  "fullTagIds": [
    "Pump1/DBC/Status/MotorTemp",
    "Pump1/DBC/Status/BearingTemp"
  ],
  "matchCount": 2
}
```

`GET /api/v2/Tags/Collections/{collectionId}/Members` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "Active tag tree is not available." | The profile is loaded but its tag tree is not available. | Wait for the profile to finish loading, then repeat the request. |
| `400` with the reason | The collection's scope or expression fails, or it matches more tags than Profinity allows. | Correct the collection, checking its expression with the [Tag expressions API](Tag_Expressions_API.md). |
| `404` | The caller cannot see the collection, or the profile has no collection with that identifier. | Check the identifier against `GET /api/v2/Tags/Collections/Catalog`. |
