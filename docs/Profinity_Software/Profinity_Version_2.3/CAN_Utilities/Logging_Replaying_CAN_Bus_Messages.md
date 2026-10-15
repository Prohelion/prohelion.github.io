---
title: Log / replay CAN bus messages
description: "Choose how to log CAN bus messages to files or databases, and find what the CAN Data Log Replayer can and cannot replay."
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Log / replay CAN bus messages

Profinity can log and replay messages from your Controller Area Network (CAN) bus network, and can also log CAN bus data to timeseries databases such as InfluxDB and Prometheus.

To log a set of CAN bus messages, first add a [CAN bus Adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) to your [Profile](../Getting_Started/Profiles.md) and then connect to the adapter.
Refer to [How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md) for step-by-step guidance.
Before logging, check that Profinity is receiving CAN bus messages by using the [Receive CAN bus](Send_Receive_CAN_Bus_Messages.md#receive-can-packets) window, and once CAN bus messages are coming in to Profinity, you are ready to log.

## Logging CAN bus messages

There are two kinds of logger in Profinity: loggers that log to file ([CAN File and SFTP loggers](../Components/Loggers/CAN_File_and_SFTP_Loggers.md) and [TAG File and SFTP loggers](../Components/Loggers/Tag_File_and_SFTP_Loggers.md)), and loggers that log to timeseries databases such as [InfluxDB](../Components/Loggers/InfluxDB_v1_Logger.md) and [Prometheus](../Components/Loggers/Prometheus_Logger.md).
All loggers are configured in the same way, by adding the logger to the Profile as a component.

The file loggers include the CAN File Logger and the CAN SFTP Logger, which record native CAN bus messages, with the Secure File Transfer Protocol (SFTP) logger sending the files to a remote server.
The TAG File Logger and the TAG SFTP Logger instead record the values of the [tags](../Tags/index.md) in selected [tag collections](../Tags/Collections.md).

Publishing CAN-derived tag data to a Message Queuing Telemetry Transport (MQTT) broker or a webhook is handled by the [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) and the [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md), which are added from the **Publishers & Subscribers** category in the same way.

## CAN data log replayer

The CAN Data Log Replayer replays log files that were recorded earlier in Profinity.
The replayer cannot replay InfluxDB or Prometheus data.
Only a file log of CAN messages recorded by a File or SFTP logger can be replayed.
Replayed messages are processed as if they had been received from the bus, so they mix with any live traffic.
Refer to [How to replay CAN bus logs](../How_To_Guides/Replay_CAN_Logs.md) for the procedure, the **Replay CAN logs** permission, the replay controls and the warning about live traffic.

To log tag values instead, refer to [Log tags to a file](../Tags/Log_Tags_to_a_File.md).
To send packets to the bus, refer to [Send / receive CAN bus messages](Send_Receive_CAN_Bus_Messages.md).
