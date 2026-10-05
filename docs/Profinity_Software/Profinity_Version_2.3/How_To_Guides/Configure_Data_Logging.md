---
title: How to Configure Data Logging
description: "Configure data logging to files, InfluxDB, Prometheus, MQTT brokers, or webhooks to capture CAN bus messages or tag values."
---

# How to Configure Data Logging

Set up data logging or publishing to send CAN bus messages or tag values to files, InfluxDB, Prometheus, an MQTT broker, or a webhook.

## Prerequisites

- An active profile with components configured
- (For cloud logging) Access to InfluxDB, Prometheus, an MQTT broker, or a webhook receiver
- The `ComponentModify` permission, which allows loggers and publishers to be added

## Steps

### Step 1: Choose Your Logger or Publisher Type

Profinity supports:

- **[CAN File Logger](../Components/Loggers/File_Loggers.md)** and **CAN SFTP Logger** - log native CAN bus messages to a file, either on the local file system or transmitted to an SFTP server
- **[TAG File Logger](../Components/Loggers/File_Loggers.md)** and **TAG SFTP Logger** - log the values of the [tags](../Tags/index.md) in selected [tag collections](../Tags/Collections.md) to a file, either locally or transmitted to an SFTP server
- **[InfluxDB v1 Logger](../Components/Loggers/InfluxDB_Prometheus_Logger.md)**, **[InfluxDB v2 Historian](../Components/Historians/InfluxDB_v2_Historian.md)** and **[InfluxDB v3 Historian](../Components/Historians/InfluxDB_v3_Historian.md)** - log to an InfluxDB time-series database, one component for each InfluxDB version
- **[Prometheus Logger](../Components/Loggers/InfluxDB_Prometheus_Logger.md)** - serves data for a Prometheus server to collect
- **[MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md)** - publishes data to an MQTT broker
- **[Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md)** - publishes data to an HTTP(S) URL

The file, SFTP, InfluxDB v1 and Prometheus components are **Loggers**, and the InfluxDB v2 and v3 components are **Historians**, which are the same kind of time-series sink and which can additionally be read back through the APIs: all of them write to a queryable store for later, disconnected retrieval.
The MQTT Publisher and Webhook Publisher are in the **Publishers & Subscribers** category: they push to a subscriber that is actively
listening right now, which is why they sit in their own category rather than under Loggers.

### Step 2: Add a Logger or Publisher Component

1. Select **ADD COMPONENT** in the side menu (or on the home page)
2. Select your logger or publisher type:
   - **CAN File Logger**, **CAN SFTP Logger**, **TAG File Logger** or **TAG SFTP Logger** (under Loggers)
   - **InfluxDB v1 Logger** (under Loggers) or **InfluxDB v2 Historian** or **InfluxDB v3 Historian** (under Historians), matching your InfluxDB version, or **Prometheus Logger** (under Loggers)
   - **MQTT Publisher** (under Publishers & Subscribers)
   - **Webhook Publisher** (under Publishers & Subscribers)

### Step 3: Configure a File or SFTP Logger

