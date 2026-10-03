---
title: Profinity SDK
description: "Developer kit including libraries, component pack CLI, and script tools for building extensions."
---

# Profinity SDK

The **Profinity SDK** is a single developer kit covering everything needed to build against
Profinity outside a running instance: a plugin, a Custom Component pack, or a script written and
tested before it is copied into a profile. Prohelion distributes it as one zip rather than as
separate downloads, because a script or component author needs more than the library on its
own — the kit bundles the library together with the two command-line tools that actually run and
pack what you write against it.

## What is in the kit

| Item | What it is for | Where to read more |
|---|---|---|
| **`Profinity.Sdk`** | The library a C# project references to build a **DLL plugin** — base types, abstractions, and the same dashboard/settings surfaces Profinity's own built-in components use. Add the kit folder as a local NuGet source, then reference `Profinity.Sdk`. | [DLL plugins](./Plugins/index.md) |
| **`profinity-component-pack`** | The command-line tool that validates and packs a **Custom Component** directory (YAML, scripts, maps) into a distributable bundle. | [Component Pack CLI](./Components/Component_Pack_CLI.md) |
| **`profinity-script`** | The command-line tool for writing and simulating a script on your own machine — against a simulated `Profinity` object — before copying the finished file into a profile. | Guide not yet published; see the note below |

`Profinity.Sdk` does not run scripts and does not pack a component — each of the two tools does
one job, and the library is only what a compiled C# plugin references.

!!! info "Script simulation guide coming separately"
    `profinity-script` and its `sim`/`new` commands are part of the kit today, but the dedicated
    how-to guide for using them is not published yet — the underlying capability is still
    settling. Check back, or see the
    [A37 SDK script host](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A37-SDK.md)
    engineering plan for the current design if you need detail now.

## Getting the kit

The Profinity SDK is not published to a public download link, a NuGet feed, or a file server —
**contact Prohelion** for a copy. Prohelion sends one zip, versioned to match the Profinity
release it targets; unzip it and each tool runs from its own subfolder inside.

!!! info "No public NuGet feed for 2.3 GA"
    `Profinity.Sdk` is a packable project, but publishing it to a public NuGet feed is deferred
    past 2.3 GA. Reference the package from the kit's local folder, not from a feed.

## Which piece do I need?

| If you want to... | Use |
|---|---|
| Build a compiled plugin that installs through Plugin Manager | `Profinity.Sdk` — see [DLL plugins](./Plugins/index.md) |
| Package a YAML/DBC Custom Component for distribution or CI | `profinity-component-pack` — see [Component Pack CLI](./Components/Component_Pack_CLI.md) |
| Write and test a script before adding it to a profile | `profinity-script` — guide pending, see the note above |

## Related documentation

- [DLL plugins](./Plugins/index.md)
- [Component Pack CLI](./Components/Component_Pack_CLI.md)
- [Component types](./Components/Component_Types.md)
- [Scripting](./Scripting/index.md)

## Engineering reference

Normative design for the single-kit packaging: in-repo
[`Docs/Architecture/SDK/SDK-Plugin-Authoring.md`](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/SDK/SDK-Plugin-Authoring.md).
Normative design for `profinity-script`:
[A37 — SDK script host](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A37-SDK.md).
