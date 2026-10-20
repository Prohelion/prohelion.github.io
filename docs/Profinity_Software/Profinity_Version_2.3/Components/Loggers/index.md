---
title: Loggers
description: "Choose a Profinity logger to write tag collections or CAN messages to files, an SFTP server, InfluxDB v1 or Prometheus."
type: index
owner: Documentation
last_reviewed: 2026-10-15
---

# Loggers

A logger writes data out of Profinity for later retrieval, whereas a publisher pushes data to a receiver that is listening now.
InfluxDB v2 and v3 are [historians](../Historians/index.md), not loggers, because Profinity can read their data back.
The table compares the six loggers, and each component name links to its page.
Rotation, archive, and SFTP settings that the file loggers share are on [File logger rotation, archive, and SFTP settings](File_Logger_Rotation_Archive_and_SFTP.md).

| Component | Direction | Where the data goes | Selects data by | Auto Connect default | Licence |
|---|---|---|---|---|---|
| [CAN File Logger](CAN_File_and_SFTP_Loggers.md) | Out | The local file system of the machine running Profinity, as native CAN bus messages | The CAN bus, not tag collections | On | Included in every edition |
| [CAN SFTP Logger](CAN_File_and_SFTP_Loggers.md) | Out | A remote SSH File Transfer Protocol (SFTP) server, as native CAN bus messages | The CAN bus, not tag collections | On | Included in every edition |
| [TAG File Logger](Tag_File_and_SFTP_Loggers.md) | Out | The local file system of the machine running Profinity, as comma-separated values (CSV) or JSON Lines | Tag collections | On | Included in every edition |
| [TAG SFTP Logger](Tag_File_and_SFTP_Loggers.md) | Out | A remote SFTP server, as CSV or JSON Lines | Tag collections | On | Included in every edition |
| [InfluxDB v1 Logger](InfluxDB_v1_Logger.md) | Out | An InfluxDB v1 server, which Profinity sends the data to | Tag collections | On | Included in every edition |
| [Prometheus Logger](Prometheus_Logger.md) | Out | Served by Profinity, which Prometheus calls to request the latest values | Tag collections | On | Included in every edition |

To push data to a broker or a web service, refer to the [Publishers and subscribers](../Publishers_and_Subscribers/MQTT_Publisher.md) components.
