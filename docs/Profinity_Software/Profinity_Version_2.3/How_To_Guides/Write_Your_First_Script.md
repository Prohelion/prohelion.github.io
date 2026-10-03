---
title: How to Write Your First Script
description: "Write your first Profinity script in C# or Python to automate tasks and interact with CAN bus components."
---

# How to Write Your First Script

Create your first Profinity script to automate tasks and interact with your CAN bus system.

## Prerequisites

- Profinity V2 installed and running
- An active profile with components configured
- Basic understanding of **C#** or **Python** (Profinity scripting uses [IronPython](https://ironpython.net/) for Python, and also supports Lua; see [Supported Languages](../Extending_Profinity/Scripting/Supported_Languages/index.md))
- Scripting enabled in Profinity configuration

## Steps

### Step 1: Enable Scripting

1. Navigate to **ADMIN** → **System Configuration** (see [System Configuration](../Administration/System_Config.md) for detail)
2. Find the **Optional Capabilities** section
3. Enable **Enable Scripting**
4. Click **Save**

For security context and behaviour, read [Profinity Scripting](../Extending_Profinity/Scripting/index.md) first.

### Step 2: Choose Your Script Type

For your first script, use a **Run script** (see [Run Scripts](../Extending_Profinity/Scripting/Script_Types/RunScripts.md)). The script type is set by the **Script Mode** of the script component, and the main types are:

- **Run scripts** - run on demand or on a schedule (time interval or cron)
- **Receive scripts** - run when selected CAN messages are received
- **Service scripts** - long-running background services with lifecycle control

Tag Change and Alert modes also exist; see [Script Types](../Extending_Profinity/Scripting/Script_Types/index.md).

### Step 3: Add a Script Component and Open the Script Editor

A script is a component in your profile, and the language is set by which script component you add.

1. Click **ADD COMPONENT** (see [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md))
2. Select the **C#** or **Python** Script component
3. The script component settings and the script editor open, where the script is written (Step 4) and its **Script Mode** is set (Step 5)

### Step 4: Write Your First Script

Use the same patterns as in [Run Scripts](../Extending_Profinity/Scripting/Script_Types/RunScripts.md): C# implements `IProfinityRunnableScript` with a `Run()` method; Python defines functions and calls them from the top level (no `import profinity` — the **`Profinity`** host object is provided).

#### C#

```csharp
using System;
using Profinity.Scripting;

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

### Step 5: Configure Script Settings

1. Set the component name
2. Add a description (optional)
3. Choose how the run script executes with **Script Mode** (see [Run Scripts](../Extending_Profinity/Scripting/Script_Types/RunScripts.md)):
   - **Run On Demand** - run manually from the UI
   - **Run On Time Interval** - run automatically at a fixed interval (for example every few minutes)
   - **Run On CRON Schedule** - run on a [Quartz](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) cron expression
4. (Optional) Enable **Auto Start Script** to start the script automatically when Profinity starts

### Step 6: Test Your Script

1. Run the script from the script component, using the **Run** or **Test** control (the label depends on your Profinity version)
2. Check script console output and the Profinity log for results
3. Review error messages, fix issues, and test again

### Step 7: Save and Deploy

1. Click **Save** to save your script
2. The script component appears in your profile
3. Run it on demand or according to the schedule you configured

## Next Steps: More Advanced Scripts

Use names from your DBC and profile (**Component**, **Message**, and **Signal** are case-sensitive). Confirm them in the DBC viewer in Profinity (see [DBC](../Extending_Profinity/Scripting/Script_Operations/DBC.md)).

### Reading a DBC signal value

=== "C#"

    ```csharp
    using System;

    try
    {
        var signal = Profinity.DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed");
        if (signal != null)
        {
            double currentValue = signal.Value;
            string ts = DateTime.Now.ToString("HH:mm:ss");
            Profinity.Console.WriteLine($"{ts} — Engine speed: {currentValue} {signal.Unit}");
        }
    }
    catch (Exception ex)
    {
        Profinity.Console.WriteLine("DBC read failed: " + ex.Message);
    }
    ```

=== "Python"

    ```python
    import sys
    from datetime import datetime

    try:
        signal = Profinity.DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed")
        if signal:
            current_value = signal.Value
            ts = datetime.now().strftime("%H:%M:%S")
            print(f"{ts} — Engine speed: {current_value} {signal.Unit}")
    except Exception as ex:
        print(f"DBC read failed: {ex}", file=sys.stderr)
    ```

### Sending a CAN message

You can build payload data from a **byte array** or set **typed properties** on **`CanPacket`** (for example **`Int32Pos0`**, **`Int32Pos1`**) when the layout matches your frames.

=== "C#"

    ```csharp
    using Profinity.Comms.CANBus;

    // Method 1: Byte array
    var packetBytes = new CanPacket(0x123, new byte[] { 0x01, 0x02, 0x03, 0x04 });
    Profinity.CANBus.SendMessage(packetBytes);

    // Method 2: Property-based (common when filling structured data)
    var packetProps = new CanPacket(0x100)
    {
        Int32Pos0 = 100,
        Int32Pos1 = 200
    };
    Profinity.CANBus.SendMessage(packetProps);
    ```

=== "Python"

    ```python
    from Profinity.Comms.CANBus import CanPacket

    # Method 1: Byte array
    packet_bytes = CanPacket(0x123, [0x01, 0x02, 0x03, 0x04])
    Profinity.CANBus.SendMessage(packet_bytes)

    # Method 2: Property-based (common when filling structured data)
    packet_props = CanPacket(0x100)
    packet_props.Int32Pos0 = 100
    packet_props.Int32Pos1 = 200
    Profinity.CANBus.SendMessage(packet_props)
    ```

### Script state (persist between runs)

=== "C#"

    ```csharp
    object runCountObj = Profinity.State.Get("runCount");
    int runCount = runCountObj != null ? (int)runCountObj : 0;
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

## Tips

- **Start simple**: use a minimal run script that only logs output before adding DBC or CAN logic
- **Timestamps**: prefix log lines with `DateTime.Now` (C#) or `datetime.now()` (Python) when correlating script output with bus or application events
- **Logging**: in C# use `Profinity.Console.WriteLine`; in Python use `print()` (see [Console](../Extending_Profinity/Scripting/Script_Operations/Console.md))
- **Test incrementally**: add one API (DBC, CAN bus, or state) at a time
- **Follow the scripting docs**: examples for each script type and operation live under [Scripting](../Extending_Profinity/Scripting/index.md)

## Troubleshooting

- **Script not running**: confirm scripting is enabled in System Configuration and the script component language matches the source
- **No DBC data / null signal**: check component, message, and signal names against the DBC viewer; names are case-sensitive
- **Syntax errors**: fix compile errors (C#) or IronPython/Python 3 syntax (Python) before running
- **Unexpected behaviour**: remember scripts run inside Profinity with the same OS permissions as the application (see [Scripting overview](../Extending_Profinity/Scripting/index.md))

## Related Documentation

- [Scripting Overview](../Extending_Profinity/Scripting/index.md) - security, enabling scripting, and next steps
- [Supported Languages](../Extending_Profinity/Scripting/Supported_Languages/index.md) - C#, Python and Lua
- [Script Types](../Extending_Profinity/Scripting/Script_Types/index.md) - run, receive, service, interval, cron, tag change and alert modes
- [Script Operations](../Extending_Profinity/Scripting/Script_Operations/index.md) - CAN bus, DBC, state, and console
