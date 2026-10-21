---
title: Supported operations
description: "Look up what a script can do through the Profinity object: CAN bus, DBC, state, tags, console output, component settings and the firmware action context."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Supported operations

The following operations are available to every script, regardless of the language used, through the `Profinity` object.

- CAN bus communication: scripts can send CAN packets and read the latest received packets.
  Refer to [CAN Bus](./CANBus.md) for examples and usage.
- CAN database (DBC) message and signal information: scripts can read signal values from the loaded DBC files by component, message, and signal name, with the raw CAN data converted to physical values.
  Refer to [DBC](./DBC.md) for examples and usage.
- State management: Profinity provides two state stores. `State` keeps data for a single script between its runs, and `GlobalState` shares data across multiple scripts.
  Refer to [State](./State.md) for examples and usage.
- Tags: scripts can read tag values, publish values to tags, and attach metadata to the tags they publish.
  Refer to [Tags](./Tags.md) for examples and usage.
- Console output: scripts in all three languages can write information and error messages to the Profinity log.
  Refer to [Console](./Console.md) for examples and usage.

A script started by a firmware action also receives an action context: the action name, any uploaded file, the invoker, and progress reporting.
Refer to [Action context](./Action.md).

## Component and firmware settings

A script on a [Custom Component](../../Custom_Components/index.md) reads `settings_map.yaml` with `Profinity.ComponentSettings` and `firmware_map.yaml` with `Profinity.FirmwareSettings`.
`firmware.yaml` names the scripts that load and save those firmware values.
Refer to [Component and firmware settings](./Settings.md) for the methods, which script reads or writes each value, and an example.

## Where to go next

Each operation has its own page.
The [Profinity SDK](../../SDK/index.md) page describes how to write and test a script offline, and Profinity offers a starting template for each script type when you create a script.
The [Profinity repository on GitHub](https://github.com/Prohelion/Profinity/tree/master/Example%20Scripts) also holds further C# and Python examples.
The language references are on [Supported Languages](../Supported_Languages/index.md).
