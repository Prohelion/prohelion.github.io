---
title: Overview

---

# 1000V - Battery Management System (BMS) - Gen 1

This document describes the interface, installation, and usage requirements for the Prohelion Battery Management System (BMS).   

The BMS provides an easy way to monitor and control an Electric Vehicle battery pack, and can work seamlessly with Prohelion's WaveSculptor motor controllers.  It is a mature design with five previous product generations of real-world experience with various types of cells, form factors, and vehicles. 

<figure markdown>
![Prohelion Battery Management Unit](images/Introduction_1.png)
<figcaption>Prohelion Battery Management Unit</figcaption>
</figure>

The BMS consists of two components: multiple [Cell Management Units](Cell_Management_Unit/index.md) (CMU), which measure and control the individual cells in the battery pack; and a single [Battery Management Unit](Battery_Management_Unit/index.md) (BMU) which interfaces between the CMUs and the vehicle, controls precharge and other safety systems, and provides total pack telemetry.

<figure markdown>
![Prohelion Cell Management Unit](images/Introduction_2.png)
<figcaption>Prohelion Cell Management Unit</figcaption>
</figure>

## Battery Management System (BMS) Functions

The function of the BMS is threefold, in order of priority: 

-   Monitor cell voltages and temperatures, and act on this information to protect the pack against being operated outside acceptable limits 
-   Manage the cells, to keep them at equal [State Of Charge](Reporting/85_State_Of_Charge_Reporting.md)
-   Report telemetry to the other systems in the vehicle, to allow a graceful reduction in vehicle performance as the battery approaches its limits 

The BMS performs these functions by measuring the following parameters: 

-   Individual cell voltages 
-   Group cell temperatures 
-   CMU temperatures 
-   Total pack voltage 
-   Total DC bus voltage 
-   Total pack current 
-   12V supply voltages and currents 
-   Contactor status 
-   Fan / Pump speeds 

To achieve management over the cells and pack, it controls: 

-   Individual cell bypass (shunt) balance resistors 
-   Pack contactors, including precharging HV loads 
-   Battery pack fan / pump 
-   Battery charger charging current setpoint 

Individual cell voltages are the most critical measurement taken by the system, and in the Prohelion BMS are measured using two separate, redundant circuits, each with it's own analog circuitry, A/D converter, and reference.   

All measurements are cross-checked, and any fault in the system can be identified and reported.  This system not only gives reliable and accurate cell voltage measurements, it gives trusted measurements.   

The Prohelion BMS reports if any measurements are not trustworthy, and this information can be acted on by a higher-level system in the vehicle, for instance by notifying the driver that the vehicle requires servicing. 

## Terminology

__Cell:__ A single physical unit, or permanently connected parallel group of units.  A parallel group functions electrically as a larger capacity single unit

__Battery:__ A series-connected group of cells 

## Acronyms and Abbreviations

| Acronym   | Abbreviation                  |
|-----------|-------------------------------|
| `A`       | Ampere                        |
| `Ah`      | Ampere Hour                   |
| `BMS`     | Battery Management System     |
| `CAN-Bus` | Controller Area Network - Bus |
| `DC`      | Direct Current                |
| `ESS`     | Energy Storage System         |
| `HV`      | High Voltage                  |
| `LV`      | Low Voltage                   |
| `SoC`     | State of Charge               |
| `V`       | Voltage                       |     