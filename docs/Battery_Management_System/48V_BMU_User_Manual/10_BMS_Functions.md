---
title: BMS Functions
description: Documentation for the Prohelion 48V BMU
---

# BMS Functions

The Prohelion 48V BMS provides several high-level functions, in order of priority:

- __Monitor:__ all voltages, temperatures and currents and act on the information to protect the battery pack against being operated outside acceptable safety limits.  
- __Control:__ the load output using the pre-charge, enable-charge, and enable-discharge control circuitry.
- __Manage:__ the cells to keep them at equal State of Charge (SoC)
- __Report:__ telemetry to other systems to allow seamless integration with external load control and monitoring solutions.
- __Display:__ the status and State of Charge and information via the LEDs on the front-panel PCB.

The BMS performs these functions by measuring the following parameters:

- 22 individual cell voltages 
- 8 individual cell temperatures 
- Total battery voltage 
- Total load voltage 
- Total load current

To achieve management over the cells and pack, it controls:

- Precharge MOSFETs with external pre-charge resistor.
- Charge enable MOSFETs.
- Discharge enable MOSFETs.
- Individual cell bypass (shunt) balance resistors.

## Electrical Specifications

| Specification                            | Value                |
|------------------------------------------|----------------------|
| `Max. Voltage`                           | 60V                  |
| `Nominal Power`                          | 5kW                  |
| `Max. Continuous Discharge Current`      | 100A                 |
| `Max. Continuous Charge Current`         | 100A                 |
| `Number of Cells Monitored`              | 22 Cells             |
| `Max. Power Consumption`                 | 30mA                 |
| `CAN Communication`                      | Yes                  |
| `Supported Chemistries`                  | LiFePO4, Li-ion, LTO |
| `Dimensions`                             | 115x215mm            |
| `Weight`                                 | 200g                 |
| `Opperating Temperature Range`           | -20°C to +80°C       |
| `Maximum Balance Current`                | 666mA                |
| `Cell Voltage Sense Accuracy`            | 0.6mV                |
| `Number of External Temperature Sensors` | 8                    |
| `Fused Cell Sense`                       | Yes                  |
| `Reverse Polarity Protection`            | Yes                  |
| `Part Number`                            | PHLN-3000-0175       |