---
title: Supported operations
description: "Look up what a script can do through the Profinity object: CAN bus, DBC, state, tags, console output and component settings."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Supported operations

The following operations are available to every script, regardless of the language used, through the `Profinity` object.

- CAN bus communication: scripts can send CAN packets and read the latest received packets. Refer to [CAN Bus](./CANBus.md) for examples and usage.
- DBC message and signal information: scripts can read signal values from the loaded DBC files by component, message, and signal name, with the raw CAN data converted to physical values. Refer to [DBC](./DBC.md) for examples and usage.
- State management: Profinity provides two state stores. `State` keeps data for a single script between its runs, and `GlobalState` shares data across multiple scripts. Refer to [State](./State.md) for examples and usage.
- Tags: scripts can read tag values, publish values to tags, and attach metadata to the tags they publish. Refer to [Tags](./Tags.md) for examples and usage.
- Console output: scripts in all three languages can write information and error messages to the Profinity log. Refer to [Console](./Console.md) for examples and usage.

## Component and firmware settings

A script that belongs to a [Custom Component](../../Custom_Components/index.md) reads the component's saved settings through `Profinity.ComponentSettings`, and its firmware settings through `Profinity.FirmwareSettings`.
Both are keyed by the field identifiers defined in `settings_map.yaml` and `firmware_map.yaml`, so a serial port or baud rate entered on the component reaches the script without a code change.
Each object has these methods:

| Method | What it does |
|--------|--------------|
| `GetValue(fieldId)` | Returns the saved value of the field |
| `TryGetValue(fieldId, out value)` | Returns whether the field exists, and its value when it does |
| `SetValue(fieldId, value)` | Saves a new value for the field |
| `TrySetValue(fieldId, value, out errorMessage)` | Saves a new value and reports an error message instead of failing |
| `GetMetadata(fieldId)` | Returns the field's definition from the map file |
| `GetAllMetadata()` | Returns the definitions of every field |

The shipped G-STAR IV sample component reads its serial settings in Python in this way:

```python
port = Profinity.ComponentSettings.GetValue("comPort")
baud_value = Profinity.ComponentSettings.GetValue("baudRate")
```

A script that is not hosted by a component cannot use either object, and a script run from `profinity-script sim` has no host component, so these calls fail there with a message that names the missing host component.

## Where to go next

Each operation has its own page, listed above.
The [Profinity SDK](../../SDK.md) page describes how to write and test a script offline, and Profinity offers a starting template for each script type when you create a script.
The [Profinity repository on GitHub](https://github.com/Prohelion/Profinity/tree/master/Example%20Scripts) also holds further C# and Python examples.
The language references are on [Supported Languages](../Supported_Languages/index.md).
