---
title: How to write your first script
description: "Enable scripting, add a Python script component, run a first script on demand, and find its output in the Profinity log."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-15
---

# How to write your first script

By the end of this guide, you have run a Python script from Profinity and seen its output in the log.
The guide adds a script component, writes a run script that prints a message, runs it, and finds the output.
For C# and Lua, refer to [Run scripts](../Developing_with_Profinity/Scripting/Script_Types/Run_Scripts.md).

Before you start, you need:

- Profinity 2.3 installed and running.
- A **Desktop**, **Server**, or **Enterprise** licence. An unlicensed instance cannot add or run scripts. Refer to [Licensing](../Licensing.md).
- An active [profile](../Getting_Started/Profiles.md) with components configured.
- Basic understanding of Python. Profinity uses [IronPython](https://ironpython.net/), which limits the Python syntax available.

!!! warning "Scripts run with application permissions"
    A script runs inside Profinity with the same operating system permissions as the application, so review any script before running it.
    Refer to [Profinity Scripting](../Developing_with_Profinity/Scripting/index.md) for the security context and behaviour.

## Enable scripting

1. Select **ADMIN** in the side menu, then the **System Configuration** pill, and open the **Application Config** tab.
   [Application Config](../Administration/System_Configuration/Application_Config.md) describes the tab.
2. Find the **Optional Capabilities** section.
3. Enable **Enable Scripting**.
4. Select **Save**.

## Add a script component and set its mode

A script is a component in your profile, and the language is set by which script component you add.
This guide uses a run script, which starts on demand from the menu.
[Script types](../Developing_with_Profinity/Scripting/Script_Types/index.md) describes the other modes and the settings each one adds, and [Run scripts](../Developing_with_Profinity/Scripting/Script_Types/Run_Scripts.md) covers the time interval and cron schedule modes.

1. Select **ADD COMPONENT** (refer to [How to add a component to your profile](Add_Component_to_Profile.md)).
2. Select the **Python Script** component.
   The script component settings and the script editor open together.
3. Set the component name, and add a description if wanted.
4. Set **Script Mode** to **Run On Demand**.
5. Enable **Log Script Output**, which is off by default, so that the script's output appears in the Profinity log.

## Write the script

In the script editor, replace the contents with this script:

```python
def main():
    print("This is my first Profinity script.")
    print(Profinity.Message)


main()
```

Python needs no `import profinity`, because Profinity provides the `Profinity` host object, and `print()` writes to the script output.

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

If the script does not run, confirm that **Enable Scripting** is on and that you added the **Python Script** component.

## Next steps

- [Script examples](../Developing_with_Profinity/Scripting/Script_Examples.md): reading a CAN database (DBC) signal, sending a CAN message, and persisting script state.
- [Profinity Scripting](../Developing_with_Profinity/Scripting/index.md): security, enabling scripting, and next steps.
- [Supported Languages](../Developing_with_Profinity/Scripting/Supported_Languages/index.md): C#, Python, and Lua.
- [Script types](../Developing_with_Profinity/Scripting/Script_Types/index.md): run, receive, service, interval, cron, tag change, and alert modes.
- [Supported operations](../Developing_with_Profinity/Scripting/Script_Operations/index.md): CAN bus, DBC, state, and console.
