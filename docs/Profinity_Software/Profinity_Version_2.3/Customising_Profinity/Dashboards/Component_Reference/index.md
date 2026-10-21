---
title: Component reference
description: "Reference for the dashboard components in four categories: layout, data display, content, and interactive."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Component reference

This reference describes the dashboard components available in Profinity.
The components fall into four categories:

- Layout components structure a dashboard.
- Data components display and visualise data from the Controller Area Network (CAN) bus and from system properties.
- Content components show fixed content or direct the user elsewhere.
- Interactive components provide interaction and control.

A fifth group, image and model components, is listed at the end of the component tables.

## How to use this reference

In the [Dashboard visual editor](../Visual_Editor.md), you add these components with **Add** and set their parameters in the **Inspector**.
The YAML examples on each page show the same component as it appears in the editor's **YAML** tab.

Each component page opens with a sentence that defines the component.
The page then says when to choose the component and when to choose another, lists its parameters, and gives an example.
Where a page has further guidance, it adds a section after the example.
The [Image](Images_and_Models/Image.md) and [3D model](Images_and_Models/Model.md) pages cover what differs between the two.
The overlay tables that they share are on [Overlay elements](Images_and_Models/Overlay_Elements.md).

The **Parameters** tables list every parameter that Profinity accepts on a component.
Each entry gives the type, whether the parameter is required, the default value and a description that includes the allowed values.
A parameter that the web interface ignores is marked **Not used by the web interface** and can be omitted.
A dashboard that contains a parameter the page does not list is rejected when it is saved.
The `bind` parameter takes an array of binding objects on every component that lists it.
The [Data binding](../Data_Binding/index.md) page describes the binding properties and the targets that each component handles.

## Component categories

### Layout components

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

### Data components

| Component | Description |
|-----------|-------------|
| [Lamps](Data/Lamps.md) | Grid of status indicators |
| [Lamp](Data/Lamp.md) | Single status indicator |
| [Readouts](Data/Readouts.md) | Numerical and text displays |
| [Charts](Data/Charts.md) | Data visualisation |
| [State](Data/State.md) | State machine diagram |
| [Tables](Data/Tables.md) | Tabular data display |
| [Caption](Data/Caption.md) | Bound text caption |

### Content components

| Component | Description |
|-----------|-------------|
| [Icon](Content/Icon.md) | Single icon |
| [HTML](Content/HTML.md) | Custom HTML content or a map that follows a position |
| [Redirect](Content/Redirect.md) | Immediate navigation to another location |

### Interactive components

| Component | Description |
|-----------|-------------|
| [Tabs](Interactive/Tabs.md) | Tabbed views |
| [Actions](Interactive/Actions.md) | Buttons and icons that run actions |
| [Toggles](Interactive/Toggles.md) | On/off switches |

### Image and model components

| Component | Description |
|-----------|-------------|
| [Image](Images_and_Models/Image.md) | Image with regions, icons, buttons, and data values |
| [3D model](Images_and_Models/Model.md) | 3D model with regions, icons, buttons, and data values |
| [Overlay elements](Images_and_Models/Overlay_Elements.md) | Action invocation, layers, icon sources, display types and annotation lines shared by both |

## Nesting rules

Some components accept only particular components in their `items`.
A [Panels](Layout/Panels.md) component holds `panel` entries, and a [Panel](Layout/Panel.md) holds a chart, lamps, state, group, readouts, table, HTML, redirect, or caption component, so any other component goes inside a `group`.
A [Tab](Interactive/Tabs.md) holds `panels` entries in its `items`, and an [Accordion](Layout/Accordion.md) holds `row` entries.

## Next steps

- [Data binding](../Data_Binding/index.md): connect components to data.
- [Core elements](../Core_Elements.md): the structure of a dashboard.
- [Conditional styling](../Data_Binding/Conditional_Styling.md): dynamic visual effects.
- [Motor controller dashboard example](../Motor_Controller_Dashboard_Example.md): a complete dashboard.
