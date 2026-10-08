---
title: TAG SQL Historian
description: "Record tag history to a SQL database and read it back through the APIs."
---

# TAG SQL Historian

The **TAG SQL Historian** writes the values of the tags in the [collections](../../Tags/Collections.md) you select to a table in a SQL database, and allows that history to be read back out through the APIs. It sits in the **Historians** category and requires the **Historians** licensed feature. Use it when the history needs to live in a database that you already operate and query with ordinary SQL tools, rather than in a time-series database such as [InfluxDB](../Loggers/InfluxDB_Prometheus_Logger.md).

Each row the historian writes belongs to one [tag](../../Tags/index.md), identified by its [tag tree path](../../Tags/Tag_Tree_Path.md).

## Adding a TAG SQL Historian

Add a **TAG SQL Historian** component to your profile from the **Historians** category, then configure its settings. At least one [collection](../../Tags/Collections.md) must be configured before the component starts.

### Connection Settings

| Setting | Purpose |
|---|---|
| **Database Provider** | The SQL engine to connect to: **SQLite**, **SQL Server / Azure SQL**, **PostgreSQL**, **MySQL** or **Oracle**. Defaults to SQLite. |
| **Connection String** | The connection string for the chosen database provider, in that provider's own format. Required, and stored encrypted at rest. |
| **Table Name** | The table the historian writes rows to, which may contain letters, digits and underscores only and cannot start with a digit. Defaults to `TagChangeLog`. |
| **Auto Create Table** | Creates the table when the historian starts, if it does not already exist. Enabled by default. |

### Logger Settings

| Setting | Purpose |
|---|---|
| **Collections** | The tag collections whose tags are recorded. |
| **Logging mode** | **Snapshot** writes the current values on each interval, **On Change** writes value changes, and **Everything** writes every sample. Defaults to Snapshot. See [Logging Modes](../Loggers/InfluxDB_Prometheus_Logger.md#logging-modes). |
| **DBC Notification Mode** | Shown only for **On Change**. **Value Change Only** records a signal from a DBC (CAN database) file when its value changes, and **Every Decoded Physical Sample** records every decoded sample. **Everything** always records every decoded sample. |
| **Update Interval (Seconds)** | The interval that controls snapshot timing, or how often changes and samples are flushed to the database. Defaults to 10, and accepts 10 to 86400. |
| **Designated tag historian reader** | Makes this historian the store that long-range tag and history queries are read from. Enable it on one component in the profile only. See [Historians](index.md#designating-the-historian-that-is-read-from). |

## Table Layout

When **Auto Create Table** is enabled the historian creates a table with the following columns, and the names are the same on every provider.

| Column | Contents |
|---|---|
| `Id` | An automatically generated row identifier. |
| `RecvTime` | The time the value was received. |
| `TagId` | The path of the tag. |
| `ValueType` | The data type of the value. |
| `Value` | The recorded value. |
| `UtcTimestamp` | The UTC timestamp of the sample. |
| `Quality` | The data quality of the sample. |
| `Reason` | Why the sample was recorded. |
| `Message` | An optional message. |

The columns follow the same field set as the tag change file logger described in [File Loggers](../Loggers/File_Loggers.md), so history written by either can be interpreted in the same way. If you create the table yourself, disable **Auto Create Table** and make sure the account in the connection string can insert into and read from it.

## If the Historian Does Not Start

Settings cannot be saved without a connection string (`You must provide a connection string for the database.`) or with an invalid table name (`Table name must use letters, digits, and underscore only, and cannot start with a digit.`). If the settings save but no rows arrive, the [Log](../../Getting_Started/Profinity_Log.md) shows the component name followed by `could not connect` and the reason for a connection that failed (the historian shows **Error** and retries every 5 seconds until the database is reachable), or `Failed to write to the` followed by the component name for a failed write, so check the connection string, that the database is reachable from the Profinity server and that the account can write to the table.

!!! warning "Moving a Component Starts a New History"
    History is recorded under the tag's path, so moving a component changes its tag paths and the history recorded under the old paths is not carried across. Queries for the new path return a new series with no earlier points. See [Tag Tree Path](../../Tags/Tag_Tree_Path.md).

## Related Documentation

- [Historians](index.md)
- [InfluxDB and Prometheus Logging](../Loggers/InfluxDB_Prometheus_Logger.md)
- [Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md)
- [Tag Layer](../../Tags/index.md)
