---
title: Historians
description: "Historian components store tag history in a database and allow it to be read back through the APIs."
---

# Historians

A **historian** is a logging component that writes the history of your [tags](../../Tags/index.md) to a database and, unlike a [logger](../Loggers/File_Loggers.md), also allows that history to be read back out again through the APIs. Dashboards, trend charts and integrations that ask for long-range tag history are answered from the historian, so a profile that needs more than the recent in-memory values needs one.

Profinity provides three historians, and each selects the tags it records through [collections](../../Tags/Collections.md), in the same way as a logger.

| Historian | Stores data in | Documentation |
|---|---|---|
| InfluxDB v2 Historian | An InfluxDB V2 server, using a bucket and organisation. | [InfluxDB v2 Historian](InfluxDB_v2_Historian.md) |
| InfluxDB v3 Historian | An InfluxDB V3 server, using a database. | [InfluxDB v3 Historian](InfluxDB_v3_Historian.md) |
| TAG SQL Historian | A SQL database: SQLite, SQL Server / Azure SQL, PostgreSQL, MySQL or Oracle. | [TAG SQL Historian](TAG_SQL_Historian.md) |

The InfluxDB version in use must be known before a component is chosen, because InfluxDB V1, V2 and V3 are separate, incompatible products, and the InfluxDB v1 Logger is documented with the Prometheus Logger under [InfluxDB and Prometheus logging](../Loggers/InfluxDB_Prometheus_Logger.md).

## Designating the historian that is read from

More than one historian, or a logger that supports retrieval, can write in the same profile, but long-range tag and history queries are answered from exactly one of them. Enable **Designated tag historian reader** on that one component, and leave it disabled on the others, so that Profinity knows which store to query.

## Licensing

Historians require the **Historians** licensed feature. See [Licensing](../../Administration/Licensing.md) to check whether it is available on your instance.

## Related documentation

- [Loggers](../Loggers/File_Loggers.md)
- [InfluxDB and Prometheus logging](../Loggers/InfluxDB_Prometheus_Logger.md)
- [Configure data logging](../../How_To_Guides/Configure_Data_Logging.md)
- [Tag layer](../../Tags/index.md)
- [Collections](../../Tags/Collections.md)
