---
title: Actions API
description: "Look up the endpoints that list a component's actions, run a component or system action, and report the progress of an action that runs in the background."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Actions API

The Actions API, the Actions group in Swagger, lists and runs component and system actions, and reports the progress of an action that runs in the background.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

These endpoints run the same actions as the menu items of a component and the [Actions component](../../../Customising_Profinity/Dashboards/Component_Reference/Interactive/Actions.md) on a dashboard.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Actions/{componentId}` | No permission beyond signing in | Lists the actions that a component offers, with the name of each in `actionId` and whether it is enabled in `available`. |
| POST | `/api/v2/Actions` | **Allow component actions**, or **Allow firmware actions** for a firmware action | Runs an action on a component, or a system action. |
| GET | `/api/v2/Actions/Progress/{actionId}` | **Allow component actions**, or **Allow firmware actions** for a firmware action | Returns how far an action that runs in the background has got. |

`{componentId}` is the component's name in the profile, URL-encoded.
A component that the signed-in user cannot see under [component security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) returns `404`.

The POST endpoint takes these fields in its body:

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `invoke` | Choice | `Component` | `Component` runs an action of the component named in `componentId`, and `System` runs a system action. Any other value returns `400`. |
| `componentId` | Text | None | The component's name in the profile. Required when `invoke` is `Component`. |
| `actionId` | Text | None | The name of the action, from the list that `GET /api/v2/Actions/{componentId}` returns, or the name of a system action. Required. |
| `value` | Text | None | A value for an action that takes one. |

The system actions are `RESTART PROFINITY`, which restarts Profinity, `UPDATE PROFINITY`, which downloads the latest Profinity update, and `INSTALL PROFINITY`, which runs the downloaded installer on Windows and closes Profinity.
Each one needs **Allow component actions**, and `RESTART PROFINITY` and `INSTALL PROFINITY` interrupt every active session.

The response has `success`, which is `true` when the action ran or started and `false` when it failed.
An action that runs in the background also returns `actionInstanceId`, and an on and off action returns its new state in `states`.
Poll `GET /api/v2/Actions/Progress/<actionInstanceId>` for that action, which returns a number from `0` to `1`, where `1` means the action has finished and `-1` means it failed.
Profinity stops tracking a finished action after a while, and an ID it no longer tracks also returns `1`.

To run a [Run Script](../../../Developing_with_Profinity/Scripting/Script_Types/Run_Scripts.md) component named `Pump Flush`, whose **Script mode** is **Run on demand**, first list the actions it offers:

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Actions/<component>
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Actions/<component>
    ```

Replace `<token>` with a Bearer token for a user with the **Allow component actions** permission, and `<component>` with the component's name, URL encoded, such as `Pump%20Flush`.
The list gives the name of each action in `actionId`:

```json
[
  { "actionId": "Run Script", "available": true },
  { "actionId": "Cancel Script", "available": false },
  { "actionId": "Edit Script", "available": true }
]
```

Then run the action, with the same token, the component's name, and the `actionId` from the list:

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

Replace `<component name>` with the component's name as the profile shows it, such as `Pump Flush`.
The response looks like this:

```json
{
  "success": true,
  "states": [],
  "actionInstanceId": null
}
```

The script started when `success` is `true`, and **Run Script** shows as unavailable in the list until the run finishes.
