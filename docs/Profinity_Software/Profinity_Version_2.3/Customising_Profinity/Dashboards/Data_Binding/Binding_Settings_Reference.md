---
title: Binding settings reference
description: "Look up every setting a dashboard binding accepts, grouped by what it does, with its type, default, and the page that explains it."
type: reference
owner: Documentation
last_reviewed: 2026-10-18
---

# Binding settings reference

A binding is an object in the `bind` list of a component.
A `bind` list can hold several bindings, one for each property that the data drives.
This page is a lookup table of every binding setting, and each group links to the page that explains it.

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

## Source and target

The schema requires only `source`, and every other setting is optional.
The `target` names the property that the value updates, so set it on every binding that is meant to change what a component shows.

| Setting | Type | Description |
|---------|------|-------------|
| `source` | string | The tag path of the tag to bind (for example `DBC/BusMeasurement/BusVoltage` or `Properties/StatusColourText`). Refer to [Binding source paths](./index.md#binding-source-paths) |
| `target` | string | The component property to update (for example `value`, `label`, `enabled`, `visible`, `color`). A binding with a target that the component does not accept is ignored. Refer to [Conditional styling](./Conditional_Styling.md) |

## Transform

These settings change the value before the component shows it, and [Transform and map values](./Transform_and_Map_Values.md) shows each one in use.

| Setting | Type | Description |
|---------|------|-------------|
| `toType` | string | Data type conversion (`number`, `string`, `boolean` or `string\|number`) |
| `gain` | number | Multiplicative scaling factor, applied before `offset` |
| `offset` | number | Additive offset, applied after `gain` |
| `invert` | boolean | Flips a boolean or `0`/`1` value |
| `mapToText` | object | Text mapping configuration. Refer to [Text mapping](./Transform_and_Map_Values.md#text-mapping) |

## Mode

These settings decide whether the binding reads the latest value, recent history or the data log, and [Binding modes](./index.md#binding-modes) explains them.

| Setting | Type | Description |
|---------|------|-------------|
| `seriesMode` | string | `instant` (the default), `timeSeries`, or `timeSeriesDelta`. A chart plots a series of samples when this is `timeSeries` or `timeSeriesDelta` |
| `store` | string | `local` (the default) for live values, or `logged` for values read from the data log |
| `timeRangeStart` | string | Start of the time window for a logged or time series binding, relative to now (for example `-10m`). When `timeRangeStop` is set and this is omitted, the window starts 10 minutes before the stop time |
| `timeRangeStop` | string | End of the time window, where `0m` is now |
| `aggregationWindow` | string | Length of each aggregation interval for logged data (for example `1m`) |
| `aggregationFunction` | string | How each interval is reduced for logged data: `max` (the default), `mean`, `min`, `last`, `first`, `sum`, or `count` |

## Chart only

| Setting | Type | Description |
|---------|------|-------------|
| `stackScale` | boolean | Gives this series its own Y axis |
| `seriesType` | string | `line`, `bar`, or `scatter`, overriding the chart type for this series |

The [Component reference](../Component_Reference/index.md) describes the chart, the targets of each component, and the other components.
The [Motor controller dashboard example](../Motor_Controller_Dashboard_Example.md) shows a complete dashboard.
