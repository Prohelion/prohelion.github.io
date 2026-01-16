---
title: Troubleshooting Guide
---

# Troubleshooting Guide

This guide helps you diagnose and fix common issues when creating Profinity dashboards. It covers schema validation errors, data binding issues, performance problems, and component-specific troubleshooting.

## Table of Contents

- [Schema Validation Errors](#schema-validation-errors)
- [Data Binding Issues](#data-binding-issues)
- [Performance Considerations](#performance-considerations)
- [Component-Specific Troubleshooting](#component-specific-troubleshooting)
- [Common Mistakes](#common-mistakes)

## Schema Validation Errors

The dashboard editor validates your YAML against the UI schema. If validation fails, the dashboard cannot be loaded. Here are common validation errors and how to fix them.

### Error: "Property 'charttype' is not defined"

**Problem:** You're using the old property name `charttype` instead of `type`.

**Solution:** Change `charttype` to `type`:

``` yaml
# ❌ Incorrect - using 'charttype' instead of 'type' (this would fail validation)
# Note: This example is shown for documentation but uses invalid property name
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line  # Correct: use 'type' not 'charttype'

# ✅ Correct
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
```

### Error: "Property 'groups' is not defined" (Pill component)

**Problem:** Pill components use `items` with `pillgroup` structure, not `groups`.

**Solution:** Use the correct structure:

``` yaml
# ❌ Incorrect - using 'groups' instead of 'items' with 'pillgroup'
# Note: This example shows the wrong structure - pill uses 'items' not 'groups'
# Also note: pill must be wrapped in a row within dashboard.items
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

# ✅ Correct
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

### Error: "Property 'groups' is not defined" (Lamps component)

**Problem:** Lamps components use `items` with `lampgroup` structure, not `groups`.

**Solution:** Use the correct structure:

``` yaml
# ❌ Incorrect - using 'groups' instead of 'items' with 'lampgroup'
# Note: This example shows the wrong structure - lamps uses 'items' not 'groups'
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

# ✅ Correct
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

### Error: "Property 'headersInfo' is not defined" (Table component)

**Problem:** Table components use `tableHeaders` with `header` objects, not `headersInfo`.

**Solution:** Use the correct structure:

``` yaml
# ❌ Incorrect - using 'headersInfo' and 'accessorkey' instead of 'tableHeaders' and 'accessorKey'
# Note: This example shows the wrong property names
dashboard:
  items:
    - row:
        items:
          - table:
              tableHeaders:
                - header:
                    accessorKey: name
                    value: "Name"

# ✅ Correct
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

### Error: "Readout items must contain 'readout' object"

**Problem:** Readout items must be wrapped in a `readout` object.

**Solution:** Wrap each readout item:

``` yaml
# ❌ Incorrect - missing 'readout' wrapper
# Note: This example shows the wrong structure - items must be 'readout' objects
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5

# ✅ Correct
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

### Error: "Panel items must contain 'panel' object"

**Problem:** Panel items in a `panels` component must be wrapped in a `panel` object.

**Solution:** Wrap each panel:

``` yaml
# ❌ Incorrect - missing 'panel' wrapper
# Note: This example shows the wrong structure - items must be 'panel' objects
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

# ✅ Correct
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

### Error: "Tab items must contain 'tab' object"

**Problem:** Tab items must be wrapped in a `tab` object.

**Solution:** Wrap each tab:

``` yaml
# ❌ Incorrect - missing 'tab' wrapper
# This structure would fail: tabs.items must contain 'tab' objects, not direct properties
# The WRONG way (shown in comment): tabs.items: - enabled: true (missing 'tab' wrapper)
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
                    body:
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

# ✅ Correct
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
                    body:
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

### Error: "Invalid enum value" for chart type

**Problem:** Using an invalid chart type value.

**Solution:** Use one of the valid chart types: `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble`, `scatter`.

### Error: "Required property 'source' is missing" in bind

**Problem:** Every binding must have a `source` property.

**Solution:** Add the `source` property:

``` yaml
# ❌ Incorrect - bind missing 'source' property
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
                        source: '{COMPONENT_NAME}.Temperature'  # Required: bind must have both target and source

# ✅ Correct
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
                        source: '{COMPONENT_NAME}.Temperature.Value'
```

## Data Binding Issues

### Data Not Updating

**Symptoms:** Dashboard components show static values or don't update when data changes.

**Possible Causes:**

1. **Incorrect Data Source Path**
   - Check that the `source` path matches your DBC signal names exactly
   - Verify component name is correct (or use `{COMPONENT_NAME}` placeholder)
   - Check for typos in property names

2. **Data Source Doesn't Exist**
   - Verify the component is connected and sending data
   - Check that the DBC file defines the signals you're trying to access
   - Use the Profinity data browser to verify signal paths

3. **Type Mismatch**
   - Ensure `toType` matches the expected data type
   - Check that numeric values aren't being treated as strings

**Solution:**

``` yaml
# Verify the source path matches your DBC signals
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
                        source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
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
   - Check that `timeRangeStop` is after `timeRangeStart`

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
                  source: '{COMPONENT_NAME}.Temperature.Value'
                  store: "logged"
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
                          label: "Status"
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Online'
                              toType: boolean

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
                        source: '{COMPONENT_NAME}.Temperature.Value'
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
   - Use `refreshInterval` to limit update frequency

3. **Complex Data Bindings**
   - Multiple bindings with transformations can slow updates
   - Simplify bindings where possible

**Solutions:**

``` yaml
# Limit chart refresh rate
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              refreshInterval: 1000
              bind:
                - target: value
                  source: "[TimeSeries].{COMPONENT_NAME}.Data.Value"

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

**Symptoms:** Charts appear blank or don't display data.

**Possible Causes:**

1. **Incorrect Data Format**
   - Time series data must be in specific format
   - Structured data must have `labels` and `datasets`

2. **Missing Data**
   - Verify data source is providing data
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
                  source: "[TimeSeries].{COMPONENT_NAME}.Data.Value"

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

- Verify `enabled` property is bound correctly
- Check that `toType: boolean` is used for boolean bindings
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

- Verify `[TimeSeries]` prefix is used in source
- Check that data logging is enabled
- Ensure time range is appropriate

### Image Component

**Issue:** Image not loading

- Verify image file exists in `/Profile/Images` directory
- Check filename matches exactly (case-sensitive)
- Ensure image is referenced by filename only (not full path)

**Issue:** Regions not clickable

- Verify `coordinates` are in `xywh` format
- Check that `action` is set to "navigate" or "action"
- Ensure `target` or `actionId` is provided

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

### Incorrect Data Source Paths

**Mistake:** Typos in component names or signal paths.

**Fix:** Use `{COMPONENT_NAME}` placeholder when possible, verify exact signal names from DBC files.

### Profile Asset Path Issues

**Mistake:** Using full file paths instead of just filenames for profile assets.

**Fix:** Reference images/styles/content by filename only. They're automatically served from `/Profile/Images`, `/Profile/Styles`, `/Profile/Content`.

## Getting More Help

If you're still experiencing issues:

1. **Check the Schema** - Review `ui-schema.json` for exact property requirements
2. **Validate Your YAML** - Use the dashboard editor's validation to catch errors early
3. **Review Examples** - Check [Examples](./Examples.md) for working code samples
4. **Check Component Reference** - See [Component Reference](./Component_Reference/index.md) for detailed property information
5. **Contact Support** - If issues persist, contact Profinity support with:
   - Your YAML configuration
   - Error messages
   - Expected vs. actual behavior

