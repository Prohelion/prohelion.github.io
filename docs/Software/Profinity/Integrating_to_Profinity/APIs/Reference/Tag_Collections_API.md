---
title: Tag collections API
description: "Look up the REST API endpoints that read, save, delete, and report on tag collections, with the permission and query fields each one takes."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Tag collections API

The Tag collections API, the TagCollections group in Swagger, reads, checks, saves, and deletes the [tag collections](../../../Tags/Collections/index.md) of the active profile.
Its endpoints match the **COLLECTIONS** editor under **TAG UTILITIES**.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

References, Report, Members, and the delete need a loaded profile, and return `400` with "Unable to access active profile." when none is loaded.
With no profile loaded, Tree returns only the built-in **(All Tags)** collection, and Catalog returns it when the caller can see it.

`{collectionId}` is the collection's identifier, which stays the same when the collection is renamed.
The built-in **(All Tags)** collection has the identifier `All`. It is read-only: reads include it, and a save or delete cannot change it.

## Collections document

These endpoints read or save the whole collections document, with JSON request and response bodies, and delete one collection.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Collections` | **View tag collections** | Reads the collections document. |
| PUT | `/api/v2/Tags/Collections` | **Modify tag collections** | Saves the collections document. |
| DELETE | `/api/v2/Tags/Collections/{collectionId}` | **Modify tag collections** | Deletes a collection. |

Profinity refuses a delete of `All` with "Built-in collection 'All' cannot be deleted.", even with no profile loaded.
It refuses a delete of a collection that any rule, rule inside a group, or group scope uses with "Cannot delete collection '…' because it is referenced by one or more rules files.", unless the request sets `unlink` to `true`.
With `unlink` set, Profinity first removes the collection from the scope of each rule set, group, and rule that names it, and then deletes it.
Profinity keeps each file that the delete replaces as `<file>.bak`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `unlink` | Boolean, query | `false` | DELETE only. When `true`, removes the collection from the rules, groups, and rule sets that use it before the delete. |

A save replaces the whole collections document, so Profinity deletes any collection that the body leaves out.
A save that leaves out a collection a rule uses returns `400` with the reason.
To add a collection to the ones you have, read the document with GET first, remove the read-only entry whose `id` is `All`, and add the new collection to its `collections` list.
A save that still holds the `All` entry returns `400` with "Collection id 'All' is reserved."

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

Replace `<token>` with a Bearer token for a user with the **Modify tag collections** permission, and `<component>` with the name of the pump's component, such as `Pump1`.
The `scope` limits the collection to the tags beneath that component, and the `expression` keeps the tags whose name contains `Temp`, as described in [Tag expressions](../../../Tags/Selecting_Tags/Tag_Expressions.md).
The response confirms the save:

```json
{
  "message": "Collections successfully saved"
}
```

The save worked when the response holds this message and `GET /api/v2/Tags/Collections/pump-temperatures/Members` lists the pump's temperature tags.

## Collection trees and reports

These endpoints return the collections as a tree, list the tags in a collection, and report on the collections and the rules that use them.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Collections/Tree` | **View tag collections** | Returns every group and collection as a tree, starting with the built-in **(All Tags)** collection. |
| GET | `/api/v2/Tags/Collections/Catalog` | **View tags** | Returns the groups and collections that the caller can see, as a tree. |
| GET | `/api/v2/Tags/Collections/{collectionId}/Members` | **View tags** | Lists the full paths of the tags in a collection that the caller can see. |
| GET | `/api/v2/Tags/Collections/References` | **View tag collections** | Lists the rules whose scope uses a collection. |
| GET | `/api/v2/Tags/Collections/Report` | **View tag collections** | Lists the collections that the editor marks **Invalid**, with the reason for each. |

In the Tree and Catalog responses, `tree` is a list of nodes with a `kind` of `group` or `collection`.
A collection node has an `id` and a `displayName`, and a group node has a `name`, a `displayName`, and `children`.
The Tree response also holds each collection's `security` policy when the caller has the **Security administration** permission.

Members returns `collectionId`, `fullTagIds`, and `matchCount`, and returns `404` for a collection that the caller cannot see.
References lists the rules that the [Tag rules API](Tag_Rules_API.md) reads and saves.
To check a collection membership expression before you save it, refer to the [Tag expressions API](Tag_Expressions_API.md).

The Report endpoint returns `items`, a list in which each entry has the `id` of the invalid collection, its `path` in the document, and the `reason`, as described in [When a configuration file is invalid](../../../Administration/System_Configuration/Invalid_Configuration_Files.md#rules-collections-and-derived-tags).
It returns `409` when the collections file cannot be read.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `collectionKey` | Text, query | None | References only. The identifier of the collection. An empty value returns empty lists. |
