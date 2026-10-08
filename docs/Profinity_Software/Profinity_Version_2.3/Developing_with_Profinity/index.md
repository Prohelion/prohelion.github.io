---
title: Developing with Profinity
description: "Build on Profinity with scripting in C#, Python, or Lua, Custom Components, DLL plugins, and the Profinity SDK."
---

# Developing with Profinity

When configuration is not enough, Profinity can be extended with code. A script runs inside Profinity, a Custom Component brings in a device that Profinity does not ship with, a compiled plugin adds a new component type, and the Profinity SDK develops and packages all three.

<figure markdown>
![Components and plugins bring data in, and historians, loggers, publishers and rule actions take it out, all through the same tag tree](../images/2.3-diagram-components-overview.png)
<figcaption>Core Components, Plugins, and the Data Flowing In and Out of the Tag Tree</figcaption>
</figure>

## Scripting

[Scripting](./Scripting/index.md) automates tasks and creates custom operations in C#, Python or Lua. A script can react to a tag, a CAN message, a rule or a schedule, run continuously as a service, and write results back to tags. Scripting requires a **Desktop**, **Server** or **Enterprise** licence, and an unlicensed instance cannot add or run scripts (see [Licensing](../Administration/Licensing.md)).

## Custom Components

A Custom Component brings a device that Profinity does not already ship into a profile, using an optional [DBC (CAN database)](../CAN_Utilities/CAN_Bus_DBC.md) file, a dashboard and, as of Profinity 2.3, scripts, actions and settings maps. [Authoring a Custom Component](./Custom_Components/index.md) is covered here, and using one in a profile is covered on [Custom Components](../Components/Custom_Components/index.md) under Components.

| Page | Description |
|------|--------------|
| [Component Types](./Custom_Components/Component_Types.md) | Compares Custom Components and DLL plugins, and when to use each. |
| [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md) | Covers the `profinity-component-pack` tool for validating, packing, and installing Custom Component bundles. |

## Plugins

[Dynamic-link library (DLL) plugins](./Plugins/index.md) add compiled components to Profinity and are managed in **Components & Plugins**.

## Choosing Between a Script, a Custom Component and a Plugin

A script suits logic that runs inside an existing profile, such as reacting to a tag change, answering a CAN message or running on a schedule. A Custom Component suits a device that can be described with files (a DBC, a dashboard, scripts and menu actions) and needs no compiling. A DLL plugin suits a component that needs compiled code, and is chosen only when files and scripts are not enough. [Component Types](./Custom_Components/Component_Types.md) compares the last two.

## Profinity SDK

Building a DLL plugin, packing a Custom Component for distribution, and writing and testing a script outside a profile all draw on the same [Profinity SDK](./SDK.md), one developer kit that Prohelion distributes on request rather than as three separate downloads.

## Where Next

- Calling Profinity from another system rather than running code inside it? See [Integrating to Profinity](../Integrating_to_Profinity/index.md).
- Dashboards, theming, and hosting: [Customising Profinity](../Customising_Profinity/index.md).
- Rule actions that run scripts: [Actions](../Tags/Actions.md).
