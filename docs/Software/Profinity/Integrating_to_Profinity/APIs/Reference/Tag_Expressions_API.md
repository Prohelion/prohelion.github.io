---
title: Tag expressions API
description: "Look up the REST API endpoints that check a tag expression and preview the tags it matches, with the permission, fields, and limits."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Tag expressions API

The Tag expressions API, the TagExpressions group in Swagger, checks a [tag expression](../../../Tags/Selecting_Tags/Tag_Expressions.md) and shows the tags it matches.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

The collections and rules editors use this API for the expressions saved through the [Tag collections API](Tag_Collections_API.md) and the [Tag rules API](Tag_Rules_API.md).
To check a derived tag formula, use Validate in the [Derived tags API](Derived_Tags_API.md) instead.
These endpoints check whether an expression compiles and list the tags a collection expression matches.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/Tags/Expressions/Validate` | **View tag rules** | Checks whether a collection or rule expression compiles. |
| POST | `/api/v2/Tags/Expressions/Preview` | **View tag rules** | Lists the tags that a collection expression matches. |

Validate checks an expression with or without a loaded profile.
Preview needs the tag tree of a loaded profile, and returns `400` with "Active tag tree is not available." when none is loaded.

Validate returns `200` with `valid` and, when the expression does not compile, `errorMessage`, in the same form as the derived tags Validate endpoint.
Preview returns `matchCount`, `truncated`, and `tags`, a list in which each tag has its `fullTagId` and `metaType`, and it returns only the tags the caller can see.
Preview returns the first 50 tags the caller can see, with `matchCount` set to the number of visible tags that match.
`truncated` is `true` only when more than 50 visible tags match, so narrow the expression or set `scopePrefix` to see the rest.
Tags hidden from the caller are neither counted nor returned.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `expression` | Text | None | The boolean expression over `tag`, such as `tag.Value > 5`. |
| `aliases` | List of text | None | Validate only. The names of a rule's [related tags](../../../Tags/Rules/Rule_Settings.md#related-tags). With aliases, Profinity checks a rule expression that can read them, and otherwise a collection membership expression. |
| `scopePrefix` | Text | None | Preview only. Limits the match to the tags beneath this path in the tag tree. |

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

Replace `<token>` with a Bearer token for a user with the **View tag rules** permission, and `<component>` with the name of the pump's component, such as `Pump1`.
`MatchesPath` matches the component and every tag beneath it, and `MatchesName` matches the last segment of the tag path against a pattern, as described in [Tag expressions](../../../Tags/Selecting_Tags/Tag_Expressions.md).
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
