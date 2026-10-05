---
title: Logs
description: "Configure Profinity system logging levels, log file rollover settings, and retention policies for diagnostics."
---

# Profinity System Logs

Profinity has a built-in logging mechanism that captures information about the operation of the system and is designed to assist in diagnosing system issues.

## Viewing the Logs

To access the system logs, select **ADMIN** in the side menu, then the **Logs** pill.

<figure markdown>
![Profinity Log](../images/system_logs.png)
<figcaption>Profinity system logs</figcaption>
</figure>

Each log entry contains a timestamp, a message level (for example `Info`, `Warn`, or `Error`), and a message description. To help diagnose particular issues, the scope of the system logs can be changed to only include particular message levels.

The log level, rollover size and retained logs are set on the **Logging** tab of System Configuration, described in [Logging](System_Configuration/Logging.md).
