---
title: Logging modes
description: "What the Snapshot, On Change and Everything logging modes send, how the update interval applies in each, and where the default interval differs."
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Logging modes {#logging-modes}

The **Logging mode** setting decides what a component sends or writes for the members of its selected [tag collections](../Tags/Collections/index.md) on each interval.
There are three modes: **Snapshot**, **On Change** and **Everything**.

## The three modes

- **Snapshot** sends or writes the current value of every collection member on each interval, whether or not the value changed.
- **On Change** sends or writes only values that have changed.
- **Everything** sends or writes every sample that arrives, including unchanged values.

**Snapshot** is the default on every component page that states a default.
**Everything** gives the most detailed recording and the largest volume of data.
Choose the mode that matches the resolution of measurement you need.

## How the update interval applies

In **Snapshot** mode the interval is how often the current value of each member is sent or written.
In **On Change** and **Everything** modes the interval is how often the pending changes or samples are sent, or flushed to the file or database.
The pages for the Message Queuing Telemetry Transport (MQTT) Publisher, the Webhook Publisher, the file and tag loggers, and the Structured Query Language (SQL) historian state this explicitly.
The pages for InfluxDB and Prometheus logging and the InfluxDB historians say that the mode sets what is sent on each interval.
[How to log data to the cloud (InfluxDB)](../How_To_Guides/Log_Data_to_Cloud_Influx.md) describes **On Change** as sending the changes recorded during the interval.
The next section links each page.

## Components that offer logging modes

These component pages list a **Logging mode** setting:

- The **InfluxDB v1 Logger**, on [InfluxDB and Prometheus logging](Loggers/index.md).
- The **InfluxDB v2 Historian** and the **InfluxDB v3 Historian**, on [InfluxDB historians](Historians/InfluxDB_Historians.md).
- The **TAG File Logger** and the **TAG SFTP Logger** (Secure File Transfer Protocol), on [File and tag loggers](Loggers/index.md).
- The **TAG SQL Historian**, on [TAG SQL Historian](Historians/TAG_SQL_Historian.md).
- The **MQTT Publisher**, on [MQTT Publisher](Publishers_and_Subscribers/MQTT_Publisher.md).
- The **Webhook Publisher**, on [Webhook Publisher](Publishers_and_Subscribers/Webhook_Publisher.md).
- The **Prohelion Cloud Dashboard** component, on [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md).

The **Tag Relay Sender** has a **Snapshot interval (seconds)** setting and no **Logging mode**.
It sends a full snapshot of the selected collections at a fixed interval, as described on [Tag Relay Sender](Tag_Relays/Tag_Relay_Sender.md).
The [How to configure data logging](../How_To_Guides/Configure_Data_Logging.md) guide shows where to set the mode in the loggers and publishers it covers.
