---
title: Control and Telemetrey Interface
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor200_datasheet/Control&telemetrey_interface.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor200_Datasheet
order: 6
---

# Control and Telemetry Interface

The WaveSculptor receives commands, and transmits telemetry values, using a CAN bus connection.  No other interface is provided.  Low-voltage DC power must be provided along the CAN bus cable to operate the control electronics of the WaveSculptor.

| CAN bus supply voltage minimum: | 9 | V | Note 19 |
| CAN bus supply voltage maximum: | 15 | V | Note 19 |
| CAN bus supply voltage nominal:| 13.8 | V | Note 19 |
| CAN bus supply power maximum:| 20 | W |  |
| CAN bus data rate maximum:| 1000 | kbps | Note 20 |
| CAN bus isolation: | 1000 | V | Note 21 |

#### Notes:

19) Prohelion recommends providing the CAN bus supply with 13.8V, using a DC/DC converter and a backup lead-acid battery.  This arrangement, when properly implemented, gives a supply that can tolerate failures and still operate the controller successfully for a short period of time.

20) The data rate used for CAN bus activity is set during configuration and setup of the controller.  Factory default for all Prohelion devices is 500 kbits per second.

21) The CAN bus data connection and power supply are isolated from the high-power DC bus to this continuous voltage rating.  Please refer to the [isolation section in the User Manual](http://localhost:4000/WaveSculptor_Motor_Controllers/WaveSculptor200_User_Manual/High_Power_Connections.html) regarding recommended earthing and connection practices.
