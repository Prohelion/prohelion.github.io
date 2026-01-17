---
title: How to Configure Data Logging
---

# How to Configure Data Logging

Set up data logging to capture CAN bus data to files, InfluxDB, Prometheus, or MQTT.

## Prerequisites

- An active profile with components configured
- (For cloud logging) Access to InfluxDB, Prometheus, or MQTT server
- Admin access to configure loggers

## Steps

### Step 1: Choose Your Logger Type

Profinity supports:
- **File Logger** - Log to CSV or other file formats
- **InfluxDB/Prometheus Logger** - Log to time-series databases
- **MQTT Logger** - Publish data to MQTT brokers

### Step 2: Add a Logger Component

1. Navigate to **ADMIN** → **Components**
2. Click **Add Component**
3. Select your logger type:
   - **File Logger**
   - **InfluxDB Prometheus Logger**
   - **MQTT Logger**

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

### Step 5: Configure MQTT Logger

1. Set **Logger Name**
2. Configure MQTT Broker:
   - **Broker URL** - MQTT broker address
   - **Port** - usually 1883 or 8883
   - **Username/Password** - if required
   - **Topic Prefix** - base topic for messages
3. Set **Publishing Interval**
4. **Select Components**
5. **Test Connection**
6. Click **Save**

### Step 6: Activate the Logger

1. Ensure logger is added to your active profile
2. Logger starts automatically when profile is active
3. Check logger status in component list

### Step 7: Verify Logging

**File Logging:**
- Check file path for new log files
- Verify data is being written

**InfluxDB/Prometheus:**
- Query database to verify data is arriving
- Check connection status in logger component

**MQTT:**
- Subscribe to MQTT topics to see published messages
- Check logger status for connection info

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
- [MQTT Logger](../Components/Loggers/MQTT_Logger.md) - MQTT publishing configuration
