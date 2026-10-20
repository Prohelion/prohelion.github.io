---
title: Custom Components
description: "Find the pages for authoring a Custom Component: its files, scripts, settings maps, firmware actions, and pack."
type: index
owner: Documentation
last_reviewed: 2026-10-20
---

# Custom Components

A Custom Component is a component built from the files uploaded for it, with no compiling.
Adding the component in a profile and uploading those files is enough to run it.
A pack is for installing that same component on another Profinity system.

Day-to-day behaviour in a profile, including the Messages and Signals viewer, is on [Using a Custom Component](../../Components/Custom_Components/Using_a_Custom_Component.md).
The click path to add one is [How to create a Custom Component](../../How_To_Guides/Create_Custom_Component.md).
[Component types](Component_Types.md) compares a Custom Component with a dynamic-link library (DLL) plugin.

- [Custom Component files](Files.md) lists every file, which ones a pack requires, and which upload field holds each one.
- [DBC, dashboard, and rules](DBC_Dashboard_and_Rules.md) covers the CAN database, the component page, and tag rules.
- [Main script](Main_Script.md) covers the service that publishes the component's tags.
- [Menu actions](Menu_Actions.md) covers `actions.yaml`, including **Connect / Disconnect**.
- [Settings and firmware maps](Settings_and_Firmware_Maps.md) covers the extra settings fields and the firmware fields.
- [Firmware actions](Firmware_Actions.md) covers `firmware.yaml`, which names the load, save, and other firmware scripts.
- [Packing a Custom Component](Packing.md) covers `component_metadata.yaml` and installing the bundle.
- [Component Pack CLI](../SDK/Component_Pack_CLI.md) covers the `profinity-component-pack` commands.

New in Profinity 2.3.
