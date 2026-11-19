---
title: Tag history API
description: "Look up the REST API endpoints that report whether tag history can be read and return stored samples from the designated historian."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Tag history API

The Tag history API, the TagHistory group in Swagger, reads past tag values from the profile's designated historian.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

To read a window of values with aggregation, refer to [Read real-time and historical tag data](../Read_Tag_Data.md).
These endpoints read stored values from the profile's [designated historian](../../../Components/Historians/Designated_Historian.md), which the **Live** and **View at a time** control on a dashboard also uses, as described in [View a dashboard at a past time](../../../How_To_Guides/View_Dashboard_at_a_Past_Time.md).
They need the **Historians** licensed feature, described in [Licensing](../../../Licensing.md), and exactly one historian with **Designated tag historian reader** turned on.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| GET | `/api/v2/Tags/History/Status` | **View tags** | Reports whether history can be read for the active profile. |
| POST | `/api/v2/Tags/History/Range` | **View tags** | Returns the earliest and latest stored sample times for a set of tags. |
| POST | `/api/v2/Tags/History/Samples` | **View tags** | Returns stored samples for a set of tags between two times, one for each step. |

Status returns `available`, and when it is `false`, a `reason` such as "No designated tag historian is configured." or "Historians feature is not licensed."
Range and Samples return `503` with the same reason when history is unavailable.
Range returns `hasSamples`, and when it is `true`, `earliestUtc` and `latestUtc`.
Both endpoints keep only the tags the caller can see, and return an empty result when the caller can see none of the requested tags.

Samples returns `samplesByTag`, an object with one list for each tag.
Each list starts with the last sample at or before `start`, followed by the last sample in each step of `stepSeconds` up to `stop`.
Each sample has `value`, `utcTimestamp`, `quality`, and `reason`, and a `message` where the historian recorded one.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `tagIds` | List of text | Required | Range and Samples. The full paths of the tags to read. A request with an empty list returns `400`. |
| `start` | Text | Required | Samples only. The start of the window, as a time relative to `asOf` such as `-1h`, or an ISO 8601 instant such as `2026-11-19T01:00:00Z`. Relative times use the units `s`, `m`, `h`, `d`, `w`, and `y`. |
| `stop` | Text | Required | Samples only. The end of the window, in the same form as `start`, or `now()`. It must be at or after `start`. |
| `stepSeconds` | Integer | Required | Samples only. The length of each step in seconds, at least 1. |
| `asOf` | ISO 8601 date and time | Now | Samples only. The time that relative values of `start` and `stop` count back from. |

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
`GET /api/v2/Tags/History/Status` shows whether history can be read at all.
