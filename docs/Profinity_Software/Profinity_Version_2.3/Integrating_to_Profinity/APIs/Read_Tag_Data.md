---
title: Read real-time and historical tag data
description: "Query logged tag values from InfluxDB with TagQuerySet, poll for changes, and read the latest value of one tag or CAN database signal through the API."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Read real-time and historical tag data

The APIs provide both real-time and historical data when an InfluxDB database is configured in the profile.
If no InfluxDB database is set up, only real-time data is available.
Each request needs a Bearer token (refer to [Authenticate to the Profinity REST API](API_Authentication.md)).

## Read historical data

Historical data is retrieved in three steps.
Step 2 uses `POST /api/v2/TagQuerySet`, which requires the `TagView` permission (**View tags**).
For more information on configuring InfluxDB, refer to [InfluxDB and Prometheus Logging](../../Components/Loggers/index.md).

1. Configure an InfluxDB database in the profile.
2. Send `POST /api/v2/TagQuerySet` with a body that holds an optional `srcSetId` and a list of `bindings`. The response carries the matching values and a `srcSetId`.
    - Each binding names a tag `source` and a `store` of `Local` or `Logged`.
    - For the `Logged` store, a binding also carries the `timeRangeStart` and `timeRangeStop` of the InfluxDB range.
    - A `Logged` binding can also carry `seriesMode`, `aggregationWindow` and `aggregationFunction` values.
    - Only `source` is required in a binding, and a binding with an empty `source` is skipped.
    - If you omit `srcSetId`, the server numbers the set for you, and if you supply one, the server uses it and replaces any set that has the same identifier.
3. Send `GET /api/v2/TagQuerySet/Delta/{sourceSet}` to poll that set, replacing `{sourceSet}` with the `srcSetId` from the response in step 2. It returns only the values that have changed since the previous poll.

This request body reads the latest local value of one tag and the last hour of another, averaged over one-minute windows:

```json
{
  "bindings": [
    { "source": "Charger/DBC/BMSInfo/Flag", "store": "Local" },
    { "source": "Charger/DBC/BMSInfo/Temp", "store": "Logged",
      "timeRangeStart": "-1h", "timeRangeStop": "now()",
      "aggregationWindow": "1m", "aggregationFunction": "Mean" }
  ]
}
```

The response has the form `{ "srcSetId": "...", "data": [ ... ] }`, and each poll of the delta route returns an array of `{ "src", "val", "historicalTimeSeries" }` entries for the values that changed.
The set expires after 15 minutes without a poll, and after that you send the full request again.

A response that carries values for the requested time range shows the query worked.

## Read the latest value of one item

Two routes return the latest value of one item.
`GET /api/v2/DBC/{component}/{message}/{signal}` returns the latest local value of a single signal from a CAN database (DBC) and needs the `DBCView` permission (**View DBC definitions**).
`GET /api/v2/Tags/Sample/<full-tag-path>` returns the latest sample of a tag.

For the other routes, refer to the [Endpoint Reference](Endpoint_Reference.md).
