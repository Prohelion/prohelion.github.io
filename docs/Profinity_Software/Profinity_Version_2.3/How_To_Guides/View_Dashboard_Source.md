---
title: How to view dashboard source
description: "Open the YAML source of a component or profile dashboard in the dashboard editor, then copy it to learn from it or reuse it as a template."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to view dashboard source

Open the YAML source of an existing dashboard to learn from examples and modify them.
The [Quick Start Guide](../Getting_Started/Quick_Start.md) introduces the same task with the Example Profile.

Before you start, you need:

- Profinity V2 installed and running.
- Access to a dashboard (component or [profile](../Getting_Started/Profiles.md) dashboard).
- The **Modify dashboards** permission, which shows the pencil icon that opens the dashboard editor.

## Open a component dashboard's source

1. Select the [component](../Components/Custom_Components/Using_a_Custom_Component.md) in the sidebar.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar. This opens the dashboard editor in **DESIGN** mode.
3. Select the **YAML** tab to see the complete dashboard configuration.

## Open a profile dashboard's source

A profile dashboard replaces the standard home page when **Custom Home Dashboard** is enabled in the profile settings.
To find the setting, select **ADMIN** in the side menu, then **Profile**, and select the profile.
[How to Create a Profile Dashboard](./Create_Profile_Dashboard.md) describes enabling the option.

With the option enabled:

1. Go to the home page.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar.
3. Select the **YAML** tab.

## Copy and reuse a dashboard

1. In the **YAML** tab, select all of the YAML.
2. Copy it with Ctrl+C or Cmd+C.
3. Paste it into a text editor to save it, or paste it into a new dashboard, component, or profile to use it as a template.
4. Modify the pasted source to suit the new dashboard, then save it as the new dashboard.

Reading the YAML shows how components are organised, how data bindings are configured, how layout elements nest and how styling is applied.
Copying a simple dashboard first and adding complexity in small, tested changes keeps a faulty change easy to find.

For more, refer to the [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md), the [Motor Controller Dashboard Example](../Customising_Profinity/Dashboards/Motor_Controller_Dashboard_Example.md) and the [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md).
