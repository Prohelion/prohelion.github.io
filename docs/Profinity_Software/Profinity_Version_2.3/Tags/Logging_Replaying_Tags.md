---
title: Log / Replay Tags
description: "Record tag values to files and replay recorded tag logs with playback controls and looping."
---

# Log / Replay Tags

Profinity can record the values of your tags to a file and replay that recording later, so a tag-driven [collection](Collections.md), [rule](Actions.md), [alert](Alerts.md) or [dashboard](../Customising_Profinity/Dashboards/index.md) behaves as it did when the data was captured. This is the tag-layer equivalent of [logging and replaying CAN bus messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md), and it works with any tag, not only those decoded from CAN.

## Logging Tags

Tags are recorded by the **TAG File Logger**, or by the **TAG SFTP Logger** when the files should be sent to a remote server. Add the logger to your [Profile](../Getting_Started/Profiles.md) as a component, select the tag collections to record in `Collections`, and start it. Only the tags that belong to the selected collections are written, and only samples of Good quality.

Choose the **File Format** with replay in mind. Both `CSV` (`.txt`) and `JSON Lines` (`.jsonl`) can be replayed. For the full list of settings, including the `Logging mode`, rotation and archive options, see [File and Tag Loggers](../Components/Loggers/File_Loggers.md), and for the step-by-step setup see [Configure Data Logging](../How_To_Guides/Configure_Data_Logging.md).

!!! info "Replaying Logs Requires a File Logger"
    Only a log file written by a TAG File Logger or TAG SFTP Logger can be replayed. InfluxDB and Prometheus data cannot.

## Tag Log Replayer

The tag log replayer applies the recorded values back onto your live tags, using the timing recorded in the file, so the replay runs at the pace of the original recording.

Open **TAG LOG REPLAY** from the side menu. It requires the **Replay tag changes** permission, which also turns on **View tags**. See [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

To replay a log:

1. If the log was recorded on another Profinity instance, or earlier and moved elsewhere, use the **Upload Tag Change Log files** control to add it. The file must have a `.txt`, `.csv` or `.jsonl` extension, and an upload is refused if a log with the same name already exists, so delete the existing log first or rename the new one.
2. Select the log in the list and click the play button. A replay starts only when no other tag replay is running.
3. Use the controls while it plays:
    - Slide the position slider back and forth to move to a different point in the log.
    - Pause to suspend the replay and resume it later.
    - Click **Stop** to end the replay.
    - Enable **Loop** to replay the log continuously.
    - Click the trashcan icon to delete the log.

Logs recorded by a TAG File Logger on this instance are stored under the `tag_logs/` folder, and the replayer lists the logs in its `replay/` folder. Uploaded logs are placed in `replay/` automatically. See the [artefacts directory](../Installation/Artifacts_Directory.md) for where this folder sits on each platform.

### What Replay Does to Your Tags

- Each recorded value is written to the tag with the matching tag path, as if a new value had just arrived, so anything that reacts to tag changes, such as rules, alerts, derived tags and dashboards, reacts to the replay.
- A line is skipped, and the replayer status reports the reason, if its tag does not exist in the loaded profile, if its value cannot be read, or if its `Recv time` is invalid. Replay a log against a profile that contains the same tags it was recorded from.
- When the replay stops, or reaches the end of the log, the replayed values stay in place as the last values applied, rather than reverting.

!!! warning "Replay Overwrites Live Values"
    Replayed values are applied to the same tags that live devices write to. Disconnect or stop the live source first, or the live and replayed values will compete.

## Replay Through the API

Integrators can drive the replayer through the [REST API](../Integrating_to_Profinity/APIs/index.md) under `/api/v2/Tags/Replay`: list the available logs, start a replay with a starting percentage and an optional loop flag, stop it, and read its status. These endpoints need the same **Replay tag changes** permission, and the Swagger page on your Profinity instance lists the parameters.
