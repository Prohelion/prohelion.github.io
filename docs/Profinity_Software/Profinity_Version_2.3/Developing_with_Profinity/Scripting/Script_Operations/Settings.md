---
title: Component and firmware settings
description: "Read and write a Custom Component's settings and firmware values from a script, using the field identifiers in its map files."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Component and firmware settings

A script on a [Custom Component](../../Custom_Components/index.md) reads and writes two sets of saved values.
`Profinity.ComponentSettings` uses the field identifiers in `settings_map.yaml`.
`Profinity.FirmwareSettings` uses the field identifiers in `firmware_map.yaml`.
`firmware.yaml` names the scripts that load and save firmware.

The layout of `settings_map.yaml` is on [Settings](../../Custom_Components/Settings.md).
The layout of `firmware_map.yaml` is on [Firmware maps](../../Custom_Components/Firmware_Maps.md).
`firmware.yaml` is on [Firmware actions](../../Custom_Components/Firmware_Actions.md).
A firmware action script also receives [Action context](./Action.md).

## Which script reads which values

Each Custom Component script uses one or both objects.

| Script | Values |
|--------|--------|
| Main script | `ComponentSettings` |
| `toggle` in `actions.yaml` | `ComponentSettings` |
| `button` in `actions.yaml` | `ComponentSettings` |
| `loadScript` in `firmware.yaml` | Reads `ComponentSettings`, writes `FirmwareSettings` |
| `saveScript` in `firmware.yaml` | Reads `FirmwareSettings` and `ComponentSettings` |
| An entry under `actions` in `firmware.yaml` | Either object, and `Profinity.Action` is set |

When each script runs is on [Script types](../Script_Types/index.md#custom-component-scripts).

A load script opens the device with the values in `ComponentSettings`, such as a COM port and a baud rate, then calls `FirmwareSettings.SetValue` once for each field it read from the device.
Those values are what the firmware page shows after a successful load.
A save script reads the same fields with `FirmwareSettings.GetValue` and sends them to the device.
`Profinity.Action` is set only for an entry under `actions`.

A load or save script reports success the same way as a Run script.
In C#, `Run()` returns true or false.
In Python and Lua the file runs from the top, and the script reports failure by raising an error.
Refer to [Run scripts](../Script_Types/Run_Scripts.md).

## Methods

`ComponentSettings` and `FirmwareSettings` have the same methods.
Pass the field identifier from the map, such as `comPort` or `nmeaGgaRate`.
`GetValue` also accepts the prefixed form returned in metadata, such as `SETTINGS.comPort`.
C#, Python and Lua call the methods with a dot.

| Method | What it returns |
|--------|-----------------|
| `GetValue(fieldId)` | The saved value, or null in C#, `None` in Python and `nil` in Lua when the field is missing or empty |
| `TryGetValue(fieldId, out value)` | Whether the field exists. In C# the value is an `out` argument |
| `SetValue(fieldId, value)` | Nothing. Saves the value, or fails with one of the messages below |
| `TrySetValue(fieldId, value, out errorMessage)` | Whether the save succeeded. The error message is an `out` argument in C# |
| `GetMetadata(fieldId)` | A dictionary of the field definition, or an empty dictionary when the field identifier is unknown |
| `GetAllMetadata()` | A dictionary of every field, keyed by field identifier, or an empty dictionary when the component has no map |
| `GetMapDefinition()` | The map's field definitions, or null when the component has no map |

`GetMetadata` is the dictionary a script reads by key.
`GetMapDefinition` returns the same definitions as objects.

| Entry | Meaning |
|-------|---------|
| `id` | Field identifier, including a `SETTINGS.` or `FIRMWARE.` prefix |
| `label` | Name shown on the settings or firmware page |
| `description` | Help text from the map, or null |
| `type` | Resolved type: `StringValue`, `NumberValue`, `BooleanValue`, `HexValue`, `ListValues`, `IPAddressValue`, `PasswordValue`, `EmailValue` or `InformationValue` |
| `readOnly` | Whether the operator can edit the field |
| `required` | Whether the field must have a value |

A `STRING` field in the map is `StringValue`, a `BOOL` field is `BooleanValue`, a `LIST` field is `ListValues`, and a numeric field such as `UINT8` or `UINT32` is `NumberValue`.

## Saved values

`GetValue` returns the value last saved for that field.
For a `LIST` field, that value is the text shown for the row the operator chose.
Refer to [Settings](../../Custom_Components/Settings.md).
Convert a numeric field before using it as an integer: in Python, `int(str(value))` accepts both a number and text.
`SetValue` stores the value the script passes.

`ComponentSettings` also reads the component's own settings by property name.
`DBCFilename` is the uploaded DBC file, and `RebaseAddress` is the rebase address.
Setting `RebaseAddress` to a value that is not a number fails.

| Failure | Message |
|---------|---------|
| Unknown field on `ComponentSettings` | `Unknown component settings field id.` |
| Unknown field on `FirmwareSettings` | `Unknown firmware field id.` |
| `FirmwareSettings` when the component has no firmware map | `Firmware settings are not available on this component.` |
| Either object when the script has no host component | `This script has no host component - ComponentSettings is only available to a component-scoped script.` The firmware message uses `FirmwareSettings` in that sentence |

`profinity-script sim` runs the script on a simulated component.
List the field identifiers under `componentFields` and `firmwareFields` in `sim.yaml` so `SetValue` can save them, and `GetValue` returns a value only after one has been saved.
The rest of that file is on [Test a script outside Profinity](../../SDK/Test_a_Script.md).
Without those entries, `SetValue` reports an unknown field.

## Example

The example is a firmware load script.
`comPort` is a field in `settings_map.yaml`, and `nmeaGgaRate` is a field in `firmware_map.yaml`, both from the G-STAR IV sample.
A script uses the field identifiers from its own map files.
A save script reads `nmeaGgaRate` with `GetValue` instead of writing it.

=== "C#"

    ```csharp
    using System;

    public class LoadFirmwareExample : ProfinityScript, IProfinityRunnableScript
    {
        public bool Run()
        {
            object port = Profinity.ComponentSettings.GetValue("comPort");
            if (port == null)
            {
                Profinity.Console.WriteLine("COM port is not set");
                return false;
            }

            Profinity.FirmwareSettings.SetValue("nmeaGgaRate", 1);
            Profinity.Console.WriteLine("Firmware load wrote nmeaGgaRate");
            return true;
        }
    }
    ```

=== "Python"

    ```python
    port = Profinity.ComponentSettings.GetValue("comPort")
    if port is None:
        print("COM port is not set")
        raise SystemExit(1)

    Profinity.FirmwareSettings.SetValue("nmeaGgaRate", 1)
    print("Firmware load wrote nmeaGgaRate")
    ```

=== "Lua"

    ```lua
    local port = Profinity.ComponentSettings.GetValue("comPort")
    if port == nil then
        print("COM port is not set")
        error("COM port is not set")
    end

    Profinity.FirmwareSettings.SetValue("nmeaGgaRate", 1)
    print("Firmware load wrote nmeaGgaRate")
    ```

The settings map layout is on [Settings](../../Custom_Components/Settings.md), the firmware map layout is on [Firmware maps](../../Custom_Components/Firmware_Maps.md), and `firmware.yaml` is on [Firmware actions](../../Custom_Components/Firmware_Actions.md).
How to choose a script shape is on [Script types](../Script_Types/index.md).
