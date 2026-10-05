---
title: Troubleshooting Guide
description: "Diagnose and fix common dashboard issues including schema validation, data binding, and performance."
---

# Troubleshooting Guide

This guide explains how to diagnose and fix common issues when creating Profinity dashboards, and covers schema validation errors, data binding issues, performance problems, and component-specific troubleshooting.

## Table of Contents

- [Schema Validation Errors](#schema-validation-errors)
- [Data Binding Issues](#data-binding-issues)
- [Performance Considerations](#performance-considerations)
- [Component-Specific Troubleshooting](#component-specific-troubleshooting)
- [Common Mistakes](#common-mistakes)
- [Getting More Help](#getting-more-help)

## Schema Validation Errors

!!! tip "Using the visual editor?"
    In **DESIGN** mode the same problems are listed under **Schema validation issues**, and **SAVE** is blocked until they are fixed. The examples below show the YAML behind each problem. Use the **YAML** tab to see and edit the exact lines they refer to.

The dashboard editor checks the dashboard YAML and lists each problem as a path followed by a message, such as `/dashboard/items/0/row/items/0/chart: must NOT have additional properties`. The visual editor refuses to save a dashboard that has validation issues, and a dashboard that fails validation when it loads is replaced by a load error screen that offers **Reset from Template** to users with the `DashboardModify` permission. The following sections list common validation errors and how to fix them.

In each example, the block labelled `# Incorrect` shows the mistake and fails validation, and the block labelled `# Correct` shows the fix.

### Error: "must NOT have additional properties" for `charttype`

**Problem:** The old property name `charttype` is used instead of `type`. The editor reports `must NOT have additional properties` for `charttype`, and `must have required property 'type'`.

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

### Error: "must NOT have additional properties" for `groups` (Pill component)

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

### Error: "must NOT have additional properties" for `groups` (Lamps component)

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

### Error: "must NOT have additional properties" for `headersInfo` (Table component)

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

### Error: Readout items must contain a `readout` object

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

### Error: Panel items must contain a `panel` object

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

### Error: Tab items must contain a `tab` object, and a tab needs `header` and `items`

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

### Error: "must be equal to one of the allowed values" for chart type

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

### Error: "must have required property 'source'" in bind

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

**Symptoms:** Dashboard components show static values or do not update when data changes.

**Possible Causes:**

1. **Incorrect Tag Path**
   - Find the tag in the Tag Explorer and check that the `source` path matches it exactly, for example `DBC/Message/Signal` for a CAN signal
   - For a tag of another component, check that the path starts with `/` and that the component name is correct
   - Check for typos in the names within the path

2. **Tag Does Not Exist or Has No Value**
   - Open the tag in the Tag Explorer and check that it exists and shows a current value and a good quality flag
   - Verify the component is connected and sending data
   - For a `DBC/` tag, check that the DBC file defines the signal

3. **Type Mismatch**
   - Ensure `toType`, when it is set, matches the expected data type
   - Check that numeric values are not being treated as strings

**Solution:**

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

**Symptoms:** Logged data bindings return no data or errors.

**Possible Causes:**

1. **InfluxDB Not Configured**
   - Verify InfluxDB is running and configured
   - Check that data logging is enabled

2. **Time Range Issues**
   - Ensure `timeRangeStart` is in the past (e.g., "-10m")
   - Check that `timeRangeStop` is after `timeRangeStart`, where `"0m"` means now

3. **Aggregation Window Too Large**
   - Reduce `aggregationWindow` if no data is returned
   - Try smaller windows like "1s" or "10s"

**Solution:**

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

**Symptoms:** Values display incorrectly or cause errors.

**Possible Causes:**

1. **Missing `toType` for Boolean Values**
   - Boolean bindings often need explicit type conversion

2. **Incorrect Type Conversion**
   - Using `toType: number` on non-numeric data

**Solution:**

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

## Performance Considerations

### Dashboard Loads Slowly

**Symptoms:** Dashboard takes a long time to load or becomes unresponsive.

**Possible Causes:**

1. **Too Many Components**
   - Large numbers of components can slow rendering
   - Consider using accordions or tabs to hide unused sections

2. **High-Frequency Data Updates**
   - Charts with very frequent updates can impact performance
   - Set `refreshInterval` (in milliseconds, minimum 1000) to poll the chart at a fixed interval instead of updating it live

3. **Complex Data Bindings**
   - Multiple bindings with transformations can slow updates
   - Simplify bindings where possible

**Solutions:**

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

### Charts Not Rendering

**Symptoms:** Charts appear blank or do not display data.

**Possible Causes:**

1. **Incorrect Data Format**
   - A chart shows only the latest value unless the binding sets `seriesMode: timeSeries`
   - Structured data must have `labels` and `datasets`

2. **Missing Data**
   - Verify the tag has a current value in the Tag Explorer
   - Check time range for logged data

**Solution:**

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

## Component-Specific Troubleshooting

### Pill Component

**Issue:** Icon not displaying

- Verify image file exists in `/Profile/Images` directory
- Check image filename matches exactly (case-sensitive)
- Ensure image format is supported (SVG, PNG, JPG)

**Issue:** Values not grouping correctly

- Ensure each `pillgroup` contains `items` array
- Each item must be wrapped in a `value` object

### Lamps Component

**Issue:** Lamps not showing/hiding correctly

- Verify that the `enabled` binding source returns `0` or `1` (or `true` or `false`)
- A lamp that is greyed out has `enabled` set to false, and a lamp bound to `color` takes the colour name that the binding returns (see [Conditional Styling](./Conditional_Styling.md))
- Ensure `value` property is set (typically 1)

### Tables Component

**Issue:** Table shows no data

- Verify `tableHeaders` structure is correct
- Check that `accessorKey` matches data property names
- Ensure data array is bound correctly

**Issue:** Highlighting not working

- Verify threshold values are correct
- Check that `highlightAtOrBelow`, `highlightAtOrAbove` are set correctly
- Ensure data values are numeric

### Charts Component

**Issue:** Chart type not supported

- Use one of: `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble`, `scatter`
- Check that `type` property (not `charttype`) is used

**Issue:** Time series chart not updating

- Verify that the binding sets `seriesMode: timeSeries` (or `store: logged` for logged data)
- Check that data logging is enabled when `store: logged` is used
- Ensure time range is appropriate

### Image Component

**Issue:** Image not loading

- Verify image file exists in `/Profile/Images` directory
- Check filename matches exactly (case-sensitive)
- Ensure image is referenced by filename only (not full path)

**Issue:** Regions not clickable

- Verify that the region has `x`, `y`, `width`, and `height` values, which are percentages of the image size
- Check that `action` is an object with an `invoke` value of `Navigate`, `Component`, `System`, or `Endpoint`
- Ensure `target` is provided inside `action` when `invoke` is `Navigate`, or `actionId` when `invoke` is `Component` or `System`

**Issue:** Data values not displaying

- Verify `bind` is correctly configured
- Check that `displayType` is set appropriately
- Ensure `maxValue` is set for `graph` display type

### HTML Component

**Issue:** HTML content not rendering

- Verify HTML is valid
- Check that content is properly escaped in YAML
- Use YAML literal block syntax (`|` or `>`) for multi-line content

**Issue:** Images/styles not loading in HTML

- Use `/Profile/Images/{filename}` for images
- Use `/Profile/Styles/{filename}` for stylesheets
- Verify files exist in the correct directories

## Common Mistakes

### Using Old Property Names

**Mistake:** Using deprecated property names like `charttype`, `groups`, `headersInfo`.

**Fix:** Always use current property names: `type`, `items` with proper structure, `tableHeaders`.

### Incorrect Nesting Structure

**Mistake:** Not wrapping items in required objects (e.g., `readout`, `lamp`, `value`, `panel`, `tab`).

**Fix:** Always check the schema structure and wrap items correctly.

### Missing Required Properties

**Mistake:** Omitting required properties like `source` in bindings, `label` in readouts, `color` in lamps.

**Fix:** Review component documentation for required properties.

### Incorrect Tag Paths

**Mistake:** Typos in component names or in the names within a tag path.

**Fix:** Copy the path from the Tag Explorer. Use relative paths such as `DBC/Message/Signal` for a tag of the component that owns the dashboard, and start the path with `/` for a tag of another component.

### Profile Asset Path Issues

**Mistake:** Using full file paths instead of just filenames for profile assets.

**Fix:** Reference images, styles, and content by filename only in component properties. Profinity automatically serves them from `/Profile/Images`, `/Profile/Styles`, and `/Profile/Content` (see [Profile Directories](./Profile_Directories.md)).

## Getting More Help

If an issue persists:

1. **Check the Schema** - Review the dashboard schema (`GET /api/v2/UI/schema`) for exact property requirements
2. **Validate Your YAML** - Use the dashboard editor's validation to catch errors early
3. **Review Examples** - Check [Examples](./Examples.md) and the annotated [Full Example](./Full_Example.md) for working code samples
4. **Check Component Reference** - See [Component Reference](./Component_Reference/index.md) for detailed property information
5. **Contact Prohelion** - If issues persist, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) with:

   - The YAML configuration
   - Any error messages
   - The expected and actual behaviour

