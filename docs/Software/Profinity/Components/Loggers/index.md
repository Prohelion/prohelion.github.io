---
title: Loggers
description: "Choose a Profinity logger to write tag collections or CAN messages to files, an SFTP server, InfluxDB v1, Prometheus, or a ThingsBoard device."
type: index
owner: Documentation
last_reviewed: 2026-10-15
---

# Loggers

A logger writes data out of Profinity for later retrieval, whereas a publisher pushes data to a receiver that is listening now.
InfluxDB v2 and v3 are [historians](../Historians/index.md), not loggers, because Profinity can read their data back.
The table compares the loggers, and each component name links to its page.
The settings that the file loggers share are on [File logger rotation, archive, and SFTP settings](File_Logger_Rotation_Archive_and_SFTP.md).

| Component | Direction | Where the data goes | Selects data by | Licence |
|---|---|---|---|---|
| [CAN File Logger](CAN_File_and_SFTP_Loggers.md) | Out | The local file system of the machine running Profinity, as native CAN bus messages | The CAN bus, not tag collections | Included in every edition |
| [CAN SFTP Logger](CAN_File_and_SFTP_Loggers.md) | Out | A remote Secure Shell (SSH) File Transfer Protocol (SFTP) server, as native CAN bus messages | The CAN bus, not tag collections | Included in every edition |
| [TAG File Logger](Tag_File_and_SFTP_Loggers.md) | Out | The local file system of the machine running Profinity, as comma-separated values (CSV) or JSON Lines | Tag collections | Included in every edition |
| [TAG SFTP Logger](Tag_File_and_SFTP_Loggers.md) | Out | A remote SFTP server, as CSV or JSON Lines | Tag collections | Included in every edition |
| [InfluxDB v1 Logger](InfluxDB_v1_Logger.md) | Out | An InfluxDB v1 server, which Profinity sends the data to | Tag collections | Included in every edition |
| [Prometheus Logger](Prometheus_Logger.md) | Out | Served by Profinity, which Prometheus calls to request the latest values | Tag collections | Included in every edition |
| [ThingsBoard Logger](ThingsBoard_Logger.md) | Out | A ThingsBoard device, which Profinity sends the data to | Tag collections | Data Relay, included in the Server and Enterprise editions |

The ThingsBoard Logger is a plugin, so install it before it appears under **Loggers** in **ADD COMPONENT**.

To push data to a broker or a web service, refer to the [Publishers and Subscribers](../Publishers_and_Subscribers/index.md) components.
