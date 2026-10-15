---
title: Motor controller and battery examples
description: "Copy YAML building blocks for a motor controller and a battery monitoring dashboard, with a titlebar, bound readouts, lamps, charts, and an image."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Motor controller and battery examples

These blocks build a motor controller dashboard and a battery monitoring dashboard, and every YAML block validates against the dashboard schema.
Tag paths such as `DBC/StateOfCharge/SOCPercent` and image names such as `BatteryIcon.svg` are placeholders.
Replace them with tags from the [Tag Explorer](../../Tags/index.md) and with files in the `images` directory of the profile, or the readouts stay blank and the images do not appear.

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
                        source: DBC/BusMeasurement/BusVoltage
```

### Status indicators

A lamp that lights with the `Online` flag:

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
                          label: "Online"
                          value: 1
                          enabled: true
                          bind:
                            - target: enabled
                              source: DBC/Status/Online
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
                  source: DBC/BusMeasurement/BusCurrent
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
                                      label: "Online"
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
                              source: DBC/StateOfCharge/SOCPercent
                              gain: 100
```

### Interactive image

An interactive [Image](./Component_Reference/Interactive/Image.md) of the battery layout, with a cell voltage value and a clickable region:

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
                        source: DBC/CellVoltages/Cell1
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

[Examples](./Examples.md) builds a dashboard from a Hello World template, and [Full Example](./Full_Example.md) analyses the finished motor controller dashboard.
