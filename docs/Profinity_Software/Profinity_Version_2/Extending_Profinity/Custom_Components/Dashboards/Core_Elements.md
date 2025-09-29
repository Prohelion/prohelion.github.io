---
title: Profinity Dashboard Core Elements
---

# The Four Core Dashboard Elements   

A dashboard is defined as a collection of full-width items arranged vertically. Each top level can be one of four types:

- **Titlebar**: Header section with status lamps and navigation menus
- **Row**: Layout containers that can hold multiple components
- **Accordion**: Collapsible sections for organizing content
- **Footer**: Bottom section with navigation menus

The dashboard uses a hierarchical structure where rows can contain groups, and groups can contain individual components. This allows for flexible layouts that can adapt to different screen sizes and content requirements.

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
                    groups:
                      - items:
                          - label: BUS VOLTAGE
                            openHyperLinkInNewWindow: false
                            enabled: true
                            precision: 1
                            bind:
                              - target: value
                                source: '{COMPONENT_NAME}.BusMeasurement.BusVoltage'
                          - label: BUS CURRENT
                            openHyperLinkInNewWindow: false
                            enabled: true
                            precision: 1
                            bind:
                              - target: value
                                source: '{COMPONENT_NAME}.BusMeasurement.BusCurrent'
                      - items:
                          - label: DSP TEMP
                            openHyperLinkInNewWindow: false
                            enabled: true
                            precision: 1
                            bind:
                              - target: value
                                source: '{COMPONENT_NAME}.DspBoardTempMeasurement.DspBoardTemp'
                      - items:
                          - label: MOTOR TEMP
                            openHyperLinkInNewWindow: false
                            enabled: true
                            precision: 1
                            bind:
                              - target: value
                                source: '{COMPONENT_NAME}.HeatsinkMotorTempMeasurement.MotorTemp'
                          - label: HEATSINK TEMP
                            openHyperLinkInNewWindow: false
                            enabled: true
                            precision: 1
                            bind:
                              - target: value
                                source: '{COMPONENT_NAME}.HeatsinkMotorTempMeasurement.HeatsinkTemp'
                      - items:
                          - label: RPM
                            openHyperLinkInNewWindow: false
                            enabled: true
                            precision: 1
                            bind:
                              - target: value
                                source: '{COMPONENT_NAME}.VelocityMeasurement.MotorVelocity'
                          - label: MPS
                            openHyperLinkInNewWindow: false
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
                      - title: BUS POWER (W)
                        items:
                          - chart:
                              type: line
                              legend: false
                              bind:
                                - target: value
                                  source: "[TimeSeries].{COMPONENT_NAME}.BusMeasurement.BusCurrent"
                      - title: VELOCITY (M/S)
                        items:
                          - chart:
                              type: line
                              legend: false
                              bind:
                                - target: value
                                  source: "[TimeSeries].{COMPONENT_NAME}.VelocityMeasurement.VehicleVelocity"
                      - title: CONTROLLER LIMITS
                        items:
                          - lamps:
                              groups:
                                - items:
                                    - color: amber
                                      value: 1
                                      label: OUTPUT VOLTAGE PWM
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitOutputVoltagePWM'
                                          toType: boolean
                                    - color: amber
                                      value: 1
                                      label: MOTOR CURRENT
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitMotorCurrent'
                                          toType: boolean
                                    - color: amber
                                      value: 1
                                      label: VELOCITY
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitVelocity'
                                          toType: boolean
                                    - color: amber
                                      value: 1
                                      label: BUS CURRENT
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitBusCurrent'
                                          toType: boolean
                                - items:
                                    - color: amber
                                      value: 1
                                      label: BUS VOLTAGE UPPER
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitBusVoltageUpper'
                                          toType: boolean
                                    - color: amber
                                      value: 1
                                      label: BUS VOLTAGE LOWER
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitBusVoltageLower'
                                          toType: boolean
                                    - color: amber
                                      value: 1
                                      label: IPM OR MOTOR TEMP
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.LimitIpmOrMotorTemp'
                                          toType: boolean
                      - title: CONTROLLER ERRORS
                        items:
                          - lamps:
                              groups:
                                - items:
                                    - color: red
                                      value: 1
                                      label: HARDWARE OVER CURRENT
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.ErrorHardwareOverCurrent'
                                          toType: boolean
                                    - color: red
                                      value: 1
                                      label: SOFTWARE OVER CURRENT
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.ErrorSoftwareOverCurrent'
                                          toType: boolean
                                    - color: red
                                      value: 1
                                      label: DC BUS OVER VOLTAGE
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.ErrorDcBusOverVoltage'
                                          toType: boolean
                                    - color: red
                                      value: 1
                                      label: WATCHDOG RESET
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.ErrorWatchdogCausedLastReset'
                                          toType: boolean
                                - items:
                                    - color: red
                                      value: 1
                                      label: CONFIG READ
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.ErrorConfigRead'
                                          toType: boolean
                                    - color: red
                                      value: 1
                                      label: 15v UNDER VOLTAGE
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.Error15vRailUnderVoltage'
                                          toType: boolean
                                    - color: red
                                      value: 1
                                      label: DESATURATION FAULT
                                      enabled: false
                                      bind:
                                        - target: enabled
                                          source: '{COMPONENT_NAME}.Status.ErrorDesaturationFault'
                                          toType: boolean
                                    - color: red
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
                      - enabled: true
                        header:
                          - lamp:
                              color: disabled
                              value: 1
                              label: INFO
                        body:
                          - panels:
                              items:
                                - title: Low Voltage
                                  items:
                                    - readouts:
                                        items:
                                          - label: 15v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail15VMeasurement.Supply15V'
                                          - label: 1.9v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply1V9'
                                          - label: 3.3v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply3V3'
                                - title: Phase Currents
                                  items:
                                    - readouts:
                                        items:
                                          - label: PHASE CURRENT B
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.PhaseCurrentMeasurement.PhaseCurrentB'
                                          - label: PHASE CURRENT C
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.PhaseCurrentMeasurement.PhaseCurrentC'
                                - title: Motor Vectors
                                  items:
                                    - readouts:
                                        items:
                                          - label: BEMF Vd
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.BackEMFMeasurementPrediction.BEMFd'
                                          - label: BEMF Vq
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.BackEMFMeasurementPrediction.BEMFq'
                                          - label: MOTOR VOLTAGE Vd
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.MotorVoltageVectorMeasurement.Vd'
                                          - label: MOTOR VOLTAGE Vq
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.MotorVoltageVectorMeasurement.Vq'
                                          - label: MOTOR CURRENT Id
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.MotorCurrentVectorMeasurement.Id'
                                          - label: MOTOR CURRENT Iq
                                            precision: 3
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.MotorCurrentVectorMeasurement.Iq'
                                - title: Speed & Distance
                                  items:
                                    - readouts:
                                        items:
                                          - label: SLIP SPEED
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.SlipSpeedMeasurement.SlipSpeed'
                                          - label: ODOMETER
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.OdometerBusAhMeasurement.Odometer'
                                - title: Other
                                  items:
                                    - readouts:
                                        items:
                                          - label: PART ID
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.IDInfo.TritiumID'
                                          - label: SERIAL NUMBER
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.IDInfo.SerialNumber'
                                          - label: TX ERROR COUNT
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.Status.TxErrorCount'
                                          - label: RX ERROR COUNT
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.Status.RxErrorCount'
```

