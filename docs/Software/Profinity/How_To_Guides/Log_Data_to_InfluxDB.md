---
title: How to log data to InfluxDB
description: "Prepare an InfluxDB Cloud or self-hosted server, connect the InfluxDB v2 Historian to it, and check with a query that Profinity tag values are arriving."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# How to log data to InfluxDB

Prepare an InfluxDB server, connect the InfluxDB v2 Historian to it, and check that tag values arrive.
The steps use InfluxDB Cloud, the typical cloud setup, and apply to a self-hosted InfluxDB v2 server with the changes noted.
The InfluxDB v1 Logger and the InfluxDB v3 Historian use different connection settings, which [InfluxDB v1 Logger](../Components/Loggers/InfluxDB_v1_Logger.md) and [InfluxDB historians](../Components/Historians/InfluxDB_Historians.md) describe.

Before you start, you need:

- An active profile and the **Modify components** permission.
- The **Historians** licensed feature, which the Desktop, Server, and Enterprise editions include.
- An InfluxDB server whose version you know, because InfluxDB V1, V2, and V3 are separate, incompatible products and Profinity has a component for each.
- Network access from the Profinity machine to the InfluxDB server.
- At least one [tag collection](../Tags/Collections/index.md) that holds the tags to log.

## Prepare InfluxDB

To use InfluxDB Cloud:

1. Sign up for [InfluxDB Cloud](https://cloud2.influxdata.com/) and create an organisation.
2. Create a bucket for your data.
3. Generate an API token with read and write access to the bucket. If you turn off **Allow Retrieval**, write access alone is enough.
4. Note the organisation name, bucket name, API token, and the InfluxDB URL shown in your account.

To use a self-hosted InfluxDB on Linux, macOS or Windows:

1. Install and start InfluxDB on your server.
2. Create a bucket and an API token that can read and write only that bucket. In the following example, replace `my-org` with your organisation name and `<bucket-id>` with the ID that `influx bucket create` prints:

    ```bash
    influx bucket create --name my-profinity-data --org my-org
    influx auth create --org my-org --read-bucket <bucket-id> --write-bucket <bucket-id>
    ```

## Connect the InfluxDB v2 Historian

1. Add the **InfluxDB v2 Historian** under Historians, as described in [How to add a component to your profile](./Add_Component_to_Profile.md#add-the-component).
2. Enter the **Influx Server URL**.
   For InfluxDB Cloud, use the URL shown in your account, such as `https://us-east-1-1.aws.cloud2.influxdata.com`.
   For a self-hosted server, use `http://<your-server>:8086`.
3. Enter the **InfluxDB Organisation**, **InfluxDB Bucket**, and **InfluxDB Token**.
4. For InfluxDB Cloud, set **InfluxDB Health Check** to false, because InfluxDB Cloud does not support the health check endpoint. As of November 2026, the [InfluxDB documentation](https://docs.influxdata.com/influxdb/cloud/reference/cli/influx/ping/) states that its health check does not work with InfluxDB Cloud. For a self-hosted server, leave it on, which is the default.
5. In **Collections**, add a row for each tag collection to log and select the collection in that row.
   The historian starts only when at least one collection is configured.
6. Optional: set the **Update Interval (seconds)** and the **Logging mode**.
   [Logging modes](../Components/Logging_Modes.md) describes what each mode sends.
7. Select **ADD COMPONENT** at the bottom of the dialog.

Replace `<your-server>` with the host name or address of your InfluxDB server.
The historian starts when the profile loads if **Auto Connect** is on, and [Connections and reconnecting](../Components/Connections_and_Reconnecting.md) lists each component's default.

## Check that data is arriving

1. Check that the historian's status is not **Error**. The reason is written to the **Logs** page under **ADMIN**, as a line such as `<historian name>: could not connect (<reason>). Retrying every 5 s.`
2. In the InfluxDB web interface, open Data Explorer.
3. Run this query, replacing `my-profinity-data` with your bucket and `Your_Profile_Name` with your profile name. The measurement is the profile name with leading and trailing spaces removed. Each character other than a letter or digit becomes an underscore, and letter case is kept:

    ```text
    from(bucket: "my-profinity-data")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "Your_Profile_Name")
    ```

The query returns points when data is arriving.
If it returns nothing, refer to [If data does not arrive](../Components/Historians/InfluxDB_Historians.md#if-data-does-not-arrive).
For what Profinity writes for each tag and how to query it, refer to [What is stored](../Components/Historians/InfluxDB_Historians.md#what-is-stored).
To send the same collections to another destination, refer to [How to configure data logging](./Configure_Data_Logging.md).

## Troubleshooting

| What you see | What to do |
|---|---|
| The health check failed (InfluxDB Cloud has none; switch Health Check off in the settings). | For InfluxDB Cloud, set **InfluxDB Health Check** to false. |
