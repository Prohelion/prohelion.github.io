---
title: Actions API
description: "Look up the endpoints that list a component's actions, run a component or system action, and report the progress of an action that runs in the background."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Actions API

The Actions API, the Actions group in Swagger, lists and runs component and system actions, and reports the progress of an action that runs in the background.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

These endpoints run the same actions as the menu items of a component and the [Actions component](../../../Customising_Profinity/Dashboards/Component_Reference/Interactive/Actions.md) on a dashboard.

## Component and system actions

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Actions/{componentId}` | No permission beyond signing in | Lists the actions that a component offers, with the name of each in `actionId` and whether it is enabled in `available`. |
| POST | `/api/v2/Actions` | **Allow component actions**, or **Allow firmware actions** for a firmware action | Runs an action on a component, or a system action. |
| GET | `/api/v2/Actions/Progress/{actionId}` | **Allow component actions**, or **Allow firmware actions** for a firmware action | Returns how far an action that runs in the background has got. |

In an endpoint, `{componentId}` is the component's name in the profile, URL encoded, so `Pump Flush` becomes `Pump%20Flush`.
A component that the signed-in user cannot see under [component security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) returns `404`.

### `GET /api/v2/Actions/{componentId}`

Lists the actions that a component offers, including its firmware actions.
Any signed-in user can list them, and it returns `200` with an array.
Each entry has the name of the action in `actionId`, and `available`, which is `true` when the action is enabled.
A component that offers no actions returns `200` with no list.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Actions/<component>
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Actions/<component>
    ```

Replace these placeholders:

- `<component>` with the component's name, URL encoded, such as `Pump%20Flush`.
- `<token>` with a token from any signed-in user.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
For a [Run Script](../../../Developing_with_Profinity/Scripting/Script_Types/Run_Scripts.md) component named `Pump Flush`, whose **Script mode** is **Run on demand**, the list looks like this:

```json
[
  { "actionId": "Run Script", "available": true },
  { "actionId": "Cancel Script", "available": false },
  { "actionId": "Edit Script", "available": true }
]
```

`GET /api/v2/Actions/{componentId}` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No component in the active profile has that name, or the user cannot see it. | Check the name against the component list of the active profile. |

### `POST /api/v2/Actions`

Runs an action on a component, or a system action.
It needs **Allow component actions**, or **Allow firmware actions** for a firmware action, and returns `200` with the result.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `invoke` | Choice | `Component` | `Component` runs an action of the component named in `componentId`, and `System` runs a system action. Any other value returns `400`, including `Endpoint` and `Navigate`, which this API does not run. |
| `componentId` | Text | None | The component's name in the profile. Required when `invoke` is `Component`. |
| `actionId` | Text | None | The name of the action, from the list that `GET /api/v2/Actions/{componentId}` returns, or the name of a system action. Required. |
| `value` | Text | None | A value for an action that takes one. |

The system actions are `RESTART PROFINITY`, which restarts Profinity, `UPDATE PROFINITY`, which downloads the latest Profinity update, and `INSTALL PROFINITY`, which runs the downloaded installer on Windows and closes Profinity.
Each one needs **Allow component actions**, and `RESTART PROFINITY` and `INSTALL PROFINITY` interrupt every active session.

The response has `success`, which is `true` when the action ran or started and `false` when it failed.
An action that runs in the background also returns `actionInstanceId`, and an on and off action returns its new state in `states`.

To run the **Run Script** action of the `Pump Flush` component, send the `actionId` from the list:

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Actions \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"invoke": "Component", "componentId": "<component name>", "actionId": "Run Script"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Actions -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"invoke": "Component", "componentId": "<component name>", "actionId": "Run Script"}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component name>` with the component's name as the profile shows it, such as `Pump Flush`.
- `<token>` with a token from a user who has **Allow component actions**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The response looks like this:

```json
{
  "success": true,
  "states": [],
  "actionInstanceId": null
}
```

The script started when `success` is `true`, and **Run Script** shows as unavailable in the list until the run finishes.

`POST /api/v2/Actions` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | `invoke` is not `Component` or `System`. This includes `Endpoint` and `Navigate`, which this API does not run. | Send `Component` or `System`. |
| `404` | The body is missing, `componentId` is missing for a component action, no component has that name or the user cannot see it, the component has no actions, no action has that `actionId`, or no system action has that name. | Check `componentId` and `actionId` against the list from `GET /api/v2/Actions/{componentId}`, or use one of the three system action names. |

### `GET /api/v2/Actions/Progress/{actionId}`

Returns how far an action that runs in the background has got, as a number from `0` to `1`, where `1` means the action has finished and `-1` means it failed.
`{actionId}` is the `actionInstanceId` from the response of `POST /api/v2/Actions`.
It needs **Allow component actions**, or **Allow firmware actions** for a firmware action, and returns `200`.
Profinity stops tracking a finished action after a while, and an ID it no longer tracks also returns `1`, and needs no permission beyond signing in.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Actions/Progress/<action-instance-id>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Actions/Progress/<action-instance-id> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<action-instance-id>` with the `actionInstanceId` from the response of `POST /api/v2/Actions`.
- `<token>` with a token from a user who has **Allow component actions**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a number, and the action has finished when it is `1`.

`GET /api/v2/Actions/Progress/{actionId}` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The ID is not a whole number. | Send the `actionInstanceId` as it arrived. |
