---
title: Data Binding
description: "Connect dashboard components to live data sources including CAN bus messages, properties, and time series."
---

# Data Binding

Data binding is the process of connecting dashboard components to live data sources, which allows a dashboard to display real-time information from CAN bus messages, system properties, and historical data.

## Table of Contents

- [Overview](#overview)
- [Understanding Data Sources](#understanding-data-sources)
    - [Binding Source Paths](#binding-source-paths)
    - [Component Name Placeholders](#component-name-placeholders)
- [Data Source Types](#data-source-types)
    - [1. DBC Messages and Signals](#1-dbc-messages-and-signals)
    - [2. Component Properties](#2-component-properties)
    - [3. Time Series Data](#3-time-series-data)
    - [4. Logged Data](#4-logged-data)
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

Data binding creates a dynamic connection between dashboard components and data sources. When the underlying data changes, the dashboard updates automatically to reflect the new values.

This enables:

- **Real-time monitoring** of CAN bus systems
- **Automatic updates** without manual refresh
- **Dynamic styling** based on data values
- **Interactive displays** that respond to system state

## Understanding Data Sources

Profinity dashboards access data through the **Profinity Data Store (PDS)**, which provides a unified interface to the various data sources managed by Profinity and automatically handles data formatting, type conversion, and real-time updates. Each source is addressed as a tag path, which is a list of names separated by `/`, in the same tree that the Tag Explorer displays.

The Profinity Data Store is not the same thing as the `store` property of a binding. The `store` property chooses between live values (`local`) and values read back from the data log (`logged`), as described in [Logged Data](#4-logged-data).

### Binding Source Paths

The `source` of a binding is a tag path, and it takes one of two forms:

| Form | Example | Meaning |
|------|---------|---------|
| **Relative** | `DBC/BusMeasurement/BusVoltage` | A tag of the component that owns the dashboard |
| **Absolute** | `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` | A tag of a named component, which can be a different component |

A relative path starts with `DBC/`, `Properties/` or `Firmware/`, and Profinity resolves it under the component that owns the dashboard when the dashboard loads. A relative path makes a dashboard reusable, because the dashboard does not contain the name of a component, which allows it to be renamed or applied to another component with the same signals. A component dashboard needs a leading `/` to bind to a tag in a different component.

A dashboard that has no owning component, such as a profile home dashboard, has no relative paths. Its sources name the component in full, for example `Prohelion BMU/Properties/StatusColourText`, as in the example profile that ships with Profinity.

!!! note "Earlier formats"
    Dashboards written for earlier versions used dots instead of slashes, as in `{COMPONENT_NAME}.BusMeasurement.BusVoltage`, `{COMPONENT_NAME}.[Property].Status`, and `[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent`. Profinity still reads these forms and rewrites them to the slash form when the dashboard loads, so older dashboards continue to work. New dashboards should use the slash form shown in this guide.

### Component Name Placeholders

Dashboards from earlier versions use the placeholder `{COMPONENT_NAME}` where a component name is needed. Profinity replaces it with the name of the component that owns the dashboard, which allowed a dashboard to be reused when a component was renamed. In the current format a relative path such as `DBC/BusMeasurement/BusVoltage` serves the same purpose without a placeholder, and a dashboard that still contains `{COMPONENT_NAME}` is converted to relative paths the next time it is saved.

## Data Source Types

Profinity supports three main types of data sources, each suited to different use cases, and a binding can additionally read logged history:

### 1. DBC Messages and Signals

The most common data source uses DBC (Database CAN) format for CAN bus messages and signals, in the form `DBC/<Message>/<Signal>`:

- `DBC/BusMeasurement/BusVoltage` - Accesses a signal (BusVoltage) from a CAN message (BusMeasurement)
- `DBC/Status/LimitBusCurrent` - Accesses a limit flag signal (LimitBusCurrent, set when the bus current setpoint is limiting the motor torque) from a CAN message (Status)
- `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` - Accesses a signal of a named component

**Best for:** Real-time data, sensor readings, status indicators that have been defined in DBC

### 2. Component Properties

Use `Properties/` to access properties that a component calculates or holds in addition to its DBC signals, which is generally for advanced users only:

- `Properties/StatusColourText` - The status colour of the component
- `Properties/BusPower` - The bus power, in watts, that the WaveSculptor 22 component calculates as the product of the `BusVoltage` and `BusCurrent` signals, which is not a signal transmitted by the WaveSculptor
- `Properties/PackData/BatteryMilliVolts` - Battery voltage data of a Prohelion BMU component (nested names are separated by `/`)

**Best for:** Component status, calculated values, and data structures where the component has the functionality defined in code. The property names available depend on the component, and they are listed in the Tag Explorer.

### 3. Time Series Data

A chart plots history when its binding sets `seriesMode`:

- `seriesMode: timeSeries` - Plots the recent values of the source over the window set by `timeRangeStart` and `timeRangeStop`
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

**Best for:** Charts, trend visualisation, and live history from either DBC or Property sources. The legacy prefix `[TimeSeries]` is still read and converted to `seriesMode: timeSeries`.

### 4. Logged Data

Set `store: logged` to read values back from the data log instead of the live values. A logged binding names a time range and, optionally, how to aggregate the data:

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

The system automatically handles the different data source types and provides appropriate data binding capabilities for each.

## Data Binding Syntax

Data binding connects dashboard components to dynamic data sources provided by the Profinity Data Store (PDS), and the binding system supports data transformation, type conversion, and value mapping.

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

- `source` (string): The tag path of the data source (for example, `"DBC/BusMeasurement/BusVoltage"`, `"Properties/StatusColourText"`)

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

### Choosing the Right Data Source

- **Use DBC signals** for real-time vehicle data that updates frequently
- **Use component properties** (`Properties/...`) for status, calculated values, and complex data structures
- **Use `seriesMode`** for charts, and `store: logged` for analysis over longer periods
- **Use relative paths** (`DBC/...` and `Properties/...`) so that a dashboard works when a component is renamed

### Performance Considerations

- **Minimise bindings** - Only bind to data you actually need to display
- **Use appropriate precision** - Set precision levels that match your data requirements
- **Consider update frequency** - High-frequency data may impact dashboard performance

## Next Steps

The following pages relate to data binding:

- Learn about [Core Elements](./Core_Elements.md) to understand dashboard structure
- Explore [Component Reference](./Component_Reference/index.md) for detailed component information
- See [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- Review [Examples](./Examples.md) and the annotated [Full Example](./Example.md) for complete dashboard implementations