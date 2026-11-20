---
title: UI API
description: "Look up the REST API endpoints that return the dashboard schema and save a profile or component dashboard, with the permission each one needs."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# UI API

The UI API, the UI group in Swagger, returns the schema that dashboards follow and saves a [dashboard](../../../../Customising_Profinity/Dashboards/index.md) for the active profile or for one component.
A tool that builds dashboards reads the schema, checks its output against it, and then saves the result.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/UI/schema` | No permission beyond signing in | Returns the schema for dashboards. |
| PUT | `/api/v2/UI` | **Modify dashboards** | Saves the dashboard of the active profile. |
| PUT | `/api/v2/UI/Component/{component}` | **Modify dashboards** | Saves the dashboard of one component. |

In an endpoint, `{component}` is the component's name as the side menu shows it, URL encoded, so `Pump 1` becomes `Pump%201`.

## Dashboard schema

### `GET /api/v2/UI/schema`

Returns the schema for dashboards.
The schema names every element a dashboard can use and the fields of each, so a tool can build a dashboard and check it before it saves.
Read it on each run, because the elements an instance offers change with its release.
Any signed-in user can read it.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/UI/schema
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/UI/schema -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the schema as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from any signed-in user, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON document.

This endpoint has no errors of its own beyond sign-in and permission.

## Dashboard saves

A save takes the dashboard as JSON, in the same shape as the dashboard YAML that [Build a dashboard](../../../../Customising_Profinity/Dashboards/Build_a_Dashboard.md) describes.
Convert YAML to JSON before you send it, because a save does not accept YAML.
Profinity checks the body against the schema, and a body that fails the check saves nothing.

### `PUT /api/v2/UI`

Saves the dashboard of the active profile.
It needs the **Modify dashboards** permission, and returns `200` with `{ "message": "Dashboard successfully saved" }`.

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/UI \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d @<dashboard-file>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/UI -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -InFile <dashboard-file>
    ```

Replace these placeholders:

- `<dashboard-file>` with the path of a file that holds the dashboard as JSON, checked against the schema.
- `<token>` with a token from a user who has **Modify dashboards**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The save worked when the response is `{ "message": "Dashboard successfully saved" }`.

`PUT /api/v2/UI` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The body is empty, cannot be parsed, or fails the dashboard schema. | Correct the part the message names, checking it against `GET /api/v2/UI/schema`. |

### `PUT /api/v2/UI/Component/{component}`

Saves the dashboard of one component.
It writes the file that the component's `SETTINGS.DashboardFilename` names, and `dashboard.yaml` when the setting is empty.
Set `SETTINGS.DashboardFilename` to `dashboard.yaml` after the first save, with the [settings endpoints](Active_Profile_API.md#components).
It needs the **Modify dashboards** permission, and returns `200` with `{ "message": "Dashboard successfully saved" }`.

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/UI/Component/<component> \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d @<dashboard-file>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/UI/Component/<component> -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -InFile <dashboard-file>
    ```

Replace these placeholders:

- `<component>` with the component's name, URL encoded, such as `Pump%201`.
- `<dashboard-file>` with the path of a file that holds the dashboard as JSON, checked against the schema.
- `<token>` with a token from a user who has **Modify dashboards**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The save worked when the response is `{ "message": "Dashboard successfully saved" }`.

`PUT /api/v2/UI/Component/{component}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The body is empty, cannot be parsed, or fails the dashboard schema. | Correct the part the message names, checking it against `GET /api/v2/UI/schema`. |
| `404` | No component in the profile has that name. | Add the component first, with the [Active profile API](Active_Profile_API.md#components). |
