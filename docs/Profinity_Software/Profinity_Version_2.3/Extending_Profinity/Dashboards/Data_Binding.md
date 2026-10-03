---
title: Data Binding
description: "Connect dashboard components to live data sources including CAN bus messages, properties, and time series."
---

# Data Binding

Data binding is the process of connecting dashboard components to live data sources, which allows a dashboard to display real-time information from CAN bus messages, system properties, and historical data.

## Table of Contents

- [Overview](#overview)
- [Understanding Data Sources](#understanding-data-sources)
    - [Component Name Placeholders](#component-name-placeholders)
- [Data Source Types](#data-source-types)
    - [1. DBC Messages and Signals](#1-dbc-messages-and-signals)
    - [2. Direct C# Properties](#2-direct-c-properties)
    - [3. Time Series Data](#3-time-series-data)
- [Data Binding Syntax](#data-binding-syntax)
    - [Basic Binding Structure](#basic-binding-structure)
    - [Binding Parameters](#binding-parameters)
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

Profinity dashboards access data through the **Profinity Data Store (PDS)**, which provides a unified interface to the various data sources managed by Profinity and automatically handles data formatting, type conversion, and real-time updates.

### Component Name Placeholders

Throughout this guide, `{COMPONENT_NAME}` is used in data binding examples. It is a placeholder that Profinity replaces at runtime with the actual component name, which is used because a component can be renamed in Profinity, so the dashboard refers to the component through a variable rather than hard-coding its name.

For example:

- `{COMPONENT_NAME}.BusMeasurement.BusVoltage` becomes `WaveSculptor 22.BusMeasurement.BusVoltage` 
- `{COMPONENT_NAME}.[Property].Status`  becomes `Prohelion D1000 Gen 1.[Property].Status`

This allows reusable dashboard templates to be applied to different components without modifying the YAML configuration, because the system substitutes the placeholder with the specific component name when the dashboard is rendered.

## Data Source Types

Profinity supports three main types of data sources, each suited to different use cases:

### 1. DBC Messages and Signals

The most common data source uses DBC (Database CAN) format for CAN bus messages and signals:

- `{COMPONENT_NAME}.BusMeasurement.BusVoltage`  - Accesses a signal (BusVoltage) from a CAN message (BusMeasurement)
- `{COMPONENT_NAME}.Status.Online` - Accesses a status signal (Online) from a CAN message (Status)

**Best for:** Real-time data, sensor readings, status indicators that have been defined in DBC

### 2. Direct C# Properties

Use `[Property]` to access properties on the backend C# objects in Profinity directly, which is generally for advanced users only:

- `{COMPONENT_NAME}.[Property].Status` - Accesses a C# property directly
- `{COMPONENT_NAME}.[Property].Configuration.Version` - Accesses nested properties
- `{COMPONENT_NAME}.[Property].PackData.NodeStatusColourText[1]` - Accesses an array element
- `{COMPONENT_NAME}.[Property].PackData.BatteryMilliVolts` - Accesses battery voltage data
- `{COMPONENT_NAME}.[Property].State.Controller.CurrentState.Name` - Accesses nested state information

**Best for:** System configuration, complex data structures, and calculated values where the component has all of its functionality defined in the C# code. This source is generally used only by Prohelion developers, but it is available for general use where required.

### 3. Time Series Data

Use `[TimeSeries]` to access time-series data for charts and historical displays:

- `[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent` - Time series data for charts
- `[TimeSeries].{COMPONENT_NAME}.VelocityMeasurement.VehicleVelocity` - Historical velocity data

**Best for:** Charts, historical analysis, and trend visualisation from either DBC or Property types.

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
                    label: "Temperature"
                    bind:
                      - target: "value"
                        source: "data.temperature"
                      - target: "label"
                        source: "data.sensor_name"
```  

### Binding Parameters

**Required Parameters:**

- `target`  (string): The property to bind to (for example, `"value"`, `"label"`, `"color"`)
- `source`  (string): The data source path (for example, `"data.temperature"`, `"status.online"`)

**Optional Parameters:**

- `toType`  (string): Data type conversion (`"number"`, `"string"`, `"boolean"`)
- `gain`  (number): Multiplicative scaling factor
- `offset`  (number): Additive offset
- `invert`  (boolean): Whether to invert the value
- `mapToText`  (object): Text mapping configuration

### Type Conversion

Use `toType`  to convert data types:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    bind:
                      - target: "value"
                        source: "data.temperature"
                        toType: "number"
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: "green"
                          label: "Status"
                          bind:
                            - target: "enabled"
                              source: "data.online"
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
                    label: "Voltage"
                    bind:
                      - target: "value"
                        source: "data.voltage"
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
                        source: "data.temperature_raw"
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
                          label: "Status"
                          bind:
                            - target: "enabled"
                              source: "data.error"
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
                        source: "data.status"
                        mapToText:
                          trueValue: "Online"
                          falseValue: "Offline"
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
                        source: "data.temperature"
                        mapToText:
                          partition: ["Cold", 0, "Normal", 25, "Hot"]
                          bias: "low"
```

The partition array defines ranges: [label1, threshold1, label2, threshold2, label3]. The bias determines which label to use when a value equals a threshold.

## Best Practices

### Choosing the Right Data Source

- **Use DBC signals** for real-time vehicle data that updates frequently
- **Use C# properties** for configuration data, system state, and complex data structures
- **Use TimeSeries** for charts and historical analysis

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