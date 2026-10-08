---
title: Conditional Styling
description: "Dynamically change component appearance, visibility, and behaviour based on real-time data values."
---

# Conditional Styling

Conditional styling allows dashboard components to change their appearance, visibility, and behaviour based on real-time data values, so that a dashboard adapts to system state and gives users immediate visual feedback.

Conditional styling lets a dashboard component change its appearance, visibility and behaviour with the current value of a tag, so that a dashboard follows the state of the system and shows it without any user action. It uses [data binding](./Data_Binding.md): the same `bind` list as every other dashboard component, where the `target` of a binding names the component property that the data drives and a value mapping turns a number or boolean into a colour name or label. Each component accepts only a fixed set of targets, and a binding with a target that the component does not support is ignored.

| Target | Effect | Components |
|--------|--------|------------|
| `visible` | Hides the component when the value is false (`0` or `false`). Not supported on lamps, rows, groups or panels. | Readout, Tab, Accordion, Footer |
| `enabled` | Greys the component out when the value is false, but keeps it on screen | Readout, Lamp, Tab, Action, Toggle |
| `color` | Sets the lamp colour (`red`, `green`, `amber`, `grey`, `on`, `off`, `disabled`, `unknown`) | Lamp |
| `label` | Replaces the label text | Readout, Lamp, Pill value |
| `classes` | Adds CSS class names to the component | Action, Toggle |

The Readout, Lamp, Tab, Accordion, Footer, and Action definitions in the [Component Reference](./Component_Reference/index.md) and the dashboard schema list the targets for each component.

## Show or Hide a Component

Binding the `visible` target shows or hides a component with a data value, which suits a detail readout that matters only while a limit is active, a tab or accordion that is hidden when its data is not available, or advanced readouts that appear once a condition is met. The `visible` target removes the component from view, whereas the `enabled` target leaves it on screen in a greyed state, so that users can see that the item exists while a component is offline.

The following readout always shows the bus current, and it appears only while the controller reports that the bus current limit is active, because the `visible` binding follows the `DBC/Status/LimitBusCurrent` tag. When the tag value is `0` the readout is hidden, and when it is `1` the readout is shown.

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "BUS CURRENT (LIMITED)"
                    unit: "A"
                    precision: 1
                    value: 0
                    bind:
                      - target: value
                        source: DBC/BusMeasurement/BusCurrent
                      - target: visible
                        source: DBC/Status/LimitBusCurrent
                        toType: boolean
```

A `visible` binding only changes the display when it receives a value. If the tag stops updating, a readout, accordion or footer keeps its last visibility state, so a readout that should have disappeared stays on screen, whereas a tab is hidden because the tab treats a missing value as false. To hide a lamp, place it in an accordion that has a `visible` binding.

## Change Colour or Label

Binding a lamp `color` or a `label` changes how a component looks with a data value, for example a lamp that changes colour when a status flag is set, or a text label such as "Online" or "Offline" in place of a number. The `classes` target of an action or toggle applies CSS classes according to the system mode in the same way.

The following lamp is green while the `LimitBusCurrent` flag is `0` and amber while it is `1`. The `partition` list alternates a label and a threshold, so a value below `1` takes the first colour and a value of `1` or more takes the second.

``` yaml
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
                          label: "BUS CURRENT LIMIT"
                          value: 1
                          bind:
                            - target: color
                              source: DBC/Status/LimitBusCurrent
                              mapToText:
                                partition: ["green", 1, "amber"]
                                bias: right
```

A partition with more thresholds styles a value by range, which suits status indicators and alerts. The following lamp is green below 60, amber from 60 up to (but not including) 80, and red from 80 upward. With `bias: right`, a value equal to a threshold takes the label after that threshold, and with `bias: left` it takes the label before it.

``` yaml
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
                          label: "DSP TEMP"
                          value: 1
                          bind:
                            - target: color
                              source: DBC/DspBoardTempMeasurement/DspBoardTemp
                              mapToText:
                                partition: ["green", 60, "amber", 80, "red"]
                                bias: right
```

Do not rely on colour alone to convey a status, because some users cannot tell red from green. A second binding on the same lamp can change the `label` with the same partition, so that the text states the condition as well as the colour:

``` yaml
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
                          label: "DSP TEMP"
                          value: 1
                          bind:
                            - target: color
                              source: DBC/DspBoardTempMeasurement/DspBoardTemp
                              mapToText:
                                partition: ["green", 60, "amber", 80, "red"]
                                bias: right
                            - target: label
                              source: DBC/DspBoardTempMeasurement/DspBoardTemp
                              mapToText:
                                partition: ["DSP TEMP NORMAL", 60, "DSP TEMP HIGH", 80, "DSP TEMP CRITICAL"]
                                bias: right
```

## Where Next

[Data Binding](./Data_Binding.md) describes the binding settings used here, [Component Reference](./Component_Reference/index.md) lists the targets of each component, and [Examples](./Examples.md) and the annotated [Full Example](./Full_Example.md) show conditional styling in complete dashboards.
