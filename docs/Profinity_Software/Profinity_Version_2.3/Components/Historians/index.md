---
title: Historians
description: "Historian components store tag history in a database and allow it to be read back through the APIs."
---

# Historians

A **historian** is a logging component that writes the history of your [tags](../../Tags/index.md) to a database and, unlike a [logger](../Loggers/File_Loggers.md), also allows that history to be read back out again through the APIs. [Dashboards](../../Customising_Profinity/Dashboards/index.md), trend charts and integrations that ask for long-range tag history are answered from the historian, so a profile that needs more than the recent in-memory values needs one.

Profinity provides three historians, and each selects the tags it records through [collections](../../Tags/Collections.md), in the same way as a logger.

| Historian | Stores data in | Documentation |
|---|---|---|
| InfluxDB v2 Historian | An InfluxDB v2 server, using a bucket and organisation. | [InfluxDB v2 Historian](InfluxDB_v2_Historian.md) |
| InfluxDB v3 Historian | An InfluxDB v3 server, using a database. | [InfluxDB v3 Historian](InfluxDB_v3_Historian.md) |
| TAG SQL Historian | A SQL database: SQLite, SQL Server / Azure SQL, PostgreSQL, MySQL or Oracle. | [TAG SQL Historian](TAG_SQL_Historian.md) |

## Which InfluxDB Component Do I Need

Check which InfluxDB version your server runs before adding a component, because InfluxDB v1, v2 and v3 are incompatible and a component only connects to the version it was built for. An InfluxDB v2 server organises data into buckets that belong to an organisation, so it needs the [InfluxDB v2 Historian](InfluxDB_v2_Historian.md), which asks for a bucket, an organisation and a token. An InfluxDB v3 server stores data in a single database, so it needs the [InfluxDB v3 Historian](InfluxDB_v3_Historian.md), which asks for a database and a token. An InfluxDB v1 server needs the **InfluxDB v1 Logger**, which is a logger rather than a historian and is documented under [InfluxDB and Prometheus Logging](../Loggers/InfluxDB_Prometheus_Logger.md).

## Designating the Historian That Is Read From

More than one historian can write in the same profile, but long-range tag and history queries are answered from exactly one of them. Enable **Designated tag historian reader** on that one component and leave it disabled on the others. If no component is designated, or more than one is, Profinity has no store to read history from and the long-range queries are not answered. An InfluxDB historian is designated only while its **Allow Retrieval** setting is also enabled.

## Licensing

Historians require the **Historians** licensed feature, included in the **Desktop**, **Server** and **Enterprise** editions. See [Licensing](../../Administration/Licensing.md) to check whether it is available on your instance.

## Related Documentation

- [Loggers](../Loggers/File_Loggers.md)
- [InfluxDB and Prometheus Logging](../Loggers/InfluxDB_Prometheus_Logger.md)
- [Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md)
- [Tag Layer](../../Tags/index.md)
- [Collections](../../Tags/Collections.md)
