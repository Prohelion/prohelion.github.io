---
title: Data Binding
---

# Data Binding in Profinity Dashboards

Data binding is the process of connecting your dashboard components to live data sources. This allows your dashboards to display real-time information from CAN bus messages, system properties, and historical data.

## What is Data Binding?

Data binding creates a dynamic connection between your dashboard components and data sources. When the underlying data changes, your dashboard automatically updates to reflect the new values. 

This enables:

- **Real-time monitoring** of CAN Bus systems
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
- `store`  (string): Data store type - &quot;local&quot; (default) for real-time data from local instance, &quot;logged&quot; for logged data from logger
- `timeRangeStart`  (string): InfluxDB start time for logged data (e.g., &quot;-10m&quot;). If omitted with store='logged', returns most recent value. Default: &quot;-10m&quot;
- `timeRangeStop`  (string): InfluxDB stop time for logged data (e.g., &quot;0m&quot;)
- `aggregationWindow`  (string): Window period for InfluxDB data aggregation (e.g., &quot;1s&quot;, &quot;10s&quot;, &quot;1m&quot;, &quot;5m&quot;). If not specified, automatically calculated based on time range.
- `aggregationFunction`  (string): Aggregation function for InfluxDB data reduction - &quot;max&quot; (default), &quot;mean&quot;, &quot;min&quot;, &quot;last&quot;, &quot;first&quot;, &quot;sum&quot;, &quot;count&quot;

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

### Logged Data Access

Use the `store` property to access logged data from InfluxDB instead of real-time data:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Average Temperature (Last 10 minutes)"
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.TemperatureMeasurement.Value'
                        store: "logged"
                        timeRangeStart: "-10m"
                        timeRangeStop: "0m"
                        aggregationWindow: "1m"
                        aggregationFunction: "mean"
```

**Logged Data Parameters:**

- `store: "logged"` - Access logged data instead of real-time data
- `timeRangeStart` - Start time for data query (e.g., "-10m" for 10 minutes ago, "-1h" for 1 hour ago)
- `timeRangeStop` - Stop time for data query (e.g., "0m" for now, "-5m" for 5 minutes ago)
- `aggregationWindow` - Time window for aggregating data points (e.g., "1s", "10s", "1m", "5m")
- `aggregationFunction` - How to aggregate data: "max", "mean", "min", "last", "first", "sum", "count"

**Time Range Examples:**

- `"-10m"` - 10 minutes ago
- `"-1h"` - 1 hour ago
- `"-24h"` - 24 hours ago
- `"0m"` - Current time (now)

**Aggregation Window Examples:**

- `"1s"` - 1 second windows
- `"10s"` - 10 second windows
- `"1m"` - 1 minute windows
- `"5m"` - 5 minute windows

**Example: Chart with Historical Data**

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              showControls: true
              bind:
                - target: value
                  source: "[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent"
                  store: "logged"
                  timeRangeStart: "-1h"
                  timeRangeStop: "0m"
                  aggregationWindow: "10s"
                  aggregationFunction: "mean"
```

## Best Practices

### Choosing the Right Data Source

- **Use DBC signals** for real-time vehicle data that updates frequently
- **Use C# properties** for configuration data, system state, and complex data structures
- **Use TimeSeries** for charts and historical analysis
- **Use logged data** (`store: "logged"`) for historical analysis, averages, and trend visualization

### Performance Considerations

- **Minimize bindings** - Only bind to data you actually need to display
- **Use appropriate precision** - Set precision levels that match your data requirements
- **Consider update frequency** - High-frequency data may impact dashboard performance

## Next Steps

Now that you understand data binding, you can:
- Learn about [Core Elements](./Core_Elements.md) to understand dashboard structure
- Explore [Component Reference](./Component_Reference.md) for detailed component information
- See [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- Review [Example](./Example.md) for complete dashboard implementations