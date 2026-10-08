---
title: Component Reference
description: "Reference for the dashboard components in three categories: layout, data display, and interactive."
---

# Component Reference

This reference describes the dashboard components available in Profinity, in three categories: Layout Components that structure a dashboard, Data Components that display and visualise data from the Controller Area Network (CAN) bus and system properties, and Interactive Components that provide interaction and control.

## How to Use This Reference

In the [visual editor](../Visual_Editor.md) you add these components with **Add** and set the parameters below in the **Inspector**. The YAML examples on each page show the same component as it appears in the editor's **YAML** tab.

Each component page opens with one sentence that defines the component, followed by a **When to Use** section that says when to choose the component and when to choose another, a **Parameters** section, an **Example** section and, where a page has further guidance, a **Notes** section. Pages for components with overlay elements, such as [Image](Interactive/Image.md) and [Model](Interactive/Model.md), add a section for each overlay type between **Parameters** and **Example**.

The **Parameters** tables list every parameter that Profinity accepts on a component, with its type, whether it is required, its default value and a description that includes the allowed values. A parameter that the web interface ignores is marked **Not used by the web interface** and can be omitted. Dashboards that contain a parameter a page does not list are rejected when they are saved. The `bind` parameter takes an array of binding objects on every component that lists it, and the [Data Binding](../Data_Binding.md) page describes the binding properties and the targets that each component handles.

## Component Categories

### Layout Components

| Component | Description |
|-----------|-------------|
| [Row](Layout/Row.md) | Basic layout container |
| [Group](Layout/Group.md) | Container for related components |
| [Panels](Layout/Panels.md) | Grid of panels |
| [Panel](Layout/Panel.md) | Titled panel within a grid |
| [Pill](Layout/Pill.md) | Status pill with grouped readouts and an icon |
| [Accordion](Layout/Accordion.md) | Collapsible content sections |
| [Titlebar](Layout/Titlebar.md) | Dashboard header with a status lamp and menu toolbar |
| [Footer](Layout/Footer.md) | Dashboard footer bar |
| [Menu](Layout/Menu.md) | Menu structure used by the titlebar and side menu, with menu items, submenus, logos, toggles, dialogs and actions |

### Data Components

| Component | Description |
|-----------|-------------|
| [Lamps](Data/Lamps.md) | Grid of status indicators |
| [Lamp](Data/Lamp.md) | Single status indicator |
| [Readouts](Data/Readouts.md) | Numerical and text displays |
| [Charts](Data/Charts.md) | Data visualisation |
| [State](Data/State.md) | State machine diagram |
| [Tables](Data/Tables.md) | Tabular data display |
| [Caption](Data/Caption.md) | Bound text caption |
| [Log](Data/Log.md) | Scrolling engine and script log |

### Interactive Components

| Component | Description |
|-----------|-------------|
| [Tabs](Interactive/Tabs.md) | Tabbed views |
| [Actions](Interactive/Actions.md) | Buttons and icons that run actions |
| [Toggles](Interactive/Toggles.md) | On/off switches |
| [Charge](Interactive/Charge.md) | Charger and power supply controller |
| [Icon](Interactive/Icon.md) | Single icon |
| [HTML](Interactive/HTML.md) | Custom HTML content or a map that follows a position |
| [Image](Interactive/Image.md) | Image with regions, icons, buttons and data values |
| [Model](Interactive/Model.md) | 3D model with regions, icons, buttons and data values |
| [Redirect](Interactive/Redirect.md) | Immediate navigation to another location |

## Nesting Rules

Some components accept only particular components in their `items`. A [Panels](Layout/Panels.md) component holds `panel` entries, and a [Panel](Layout/Panel.md) holds a chart, lamps, state, group, readouts, table, HTML, redirect or caption component, so any other component goes inside a `group`. A [Tab](Interactive/Tabs.md) holds `panels` entries in its `items`, and an [Accordion](Layout/Accordion.md) holds `row` entries.

## Next Steps

Read [Data Binding](../Data_Binding.md) to connect components to data, [Core Elements](../Core_Elements.md) for the structure of a dashboard, [Conditional Styling](../Conditional_Styling.md) for dynamic visual effects, and [Examples](../Examples.md) for complete dashboards.
