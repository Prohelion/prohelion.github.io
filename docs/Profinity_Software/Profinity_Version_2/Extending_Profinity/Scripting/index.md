---
title: Profinity Scripting
---

# Profinity Scripting

Welcome to the Profinity Scripting documentation. This section provides comprehensive information about scripting in Profinity, including supported languages, script types, and available operations.

If you're new to Profinity scripting, here are a few things to know before you get started.

## Important Read This First

!!! warning "Profinity Scripts Execute With the Same Security Permissions as Profinity Itself"
    Because Profinity Scripting runs inside the Profinity engine, any script will execute at the same level of Operating System security permissions as Profinity itself.  Because of this it is important to make sure that you understand what scripts are running on your system and what they do.

In order to ensure your Profinity environment remains secure, we require explicit enabling of the Scripting capabilities inside Profinity before they can be used.  

To enable Profinity Scripting, go to the [System Configuration](../../Administration/System_Config.md) and enable Scripting.

<figure markdown>
![Profinity System Configuration](../../images/app_configuration.png)
<figcaption>Profinity System configuration</figcaption>
</figure>

## Script Types

Profinity supports three types of scripts, each designed for specific use cases:

- [Run Scripts](./Script_Types/RunScripts.md): For manual or scheduled operations
- [Receive Scripts](./Script_Types/ReceiveScripts.md): For handling incoming CAN messages
- [Service Scripts](./Script_Types/ServiceScripts.md): For continuous, long-running operations

Learn more about script types in our [Script Types](./Script_Types/index.md) documentation.

## Supported Languages

Profinity scripting supports two programming languages. You can code in either of these supported languages:

- C#: For complex, type-safe operations
- Python: For data processing and analysis

Each language has its strengths and ideal use cases. See the [Supported Languages](./Supported_Languages/index.md) documentation for detailed comparisons.

## Operations

Profinity provides various out of the box operations to support your script development:

- [CANBus](./Script_Operations/CANBus.md): For CAN communication
- [DBC](./Script_Operations/DBC.md): For DBC Message and Signal handling
- [State](./Script_Operations/State.md): For data persistence
- [Console](./Script_Operations/Console.md): For output and logging

You can find out more about each in our [Operations](./Script_Operations/index.md) documentation.

## Next Steps

1. Review the [Supported Languages](./Supported_Languages/index.md) guide to help select the right language for you
2. Learn about [Script Types](./Script_Types/index.md) to determine what script style might be most suitable
3. Explore the available [Operations](./Script_Operations/index.md) and things you can do with Scripts
4. Try creating your first script 