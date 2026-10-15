---
title: How to write your first script
description: "Enable scripting, add a script component, and run a first C# or Python script, then find its output in the log."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-15
---

# How to write your first script

Create your first Profinity script to automate tasks and interact with your CAN bus system.
This guide adds a script component, writes a run script that prints a message, runs it and finds the output.

Before you start, you need:

- Profinity 2.3 installed and running.
- A **Desktop**, **Server**, or **Enterprise** licence. An unlicensed instance cannot add or run scripts. Refer to [Licensing](../Administration/Licensing.md).
- An active [profile](../Getting_Started/Profiles.md) with components configured.
- Basic understanding of C# or Python. Profinity scripting uses [IronPython](https://ironpython.net/) for Python, which limits the Python syntax available, and also supports Lua. Refer to [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md).
- [Scripting](../Developing_with_Profinity/Scripting/index.md) enabled in Profinity configuration, as in the first step below.

!!! warning "Scripts run with application permissions"
    A script runs inside Profinity with the same operating system permissions as the application, so review any script before running it.
    Refer to the [Scripting overview](../Developing_with_Profinity/Scripting/index.md) for the security context and behaviour.

## Enable scripting

1. Select **ADMIN** in the side menu and open the **System Configuration** pill. Refer to [System Configuration](../Administration/System_Configuration/index.md) for detail.
2. Find the **Optional Capabilities** section.
3. Enable **Enable Scripting**.
4. Select **Save**.

## Add a script component and set its mode

A script is a component in your profile, and the language is set by which script component you add.
For a first script use a run script, whose type is set by the **Script Mode** of the script component.
The main types are [Run scripts](../Developing_with_Profinity/Scripting/Script_Types/RunScripts.md), which run on demand or on a schedule (time interval or cron), [Receive scripts](../Developing_with_Profinity/Scripting/Script_Types/ReceiveScripts.md), which run when selected CAN messages are received, and [Service scripts](../Developing_with_Profinity/Scripting/Script_Types/ServiceScripts.md), which are long-running background services with lifecycle control.
Tag Change and Alert modes also exist, and [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md) describes them.

1. Select **ADD COMPONENT**. Refer to [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md).
2. Select the **CSharp Script**, **Python Script** or **Lua Script** component. This opens the script component settings and the script editor together.
3. Set the component name, and add a description if wanted.
4. Set **Script Mode** to **Run On Demand**, which runs the script manually from the UI. **Run On Time Interval** runs it at a fixed interval, for example every few minutes, and **Run On CRON Schedule** runs it on a [Quartz](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) cron expression.
5. Optional: enable **Auto Start Script** to start the script automatically when Profinity starts, and enable **Log Script Output**, which is off by default, so that the script's output appears in the Profinity log.

## Write the script

Use the same patterns as in [Run Scripts](../Developing_with_Profinity/Scripting/Script_Types/RunScripts.md).
C# implements `IProfinityRunnableScript` with a `Run()` method, and Python defines functions and calls them from the top level, with no `import profinity` because the `Profinity` host object is provided.
In C#, use `Profinity.Console.WriteLine` for output, and in Python use `print()`. Refer to [Console](../Developing_with_Profinity/Scripting/Script_Operations/Console.md).

### C#

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

### Python

```python
def main():
    print("This is my first Profinity script.")
    print(Profinity.Message)


main()
```

## Run the script

Select **Save** to save the script and the component settings, which are saved together.
The script component appears in your profile.
Run the script from the script component's menu by selecting **Run Script** (available when **Script Mode** is **Run On Demand**), and use **Cancel Script** to stop a script that is still running.

With **Log Script Output** enabled, the output appears in the Profinity log (select **ADMIN**, then **Logs**) at the `Info` level as `Script <script file name>: This is my first Profinity script.`, followed by a line for `Profinity.Message`.
Compile errors and script errors are always written to the log, whether or not **Log Script Output** is on, so review the error message, fix the script, and run it again.
A script with a time interval or cron schedule runs according to the schedule that was set.

For more examples, refer to [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md).

## Troubleshooting

### The script does not run

A script that does not run usually has scripting disabled or a component language that does not match the source.
Confirm that scripting is enabled in System Configuration and that the script component's language matches the language of the source.

### The DBC signal is null or missing

A signal that returns nothing or raises an error has a component, message, or signal name that does not match the DBC, because the names are case-sensitive.
Check the names against the DBC viewer. The [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md) page shows a script that reads a DBC signal.

### A syntax error appears

Fix compile errors (C#) or IronPython and Python 3 syntax errors (Python) before running, and add one API (DBC, CAN bus or state) at a time so that a fault is easy to find. The [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md) page shows each API in turn.

## Next steps

- [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md): reading a DBC signal, sending a CAN message, and persisting script state.
- [Scripting Overview](../Developing_with_Profinity/Scripting/index.md): security, enabling scripting, and next steps.
- [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md): C#, Python and Lua.
- [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md): run, receive, service, interval, cron, tag change and alert modes.
- [Script Operations](../Developing_with_Profinity/Scripting/Script_Operations/index.md): CAN bus, DBC, state, and console.
