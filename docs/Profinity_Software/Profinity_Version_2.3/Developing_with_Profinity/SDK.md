---
title: Profinity SDK
description: "Developer kit including libraries, component pack CLI, and script tools for building extensions."
---

# Profinity SDK

The **Profinity Software Development Kit (SDK)** is a single developer kit for building against Profinity outside a running instance: a plugin, a Custom Component pack, or a script that is written and tested before it is copied into a profile. Prohelion distributes it as one zip. The kit bundles the `Profinity.Sdk` library with the two command-line tools that run and pack what is written against it.

!!! info "Licence Required"
    The Profinity SDK is an add-on to the Desktop, Server or Enterprise edition, supplied by Prohelion on request. See [Licensing](../Administration/Licensing.md).

## What Is in the Kit

| Item | What it is for | Where to read more |
|---|---|---|
| `Profinity.Sdk` | The library a C# project references to build a dynamic-link library (DLL) plugin. It holds the base types and abstractions that Profinity's own built-in components use. Add the kit folder as a local NuGet source, then reference `Profinity.Sdk`. | [DLL Plugins](./Plugins/index.md) |
| `profinity-component-pack` | The command-line tool that validates and packs a Custom Component directory (YAML, scripts and maps) into a distributable bundle. | [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md) |
| `profinity-script` | The command-line tool for writing and simulating a script on a developer machine, against a simulated `Profinity` object, before the finished file is copied into a profile. | [Writing and Testing a Script](#writing-and-testing-a-script) |

!!! info "The .NET 10 Runtime Is Required"
    `profinity-script` and `profinity-component-pack` are not self-contained. They are .NET 10 programs that run on the .NET 10 runtime, so install the .NET 10 runtime or SDK on the developer machine before you run them, for example with `dotnet profinity-script.dll`. Building a plugin against `Profinity.Sdk` needs the .NET 10 SDK.

`Profinity.Sdk` does not run scripts and does not pack a component. Each of the two tools does one job, and the library is only what a compiled C# plugin references.

## Getting the Kit

The Profinity SDK is not published to a public download link, a NuGet feed or a file server, so contact Prohelion for a copy. Prohelion sends one zip named `profinity-sdk-developer-{version}.zip`, versioned to match the Profinity release it targets. Unzipping it gives the `Profinity.Sdk` NuGet package (`.nupkg`) and a `README.txt` at the top level, with `profinity-script` and `profinity-component-pack` in their own subfolders. A C# project references `Profinity.Sdk` from the kit folder, which is added as a local NuGet source.

## Writing and Testing a Script

`profinity-script` creates a script from a template and runs it against a simulated `Profinity` object, so that Python and Lua scripts need nothing beyond the tool itself. The tool takes two commands, and the first creates a sub-folder that the second must be run from:

1. Run `profinity-script new tag-change --language python`. The tool creates a `tag-change` folder inside the current directory and copies the template script and its `sim.yaml` scenario file into it.
2. Change into that folder with `cd tag-change`.
3. Run `profinity-script sim`. The tool reads `sim.yaml` from the current directory, runs the script and prints the console output.

`profinity-script sim` can also be given a folder, as in `profinity-script sim tag-change`, and prints `No sim.yaml in` followed by the folder name when that folder has no `sim.yaml`. Running `sim` from the folder that holds the tool, rather than from the new script folder, produces that message.

The seven templates are `runnable`, `tag-change`, `receiver`, `service`, `firmware-load`, `rule-context` and `prompt`, and `--language` accepts `python`, `lua` or `csharp`, with `python` as the default. Not every template ships in every language, and the tool reports `No <language> example for <template>` when a combination is missing. Running `profinity-script new` with no template lists the templates. The script types the templates correspond to are described on [Scripting](./Scripting/index.md), and the AI skill that drives this tool is described on [AI Skills](../Profinity_AI/AI_Skills.md).

## Which Piece to Use

A compiled plugin that installs through **Components & Plugins** needs `Profinity.Sdk`. A YAML and DBC Custom Component that is distributed or built in a pipeline needs `profinity-component-pack`. A script that is tested before it is added to a profile needs `profinity-script`.

## Related Documentation

- [DLL Plugins](./Plugins/index.md)
- [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md)
- [Component Types](./Custom_Components/Component_Types.md)
- [Scripting](./Scripting/index.md)
