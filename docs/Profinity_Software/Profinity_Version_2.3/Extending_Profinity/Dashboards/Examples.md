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

This example is a complete motor controller dashboard that applies many of the concepts covered in this guide. The dashboard monitors a Prohelion WaveSculptor 22 motor controller system and provides real-time monitoring of electrical, thermal, and performance parameters, using message and signal names from the [WaveSculptor22 DBC file](../../../../Motor_Controllers/WaveSculptor22/User_Manual/DBC.md). The same YAML is analysed section by section, with data binding patterns and customisation guidance, in [Full Example](./Example.md).

### What This Example Demonstrates

This dashboard example shows how to:

- **Monitor Key Performance Metrics** - Bus voltage, current, temperatures, and velocity
- **Display Real-time Charts** - Power consumption and velocity trends over time
- **Show System Status** - Controller limits and error conditions with visual indicators
- **Organise Complex Information** - Using accordions and tabs for detailed data
- **Implement Data Binding** - Connect dashboard components to CAN bus data sources
- **Create Clear Layouts** - Using rows, groups, panels, and pills effectively
- **Use Icons** - Name a Carbon icon, or a legacy icon filename that resolves to a Carbon icon, in the `image` parameter of a pill icon

### Dashboard Structure Overview

The dashboard is organised into several logical sections:

1. **Status Pill** - Central component showing key metrics with a Carbon icon, because the legacy filename `nav_motorcontrollers_active.svg` in the YAML resolves to a Carbon icon rather than to a file in /Profile/Images
2. **Performance Charts** - Real-time graphs of power and velocity
3. **Controller Limits** - Visual indicators for system protection limits
4. **Error Monitoring** - Status lamps for various error conditions
5. **Detailed Information** - Collapsible section with the full set of detailed measurements

### Complete Dashboard YAML

