---
title: Charging troubleshooting
description: "Fix a charge that does not start or a pack that does not engage, using the charger controller messages, the status lamps and the precharge checks."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Charging troubleshooting

Fix a charge that does not start or a pack that does not engage using this page.
Charging needs both the charger and the Battery Management System (BMS) to work as expected.
First confirm that every device in the Profile shows the green circle in the Profile window.
Fix a grey or red device before you run a charge.
The **Charger / Power Supply Controller** panel then reports most problems in a message.

| Message | Cause | Fix |
|---|---|---|
| **No Battery**: No battery can be found in this profile | The Profile has no Prohelion BMS. | Add a Prohelion BMS to the Profile. |
| **Battery Control Limited**: You cannot software control this battery | **Control Pack** is off on the BMS, so the current, **Charge To** and **START** controls are disabled. | Switch **Control Pack** on in the BMS settings, or use the screen to monitor the charger only. |
| **Charger Not Available**: The charger is not connected or not available | The charger is not connected or does not exist in the Profile. | Connect the charger, and check its IP address and port (TDK and Siglent) or the CAN adapter (Elcon). |
| **Charger Issue**: There is an issue with your selected charger | The charger, its hardware or its communications report an error. | Check the **COMMUNICATIONS** and **CHARGER STATUS** lamps and the Profinity logs, and resolve the error before charging. |
| **SOC Warning**: You have already reached that charge level | **Charge To** is lower than the current state of charge (SOC). | Raise **Charge To** above the current state of charge. |

If **START** does nothing and no message is shown, check that the battery and charger lamps are not grey or red, because the button is disabled while either is unavailable. A grey or red lamp means the device is unavailable.

## The pack does not engage

A common problem is current flowing from the battery into the charger during precharge.
Any load that draws current while the pack precharges slows or stops the rise of the output voltage.
Precharge then does not finish in the expected time and the pack does not engage (refer to [Precharge](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Operation/Precharge.md)).
On a D1000 Gen2 the **PRECHARGE FAIL REASON** lamps report the failure, for example **PRECHARGE TIMEOUT** or **PRECHARGE STABLE CURRENT**.
The [Firmware V1.2 Messages and Signals](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Messages_and_Signals.md) page lists them.

!!! danger "Current can flow from the battery into the charger"
    Engaging the pack while the charger is connected lets current flow from the battery into the charger.
    Fit a diode of suitable rating in the charger circuit, so that current can only flow from the charger to the pack.

To test for this outside a charge, with the charger connected:

1. Open the Battery Management Unit (BMU) dashboard.
2. Try to engage the pack.
   If the contactors do not engage while the charger is connected, the problem exists.
3. Fit the diode, then repeat the test.
   The contactors engage when the fix has worked.

To run a charge once the fault is fixed, refer to [Start a charge](Start_a_Charge.md).
