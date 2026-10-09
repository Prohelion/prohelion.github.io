---
title: Prohelion Battery Management Systems
description: "Monitor and manage Prohelion battery management systems including BMU and CMU data, configuration, and firmware."
---

# Prohelion Battery Management Systems

Profinity monitors and manages every Prohelion Battery Management System (BMS) through the BMU dashboard, which appears as a tab in the sidebar once a Battery Management Unit (BMU) is added to the [Profile](../../Getting_Started/Profiles.md). The model and generation selected when the BMS is added must match the hardware.

| Model | Description | Default Base Address |
|-------|-------------|----------------------|
| [D1000 Gen1](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/index.md) | A 1000 V BMS with a BMU and Cell Management Units (CMUs) on a dedicated CMU CAN bus. | `0x600` |
| [D1000 Gen2](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/index.md) | A 1000 V BMS with a BMU, a Battery Junction Unit (BJU) and CMUs, available with Firmware V1.1 or V1.2. | `0x600` |
| [M48 Gen1](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/index.md) | A 48 V BMS. | `0x600` |
| M48 Gen2 | The 48 V Generation 2 BMS. | `0x600` |
| C48 Gen2 | The 48 V 100 A 16S BMS. | `0x600` |
| C20 Gen1 | The 20 V Generation 1 BMS. | `0x100` |

The settings, BMU data, firmware configuration and firmware flashing described on this page apply to every model in the table, except where a section names a specific model.

!!! info "CMUs and Nodes Are Managed by the BMU"
    The BMU organises its CMUs (also referred to as Nodes) in every model, so only the BMU is added to the Profile, and doing so provides control of and data from the entire BMS. Larger and split packs, such as those used in racing, can have two or more BMUs, in which case one BMU is added for each unit with a different base CAN address. The hardware is described in the [Prohelion BMS documentation](../../../../Battery_Management_Systems/index.md).

## BMU Management

When a Prohelion BMU is added to the Profile, Profinity prompts for the following information about the device. The **Change Settings** button at the top-right of the BMU dashboard changes these details later.

