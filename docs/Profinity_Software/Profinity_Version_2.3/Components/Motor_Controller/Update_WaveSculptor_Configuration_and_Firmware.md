---
title: Update WaveSculptor configuration and firmware
description: "Configure a WaveSculptor with wsConfig from the Setup and Config button and flash its firmware, using a Windows desktop instance and a CAN to Ethernet bridge."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Update WaveSculptor configuration and firmware

Configure a [WaveSculptor](WaveSculptor.md) and flash its firmware from the **Firmware Utilities** tab in the component settings.

## Updating the WaveSculptor configuration

!!! warning "WaveSculptor configuration tools run on Windows only"
    The WaveSculptor configuration and firmware tools (**Setup and Config**, wsConfig and **Update Firmware**) are available only on Windows, and only to the user of the Profinity desktop application.
    A Docker, Linux, or macOS installation has no **Setup and Config** button, so the WaveSculptor must be connected to a Windows desktop instance for the duration of the update.

The Tritium wsConfig program performs the configuration.
Profinity launches it from the **Setup and Config** button on the **Firmware Utilities** tab in the settings, and wsConfig also sets the CAN bus data rate and base address of the WaveSculptor.
The factory default rate for all Prohelion devices is 500 kbit/s, and the CAN adapter in the Profile must be set to the same rate as the WaveSculptor.

!!! warning "A CAN to Ethernet bridge is required"
    The configuration tools need a Prohelion or Tritium [CAN to Ethernet Bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) on the same CAN bus as the WaveSculptor and the same local network as the PC.
    Where no bridge is available, pairing the [Virtual CAN Adapter](../CAN_Bus_Protocols/Virtual_CAN_Adapter.md) with another CAN adapter creates a virtual one.
    A physical bridge accepts only one TCP connection at a time, as covered under [Multiple TCP clients on one bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md).

**Setup and Config** runs three steps in order, and stops if one fails.

1. **Check Suitable Available Network**: Profinity checks that a suitable network is available.
2. **Set Active**: Profinity sets the WaveSculptor as the active device over a TCP connection.
3. **Run WaveSculptor Config**: Profinity launches wsConfig.

<figure markdown>
![Firmware Utilities tab with the Setup and Config button for configuring a WaveSculptor](../../images/configure_wavesculptor.png)
<figcaption>Configure a WaveSculptor</figcaption>
</figure>

If the sequence stops at step 1, no suitable network is available, so check that the bridge and the PC are on the same local network.
If it stops at step 2, check that no other client holds the bridge's single TCP connection.
If wsConfig does not open, the sequence has stopped before step 3, and the [Profinity log](../../Administration/Logs_Config.md) records that the operation did not run successfully.

The PhasorSense, ParamExtract, and ImExtract tools and the procedure for [setting up a motor](../../../../Motor_Controllers/Config_Software/Set_Up_a_Motor.md) are covered in the [configuration software documentation](../../../../Motor_Controllers/Config_Software/index.md).

## Flashing the WaveSculptor firmware

Once the configuration has been updated, the **Update Firmware** button on the **Firmware Utilities** tab in the settings flashes the firmware.
It needs the same Windows desktop instance and the same CAN to Ethernet bridge or Virtual CAN Adapter as the configuration tool, but sets the WaveSculptor active over UDP rather than TCP, so it does not use the bridge's single TCP connection.
