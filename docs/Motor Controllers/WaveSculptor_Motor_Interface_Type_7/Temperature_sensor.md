---
title: Temperature Sensor
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_7/Temperature_sensor.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor_Motor_Interface_Type_7
order: 2
---

# Temperature Sensor

## Type 

The type 7 interface reads two channels of temperature information from <strong>NTC thermistors. </strong> Linearisation is provided in hardware on the motor interface circuit, with further scaling, offset and B curve correction being provided by the WaveSculptor, with inputs from the calibration software and the user.

## Input

By default, the linearisation is provided for a 100k @ 25°C sensor, but this can also be chosen as a factory option for different values, such as the relatively common 10k @ 25°C parts.

## Connector

The connector used for motor temperature sense signals is a 4-way 3mm pitch Molex MicroFit connector. The pinout is shown below, as viewed from the wire side The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  

![Connector Diagram](..../images/Connector2.png)

