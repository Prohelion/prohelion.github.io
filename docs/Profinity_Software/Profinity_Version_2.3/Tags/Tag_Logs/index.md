---
title: Tag logs
description: Find the pages for recording tag values to a log file and replaying that log back onto live tags, for testing rules, alerts, and dashboards.
type: index
owner: Documentation
last_reviewed: 2026-10-20
---

# Tag logs

A tag log is a file of recorded tag values that Profinity can replay onto the live tags later, so that rules, alerts, derived tags, and dashboards react as they did when the data was captured.
The TAG File Logger or TAG SFTP Logger writes the log, and **TAG LOG REPLAY** under **TAG UTILITIES** plays it back.

- [Log tags to a file](Log_Tags_to_a_File.md): record the tags in selected collections to a CSV or JSON Lines file.
- [Replay a tag log](Replay_a_Tag_Log.md): play a recorded log back onto your live tags, which requires **Replay tag changes**.

For the CAN bus equivalent, refer to [Log / replay CAN bus messages](../../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md).
