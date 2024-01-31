---
title: Motor Output
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor200_datasheet/Motor_output.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor200_Datasheet
order: 2
---

# Motor Output

The motor output connection provides three-phase power to the motor during normal (motoring) operation and receives power during regenerative braking.  It is expected to be connected to a three-phase motor, either an induction or BLDC (permanent magnet) type.

| Instantaneous motor current maximum: | 300 | A<sub>rms</sub> | Note 5|
| Output voltage maximum (at max DC bus): | 320 | V<sub>rms</sub> <sub>line-line</sub> ||
| Motor phase inductance minimum: | 50 | µH | Note 6, 8 |
| Motor Resistance minimum: | 0 | Ω | Note 7,8 |

### Notes: 

5)  The motor current limit is software controlled and may be limited to lower values via the configuration / setup utility if required.

6)  The WaveSculptor requires a minimum amount of inductance in each motor phase to properly regulate current.  Not providing this inductance may result in an out-of-regulation condition of the motor current control loop, possibly resulting in an undesired self-protection shutdown, or failure of the controller.  Please ensure that both the motor inductance, and any external inductors (if used), are still providing at least the minimum required inductance, even at full rated current, and at elevated temperatures.

7)  As long as the minimum inductance per phase requirement is met, the WaveSculptor will regulate current and operate successfully into a shorted connection.

8)  The WaveSculptor can report inductance and resistance present on its output when running the configuration / setup program.  This will provide a figure for the complete output circuit, including motor, external inductors (if any), wiring, and connectors.  This can be used to verify these values meet the datasheet requirements, but only for low current operation, as the test is performed using a current of approximately 20A.
