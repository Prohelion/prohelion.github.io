---
title: Packet Format
description: Documentation for the Prohelion Vehicle Communications protocol
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: WaveSculptor_Motor_Controllers/WaveSculptor200_Motor_Sense_Comms_Spec/Packet_Format.html
folder: WaveSculptor_Motor_Controllers/WaveSculptor200_Motor_Sense_Comms_Spec
order: 2
---

# Packet Format

Each packet consists of four bytes.  The first and 2nd indicate the start of packet, and either temperature or device type.  The 3rd and 4th bytes indicate position or velocity data, with the type determined by the device type designation.

Data should be left-justified, and zero-padded on the right if necessary.

Temperature readings should be sent as unsigned data from the A/D converter, not converted to °C.  Any linearisation, calibration, and scaling shall be performed on the WaveSculptor, using data from the Windows config software.

## First Byte 

| Bits | Parameter     
|----------------------------------------------------|
| 7 | 1 = Start of four-byte packet |
| 6 | 0 = Following bits are a device type|
|| 1 = Following bits are temperature |
| 5-0 | Device type, or Temperature MSB |

## Second Byte

| Bits | Parameter     
|----------------------------------------------------|
| 7 | 0 = Not start of packet |
| 6-0 | Reserved if Device type, or Temperature LSB |

## Third Byte

| Bits | Parameter     
|----------------------------------------------------|
| 7 | 0 = Not start of packet |
| 6-0 | Position/Velocity MSB |

## Fourth Byte 

| Bits | Parameter     
|----------------------------------------------------|
| 7 | 0 = Not start of packet |
| 6-0 | Position/Velocity MSB |