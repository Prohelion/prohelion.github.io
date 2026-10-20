---
title: Profinity SDK
description: "The Profinity SDK is a developer kit Prohelion provides to approved developers, with frameworks for plugins, Custom Components, and scripts."
type: concept
owner: Documentation
last_reviewed: 2026-10-20
---

# Profinity SDK

Prohelion provides the Profinity SDK to approved developers.
The kit includes worked examples and documentation that goes further than these pages.
These pages explain what the SDK can do.
For a copy of the SDK, or for more information, [contact Prohelion](https://www.prohelion.com/contact-us/).

The SDK is the set of frameworks for extending Profinity with code that is written outside a running instance, then installed into Profinity.
It covers plugins, Custom Components, and scripts.

The SDK is an add-on to the Desktop, Server, or Enterprise edition.
Refer to [Licensing](../../Licensing.md).

## Plugin framework

The plugin framework is the same one Prohelion uses for its own components.
A plugin adds a compiled component that Profinity does not ship: a settings screen, a status, tags, and actions.
Once an administrator installs it, a profile uses it in the same way as a built-in component.
Refer to [Developing Plugins](./Developing_Plugins.md).

## Custom Component framework

The Custom Component framework describes a device with files: a dashboard, scripts, actions, and an optional CAN database and settings maps, with no compiling.
The kit includes the tool that checks those files and packs them into a bundle for a profile.
Refer to [Custom Components](../Custom_Components/index.md) and [Component Pack CLI](Component_Pack_CLI.md).

## Script framework

The script framework runs automation inside a profile, in C#, Python, or Lua.
A script can react to a tag, a CAN message, a rule, or a schedule, run as a service, and write results back to tags.
The kit includes the tool that creates a script from a template and runs it against a simulated Profinity, before the finished script is copied into a profile.
Refer to [Test a script outside Profinity](./Test_a_Script.md).
What a script can do inside a profile is on [Scripting](../Scripting/index.md).
