---
title: Tag file and SFTP loggers
description: "Log selected tag collections to local CSV or JSON Lines files, or send them to a remote SFTP server, with logging mode, interval, and file format settings."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# Tag file and SFTP loggers

The **TAG File Logger** and the **TAG SFTP Logger** write the values of the [tags](../../Tags/index.md) in selected [tag collections](../../Tags/Collections.md) to a file as comma-separated values (CSV) or JSON Lines.
The TAG File Logger writes the file to the local file system of the machine running Profinity, and the TAG SFTP Logger transmits it to a remote SSH File Transfer Protocol (SFTP) server.
Each is added to a [Profile](../../Getting_Started/Profiles.md) as its own component under **Loggers** and is included in every edition.
A logger only writes data out for later retrieval, so history that Profinity must read back belongs in a [historian](../Historians/index.md).

<figure markdown>
```mermaid
flowchart LR
    Source["Tag collections"] --> File["TAG File Logger"] --> Files["Local log files"]
    Source --> Sftp["TAG SFTP Logger"] --> Server["SFTP server"]
```
<figcaption>The TAG File Logger writes the values in tag collections to log files on the local file system, and the TAG SFTP Logger transmits them to an SFTP server</figcaption>
</figure>

Both loggers have **Auto Connect**, which is on by default, so a logger begins logging when the Profile loads and needs no further action.
The TAG File Logger has no destination setting.
It creates its files under the Profinity tag log directory (`tag_logs/`), in a folder named after the Profile and the component.
Refer to the [artefacts directory](../../Installation/Artifacts_Directory.md) for where that directory sits on each platform.
The TAG SFTP Logger needs the remote server settings described in [File logger rotation, archive, and SFTP settings](File_Logger_Rotation_Archive_and_SFTP.md), which also covers rotating, archiving, and compressing the log files.

## Settings

Both loggers log the values of the tags in the collections selected in **Collections**, and every sample is written with its quality: a Stale tag keeps its last value, and a tag that is Unavailable or Bad is written with its quality and an empty value.
A logger with no collection selected does not start, and its status stays off, so a collection has to exist and be selected before the logger can be started.

| Setting | Purpose |
|---|---|
| **Collections** | The tag collections whose member values are logged. At least one collection must be configured before the logger starts. |
| **Update Interval (Seconds)** | The interval, in seconds, between writes. The default is 10, and the value must be between 10 and 86400. With **Snapshot** this is how often the current value of each member is written, and with **On Change** or **Everything** it is how often pending changes or samples are flushed. |
| **Logging mode** | Chooses between **Snapshot**, **On Change** and **Everything**. Refer to [Logging modes](../Logging_Modes.md) for what each mode writes. The default is **Snapshot**. |
| **File Format** | **CSV** writes one row per sample, with the header `Recv time,TagId,ValueType,Value,UtcTimestamp,Quality,Reason,Message`, and the file uses a `.txt` extension. **JSON Lines** writes one JSON object per line, and the file uses a `.jsonl` extension. The default is **CSV**. In the CSV header, `Recv time` is the local time the line was written and `UtcTimestamp` is the timestamp carried by the tag sample, so the two can differ. |

[Logging modes](../Logging_Modes.md) describes how the modes behave across all collection-based components.

## Download the logged files

Once a log file has been created, select the link on the Logger Dashboard to download it from Profinity.
A TAG File Logger shows this link as **TAG LOGS REPOSITORY**.

To take the same data further, refer to [How to log data to the cloud (InfluxDB)](../../How_To_Guides/Log_Data_to_Cloud_Influx.md) and [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md).
