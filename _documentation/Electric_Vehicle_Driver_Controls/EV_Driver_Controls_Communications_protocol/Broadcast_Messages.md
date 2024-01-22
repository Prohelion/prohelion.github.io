---
title: Broadcast Messages
description: Documentation for the Prohelion Electric Vehicle Driver Controls
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: Electric_Vehicle_Driver_Controls/EV_Driver_Controls_Communications_protocol/Broadcast_Messages.html
folder: Electric_Vehicle_Driver_Controls/EV_Driver_Controls_Communications_Protocol
order: 2
---

# Broadcast Messages

## Identification

### Identification Information

<strong>ID: Driver Controls Base Address + 0</strong> 

<strong>Interval: 1 Second</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Serial Number| 63..32 | Uint32 | Device serial number, allocated at manufacture. |
| Prohelion ID | 31..0 | char[4] | “TRIb” stored as a string. msg[0] = 'T', msg[1] = 'R'... |

The periodic broadcast of this message cannot be disabled. It is needed to help find the driver controls on the network if the base address is lost or mis-configured by the user.

## Drive Commands

### Motor Drive Command

<strong>ID: Driver Controls Base Address + 1</strong> 

<strong>Interval: 100ms</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Motor Current| 63..32 | %| Desired motor current set point as a percentage of maximum current setting. |
| Motor Velocity | 31..0 | m/s | Desired motor velocity set point in metres/second.|

The WaveSculptor motor controller must receive a Motor Drive Command frame at least once every 250ms.  If this does not occur, the controller will assume that communications have failed and will halt all motor control functions, placing the system into neutral.

### Motor Power Command

<strong>ID: Driver Controls Base Address + 2</strong> 

<strong>Interval: 100ms or as needed</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Bus Current| 63..32 | %| Desired set point of current drawn from the bus by the controller as a percentage of absolute bus current limit. |
| Reserved | 31..0 | - | - |

### Reset Command

<strong>ID: Driver Controls Base Address + 3</strong> 

<strong>Interval: no fixed interval, not used during normal operation</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| unused| 63..32 | - | - |
| unused| 31..0 | - | - |

Send a command from this address to reset the WaveSculptor.

## Switch Commands

### Switch position / activity

<strong>ID: Driver Controls Base Address + 4</strong> 

<strong>Interval: 100ms</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Type</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Switch Position | 63..32 | Uint32 | Current position of the switch inputs on the driver controls module DB37 connector: |
||<strong>Bits</strong>||<strong>Parameter</strong>|
|| 31..18|| Unused |
|| 17|| Right Indicator output (90 per minute) |
|| 16|| Left indicator output (90 per minute) |
|| 15|| Unused |
|| 14|| Onboard (internal) debug button|
|| 13|| Encoder 1 pushbutton |
|| 12|| Encoder 2 pushbutton |
|| 11|| Right indicator switch |
|| 10|| Left indicator switch |
|| 9|| Hazards switch |
|| 8|| Horn switch |
|| 7|| Ignition – Accessory position |
|| 6|| Ignition – ON (Run) position|
|| 5|| Direction (0 = Forward, 1 = Reverse)|
|| 4|| Brake 1 switch |
|| 3|| Brake 2 switch|
|| 2|| Lights – Side / Running lights switch|
|| 1|| Lights – Low Beam switch |
|| 0|| Lights – High Beam switch |
| Switch Activity | 31..0 | Uint32 | Shows if the switch has changed state since the last time this CAN frame was sent. |
|||| 1 = switch has changed |
|||| 0 = no change |
|||| Bit positions are identical to the Switch Position bitfield shown above. |
