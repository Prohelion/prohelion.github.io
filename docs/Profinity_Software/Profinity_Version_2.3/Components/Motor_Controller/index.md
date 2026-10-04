---
title: WaveSculptor
description: "Monitor and configure Prohelion WaveSculptor22 motor controllers with real-time performance, limit, error and temperature data."
---

# WaveSculptor Motor Controller Support

Profinity provides integrated management of the Prohelion WaveSculptor22 motor controller through the WaveSculptor dashboard, which can be accessed by adding a WaveSculptor22 to your [Profile](../../Getting_Started/Profiles.md) and selecting the appropriate tab from the sidebar, and the component decodes the CAN messages of the controller using the same message and signal names as the [WaveSculptor22 DBC file](../../../../Motor_Controllers/WaveSculptor22/User_Manual/DBC.md). The WaveSculptor communicates only over a CAN bus connection and takes its low-voltage supply (9 to 15 V) from the same CAN cable, so a CAN adapter that is connected to a powered CAN bus is required before the dashboard shows data, as described in [CAN bus Adapters](../Adaptors/CAN_Bus_Adapters.md) and in the [WaveSculptor22 Control and Telemetry Interface datasheet](../../../../Motor_Controllers/WaveSculptor22/Datasheet/Control_And_Telemetry_Interface.md). When a WaveSculptor is added to your Profile, Profinity prompts for the following information about the device, and these details can be changed later with the `Change Settings` button at the top-right of the WaveSculptor dashboard.

| Parameter            | Description                                                                                  |
|----------------------|----------------------------------------------------------------------------------------------|
| `Name`               | The name of the component. Must be unique.                                                   |
| `Milliseconds Valid` | The timeout of the device, which defaults to 5000. If the network has not received any traffic from this device after this many milliseconds, the connection is assumed to have been lost. |
| `Base Address`       | The CAN base address of the WaveSculptor, which defaults to `0x400`. The base address is the device identifier multiplied by 32, the WaveSculptor transmits each message at the base address plus a message offset (for example the Bus Measurement message at base address + `0x02`), and every WaveSculptor on the same CAN bus must use a different base address. The value must match the base address programmed into the controller (see the [CAN protocol appendix](../../../../Motor_Controllers/WaveSculptor22/User_Manual/Appendix_C.md) and [CAN Bus and Low Voltage](../../../../Motor_Controllers/WaveSculptor22/User_Manual/CAN_Bus_And_Low_Voltage.md)). |

The WaveSculptor also holds a second programmable base address, which it watches for drive commands and which must be set to the base address of the driver controls on the network, and that address is independent of the `Base Address` shown above.

<figure markdown>
![Prohelion WaveSculptor](../../images/wavesculptor.png)
<figcaption>Prohelion WaveSculptor</figcaption>
</figure>

Prohelion is currently migrating the Tritium WaveSculptor support software into Profinity. In this release the WaveSculptor configuration is performed by the wsConfig program that Tritium developed, which Profinity launches from the Windows desktop release, and Prohelion expects to migrate that functionality into Profinity over time.

!!! info "WaveSculptor22 and WaveSculptor200"
    The component supplied with Profinity is the WaveSculptor22, and it identifies the device from the device identifier `0x4003` that the WaveSculptor22 broadcasts every second in its Identification Information message. The [WaveSculptor200](../../../../Motor_Controllers/WaveSculptor200/User_Manual/Appendix_C.md) uses a different Status message layout with extended error flags, and reports IPM phase temperatures in place of the heatsink temperature, so signal names must be checked against the DBC file for the controller in use before a dashboard is reused for a WaveSculptor200.

## WaveSculptor Data

The top row of the WaveSculptor dashboard presents a summary of the following information (left to right):

