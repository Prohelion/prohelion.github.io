---
title: Profinity Dashboard Development Guide
---

# Overview

The Profinity Dashboard system allows you to create dynamic, data-driven user interfaces using YAML configuration files. This guide will help you understand how to structure your dashboard, configure components, and implement data bindings.

!!! tip "CUSTOM DASHBOARDS ARE NEW"
    This feature is a new release that we are providing in Early Adopter form to our V2 Profinity clients. If you are having any issues, please let us know either via the feedback form or support system.

## Prerequisites

Before creating custom dashboards, you should have:
- Access to Profinity V2 system
- Basic understanding of YAML syntax
- Knowledge of CAN bus communication (for DBC files)
- Familiarity with the Profinity Custom Component system

## Getting Started

To create a custom dashboard, follow these steps:

1. **Create a new Custom Component** in the Profinity system
2. **Define your CAN messages and signals** in the DBC editor or load an existing DBC file
3. **Create your dashboard layout** in the YAML editor or load an existing dashboard
4. **Validate your configuration** - the system will check against the schema
5. **Deploy your dashboard** - once valid, your dashboard will be available for use

## Understanding the Components

A **Profinity Custom Component** consists of two essential files:

### DBC File
- Defines the CAN bus messages and signals that your component will use
- Accessed through the **DBC Editor** in the Custom Component editor
- Required for data communication between your dashboard and the CAN network

### YAML File
- Defines the dashboard layout and component bindings
- Accessed through the **Dashboard Editor** in the Custom Component editor
- If you don't provide a dashboard, Profinity will provide a default one

The Custom Component editor provides dedicated editors for both files, accessible by clicking the editor icon on the toolbar.

## Schema Validation

The dashboard editor uses a schema to validate your YAML dashboard file. The editor provides:

- **Syntax highlighting and auto-complete** for better development experience
- **Real-time validation errors** to catch issues immediately
- **Schema compliance checking** - invalid dashboards cannot be loaded
- **Save protection** - prevents invalid configurations from being saved

This ensures that your dashboard configurations are always valid and will work correctly when deployed.

## Viewing Dashboard Source

To inspect the YAML source of an existing dashboard, add the `source` parameter to the component URL:

```
http://localhost:3000/component?componentId=Prohelion%20BMU&source
```

This displays the raw YAML configuration, allowing you to:

- Copy and modify existing dashboards
- Learn from existing implementations
- Debug dashboard configurations
- Create templates based on working examples

The source view shows the complete YAML structure including all bindings, components, and layout configurations.

## Recommended Reading

For additional information we would recommend you read these other parts of the documentation in this order.

1. [Core Elements](./Core_Elements.md) provides information on the structure of a Profinity Dashboard and the basics on how to create one
2. [Data Binding](./Data_Binding.md) describes how to bind information from the Profinity system to your dashboard easily.
3. [Component Reference](./Component_Reference.md) reference information on each of the components you can include in your dashboard
4. [Conditional Styling](./Conditional_Styling.md) how to make your dashboard style change to hide and show elements or change colour based on data.
5. [Example](./Example.md) an example of a full Profinity dashboard in YAML format.