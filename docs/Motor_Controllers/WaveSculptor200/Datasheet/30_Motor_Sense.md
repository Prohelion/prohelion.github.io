---
title: Motor Sense
description: Documentation for the Prohelion Vehicle Communications protocol
order: 3
---

# Motor Sense

When driving an AC Permanent Magnet motor, the WaveSculptor requires three sensors from the motor to give position feedback at low velocities.  When driving an induction motor, the WaveSculptor requires a motor shaft encoder to give velocity feedback.  Motor temperature can also be measured for both telemetry data and motor protection, if desired.

| Supply                                         |      | Units | Notes:            |
|------------------------------------------------|------|-------|-------------------|
| Sensor power supply output 1:	                 | 5    | V     | Note [^9]         |
| Sensor power supply output 2:                  | 12   | V     | Note [^9]         |
| Sensor power supply current maximum:           | 100  | mA    |                   |
| Sensor Power Supply isolation:                 | 1000 | V     | Note [^10]        |
| BLDC motor position sensor input phase offset: | ±10  | °     | Note [^11],[^12]  |
| Induction motor encoder resolution minimum:    | 64   | ppr   | Note [^13]        |
| NTC Temperature sensor at 25°C:                | 100  | kΩ    | Note [^14]        |

__Notes:__

[^9]:
    The WaveSculptor provides isolated voltage supplies to operate the motor position sensors and motor temperature sensor.  These supplies are a regulated 5V and a regulated 12V output.  Please check with your motor supplier for the acceptable operating voltage of the position sensors used in your motor.

[^10]: 
    The sensor output supply, position inputs, and temperature input have an isolation barrier between them and both the DC bus and the CAN bus voltages.

[^11]: 
    Motor position sensors are only required when driving a AC Permanent Magnet motor.  Motor position sensors should be aligned such that the phase angle offset between each sensor’s output changing state, and the zero-crossing point of it’s appropriate motor phase, is no more than the specified maximum. This implies that the sensors are 120° offset (electrically, per motor pole) from each other under ideal conditions.

[^12]:
    The polarity and arrangement of the position input signals does not matter. The WaveSculptor detects relative alignment of position signals to motor phases, as well as the polarity of each input, when the Phasorsense algorithm is run during motor controller configuration and setup.  The WaveSculptor can store this information for multiple motors, thus allowing motor changes in your vehicle without having to re-run the configuration program.  Please refer to the communications and programming Appendix in the User's Manual for more information.

[^13]:
    The motor shaft encoder is only required when driving a induction motor.

[^14]:
    The WaveSculptor expects a 100kΩ (at 25°C) NTC thermistor embedded in the motor to detect motor temperature.  The thermistor B model constants (available in the thermistor datasheet) can be programmed into the WaveSculptor during configuration / setup to exactly match the temperature response of your thermistor.
