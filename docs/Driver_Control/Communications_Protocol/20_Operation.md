---
title: Operation
description: Documentation for the Prohelion Electric Vehicle Driver Controls
order: 2
---

# Operation

## Torque Control Mode

This control mode is analogous to the way a normal vehicle is operated, with the accelerator (gas) pedal controlling the motor’s torque output.  To drive in this mode, the driver controls should send a Motor Drive Command frame at least once every 200ms containing:

- Desired motor current setting in percent, corresponding to pedal position
- Maximum velocity (eg 100m/s)

With these settings, the motor controller will never be able to reach the setpoint velocity, so the operation of the vehicle will be limited by the motor current, which is proportional to torque.

## Speed Control Mode

This control mode is analogous to cruise control in a normal vehicle.  To drive in this mode, the driver controls should send a Motor Drive Command frame at least once every 200ms containing:

- Maximum motor current (100%)
- Desired vehicle velocity in metres per second

With these settings, the motor controller will use the maximum available current to reach the desired setpoint velocity.

The usual method of setting the target speed would be to monitor “Velocity Measurement” frames from the Wavesculptor, and when the driver wishes to set the target velocity (using some combination of input switches) then the driver controls should begin to transmit the last known velocity measurement as the target velocity.  

Of course, any pre-programmed speed could also be used, however care must be taken when engaging speed control mode under these circumstances, as the vehicle will use the maximum allowable torque to reach the target velocity setpoint as fast as possible.

## Combination Control Modes

Any combination of the above two modes can be implemented, as desired by the user. For example, in speed control mode, while setting the target vehicle velocity, a motor current setting of 50% could be sent, resulting in the motor controller only using half of it’s torque capability to try and reach the velocity setpoint.  

## Power Control

The driver controls can also dynamically limit the maximum current that can be drawn by the Wavesculptor from the vehicle’s power bus (battery).  This may be useful in some applications to minimise high-current events when operating with a discharged main battery pack, or as part of an overall vehicle control strategy during racing.

To limit the power, the driver controls should send a Motor Power Command frame, containing the desired bus current as a percentage of maximum.  This frame may be sent as often as desired, however please note that a Motor Drive Command frame must still be sent at least once every 200ms to prevent the Wavesculptor from shutting down.


