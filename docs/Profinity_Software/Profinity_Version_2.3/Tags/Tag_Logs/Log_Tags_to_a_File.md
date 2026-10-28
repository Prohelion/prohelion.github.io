---
title: Log tags to a file
description: Record tag values to a CSV or JSON Lines file with the TAG File Logger or TAG SFTP Logger so that the recording can be replayed later.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Log tags to a file

Profinity can record the values of your tags to a file.
It can replay that recording later, so a tag-driven [collection](../Collections/index.md), [rule](../Rules/index.md), [alert](../Alerts.md), or [dashboard](../../Customising_Profinity/Dashboards/index.md) behaves as it did when the data was captured.
This is the tag-layer equivalent of [Log / replay CAN bus messages](../../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md), and it works with any tag, including those decoded from CAN.

Tags are recorded by the **TAG File Logger**, or by the **TAG SFTP Logger** when the files should be sent to a remote server over Secure Shell (SSH) File Transfer Protocol (SFTP).
To record tags:

1. Add the logger to your [Profinity profile](../../Getting_Started/Profiles.md) as a component.
2. In **Collections**, select the tag collections to record.
3. Start the logger. With **Auto Connect** on (the default), the logger starts when the profile loads or the component is added. Otherwise, use the **Start Logger / Stop Logger** toggle in the logger component's actions.

Only the tags that belong to the selected collections are written, at every quality, including Stale, Unavailable, and Bad.
A TAG File Logger needs at least one collection selected before it starts.
Saving its settings restarts a running logger but does not start a stopped one.

Choose the **File Format** with replay in mind.
Both `CSV` (comma-separated values, `.txt`) and `JSON Lines` (`.jsonl`) can be replayed.
For the full list of settings, including the **Logging mode**, rotation, and archive options, refer to [Tag file and SFTP loggers](../../Components/Loggers/Tag_File_and_SFTP_Loggers.md).
For the SFTP connection and the rotation and archive settings, refer to [File logger rotation, archive, and SFTP settings](../../Components/Loggers/File_Logger_Rotation_Archive_and_SFTP.md).
To check it worked, look in the `tag_logs/<profile name>/<logger name>/` folder on the instance for a new log file, which holds rows for the tags in your collections.
Refer to [Artefacts directory](../../Installation/Artifacts_Directory.md) for where `tag_logs/` sits on each platform.
To play a recording back, refer to [Replay a tag log](Replay_a_Tag_Log.md).
