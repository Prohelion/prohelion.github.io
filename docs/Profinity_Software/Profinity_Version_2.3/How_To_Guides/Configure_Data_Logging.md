---
title: How to Configure Data Logging
---

# How to Configure Data Logging

Set up data logging or publishing to send CAN bus data to files, InfluxDB, Prometheus, an MQTT
broker, or a webhook.

## Prerequisites

- An active profile with components configured
- (For cloud logging) Access to InfluxDB, Prometheus, an MQTT broker, or a webhook receiver
- Admin access to configure loggers and publishers

## Steps

### Step 1: Choose Your Logger or Publisher Type

Profinity supports:
- **File Logger** - Log to CSV or other file formats
- **InfluxDB/Prometheus Logger** - Log to time-series databases
- **MQTT Publisher** - Publish data to an MQTT broker
- **Webhook Publisher** - Publish data to an HTTP(S) URL

The first two are **Loggers**: they write to a queryable store for later, disconnected retrieval.
The MQTT and Webhook Publisher are **Publishers & Subscribers**: they push to a subscriber that is actively
listening right now, which is why they sit in their own category rather than under Loggers.

### Step 2: Add a Logger or Publisher Component

1. Navigate to **ADMIN** → **Components**
2. Click **Add Component**
3. Select your logger or publisher type:
   - **File Logger** (under Loggers)
   - **InfluxDB Prometheus Logger** (under Loggers)
   - **MQTT Publisher** (under Publishers & Subscribers)
   - **Webhook Publisher** (under Publishers & Subscribers)

### Step 3: Configure File Logger

1. Set **Logger Name**
2. Configure **File Path** - where log files are saved
3. Set **File Format** - CSV, JSON, etc.
4. Configure **Logging Interval** - how often to write data
5. **Select Components** - choose which components to log
6. Click **Save**

### Step 4: Configure InfluxDB/Prometheus Logger

1. Set **Logger Name**
2. Configure connection:
   - **InfluxDB URL** - server address
   - **Database Name** - target database
   - **Username/Password** - credentials
3. Set **Logging Interval**
4. **Select Components**
5. **Test Connection**
6. Click **Save**

### Step 5: Configure MQTT Publisher or Webhook Publisher

**MQTT Publisher:**

1. Set **Name**
2. Configure the broker connection:
   - **Server URL** - MQTT broker address (use `mqtts://` for TLS)
   - **Username/Password** - if required
   - **Device ID** - MQTT client ID
   - **Destination Topic** - base topic for messages
3. Choose **Logging mode** - Snapshot, On Change, or Everything
4. Select which tag collections to publish
5. Click **Save**

**Webhook Publisher:**

1. Set **Name**
2. Configure the destination:
   - **Destination URL** - the HTTP(S) endpoint to POST to
   - **Authentication** - None, Bearer token, API key header, or Basic auth
3. Choose **Logging mode** - Snapshot, On Change, or Everything
4. Select which tag collections to publish
5. Click **Save**

See [MQTT Publisher](../Components/Publishers/MQTT_Publisher.md) and
[Webhook Publisher](../Components/Publishers/Webhook_Publisher.md) for the full setting reference.

### Step 6: Activate the Logger or Publisher

1. Ensure the logger or publisher is added to your active profile
2. It starts automatically when the profile is active
3. Check its status in the component list

### Step 7: Verify Logging

**File Logging:**
- Check file path for new log files
- Verify data is being written

**InfluxDB/Prometheus:**
- Query database to verify data is arriving
- Check connection status in logger component

**MQTT/Webhook:**
- Subscribe to the configured MQTT topic, or check the webhook receiver's own logs, to see published messages
- Check the publisher's status for connection info

## Tips

- **Start with File Logging**: Easiest to set up and verify
- **Monitor Disk Space**: File loggers can generate large files
- **Use Appropriate Intervals**: Balance between data granularity and resource usage
- **Test Connections**: Always test cloud loggers before relying on them
- **Filter Components**: Only log components you need to reduce data volume

## Troubleshooting

- **No data being logged**: Check that components are selected and active
- **Connection errors**: Verify network connectivity and credentials
- **Missing data**: Check logging intervals and component data availability

## Related Documentation

- [File Loggers](../Components/Loggers/File_Loggers.md) - Detailed file logger configuration
- [InfluxDB Prometheus Logger](../Components/Loggers/InfluxDB_Prometheus_Logger.md) - Cloud logging setup
- [MQTT Publisher](../Components/Publishers/MQTT_Publisher.md) - MQTT publishing configuration
- [Webhook Publisher](../Components/Publishers/Webhook_Publisher.md) - Webhook publishing configuration
