---
title: Troubleshooting Guide
description: "Diagnose and fix common dashboard issues including schema validation, data binding, and performance."
---

# Troubleshooting Guide

This page explains how to diagnose and fix problems with Profinity dashboards. It covers schema validation errors by their message, data that does not update or display, performance, and problems with individual components.

## Schema Validation Errors

!!! tip "The Visual Editor Lists Schema Problems for You"
    In **DESIGN** mode the same problems are listed under **Schema validation issues**, and **SAVE** is blocked until they are fixed. The examples below show the YAML behind each problem, and the **YAML** tab shows the exact lines that they refer to.

The editor checks the dashboard YAML and lists each problem as a path followed by a message, such as `/dashboard/items/0/row/items/0/chart: must NOT have additional properties`, where the numbers in the path count from zero. A dashboard that fails validation when it loads is replaced by a load error screen with the text "The dashboard's saved layout doesn't match the current schema. Reset it from the template, or open Edit Dashboard to repair the file manually." Users with the **Modify dashboards** permission can select **Reset from Template**, which discards the saved layout and loads the template, or open the YAML in **Edit Dashboard** and correct it. The following sections list common validation errors and how to fix them.

In each example, the block labelled `# Incorrect` shows the mistake and fails validation, and the block labelled `# Correct` shows the fix.

### Error: "must NOT have additional properties" for `charttype`

**Problem:** A chart takes its kind from `type`, not `charttype`, so the editor reports `must NOT have additional properties` for `charttype`, and `must have required property 'type'`.

**Solution:** Change `charttype` to `type`:

``` yaml
# Incorrect - 'charttype' is not a chart property
dashboard:
  items:
    - row:
        items:
          - chart:
              charttype: line
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
```

### Error: "must NOT have additional properties" for `groups` (Pill Component)

**Problem:** Pill components use `items` that contain `pillgroup` objects, not `groups`.

**Solution:** Use the correct structure:

``` yaml
# Incorrect - a pill has no 'groups' property
dashboard:
  items:
    - row:
        items:
          - pill:
              groups:
                - items:
                    - value:
                        label: "Value 1"
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - pill:
              items:
                - pillgroup:
                    items:
                      - value:
                          label: "Value 1"
```

### Error: "must NOT have additional properties" for `groups` (Lamps Component)

**Problem:** Lamps components use `items` that contain `lampgroup` objects, not `groups`.

**Solution:** Use the correct structure:

``` yaml
# Incorrect - lamps has no 'groups' property
dashboard:
  items:
    - row:
        items:
          - lamps:
              groups:
                - lamps:
                    - color: green
                      label: "Status"
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: green
                          label: "Status"
                          value: 1
```

### Error: "must NOT have additional properties" for `headersInfo` (Table Component)

**Problem:** Table components use `tableHeaders` with `header` objects, not `headersInfo`, and the key of each column is `accessorKey` with a capital K.

**Solution:** Use the correct structure:

``` yaml
# Incorrect - 'headersInfo' and 'accessorkey' are not table properties
dashboard:
  items:
    - row:
        items:
          - table:
              headersInfo:
                - accessorkey: name
                  value: "Name"
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - table:
              tableHeaders:
                - header:
                    accessorKey: name
                    value: "Name"
```

### Error: Readout Items Must Contain a `readout` Object

**Problem:** Readout items must be wrapped in a `readout` object. Without the wrapper, the editor reports `must NOT have additional properties` for the readout fields and `must have required property 'readout'`.

**Solution:** Wrap each readout item:

``` yaml
# Incorrect - the readout fields are not wrapped in a 'readout' object
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - label: "Temperature"
                  value: 25.5
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
```

### Error: Panel Items Must Contain a `panel` Object

**Problem:** Panel items in a `panels` component must be wrapped in a `panel` object.

**Solution:** Wrap each panel:

``` yaml
# Incorrect - the panel fields are not wrapped in a 'panel' object
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - title: "Status"
                  items:
                    - readouts:
                        items:
                          - readout:
                              label: "Status"
                              value: 0
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "Status"
                    items:
                      - readouts:
                          items:
                            - readout:
                                label: "Status"
                                value: 0
```

### Error: Tab Items Must Contain a `tab` Object, and a Tab Needs `header` and `items`

**Problem:** Tab items must be wrapped in a `tab` object, and each `tab` has a `header` for the label shown in the tab strip and `items` for the content of the tab. A tab that holds its content under another name, such as `body`, fails validation with `must have required property 'items'` and `must NOT have additional properties`.

**Solution:** Wrap each tab, and put the content of the tab in `items`:

``` yaml
# Incorrect - the tab fields are not wrapped in a 'tab' object
dashboard:
  items:
    - row:
        items:
          - tabs:
              items:
                - enabled: true
                  header:
                    - lamp:
                        color: green
                        label: "Tab 1"
                  items:
                    - readouts:
                        items:
                          - readout:
                              label: "Value"
                              value: 0
```

``` yaml
# Incorrect - the tab content is under 'body' instead of 'items'
dashboard:
  items:
    - row:
        items:
          - tabs:
              items:
                - tab:
                    header:
                      - lamp:
                          color: green
                          label: "Tab 1"
                    body:
                      - readouts:
                          items:
                            - readout:
                                label: "Value"
                                value: 0
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - tabs:
              items:
                - tab:
                    enabled: true
                    header:
                      - lamp:
                          color: green
                          label: "Tab 1"
                    items:
                      - panels:
                          items:
                            - panel:
                                title: "Content"
                                items:
                                  - readouts:
                                      items:
                                        - readout:
                                            label: "Value"
                                            value: 0
```

