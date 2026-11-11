---
title: InfluxDB historians
description: "Record tag history to an InfluxDB v2 or v3 server and read it back through the APIs, with setup, settings, and log messages that explain a failed connection."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# InfluxDB historians

The **InfluxDB v2 Historian** and the **InfluxDB v3 Historian** write the values of the tags in the [collections](../../Tags/Collections/index.md) you select to an InfluxDB server.
Dashboards and integrations can read that history back.
They sit in the **Historians** group.
Each recorded value belongs to a [tag](../../Tags/index.md), identified by its [tag tree path](../../Tags/Selecting_Tags/Tag_Tree_Path.md).

Use the **InfluxDB v2 Historian** if your InfluxDB server stores data in buckets that belong to an organisation.
Use the **InfluxDB v3 Historian** if your InfluxDB server stores data in a single database.
Both authenticate with a token.
Both work with InfluxDB Cloud as well as with a server you run: for InfluxDB Cloud, enter its address in **Influx Server URL**.

<figure markdown>
```mermaid
flowchart LR
    subgraph Profinity["Profinity"]
        Tags --> Collections["Tag collections"] --> Historian["InfluxDB historian"]
    end
    subgraph Server["InfluxDB server"]
        Store["InfluxDB"]
    end
    Historian --> Store
```
<figcaption>An InfluxDB historian writes the tags in the selected collections to the InfluxDB server, and the APIs read the history back</figcaption>
</figure>

Check which InfluxDB version your server runs before adding a component.
InfluxDB v1, v2 and v3 are incompatible, and a component only connects to the version it was built for, so a mismatch causes connection failures.
An InfluxDB v1 server needs the [InfluxDB v1 Logger](../Loggers/InfluxDB_v1_Logger.md), which is a logger rather than a historian.

## Quick start {#adding-an-influxdb-historian}

You need:

- A running InfluxDB v2 or v3 server, and a token for it that can write to the bucket or database.
- An edition with the **Historians** licensed feature, as described in [Licensing](../../Licensing.md).
- The **Modify components** permission.

1. Select **ADD COMPONENT**, then select **InfluxDB v2 Historian** or **InfluxDB v3 Historian** in the **Historians** group, to match your server.
2. For the v2 historian, enter **InfluxDB Bucket** and **InfluxDB Organisation**. For the v3 historian, enter **InfluxDB Database**.
3. Enter the **InfluxDB Token**.
4. Under **Collections**, add at least one tag collection. The historian needs one before it can start.
5. If InfluxDB is not at `http://localhost:8086/`, enter its address in **Influx Server URL**.
6. Select **ADD COMPONENT**. **Auto Connect** is on by default, so the historian starts at once.
7. Check that **STATUS** shows **On**.

Data appears in InfluxDB after the first **Update Interval (Seconds)**, 10 seconds by default.

## Settings

These settings say where the data is stored, and differ between the two historians.

| Setting | Type | Applies to | Default | Purpose |
|---|---|---|---|---|
| **InfluxDB Bucket** | Text | InfluxDB v2 Historian | None | The InfluxDB bucket that the data is stored in. Required. |
| **InfluxDB Organisation** | Text | InfluxDB v2 Historian | None | The InfluxDB organisation that owns the bucket. Required. |
| **InfluxDB Database** | Text | InfluxDB v3 Historian | None | The InfluxDB v3 database that the data is stored in. Required. |

These settings are the same on both historians.

| Setting | Type | Default | Purpose |
|---|---|---|---|
| **InfluxDB Token** | Secret | None | The security token of the InfluxDB user that Profinity connects as. Required, and stored encrypted. |
| **Influx Server URL** | Text | `http://localhost:8086/` | The endpoint URL that InfluxDB is running on. |
| **Dashboard URL** | Text | Blank | The URL of the InfluxDB dashboard. Optional, and leaving it blank shows no dashboard link. |
| **InfluxDB Health Check** | On or off | On | Checks the health of the InfluxDB server when the component connects and about every 30 seconds while it runs. Turn it off for InfluxDB Cloud, which does not support the check. |
| **Collections** | Choice | None | One or more [tag collections](../../Tags/Collections/index.md) whose tags are recorded. The picker shows display names (and group path); the profile stores the collection id. At least one collection must be configured before the component starts. |
| **Update Interval (Seconds)** | Time | 10 | How often data is sent, from 1 to 86400 seconds. |
| **Logging mode** | Choice | `Snapshot` | Sets what is sent on each interval: `Snapshot`, `On Change` or `Everything`. Refer to [Logging modes](../Logging_Modes.md). |
| **Auto Connect** | On or off | On | Starts the historian when the profile loads. When off, start it with **Start Logger**. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |
| **Allow Retrieval** | On or off | On | Allows data to be retrieved through this historian using the APIs. |
| **Designated tag historian reader** | On or off | Off | Makes this historian the one that dashboards and integrations read older tag history from. Turn it on for exactly one historian in the profile, and only while **Allow Retrieval** is on. Refer to [Designated historian](Designated_Historian.md). |

