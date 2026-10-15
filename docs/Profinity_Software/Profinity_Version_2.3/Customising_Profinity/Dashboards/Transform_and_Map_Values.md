---
title: Transform and map values
description: "Convert a bound value to another type, scale it with gain and offset, invert it, or map it to display text, with complete dashboard YAML examples."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Transform and map values

Binding settings can transform the value, convert its type, and map it to text.
This page covers type conversion with `toType`, scaling with `gain` and `offset`, inversion with `invert`, and text mapping with `mapToText`.
Refer to [Binding Settings and Targets](./Binding_Settings_Reference.md) for the full list of binding settings.

## Type conversion

Use `toType` to convert data types.
Each component already applies the conversion that suits each of its targets (for example, a lamp `enabled` target is always read as a boolean), so `toType` is optional for most bindings and is shown in these examples for clarity:

```yaml
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

## Scaling and offset

Apply mathematical transformations with `gain` and `offset`:

```yaml
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

The readout in the next example shows a raw value that is a temperature in tenths of a kelvin.
The `gain` of `0.1` converts the raw value to kelvin first, and the `offset` of `-273.15` is then added to give degrees Celsius, so a raw value of `2981.5` shows as `25.0` with the `precision` of 1.
The tag `DBC/Example/RawTemperature` is a placeholder for a tag of your own.

```yaml
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

To invert a boolean or numerical value, set `invert: true`:

```yaml
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

## Text mapping

Map values to display text using boolean or partition-based mapping.
A boolean mapping gives one text for a true value and another for a false value:

```yaml
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

A partition-based mapping gives a text for each range of a number:

```yaml
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

The partition array defines ranges in the form `[label1, threshold1, label2, threshold2, label3]`, so that a value below `threshold1` takes `label1`, a value from `threshold1` up to `threshold2` takes `label2`, and any higher value takes `label3`.
The `bias` is required, and it is either `left` or `right`: with `left` a value equal to a threshold takes the label before that threshold, and with `right` it takes the label after it.
The text that results can drive a `label` target, or a lamp `color` target when the labels are colour names.


[Conditional Styling](./Conditional_Styling.md) uses text mapping to drive lamp colours and labels, and [Examples](./Examples.md) holds complete dashboards.
