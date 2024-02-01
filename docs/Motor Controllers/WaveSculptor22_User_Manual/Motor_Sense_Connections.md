---
title: Motor Sense Connections
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor22_User_Manual/Motor_Sense_Connections.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor22_User_Manual
order: 9
---

# Motor Sense Connections 

The WaveSculptor22 requires a position sensor to be able to control the motor.  It can also measure the temperature of the motor, and gradually reduce the motor current if this temperature rises towards a user-programmable threshold. 

Since there are a large variety of possible combinations of position and temperature sensors, Prohelion has implemented the interface on the motor controller in a generic manner.  Small adapter circuit boards, suitable for mounting directly inside the motor terminal box, are used to adapt the sensors in that motor to the interface required by the WaveSculptor22.  This also provides a robust signalling mechanism (isolated, differential) for the longest length of cable possible.  The WaveSculptor provides isolated, regulated +5V and +12V DC to power the external adapter.  Refer to the [datasheet](http://localhost:4000/WaveSculptor_Motor_Controllers/WaveSculptor22_Motor_Drive_Datasheet/Overview.html) for specifications on these supplies.

The WaveSculptor provides four isolated differential inputs for information from the motor.  Three of these are routed to timer/capture peripherals in the main processor, and are normally used for three Hall-effect position sensors.  The fourth channel is routed to a UART serial receiver, and expects digital data.  Depending on the adapter board, this data may contain temperature, position, velocity, or a combination of all three.  

A brief datasheet for each adapter option is available on the [Prohelion website](http://localhost:4000/WaveSculptor_Motor_Controllers/Overview.html).  If your motor requires an adapter that is not yet available, please contact Prohelion to enquire about development, as new adapters are simple and low-cost to design.

## Connector Pinout 

The connector used on the WaveSculptor22 for motor sense signals is a 14-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  Please refer to [Appendix B](appendix_B) for an overview of correct crimping technique, as poor crimps will cause unreliable operation.

![Connector Pinout](

The wiring for this connector should be implemented with twisted pairs, as the signal inputs are differential.  Prohelion recommends using Belden 9506 type cable (shielded 6 pair) for this connection, with suggested cable colours shown above.

## Motor Position Sense

For operating Brushless DC (BLDC) and Permanent Magnet Synchronous (PMSM) type motors, the WaveSculptor requires three motor position sensing inputs, commonly provided using Hall-effect switches embedded in the motor.

Please note that the relation between each Hall-effect input and a motor output phase, as well as the polarity of the Hall-effect input signal, does not matter. The WaveSculptor will detect these relationships when running its initial setup and configuration routine (PhasorSense). The only requirement for these signals is that they have a fixed alignment (ideally, a 0° offset) with the zero-crossing point of the back-EMF waveform of the motor, and that the signals are offset from each other by 120°. This is where most motors will be configured by default.  Use an oscilloscope to check that this angle is close to 0° for your motor.

## Motor temperature Sense

Prohelion's motor adapters are currently available for use with NTC thermistor and Pt100 temperature sensor elements.  Variations are possible to accommodate thermocouple and LM35-type semiconductor sensors also.


