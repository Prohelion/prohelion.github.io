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
| **Remote host** | Text | None | The name or address of the SFTP server. Required. |
| **Remote port** | Whole number | 22 | The port of the SFTP server, from 1 to 65535. |
| **Remote server username** | Text | None | The account used to sign in. Required. |
| **Remote server password** | Secret | None | The password for that account. Required, and stored encrypted. |
| **Remote directory** | Text | None | The directory the files are uploaded to, relative to the home directory of the user on the server. Required. Do not start it with `/`. |

For example, enter `home/sftp/upload` and not `/home/sftp/upload`.

If a transfer fails, Profinity writes an error to the Profinity system logs.
Refer to [Logs](../../Administration/Logs_Config.md) for where to read them.

| What you see | Cause | What to do |
|---|---|---|
| A transfer fails. The Profinity system log shows "Failed to transfer archived file via SFTP" (CAN SFTP Logger) or "Failed to transfer archived TAG log via SFTP" (TAG SFTP Logger), followed by the file name and the reason. | The upload either returned false or raised an error. The log entry gives the error message. | Check the host, port, credentials, and remote directory. |
| The log shows "Failed to connect to the SFTP server to test the connection" or "Failed to transfer the file `<name>` to the SFTP server". | A connection or login failure. | Check the host, port, credentials, and remote directory. |

## Archive, compression, and rotation

Rotation closes the current log file and starts a new one.
The **Rotate by** setting selects **No Rotation**, **Time** or **File Size**.
It defaults to **No Rotation**, so a logger writes one growing file until you switch rotation on.

| Setting | Type | Default | Effect |
|---|---|---|---|
| **Rotate by** | Choice | **No Rotation** | **No Rotation**, **Time** or **File Size**. |
| **Rotation interval (seconds)** | Time | Follows **Update interval (seconds)** | Shown when **Rotate by** is **Time**. The seconds between rotations. When not set, it follows **Update interval (seconds)**, or is 600 seconds when neither is set. |
| **Rotate MB** | Whole number | 0 | Shown when **Rotate by** is **File Size**. The size in megabytes at which the file rotates. 0 rotates at 10 MB. |
| **Archive the logs** | On or off | Off | Moves rotated log files into an `archive` folder beneath the log folder, so no archive directory needs to be provided. |
| **Compress logs** | On or off | Off | Shown when **Archive the logs** is on. Compresses archived log files into `.zip` files. |
| **Limit number of archive files** | On or off | Off | Shown when **Archive the logs** is on. Enables a limit on the number of log files retained in the archive. |
| **Archive file limit** | Whole number | 0 | Shown when **Limit number of archive files** is on. Must be greater than 0. If the limit is on and this is 0, Profinity reports a validation error and the setting is not valid. The maximum number of log files kept in the archive. When the limit is reached, the oldest files are deleted first. For the CAN SFTP Logger, the oldest remote files are deleted too. |

The CAN SFTP Logger and the TAG SFTP Logger always archive, because they archive files before they upload them.
They do not show **Archive the logs**, because it is always on for them.
Compress Logs, Limit Number of Archive Files and Archive File Limit are always shown on these loggers.
