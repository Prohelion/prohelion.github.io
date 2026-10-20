---
title: Test a script outside Profinity
description: "Create a script with profinity-script, run it on a simulated Profinity, and copy the file into a profile."
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# Test a script outside Profinity

`profinity-script` creates a script on a developer machine and runs it against a simulated Profinity, before the script file is copied into a profile.
The tool ships in the [Profinity SDK](index.md), in the kit's `profinity-script` folder, and not with the Profinity install.
On Windows the program is `profinity-script.exe`.
The same kit contains [`profinity-component-pack`](Component_Pack_CLI.md) and the `Profinity.Sdk` package.
The package on its own does not create or run a script.
The SDK is licensed separately. Refer to [Licensing](../../Licensing.md).
For a copy of the SDK, [contact Prohelion](https://www.prohelion.com/contact-us/).

The simulator does not start Profinity and does not need a CAN bus.
It calls the script the way Profinity does, and the script calls the same `Profinity` object.
Once the script is in a profile it needs the Scripting feature, which a Desktop, Server, or Enterprise licence includes.
Refer to [Scripting](../Scripting/index.md).

A C# project in a generated folder references `Profinity.Sdk`.
Add the kit folder that contains that package as a local NuGet source, so the editor can complete Profinity types.
`profinity-script sim` compiles and runs the script itself.
If a project still references `Profinity.Component.Sdk`, change that reference to `Profinity.Sdk`.

## Create a runnable script

Python and Lua need only `profinity-script`.
Run the following commands from the kit's `profinity-script` folder.
With no arguments, `profinity-script` runs `sim` in the current directory.

1. Create a runnable Python script.

    ```bash
    profinity-script new runnable --language python
    ```

    The command writes a folder named `runnable` and prints its path.
    `--language` accepts `python`, `lua`, or `csharp`, and it defaults to `python`.

2. Change into that folder.

    ```bash
    cd runnable
    ```

3. Run the simulator.

    ```bash
    profinity-script sim
    ```

    The command prints `ran` and exits with no error message.
    That line is what `script.py` writes with `Profinity.Console.WriteLine`.

    ```text
    ran
    ```

`profinity-script sim runnable`, run from the `profinity-script` folder, does the same thing without changing directory.
`profinity-script new` with no template name prints the template names and exits with no error message.

## Templates

`new` copies one example folder.
The folder contains `sim.yaml` and the script.
The table is in the order `profinity-script new` prints.

| Template | Languages | What the simulator runs |
|----------|-----------|-------------------------|
| `runnable` | Python, Lua, and C# | The script file. Python and Lua run it from the top, and C# calls `Run`. A scheduled script uses this mode. |
| `tag-change` | Python, Lua, and C# | `on_tag_change` with the sample in `sim.yaml`. The example stores the value and prints nothing. |
| `receiver` | Python, Lua, and C# | `receive` with one CAN packet. |
| `service` | Python, Lua, and C# | `on_start`, then `run`, then `on_stop`. |
| `firmware-load` | Python | A runnable script that sends a CAN packet and waits for the reply under `onSend`. |
| `rule-context` | Python | `on_alert` with the rule id in `sim.yaml`. |
| `prompt` | Python | A runnable script whose confirm prompt is answered from `sim.yaml`. |

If `on_start` returns false, the simulator stops and does not call `run` or `on_stop`.
If `run` returns false, the cycle loop stops and `on_stop` still runs.
`serviceCycles` in `sim.yaml` is how many times `run` is called, and the default is 1.
The simulator does not call `on_pause` or `on_continue`.
The function or method for each mode is the one Profinity calls. Refer to [Script types](../Scripting/Script_Types/index.md).

## The scenario file

`sim.yaml` sits next to the script.
`profinity-script sim` reads it, runs the script, and prints the lines the script writes to the console.
A script that only stores a tag or a setting prints nothing.
The run has still worked when the command exits with no error message.
Add `Profinity.Console.WriteLine` to see a stored value.
The command does not print tags, settings, notifications, or CAN frames on its own.

The runnable example is this file:

```yaml
version: "2.3"
script: script.py
mode: runnable
componentName: sim
```

A script that waits for a CAN reply names that reply under `onSend`.
`matchId` is the id the script sends, and `replyId` is the id it receives.
Both are decimal numbers: 256 is CAN id 0x100.
The reply packet carries `replyId` and no data bytes.
A wait uses the timeout the script passes, and a reply that is not listed does not arrive.
Sending and receiving are on [CAN bus](../Scripting/Script_Operations/CANBus.md).

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
| `mode` | `runnable` | `runnable`, `tagChange`, `receiver`, `service`, or `alert`. `tag-change` is accepted for `tagChange`. `rule` and `rule-context` are accepted for `alert`. |
| `componentName` | `sim` | The name of the simulated component. A script that looks up its component by name uses this value. |
| `tagId` | `tag` | The tag id passed to a tag-change script, and the trigger tag on an alert, when the file omits the key. |
| `tagValue` | | The sample value, in quotes, such as `"12.5"`. |
| `steps` | | A list of tag-change samples. Each item sets `tagId`, `tagValue`, or both. When the list is present, the simulator delivers the list and does not also deliver the single pair. A step that omits one of them uses the value at the top of the file. |
| `canId` | `0` | The CAN id of the packet passed to a receiver script, as a decimal number. The packet has no data bytes. |
| `serviceCycles` | `1` | How many times `run` is called after `on_start` returns true. |
| `promptConfirm` | | `true` or `false`. This answers the first confirm prompt. With no value, a confirm prompt returns false. |
| `promptInput` | | Text that answers the first input prompt. With no value, the prompt returns the default the script passed. |
| `ruleId` | `rule` | The rule id and the rule name passed to an alert script. The level is `warning` and the transition is `raised`. |
| `componentFields` | | Field identifiers that `ComponentSettings` can read and write. |
| `firmwareFields` | | Field identifiers that `FirmwareSettings` can read and write. |
| `onSend` | | Replies to packets the script sends. Each item has `matchId` and `replyId`. |

A tag-change sample has quality `Good`, and its timestamp is the time of the run.
Any other file in the folder is copied next to the script, so the script can load a sibling file.
`sim.yaml` itself is not copied.

List every field identifier the script reads or writes under `componentFields` or `firmwareFields`.
Without that entry, `SetValue` reports an unknown field.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).

