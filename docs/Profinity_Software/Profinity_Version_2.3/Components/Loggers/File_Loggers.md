---
title: File Loggers
description: "Log CAN bus messages to local or remote SFTP destinations with compression and archival options."
---

# File / SFTP Based Loggers

File loggers in Profinity log native CAN bus messages to a file, which can then be stored locally or transmitted remotely to an SFTP server.

## Logger Variants

File based loggers in Profinity are available in two variants, each added to a Profile as its own component:

| Logger                  | Details                                                                             |
|-------------------------|-------------------------------------------------------------------------------------|
| CAN File Logger         | Writes the log files to the local file system of the machine running Profinity.     |
| CAN SFTP Logger         | Transmits the log files to a remote Secure File Transfer Protocol (SFTP) server.    |

Profinity presents different destination options depending on the logger used. The CAN SFTP Logger requires the `Remote Host`, `Remote Port`, `Remote server username`, `Remote server password` and `Remote Directory` settings (the remote directory is relative to the home directory of the user on the server, so it must not start with `/`), whereas the CAN File Logger has no destination setting and creates its files under the Profinity CAN bus log directory, in a folder named after the profile and the component.

The tag based equivalents, the TAG File Logger and the TAG SFTP Logger, are registered as separate components, log the values of the tags in the collections selected in the `Collections` setting rather than raw CAN bus messages, and add the `Logging mode` (`On Change`, `Snapshot` or `Everything`) and `File Format` settings.

Both loggers provide Archive and Compression settings, and archived log files are moved into an `archive` folder beneath the log folder, so no archive directory needs to be provided. The CAN SFTP Logger always archives, because files are archived before they are uploaded, and it therefore does not show the `Archive the Logs` setting.

| Setting                         | Purpose                                                                          |
|---------------------------------|----------------------------------------------------------------------------------|
| `Compress Logs`                 | Compresses rotated log files.                                                    |
| `Archive the Logs`              | Moves rotated log files into the archive folder.                                 |
| `Limit Number of Archive Files` | Enables a limit on the number of log files retained in the archive.              |
| `Archive File Limit`            | Sets the maximum number of log files retained in the archive, and applies to the remote files for the CAN SFTP Logger. |

Finally, the logger allows the frequency of rotation to be set with the `Rotate By` setting. Rotation closes the current log file and creates a new one, and Profinity supports either a time based (`Rotate By` set to `Time`, with `Rotation Interval (Sec)` in seconds) or a size based (`Rotate By` set to `File Size`, with `Rotate MB`) rotation policy, or no rotation (`No Rotation`).

Logging configurations are stored as part of your profile, so when a profile is loaded a logger that is set to start automatically begins logging without further action.

## Downloading the Logged Files

Once a CAN bus log file has been created, it can be downloaded from Profinity by clicking the link on the Logger Dashboard.

<figure markdown>
![Download Log File](../../images/file_logger.png)
<figcaption>Download Log File</figcaption>
</figure>
