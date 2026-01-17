---
title: Core Elements
---

# The Four Core Dashboard Elements

A Profinity dashboard is built using a hierarchical structure of four core element types. These elements are arranged vertically and provide the foundation for creating dynamic, data-driven user interfaces.

## Table of Contents

- [Understanding the Structure](#understanding-the-structure)
- [Understanding the `items` Property](#understanding-the-items-property)
- [The Four Core Elements](#the-four-core-elements)
    - [1. Titlebar](#1-titlebar)
    - [2. Row](#2-row)
    - [3. Accordion](#3-accordion)
    - [4. Footer](#4-footer)
- [Layout Directions](#layout-directions)
- [Component Nesting](#component-nesting)
- [Complete Example](#complete-example)
- [Dashboard Structure](#dashboard-structure)

## Understanding the Structure

Dashboards are defined as collections of full-width items arranged vertically. Each top-level element can be one of several types, and they can be nested to create complex layouts:

- **Rows** contain **Groups** and **Components**
- **Groups** organize related **Components** together
- **Components** display actual data and controls
- **Panels** provide titled containers for organizing content
- **HTML** and **Image** components provide rich content display

This hierarchical approach allows for flexible layouts that adapt to different screen sizes and content requirements.

## Understanding the `items` Property

The `items` property is one of the most fundamental and widely used concepts in Profinity dashboard configuration. It appears at almost every level of the dashboard hierarchy and is used to define the contents of container elements.

### What is `items`?

The `items` property is an array that contains the child elements of any container component. It's how you specify what goes inside containers like `dashboard`, `row`, `group`, `panel`, `accordion`, and many other components.

### Where `items` is Used

The `items` property appears at multiple levels:

- **Top level**: `dashboard: items:` - Contains the top-level elements (titlebar, rows, accordions, footer)
- **Rows**: `row: items:` - Contains groups and components within a row
- **Groups**: `group: items:` - Contains components organized within a group
- **Panels**: `panel: items:` - Contains components displayed within a panel
- **Accordions**: `accordion: items:` - Contains rows and components within an accordion section
- **Component containers**: Many components like `pill`, `lamps`, `readouts`, `tabs` use `items:` to contain their child elements

### Example Structure

```yaml
dashboard:
  items:                    # Top-level items
    - row:
        items:              # Items within the row
          - group:
              items:        # Items within the group
                - readouts:
                    items:  # Items within the readouts container
                      - readout:
                          label: "Temperature"
                          value: 25.5
```

### Key Points

- **Always an array**: `items` is always an array (using `-` list syntax in YAML), even if it contains only one element
- **Defines hierarchy**: The `items` property is what creates the parent-child relationships in your dashboard structure
- **Required for containers**: Any component that can contain other components will have an `items` property
- **Order matters**: The order of items in the array determines the order they appear in the dashboard

### Common Patterns

**Single item:**
```yaml
row:
  items:
    - readouts:
        items:
          - readout:
              label: "Temperature"
```

**Multiple items:**
```yaml
row:
  items:
    - readouts:
        items:
          - readout:
              label: "Temperature"
    - chart:
        type: "line"
```

**Nested items:**
```yaml
panel:
  title: "System Status"
  items:
    - group:
        items:
          - readouts:
              items:
                - readout:
                    label: "Status"
```

Understanding how `items` works is essential for building dashboards, as it's the mechanism that allows you to nest and organize components at any level of the dashboard hierarchy.

!!! info "Profile Directories"
    Profinity provides profile-specific directories (`/Profile/Images`, `/Profile/Styles`, and `/Profile/Content`) for organizing dashboard assets like images, stylesheets, and HTML templates. For detailed information about using these directories, including examples and best practices, see the [Profile Directories](./Profile_Directories.md) documentation.

## The Four Core Elements

### 1. Titlebar
The header section of your dashboard, typically containing:

- Status indicators and lamps
- Navigation menus
- Component identification

<figure markdown>
![Dashboard titlebar showing status lamps and navigation menus](images/titlebar.png)
<figcaption>Dashboard titlebar showing status lamps and navigation menus</figcaption>
</figure>

**When to use:** Every dashboard should have a titlebar to provide context and navigation.

**Learn more:** [Titlebar Reference](./Component_Reference/Layout/Titlebar.md)

### 2. Row
Layout containers that organize components horizontally or vertically.

<figure markdown>
![Row layout container organizing multiple components horizontally or vertically](images/row.png)
<figcaption>Row layout container organizing multiple components horizontally or vertically</figcaption>
</figure>

**Key features:**

- Can hold multiple components or groups
- Supports both horizontal and vertical layouts
- Essential for organizing dashboard content

**When to use:** Use rows to create logical sections of your dashboard and control component arrangement.

**Learn more:** [Row Reference](./Component_Reference/Layout/Row.md)

### 3. Accordion
Collapsible sections for organizing content that can be expanded or collapsed.

<figure markdown>
![Accordion component showing collapsible sections for organizing content](images/accordion.png)
<figcaption>Accordion component showing collapsible sections for organizing content</figcaption>
</figure>

**Key features:**

- Keeps dashboards clean and organized
- Allows users to focus on relevant information
- Perfect for detailed information that's not always needed

**When to use:** Use accordions for detailed information, settings, or secondary data that users can access when needed.

**Learn more:** [Accordion Reference](./Component_Reference/Layout/Accordion.md)

### 4. Footer
Bottom section typically containing navigation menus and additional controls.

<figure markdown>
![Dashboard footer with navigation menus and additional controls](images/footer.png)
<figcaption>Dashboard footer with navigation menus and additional controls</figcaption>
</figure>

**Key features:**

- Usually contains navigation elements
- Provides consistent footer across dashboards
- Optional but useful for complex applications

**When to use:** Use footers for navigation, additional actions, or system information.

**Learn more:** [Footer Reference](./Component_Reference/Layout/Footer.md)

## Layout Directions

Understanding layout directions is crucial for effective dashboard design:

- **Vertical (default)**: Components stack from top to bottom
- **Horizontal**: Components arrange side by side

Rows can specify their direction, allowing you to create both vertical and horizontal layouts within the same dashboard.

## Component Nesting

The hierarchical structure allows for flexible component organization:

```text
Dashboard
├── Titlebar
├── Row (vertical)
│   ├── Group
│   │   ├── Component 1 (Readouts)
│   │   ├── Component 2 (Chart)
│   │   └── Component 3 (HTML)
│   └── Group
│       └── Component 4 (Image)
├── Accordion
│   └── Row
│       └── Components
└── Footer
```

This nesting system enables you to create sophisticated layouts while maintaining clean, readable YAML configurations.

## Complete Example

The following example demonstrates how all four core elements work together in a real dashboard. This example shows:

- A **titlebar** with status lamps and navigation
- **Rows** organizing different sections of data
- **Groups** containing related components like readouts and charts
- **Panels** for organizing complex data displays
- **Accordions** for collapsible detailed information
- **Tabs** for organizing different views within accordions

This comprehensive example includes data bindings to CAN bus signals, showing how the dashboard connects to real vehicle data.

## Dashboard Structure

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

