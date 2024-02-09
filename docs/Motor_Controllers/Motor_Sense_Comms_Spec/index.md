---
title: Overview
description: Documentation for the Prohelion Vehicle Communications protocol
order: 0
---

# WaveSculptor200 Motor Drive Motor Sense Comms Spec

This document describes the specification for serial comms between a motor position / temperature sense adapter board and a WaveSculptor motor controller.  The two communicate via a unidirectional, isolated, differential serial channel.

## Timing

The serial link runs using asynchronous UART comms at 470.6 kbits/sec, 1 start bit, 8 bits data, 1 stop bit, no parity.  Complete packets are sent at a rate that will keep the serial channel full.  

There should be a break character inserted after each packet, to allow the receiver to resynchronize to the correct start bit if noise corrupts the transmission during a packet.

The WaveSculptor should run a timeout check on incoming comms, and flag a fault if no data is received within a certain time window (MOT error).

## Packet Format


Each packet consists of four bytes.  The 1<sup>st</sup> and 2<sup>nd</sup> indicate the start of packet, and either temperature or device type.  The 3<sup>rd</sup> and 4<sup>th</sup> bytes indicate position or velocity data, with the type determined by the device type designation.

Data should be left-justified, and zero-padded on the right if necessary.

Temperature readings should be sent as unsigned data from the A/D converter, not converted to °C.  Any linearisation, calibration, and scaling shall be performed on the WaveSculptor, using data from the Windows config software.

### First Byte 

| Bits  | Parameter                                                                  |
|-------|----------------------------------------------------------------------------|
| `7`   | 1 = Start of four-byte packet                                              |
| `6`   | 0 = Following bits are a device type<br>1 = Following bits are temperature |
| `5-0` | Device type, or Temperature MSB                                            |

### Second Byte

| Bits  | Parameter                                   |
|-------|---------------------------------------------|
| `7`   | 0 = Not start of packet                     |
| `6-0` | Reserved if Device type, or Temperature LSB |

### Third Byte

| Bits  | Parameter               |  
|-------|-------------------------|
| `7`   | 0 = Not start of packet |
| `6-0` | Position/Velocity MSB   |

### Fourth Byte 

| Bits  | Parameter               |    
|-------|-------------------------|
| `7`   | 0 = Not start of packet |
| `6-0` | Position/Velocity MSB   |

## Device Type

The device type is indicated with a 6-bit integer number corresponding to the motor adapter hardware and the specific sensors attached to it.  A motor controller receiving a device type that it does not know about should flag a fault and request a firmware update.

Device types are assigned as follows:

| Code | Timer Inputs          | Motor Sensor                   | Temperature Sensor | Hardware |
|------|-----------------------|--------------------------------|--------------------|----------|
| `0`  | Invalid, flag a fault | -                              | -                  | -        |
| `1`  | 120° Halls            | Not Used                       | NTC thermistor     | TRI74-46 |
| `2`  | Quadrature Encoder    | Not Used                       | NTC thermistor     | TRI74-44 |
| `3`  | Quadrature Encoder    | Resolver, 14 bits              | Pt100              | TRI74-45 |
| `4`  | Quadrature Encoder    | 120° halls, Timken M15, 3 bits | Pt100              | TRI74-50 |
| `5`  | Quadrature Encoder    | Absolute position, 12 bits     | Pt100              | TRI74-52 |
| `6`  | Quadrature Encoder    | Not Used                       | NTC thermistor     | TRI74-46 |
| `7`  | Quadrature Encoder    | Resolver, 14 bits              | NTC thermistor     | TRI74-45 |
| `8`  | Quadrature Encoder    | Not Used                       | Pt100              | TRI74-46 |
