---
title: Component Reference
---

# Component Reference

This reference provides detailed information about all available dashboard components in Profinity. Components are organized into three main categories: **Layout Components**, **Data Components**, and **Interactive Components**.

## How to Use This Reference

- **Layout Components** - Containers and structural elements for organizing your dashboard
- **Data Components** - Display and visualize data from your CAN bus and system properties
- **Interactive Components** - User interface elements for interaction and control

Each component entry includes:
- **Description** - What the component does and when to use it
- **Parameters** - All available configuration options in table format
- **Example** - Working YAML code showing the component in action

## Component Categories

### Layout Components
Essential building blocks for dashboard structure:

| Component | Description |
|-----------|-------------|
| [Row](Layout/Row.md) | Basic layout container |
| [Group](Layout/Group.md) | Organizes related components |
| [Panels](Layout/Panels.md) | Grid layout system |
| [Panel](Layout/Panel.md) | Individual panel within a grid |
| [Pill](Layout/Pill.md) | Status pill component with grouped readouts and icon |
| [Accordion](Layout/Accordion.md) | Collapsible content sections |
| [Titlebar](Layout/Titlebar.md) | Dashboard header |
| [Footer](Layout/Footer.md) | Dashboard footer |

### Data Components
Display and visualize information:

| Component | Description |
|-----------|-------------|
| [Lamps](Data/Lamps.md) | Status indicators |
| [Readouts](Data/Readouts.md) | Numerical and text displays |
| [Charts](Data/Charts.md) | Data visualization |
| [Tables](Data/Tables.md) | Tabular data display |
| [State](Data/State.md) | State machine visualization |

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

Now that you understand the available components, you can:
- Learn about [Data Binding](../Data_Binding.md) to connect components to your data
- Explore [Core Elements](../Core_Elements.md) to understand dashboard structure
- See [Conditional Styling](../Conditional_Styling.md) for dynamic visual effects
- Review [Examples](../Examples.md) for complete dashboard implementations
