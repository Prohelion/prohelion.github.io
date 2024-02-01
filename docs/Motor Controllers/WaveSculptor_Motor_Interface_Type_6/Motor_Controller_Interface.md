---
title: Motor Controller Interface
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_6/Motor_Controller_Interface.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_6
order: 3
---

# Motor Controller Interface

The interface to the WaveSculptor motor controller is provided using differential signal pairs transmitted by the motor interface, with three being received by timer channels in the WaveSculptor, and one being received by a serial UART peripheral.  Regulated 5V and 12V power is provided by the WaveSculptor for use by the motor interface circuitry and sensors.

## Connector

The connector used for motor sense signals is a 14-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  

![Connector Diagram](../images/WaveSculptor_Motor_Interface_T6/Connector3.png)

The wiring for this connector should be implemented with twisted pairs, as the signal inputs are differential.  Prohelion recommends using Belden 9506 type cable (shielded 6 pair) for this connection, with suggested cable colours shown above.

