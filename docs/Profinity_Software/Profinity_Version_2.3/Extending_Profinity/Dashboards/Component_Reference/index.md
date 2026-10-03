---
title: Component Reference
description: "Reference for the dashboard component categories: layout, data display, and interactive components."
---

# Component Reference

This reference describes the dashboard components available in Profinity. Components are organised into three categories: **Layout Components**, **Data Components**, and **Interactive Components**.

## How to Use This Reference

- **Layout Components** - Containers and structural elements for organising a dashboard
- **Data Components** - Display and visualise data from the CAN bus and system properties
- **Interactive Components** - User interface elements for interaction and control

Each component page follows the same order:

- **Description** - What the component does, followed by a **Best for** summary and, where relevant, a **When not to use** note
- **Parameters** - Every configuration option in a table of parameter, type and description, where the type column states whether the parameter is required or optional
- **Example** - YAML showing the component in use

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

### Data Components
Display and visualise information:

| Component | Description |
|-----------|-------------|
| [Lamps](Data/Lamps.md) | Status indicators |
| [Readouts](Data/Readouts.md) | Numerical and text displays |
| [Charts](Data/Charts.md) | Data visualisation |
| [Tables](Data/Tables.md) | Tabular data display |
| [State](Data/State.md) | State machine visualisation |

### Interactive Components
User interface and control elements:

| Component | Description |
|-----------|-------------|
| [Tabs](Interactive/Tabs.md) | Tabbed interface |
| [Actions](Interactive/Actions.md) | Buttons and controls |
| [Toggles](Interactive/Toggles.md) | Switch components |
| [Icon](Interactive/Icon.md) | Icon display component |
| [HTML](Interactive/HTML.md) | HTML content display |
| [Image](Interactive/Image.md) | Interactive image with regions, icons, and data values |

## Next Steps

The following pages cover how components connect to data and how dashboards are structured and styled:

- Learn about [Data Binding](../Data_Binding.md) to connect components to data
- Explore [Core Elements](../Core_Elements.md) to understand dashboard structure
- See [Conditional Styling](../Conditional_Styling.md) for dynamic visual effects
- Review [Examples](../Examples.md) for complete dashboard implementations
