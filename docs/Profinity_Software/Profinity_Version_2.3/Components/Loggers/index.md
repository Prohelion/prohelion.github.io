---
title: Loggers
description: "Choose a Profinity logger to write tag collections or CAN messages to files, an SFTP server, InfluxDB v1 or Prometheus."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Loggers

A logger writes data out of Profinity for later retrieval, whereas a publisher pushes data to a receiver that is listening now.
InfluxDB v2 and v3 are [historians](../Historians/index.md), not loggers, because Profinity can read their data back.

- [File and tag loggers](File_Loggers.md): log CAN bus messages or tag collection values to local files or a remote SFTP server, with compression and archival options.
- [InfluxDB and Prometheus logging](InfluxDB_Prometheus_Logger.md): log tag collection values to InfluxDB v1, or serve them to Prometheus.

| Logger | What it logs | Where the data goes | Auto Connect default | Licence |
|---|---|---|---|---|
| [CAN File Logger](File_Loggers.md#logger-variants) | Native CAN bus messages | The local file system of the machine running Profinity | On | Included in every edition |
| [CAN SFTP Logger](File_Loggers.md#logger-variants) | Native CAN bus messages | A remote Secure File Transfer Protocol (SFTP) server | On | Included in every edition |
| [TAG File Logger](File_Loggers.md#logger-variants) | The values of the tags in the selected tag collections, as comma-separated values (CSV) or JSON Lines | The local file system of the machine running Profinity | On | Included in every edition |
| [TAG SFTP Logger](File_Loggers.md#logger-variants) | The values of the tags in the selected tag collections, as CSV or JSON Lines | A remote SFTP server | On | Included in every edition |
| [InfluxDB v1 Logger](InfluxDB_Prometheus_Logger.md#influxdb-v1-logger) | The values of the tags in the selected tag collections | An InfluxDB v1 server, which Profinity sends the data to | On | Included in every edition |
| [Prometheus Logger](InfluxDB_Prometheus_Logger.md#prometheus) | The values of the tags in the selected tag collections | Served by Profinity, which Prometheus calls to request the latest values | On | Included in every edition |

To push data to a broker or a web service, refer to the [Publishers and subscribers](../Publishers_and_Subscribers/MQTT_Publisher.md) components.
