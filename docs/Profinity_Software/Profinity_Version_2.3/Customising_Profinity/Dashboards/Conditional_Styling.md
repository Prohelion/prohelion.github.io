---
title: Conditional Styling
description: "Dynamically change component appearance, visibility, and behaviour based on real-time data values."
---

# Conditional Styling

Conditional styling allows dashboard components to change their appearance, visibility, and behaviour based on real-time data values, so that a dashboard adapts to system state and gives users immediate visual feedback.

## Overview

Conditional styling uses [data binding](./Data_Binding.md) to change how a component looks or whether it appears, based on the current value of a tag. This enables:

- **Visual Status Indicators** - Lamps change colour or label based on system state
- **Dynamic Visibility** - Show or hide readouts, tabs, accordions, and the footer based on data conditions
- **Real-time Feedback** - Immediate visual response to data changes
- **Clear Status Cues** - Visual signals for system status and alerts

## How Conditional Styling Works

Conditional styling uses the same `bind` list as every other dashboard component. The `target` of a binding names the component property that the data drives, and each component accepts only a fixed set of targets. A binding with a target that the component does not support is ignored.

### Key Concepts

- **Data Binding** - Bind a component property such as `visible`, `enabled`, or `color` to a tag
- **Value Mapping** - Use `mapToText` to turn a number or boolean into a colour name or label
- **Real-time Updates** - The component updates automatically as the tag changes
- **Supported Targets** - The targets in the following table are the ones that control visibility and styling

| Target | Effect | Components |
|--------|--------|------------|
| `visible` | Hides the component when the value is false (`0` or `false`) | Readout, Tab, Accordion, Footer |
| `enabled` | Greys the component out when the value is false, but keeps it on screen | Readout, Lamp, Tab, Action, Toggle |
| `color` | Sets the lamp colour (`red`, `green`, `amber`, `grey`, `on`, `off`, `disabled`, `unknown`) | Lamp |
| `label` | Replaces the label text | Readout, Lamp, Pill value |
| `classes` | Adds CSS class names to the component | Action, Toggle |

The Readout, Lamp, Tab, Accordion, Footer, and Action definitions in the [Component Reference](./Component_Reference/index.md) and the dashboard schema list the targets for each component.

## Types of Conditional Styling

### 1. Conditional Display

Show or hide a component based on a data value, by binding the `visible` target. This is useful for displaying information only when it is relevant.

**Use Cases:**

- Show a detail readout only when a limit is active
- Hide a tab or an accordion when the data it shows is not available
- Hide advanced readouts until a condition is met

#### Conditional Display Example

The following readout always shows the bus current, and it appears only while the controller reports that the bus current limit is active, because the `visible` binding follows the `DBC/Status/LimitBusCurrent` tag. When the tag value is `0` the readout is hidden, and when it is `1` the readout is shown.

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "BUS CURRENT (LIMITED)"
                    unit: "A"
                    precision: 1
                    value: 0
                    bind:
                      - target: value
                        source: DBC/BusMeasurement/BusCurrent
                      - target: visible
                        source: DBC/Status/LimitBusCurrent
                        toType: boolean
```

A `visible` binding only changes the display when it receives a value. If the tag stops updating, a readout, accordion or footer keeps its last visibility state, whereas a tab is hidden because the tab treats a missing value as false.

### 2. Dynamic Styling

Change the colour or label of a component based on data values. This allows components to visually adapt to system state.

**Use Cases:**

- Change a lamp colour when a status flag is set
- Show a text label such as "Online" or "Offline" in place of a number
- Apply CSS classes to an action or toggle based on system mode (using the `classes` target)

#### Dynamic Styling Example

The following lamp is green while the `LimitBusCurrent` flag is `0` and amber while it is `1`. The `partition` list alternates a label and a threshold, so a value below `1` takes the first colour and a value of `1` or more takes the second.

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: green
                          label: "BUS CURRENT LIMIT"
                          value: 1
                          bind:
                            - target: color
                              source: DBC/Status/LimitBusCurrent
                              mapToText:
                                partition: ["green", 1, "amber"]
                                bias: right
```

### 3. Conditional Visibility and Enabled State

Use the `visible` target to remove a component from view, and the `enabled` target to leave it on screen in a disabled (greyed) state.

**Use Cases:**

- Hide an accordion that holds maintenance information until a fault is present
- Grey out a lamp or a tab while a component is offline, so that users can see that the item exists
- Hide a readout that does not apply to the current mode

`visible` is supported on readouts, tabs, accordions, and the footer, and it is not supported on rows, groups, panels, or lamps. To hide a lamp, place it in an accordion that has a `visible` binding.

### 4. Value-Based Styling

Apply different styles based on data value ranges. This is particularly useful for status indicators and alerts.

**Use Cases:**

- Change lamp colours based on temperature ranges
- Highlight values that exceed safe limits
- Show different labels for different error types
- Apply visual indicators for system states

#### Value-Based Styling Example

The following lamp is green below 60, amber from 60 up to (but not including) 80, and red from 80 upward. With `bias: right`, a value equal to a threshold takes the label after that threshold, and with `bias: left` it takes the label before it.

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: green
                          label: "DSP TEMP"
                          value: 1
                          bind:
                            - target: color
                              source: DBC/DspBoardTempMeasurement/DspBoardTemp
                              mapToText:
                                partition: ["green", 60, "amber", 80, "red"]
                                bias: right
```

## Best Practices

### Design Guidelines

- **Consistent Visual Language** - Use the same colours and styles for similar conditions across your dashboard
- **Clear Status Indication** - Make it obvious what different styles mean
- **Progressive Enhancement** - Start with basic styling and add complexity gradually
- **Accessibility** - Ensure colour changes are not the only way to convey information

### Common Patterns

- **Status Indicators** - Use colour changes to show system status
- **Threshold Alerts** - Highlight values that exceed safe limits
- **Progressive Disclosure** - Show more information as system issues occur
- **Contextual Information** - Display relevant information based on current system state

## Next Steps

The following pages relate to conditional styling:

- Learn about [Data Binding](./Data_Binding.md) to bind styling to tags
- Explore [Component Reference](./Component_Reference/index.md) for styling options available on each component
- See [Core Elements](./Core_Elements.md) to understand how conditional styling works with dashboard structure
- Review [Examples](./Examples.md) and the annotated [Full Example](./Full_Example.md) for complete dashboard implementations