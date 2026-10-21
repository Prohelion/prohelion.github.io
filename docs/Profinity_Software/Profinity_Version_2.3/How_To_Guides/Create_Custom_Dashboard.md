---
title: How to create a custom dashboard
description: "Build a dashboard for a Dashboard Component or a Custom Component in the Visual Editor, bind tags to show live data, and use the YAML tab as an alternative."
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# How to create a custom dashboard

Create your first custom dashboard in the dashboard visual editor.
No YAML knowledge is needed for the visual steps, and each step also shows its YAML equivalent.

A custom dashboard can belong to either of two component types:

- A [Dashboard Component](../Components/Dashboard/Dashboard_Component.md) has no DBC file, so it shows tags that other components already publish.
  Examples are a battery management system (BMS), a motor controller, or an industrial protocol client.
- A [Custom Component](../Components/Custom_Components/Using_a_Custom_Component.md) has its own DBC file, so it shows the signals that the DBC file decodes from the CAN bus.

Both start from the same template dashboard and use the same editor, so the steps on this page apply to either type.
Only the tag paths differ, as described in [Add your first data binding](#add-your-first-data-binding).

## Prerequisites

- One of the following components in your profile:
    - A Dashboard Component (refer to [Add a Dashboard Component](../Components/Dashboard/Dashboard_Component.md#add-a-dashboard-component)), plus at least one other component that publishes the tags to show
    - A Custom Component (refer to [How to create a Custom Component](./Create_Custom_Component.md)) with a CAN database (DBC) file attached, because a signal has a tag to bind only when a DBC file is attached
- The **Modify dashboards** permission, which allows dashboards to be edited

To practise without a device, load the Example Profile and replay `example_log.csv`, as described in the [Quick start guide](../Getting_Started/Quick_Start.md).
Add a Dashboard Component and bind to a tag such as `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent`.

## Open the dashboard editor

1. Select your **Dashboard Component** or **Custom Component** in the sidebar.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar.
   The editor opens in **DESIGN** mode, which is the visual editor, with a "CUSTOM DASHBOARD" starter dashboard.

## Add your first data binding

1. In the dashboard tree, select the **value** element labelled **CUSTOM DASHBOARD**.
2. In the **Inspector**, change the label to `TEMPERATURE`.
3. In the **Binding** section, add a binding for the `value` property and choose the tag for the temperature.

As an alternative, select the **YAML** tab and replace the static label with a data binding.
The source path depends on the component type that owns the dashboard.

=== "Dashboard Component"

    ```yaml
    - value:
        label: TEMPERATURE
        precision: 1
        bind:
          - target: value
            source: /My Device/DBC/Temperature/Value
    ```

    A Dashboard Component has no DBC, so a relative path finds no tag.
    Start the source with `/` and the name of the component that publishes the tag.
    Replace `My Device`, `Temperature`, and `Value` with the component, message, and signal names in your profile.

=== "Custom Component"

    ```yaml
    - value:
        label: TEMPERATURE
        precision: 1
        bind:
          - target: value
            source: DBC/Temperature/Value
    ```

    A source that starts with `DBC/` is relative to the Custom Component that owns the dashboard.
    Replace `Temperature` and `Value` with the message and signal names from its DBC file.
    To show a tag from another component, use an absolute path that starts with `/`.

[Data binding](../Customising_Profinity/Dashboards/Data_Binding/index.md#binding-source-paths) describes the source paths in full.

## Add more components

1. In the dashboard tree, select the **pill group** that holds the value.
2. Select **Add**, and choose **Value (in pill)** in the **Add component** window.
3. Set its label to `PRESSURE` in the **Inspector** and bind it to the pressure tag in the **Binding** section.

As an alternative, add additional readouts in the **YAML** tab.
This example uses the relative paths of a Custom Component.
In a Dashboard Component, start each source with `/` and the component name, as in the previous section.

```yaml
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

## Validate and save

1. Fix anything listed under **Schema validation issues**.
   The editor checks the dashboard against the schema as you work, and it blocks **SAVE** while any entry remains.
2. Select **SAVE** when the list is empty.
3. Close the editor to see the result on the dashboard.
   **DESIGN** is an outline, not a live preview.

## Next steps

- [Dashboard visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md): the editor in full
- [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md): the full reference for dashboards
- [Core elements](../Customising_Profinity/Dashboards/Core_Elements.md): more complex layouts
- [Component reference](../Customising_Profinity/Dashboards/Component_Reference/index.md): available components
- [Motor controller dashboard example](../Customising_Profinity/Dashboards/Motor_Controller_Dashboard_Example.md): a complete dashboard, section by section
