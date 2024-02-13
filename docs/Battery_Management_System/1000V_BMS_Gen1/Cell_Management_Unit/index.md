---
title: Cell Management Unit
description: Documentation for the Prohelion Electric Vehicle Driver Controls
---

# Cell Management Unit 

The Cell Management Unit connects to the battery cells and reads voltage and temperature information, which it relays via CAN Bus back to the Battery Management Unit.

<figure markdown>
![Battery Management System](../images/Introduction_2.png)
<figcaption>Prohelion Cell Management Unit</figcaption>
</figure>

## Form Factor 

The Cell Management Unit (CMU) is supplied as a 1.6mm thickness Printed Circuit Board (PCB), conformally coated, without an enclosure.  It is designed to be installed inside the battery box, in a weather-sealed area, along with the cells themselves.  This means that all connections to the cells remain inside the battery pack enclosure, simplifying fusing and wiring installation requirements.   

## Installation

The CMU should be mounted to a flat surface, using at least four M3 fasteners, with the supplied piece of insulation material between the CMU and the surface.  The CMU will operate at a much lower temperature when balancing if the mounting surface is a thermally conductive material such as aluminium or steel, and it is strongly recommended to install the CMUs on a surface such as this.  CMUs should not be stacked together, as they will overheat. 

For a professional installation, press-fit M3 studs (eg PEM FHS-M3-10) can be installed in the wall of the box prior to fitting the CMUs.  The insulating sheet and CMU are then installed over the studs, and retained in place with Nyloc nuts. 

Wiring should be appropriately strain relieved to withstand the vibration typically found in an automotive environment – do not support the weight of the wiring loom solely from the connectors on the CMU. 

## Dimensions

<figure markdown>
![Prohelion CMU Dimensions](../images/CMU_Dimensions.png)
<figcaption>Prohelion CMU Dimensions</figcaption>
</figure>

The following illustration shows the connections and indicators on the CMU:

<figure markdown>
![Prohelion CMU Connectors](../images/CMU_Connectors_Overview.png)
<figcaption>Prohelion CMU Connectors</figcaption>
</figure>

## Isolation

The CMU is isolated from the CMU CAN bus, and therefore from the vehicle chassis and other CMUs, with an isolation barrier rated for 1000V DC.  This allows the HV battery pack to be fully floating from the vehicle chassis, as is required by most EV construction standards (eg NCOP14 in Australia).

This isolation barrier rating is only valid if the correct insulation material is installed between the CMU and the surface it is mounted on. 

As the CMU CAN bus operates relative to the vehicle chassis, the CMU CAN ribbon cable should be kept isolated from the cells and cell sense wiring with a rating of at least the full voltage of the battery pack. 

## Voltage Rating

The CMU voltage sense inputs are rated for a maximum of 5V per cell.  Therefore, there must not be any breaks in the main battery string (from contactors, fuses, or service links) among the set of up to eight cells that are measured by a CMU, as a high voltage may be seen across this break when it is open, and destroy the CMU.  Any breaks must be located between CMUs. 

## Indicators

The green LED on the CMU flashes to indicate that the CMU has power (via the CMU CAN bus) and the microcontroller is operating. 

The red LED illuminates when any of the eight cells are balancing.  This LED illuminating is not a fault condition. 

## CMU CAN Bus

The CMUs and BMU communicate via CAN bus at a fixed 125kbit/s rate, running over standard 1.27mm pitch 10-way IDC ribbon cable.  The BMU supplies 12V power to the CMUs along this cable. 

As a CAN bus, this cable requires termination of the CAN-H and CAN-L signals together at both ends of the network.  Use the supplied CMU CAN termination boards to do this. 

Use a single length of cable to join all CMUs, the BMU, and both termination resistors together.  This can easily be achieved by crimping on a standard 10-way IDC crimp as the cable passes each device.   

Pin 1 on each device is indicated by an arrow and the numeral '1' on the PCB, and/or an arrow moulded in the connector. 

Make sure that the ribbon is oriented correctly on all devices:  Pin 1 should join to Pin 1 on every other device, and should also be the polarity indication on the ribbon cable, usually a red stripe. 

!!! info 
    The CMU CAN bus cable is electrically connected to vehicle ground at the BMU, and therefore must be kept physically separated from any battery or other HV connections to at least the maximum voltage rating of the pack. 