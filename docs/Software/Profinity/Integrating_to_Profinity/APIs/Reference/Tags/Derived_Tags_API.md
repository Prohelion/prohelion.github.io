---
title: Derived tags API
description: "Look up the REST API endpoints that read, save, and check derived tags, with the permission each one needs."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Derived tags API

The Derived tags API, the DerivedTags group in Swagger, reads, checks, and saves the [derived tags](../../../../Tags/Derived_Tags/index.md) of the active profile.
Its endpoints match the **DERIVED TAGS** editor under **TAG UTILITIES**.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

## Derived tags document

These endpoints read or save the whole derived tags document, with JSON request and response bodies, and check a derived tag formula.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/DerivedTags` | **View tag collections** | Reads the derived tags document. |
| PUT | `/api/v2/Tags/DerivedTags` | **Modify tag collections** | Saves the derived tags document. |
| POST | `/api/v2/Tags/DerivedTags/Validate` | **View tag collections** | Checks whether a derived tag formula compiles against the aliases it uses. |

### `GET /api/v2/Tags/DerivedTags`

Reads the derived tags document of the active profile.
A profile with no derived tags file returns an empty document.
It needs the **View tag collections** permission, and returns `200` with the document.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/DerivedTags
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Get -Uri http://localhost:18080/api/v2/Tags/DerivedTags -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **View tag collections**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON document.

`GET /api/v2/Tags/DerivedTags` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "Existing derived tags file is invalid" and the reason | The profile's derived tags file exists but cannot be read. | Fix the file on disk. |

### `PUT /api/v2/Tags/DerivedTags`

Saves the derived tags document of the active profile, and adds the derived tags to the tag tree without reloading the profile.
The first save creates `derived_tags.yaml` and names it in the profile.
It needs the **Modify tag collections** permission, and returns `200` with `{ "message": "Derived tags successfully saved" }`.

A save replaces the whole document, checks it against the live tag tree, and saves nothing when a check fails.
The checks cover the tree shape, that each identifier and mount path is unique, that every dependency exists, and that each formula compiles.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| Request body | JSON | None | The whole derived tags document, in the shape that `GET /api/v2/Tags/DerivedTags` returns. A save replaces the file. |

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/Tags/DerivedTags \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d @<derived-tags-file>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/Tags/DerivedTags -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -InFile <derived-tags-file>
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<derived-tags-file>` with the path of a file that holds the derived tags document as JSON.
- `<token>` with a token from a user who has **Modify tag collections**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The save worked when the response is `{ "message": "Derived tags successfully saved" }`.

`PUT /api/v2/Tags/DerivedTags` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You must provide a derived tags payload." or "Derived tags payload could not be parsed." | The body is missing, is not JSON, or is not a derived tags document. | Send the derived tags document as JSON, in the shape that `GET /api/v2/Tags/DerivedTags` returns. |
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "Active tag tree is not available." | The profile is loaded but its tag tree is not available. | Wait for the profile to finish loading, then repeat the request. |
| `400` with the reason | The document fails a check, such as a dependency that does not exist or a formula that does not compile. Nothing is saved. | Correct the part the message names, checking formulas with `POST /api/v2/Tags/DerivedTags/Validate`. |
| `400` with "Failed to update profile metadata for derived tags save." | The first save wrote the derived tags file but could not name it in the profile. | Save again. |

### `POST /api/v2/Tags/DerivedTags/Validate`

Checks whether a derived tag formula compiles against the aliases it uses.
It works with or without a loaded profile, and needs the **View tag collections** permission.
It returns `200` with `{ "valid": true }` when the formula compiles, or `{ "valid": false, "errorMessage": "…" }` with the reason when it does not.
To check a collection or rule expression instead of a derived tag formula, use the [Tag expressions API](Tag_Expressions_API.md).

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `expression` | Text | None | The formula to check, such as `a.Value * 1.60934`. |
| `aliases` | List of text | None | The alias names of the derived tag's dependencies, such as `a` and `b`. |

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Tags/DerivedTags/Validate \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"expression": "a.Value * 1.60934", "aliases": ["a"]}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Tags/DerivedTags/Validate -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"expression": "a.Value * 1.60934", "aliases": ["a"]}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **View tag collections**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The formula compiles when the response is:

```json
{
  "valid": true
}
```

A formula that does not compile returns `200` too, with `valid` set to `false` and the reason in `errorMessage`.

`POST /api/v2/Tags/DerivedTags/Validate` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Expression is required." | The request has no body. | Send a body with `expression`, and `aliases` when the formula uses them. |
