---
title: Dashboard Examples
description: "Progressive examples from simple hello-world dashboards to complete real-world implementations."
---

# Dashboard Examples

This guide provides examples of Profinity dashboards, from simple component displays to complete real-world implementations. All examples use the correct schema structure and demonstrate best practices.

!!! tip "New to Dashboards?"
    Readers new to dashboards should begin with the [Progressive Examples](#progressive-examples) section, which is the first section on this page. It starts with a simple "Hello World" dashboard and builds up to more complex examples step by step, before the complete motor controller dashboard and the real-world scenarios.

## Table of Contents

- [Progressive Examples](#progressive-examples) - The starting point for new readers, building from "Hello World" to complex dashboards
- [Complete Dashboard Example](#complete-dashboard-example) - Full motor controller dashboard
- [Real-World Scenarios](#real-world-scenarios) - Step-by-step walkthroughs
- [Component-Specific Examples](#component-specific-examples) - Examples for individual component types

## Progressive Examples

These examples build from the simplest possible dashboard to more complex ones, and are the recommended starting point for readers new to dashboard development.

### Example 0: Hello World (The Template)

A new custom component starts with this Hello World template, and the **NEW FROM TEMPLATE** button in the dashboard editor loads it again at any time (a component can supply its own template, in which case that template loads instead). It is the template shipped with Profinity:

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

This template provides a starting point with:

- A version declaration (`version: "2.3"`)
- A vertical row layout
- A styled group container
- A pill component with an icon
- A value readout showing "CUSTOM DASHBOARD", and a second value that points to the documentation

This template can be modified to add data bindings and additional components, and it is the same template described in the [Dashboard Development Guide](./index.md#your-first-dashboard-hello-world).

### Example 1: Simple Readout with Formatting

Add units and precision to make the readout more informative:

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

Add data binding to multiple readouts:

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

Include status indicators:

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

Include time series charts:

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

## Complete Dashboard Example

The complete WaveSculptor motor controller dashboard, which applies most of the concepts in this guide, is listed in full and analysed section by section in [Full Example](./Full_Example.md), so the YAML is not repeated here.

## Real-World Scenarios

### Building a Motor Controller Dashboard

This walkthrough shows how to build a complete motor controller dashboard step by step.

**Step 1: Create the Basic Structure**

Start with a simple row containing a titlebar and basic layout:

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

**Step 2: Add Data Binding**

Connect the readouts to actual CAN bus data:

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

**Step 3: Add Status Indicators**

Include lamps for system status:

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

**Step 4: Add Charts**

Include time series charts for trend analysis:

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

**Step 5: Organise with Panels**

Group related components into panels:

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

This example shows how to create a battery monitoring dashboard with interactive images.

**Step 1: Create the Main Layout**

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

**Step 2: Add Interactive Image**

Include an interactive image showing battery layout:

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

Display custom HTML content with references to profile assets. The `info-box` classes are styled by rules in the `profile.css` file of the `/Profile/Styles` directory, because the sanitiser removes a `link` element from `content`:

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

### Image Component Example

Interactive image with regions, icons, and data values. The `x`, `y`, `width`, and `height` values are percentages of the image size, and `action` is an object whose `invoke` value is `Navigate`, `Component`, `System`, or `Endpoint`:

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

### Table Component Example

Data table with highlighting:

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

## Next Steps

The following pages build on these examples:

- **Read the Full Analysis** - Review the [Full Example](./Full_Example.md) for a section-by-section analysis of the complete motor controller dashboard
- **Start with the Basics** - Begin with [Core Elements](./Core_Elements.md) to understand dashboard structure
- **Learn Data Binding** - Study [Data Binding](./Data_Binding.md) to bind your dashboards to tags
- **Explore Components** - Use [Component Reference](./Component_Reference/index.md) for detailed component information
- **Add Styling** - Apply [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- **Troubleshoot Issues** - Check [Troubleshooting](./Troubleshooting.md) for common problems and solutions
- **Get Help** - Review [FAQ](./FAQ.md) for answers to common questions

