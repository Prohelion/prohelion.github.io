---
title: Motor Controller (WaveSculptor)
description: "Monitor and configure Prohelion WaveSculptor22 motor controllers with real-time performance, limit, error and temperature data."
---

# Motor Controller (WaveSculptor)

The WaveSculptor dashboard monitors a Prohelion WaveSculptor22 motor controller and appears as a tab in the sidebar once the controller is added to the [Profile](../../Getting_Started/Profiles.md). The dashboard decodes the controller with the message and signal names of the [WaveSculptor22 DBC file](../../../../Motor_Controllers/WaveSculptor22/User_Manual/DBC.md).

The WaveSculptor communicates only over CAN and takes its low-voltage supply from the CAN cable. A [CAN adapter](../CAN_Bus_Protocols/CAN_Bus_Adapters.md) connected to a powered CAN bus is therefore required before the dashboard shows any data.

!!! info "One Component Serves the WaveSculptor22 and the WaveSculptor200"
    The WaveSculptor22 component monitors both the WaveSculptor22 and the WaveSculptor200. The two controllers send the same CAN messages with the same signals, and the WaveSculptor200 [DBC file](../../../../Motor_Controllers/WaveSculptor200/User_Manual/DBC.md) matches the one the component uses, so add the WaveSculptor22 component whichever controller you have.

Profinity requests the settings below when the WaveSculptor is added, and the **Change Settings** button at the top-right of the dashboard changes them later.

| Parameter            | Description                                                                                  |
|----------------------|----------------------------------------------------------------------------------------------|
| `Name`               | The name of the component. Must be unique.                                                   |
| `Milliseconds Valid` | The timeout of the device, which defaults to 5000. If no traffic is received from the device within this time, Profinity treats the connection as lost. |
| `Base Address`       | The CAN base address of the WaveSculptor, which defaults to `0x400` and must match the address programmed into the controller. Every WaveSculptor on the same CAN bus requires a different base address, as described in [CAN Bus and Low Voltage](../../../../Motor_Controllers/WaveSculptor22/User_Manual/CAN_Bus_And_Low_Voltage.md). |

If the dashboard shows no data, check that the CAN adapter status is green, that the `Base Address` matches the address programmed into the controller, and that the adapter and the WaveSculptor use the same CAN bit rate (500 kbit/s by default).

<figure markdown>
![Prohelion WaveSculptor dashboard showing the summary row, graphs, limit and error panels](../../images/wavesculptor.png)
<figcaption>Prohelion WaveSculptor</figcaption>
</figure>

## WaveSculptor Data

The top row of the dashboard summarises the bus voltage, bus current, bus power, digital signal processor (DSP), motor and heatsink temperatures, motor speed in **RPM** and vehicle speed in **MPS** (metres per second). A negative bus current or bus power indicates power flowing out of the WaveSculptor, for example during regenerative braking. Profinity calculates **BUS POWER** as the product of bus voltage and bus current. **MOTOR TEMP** reads correctly only when a motor temperature sensor is connected and configured, and **MPS** depends on the tyre diameter entered in the WaveSculptor configuration.

Below the summary are time-series graphs of bus power and velocity, followed by a **CONTROLLER LIMITS** panel (amber) and a **CONTROLLER ERRORS** panel (red). An indicator lights when the matching bit of the Status message is set. Only one control loop limits the motor torque at any one time, so a single limit indicator is lit, and **MOTOR CURRENT** or **VELOCITY** lighting means the setpoint has been reached during normal operation.

| Limit Indicator       | Meaning                                                                          |
|-----------------------|----------------------------------------------------------------------------------|
| **OUTPUT VOLTAGE PWM**  | There is not enough bus voltage to produce more current and more torque.       |
| **MOTOR CURRENT**       | The motor current setpoint is being regulated.                                 |
| **VELOCITY**            | The velocity setpoint has been reached.                                        |
| **BUS CURRENT**         | The bus current setpoint is limiting any further increase in motor torque.     |
| **BUS VOLTAGE UPPER**   | Regenerative torque is limited by the maximum bus voltage setpoint.            |
| **BUS VOLTAGE LOWER**   | Drive torque is limited by the minimum bus voltage setpoint.                   |
| **IPM OR MOTOR TEMP**   | A temperature limit is reducing the motor torque. IPM is the intelligent power module. |

