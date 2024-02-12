---
title: DC Bus
description: Documentation for the Prohelion Vehicle Communications protocol
order: 1
---

# DC Bus

The DC bus connection provides power to the controller during normal (motoring) operation, and accepts power from the controller during regenerative braking operation.  It is expected to be connected to a battery pack through a precharge circuit and a fuse.

| Supply                                        |      | Units | Notes:             |
|-----------------------------------------------|------|-------|--------------------|
| `Continuous bus voltage minimum:`             | 0    | V     | Note [^1]          |
| `Continuous bus voltage maximum:`             | 165  | V     |                    |
| `Instantaneous bus voltage maximum:`	        | 175  | V     | Note [^2]          |
| `Instantaneous bus current maximum (drive):`	| 122  | A     | Note [^3], [^4]    |
| `Instantaneous bus current maximum (regen):`	| -122 | A     | Note [^3], [^4]    |

__NOTES:__

[^1]: 
    The WaveSculptor control electronics operate from low-voltage DC supplied along the CAN bus cable, not from the high-voltage DC bus.  Therefore, the supply to the main power stage (via the DC bus) has no operating minimum voltage.
 
[^2]:
    The WaveSculptor uses 200V MOSFETs as the power switching elements. Exceeding this voltage across the device for even a short interval will result in catastrophic failure of the motor controller.  The WaveSculptor contains sufficient internal capacitance, and sufficiently rapid detection circuitry, such that it can protect itself against a self-imposed worst-case situation during normal operation.  This situation is regenerative braking at full current, at maximum continuous bus voltage, and having the DC bus connection broken or removed.  This situation can occur as a result of the DC bus protection contactor opening, the battery fuse blowing, or a loose connection in the vehicle wiring. Operating with higher DC bus voltages than the continuous voltage maximum could result in this self-protection mechanism failing to shut down the controller in time, resulting in the destruction of the controller.

[^3]:
    The instantaneous current rating of the DC bus is related to the highest power drive situation, which is driving at full motor current and full speed.  In this case, the bus current will be √3 / √2 * RMS motor current maximum (100A), giving a  current of 122A DC.  The equivalent factors apply for regenerative braking. Although the controller is capable of processing this bus current, the motor impedance (power factor) will limit the current at high speed, therefore limiting the bus current.  Modelling of your motor impedance in the drive system should be performed to calculate peak power.

[^4]:
    The maximum DC bus current can be limited by the WaveSculptor under software control, and is adjustable dynamically via a command on the CAN bus during operation to anywhere between 0 and 100% of full current.  This feature can be used to limit the current capability and sizing of battery packs, battery wiring, battery fusing, and contactors.