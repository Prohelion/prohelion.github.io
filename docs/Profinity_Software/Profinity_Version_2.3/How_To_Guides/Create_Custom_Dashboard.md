---
title: How to Create a Custom Dashboard
description: "Create a custom dashboard for a Profinity component in the visual editor, binding tags to display real-time component data, with the YAML tab as a fallback."
---

# How to Create a Custom Dashboard

Create your first custom dashboard for a Custom Component using the visual editor.

## Prerequisites

- A Custom Component created in Profinity
- The `DashboardModify` permission, which allows dashboards to be edited

No YAML knowledge is needed for the visual steps. The YAML alternative for each step is shown for when you prefer it.

## Steps

### Step 1: Open the Dashboard Editor

1. Navigate to your **Custom Component** in the sidebar
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar
3. The editor opens in **DESIGN** mode, the visual editor, with a "Hello World" starter dashboard

### Step 2: Add Your First Data Binding

1. In the dashboard tree, select the **value** element labelled **CUSTOM DASHBOARD**
2. In the **Inspector**, change the label to `TEMPERATURE`
3. In the **Binding** section, add a binding for the `value` property and choose the tag for the temperature signal

**YAML alternative:** select the **YAML** tab and replace the static label with a data binding:

```yaml
- value:
    label: TEMPERATURE
    precision: 1
    bind:
      - target: value
        source: DBC/Temperature/Value
```

A source that starts with `DBC/` is relative to the component that owns the dashboard, so replace `Temperature` and `Value` with the message and signal names from your DBC file. See [Data Binding](../Customising_Profinity/Dashboards/Data_Binding.md#binding-source-paths).

### Step 3: Add More Components

1. In the dashboard tree, select the **pill group** that holds the value
2. Select **Add**, and choose **Value (in pill)** in the **Add component** window
3. Set its label to `PRESSURE` in the **Inspector** and bind it to the pressure tag in the **Binding** section

**YAML alternative:** add additional readouts in the **YAML** tab:

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

### Step 4: Validate and Save

1. The editor checks your dashboard against the schema as you work
2. Fix anything listed under **Schema validation issues**, because **SAVE** is blocked while any remain
3. Select **SAVE** when the list is empty
4. Close the editor. The dashboard behind it shows your changes. DESIGN is an outline, not a live preview, so this is where you see the result

## Next Steps

- Learn the editor in full in the [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md) guide
- Read the [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md), the full reference for dashboards
- Learn about [Core Elements](../Customising_Profinity/Dashboards/Core_Elements.md) for more complex layouts
- Explore the [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md) for available components
- Connect live data with [Data Binding](../Customising_Profinity/Dashboards/Data_Binding.md)
- See [Examples](../Customising_Profinity/Dashboards/Examples.md) for complete dashboard examples
