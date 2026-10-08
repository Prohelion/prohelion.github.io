---
title: Profinity Dashboard Development Guide
description: "Guide to building data-driven dashboards in Profinity 2.3 with the visual editor, and to the dashboard YAML format behind them."
---

# Profinity Dashboard Development Guide

A Profinity dashboard is a user interface whose values come from Profinity tags. In Profinity 2.3 you build and change dashboards in the [visual editor](./Visual_Editor.md), where you add widgets, arrange them and bind them to tags without writing YAML. Every dashboard is stored as a YAML file, and the **YAML** tab of the editor gives direct access to it as a fallback. This guide explains the YAML structure, how to configure components, and how to implement data bindings.

<figure markdown>
![Dashboard visual editor canvas and component tree](../../images/2.3-dashboard-visual-editor.png)
<figcaption>Dashboard visual editor</figcaption>
</figure>

!!! tip "Start in the Visual Editor"
    Build dashboards in the visual editor first, and use the **YAML** tab for anything the visual editor does not cover. Dashboards written in YAML before Profinity 2.3 keep working and open in the visual editor. To build a first dashboard step by step, see [How to Create a Custom Dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).

## Prerequisites

Editing a dashboard needs the **Modify dashboards** permission, which an administrator grants in a role as described in [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md). Every dashboard value is bound to a tag, so familiarity with the [Tag Explorer](../../Tags/index.md) helps, and a basic understanding of YAML syntax is only needed when you use the **YAML** tab or read the examples in this guide. A Custom Component that publishes Controller Area Network (CAN) tags also needs the DBC (CAN database) messages and signals of the device it reads.

## Where Dashboards Are Used

A dashboard can be the page of a [Custom Component](../../Developing_with_Profinity/Custom_Components/index.md), the home page of a profile, or the content of a standalone [Dashboard Component](../../Components/Dashboard/index.md), and the editor, data binding and component reference in this guide apply to all three.

### Custom Components

A Custom Component dashboard is that component's page in the profile. Profinity writes a starter dashboard named after the component when none is uploaded, and the visual editor replaces it. A DBC file is optional, and is only required when the component needs to publish CAN signals as tags. Adding the component is described in [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md), and the files around the dashboard (scripts, actions, maps) are described in [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md).

### Profile Dashboards

A Profile Dashboard replaces the standard home page while its profile is active. To create one, turn on the **Custom Home Dashboard** option in the profile settings and save, which makes Profinity create a starter dashboard. Then select the **Edit Dashboard** icon on the home page to change it in the visual editor, or upload a YAML file in the **Dashboard YAML file (Optional)** field if a dashboard already exists. See [Profile Dashboard](../../Administration/Profile_Dashboard.md) for the full description.

### Dashboard Component

The [Dashboard Component](../../Components/Dashboard/index.md) is a built-in component that renders a YAML-only dashboard with no DBC file, so it binds to tags that already exist, such as tags published by other components. The Tag Explorer shows the path of each tag to bind, and [Binding Source Paths](./Data_Binding.md#binding-source-paths) describes the path forms.

## The Starter Template

A component that has no dashboard of its own starts from the Hello World template, which is a vertical row holding a styled group with one pill. The pill has an icon and two values, one labelled `CUSTOM DASHBOARD` and one that points to the Profinity documentation. In the visual editor the **NEW FROM TEMPLATE** button replaces the dashboard with this template at any time, after a confirmation prompt, and a component can supply its own template that loads instead. The YAML of the template is listed as [Example 0](./Examples.md#example-0-hello-world-template), and the progressive examples that follow it add bindings, lamps and charts one at a time.

In the visual editor the template appears as a tree of rows, groups, pills and values, and a binding is added by selecting a value and using the **Binding** section of the inspector. The **YAML** tab shows the same dashboard as text, which is the format the rest of this guide describes. A source such as `DBC/YourMessage/YourSignal` in a binding is the tag of a CAN signal of the component that owns the dashboard (see [Data Binding](./Data_Binding.md#binding-source-paths)), so replace the message and signal names with those from the DBC file, or copy the path of the tag from the Tag Explorer.

## Schema Validation

The visual editor validates the dashboard against the dashboard schema as it is edited, and lists each problem under **Schema validation issues**. The YAML tab provides syntax highlighting and auto-complete. **SAVE** is refused while any issue remains, and the server also rejects an invalid dashboard that is submitted through the API, so a saved dashboard conforms to the schema.

## Viewing Dashboard Source

Every dashboard in Profinity is built with this dashboard system, so the source YAML of an existing dashboard is a useful starting point alongside the examples in this guide. Users with the **Modify dashboards** permission can open it with the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, as described in [How to View Dashboard Source](../../How_To_Guides/View_Dashboard_Source.md).

## Where Next

- [Visual Editor](./Visual_Editor.md) is the main way to build dashboards, with YAML as the fallback.
- [Core Elements](./Core_Elements.md) explains the structure of a dashboard.
- [Data Binding](./Data_Binding.md) describes how to bind tags to components.
- [Component Reference](./Component_Reference/index.md) describes each component you can include.
- [Conditional Styling](./Conditional_Styling.md) shows how to hide and show elements or change colour based on data.
- [Profile Directories](./Profile_Directories.md) explains where images, stylesheets and content files go.
- [Examples](./Examples.md) holds progressive and component-specific examples, and [Full Example](./Full_Example.md) analyses a complete motor controller dashboard.
- [Troubleshooting](./Troubleshooting.md) and the [FAQ](./FAQ.md) cover validation errors, binding problems and common questions.
