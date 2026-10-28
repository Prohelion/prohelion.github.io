---
title: Script types
description: "Choose between the seven Profinity script modes, including the shape a Custom Component script uses."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Script types

Profinity supports seven script modes, each with its own trigger and execution context.
The **Script Mode** setting selects the mode:

- Run On Demand
- Run On Receipt of CAN Message
- Run On Tag Change
- Run On Alert
- Run On Time Interval
- Run On CRON Schedule
- Run as Service

This page explains the differences between the modes and when to use each one.
A [Custom Component](../../Custom_Components/index.md) main script is a service script, and a firmware load, save, or action script runs once.

<figure markdown>
![The Script Mode drop-down in the script component settings, listing Run On Demand, Run On Receipt of CAN Message, Run On Tag Change, Run On Alert, Run On Time Interval, Run On CRON Schedule and Run as Service](../../../images/script_run_modes.png)
<figcaption>Script Mode Selection and Configuration in the Profinity UI</figcaption>
</figure>

## Choosing a mode

| Script type | Mode | Use it for |
|-------------|------|------------|
| [Run Script](./Run_Scripts.md) | Run On Demand | Short jobs that need little state, such as one-time operations, testing, and troubleshooting. The operator starts the script. |
| [Run Script](./Run_Scripts.md) | Run On Time Interval | Work that starts at a fixed interval, for example every 5 minutes or every hour. |
| [Run Script](./Run_Scripts.md) | Run On CRON Schedule | Time-of-day, weekly, and monthly work. The script starts from a Quartz cron expression. |
| [Receive Script](./Receive_Scripts.md) | Run On Receipt of CAN Message | Answering a packet with a reply message. The script runs each time a matching CAN packet arrives. |
| [Service Script](./Service_Scripts.md) | Run as Service | Continuous monitoring and other work that runs for a long time. The script implements a full lifecycle (start, stop, pause, and continue). |
| [Tag Change Script](./Tag_Change_Scripts.md) | Run On Tag Change | Computed tags, reacting to another component's output and chained automation without polling. The script runs each time a watched tag changes. |
| [Rule Script](./Rule_Scripts.md) | Run On Alert | Notifications and side effects beyond the built-in rule actions. The script runs when a rule names it as an action. |

A Run Script is not the right choice for continuous monitoring or real-time responses, and a Service Script is not the right choice for one-off or manual tasks.
Keep a Receive, Tag Change or Rule Script handler short, because a new event that arrives while it is still running is handled according to **Trigger Overlap**.
A threshold rule can start several of those events in one evaluation, so a rule script that must finish on the step the value lands on uses **Queue**, as described under [Trigger overlap](./Rule_Scripts.md#trigger-overlap).

## Custom Component scripts

A Custom Component script is a file named on the component.
**Script Mode** applies to a script component.

| Script | Runs as |
|--------|---------|
| Main script | [Service scripts](./Service_Scripts.md), started by **Auto Start Main Script** or **Connect / Disconnect** |
| `toggle` in `actions.yaml` | Service script |
| `button` in `actions.yaml` | Once, when the user chooses the menu item |
| `loadScript` in `firmware.yaml` | Once, when firmware is loaded |
| `saveScript` in `firmware.yaml` | Once, when firmware is saved |
| An entry under `actions` in `firmware.yaml` | Once, with an action context |

`Profinity.Action` is set only for an entry under `actions`.
Which values each script reads or writes is on [Component and firmware settings](../Script_Operations/Settings.md).
For the settings map layout, refer to [Settings](../../Custom_Components/Settings.md).
For the firmware map layout, refer to [Firmware maps](../../Custom_Components/Firmware_Maps.md).
For `firmware.yaml`, refer to [Firmware actions](../../Custom_Components/Firmware_Actions.md).
For the action object, refer to [Action context](../Script_Operations/Action.md).

## Script settings

Each script component has the following settings.
The schedule, receive, and tag change settings appear only for the mode that uses them.

| Setting | Applies to | Meaning |
|---------|------------|---------|
| **Script Mode** | All | The mode the script runs in |
| **Auto Start Script** | All | Starts the script automatically when the component loads: it starts a service, receiver, or watcher, runs an On Demand script once, and arms a scheduled script. Off by default |
| **Log Script Output** | All | Writes the script's console output to the script log. Off by default |
| **Trigger Overlap** | Run On Receipt of CAN Message, Run On Tag Change, Run On Alert | What happens to an event that arrives while the handler is still running. **Drop** (the default) discards it, and **Queue** keeps a short backlog and runs it afterwards |
| **Queue Depth** | Trigger Overlap set to **Queue** | How many events may wait, from 1 to 100, with a default of 8. Further events are dropped |
| **Time Interval** and **Time Interval Unit** | Run On Time Interval | How often the script runs, in seconds, minutes, hours, or days |
| **Cron Schedule** | Run On CRON Schedule | The Quartz cron expression that decides when the script runs |
| **Maximum Run Time (seconds)** | All | The time one run may take before it is cancelled. Blank means no limit. Trigger handlers stop only when the script checks `Profinity.ScriptCancelled` |
| **Base Address**, **Address Range** and **Milliseconds Valid** | Run On Receipt of CAN Message | The CAN addresses the script receives, in hexadecimal, and how long traffic from the device counts as valid |
| **Tag Paths** and **Collections** | Run On Tag Change | The tags and tag collections that trigger the script |

**Milliseconds Valid** defaults to 5000 and accepts -1 to 60000.
A value of -1 means traffic never expires.

## Keeping scripts healthy

A script runs inside the Profinity engine, so a loop, lock, or open connection that is never released slows every other component.
Review a script whenever Profinity performs badly while that script is running.

!!! info "Scripts run inside Profinity"
    Inefficient code, leaked memory or leaked resources run inside the Profinity engine and affect it directly.

Keep each script short, release anything it opens when the script stops, and set **Maximum Run Time (seconds)** on any script that could stall.
A Tag Change, Receive, or Rule Script handler stops at **Maximum Run Time (seconds)** only when the script checks `Profinity.ScriptCancelled`, so check it regularly in a long handler.
Write a failure to the Profinity Logs, so that a failed scheduled run can be traced afterwards.
Switch **Log Script Output** on while the script is being developed.
For event-driven scripts, use **Queue** with a small **Queue Depth** when no event may be lost and **Drop** when only the newest state matters.

State follows the same rule.
Use `State` for values that belong to one script.
Use `GlobalState` only for values that several scripts share.
Remove a value once nothing needs it.
Refer to [State](../Script_Operations/State.md) for how each scope behaves.
The handler rules for each type are on [Receive scripts](./Receive_Scripts.md), [Tag Change scripts](./Tag_Change_Scripts.md), and [Service scripts](./Service_Scripts.md).
