---
title: How to Replay CAN Bus Logs
description: "Replay recorded CAN bus messages from log files to test your Profinity system without live CAN hardware."
---

# How to Replay CAN Bus Logs

Replay recorded CAN bus messages to test dashboards, rules and custom components without live CAN bus data, or to debug a component configuration against a recording.

## Prerequisites

- Profinity V2 installed and running
- A recorded CAN bus log file from a [File Logger](../Components/Loggers/File_Loggers.md) or an SSH File Transfer Protocol (SFTP) logger, or the `example_log.csv` supplied with Profinity. Logs from InfluxDB or Prometheus cannot be replayed, so use a File or SFTP logger to record logs for later replay.
- The **Replay CAN logs** permission (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which provides the **CAN LOG REPLAY** side-menu entry
- A profile whose components match the recording. `example_log.csv` carries the CAN traffic of the Example Profile's components, so load the Example Profile first (see the [Quick Start Guide](../Getting_Started/Quick_Start.md)), because only components whose CAN addresses match the logged messages receive data
- A [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) connected (optional for testing)

## Steps

1. Select **CAN UTILITIES** in the side menu, then **CAN LOG REPLAY**, which opens the CAN Data Log Replayer and lists the available log files.
2. If the log file is not listed, for example a file recorded earlier or on another Profinity instance, use the **Upload CAN Log files** control and select the file, which then appears in the list.
3. Select the log file in the list and click **Play** to start the replay. Replayed messages appear in the [CAN Activity panel](./Send_Receive_CAN_Bus.md), components receive them, dashboards update, and the slider shows the position in the log.

## Control the Replay

The slider moves the replay to any position in the log, **Pause** suspends the replay and **Play** resumes it, **Stop** ends it, and **Loop** replays the log continuously. The trashcan icon deletes a log file from the list, which is separate from controlling a replay.

## If Nothing Happens

Only a CAN message log recorded by a File or SFTP logger can be replayed, so an uploaded file of another kind does not play. If the **CAN LOG REPLAY** entry is missing from the side menu, the signed-in user lacks the **Replay CAN logs** permission. If the replay runs but the dashboards stay empty, no component in the active profile listens to the replayed CAN IDs, so load the profile that the log was recorded against. Recorded tag values are replayed separately with **TAG LOG REPLAY**, described in [Log / Replay Tags](../Tags/Logging_Replaying_Tags.md).

## Related Documentation

- [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) - the full logging and replay reference
- [How to Send and Receive CAN Bus Messages](./Send_Receive_CAN_Bus.md) - CAN message tools
- [How to Create a Custom Component](./Create_Custom_Component.md) - check a Custom Component against its DBC file with recorded messages
