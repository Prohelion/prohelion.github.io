---
title: BMU dashboard
description: "Read the Prohelion BMU dashboard: the summary row, status indicators, BMU state machine flowchart and the Node Telemetry table of CMU cell voltages."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# BMU dashboard

The BMU dashboard shows the data of a Prohelion Battery Management System (BMS), and appears as a tab in the sidebar once a [Prohelion BMU](Prohelion_BMU.md) is added to the [Profile](../../Getting_Started/Profiles.md).

<figure markdown>
![Prohelion BMU dashboard showing the summary row, cell graphs, status indicators and state flowchart](../../images/prohelion_bmu.png)
<figcaption>Prohelion BMU</figcaption>
</figure>

The top section of the dashboard shows data from the BMU, and clicking the **MORE DETAILS** banner expands it to display telemetry from the Cell Management Units (CMUs).
The controls at the top-right include access to the CAN signals and messages from the BMS in the [CAN database (DBC) viewer](../../CAN_Utilities/CAN_Bus_DBC.md).

## BMU data

The top row summarises the battery voltage, the current (negative when flowing into the battery), the state of charge (SOC) as a percentage of the user-set pack capacity (**SOC %**), and the maximum and minimum cell voltage and cell temperature in the pack.
Below the summary are graphs of the cell temperatures and node voltages observed by the CMUs, which show the data in greater resolution when hovered over.

The lower left of the window shows status indicators for battery events.
The indicators depend on the BMS in use and include cell over and under voltage, cell over temperature, untrusted measurements, CMU and vehicle timeouts, and an invalid SOC estimation.

The D1000 Gen2 dashboard instead shows the reasons reported by the BMS, including a separate **PRECHARGE FAIL REASON** group for a failed precharge.
In that group, **HVIL** means the High-Voltage Interlock Loop is measuring a high impedance, which points to a connector failure, and **BJU** means the BJU has not responded to requests for measurements.

The right-hand side shows the progression of the BMU state machine as a flowchart, with the current state in the grey box.
The states depend on the model and firmware, and the dashboard extends the D1000 Gen1 state machine with a Discovery state.
The following table links the reference pages for each model.

| Model | Status flags | State machine | Configuration parameters |
|-------|--------------|---------------|--------------------------|
| D1000 Gen1 | [Transmitted CAN Packets](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/Transmitted_CAN_Packets.md) | [BMS State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Operation/BMS_State_Machine.md) | Not listed separately |
| D1000 Gen2, Firmware V1.2 | [Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) (BMS Info message) | [State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/State_Machine.md) | [Configuration Parameters](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Configuration_Parameters.md) |
| D1000 Gen2, Firmware V1.1 | [Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) (BMS Info message) | [State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/State_Machine.md) | [Configuration Parameters](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/Configuration_Parameters.md) |
| M48 Gen1 | Not listed separately | [Software Specifications](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Software_Specifications.md) | [Software Specifications](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Software_Specifications.md) |

## Node telemetry {#cmu-or-node-data}

The **Node Telemetry** table displays the currently connected CMUs and the voltage of each cell they monitor.
The columns depend on the BMS model.
For a D1000 Gen1 they are the CMU serial number (**Node Number**), the CMU board and external cell temperatures (**PCB C** and **Cell C**) and the voltage of each cell in millivolts (**Cell 1 - 8 mV**).
A negative voltage is a trust error, where the two redundant measurement channels disagree, and `-32768` indicates a cell position that the BMU has not configured as present, as described in [Transmitted CAN Packets](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/Transmitted_CAN_Packets.md).

<figure markdown>
![Node Telemetry table listing each CMU and the voltage of each cell it monitors](../../images/node_data.png)
<figcaption>Prohelion CMU</figcaption>
</figure>

The colour of each voltage reading highlights additional information: a blue background indicates a cell that is balancing, green and orange mark the highest and lowest voltage cells, yellow indicates a trust error, and a pale-yellow background with no text indicates a cell that is not present.

To change the BMU configuration or flash its firmware, refer to [Update BMU configuration and firmware](Update_BMU_Configuration_and_Firmware.md).
