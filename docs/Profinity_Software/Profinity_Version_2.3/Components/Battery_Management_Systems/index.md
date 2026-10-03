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

The Prohelion Battery Management technology is built around three main components. All systems include the Battery Management Unit (BMU) master board and a number of Cell Management Units (CMUs) or Nodes, and in some Prohelion Battery Management Systems the master board and Cell Management Units are integrated into a single board solution.

For more information on these products, please see the main [Prohelion Website](https://www.prohelion.com/product-category/bms/).

Profinity supports the management and monitoring of all Prohelion Battery Management Systems via your Profile.

## Supported BMS Models

Profinity supports the following Prohelion Battery Management System models:

- **D1000 Gen1**: D1000 Generation 1 Battery Management Unit
- **D1000 Gen2**: D1000 Generation 2 Battery Management Unit
- **M48 Gen1**: M48 Generation 1 Battery Management Unit
- **M48 Gen2**: M48 Generation 2 Battery Management Unit
- **C48 Gen2**: C48 Generation 2 Battery Management Unit
- **C20 Gen1**: C20 Generation 1 Battery Management Unit

Each model has specific features and capabilities, so the appropriate model and generation must be selected when a BMS is added to your profile.

!!! info "CMUs and Nodes are managed by the BMU"
    Prohelion CMUs use a second CAN network organised by the BMU, and therefore do not need to be added as components to your Profile. Adding the BMU to your Profile provides control of, and data from, the entire BMS. For more information, see [Prohelion BMS documentation](../../../../Battery_Management_Systems/index.md).

A typical battery has one BMU, but larger packs and split packs, such as those used in racing, can involve two or more BMUs. In that case, add one BMU to your Profile for each unit, each with a different base CAN address.

## BMU Management

A Prohelion BMU is managed in Profinity by adding it to your [Profile](../../Getting_Started/Profiles.md). When a Prohelion BMU is added, Profinity prompts for the following information about the device, and these details can be changed later with the `Change Settings` button at the top-right of the BMU dashboard.

| Parameter            | Description                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------------|
| `Name`               | The name of the component. Must be unique.                                                          |
| `Control Pack`       | Enables software control of the BMS from Profinity, for the BMS units that support it.              |
| `Milliseconds Valid` | The timeout of the device. If the network has not received any traffic from this device after this many milliseconds, the connection is assumed to have been lost. |
| `Base Address`       | The CAN address of the BMU (See [BMU documentation](../../../../Battery_Management_Systems/index.md)). |

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

For a full list of battery pack status flags, see the Communications Protocol section of the [BMU documentation](../../../../Battery_Management_Systems/index.md).

The right-hand side depicts the battery state as a flowchart, showing the progression of the internal state machine of the BMU.

The current battery state is indicated by the grey box. For more information regarding the different battery states and the internal state machine, see the [BMU documentation](../../../../Battery_Management_Systems/index.md).

### CMU or Node Data

Older Prohelion BMS units refer to the Cell Management Units as CMUs and newer units use the term Nodes, but both mean the same thing and each CMU correlates to a node in the network. The `Node Telemetry` table displays the currently connected CMUs and the voltages for each collection of cells monitored by that CMU.

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

The colour of the voltage readings highlights additional information about the system:

- Cells currently balancing have a blue background
- The minimum and maximum cells are colour coded (green shows highest voltage, orange lowest)
- Cells in yellow have trust errors
- Cells not present (where the CMU has been programmed to monitor less than 8 cells) have no text, and a pale-yellow background

## Updating the BMU Configuration

!!! danger "Wrong BMU Configuration Values Are Dangerous"
    Changing the configuration of your BMU can lead to dangerous situations if the wrong values are set for your pack. Only make these changes if you understand the purpose of each value.

To update the configuration of your Battery Management Unit, click on the `Setup and Configuration` button in the top-right of the BMU dashboard. The BMU firmware options are only present if the BMU is physically connected to the network. Once the BMU configuration has been changed, the settings are saved to the device.

!!! info "Firmware Settings or Firmware Utilities tab not visible"
    Profinity only allows the firmware on a device to be set if the device is in a suitable configuration. If the Firmware Settings or Firmware Utilities tabs are not visible, Profinity is unable to see the device or the device is not in a suitable state to have its firmware changed.

<figure markdown>
![Update BMU Firmware Config](../../images/update_bmu_firmware_config.png)
<figcaption>Updating the BMU Firmware Config</figcaption>
</figure>
<br>

## Flashing the BMU Firmware

To flash the BMU firmware, select the `Firmware Utilities` button on the top-right of the BMU dashboard.

For Gen1 BMU units a CAN to Ethernet bridge or a [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) is required for this operation, whereas Gen2 units can be flashed with any supported CAN Adapter.
