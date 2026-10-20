---
title: Using a Custom Component
description: "Use a Custom Component in a profile, with an optional DBC file, dashboard, and scripts."
type: component
owner: Documentation
last_reviewed: 2026-10-20
---

# Using a Custom Component

A Custom Component allows a developer to create a new component for Profinity, and as of Profinity 2.3 it can carry an optional DBC (CAN database) file, a [dashboard](../../Customising_Profinity/Dashboards/index.md), a rules file, a long-running [script](../../Developing_with_Profinity/Scripting/index.md), operator actions, and settings and firmware maps.
Once it is in a profile it is monitored, graphed, and logged the same way as a built-in component.
Built-in components such as the [Elmar Solar MPPT](../MPPT/Elmar_Solar_MPPT.md) and the [WaveSculptor](../Motor_Controller/WaveSculptor.md) already include their own DBC support, so Messages and Signals is available on those components without a separate file, and a Custom Component can do the same for a third-party CAN device, or for a component whose live values a script publishes as tags.

!!! info "Licence required"
    Custom Components need the **Custom Plugins** licensed feature, which is included from the Desktop edition upward.
    The script a Custom Component runs, set under **Scripts**, needs the **Scripting** licensed feature, which is included from the Desktop edition upward, so a profile without it can use the DBC, dashboard, and rules files but not the script.
    The [Profinity SDK](../../Developing_with_Profinity/SDK/index.md) used to pack a component is a separate add-on.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

To make a first Custom Component, follow [Make your first Custom Component](../../Developing_with_Profinity/Custom_Components/First_Custom_Component.md).
To attach optional files afterwards, refer to [How to create a Custom Component](../../How_To_Guides/Create_Custom_Component.md).
The files that make one up, and how to pack it for another installation, are in [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md), which also compares a Custom Component with a Dashboard Component and a dynamic-link library (DLL) plugin.

## What appears in the profile

After the component is saved it is listed in the side menu and opens onto its dashboard.
Loggers, rules, and scripts bind to it the same way they bind to any other component.

Component settings are arranged as **Settings**, **Pack files**, **Scripts**, and **Security**, with Security last.
**Pack files** is where the DBC, dashboard, rules file, actions file, settings map, firmware map, and firmware file are uploaded.
**Scripts** is where the main script and **Auto Start Main Script** are set.
A component installed from a content pack hides **Pack files** and **Scripts**, because those files belong to the pack, and shows **Name**, **Tag tree path**, menu placement, and the fields declared in the pack's settings map.

## Optional capabilities

A Custom Component can have a DBC file, a dashboard, or both.
Each is optional, uploaded under **Pack files**, and the two can be used on the same component.

- **DBC file.** With a DBC file the component gets **Messages and Signals** and **Edit DBC File** in its menu, so its CAN traffic can be read as named messages and signals. If the file fails to parse, the component stays in the profile and Messages and Signals is left out until the file is fixed. Refer to [CAN bus DBC](../../CAN_Utilities/CAN_Bus_DBC.md), and to [How to create a Custom Component](../../How_To_Guides/Create_Custom_Component.md) for the **Rebase DBC** setting that shifts message identifiers to a different base address.
- **Dashboard.** The dashboard is the component's page in the profile. With none uploaded, Profinity creates a template dashboard named after the component, and the dashboard editor on the component opens that file so it can be edited into the finished dashboard. Refer to the [Profinity dashboard development guide](../../Customising_Profinity/Dashboards/index.md) and [How to create a custom dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).

Live values that a script publishes are tags, and a dashboard binds those tags whether or not a DBC file is present.

## Packing for other installations {#distributing-a-custom-component-as-a-plugin}

As of Profinity 2.3, a Custom Component that works in one profile can be packed and installed on other systems, with no rebuild of the component.
The [Profinity SDK](../../Developing_with_Profinity/SDK/index.md) includes `profinity-component-pack`, which validates the component's files and packs them as a `.zip` or a `.nupkg`.
An administrator then uploads the package by opening **ADMIN** and then **Components & Plugins**, and the component appears in **ADD COMPONENT** under the name the author gave it.

The pack is a bundle of the component's own files (DBC, dashboard, scripts, and maps), not a compiled DLL plugin.
The catalogue name is set in `component_metadata.yaml`.
Refer to [Component metadata](../../Developing_with_Profinity/Custom_Components/Component_Metadata.md).
Packing and installing are covered in [Component Pack CLI](../../Developing_with_Profinity/SDK/Component_Pack_CLI.md), and the kit is available from Prohelion.
