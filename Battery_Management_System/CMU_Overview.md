---
title: CMU and HV
keywords: BMS, 
summary: ""
sidebar: imps_sidebar
permalink: BMS_CMU_HV.html
folder: I.M.P.S.
---

## CMU CAN BUS
The CMUs and BMU communicate via CAN bus at a fixed 125kbit/s rate, running over standard 1.27mm pitch 10-way IDC ribbon cable.  The BMU supplies 12V power to the CMUs along this cable.

As a CAN bus, this cable requires termination of the CAN-H and CAN-L signals together at both ends of the network.  Use the supplied CMU CAN termination boards to do this.

Use a single length of cable to join all CMUs, the BMU, and both termination resistors together.  This can easily be achieved by crimping on a standard 10-way IDC crimp as the cable passes each device. 

Pin 1 on each device is indicated by an arrow and the numeral '1' on the PCB, and/or an arrow moulded in the connector.

Make sure that the ribbon is oriented correctly on all devices:  Pin 1 should join to Pin 1 on every other device, and should also be the polarity indication on the ribbon cable, usually a red stripe.

The CMU CAN bus cable is electrically connected to vehicle ground at the BMU, and therefore must be kept physically separated from any battery or other HV connections to at least the maximum voltage rating of the pack.


## BMS MASTER UNIT
### FORM FACTOR
The BMS Master Unit (BMU) is supplied as a 1.6mm thickness Printed Circuit Board (PCB), conformally coated,  without an enclosure.  It is designed to be installed inside the battery box, in a weather-sealed area, along with the cells themselves.  This means that all connections to the pack remain inside the battery pack enclosure, simplifying fusing and wiring installation requirements. 

The BMU should be mounted to a flat surface, using 7x M3 standoffs, of sufficient length to allow the appropriate clearance distance between the components on the PCB and the mounting surface.  Use of an insulation material layer may allow a lower-profile mounting.  This distance will be determined by the maximum operating voltage of the pack, required isolation voltage rating, and regulatory creepage and clearance distances. 

All connections to the BMU are along one edge, simplifying wire routing inside your battery enclosure.  Wiring should be appropriately strain relieved to withstand the vibration typically found in an automotive environment – do not support the weight of the wiring loom solely from the connectors on the BMU.

### DIMENSIONS
The BMU PCB size and mounting holes are shown below.  Dimensions in mm.

![BMU PCB](/images/IMPS_BMU_PCB.png)

### CONNECTORS OVERVIEW
The following illustration shows the connections on the BMU:

![BMU Connectors](/images/IMPS_BMU_Connectors.png)

Refer to the relevant sections of this document for more details on the pinout and wiring for each connector.

### ISOLATION
The HV Sense connection is isolated from the remainder of the BMU with an isolation barrier rated for 1000V DC.  This allows the HV battery pack to be fully floating from the vehicle chassis, as is required by most EV construction standards (eg NCOP14 in Australia).

The remainder of the BMU operates relative to the GND supplied along the vehicle CAN bus connection, and this must be tied to the vehicle chassis at some point in the system.

### INDICATORS
The output status of the three contactor drives, fan outputs, and CMU CAN bus power are all indicated with green LEDs at the edge of the BMU adjacent to the relevant connector.  

Other indications and faults can be observed using the Windows PC software via the CAN-Ethernet bridge, or by any other device on the CAN bus that is programmed to receive status messages from the BMS.

## HV SENSE
The HV Sense connector allows the BMU to measure the total pack voltage (pack side of the contactors), total DC bus voltage (vehicle side of the contactors), and total pack current flow.  This information is used to control precharge and pack safety, and to calculate pack Ah usage and SOC.

The HV Sense connector and associated electronics are isolated from the remainder of the BMU.  Take care when routing wiring around this connector to maintain good isolation between it and the rest of the vehicle system.

Wire the Vehicle HV+ and Battery HV+ sense wires to their respective sides of Contactor 2 in the positive rail.  Wire the Battery HV– and Shunt sense wires to their respective sides of the current shunt in the negative rail.  Refer to the BMS wiring diagram in the Appendix for more details. 

Please note that this sense wiring must be rated for the full pack voltage, although it is low current so a small gauge wire can be used.  Check the relevant wiring standards regarding wire rating and colours, for example NCOP14 (in Australia) specifies Orange wire for all battery pack and other HV system wiring.

The Battery HV– and Shunt sense wires should be twisted together to minimise noise pickup between the BMU and the shunt.  It is suggested to have these wires no longer than 300-400mm.

## HV SENSE CONNECTOR
The connector used for the HV Sense is a 10-way 4.2mm pitch Molex MiniFit Jr connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  The colours shown match those recommended in most EV wiring standards for HV DC wiring.

![HV Sense Connector](/images/IMPS_HV_Sense_Connector.gif)

The sense points are as follows:
*         Vehicle HV+ Sense               Vehicle side of Contactor 2

*         Battery HV+ Sense               Battery side of Contactor 2

*         Battery HV– Sense               Battery side of 25mV Shunt

*         Shunt A Vehicle side of 25mV Shunt

*         Shunt B  Battery side of 25mV Shunt

## HV SENSE FUSING
All HV Sense connections should be fused with an appropriately rated fuse for the type of wire used for the sense connection.  This fuse should be low current (since the sense wiring uses small wires) and rated for the full DC pack voltage.

The fuse should be located towards the supply end of the sense wiring.

## PACK CURRENT SENSE
The BMU provides a mechanism for measuring pack current using a resistive shunt.  This is preferred over hall-effect based sensors as it provides much lower drift, allowing more accurate State of Charge (SOC) integration calculation. 

The shunt must be located in the Battery HV– connection of the pack, as shown in the BMS wiring diagram in the Appendix. 

### SHUNT SELECTION
The BMU Shunt Sense input has a full-scale range of ±25mV, relative to the Battery HV– Sense input.  This allows the use of a standard 50mV shunt running at half its rated current to minimise heat buildup and thermal drift effects, since it will be installed inside the battery pack. 

Choose a full-scale range slightly over the expected maximum battery current. As an example, a Tritium WaveSculptor200 motor controller driving an induction motor may have an expected maximum power consumption of 90kW.  At a 400V battery voltage, this is 225A.  Choose a full scale of 250A to allow some headroom on the measurement.  Since we wish to use a standard 50mV shunt at half rating, you would therefore select a 500A/50mV shunt. The value of the shunt can be set in the user-interface software.

### STATE OF CHARGE REPORTING
The BMU takes readings of the shunt current using a high-accuracy front-end circuit and 24-bit A/D converter.  It integrates these readings to accumulate an Ah consumption for the pack. 

The Ah accumulation is used in conjunction with the user-settable pack capacity value to calculate a SOC in percent.  Both Ah and percent are reported on the CAN bus.

The SOC reading is reset to 'full' when the first bypass shunt has activated during a charge cycle.  At this point the “Balance SOC” telemetry value begins incrementing, halting when all bypass shunts are active.  This “Balance SOC” telemetry value therefore shows the amount of imbalance between cells that has been corrected during the current charging session.

### OVERCURRENT SHUTDOWN
The BMU has the capability to shut down the pack by opening the contactors if the pack current exceeds a fixed threshold.  This function is not currently implemented in the default firmware, but will be added at a later date.


