---
title: 12V Input & Output
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
last_updated: January 10, 2024
permalink: Electric_Vehicle_Driver_Controls/12V_Input_&_Output.html
folder: Electric_Vehicle_Driver_Controls
order: 3
---

# 12V Input and Output

## Power Supply

The Driver Controls requires a 12V power connection to the spade terminals on the front panel.  This connection should be capable of supplying enough current to run all devices on the CAN bus, plus the expected current draw of the brake and reversing lights (if connected).  It should be fused externally to the driver controls. 

This power can be from an 'always on' connection, however the driver controls draws around 30mA continuously, so will drain your accessory battery if your DC/DC converter from the high voltage traction pack does not operate continuously.   This current draw will be lower in the future, however sleep mode functions are not implemented in the default software at this point.

Supplying the driver controls from a relay activated by the 'Run' position of the ignition key is a good compromise.

Supplying the driver controls from the 'Accessories' position of the ignition key is not recommended as this power is usually cut when the key is moved to the start position.  


## Bulb Drive Outputs 

The driver controls has two 12V 3A outputs, and the default software is suitable for connecting these two outputs to your brake lights and your reversing lights.  

This is so that the brake lights can activate if regenerative braking is used, and the reversing lights can be activated if you are using a fixed ratio gearbox and are performing vehicle reversing by changing the motor rotation direction.

If you are not using regen braking then you can leave the brake output from the driver controls disconnected, and leave the vehicle wiring untouched.

If you are using a conventional gearbox to perform reversing, then you can leave the reversing output from the driver controls disconnected, and leave the vehicle wiring untouched.
