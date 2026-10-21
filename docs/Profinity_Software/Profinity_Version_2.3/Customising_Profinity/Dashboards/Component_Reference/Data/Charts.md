---
title: Charts component
description: "Data visualisation component supporting line, bar, radar, pie, doughnut, bubble, scatter, and polar area charts."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Charts component

A chart is a graphical representation of bound or static data that shows patterns and changes over time.
Profinity supports eight [chart types](#chart-types), and the figures show a line chart and a bar chart.

<figure markdown>
![A line chart of one series over about fourteen minutes, flat near zero, spiking to about 3,000 at 16:09, then varying between 500 and 2,000.](../../images/charts_line.png)
<figcaption>Line chart component displaying data trends over time with connected data points</figcaption>
</figure>

<figure markdown>
![A bar chart with rectangular bars that compare values across categories](../../images/charts_bar.png)
<figcaption>Bar chart component displaying data comparison using rectangular bars</figcaption>
</figure>

Use a chart for data trends, historical analysis, performance monitoring and time series data.
Use [Readouts](Readouts.md) when only the latest value matters, and a [Table](Tables.md) when the exact values matter more than the shape of the data.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Optional identifier of the chart. The value is not displayed |
| `class` | string | No | None | Not used by the web interface |
| `type` | string | Yes | None | Chart type, one of `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`. Refer to [Chart types](#chart-types) for details |
| `value` | object or array | No | None | Static chart data, or a starting shape for a chart whose live series come from `bind` |
| `legend` | boolean | No | Depends on chart type | Whether to show the legend. The default is `true` for `pie`, `doughnut` and `polarArea` charts, and a line chart with more than one series also shows its legend |
| `refreshInterval` | number | No | None | Automatic refresh interval in milliseconds. The web interface honours values of `1000` and above |
| `showControls` | boolean | No | None | Not used by the web interface |
| `min` | number | No | None | Fixed lower bound of the value axis. The bound is calculated from the data when omitted |
| `max` | number | No | None | Fixed upper bound of the value axis. The bound is calculated from the data when omitted |
| `label` | string | No | None | Title displayed above the chart |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Tag and time-series bindings that supply the chart data. Use the `value` target |

Most chart types take static data as `labels` and `datasets`, and a `bubble`, `scatter` or `radar` chart takes datasets only.
A chart with a `refreshInterval` polls for its data instead of using the live data feed.

### Chart binding options

A chart binding accepts two chart-only properties, in addition to the common binding properties that the [Binding settings reference](../../Data_Binding/Binding_Settings_Reference.md) describes:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `seriesType` | string | Chart type | Overrides the chart `type` for one series with `line`, `bar` or `scatter` |
| `stackScale` | boolean | `false` | When `true`, the series gets its own value axis in a stack of axes |

The same reference describes `seriesMode`, `store`, `timeRangeStart`, `timeRangeStop`, `aggregationWindow` and `aggregationFunction`.
A `seriesMode` of `timeSeriesDelta` plots the differences between successive samples.
Set `timeRangeStart` and `timeRangeStop` together on a `timeSeries` binding that needs a particular history.
The Visual Editor sets `-10m` and `0m` when you choose a series mode.

## Chart types

| Chart type | Use |
|------------|-----|
| `line` | Data points connected by lines, which suits trends over time |
| `bar` | Rectangular bars, which suit comparing discrete values or categories |
| `radar` | Multivariate data in a two-dimensional form |
| `doughnut` | A circular chart with a hole in the centre |
| `pie` | Proportional slices of a circle |
| `polarArea` | Sectors of a circle |
| `bubble` | Three dimensions of data: x, y, and size |
| `scatter` | Data points across two axes |

## Example

A bar chart that takes its data from a binding:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: bar
              legend: false
              bind:
                - target: value
                  source: /Prohelion BMU/Properties/PackData/CellTempsSummaryGraph
```

A line chart with static data:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              legend: true
              value:
                labels: ["Jan", "Feb", "Mar", "Apr"]
                datasets:
                  - label: "Sales"
                    data: [65, 59, 80, 81]
                  - label: "Revenue"
                    data: [28, 48, 40, 19]
```

A line chart that shows the last five minutes of a time series:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              label: Bus Current
              legend: false
              bind:
                - target: value
                  source: "DBC/BusMeasurement/BusCurrent"
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```

The same time series chart with a refresh interval of 5000 milliseconds:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              refreshInterval: 5000
              bind:
                - target: value
                  source: "DBC/BusMeasurement/BusCurrent"
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```
