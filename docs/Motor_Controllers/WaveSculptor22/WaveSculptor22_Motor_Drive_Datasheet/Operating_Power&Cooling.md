---
title: Operating Power and Cooling
description: Documentation for the Prohelion Vehicle Communications protocol
order: 5
---

# Operating Power and Cooling

The maximum instantaneous output power from the WaveSculptor is limited by internal hardware restrictions, as detailed in previous sections.  However, the continuous power capability of the controller is limited by thermal performance, and is therefore affected by conditions external to the controller such as ambient temperature and cooling system performance.

The WaveSculptor 22 is supplied uncooled, and uses an external customer-supplied heatsink or waterblock to provide cooling for the system.  This allows the end-user to optimise the cooling performance, weight, power consumption and drag of their cooling solution.

Please refer to the [Cooling](http://localhost:4000/WaveSculptor_Motor_Controllers/WaveSculptor22_User_Manual/Cooling.md) section in the User Manual for calculations regarding cooling capacity and performance.

| Maximum instantaneous power output: | 20 | kVA| Note 15 |
| Maximum cold plate design temperature: | 70 | °C | Note 16 |
| Maximum cold plate shutdown temperature: | 80 | °C | Note 16|
| Maximum continuous power output at 30°C ambient:| 20 | kVA | Note 17 |
| Thermal interface surface length:| 250 | mm | Note 18 |
| Thermal interface surface width: | 117 | mm | Note 18 |
| Thermal interface thread size: | M4 | | Note 19|
| Thermal interface fastener <strong>maximum depth:</strong>| 14 | mm | Note 19 |

#### Notes:

15) Maximum software current limit multiplied by maximum DC bus voltage limit.

16) The controller is thermally limited to maintain the junction temperature of the main silicon devices below a safe operating point.  Design your cooling solution to keep the cold plate of the motor controller below the design temperature.  The controller will reduce motor current linearly above this point, derating to 0A output current at the shutdown temperature.  

17) With a water-cooled heatsink of 0.6Kcm<sup>2</sup>/W attached to the cold plate, and a water temperature of 30°C, the WaveSculptor22 is capable of operating at its instantaneous power output continuously.  This represents the best case cooling solution possible.

18) The base of the WaveSculptor22 is a flat aluminium surface, of these dimensions.  A flat area of at least this size should be provided on whatever cooling solution the customer chooses to provide.  Please refer to the [TRI88.005 Mechanical Assembly document]()? available on the Prohelion website for mounting surface features and dimensions.

19) The WaveSculptor22 provided 8x M4 tapped holes in the base of the product, for use in attaching the motor controller to the customer-provided heatsink or waterblock.  <strong>Screws longer than the max depth must not be used, </strong>to avoid damaging internal components in the motor controller.  


