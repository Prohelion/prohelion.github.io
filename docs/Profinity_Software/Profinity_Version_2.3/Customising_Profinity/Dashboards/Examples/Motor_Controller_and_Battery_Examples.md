---
title: Motor controller and battery examples
description: "Copy YAML building blocks for a motor controller and a battery monitoring dashboard, with a titlebar, bound readouts, lamps, charts, and an image."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Motor controller and battery examples

These blocks build a motor controller dashboard and a battery monitoring dashboard, and every YAML block validates against the dashboard schema.
The motor controller examples assume a WaveSculptor22 component that is named `WS22` in the Profile, and the battery examples assume a Prohelion BMU (D1000 Gen1) named `Prohelion BMU` and a Prohelion D1000 Gen2 BMS named `D1000 Gen2 BMS`.
The component name in each tag path is the name given to the component in the Profile, so change it to match your own component, and find the tags in the [Tag Explorer](../../../Tags/index.md).
Image names such as `BatteryIcon.svg` are placeholders, so replace them with files in the `images` directory of the profile, or the images do not appear.

## Building a motor controller dashboard

The following blocks are building blocks for a motor controller dashboard.
Each block shows only the part being added, so combine the parts you need under one `dashboard:`, and refer to [Full Example](./Full_Example.md) for the finished dashboard.

### Basic structure

A titlebar with a lamp, and a vertical row holding a readout:

``` yaml
dashboard:
  items:
    - titlebar:
        lamp:
          color: grey
          value: 1
          label: Motor Controller
          enabled: true
    - row:
        direction: vertical
        items:
          - group:
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Bus Voltage"
                          value: 0
                          unit: "V"
                          precision: 1
```

### Data binding

A readout bound to the bus voltage tag:

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Bus Voltage"
                    value: 0
                    unit: "V"
                    precision: 1
                    bind:
                      - target: value
                        source: /WS22/DBC/BusMeasurement/BusVoltage
```

### Status indicators

A lamp that lights while the WaveSculptor22 is limiting bus current:

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
                          label: "Bus current limit"
                          value: 1
                          enabled: true
                          bind:
                            - target: enabled
                              source: DBC/Status/LimitBusCurrent
                              toType: boolean
```

### Charts

A time series chart of the bus current:

``` yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              legend: false
              bind:
                - target: value
                  source: /WS22/DBC/BusMeasurement/BusCurrent
                  seriesMode: timeSeries
                  timeRangeStart: "-5m"
                  timeRangeStop: "0m"
```

### Panels

A titled panel that groups related lamps:

``` yaml
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "System Status"
                    items:
                      - lamps:
                          items:
                            - lampgroup:
                                items:
                                  - lamp:
                                      color: green
                                      label: "Bus current limit"
                                      value: 1
                                      enabled: true
```

## Creating a battery monitoring dashboard

The following blocks build a battery monitoring dashboard with an interactive image, and each shows only the part being added.

### Main layout

A pill with an icon and a state of charge value scaled to a percentage:

``` yaml
dashboard:
  items:
    - row:
        items:
          - pill:
              icon:
                image: BatteryIcon.svg
                recess: false
                value: 0
              items:
                - pillgroup:
                    items:
                      - value:
                          label: SOC
                          precision: 2
                          unit: "%"
                          bind:
                            - target: value
                              source: /Prohelion BMU/DBC/PackStateOfCharge/SOCPercent
                              gain: 100
```

### Interactive image

An interactive [Image](../Component_Reference/Images_and_Models/Image.md) of the battery layout, with a cell voltage value and a clickable region:

``` yaml
dashboard:
  items:
    - row:
        items:
          - image:
              image: "BatteryLayout.png"
              dataValues:
                  - id: "cell-voltage-1"
                    x: 10
                    y: 20
                    label: "Cell 1"
                    displayType: "text"
                    bind:
                      - target: value
                        source: /D1000 Gen2 BMS/DBC/Node01CellVoltages1/Node01Cell01
                    unit: "V"
                    precision: 3
              regions:
                  - id: "cell-region-1"
                    x: 10
                    y: 20
                    width: 50
                    height: 30
                    action:
                      invoke: Navigate
                      target: "/component?componentId=Battery&view=cell1"
                    label: "Cell 1"
```

[Examples](./index.md) builds a dashboard from a Hello World template, and [Full Example](./Full_Example.md) analyses the finished motor controller dashboard.
