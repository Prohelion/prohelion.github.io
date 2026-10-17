---
title: Logging modes
description: "What the Snapshot, On Change and Everything logging modes send, how the update interval applies in each, and which components differ in defaults and ranges."
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Logging modes {#logging-modes}

The **Logging mode** setting decides what a component sends or writes for the members of its selected [tag collections](../Tags/Collections.md) on each interval.
There are three modes: **Snapshot**, **On Change** and **Everything**.

## The three modes

- **Snapshot** sends or writes the current value of every collection member on each interval, whether or not the value changed.
- **On Change** sends or writes only values that have changed, except as described under [DBC notification mode](#dbc-notification-mode).
- **Everything** sends or writes every sample that arrives, including unchanged values.

**Snapshot** is the default on every component page that states a default.
**Everything** gives the most detailed recording and the largest volume of data, so choose the mode by the resolution of measurement required.

## How the update interval applies

In **Snapshot** mode the interval is how often the current value of each member is sent or written.
In **On Change** and **Everything** modes the interval is how often the pending changes or samples are sent, or flushed to the file or database.
The [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md), the [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md), [File and tag loggers](Loggers/index.md) and the [TAG SQL Historian](Historians/TAG_SQL_Historian.md) state this explicitly.
The [InfluxDB and Prometheus logging](Loggers/index.md) and [InfluxDB historians](Historians/InfluxDB_Historians.md) pages say that the mode sets what is sent on each interval, and [How to log data to the cloud (InfluxDB)](../How_To_Guides/Log_Data_to_Cloud_Influx.md) describes **On Change** as sending the changes recorded during the interval.

## Components that offer logging modes

These component pages list a **Logging mode** setting:

- The **InfluxDB v1 Logger**, on [InfluxDB and Prometheus logging](Loggers/index.md).
- The **InfluxDB v2 Historian** and the **InfluxDB v3 Historian**, on [InfluxDB historians](Historians/InfluxDB_Historians.md).
- The **TAG File Logger** and the **TAG SFTP Logger**, on [File and tag loggers](Loggers/index.md).
- The **TAG SQL Historian**, on [TAG SQL Historian](Historians/TAG_SQL_Historian.md).
- The **MQTT Publisher**, on [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md).
- The **Webhook Publisher**, on [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md).
- The **Prohelion Cloud Dashboard** component, on [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md).

The **Tag Relay Sender** lists a **Snapshot interval (seconds)** setting and no **Logging mode**.
It sends a full snapshot of the selected collections at a fixed interval, as described on [Tag Relay Sender](Tag_Relays/Tag_Relay_Sender.md).
The [How to configure data logging](../How_To_Guides/Configure_Data_Logging.md) guide shows where to set the mode in the loggers and publishers it covers.

## Which components differ

The pages agree on the three modes and on **Snapshot** as the default.
They differ in the interval setting, as follows.

| Difference | Component page | Value stated |
|---|---|---|
| Name of the interval setting | [InfluxDB and Prometheus logging](Loggers/index.md) (InfluxDB v1 Logger) | **Logging Interval (Sec)** |
| | [InfluxDB historians](Historians/InfluxDB_Historians.md) | **Logging Interval (Sec)** |
| | [File and tag loggers](Loggers/index.md), [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md), [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md), [TAG SQL Historian](Historians/TAG_SQL_Historian.md), [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | **Update Interval (Seconds)** |
| Interval range | [InfluxDB and Prometheus logging](Loggers/index.md) (InfluxDB v1 Logger) | A minimum of 1 |
| | [InfluxDB historians](Historians/InfluxDB_Historians.md) | A minimum of 1 |
| | [File and tag loggers](Loggers/index.md), [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md), [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md), [TAG SQL Historian](Historians/TAG_SQL_Historian.md), [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | 10 to 86400 seconds |
| Default interval | [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | 60 |
| | [InfluxDB and Prometheus logging](Loggers/index.md), [InfluxDB historians](Historians/InfluxDB_Historians.md), [File and tag loggers](Loggers/index.md), [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md), [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md), [TAG SQL Historian](Historians/TAG_SQL_Historian.md) | 10 |
| Wording of **On Change** | [InfluxDB and Prometheus logging](Loggers/index.md) | Sends every change recorded for those members during the interval |
| | [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md), [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md) | Publishes only when a member's value has changed since the last publish |
| | [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | Sends only values that have changed |
| | [File and tag loggers](Loggers/index.md), [TAG SQL Historian](Historians/TAG_SQL_Historian.md) | Writes value changes |
