---
title: Troubleshooting guide
description: "Diagnose and fix dashboard problems by symptom: data that does not update, logged data, blank charts, slow dashboards and component faults."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Troubleshooting guide

This page explains how to diagnose and fix problems with data that does not update or display, performance, and individual components.
For schema validation errors by their message, refer to [Dashboard Schema Validation Errors](./Schema_Validation_Errors.md).

## Data binding issues

### Data not updating

Components that show static values, or do not update when the data changes, usually have a `source` that does not match a tag.
Open the tag in the Tag Explorer and check that the path in the binding matches it exactly, including a leading `/` for a tag of another component, and that the tag exists and shows a current value with a good quality flag.
For a `DBC/` tag, check that the DBC file defines the signal and that the component is connected and sending data.
If the tag shows a value but the component does not, check that `toType`, when it is set, matches the type that the tag publishes, because a number treated as a string displays but does not drive a lamp or a chart.

``` yaml
# Verify the source path matches the tag path in the Tag Explorer
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Bus Voltage"
                    bind:
                      - target: value
                        source: DBC/BusMeasurement/BusVoltage
                        toType: number
```

### Binding to logged data not working

A logged binding that returns no data usually means that data logging is not configured and enabled for the profile (refer to [How to Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md)), or that the time range is invalid.
Set `timeRangeStart` in the past (for example `-10m`) and `timeRangeStop` after it, where `0m` means now.
An invalid time range or aggregation window makes the binding return no data, so start with a simple binding such as the following and add the aggregation back once it returns data.

``` yaml
# Start with a simple logged data binding
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/Temperature/Value
                  store: logged
                  timeRangeStart: "-10m"
                  timeRangeStop: "0m"
                  aggregationWindow: "1m"
                  aggregationFunction: "mean"
```

### Type conversion errors

Values that display incorrectly are usually the result of a `toType` that does not suit the data, such as `toType: number` on a non-numeric tag.
Components convert most targets themselves, so set `toType` only where a value displays incorrectly: `boolean` for a flag bound to `enabled` or `visible`, and `number` for a numeric value.

``` yaml
# For boolean values
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
                          label: "Bus current limit"
                          bind:
                            - target: enabled
                              source: DBC/Status/LimitBusCurrent
                              toType: boolean
```

``` yaml
# For numeric values
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    bind:
                      - target: value
                        source: DBC/Temperature/Value
                        toType: number
```

### Charts not rendering

A chart that appears blank shows only the latest value unless its binding sets `seriesMode: timeSeries`, so add the series settings first.
Then check in the Tag Explorer that the tag has a current value, and for logged data that the time range is valid.
A chart that is given static data in its `value` property, rather than a binding, needs that data to have `labels` and `datasets`.

``` yaml
# For time series data
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/Data/Value
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```

``` yaml
# For structured data
dashboard:
  items:
    - row:
        items:
          - chart:
              type: bar
              value:
                labels: ["Jan", "Feb", "Mar"]
                datasets:
                  - label: "Sales"
                    data: [10, 20, 30]
```

## Performance

A dashboard that loads slowly or becomes unresponsive usually holds many components or charts with very frequent updates.
Place unused sections in an accordion or tabs, and set `refreshInterval` (in milliseconds, minimum 1000) on a chart to poll it at a fixed interval instead of updating it live.

``` yaml
# Poll the chart every second instead of updating it live
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              refreshInterval: 1000
              bind:
                - target: value
                  source: DBC/Data/Value
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```

``` yaml
# Use accordions to hide unused sections
dashboard:
  items:
    - accordion:
        label: "Detailed Data"
        items:
          - row:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Value"
                          value: 0
```

## Component-specific troubleshooting

### Image does not appear

An icon or image that does not display is not being found.
The web interface looks for the name first among the images built into Profinity and then in the `/Profile/Images` directory, so check that the file exists there, that the filename matches exactly including its case, that the property holds the filename alone and not a full path, and that the extension is one of `.svg`, `.png`, `.jpg`, `.jpeg` or `.webp`.
A profile image with the same name as a built-in image is never used, so rename it.
Refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md#profileimages).

### Pill values do not group

Each `pillgroup` must contain an `items` array, and each item must be wrapped in a `value` object.

### Lamps do not light or change colour

An `enabled` binding must return `0` or `1` (or `false` or `true`), and a lamp that is greyed out has `enabled` set to false.
A lamp bound to `color` takes the colour name that the binding returns (refer to [Conditional Styling](./Data_Binding/Conditional_Styling.md)), and the `value` property of the lamp must be set, typically to 1.

### Table shows no data or no highlighting

Check that `tableHeaders` has the structure shown under [the `headersInfo` error](./Schema_Validation_Errors.md#error-must-not-have-additional-properties-for-headersinfo-table-component), that each `accessorKey` matches a data property name, and that the data array is bound.
Highlighting needs numeric data values and threshold properties such as `highlightAtOrBelow` or `highlightAtOrAbove`.

### Chart type is not supported or a time series chart does not update

The `type` property (not `charttype`) must be one of `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`.
A time series chart needs `seriesMode: timeSeries` in its binding, or `store: logged` with data logging enabled, and a suitable time range.

### Image regions are not clickable or data values are missing

A region needs `x`, `y`, `width` and `height` values, which are percentages of the image size, and an `action` that is an object with an `invoke` value of `Navigate`, `Component`, `System` or `Endpoint`.
The `action` needs a `target` when `invoke` is `Navigate`, or an `actionId` when `invoke` is `Component` or `System`.
A data value that does not display needs a correct `bind`, a suitable `displayType`, and `maxValue` for the `graph` display type.

### HTML content does not render

The HTML must be valid and properly escaped in YAML, and multi-line content uses a literal block (`|` or `>`).
The HTML sanitiser removes the `script`, `embed`, `object`, `form`, `input` and `button` elements, so content that depends on them does not appear.
Images and stylesheets in HTML use the full paths `/Profile/Images/{filename}` and `/Profile/Styles/{filename}`, and the files must exist in those directories.

## Getting more help

Review the dashboard schema through `GET /api/v2/UI/schema` for the exact property requirements, use the validation in the visual editor to catch errors early, and compare the dashboard with the annotated [Motor Controller Dashboard Example](./Motor_Controller_Dashboard_Example.md) and the examples in the [Component Reference](./Component_Reference/index.md).
If the problem persists, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) and include the YAML configuration, any error messages, and the expected and actual behaviour.
