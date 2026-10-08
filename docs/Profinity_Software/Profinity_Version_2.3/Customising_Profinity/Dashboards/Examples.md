---
title: Dashboard Examples
description: "Progressive examples from simple hello-world dashboards to complete real-world implementations."
---

# Dashboard Examples

This page shows Profinity dashboards from simple component displays to complete real-world implementations, and every YAML block validates against the dashboard schema. Readers new to dashboards should begin with the progressive examples, which build from a Hello World dashboard to charts, and the complete motor controller dashboard is listed and analysed in [Full Example](./Full_Example.md).

Tag paths such as `DBC/Temperature/Value` and image names such as `BatteryIcon.svg` are placeholders. Replace them with tags from the [Tag Explorer](../../Tags/index.md) and with files in the `images` directory of the profile, or the readouts stay blank and the images do not appear. The `version` stamp is optional in the schema, so the Hello World template includes `version: "2.3"` and the other examples omit it.

## Progressive Examples

These examples build from the simplest possible dashboard to more complex ones.

### Example 0: Hello World Template

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

The template is a vertical row holding a styled group with one pill, which has an icon and two values: one labelled `CUSTOM DASHBOARD` and one that points to the documentation. Add bindings and further components to it, as in the examples that follow.

### Example 1: Simple Readout with Formatting

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

### Example 2: Multiple Readouts with Binding

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
                        source: DBC/Temperature/Value
                - readout:
                    label: "Pressure"
                    value: 0
                    unit: "hPa"
                    precision: 2
                    bind:
                      - target: value
                        source: DBC/Pressure/Value
```

### Example 3: Add Status Lamps

A lamp bound to `enabled` lights while the `Online` flag is set, beside a bound readout:

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
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 0
                    unit: "°C"
                    precision: 1
                    bind:
                      - target: value
                        source: DBC/Temperature/Value
```

### Example 4: Add Charts

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
                              source: DBC/Temperature/Value
                              seriesMode: timeSeries
                              timeRangeStart: "-5m"
                              timeRangeStop: "0m"
```

## Real-World Scenarios

### Building a Motor Controller Dashboard

The following blocks are building blocks for a motor controller dashboard. Each block shows only the part being added, so combine the parts you need under one `dashboard:`, and see [Full Example](./Full_Example.md) for the finished dashboard.

#### Basic Structure

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

#### Data Binding

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

#### Status Indicators

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

#### Charts

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

#### Panels

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

### Creating a Battery Monitoring Dashboard

The following blocks build a battery monitoring dashboard with an interactive image, and each shows only the part being added.

#### Main Layout

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

#### Interactive Image

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

## Component-Specific Examples

### HTML Component Example

An [HTML](./Component_Reference/Interactive/HTML.md) component shows custom HTML content with references to profile assets:

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              class: "info-box"
              content: |
                <div class="info-box__header">System Information</div>
                <div class="info-box__content">
                  <p>This dashboard monitors system status.</p>
                  <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
                </div>
```

The `info-box` classes are styled by rules in the `profile.css` file of the `/Profile/Styles` directory, because the HTML sanitiser removes a `link` element from `content`.

### Image Component Example

An interactive image with a region, an icon and a data value:

``` yaml
dashboard:
  items:
    - row:
        items:
          - image:
              image: "DeviceDiagram.png"
              icons:
                  - id: "status-icon"
                    x: 50
                    y: 30
                    icon: "StatusIcon.svg"
                    size: 32
                    action:
                      invoke: Navigate
                      target: "/component?componentId=Status"
                    label: "Status"
              regions:
                  - id: "main-region"
                    x: 20
                    y: 20
                    width: 60
                    height: 40
                    action:
                      invoke: Navigate
                      target: "/component?componentId=Main"
                    label: "Main Component"
                    visibleBorder: true
              dataValues:
                  - id: "voltage-display"
                    x: 50
                    y: 10
                    label: "Voltage"
                    displayType: "text"
                    bind:
                      - target: value
                        source: DBC/Voltage/Value
                    unit: "V"
                    precision: 2
```

The `x`, `y`, `width` and `height` values are percentages of the image size, and `action` is an object whose `invoke` value is `Navigate`, `Component`, `System` or `Endpoint`.

### Table Component Example

A [Table](./Component_Reference/Data/Tables.md) with a heat map and highlighting:

``` yaml
dashboard:
  items:
    - row:
        items:
          - table:
              tableHeaders:
                - header:
                    accessorKey: name
                    value: "Cell Name"
                - header:
                    accessorKey: voltage
                    value: "Voltage (V)"
                - header:
                    accessorKey: temperature
                    value: "Temperature (°C)"
              heatmap: true
              highlightMin: true
              highlightMax: true
              highlightAtOrBelow: 2.5
              alertAtOrBelow: 2.0
              precision: 3
              bind:
                - target: value
                  source: DBC/CellData/Values
```

The `heatmap` setting colours cells on a green to yellow scale between the minimum and maximum, `highlightAtOrBelow` highlights cells at or below 2.5, and `alertAtOrBelow` applies alert colouring to low values at or below 2.0.

## Where Next

[Full Example](./Full_Example.md) analyses the complete motor controller dashboard, [Data Binding](./Data_Binding.md) describes the binding settings used here, and [Troubleshooting](./Troubleshooting.md) covers validation errors and binding problems.
