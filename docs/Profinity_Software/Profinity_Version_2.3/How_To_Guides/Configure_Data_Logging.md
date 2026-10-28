---
title: How to configure data logging
description: "Choose where to send CAN bus messages or tag values, then add the logger or publisher, select tag collections, start it, and check that data is flowing."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to configure data logging

Set up data logging or publishing to send CAN bus messages or tag values to files, InfluxDB, Prometheus, a Message Queuing Telemetry Transport (MQTT) broker, or a webhook.
Choose a destination in the table, then follow the steps on this page and the settings on that component's page.
This page holds the steps every destination shares: adding the component, selecting tag collections, starting it, checking it, and fixing the common failures.

## Prerequisites

- An active profile with components configured
- Access to the destination: a file system or a Secure Shell (SSH) File Transfer Protocol (SFTP) server, InfluxDB, Prometheus, an MQTT broker, or a webhook receiver
- The **Modify components** permission, which allows loggers and publishers to be added
- The licensed feature in the **What it needs** column of the destination table, if any

[Licensing](../Licensing.md) lists the features of each edition.

## Choose a destination

| Destination | Component | Category | What it needs |
|-------------|-----------|----------|---------------|
| A file on the local file system | **[CAN File Logger](../Components/Loggers/CAN_File_and_SFTP_Loggers.md)** (native CAN bus messages), **[TAG File Logger](../Components/Loggers/Tag_File_and_SFTP_Loggers.md)** (tag values) | Loggers | No licensed feature |
| A file on an SFTP server | **CAN SFTP Logger**, **TAG SFTP Logger** | Loggers | No licensed feature |
| InfluxDB v1 | **[InfluxDB v1 Logger](../Components/Loggers/InfluxDB_v1_Logger.md)** | Loggers | No licensed feature |
| InfluxDB v2 or v3 | **[InfluxDB v2 Historian](../Components/Historians/InfluxDB_Historians.md)**, **[InfluxDB v3 Historian](../Components/Historians/InfluxDB_Historians.md)** | Historians | Historians |
| Prometheus | **[Prometheus Logger](../Components/Loggers/Prometheus_Logger.md)** | Loggers | No licensed feature |
| An MQTT broker | **[MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md)** | Publishers & Subscribers | Data Relay |
| An HTTP(S) URL | **[Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md)** | Publishers & Subscribers | Data Relay |

The TAG loggers log the values of the [tags](../Tags/index.md) in selected [tag collections](../Tags/Collections/index.md).
The Loggers and Historians write to a queryable store, so you can retrieve the data later without a live connection.
You can also read Historian data back through the APIs.
The MQTT Publisher and Webhook Publisher push to a receiver that is listening at that moment.
InfluxDB V1, V2, and V3 are separate, incompatible products, so the component must match the installed InfluxDB version.

For InfluxDB Cloud and the InfluxDB-side setup, refer to [How to log data to InfluxDB](./Log_Data_to_InfluxDB.md).
For recording tags to a file so they can be replayed, refer to [Log tags to a file](../Tags/Tag_Logs/Log_Tags_to_a_File.md).

## Add the component

1. Select **ADD COMPONENT** in the side menu or on the home page.
2. Select the logger or publisher type from the table in Choose a destination.
3. Enter its settings, which the component page in the table lists, including the tag collections to log as described in [Select tag collections](#select-tag-collections).
4. Select **ADD COMPONENT** at the bottom of the dialog.
   The button reads **SAVE** when you change the settings of an existing component.

A component whose licensed feature is missing shows as unavailable.

## Select tag collections

The TAG File Logger, TAG SFTP Logger, InfluxDB loggers and historians, Prometheus Logger and both publishers log only the tags in the collections you select.

1. In **Collections**, add a row for each tag collection to log or publish.
2. Select the collection in that row.

These components start only when at least one collection is configured.

## Start the logger or publisher

Make sure the logger or publisher is added to the active profile.
The **Auto Connect** setting starts the component when the profile loads, and [Connections and reconnecting](../Components/Connections_and_Reconnecting.md) describes its default.
With **Auto Connect** off, start the component yourself.
Then check the component's status in the component list.

## Check that data is flowing

- For file logging, look in the log folder on the machine running Profinity (`can_bus_logs/` for a CAN File Logger, `tag_logs/<profile name>/<logger name>/` for a TAG File Logger), or in the remote directory on the SFTP server, for new log files.
- For InfluxDB or Prometheus, query the database, or the Prometheus server, to confirm that data is arriving, and check the status of the logger or historian component.
- For MQTT or a webhook, subscribe to the configured MQTT topic, or check the webhook receiver's own logs, to see published messages, and check the publisher's status for connection information.

## Troubleshooting

### No data is logged

A logger or publisher that writes nothing is usually not running, or has no tag collection to log.
Check that the component is active.
For a TAG logger, InfluxDB, Prometheus, or a publisher, also check that at least one tag collection is selected, because those components start only when a collection is configured.
Then check that the components that feed the tags are receiving data.

### A connection error appears

A connection error means the destination cannot be reached or does not accept the credentials.
Check the network connection to the destination and the credentials.
For InfluxDB, confirm that the component type matches the installed InfluxDB version, because the wrong component type causes connection failures.
The [Profinity logs](../Administration/Logs_Config.md) record connection errors.

### Data is missing

Gaps in logged data usually come from a logging interval that is too long for the data or from a component that stopped receiving data.
In **Snapshot** mode, a shorter **Update Interval (Seconds)** gives more detailed data, and [Logging modes](../Components/Logging_Modes.md) describes what the other modes do with it.
Also check that the component that supplies the data is receiving it.

## Related pages

- [Loggers](../Components/Loggers/index.md): file, tag, InfluxDB, and Prometheus logger settings
