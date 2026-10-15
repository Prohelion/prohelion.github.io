---
title: InfluxDB and Prometheus logging
description: "Log tag collection values to InfluxDB v1 with the InfluxDB v1 Logger, or serve them to Prometheus with the Prometheus Logger, and choose a logging mode."
type: component
owner: Documentation
last_reviewed: 2026-10-14
---

# InfluxDB and Prometheus logging

This page documents two loggers that send the values of the [tags](../../Tags/index.md) in selected [tag collections](../../Tags/Collections.md) to a time-series database: the **InfluxDB v1 Logger**, for InfluxDB v1 servers, and the **Prometheus Logger**.
A logger only writes data out.
The InfluxDB v2 and v3 components are [historians](../Historians/index.md), which also let the data be read back, and they are documented in the Historians section.
Profinity can also [log and replay messages](../../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) from a CAN bus network.

<figure markdown>
```mermaid
flowchart LR
    subgraph Profinity["Profinity"]
        Collections["Tag collections"] --> V1["InfluxDB v1 Logger"]
        Collections --> Prom["Prometheus Logger"]
    end
    V1 --> Influx["InfluxDB v1 server"]
    Prometheus["Prometheus server"] --> Prom
```
<figcaption>The InfluxDB v1 Logger pushes the selected tag collections to an InfluxDB v1 server, and the Prometheus Logger serves them to a Prometheus server that calls Profinity to request the latest values</figcaption>
</figure>

<figure markdown>
![InfluxDB dashboard with a Pack Voltage line chart falling from about 25.4k to 24.8k and a Pack Current line chart near -4.99k](../../images/InfluxDB.png)
<figcaption>InfluxDB dashboard showing pack voltage and pack current logged by Profinity</figcaption>
</figure>

[InfluxDB](https://www.influxdata.com) both stores and visualises data, whereas [Prometheus](https://prometheus.io) stores data only and is usually coupled with [Grafana](https://grafana.com) for visualisation.

## Logging modes

The **Logging mode** setting determines what Profinity sends to the database on each interval, and it applies to the InfluxDB v1 Logger, the [InfluxDB v2 Historian](../Historians/InfluxDB_Historians.md), the [InfluxDB v3 Historian](../Historians/InfluxDB_Historians.md) and the other collection-based loggers.
Nothing is logged until at least one tag collection is selected in **Collections**.

- **Snapshot**, the default, sends the current value of every member of the selected collections on each interval.
- **On Change** sends every change recorded for those members during the interval.
- **Everything** sends every sample that arrives, including unchanged values.

**Everything** gives the most detailed recording and the largest volume of data, so choose the mode by the resolution of measurement required.

## InfluxDB

InfluxDB v1, v2 and v3 are separate products with different APIs, authentication methods and configuration requirements, and using the wrong component type results in connection failures.
Profinity provides a separate component for each InfluxDB version, so the version of InfluxDB in use must be known before a component is added to a [profile](../../Getting_Started/Profiles.md).
The InfluxDB v1 component is the **InfluxDB v1 Logger**, documented below.
The v2 and v3 components are registered as the **InfluxDB v2 Historian** and the **InfluxDB v3 Historian**, which write data in the same way and additionally allow it to be read back through the APIs, and they are documented in the Historians section.

### InfluxDB v1 logger {#influxdb-v1-logger}

InfluxDB v1 uses username and password authentication and the concept of databases and retention policies.
To log data to InfluxDB v1, install InfluxDB v1 and confirm that it is running, then add an **InfluxDB v1 Logger** to the profile.
Enter the **InfluxDB Database**, add at least one tag collection under **Collections**, and set the other settings as needed.

| Setting | Default | Purpose |
|---|---|---|
| **InfluxDB Database** | None | The InfluxDB database that the data is stored in. Required. |
| **InfluxDB Username** | Blank | The username for InfluxDB authentication. Leave blank for unsecured connections. |
| **InfluxDB Password** | Blank | The password for InfluxDB authentication. Leave blank for unsecured connections. |
| **InfluxDB Retention Policy** | `autogen` | The InfluxDB retention policy used when writing data. |
| **Influx Server URL** | `http://localhost:8086/` | The endpoint URL that InfluxDB is running on. |
| **Dashboard URL** | Blank | The URL of the InfluxDB dashboard. Optional, and leaving it blank shows no dashboard link. |
| **InfluxDB Health Check** | On | Performs a health check on the connection at regular intervals. Turn it off for InfluxDB Cloud. |
| **Collections** | None | The tag collections whose tags are logged. At least one collection must be configured before the component starts. |
| **Logging Interval (Sec)** | 10 | The interval, in seconds, at which log data is sent, with a minimum of 1. |
| **Logging mode** | **Snapshot** | Sets what is sent on each interval: **Snapshot**, **On Change** or **Everything**. Refer to [Logging modes](#logging-modes). |
| **Auto Connect** | On | Starts the logger when the profile is loaded. |

When these settings are correct, data flows into InfluxDB v1.
If it does not, check the [Profinity System Logs](../../Getting_Started/Profinity_Log.md) for more details.

InfluxDB Cloud does not support the InfluxDB Health Check API, and **InfluxDB Health Check** is on by default, so set it to off when InfluxDB Cloud is used to store the data.

## Prometheus

[Prometheus](https://prometheus.io) logging works differently from InfluxDB logging.
InfluxDB expects its data to be pushed to it, whereas Prometheus treats Profinity as a source of data and calls it to request the latest values.
Prometheus also has no graphing capability out of the box, so it is usually coupled with a tool such as Grafana.

Adding a **Prometheus Logger** to Profinity is all that is required on the Profinity side to set up Prometheus logging.
The **Collections** setting selects the tag collections that are served, and at least one collection must be selected before the component starts.
The following connection values can also be set.

| Setting | Default | Purpose |
|---|---|---|
| **Data endpoint URL** | `metrics/` | The URL path, within the hostname and port, that the Prometheus data is served on. |
| **Server Hostname** | `localhost` | The host name or IP address that Profinity's Prometheus endpoint answers to. With `localhost`, only a scraper on the same computer can read it. To let a scraper on another computer connect, enter the computer's host name or IP address, or `+` to answer on every address. On Windows, listening on anything other than `localhost` needs a URL reservation, for example `netsh http add urlacl url=http://+:7065/metrics user=DOMAIN\user`, or running Profinity with administrator rights. |
| **Server Port** | 7065 | The port that the endpoint runs on, from 1 to 65535. |
| **Dashboard URL** | Blank | The full URL of the Prometheus dashboard. Optional, and leaving it blank shows no dashboard link. |
| **Update Interval (Seconds)** | 10 | The interval, in seconds, between samples, from 10 to 86400. |
| **Auto Connect** | On | Starts the logger automatically when the profile is loaded. |

Once the Prometheus Logger is active, Prometheus can call Profinity on this URL to receive data.
With all settings left at their defaults, for example, the data is served at:

```text
http://localhost:7065/metrics
```

If the logger cannot reach InfluxDB or open its Prometheus endpoint (for example the port is in use), it shows **Error**, writes the reason to the [Profinity System Logs](../../Getting_Started/Profinity_Log.md) once, and retries every 5 seconds until the problem clears.
If Prometheus shows no data, check that the logger is running, that the scraper is configured with the same hostname, port and endpoint path, and that at least one collection with tags is selected.
Configuring Prometheus to receive and display this data is covered in the Prometheus documentation.

For the steps to set up logging and to send data to InfluxDB Cloud, refer to [How to Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md) and [How to Log Data to the Cloud (InfluxDB)](../../How_To_Guides/Log_Data_to_Cloud_Influx.md).
