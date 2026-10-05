---
title: Supported Operations
description: "Available script operations including CAN bus, DBC, state management, and console output."
---

# Supported Operations

The following operations are available to every script, regardless of the language used.

## CAN bus Communication

Scripts can send CAN packets and read the latest received packets. See the [CAN bus](./CANBus.md) documentation for examples and usage.

## DBC Message and Signal Information

Scripts can read signal values from the loaded DBC files by component, message and signal name, with the raw CAN data converted to physical values. See the [DBC](./DBC.md) documentation for examples and usage.

## State Management

Profinity provides two state stores for keeping and sharing data:

- **Local State (State):** Use `State` for data persistence within a single script.
- **Global State (GlobalState):** Use `GlobalState` to share data across multiple scripts.

See the [State](./State.md) documentation for examples and usage.

## Tags

Scripts can read tag values, publish values to tags, and attach metadata to the tags they publish. See the [Tags](./Tags.md) documentation for examples and usage.

## Console Output

Scripts in all three languages can write information and error messages to the Profinity log. See the [Console](./Console.md) documentation for examples and usage.

## Next Steps

1. Explore the detailed documentation for each feature:
   - [Console](./Console.md)
   - [State](./State.md)
   - [Tags](./Tags.md)
   - [CAN bus](./CANBus.md)
   - [DBC](./DBC.md)
2. Review the language-specific documentation:
   - [C# Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/)
   - [IronPython Documentation](https://ironpython.net/documentation/)
   - [NLua Documentation](https://github.com/NLua/NLua)
3. Experiment by creating simple scripts that integrate multiple features.
4. Review the example scripts in the `example_scripts` folder of the Profinity directory.