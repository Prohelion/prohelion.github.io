---
title: Tag expressions API
description: "Look up the REST API endpoints that check a tag expression and preview the tags it matches, with the permission, fields, and limits."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Tag expressions API

The Tag expressions API, the TagExpressions group in Swagger, checks a [tag expression](../../../../Tags/Selecting_Tags/Tag_Expressions.md) and shows the tags it matches.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

The collections and rules editors use this API for the expressions saved through the [Tag collections API](Tag_Collections_API.md) and the [Tag rules API](Tag_Rules_API.md).
To check a derived tag formula, use Validate in the [Derived tags API](Derived_Tags_API.md) instead.

## Expression checks

These endpoints check whether an expression compiles and list the tags a collection expression matches.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/Tags/Expressions/Validate` | **View tag rules** | Checks whether a collection or rule expression compiles. |
| POST | `/api/v2/Tags/Expressions/Preview` | **View tag rules** | Lists the tags that a collection expression matches. |

### `POST /api/v2/Tags/Expressions/Validate`

Checks whether a collection or rule expression compiles.
It works with or without a loaded profile, and needs the **View tag rules** permission.
It returns `200` with `valid` and, when the expression does not compile, `errorMessage`, in the same form as the derived tags Validate endpoint.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `expression` | Text | None | The boolean expression over `tag`, such as `tag.Value > 5`. |
| `aliases` | List of text | None | The names of a rule's [related tags](../../../../Tags/Rules/Rule_Settings.md#related-tags). With aliases, Profinity checks a rule expression that can read them, and otherwise a collection membership expression. |

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Tags/Expressions/Validate \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"expression": "tag.Value > 5"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Tags/Expressions/Validate -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"expression": "tag.Value > 5"}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **View tag rules**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The expression compiles when the response is:

```json
{
  "valid": true
}
```

An expression that does not compile returns `200` too, with `valid` set to `false` and the reason in `errorMessage`.

`POST /api/v2/Tags/Expressions/Validate` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Expression is required." | The request has no body. | Send a body with `expression`. |

### `POST /api/v2/Tags/Expressions/Preview`

Lists the tags that a collection expression matches.
It needs the **View tag rules** permission and the tag tree of a loaded profile.
It returns `200` with `matchCount`, `truncated`, and `tags`, a list in which each tag has its `fullTagId` and `metaType`.

Preview returns the first 50 tags the caller can see, with `matchCount` set to the number of visible tags that match.
`truncated` is `true` only when more than 50 visible tags match, so narrow the expression or set `scopePrefix` to see the rest.
Tags hidden from the caller are neither counted nor returned.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `expression` | Text | None | The boolean expression over `tag`, such as `tag.Value > 5`. |
| `scopePrefix` | Text | None | Limits the match to the tags beneath this path in the tag tree. |

To list the temperature tags of one pump before you save a collection, send the expression to Preview:

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Tags/Expressions/Preview \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"expression": "tag.MatchesPath(\"<component>\") && tag.MatchesName(\"*Temp*\")"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Tags/Expressions/Preview -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"expression": "tag.MatchesPath(\"<component>\") && tag.MatchesName(\"*Temp*\")"}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<token>` with a token from a user who has **View tag rules**.
- `<component>` with the name of the pump's component, such as `Pump1`.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
`MatchesPath` matches the component and every tag beneath it, and `MatchesName` matches the last segment of the tag path against a pattern, as described in [Tag expressions](../../../../Tags/Selecting_Tags/Tag_Expressions.md).
The response lists each matching tag:

```json
{
  "matchCount": 2,
  "truncated": false,
  "tags": [
    { "fullTagId": "Pump1/DBC/Status/MotorTemp", "metaType": "dbc.signal" },
    { "fullTagId": "Pump1/DBC/Status/BearingTemp", "metaType": "dbc.signal" }
  ]
}
```

The expression works when `matchCount` is above 0 and `tags` holds the tags you expect.

`POST /api/v2/Tags/Expressions/Preview` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Expression is required." | The request has no body. | Send a body with `expression`. |
| `400` with "Active tag tree is not available." | No profile is loaded, or its tag tree is not available. | Load a profile, then repeat the request. |
| `400` with the reason | The expression does not compile, `scopePrefix` names a path that is not in the tag tree, or the expression matches more tags than Profinity allows. | Correct the part the message names, checking the expression with `POST /api/v2/Tags/Expressions/Validate`. |
