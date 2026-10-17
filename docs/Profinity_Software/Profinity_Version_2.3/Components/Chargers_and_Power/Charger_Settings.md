---
title: Charger settings
description: "Look up the voltage, current, and power limits, network, and CAN settings of the TDK Power Supply, Siglent Power Supply and Elcon Charger components."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Charger settings

Profinity asks for these settings when a [charger component](Charger_Components.md) is added to a Profile.

Every charger asks for its own limits and the limits of the supply that feeds it.
Each charger type starts with its own default limits, and **Supply Voltage Limit** and **Supply Current Limit** start at 240 V and 10 A, so set all five to match the actual charger and the wall circuit before charging.

| Setting | TDK | Siglent | Elcon | Notes |
|---|---|---|---|---|
| **Charger Voltage Limit** | 300 V | 32 V | 198 V | Maximum voltage, in volts, that the charger can output, from 1 to 1000. |
| **Charger Current Limit** | 10 A | 3.2 A | 46 A | Maximum current, in amps, that the charger can output, from 1 to 1000. |
| **Charger Power Limit** | 3000 W | 102 W | 6600 W | Maximum power, in watts, that the charger can output, from 1 to 1000000. If unsure, use maximum voltage multiplied by maximum current, or less. |
| **Supply Voltage Limit** | 240 V | 240 V | 240 V | Maximum voltage, in volts, that the wall socket supplies, from 1 to 1000. |
| **Supply Current Limit** | 10 A | 10 A | 10 A | Maximum current, in amps, that the wall socket supplies, from 1 to 1000. |

The TDK and Siglent supplies are reached over the network and share these communication settings.

| Setting | Default | Notes |
|---|---|---|
| **Charger IP Address** | `127.0.0.1` | Address of the supply on the network. |
| **Charger Port** | 5025 | TCP port the supply listens on, between 1 and 65535. |
| **Comms Timeout** | 5000 | Time in milliseconds Profinity waits for the supply to answer. |
| **Auto Connect** | Off | Connects to the supply when the Profile loads. With it off, the supply is not connected until the user connects it with the **Connect / Disconnect** toggle in the component's menu. |
| **Auto Reconnect** | On | Keeps trying to connect in the background, both when the supply is off at start and after it disconnects. With it off, Profinity makes one attempt and reports a failure. |
| **Reconnect Interval** | 5000 | Time in milliseconds between connection attempts, between 500 and 600000. Shown only when **Auto Reconnect** is on. |
| **Charger ID** | 0 | TDK only. The ID the TDK supply is set to. |
| **Channel ID** | 1 | Siglent only. The channel in use on a multi-channel supply. |

The Elcon charger has no connection step, because it communicates over CAN, and asks for the following instead.

| Setting | Default | Notes |
|---|---|---|
| **Elcon Command CAN Bus Id** | `0x1806E5F4` | CAN address Profinity sends commands to. |
| **Elcon Status CAN Bus Id** | `0x18FF50E5` | CAN address Profinity receives status messages from. |
| **Milliseconds Valid** | 5000 | Time in milliseconds the CAN traffic from the charger stays valid before Profinity treats the connection as lost, between 1 and 60000. |

## Current and voltage limits

!!! warning "Set the supply and charge limits before charging"
    The charger and supply limits in the Profile are the maximums Profinity works to, so a **Supply Current Limit** above what the wall circuit is rated for can overload that circuit.
    Profinity does not know the cell specification beyond what the BMU reports, so keep the charge current at or below the cell manufacturer's recommended charge current to avoid damaging the battery.

To run a charge with these limits, refer to [Start a charge](Start_a_Charge.md).
