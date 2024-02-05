---
title: Position Sensor
description: Documentation for the Prohelion Vehicle Communications protocol
order: 1
---

# Position Sensor

## Type

The type 2 interface reads three channels of position information from a __quadrature encoder position sensor__ with __differential outputs.__  Each channel is passed through to the differential receiver in the WaveSculptor, terminated with approximately 150 ohms between each + and – pair.

## Power

5V DC is provided to run the encoder.

## Connector

The connector used for the motor sense signals is a 10-way 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  

![Connector Diagram](images/connector1.png)

