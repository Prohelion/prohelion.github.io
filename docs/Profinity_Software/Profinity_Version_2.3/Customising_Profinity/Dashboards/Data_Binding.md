---
title: Data Binding
description: "Connect dashboard components to tags, and choose whether a binding shows the latest value, recent history or logged data."
---

# Data Binding

Data binding connects a dashboard component to a **tag**. A tag is a named value in Profinity, such as a CAN signal, a component property or a derived value, and you can browse every tag in the Tag Explorer. When the tag changes, the component updates, so a dashboard shows live information without any code to fetch it. This page covers how a binding names a tag, which tags a dashboard can use, the three binding modes, and the settings that transform or map a value.

A binding can show the latest value of a tag, plot its recent history, or read its values back from the data log. The tag is the same in each case, and only the binding settings differ. Whatever the origin of the value, Profinity presents it as a tag with an address, a value, a quality flag and a timestamp, so one binding works the same way for all of them.

## Understanding Tags

A binding names a tag by its **tag path**, which is a list of names separated by `/`, in the same tree that the Tag Explorer displays. To bind a component, open the Tag Explorer, find the tag, and copy its path into the `source` of the binding. The visual editor does this for you, because its **Binding** section lets you choose the tag from the tree, as described in [Visual Editor](./Visual_Editor.md). See [Tags](../../Tags/index.md) for how Profinity builds and maintains the tag tree.

### Binding Source Paths

The `source` of a binding is a tag path, and it takes one of two forms:

| Form | Example | Meaning |
|------|---------|---------|
| **Relative** | `DBC/BusMeasurement/BusVoltage` | A tag of the component that owns the dashboard |
| **Absolute** | `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` | A tag of a named component, which can be a different component |

A path without a leading `/` is relative to the component that owns the dashboard, and the common branches are `DBC/...`, `Properties/...` and `Firmware/...`. Profinity resolves a relative path under the owning component when the dashboard loads. A relative path makes a dashboard reusable, because the dashboard does not contain the name of a component, which allows it to be renamed or applied to another component with the same tags. A component dashboard needs a leading `/` to bind to a tag in a different component.

A dashboard that has no owning component, such as a profile home dashboard, names the component in full, either with a leading `/`, which is the form the visual editor writes, or without it, as in `Prohelion BMU/Properties/StatusColourText` in the example profile that ships with Profinity.

If a component is mounted at a nested location in the tag tree, an absolute path includes that location. See [Tag Tree Path](../../Tags/Tag_Tree_Path.md).

!!! note "Dashboards From Earlier Versions"
    Dashboards written before Profinity 2.3 may use dots instead of slashes, as in `{COMPONENT_NAME}.BusMeasurement.BusVoltage` and `{COMPONENT_NAME}.[Property].Status`, the `{COMPONENT_NAME}` placeholder for the owning component, or the `[TimeSeries]` prefix on a source, as in `[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent`. These dashboards continue to work. New dashboards use the slash form shown in this guide, a relative path in place of the placeholder, and `seriesMode: timeSeries` in place of the prefix.

## Tags You Can Bind To

A binding can use any tag in the tree. The branch that a tag sits under shows where its value comes from, and the tags below are the ones that dashboards use most often.

### DBC Signal Tags

A component that reads Controller Area Network (CAN) bus messages publishes each signal in its DBC (CAN database) file as a tag, in the form `DBC/<Message>/<Signal>`:

- `DBC/BusMeasurement/BusVoltage` is the tag for a signal (`BusVoltage`) of a CAN message (`BusMeasurement`).
- `DBC/Status/LimitBusCurrent` is the tag for a limit flag signal (`LimitBusCurrent`, set when the bus current setpoint is limiting the motor torque) of a CAN message (`Status`).
- `/Prohelion BMU/DBC/PackStateOfCharge/SOCPercent` is the tag for a signal of a named component.

DBC tags suit real-time data, sensor readings and status indicators that the DBC file defines.

### Component Property Tags

The `Properties/` branch holds the tags that a component calculates or holds in addition to its DBC signals, and which tags exist depends on the component, so find them in the Tag Explorer:

