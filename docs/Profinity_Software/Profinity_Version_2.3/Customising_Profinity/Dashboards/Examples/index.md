---
title: Dashboard examples
description: "Copy schema-checked dashboard YAML, from a Hello World template through readouts, lamps, and charts to motor controller and battery examples."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Dashboard examples

This page shows Profinity dashboards from simple component displays to complete real-world implementations, and every YAML block validates against the dashboard schema.
Readers new to dashboards should begin with the progressive examples, which build from a Hello World dashboard to charts, and the complete motor controller dashboard is listed and analysed in [Full Example](./Full_Example.md).
Building blocks for motor controller and battery dashboards are in [Motor Controller and Battery Examples](./Motor_Controller_and_Battery_Examples.md), and examples of the HTML, Image, and Table components are in [Dashboard Component Examples](./Component_Examples.md).

The examples assume a Prohelion D1000 Gen2 BMS component that is named `D1000 Gen2 BMS` in the Profile.
The component name in each tag path is the name given to the component in the Profile, so change it to match your own component, and find the tags in the [Tag Explorer](../../../Tags/index.md).
The `version` stamp is optional in the schema, so the Hello World template includes `version: "2.3"` and the other examples omit it.

## Progressive examples

These examples build from the simplest possible dashboard to more complex ones.

### Example 0: Hello World template

A new custom component starts with this Hello World template, and the **NEW FROM TEMPLATE** button in the visual editor loads it again at any time (a component can supply its own template, in which case that template loads instead):

``` yaml
version: "2.3"
dashboard:
    items:
        - row:
            direction: vertical
            items:
            - group:
                class: statscontainer
                items:
                    - pill:
                        icon:
                            image: IbmWatsonKnowledgeStudio
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM DASHBOARD
                            - value:
                                label: For more information on how to configure dashboard files, see the Profinity documentation at https://docs.prohelion.com
```

The template is a vertical row holding a styled group with one pill, which has an icon and two values: one labelled `CUSTOM DASHBOARD` and one that points to the documentation.
Add bindings and further components to it, as in the examples that follow.

### Example 1: Simple readout with formatting

A readout with a unit and a precision shows a value as `25.5 °C`:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
                    unit: "°C"
                    precision: 1
```

### Example 2: Multiple readouts with binding

Two readouts, each bound to a tag, show a temperature to one decimal place and a pressure to two:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 0
                    unit: "°C"
                    precision: 1
                    bind:
                      - target: value
                        source: /D1000 Gen2 BMS/DBC/SensorData1/Temperature1
                - readout:
                    label: "Pressure"
                    value: 0
                    unit: "kPa"
                    precision: 2
                    bind:
                      - target: value
                        source: /D1000 Gen2 BMS/DBC/SensorData1/Pressure
```

### Example 3: Add status lamps

A lamp bound to `enabled` lights while the `BMSStateENABLED` flag is set, beside a bound readout:

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
                          label: "Enabled"
                          value: 1
                          enabled: true
                          bind:
                            - target: enabled
                              source: /D1000 Gen2 BMS/DBC/BMSInfo/BMSStateENABLED
                              toType: boolean
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 0
                    unit: "°C"
                    precision: 1
                    bind:
                      - target: value
                        source: /D1000 Gen2 BMS/DBC/SensorData1/Temperature1
```

### Example 4: Add charts

A line chart bound with `seriesMode: timeSeries` plots the last five minutes of a tag inside a titled panel:

``` yaml
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "Temperature Trend"
                    items:
                      - chart:
                          type: line
                          legend: false
                          bind:
                            - target: value
                              source: /D1000 Gen2 BMS/DBC/SensorData1/Temperature1
                              seriesMode: timeSeries
                              timeRangeStart: "-5m"
                              timeRangeStop: "0m"
```

## Where next

[Full Example](./Full_Example.md) analyses the complete motor controller dashboard, [Data Binding](../Data_Binding/index.md) describes the binding settings used here, [Dashboard Schema Validation Errors](../Schema_Validation_Errors.md) lists validation messages and their fixes, and [Troubleshooting](../Troubleshooting.md) covers binding problems.
