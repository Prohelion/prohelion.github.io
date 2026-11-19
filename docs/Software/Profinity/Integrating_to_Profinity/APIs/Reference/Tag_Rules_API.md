---
title: Tag rules API
description: "Look up the REST API endpoints that read, save, and report on the tag rules of a profile or component, with the permission each one needs."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Tag rules API

The Tag rules API, the TagRules group in Swagger, reads, checks, and saves the [tag rules](../../../Tags/Rules/index.md) of the active profile and its components.
Its endpoints match the **RULES & ACTIONS** editor under **TAG UTILITIES**.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

ActionCatalog answers with or without a loaded profile.
The other rules endpoints need a loaded profile, and return `400` with "Unable to access active profile." when none is loaded.
A component that [component security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) hides from the caller returns `404`, and every list leaves it out.

## Rules documents

These endpoints read and save the rules document of the profile or of one component.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Rules` | **View tag rules** | Reads the profile's rules document. A profile with no rules file returns an empty document. |
| PUT | `/api/v2/Tags/Rules` | **Modify tag rules** | Saves the profile's rules document and reloads the rules. The first save creates `rules.yaml` and names it in the **Profile rules YAML file (optional)** setting on the **Tags** tab of [Profile Settings](../../../Administration/Manage_Profiles.md#edit-profile-settings). |
| GET | `/api/v2/Tags/Rules/Component/{componentName}` | **View tag rules** | Reads a component's rules document, or the default rules the component ships when it has no rules file of its own. |
| PUT | `/api/v2/Tags/Rules/Component/{componentName}` | **Modify tag rules** | Saves a component's rules document. The component needs a rules file, such as one that ships default rules. |

A rules document in a request or a response uses the same keys as the `rules.yaml` file shown in [Complete rules.yaml example](../../../Tags/Rules/Rules_YAML_Example.md), written as JSON.
`{componentName}` is the component's name in the profile.

A save returns `{ "message": "Rules successfully saved" }`, and a save that fails a check returns `400` with the reason, leaving the file unchanged.
Profinity keeps the file that a save replaces as `<file>.bak`, as described in [The safety copy](../../../Administration/System_Configuration/Invalid_Configuration_Files.md#the-safety-copy).

## Rule reports and lookups

These endpoints report on the rules and list the choices that the **RULES & ACTIONS** editor offers when you build a rule.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Rules/Report` | **View tag rules** | Lists the rules that the editor marks **Invalid**, with the reason for each. |
| GET | `/api/v2/Tags/Rules/ImpactedByTag` | **View tag rules** | Lists the enabled rules whose scope covers a tag. |
| GET | `/api/v2/Tags/Rules/References` | **View tag rules** | Lists the rules that run an action. |
| GET | `/api/v2/Tags/Rules/ActionCatalog` | **View tag rules** | Lists the actions a rule can run, and the tokens a rule message can use. |
| GET | `/api/v2/Tags/Rules/EditorIndex` | **View tag rules** | Lists the rules sources, which are the profile and each component that has rules. |
| GET | `/api/v2/Tags/Rules/EditorMetadata` | **View tag rules** | Returns the identifiers of the profile's collections, for choosing a rule scope. |

The [Tag collections API](Tag_Collections_API.md) reads and saves the collections that a rule scope uses.
To check a rule expression before you save it, refer to the [Tag expressions API](Tag_Expressions_API.md).

The Report endpoint returns `items`, a list in which each entry has the `id` of the invalid rule, its `path` in the document, and the `reason`, as described in [When a configuration file is invalid](../../../Administration/System_Configuration/Invalid_Configuration_Files.md#rules-collections-and-derived-tags).
A rules file that cannot be read at all returns `409` with the reason.

ImpactedByTag matches the **Rules on this tag** menu item in **TAG EXPLORER**, described in [Create collections, rules, and dashboard bindings from tags](../../../Tags/Create_Collections_Rules_and_Bindings_from_Tags.md).
It and References return entries with `sourceKey`, which is `profile` or a component name, `ruleName`, and `ruleDisplayName`.
References returns them in its `actionReferences` list.
ActionCatalog returns `actions`, where each action has an `actionId`, a `displayName`, and a `kind` of `BuiltIn` or `Component`, and `messageTemplateTokens`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `tagPath` | Text, query | None | ImpactedByTag only. The full path of the tag to check. An empty value returns an empty list, even with no profile loaded. |
| `actionName` | Text, query | None | References only. The `actionId` of the action, as ActionCatalog returns it. An empty value returns empty lists. |
| `componentIdFilter` | Text, query | None | EditorIndex only. When set, the list holds only the component with this name. When empty, the list starts with the profile, followed by each component that has rules. |
