---
title: How to Log Data to the Cloud (InfluxDB)
description: "Configure Profinity to log CAN bus data to InfluxDB Cloud or self-hosted for cloud-based analytics and visualisation."
---

# How to Log Data to the Cloud (InfluxDB)

Configure Profinity to log CAN bus data to InfluxDB for cloud-based data analytics and visualisation.

## Prerequisites

- Profinity 2.3 installed and running
- A licence that includes the **Historians** feature, which the InfluxDB v2 Historian needs (Desktop, Server and Enterprise editions, not an unlicensed instance). See [Licensing](../Administration/Licensing.md)
- An InfluxDB instance (cloud or self-hosted), with its version known, because InfluxDB V1, V2 and V3 are separate, incompatible products and Profinity provides a separate component for each
- An InfluxDB bucket (V2) or database (V1 and V3) created and accessible
- Network access to your InfluxDB server
- The **Modify components** permission (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which allows [loggers](../Components/Loggers/File_Loggers.md) and [historians](../Components/Historians/index.md) to be added

The steps use InfluxDB Cloud and the InfluxDB v2 Historian, the typical cloud setup. The InfluxDB v1 Logger, which is available in every edition, and the InfluxDB v3 Historian take different connection settings, which are listed in [InfluxDB and Prometheus Logging](../Components/Loggers/InfluxDB_Prometheus_Logger.md).

## Steps

### Set Up InfluxDB

To use InfluxDB Cloud, sign up for [InfluxDB Cloud](https://cloud2.influxdata.com/), create a new organisation, create a new bucket for your data, generate an API token with write permissions, and note the organisation name, bucket name, API token and the InfluxDB URL shown in your account.

To use a self-hosted InfluxDB, install InfluxDB on your server, start the InfluxDB service, create a bucket, and generate an API token:

```bash
influx create bucket my-profinity-data
influx auth create --org my-org --all-access
```

### Add the InfluxDB v2 Historian Component

1. Select **ADD COMPONENT** in the side menu (or on the home page)
2. Select the **InfluxDB v2 Historian** (under Historians)

### Configure the InfluxDB Connection

1. Enter a component name (for example "InfluxDB Cloud Logger")
2. Enter the **Influx Server URL**, which is the URL shown in your InfluxDB Cloud account for a cloud instance, for example `https://us-east-1-1.aws.cloud2.influxdata.com`, or `http://your-server:8086` for a self-hosted instance
3. Enter the **InfluxDB Organisation** name
4. Enter the **InfluxDB Bucket** name
5. Enter the **InfluxDB Token**
6. For InfluxDB Cloud, set **InfluxDB Health Check** to false, because InfluxDB Cloud does not support the health check API

### Configure the Logging Interval and Mode

1. Set the **Logging Interval (Sec)** (for example 1 to 5 seconds). A shorter interval gives more granular data but uses more bandwidth, and a longer interval uses less bandwidth but gives coarser data
2. Set the **Logging mode** to `Snapshot` to send the current value of every tag on each interval, `On Change` to send the changes recorded during the interval, or `Everything` to send every sample that arrives, including unchanged values
3. In **Collections**, add a row for each [tag collection](../Tags/Collections.md) to log and select the collection in that row, because the historian starts only when at least one collection is configured and logs only the tags that belong to the selected collections

### Save and Start the Historian

Click **ADD COMPONENT** at the bottom of the dialog (the button reads **SAVE** when the settings of an existing component are being changed) to add the historian to the active profile. The historian starts when the profile is loaded if **Auto Connect** is on, which is the default.

### Verify Data Logging

1. Check the status of the historian component for connection errors
2. Log into the InfluxDB web interface and open Data Explorer
3. Query your data, which should return points when data is arriving:
   ```
   from(bucket: "my-profinity-data")
     |> range(start: -1h)
     |> filter(fn: (r) => r["_measurement"] == "Your_Profile_Name")
   ```
4. If no data arrives, check the [Profinity logs](../Getting_Started/Profinity_Log.md) for connection errors

## Data Structure in InfluxDB

Profinity writes one point per tag sample, with this structure:

- **Measurement**: the active profile name, with spaces and any character other than a letter or digit replaced by an underscore (so `Example Profile` becomes `Example_Profile`)
- **Tags**:
    - `profile`: the same formatted profile name
    - `transmitter`: currently always empty in Profinity 2.3
    - `component`: the first segment of the full tag path, which is the component, formatted in the same way as the profile name
    - `message`: the DBC message name for a DBC signal tag
    - `signal`: the DBC signal name, or the dotted property path
    - `full_tag_id`: the full tag path, unaltered
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

Tags other than DBC signals and component properties, such as relayed or registered tags, are written with the tag path after the component in `signal`, joined with dots, because they have no DBC message name.

To read the data back, filter on the measurement, the `value` field and the tags. Tags are indexed, so filter on `component`, `message` and `signal` in queries where possible, for example:

```
from(bucket: "my-profinity-data")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "Example_Profile")
  |> filter(fn: (r) => r["_field"] == "value")
  |> filter(fn: (r) => r["component"] == "Prohelion_BMU" and r["signal"] == "PackVoltage")
```

## Troubleshooting

### The Connection Fails

A historian that reports a connection failure has a URL that cannot be reached, a token that is not accepted, or an organisation name that does not match. Verify that the **Influx Server URL** is correct and reachable and that the firewall allows the connection, verify that the API token is correct and has write permissions, verify that the organisation name matches, and for InfluxDB Cloud confirm that **InfluxDB Health Check** is set to false. Testing network connectivity from the Profinity machine to the URL separates a network fault from a credential fault.

### No Data Arrives

A historian that connects but writes nothing is usually stopped, has no tags selected, or has no incoming data. Verify that the historian is active, that at least one collection is selected in **Collections** and that the collection contains tags, that the components are receiving data, that the logging interval is set, and that the token has write permission in InfluxDB.

### Authentication Errors

An authentication error means the token or the organisation is wrong. Verify that the API token is correct and has write permissions, and that the organisation name matches the one in InfluxDB.

## Related Documentation

- [InfluxDB and Prometheus Logging](../Components/Loggers/InfluxDB_Prometheus_Logger.md) - the full logger reference for each InfluxDB version
- [How to Configure Data Logging](./Configure_Data_Logging.md) - the general data logging guide
- [InfluxDB Documentation](https://docs.influxdata.com/) - the official InfluxDB documentation
