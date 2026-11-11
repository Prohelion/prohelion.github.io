---
title: Troubleshooting guide
description: "Diagnose and fix dashboard problems by symptom, such as data that does not update, missing historical data, blank charts and slow dashboards."
type: reference
owner: Documentation
last_reviewed: 2026-11-04
---

# Troubleshooting guide

This page explains how to diagnose and fix dashboard problems with data that does not update or display, performance, and individual components.

## Dashboard does not load

| What you see | Cause | What to do |
|---|---|---|
| The dashboard fails to load, or cannot be saved | The dashboard has a validation error, because Profinity loads only valid dashboards. The usual causes are a missing colon, wrong indentation, an invalid property name, or an absent required property. | Open **Edit Dashboard** from the title bar (you need the **Modify dashboards** permission), read the **Schema validation issues** list, which names each problem, and correct each entry. The editor blocks **SAVE** while any entry remains, so save once the list is empty and close the editor to see the result. |
| The message "This dashboard no longer matches the schema" appears, with the buttons **Reset from Template** and **View Logs** | The saved layout no longer matches the schema. | **View Logs** opens the Logs page in Administration. It appears only for users with the **Security administration** permission. Before you select **Reset from Template**, keep a copy of the dashboard: select **Edit Dashboard** from the title bar, select the **YAML** tab, select all the YAML, copy it, and paste it into a file of your own. The reset keeps the dashboard it replaces as `<file>.bak` in the same folder as the dashboard, and replaces any earlier `.bak` copy, so a `.bak` that holds a version you want to keep is lost unless you copy it first. |

!!! warning
    **Reset from Template** replaces the dashboard with the latest template and loses every customisation, so use it only when you can discard the dashboard.

## Data binding issues

### Data not updating

| What you see | Cause | What to do |
|---|---|---|
| Components show static values, or fail to update when the data changes | Usually, the `source` differs from a tag. | Check the following in the Tag Explorer: the path in the binding matches the tag path exactly, including a leading `/` for a tag of another component; and the tag exists and shows a current value with a good quality flag. For a `DBC/` tag, check that the CAN database (DBC) file defines the signal and that the component is connected and sending data. |
| The tag shows a value, but the component does not | - | Check that `toType`, when it is set, matches the type that the tag publishes. |
| A number displays, but it does not drive a lamp or a chart | The number is treated as a string. | Check that `toType`, when it is set, matches the type that the tag publishes. |

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

### Historical data does not appear

| What you see | Cause | What to do |
|---|---|---|
| A window that reaches back to older values returns no data | Usually one of three causes: data logging still has to be configured and enabled for the profile, exactly one historian still has to have **Designated tag historian reader** enabled, or the window is invalid. | For data logging, refer to [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md), and for the historian setting, refer to [Designated historian](../../Components/Historians/Designated_Historian.md). Set `start` in the past (for example `-10m`) and `stop` after it, where `0m` means now. An invalid window or aggregation window makes the binding return no data. Start with the simple binding in this example, and add the aggregation back once it returns data. |

``` yaml
# Start with a simple time series binding
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: DBC/Temperature/Value
                  seriesMode: timeSeries
                  start: "-10m"
                  stop: "0m"
```

### Old time range settings are refused

| What you see | Cause | What to do |
|---|---|---|
| Profinity refuses a dashboard that still uses `store`, `timeRangeStart` or `timeRangeStop`. The message names the setting and says to use `start` and `stop`. | The dashboard still uses those settings. | Remove `store` from each binding, rename `timeRangeStart` to `start` and `timeRangeStop` to `stop`, and save the dashboard again. Refer to [Dashboard time range settings are renamed](../../Release_Notes/Breaking_Changes_2_3.md#dashboard-time-range-settings-are-renamed) for the other changes that affect dashboards from earlier versions. |

### Type conversion errors

| What you see | Cause | What to do |
|---|---|---|
| Values display incorrectly | A `toType` that does not suit the data, such as `toType: number` on a non-numeric tag. | Components convert most targets themselves, so set `toType` only where a value displays incorrectly: `boolean` for a flag bound to `enabled` or `visible`, and `number` for a numeric value. |

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

| What you see | Cause | What to do |
|---|---|---|
| A chart appears blank | The binding does not set `seriesMode: timeSeries`, so the chart shows only the latest value. | Add the series settings first. Then check in the Tag Explorer that the tag has a current value. |
| The chart does not render for a window that reaches back to older values | - | Check that the window is valid and that the designated historian holds values for the tag in that window. |
| The chart does not render from static data in its `value` property | - | Give that data `labels` and `datasets`, as in the example below. |

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
                  start: "-5m"
                  stop: "0m"
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

| What you see | Cause | What to do |
|---|---|---|
| A dashboard loads slowly or becomes unresponsive | The dashboard usually holds many components or charts with very frequent updates. | Place unused sections in an accordion or tabs. Set `refreshInterval` (in milliseconds, minimum 1000) on a chart to poll it at a fixed interval instead of updating it live. |

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
                  start: "-5m"
                  stop: "0m"
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
| Chart type is not supported or a time series chart does not update | The chart uses a `type` value that is not supported, or its binding lacks the time series settings. | Set `type` (not `charttype`) to one of `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`. For a time series chart, set `seriesMode: timeSeries` in the binding, with a suitable `start` and `stop` window. For older values, enable data logging and designate a historian. |
| Image regions are not clickable or data values are missing | A region is missing its position values or a valid `action`, or a data value has an incorrect `bind`, `displayType` or `maxValue`. | Give each region `x`, `y`, `width` and `height` values as percentages of the image size. Set the `action` to an object with an `invoke` value of `Navigate`, `Component`, `System` or `Endpoint`. Set a `target` when `invoke` is `Navigate`, or an `actionId` when `invoke` is `Component` or `System`. Check the `bind` and the `displayType` of each data value, and set a `maxValue` for the `graph` display type. |
| HTML content does not render | The HTML is invalid or escaped incorrectly in YAML, the sanitiser removes `script`, `embed`, `object`, `form`, `input` and `button`, and any element not on its allow list, such as `link` or `style`, or an image is missing. | Make the HTML valid and properly escaped in YAML, and use a literal block (`\|`, which keeps line breaks) or a folded block (`>`, which joins lines) for multi-line content. Remove content that depends on a removed element. Use the full URL path for images, and store each image file in the `images` folder of the profile. Put style rules in `profile.css` in the `styles` folder, as described in [Store dashboard files in a profile](./Store_Dashboard_Files.md#styles). |

## Getting more help

To find a problem early:

- Read the dashboard schema for the exact property requirements. Sign in to Profinity, then open `/api/v2/UI/schema` on the Profinity address. This route belongs to the web interface, not the public API, so do not build integrations on it.
- Use the validation in the Visual Editor.
- Compare the dashboard with the annotated [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md) and the examples in the [Component reference](./Component_Reference/index.md).

If the problem persists, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) and include the YAML configuration, any error messages, and the expected and actual behaviour.
