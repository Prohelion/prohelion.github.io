---
title: Logging
description: "Set the log level, log rollover size and number of retained logs on the System Configuration Logging tab."
---

# Logging

!!! warning "Saving Restarts Profinity"
    Saving changes on any System Configuration tab restarts Profinity. See [System Configuration](index.md) for what to expect.

The Logging tab of [System Configuration](index.md) holds the log level, the log rollover size and the number of retained logs.

| Option | Default | Range | Description |
| ------ | ------- | ----- | ----------- |
| `Log Level` | `Info` | `Trace`, `Debug`, `Info`, `Warn`, `Error`, `Fatal` | Only messages at this level or higher are recorded in the log files. |
| `Log Rollover Size (MB)` | 1 | 1 to 4096 | The size a log file reaches before a new file is started. |
| `Retained Logs` | 10 | 1 to 1000000 | The number of log files kept, after which the oldest are deleted. |

The default rollover size of 1 MB fills quickly on a busy instance, so raise **Log Rollover Size (MB)** when a lower log level is used for diagnosis.

<figure markdown>
![Logging tab of System Configuration showing log level, rollover size and retained logs](../../images/logging_config.png)
<figcaption>Profinity Logs Configuration Menu</figcaption>
</figure>

Each logging level also includes every more severe level, so `Trace` records every message from `Debug` through `Fatal`. The levels are described below.

| Logging Level   | Description                                                                                          |
| ----------------| ---------------------------------------------------------------------------------------------------- |
| `Fatal`         | Used when the application encounters an error that prevents critical functionality from working  |
| `Error`         | Used when the application encounters an error that prevents particular functionality from working, but other parts of the application may remain functional |
| `Warn`          | Indicates something unexpected has happened, but the application continues to function               |
| `Info`          | Standard log level containing informative messages indicating the actions of the application. E.g., when changing states, connecting to the web API, etc.         |
| `Debug`         | Intermediate level of visibility that is helpful for debugging. Details some of the underlying application processes     |
| `Trace`         | Grants full visibility of underlying application execution. Only necessary when performing debugging |

!!! info "Log Levels Are Persistent"
    Once a log level is set, it remains in effect across restarts of Profinity.

To read the logs, see [Logs](../Logs_Config.md).
