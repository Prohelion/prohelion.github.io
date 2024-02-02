---
title: Cell Management Unit
description: Documentation for the Prohelion Electric Vehicle Driver Controls
tags: [Prohelion, Profinity, CAN Bus Tools, Driver Controls]
keywords: Prohelion, Profinity, CAN Bus Tools, Driver Controls
permalink: Battery_Management_System/User_Manual/Cell_Management_Unit.html
folder: Battery_Management_System/User_Manual
order: 3
---

# Cell Management Unit 

## Form Factor 

The Cell Management Unit (CMU) is supplied as a 1.6mm thickness Printed Circuit Board (PCB), conformally coated, without an enclosure.  It is designed to be installed inside the battery box, in a weather-sealed area, along with the cells themselves.  This means that all connections to the cells remain inside the battery pack enclosure, simplifying fusing and wiring installation requirements.   

## Installation

The CMU should be mounted to a flat surface, using at least four M3 fasteners, with the supplied piece of insulation material between the CMU and the surface.  The CMU will operate at a much lower temperature when balancing if the mounting surface is a thermally conductive material such as aluminium or steel, and it is strongly recommended to install the CMUs on a surface such as this.  CMUs should not be stacked together, as they will overheat. 

For a professional installation, press-fit M3 studs (eg PEM FHS-M3-10) can be installed in the wall of the box prior to fitting the CMUs.  The insulating sheet and CMU are then installed over the studs, and retained in place with Nyloc nuts. 

Wiring should be appropriately strain relieved to withstand the vibration typically found in an automotive environment – do not support the weight of the wiring loom solely from the connectors on the CMU. 

## Dimensions

![CMU Dimensions]({{site.dox.baseurl}}/images/BMS_User_Manual/CMU_Dimensions.png)

The following illustration shows the connections and indicators on the CMU:

![CMU Connectors Overview]({{site.dox.baseurl}}/images/BMS_User_Manual/CMU_Connectors_Overview.png)

## Isolation

The CMU is isolated from the CMU CAN bus, and therefore from the vehicle chassis and other CMUs, with an isolation barrier rated for 1000V DC.  This allows the HV battery pack to be fully floating from the vehicle chassis, as is required by most EV construction standards (eg NCOP14 in Australia). 

This isolation barrier rating is only valid if the correct insulation material is installed between the CMU and the surface it is mounted on. 

As the CMU CAN bus operates relative to the vehicle chassis, the CMU CAN ribbon cable should be kept isolated from the cells and cell sense wiring with a rating of at least the full voltage of the battery pack. 

## Voltage Rating

The CMU voltage sense inputs are rated for a maximum of 5V per cell.  Therefore, there must not be any breaks in the main battery string (from contactors, fuses, or service links) among the set of up to eight cells that are measured by a CMU, as a high voltage may be seen across this break when it is open, and destroy the CMU.  Any breaks must be located between CMUs. 

## Indicators

The green LED on the CMU flashes to indicate that the CMU has power (via the CMU CAN bus) and the microcontroller is operating. 

The red LED illuminates when any of the eight cells are balancing.  This LED illuminating is not a fault condition. 

## Cell Voltage & Temperature Sense Connector 

The connector used for the Cell Voltage Sense is a 12-way single-row 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  The colours shown match those used in the recommended cable. 

![cell voltage sense]({{site.dox.baseurl}}/images/BMS_User_Manual/Cell_voltage&temp.png)

Please refer to the associated [Assembly Procedure document]()? TRI67.006 for detailed procedures on making the cell sense wiring harness. 

### Temperature Sensor:

The recommended cell temperature sensor to use is a Murata 10k NTC bead type thermistor (NXFT15XH103FA2B100) with 100mm leads. The thermistor should be attached to a part of the cell that is a good representation of the internal temperature, such as a cell terminal (Care MUST be taken that the sensor is appropriately insulated from the terminal). 

