---
title: Replay a tag log
description: Play a recorded tag log back onto your live tags with TAG LOG REPLAY, using the pause, stop, and loop controls, and learn what replay does to your tags.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Replay a tag log

The tag log replayer applies the recorded values back onto your live tags, using the timing recorded in the file, so the replay runs at the pace of the original recording.
Replay needs a file logger: only a log file written by a TAG File Logger or TAG SFTP Logger can be replayed. InfluxDB and Prometheus data cannot.
To record a log, refer to [Log tags to a file](Log_Tags_to_a_File.md).

Open **TAG LOG REPLAY** from the side menu.
It requires the **Replay tag changes** permission, which also turns on **View tags**.
Refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) for permissions.

!!! warning "Replay overwrites live values"
    Replayed values are applied to the same tags that live devices write to. Disconnect or stop the live source first, or the live and replayed values compete.

Before you start, check two conditions on the log file.
The file must have a `.txt`, `.csv` or `.jsonl` extension, otherwise the upload is refused with "Your file must have an extension of .txt, .csv or .jsonl".
If a log with the same name is already there, the upload is refused with "A replay log with the name '…' already exists. Please delete the existing file first or upload a file with a different name.", so delete the existing log first or rename the new one.

To replay a log:

1. If the log is not listed, add it to the replayer. A log recorded on this instance is written to `tag_logs/`, but the replayer lists only the `tag_logs/replay/` folder, so copy the recorded file there or add it with the **Upload Tag Change Log files** control, which also suits a log recorded on another Profinity instance. Uploaded logs are placed in `tag_logs/replay/` automatically. Refer to the [artefacts directory](../Installation/Artifacts_Directory.md) for where this folder sits on each platform.
2. Select the log in the list and click the play button. A replay starts only when no other tag replay is running.

While a replay plays, the position slider moves to a different point in the log, and the pause control suspends the replay so that it can be resumed later.
**Stop** ends the replay, **Loop** replays the log continuously, and the trashcan icon deletes the log.

## What replay does to your tags

Each recorded value is written to the tag with the matching tag path, as if a new value had just arrived, so anything that reacts to tag changes, such as rules, alerts, derived tags and dashboards, reacts to the replay.
A line is skipped, and the replayer status reports the reason, if its tag does not exist in the loaded profile, if its value cannot be read, or if its `Recv time` is invalid.
Replay a log against a profile that contains the same tags it was recorded from.
When the replay stops, or reaches the end of the log, the replayed values stay in place as the last values applied, rather than reverting.
