---
title: InfluxDB v1 Logger
description: "Log selected tag collections to an InfluxDB v1 server, with the settings, the health check option for InfluxDB Cloud, and what to check if no data arrives."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# InfluxDB v1 Logger

The **InfluxDB v1 Logger** sends the values of the [tags](../../Tags/index.md) in selected [tag collections](../../Tags/Collections/index.md) to an InfluxDB v1 server.
A logger only writes data out.
The InfluxDB v2 and v3 components are [historians](../Historians/index.md), which also allow the data to be read back.

<figure markdown>
```mermaid
flowchart LR
    subgraph Profinity["Profinity"]
        Collections["Tag collections"] --> V1["InfluxDB v1 Logger"]
    end
    V1 --> Influx["InfluxDB v1 server"]
```
<figcaption>The InfluxDB v1 Logger pushes the selected tag collections to an InfluxDB v1 server</figcaption>
</figure>

<figure markdown>
![InfluxDB dashboard with a Pack Voltage line chart falling from about 25.4k to 24.8k and a Pack Current line chart near -4.99k](../../images/InfluxDB.png)
<figcaption>InfluxDB dashboard showing pack voltage and pack current logged by Profinity</figcaption>
</figure>

[InfluxDB](https://www.influxdata.com) both stores and visualises data.
InfluxDB v1, v2 and v3 are separate products with different APIs, authentication methods and configuration requirements.
Using the wrong component type results in connection failures, so check the version of your InfluxDB server before you add a component to a [profile](../../Getting_Started/Profiles.md).
For InfluxDB v2 and v3, use the **InfluxDB v2 Historian** or the **InfluxDB v3 Historian**, documented in [InfluxDB historians](../Historians/InfluxDB_Historians.md).
The [Loggers](index.md) page compares this logger with the others.

## Add the logger

InfluxDB v1 uses username and password authentication, and organises data into databases and retention policies.
Install InfluxDB v1 and confirm that it is running, then add an **InfluxDB v1 Logger** to the profile.
Enter the **InfluxDB Database**, add at least one tag collection under **Collections**, and set the other settings as needed.
Nothing is logged until you select at least one tag collection.

| Setting | Default | Purpose |
|---|---|---|
| **InfluxDB Database** | None | The InfluxDB database that the data is stored in. Required. |
| **InfluxDB Username** | Blank | The username for InfluxDB authentication. Leave blank for unsecured connections. |
| **InfluxDB Password** | Blank | The password for InfluxDB authentication. Leave blank for unsecured connections. |
| **InfluxDB Retention Policy** | `autogen` | The InfluxDB retention policy used when writing data. |
| **Influx Server URL** | `http://localhost:8086/` | The endpoint URL that InfluxDB is running on. |
| **Dashboard URL** | Blank | The URL of the InfluxDB dashboard. Optional, and leaving it blank shows no dashboard link. |
| **InfluxDB Health Check** | On | Checks the health of the connection at regular intervals. Turn it off for InfluxDB Cloud, which does not support the check. |
| **Collections** | None | The tag collections whose tags are logged. At least one collection must be configured before the component starts. |
| **Update Interval (Seconds)** | 10 | How often log data is sent, from 1 to 86400 seconds. |
| **Logging mode** | **Snapshot** | Sets what is sent on each interval: **Snapshot**, **On Change** or **Everything**. Refer to [Logging modes](../Logging_Modes.md). |
| **Auto Connect** | On | Starts the logger when the profile loads. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |

## What is stored

Every sample is written with its quality in a `quality` field.
A Good sample also has a `value` field, and a Stale sample keeps its last `value` with quality Stale.
A tag that is Unavailable or Bad is written as a gap, with a `quality` field and no `value`.
A chart can then show the gap instead of an invented reading.
Only tags that hold a number are written, and a query for readings should ask for the `value` field.

Each sample is stored as one point in a measurement named after the profile.
For example, a motor speed signal on a component called `Inverter` is stored like this:

| Part | Example | Meaning |
|---|---|---|
| Tag `component` | `Inverter` | The component that owns the tag. |
| Tag `message` | `Status` | The CAN message the signal belongs to. |
| Tag `signal` | `Speed` | The signal name. |
| Tag `full_tag_id` | `Inverter/DBC/Status/Speed` | The tag's path when the sample was written. |
| Field `value` | `23.4` | The reading. |
| Field `quality` | `Good` | The quality of the reading. |

In InfluxDB line protocol, that point is:

```text
MyProfile,profile=MyProfile,component=Inverter,message=Status,signal=Speed,full_tag_id=Inverter/DBC/Status/Speed value=23.4,quality="Good" 1792315200000000000
```

The `component`, `message` and `signal` tags identify the tag in the history.
Characters other than letters and digits in these names are replaced with underscores.

## If data does not arrive

When the settings are correct, data flows into InfluxDB v1.
If it does not, check the Profinity system logs, as described in [Logs](../../Administration/Logs_Config.md).
If the logger cannot reach InfluxDB, it shows **Error**, writes the reason to the logs once, and retries every 5 seconds until the problem clears.

To add the logger and start it, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md).
To send data to InfluxDB Cloud, refer to [How to log data to InfluxDB](../../How_To_Guides/Log_Data_to_InfluxDB.md).
