---
title: Read real-time and historical tag data
description: "Read the latest value and past values of tags through the Profinity API with TagQuerySet, poll for changes, and read one tag or CAN database signal."
type: task
owner: Documentation
last_reviewed: 2026-11-11
---

# Read real-time and historical tag data

Read the latest value of a set of tags, or their values over a time window, from your own application, then poll the same set for changes.
Profinity serves recent values from memory, and older values from the profile's [designated historian](../../Components/Historians/Designated_Historian.md).

You need:

- A Bearer token for a user with the **View tags** permission, as described in [Authenticate to the Profinity REST API](API_Authentication.md).
- For values older than those Profinity keeps in memory, a historian in the profile with **Designated tag historian reader** turned on, as described in [Designated historian](../../Components/Historians/Designated_Historian.md).

## Read a set of tags

1. Send `POST /api/v2/TagQuerySet` with a JSON body that lists the tags in `bindings`. This body reads the latest value of one tag, and the last hour of another averaged over one-minute intervals:

    ```json
    {
      "bindings": [
        { "source": "<first tag path>" },
        { "source": "<second tag path>",
          "start": "-1h", "stop": "now()",
          "aggregationWindow": "1m", "aggregationFunction": "Mean" }
      ]
    }
    ```

    Replace each `<tag path>` with the full path of a tag, such as `Charger/DBC/BMSInfo/Temp`.

2. Check the response, which has the form `{ "srcSetId": "...", "data": [ ... ] }`, with an entry in `data` for each binding. Note the `srcSetId`, which names the set for step 3.
3. Send `GET /api/v2/TagQuerySet/Delta/<srcSetId>` to poll the set, replacing `<srcSetId>` with the value from step 2. The response is an array of `{ "src", "val", "historicalTimeSeries" }` entries for the values that changed since the previous poll.

The query worked when the response to step 2 holds values for each binding.
Profinity keeps the set for 15 minutes after the last poll, so poll more often than that, or send the request in step 1 again.

## Binding settings

Each binding needs only `source`, and Profinity skips a binding whose `source` is empty.
The aggregation settings apply only to the older values from the historian, and they have the same meaning as in a dashboard binding.

| Setting | Type | Default | Effect |
|---|---|---|---|
| `source` | Text | None | The full path of the tag. Required. |
| `start`, `stop` | Text | `start` is `-10m`, `stop` is now | The time window, as a time relative to now such as `-10m`, or an ISO 8601 instant. A binding without either returns the latest value. Values older than the memory window come from the designated historian, as described in [Live and past data](../../Customising_Profinity/Dashboards/Data_Binding/index.md#live-and-past-data). |
| `seriesMode` | Choice | `instant` | How the window is returned: `instant`, `timeSeries`, or `timeSeriesDelta`. |
| `aggregationWindow` | Text | None | The length of each interval for the older values from the historian, such as `1m`. |
| `aggregationFunction` | Choice | `max` | How each interval is reduced: `max`, `mean`, `min`, `last`, `first`, `sum`, or `count`. |

The full list is in [Binding settings reference](../../Customising_Profinity/Dashboards/Data_Binding/Binding_Settings_Reference.md).

To choose the set's name yourself, add `srcSetId` to the body.
Profinity then uses that name and replaces any set that already has it, and without `srcSetId` it names the set for you.

## Read the latest value of one item

`GET /api/v2/Tags/Sample/<tag path>` returns the latest sample of one tag, as shown in [Make your first API call](../First_API_Call.md).

`GET /api/v2/DBC/<component>/<message>/<signal>` returns the latest value that Profinity holds for one signal from a component's CAN database (DBC) file.
It needs the **View DBC definitions** permission.

## Troubleshooting

| What you see | Cause | What to do |
|---|---|---|
| A binding returns an error that names `store`, `timeRangeStart`, or `timeRangeStop` | The binding uses settings that Profinity 2.3 replaced. | Remove `store`, and rename `timeRangeStart` to `start` and `timeRangeStop` to `stop`. |
| A poll of the delta route returns `400` with "Invalid source set." | The set expired, or `srcSetId` is mistyped. | Send the request in step 1 again, and poll with the new `srcSetId`. |
| A binding with a window returns no older values | No historian has **Designated tag historian reader** on, or more than one has. | Turn it on for exactly one historian in the profile. |
| `403` | The user does not have the **View tags** permission. | Give the user a role with **View tags**. |

For the other routes, refer to the [Endpoint Reference](Endpoint_Reference.md).
