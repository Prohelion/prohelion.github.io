---
title: How to write your first script
description: "Enable scripting, add a script component, and run a first C# or Python script, then find its output in the log."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-15
---

# How to write your first script

Create your first Profinity script to automate tasks and interact with your CAN bus system.
This guide adds a script component, writes a run script that prints a message, runs it, and finds the output.

Before you start, you need:

- Profinity 2.3 installed and running.
- A **Desktop**, **Server**, or **Enterprise** licence. An unlicensed instance cannot add or run scripts. Refer to [Licensing](../Licensing.md).
- An active [profile](../Getting_Started/Profiles.md) with components configured.
- Basic understanding of C# or Python. Profinity scripting uses [IronPython](https://ironpython.net/) for Python, which limits the Python syntax available. It also supports Lua. Refer to [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md).
- Scripting enabled in Profinity configuration, as the Enable scripting section of this guide describes.

!!! warning "Scripts run with application permissions"
    A script runs inside Profinity with the same operating system permissions as the application, so review any script before running it.
    Refer to [Profinity Scripting](../Developing_with_Profinity/Scripting/index.md) for the security context and behaviour.

## Enable scripting

1. Select **ADMIN** in the side menu, then the **System Configuration** pill.
   [System Configuration](../Administration/System_Configuration/index.md) gives more detail.
2. Find the **Optional Capabilities** section.
3. Enable **Enable Scripting**.
4. Select **Save**.

## Add a script component and set its mode

A script is a component in your profile, and the language is set by which script component you add.
This guide uses a run script, which starts on demand from the UI.
[Script types](../Developing_with_Profinity/Scripting/Script_Types/index.md) describes the other modes and the settings each one adds, and [Run scripts](../Developing_with_Profinity/Scripting/Script_Types/Run_Scripts.md) covers the time interval and cron schedule modes.

1. Select **ADD COMPONENT** (refer to [How to add a component to your profile](Add_Component_to_Profile.md)).
2. Select the **CSharp Script**, **Python Script**, or **Lua Script** component.
   The script component settings and the script editor open together.
3. Set the component name, and add a description if wanted.
4. Set **Script Mode** to **Run On Demand**.
5. Enable **Log Script Output**, which is off by default, so that the script's output appears in the Profinity log.

## Write the script

Use the same patterns as in [Run scripts](../Developing_with_Profinity/Scripting/Script_Types/Run_Scripts.md).
C# implements `IProfinityRunnableScript` with a `Run()` method.
Python defines functions and calls them from the top level.
Python needs no `import profinity`, because Profinity provides the `Profinity` host object.
In C#, use `Profinity.Console.WriteLine` for output, and in Python use `print()`.
Refer to [Console](../Developing_with_Profinity/Scripting/Script_Operations/Console.md).

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

Select **Save** to save the script and the component settings together.
The script component appears in your profile.
Run the script from the script component's menu by selecting **Run Script**, which is available when **Script Mode** is **Run On Demand**.
Use **Cancel Script** to stop a script that is still running.

With **Log Script Output** enabled, the output appears in the Profinity log at the `Info` level.
To open the log, select **ADMIN**, then **Logs**.
The entry reads `Script <script file name>: This is my first Profinity script.`, followed by a line for `Profinity.Message`.
Profinity always writes compile errors and script errors to the log, whether or not **Log Script Output** is on.
Review the error message, fix the script, and run it again.

For more examples, refer to [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md).

## Troubleshooting

### The script does not run

A script that does not run usually has scripting disabled or a component language that does not match the source.
Confirm that scripting is enabled in System Configuration.
Confirm that the script component's language matches the language of the source.

### The DBC signal is null or missing

A signal that returns nothing or raises an error has a component, message, or signal name that does not match the CAN database (DBC), because the names are case-sensitive.
Check the names against the DBC viewer.
[Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md) shows a script that reads a DBC signal.

### A syntax error appears

Fix compile errors (C#) or IronPython and Python 3 syntax errors (Python) before you run the script.
Add one API (DBC, CAN bus, or state) at a time, so that a fault is easy to find.
[Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md) shows each API in turn.

## Next steps

- [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md): reading a DBC signal, sending a CAN message, and persisting script state.
- [Profinity Scripting](../Developing_with_Profinity/Scripting/index.md): security, enabling scripting, and next steps.
- [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md): C#, Python, and Lua.
- [Script types](../Developing_with_Profinity/Scripting/Script_Types/index.md): run, receive, service, interval, cron, tag change, and alert modes.
- [Supported operations](../Developing_with_Profinity/Scripting/Script_Operations/index.md): CAN bus, DBC, state, and console.
