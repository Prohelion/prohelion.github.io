---
title: Prohelion BMS
description: "Monitor and manage Prohelion battery management systems including BMU and CMU data, configuration, and firmware."
---

# Prohelion Battery Management Systems

### Table of Contents

- [Introduction](#introduction)
- [Supported BMS Models](#supported-bms-models)
- [BMU Management](#bmu-management)
- [BMU Data](#bmu-data)
- [CMU or Node Data](#cmu-or-node-data)
- [Updating the BMU Configuration](#updating-the-bmu-configuration)
- [Flashing the BMU Firmware](#flashing-the-bmu-firmware)

## Introduction

Prohelion designs and sells Battery Management Systems (BMS) for both automotive and fixed location environments.

The Prohelion D1000 Gen1 and D1000 Gen2 Battery Management Systems are built around two main components, the Battery Management Unit (BMU), which interfaces between the cells and the vehicle, controls precharge and the pack contactors and provides total pack telemetry, and a number of Cell Management Units (CMUs), also referred to as Nodes, which measure the voltage and temperature of the individual cells. A D1000 Gen1 CMU measures up to 8 cells, whereas a D1000 Gen2 CMU measures between 4 and 14 cells and up to 4 temperatures, with up to 32 CMUs and 448 cells supported on one D1000 Gen2 BMU (see the [Prohelion BMS D1000 Gen1](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/index.md) and [Prohelion BMS D1000 Gen2](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/index.md) documentation). The Prohelion BMS M48 Gen1 is a single unit that integrates the cell measurement nodes, with two nodes in the 48 V configurations, and it switches precharge, charge and discharge MOSFET outputs instead of external contactors (see the [Prohelion BMS M48 Gen1](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/index.md) documentation). The D1000 Gen2 also adds a [Battery Junction Unit](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Components/Battery_Junction_Unit.md) (BJU), an external measurement device such as the Isabellenhuette IVT-S that measures the overall pack current and the battery, charger and load voltages. The BMS requests these measurements from the BJU, and the BMS also reports the intended and actual state of a relay on the BJU. The BMS raises a BJU timeout fault, which is shown as the `BJU` lamp on the D1000 Gen2 dashboard, when the BJU does not respond to those requests.

For more information on these products, please see the main [Prohelion Website](https://www.prohelion.com/product-category/bms/).

Profinity supports the management and monitoring of all Prohelion Battery Management Systems via your Profile.

## Supported BMS Models

Profinity supports the following Prohelion Battery Management System models:

- **D1000 Gen1**: [Prohelion BMS D1000 Gen1](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/index.md), a 1000 V Generation 1 BMS with a BMU and CMUs on a dedicated CMU CAN bus
- **D1000 Gen2**: [Prohelion BMS D1000 Gen2](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/index.md), a 1000 V Generation 2 BMS with a BMU, a BJU and CMUs, available with Firmware V1.1 or V1.2
- **M48 Gen1**: [Prohelion BMS M48 Gen1](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/index.md), a 48 V Generation 1 BMS
- **M48 Gen2**: Prohelion 48 V Generation 2 BMS
- **C48 Gen2**: Prohelion 48 V 100 A 16S BMS
- **C20 Gen1**: Prohelion 20 V Generation 1 BMS

Each model has specific features and capabilities, so the appropriate model and generation must be selected when a BMS is added to your profile.

!!! info "CMUs and Nodes are managed by the BMU"
    The CMUs of a D1000 Gen1 communicate with the BMU over a separate CMU CAN bus at 125 kbit/s, the CMUs of a D1000 Gen2 communicate with the BMU over an isolated daisy-chain connected to the CMU Bus Upper and Lower ports of the BMU, and the nodes of an M48 Gen1 are part of the single unit, so in every case the CMUs are organised by the BMU and do not need to be added as components to your Profile. Adding the BMU to your Profile provides control of, and data from, the entire BMS. For more information, see [Prohelion BMS documentation](../../../../Battery_Management_Systems/index.md).

A typical battery has one BMU, but larger packs and split packs, such as those used in racing, can involve two or more BMUs. In that case, add one BMU to your Profile for each unit, each with a different base CAN address, where the D1000 Gen1, D1000 Gen2 and M48 Gen1 use a default base CAN address of 0x600.

## BMU Management

A Prohelion BMU is managed in Profinity by adding it to your [Profile](../../Getting_Started/Profiles.md). When a Prohelion BMU is added, Profinity prompts for the following information about the device, and these details can be changed later with the `Change Settings` button at the top-right of the BMU dashboard.

| Parameter            | Description                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------------|
| `Name`               | The name of the component. Must be unique.                                                          |
| `Control Pack`       | Enables software control of the BMS from Profinity, for the BMS units that support it.              |
| `Milliseconds Valid` | The timeout of the device. If the network has not received any traffic from this device after this many milliseconds, the connection is assumed to have been lost. |
| `Base Address`       | The CAN address of the BMU, which is 0x600 by default for the D1000 Gen1, D1000 Gen2 and M48 Gen1 (See the Communications Protocol section of the [D1000 Gen1 documentation](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/index.md), the [D1000 Gen2 Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) or the [M48 Gen1 CAN Communication](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/CAN_Communication.md)). |

The BMU dashboard contains several sections, each with different information about your system. The top section shows data from the BMU, and clicking the `MORE DETAILS` banner expands the dashboard to display telemetry data from the CMUs.

<figure markdown>
![Prohelion BMU](../../images/prohelion_bmu.png)
<figcaption>Prohelion BMU</figcaption>
</figure>

The top right of the window contains several controls related to the BMS, including access to the CAN signals and messages from the BMS in the [DBC viewer](../../CAN_Utilities/CAN_Bus_DBC.md).

### BMU Data

The top row of BMU data presents a summary of the following information (left to right):

| Cell              | Meaning                                                                                                                |
|-------------------|------------------------------------------------------------------------------------------------------------------------|
| `BATTERY VOLTAGE` | Total voltage of the battery pack, in volts.                                                                           |
| `CURRENT`         | Current being supplied to/from the battery pack, in amps. Negative current indicates current flowing into the battery. |
| `SOC %`           | Estimation of the remaining charge in the battery, as a percentage of the user-set total pack capacity.                |
| `MAX CELL`        | Maximum cell voltage within the battery pack, in volts.                                                                |
| `MIN CELL`        | Minimum cell voltage within the battery pack, in volts.                                                                |
| `MAX CELL TEMP`   | Maximum cell temperature within the battery pack, in degrees Celsius.                                                  |
| `MIN CELL TEMP`   | Minimum cell temperature within the battery pack, in degrees Celsius.                                                  |


Below the summary are two graphs depicting the cell temperatures and node voltages observed by the CMUs. Hovering the cursor over a graph shows the data in greater resolution.

The lower left side of the window shows status indicators for battery events. These events depend on the BMS in use, and examples include:

- Any cell Over/under voltage
- Any cell Over temperature
- Any measurement untrusted
- CMU and vehicle timeout errors
- CMU Power supply OK
- Invalid SoC estimation

The D1000 Gen2 dashboard instead shows the reasons reported by the BMS, such as `SELF TEST FAIL`, `WATCH DOG FAIL`, `CONTACTOR FAIL`, `HVIL`, `BJU`, `NODE COUNT`, `CELL COUNT`, `TEMP COUNT` and the `PRESSURE`, `HUMIDITY`, `VOC` and `NOX` environmental sensor lamps, and a separate `PRECHARGE FAIL REASON` group of lamps for a failed precharge. The `HVIL` lamp indicates that the High-Voltage Interlock loop is measuring a high impedance, which points to a connector failure, and the `BJU` lamp indicates that the BJU has not responded to requests for measurements.

For a full list of battery pack status flags, see the Communications Protocol section of the [D1000 Gen1 documentation](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/Transmitted_CAN_Packets.md) or the BMS Info message of the [D1000 Gen2 Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md).

The right-hand side depicts the battery state as a flowchart, showing the progression of the internal state machine of the BMU.

The current battery state is indicated by the grey box. The D1000 Gen1 reports six states, Error, Idle, Enable, Measure, Precharge and Run, which are described in the [BMS State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Operation/BMS_State_Machine.md) documentation, and the Profinity dashboard additionally shows a Discovery state for the D1000 Gen1. The D1000 Gen2 dashboard follows the Firmware V1.2 state machine, which uses the INITIALISE, CALIBRATE, SAFE, IDLE, CONNECT, PRECHARGE, ENABLED and DISCONNECT states together with the CHARGE_INIT, CHARGE_CONNECT, CHARGE_ENABLED and CHARGE_STOPPING states used while charging, as described in the [Firmware V1.2 State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/State_Machine.md), whereas Firmware V1.1 uses a different set of states that is described in the [Firmware V1.1 State Machine](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/State_Machine.md). The M48 Gen1 uses the INIT, PRECHARGE, DISCHARGE ENABLED, CHARGE ENABLED, ALL ENABLED and ERROR states, together with the variants of the enabled states that remain in precharge, which are described in the [M48 Gen1 Software Specifications](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Software_Specifications.md).

### CMU or Node Data

The D1000 Gen1 documentation refers to the Cell Management Units as CMUs, whereas the D1000 Gen2 firmware and the M48 Gen1 use the term Nodes or cell measurement nodes, but both mean the same thing and each CMU correlates to a node in the network. The `Node Telemetry` table displays the currently connected CMUs and the voltages for each collection of cells monitored by that CMU.

The information shown depends on the model of BMS, and for a D1000 Gen1 unit it is:

| Cell            | Meaning                             |
|-----------------|-------------------------------------|
| `Node Number`   | CMU Serial Number                   |
| `PCB C`         | CMU circuit board (PCB) temperature |
| `Cell C`        | CMU external (cell) temperature     |
| `Cell 1 - 8 mV` | 1 – 8 cell voltage measurements     |

<figure markdown>
![Prohelion CMU](../../images/node_data.png)
<figcaption>Prohelion CMU</figcaption>
</figure>

A D1000 Gen1 CMU measures up to 8 cells, and each reported cell voltage also carries the measurement status, so that a reading where the two redundant measurement channels disagree is reported as a negative value (a trust error), and a cell position that the BMU has not configured as present is reported as -32768 mV (see [Transmitted CAN Packets](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/Transmitted_CAN_Packets.md)). The colour of the voltage readings highlights additional information about the system:

- Cells currently balancing have a blue background
- The minimum and maximum cells are colour coded (green shows highest voltage, orange lowest)
- Cells in yellow have trust errors
- Cells not present (where the CMU has been programmed to monitor less than 8 cells) have no text, and a pale-yellow background

## Updating the BMU Configuration

!!! danger "Wrong BMU Configuration Values Are Dangerous"
    Changing the configuration of your BMU can lead to dangerous situations if the wrong values are set for your pack. Only make these changes if you understand the purpose of each value.

Each D1000 Gen2 configuration parameter has a User or Admin permission level, which is listed in the [Firmware V1.2 Configuration Parameters](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Configuration_Parameters.md) (or the [Firmware V1.1 Configuration Parameters](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/Configuration_Parameters.md)), and the M48 Gen1 parameters are listed in the [M48 Gen1 Software Specifications](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Software_Specifications.md).

To update the configuration of your Battery Management Unit, open the `Change Settings` menu in the top-right of the BMU dashboard and select the `Firmware Settings` tab. The BMU firmware options are only present if the BMU is physically connected to the network. Once the BMU configuration has been changed, the settings are saved to the device.

!!! info "Firmware Settings or Firmware Utilities tab not visible"
    Profinity only allows the firmware on a device to be set if the device is in a suitable configuration. If the Firmware Settings or Firmware Utilities tabs are not visible, Profinity is unable to see the device or the device is not in a suitable state to have its firmware changed.

<figure markdown>
![Update BMU Firmware Config](../../images/update_bmu_firmware_config.png)
<figcaption>Updating the BMU Firmware Config</figcaption>
</figure>
<br>

## Flashing the BMU Firmware

To flash the BMU firmware, open the `Change Settings` menu on the top-right of the BMU dashboard, select the `Firmware Utilities` tab and run the `Update Firmware` action.

For Gen1 BMU units a [CAN to Ethernet bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) or a [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) is required for this operation, whereas Gen2 units can be flashed with any supported CAN Adapter. The M48 Gen1 procedure uses a Virtual CAN Adapter and Hub together with a PEAK CAN adapter, requires exactly two 120 Ohm terminating resistors on the CAN bus because any other number can corrupt the firmware, and is described step by step in the [M48 Gen1 Firmware Update Procedure](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Firmware_update_procedure.md).