``` yaml
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
                      image: nav_motorcontrollers_active.svg
                      recess: false
                      value: 0
                    items:
                      - pillgroup:
                          items:
                            - value:
                                label: BUS VOLTAGE
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/BusMeasurement/BusVoltage
                            - value:
                                label: BUS CURRENT
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/BusMeasurement/BusCurrent
                      - pillgroup:
                          items:
                            - value:
                                label: DSP TEMP
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/DspBoardTempMeasurement/DspBoardTemp
                            - value:
                                label: MOTOR TEMP
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/HeatsinkMotorTempMeasurement/MotorTemp
                            - value:
                                label: HEATSINK TEMP
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/HeatsinkMotorTempMeasurement/HeatsinkTemp
                      - pillgroup:
                          items:
                            - value:
                                label: RPM
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/VelocityMeasurement/MotorVelocity
                            - value:
                                label: MPS
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: DBC/VelocityMeasurement/VehicleVelocity
          - row:
              direction: vertical
              class: trunkpadded
              items:
                - panels:
                    items:
                      - panel:
                          title: BUS POWER (W)
                          items:
                            - chart:
                                type: line
                                legend: false
                                bind:
                                  - target: value
                                    source: Properties/BusPower
                                    seriesMode: timeSeries
                                    timeRangeStart: "-5m"
                                    timeRangeStop: "0m"
                      - panel:
                          title: VELOCITY (M/S)
                          items:
                            - chart:
                                type: line
                                legend: false
                                bind:
                                  - target: value
                                    source: DBC/VelocityMeasurement/VehicleVelocity
                                    seriesMode: timeSeries
                                    timeRangeStart: "-5m"
                                    timeRangeStop: "0m"
                      - panel:
                          title: CONTROLLER LIMITS
                          items:
                            - lamps:
                                items:
                                  - lampgroup:
                                      items:
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: OUTPUT VOLTAGE PWM
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitOutputVoltagePWM
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: MOTOR CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitMotorCurrent
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: VELOCITY
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitVelocity
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: BUS CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitBusCurrent
                                                toType: boolean
                                  - lampgroup:
                                      items:
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: BUS VOLTAGE UPPER
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitBusVoltageUpper
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: BUS VOLTAGE LOWER
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitBusVoltageLower
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: IPM OR MOTOR TEMP
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/LimitIpmOrMotorTemp
                                                toType: boolean
                      - panel:
                          title: CONTROLLER ERRORS
                          items:
                            - lamps:
                                items:
                                  - lampgroup:
                                      items:
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: HARDWARE OVER CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorHardwareOverCurrent
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: SOFTWARE OVER CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorSoftwareOverCurrent
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: DC BUS OVER VOLTAGE
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorDcBusOverVoltage
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: WATCHDOG RESET
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorWatchdogCausedLastReset
                                                toType: boolean
                                  - lampgroup:
                                      items:
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: CONFIG READ
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorConfigRead
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: 15v UNDER VOLTAGE
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/Error15vRailUnderVoltage
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: DESATURATION FAULT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorDesaturationFault
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: MOTOR OVERSPEED
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: DBC/Status/ErrorMotorOverSpeed
                                                toType: boolean
    - accordion:
        label: MORE DETAILS
        items:
          - row:
              direction: vertical
              items:
                - tabs:
                    items:
                      - tab:
                          enabled: true
                          header:
                            - lamp:
                                color: disabled
                                value: 1
                                label: INFO
                          items:
                            - panels:
                                items:
                                  - panel:
                                      title: Low Voltage
                                      items:
                                        - readouts:
                                            items:
                                              - readout:
                                                  label: 15v RAIL
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: DBC/VoltageRail15VMeasurement/Supply15V
                                              - readout:
                                                  label: 1.9v RAIL
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: DBC/VoltageRail3V31V9Measurement/Supply1V9
                                              - readout:
                                                  label: 3.3v RAIL
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: DBC/VoltageRail3V31V9Measurement/Supply3V3
                                  - panel:
                                      title: Phase Currents
                                      items:
                                        - readouts:
                                            items:
                                              - readout:
                                                  label: PHASE CURRENT B
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/PhaseCurrentMeasurement/PhaseCurrentB
                                              - readout:
                                                  label: PHASE CURRENT C
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/PhaseCurrentMeasurement/PhaseCurrentC
                                  - panel:
                                      title: Motor Vectors
                                      items:
                                        - readouts:
                                            items:
                                              - readout:
                                                  label: BEMF Vd
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/BackEMFMeasurementPrediction/BEMFd
                                              - readout:
                                                  label: BEMF Vq
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/BackEMFMeasurementPrediction/BEMFq
                                              - readout:
                                                  label: MOTOR VOLTAGE Vd
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/MotorVoltageVectorMeasurement/Vd
                                              - readout:
                                                  label: MOTOR VOLTAGE Vq
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/MotorVoltageVectorMeasurement/Vq
                                              - readout:
                                                  label: MOTOR CURRENT Id
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/MotorCurrentVectorMeasurement/Id
                                              - readout:
                                                  label: MOTOR CURRENT Iq
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: DBC/MotorCurrentVectorMeasurement/Iq
                                  - panel:
                                      title: Speed & Distance
                                      items:
                                        - readouts:
                                            items:
                                              - readout:
                                                  label: SLIP SPEED
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: DBC/SlipSpeedMeasurement/SlipSpeed
                                              - readout:
                                                  label: ODOMETER
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: DBC/OdometerBusAhMeasurement/Odometer
                                  - panel:
                                      title: Other
                                      items:
                                        - readouts:
                                            items:
                                              - readout:
                                                  label: PART ID
                                                  bind:
                                                    - target: value
                                                      source: DBC/IDInfo/TritiumID
                                              - readout:
                                                  label: SERIAL NUMBER
                                                  bind:
                                                    - target: value
                                                      source: DBC/IDInfo/SerialNumber
                                              - readout:
                                                  label: TX ERROR COUNT
                                                  bind:
                                                    - target: value
                                                      source: DBC/Status/TxErrorCount
                                              - readout:
                                                  label: RX ERROR COUNT
                                                  bind:
                                                    - target: value
                                                      source: DBC/Status/RxErrorCount
```

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

- **Read the Full Analysis** - Review the [Full Example](./Example.md) for a section-by-section analysis of the complete motor controller dashboard
- **Start with the Basics** - Begin with [Core Elements](./Core_Elements.md) to understand dashboard structure
- **Learn Data Binding** - Study [Data Binding](./Data_Binding.md) to connect your data sources
- **Explore Components** - Use [Component Reference](./Component_Reference/index.md) for detailed component information
- **Add Styling** - Apply [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- **Troubleshoot Issues** - Check [Troubleshooting](./Troubleshooting.md) for common problems and solutions
- **Get Help** - Review [FAQ](./FAQ.md) for answers to common questions

