---
title: How to log data to the cloud (InfluxDB)
description: "Log CAN bus tag values to InfluxDB Cloud or a self-hosted InfluxDB with the InfluxDB v2 Historian, then verify the data and read its structure."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to log data to the cloud (InfluxDB)

Configure Profinity to log CAN bus data to InfluxDB for cloud-based data analytics and visualisation.
The steps use InfluxDB Cloud and the InfluxDB v2 Historian, the typical cloud setup.
The InfluxDB v1 Logger, which every edition includes, and the InfluxDB v3 Historian take different connection settings.
[Loggers](../Components/Loggers/index.md) lists them.

Before you start, you need:

- Profinity 2.3 installed and running.
- A licence that includes the **Historians** feature, which the InfluxDB v2 Historian needs. The Desktop, Server, and Enterprise editions include it, and an unlicensed instance does not. [Licensing](../Licensing.md) lists the features of each edition.
- An InfluxDB instance, cloud or self-hosted, with its version known. InfluxDB V1, V2, and V3 are separate, incompatible products, and Profinity provides a separate component for each.
- An InfluxDB bucket (V2) or database (V1 and V3) created and accessible.
- Network access to your InfluxDB server.
- The **Modify components** permission (refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which allows [loggers](../Components/Loggers/index.md) and [historians](../Components/Historians/index.md) to be added.

## Set up InfluxDB

To use InfluxDB Cloud:

1. Sign up for [InfluxDB Cloud](https://cloud2.influxdata.com/).
2. Create a new organisation.
3. Create a new bucket for your data.
4. Generate an API token with write permissions.
5. Note the organisation name, bucket name, API token, and the InfluxDB URL shown in your account.

To use a self-hosted InfluxDB:

1. Install InfluxDB on your server.
2. Start the InfluxDB service.
3. Create a bucket and generate an API token, for example:

```bash
influx bucket create --name my-profinity-data
influx auth create --org my-org --all-access
```

## Add the InfluxDB v2 Historian component

1. Select **ADD COMPONENT** in the side menu or on the home page.
2. Select the **InfluxDB v2 Historian** under Historians.

## Configure the InfluxDB connection

1. Enter a component name, for example "InfluxDB Cloud Logger".
2. Enter the **Influx Server URL**.
   For a cloud instance, use the URL shown in your InfluxDB Cloud account, for example `https://us-east-1-1.aws.cloud2.influxdata.com`.
   For a self-hosted instance, use `http://your-server:8086`.
3. Enter the **InfluxDB Organisation** name.
4. Enter the **InfluxDB Bucket** name.
5. Enter the **InfluxDB Token**.
6. For InfluxDB Cloud, set **InfluxDB Health Check** to false.
   InfluxDB Cloud does not support the health check API.

## Configure the logging interval and mode

1. Set the **Update Interval (Seconds)**, for example 1 to 5 seconds.
   A shorter interval gives more detailed data but uses more bandwidth.
   A longer interval uses less bandwidth but gives coarser data.
2. Set the **Logging mode**:
    - `Snapshot` sends the current value of every tag on each interval.
    - `On Change` sends the changes recorded during the interval.
    - `Everything` sends every sample that arrives, including unchanged values.
3. In **Collections**, add a row for each [tag collection](../Tags/Collections/index.md) to log, and select the collection in that row.
   The historian starts only when at least one collection is configured, and it logs only the tags in the selected collections.

## Save and start the historian

Select **ADD COMPONENT** at the bottom of the dialog to add the historian to the active profile.
The button reads **SAVE** when you change the settings of an existing component.
The historian starts when the profile loads if **Auto Connect** is on, and [Connections and reconnecting](../Components/Connections_and_Reconnecting.md) describes its default.

## Verify data logging

1. Check the status of the historian component for connection errors.
2. Sign in to the InfluxDB web interface and open Data Explorer.
3. Query your data, which returns points when data is arriving:
   ```
   from(bucket: "my-profinity-data")
     |> range(start: -1h)
     |> filter(fn: (r) => r["_measurement"] == "Your_Profile_Name")
   ```
4. If no data arrives, check the [Profinity logs](../Administration/Logs_Config.md) for connection errors.

## Data structure in InfluxDB

Profinity writes one point per tag sample, with this structure:

- Measurement: the active profile name, with spaces and any character other than a letter or digit replaced by an underscore, so `Example Profile` becomes `Example_Profile`.
- Tags:
    - `profile`: the same formatted profile name.
    - `transmitter`: currently always empty in Profinity 2.3.
    - `component`: the first segment of the full tag path, which is the component, formatted in the same way as the profile name.
    - `message`: the CAN database (DBC) message name for a DBC signal tag.
    - `signal`: the DBC signal name, or the dotted property path.
    - `full_tag_id`: the full tag path, unaltered.
- Fields: a single numeric field named `value`.
- Timestamp: the sample timestamp in Coordinated Universal Time (UTC), written with nanosecond precision.

An example data point follows.
The values are illustrative, and the component, message, and signal names depend on the profile and DBC file.

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

Tags other than DBC signals and component properties, such as relayed or registered tags, have no DBC message name.
Profinity writes these tags with the tag path after the component in `signal`, joined with dots.

To read the data back, filter on the measurement, the `value` field, and the tags.
Tags are indexed, so filter on `component`, `message`, and `signal` in queries where possible, for example:

```
from(bucket: "my-profinity-data")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "Example_Profile")
  |> filter(fn: (r) => r["_field"] == "value")
  |> filter(fn: (r) => r["component"] == "Prohelion_BMU" and r["signal"] == "PackVoltage")
```

## Troubleshooting

### The connection fails

A historian that reports a connection failure has a URL that cannot be reached, a token that is not accepted, or an organisation name that does not match.
Verify that the **Influx Server URL** is correct and reachable, and that the firewall allows the connection.
Verify that the API token is correct and has write permissions, and that the organisation name matches.
For InfluxDB Cloud, confirm that **InfluxDB Health Check** is set to false.
To separate a network fault from a credential fault, test the network connection from the Profinity machine to the URL.

### No data arrives

A historian that connects but writes nothing is usually stopped, has no tags selected, or has no incoming data.
Verify these points:

- The historian is active.
- At least one collection is selected in **Collections**, and the collection contains tags.
- The components are receiving data.
- The logging interval is set.
- The token has write permission in InfluxDB.

### Authentication errors

An authentication error means the token or the organisation is wrong.
Verify that the API token is correct and has write permissions, and that the organisation name matches the one in InfluxDB.

For more, refer to [How to configure data logging](./Configure_Data_Logging.md), the general data logging guide, and the official [InfluxDB documentation](https://docs.influxdata.com/).
