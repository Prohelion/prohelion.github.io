---
title: BMS Function
description: Documentation for the Prohelion Electric Vehicle Driver Controls
order: 1
---

# BMS Function
The function of the BMS is threefold, in order of priority: 
*   Monitor cell voltages and temperatures, and act on this information to protect the pack against being operated outside acceptable limits 
*   Manage the cells, to keep them at equal [State Of Charge](160_State_Of_Charge_Reporting.md)
*   Report telemetry to the other systems in the vehicle, to allow a graceful reduction in vehicle performance as the battery approaches its limits 

The BMS performs these functions by measuring the following parameters: 
*   Individual cell voltages 
*   Group cell temperatures 
*   CMU temperatures 
*   Total pack voltage 
*   Total DC bus voltage 
*   Total pack current 
*   12V supply voltages and currents 
*   Contactor status 
*   Fan / Pump speeds 

To achieve management over the cells and pack, it controls: 
*   Individual cell bypass (shunt) balance resistors 
*   Pack contactors, including precharging HV loads 
*   Battery pack fan / pump 
*   Battery charger charging current setpoint 

Individual cell voltages are the most critical measurement taken by the system, and in the Prohelion BMS are measured using two separate, redundant circuits, each with it's own analog circuitry, A/D converter, and reference.   

All measurements are cross-checked, and any fault in the system can be identified and reported.  This system not only gives reliable and accurate cell voltage measurements, it gives trusted measurements.   

The Prohelion BMS reports if any measurements are not trustworthy, and this information can be acted on by a higher-level system in the vehicle, for instance by notifying the driver that the vehicle requires servicing. 