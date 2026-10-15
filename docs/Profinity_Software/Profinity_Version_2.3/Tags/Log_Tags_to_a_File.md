---
title: Log tags to a file
description: Record tag values to a CSV or JSON Lines file with the TAG File Logger or TAG SFTP Logger so that the recording can be replayed later.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Log tags to a file

Profinity can record the values of your tags to a file and replay that recording later, so a tag-driven [collection](Collections.md), [rule](Rules.md), [alert](Alerts.md), or [dashboard](../Customising_Profinity/Dashboards/index.md) behaves as it did when the data was captured.
This is the tag-layer equivalent of [logging and replaying CAN bus messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md), and it works with any tag, including those decoded from CAN.

Tags are recorded by the **TAG File Logger**, or by the **TAG SFTP Logger** when the files should be sent to a remote server over SSH File Transfer Protocol (SFTP).
To record tags:

1. Add the logger to your [Profile](../Getting_Started/Profiles.md) as a component.
2. In `Collections`, select the tag collections to record.
3. Start the logger. With **Auto Connect** on (the default), the logger starts when the profile loads or the component is added. Otherwise, run **Start Logger** on the logger component, and **Stop Logger** to stop it.

Only the tags that belong to the selected collections are written, and only samples of Good quality.
A TAG File Logger needs at least one collection selected before it will start, and saving its settings restarts a running logger but does not start a stopped one.

Choose the **File Format** with replay in mind.
Both `CSV` (comma-separated values, `.txt`) and `JSON Lines` (`.jsonl`) can be replayed.
For the full list of settings, including the `Logging mode`, rotation and archive options, refer to [File and Tag Loggers](../Components/Loggers/Tag_File_and_SFTP_Loggers.md), and for the step-by-step setup refer to [Configure Data Logging](../How_To_Guides/Configure_Data_Logging.md).
To play a recording back, refer to [Replay a tag log](Replay_a_Tag_Log.md).
