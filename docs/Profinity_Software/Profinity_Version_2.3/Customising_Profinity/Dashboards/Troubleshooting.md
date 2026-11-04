---
title: Troubleshooting guide
description: "Diagnose and fix dashboard problems by symptom: data that does not update, logged data, blank charts, slow dashboards and component faults."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Troubleshooting guide

This page explains how to diagnose and fix dashboard problems with data that does not update or display, performance, and individual components.

## Dashboard does not load

A dashboard that fails to load, or that cannot be saved, has a validation error, because Profinity loads only valid dashboards.
Open **Edit Dashboard** from the title bar, read the **Schema validation issues** list, which names each problem, and correct each entry.
The usual causes are a missing colon, wrong indentation, an invalid property name, or an absent required property.
The editor blocks **SAVE** while any entry remains, so save once the list is empty and close the editor to see the result.

A dashboard whose saved layout no longer matches the schema shows the message "This dashboard no longer matches the schema", with the buttons **Reset from Template** and **View Logs**.

Before you select **Reset from Template**, keep a copy of the dashboard:

1. Select **Edit Dashboard** from the title bar, then select the **YAML** tab.
2. Select all the YAML, copy it and paste it into a file of your own.

If Profinity saved the dashboard while it was valid, the file `<file>.bak` in the same folder as the dashboard holds the last valid version, and the reset leaves that file in place.

!!! warning
    **Reset from Template** replaces the dashboard with the latest template and loses every customisation, so use it only when you can discard the dashboard.

## Data binding issues

### Data not updating

Components that show static values, or fail to update when the data changes, usually have a `source` that differs from a tag.
Check the following in the Tag Explorer:

- The path in the binding matches the tag path exactly, including a leading `/` for a tag of another component.
- The tag exists and shows a current value with a good quality flag.

For a `DBC/` tag, check that the CAN database (DBC) file defines the signal and that the component is connected and sending data.
If the tag shows a value but the component does not, check that `toType`, when it is set, matches the type that the tag publishes.
A number treated as a string displays, but it does not drive a lamp or a chart.

To separate a binding fault from a data fault, temporarily replace the binding with a static value.
If the readout shows it, the readout displays correctly and the fault is in the binding or the data.
Add the binding back one element at a time to find the element that fails.

``` yaml
# Replace the binding with a static value to test the readout
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "TEST"
                    value: 42.5
```

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

A logged binding that returns no data usually has one of three causes: data logging still has to be configured and enabled for the profile, exactly one historian still has to have **Designated tag historian reader** enabled, or the time range is invalid.
For data logging, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md), and for the historian setting, refer to [Designated historian](../../Components/Historians/Designated_Historian.md).

Set `timeRangeStart` in the past (for example `-10m`) and `timeRangeStop` after it, where `0m` means now.
An invalid time range or aggregation window makes the binding return no data.
Start with the simple binding in this example, and add the aggregation back once it returns data.

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
Then check in the Tag Explorer that the tag has a current value.
For logged data, check that the time range is valid.
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
Place unused sections in an accordion or tabs.
Set `refreshInterval` (in milliseconds, minimum 1000) on a chart to poll it at a fixed interval instead of updating it live.

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

Match the symptom you see to the cause and the fix for each component.

| What you see | Cause | What to do |
|--------------|-------|------------|
| Image does not appear | The file is not being found. | Check that the file exists in the `images` folder of the profile, that the filename matches exactly, including its case, and that the property holds the filename alone and not a full path. A profile image with the same name as a built-in image is ignored, so rename it. For the accepted file types and the lookup order, refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md#images). |
| Style has no effect | The web interface loads only `profile.css`, the class does not match the CSS exactly, or the class is on a `readout` item, which has no effect. | Import any other stylesheet from `profile.css` in the `styles` folder of the profile. Make the class in the dashboard match the one in the CSS exactly. Put the class on the `readouts` element. For where the file goes, refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md#styles). |
| Pill values do not group | A `pillgroup` lacks an `items` array, or an item sits outside a `value` object. | Give each `pillgroup` an `items` array, and wrap each item in a `value` object. |
| Lamps do not light or change colour | The `enabled` binding returns a value outside `0` or `1` (or `false` or `true`), or the `value` property is unset. A lamp that is greyed out has `enabled` set to `false`. | Make the `enabled` binding return `0` or `1` (or `false` or `true`), and set the `value` property of the lamp, typically to `1`. A lamp bound to `color` takes the colour name that the binding returns, as described in [Conditional styling](./Data_Binding/Conditional_Styling.md). |
| Table shows no data or no highlighting | The `tableHeaders` structure is wrong, an `accessorKey` differs from a data property name, or the data array is unbound. Highlighting needs numeric data values and threshold properties. | Check that `tableHeaders` has the structure shown under [Table header parameters](./Component_Reference/Data/Tables.md#table-header-parameters), that each `accessorKey` matches a data property name, and that the data array is bound. For highlighting, use numeric data values and threshold properties such as `highlightAtOrBelow` or `highlightAtOrAbove`. |
| Chart type is not supported or a time series chart does not update | The chart uses a `type` value that is not supported, or its binding lacks the time series settings. | Set `type` (not `charttype`) to one of `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`. For a time series chart, set `seriesMode: timeSeries` in the binding, or `store: logged` with data logging enabled, and a suitable time range. |
| Image regions are not clickable or data values are missing | A region is missing its position values or a valid `action`, or a data value has an incorrect `bind`, `displayType` or `maxValue`. | Give each region `x`, `y`, `width` and `height` values as percentages of the image size. Set the `action` to an object with an `invoke` value of `Navigate`, `Component`, `System` or `Endpoint`. Set a `target` when `invoke` is `Navigate`, or an `actionId` when `invoke` is `Component` or `System`. Check the `bind` and the `displayType` of each data value, and set a `maxValue` for the `graph` display type. |
| HTML content does not render | The HTML is invalid or escaped incorrectly in YAML, the sanitiser removes an element such as `script`, `embed`, `object`, `form`, `input`, `button` or `link`, or an image is missing. | Make the HTML valid and properly escaped in YAML, and use a literal block (`\|` or `>`) for multi-line content. Remove content that depends on a removed element. Use the full URL path for images, and store each image file in the `images` folder of the profile. Put style rules in `profile.css` in the `styles` folder, as described in [Store dashboard files in a profile](./Store_Dashboard_Files.md#styles). |

## Getting more help

To find a problem early:

- Read the dashboard schema through `GET /api/v2/UI/schema` for the exact property requirements.
- Use the validation in the Visual Editor.
- Compare the dashboard with the annotated [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md) and the examples in the [Component reference](./Component_Reference/index.md).

If the problem persists, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) and include the YAML configuration, any error messages, and the expected and actual behaviour.
