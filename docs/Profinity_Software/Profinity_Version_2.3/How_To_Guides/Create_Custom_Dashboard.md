---
title: How to create a custom dashboard
description: "Build a dashboard for a Custom Component in the Visual Editor, bind tags to show live component data, and use the YAML tab as an alternative."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to create a custom dashboard

Create your first custom dashboard for a Custom Component using the Visual Editor.
No YAML knowledge is needed for the visual steps, and each step also shows its YAML equivalent.

## Prerequisites

- A Custom Component created in Profinity (refer to [How to create a Custom Component](./Create_Custom_Component.md))
- A DBC file attached to that component, because a signal has a tag to bind only when a DBC file is attached
- The **Modify dashboards** permission, which allows dashboards to be edited

To practise without a device, load the Example Profile and replay `example_log.csv`, as described in the [Quick Start Guide](../Getting_Started/Quick_Start.md), and bind to a tag such as `Prohelion BMU/DBC/PackStateOfCharge/SOCPercent`.

## Open the dashboard editor

1. Navigate to your **Custom Component** in the sidebar.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar. The editor opens in **DESIGN** mode, the Visual Editor, with a "CUSTOM DASHBOARD" starter dashboard.

## Add your first data binding

1. In the dashboard tree, select the **value** element labelled **CUSTOM DASHBOARD**.
2. In the **Inspector**, change the label to `TEMPERATURE`.
3. In the **Binding** section, add a binding for the `value` property and choose the tag for the temperature signal from the component's DBC file.

As an alternative, select the **YAML** tab and replace the static label with a data binding:

```yaml
- value:
    label: TEMPERATURE
    precision: 1
    bind:
      - target: value
        source: DBC/Temperature/Value
```

A source that starts with `DBC/` is relative to the component that owns the dashboard, so replace `Temperature` and `Value` with the message and signal names from your DBC file.
Refer to [Data Binding](../Customising_Profinity/Dashboards/Data_Binding/index.md#binding-source-paths).

## Add more components

1. In the dashboard tree, select the **pill group** that holds the value.
2. Select **Add**, and choose **Value (in pill)** in the **Add component** window.
3. Set its label to `PRESSURE` in the **Inspector** and bind it to the pressure tag in the **Binding** section.

As an alternative, add additional readouts in the **YAML** tab:

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

1. Fix anything listed under **Schema validation issues**. The editor checks the dashboard against the schema as you work, and **SAVE** is blocked while any entry remains.
2. Select **SAVE** when the list is empty.
3. Close the editor to see the result on the dashboard behind it, because **DESIGN** is an outline and not a live preview.

## Next steps

- [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md): the editor in full
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md): the full reference for dashboards
- [Core Elements](../Customising_Profinity/Dashboards/Core_Elements.md): more complex layouts
- [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md): available components
- [Motor Controller Dashboard Example](../Customising_Profinity/Dashboards/Motor_Controller_Dashboard_Example.md): a complete dashboard, section by section
