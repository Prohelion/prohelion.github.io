---
title: How to configure data logging
description: "Send CAN bus messages or tag values to files, InfluxDB, Prometheus, an MQTT broker or a webhook, and check that data is flowing."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to configure data logging

Set up data logging or publishing to send CAN bus messages or tag values to files, InfluxDB, Prometheus, a Message Queuing Telemetry Transport (MQTT) broker, or a webhook.
Choose a destination in the table, add the component, then follow the section for that destination.

## Prerequisites

- An active profile with components configured
- Access to the destination: a file system or an SSH File Transfer Protocol (SFTP) server, InfluxDB, Prometheus, an MQTT broker, or a webhook receiver
- The **Modify components** permission, which allows loggers and publishers to be added
- The licensed feature for the destination:
    - **Historians** for the InfluxDB v2 and v3 Historians (Desktop, Server, and Enterprise editions).
    - **Data Relay** for the MQTT Publisher and Webhook Publisher (Server and Enterprise editions).
    - No licensed feature for the file and SFTP loggers, the InfluxDB v1 Logger, and the Prometheus Logger, which every edition includes.

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

## Add the component

1. Select **ADD COMPONENT** in the side menu or on the home page.
2. Select the logger or publisher type from the table in Choose a destination.
3. Enter its settings as described in the section for the destination.

A component whose licensed feature is missing shows as unavailable.

## Configure a file or SFTP logger

The **CAN File Logger** writes native CAN bus messages to the local file system.
It needs no destination setting, because it creates its files in the `can_bus_logs/` directory, in a folder named after the profile and the component.
The **TAG File Logger** writes tag values the same way, in the `tag_logs/` directory.
The **CAN SFTP Logger** and the **TAG SFTP Logger** transmit the files to a server.

1. For the **CAN SFTP Logger** and the **TAG SFTP Logger**, set these fields:
    - **Remote Host**
    - **Remote Port**
    - **Remote server username**
    - **Remote server password**
    - **Remote Directory**, which is relative to the home directory of the user on the SFTP server, so it must not start with `/`
2. Set the **Update Interval (Seconds)**.
3. For the **TAG File Logger** and **TAG SFTP Logger**, also set:
    1. The **Logging mode** (`On Change`, `Snapshot`, or `Everything`).
    2. The **File Format** (`CSV` or `JSON Lines`).
4. Set **Rotate By** to **No Rotation**, **Time**, or **File Size**.
   This setting decides when Profinity closes the current log file and creates a new one.
5. For time-based rotation, set **Rotation Interval (Sec)**.
   For size-based rotation, set **Rotate MB**.
6. File loggers can generate large files.
   To manage them:
    1. Enable **Archive the Logs** to move rotated log files into an `archive` folder beneath the log folder. The **CAN SFTP Logger** and the **TAG SFTP Logger** always archive, so they do not show this setting.
    2. Optional: Enable **Compress Logs** to compress rotated logs.
    3. Enable **Limit Number of Archive Files** and set the **Archive File Limit** to the number of log files to retain.
7. For the **TAG File Logger** and **TAG SFTP Logger**, select the tag collections to log in **Collections**.
   At least one collection must be configured before the logger starts, and the logger writes only the tags in those collections.
   Adding a collection row works in the same way as for InfluxDB, which the [InfluxDB section](#configure-an-influxdb-logger-or-historian) describes.
8. Select **ADD COMPONENT** at the bottom of the dialog.
   The button reads **SAVE** when you change the settings of an existing component.

## Configure an InfluxDB logger or historian

1. Add the **InfluxDB v1 Logger**, **InfluxDB v2 Historian** or **InfluxDB v3 Historian** for the InfluxDB version in use.
2. Enter the connection settings:
    1. **Influx Server URL**: the endpoint InfluxDB is running on.
    2. **InfluxDB Database** for V1, **InfluxDB Bucket** and **InfluxDB Organisation** for V2, or **InfluxDB Database** for V3.
    3. **InfluxDB Username** and **InfluxDB Password** for V1, or **InfluxDB Token** for V2 and V3.
3. Set the **Update Interval (Seconds)** and the **Logging mode** (`Snapshot`, `On Change` or `Everything`).
4. In **Collections**, add a row for each tag collection to log, and select the collection in that row.
   The logger starts only when at least one collection is configured, and it logs only the tags in the selected collections.
5. Select **ADD COMPONENT** at the bottom of the dialog.
   The button reads **SAVE** when you change the settings of an existing component.

[How to log data to the cloud (InfluxDB)](./Log_Data_to_Cloud_Influx.md) works through the InfluxDB v2 Historian with InfluxDB Cloud.

## Configure a Prometheus logger

Prometheus collects data from Profinity rather than receiving it, so no destination is configured.

1. Add a **Prometheus Logger** component.
2. Set the **Data endpoint URL**, **Server Hostname** and **Server Port**. The defaults serve data at `http://localhost:7065/metrics`.
3. In **Collections**, select the tag collections to serve, which works in the same way as for InfluxDB.
4. Configure the Prometheus server to collect from that URL.

## Configure an MQTT Publisher or Webhook Publisher

Refer to [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) and [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) for the full setting reference, including the Sparkplug B settings.
Sparkplug B is an MQTT payload format for industrial data.

### MQTT Publisher

1. Set **Name** and configure the broker connection:
    1. **Server URL**: the MQTT broker address, using `mqtts://` for Transport Layer Security (TLS).
    2. **Username** and **Password**: if required.
    3. **Device ID**: the MQTT client ID.
2. Choose the **Payload**, which is JSON or Sparkplug B. For a JSON payload, set the **Destination Topic**, which is the topic the messages are published to.
3. Choose the **Logging mode** (`Snapshot`, `On Change` or `Everything`).
4. Select which tag collections to publish.
5. Select **ADD COMPONENT** at the bottom of the dialog.

### Webhook Publisher

1. Set **Name** and configure the destination:
    1. **Destination URL**: the HTTP(S) endpoint to POST to.
    2. **Authentication**: None, Bearer token, API key header, or Basic auth.
2. Choose the **Logging mode** (`Snapshot`, `On Change` or `Everything`).
3. Select which tag collections to publish.
4. Select **ADD COMPONENT** at the bottom of the dialog.

## Start the logger or publisher

Make sure the logger or publisher is added to the active profile.
The **Auto Connect** setting starts the component when the profile loads, and [Connections and reconnecting](../Components/Connections_and_Reconnecting.md) describes its default.
With **Auto Connect** off, start the component yourself.
Then check the component's status in the component list.

## Check that data is flowing

- For file logging, look in the log folder on the machine running Profinity (`can_bus_logs/` for a CAN File Logger, `tag_logs/` for a TAG File Logger), or in the remote directory on the SFTP server, for new log files.
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
Check the logging interval, because a shorter interval gives more detailed data.
Also check that the component that supplies the data is receiving it.

## Related pages

- [Loggers](../Components/Loggers/index.md): file, tag, InfluxDB, and Prometheus logger settings
