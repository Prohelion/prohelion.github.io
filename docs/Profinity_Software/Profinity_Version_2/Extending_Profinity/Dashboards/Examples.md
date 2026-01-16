---
title: Dashboard Examples
---

# Dashboard Examples

This guide provides comprehensive examples of Profinity dashboards, from simple component displays to complete real-world implementations. All examples use the correct schema structure and demonstrate best practices.

!!! tip "New to Dashboards?"
    If you're just getting started, begin with the [Progressive Examples](#progressive-examples) section below. It starts with a simple "Hello World" dashboard and builds up to more complex examples step by step.

## Table of Contents

- [Progressive Examples](#progressive-examples) - Start here! Building from "Hello World" to complex dashboards
- [Complete Dashboard Example](#complete-dashboard-example) - Full motor controller dashboard
- [Real-World Scenarios](#real-world-scenarios) - Step-by-step walkthroughs
- [Component-Specific Examples](#component-specific-examples) - Examples for each component type

## Complete Dashboard Example

This comprehensive example demonstrates a complete motor controller dashboard that showcases many of the concepts covered in this guide. This dashboard monitors a Prohelion WaveSculptor 22 motor controller system and provides real-time monitoring of electrical, thermal, and performance parameters.

### What This Example Demonstrates

This dashboard example shows how to:

- **Monitor Key Performance Metrics** - Bus voltage, current, temperatures, and velocity
- **Display Real-time Charts** - Power consumption and velocity trends over time
- **Show System Status** - Controller limits and error conditions with visual indicators
- **Organize Complex Information** - Using accordions and tabs for detailed data
- **Implement Data Binding** - Connect dashboard components to CAN bus data sources
- **Create Professional Layouts** - Using rows, groups, panels, and pills effectively
- **Use Profile Assets** - Reference images from /Profile/Images directory

### Dashboard Structure Overview

The dashboard is organized into several logical sections:

1. **Status Pill** - Central component showing key metrics with an icon from /Profile/Images
2. **Performance Charts** - Real-time graphs of power and velocity
3. **Controller Limits** - Visual indicators for system protection limits
4. **Error Monitoring** - Status lamps for various error conditions
5. **Detailed Information** - Collapsible section with comprehensive data

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
                                    source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
                            - value:
                                label: BUS CURRENT
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.BusMeasurement.BusCurrent'
                      - pillgroup:
                          items:
                            - value:
                                label: DSP TEMP
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.DspBoardTempMeasurement.DspBoardTemp'
                            - value:
                                label: MOTOR TEMP
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.HeatsinkMotorTempMeasurement.MotorTemp'
                            - value:
                                label: HEATSINK TEMP
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.HeatsinkMotorTempMeasurement.HeatsinkTemp'
                      - pillgroup:
                          items:
                            - value:
                                label: RPM
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.VelocityMeasurement.MotorVelocity'
                            - value:
                                label: MPS
                                enabled: true
                                precision: 1
                                bind:
                                  - target: value
                                    source: '{COMPONENT_NAME}.VelocityMeasurement.VehicleVelocity'
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
                                    source: "[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent"
                      - panel:
                          title: VELOCITY (M/S)
                          items:
                            - chart:
                                type: line
                                legend: false
                                bind:
                                  - target: value
                                    source: "[TimeSeries].{COMPONENT_NAME}.VelocityMeasurement.VehicleVelocity"
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
                                                source: '{COMPONENT_NAME}.Status.LimitOutputVoltagePWM'
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: MOTOR CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.LimitMotorCurrent'
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: VELOCITY
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.LimitVelocity'
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: BUS CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.LimitBusCurrent'
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
                                                source: '{COMPONENT_NAME}.Status.LimitBusVoltageUpper'
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: BUS VOLTAGE LOWER
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.LimitBusVoltageLower'
                                                toType: boolean
                                        - lamp:
                                            color: amber
                                            value: 1
                                            label: IPM OR MOTOR TEMP
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.LimitIpmOrMotorTemp'
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
                                                source: '{COMPONENT_NAME}.Status.ErrorHardwareOverCurrent'
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: SOFTWARE OVER CURRENT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.ErrorSoftwareOverCurrent'
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: DC BUS OVER VOLTAGE
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.ErrorDcBusOverVoltage'
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: WATCHDOG RESET
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.ErrorWatchdogCausedLastReset'
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
                                                source: '{COMPONENT_NAME}.Status.ErrorConfigRead'
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: 15v UNDER VOLTAGE
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.Error15vRailUnderVoltage'
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: DESATURATION FAULT
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.ErrorDesaturationFault'
                                                toType: boolean
                                        - lamp:
                                            color: red
                                            value: 1
                                            label: MOTOR OVERSPEED
                                            enabled: false
                                            bind:
                                              - target: enabled
                                                source: '{COMPONENT_NAME}.Status.ErrorMotorOverSpeed'
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
                          body:
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
                                                      source: '{COMPONENT_NAME}.VoltageRail15VMeasurement.Supply15V'
                                              - readout:
                                                  label: 1.9v RAIL
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply1V9'
                                              - readout:
                                                  label: 3.3v RAIL
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply3V3'
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
                                                      source: '{COMPONENT_NAME}.PhaseCurrentMeasurement.PhaseCurrentB'
                                              - readout:
                                                  label: PHASE CURRENT C
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.PhaseCurrentMeasurement.PhaseCurrentC'
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
                                                      source: '{COMPONENT_NAME}.BackEMFMeasurementPrediction.BEMFd'
                                              - readout:
                                                  label: BEMF Vq
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.BackEMFMeasurementPrediction.BEMFq'
                                              - readout:
                                                  label: MOTOR VOLTAGE Vd
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.MotorVoltageVectorMeasurement.Vd'
                                              - readout:
                                                  label: MOTOR VOLTAGE Vq
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.MotorVoltageVectorMeasurement.Vq'
                                              - readout:
                                                  label: MOTOR CURRENT Id
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.MotorCurrentVectorMeasurement.Id'
                                              - readout:
                                                  label: MOTOR CURRENT Iq
                                                  precision: 3
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.MotorCurrentVectorMeasurement.Iq'
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
                                                      source: '{COMPONENT_NAME}.SlipSpeedMeasurement.SlipSpeed'
                                              - readout:
                                                  label: ODOMETER
                                                  precision: 1
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.OdometerBusAhMeasurement.Odometer'
                                  - panel:
                                      title: Other
                                      items:
                                        - readouts:
                                            items:
                                              - readout:
                                                  label: PART ID
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.IDInfo.TritiumID'
                                              - readout:
                                                  label: SERIAL NUMBER
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.IDInfo.SerialNumber'
                                              - readout:
                                                  label: TX ERROR COUNT
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.Status.TxErrorCount'
                                              - readout:
                                                  label: RX ERROR COUNT
                                                  bind:
                                                    - target: value
                                                      source: '{COMPONENT_NAME}.Status.RxErrorCount'
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
                        source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
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
                              source: '{COMPONENT_NAME}.Status.Online'
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
                  source: "[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent"
```

**Step 5: Organize with Panels**

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
                              source: '{COMPONENT_NAME}.StateOfCharge.SOCPercent'
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
              value:
                image: "BatteryLayout.png"
                dataValues:
                  - id: "cell-voltage-1"
                    x: 10
                    y: 20
                    label: "Cell 1"
                    displayType: "text"
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.CellVoltages[0]'
                    unit: "V"
                    precision: 3
                regions:
                  - id: "cell-region-1"
                    coordinates: "xywh=10,20,50,30"
                    action: "navigate"
                    target: "/component?componentId=Battery&view=cell1"
                    label: "Cell 1"
```

## Progressive Examples

These examples build from the absolute simplest dashboard to more complex ones. Start here if you're new to dashboard development.

### Example 0: Hello World (The Template)

When you open the dashboard editor or click the **"New Template"** button, you'll see this Hello World template loaded:

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
                            image: nav_custom_active.svg
                        items:
                        - pillgroup:
                            items:
                            - value:
                                label: CUSTOM COMPONENT
```

This template provides a starting point with:
- A vertical row layout
- A styled group container
- A pill component with an icon
- A value readout showing "CUSTOM COMPONENT"

You can modify this template to add data bindings and additional components. This is the same template that loads when you click "New Template" in the dashboard editor.

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
                        source: '{COMPONENT_NAME}.Temperature.Value'
                - readout:
                    label: "Pressure"
                    value: 0
                    unit: "hPa"
                    precision: 2
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.Pressure.Value'
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
                              source: '{COMPONENT_NAME}.Status.Online'
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
                        source: '{COMPONENT_NAME}.Temperature.Value'
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
                              source: "[TimeSeries].{COMPONENT_NAME}.Temperature.Value"
```

## Component-Specific Examples

### HTML Component Example

Display custom HTML content with references to profile assets:

``` yaml
dashboard:
  items:
    - row:
        items:
          - html:
              class: "info-box"
              content: |
                <link rel="stylesheet" href="/Profile/Styles/custom.css" />
                <div class="info-box__header">System Information</div>
                <div class="info-box__content">
                  <p>This dashboard monitors system status.</p>
                  <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
                </div>
```

### Image Component Example

Interactive image with regions, icons, and data values:

``` yaml
dashboard:
  items:
    - row:
        items:
          - image:
              value:
                image: "DeviceDiagram.png"
                icons:
                  - id: "status-icon"
                    x: 50
                    y: 30
                    icon: "StatusIcon.svg"
                    size: 32
                    action: "navigate"
                    target: "/component?componentId=Status"
                    label: "Status"
                regions:
                  - id: "main-region"
                    coordinates: "xywh=20,20,60,40"
                    action: "navigate"
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
                        source: '{COMPONENT_NAME}.Voltage.Value'
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
                  source: '{COMPONENT_NAME}.CellData.Values'
```

## Next Steps

Now that you've seen comprehensive examples, you can:

- **Start with the Basics** - Begin with [Core Elements](./Core_Elements.md) to understand dashboard structure
- **Learn Data Binding** - Study [Data Binding](./Data_Binding.md) to connect your data sources
- **Explore Components** - Use [Component Reference](./Component_Reference/index.md) for detailed component information
- **Add Styling** - Apply [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- **Troubleshoot Issues** - Check [Troubleshooting](./Troubleshooting.md) for common problems and solutions
- **Get Help** - Review [FAQ](./FAQ.md) for answers to common questions

