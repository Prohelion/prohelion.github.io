---
title: How to Create a Custom Dashboard
---

# How to Create a Custom Dashboard

This guide walks you through creating your first custom dashboard for a Custom Component.

## Prerequisites

- A Custom Component created in Profinity
- Basic understanding of YAML syntax
- Access to the Dashboard Editor

## Steps

### Step 1: Open the Dashboard Editor

1. Navigate to your **Custom Component** in the sidebar
2. Click the **Dashboard Editor** icon (pencil/edit icon) in the toolbar
3. The dashboard editor opens with a "Hello World" template

### Step 2: Add Your First Data Binding

Replace the static label with a data binding:

```yaml
- value:
    label: TEMPERATURE
    precision: 1
    bind:
      - target: value
        source: '{COMPONENT_NAME}.Temperature.Value'
```

**Note:** `{COMPONENT_NAME}` is automatically replaced with your component's actual name at runtime.

### Step 3: Add More Components

Add additional readouts:

```yaml
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

### Step 4: Validate and Save

1. The editor validates your YAML in real-time
2. Check for error messages at the bottom
3. Click **Save** when validation passes
4. Your dashboard updates immediately

## Next Steps

- Learn about [Core Elements](../Extending_Profinity/Dashboards/Core_Elements.md) for more complex layouts
- Explore [Component Reference](../Extending_Profinity/Dashboards/Component_Reference/index.md) for available components
- See [Examples](../Extending_Profinity/Dashboards/Examples.md) for complete dashboard examples
