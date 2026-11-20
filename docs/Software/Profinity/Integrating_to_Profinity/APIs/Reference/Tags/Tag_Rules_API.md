---
title: Tag rules API
description: "Look up the REST API endpoints that read and save the tag rules of a profile or component, with the permission each one needs."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Tag rules API

The Tag rules API, the TagRules group in Swagger, reads and saves the [tag rules](../../../../Tags/Rules/index.md) of the active profile and its components.
Its endpoints match the **RULES & ACTIONS** editor under **TAG UTILITIES**.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

A [component security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) setting that hides a component from the caller makes the component endpoints return `404`.

## Rules documents

These endpoints read and save the rules document of the profile or of one component.
A rules document in a request or a response uses the same keys as the `rules.yaml` file shown in [Complete rules.yaml example](../../../../Tags/Rules/Rules_YAML_Example.md), written as JSON.
`{componentName}` is the component's name in the profile.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/Rules` | **View tag rules** | Reads the profile's rules document. A profile with no rules file returns an empty document. |
| PUT | `/api/v2/Tags/Rules` | **Modify tag rules** | Saves the profile's rules document and reloads the rules. The first save creates `rules.yaml` and names it in the **Profile rules YAML file (optional)** setting on the **Tags** tab of [Profile Settings](../../../../Administration/Manage_Profiles.md#edit-profile-settings). |
| GET | `/api/v2/Tags/Rules/Component/{componentName}` | **View tag rules** | Reads a component's rules document, or the default rules the component ships when it has no rules file of its own. |
| PUT | `/api/v2/Tags/Rules/Component/{componentName}` | **Modify tag rules** | Saves a component's rules document. The component needs a rules file, such as one that ships default rules. |

The [Tag collections API](Tag_Collections_API.md) reads and saves the collections that a rule scope uses.
To check a rule expression before you save it, refer to the [Tag expressions API](Tag_Expressions_API.md).

A save returns `{ "message": "Rules successfully saved" }`.
Profinity keeps the file that a save replaces as `<file>.bak`, as described in [The safety copy](../../../../Administration/System_Configuration/Invalid_Configuration_Files.md#the-safety-copy).

### `GET /api/v2/Tags/Rules`

Reads the profile's rules document.
A profile with no rules file returns an empty document.
It needs the **View tag rules** permission, and returns `200` with the document.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Rules
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Get -Uri http://localhost:18080/api/v2/Tags/Rules -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **View tag rules**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON rules document.

`GET /api/v2/Tags/Rules` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "Profile rules document could not be parsed" | The profile's rules file exists but cannot be read as a rules document. | Fix the file named in the message. |

### `PUT /api/v2/Tags/Rules`

Saves the profile's rules document and reloads the rules.
The first save creates `rules.yaml` and names it in the **Profile rules YAML file (optional)** setting.
It needs the **Modify tag rules** permission, and returns `200` with `{ "message": "Rules successfully saved" }`.
A save that fails a check saves nothing and leaves the file unchanged.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| Request body | JSON | None | The whole rules document, with the keys of [Complete rules.yaml example](../../../../Tags/Rules/Rules_YAML_Example.md). A save replaces the file. |

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/Tags/Rules \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d @<rules-file>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/Tags/Rules -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -InFile <rules-file>
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<rules-file>` with the path of a file that holds the rules document as JSON.
- `<token>` with a token from a user who has **Modify tag rules**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The save worked when the response is `{ "message": "Rules successfully saved" }`.

`PUT /api/v2/Tags/Rules` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You must provide a rules payload." or "Rules payload could not be parsed" | The body is missing, is not JSON, or is not a rules document. | Send the rules document as JSON, in the shape that `GET /api/v2/Tags/Rules` returns. |
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with the reason | The document fails a check, such as a rule that names a collection or action that does not exist. Nothing is saved. | Correct the part the message names. |
| `400` with "Failed to update profile metadata for rules save." | The first save wrote the rules file but could not name it in the profile. | Set the **Profile rules YAML file (optional)** setting to `rules.yaml`, then save again. |

### `GET /api/v2/Tags/Rules/Component/{componentName}`

Reads a component's rules document.
When the component has no rules file of its own, it returns the default rules the component ships.
It needs the **View tag rules** permission, and returns `200` with the document.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/Rules/Component/<componentName>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Get -Uri http://localhost:18080/api/v2/Tags/Rules/Component/<componentName> -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<componentName>` with the component's name in the profile, URL encoded, such as `Pump%201`.
- `<token>` with a token from a user who has **View tag rules**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON rules document.

`GET /api/v2/Tags/Rules/Component/{componentName}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "No component named '…' was found." | The active profile has no component with that name. | Check the name against the side menu. |
| `400` with "Component rules document could not be parsed" | The component's rules file, or its default rules, cannot be read as a rules document. | Fix the file named in the message. |
| `404` | Component security hides the component from the caller. | Ask an administrator for access to the component. |
| `404` with "Component rules file was not found." | The component has no rules file and ships no default rules. | Save a rules document for the component first, if it has a rules file setting. |

### `PUT /api/v2/Tags/Rules/Component/{componentName}`

Saves a component's rules document and reloads the rules.
The component needs a rules file, such as one that ships default rules.
It needs the **Modify tag rules** permission, and returns `200` with `{ "message": "Rules successfully saved" }`.
A save that fails a check saves nothing and leaves the file unchanged.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| Request body | JSON | None | The whole rules document of the component, with the keys of [Complete rules.yaml example](../../../../Tags/Rules/Rules_YAML_Example.md). A save replaces the file. |

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/Tags/Rules/Component/<componentName> \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d @<rules-file>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/Tags/Rules/Component/<componentName> -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -InFile <rules-file>
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<componentName>` with the component's name in the profile, URL encoded, such as `Pump%201`.
- `<rules-file>` with the path of a file that holds the rules document as JSON.
- `<token>` with a token from a user who has **Modify tag rules**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The save worked when the response is `{ "message": "Rules successfully saved" }`.

`PUT /api/v2/Tags/Rules/Component/{componentName}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You must provide a rules payload." or "Rules payload could not be parsed" | The body is missing, is not JSON, or is not a rules document. | Send the rules document as JSON, in the shape that `GET /api/v2/Tags/Rules/Component/{componentName}` returns. |
| `400` with "Unable to access active profile." | No profile is loaded. | Load a profile, then repeat the request. |
| `400` with "No component named '…' was found." | The active profile has no component with that name. | Check the name against the side menu. |
| `400` with "Component '…' does not have a rules file configured." | The component has no rules file setting, so there is nowhere to save the rules. | Use a component that has a rules file. |
| `400` with the reason | The document fails a check, such as a rule that names a collection or action that does not exist. Nothing is saved. | Correct the part the message names. |
| `404` | Component security hides the component from the caller. | Ask an administrator for access to the component. |
