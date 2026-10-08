---
title: Using a Custom Component
description: "Add a device Profinity does not already ship by placing a Custom Component in a profile, with an optional DBC file, dashboard, and scripts."
---

# Using a Custom Component

A Custom Component is the built-in profile component for a device that Profinity does not already ship a type for. As of Profinity 2.3 it can carry an optional DBC (CAN database) file, a [dashboard](../../Customising_Profinity/Dashboards/index.md), a rules file, a long-running [script](../../Developing_with_Profinity/Scripting/index.md), operator actions, and settings and firmware maps. Once it is in a profile it is monitored, graphed, and logged the same way as a Prohelion device.

!!! info "Licence Required"
    Custom Components are included in every edition. The script a Custom Component runs, set under **Scripts**, needs the **Scripting** licensed feature, which is included from the Desktop edition upward, so a profile without it can use the DBC, dashboard and rules files but not the script. The [Profinity SDK](../../Developing_with_Profinity/SDK.md) used to pack a component is a separate add-on. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

Built-in components such as the [Elmar Solar MPPT](../MPPT/index.md) and the [WaveSculptor](../Motor_Controller/index.md) already include their own DBC support, so Messages and Signals is available on those components without a separate file. A Custom Component is the same idea for a third-party CAN device, or for a device whose live values a script publishes as tags.

The steps to add one are in [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md). The files that make one up, and how to pack it for another installation, are in the [Custom Components authoring guide](../../Developing_with_Profinity/Custom_Components/index.md), and [Component Types](../../Developing_with_Profinity/Custom_Components/Component_Types.md) compares a Custom Component with a Dashboard Component and a dynamic-link library (DLL) plugin.

## What Appears in the Profile

After the component is saved it is listed in the side menu and opens onto its dashboard. With no dashboard uploaded, Profinity creates a template dashboard named after the component, and the dashboard editor on the component opens that file so it can be edited into the finished dashboard. Loggers, rules, and scripts bind to it the same way they bind to any other component.

Component settings are arranged as **Settings**, **Pack files**, **Scripts**, and **Security**, with Security last. **Pack files** is where the DBC, dashboard, rules file, actions file, settings map, firmware map, and firmware file are uploaded. **Scripts** is where the main script and **Auto Start Main Script** are set. A component installed from a content pack hides **Pack files** and **Scripts**, because those files belong to the pack, and shows **Name**, **Tag tree path**, menu placement, and the fields declared in the pack's settings map.

## CAN Bus DBC

The DBC format describes the format and nature of CAN bus data. With a DBC file, CAN data can be understood more clearly and broken down into Signals and Messages, the fundamental building blocks of a DBC file.

As of Profinity 2.3, Profinity provides a DBC Viewer that takes a DBC file and shows the CAN bus traffic travelling through the Profinity system as Messages and Signals.

<figure markdown>
![CAN DBC Viewer](../../images/dbc_canbus_message.png)
<figcaption>CAN DBC Viewer</figcaption>
</figure>

The DBC file is optional. Upload it under **Pack files**, in **Upload DBC File (Optional)**, when the component needs the Messages and Signals viewer or when the dashboard binds CAN signals from that file. Once the file loads, the component menu includes **Messages and Signals** and **Edit DBC File**. A file that fails to parse leaves the component in the profile and omits **Messages and Signals** until the file is corrected, and Profinity watches the file so a saved edit is picked up without recreating the component. The viewer itself, including its filters, is described in [CAN Bus DBC](../../CAN_Utilities/CAN_Bus_DBC.md).

When the device's CAN identifiers sit at a different base address than the DBC was written for, enable **Rebase DBC** and set **Rebase Address**. Profinity shifts the message identifiers in the loaded database to that base.

The DBC file of the WaveSculptor22 is published in the [hardware documentation](../../../../Motor_Controllers/WaveSculptor22/User_Manual/DBC.md), and the [EV Driver Controls DBC file](../../../../Solar_Car_Racing/EV_Driver_Controller/Communications_Protocol/DBC.md) can be used in the same way for a device that has no built-in support. Recorded traffic can be played back against the component with [CAN log replay](../../How_To_Guides/Replay_CAN_Logs.md).

A DBC file describes CAN messages. Live values that a script publishes are tags, and the dashboard binds those tags whether or not a DBC file is present. Both paths can be used on the same component.

## Dashboards

The dashboard is the component's page in the profile. Profinity provides a YAML dashboard editor that validates the file as it is edited, and the dashboards Prohelion ships are written with the same format and can be used as templates. Upload a finished file under **Pack files** in **Upload Dashboard (Optional)**, or open the dashboard editor on the component and start from the template dashboard Profinity creates.

Bindings, layout, and the visual editor are covered in the [Dashboard Development Guide](../../Customising_Profinity/Dashboards/index.md). A first dashboard for a Custom Component is in [How to Create a Custom Dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).

## Distributing a Custom Component as a Plugin

As of Profinity 2.3, a Custom Component that works in one profile can be turned into a plugin and distributed to other installations, with no rebuild of the component. The software development kit (SDK) from the [Profinity SDK](../../Developing_with_Profinity/SDK.md) page includes `profinity-component-pack`, which validates the component's files and packs them as a `.zip` or a `.nupkg`. An administrator then uploads the package by opening **ADMIN** and then **Components & Plugins**, and the component appears in **ADD COMPONENT** under the name the author gave it.

The pack is a bundle of the component's own files (DBC, dashboard, scripts and maps), not a compiled DLL plugin. Packing and installing are covered in the [authoring guide](../../Developing_with_Profinity/Custom_Components/index.md#packing) and [Component Pack CLI](../../Developing_with_Profinity/Custom_Components/Component_Pack_CLI.md), and the kit is available from Prohelion.
