---
title: Alerts API
description: "Look up the REST API endpoints that list active alerts and alert history, and acknowledge, unacknowledge, or silence an alert."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Alerts API

The Alerts API, the Alerts group in Swagger, lists active alerts and past alert events, acknowledges and silences alerts, and reverts an acknowledgement.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

Endpoints under `/api/v2/Alerts` return and manage the alerts shown in the [Alerts Log](../../../../Tags/Alerts.md).

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Alerts/Active` | **View alerts** | Lists the active alerts, each with its `ruleId` and `tagId`, in an `items` list. |
| GET | `/api/v2/Alerts/History` | **View alerts** | Lists past alert events, one page at a time. |
| POST | `/api/v2/Alerts/Ack` | **View alerts** | Acknowledges an alert. |
| POST | `/api/v2/Alerts/Unack` | **View alerts** | Reverts an acknowledgement, as the **Unacknowledge alert** button does. |
| POST | `/api/v2/Alerts/Silence` | **View alerts** | Silences an alert for a number of minutes. |

## Reading alerts

Active and History return only the alerts on tags that [component security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) lets the caller see.
Each alert in an `items` list has `ruleId`, `ruleName`, `tagId`, `level`, `isActive`, `isAcknowledged`, `isSilenced`, and, where they apply, `displayName`, `description`, `message`, `componentName`, `utcTimestamp`, `acknowledgedBy`, and `silencedUntilUtc`.
Each entry in History also has `transition`, the change that the event records, such as `BecameTrue` or `Acknowledged`.

### `GET /api/v2/Alerts/Active`

Lists the active alerts.
It needs the **View alerts** permission, and returns `200` with `items`, `activeTagIds`, the paths of the tags that have an active alert, and `componentNames`.
Each query value narrows the list.

| Field | Type | Default | Effect |
|---|---|---|---|
| `componentId` | Text, query | None | Limits the alerts to one component, by name. |
| `tagPrefix` | Text, query | None | Limits the alerts to the tags beneath this path. When the request sets both, Profinity uses `tagPrefix`. |
| `level` | Text, query | None | Limits the alerts to one level: `Trace`, `Debug`, `Info`, `Warning`, `Error`, or `Fatal`. Profinity reads a value it does not recognise as `Info`. |
| `unacknowledgedOnly` | Boolean, query | `false` | When `true`, returns only the alerts that nobody has acknowledged. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Alerts/Active
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Alerts/Active
    ```

Replace `<token>` with a Bearer token for a user with the **View alerts** permission, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
Each entry in `items` is one alert, shortened here to the fields the Silence example uses:

```json
{
  "items": [
    {
      "ruleId": "motor_over_temperature",
      "tagId": "Pump1/DBC/Status/MotorTemp",
      "level": "Warning",
      "isSilenced": false
    }
  ]
}
```

An empty `items` list means no alert is active for the caller.

This endpoint has no errors of its own beyond sign-in and permission.

### `GET /api/v2/Alerts/History`

Lists past alert events, one page at a time.
It needs the **View alerts** permission, and returns `200` with `items`, `totalCount`, `pageIndex`, and `pageSize`.
Each query value narrows or pages the list.

| Field | Type | Default | Effect |
|---|---|---|---|
| `componentId` | Text, query | None | Limits the events to one component, by name. |
| `tagPrefix` | Text, query | None | Limits the events to the tags beneath this path. When the request sets both, Profinity uses `tagPrefix`. |
| `level` | Text, query | None | Limits the events to one level: `Trace`, `Debug`, `Info`, `Warning`, `Error`, or `Fatal`. Profinity reads a value it does not recognise as `Info`. |
| `pageIndex` | Integer, query | `0` | The page to return, counted from 0. |
| `pageSize` | Integer, query | `25` | The number of events on a page, from 1 to 500. Profinity changes a value outside that range to the nearest limit. |
| `fromUtc`, `toUtc` | ISO 8601 date and time, query | None | Keeps the events recorded from `fromUtc` to `toUtc`, inclusive, in Coordinated Universal Time (UTC), such as `2026-11-19T01:00:00Z`. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" "http://localhost:18080/api/v2/Alerts/History?pageIndex=0&pageSize=10&fromUtc=<from>"
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -H "Authorization: Bearer <token>" "http://localhost:18080/api/v2/Alerts/History?pageIndex=0&pageSize=10&fromUtc=<from>"
    ```

Replace these placeholders:

- `<from>` with the earliest time to include, such as `2026-11-19T01:00:00Z`.
- `<token>` with a Bearer token for a user with the **View alerts** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has `items` and `totalCount`, such as this, shortened to one event:

```json
{
  "items": [
    {
      "ruleId": "motor_over_temperature",
      "tagId": "Pump1/DBC/Status/MotorTemp",
      "level": "Warning",
      "transition": "BecameTrue",
      "utcTimestamp": "2026-11-19T01:05:00.0000000Z"
    }
  ],
  "totalCount": 1,
  "pageIndex": 0,
  "pageSize": 10
}
```

This endpoint has no errors of its own beyond sign-in and permission.

## Changing an alert

Ack, Unack, and Silence act on one active alert, which the body names with `ruleId` and `tagId` from the `items` list that Active returns.
They return `200` with an empty body when they succeed.
They return `404` for a tag that the signed-in user cannot see under [component security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).

| Field | Type | Default | Effect |
|---|---|---|---|
| `ruleId` | Text, body | Required | The rule that raised the alert, from the `items` list that Active returns. |
| `tagId` | Text, body | Required | The full path of the tag that the alert is on, from the same `items` list. |
| `durationMinutes` | Integer, body | Required | Silence only. How long the silence lasts, from 1 to 1440 minutes (24 hours). |

### `POST /api/v2/Alerts/Ack`

Acknowledges an active alert, in the name of the signed-in user.
It needs the **View alerts** permission, and returns `200` with an empty body.
Acknowledging an alert that is already acknowledged also returns `200`.

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Alerts/Ack \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"ruleId": "<rule id>", "tagId": "<tag id>"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Alerts/Ack -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"ruleId": "<rule id>", "tagId": "<tag id>"}'
    ```

