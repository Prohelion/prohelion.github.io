---
title: CANBus Connector
description: Documentation for the Prohelion Electric Vehicle Driver Controls
---

# CMU CANBus Connector

<figure markdown>
![Prohelion CMU Connectors](../../images/CMU_Connectors_Overview.png)
<figcaption>Prohelion CMU Connectors</figcaption>
</figure>


The CMUs and BMU communicate via CAN bus at a fixed 125kbit/s rate, running over standard 1.27mm pitch 10-way IDC ribbon cable.  The BMU supplies 12V power to the CMUs along this cable. 

As a CAN bus, this cable requires termination of the CAN-H and CAN-L signals together at both ends of the network.  Use the supplied CMU CAN termination boards to do this. 

Use a single length of cable to join all CMUs, the BMU, and both termination resistors together.  This can easily be achieved by crimping on a standard 10-way IDC crimp as the cable passes each device.   

Pin 1 on each device is indicated by an arrow and the numeral '1' on the PCB, and/or an arrow moulded in the connector. 

Make sure that the ribbon is oriented correctly on all devices:  Pin 1 should join to Pin 1 on every other device, and should also be the polarity indication on the ribbon cable, usually a red stripe. 

!!! info 
    The CMU CAN bus cable is electrically connected to vehicle ground at the BMU, and therefore must be kept physically separated from any battery or other HV connections to at least the maximum voltage rating of the pack. 