---
title: Prohelion BMU
description: "Add a Prohelion Battery Management Unit to a profile, choose the BMS model and set its base address, timeout, and Control Pack option."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# Prohelion BMU

Profinity monitors and manages every Prohelion Battery Management System (BMS) through the BMU dashboard.
The dashboard appears as a tab in the sidebar once a Battery Management Unit (BMU) is added to the [Profile](../../../Getting_Started/Profiles.md).
The model and generation that you select when you add the BMS must match the hardware.
The BMU sits in the **Battery Management Systems** group of the component catalogue. It produces tags from the CAN signals in its DBC file.

<figure markdown>
```mermaid
flowchart LR
    BMU --> Adapter["CAN adapter"] --> Dashboard["BMU dashboard"]
```
<figcaption>The BMU, which manages its CMUs, sends CAN messages through a CAN adapter, and the BMU dashboard in the Profile shows the data for the whole BMS</figcaption>
</figure>

| Model | Description | Default base address |
|-------|-------------|----------------------|
| [D1000 Gen1](../../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/index.md) | A 1000 V BMS with a BMU and Cell Management Units (CMUs) on a dedicated CMU CAN bus. | `0x600` |
| [D1000 Gen2](../../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/index.md) | A 1000 V BMS with a BMU, a Battery Junction Unit (BJU) and CMUs, available with Firmware V1.1 or V1.2. | `0x600` |
| [M48 Gen1](../../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/index.md) | A 48 V BMS. | `0x600` |
| M48 Gen2 | The 48 V Generation 2 BMS. | `0x600` |
| C48 Gen2 | The 48 V 100 A 16S BMS. | `0x600` |
| C20 Gen1 | The 20 V Generation 1 BMS. | `0x100` |

The settings in the BMU management section apply to every model in the table, except where a row names a specific model.
The BMU data, firmware configuration and firmware flashing on the linked pages also apply to every model, except where a section names a specific model.

In every model the BMU organises its CMUs, which are also called Nodes.
Add only the BMU to the Profile, which gives control of and data from the entire BMS.
Larger and split packs, such as those used in racing, can have two or more BMUs.

Add one BMU for each unit, each with a different base CAN address.
The hardware is described in the [Prohelion BMS documentation](../../../../../Battery_Management_Systems/index.md).

## Quick start

**You need** a CAN bus adapter in the profile that is connected to the BMS CAN bus, as described in [How to add a component to your profile](../../../How_To_Guides/Add_Component_to_Profile.md).

1. Select **ADD COMPONENT**, then select the model that matches your hardware from the **Battery Management Systems** group.
2. Keep **Name** at the model name, or enter a name that is unique in the profile.
3. Keep **Base Address** at the default for the model in the model table, unless your hardware uses a different CAN address.
4. Keep **Milliseconds Valid** at `5000` and **Control Pack** off, unless you need Profinity to engage and disengage the pack.
5. Select **ADD COMPONENT** at the bottom of the dialog.
6. Open the BMU dashboard tab in the sidebar, and check that **BATTERY VOLTAGE** shows a reading.

## BMU management

When you add a Prohelion BMU to the Profile, Profinity prompts for the information in the following table.
The **Change Settings** button on the BMU dashboard changes these details later.

| Parameter | Type | Description | Default |
|----------------------|----|-----------------------------------------------------------------------------------------------------|---------|
| **Name** | Text | The name of the component. Must be unique. | The model name |
| **Control Pack** | On or off | Enables software control of the BMS from Profinity (engaging and disengaging the pack). Applies to the D1000 Gen1 and D1000 Gen2 only, and is hidden on the other models. | Off |
| **Milliseconds Valid** | Time | The timeout of the device, from 1 to 60000. If no traffic is received from the device within this time, Profinity treats the connection as lost. | 5000 |
| **Base Address** | Hexadecimal number | The CAN address of the BMU, as described in the protocol documentation of each model. Enter it in hexadecimal, with or without the `0x` prefix, for example `600`, because `1536` is read as `0x1536`. | `0x600`, or `0x100` for the C20 Gen1 |
| **Firmware Configuration Key** | Secret | D1000 Gen2, M48 Gen2 and C48 Gen2 only. Unlocks the Admin firmware parameters for the current sign-in session. Refer to [Unlock administration firmware parameters](Update_BMU_Configuration_and_Firmware.md#unlock-administration-firmware-parameters). | No active session |

A D1000 Gen1 or D1000 Gen2 charges through the Profinity **Charge** screen once **Control Pack** is on.

The CAN address of each model is described on these pages:

- [D1000 Gen1 Communications Protocol](../../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Communications_Protocol/index.md)
- [D1000 Gen2 Messages and Signals](../../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md)
- [D1000 Gen2 Messages and Signals (Firmware V1.1)](../../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.1/Messages_and_Signals.md)
- [M48 Gen1 CAN Communication](../../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/CAN_Communication.md)

The [BMU dashboard](BMU_Dashboard.md) describes the BMU data and the node telemetry.
To change the firmware settings, unlock the Admin parameters or flash the firmware, refer to [Update BMU configuration and firmware](Update_BMU_Configuration_and_Firmware.md).

## Example

This example is an illustration only.
Replace the capitalised placeholders with your own values.
It adds a D1000 Gen1 BMU to the `components` list in the `profile.yaml` file of the profile.

```yaml
- component:
    type: D1000Gen1Bms
    id: D1000Gen1Bms1
    tagTreeParentPath: /
    name: YOUR_BMU_NAME
    controlPack: false
    milliValid: 5000
    baseAddress: 1536
```

`YOUR_BMU_NAME` is the unique name of the component.
The `baseAddress` value 1536 is the decimal form of `0x600`, the default base address of the D1000 Gen1.
The `milliValid` value is the timeout in milliseconds.
