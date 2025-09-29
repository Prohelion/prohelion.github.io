---
title: Profinity Dashboard Data Binding
---

# How Profinity Dashboards Accesses Data

Profinity dashboards can call in to the main Profinity engine to get realtime values using the Profinity Data Store (PDS) format.  The structure for accessing the Profinity Data Store is as follows.

## Component Name Placeholders

Throughout this guide, you'll see `{COMPONENT_NAME}`  

used in data binding examples. This is a placeholder that gets replaced at runtime with the actual component name. For example:

- `{COMPONENT_NAME}.BusMeasurement.BusVoltage` becomes `WaveSculptor 22.BusMeasurement.BusVoltage` 
- `{COMPONENT_NAME}.[Property].Status`  becomes `Prohelion D1000 Gen 1.[Property].Status`

This allows you to create reusable dashboard templates that can be applied to different components without modifying the YAML configuration. The system automatically substitutes the placeholder with the specific component name when the dashboard is rendered.

### DBC Messages and Signals

The primary data source uses DBC (Database CAN) format for CAN bus messages and signals:

- `{COMPONENT_NAME}.BusMeasurement.BusVoltage`  - Accesses a signal from a CAN message
- `{COMPONENT_NAME}.Status.Online` - Accesses a status signal from a CAN message

### Direct C# Properties

Use `[Property]`  to access C# properties directly:

- `{COMPONENT_NAME}.[Property].Status`  - Accesses a C# property directly
- `{COMPONENT_NAME}.[Property].Configuration.Version`  - Accesses nested properties
- `{COMPONENT_NAME}.[Property].PackData.NodeStatusColourText[1]`  - Accesses an array element
- `{COMPONENT_NAME}.[Property].PackData.BatteryMilliVolts`  - Accesses battery voltage data
- `{COMPONENT_NAME}.[Property].State.Controller.CurrentState.Name`  - Accesses nested state information

### Time Series Data

Use `[TimeSeries]`  to access time-series data for charts and historical displays:

- `[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent`  - Time series data for charts
- `[TimeSeries].{COMPONENT_NAME}.VelocityMeasurement.VehicleVelocity`  - Historical velocity data

The system automatically handles the different data source types and provides appropriate data binding capabilities for each.

## Data Binding

Data binding allows you to connect your dashboard components to dynamic data sources. The binding system supports data transformation, type conversion, and value mapping.

### Basic Binding Structure

All bindings are defined as arrays of binding objects:

``` yaml
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
bind:
  - target: "value"
    source: "data.temperature"
    toType: "number"
  - target: "enabled"
    source: "data.online"
    toType: "boolean"
```

### Scaling and Offset

Apply mathematical transformations:

``` yaml
bind:
  - target: "value"
    source: "data.voltage"
    gain: 0.001  # Convert millivolts to volts
    offset: 0    # No offset
```

####Example Readout with Scaling####

``` yaml
readouts:
  items:
    - label: "Temperature"
      value: 0
      unit: "°C"
      precision: 1
      bind:
        - target: "value"
          source: "data.temperature_raw"
          gain: 0.1
          offset: -273.15  # Convert from Kelvin to Celsius
          toType: "number"
```  


### Value Inversion

Invert boolean or numerical values:

``` yaml
bind:
  - target: "enabled"
    source: "data.error"
    invert: true  # Show enabled when no error
```    

### Text Mapping

Map values to display text using boolean or partition-based mapping.

####Boolean Text Mapping####

``` yaml
bind:
  - target: "label"
    source: "data.status"
    mapToText:
      true: "Online"
      false: "Offline"
```

####Partition-Based Text Mapping####

``` yaml
bind:
  - target: "label"
    source: "data.temperature"
    mapToText:
      partition: ["Cold", 0, "Normal", 25, "Hot"]
      bias: "low"
```

The partition array defines ranges: [label1, threshold1, label2, threshold2, label3]. The bias determines which label to use when a value equals a threshold.