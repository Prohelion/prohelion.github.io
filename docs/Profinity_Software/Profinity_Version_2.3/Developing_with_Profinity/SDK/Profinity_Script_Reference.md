---
title: profinity-script reference
description: "Look up the profinity-script templates, the sim.yaml scenario keys, the limits of the simulator, and the error messages the command prints."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# profinity-script reference

This page lists the templates, the `sim.yaml` scenario keys, the limits of the simulator, and the error messages for `profinity-script`, the tool in the Profinity SDK that runs a script on a simulated Profinity.
To create and run a script, refer to [Test a script outside Profinity](./Test_a_Script.md).

## Templates

`profinity-script new` with no template name prints the template names and exits with no error message.
`new` copies one example folder.
The folder contains `sim.yaml` and the script.
The table is in the order `profinity-script new` prints.

| Template | Languages | What the simulator runs |
|----------|-----------|-------------------------|
| `runnable` | Python, Lua, and C# | The script file. A scheduled script uses this mode. |
| `tag-change` | Python, Lua, and C# | `on_tag_change` with the sample in `sim.yaml`. The example stores the value and prints nothing. |
| `receiver` | Python, Lua, and C# | `receive` with one CAN packet. |
| `service` | Python, Lua, and C# | `on_start`, then `run`, then `on_stop`. |
| `firmware-load` | Python | A runnable script that sends a CAN packet and waits for the reply under `onSend`. |
| `rule-context` | Python | `on_alert` with the rule ID in `sim.yaml`. |
| `prompt` | Python | A runnable script whose confirm prompt is answered from `sim.yaml`. |

In `runnable` mode, Python scripts and Lua scripts run from the top, and C# scripts call `Run`.
If `on_start` returns false, the simulator stops and does not call `run` or `on_stop`.
If `run` returns false, the cycle loop stops and `on_stop` still runs.
`serviceCycles` in `sim.yaml` is how many times `run` is called, and the default is 1.
The simulator does not call `on_pause` or `on_continue`.
The function or method for each mode is the one Profinity calls.
Refer to [Script types](../Scripting/Script_Types/index.md).

## The scenario file (`sim.yaml`)

`sim.yaml` sits next to the script.
`profinity-script sim` reads it and runs the script.

The runnable example is this file:

```yaml
version: "2.3"
script: script.py
mode: runnable
componentName: sim
```

A script that waits for a CAN reply names that reply under `onSend`.
`matchId` is the CAN ID the script sends, and `replyId` is the CAN ID it receives.
Both are decimal numbers: 256 is CAN ID 0x100.
The reply packet carries `replyId` and no data bytes.
A wait uses the timeout the script passes, and a reply that is not listed does not arrive.
For sending and receiving, refer to [CAN bus](../Scripting/Script_Operations/CANBus.md).

```yaml
version: "2.3"
script: script.py
mode: runnable
componentName: sim
onSend:
  - matchId: 256
    replyId: 257
```

| Key | Default | Meaning |
|-----|---------|---------|
| `version` | | Write `"2.3"`. |
| `script` | | The script file name in this folder. |
| `mode` | `runnable` | `runnable`, `tagChange`, `receiver`, `service`, or `alert`. |
| `componentName` | `sim` | The name of the simulated component. A script that looks up its component by name uses this value. |
| `tagId` | `tag` | The tag ID passed to a tag-change script, and the trigger tag on an alert, when the file omits the key. |
| `tagValue` | | The sample value, in quotes, such as `"12.5"`. |
| `steps` | | A list of tag-change samples. Each item sets `tagId`, `tagValue`, or both. |
| `canId` | `0` | The CAN ID of the packet passed to a receiver script, as a decimal number. The packet has no data bytes. |
| `serviceCycles` | `1` | How many times `run` is called after `on_start` returns true. |
| `promptConfirm` | | `true` or `false`. This answers the first confirm prompt. With no value, a confirm prompt returns false. |
| `promptInput` | | Text that answers the first input prompt. With no value, the prompt returns the default the script passed. |
| `ruleId` | `rule` | The rule ID and the rule name passed to an alert script. The level is `warning` and the transition is `raised`. |
| `componentFields` | | Field identifiers that `ComponentSettings` can read and write. |
| `firmwareFields` | | Field identifiers that `FirmwareSettings` can read and write. |
| `onSend` | | Replies to packets the script sends. Each item has `matchId` and `replyId`. |

When `steps` is present, the simulator delivers the list and does not also deliver the single `tagId` and `tagValue` pair.
A step that omits one of the two uses the value at the top of the file.
The `mode` key also accepts `tag-change` for `tagChange`, and `rule` or `rule-context` for `alert`.
A tag-change sample has quality `Good`, and its timestamp is the time of the run.
Any other file in the folder is copied next to the script, so the script can load a sibling file.
`sim.yaml` itself is not copied.

List every field identifier the script reads or writes under `componentFields` or `firmwareFields`.
Without that entry, `SetValue` reports an unknown field.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).

## Limits of the simulator

The simulator covers the `Profinity` object the script calls, and the call Profinity makes into the script.
It has no CAN database (DBC) and no tag history.
A DBC call fails with `DBC lookup is not loaded in the Profinity script simulator.`
A tag-history call fails with `Timeseries sources are not available in the Profinity script simulator.`
`Profinity.Action` is not set.
A script that reads an action context is checked in a profile.
Refer to [Action context](../Scripting/Script_Operations/Action.md).
Live hardware stays in Profinity.

## Errors

A failed command prints one message on the error stream and exits with code 1.
A C# script that does not compile prints the compiler messages there.

| Message | What to change |
|---------|----------------|
| `No sim.yaml in` followed by a path | Run `sim` from the folder `new` created, or pass that folder. |
| `No python example for firmware-load`, or the same sentence with another language and template | That template does not ship in that language. `firmware-load`, `rule-context`, and `prompt` are Python only. |
| `Unknown sim mode` followed by the mode | Set `mode` to `runnable`, `tagChange`, `receiver`, `service`, or `alert`. |
| `Tag-change script must define an on_tag_change(tagId, sample) function` | Define the function that mode calls. Receiver, alert, and service scripts give the same message for `receive`, `on_alert`, and `on_start`. |
| `C# script has no public` followed by an interface name | Add a public class with a constructor that takes no arguments, implementing the interface for that mode. Refer to [Script types](../Scripting/Script_Types/index.md). |

To copy a tested script into a profile, refer to [Test a script outside Profinity](./Test_a_Script.md#copy-the-script-into-a-profile).
