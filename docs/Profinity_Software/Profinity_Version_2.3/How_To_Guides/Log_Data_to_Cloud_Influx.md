---
title: How to Log Data to the Cloud (InfluxDB)
description: "Configure Profinity to log CAN bus data to InfluxDB Cloud or self-hosted for cloud-based analytics and visualisation."
---

# How to Log Data to the Cloud (InfluxDB)

Configure Profinity to log CAN bus data to InfluxDB for cloud-based data analytics and visualisation.

## Prerequisites

- Profinity V2 installed and running
- An InfluxDB instance (cloud or self-hosted), with its version known, because InfluxDB V1, V2 and V3 are separate, incompatible products and Profinity provides a separate component for each
- An InfluxDB bucket (V2) or database (V1 and V3) created and accessible
- Network access to your InfluxDB server
- The `ComponentModify` permission (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which allows [loggers](../Components/Loggers/File_Loggers.md) and [historians](../Components/Historians/index.md) to be added

The steps below use InfluxDB Cloud and the InfluxDB v2 Historian, which Profinity groups under Historians and which is the same kind of time-series sink as the InfluxDB v1 Logger, which is the typical cloud setup. For V1 or V3 the connection settings differ, as listed in [InfluxDB and Prometheus Logging](../Components/Loggers/InfluxDB_Prometheus_Logger.md).

## Steps

### Step 1: Set Up InfluxDB

**Option A - InfluxDB Cloud:**

1. Sign up for [InfluxDB Cloud](https://cloud2.influxdata.com/)
2. Create a new organisation
3. Create a new bucket for your data
4. Generate an API token with write permissions
5. Note the Organisation Name, Bucket Name, API Token and InfluxDB URL

**Option B - Self-Hosted:**

1. Install InfluxDB on your server
2. Start the InfluxDB service
3. Create a bucket: `influx create bucket my-profinity-data`
4. Generate an API token: `influx auth create --org my-org --all-access`

### Step 2: Add the InfluxDB v2 Historian Component

1. Select **ADD COMPONENT** in the side menu (or on the home page)
2. Select the **InfluxDB v2 Historian** (under Historians)
3. Click **Add**

### Step 3: Configure the InfluxDB Connection

1. Enter a component name (for example "InfluxDB Cloud Logger")
2. Enter the **Influx Server URL**:
   - Cloud: `https://us-east-1-1.aws.cloud2.influxdata.com`
   - Self-hosted: `http://your-server:8086`
3. Enter the **InfluxDB Organisation** name
4. Enter the **InfluxDB Bucket** name
5. Enter the **InfluxDB Token**
6. For InfluxDB Cloud, set **InfluxDB Health Check** to false, because InfluxDB Cloud does not support the health check API

### Step 4: Configure Logging Interval and Mode

1. Set the **Logging Interval (Sec)** (for example 1-5 seconds)
2. Set the **Logging mode** to `Snapshot` to send the current value of every tag on each interval, `On Change` to send the changes recorded during the interval, or `Everything` to send every sample that arrives, including unchanged values
3. In **Collections**, add a row for each tag collection to log and select the collection in that row, because the historian starts only when at least one collection is configured and logs only the tags that belong to the selected collections
4. A shorter interval gives more granular data but uses more bandwidth, and a longer interval uses less bandwidth but gives coarser data

### Step 5: Save and Activate

1. Click **Save** to save the historian configuration
2. Ensure the historian is added to the active profile
3. The historian starts automatically when the profile is loaded, provided it is set to start automatically

### Step 6: Verify Data Logging

1. Check the status of the historian component for connection errors
2. Log into the InfluxDB web interface
3. Navigate to Data Explorer
4. Query your data:
   ```
   from(bucket: "my-profinity-data")
     |> range(start: -1h)
     |> filter(fn: (r) => r["_measurement"] == "Your_Profile_Name")
   ```
5. Verify data is arriving
6. If it is not, check the [Profinity logs](../Getting_Started/Profinity_Log.md) for connection errors

## Data Structure in InfluxDB

Profinity writes one point per tag sample, with this structure:

- **Measurement**: the active profile name, with spaces and any character other than a letter or digit replaced by an underscore (so `Example Profile` becomes `Example_Profile`)
- **Tags**:
    - `profile`: the same formatted profile name
    - `transmitter`: always empty in this release
    - `component`: the first segment of the canonical tag path, which is the component, formatted in the same way as the profile name
    - `message`: the DBC message name for a DBC signal tag, or the property marker for a component property tag
    - `signal`: the DBC signal name, or the dotted property path
    - `full_tag_id`: the canonical tag path, unaltered
- **Fields**: a single numeric field named `value`
- **Timestamp**: the sample timestamp in UTC, written with nanosecond precision

**Example Data Point** (illustrative values; the component, message and signal names depend on the profile and DBC file):
```
measurement: "Example_Profile"
tags:
  profile: "Example_Profile"
  transmitter: ""
  component: "Prohelion_BMU"
  message: "Pack_Status"
  signal: "PackVoltage"
  full_tag_id: "Prohelion BMU/DBC/Pack_Status/PackVoltage"
fields:
  value: 400.5
timestamp: 2024-01-17T10:30:00Z
```

Tags other than DBC signals and component properties, such as relayed or registered tags, are written with the tag path (after the component) in `signal`, joined with dots, and a fixed tag-layer marker in `message`.

To read the data back, filter on the measurement, the `value` field and the tags, for example:

```
from(bucket: "my-profinity-data")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "Example_Profile")
  |> filter(fn: (r) => r["_field"] == "value")
  |> filter(fn: (r) => r["component"] == "Prohelion_BMU" and r["signal"] == "PackVoltage")
```

## Tips

- **Start Small**: confirm data is arriving with a short interval before relying on the historian
- **Monitor Bandwidth**: cloud logging uses network bandwidth
- **Optimise Intervals**: balance data granularity against cost
- **Use Tags Efficiently**: tags are indexed, so filter on `component`, `message` and `signal` in queries where possible
- **Set Retention Policies**: configure data retention to manage costs
- **Monitor Costs**: InfluxDB Cloud charges based on data usage

## Troubleshooting

- **Connection Failed**:
  - Verify the Influx Server URL is correct and accessible
  - Check firewall settings
  - Verify the API token is valid
  - For InfluxDB Cloud, confirm **InfluxDB Health Check** is set to false
  - Test network connectivity

- **No Data Arriving**:
  - Verify the historian is active
  - Verify that at least one collection is selected in **Collections** and that the collection contains tags
  - Check that components are receiving data
  - Verify the logging interval is set
  - Check the InfluxDB write permissions on the token

- **Authentication Errors**:
  - Verify the API token is correct
  - Check the token has write permissions
  - Verify the organisation name matches

## Related Documentation

- [InfluxDB and Prometheus Logging](../Components/Loggers/InfluxDB_Prometheus_Logger.md) - the full logger reference for each InfluxDB version
- [How to Configure Data Logging](./Configure_Data_Logging.md) - the general data logging guide
- [InfluxDB Documentation](https://docs.influxdata.com/) - the official InfluxDB documentation
