---
title: Alerts API
description: "Look up the REST API endpoints that list active alerts and alert history, and acknowledge, unacknowledge, or silence an alert."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Alerts API

The Alerts API, the Alerts group in Swagger, lists active alerts and past alert events, and acknowledges, unacknowledges, and silences alerts.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

Endpoints under `/api/v2/Alerts` return and manage the alerts shown in the [Alerts Log](../../../Tags/Alerts.md).

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Alerts/Active` | **View alerts** | Lists the active alerts, each with its `ruleId` and `tagId`, in an `items` list. |
| GET | `/api/v2/Alerts/History` | **View alerts** | Lists past alert events, one page at a time. |
| POST | `/api/v2/Alerts/Ack` | **View alerts** | Acknowledges an alert. |
| POST | `/api/v2/Alerts/Unack` | **View alerts** | Reverts an acknowledgement, as the **Unacknowledge alert** button does. |
| POST | `/api/v2/Alerts/Silence` | **View alerts** | Silences an alert for a number of minutes. |

Ack, Unack, and Silence return `200` when they succeed.
They return not found for a tag that the signed-in user cannot see under [component security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `componentId` | Text, query | None | Active and History. Limits the alerts to one component, by name. |
| `tagPrefix` | Text, query | None | Active and History. Limits the alerts to the tags beneath this path. When the request sets both, Profinity uses `tagPrefix`. |
| `level` | Text, query | None | Active and History. Limits the alerts to one level: `Trace`, `Debug`, `Info`, `Warning`, `Error`, or `Fatal`. |
| `unacknowledgedOnly` | Boolean, query | `false` | Active only. When `true`, returns only the alerts that nobody has acknowledged. |
| `pageIndex` | Integer, query | `0` | History only. The page to return, counted from 0. |
| `pageSize` | Integer, query | `25` | History only. The number of events on a page, from 1 to 500. Profinity changes a value outside that range to the nearest limit. |
| `fromUtc`, `toUtc` | ISO 8601 date and time, query | None | History only. Keeps the events recorded from `fromUtc` to `toUtc`, inclusive, in Coordinated Universal Time (UTC), such as `2026-11-19T01:00:00Z`. |
| `ruleId` | Text, body | Required | Ack, Unack, and Silence. The rule that raised the alert, from the `items` list that Active returns. A request without `ruleId` or `tagId` returns `400` with "RuleId and TagId are required." |
| `tagId` | Text, body | Required | Ack, Unack, and Silence. The full path of the tag that the alert is on, from the same `items` list. |
| `durationMinutes` | Integer, body | Required | Silence only. How long the silence lasts, from 1 to 1440 minutes (24 hours). A value outside that range returns `400` with "durationMinutes must be between 1 and 1440." |

To silence a motor temperature alert on a pump for an hour, first list the active alerts to find its `ruleId` and `tagId`:

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Alerts/Active
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Alerts/Active
    ```

Replace `<token>` with a Bearer token for a user with the **View alerts** permission.
Each entry in `items` is one alert, shortened here to the fields this example uses:

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

Replace `<rule id>` with the alert's `ruleId`, such as `motor_over_temperature`, and `<tag id>` with its `tagId`, such as `Pump1/DBC/Status/MotorTemp`.
The endpoint returns `200` with an empty body.

The silence worked when `GET /api/v2/Alerts/Active` shows the alert with `isSilenced` set to `true` and the end of the silence in `silencedUntilUtc`.