- `Properties/StatusColourText` is the status colour of the component.
- `Properties/BusPower` is the bus power, in watts, that the WaveSculptor22 component calculates as the product of the `BusVoltage` and `BusCurrent` signals. The WaveSculptor22 does not transmit it as a signal.
- `Properties/PackData/BatteryMilliVolts` is the battery voltage data of a Prohelion Battery Management Unit (BMU) component, where nested names are separated by `/`.

Property tags suit component status, calculated values and data structures that the component defines in code.

### Derived Tags

A derived tag is a tag whose value Profinity computes from an expression or a script, and a dashboard binds to it exactly as it binds to any other tag. Use a derived tag when a dashboard needs a value that no device reports, such as a calculated power or a combined status, so that the calculation lives in one place instead of in every dashboard. Derived tags suit calculated values that several dashboards, rules or the API also use, and are described in [Derived Tags](../../Tags/Derived_Tags.md).

## Binding Modes

The mode of a binding decides what the dashboard reads from the tag. The `source` is a tag path in every mode.

### Latest Value

The default mode, `seriesMode: instant` with `store: local`, shows only the latest value of the tag. Readouts, lamps and most other components use it, and it is the setting to leave unchanged unless a chart needs history.

### Time Series

A chart plots history when its binding sets `seriesMode`. The value `timeSeries` plots the recent values of the tag over the window set by `timeRangeStart` and `timeRangeStop`, `timeSeriesDelta` plots the change between successive values, and `instant`, the default, shows only the latest value.

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

A series binding that sets `timeRangeStop` but omits `timeRangeStart` starts its window 10 minutes before the stop time, which is the same length of history that the visual editor sets when it adds a series, and a binding that sets neither shows only the latest value, so set both `timeRangeStart` and `timeRangeStop` on a series binding to state the history that the chart shows. Time values use a relative form, where `-5m` is five minutes before now and `0m` is now. Time series bindings suit charts, trends and the live history of any numeric tag.

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

Logged data requires data logging to be configured and enabled for the profile, as described in [How to Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md), and a logged binding returns no data while logging is not available. The `aggregationWindow` groups the data into intervals of the given length (for example `10s` or `1m`), and the `aggregationFunction` decides which value represents each interval. Logged bindings suit historical analysis over periods longer than the live window.

## Data Binding Syntax

A binding connects a dashboard component to a tag, and the binding settings can transform the value, convert its type, and map it to text.

### Basic Binding Structure

A component holds its bindings in a `bind` array of binding objects:

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

The schema requires only `source`, which is the tag path of the tag to bind (for example `DBC/BusMeasurement/BusVoltage` or `Properties/StatusColourText`). The `target` is optional in the schema, but it names the property that the value updates, so set it on every binding that is meant to change what a component shows. All other parameters are optional:

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | string | The component property to update (for example `value`, `label`, `enabled`, `visible`, `color`). See [Binding Targets](#binding-targets) |
| `toType` | string | Data type conversion (`number`, `string`, `boolean` or `string\|number`) |
| `gain` | number | Multiplicative scaling factor, applied before `offset` |
| `offset` | number | Additive offset, applied after `gain` |
| `invert` | boolean | Flips a boolean or `0`/`1` value |
| `mapToText` | object | Text mapping configuration. See [Text Mapping](#text-mapping) |
| `store` | string | `local` (the default) for live values, or `logged` for values read from the data log |
| `timeRangeStart` | string | Start of the time window for a logged or time series binding, relative to now (for example `-10m`). When `timeRangeStop` is set and this is omitted, the window starts 10 minutes before the stop time |
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

### Worked Scaling Example

The readout below shows a raw value that is a temperature in tenths of a kelvin. The `gain` of `0.1` converts the raw value to kelvin first, and the `offset` of `-273.15` is then added to give degrees Celsius, so a raw value of `2981.5` shows as `25.0` with the `precision` of 1. The tag `DBC/Example/RawTemperature` is a placeholder for a tag of your own.


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

## Where Next

[Tags](../../Tags/index.md) covers the Tag Explorer, [Derived Tags](../../Tags/Derived_Tags.md) and [Tag Linking](../../Tags/Tag_Linking.md), which adds tags to a dashboard from the Tag Explorer. [Conditional Styling](./Conditional_Styling.md) shows how `visible`, `enabled` and `color` bindings change the look of a component, [Component Reference](./Component_Reference/index.md) lists the targets of each component, and [Examples](./Examples.md) and the annotated [Full Example](./Full_Example.md) show complete dashboards.
