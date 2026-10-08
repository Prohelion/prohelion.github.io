---
title: Logs
description: "Configure Profinity system logging levels, log file rollover settings, and retention policies for diagnostics."
---

# Logs

Profinity has a built-in logging mechanism that captures information about the operation of the system and is designed to assist in diagnosing system issues.

## Viewing the Logs

To access the system logs, select **ADMIN** in the side menu, then the **Logs** pill.

<figure markdown>
![Profinity logs page listing entries with timestamp, level and message](../images/system_logs.png)
<figcaption>Profinity System Logs</figcaption>
</figure>

Each log entry contains a timestamp, a message level (for example `Info`, `Warn`, or `Error`), and a message description. The levels that are recorded are set by **Log Level** on the **Logging** tab of **System Configuration**, so a higher level records fewer messages, and the viewer shows what has been recorded at the persisted level. **Log Rollover Size (MB)** and **Retained Logs** are set on the same tab, described in [Logging](System_Configuration/Logging.md).
