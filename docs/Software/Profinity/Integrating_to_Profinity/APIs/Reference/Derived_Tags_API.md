---
title: Derived tags API
description: "Look up the REST API endpoints that read, save, check, and report on derived tags and their formulas, with the permission each one needs."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Derived tags API

The Derived tags API, the DerivedTags group in Swagger, reads, checks, and saves the [derived tags](../../../Tags/Derived_Tags/index.md) of the active profile.
Its endpoints match the **DERIVED TAGS** editor under **TAG UTILITIES**.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

These endpoints read or save the whole derived tags document, with JSON request and response bodies, and check and report on the derived tags in it.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/DerivedTags` | **View tag collections** | Reads the derived tags document. |
| PUT | `/api/v2/Tags/DerivedTags` | **Modify tag collections** | Saves the derived tags document. |
| GET | `/api/v2/Tags/DerivedTags/Report` | **View tag collections** | Lists the derived tags that the editor marks **Invalid**, with the reason for each. |
| POST | `/api/v2/Tags/DerivedTags/Validate` | **View tag collections** | Checks whether a derived tag formula compiles against the aliases it uses. |
| GET | `/api/v2/Tags/DerivedTags/References` | **View tag collections** | Lists the derived tags that depend on a tag. |

Report and References need a loaded profile, and return `400` with "Unable to access active profile." when none is loaded.
Validate checks a formula with or without a loaded profile.

Validate returns `200` with `{ "valid": true }` when the formula compiles, or `{ "valid": false, "errorMessage": "…" }` with the reason when it does not.
To check a collection or rule expression instead of a derived tag formula, use the [Tag expressions API](Tag_Expressions_API.md).

References returns `dependentDerivedTagIds`, the identifiers of the derived tags that list the tag among their dependencies, which the editor checks before a delete.
The Report endpoint returns `items`, a list in which each entry has the `id` of the invalid derived tag, its `path` in the document, and the `reason`, as described in [When a configuration file is invalid](../../../Administration/System_Configuration/Invalid_Configuration_Files.md#rules-collections-and-derived-tags).
It returns `409` when the derived tags file cannot be read.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `expression` | Text | None | Validate only. The formula to check, such as `a.Value * 1.60934`. |
| `aliases` | List of text | None | Validate only. The alias names of the derived tag's dependencies, such as `a` and `b`. |
| `mountPath` | Text, query | Required | References only. The full path of the tag, matched exactly against the source path of each dependency. A request without it returns `400` with "mountPath is required." |
