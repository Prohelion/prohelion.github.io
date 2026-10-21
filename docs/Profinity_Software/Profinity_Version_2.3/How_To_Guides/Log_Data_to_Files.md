---
title: How to log data to files and SFTP servers
description: "Write CAN bus messages or tag values to log files on the local file system or an SFTP server, with rotation, archiving, and compression."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to log data to files and SFTP servers

Configure the CAN File Logger, TAG File Logger, CAN SFTP Logger or TAG SFTP Logger to write CAN bus messages or tag values to log files.
These loggers need no licensed feature, and every edition includes them.
You need an active profile and the **Modify components** permission.
For an SFTP logger you also need an SSH File Transfer Protocol (SFTP) server and its credentials.

The **CAN File Logger** writes native CAN bus messages to the local file system.
It needs no destination setting, because it creates its files in the `can_bus_logs/` directory, in a folder named after the profile and the component.
The **TAG File Logger** writes tag values the same way, in the `tag_logs/` directory, in a folder named after the profile and the logger (`tag_logs/<profile name>/<logger name>/`).
The **CAN SFTP Logger** and the **TAG SFTP Logger** transmit the files to a server.

1. Add the logger, as described in [How to configure data logging](./Configure_Data_Logging.md#add-the-component).
2. For the **CAN SFTP Logger** and the **TAG SFTP Logger**, set these fields:
    - **Remote Host**
    - **Remote Port**
    - **Remote server username**
    - **Remote server password**
    - **Remote Directory**, which is relative to the home directory of the user on the SFTP server, so it must not start with `/`
3. Set the **Update Interval (Seconds)**.
4. For the **TAG File Logger** and **TAG SFTP Logger**, also set:
    1. The **Logging mode** (`On Change`, `Snapshot`, or `Everything`).
    2. The **File Format** (`CSV` or `JSON Lines`).
5. Set **Rotate By** to **No Rotation**, **Time**, or **File Size**.
   This setting decides when Profinity closes the current log file and creates a new one.
6. For time-based rotation, set **Rotation Interval (Sec)**.
   For size-based rotation, set **Rotate MB**.
7. File loggers can generate large files.
   To manage them:
    1. Enable **Archive the Logs** to move rotated log files into an `archive` folder beneath the log folder. The **CAN SFTP Logger** and the **TAG SFTP Logger** always archive, so they do not show this setting.
    2. Optional: Enable **Compress Logs** to compress rotated logs.
    3. Enable **Limit Number of Archive Files** and set the **Archive File Limit** to the number of log files to retain.
8. For the **TAG File Logger** and **TAG SFTP Logger**, select the tag collections to log, as described in [How to configure data logging](./Configure_Data_Logging.md#select-tag-collections).
   The logger writes only the tags in those collections.
9. Select **ADD COMPONENT** at the bottom of the dialog.
   The button reads **SAVE** when you change the settings of an existing component.

To start the logger and confirm that new log files appear, refer to [How to configure data logging](./Configure_Data_Logging.md#start-the-logger-or-publisher).
For the full settings, refer to [CAN file and SFTP loggers](../Components/Loggers/CAN_File_and_SFTP_Loggers.md) and [Tag file and SFTP loggers](../Components/Loggers/Tag_File_and_SFTP_Loggers.md).
