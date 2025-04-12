---
title: Logs
---

# Profinity System Logs

Profinity has a built in logging mechanism that captures information about the operation of the system and is designed to assist in system issue diagnosis.

## Viewing the Logs

To access the system logs, navigate to the `ADMIN` tab, then select `Logs`.

<figure markdown>
![Profinity Log](../images/system_logs.png)
<figcaption>Profinity system logs</figcaption>
</figure>

Each log entry contains a timestamp, a message level (e.g., `Info`, `Warn`, `Error`, etc.), and a message description. To help diagnose particular issues, the scope of the system logs can be changed to only include particular message levels.

## System Logs Configuration

From the `ADMIN` tab, selecting `System Configuration` then `Logging` brings up a menu containing options for modifying the log level, logs rollover size, and number of retained logs.

| Option              | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `Log Level`         | The scope of messages shown in the system logs                                  |
| `Log Rollover Size` | The maximum file size for each log file created, in MB                          |
| `Retained Logs`     | The number of log files that can be created before overwriting the oldest file  |

!!! warning "Changes to the system config"
    Modifying any parameters in the `System Configuration` menu will trigger a reboot of Profinity. If using the web client, wait around 15 seconds after saving the changes before reloading the page.

<figure markdown>
![System logs configuration](../images/logging_config.png)
<figcaption>Profinity logs configuration menu</figcaption>
</figure>

Logging levels are a standard industry term and define the types of messages that are displayed to the user in the system logs. Each progressive logging level also encompasses all entries of the previous levels. A brief description of the various log levels is given below.

| Logging Level   | Description                                                                                          |
| ----------------| ---------------------------------------------------------------------------------------------------- |
| `Fatal`         | Used when the application encounters an error that prevents the critical functionality from working  |
| `Error`         | Used when the application encounters an error that prevents particular functionality from working, but other parts of the application may remain functional |
| `Warn`          | Indicates something unexpected has happened, but the application continues to function               |
| `Info`          | Standard log level containing informative messages indicating the actions of the application. E.g., when changing states, connecting to the web API, etc.         |
| `Debug`         | Intermediate level of visibility that is helpful for debugging. Details some of the underlying application processes     |
| `Trace`         | Grants full visibility of underlying application execution. Only necessary when performing debugging |

!!! info "Log levels are persistent"
    Once a log level is set, it will remain persistent across restarts of Profinity