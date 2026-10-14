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

To push data to a broker or a web service, refer to the [Publishers and subscribers](../Publishers_and_Subscribers/MQTT_Publisher.md) components.