## Example

Add an example under `components:` in the `profile.yaml` file of the profile.
The first is an InfluxDB v2 Historian.

```yaml
- component:
    type: InfluxDbHistorianV2
    id: InfluxDbHistorianV21
    name: InfluxDB v2 Historian
    tagTreeParentPath: /
    url: http://localhost:8086/
    bucket: YOUR_BUCKET
    organisation: YOUR_ORGANISATION
    token: YOUR_INFLUXDB_TOKEN
    intervalSec: 10
    logType: Snapshot
    allowRetrieval: true
    collections:
    - collectionName: YOUR_COLLECTION_ID
```

The second is an InfluxDB v3 Historian, which takes a database in place of a bucket and an organisation.

```yaml
- component:
    type: InfluxDbHistorianV3
    id: InfluxDbHistorianV31
    name: InfluxDB v3 Historian
    tagTreeParentPath: /
    url: http://localhost:8086/
    database: YOUR_DATABASE
    token: YOUR_INFLUXDB_TOKEN
    intervalSec: 10
    logType: Snapshot
    collections:
    - collectionName: YOUR_COLLECTION_ID
```

Replace `YOUR_BUCKET`, `YOUR_ORGANISATION` and `YOUR_DATABASE` with the names in your InfluxDB server.
Replace `YOUR_INFLUXDB_TOKEN` with your InfluxDB token, which Profinity stores encrypted.
Replace `YOUR_COLLECTION_ID` with the id of a tag collection in the profile.

## What is stored

Every sample is written with its quality in a `quality` field.
A Good sample also has a `value` field, and a Stale sample keeps its last `value` with quality Stale.
A tag that is Unavailable or Bad is written as a gap, with a `quality` field and no `value`.

A chart can then show the gap instead of an invented reading.
Only tags that hold a number are written, and a query for readings should ask for the `value` field.

Each sample is stored as one point in a measurement named after the profile.
For example, a motor speed signal on a component called `Inverter`, in a profile called `MyProfile`, is stored like this:

| Part | Example | Meaning |
|---|---|---|
| Tag `profile` | `MyProfile` | The profile that wrote the sample. |
| Tag `component` | `Inverter` | The component that owns the tag. |
| Tag `message` | `Status` | The CAN message the signal belongs to. |
| Tag `signal` | `Speed` | The signal name. |
| Tag `full_tag_id` | `Inverter/DBC/Status/Speed` | The tag's path when the sample was written. |
| Field `value` | `23.4` | The reading. |
| Field `quality` | `Good` | The quality of the reading. |

Characters other than letters and digits in these names are replaced with underscores.

For the full procedure to send data to InfluxDB Cloud, refer to [How to log data to InfluxDB](../../How_To_Guides/Log_Data_to_InfluxDB.md).

## Troubleshooting {#if-data-does-not-arrive}

When a historian cannot connect, **STATUS** shows **Error**, and the [Logs](../../Administration/Logs_Config.md) page under **ADMIN** has a line of the form `<component name>: could not connect (<reason>). Retrying every 5 s.`
Find the reason in this table.

| What you see | Cause | What to do |
|---|---|---|
| The log gives `credential validation failed (likely an invalid token)` as the reason | The token is wrong, or it cannot write to the bucket or database. | Enter a token in **InfluxDB Token** that has write access to the bucket or database. |
| The log gives `the health check failed (InfluxDB Cloud has none; switch Health Check off in the settings)` as the reason | The server did not answer the health check. | Turn **InfluxDB Health Check** off if you use InfluxDB Cloud. |
| The log gives any other text as the reason | The connection failed for another reason, and the text is the error that InfluxDB or the network gave. | Check **Influx Server URL**, then the bucket and organisation, or the database name. Check that the InfluxDB server is running and that the computer running Profinity can reach it. |

To add a historian and start it, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md).
For an InfluxDB v1 server, refer to [InfluxDB v1 Logger](../Loggers/InfluxDB_v1_Logger.md).
