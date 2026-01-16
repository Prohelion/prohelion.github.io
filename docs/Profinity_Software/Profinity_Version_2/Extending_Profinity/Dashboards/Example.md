---
title: Full Example
---

# Real-World Example

This comprehensive example demonstrates a complete motor controller dashboard that showcases many of the concepts covered in this guide. This dashboard monitors a Prohelion WaveSculptor 22 motor controller system and provides real-time monitoring of electrical, thermal, and performance parameters.

## What This Example Demonstrates

This dashboard example shows how to:

- **Monitor Key Performance Metrics** - Bus voltage, current, temperatures, and velocity
- **Display Real-time Charts** - Power consumption and velocity trends over time
- **Show System Status** - Controller limits and error conditions with visual indicators
- **Organize Complex Information** - Using accordions and tabs for detailed data
- **Implement Data Binding** - Connect dashboard components to CAN bus data sources
- **Create Professional Layouts** - Using rows, groups, panels, and pills effectively

## Dashboard Structure Overview

The dashboard is organized into several logical sections:

1. **Status Pill** - Central component showing key metrics with an icon
2. **Performance Charts** - Real-time graphs of power and velocity
3. **Controller Limits** - Visual indicators for system protection limits
4. **Error Monitoring** - Status lamps for various error conditions
5. **Detailed Information** - Collapsible section with comprehensive data

## Data Sources

This dashboard connects to a Prohelion WaveSculptor 22 motor controller system and displays data from:

- **Bus Measurements** - Voltage and current from the main power bus
- **Temperature Sensors** - DSP board, motor, and heatsink temperatures
- **Velocity Data** - Motor RPM and vehicle speed measurements
- **Status Information** - Controller limits, errors, and system state
- **Detailed Measurements** - Phase currents, voltage rails, and motor vectors

## Complete Dashboard Example

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

## Section-by-Section Analysis

### Status Pill Section

The dashboard begins with a **pill component** that serves as the central status display:

- **Icon Configuration** - Uses a motor controller icon to identify the component type
- **Grouped Readouts** - Organizes related measurements into logical groups
- **Key Metrics Display** - Shows bus voltage, current, temperatures, and velocity
- **Real-time Updates** - All values update automatically from CAN bus data

**Key Features:**
- Central icon provides immediate component identification
- Grouped layout makes related data easy to scan
- Precision settings ensure appropriate decimal places for each measurement
- Data binding connects to specific CAN message signals

### Performance Charts Section

The second row contains **panels with charts** for trend analysis:

- **Bus Power Chart** - Shows power consumption over time using bus current data
- **Velocity Chart** - Displays vehicle speed trends
- **Time Series Data** - Uses `[TimeSeries]` data source for historical information
- **Clean Layout** - Each chart is in its own titled panel

**Key Features:**
- Line charts provide smooth trend visualization
- Time series data automatically updates with new values
- Legend disabled for cleaner appearance
- Separate panels allow independent chart management

### Controller Limits Section

The **controller limits panel** shows system protection status:

- **Amber Status Lamps** - Indicates when various limits are active
- **Comprehensive Coverage** - Monitors voltage, current, velocity, and temperature limits
- **Real-time Status** - Lamps enable/disable based on actual limit conditions
- **Two-Row Layout** - Organizes limits into logical groups

**Key Features:**
- Visual indicators provide immediate status awareness
- Boolean data binding shows/hides lamps based on limit states
- Amber colour indicates warning conditions
- Grouped layout prevents information overload

### Error Monitoring Section

The **controller errors panel** displays critical system faults:

- **Red Status Lamps** - Indicates active error conditions
- **Comprehensive Error Coverage** - Monitors hardware, software, and communication errors
- **Immediate Visibility** - Critical errors are prominently displayed
- **Organized Layout** - Errors grouped by type and severity

**Key Features:**
- Red colour indicates critical conditions requiring attention
- Boolean binding shows errors only when active
- Comprehensive error monitoring for system reliability
- Clear labelling for quick error identification

### Detailed Information Section

The **accordion section** provides comprehensive system details:

- **Collapsible Design** - Keeps detailed information accessible but not cluttered
- **Tabbed Interface** - Organizes detailed data into logical categories
- **Multiple Data Categories** - Low voltage, phase currents, motor vectors, speed/distance, and other data
- **High Precision** - Detailed measurements with appropriate decimal places

**Key Features:**
- Progressive disclosure keeps main dashboard clean
- Tabbed interface organizes complex information
- High-precision readouts for detailed analysis
- Comprehensive coverage of all available system data

## Data Binding Patterns

This example demonstrates several important data binding patterns:

### CAN bus Signal Binding
```yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Bus Voltage"
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
```
- Uses DBC signal names for real-time data
- Component name placeholder for reusability

### Time Series Data Binding
```yaml
dashboard:
  items:
    - row:
        items:
          - chart:
              type: line
              bind:
                - target: value
                  source: "[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent"
```
- Historical data for charts and trends
- Automatic time series management

### Boolean Status Binding
```yaml
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: "amber"
                          label: "Motor Current Limit"
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.LimitMotorCurrent'
                              toType: boolean
```
- Shows/hides status indicators based on conditions
- Type conversion ensures proper boolean handling

## Customization Guide

### Adapting for Different Systems

To adapt this dashboard for other motor controllers or systems:

1. **Update Data Sources** - Replace CAN signal names with your system's signals
2. **Modify Measurements** - Adjust the specific parameters you want to monitor
3. **Customize Layout** - Rearrange panels and sections for your needs
4. **Adjust Precision** - Set appropriate decimal places for your measurements
5. **Update Labels** - Change labels to match your system terminology

### Adding New Sections

- **Additional Charts** - Add more panels with different time series data
- **New Status Indicators** - Include additional limit or error monitoring
- **Custom Measurements** - Add readouts for system-specific parameters
- **Interactive Elements** - Include actions or toggles for system control

### Performance Considerations

- **Data Update Frequency** - High-frequency data may impact chart performance
- **Number of Components** - More components require more processing power
- **Complex Bindings** - Simple data bindings perform better than complex transformations

## Best Practices Demonstrated

This example follows several dashboard design best practices:

### Layout Organization
- **Logical Grouping** - Related information is grouped together
- **Progressive Disclosure** - Detailed information is in collapsible sections
- **Visual Hierarchy** - Important information is prominently displayed
- **Consistent Spacing** - Uniform layout throughout the dashboard

### Data Presentation
- **Appropriate Precision** - Decimal places match measurement requirements
- **Clear Labelling** - All measurements have descriptive labels
- **Visual Indicators** - Status lamps provide immediate visual feedback
- **Real-time Updates** - All data updates automatically

### User Experience
- **Intuitive Layout** - Information flows logically from general to specific
- **Quick Access** - Key metrics are immediately visible
- **Detailed Analysis** - Comprehensive data available when needed
- **Professional Appearance** - Clean, organized presentation

## Next Steps

Now that you've seen a complete dashboard example, you can:

- **Start with the Basics** - Begin with [Core Elements](./Core_Elements.md) to understand dashboard structure
- **Learn Data Binding** - Study [Data Binding](./Data_Binding.md) to connect your data sources
- **Explore Components** - Use [Component Reference](./Component_Reference/index.md) for detailed component information
- **Add Styling** - Apply [Conditional Styling](./Conditional_Styling.md) for dynamic visual effects
- **Create Your Own** - Use this example as a template for your specific system