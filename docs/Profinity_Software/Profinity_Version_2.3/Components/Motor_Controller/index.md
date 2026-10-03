---
title: WaveSculptor
description: "Monitor and configure Tritium WaveSculptor motor controllers with real-time performance and temperature data."
---

# WaveSculptor Motor Controller Support

Profinity provides integrated management of the WaveSculptor products through the WaveSculptor dashboard, which can be accessed by adding a WaveSculptor to your [Profile](../../Getting_Started/Profiles.md) and selecting the appropriate tab from the sidebar. When a WaveSculptor is added to your Profile, Profinity prompts for the following information about the device, and these details can be changed later with the `Change Settings` button at the top-right of the WaveSculptor dashboard.

| Parameter            | Description                                                                                  |
|----------------------|----------------------------------------------------------------------------------------------|
| `Name`               | The name of the component. Must be unique.                                                   |
| `Milliseconds Valid` | The timeout of the device. If the network has not received any traffic from this device after this many milliseconds, the connection is assumed to have been lost. |
| `Base Address`       | The CAN address of the WaveSculptor (See [WaveSculptor documentation](../../../../Motor_Controllers/index.md)) |

<figure markdown>
![Prohelion WaveSculptor](../../images/wavesculptor.png)
<figcaption>Prohelion WaveSculptor</figcaption>
</figure>

Prohelion is currently migrating Tritium WaveSculptor support software into Profinity. In this release, WaveSculptor configuration is still handled by the Tritium software, and Prohelion expects to migrate that functionality to Profinity over time.

## WaveSculptor Data

The top row of the WaveSculptor dashboard presents a summary of the following information (left to right):

| Cell            | Meaning                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------|
| `BUS VOLTAGE`   | Total voltage across the WaveSculptor DC input terminals, in volts.                          |
| `BUS CURRENT`   | Current being supplied to/from the WaveSculptor from/to the DC bus, in amps. Negative current indicates current out of the WaveSculptor (e.g., during regenerative braking). |
| `BUS POWER`     | The total power flow in/out of the WaveSculptor DC input terminals. Negative power indicates power flowing out of the WaveSculptor (e.g., during regenerative braking). |
| `RPM`           | The estimated speed of the motor, in revolutions per minute.                                 |
| `MPS`           | The estimated speed of the motor, in metres per second.                                      |
| `MOTOR TEMP`    | The temperature reading from the motor's onboard temperature sensor, in °C.                  |
| `HEATSINK TEMP` | The temperature reading from the WaveSculptor's heatsink temperature probe, in °C.                                     |
| `DSP TEMP`      | The temperature reading from the WaveSculptor's signal processing board temperature probe, in °C.                   |

Below the summary ribbon are some time-series graphs of the DC bus power and motor velocity to help display any general trends. There are also several status indicators which highlight when various controller limits have been reached or controller errors are present. More information about these limits and errors can be found in the [WaveSculptor documentation](../../../../Motor_Controllers/index.md).

Clicking the `MORE DETAILS` banner reveals another section with information about the internal controller state and control algorithm. Most of this information is not necessary for general use, but it is useful for advanced use cases and debugging. The data listed includes:

- Low voltage rails (1.9 V, 3.3 V, and 15 V)
- Motor B and C phase currents
- D-Q reference frame motor vectors
    - Back-EMF
    - Stator voltage
    - Stator current
- Comms error counts

## Updating the WaveSculptor Configuration

!!! warning "Desktop instance required"
    Currently only the desktop release of Profinity includes the WaveSculptor configuration tools. Therefore, to update the configuration of your WaveSculptor, the WaveSculptor must be connected to a desktop instance of Profinity for the duration of the update process. The WaveSculptor configuration tools are planned to become available in the Docker release in a future update.

To update the configuration of your WaveSculptor, select the `Setup and Config` button on the Firmware Utilities tab in the settings, which loads the WaveSculptor setup and configuration utilities. More specific details about the WaveSculptor configuration can be found in the [WaveSculptor documentation](../../../../Motor_Controllers/Config_Software/index.md).

!!! info "Tritium / Prohelion Adapter"
    The WaveSculptor configuration tools were developed by Tritium and rely on a CAN to Ethernet Bridge being present in the configuration. If there is no such bridge, a virtual one can be created using the [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) in conjunction with another bridge.

<figure markdown>
![Configure a WaveSculptor](../../images/configure_wavesculptor.png)
<figcaption>Configure a WaveSculptor</figcaption>
</figure>
<br>

## Flashing the WaveSculptor Firmware

Once the configuration of your WaveSculptor has been updated, the WaveSculptor firmware must be flashed, using the `Update Firmware` button on the Firmware Utilities tab in the Settings. As per the configuration tool, a CAN to Ethernet bridge or a [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) is required for this operation.
