---
title: DBC, dashboard, and rules
description: "Attach a DBC file, a dashboard, and a rules file to a Custom Component, and bind the dashboard to its tags."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# DBC, dashboard, and rules

These three files are optional on a [Custom Component](index.md).
The DBC file decodes CAN traffic, the dashboard is the component page, and the rules file raises alerts from the component's tags.
Which upload field holds each file is on [Custom Component files](Files.md).

## DBC file

Use **Upload DBC File (Optional)** when the device's CAN traffic should appear as Messages and Signals, or when the dashboard binds signals from that database.
The component runs with the field left empty.
**Rebase DBC** and **Rebase Address** shift the loaded message identifiers onto the base address the device actually uses.

**Edit DBC File** opens the DBC editor once a file is set.
A saved change is picked up automatically.
The viewer is documented in [CAN bus DBC](../../CAN_Utilities/CAN_Bus_DBC.md).

## Dashboard

The dashboard YAML is the component's page.
Profinity writes a starter file, named after the component, when **Upload Dashboard (Optional)** is left empty.
The dashboard editor replaces that starter.
Layout, elements, and the visual editor are in the [Profinity dashboard development guide](../../Customising_Profinity/Dashboards/index.md).

A binding that reads a CAN signal uses the DBC names.
A binding that reads a value the [main script](Main_Script.md) published uses a tag path.
A relative path has no leading `/`.
Profinity resolves it against the component's place in the tag tree, so the binding follows the component if **Tag tree path** changes.
An absolute path begins with `/` and names some other place in the tree.
Use a relative path in place of the `{COMPONENT_NAME}` placeholder.
Refer to [Data binding](../../Customising_Profinity/Dashboards/Data_Binding/index.md) and [Tag tree paths and dashboard binds](../../Tags/Selecting_Tags/Tag_Tree_Path.md).

## Rules

**Rules YAML file** is an optional [Tag rules](../../Tags/Rules/index.md) document for this component.
Profinity evaluates it when this component's tags change.
Alerts raised from those rules appear in [Alerts Log](../../Tags/Alerts.md).

Menu actions in `actions.yaml` are a separate mechanism from rule actions.
Refer to [Menu actions](Menu_Actions.md).
