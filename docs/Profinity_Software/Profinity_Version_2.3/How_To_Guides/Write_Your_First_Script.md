---
title: How to Write Your First Script
description: "Write your first Profinity script in C# or Python to automate tasks and interact with CAN bus components."
---

# How to Write Your First Script

Create your first Profinity script to automate tasks and interact with your CAN bus system. The guide adds a script component, writes a run script that prints a message, runs it and finds the output, and then shows three more advanced examples.

## Prerequisites

- Profinity 2.3 installed and running
- A **Desktop**, **Server**, or **Enterprise** licence. An unlicensed instance cannot add or run scripts. See [Licensing](../Administration/Licensing.md)
- An active [profile](../Getting_Started/Profiles.md) with components configured
- Basic understanding of **C#** or **Python** (Profinity scripting uses [IronPython](https://ironpython.net/) for Python, which limits the Python syntax available, and also supports Lua; see [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md))
- [Scripting](../Developing_with_Profinity/Scripting/index.md) enabled in Profinity configuration, as in the first step below

!!! warning "Scripts Run With Application Permissions"
    A script runs inside Profinity with the same operating system permissions as the application, so review any script before running it. See the [Scripting overview](../Developing_with_Profinity/Scripting/index.md) for the security context and behaviour.

## Steps

### Enable Scripting

1. Select **ADMIN** in the side menu and open the **System Configuration** pill (see [System Configuration](../Administration/System_Configuration/index.md) for detail)
2. Find the **Optional Capabilities** section
3. Enable **Enable Scripting**
4. Click **Save**

### Add a Script Component and Set Its Mode

A script is a component in your profile, and the language is set by which script component you add. For a first script use a run script, whose type is set by the **Script Mode** of the script component. The main types are [Run scripts](../Developing_with_Profinity/Scripting/Script_Types/RunScripts.md), which run on demand or on a schedule (time interval or cron), [Receive scripts](../Developing_with_Profinity/Scripting/Script_Types/ReceiveScripts.md), which run when selected CAN messages are received, and [Service scripts](../Developing_with_Profinity/Scripting/Script_Types/ServiceScripts.md), which are long-running background services with lifecycle control. Tag Change and Alert modes also exist, and [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md) describes them.

1. Click **ADD COMPONENT** (see [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md))
2. Select the **CSharp Script**, **Python Script** or **Lua Script** component, which opens the script component settings and the script editor together
3. Set the component name, and add a description if wanted
4. Set **Script Mode** to **Run On Demand**, which runs the script manually from the UI. **Run On Time Interval** runs it at a fixed interval, for example every few minutes, and **Run On CRON Schedule** runs it on a [Quartz](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) cron expression
5. Optionally enable **Auto Start Script** to start the script automatically when Profinity starts, and enable **Log Script Output**, which is off by default, so that the script's output appears in the Profinity log

### Write the Script

Use the same patterns as in [Run Scripts](../Developing_with_Profinity/Scripting/Script_Types/RunScripts.md): C# implements `IProfinityRunnableScript` with a `Run()` method, and Python defines functions and calls them from the top level, with no `import profinity` because the `Profinity` host object is provided. In C#, use `Profinity.Console.WriteLine` for output, and in Python use `print()` (see [Console](../Developing_with_Profinity/Scripting/Script_Operations/Console.md)).

#### C#

```csharp
using System;

public class MyFirstRunScript : ProfinityScript, IProfinityRunnableScript
{
    public bool Run()
    {
        Profinity.Console.WriteLine("This is my first Profinity script.");
        Profinity.Console.WriteLine(Profinity.Message);
        return true;
    }
}
```

#### Python

```python
def main():
    print("This is my first Profinity script.")
    print(Profinity.Message)


main()
```

### Run the Script

Click **Save** to save the script and the component settings, which are saved together. The script component appears in your profile. Run the script from the script component's menu by selecting **Run Script** (available when **Script Mode** is **Run On Demand**), and use **Cancel Script** to stop a script that is still running.

With **Log Script Output** enabled, the output appears in the Profinity log (select **ADMIN**, then **Logs**) at the `Info` level as `Script <script file name>: This is my first Profinity script.`, followed by a line for `Profinity.Message`. Compile errors and script errors are always written to the log, whether or not **Log Script Output** is on, so review the error message, fix the script, and run it again. A script with a time interval or cron schedule runs according to the schedule that was set.

## More Advanced Examples

The following examples use the Example Profile, so load it and replay `example_log.csv` as described in the [Quick Start Guide](../Getting_Started/Quick_Start.md) to give them data. Use names from your own DBC and profile in other profiles: **Component**, **Message** and **Signal** are case-sensitive, and a name that does not exist raises an error. Confirm the names in the DBC viewer in Profinity (see [DBC](../Developing_with_Profinity/Scripting/Script_Operations/DBC.md)).

### Reading a DBC Signal Value

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

### Sending a CAN Message

Payload data can be built from a byte array (in C#) or set as typed properties on `CanBusPacket` (for example `Int32Pos0` and `Int32Pos1`) when the layout matches your frames. The `CanBusPacket` type is available to C# scripts without an extra `using` statement, and Python scripts import it from `Profinity.Sdk.Models.CANBus`. A sent message goes onto the connected CAN bus, so use IDs that are safe for the devices on that bus.

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

### Persisting Script State

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

The Python and C# examples above are shown in tabs, and each tab holds the same example in the other language.

## Troubleshooting

### The Script Does Not Run

A script that does not run usually has scripting disabled or a component language that does not match the source. Confirm that scripting is enabled in System Configuration and that the script component's language matches the language of the source.

### The DBC Signal Is Null or Missing

A signal that returns nothing or raises an error has a component, message or signal name that does not match the DBC, because the names are case-sensitive. Check the names against the DBC viewer.

### A Syntax Error Appears

Fix compile errors (C#) or IronPython and Python 3 syntax errors (Python) before running, and add one API (DBC, CAN bus or state) at a time so that a fault is easy to find.

## Related Documentation

- [Scripting Overview](../Developing_with_Profinity/Scripting/index.md) - security, enabling scripting, and next steps
- [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md) - C#, Python and Lua
- [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md) - run, receive, service, interval, cron, tag change and alert modes
- [Script Operations](../Developing_with_Profinity/Scripting/Script_Operations/index.md) - CAN bus, DBC, state, and console
