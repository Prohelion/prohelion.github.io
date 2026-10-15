---
title: File logger rotation, archive, and SFTP settings
description: "Look up the SFTP connection settings and the rotation, archive, compression, and file limit settings shared by the CAN and TAG file and SFTP loggers."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# File logger rotation, archive, and SFTP settings

The [CAN file and SFTP loggers](CAN_File_and_SFTP_Loggers.md) and the [Tag file and SFTP loggers](Tag_File_and_SFTP_Loggers.md) share the settings on this page for rotating, archiving, and compressing log files, and for connecting to an SFTP server.

## SFTP settings

The CAN SFTP Logger and the TAG SFTP Logger send each completed log file to the remote server and need the following settings.

| Setting | Default | Purpose |
|---|---|---|
| **Remote Host** | None | The name or address of the SFTP server. Required. |
| **Remote Port** | 22 | The port of the SFTP server, from 1 to 65535. |
| **Remote server username** | None | The account used to sign in. Required. |
| **Remote server password** | None | The password for that account. Required, and stored encrypted. |
| **Remote Directory** | None | The directory the files are uploaded to, relative to the home directory of the user on the server, so it must not start with `/`. For example, enter `home/sftp/upload` and not `/home/sftp/upload`. Required. |

If a transfer fails, Profinity writes an error to the Profinity system logs (refer to [Logs](../../Administration/Logs_Config.md)).
The CAN SFTP Logger writes "Failed to transfer archived file via SFTP" and the TAG SFTP Logger writes "Failed to transfer archived TAG log via SFTP", each followed by the file name and the reason.
A connection or login failure also logs "Failed to connect to the SFTP server to test the connection" and "Failed to transfer the file <name> to the SFTP server".
Check the host, port, credentials, and remote directory.

## Archive, compression, and rotation

Rotation closes the current log file and starts a new one, and the **Rotate By** setting selects **No Rotation**, **Time** or **File Size**.
**Rotate By** defaults to **No Rotation**, so a logger writes one growing file until rotation is switched on.

| Setting | Purpose |
|---|---|
| **Rotate By** | **No Rotation** (the default), **Time** or **File Size**. |
| **Rotation Interval (Sec)** | Shown when **Rotate By** is **Time**. The seconds between rotations. When it is not set, it follows **Update Interval (Seconds)**, or is 600 seconds when neither is set. |
| **Rotate MB** | Shown when **Rotate By** is **File Size**. The size in megabytes at which the file rotates, 0 or greater. |
| **Archive the Logs** | Moves rotated log files into an `archive` folder beneath the log folder, so no archive directory needs to be provided. |
| **Compress Logs** | Shown when **Archive the Logs** is on. Compresses archived log files into `.zip` files. |
| **Limit Number of Archive Files** | Shown when **Archive the Logs** is on. Enables a limit on the number of log files retained in the archive. |
| **Archive File Limit** | Shown when **Limit Number of Archive Files** is on, and must be greater than 0. Sets the maximum number of log files retained in the archive, and applies to the remote files for the SFTP loggers. |

The CAN SFTP Logger and the TAG SFTP Logger always archive, because files are archived before they are uploaded, and they therefore do not show **Archive the Logs**.
