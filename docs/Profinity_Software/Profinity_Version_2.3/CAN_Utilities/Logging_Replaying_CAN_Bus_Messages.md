---
title: Log / replay CAN bus messages
description: "Log CAN bus messages to files or databases, and replay recorded CAN logs with the CAN Data Log Replayer."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Log / replay CAN bus messages

Profinity can log and replay messages from your Controller Area Network (CAN) bus network, and can also log CAN bus data to timeseries databases such as InfluxDB and Prometheus.

To log a set of CAN bus messages, first add a [CAN bus Adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) to your [Profile](../Getting_Started/Profiles.md) and then connect to the adapter.
Refer to [How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md) for step-by-step guidance.
Before logging, check that Profinity is receiving CAN bus messages by using the [Receive CAN bus](Send_Receive_CAN_Bus_Messages.md#receive-can-packets) window, and once CAN bus messages are coming in to Profinity, you are ready to log.

## Logging CAN bus messages

There are two kinds of logger in Profinity: loggers that [log to file](../Components/Loggers/File_Loggers.md), and loggers that log to timeseries databases such as [InfluxDB and Prometheus](../Components/Loggers/InfluxDB_Prometheus_Logger.md).
All loggers are configured in the same way, by adding the logger to the Profile as a component.

The file loggers include the CAN File Logger and the CAN SFTP Logger, which record native CAN bus messages, with the Secure File Transfer Protocol (SFTP) logger sending the files to a remote server.
The TAG File Logger and the TAG SFTP Logger instead record the values of the [tags](../Tags/index.md) in selected [tag collections](../Tags/Collections.md).

Publishing CAN-derived tag data to a Message Queuing Telemetry Transport (MQTT) broker or a webhook is handled by the [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) and the [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md), which are added from the **Publishers & Subscribers** category in the same way.

## CAN data log replayer

The CAN Data Log Replayer replays log files that were recorded earlier in Profinity.
Open it by selecting **CAN UTILITIES** in the side menu and then **CAN LOG REPLAY**.
The menu item needs the **Replay CAN logs** permission, which also turns on **View CAN data**.
Refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

The replayer cannot replay InfluxDB or Prometheus data.
Only a file log of CAN messages recorded by a File or SFTP logger can be replayed.

!!! warning "Replay mixes with live traffic"
    Replayed messages are processed by Profinity as if they had been received from the bus, so tags, dashboards, rules, and alerts react to them alongside any live traffic from a connected adapter. Disconnect the adapter, or isolate the live hardware from the bus, before replaying a log, or the live and replayed values compete.

To replay a log:

1. Add the log to the replayer if it is not listed. The replayer lists only the `can_bus_logs/replay/` folder in the artefacts directory, so copy a recorded log there, or add it with the **Upload CAN Log files** control, which also suits a log recorded on another Profinity instance. The file must have a `.csv` or `.txt` extension, otherwise the upload is refused with "Your file must have an extension of .txt or .csv", and it is refused if a log with the same name already exists, so delete the existing log first or rename the new one.
2. Select the log in the list and click the play button.

While a replay plays, the position slider moves to a different point in the log, the pause control suspends the replay so that it can be resumed later, **Stop** ends it, **Loop** replays the log continuously, and the trashcan icon deletes the log.
Refer to the [artefacts directory](../Installation/Artifacts_Directory.md) for where the log folders sit on each platform.

<figure markdown>
![The CAN LOG REPLAY page with the Upload CAN Log files control, the pause, stop and loop buttons and position slider for the selected log, and a table of log files with a trashcan icon on each row](../images/log_replayer.png)
<figcaption>CAN Data Log Replayer</figcaption>
</figure>

Related pages:

- [How to Replay CAN Logs](../How_To_Guides/Replay_CAN_Logs.md) for a worked procedure.
- [Log / Replay Tags](../Tags/Logging_Replaying_Tags.md) to log tag values instead.
- [Send / Receive CAN Bus Messages](Send_Receive_CAN_Bus_Messages.md) to send packets to the bus.