| Error Indicator         | Meaning                                                                         |
|-------------------------|---------------------------------------------------------------------------------|
| **HARDWARE OVER CURRENT** | The hardware over current comparator tripped, even if only for an instant.    |
| **SOFTWARE OVER CURRENT** | The measured current exceeded the limit in the calibration configuration.     |
| **DC BUS OVER VOLTAGE**   | The bus voltage exceeded the over voltage limit in the calibration configuration. |
| **WATCHDOG RESET**        | The watchdog reset the controller. This is a warning rather than a fault and stays set until the next power cycle. |
| **CONFIG READ**           | The stored configuration could not be read at start-up, so default values are in use. |
| **15v UNDER VOLTAGE**     | The internal 15 V rail has dropped too low.                                   |
| **DESATURATION FAULT**    | On the WaveSculptor22 this indicates an under voltage of the metal-oxide-semiconductor field-effect transistor (MOSFET) driver. |
| **MOTOR OVERSPEED**       | The motor speed exceeded the configured maximum by 15%.                       |

Each limit and error is described in more detail on the [Observation](../../../../Motor_Controllers/Config_Software/Observation.md) page of the configuration software manual. The **MORE DETAILS** banner reveals the internal controller state, which is useful for debugging and not needed for general use. The state includes the low-voltage rails, phase currents, direct-quadrature (D-Q) reference frame vectors, slip speed, odometer, serial number and CAN error counts. Signals that the default dashboard does not display, such as the motor hall sequence error, can be bound to a lamp in a [custom dashboard](../../Customising_Profinity/Dashboards/Full_Example.md).

## Updating the WaveSculptor Configuration

!!! warning "WaveSculptor Configuration Tools Run on Windows Only"
    The WaveSculptor configuration and firmware tools (**Setup and Config**, wsConfig and **Update Firmware**) are available only on Windows, and only to the user of the Profinity desktop application. A Docker, Linux or macOS installation has no **Setup and Config** button, so the WaveSculptor must be connected to a Windows desktop instance for the duration of the update.

The Tritium wsConfig program performs the configuration. Profinity launches it from the **Setup and Config** button on the **Firmware Utilities** tab in the settings, and wsConfig also sets the CAN bus data rate and base address of the WaveSculptor. The factory default rate for all Prohelion devices is 500 kbit/s, and the CAN adapter in the Profile must be set to the same rate as the WaveSculptor.

**Setup and Config** runs three steps in order, and stops if one fails.

1. **Check Suitable Available Network**: Profinity checks that a suitable network is available.
2. **Set Active**: Profinity sets the WaveSculptor as the active device over a TCP connection.
3. **Run WaveSculptor Config**: Profinity launches wsConfig.

If the sequence stops at step 1, no suitable network is available, so check that the bridge and the PC are on the same local network. If it stops at step 2, check that no other client holds the bridge's single TCP connection. If wsConfig does not open, the sequence has stopped before step 3, and the [Profinity log](../../Getting_Started/Profinity_Log.md) records that the operation did not run successfully.

!!! warning "Use a CAN to Ethernet Bridge for Configuration"
    The configuration tools need a Prohelion or Tritium [CAN to Ethernet Bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) on the same CAN bus as the WaveSculptor and the same local network as the PC. Where no bridge is available, pairing the [Virtual CAN Adapter](../CAN_Bus_Protocols/Virtual_CAN_Adapter.md) with another CAN adapter creates a virtual one. A physical bridge accepts only one TCP connection at a time, as covered under [Multiple TCP clients on one bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md).

The PhasorSense, ParamExtract and ImExtract tools and the procedure for [setting up a motor](../../../../Motor_Controllers/Config_Software/Set_Up_a_Motor.md) are covered in the [configuration software documentation](../../../../Motor_Controllers/Config_Software/index.md).

<figure markdown>
![Configure a WaveSculptor from the Firmware Utilities tab](../../images/configure_wavesculptor.png)
<figcaption>Configure a WaveSculptor</figcaption>
</figure>

## Flashing the WaveSculptor Firmware

Once the configuration has been updated, the **Update Firmware** button on the **Firmware Utilities** tab in the settings flashes the firmware. It needs the same Windows desktop instance and the same CAN to Ethernet bridge or Virtual CAN Adapter as the configuration tool, but sets the WaveSculptor active over UDP rather than TCP, so it does not use the bridge's single TCP connection.
