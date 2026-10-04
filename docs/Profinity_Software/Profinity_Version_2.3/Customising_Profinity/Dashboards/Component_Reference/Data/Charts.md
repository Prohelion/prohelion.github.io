---
title: Charts Component
description: "Data visualisation component supporting line, bar, radar, pie, doughnut, bubble, scatter, and polar area charts."
---

# Charts

Data visualisation component. Charts provide a graphical representation of data, showing patterns and changes over time.

Profinity supports multiple chart types. Line and bar charts are shown below:

**Line Chart** - Shows trends and changes over time:
<figure markdown>
![Line chart component displaying data trends over time with connected data points](../../images/charts_line.png)
<figcaption>Line chart component displaying data trends over time with connected data points</figcaption>
</figure>

**Bar Chart** - Compares discrete values or categories:
<figure markdown>
![Bar chart component displaying data comparison using rectangular bars](../../images/charts_bar.png)
<figcaption>Bar chart component displaying data comparison using rectangular bars</figcaption>
</figure>

**Best for:** Data trends, historical analysis, performance monitoring, visual data representation, time-series data

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Stable identity used to track the chart instance. The value is not displayed |
| `class` | string | No | None | Not used by the web interface |
| `type` | string | Yes | None | Chart type, one of `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`. See [Chart Types](#chart-types) for details |
| `value` | object or array | No | None | Static chart data in the Chart.js dataset format (for example `labels` and `datasets`, or the datasets of a `bubble`, `scatter` or `radar` chart), or a seed shape for a chart whose live series come from `bind` |
| `legend` | boolean | No | `false` | Whether to show the legend. The default is `true` for `pie`, `doughnut` and `polarArea` charts, and a line chart with more than one series also shows its legend |
| `refreshInterval` | number | No | None | Automatic refresh interval in milliseconds. The web interface honours values of `1000` and above, and a chart with a refresh interval polls for its data instead of using the live data feed |
| `showControls` | boolean | No | None | Not used by the web interface |
| `min` | number | No | None | Fixed lower bound of the value axis. The bound is calculated from the data when omitted |
| `max` | number | No | None | Fixed upper bound of the value axis. The bound is calculated from the data when omitted |
| `label` | string | No | None | Title displayed above the chart |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Tag and time-series bindings that supply the chart data. Use the `value` target |

**Chart Binding Options:**

A chart binding accepts the following properties in addition to the common binding properties that the [Data Binding](../../Data_Binding.md) page describes:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `seriesMode` | string | `instant` | How the bound samples are presented: `instant` for the live value, `timeSeries` for an absolute series of recent samples, or `timeSeriesDelta` for the differences between successive samples |
| `seriesType` | string | Chart type | Overrides the chart `type` for one series with `line`, `bar` or `scatter` |
| `stackScale` | boolean | `false` | When `true`, the series gets its own value axis in a stack of axes |
| `store` | string | `local` | `local` for recent samples held in memory or `logged` for samples read from the logged history |
| `timeRangeStart` | string | None | Start of the time range for the series, in the InfluxDB range format. Always set `timeRangeStart` and `timeRangeStop` on a series binding, because a hand-written `seriesMode: timeSeries` binding without a window receives no default |
| `timeRangeStop` | string | None | End of the time range for the series, where `0m` is now |

## Chart Types

Profinity supports the following chart types:

- **`line`** - Line charts display data points connected by lines, which suits trends over time
- **`bar`** - Bar charts display data as rectangular bars, which suits comparing discrete values
- **`radar`** - Radar charts display multivariate data in a two-dimensional form
- **`doughnut`** - Doughnut charts display data as a circular chart with a hole in the centre
- **`pie`** - Pie charts display data as proportional slices of a circle
- **`polarArea`** - Polar area charts display data as sectors of a circle
- **`bubble`** - Bubble charts display three dimensions of data (x, y, and size)
- **`scatter`** - Scatter charts display data points across two axes

**Data Binding Example:**

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

**Static Chart Example:**

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

**Time Series Example:**

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
```

**Refresh Interval Example:**

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
```