Replace these placeholders:

- `<rule id>` with the alert's `ruleId`, such as `motor_over_temperature`.
- `<tag id>` with its `tagId`, such as `Pump1/DBC/Status/MotorTemp`.
- `<token>` with a Bearer token for a user with the **View alerts** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The acknowledgement worked when `GET /api/v2/Alerts/Active` shows the alert with `isAcknowledged` set to `true` and your user name in `acknowledgedBy`.

`POST /api/v2/Alerts/Ack` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | `ruleId` or `tagId` is missing or blank. The message is "RuleId and TagId are required." | Send both, from the `items` list that `GET /api/v2/Alerts/Active` returns. |
| `400` | The alert is not active, so there is nothing to change. The message is "Alert is not active." | Check the alert is still in `GET /api/v2/Alerts/Active`. |
| `404` | The user cannot see the tag under component security, or the message says "Rules host is not loaded." | Check the user can see the component, and that the active profile has alert rules loaded. |
| `409` | Profinity is evaluating alerts and did not finish in time. The message is "Alert evaluation is busy; please retry." | Send the request again. |

### `POST /api/v2/Alerts/Unack`

Reverts the acknowledgement of an active alert, as the **Unacknowledge alert** button does.
It needs the **View alerts** permission, and returns `200` with an empty body.
Reverting an alert that is not acknowledged also returns `200`.

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Alerts/Unack \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"ruleId": "<rule id>", "tagId": "<tag id>"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Alerts/Unack -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"ruleId": "<rule id>", "tagId": "<tag id>"}'
    ```

Replace these placeholders:

- `<rule id>` with the alert's `ruleId`, such as `motor_over_temperature`.
- `<tag id>` with its `tagId`, such as `Pump1/DBC/Status/MotorTemp`.
- `<token>` with a Bearer token for a user with the **View alerts** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when `GET /api/v2/Alerts/Active` shows the alert with `isAcknowledged` set to `false`.

`POST /api/v2/Alerts/Unack` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | `ruleId` or `tagId` is missing or blank. The message is "RuleId and TagId are required." | Send both, from the `items` list that `GET /api/v2/Alerts/Active` returns. |
| `400` | The alert is not active, so there is nothing to change. The message is "Alert is not active." | Check the alert is still in `GET /api/v2/Alerts/Active`. |
| `404` | The user cannot see the tag under component security, or the message says "Rules host is not loaded." | Check the user can see the component, and that the active profile has alert rules loaded. |
| `409` | Profinity is evaluating alerts and did not finish in time. The message is "Alert evaluation is busy; please retry." | Send the request again. |

### `POST /api/v2/Alerts/Silence`

Silences an active alert for a number of minutes.
It needs the **View alerts** permission, and returns `200` with an empty body.

To silence a motor temperature alert on a pump for an hour, first list the active alerts with `GET /api/v2/Alerts/Active` to find its `ruleId` and `tagId`.
Then send the alert's `ruleId` and `tagId`, with the number of minutes to silence it for:

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Alerts/Silence \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"ruleId": "<rule id>", "tagId": "<tag id>", "durationMinutes": 60}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Alerts/Silence -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"ruleId": "<rule id>", "tagId": "<tag id>", "durationMinutes": 60}'
    ```

Replace these placeholders:

- `<rule id>` with the alert's `ruleId`, such as `motor_over_temperature`.
- `<tag id>` with its `tagId`, such as `Pump1/DBC/Status/MotorTemp`.
- `<token>` with a Bearer token for a user with the **View alerts** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The endpoint returns `200` with an empty body.
The silence worked when `GET /api/v2/Alerts/Active` shows the alert with `isSilenced` set to `true` and the end of the silence in `silencedUntilUtc`.

`POST /api/v2/Alerts/Silence` returns these errors:

S| What you see | Cause | What to do |
|---|---|---|
| `400` | `ruleId` or `tagId` is missing or blank. The message is "RuleId and TagId are required." | Send both, from the `items` list that `GET /api/v2/Alerts/Active` returns. |
| `400` | The alert is not active, so there is nothing to change. The message is "Alert is not active." | Check the alert is still in `GET /api/v2/Alerts/Active`. |
| `404` | The user cannot see the tag under component security, or the message says "Rules host is not loaded." | Check the user can see the component, and that the active profile has alert rules loaded. |
| `409` | Profinity is evaluating alerts and did not finish in time. The message is "Alert evaluation is busy; please retry." | Send the request again. |
