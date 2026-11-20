---
title: Tag history API
description: "Look up the REST API endpoints that report whether tag history can be read and return stored samples from the designated historian."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Tag history API

The Tag history API, the TagHistory group in Swagger, reads past tag values from the profile's designated historian.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

To read a window of values with aggregation, refer to [Read real-time and historical tag data](../../Read_Tag_Data.md).
These endpoints read stored values from the profile's [designated historian](../../../../Components/Historians/Designated_Historian.md), which the **Live** and **View at a time** control on a dashboard also uses, as described in [View a dashboard at a past time](../../../../How_To_Guides/View_Dashboard_at_a_Past_Time.md).
They need the **Historians** licensed feature, described in [Licensing](../../../../Licensing.md), and exactly one historian with **Designated tag historian reader** turned on.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Tags/History/Status` | **View tags** | Reports whether history can be read for the active profile. |
| POST | `/api/v2/Tags/History/Range` | **View tags** | Returns the earliest and latest stored sample times for a set of tags. |
| POST | `/api/v2/Tags/History/Samples` | **View tags** | Returns stored samples for a set of tags between two times, one for each step. |

## Whether history is available

### `GET /api/v2/Tags/History/Status`

Reports whether history can be read for the active profile.
It needs the **View tags** permission, and returns `200` with `available`, and when `available` is `false`, a `reason`.
The `reason` is one of "Historians feature is not licensed.", "No designated tag historian is configured.", "Designated tag historian does not support sample reads.", or "Multiple designated tag historians are configured; exactly one is required."

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Tags/History/Status
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Tags/History/Status -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a Bearer token for a user with the **View tags** permission, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is `{ "available": true }`, or `{ "available": false, "reason": "No designated tag historian is configured." }` when history cannot be read.

This endpoint has no errors of its own beyond sign-in and permission.

## Stored samples

Range and Samples take the full paths of the tags to read in `tagIds`.
Both keep only the tags the caller can see, and return an empty result when the caller can see none of the requested tags.
Both return `503` with the reason that Status gives when history is unavailable.

### `POST /api/v2/Tags/History/Range`

Returns the earliest and latest stored sample times for a set of tags.
It needs the **View tags** permission, and returns `200` with `hasSamples`, and when `hasSamples` is `true`, `earliestUtc` and `latestUtc`.

| Field | Type | Default | Effect |
|---|---|---|---|
| `tagIds` | List of text | Required | The full paths of the tags to read. At least one is required. |

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Tags/History/Range \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"tagIds": ["<tag path>"]}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Tags/History/Range -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"tagIds": ["<tag path>"]}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<tag path>` with the full path of the tag, such as `Pump1/DBC/Status/MotorTemp`.
- `<token>` with a Bearer token for a user with the **View tags** permission.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has `hasSamples` set to `true`, with the times of the first and last stored samples:

```json
{
  "hasSamples": true,
  "earliestUtc": "2026-11-01T00:00:00.0000000Z",
  "latestUtc": "2026-11-20T01:00:00.0000000Z"
}
```

A response of `{ "hasSamples": false }` means the historian holds no samples for the tags, or the caller cannot see them.

`POST /api/v2/Tags/History/Range` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | `tagIds` is missing or empty. | Send at least one tag path in `tagIds`. |
| `503` | History cannot be read, for the reason the message gives. | Fix that reason, which `GET /api/v2/Tags/History/Status` also reports. |

### `POST /api/v2/Tags/History/Samples`

Returns stored samples for a set of tags between two times, one for each step.
It needs the **View tags** permission, and returns `200` with `samplesByTag`, an object with one list for each tag.
Each list starts with the last sample at or before `start`, followed by the last sample in each step of `stepSeconds` up to `stop`.
Each sample has `value`, `utcTimestamp`, `quality`, and `reason`, and a `message` where the historian recorded one.

| Field | Type | Default | Effect |
|---|---|---|---|
| `tagIds` | List of text | Required | The full paths of the tags to read. At least one is required. |
| `start` | Text | Required | The start of the window, as a time relative to `asOf` such as `-1h`, or an ISO 8601 instant such as `2026-11-19T01:00:00Z`. Relative times use the units `s`, `m`, `h`, `d`, `w`, and `y`. |
| `stop` | Text | Required | The end of the window, in the same form as `start`, or `now()`. It must be at or after `start`. |
| `stepSeconds` | Integer | Required | The length of each step in seconds, at least 1. |
| `asOf` | ISO 8601 date and time | Now | The time that relative values of `start` and `stop` count back from. |

To read the last hour of a motor temperature at one-minute steps, send this request:

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Tags/History/Samples \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"tagIds": ["<tag path>"], "start": "-1h", "stop": "now()", "stepSeconds": 60}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Tags/History/Samples -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"tagIds": ["<tag path>"], "start": "-1h", "stop": "now()", "stepSeconds": 60}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a Bearer token for a user with the **View tags** permission, and `<tag path>` with the full path of the tag, such as `Pump1/DBC/Status/MotorTemp`.
The response holds one list for the tag, shortened here to its first two samples:

```json
{
  "samplesByTag": {
    "Pump1/DBC/Status/MotorTemp": [
      { "value": 61.5, "utcTimestamp": "2026-11-19T01:00:00.0000000Z", "quality": "Good", "reason": "ok" },
      { "value": 61.8, "utcTimestamp": "2026-11-19T01:00:58.4000000Z", "quality": "Good", "reason": "ok" }
    ]
  }
}
```

The request worked when the tag's list holds samples with times inside the window.
A tag with no samples in the response has no stored values in that window, or is hidden from the caller.

`POST /api/v2/Tags/History/Samples` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | `tagIds` is missing or empty. | Send at least one tag path in `tagIds`. |
| `400` | `stepSeconds` is less than 1. | Set `stepSeconds` to 1 or more. |
| `400` | The body holds `fromUtc` or `toUtc`, and the message says it is not a series bound. | Use `start` and `stop` in place of `fromUtc` and `toUtc`. |
| `400` | `start` or `stop` is missing or blank. | Send both `start` and `stop`. |
| `400` | `start` or `stop` is not a valid time. | Use a relative time such as `-1h`, `now()`, or an ISO 8601 instant. |
| `400` | `start` is after `stop`. | Move `start` to or before `stop`. |
| `503` | History cannot be read, for the reason the message gives. | Fix that reason, which `GET /api/v2/Tags/History/Status` also reports. |
