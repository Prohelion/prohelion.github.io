---
title: Charger components
description: "Choose a TDK Power Supply, Siglent Power Supply or Elcon Charger component and add it to a profile with a Prohelion BMS to charge a battery pack."
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# Charger components

Profinity charges a pack by controlling a charger and a Prohelion Battery Management Unit (BMU) together.
A charger that can be controlled remotely is needed because a BMS that can only switch a charger on and off gives slow or poor balancing of the cells, which is described in the [D1000 Gen1 Charger Control](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen1/Operation/Charging.md) documentation.
The D1000 Gen1 BMU raises the charge current setpoint until the highest cell voltage reaches the Balance Threshold and then reduces it to hold that voltage.
On a D1000 Gen2 the BMS hardware handles charging, so refer to the [D1000 Gen2 documentation](../../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/index.md) for how charging is managed there.

Profinity supports three charger types, a [Prohelion BMS](../Battery_Management_Systems/Prohelion_BMU.md) in the same Profile supplies the pack data, and a user needs the **Control charging** permission to see the charging controls (refer to [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md)).

<figure markdown>
![Close-up of a two-channel power supply display: CH1 set to 32.00 V with 31.99 V and 0.00 A output, and CH2 set to 12.00 V with 12.00 V and 0.42 A output, both switched on.](../../images/SiglentCharger.png)
<figcaption>Siglent Charger</figcaption>
</figure>

## Supported chargers

- **TDK Power Supply** controls TDK programmable power supplies such as the Genesys family using Standard Commands for Programmable Instruments (SCPI) over TCP.
  A TDK supply that only has a serial interface needs a TCP to serial converter between it and the network so that Profinity can reach it over TCP.
- **Elcon Charger** controls an Elcon charger over CAN, so the charger must be connected to a CAN adapter that is already configured in the Profile.
- **Siglent Power Supply** controls Siglent programmable power supplies that accept SCPI commands over TCP, such as the SPD3303X-E, which suits desktop testing.

## Add a charger to the Profile

A charger is a component, so it is added from **ADD COMPONENT** in the same way as any other device (refer to [Add a Component to a Profile](../../How_To_Guides/Add_Component_to_Profile.md)).
The Profile must also contain a Prohelion BMS, and that BMS must have **Control Pack** switched on, because **Control Pack** is off by default and Profinity can only engage and disengage the pack, which a charge needs, when it is on.
Once the charger is added it appears under **Chargers & Power Supplies** in the main menu with its own dashboard.

<figure markdown>
![The Available Components screen filtered to Chargers & Power Supplies, listing Elcon Charger, Siglent Power Supply and TDK Power Supply.](../../images/add_charger.png)
<figcaption>Add a Charger</figcaption>
</figure>

Every charger asks for its own limits and the limits of the supply that feeds it, which [Charger settings](Charger_Settings.md) lists.
To run a charge from the dashboard, refer to [Start a charge](Start_a_Charge.md), and for the messages and faults that stop one, refer to [Charging troubleshooting](Charging_Troubleshooting.md).
