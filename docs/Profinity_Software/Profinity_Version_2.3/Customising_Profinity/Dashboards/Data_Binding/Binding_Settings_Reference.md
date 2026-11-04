---
title: Binding settings reference
description: "Look up every setting a dashboard binding accepts, grouped by what it does, with its type, default, and the page that explains it."
type: reference
owner: Documentation
last_reviewed: 2026-11-04
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

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `source` | string | None | The tag path of the tag to bind (for example `DBC/BusMeasurement/BusVoltage` or `Properties/StatusColourText`). Refer to [Binding source paths](./index.md#binding-source-paths) |
| `target` | string | `value` | The component property to update (for example `value`, `label`, `enabled`, `visible`, `color`). A binding with a target that the component does not accept is ignored. Refer to [Conditional styling](./Conditional_Styling.md) |

## Transform

These settings change the value before the component shows it, and [Transform and map values](./Transform_and_Map_Values.md) shows each one in use.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `toType` | string | None | Data type conversion (`number`, `string`, `boolean` or `string\|number`) |
| `gain` | number | None | Multiplicative scaling factor, applied before `offset` |
| `offset` | number | None | Additive offset, applied after `gain` |
| `invert` | boolean | None | Flips a boolean or `0`/`1` value. It has an effect only when `toType` is set |
| `mapToText` | object | None | Text mapping configuration. Refer to [Text mapping](./Transform_and_Map_Values.md#text-mapping) |

## Mode

These settings decide whether the binding reads the latest value or a window of history, and [Binding modes](./index.md#binding-modes) explains them.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `seriesMode` | string | `instant` | `instant` (the default), `timeSeries`, or `timeSeriesDelta`. A chart plots a series of samples when this is `timeSeries` or `timeSeriesDelta`. The Visual Editor shows the window settings only for these two modes |
| `start` | string | `-10m` | Start of the time window, relative to now, such as `-10m`, or an ISO 8601 instant. When `stop` is set and this is omitted, the window starts 10 minutes before the stop time |
| `stop` | string | None | End of the time window, relative to now, where `0m` is now. When omitted, the window ends at now |
| `aggregationWindow` | string | None | Length of each interval used for the older values that come from the designated historian (for example `1m`). When omitted, Profinity chooses the length from the length of the window |
| `aggregationFunction` | string | `max` | How each interval is reduced for the older values from the designated historian: `max` (the default), `mean`, `min`, `last`, `first`, `sum`, or `count` |

Profinity reads the recent part of a window from memory, and the older part from the designated historian, as described in [Live and past data](./index.md#live-and-past-data).
Aggregation applies only to the values from the historian, and values from memory are not aggregated.

## Chart only

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `stackScale` | boolean | None | Gives this series its own Y axis |
| `seriesType` | string | None | `line`, `bar`, or `scatter`, overriding the chart type for this series |

The [Component reference](../Component_Reference/index.md) describes the chart, the targets of each component, and the other components.
The [Motor controller dashboard example](../Motor_Controller_Dashboard_Example.md) shows a complete dashboard.
