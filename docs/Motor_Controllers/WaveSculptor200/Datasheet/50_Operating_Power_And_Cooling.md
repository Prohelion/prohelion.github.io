---
title: Operating Power and Cooling
description: Documentation for the Prohelion Vehicle Communications protocol
order: 5
---

# Operating Power and Cooling

The maximum instantaneous output power from the WaveSculptor is limited by internal hardware restrictions, as detailed in previous sections.  However, the continuous power capability of the controller is limited by thermal performance, and is therefore affected by conditions external to the controller such as ambient temperature and cooling system performance.

The WaveSculptor 200 is water cooled, and uses an external radiator with fans to provide cooling for the system.  Careful consideration should be paid to the position and ventilation of the radiator in your vehicle.

| Maximum instantaneous power output: | 165 | kVA| Note 15 |
| Maximum continuous power output at 30°C ambient:| 107 | kVA | Note 16 |
| Maximum continuous power output at 40°C ambient:| 91 | kVA | Note 16 |
| Maximum continuous power output at 50°C ambient:| 76 | kVA | Note 16 |
| Acceptable metallic cooling system components | | Alluminium | Note 17 | 
| Cooland pressure maximum | 0.75 | Bar | Note 18 | 

#### Notes: 

15) Maximum software current limit multiplied by maximum DC bus voltage limit.

16) The controller is thermally limited to maintain the junction temperature of the main silicon devices below 100°C.  Stated figures are with Prohelion specified cooling system components with fan-forced airflow. Refer to the [User Manual](http://localhost:4000/WaveSculptor_Motor_Controllers/User_Manual/index.md). for recommended components.

17) To prevent dissimilar metal corrosion problems, all items in the liquid cooling loop must be either plastic or aluminium.  Note specifically that many automotive radiators are copper, and must not be used.  Please use only the components recommended by Prohelion, as specified in the [User Manual](http://localhost:4000/WaveSculptor_Motor_Controllers/User_Manual/index.md).

18) To avoid exceeding this pressure, it is recommended to use a pump with a maximum head of less than this value.  The Koolance PMP-400 pump recommended in the [User Manual](http://localhost:4000/WaveSculptor_Motor_Controllers/User_Manual/index.md) meets this requirement.
