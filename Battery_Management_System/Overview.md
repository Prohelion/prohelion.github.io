---
title: BMS Overview
keywords: BMS, 
summary: ""
sidebar: imps_sidebar
permalink: BMS_Overview.html
folder: I.M.P.S.
---

## INTRODUCTION
This document describes the interface, installation, and usage requirements for the Prohelion Battery Management System (BMS). 

The BMS provides an easy way to monitor and control an Electric Vehicle battery pack, and can work seamlessly with Tritium's WaveSculptor motor controllers.  It is a mature design with five previous product generations of real-world experience with various types of cells, form factors, and vehicles.

The BMS consists of two components: multiple Cell Management Units (CMU), which measure and control the individual cells in the battery pack; and a single BMS Master Unit (BMU) which interfaces between the CMUs and the vehicle, controls precharge and other safety systems, and provides total pack telemetry.

![Battery Management System](/images/IMPS_Battery_Management_System.gif)

## BMS FUNCTION
The function of the BMS is threefold, in order of priority:

*         Monitor cell voltages and temperatures, and act on this information to protect the pack against being operated outside acceptable limits

*         Manage the cells, to keep them at equal state of charge (SOC)

*         Report telemetry to the other systems in the vehicle, to allow a graceful reduction in vehicle performance as the battery approaches its limits The BMS performs these functions by measuring the following parameters:

*         Individual cell voltages

*         Group cell temperatures

*         CMU temperatures

*         Total pack voltage

*         Total DC bus voltage

*         Total pack current

*         Isolation from chassis

*         12V supply voltages and currents

*         Contactor status

*         Fan / Pump speeds


To achieve management over the cells and pack, it controls:

*         Individual cell bypass (shunt) balance resistors

*         Pack contactors, including precharging HV loads

*         Battery pack fan / pump

*         Battery charger charging current setpoint

Individual cell voltages are the most critical measurement taken by the system, and in the Prohelion BMS are measured using two separate, redundant circuits, each with it's own analog circuitry, A/D converter, and reference. 

All measurements are cross-checked, and any fault in the system can be identified and reported.  This system not only gives reliable and accurate cell voltage measurements, it gives trusted measurements. 

The Prohelion BMS reports if any measurements are not trustworthy, and this information can be acted on by a higher-level system in the vehicle, for instance by notifying the driver that the vehicle requires servicing.

## WARNINGS
A properly designed BMS system will protect a battery pack from being operated outside of acceptable limits.  However, a poorly implemented system may not provide the expected protection – the Prohelion BMS must be installed in a professional and competent manner to function as designed.

Attention should also be paid to the larger system that the vehicle is part of, especially the systems associated with charging and the infrastructure to support it.  As well as using the BMS to protect the pack, additional systems should be provided as backup as part of the charging infrastructure, for instance: fitting of smoke detectors; overcurrent and RCD protection in the AC supply; regular physical checks of charge cabling and connections; regular review of telemetry data for abnormal readings. 

This list is not exhaustive, and it is the responsibility of the system designer / installer to conduct their own failure mode analysis and determine what is required.

{% include warning.html content="Working around batteries is **DANGEROUS**.
Not only are lethal high voltages present, but individual cells can also put out thousands of amps when shorted, for example with a stray wire or dropped tool, throwing out arcs and molten metal.
Check the legal requirements in your jurisdiction for using licensed technicians for this type of work. 
Wear eye protection.  Use insulated tools.  Take extreme caution.
 **Go slow. Think through every step before doing it.**" %}

## TERMINOLOGY
Cell: A single physical unit, or permanently connected parallel group of units.  A parallel group functions electrically as a larger capacity single unit.

     Battery:                      A series-connected group of cells

## CELL MANAGEMENT UNIT
### FORM FACTOR
The Cell Management Unit (CMU) is supplied as a 1.6mm thickness Printed Circuit Board (PCB), conformally coated,  without an enclosure.  It is designed to be installed inside the battery box, in a weather-sealed area, along with the cells themselves.  This means that all connections to the cells remain inside the battery pack enclosure, simplifying fusing and wiring installation requirements. 

### INSTALLATION
The CMU should be mounted to a flat surface, using at least four M3 fasteners, with the supplied piece of insulation material between the CMU and the surface. The CMU will operate at a much lower temperature when balancing if the mounting surface is a thermally conductive material such as aluminium or steel, and it is strongly recommended to install the CMUs on a surface such as this. CMUs should not be stacked together, as they will overheat.

For a professional installation, press-fit M3 studs (eg PEM FHS-M3-10) can be installed in the wall of the box prior to fitting the CMUs.  The insulating sheet and CMU are then installed over the studs, and retained in place with Nyloc nuts.

Wiring should be appropriately strain relieved to withstand the vibration typically found in an automotive environment – do not support the weight of the wiring loom solely from the connectors on the CMU.

### DIMENSIONS

![BMU Connectors](/images/IMPS_BMU_Connectors.png)

### CONNECTORS OVERVIEW
The following illustration shows the connections and indicators on the CMU:

![BMU Dimensions](/images/IMPS_BMU_Dimensions.png)

### ISOLATION
The CMU is isolated from the CMU CAN bus, and therefore from the vehicle chassis and other CMUs, with an isolation barrier rated for 1000V DC.  This allows the HV battery pack to be fully floating from the vehicle chassis, as is required by most EV construction standards (eg NCOP14 in Australia).

This isolation barrier rating is only valid if the correct insulation material is installed between the CMU and the surface it is mounted on.

As the CMU CAN bus operates relative to the vehicle chassis, the CMU CAN ribbon cable should be kept isolated from the cells and cell sense wiring with a rating of at least the full voltage of the battery pack.

### VOLTAGE RATING
The CMU voltage sense inputs are rated for a maximum of 5V per cell.  Therefore, there must not be any breaks in the main battery string (from contactors, fuses, or service links) among the set of up to eight cells that are measured by a CMU, as a high voltage may be seen across this break when it is open, and destroy the CMU.  Any breaks must be located between CMUs.

### INDICATORS
The green LED on the CMU flashes to indicate that the CMU has power (via the CMU CAN bus) and the microcontroller is operating.

The red LED illuminates when any of the eight cells are balancing.  This LED illuminating is not a fault condition.

### CELL VOLTAGE & TEMPERATURE SENSE CONNECTOR
The connector used for the Cell Voltage Sense is a 12-way single-row 3mm pitch Molex MicroFit connector.  The pinout is shown below, as viewed from the wire side – as you would look at it while inserting crimps.  The colours shown match those used in the recommended cable.

![Cell Voltage](/images/IMPS_CELL_VOLTAGE.gif)

### Temperature Sensor
The recommended cell temperature sensor to use is a Murata 10k NTC bead type thermistor (NXFT15XH103FA2B100) with 100mm leads. The thermistor should be attached to a part of the cell that is a good representation of the internal temperature, such as a cell terminal (Care MUST be taken that the sensor is appropriately insulated from the terminal).


