---
title: TAG SQL Historian
description: "Record tag history to a SQL database and read it back through the APIs."
---

# TAG SQL Historian

The **TAG SQL Historian** writes the values of the tags in the collections you select to a table in a SQL database, and allows that history to be read back out through the APIs. It sits in the **Historians** category and requires the **Historians** licensed feature. Use it when the history needs to live in a database that you already operate and query with ordinary SQL tools, rather than in a time-series database such as [InfluxDB](../Loggers/InfluxDB_Prometheus_Logger.md).

A **tag** is Profinity's common data model for a signal, as described in the [Tag layer](../../Tags/index.md) documentation, and each row the historian writes belongs to one tag, identified by its [tag tree path](../../Tags/Tag_Tree_Path.md).

## Adding a TAG SQL Historian

Add a **TAG SQL Historian** component to your profile from the **Historians** category, then configure its settings. At least one [collection](../../Tags/Collections.md) must be configured before the component starts.

### Connection settings

| Setting | Purpose |
|---|---|
| **Database Provider** | The SQL engine to connect to: **SQLite**, **SQL Server / Azure SQL**, **PostgreSQL**, **MySQL** or **Oracle**. Defaults to SQLite. |
| **Connection String** | The provider-native ADO.NET connection string for the target database, whose syntax depends on the provider. Required, and stored encrypted at rest. |
| **Table Name** | The table the historian writes rows to, which may contain letters, digits and underscores only and cannot start with a digit. Defaults to `TagChangeLog`. |
| **Auto Create Table** | Creates the table when the historian starts, if it does not already exist. Enabled by default. |

### Logger settings

| Setting | Purpose |
|---|---|
| **Collections** | The tag collections whose tags are recorded. |
| **Logging mode** | **Snapshot** writes the current values on each interval, **On Change** writes value changes, and **Everything** writes every sample. Defaults to Snapshot. See [Logging modes](../Loggers/InfluxDB_Prometheus_Logger.md#logging-modes). |
| **DBC Notification Mode** | Shown only for On Change. **Value Change Only** records a DBC signal when its value changes, and **Every Decoded Physical Sample** records every decoded sample. Everything always records every decoded sample. |
| **Update interval** | The interval, in seconds, that controls snapshot timing, or how often changes and samples are flushed to the database. |

### Data storage

| Setting | Purpose |
|---|---|
| **Designated tag historian reader** | Makes this historian the store that long-range tag and history queries are read from. Exactly one historian or logger in the profile should enable this. See [Historians](index.md#designating-the-historian-that-is-read-from). |

## Table layout

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

The columns follow the same field set as the tag change file logger, so history written by either can be interpreted in the same way. If you create the table yourself, disable **Auto Create Table** and make sure the account in the connection string can insert into and read from it.

!!! warning "Moving a tag starts a new history"
    History is recorded under the tag's path, so history recorded under the old path is not carried across if a component is moved. See [Tag tree path](../../Tags/Tag_Tree_Path.md).

## Related documentation

- [Historians](index.md)
- [InfluxDB and Prometheus logging](../Loggers/InfluxDB_Prometheus_Logger.md)
- [Configure data logging](../../How_To_Guides/Configure_Data_Logging.md)
- [Tag layer](../../Tags/index.md)
