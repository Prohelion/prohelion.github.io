---
title: Profinity Dashboard Development Guide
---

# Profinity Dashboard Development Guide

The Profinity Dashboard system allows you to create dynamic, data-driven user interfaces using YAML configuration files. This guide will help you understand how to structure your dashboard, configure components, and implement data bindings.

!!! tip "CUSTOM DASHBOARDS ARE NEW"
    This feature is a new release that we are providing in Early Adopter form to our V2 Profinity clients. If you are having any issues, please let us know either via the feedback form or support system.

## Prerequisites

Before creating dashboards, you should have:

- Basic understanding of YAML syntax
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
2. **Upload the dashboard file** via Profile settings ("Upload Default Dashboard" option)
3. **The dashboard will replace the standard home page** when the profile is active

For more information on Profile Dashboards, see the [Profile Dashboard](../../Administration/Profile_Dashboard.md) documentation.

## Your First Dashboard: "Hello World"

When you open the dashboard editor, you'll see a template sample already loaded. You can also click the **"New Template"** button at any time to reset to the Hello World template. This template provides a simple starting point for creating your dashboard.

### The Hello World Template

The template that loads when you click "New Template" or when you first open the editor looks like this:

``` yaml
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
                            image: nav_custom_active.svg
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM COMPONENT
```

This template creates a simple dashboard with:
- A **row** container (vertical layout)
- A **group** with styling (`statscontainer` class)
- A **pill** component with an icon
- A **value** readout showing "CUSTOM COMPONENT"

This is your starting point! You can modify this template to add your own components and data bindings.

### Modifying the Template

Starting from the Hello World template, let's add a data binding to connect it to real component data. Here's how you can modify the template to show actual data:

``` yaml
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
                            image: nav_custom_active.svg
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM COMPONENT
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.YourSignal.YourValue'
```

The `bind` section connects the value to live data from your component. Replace `{COMPONENT_NAME}` with your actual component name (this is automatically replaced by the system), and `YourSignal.YourValue` with the actual signal path from your DBC file.

### Adding More Components

You can expand the template by adding more components. For example, to add multiple readouts:

``` yaml
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
                            image: nav_custom_active.svg
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: TEMPERATURE
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.Temperature.Value'
                            - value:
                                label: PRESSURE
                                precision: 2
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.Pressure.Value'
```

### What You've Learned

Congratulations! You've started working with dashboards. You now know:

- ✅ The Hello World template structure that loads when you click "New Template"
- ✅ How to modify the template to add your own components
- ✅ How to add data bindings to connect dashboards to real component data
- ✅ How to expand the template with additional components

### Next Steps

Now that you've created your first dashboard, you're ready to learn more:

1. **[Core Elements](./Core_Elements.md)** - Learn about the four core dashboard elements and how to structure more complex layouts
2. **[Data Binding](./Data_Binding.md)** - Master connecting your dashboard to real-time data from your components
3. **[Examples](./Examples.md)** - See more examples from simple to complex
4. **[Component Reference](./Component_Reference/index.md)** - Explore all available components you can use in your dashboards

## Schema Validation

The dashboard editor uses a schema to validate your YAML dashboard file. The editor provides:

- **Syntax highlighting and auto-complete** for better development experience
- **Real-time validation errors** to catch issues immediately
- **Schema compliance checking** - invalid dashboards cannot be loaded
- **Save protection** - prevents invalid configurations from being saved

This ensures that your dashboard configurations are always valid and will work correctly when deployed.

## Viewing Dashboard Source

All the dashboards in Profinity are built using this dashboard system. Sometimes the best way to learn is to use our examples as a basis. To enable that, you can access the source YAML definition of any existing dashboard, by clicking on the small pencil icon on the top right on the toolbar if you have the security setting to change settings in Profinity.


## Recommended Reading

For additional information we would recommend you read these other parts of the documentation in this order.

1. [Core Elements](./Core_Elements.md) provides information on the structure of a Profinity Dashboard and the basics on how to create one
2. [Profile Directories](./Profile_Directories.md) explains how to organize and reference images, stylesheets, and content files for your dashboards
3. [Data Binding](./Data_Binding.md) describes how to bind information from the Profinity system to your dashboard easily.
4. [Component Reference](./Component_Reference/index.md) reference information on each of the components you can include in your dashboard
5. [Conditional Styling](./Conditional_Styling.md) how to make your dashboard style change to hide and show elements or change colour based on data.
6. [Examples](./Examples.md) complete examples including full dashboard examples, real-world scenarios, and progressive examples.
7. [Troubleshooting](./Troubleshooting.md) comprehensive troubleshooting guide including schema validation errors and common issues.
8. [FAQ](./FAQ.md) frequently asked questions and quick answers.