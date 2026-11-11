---
title: Troubleshoot dashboards
description: "Find the cause of a dashboard problem by symptom and fix it, from a dashboard that does not load to data that does not update or a blank chart."
type: reference
owner: Documentation
last_reviewed: 2026-11-11
---

# Troubleshoot dashboards

Find the symptom you see in the tables on this page, then follow the fix in the same row.
The YAML examples go in the **YAML** tab of **Edit Dashboard**, which you open from the dashboard title bar with the **Modify dashboards** permission.
In each example, replace the tag path, such as `DBC/Temperature/Value`, with the path of your own tag as it appears in **TAG EXPLORER**.

## Dashboard does not load

| What you see | Cause | What to do |
|---|---|---|
| The dashboard does not load, or **SAVE** is unavailable in the editor | The dashboard has a schema error. The usual causes are a missing colon, wrong indentation, an unknown property name, or a missing required property. | Open **Edit Dashboard** and read the **Schema validation issues** list, which names each problem. Correct each entry. The editor allows **SAVE** once the list is empty. |
| The message "This dashboard no longer matches the schema" appears, with **Reset from Template** and **View Logs** | The saved layout was written for an earlier schema and no longer matches it. | Select **View Logs** to read the reason. Correct the schema errors that **Schema validation issues** lists, or reset the dashboard from the template as described in [Reset a dashboard from the template](#reset-a-dashboard-from-the-template). **View Logs** appears only for users with the **Security administration** permission. |

### Reset a dashboard from the template

!!! warning "Keep a copy first"
    **Reset from Template** replaces the dashboard with the current template.
    Profinity keeps the replaced dashboard as `<file>.bak` in the same folder, but the next reset or save replaces that copy.
    Keep your own copy so that you can return to your layout.

1. Select **Edit Dashboard** in the dashboard title bar, then select the **YAML** tab.
2. Select all the YAML, copy it, and save it in a text file with the `.yaml` extension.
3. Close the editor and select **Reset from Template**.
4. Check that the dashboard loads from the template.

To return to your layout, open **Edit Dashboard**, select the **YAML** tab, replace its content with the YAML from your copy, correct each entry in **Schema validation issues**, and select **SAVE**.

Profinity has no restore command. To restore the replaced dashboard from its `.bak` file, copy `<file>.bak` back over the dashboard file of the same name in the same folder. For the default home dashboard, copy `dashboard.yaml.bak` over `dashboard.yaml`.

## Data binding issues

### Data not updating

| What you see | Cause | What to do |
|---|---|---|
| Components show static values, or do not change when the data changes | The binding `source` does not match a tag. | In **TAG EXPLORER**, check that the path in the binding matches the tag path exactly, including a leading `/` for a tag of another component. Check that the tag shows a current value with Good quality. For a `DBC/` tag, check that the CAN database (DBC) file defines the signal and that the component is connected and receiving data. |
| The tag shows a value, but the component does not | The value does not convert to the type that `toType` sets, so the component shows the binding's fallback value. | Change `toType` to match the type the tag publishes, or remove `toType` so that the component converts the value itself. |
| A number displays, but it does not drive a lamp or a chart | The number arrives as a string. | Set `toType: number` on the binding. |

To find out whether a fault is in the binding or in the data, replace the binding with a static value.
If the readout shows the static value, the readout works and the fault is in the binding or the data.
Then add the binding back:

``` yaml
# Step 1: a static value tests the readout on its own
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
# Step 2: bind the readout to the tag path shown in TAG EXPLORER
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
| A window that reaches back to older values returns no data | Data logging is not set up for the profile. | Set up data logging, as described in [How to configure data logging](../../How_To_Guides/Configure_Data_Logging.md). |
| A window that reaches back to older values returns no data, and data logging is set up | No historian has **Designated tag historian reader** turned on, so Profinity has nowhere to read older values from. | Turn on **Designated tag historian reader** on exactly one historian, as described in [Designated historian](../../Components/Historians/Designated_Historian.md). |
| The binding returns no data at all | `start`, `stop` or `aggregationWindow` is not a value Profinity can read, or the window does not make sense. `start` and `stop` take a time relative to now, such as `-10m`, or an ISO 8601 instant. A blank `start` means 10 minutes before `stop`. A blank `stop`, `0m` and `now()` mean the anchor time. A `start` in the future is not invalid by itself, but a `start` after the `stop` is. `aggregationWindow` takes a positive length in `s`, `m`, `h` or `d`, such as `1m`, and can be left blank. Zero, a negative value, `w` and `y` are not valid. Using `store`, `timeRangeStart` or `timeRangeStop` in a binding also makes the query invalid. | Correct the value. Start with the simple binding in the following example, then add `aggregationWindow` back once it returns data. The settings are described in [Binding settings reference](./Data_Binding/Binding_Settings_Reference.md). |

``` yaml
# A simple time series binding over the last 10 minutes
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
| Profinity refuses a dashboard, and the message names `store`, `timeRangeStart` or `timeRangeStop` and says to use `start` and `stop` | The dashboard was written for an earlier version and still uses those settings. | Remove `store` from each binding, rename `timeRangeStart` to `start` and `timeRangeStop` to `stop`, then select **SAVE**. For the other changes that affect older dashboards, refer to [Dashboard time range settings are renamed](../../Release_Notes/Breaking_Changes_2_3.md#dashboard-time-range-settings-are-renamed). |

### Type conversion errors

| What you see | Cause | What to do |
|---|---|---|
| Values display incorrectly | `toType` does not suit the data, such as `toType: number` on a tag that holds text. | Set `toType` only where a value displays incorrectly: `boolean` for a flag bound to `enabled` or `visible`, and `number` for a numeric value. Components convert most targets themselves. |

``` yaml
# A boolean flag that turns a lamp on and off
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
# A numeric value in a readout
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
| A chart shows only the latest value, or appears blank | The binding does not set `seriesMode: timeSeries`. | Add `seriesMode: timeSeries` with a `start` and `stop` window, as in the time series example after this table. Then check in **TAG EXPLORER** that the tag has a current value. |
| A chart is blank for a window that reaches back to older values | The designated historian holds no points for the tag in that window, or the window is not valid. | Check the window as described in [Historical data does not appear](#historical-data-does-not-appear), and check that the designated historian records the tag. |
| A chart does not draw the static data in its `value` property | Profinity draws static data only when `value` has a `labels` array and a `datasets` array. | Give the data `labels` and `datasets`, as in the structured data example after this table. |

``` yaml
# Time series data over the last 5 minutes
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
# Structured static data
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
| A dashboard loads slowly or stops responding | The dashboard holds many components, or charts that update very often. | Put sections you do not need all the time in an accordion or in tabs. On a chart, set `refreshInterval` in milliseconds, at least `1000`, so that the chart polls at that interval instead of updating live. A value below `1000` is ignored, and the chart keeps updating live. |

``` yaml
# A chart that polls every second instead of updating live
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
# An accordion that keeps a section closed until it is needed
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

| What you see | Cause | What to do |
|---|---|---|
| An image does not appear | Profinity cannot find the file. | Check that the file is in the `images` folder of the profile, that the name matches exactly, including its case, and that the property holds the file name alone, not a path. Rename a profile image that has the same name as a built-in image, because Profinity uses the built-in one. For the accepted file types, refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md#images). |
| A style has no effect | The web interface loads only `profile.css`, the class name differs from the one in the stylesheet, or the class is on a `readout` item, where it has no effect. | Put the rules in `profile.css` in the `styles` folder of the profile, or import another stylesheet from it with an `@import` rule. Match the class name exactly. Put the class on the `readouts` element. Refer to [Store dashboard files in a profile](./Store_Dashboard_Files.md#styles). |
| Pill values do not group | A `pillgroup` has no `items` array, or an item sits outside a `value` object. | Give each `pillgroup` an `items` array, and wrap each item in a `value` object. |
| Lamps do not light or change colour | The `enabled` binding returns a value other than `0`, `1`, `false` or `true`, or the lamp has no `value`. A greyed-out lamp has `enabled` set to `false`. | Make the `enabled` binding return `0` or `1` (or `false` or `true`), and set the lamp `value`, usually to `1`. A lamp bound to `color` takes the colour name that the binding returns, as described in [Conditional styling](./Data_Binding/Conditional_Styling.md). |
| A table shows no data or no highlighting | `tableHeaders` has the wrong structure, an `accessorKey` differs from a data property name, or the data array is not bound. Highlighting needs numeric values and threshold properties. | Check `tableHeaders` against [Table header parameters](./Component_Reference/Data/Tables.md#table-header-parameters), match each `accessorKey` to a data property name, and bind the data array. For highlighting, use numeric values with `highlightAtOrBelow` or `highlightAtOrAbove`. |
| A chart type is refused, or a time series chart does not update | `type` holds a value that is not supported, or the binding has no time series settings. | Set `type` (not `charttype`) to `bar`, `line`, `radar`, `doughnut`, `pie`, `polarArea`, `bubble` or `scatter`. For a time series chart, set `seriesMode: timeSeries` with a `start` and `stop` window. |
| Image regions do not respond, or data values are missing | A region has no position values or no valid `action`, or a data value has a wrong `bind`, `displayType` or `maxValue`. | Give each region `x`, `y`, `width` and `height` as percentages of the image size. Set `action` to an object with `invoke` set to `Navigate`, `Component`, `System` or `Endpoint`, and add a `target` for `Navigate` or an `actionId` for `Component` and `System`. Check the `bind` and `displayType` of each data value, and set `maxValue` for the `graph` display type. |
| HyperText Markup Language (HTML) content does not render | The HTML is not valid or is escaped wrongly in YAML, or it uses an element that Profinity removes. Profinity removes `script`, `embed`, `object`, `form`, `input` and `button`, and any element it does not allow, such as `link` or `style`. | Make the HTML valid, and use a literal block (`\|`, which keeps line breaks) or a folded block (`>`, which joins lines) for content over several lines. Remove content that relies on a removed element, and put style rules in `profile.css` instead. In an `img` tag, give the address of the image, such as `/Profile/Images/system-diagram.svg`, and keep the file in the `images` folder of the profile. |

## Getting more help

To find a problem before it reaches the dashboard:

- Read the **Schema validation issues** list in **Edit Dashboard** before you save.
- Compare your dashboard with the annotated [Motor controller dashboard example](./Motor_Controller_Dashboard_Example.md) and the examples in the [Component reference](./Component_Reference/index.md).
- Read the full schema for the exact property rules. Sign in to Profinity, then open `/api/v2/UI/schema` on the Profinity address. This route serves the web interface, so do not build integrations on it.

If the problem persists, contact Prohelion through the [Prohelion website](https://www.prohelion.com/contact-us/) with the dashboard YAML, any error messages, and what you expected to see.
