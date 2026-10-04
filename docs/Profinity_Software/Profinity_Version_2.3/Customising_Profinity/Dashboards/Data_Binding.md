---
title: Data Binding
description: "Connect dashboard components to tags, and choose whether a binding shows the latest value, recent history or logged data."
---

# Data Binding

Data binding connects a dashboard component to a **tag**. A tag is a named value in Profinity, such as a CAN signal, a component property or a derived value, and you can browse every tag in the Tag Explorer. When the tag changes, the component updates, so a dashboard shows live information without any code to fetch it.

A binding can show the latest value of a tag, plot its recent history, or read its values back from the data log. The tag is the same in each case, and only the binding settings differ.

## Table of Contents

- [Overview](#overview)
- [Understanding Tags](#understanding-tags)
    - [Binding Source Paths](#binding-source-paths)
    - [Component Name Placeholders](#component-name-placeholders)
- [Tags You Can Bind To](#tags-you-can-bind-to)
    - [1. DBC Signal Tags](#1-dbc-signal-tags)
    - [2. Component Property Tags](#2-component-property-tags)
    - [3. Derived Tags](#3-derived-tags)
- [Binding Modes](#binding-modes)
    - [Latest Value](#latest-value)
    - [Time Series](#time-series)
    - [Logged Data](#logged-data)
- [Data Binding Syntax](#data-binding-syntax)
    - [Basic Binding Structure](#basic-binding-structure)
    - [Binding Parameters](#binding-parameters)
    - [Binding Targets](#binding-targets)
    - [Type Conversion](#type-conversion)
    - [Scaling and Offset](#scaling-and-offset)
    - [Example Readout with Scaling](#example-readout-with-scaling)
    - [Value Inversion](#value-inversion)
    - [Text Mapping](#text-mapping)
        - [Boolean Text Mapping](#boolean-text-mapping)
        - [Partition-Based Text Mapping](#partition-based-text-mapping)
- [Best Practices](#best-practices)
- [Next Steps](#next-steps)

## Overview

Every value that a dashboard displays comes from a tag. Whatever the origin of the value (a CAN signal, a component property or a derived calculation), Profinity presents it as a tag with an address, a value, a quality flag and a timestamp, so one binding works the same way for all of them. When a tag changes, the dashboard updates automatically to reflect the new value.

This enables:

- **Real-time monitoring** of any system that Profinity connects to
- **Automatic updates** without manual refresh
- **Dynamic styling** based on tag values
- **Interactive displays** that respond to system state

## Understanding Tags

A binding names a tag by its **tag path**, which is a list of names separated by `/`, in the same tree that the Tag Explorer displays. To bind a component, open the Tag Explorer, find the tag, and copy its path into the `source` of the binding. The visual editor does this for you, because its **Binding** section lets you choose the tag from the tree, as described in [Visual Editor](./Visual_Editor.md).

The `store` property of a binding is a separate setting. It chooses between live values (`local`) and values read back from the data log (`logged`), as described in [Logged Data](#logged-data).

See [Tags](../../Tags/index.md) for how Profinity builds and maintains the tag tree.

### Binding Source Paths

The `source` of a binding is a tag path, and it takes one of two forms:

| Form | Example | Meaning |
|------|---------|---------|
| **Relative** | `DBC/BusMeasurement/BusVoltage` | A tag of the component that owns the dashboard |
| **Absolute** | `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` | A tag of a named component, which can be a different component |

A relative path starts with `DBC/`, `Properties/` or `Firmware/`, and Profinity resolves it under the component that owns the dashboard when the dashboard loads. A relative path makes a dashboard reusable, because the dashboard does not contain the name of a component, which allows it to be renamed or applied to another component with the same tags. A component dashboard needs a leading `/` to bind to a tag in a different component.

A dashboard that has no owning component, such as a profile home dashboard, has no relative paths. Its sources name the component in full, for example `Prohelion BMU/Properties/StatusColourText`, as in the example profile that ships with Profinity.

If a component is mounted at a nested location in the tag tree, an absolute path includes that location. See [Tag Tree Path](../../Tags/Tag_Tree_Path.md).

!!! note "Earlier formats"
    Dashboards written for earlier versions used dots instead of slashes, as in `{COMPONENT_NAME}.BusMeasurement.BusVoltage`, `{COMPONENT_NAME}.[Property].Status`, and `[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent`. Profinity still reads these forms and rewrites them to the slash form when the dashboard loads, so older dashboards continue to work. New dashboards should use the slash form shown in this guide.

### Component Name Placeholders

Dashboards from earlier versions use the placeholder `{COMPONENT_NAME}` where a component name is needed. Profinity replaces it with the name of the component that owns the dashboard, which allowed a dashboard to be reused when a component was renamed. In the current format a relative path such as `DBC/BusMeasurement/BusVoltage` serves the same purpose without a placeholder, and a dashboard that still contains `{COMPONENT_NAME}` is converted to relative paths the next time it is saved.

## Tags You Can Bind To

A binding can use any tag in the tree. The branch that a tag sits under shows where its value comes from, and the tags below are the ones that dashboards use most often.

### 1. DBC Signal Tags

A component that reads CAN bus messages publishes each signal in its DBC (Database CAN) file as a tag, in the form `DBC/<Message>/<Signal>`:

- `DBC/BusMeasurement/BusVoltage` - The tag for a signal (BusVoltage) of a CAN message (BusMeasurement)
- `DBC/Status/LimitBusCurrent` - The tag for a limit flag signal (LimitBusCurrent, set when the bus current setpoint is limiting the motor torque) of a CAN message (Status)
- `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` - The tag for a signal of a named component

**Best for:** Real-time data, sensor readings, and status indicators that have been defined in DBC

### 2. Component Property Tags

Use `Properties/` for the tags that a component calculates or holds in addition to its DBC signals, which is generally for advanced users only:

- `Properties/StatusColourText` - The status colour of the component
- `Properties/BusPower` - The bus power, in watts, that the WaveSculptor 22 component calculates as the product of the `BusVoltage` and `BusCurrent` signals, which is not a signal transmitted by the WaveSculptor
- `Properties/PackData/BatteryMilliVolts` - Battery voltage data of a Prohelion BMU component (nested names are separated by `/`)

**Best for:** Component status, calculated values, and data structures where the component has the functionality defined in code. The tags available depend on the component, and they are listed in the Tag Explorer.

### 3. Derived Tags

A derived tag is a tag whose value Profinity computes from an expression or a script, and a dashboard binds to it exactly as it binds to any other tag. Use a derived tag when a dashboard needs a value that no device reports, such as a calculated power or a combined status, so that the calculation lives in one place instead of in every dashboard.

**Best for:** Calculated values that several dashboards, rules or the API also use. See [Derived Tags](../../Tags/Derived_Tags.md).

## Binding Modes

The mode of a binding decides what the dashboard reads from the tag. The `source` is a tag path in every mode.

### Latest Value

The default mode, `seriesMode: instant` with `store: local`, shows only the latest value of the tag. Readouts, lamps and most other components use it.

### Time Series

A chart plots history when its binding sets `seriesMode`:

- `seriesMode: timeSeries` - Plots the recent values of the tag over the window set by `timeRangeStart` and `timeRangeStop`
- `seriesMode: timeSeriesDelta` - Plots the change between successive values
- `seriesMode: instant` - The default, which shows only the latest value

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/VelocityMeasurement/VehicleVelocity
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```

A window of `-5m` to `0m` is stamped automatically only when a legacy `[TimeSeries]` binding is migrated, when the SDK `Chart` class creates a binding, and when the visual editor adds a series, whereas a hand-written `seriesMode: timeSeries` binding without a window receives no default. Always set `timeRangeStart` and `timeRangeStop` on a series binding. Time values use a relative form, where `-5m` is five minutes before now and `0m` is now.

**Best for:** Charts, trend visualisation, and live history of any numeric tag. The legacy prefix `[TimeSeries]` is still read and converted to `seriesMode: timeSeries`.

### Logged Data

Set `store: logged` to read the values of a tag back from the data log instead of the live values. A logged binding names a time range and, optionally, how to aggregate the data:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/BusMeasurement/BusVoltage
                  store: logged
                  timeRangeStart: "-1h"
                  timeRangeStop: "0m"
                  aggregationWindow: "1m"
                  aggregationFunction: mean
```

Logged data requires that data logging is configured and enabled for the profile. The `aggregationWindow` groups the data into intervals of the given length (for example `10s` or `1m`), and the `aggregationFunction` decides which value represents each interval.

**Best for:** Historical analysis over periods longer than the live window.

## Data Binding Syntax

A binding connects a dashboard component to a tag, and the binding settings can transform the value, convert its type, and map it to text.

### Basic Binding Structure

All bindings are defined as arrays of binding objects:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "DSP Temperature"
                    unit: "°C"
                    bind:
                      - target: "value"
                        source: "DBC/DspBoardTempMeasurement/DspBoardTemp"
```

A `bind` list can hold several bindings, one for each property that the data drives, as described in [Binding Targets](#binding-targets).

### Binding Parameters

**Required Parameters:**

- `source` (string): The tag path of the tag to bind (for example, `"DBC/BusMeasurement/BusVoltage"`, `"Properties/StatusColourText"`)

The schema requires `source`. The `target` names the property that the value updates, and every example in this guide sets it.

**Optional Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | string | The component property to update (for example `value`, `label`, `enabled`, `visible`, `color`). See [Binding Targets](#binding-targets) |
| `toType` | string | Data type conversion (`number`, `string`, `boolean` or `string\|number`) |
| `gain` | number | Multiplicative scaling factor, applied before `offset` |
| `offset` | number | Additive offset, applied after `gain` |
| `invert` | boolean | Flips a boolean or `0`/`1` value |
| `mapToText` | object | Text mapping configuration. See [Text Mapping](#text-mapping) |
| `store` | string | `local` (the default) for live values, or `logged` for values read from the data log |
| `timeRangeStart` | string | Start of the time window for a logged or time series binding, relative to now (for example `-10m`). Always set the value on a logged or time series binding, because no code applies a default |
| `timeRangeStop` | string | End of the time window, where `0m` is now |
| `aggregationWindow` | string | Length of each aggregation interval for logged data (for example `1m`) |
| `aggregationFunction` | string | How each interval is reduced for logged data: `max` (the default), `mean`, `min`, `last`, `first`, `sum`, or `count` |
| `seriesMode` | string | `instant` (the default), `timeSeries`, or `timeSeriesDelta`. A chart plots a series of samples when this is `timeSeries` or `timeSeriesDelta`, and a chart bound with `store: logged` reads its history from the data log |
| `stackScale` | boolean | Chart only: gives this series its own Y axis |
| `seriesType` | string | Chart only: `line`, `bar`, or `scatter`, overriding the chart type for this series |

### Binding Targets

Each component accepts a fixed set of `target` values, and a binding with any other target is ignored. The most common targets are as follows:

| Component | Targets |
|-----------|---------|
| Readout | `value`, `label`, `unit`, `enabled`, `visible` |
| Pill value | `value`, `label`, `unit` |
| Lamp | `value`, `enabled`, `color`, `label` |
| Tab | `enabled`, `visible` |
| Accordion, Footer | `visible` |
| Action, Toggle | `enabled`, `classes` |
| Chart, Table | `value` |

See [Conditional Styling](./Conditional_Styling.md) for how `visible`, `enabled`, and `color` are used.

### Type Conversion

Use `toType` to convert data types. Each component already applies the conversion that suits each of its targets (for example, a lamp `enabled` target is always read as a boolean), so `toType` is optional for most bindings and is shown in these examples for clarity:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "DSP Temperature"
                    unit: "°C"
                    bind:
                      - target: "value"
                        source: "DBC/DspBoardTempMeasurement/DspBoardTemp"
                        toType: "number"
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: "amber"
                          value: 1
                          label: "Bus Current Limit"
                          bind:
                            - target: "enabled"
                              source: "DBC/Status/LimitBusCurrent"
                              toType: "boolean"
```

### Scaling and Offset

Apply mathematical transformations with `gain` and `offset`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Battery Voltage"
                    unit: "V"
                    bind:
                      - target: "value"
                        source: "Properties/PackData/BatteryMilliVolts"
                        gain: 0.001
                        offset: 0
```

### Example Readout with Scaling

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 0
                    unit: "°C"
                    precision: 1
                    bind:
                      - target: "value"
                        source: "DBC/Example/RawTemperature"
                        gain: 0.1
                        offset: -273.15
                        toType: "number"
```


### Value Inversion

Invert boolean or numerical values:

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
                          color: "green"
                          value: 1
                          label: "Configuration Read OK"
                          bind:
                            - target: "enabled"
                              source: "DBC/Status/ErrorConfigRead"
                              invert: true
```

### Text Mapping

Map values to display text using boolean or partition-based mapping.

#### Boolean Text Mapping

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Status"
                    bind:
                      - target: "label"
                        source: "DBC/Status/ErrorConfigRead"
                        toType: "boolean"
                        mapToText:
                          trueValue: "Fault"
                          falseValue: "OK"
```

#### Partition-Based Text Mapping

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature Status"
                    bind:
                      - target: "label"
                        source: "DBC/DspBoardTempMeasurement/DspBoardTemp"
                        toType: "number"
                        mapToText:
                          partition: ["Cold", 0, "Normal", 25, "Hot"]
                          bias: "right"
```

The partition array defines ranges in the form `[label1, threshold1, label2, threshold2, label3]`, so that a value below `threshold1` takes `label1`, a value from `threshold1` up to `threshold2` takes `label2`, and any higher value takes `label3`. The `bias` is required, and it is either `left` or `right`: with `left` a value equal to a threshold takes the label before that threshold, and with `right` it takes the label after it. The text that results can drive a `label` target, or a lamp `color` target when the labels are colour names.

## Best Practices

### Choosing the Right Tag

- **Find the tag in the Tag Explorer** and copy its path, instead of typing it from memory
- **Use DBC signal tags** (`DBC/...`) for real-time vehicle data that updates frequently
- **Use component property tags** (`Properties/...`) for status, calculated values, and complex data structures
- **Use a derived tag** when several dashboards need the same calculation, so the calculation is defined once
- **Use `seriesMode`** for charts, and `store: logged` for analysis over longer periods
- **Use relative paths** (`DBC/...` and `Properties/...`) so that a dashboard works when a component is renamed or applied to another component with the same tags

### Performance Considerations

- **Minimise bindings** - Only bind to data you actually need to display
- **Use appropriate precision** - Set precision levels that match your data requirements
- **Consider update frequency** - High-frequency data may impact dashboard performance

## Next Steps

The following pages relate to data binding:

- Learn about [Tags](../../Tags/index.md), including the Tag Explorer, [Derived Tags](../../Tags/Derived_Tags.md) and [Tag Linking](../../Tags/Tag_Linking.md), which adds tags to a dashboard from the Tag Explorer
- Learn about [Core Elements](./Core_Elements.md) to understand dashboard structure
- Explore [Component Reference](./Component_Reference/index.md) for detailed component information
- See [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- Review [Examples](./Examples.md) and the annotated [Full Example](./Full_Example.md) for complete dashboard implementations