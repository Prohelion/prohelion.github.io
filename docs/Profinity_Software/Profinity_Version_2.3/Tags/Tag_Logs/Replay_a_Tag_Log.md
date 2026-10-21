---
title: Replay a tag log
description: Play a recorded tag log back onto your live tags with TAG LOG REPLAY, using the pause, stop, and loop controls, and learn what replay does to your tags.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Replay a tag log

The tag log replayer applies recorded values back onto your live tags, using the timing recorded in the file, so the replay runs at the pace of the original recording.
Only a log file written by a TAG File Logger or TAG SFTP Logger (Secure Shell File Transfer Protocol) can be replayed.
InfluxDB and Prometheus data cannot.
To record a log, refer to [Log tags to a file](Log_Tags_to_a_File.md).

Open **TAG LOG REPLAY** from the side menu.
It requires the **Replay tag changes** permission, which also turns on **View tags**.
Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md) for the full list of permissions.

!!! warning "Replay overwrites live values"
    Replayed values are applied to the same tags that live devices write to.
    Disconnect or stop the live source first, or the live and replayed values compete.

Before you start, check two conditions on the log file:

- The file has a `.txt`, `.csv`, or `.jsonl` extension. Otherwise the upload is refused with "Your file must have an extension of .txt, .csv or .jsonl".
- No log with the same name is already there. Otherwise the upload is refused with "A replay log with the name '…' already exists. Please delete the existing file first or upload a file with a different name." Delete the existing log or rename the new one.

To replay a log:

1. If the log is not listed, add it to the replayer. A log recorded on this instance is written to a `tag_logs/<profile name>/<logger name>/` folder.
   The replayer lists only the `tag_logs/replay/` folder.
   Copy the recorded file there, or add it with the **Upload Tag Change Log files** control, which also suits a log recorded on another Profinity instance.
   Uploaded logs are placed in `tag_logs/replay/` automatically.
   Refer to [Artefacts directory](../../Installation/Artifacts_Directory.md) for where this folder sits on each platform.
2. Select the log in the list and click the play button. A replay starts only when no other tag replay is running.

While a replay plays, the position slider shows the current point in the log.
The replay controls are:

- The pause control suspends the replay so that you can resume it later.
- **Stop** ends the replay.
- **Loop** replays the log continuously.
- The trashcan icon deletes the log.

## What replay does to your tags

Each recorded value is written to the tag with the matching tag path, as if a new value had arrived.
Anything that reacts to tag changes, such as rules, alerts, derived tags, and dashboards, reacts to the replay.
The replayer skips a line, and its status reports the reason, in three cases:

- The tag does not exist in the loaded profile.
- The value cannot be read.
- The `Recv time` is invalid.
Replay a log against a profile that contains the same tags it was recorded from.
When the replay stops, or reaches the end of the log, the replayed values stay in place as the last values applied, rather than reverting.
