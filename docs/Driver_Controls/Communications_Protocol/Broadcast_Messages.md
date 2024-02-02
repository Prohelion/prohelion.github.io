---
title: Broadcast Messages
description: Documentation for the Prohelion Electric Vehicle Driver Controls
order: 2
---

# Broadcast Messages

## Identification

### Identification Information

<strong>ID: Driver Controls Base Address + 00</strong> 

<strong>Interval: 1 Second</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Serial Number| 63..32 | Uint32 | Device serial number, allocated at manufacture. |
| Prohelion ID | 31..0 | char[4] | “TRIb” stored as a string. msg[0] = 'T', msg[1] = 'R'... |

The periodic broadcast of this message cannot be disabled. It is needed to help find the driver controls on the network if the base address is lost or mis-configured by the user.

## Drive Commands

### Motor Drive Command

<strong>ID: Driver Controls Base Address + 01</strong> 

<strong>Interval: 100ms</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Motor Current| 63..32 | %| Desired motor current set point as a percentage of maximum current setting. |
| Motor Velocity | 31..0 | m/s | Desired motor velocity set point in metres/second.|

The WaveSculptor motor controller must receive a Motor Drive Command frame at least once every 250ms.  If this does not occur, the controller will assume that communications have failed and will halt all motor control functions, placing the system into neutral.

### Motor Power Command

<strong>ID: Driver Controls Base Address + 02</strong> 

<strong>Interval: 100ms or as needed</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Bus Current| 63..32 | %| Desired set point of current drawn from the bus by the controller as a percentage of absolute bus current limit. |
| Reserved | 31..0 | - | - |

### Reset Command

<strong>ID: Driver Controls Base Address + 03</strong> 

<strong>Interval: no fixed interval, not used during normal operation</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Units</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| unused| 63..32 | - | - |
| unused| 31..0 | - | - |

Send a command from this address to reset the WaveSculptor.

## Switch Commands

### Switch position / activity

<strong>ID: Driver Controls Base Address + 04</strong> 

<strong>Interval: 100ms</strong> 

| <strong>Variable</strong>    |   <strong>Bits</strong> | <strong>Type</strong> | <strong>Description</strong>  
|----------------------------------------------------|
| Switch Position | 63..32 | Uint32 | Current position of the switch inputs on the driver controls module DB37 connector: |
|||<strong>Bits</strong>|<strong>Parameter</strong>|
||| 31..18<br>17<br>16<br>15<br>14<br>13<br>12<br>11<br>10<br>9<br>8<br>7<br>6<br>5<br>4<br>3<br>2<br>1<br>0| Unused<br>Right Indicator output (90 per minute)<br>Left indicator output (90 per minute)<br>Unused<br>Onboard (internal) debug button<br>Encoder 1 pushbutton<br>Encoder 2 pushbutton<br>Right indicator switch<br>Left indicator switch<br>Hazards switch<br>Horn switch<br>Ignition – Accessory position<br>Ignition – ON (Run) position<br>Direction (0 = Forward, 1 = Reverse)<br>Brake 1 switch<br>Brake 2 switch<br>Lights – Side / Running lights switch<br>Lights – Low Beam switch<br>Lights – High Beam switch |
| Switch Activity | 31..0 | Uint32 | Shows if the switch has changed state since the last time this CAN frame was sent. |
|||| 1 = switch has changed<br>0 = no change<br>Bit positions are identical to the Switch Position bitfield shown above. |
