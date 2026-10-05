---
title: InfluxDB / Prometheus
description: "Log CAN data to InfluxDB (V1, V2, V3) or Prometheus for time-series storage and analysis."
---

# InfluxDB and Prometheus Logging

Profinity can both [log and replay messages](../../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) from a CAN bus network and log CAN bus data to time-series databases such as InfluxDB and Prometheus.

<figure markdown>
![Historians (InfluxDB v2, InfluxDB v3, TAG SQL) store and read data back; Publishers and subscribers (MQTT, Webhook) stream it in both directions; Loggers (file, SFTP, InfluxDB v1, Prometheus) stream it out; a Prohelion Cloud dashboard gives hosted monitoring](../../images/2.3-diagram-data-out.png)
<figcaption>Data out of Profinity: historians, publishers and subscribers, loggers, and Prohelion Cloud</figcaption>
</figure>

<figure markdown>
![InfluxDB dashboard showing pack voltage and pack current](../../images/InfluxDB.png)
<figcaption>InfluxDB dashboard showing pack voltage and pack current logged by Profinity</figcaption>
</figure>

[InfluxDB](https://www.influxdata.com) is an all-in-one tool that provides both data storage and visualisation, whereas [Prometheus](https://prometheus.io) provides data storage only and is typically coupled with [Grafana](https://grafana.com) for visualisation.

InfluxDB, Prometheus and Grafana are each available in commercially supported and open source (community supported) editions.

## InfluxDB

!!! danger "InfluxDB V1, V2, and V3 are Separate, Incompatible Products"
    InfluxDB V1, V2, and V3 are **separate, incompatible products** with different APIs, authentication methods, and configuration requirements. The component type selected in Profinity must match the InfluxDB version installed, and using the wrong component type results in connection failures.

Profinity provides a separate component for each InfluxDB version, so the version of InfluxDB in use must be known before an InfluxDB component is added to your profile. The InfluxDB V1 component is registered as the **InfluxDB v1 Logger**, whereas the V2 and V3 components are registered as the **InfluxDB v2 Historian** and the **InfluxDB v3 Historian**, which are the same kind of time-series sink and which additionally allow data to be read back through the APIs.

### InfluxDB v1 Logger

InfluxDB V1 uses username/password authentication and the concept of databases and retention policies.

To log your CAN bus data to InfluxDB V1, first install InfluxDB V1 and confirm that it is running, then add an InfluxDB v1 Logger to your profile and configure the following options:

| Setting                    | Purpose                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| InfluxDB Database          | The InfluxDB database that the data is stored in.                                                     |
| InfluxDB Username          | The username for InfluxDB authentication. Leave blank for unsecured connections.                      |
| InfluxDB Password          | The password for InfluxDB authentication. Leave blank for unsecured connections.                      |
| InfluxDB Retention Policy  | The InfluxDB retention policy used when writing data. The default is `autogen`.                       |
| Influx Server URL          | The endpoint URL that InfluxDB is running on.                                                         |
| Dashboard URL              | The URL of the InfluxDB dashboard. Optional, and leaving it blank shows no dashboard link.             |
| InfluxDB Health Check      | Performs a health check on the connection at regular intervals.                                        |
| Collections            | The tag collections whose tags are logged. At least one collection must be configured before the component starts. |
| Logging Interval (Sec)     | The interval, in seconds, at which log data is sent.                                                   |
| Logging mode               | Sets what is sent on each interval: `Snapshot`, `On Change` or `Everything`. See [Logging Modes](#logging-modes). |

When these settings are correct, data flows into InfluxDB V1. If it does not, check the [Logs](../../Getting_Started/Profinity_Log.md) for more details.

!!! warning "InfluxDB Cloud HealthCheck Warning"
    InfluxDB Cloud does not support the InfluxDB Health Check API, so the InfluxDB Health Check setting must be set to false when InfluxDB Cloud is used to store your data.

### InfluxDB v2 and v3 Historians

The InfluxDB V2 and V3 components are registered as historians rather than loggers, because they additionally allow data to be read back through the APIs, and they are documented in the **Historians** section: see the [InfluxDB v2 Historian](../Historians/InfluxDB_v2_Historian.md) and the [InfluxDB v3 Historian](../Historians/InfluxDB_v3_Historian.md). They share the [Logging modes](#logging-modes) described below.

### Logging Modes

The `Logging mode` setting determines what Profinity sends to Influx on each interval. With `Snapshot`, Profinity sends every value currently stored in its DBC register on the interval. With `On Change`, Profinity sends a list of every change recorded on the DBC message or signal during that interval. With `Everything`, Profinity sends every sample that arrives, including unchanged values. The mode therefore selects between a lower detail (lower data) recording and a higher detail (higher data) recording, depending on the resolution of measurement required.

## Prometheus

[Prometheus](https://prometheus.io) logging works differently from InfluxDB logging. InfluxDB expects its data to be pushed to it, whereas Prometheus treats Profinity as a source of data and calls it to request the latest values. Prometheus also has no graphing capability out of the box, and is usually coupled with a tool such as [Grafana](https://grafana.com) to provide it.

Adding a Prometheus Logger to Profinity is all that is required on the Profinity side to set up Prometheus logging, and the following connection values can be set, in addition to the **Collections** setting, which selects the tag collections that are served and which must contain at least one collection before the component starts:

| Setting               | Purpose                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Data endpoint URL     | The URL path, within the hostname and port, that the Prometheus data is served on. The default is `metrics/`. |
| Server Hostname       | The hostname or IP address that the Prometheus scraper connects to on the local machine. The default is `localhost`. |
| Server Port           | The port that the endpoint runs on. The default is `7065`.                               |
| Dashboard URL         | The full URL of the Prometheus dashboard. Optional, and leaving it blank shows no dashboard link. |
| Update Interval (Seconds) | The interval, in seconds, between samples. The default is `10`, and the value must be between `10` and `86400`. |
| Auto Start            | Starts the logger automatically when the profile is loaded, and is enabled by default.   |

Once the Prometheus Logger is active, Prometheus can call Profinity on this URL to receive data. With all settings left at their defaults, for example, the data is served at:

```text
http://localhost:7065/metrics
```

Configuring [Prometheus](https://prometheus.io) to receive and display this data is covered in the Prometheus documentation.
