---
title: Update BMU configuration and firmware
description: "Change the firmware configuration of a Prohelion BMU, unlock the Admin firmware parameters with a session key, and flash the BMU firmware."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Update BMU configuration and firmware

Use the **Change Settings** button at the top-right of the BMU dashboard to manage a Prohelion Battery Management Unit (BMU).
You can change its firmware configuration, unlock its Admin parameters, or flash its firmware.
To add a BMU to a profile first, refer to [Prohelion BMU](Prohelion_BMU.md).

## Updating the BMU configuration

!!! danger "Wrong firmware settings can damage the pack"
    Settings that do not match the pack can allow unsafe voltages or currents.
    Change a value only when the configuration parameters page for the firmware describes its purpose.

To update the configuration, open **Change Settings** at the top-right of the BMU dashboard and select the **Firmware Settings** tab.
Profinity saves each setting to the device as you change it.

The **Firmware Settings** and **Firmware Utilities** tabs appear only when Profinity can reach the BMU on the CAN network and the BMU is in a state that accepts firmware changes.
If the tabs are missing, check that the CAN adapter status is green, the **Base Address** matches the BMU and the BMU is powered.

Each D1000 Gen2 parameter has a User or Admin permission level.
The Configuration Parameters pages in the table of models on the [BMU dashboard](BMU_Dashboard.md) page list these levels.
The M48 Gen1 parameters are on its Software Specifications page.

<figure markdown>
![Change Settings dialog with the Firmware Settings tab showing the BMU firmware configuration parameters](../../images/update_bmu_firmware_config.png)
<figcaption>Updating the BMU Firmware Config</figcaption>
</figure>

### Unlock administration firmware parameters

The D1000 Gen2, M48 Gen2 and C48 Gen2 make their Admin parameters available only while a session unlock is active.
The unlock is a **Firmware Configuration Key** entered in the **Firmware Configuration Key** row of the component settings.
Profinity holds the key for the sign-in session only and never saves it to the Profile.
Without an active session, Profinity works at the User permission level.
The Admin key is not published.
Contact Prohelion if you believe you need it.

To unlock the Admin parameters, a user with the **Modify components** permission follows these steps.

1. Open **Change Settings** at the top-right of the BMU dashboard.
2. On the **Prohelion BMU Settings** tab, in the **Firmware Configuration Key** row, select **Enter**.
3. Type the key.
   The key can be decimal or hexadecimal, from 0 to 65535.
4. Set the session duration in minutes.
   The duration defaults to 30 and accepts 1 to 1440 minutes.
5. Select **Apply**.
   The dialog reloads and the Admin parameters appear.
   The row shows **Session active** with the expiry time and the permission level that the key gives.

The row offers **Change** to enter a different key and **Clear** to end the session straight away.
The session also ends when the duration expires, when the user signs out and when Profinity restarts.
Each signed-in user holds a separate session.
After a session ends, the dialog reloads and the Admin parameters disappear.

## Flashing the BMU firmware

To flash the BMU firmware, open **Change Settings** at the top-right of the BMU dashboard, select the **Firmware Utilities** tab and run the **Update Firmware** action.
Gen1 BMU units need a [CAN to Ethernet bridge](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) or a [Prohelion Virtual CAN Bus Adapter](../CAN_Bus_Protocols/Virtual_CAN_Adapter.md) for this operation.
Gen2 units can be flashed with any supported CAN adapter.

The step-by-step procedure for Gen1 units, including the CAN bus requirements, is in the [M48 Gen1 Firmware Update Procedure](../../../../Battery_Management_Systems/Prohelion_BMS_M48_Gen1/Firmware_update_procedure.md).
