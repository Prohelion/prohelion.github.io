---
title: Using a Custom Component
description: "Use a Custom Component in a profile, with an optional DBC file, dashboard, and scripts."
type: component
owner: Documentation
last_reviewed: 2026-10-20
---

# Using a Custom Component

A Custom Component lets a developer create a new component for Profinity.
As of Profinity 2.3, a Custom Component can carry these optional parts:

- A CAN database (DBC) file.
- A [dashboard](../../Customising_Profinity/Dashboards/index.md).
- A rules file.
- A long-running [script](../../Developing_with_Profinity/Scripting/index.md).
- Menu actions.
- Settings and firmware maps.

Once it is in a profile, Profinity monitors, graphs, and logs it the same way as a built-in component.
Built-in components such as the [Elmar Solar MPPT](../MPPT/Elmar_Solar_MPPT.md) and the [WaveSculptor](../Motor_Controller/WaveSculptor.md) include their own DBC support, so Messages and Signals is available on them without a separate file.
A Custom Component can do the same for a third-party CAN device, or for a component whose live values a script publishes as tags.

!!! info "Licence required"
    Custom Components need the **Custom Plugins** licensed feature, which is included from the Desktop edition upward.
    The script a Custom Component runs, set under **Scripts**, needs the **Scripting** licensed feature, which is included from the Desktop edition upward.
    A profile without it can use the DBC, dashboard, and rules files but not the script.
    The [Profinity SDK](../../Developing_with_Profinity/SDK/index.md) used to pack a component is a separate add-on.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

To make a first Custom Component, follow [Make your first Custom Component](../../Developing_with_Profinity/Custom_Components/First_Custom_Component.md).
[Custom Components](../../Developing_with_Profinity/Custom_Components/index.md) describes the files that make one up.
It also compares a Custom Component with a Dashboard Component and a dynamic-link library (DLL) plugin.

## Add a Custom Component

A Custom Component needs only a name, and every file attached to it is optional.
You need the **Modify components** permission.

1. Select **ADD COMPONENT** in the side menu or on the home page.
2. Select **Custom Component**.
3. Enter a **Name** that is unique in the profile, and save.

The component appears in the side menu and opens its starter dashboard.
To attach files, open the component settings and use the **Pack files** and **Scripts** tabs, as described in [What appears in the profile](#what-appears-in-the-profile).

## What appears in the profile

After the component is saved it is listed in the side menu and opens onto its dashboard.
Loggers, rules, and scripts bind to it the same way they bind to any other component.

Component settings are arranged as **Settings**, **Pack files**, **Scripts**, and **Security**, with **Security** last.
Upload the DBC, dashboard, rules file, actions file, settings map, firmware map, and firmware file under **Pack files**, and leave a field empty when that file is not needed.
The format of each YAML file is in [Custom Component files](../../Developing_with_Profinity/Custom_Components/Files.md).
Set the main script and **Auto Start Main Script** under **Scripts**, as described in [Main script](../../Developing_with_Profinity/Custom_Components/Main_Script.md).

A component installed from a content pack hides **Pack files** and **Scripts**, because those files belong to the pack.
It shows **Name**, **Tag tree path**, menu placement, and the fields declared in the pack's settings map.

## Optional capabilities

A Custom Component can have a DBC file, a dashboard, or both.
Each is optional and uploaded under **Pack files**.
A DBC file adds **Messages and Signals** and **Edit DBC File** to the component menu, and the dashboard is the component's page.
Refer to [DBC, dashboard, and rules](../../Developing_with_Profinity/Custom_Components/DBC_Dashboard_and_Rules.md) for both, and to [How to create a custom dashboard](../../How_To_Guides/Create_Custom_Dashboard.md) to build the dashboard.

Live values that a script publishes are tags, and a dashboard binds those tags regardless of whether a DBC file is present.

## Check the component

1. Confirm the component is in the side menu and opens its dashboard.
2. If you set a main script, connect it and confirm that the tags the script publishes update on the dashboard.
3. If you attached a DBC file, open **Messages and Signals** and confirm that the expected messages arrive.
   [How to replay CAN bus logs](../../How_To_Guides/Replay_CAN_Logs.md) shows how to supply recorded traffic while you check.

To install the component on other systems, refer to [Pack a Custom Component for other installations](Pack_a_Custom_Component.md).
