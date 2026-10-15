---
title: Binding settings and targets
description: "Look up every setting a dashboard binding accepts, with its type, default, and effect, and the targets that each component handles."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Binding settings and targets

A binding is an object in the `bind` list of a component, and the settings on this page control which tag it reads, which property it drives and how the value is read.
A component holds its bindings in a `bind` array of binding objects, and the binding settings can transform the value, convert its type, and map it to text.
A `bind` list can hold several bindings, one for each property that the data drives, as described in [Binding targets](#binding-targets).

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
```

## Binding parameters

The schema requires only `source`, which is the tag path of the tag to bind (for example `DBC/BusMeasurement/BusVoltage` or `Properties/StatusColourText`).
The `target` is optional in the schema, but it names the property that the value updates, so set it on every binding that is meant to change what a component shows.
All other parameters are optional:

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | string | The component property to update (for example `value`, `label`, `enabled`, `visible`, `color`). Refer to [Binding targets](#binding-targets) |
| `toType` | string | Data type conversion (`number`, `string`, `boolean` or `string\|number`) |
| `gain` | number | Multiplicative scaling factor, applied before `offset` |
| `offset` | number | Additive offset, applied after `gain` |
| `invert` | boolean | Flips a boolean or `0`/`1` value |
| `mapToText` | object | Text mapping configuration. Refer to [Text mapping](./Transform_and_Map_Values.md#text-mapping) |
| `store` | string | `local` (the default) for live values, or `logged` for values read from the data log |
| `timeRangeStart` | string | Start of the time window for a logged or time series binding, relative to now (for example `-10m`). When `timeRangeStop` is set and this is omitted, the window starts 10 minutes before the stop time |
| `timeRangeStop` | string | End of the time window, where `0m` is now |
| `aggregationWindow` | string | Length of each aggregation interval for logged data (for example `1m`) |
| `aggregationFunction` | string | How each interval is reduced for logged data: `max` (the default), `mean`, `min`, `last`, `first`, `sum`, or `count` |
| `seriesMode` | string | `instant` (the default), `timeSeries`, or `timeSeriesDelta`. A chart plots a series of samples when this is `timeSeries` or `timeSeriesDelta`, and a chart bound with `store: logged` reads its history from the data log |
| `stackScale` | boolean | Chart only: gives this series its own Y axis |
| `seriesType` | string | Chart only: `line`, `bar`, or `scatter`, overriding the chart type for this series |

## Binding targets

Each component accepts a fixed set of `target` values, and a binding with any other target is ignored.
The most common targets are as follows:

| Component | Targets |
|-----------|---------|
| Readout | `value`, `label`, `unit`, `enabled`, `visible` |
| Pill value | `value`, `label`, `unit` |
| Lamp | `value`, `enabled`, `color`, `label` |
| Tab | `enabled`, `visible` |
| Accordion, Footer | `visible` |
| Action, Toggle | `enabled`, `classes` |
| Chart, Table | `value` |

[Conditional Styling](./Conditional_Styling.md) shows how `visible`, `enabled`, and `color` are used.

[Data Binding](./Data_Binding.md) explains how a binding names a tag and the binding modes, and [Transform and Map Values](./Transform_and_Map_Values.md) shows `toType`, `gain`, `offset`, `invert` and `mapToText` in use.
[Component Reference](./Component_Reference/index.md) lists the targets of each component.
