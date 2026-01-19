---
title: Data Binding
---

# Data Binding in Profinity Dashboards

Data binding is the process of connecting your dashboard components to live data sources. This allows your dashboards to display real-time information from CAN bus messages, system properties, and historical data.

## Table of Contents

- [What is Data Binding?](#what-is-data-binding)
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

## What is Data Binding?

Data binding creates a dynamic connection between your dashboard components and data sources. When the underlying data changes, your dashboard automatically updates to reflect the new values. 

This enables:

- **Real-time monitoring** of CAN bus systems
- **Automatic updates** without manual refresh
- **Dynamic styling** based on data values
- **Interactive displays** that respond to system state

## Understanding Data Sources

Profinity dashboards access data through the **Profinity Data Store (PDS)**, which provides a unified interface to the various data sources managed by Profinity. 

The PDS automatically handles data formatting, type conversion, and real-time updates.

### Component Name Placeholders

Throughout this guide, you'll see `{COMPONENT_NAME}` used in data binding examples. This is a placeholder that gets replaced at runtime with the actual component name at runtime, this is used because it is possible to change the name of a component in Profinity, so rather than hard-coding the component name it is possible to define it as a variable. 

For example:

- `{COMPONENT_NAME}.BusMeasurement.BusVoltage` becomes `WaveSculptor 22.BusMeasurement.BusVoltage` 
- `{COMPONENT_NAME}.[Property].Status`  becomes `Prohelion D1000 Gen 1.[Property].Status`

This allows you to create reusable dashboard templates that can be applied to different components without modifying the YAML configuration. The system automatically substitutes the placeholder with the specific component name when the dashboard is rendered.

## Data Source Types

Profinity supports three main types of data sources, each optimized for different use cases:

### 1. DBC Messages and Signals

The most common data source uses DBC (Database CAN) format for CAN bus messages and signals:

- `{COMPONENT_NAME}.BusMeasurement.BusVoltage`  - Accesses a signal (BusVoltage) from a CAN message (BusMeasurement)
- `{COMPONENT_NAME}.Status.Online` - Accesses a status signal (Online) from a CAN message (Status)

**Best for:** Real-time data, sensor readings, status indicators that have been defined in DBC

### 2. Direct C# Properties

Use `[Property]` to directly access Properties on the back end C# objects in Profinity, generally this is for power users only:

- `{COMPONENT_NAME}.[Property].Status` - Accesses a C# property directly
- `{COMPONENT_NAME}.[Property].Configuration.Version` - Accesses nested properties
- `{COMPONENT_NAME}.[Property].PackData.NodeStatusColourText[1]` - Accesses an array element
- `{COMPONENT_NAME}.[Property].PackData.BatteryMilliVolts` - Accesses battery voltage data
- `{COMPONENT_NAME}.[Property].State.Controller.CurrentState.Name` - Accesses nested state information

**Best for:** System configuration, complex data structures, calculated values where the component has all its functionality defined in the C# code.  Generally this would only use used by Prohelion developers, but it is available for general use where required.

### 3. Time Series Data

Use `[TimeSeries]` to access time-series data for charts and historical displays:

- `[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent` - Time series data for charts
- `[TimeSeries].{COMPONENT_NAME}.VelocityMeasurement.VehicleVelocity` - Historical velocity data

**Best for:** Charts, historical analysis, trend visualization from either DBC or Property types.

The system automatically handles the different data source types and provides appropriate data binding capabilities for each.

## Data Binding Syntax

Data binding allows you to connect your dashboard components to dynamic data sources that can be provided by the Prohelion Data Store (PDS). The binding system supports data transformation, type conversion, and value mapping.

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

- `target`  (string): The property to bind to (e.g., &quot;value&quot;, &quot;label&quot;, &quot;color&quot;)
- `source`  (string): The data source path (e.g., &quot;data.temperature&quot;, &quot;status.online&quot;)</ul>

**Optional Parameters:**

- `toType`  (string): Data type conversion (&quot;number&quot;, &quot;string&quot;, &quot;boolean&quot;)
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

Apply mathematical transformations:

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

### Boolean Text Mapping

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

### Partition-Based Text Mapping

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

- **Minimize bindings** - Only bind to data you actually need to display
- **Use appropriate precision** - Set precision levels that match your data requirements
- **Consider update frequency** - High-frequency data may impact dashboard performance

## Next Steps

Now that you understand data binding, you can:

- Learn about [Core Elements](./Core_Elements.md) to understand dashboard structure
- Explore [Component Reference](./Component_Reference/index.md) for detailed component information
- See [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- Review [Example](./Example.md) for complete dashboard implementations