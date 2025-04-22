---
title: Prohelion BMS
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# Prohelion Battery Management Systems

### Table of Contents

- [BMU Management](#bmu-management)
- [BMU Data](#bmu-data)
- [CMU / Node Data](#cmu-or-node-data)
- [Updating the BMU Configuration](#updating-the-bmu-configuration)
- [Flashing the BMU Firmware](#flashing-the-bmu-firmware)

## Introduction

Prohelion design and sells Battery Management Systems (BMS) designed for both automotive and fixed location environments.

The Prohelion Battery Management technology is built around three main components. All systems will include the Battery Management Unit (BMU) master board and a number of Cell Management Units (CMUs) or Nodes, in some of our Battery Management Systems the master board and Cell Management Units are integrated in to a single board solution.

For more information on these products, please see the main [Prohelion Website](https://www.prohelion.com/product-category/bms/).

Profinity supports the management and monitoring of all our Battery Management Systems via your Profile.

!!! info "CMUs and Nodes are managed by the BMU"
    Prohelion CMUs utilise a second CAN network organised by the BMU, and thus do not need to be added as components to your Profile. By adding the BMU to your Profile, you are able to control and see data from the entire BMS. For more information, see [Prohelion BMS documentation](../../../../Battery_Management_Systems/index.md).

A typical battery will generally only have one BMU, but larger packs or split packs like the ones used in racing can involve two or more BMUs.  If your pack is configured as such, then you simply add multiple BMUs to your Profile with different base CAN addresses.

## BMU Management

You can manage a Prohelion BMU using Profinity by adding a new Prohelion BMU to your [Profile](../../Getting_Started/Profiles.md). When adding a Prohelion BMU to your Profile, you will be prompted to fill in the following information about your device. Note that these details can be changed later from `Change Settings` button at the top-right of the BMU dashboard.

<!-- Finish this -->
|Parameter                  |Description                                                                                         |
|---------------------------|----------------------------------------------------------------------------------------------------|
|`Name`                     | The name of the component. Must be unique.                                                         |
|`Control Pack`             | Some of our BMS units can be software controlled from Profinity, to enable this you need to enable the Control Pack option. |
|`Milliseconds Valid`       | The timeout time of the device. If the network has not received any traffic from this device after this many milliseconds, it is assumed that the connection has been lost. |
|`Base Address`             | The CAN address of the BMU (See [BMU documentation](../../../../Battery_Management_Systems/index.md)). |

The BMU dashboard contains several sections each with different information about your system. The top section shows data from the BMU, whilst clicking on the `MORE DETAILS` banner will expand the dashboard to display telemetry data from the CMUs.

<figure markdown>
![Prohelion BMU](../../images/prohelion_bmu.png)
<figcaption>Prohelion BMU</figcaption>
</figure>

The top right of the window contains several controls related to the BMS, allowing you to monitor CAN signals and messages from the BMS using the [DBC viewer](../../CAN_Utilities/CAN_Bus_DBC.md).

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


Below the summary are two graphs depicting the cell temperatures and node voltages observed by the CMUs. Hovering your cursor over the graphs showcases the data in greater resolution.

The lower left side of the window features numerous status indicators for battery events. These events will change depending on the BMS you are running, examples shown here include:

- Any cell Over/under voltage
- Any cell Over temperature
- Any measurement untrusted
- CMU and vehicle timeout errors
- CMU Power supply OK
- Invalid SoC estimation

For a full list of battery pack status flags, see the Communications Protocol section of the [BMU documentation](../../../../Battery_Management_Systems/index.md).

The right-hand side depicts the battery state as a flowchart, showing the progression of the BMU's internal state machine. 

The current battery state is indicated by the gray box. For more information regarding the different battery states and the internal state machine, see the [BMU documentation](../../../../Battery_Management_Systems/index.md).

### CMU or Node Data

Older Prohelion BMS units refer to the Cell Management Units as CMUs, newer units use the term Nodes, both mean the same thing and each CMU correlates to a node in the network. The `Node Telemetry` table displays the currently connected CMUs and the voltages for each collection of cells being monitored by the specific CMU. 

The exact information shown will depend on the model of BMS that you are running, in the case of this D1000 Gen1 unit, the information shown is:

| Cell            | Meaning                             |
|-----------------|-------------------------------------|
| `Node Number`   | CMU Serial Number                   |
| `PCB C`         | CMU circuit board (PCB) temperature |
| `Cell C`        | CMU external (cell) temperature     |
| `PCB C`         | CMU circuit board (PCB) temperature |
| `Cell 1 - 8 mV` | 1 – 8 cell voltage measurements     | 

<figure markdown>
![Prohelion CMU](../../images/node_data.png)
<figcaption>Prohelion CMU</figcaption>
</figure>

Various additional information about the system is highlighted by the colour of the voltage readings:

- Cells currently balancing have a blue background
- The minimum and maximum cells <!--have bold text and -->are colour coded (green shows highest voltage, orange lowest)
- Cell in yellow have trust errors
- Cells not present (where the CMU has been programmed to monitor less than 8 cells) have no text, and a pale-yellow background

## Updating the BMU Configuration

!!! danger "Be Careful!"
    Changing the configuration of your BMU can lead to dangerous situations if you set the wrong values for your pack.  Be careful and only make these changes if you know what you are doing and understand the purpose of these values.

To update the configuration of your Battery Management Unit, click on the `Setup and Configuration` button in the top-right of the BMU dashboard. The BMU firmware options will only be present if the BMU is physically connected to the network. Once you have finished changing the BMU configuration, the settings will be saved to the device.

!!! info "Why is the Firmware Settings or Firmware Utilities tab not visible?"
    Profinity will only let you set the firmware on your device if it believes the device is in a suitable configuration to do so.  
    
    If the Firmware Settings or Firmware Utilities tabs are not visible, this is because Profinity is unable to see your device or it is not in a suitable state to have its firmware changed.


<figure markdown>
![Connect Charger](../../images/update_bmu_firmware_config.png)
<figcaption>Updating the BMU Firmware Config</figcaption>
</figure>
<br>

## Flashing the BMU Firmware

To flash the BMU firmware, select the `Firmware Utilties` button on the top-right of the BMU dashboard.  

For Gen1 BMU units a CAN to Ethernet bridge or a [Virtual CAN Adapter](../Adaptors/Virtual_CAN_Adapter.md) is required for this operation, for Gen2 units the device can be flashed with any supported CAN Adapter.