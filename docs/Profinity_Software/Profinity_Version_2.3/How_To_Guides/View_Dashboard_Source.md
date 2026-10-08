---
title: How to View Dashboard Source
description: "Access the YAML source code of existing dashboards to learn from examples and create custom dashboard modifications."
---

# How to View Dashboard Source

Access the YAML source code of existing dashboards to learn from examples and modify them. The [Quick Start Guide](../Getting_Started/Quick_Start.md) introduces the same task with the Example Profile.

## Prerequisites

- Profinity V2 installed and running
- Access to a dashboard (component or [profile](../Getting_Started/Profiles.md) dashboard)
- The **Modify dashboards** permission, which shows the pencil icon that opens the dashboard editor

## Open a Component Dashboard's Source

Select the [component](../Components/Custom_Components/index.md) in the sidebar, then select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, which opens the dashboard editor in **DESIGN** mode, and select the **YAML** tab to see the complete dashboard configuration.

## Open a Profile Dashboard's Source

A profile dashboard replaces the standard home page when **Custom Home Dashboard** is enabled in the profile settings (select **ADMIN** in the side menu, then **Profile**, and select the profile). With it enabled, navigate to the home page, select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, and select the **YAML** tab. [How to Create a Profile Dashboard](./Create_Profile_Dashboard.md) describes enabling the option.

## Copy and Reuse a Dashboard

In the **YAML** tab, select all of the YAML, copy it with Ctrl+C or Cmd+C, and paste it into a text editor to save it, or paste it into a new dashboard, component or profile, to use it as a template. Modify the pasted source to suit the new dashboard, then save it as the new dashboard.

Reading the YAML shows how components are organised, how data bindings are configured, how layout elements nest and how styling is applied. Copying a simple dashboard first and adding complexity in small, tested changes keeps a faulty change easy to find.

## Related Documentation

- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - the full dashboard reference
- [Examples](../Customising_Profinity/Dashboards/Examples.md) - dashboard examples
- [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md) - component documentation
