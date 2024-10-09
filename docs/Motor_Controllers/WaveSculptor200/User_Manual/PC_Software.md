---
title: PC Software
---

# PC Software

!!! info "WaveSculptor Software is now bundled in Prohelion Profinity"
    To download the PC Software to configure your WaveSculptor, download Profinity and configure a [WaveSculptor](../../../Profinity/Components/Motor_Controller/WaveSculptor.md) in your Profile.

Refer to the [Software Download](https://www.prohelion.com/software/) section on the Prohelion Website for the Configuration & Setup software tool download, while you can download the Configuration Tools separately, we recommend Prohelion Profinity, which integrates the tools as well as a number of other useful utilities.

Refer to the [Software User's Manual](../../Config_Software/index.md) for installation and usage instructions.

## Ethernet Bridge Installation

Refer to the [CAN-Ethernet bridge User's Manual](../../../CAN_Bridge/User_Manual/index.md) for installation and setup of this piece of hardware.

Connect the Ethernet bridge via a CAN bus cable to the WaveSculptor. Use 120 ohm termination resistors between the CAN-H and CAN-L lines at both items.

<figure markdown>
![CAN Network](images/PC_Software_CAN.png)
<figcaption>CAN Network</figcaption>
</figure>

## Low Voltage and CAN Bus Testing

Provide 12V DC to the CAN bus adapter at the CAN-Ethernet Bridge, to power up both the Ethernet Bridge and the WaveSculptor control electronics. 

If everything is connected correctly, you should see telemetry values appearing and updating several times per second in the PC software window.