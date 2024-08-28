---
title: WaveSculptor
---

[Tritium](https://www.tritiumcharging.com/) initially created the WaveSculptor Motor Inverter, used by racing teams around the world.  With 99.2% cruising efficiency the WaveSculptor family is a go to choice for most high efficiency electric vehicle racing teams.  In 2021 [Prohelion](https://www.prohelion.com) took over the design, manufacturing and support for this product.

Profinity provides integrated management of the WaveSculptor products and you can access the WaveSculptor dashboard by adding a WaveSculptor to your [Profile](Profiles.md). 

Once a WaveSculptor has been added to your Profile, the dashboard will become available by selecting the appropriate tab from the sidebar.

<figure markdown>
![Prohelion WaveSculptor](images/wavesculptor.jpg)
<figcaption>Prohelion WaveSculptor</figcaption>
</figure>

Prohelion is currently migrating all of the Tritium WaveSculptor supporting software in to Profinity, in this release the configuration of the WaveSculptor tools is still handed by the Tritium software and we expect to migrate all of that functionality to Profinity over time.

## WaveSculptor Data

The top row of WaveSculptor dashboard presents a summary of the following information (left to right):

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

Below the summary ribbon are some time-series graphs of the DC bus power and motor velocity to help observe any general trends.
 <!-- MORE HERE -->
Clicking the `MORE DETAILS` banner will reveal another section containing .

## Updating the WaveSculptor Configuration

To update the configuration of your WaveSculptor, right mouse click on the WaveSculptor in the Profinity menu and select Setup and Configuration.  This will load the WaveSculptor setup and configuration utilities. More specific details about the WaveSculptor configuration can be found in the [WaveSculptor documentation](../Motor_Controllers/Config_Software/index.md).

!!! info "Tritium / Prohelion Adapter"
    The WaveSculptor configuration tools were developed by Tritium and rely on a CAN to Ethernet Bridge being present in the configuration.  If you do not have such a bridge, you can create a virtual one using the [Virtual CAN Adapter](Virtual_CAN_Adapter.md) in conjunction with another bridge.

<video autoplay loop controls width="100%">
  <source src="video/ConfigWS22.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Flashing the WaveSculptor Firmware

To flash the WaveSculptor firmware, click on the `Update Firmware` button in the top-right of the WaveSculptor dashboard. As per the configuration tool, a CAN to Ethernet bridge or a [Virtual CAN Adapter](Virtual_CAN_Adapter.md) is required for this operation.

