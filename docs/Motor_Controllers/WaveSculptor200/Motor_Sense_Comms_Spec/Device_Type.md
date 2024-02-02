---
title: Device Type
description: Documentation for the Prohelion Vehicle Communications protocol
order: 3
---

# Device Type 

The device type is indicated with a 6-bit integer number corresponding to the motor adapter hardware and the specific sensors attached to it.  A motor controller receiving a device type that it does not know about should flag a fault and request a firmware update.

Device types are assigned as follows:

| Code | Timer Inputs | Motor Sensor | Temperature Sensor | Hardware |
|---------------------------------------------------------------------|
| 0 | Invalid, flag a fault | - | - | - |
| 1 | 120° Halls | Not Used | NTC thermistor | TRI74-46 |
| 2 | Quadrature Encoder | Not Used | NTC thermistor | TRI74-44 |
| 3 | Quadrature Encoder | Resolver, 14 bits | Pt100 | TRI74-45 |
| 4 | Quadrature Encoder | 120° halls, Timken M15, 3 bits | Pt100 | TRI74-50 |
| 5 | Quadrature Encoder | Absolute position, 12 bits | Pt100 | TRI74-52 |
| 6 | Quadrature Encoder | Not Used | NTC thermistor | TRI74-46 |
| 7 | Quadrature Encoder | Resolver, 14 bits | NTC thermistor | TRI74-45 |
| 8 | Quadrature Encoder | Not Used | Pt100 | TRI74-46 |