| Parameter            | Description                                                                                         | Default |
|----------------------|-----------------------------------------------------------------------------------------------------|---------|
| `Name`               | The name of the component. Must be unique.                                                          | The model name |
| `Control Pack`       | Enables software control of the BMS from Profinity (engagement and disengagement of the pack), for the BMS units that support it. A D1000 Gen2 charges through the Profinity **Charge** screen once **Control Pack** is on. | Off |
| `Milliseconds Valid` | The timeout of the device, from 0 to 60000. If no traffic is received from the device within this time, Profinity treats the connection as lost. | 5000 |
| `Base Address`       | The CAN address of the BMU, as described in the protocol documentation of each model. | `0x600`, or `0x100` for the C20 Gen1 |
| `Firmware Configuration Key` | The D1000 Gen2, M48 Gen2 and C48 Gen2 only. Unlocks the administration-only firmware parameters for the current sign-in session (see [Unlock Administration Firmware Parameters](#unlock-administration-firmware-parameters)). | No active session |

The CAN address of each model is described in the [D1000 Gen1 Communications Protocol](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/index.md), the [D1000 Gen2 Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) and the [M48 Gen1 CAN Communication](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/CAN_Communication.md) pages.

<figure markdown>
![Prohelion BMU dashboard showing the summary row, cell graphs, status indicators and state flowchart](../../images/prohelion_bmu.png)
<figcaption>Prohelion BMU</figcaption>
</figure>

The top section of the dashboard shows data from the BMU, and clicking the **MORE DETAILS** banner expands it to display telemetry from the CMUs. The controls at the top-right include access to the CAN signals and messages from the BMS in the [CAN database (DBC) viewer](../../CAN_Utilities/CAN_Bus_DBC.md).

### BMU Data

The top row summarises the battery voltage, the current (negative when flowing into the battery), the state of charge (SOC) as a percentage of the user-set pack capacity (**SOC %**), and the maximum and minimum cell voltage and cell temperature in the pack. Below the summary are graphs of the cell temperatures and node voltages observed by the CMUs, which show the data in greater resolution when hovered over.

The lower left of the window shows status indicators for battery events. The indicators depend on the BMS in use and include cell over and under voltage, cell over temperature, untrusted measurements, CMU and vehicle timeouts and an invalid SOC estimation.

The D1000 Gen2 dashboard instead shows the reasons reported by the BMS, including a separate **PRECHARGE FAIL REASON** group for a failed precharge. In that group, **HVIL** means the High-Voltage Interlock Loop is measuring a high impedance, which points to a connector failure, and **BJU** means the BJU has not responded to requests for measurements.

The right-hand side shows the progression of the BMU state machine as a flowchart, with the current state in the grey box. The states depend on the model and firmware, and the dashboard extends the D1000 Gen1 state machine with a Discovery state. The reference pages for each model are listed below.

| Model | Status flags | State machine | Configuration parameters |
|-------|--------------|---------------|--------------------------|
| D1000 Gen1 | [Transmitted CAN Packets](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/Transmitted_CAN_Packets.md) | [BMS State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Operation/BMS_State_Machine.md) | Not listed separately |
| D1000 Gen2, Firmware V1.2 | [Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) (BMS Info message) | [State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/State_Machine.md) | [Configuration Parameters](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Configuration_Parameters.md) |
| D1000 Gen2, Firmware V1.1 | [Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) (BMS Info message) | [State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/State_Machine.md) | [Configuration Parameters](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/Configuration_Parameters.md) |
| M48 Gen1 | Not listed separately | [Software Specifications](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Software_Specifications.md) | [Software Specifications](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Software_Specifications.md) |

### CMU or Node Data

The **Node Telemetry** table displays the currently connected CMUs and the voltage of each cell they monitor. The columns depend on the BMS model. For a D1000 Gen1 they are the CMU serial number (**Node Number**), the CMU board and external cell temperatures (**PCB C** and **Cell C**) and the voltage of each cell in millivolts (**Cell 1 - 8 mV**). A negative voltage is a trust error, where the two redundant measurement channels disagree, and `-32768` indicates a cell position that the BMU has not configured as present, as described in [Transmitted CAN Packets](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/Transmitted_CAN_Packets.md).

<figure markdown>
![Prohelion CMU](../../images/node_data.png)
<figcaption>Prohelion CMU</figcaption>
</figure>

The colour of each voltage reading highlights additional information: a blue background indicates a cell that is balancing, green and orange mark the highest and lowest voltage cells, yellow indicates a trust error, and a pale-yellow background with no text indicates a cell that is not present.

## Updating the BMU Configuration

!!! danger "Wrong Firmware Settings Can Damage the Pack"
    Settings that do not match the pack can allow unsafe voltages or currents. Change a value only when the configuration parameters page for the firmware describes its purpose.

To update the configuration, open **Change Settings** at the top-right of the BMU dashboard and select the **Firmware Settings** tab. The tab appears only when Profinity can reach the BMU on the CAN network, and the settings are saved to the device as they are changed. Each D1000 Gen2 parameter has a User or Admin permission level, listed in the Configuration Parameters pages in the table above, and the M48 Gen1 parameters are in its Software Specifications page.

The **Firmware Settings** and **Firmware Utilities** tabs appear only when Profinity can see the BMU and the BMU is in a state that accepts firmware changes. If the tabs are missing, check that the CAN adapter status is green, the `Base Address` matches the BMU and the BMU is powered.

<figure markdown>
![Update BMU Firmware Config](../../images/update_bmu_firmware_config.png)
<figcaption>Updating the BMU Firmware Config</figcaption>
</figure>
<br>

### Unlock Administration Firmware Parameters

The D1000 Gen2, M48 Gen2 and C48 Gen2 make their Admin parameters available only while a session unlock is active. The unlock is a **Firmware Configuration Key** entered in the **Firmware Configuration Key** row of the component settings. Profinity holds the key for the sign-in session only and never saves it to the Profile. Without an active session, Profinity works at the User permission level. The Admin key is not published. Contact Prohelion if you believe you need it.

To unlock the Admin parameters, a user with the **Modify components** permission follows these steps.

1. Open **Change Settings** at the top-right of the BMU dashboard.
2. On the **Prohelion BMU Settings** tab, in the **Firmware Configuration Key** row, select **Enter**.
3. Type the key, which can be decimal or hexadecimal and ranges from 0 to 65535, and set the session duration in minutes. The duration defaults to 30 and accepts 1 to 1440 minutes.
4. Select **Apply**. The dialog reloads, the row shows **Session active** with the expiry time and the permission level that the key gives, and the Admin parameters appear.

The row offers **Change** to enter a different key and **Clear** to end the session straight away. The session also ends when the duration expires, when the user signs out and when Profinity restarts, and each signed-in user holds a separate session. After it ends, the dialog reloads and the Admin parameters disappear again.

## Flashing the BMU Firmware

To flash the BMU firmware, open **Change Settings** at the top-right of the BMU dashboard, select the **Firmware Utilities** tab and run the **Update Firmware** action. Gen1 BMU units need a [CAN to Ethernet bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) or a [Virtual CAN Adapter](../CAN_Bus_Protocols/Virtual_CAN_Adapter.md) for this operation, whereas Gen2 units can be flashed with any supported CAN adapter.

!!! warning "M48 Gen1 Needs Exactly Two Terminating Resistors"
    The M48 Gen1 procedure uses a Virtual CAN Adapter and Hub together with a PEAK CAN adapter, and requires exactly two 120 Ohm terminating resistors on the CAN bus because any other number can corrupt the firmware. The procedure is described step by step in the [M48 Gen1 Firmware Update Procedure](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Firmware_update_procedure.md).