| Cell            | Meaning                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------|
| `BUS VOLTAGE`   | DC bus voltage at the controller, in volts (the `BusVoltage` signal of the `BusMeasurement` message). |
| `BUS CURRENT`   | Current drawn from the DC bus by the controller, in amps (the `BusCurrent` signal), where a negative value indicates current flowing out of the WaveSculptor to the bus, for example during regenerative braking. |
| `BUS POWER`     | The power flow in or out of the WaveSculptor DC input terminals, in watts, which Profinity calculates as the product of `BusVoltage` and `BusCurrent` and which is not a signal transmitted by the WaveSculptor. A negative value indicates power flowing out of the WaveSculptor, for example during regenerative braking. |
| `DSP TEMP`      | The temperature of the DSP control board, in °C (the `DspBoardTemp` signal).                |
| `MOTOR TEMP`    | The internal temperature of the motor, in °C (the `MotorTemp` signal), which is only meaningful when a motor temperature sensor (a thermistor or PT100) is connected and configured in the motor slot, because the WaveSculptor otherwise expects a dummy resistor in place of the sensor. |
| `HEATSINK TEMP` | The temperature of the WaveSculptor heatsink (case), in °C (the `HeatsinkTemp` signal).    |
| `RPM`           | The motor angular frequency, in revolutions per minute (the `MotorVelocity` signal).         |
| `MPS`           | The vehicle velocity, in metres per second (the `VehicleVelocity` signal), which depends on the tyre diameter entered in the WaveSculptor configuration. |

Below the summary ribbon are two time-series graphs, `BUS POWER (W)` and `VELOCITY (M/S)` (the vehicle velocity), to help display any general trends, and two panels of status indicators, `CONTROLLER LIMITS` (amber) and `CONTROLLER ERRORS` (red), which light when the matching bit of the Status message is set. The Status message is broadcast every 200 ms, and the [Observation](../../../../Motor_Controllers/Config_Software/Observation.md) page of the configuration software manual describes each limit and error in more detail.

| Limit indicator       | Signal                    | Meaning                                                                                  |
|-----------------------|---------------------------|------------------------------------------------------------------------------------------|
| `OUTPUT VOLTAGE PWM`  | `LimitOutputVoltagePWM`   | There is not enough bus voltage to produce more current and hence more torque.            |
| `MOTOR CURRENT`       | `LimitMotorCurrent`       | The motor current setpoint is being regulated, which is normal operation.                 |
| `VELOCITY`            | `LimitVelocity`           | The velocity setpoint has been reached, which is normal operation.                        |
| `BUS CURRENT`         | `LimitBusCurrent`         | The bus current setpoint is limiting any further increase in motor torque.                |
| `BUS VOLTAGE UPPER`   | `LimitBusVoltageUpper`    | Regenerative torque is limited by the maximum bus voltage setpoint.                       |
| `BUS VOLTAGE LOWER`   | `LimitBusVoltageLower`    | Drive torque is limited by the minimum bus voltage setpoint.                              |
| `IPM OR MOTOR TEMP`   | `LimitIpmOrMotorTemp`     | A temperature limit is reducing the motor torque.                                         |

Only one of the WaveSculptor control loops limits the motor torque at any one time, so a single limit indicator is normally lit.

| Error indicator         | Signal                           | Meaning                                                                                           |
|-------------------------|----------------------------------|---------------------------------------------------------------------------------------------------|
| `HARDWARE OVER CURRENT` | `ErrorHardwareOverCurrent`       | The hardware over current comparator tripped, even if only for an instant.                         |
| `SOFTWARE OVER CURRENT` | `ErrorSoftwareOverCurrent`       | The firmware sampled a bus, phase B or phase C current above the limit in the calibration configuration. |
| `DC BUS OVER VOLTAGE`   | `ErrorDcBusOverVoltage`          | The bus voltage exceeded the over voltage limit set in the calibration configuration.              |
| `WATCHDOG RESET`        | `ErrorWatchdogCausedLastReset`   | The watchdog reset the controller, which is a warning rather than a fault because the controller continues to operate, and the flag stays set until the next reset or power cycle. |
| `CONFIG READ`           | `ErrorConfigRead`                | The configuration could not be fully read at start-up, so default values replace the stored values and the controller may not operate as expected. |
| `15v UNDER VOLTAGE`     | `Error15vRailUnderVoltage`       | The internal 15 V rail dropped below 12 V.                                                         |
| `DESATURATION FAULT`    | `ErrorDesaturationFault`         | On the WaveSculptor22 this indicates an under voltage of the MOSFET driver.                        |
| `MOTOR OVERSPEED`       | `ErrorMotorOverSpeed`            | The motor speed exceeded the configured maximum by 15%, and the flag clears once the speed falls to 95% of the maximum. |

