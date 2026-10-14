---
title: Profinity system logs
description: "Open the Profinity system logs to read timestamped entries and message levels when you diagnose an issue."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Profinity system logs

A built-in [logging mechanism](../Administration/Logs_Config.md) records the operation of the system, which helps diagnose issues.
To access the system logs, select **ADMIN** in the side menu, then the **Logs** pill.
If a log line goes off the right-hand side of the page because it is too big, select the line to expand that log message.

<figure markdown>
![The Profinity Logs page listing entries by level, date and time, and message, with a level filter open](../images/system_logs.png)
<figcaption>Profinity system logs</figcaption>
</figure>

Each log entry contains a timestamp, a message level (for example `Info`, `Warn` or `Error`), and a message description.
To help diagnose particular issues, the **Log Level** option on the **Logging** tab of System Configuration limits the system logs to particular message levels, and [Logging](../Administration/System_Configuration/Logging.md) describes the log levels.
