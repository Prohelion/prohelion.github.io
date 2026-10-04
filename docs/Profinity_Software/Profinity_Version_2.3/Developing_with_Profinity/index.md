---
title: Developing with Profinity
description: "Build on Profinity with scripting in C#, Python, or Lua, Custom Components, DLL plugins, and the Profinity SDK."
---

# Developing with Profinity

When configuration is not enough, Profinity can be extended with code. Write [scripts](./Scripting/index.md) that run inside Profinity, bring in a device it does not ship with as a [Custom Component](./Custom_Components/index.md), build compiled [plugins](./Plugins/index.md), and use the [Profinity SDK](./SDK.md) to develop and package them.

<figure markdown>
![Core components ship with every instance and plugins add more, but data in (devices, chargers, protocol and content-pack plugins) and data out (historians, loggers, publishers, rule actions, cloud) all meet in the same tag tree](../images/2.3-diagram-components-overview.png)
<figcaption>Components for every direction data flows</figcaption>
</figure>

## Scripting

Profinity's [scripting capabilities](./Scripting/index.md) automate tasks and create custom operations in C#, Python, or Lua, so each script can be written in the language best suited to the task. Scripts range from manual one-off operations to continuous, long-running processes, which suits teams automating repetitive tasks, integrating with other systems, or building workflows aligned to their own business processes.

<!-- Logo sources (page note, not rendered).
     C#: https://github.com/dotnet/brand/tree/main/logo/language-icons (csharp-128.png)
     Python: https://www.python.org/community/logos/
     Lua: https://www.lua.org/images/ (lua-logo.gif), copyright 1998 Lua.org, graphic design by Alexandre Nakonechnyj -->

| C# Scripting | Python | Lua |
|--------------|--------|-----|
| ![C# Logo](../images/CSharpLogo.png) | ![Python Logo](../images/PythonLogo.png) | ![Lua Logo](../images/LuaLogo.png) |

## Custom Components

[Custom Components](./Custom_Components/index.md) are how a device Profinity does not already ship is brought into a profile: an optional DBC file, a dashboard, and, as of 2.3, scripts, actions, and settings maps. Using one in a profile is covered on [Custom Components](../Components/Custom_Components/index.md) under Components.

| Page | Description |
|------|--------------|
| [Component Types](./Custom_Components/Component_Types.md) | Compares Custom Components, Dashboard Components, and DLL plugins, and when to use each packaging model. |
| [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md) | Covers the `profinity-component-pack` tool for validating, packing, and installing Custom Component bundles. |

## Plugins

[DLL plugins](./Plugins/index.md) add compiled components to Profinity and are managed through the Plugin Manager.

## Profinity SDK

Building a DLL plugin, packing a Custom Component for distribution, and writing and testing a script outside a profile all draw on the same [Profinity SDK](./SDK.md), one developer kit that Prohelion distributes on request rather than as three separate downloads. It suits organisations building a compiled integration, packaging Custom Components for field deployment, or developing scripts offline before adding them to a profile.

## Where next

- Calling Profinity from another system rather than running code inside it? See [Integrating to Profinity](../Integrating_to_Profinity/index.md).
- Dashboards, theming, and hosting: [Customising Profinity](../Customising_Profinity/index.md).
- Rule actions that run scripts: [Actions](../Tags/Actions.md).
