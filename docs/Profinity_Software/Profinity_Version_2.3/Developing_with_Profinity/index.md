---
title: Developing with Profinity
description: "Choose between scripting, Custom Components, DLL plugins, and the Profinity SDK to extend Profinity with code."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Developing with Profinity

When configuration is not enough, Profinity can be extended with code.
A script runs inside Profinity, a Custom Component brings in a device that Profinity does not ship with, a compiled plugin adds a new component type, and the Profinity SDK develops and packages all three.

<figure markdown>
![Components and plugins bring data in, and historians, loggers, publishers and rule actions take it out, all through the same tag tree](../images/diagram-components-overview.png)
<figcaption>Core components, plugins, and the data flowing in and out of the tag tree</figcaption>
</figure>

- [Scripting](./Scripting/index.md) automates tasks and creates custom operations in C#, Python or Lua. A script can react to a tag, a CAN message, a rule or a schedule, run continuously as a service, and write results back to tags.
- [Custom Components](./Custom_Components/index.md) covers authoring a component that brings a device Profinity does not already ship into a profile, using an optional [DBC (CAN database)](../CAN_Utilities/CAN_Bus_DBC.md) file, a dashboard, scripts, actions, and settings maps. Using one in a profile is covered on [Using a Custom Component](../Components/Custom_Components/Using_a_Custom_Component.md) under Components.
- [Component Types](./Custom_Components/Component_Types.md) compares Custom Components and DLL plugins, and when to use each.
- [Component Pack CLI](./Custom_Components/Component_Pack_CLI.md) covers the `profinity-component-pack` tool for validating, packing, and installing Custom Component bundles.
- [DLL Plugins](./Plugins/index.md) covers dynamic-link library (DLL) plugins, which add compiled components to Profinity and are managed in **Components & Plugins**.
- [Profinity SDK](./SDK.md) covers the developer kit that Prohelion distributes on request, which Profinity plugins, Custom Component packs and offline scripts all draw on, rather than three separate downloads.

New in Profinity 2.3: a Custom Component can include scripts, actions, and settings maps.

Scripting requires a **Desktop**, **Server** or **Enterprise** licence, and an unlicensed instance cannot add or run scripts.
Refer to [Licensing](../Administration/Licensing.md).

## Choosing between a script, a Custom Component and a plugin

A script suits logic that runs inside an existing profile, such as reacting to a tag change, answering a CAN message or running on a schedule.
A Custom Component suits a device that can be described with files (a DBC, a dashboard, scripts, and menu actions) and needs no compiling.
A DLL plugin suits a component that needs compiled code, and is chosen only when files and scripts are not enough.
[Component Types](./Custom_Components/Component_Types.md) compares the last two.

## Where next

To call Profinity from another system rather than run code inside it, refer to [Integrating to Profinity](../Integrating_to_Profinity/index.md).
For dashboards, theming, and hosting, refer to [Customising Profinity](../Customising_Profinity/index.md).
Rule actions that run scripts are covered in [Actions](../Tags/Actions.md).
