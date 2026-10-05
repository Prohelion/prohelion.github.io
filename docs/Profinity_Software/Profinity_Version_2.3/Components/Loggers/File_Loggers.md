---
title: File and Tag Loggers
description: "Log CAN bus messages or tag collection values to local files or a remote SFTP server, with compression and archival options."
---

# File and Tag Loggers

File loggers in Profinity write either native CAN bus messages or the values of the [tags](../../Tags/index.md) in selected [tag collections](../../Tags/Collections.md) to a file, which can then be stored locally or transmitted remotely to an SFTP server.

## Logger Variants

File based loggers in Profinity are available in four variants, each added to a [Profile](../../Getting_Started/Profiles.md) as its own component under **Loggers**:

| Logger          | Details                                                                                                      |
|-----------------|--------------------------------------------------------------------------------------------------------------|
| CAN File Logger | Writes native CAN bus messages to the local file system of the machine running Profinity.                   |
| CAN SFTP Logger | Transmits native CAN bus messages to a remote Secure File Transfer Protocol (SFTP) server.                  |
| TAG File Logger | Writes the values of the tags in the selected tag collections to the local file system, as CSV or JSON Lines. |
| TAG SFTP Logger | Transmits those tag values to a remote SFTP server, as CSV or JSON Lines.                                   |

Profinity presents different destination options depending on the logger used. The CAN SFTP Logger and the TAG SFTP Logger require the `Remote Host`, `Remote Port`, `Remote server username`, `Remote server password` and `Remote Directory` settings (the remote directory is relative to the home directory of the user on the server, so it must not start with `/`). The CAN File Logger and the TAG File Logger have no destination setting. The CAN File Logger creates its files under the Profinity CAN bus log directory (`can_bus_logs/`), and the TAG File Logger creates its files under the Profinity tag log directory (`tag_logs/`), in each case in a folder named after the profile and the component. See the [artefacts directory](../../Installation/Artifacts_Directory.md) for where those directories sit on each platform.

## Tag Loggers

The TAG File Logger and the TAG SFTP Logger log the values of the tags in the collections selected in `Collections`. Each starts only when at least one collection is selected, and it logs only the tags that belong to those collections, so a collection has to exist before the logger can be started. Only samples of Good quality are written.

| Setting                 | Purpose                                                                                                                                 |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `Collections`           | The tag collections whose member values are logged. At least one collection must be configured before the logger starts.               |
| `Update Interval (Seconds)` | The interval, in seconds, between writes. The default is `10`, and the value must be between `10` and `86400`. With `Snapshot` this is how often the current value of each member is written, and with `On Change` or `Everything` it is how often pending changes or samples are flushed. |
| `Logging mode`          | `On Change` writes value changes, `Snapshot` writes the current value of every collection member on the interval, and `Everything` writes every sample, including unchanged values. The default is `Snapshot`. |
| `DBC Notification Mode` | Shown only when `Logging mode` is `On Change`. `Value Change Only` writes a DBC signal when its decoded value changes, and `Every Decoded Physical Sample` writes a line for every decoded sample of that signal, including repeats. `Everything` always uses `Every Decoded Physical Sample`. Tags that are not DBC signal leaves always follow value-change behaviour. |
| `File Format`           | `CSV` writes one row per sample, with the header `Recv time,TagId,ValueType,Value,UtcTimestamp,Quality,Reason,Message`, and the file uses a `.txt` extension. `JSON Lines` writes one JSON object per line, and the file uses a `.jsonl` extension. The default is `CSV`. |

`Recv time` is the local time the line was written, and `UtcTimestamp` is the timestamp carried by the tag sample, so the two can differ.

## Archive, Compression and Rotation

Each logger provides Archive and Compression settings, and archived log files are moved into an `archive` folder beneath the log folder, so no archive directory needs to be provided. The CAN SFTP Logger and the TAG SFTP Logger always archive, because files are archived before they are uploaded, and they therefore do not show the `Archive the Logs` setting.

| Setting                         | Purpose                                                                                                          |
|---------------------------------|------------------------------------------------------------------------------------------------------------------|
| `Compress Logs`                 | Compresses rotated log files.                                                                                    |
| `Archive the Logs`              | Moves rotated log files into the archive folder.                                                                |
| `Limit Number of Archive Files` | Enables a limit on the number of log files retained in the archive.                                             |
| `Archive File Limit`            | Sets the maximum number of log files retained in the archive, and applies to the remote files for the SFTP loggers. |

Finally, the logger allows the frequency of rotation to be set with the `Rotate By` setting. Rotation closes the current log file and creates a new one, and Profinity supports either a time based (`Rotate By` set to `Time`, with `Rotation Interval (Sec)` in seconds) or a size based (`Rotate By` set to `File Size`, with `Rotate MB`) rotation policy, or no rotation (`No Rotation`).

Logging configurations are stored as part of your profile, so when a profile is loaded a logger that is set to start automatically begins logging without further action.

## Downloading the Logged Files

Once a log file has been created, it can be downloaded from Profinity by clicking the link on the Logger Dashboard. A CAN File Logger shows this link as **FILE LOGS REPOSITORY**, and a TAG File Logger shows it as **TAG LOGS REPOSITORY**.

<figure markdown>
![Download Log File](../../images/file_logger.png)
<figcaption>Download Log File</figcaption>
</figure>
