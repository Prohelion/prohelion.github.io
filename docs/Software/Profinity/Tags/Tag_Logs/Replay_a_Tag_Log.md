---
title: Replay a tag log
description: Play a recorded tag log back onto your live tags with TAG LOG REPLAY, using the pause, stop, and loop controls, and learn what replay does to your tags.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Replay a tag log

The tag log replayer applies recorded values back onto your live tags, using the timing recorded in the file, so the replay runs at the pace of the original recording.
Only a log file written by a TAG File Logger or the TAG SFTP Logger, which uses Secure Shell (SSH) File Transfer Protocol (SFTP), can be replayed.
InfluxDB and Prometheus data cannot.
To record a log, refer to [Log tags to a file](Log_Tags_to_a_File.md).

Open **TAG LOG REPLAY** from the side menu.
It requires the **Replay tag changes** permission, which also turns on **View tags**.
Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md) for the full list of permissions.

!!! warning "Replay overwrites live values"
    Replayed values are applied to the same tags that live devices write to.
    Stop the component that writes these tags, or disconnect its device, first, or the live and replayed values compete. Refer to [Connections and reconnecting](../../Components/Connections_and_Reconnecting.md#stopping) for how a component stops.
    When the replay stops, or reaches the end of the log, the replayed values stay in place as the last values applied, and Profinity does not restore the earlier values.

Before you start, check two conditions on the log file:

| What you see | Cause | What to do |
|---|---|---|
| The upload is refused with "Your file must have an extension of .txt, .csv or .jsonl". | The file does not have a `.txt`, `.csv`, or `.jsonl` extension. | Check that the file has a `.txt`, `.csv`, or `.jsonl` extension. |
| The upload is refused with "A replay log with the name '…' already exists. Please delete the existing file first or upload a file with a different name." | A log with the same name is already there. | Delete the existing log or rename the new one. |

A log recorded on this instance is written to a `tag_logs/<profile name>/<logger name>/` folder, but the replayer lists only the `tag_logs/replay/` folder.
Refer to [Artefacts directory](../../Installation/Artifacts_Directory.md) for where this folder sits on each platform.
To add a log recorded on this instance, copy the file:

1. Copy the recorded file from its `tag_logs/<profile name>/<logger name>/` folder into `tag_logs/replay/`. Profinity creates that folder at start-up.
2. In **TAG LOG REPLAY**, check that the log is in the list.

To add a log recorded on another Profinity instance, use the **Upload tag change log files** control in **TAG LOG REPLAY** and choose the file.
Profinity places uploaded logs in `tag_logs/replay/` automatically.

To replay a log:

1. Select the log in the list and select the play button. A replay starts only when no other tag replay is running.
2. Watch the position slider. It moves through the log while the replay plays.

While a replay plays, the position slider shows the current point in the log.
The replay controls are:

- The pause control, an icon with the tooltip **Pause replay tag change log**, suspends the replay so that you can resume it later.
- **Stop** ends the replay.
- **Loop** replays the log continuously.
- The trashcan icon deletes the log after you confirm. Deleting a log removes its file permanently, and Profinity cannot restore it. Copy the file to a safe place first if you may need it again.

## What replay does to your tags

Each recorded value is written to the tag with the matching tag path, as if a new value had arrived.
Anything that reacts to tag changes, such as rules, alerts, derived tags, and dashboards, reacts to the replay.
Historians and tag logs that record changes also record replayed values, in the same way as live values.
The replayer skips a line in three cases:

- The tag does not exist in the loaded profile.
- The value cannot be read.
- The `Recv time` is invalid.

Only an invalid `Recv time` shows on screen, in a **Replay failed** dialog that reads `Error Reading File - invalid Recv time`. Correct the invalid `Recv time` values in the log file, or replace the log, and then replay it again. The other reasons are kept in the replay status, which the **TAG LOG REPLAY** screen does not show.

Replay a log against a profile that contains the same tags it was recorded from.
When the replay stops, or reaches the end of the log, the replayed values stay in place as the last values applied, rather than reverting.
To return to live values, start the component that writes these tags again, and it publishes fresh values.
To check a replay, open **Tag Explorer** and confirm that the replayed tags show the recorded values.
To act on replayed data, refer to [Create a rule](../Rules/Create_a_Rule.md), which raises alerts from a replayed log.
