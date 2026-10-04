---
title: Profinity Dashboard Development Guide
description: "Complete guide to creating dynamic, data-driven dashboard user interfaces using YAML configuration."
---

# Profinity Dashboard Development Guide

The Profinity Dashboard system creates dynamic, data-driven user interfaces from YAML configuration files. This guide explains how to structure a dashboard, configure components, and implement data bindings.

!!! tip "Custom Dashboards"
    Dashboards support editable visual layout in 2.3. See the [Dashboard Visual Editor](./Visual_Editor.md) for the authoring UI; this guide covers YAML structure and data binding.

## Prerequisites

Before creating dashboards, you need:

- A basic understanding of YAML syntax
- Knowledge of CAN bus communication (for DBC files when using Custom Components)
- An understanding of the DBC Messages and Signals produced by your device (when using Custom Components)

## Getting Started

Profinity dashboards can be used in two main contexts:

### Custom Components

Dashboards are used with Custom Components to create component-specific interfaces. To create a dashboard for a Custom Component:

1. **Create a new Custom Component** in the Profinity system
2. **Define your CAN messages and signals** in the DBC editor or load an existing DBC file
3. **Create your dashboard layout** in the YAML editor or load an existing dashboard
4. **Validate your configuration** - the system will check against the schema
5. **Deploy your dashboard** - once valid, your dashboard will be available for use

For more information on Custom Components, see the [Custom Components](../Custom_Components/index.md) documentation.

### Profile Dashboards

Dashboards can also be used as profile-level home pages that replace the standard home page. To create a Profile Dashboard:

1. **Create your dashboard layout** in a YAML file
2. **Upload the dashboard file** via Profile settings, by turning on the "Custom Home Dashboard" option and choosing the file in the "Dashboard YAML file (Optional)" field
3. **The dashboard will replace the standard home page** when the profile is active

For more information on Profile Dashboards, see the [Profile Dashboard](../../Administration/Profile_Dashboard.md) documentation.

## Your First Dashboard: "Hello World"

A component that has no dashboard of its own starts from a template sample, which is the "Hello World" starting point used in this guide. In the dashboard editor, the **NEW FROM TEMPLATE** button replaces the YAML with this template at any time, after a confirmation prompt. This template provides a simple starting point for creating your dashboard.

### The Hello World Template

The template that loads when you select **NEW FROM TEMPLATE**, or that a new custom component starts with, is the following file shipped with Profinity (a component can supply its own template, in which case that template loads instead):

``` yaml
version: "2.3"
dashboard:
    items:
        - row:
            direction: vertical
            items:
            - group:
                class: statscontainer
                items:
                    - pill:
                        icon:
                            image: IbmWatsonKnowledgeStudio
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM DASHBOARD
                            - value:
                                label: For more information on how to configure dashboard files, see the Profinity documentation at https://docs.prohelion.com
```

This template creates a simple dashboard with:

- A **version** declaration (`version: "2.3"`)
- A **row** container (vertical layout)
- A **group** with styling (`statscontainer` class)
- A **pill** component with an icon
- A **value** readout showing "CUSTOM DASHBOARD", and a second value that points to the documentation

This is your starting point. You can modify this template to add your own components and data bindings.

### Modifying the Template

Adding a data binding to the Hello World template connects it to real component data, as in the following modified template:

``` yaml
version: "2.3"
dashboard:
    items:
        - row:
            direction: vertical
            items:
            - group:
                class: statscontainer
                items:
                    - pill:
                        icon:
                            image: IbmWatsonKnowledgeStudio
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM DASHBOARD
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/YourMessage/YourSignal
```

The `bind` section connects the value to live data from your component. A source that starts with `DBC/` is relative to the component that owns the dashboard (see [Data Binding](./Data_Binding.md#binding-source-paths)), so replace `YourMessage` and `YourSignal` with the message and signal names from your DBC file.

### Adding More Components

You can expand the template by adding more components. For example, to add multiple readouts:

``` yaml
version: "2.3"
dashboard:
    items:
        - row:
            direction: vertical
            items:
            - group:
                class: statscontainer
                items:
                    - pill:
                        icon:
                            image: IbmWatsonKnowledgeStudio
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: TEMPERATURE
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/Temperature/Value
                            - value:
                                label: PRESSURE
                                precision: 2
                                bind:
                                  - target: value
                                    source: DBC/Pressure/Value
```

### What You Have Learned

You have started working with dashboards. You now know:

- The Hello World template structure that loads from **NEW FROM TEMPLATE**
- How to modify the template to add your own components
- How to add data bindings to connect dashboards to real component data
- How to expand the template with additional components

### Next Steps

The following pages cover each part of dashboard development in more detail:

1. **[Core Elements](./Core_Elements.md)** - Describes the four core dashboard elements and how to structure more complex layouts
2. **[Data Binding](./Data_Binding.md)** - Explains how to connect a dashboard to real-time data from your components
3. **[Examples](./Examples.md)** - Progressive examples from simple to complex, including the full motor controller dashboard
4. **[Component Reference](./Component_Reference/index.md)** - Reference for every component available in a dashboard

## Schema Validation

The dashboard editor uses a schema to validate your YAML dashboard file. The editor provides:

- **Syntax highlighting and auto-complete** while editing
- **Real-time validation errors** as soon as an issue is introduced, listed as schema validation issues in the visual editor
- **Save protection** - the visual editor refuses to save a dashboard that has schema validation issues, and the server rejects an invalid dashboard that is submitted through the API

Because saving is blocked while schema validation issues remain, a dashboard saved from the editor conforms to the schema.

## Viewing Dashboard Source

All of the dashboards in Profinity are built using this dashboard system, so the source YAML of any existing dashboard is a useful starting point alongside the examples in this guide. Users with the `DashboardModify` security permission can open it by selecting the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, and the steps are described in [How to View Dashboard Source](../../How_To_Guides/View_Dashboard_Source.md).

## Recommended Reading

Read these other parts of the documentation in this order:

1. [Dashboard Visual Editor](./Visual_Editor.md) covers the editable layout and bind inspector added in 2.3
2. [Core Elements](./Core_Elements.md) explains the structure of a Profinity dashboard and the basics of building one
3. [Profile Directories](./Profile_Directories.md) explains how to organise and reference images, stylesheets, and content files for your dashboards
4. [Data Binding](./Data_Binding.md) describes how to bind information from the Profinity system to your dashboard
5. [Component Reference](./Component_Reference/index.md) provides reference information on each of the components you can include in your dashboard
6. [Conditional Styling](./Conditional_Styling.md) explains how to hide and show elements or change colour based on data
7. [Examples](./Examples.md) contains progressive examples, real-world scenarios, component-specific examples, and the complete motor controller dashboard, which is analysed section by section in [Full Example](./Example.md)
8. [Troubleshooting](./Troubleshooting.md) covers schema validation errors, data binding issues, and common mistakes
9. [FAQ](./FAQ.md) gives quick answers to frequently asked questions