1. Choose the logger that matches both what is logged and where it goes. The **CAN File Logger** writes native CAN bus messages to the local file system and needs no destination setting, because it creates its files under the Profinity CAN bus log directory (`can_bus_logs/`) in a folder named after the profile and the component. The **TAG File Logger** writes tag values the same way, under the Profinity tag log directory (`tag_logs/`). The **CAN SFTP Logger** and the **TAG SFTP Logger** transmit the files to a server and require the **Remote Host**, **Remote Port**, **Remote server username**, **Remote server password** and **Remote Directory** settings (the remote directory is relative to the home directory of the user on the SFTP server, so it must not start with `/`)
2. Set the **Update Interval (Seconds)**. For the **TAG File Logger** and **TAG SFTP Logger**, also set the **Logging mode** (`On Change`, `Snapshot` or `Everything`), the **File Format** (`CSV` or `JSON Lines`), and, when **Logging mode** is **On Change**, the **DBC Notification Mode** (`Value Change Only` or `Every Decoded Physical Sample`)
3. Set **Rotate By** to **No Rotation**, **Time** or **File Size**, which determines when the current log file is closed and a new one created, and then set **Rotation Interval (Sec)** for time based rotation or **Rotate MB** for size based rotation
4. (Optional) Enable **Archive the Logs** to move rotated log files into an `archive` folder beneath the log folder (the **CAN SFTP Logger** and the **TAG SFTP Logger** always archive, so they do not show this setting), then optionally enable **Compress Logs** to compress rotated logs, and enable **Limit Number of Archive Files** and set the **Archive File Limit** to the number of log files to retain
5. For the **TAG File Logger** and **TAG SFTP Logger**, select the tag collections to log in **Collections**. At least one collection must be configured before the logger starts, and only the tags in those collections are written. Adding a collection row works the same way as for InfluxDB, which is described in [Step 4](#step-4-configure-influxdb-or-prometheus)
6. Save the component

### Step 4: Configure InfluxDB or Prometheus

**InfluxDB:** the component type must match the installed InfluxDB version, because V1, V2 and V3 are separate, incompatible products.

1. Add the **InfluxDB v1 Logger**, **InfluxDB v2 Historian** or **InfluxDB v3 Historian** for your version
2. Enter the connection settings:
   - **Influx Server URL** - the endpoint InfluxDB is running on
   - **InfluxDB Database** for V1, **InfluxDB Bucket** and **InfluxDB Organisation** for V2, or **InfluxDB Database** for V3
   - **InfluxDB Username** and **InfluxDB Password** for V1, or **InfluxDB Token** for V2 and V3
3. Set the **Logging Interval (Sec)** and the **Logging mode** (`Snapshot`, `On Change` or `Everything`)
4. In **Collections**, add a row for each tag collection to log and select the collection in that row, because the logger starts only when at least one collection is configured and logs only the tags that belong to the selected collections
5. Save the component

**Prometheus:** Prometheus collects data from Profinity rather than receiving it, so no destination is configured.

1. Add a **Prometheus Logger** component
2. Set the **Data endpoint URL**, **Server Hostname** and **Server Port** (the defaults serve data at `http://localhost:7065/metrics`)
3. In **Collections**, select the tag collections to serve, which works in the same way as for InfluxDB
4. Configure the Prometheus server to collect from that URL

### Step 5: Configure MQTT Publisher or Webhook Publisher

**MQTT Publisher:**

1. Set **Name**
2. Configure the broker connection:
   - **Server URL** - MQTT broker address (use `mqtts://` for TLS)
   - **Username/Password** - if required
   - **Device ID** - MQTT client ID
3. Choose the **Payload** - JSON or Sparkplug B
4. For a JSON payload, set the **Destination Topic** - the topic the messages are published to
5. Choose **Logging mode** - Snapshot, On Change, or Everything
6. Select which tag collections to publish
7. Click **Save**

**Webhook Publisher:**

1. Set **Name**
2. Configure the destination:
   - **Destination URL** - the HTTP(S) endpoint to POST to
   - **Authentication** - None, Bearer token, API key header, or Basic auth
3. Choose **Logging mode** - Snapshot, On Change, or Everything
4. Select which tag collections to publish
5. Click **Save**

See [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) and [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) for the full setting reference, including the Sparkplug B settings.

### Step 6: Activate the Logger or Publisher

1. Ensure the logger or publisher is added to your active profile
2. It starts automatically when the profile is loaded, provided it is set to start automatically
3. Check its status in the component list

### Step 7: Verify Logging

**File Logging:**

- Check the log folder on the machine running Profinity (`can_bus_logs/` for a CAN File Logger, `tag_logs/` for a TAG File Logger) or the remote directory on the SFTP server for new log files
- Verify data is being written

**InfluxDB/Prometheus:**

- Query the database (InfluxDB), or the Prometheus server, to verify data is arriving
- Check the status of the logger or historian component

**MQTT/Webhook:**

- Subscribe to the configured MQTT topic, or check the webhook receiver's own logs, to see published messages
- Check the publisher's status for connection information

## Tips

- **Start with File Logging**: it is the easiest to set up and verify
- **Monitor Disk Space**: file loggers can generate large files, so use compression and archive limits
- **Use Appropriate Intervals**: balance data granularity against resource usage
- **Verify Cloud Loggers**: confirm data is arriving before relying on a cloud logger
- **Limit Collections**: publish only the tag collections you need to reduce data volume

## Troubleshooting

- **No data being logged**: check that the logger or publisher is active and, for a TAG logger, InfluxDB, Prometheus or a publisher, that tag collections are selected
- **Connection errors**: verify network connectivity and credentials
- **Missing data**: check logging intervals and component data availability

## Related Documentation

- [File and Tag Loggers](../Components/Loggers/File_Loggers.md) - full file and tag logger configuration
- [InfluxDB and Prometheus Logging](../Components/Loggers/InfluxDB_Prometheus_Logger.md) - cloud logging setup
- [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) - MQTT publishing configuration
- [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) - webhook publishing configuration