### Error: "must be equal to one of the allowed values" for Chart Type

**Problem:** Using an invalid chart type value.

**Solution:** Use one of the valid chart types: `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble`, `scatter`.

``` yaml
# Incorrect - 'spline' is not a chart type
dashboard:
  items:
    - row:
        items:
          - chart:
              type: spline
```

``` yaml
# Correct
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
```

### Error: "must have required property 'source'" in `bind`

**Problem:** Every binding must have a `source` property.

**Solution:** Add the `source` property:

``` yaml
# Incorrect - the bind has a 'target' but no 'source'
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
```

``` yaml
# Correct
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
                        source: DBC/DspBoardTempMeasurement/DspBoardTemp
```

## Data Binding Issues

### Data Not Updating

Components that show static values, or do not update when the data changes, usually have a `source` that does not match a tag. Open the tag in the Tag Explorer and check that the path in the binding matches it exactly, including a leading `/` for a tag of another component, and that the tag exists and shows a current value with a good quality flag. For a `DBC/` tag, check that the DBC file defines the signal and that the component is connected and sending data. If the tag shows a value but the component does not, check that `toType`, when it is set, matches the type that the tag publishes, because a number treated as a string displays but does not drive a lamp or a chart.

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

### Binding to Logged Data Not Working

A logged binding that returns no data usually means that data logging is not configured and enabled for the profile (see [How to Configure Data Logging](../../How_To_Guides/Configure_Data_Logging.md)), or that the time range is invalid. Set `timeRangeStart` in the past (for example `-10m`) and `timeRangeStop` after it, where `0m` means now. An invalid time range or aggregation window makes the binding return no data, so start with a simple binding such as the following and add the aggregation back once it returns data.

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

### Type Conversion Errors

Values that display incorrectly are usually the result of a `toType` that does not suit the data, such as `toType: number` on a non-numeric tag. Components convert most targets themselves, so set `toType` only where a value displays incorrectly: `boolean` for a flag bound to `enabled` or `visible`, and `number` for a numeric value.

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
                          label: "Status"
                          bind:
                            - target: enabled
                              source: DBC/Status/Online
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

### Charts Not Rendering

A chart that appears blank shows only the latest value unless its binding sets `seriesMode: timeSeries`, so add the series settings first. Then check in the Tag Explorer that the tag has a current value, and for logged data that the time range is valid. A chart that is given static data in its `value` property, rather than a binding, needs that data to have `labels` and `datasets`.

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

A dashboard that loads slowly or becomes unresponsive usually holds many components or charts with very frequent updates. Place unused sections in an accordion or tabs, and set `refreshInterval` (in milliseconds, minimum 1000) on a chart to poll it at a fixed interval instead of updating it live.

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

## Component-Specific Troubleshooting

### Image Does Not Appear

An icon or image that does not display is not being found. The web interface looks for the name first among the images built into Profinity and then in the `/Profile/Images` directory, so check that the file exists there, that the filename matches exactly including its case, that the property holds the filename alone and not a full path, and that the extension is one of `.svg`, `.png`, `.jpg`, `.jpeg` or `.webp`. A profile image with the same name as a built-in image is never used, so rename it. See [Profile Directories](./Profile_Directories.md#profileimages).

### Pill Values Do Not Group

Each `pillgroup` must contain an `items` array, and each item must be wrapped in a `value` object.

### Lamps Do Not Light or Change Colour

An `enabled` binding must return `0` or `1` (or `false` or `true`), and a lamp that is greyed out has `enabled` set to false. A lamp bound to `color` takes the colour name that the binding returns (see [Conditional Styling](./Conditional_Styling.md)), and the `value` property of the lamp must be set, typically to 1.

### Table Shows No Data or No Highlighting

Check that `tableHeaders` has the structure shown under the `headersInfo` error above, that each `accessorKey` matches a data property name, and that the data array is bound. Highlighting needs numeric data values and threshold properties such as `highlightAtOrBelow` or `highlightAtOrAbove`.

### Chart Type Is Not Supported or a Time Series Chart Does Not Update

The `type` property (not `charttype`) must be one of `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`. A time series chart needs `seriesMode: timeSeries` in its binding, or `store: logged` with data logging enabled, and a suitable time range.

### Image Regions Are Not Clickable or Data Values Are Missing

A region needs `x`, `y`, `width` and `height` values, which are percentages of the image size, and an `action` that is an object with an `invoke` value of `Navigate`, `Component`, `System` or `Endpoint`. The `action` needs a `target` when `invoke` is `Navigate`, or an `actionId` when `invoke` is `Component` or `System`. A data value that does not display needs a correct `bind`, a suitable `displayType`, and `maxValue` for the `graph` display type.

### HTML Content Does Not Render

The HTML must be valid and properly escaped in YAML, and multi-line content uses a literal block (`|` or `>`). The HTML sanitiser removes the `script`, `embed`, `object`, `form`, `input` and `button` elements, so content that depends on them does not appear. Images and stylesheets in HTML use the full paths `/Profile/Images/{filename}` and `/Profile/Styles/{filename}`, and the files must exist in those directories.

## Getting More Help

Review the dashboard schema through `GET /api/v2/UI/schema` for the exact property requirements, use the validation in the visual editor to catch errors early, and compare the dashboard with [Examples](./Examples.md), the annotated [Full Example](./Full_Example.md) and the [Component Reference](./Component_Reference/index.md). If the problem persists, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) and include the YAML configuration, any error messages, and the expected and actual behaviour.
