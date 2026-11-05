---
title: Test a script outside Profinity
description: "Create a script with profinity-script, run it on a simulated Profinity, check its output, and copy the file into a profile."
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# Test a script outside Profinity

`profinity-script` creates a script on a developer machine and runs it against a simulated Profinity, before the script file is copied into a profile.
The tool ships in the [Profinity SDK](index.md) download, in its `profinity-script` folder, and not with the Profinity install.
This page calls the downloaded SDK the kit.

The kit holds no Windows `.exe`. On Windows, run the tool from its folder as `dotnet profinity-script.dll`, followed by the command.
The kit also contains the [Component Pack CLI](Component_Pack_CLI.md) (`profinity-component-pack`) and the `Profinity.Sdk` package.
The package on its own does not create or run a script.

The SDK is licensed separately.
Refer to [Licensing](../../Licensing.md).
For a copy of the SDK, [contact Prohelion](https://www.prohelion.com/contact-us/).

The simulator does not start Profinity and does not need a CAN bus.
It calls the script the way Profinity does, and the script calls the same `Profinity` object.
Once the script is in a profile it needs the Scripting feature, which a Desktop, Server, or Enterprise edition includes.
Refer to [Profinity Scripting](../Scripting/index.md).

A C# project in a generated folder references `Profinity.Sdk`.
To let the editor complete Profinity types, add the kit folder that contains that package as a local NuGet source. In Visual Studio, use Tools, Options, NuGet Package Manager, Package Sources. From any editor or a terminal, run `dotnet nuget add source` with the kit folder path and a name such as `ProfinityKit`.
`profinity-script sim` compiles and runs the script itself.
If a project still references `Profinity.Component.Sdk`, change that reference to `Profinity.Sdk`.

## Create a runnable script

Install the .NET 10 runtime before you start. Python and Lua scripts need no other runtime, and C# scripts need no separate compiler.
Run the following commands from the kit's `profinity-script` folder.
With no arguments, `profinity-script` runs `sim` in the current directory.

1. Create a runnable Python script.

    ```bash
    profinity-script new runnable --language python
    ```

    The command writes a folder named `runnable` and prints its path.
    `--language` accepts `python`, `lua`, or `csharp`, and it defaults to `python`.

2. Change into that folder.

    ```bash
    cd runnable
    ```

3. Run the simulator.

    ```bash
    profinity-script sim
    ```

    The command prints `ran` and exits cleanly.
    That line is what `script.py` writes with `Profinity.Console.WriteLine`.

    ```text
    ran
    ```

`profinity-script sim runnable`, run from the `profinity-script` folder, does the same thing without changing directory.

The simulator reads `sim.yaml`, which sits next to the script, runs the script, and prints the lines the script writes to the console.
A script that only stores a tag or a setting prints nothing, and the run has still worked when the command exits cleanly.
Add `Profinity.Console.WriteLine` to see a stored value.

The command does not print tags, settings, notifications, or CAN frames on its own.
To run a tag-change, receiver, service, alert, firmware-load, or prompt script, create it from the matching template and edit `sim.yaml`.
Refer to [profinity-script reference](./Profinity_Script_Reference.md) for the templates and every `sim.yaml` key.

## Copy the script into a profile

When the console lines are right, copy the script file into the profile.
Leave `sim.yaml` on the developer machine.
Profinity runs the copied file.

1. If the component already holds a script with the same file name, copy that file to a folder outside the profile.
   The file sits in the folder named after the component, in the `components` folder of the profile.
   Saving replaces the file in place, so this copy is how you restore the earlier script.
2. Add a script component as described in [How to write your first script](../../How_To_Guides/Write_Your_First_Script.md).
   A script that belongs to a [Custom Component](../Custom_Components/index.md) goes in that component, under the name the component already uses.
   For a Python script, set **Upload Script File (Optional)** in the component's settings to the `.py` file. Alternatively, paste the script into the script editor and select **Save**.
3. Review the script before it is enabled.
   A script in a profile runs with the same operating system permissions as Profinity.

For what a script can do in a profile, refer to [Profinity Scripting](../Scripting/index.md).
If the command fails, or the simulator cannot cover a call the script makes, refer to the [errors](./Profinity_Script_Reference.md#errors) and the [limits of the simulator](./Profinity_Script_Reference.md#limits-of-the-simulator) in the profinity-script reference.
