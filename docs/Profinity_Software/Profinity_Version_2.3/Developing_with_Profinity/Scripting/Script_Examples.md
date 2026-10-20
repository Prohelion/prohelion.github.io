---
title: Script examples
description: "Worked C# and Python examples that read a DBC signal, send a CAN message, and keep a run count in script state, using the Example Profile."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Script examples

This page holds worked script examples that read a DBC signal, send a CAN message and persist script state.
To add a script component and run a first script, refer to [How to write your first script](../../How_To_Guides/Write_Your_First_Script.md).
Scripting needs a **Desktop**, **Server**, or **Enterprise** licence. Refer to [Licensing](../../Licensing.md).

!!! warning "Scripts run with application permissions"
    A script runs inside Profinity with the same operating system permissions as the application, so review any script before running it.
    Refer to the [Scripting overview](index.md) for the security context and behaviour.

The following examples use the Example Profile, so load it and replay `example_log.csv` as described in the [Quick Start Guide](../../Getting_Started/Quick_Start.md) to give them data.
Use names from your own DBC and profile in other profiles: **Component**, **Message** and **Signal** are case-sensitive, and a name that does not exist raises an error.
Confirm the names in the DBC viewer in Profinity. Refer to [DBC](Script_Operations/DBC.md).

## Reading a DBC signal value

=== "C#"

    ```csharp
    using System;

    try
    {
        var signal = Profinity.DBC.GetDbcSignal("Prohelion BMU", "PackStateOfCharge", "SOCPercent");
        double currentValue = signal.Value;
        string ts = DateTime.Now.ToString("HH:mm:ss");
        if (double.IsNaN(currentValue))
        {
            Profinity.Console.WriteLine($"{ts} - No valid value for SOCPercent yet");
        }
        else
        {
            Profinity.Console.WriteLine($"{ts} - State of charge: {currentValue} {signal.Unit}");
        }
    }
    catch (Exception ex)
    {
        Profinity.Console.WriteLine("DBC read failed: " + ex.Message);
    }
    ```

=== "Python"

    ```python
    import math
    import sys
    from datetime import datetime

    try:
        signal = Profinity.DBC.GetDbcSignal("Prohelion BMU", "PackStateOfCharge", "SOCPercent")
        current_value = signal.Value
        ts = datetime.now().strftime("%H:%M:%S")
        if math.isnan(current_value):
            print(f"{ts} - No valid value for SOCPercent yet")
        else:
            print(f"{ts} - State of charge: {current_value} {signal.Unit}")
    except Exception as ex:
        print(f"DBC read failed: {ex}", file=sys.stderr)
    ```

Prefixing log lines with a timestamp, from `DateTime.Now` in C# or `datetime.now()` in Python, helps when correlating script output with bus or application events.

## Sending a CAN message

Payload data can be built from a byte array (in C#) or set as typed properties on `CanBusPacket` (for example `Int32Pos0` and `Int32Pos1`) when the layout matches your frames.
The `CanBusPacket` type is available to C# scripts without an extra `using` statement, and Python scripts import it from `Profinity.Sdk.Models.CANBus`.
A sent message goes onto the connected CAN bus, so use IDs that are safe for the devices on that bus.

=== "C#"

    ```csharp
    // Method 1: Byte array
    var packetBytes = new CanBusPacket(0x123, new byte[] { 0x01, 0x02, 0x03, 0x04 });
    Profinity.CAN.Send(packetBytes);

    // Method 2: Property-based (common when filling structured data)
    var packetProps = new CanBusPacket(0x100)
    {
        Int32Pos0 = 100,
        Int32Pos1 = 200
    };
    Profinity.CAN.Send(packetProps);
    ```

=== "Python"

    ```python
    from Profinity.Sdk.Models.CANBus import CanBusPacket

    # Property-based (common when filling structured data)
    packet_props = CanBusPacket(0x100)
    packet_props.Int32Pos0 = 100
    packet_props.Int32Pos1 = 200
    Profinity.CAN.Send(packet_props)
    ```

## Persisting script state

=== "C#"

    ```csharp
    int runCount = Profinity.State.Get("runCount") is int previousCount ? previousCount : 0;
    runCount++;
    Profinity.State.Set("runCount", runCount);
    Profinity.Console.WriteLine($"This script has completed {runCount} time(s).");
    ```

=== "Python"

    ```python
    run_count = Profinity.State.Get("runCount")
    run_count = (run_count + 1) if run_count is not None else 1
    Profinity.State.Set("runCount", run_count)
    print(f"This script has completed {run_count} time(s).")
    ```

For the full operations, refer to [Script Operations](Script_Operations/index.md): CAN bus, DBC, state, and console.
