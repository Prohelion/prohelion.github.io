---
title: Component Reference
description: "Reference for the dashboard component categories: layout, data display, and interactive components."
---

# Component Reference

This reference describes the dashboard components available in Profinity. Components are organised into three categories: **Layout Components**, **Data Components**, and **Interactive Components**.

## How to Use This Reference

In the [visual editor](../Visual_Editor.md) you add these components with **Add** and set the parameters below in the **Inspector**. The YAML examples on each page show the same component as it appears in the editor's **YAML** tab.

- **Layout Components** - Containers and structural elements for organising a dashboard
- **Data Components** - Display and visualise data from the CAN bus and system properties
- **Interactive Components** - User interface elements for interaction and control

Each component page follows the same order:

- **Description** - What the component does, followed by a **Best for** summary and, where relevant, a **When not to use** note
- **Parameters** - Every configuration option defined by the dashboard schema, in a table of parameter, type, whether the parameter is required, its default value and a description that includes the allowed values
- **Example** - YAML showing the component in use

The parameter tables follow the dashboard schema (`ui.schema.json`) that ships with Profinity and that the web interface validates dashboards against when they are saved. A parameter that the schema defines but that the web interface ignores is marked **Not used by the web interface** in its description, and it is safe to omit. A parameter that is not listed on a page is not defined by the schema, and the schema rejects it when the dashboard is saved. The `bind` parameter takes an array of binding objects on every component that lists it, and the [Data Binding](../Data_Binding.md) page describes the binding properties and the targets that each component handles.

## Component Categories

### Layout Components
Building blocks for dashboard structure:

| Component | Description |
|-----------|-------------|
| [Row](Layout/Row.md) | Basic layout container |
| [Group](Layout/Group.md) | Organises related components |
| [Panels](Layout/Panels.md) | Grid layout system |
| [Panel](Layout/Panel.md) | Individual panel within a grid |
| [Pill](Layout/Pill.md) | Status pill component with grouped readouts and icon |
| [Accordion](Layout/Accordion.md) | Collapsible content sections |
| [Titlebar](Layout/Titlebar.md) | Dashboard header |
| [Footer](Layout/Footer.md) | Dashboard footer |
| [Menu](Layout/Menu.md) | Menu structure used by the titlebar, panel and footer, including menu items, submenus, logos, toggles and actions |

### Data Components
Display and visualise information:

| Component | Description |
|-----------|-------------|
| [Lamps](Data/Lamps.md) | Grid of status indicators |
| [Lamp](Data/Lamp.md) | Single status indicator |
| [Readouts](Data/Readouts.md) | Numerical and text displays |
| [Charts](Data/Charts.md) | Data visualisation |
| [State](Data/State.md) | State machine visualisation |
| [Tables](Data/Tables.md) | Tabular data display |
| [Caption](Data/Caption.md) | Bound text caption |
| [Log](Data/Log.md) | Scrolling engine and script log |

### Interactive Components
User interface and control elements:

| Component | Description |
|-----------|-------------|
| [Tabs](Interactive/Tabs.md) | Tabbed interface |
| [Actions](Interactive/Actions.md) | Buttons and controls |
| [Toggles](Interactive/Toggles.md) | Switch components |
| [Icon](Interactive/Icon.md) | Icon display component |
| [HTML](Interactive/HTML.md) | HTML content display |
| [Image](Interactive/Image.md) | Interactive image with regions, icons, buttons, and data values |
| [Model](Interactive/Model.md) | Interactive 3D model with regions, icons, buttons, and data values |
| [Redirect](Interactive/Redirect.md) | Immediate navigation to another location |

## Next Steps

The following pages cover how components connect to data and how dashboards are structured and styled:

- Learn about [Data Binding](../Data_Binding.md) to connect components to data
- Explore [Core Elements](../Core_Elements.md) to understand dashboard structure
- See [Conditional Styling](../Conditional_Styling.md) for dynamic visual effects
- Review [Examples](../Examples.md) for complete dashboard implementations
