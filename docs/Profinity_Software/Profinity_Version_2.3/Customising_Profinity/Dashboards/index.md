---
title: Profinity Dashboard Development Guide
description: "Guide to building dynamic, data-driven dashboards in Profinity 2.3 with the visual editor, and to the dashboard YAML format behind them."
---

# Profinity Dashboard Development Guide

The Profinity Dashboard system creates dynamic, data-driven user interfaces. In Profinity 2.3 you build and change dashboards in the **[visual editor](./Visual_Editor.md)**, where you add widgets, arrange them and bind them to tags without writing YAML. Behind the editor, every dashboard is stored as a YAML file, and the **YAML** tab of the editor gives you direct access to it as a fallback. This guide explains the YAML structure, how to configure components, and how to implement data bindings.

<figure markdown>
![Dashboard visual editor canvas and component tree](../../images/2.3-dashboard-visual-editor.png)
<figcaption>Dashboard visual editor</figcaption>
</figure>

!!! tip "Start in the visual editor"
    Build dashboards in the [Dashboard Visual Editor](./Visual_Editor.md) first, and use the YAML tab for anything the visual editor does not cover. Dashboards written in YAML before 2.3 keep working and open in the visual editor. To build your first dashboard step by step, see [How to Create a Custom Dashboard](../../How_To_Guides/Create_Custom_Dashboard.md).

## Prerequisites

Before creating dashboards, you need:

- The `DashboardModify` permission, which allows dashboards to be edited
- A basic understanding of YAML syntax (only needed when you use the YAML tab or read the examples in this guide)
- Familiarity with the [Tag Explorer](../../Tags/index.md), because every dashboard value is bound to a tag
- Knowledge of CAN bus communication and the DBC messages and signals your device produces, if you are building a Custom Component that publishes CAN tags

## Getting Started

Profinity dashboards can be used in two main contexts:

### Custom Components

A Custom Component dashboard is that component's page in the profile. Profinity writes a starter dashboard named after the component when none is uploaded, and the dashboard editor replaces it. A DBC file is optional, and is only required when the component needs to publish CAN signals as tags. Adding the component is [How to Create a Custom Component](../../How_To_Guides/Create_Custom_Component.md), and the files around the dashboard (scripts, actions, maps) are in [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md).

### Profile Dashboards

Dashboards can also be used as profile-level home pages that replace the standard home page. To create a Profile Dashboard:

1. **Turn on the "Custom Home Dashboard" option** in the Profile settings and save. Profinity creates a starter dashboard
2. **Edit the dashboard in the visual editor** with the **Edit Dashboard** icon on the home page (or upload a YAML file in the "Dashboard YAML file (Optional)" field if you already have one)
3. **The dashboard will replace the standard home page** when the profile is active

For more information on Profile Dashboards, see the [Profile Dashboard](../../Administration/Profile_Dashboard.md) documentation.

## Your First Dashboard: "Hello World"

A component that has no dashboard of its own starts from a template sample, which is the "Hello World" starting point used in this guide. In the dashboard editor, the **NEW FROM TEMPLATE** button replaces the YAML with this template at any time, after a confirmation prompt. This template provides a simple starting point for creating your dashboard.

!!! info "The YAML behind the visual editor"
    In the visual editor this template appears as a tree of rows, groups, pills and values, and you add a binding by selecting a value and using the **Binding** section of the inspector. The YAML shown below is what the **YAML** tab displays for the same dashboard. Use it to understand the format, or to edit it directly.

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

The `bind` section connects the value to a tag. A source that starts with `DBC/` is the tag of a CAN signal of the component that owns the dashboard (see [Data Binding](./Data_Binding.md#binding-source-paths)), so replace `YourMessage` and `YourSignal` with the message and signal names from your DBC file, or copy the path of the tag you want from the Tag Explorer.

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

1. [Dashboard Visual Editor](./Visual_Editor.md) is the main way to build dashboards in 2.3: adding widgets, arranging them and binding tags, with YAML as the fallback
2. [Core Elements](./Core_Elements.md) explains the structure of a Profinity dashboard and the basics of building one
3. [Profile Directories](./Profile_Directories.md) explains how to organise and reference images, stylesheets, and content files for your dashboards
4. [Data Binding](./Data_Binding.md) describes how to bind information from the Profinity system to your dashboard
5. [Component Reference](./Component_Reference/index.md) provides reference information on each of the components you can include in your dashboard
6. [Conditional Styling](./Conditional_Styling.md) explains how to hide and show elements or change colour based on data
7. [Examples](./Examples.md) contains progressive examples, real-world scenarios, component-specific examples, and the complete motor controller dashboard, which is analysed section by section in [Full Example](./Full_Example.md)
8. [Troubleshooting](./Troubleshooting.md) covers schema validation errors, data binding issues, and common mistakes
9. [FAQ](./FAQ.md) gives quick answers to frequently asked questions