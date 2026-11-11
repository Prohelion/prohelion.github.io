---
title: File logger rotation, archive, and SFTP settings
description: "Look up the SFTP connection settings and the rotation, archive, compression, and file limit settings shared by the CAN and TAG file and SFTP loggers."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# File logger rotation, archive, and SFTP settings

The [CAN file and SFTP loggers](CAN_File_and_SFTP_Loggers.md) and the [TAG file and SFTP loggers](Tag_File_and_SFTP_Loggers.md) share the settings on this page.
They cover rotating, archiving, and compressing log files, and connecting to a Secure Shell (SSH) File Transfer Protocol (SFTP) server.

## SFTP settings

The CAN SFTP Logger and the TAG SFTP Logger send each completed log file to the remote server and need the following settings.

| Setting | Type | Default | Effect |
|---|---|---|---|
| **Remote Host** | Text | None | The name or address of the SFTP server. Required. |
| **Remote Port** | Whole number | 22 | The port of the SFTP server, from 1 to 65535. |
| **Remote server username** | Text | None | The account used to sign in. Required. |
| **Remote server password** | Secret | None | The password for that account. Required, and stored encrypted. |
| **Remote Directory** | Text | None | The directory the files are uploaded to, relative to the home directory of the user on the server. Required. Do not start it with `/`. |

For example, enter `home/sftp/upload` and not `/home/sftp/upload`.

If a transfer fails, Profinity writes an error to the Profinity system logs.
Refer to [Logs](../../Administration/Logs_Config.md) for where to read them.
The CAN SFTP Logger writes "Failed to transfer archived file via SFTP" and the TAG SFTP Logger writes "Failed to transfer archived TAG log via SFTP", each followed by the file name and the reason.
A connection or login failure also logs "Failed to connect to the SFTP server to test the connection" and "Failed to transfer the file `<name>` to the SFTP server".

Check the host, port, credentials, and remote directory.

## Archive, compression, and rotation

Rotation closes the current log file and starts a new one.
The **Rotate By** setting selects **No Rotation**, **Time** or **File Size**.
It defaults to **No Rotation**, so a logger writes one growing file until you switch rotation on.

| Setting | Type | Default | Effect |
|---|---|---|---|
| **Rotate By** | Choice | **No Rotation** | **No Rotation**, **Time** or **File Size**. |
| **Rotation Interval (Sec)** | Time | Follows **Update Interval (Seconds)** | Shown when **Rotate By** is **Time**. The seconds between rotations. When not set, it follows **Update Interval (Seconds)**, or is 600 seconds when neither is set. |
| **Rotate MB** | Whole number | 0 | Shown when **Rotate By** is **File Size**. The size in megabytes at which the file rotates. 0 rotates at 10 MB. |
| **Archive the Logs** | On or off | Off | Moves rotated log files into an `archive` folder beneath the log folder, so no archive directory needs to be provided. |
| **Compress Logs** | On or off | Off | Shown when **Archive the Logs** is on. Compresses archived log files into `.zip` files. |
| **Limit Number of Archive Files** | On or off | Off | Shown when **Archive the Logs** is on. Enables a limit on the number of log files retained in the archive. |
| **Archive File Limit** | Whole number | 0 | Shown when **Limit Number of Archive Files** is on. Must be greater than 0. If the limit is on and this is 0, Profinity reports a validation error and the setting is not valid. The maximum number of log files kept in the archive. When the limit is reached, the oldest files are deleted first. For the CAN SFTP Logger, the oldest remote files are deleted too. |

The CAN SFTP Logger and the TAG SFTP Logger always archive, because they archive files before they upload them.
They do not show **Archive the Logs**, because it is always on for them.
Compress Logs, Limit Number of Archive Files and Archive File Limit are always shown on these loggers.
