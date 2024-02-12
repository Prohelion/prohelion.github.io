---
title: PC Software
description: Documentation for the Prohelion Vehicle Communications protocol
order: 7
---

# PC Software

!!! info "WaveSculptor Software is now bundled in Prohelion Profinity"
    To download the PC Software to configure your WaveSculptor, download Profinity and configure a [WaveSculptor](../../../Profinity/80_Tritium_WaveSculptor.md) in your Profile.

Refer to the [Software Download section on the WaveSculptor 22 product page](???) for the Configuration & Setup software tool download.

Refer to the [Software User's Manual](../../Config_Software/index.md) for installation and usage instructions.

## Ethernet Bridge Installation

Refer to the [CAN-Ethernet bridge User's Manual](../../../CAN_Bridge/User_Manual/index.md) for installation and setup of this piece of hardware.

Connect the Ethernet bridge via a CAN bus cable to the WaveSculptor.  Use 120 ohm termination resistors between the CAN-H and CAN-L lines at both items.

![Ethernet connection](images/PC_Software.gif)

## Low Voltage & CAN Bus Testing

Provide 12V DC to the CAN bus adapter at the CAN-Ethernet Bridge, to power up both the Ethernet Bridge and the WaveSculptor control electronics.  

If everything is connected correctly, you should see telemetry values appearing and updating several times per second in the PC software window.



