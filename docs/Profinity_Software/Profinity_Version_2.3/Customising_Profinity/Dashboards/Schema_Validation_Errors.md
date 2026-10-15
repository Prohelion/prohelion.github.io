---
title: Dashboard schema validation errors
description: "Find a dashboard schema validation message, see the YAML that causes it, and apply the matching fix for each component and binding."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Dashboard schema validation errors

This page explains how to read and fix the schema validation errors that the dashboard editor reports.
The editor checks the dashboard YAML and lists each problem as a path followed by a message, such as `/dashboard/items/0/row/items/0/chart: must NOT have additional properties`, where the numbers in the path count from zero.
In **DESIGN** mode the same problems are listed under **Schema validation issues**, and **SAVE** is blocked until they are fixed.
The examples below show the YAML behind each problem, and the **YAML** tab shows the exact lines that they refer to.

A dashboard that fails validation when it loads is replaced by a load error screen with the text "The dashboard's saved layout doesn't match the current schema. Reset it from the template, or open Edit Dashboard to repair the file manually." Users with the **Modify dashboards** permission can select **Reset from Template**, which discards the saved layout and loads the template, or open the YAML in **Edit Dashboard** and correct it.
The following sections list common validation errors and how to fix them.

In each example, the block labelled `# Incorrect` shows the mistake and fails validation, and the block labelled `# Correct` shows the fix.

## Error: "must NOT have additional properties" for `charttype`

A chart takes its kind from `type`, not `charttype`, so the editor reports `must NOT have additional properties` for `charttype`, and `must have required property 'type'`.

Change `charttype` to `type`:

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

## Error: "must NOT have additional properties" for `groups` (Pill component)

Pill components use `items` that contain `pillgroup` objects, not `groups`.

Use the correct structure:

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

## Error: "must NOT have additional properties" for `groups` (Lamps component)

Lamps components use `items` that contain `lampgroup` objects, not `groups`.

Use the correct structure:

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

## Error: "must NOT have additional properties" for `headersInfo` (Table component)

Table components use `tableHeaders` with `header` objects, not `headersInfo`, and the key of each column is `accessorKey` with a capital K.

Use the correct structure:

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

## Error: readout items must contain a `readout` object

Readout items must be wrapped in a `readout` object. Without the wrapper, the editor reports `must NOT have additional properties` for the readout fields and `must have required property 'readout'`.

Wrap each readout item:

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

## Error: panel items must contain a `panel` object

Panel items in a `panels` component must be wrapped in a `panel` object.

Wrap each panel:

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

## Error: tab items must contain a `tab` object, and a tab needs `header` and `items`

Tab items must be wrapped in a `tab` object, and each `tab` has a `header` for the label shown in the tab strip and `items` for the content of the tab. A tab that holds its content under another name, such as `body`, fails validation with `must have required property 'items'` and `must NOT have additional properties`.

Wrap each tab, and put the content of the tab in `items`:

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

## Error: "must be equal to one of the allowed values" for chart type

The `type` of the chart is not a valid chart type.

Use one of the valid chart types: `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble`, `scatter`.

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

## Error: "must have required property 'source'" in `bind`

Every binding must have a `source` property.

Add the `source` property:

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

For data that does not update, performance and problems with a single component, refer to [Troubleshooting](./Troubleshooting.md).
