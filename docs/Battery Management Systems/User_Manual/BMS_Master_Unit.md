---
title: BMS Master Unit
description: Documentation for the Prohelion Electric Vehicle Driver Controls
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: Battery_Management_System/User_Manual/BMS_Master_Unit.html
folder: Battery_Management_System/User_Manual
order: 5
---

# BMS Master Unit

## Form Factor

The BMS Master Unit (BMU) is supplied as a 1.6mm thickness Printed Circuit Board (PCB), conformally coated,  without an enclosure.  It is designed to be installed inside the battery box, in a weather-sealed area, along with the cells themselves.  This means that all connections to the pack remain inside the battery pack enclosure, simplifying fusing and wiring installation requirements.   

The BMU should be mounted to a flat surface, using 7x M3 standoffs, of sufficient length to allow the appropriate clearance distance between the components on the PCB and the mounting surface.  Use of an insulation material layer may allow a lower-profile mounting.  This distance will be determined by the maximum operating voltage of the pack, required isolation voltage rating, and regulatory creepage and clearance distances.   

All connections to the BMU are along one edge, simplifying wire routing inside your battery enclosure.  Wiring should be appropriately strain relieved to withstand the vibration typically found in an automotive environment – do not support the weight of the wiring loom solely from the connectors on the BMU. 

## Dimensions

The BMU PCB and mounting holes are shown below. Dimensions in mm.

![BMU PCB mounting holes]({{site.dox.baseurl}}/images/BMS_User_Manual/BMS_MU_dimensions.png)

## Connectors Overview

The Following Illustration shows the connections on the BMU

![BMU Connectors]({{site.dox.baseurl}}/images/BMS_User_Manual/BMS_MU_Connectors_overview.png)

Refer to the relevant sections of this document for more details on the pinout and wiring for each connector 

## Isolation 

The HV Sense connection is isolated from the remainder of the BMU with an isolation barrier rated for 1000V DC.  This allows the HV battery pack to be fully floating from the vehicle chassis, as is required by most EV construction standards (eg NCOP14 in Australia). 

The remainder of the BMU operates relative to the GND supplied along the vehicle CAN bus connection, and this must be tied to the vehicle chassis at some point in the system. 

## Indicators

The output status of the three contactor drives, fan outputs, and CMU CAN bus power are all indicated with green LEDs at the edge of the BMU adjacent to the relevant connector.    

Other indications and faults can be observed using the Windows PC software via the CAN-Ethernet bridge, or by any other device on the CAN bus that is programmed to receive status messages from the BMS. 



