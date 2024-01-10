---
title: Fan / Pump Control
description: Documentation for the Prohelion Electric Vehicle Driver Controls
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: Battery_Management_System/User_Manual/FanPump_Control.html
folder: Battery_Management_System/User_Manual
order: 17
---

# Fan / Pump Control

The BMU provides two 12V switched outputs to drive pack fans and pumps.  These are provided on a standard 3-pin KK connector as used in PCs and other IT equipment.  Both outputs are switched together, ie both on or both off. 

The 12V to power these outputs is sourced from the contactor supply input connection. Refer to the datasheet for current and voltage ratings for these outputs. 

Both connections provide a speed sensor input pin, and this is measured by the BMU and reported as an rpm number for each connection on the CAN bus telemetry.  It assumes a 2 pulse per revolution sensor output, as is commonly used for most PC cooling fans. 

The BMS firmware switches both outputs on when the BMS is in Run mode (once precharge has completed and the system is fully operational). 

## Fan / Pump Connectors

The connector used for the pump/fan outputs is a 3-way 2.54mm pitch Molex KK connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.   

i

The pinout follows the standard used for PC cooling fans and pumps, as found on any computer motherboard or peripheral.  Please note that the wire colours used on fans and pumps varies with each manufacturer. 

