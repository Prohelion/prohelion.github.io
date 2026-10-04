---
title: Profinity SDK
description: "Developer kit including libraries, component pack CLI, and script tools for building extensions."
---

# Profinity SDK

The **Profinity SDK** is a single developer kit covering everything needed to build against
Profinity outside a running instance: a plugin, a Custom Component pack, or a script written and
tested before it is copied into a profile. Prohelion distributes it as one zip rather than as
separate downloads, because a script or component author needs more than the library on its
own — the kit bundles the library together with the two command-line tools that run and
pack what is written against it.

## What is in the kit

| Item | What it is for | Where to read more |
|---|---|---|
| **`Profinity.Sdk`** | The library a C# project references to build a **DLL plugin** — base types, abstractions, and the same dashboard/settings surfaces Profinity's own built-in components use. Add the kit folder as a local NuGet source, then reference `Profinity.Sdk`. | [DLL plugins](./Plugins/index.md) |
| **`profinity-component-pack`** | The command-line tool that validates and packs a **Custom Component** directory (YAML, scripts, maps) into a distributable bundle. | [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md) |
| **`profinity-script`** | The command-line tool for writing and simulating a script on your own machine — against a simulated `Profinity` object — before copying the finished file into a profile. | Guide not yet published; see the note below |

`Profinity.Sdk` does not run scripts and does not pack a component — each of the two tools does
one job, and the library is only what a compiled C# plugin references.

!!! info "Script simulation guide coming separately"
    `profinity-script` and its `sim`/`new` commands are part of the kit today, but the dedicated
    how-to guide for using them is not published yet — the underlying capability is still
    settling. The `README.txt` in the kit shows the two entry points, `profinity-script new tag-change --language python`
    and `profinity-script sim`, run from the `profinity-script` folder.

## Getting the kit

The Profinity SDK is not published to a public download link, a NuGet feed, or a file server —
**contact Prohelion** for a copy. Prohelion sends one zip named `profinity-sdk-developer-{version}.zip`, versioned to match the Profinity
release it targets. Unzipping it gives the `Profinity.Sdk` NuGet package (`.nupkg`) and a `README.txt` at the top level,
with `profinity-script` and `profinity-component-pack` in their own subfolders.

!!! info "No public NuGet feed in 2.3"
    `Profinity.Sdk` is a packable project, but publishing it to a public NuGet feed is deferred
    past this release. Reference the package from the kit's local folder, not from a feed.

## Which piece to use

| To... | Use |
|---|---|
| Build a compiled plugin that installs through Plugin Manager | `Profinity.Sdk` — see [DLL plugins](./Plugins/index.md) |
| Package a YAML/DBC Custom Component for distribution or CI | `profinity-component-pack` — see [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md) |
| Write and test a script before adding it to a profile | `profinity-script` — guide pending, see the note above |

## Related documentation

- [DLL plugins](./Plugins/index.md)
- [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md)
- [Component types](./Custom_Components/Component_Types.md)
- [Scripting](./Scripting/index.md)
