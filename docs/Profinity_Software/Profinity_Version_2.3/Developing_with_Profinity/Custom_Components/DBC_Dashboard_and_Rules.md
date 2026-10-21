---
title: DBC, dashboard, and rules
description: "Attach a DBC file, a dashboard, and a rules file to a Custom Component, and bind the dashboard to its tags."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# DBC, dashboard, and rules

A [Custom Component](index.md) can decode CAN traffic, show a page, and raise alerts from its tags, using an optional CAN database (DBC) file, dashboard, and rules file.
Which upload field holds each file is on [Custom Component files](Files.md).

## DBC file

With a DBC file, the component menu includes **Messages and Signals** and **Edit DBC File**.
The device's CAN traffic can then be read as named messages and signals, and the dashboard can bind those signals.
The component runs with **Upload DBC File (Optional)** left empty.
**Rebase DBC** and **Rebase Address** shift the loaded message identifiers onto the base address the device actually uses.
**Edit DBC File** opens the DBC editor once a file is set, and a saved change is picked up automatically.
The viewer is documented in [CAN bus DBC](../../CAN_Utilities/CAN_Bus_DBC.md).

## Dashboard

The dashboard YAML is the page the user opens.
When **Upload Dashboard (Optional)** is left empty, Profinity writes a starter file named after the component, and the dashboard editor then replaces it.
Layout, elements, and the visual editor are in the [Profinity dashboard development guide](../../Customising_Profinity/Dashboards/index.md).

A binding that reads a CAN signal uses the DBC names, and a binding that reads a value the [main script](Main_Script.md) published uses a tag path.
A relative path has no leading `/`.
Profinity resolves it against the component's place in the tag tree, so the binding follows the component if **Tag tree path** changes.
An absolute path begins with `/` and names some other place in the tree.
Use a relative path in place of the `{COMPONENT_NAME}` placeholder.
Refer to [Data binding](../../Customising_Profinity/Dashboards/Data_Binding/index.md) and [Tag tree paths and dashboard binds](../../Tags/Selecting_Tags/Tag_Tree_Path.md).

## Rules

**Rules YAML file** is an optional [Tag rules](../../Tags/Rules/index.md) document for this component, evaluated when this component's tags change, and alerts raised from those rules appear in [Alerts Log](../../Tags/Alerts.md).
A tag rule can also run an action when a condition fires, which is not a menu action: menu entries are declared in `actions.yaml`.
Refer to [Menu actions](Menu_Actions.md).
