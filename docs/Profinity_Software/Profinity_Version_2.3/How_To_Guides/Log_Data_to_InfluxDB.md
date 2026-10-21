---
title: How to log data to InfluxDB
description: "Add the InfluxDB v1 Logger, v2 Historian or v3 Historian, enter the connection settings, and log tag collections to InfluxDB."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to log data to InfluxDB

Configure the InfluxDB v1 Logger, InfluxDB v2 Historian or InfluxDB v3 Historian to log tag values to InfluxDB.
You need an active profile, the **Modify components** permission, and an InfluxDB server of known version.
InfluxDB V1, V2, and V3 are separate, incompatible products, so the component must match the installed InfluxDB version.
The InfluxDB v1 Logger needs no licensed feature, and the v2 and v3 Historians need the **Historians** feature, which the Desktop, Server, and Enterprise editions include.

1. Add the **InfluxDB v1 Logger**, **InfluxDB v2 Historian** or **InfluxDB v3 Historian** for the InfluxDB version in use, as described in [How to configure data logging](./Configure_Data_Logging.md#add-the-component).
2. Enter the connection settings:
    1. **Influx Server URL**: the endpoint InfluxDB is running on.
    2. **InfluxDB Database** for V1, **InfluxDB Bucket** and **InfluxDB Organisation** for V2, or **InfluxDB Database** for V3.
    3. **InfluxDB Username** and **InfluxDB Password** for V1, or **InfluxDB Token** for V2 and V3.
3. Set the **Update Interval (Seconds)** and the **Logging mode** (`Snapshot`, `On Change` or `Everything`).
4. Select the tag collections to log, as described in [How to configure data logging](./Configure_Data_Logging.md#select-tag-collections).
   The logger logs only the tags in the selected collections.
5. Select **ADD COMPONENT** at the bottom of the dialog.
   The button reads **SAVE** when you change the settings of an existing component.

To start the component and confirm that data is arriving, refer to [How to configure data logging](./Configure_Data_Logging.md#start-the-logger-or-publisher).
[How to log data to the cloud (InfluxDB)](./Log_Data_to_Cloud_Influx.md) works through the InfluxDB v2 Historian with InfluxDB Cloud.
For the full settings, refer to [InfluxDB v1 Logger](../Components/Loggers/InfluxDB_v1_Logger.md) and [InfluxDB historians](../Components/Historians/InfluxDB_Historians.md).