The Status message also carries an `ErrorBadMotorPositionHallSeq` flag (an invalid motor hall transition, recorded against the sequence captured by PhasorSense), which the default dashboard does not display and which can be bound to an additional lamp in a [custom dashboard](../../Extending_Profinity/Dashboards/Example.md).

Clicking the `MORE DETAILS` banner reveals another section with information about the internal controller state and control algorithm. Most of this information is not necessary for general use, but it is useful for advanced use cases and debugging. The data listed includes:

- Low voltage rails (1.9 V for the DSP core, 3.3 V for the control circuitry, and the internal 15 V rail, which is not the CAN bus supply voltage)
- Motor B and C phase currents (RMS, in A)
- D-Q reference frame motor vectors
    - Back-EMF (`BEMFd`, which is always 0 V by definition, and `BEMFq`, the peak of the phase to neutral motor voltage)
    - Applied motor voltage (`Vd` and `Vq`)
    - Applied motor current (`Id`, the field current, and `Iq`, the torque-producing current)
- Slip speed (in Hz, valid only when driving an induction motor) and odometer (the distance travelled since reset, in metres)
- Part ID (the device identifier) and serial number
- CAN transmit and receive error counts (the DSP CAN error counters)

## Updating the WaveSculptor Configuration

!!! warning "Desktop instance required"
    Currently only the desktop release of Profinity includes the WaveSculptor configuration tools. Therefore, to update the configuration of your WaveSculptor, the WaveSculptor must be connected to a desktop instance of Profinity for the duration of the update process. The WaveSculptor configuration tools are planned to become available in the Docker release in a future update.

To update the configuration of your WaveSculptor, select the `Setup and Config` button on the Firmware Utilities tab in the settings, which runs a three-step sequence that checks that a suitable network is available, sets the WaveSculptor as the active device over a TCP connection, and then launches the wsConfig utility. More specific details about the WaveSculptor configuration, including the PhasorSense, ParamExtract and ImExtract tools and the procedure for [setting up a motor](../../../../Motor_Controllers/Config_Software/Set_Up_a_Motor.md), can be found in the [WaveSculptor configuration software documentation](../../../../Motor_Controllers/Config_Software/index.md).

The CAN bus data rate and the base address of the WaveSculptor are also set during configuration, the factory default data rate for all Prohelion devices is 500 kbit/s, and the supported rates are 1 Mbit/s, 500, 250, 125, 100 and 50 kbit/s, so the CAN adapter in your Profile must be set to the same bit rate as the WaveSculptor (see [CAN Bus and Low Voltage](../../../../Motor_Controllers/WaveSculptor22/User_Manual/CAN_Bus_And_Low_Voltage.md)).

!!! info "Tritium / Prohelion Adapter"
    The WaveSculptor configuration tools were developed by Tritium and rely on a Prohelion or Tritium [CAN to Ethernet Bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) being present on the same CAN bus as the WaveSculptor and on the same local network as the PC, as described in the [configuration software Observation page](../../../../Motor_Controllers/Config_Software/Observation.md). If there is no such bridge, a virtual one can be created using the [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) in conjunction with another CAN adapter. A physical bridge accepts only one TCP connection at a time, which is covered under [Multiple TCP clients on one bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md).

<figure markdown>
![Configure a WaveSculptor](../../images/configure_wavesculptor.png)
<figcaption>Configure a WaveSculptor</figcaption>
</figure>
<br>

## Flashing the WaveSculptor Firmware

Once the configuration of your WaveSculptor has been updated, the WaveSculptor firmware must be flashed, using the `Update Firmware` button on the Firmware Utilities tab in the Settings. As per the configuration tool, a CAN to Ethernet bridge or a [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) is required for this operation.