## Limits of the simulator

The simulator covers the `Profinity` object the script calls, and the call Profinity makes into the script.
It has no DBC database and no tag history.
A DBC call fails with `DBC lookup is not loaded in the Profinity script simulator.`
A tag-history call fails with `Timeseries sources are not available in the Profinity script simulator.`
`Profinity.Action` is not set.
A script that reads an action context is checked in a profile. Refer to [Action context](../Scripting/Script_Operations/Action.md).
Live hardware stays in Profinity.

## Copy the script into a profile

When the console lines are right, copy the script file into the profile.
Leave `sim.yaml` on the developer machine.
Profinity runs the copied file.
A script component is added as described in [How to write your first script](../../How_To_Guides/Write_Your_First_Script.md).
A script that belongs to a [Custom Component](../Custom_Components/index.md) goes in that component, under the name the component already uses.
Review the script before it is enabled.
A script in a profile runs with the same operating system permissions as Profinity. Refer to [Scripting](../Scripting/index.md).

## When the command fails

A failure prints one message on the error stream and exits with code 1.
A C# script that does not compile prints the compiler messages there.

| Message | What to change |
|---------|----------------|
| `No sim.yaml in` followed by a path | Run `sim` from the folder `new` created, or pass that folder. |
| `No python example for firmware-load`, or the same sentence with another language and template | That template does not ship in that language. `firmware-load`, `rule-context`, and `prompt` are Python only. |
| `Unknown sim mode` followed by the mode | Set `mode` to `runnable`, `tagChange`, `receiver`, `service`, or `alert`. |
| `Tag-change script must define an on_tag_change(tagId, sample) function` | Define the function that mode calls. Receiver, alert, and service scripts use the same form of message for `receive`, `on_alert`, and `on_start`. |
| `C# script has no public` followed by an interface name | Add a public class with a constructor that takes no arguments, implementing the interface for that mode. Refer to [Script types](../Scripting/Script_Types/index.md). |
