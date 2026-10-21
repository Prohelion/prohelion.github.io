---
title: How to replay CAN bus logs
description: "Replay recorded CAN bus messages from a log file to test dashboards, rules, and components in Profinity without live CAN hardware."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# How to replay CAN bus logs

Replay recorded CAN bus messages to test dashboards, rules, and custom components without live CAN bus data, or to debug a component configuration against a recording.
The CAN Data Log Replayer replays log files that were recorded earlier in Profinity.
For how to record a log, refer to [Log / replay CAN bus messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md).

Before you start, you need:

- Profinity V2 installed and running.
- A recorded CAN bus log file, which comes from the CAN File Logger or the CAN SFTP Logger (refer to [CAN file and SFTP loggers](../Components/Loggers/CAN_File_and_SFTP_Loggers.md)), or the `example_log.csv` supplied with Profinity. SFTP is the SSH File Transfer Protocol. Logs from InfluxDB or Prometheus cannot be replayed, so use a File or SFTP logger to record logs for later replay.
- The **Replay CAN logs** permission (refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which provides the **CAN LOG REPLAY** side-menu entry and also turns on **View CAN data**.
- A profile whose components match the recording. Only components whose CAN addresses match the logged messages receive data. `example_log.csv` carries the CAN traffic of the Example Profile's components, so load the Example Profile first (refer to the [Quick start guide](../Getting_Started/Quick_Start.md)).
- Optional for testing: a [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) connected.

## Replay a log

!!! warning "Replay mixes with live traffic"
    Profinity processes replayed messages as if it had received them from the bus.
    Tags, dashboards, rules, and alerts react to them alongside any live traffic from a connected adapter.
    Disconnect the adapter, or isolate the live hardware from the bus, before you replay a log.
    Otherwise the live and replayed values compete.

The replayer lists only the `can_bus_logs/replay/` folder in the [artefacts directory](../Installation/Artifacts_Directory.md), which sits in a different place on each platform.
To replay a log:

1. Select **CAN UTILITIES** in the side menu, then **CAN LOG REPLAY**.
   The CAN Data Log Replayer opens and lists the available log files.
2. If the log file is not listed, for example a file recorded earlier or on another Profinity instance, add it in one of two ways:
    - Copy it into the `can_bus_logs/replay/` folder.
    - Use the **Upload CAN Log files** control and select the file.

   The file then appears in the list.
3. Select the log file in the list, then select **Play**.
   Replayed messages appear in the CAN Activity panel, which [How to send and receive CAN bus messages](./Send_Receive_CAN_Bus.md) describes.
   Components receive the messages, dashboards update, and the slider shows the position in the log.

An uploaded file must have a `.csv` or `.txt` extension, otherwise the upload is refused with "Your file must have an extension of .txt or .csv".
The upload is also refused if a log with the same name already exists, so delete the existing log first or rename the new one.

<figure markdown>
![The CAN LOG REPLAY page with the Upload CAN Log files control, the pause, stop and loop buttons and position slider for the selected log, and a table of log files with a trashcan icon on each row](../images/log_replayer.png)
<figcaption>CAN Data Log Replayer</figcaption>
</figure>

## Control the replay

While a replay plays, the position slider moves through the log.
You can drag the slider at any time, including during playback.
If you release the handle during playback, the replay jumps to that point and continues playing.
If the replay is paused or stopped, the handle sets the position that **Play** resumes from.
**Pause** suspends the replay, and **Play** resumes it.
**Stop** ends the replay, and **Loop** replays the log continuously.
The trashcan icon deletes a log file from the list, which is separate from controlling a replay.

## If nothing happens

Only a CAN message log recorded by a File or SFTP logger can be replayed, so an uploaded file of another kind does not play.
If the **CAN LOG REPLAY** entry is missing from the side menu, the signed-in user lacks the **Replay CAN logs** permission.
If the replay runs but the dashboards stay empty, no component in the active profile listens to the replayed CAN IDs.
Load the profile that the log was recorded against.
Recorded tag values are replayed separately with **TAG LOG REPLAY**, described in [Replay a tag log](../Tags/Tag_Logs/Replay_a_Tag_Log.md).

To check a Custom Component against its CAN database (DBC) file with recorded messages, refer to [How to create a Custom Component](./Create_Custom_Component.md).
