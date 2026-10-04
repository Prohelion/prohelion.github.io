---
title: Core Elements
description: "The four core dashboard element types (titlebar, row, accordion, footer) and hierarchical structure."
---

# Core Elements

A Profinity dashboard is built using a hierarchical structure of four core element types, which are arranged vertically and provide the foundation for dynamic, data-driven user interfaces.

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
    - [Complete Dashboard YAML](#complete-dashboard-yaml)

## Understanding the Structure

Dashboards are defined as collections of full-width items arranged vertically. Each top-level element can be one of several types, and elements can be nested to create complex layouts:

- **Rows** contain **Groups** and **Components**
- **Groups** organise related **Components** together
- **Components** display actual data and controls
- **Panels** provide titled containers for organising content
- **HTML** and **Image** components display custom content

This hierarchical approach allows for flexible layouts that adapt to different screen sizes and content requirements.

## Understanding the `items` Property

The `items` property is the most widely used concept in Profinity dashboard configuration. It appears at almost every level of the dashboard hierarchy and defines the contents of container elements.

### Role of `items`

The `items` property is an array that contains the child elements of any container component, and it specifies what goes inside containers such as `dashboard`, `row`, `group`, `panel`, `accordion`, and many other components.

### Where `items` Is Used

The `items` property appears at multiple levels:

- **Top level**: `dashboard: items:` - Contains the top-level elements (titlebar, rows, accordions, footer)
- **Rows**: `row: items:` - Contains groups and components within a row
- **Groups**: `group: items:` - Contains components organised within a group
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

The `items` property is the mechanism that nests and organises components at every level of the dashboard hierarchy, so it underlies every other page in this guide.

!!! info "Profile Directories"
    Profinity provides profile-specific directories (`/Profile/Images`, `/Profile/Styles`, and `/Profile/Content`) for organising dashboard assets like images, stylesheets, and HTML templates. For detailed information about using these directories, including examples and best practices, see the [Profile Directories](./Profile_Directories.md) documentation.

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

**When to use:** Use a titlebar to provide context and navigation.

**Learn more:** [Titlebar Reference](./Component_Reference/Layout/Titlebar.md)

### 2. Row
Layout containers that organise components horizontally or vertically.

<figure markdown>
![Row layout container organising multiple components horizontally or vertically](images/row.png)
<figcaption>Row layout container organising multiple components horizontally or vertically</figcaption>
</figure>

**Key features:**

- Can hold multiple components or groups
- Supports both horizontal and vertical layouts
- Essential for organising dashboard content

**When to use:** Use rows to create logical sections of your dashboard and control component arrangement.

**Learn more:** [Row Reference](./Component_Reference/Layout/Row.md)

### 3. Accordion
Collapsible sections for organising content that can be expanded or collapsed.

<figure markdown>
![Accordion component showing collapsible sections for organising content](images/accordion.png)
<figcaption>Accordion component showing collapsible sections for organising content</figcaption>
</figure>

**Key features:**

- Keeps dashboards clean and organised
- Allows users to focus on relevant information
- Suited to detailed information that is not always needed

**When to use:** Use accordions for detailed information, settings, or secondary data that users can access when needed.

**Learn more:** [Accordion Reference](./Component_Reference/Layout/Accordion.md)

### 4. Footer
Bottom section of the dashboard that the web interface displays as a bar, which can be shown and hidden with a data binding, although the footer does not display the content of its `menu` parameter.

<figure markdown>
![Dashboard footer bar](images/footer.png)
<figcaption>Dashboard footer bar</figcaption>
</figure>

**Key features:**

- Can be shown or hidden by binding the `visible` target
- Does not display `menu` items, so it is not a place for navigation
- Optional

**When to use:** Use a footer when the dashboard needs a bar at the bottom that appears only under some conditions. Use the [Titlebar](./Component_Reference/Layout/Titlebar.md) menu or an [Action](./Component_Reference/Interactive/Actions.md) component for navigation and actions.

**Learn more:** [Footer Reference](./Component_Reference/Layout/Footer.md)

## Layout Directions

Understanding layout directions is crucial for effective dashboard design:

- **Vertical (default)**: Components stack from top to bottom
- **Horizontal**: Components arrange side by side

Rows can specify their direction, allowing you to create both vertical and horizontal layouts within the same dashboard.

## Component Nesting

The hierarchical structure allows for flexible component organisation:

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

The following example is a complete motor controller dashboard for a Prohelion WaveSculptor 22, whose message and signal names come from the [WaveSculptor22 DBC file](../../../../Motor_Controllers/WaveSculptor22/User_Manual/DBC.md). It does not include a titlebar or footer, but it shows rows, an accordion, and the components nested inside them:

- **Rows** organising different sections of data
- **Groups** containing related components such as readouts and charts
- **Panels** for organising complex data displays
- **Accordions** for collapsible detailed information
- **Tabs** for organising different views within accordions

The example includes data bindings to CAN bus signals, showing how the dashboard connects to real vehicle data. The same dashboard is analysed section by section in [Full Example](./Example.md), and appears alongside smaller examples in [Examples](./Examples.md).

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

