---
title: CAN bus adapter troubleshooting
description: "Fix a CAN bus adapter with an amber or red status, a missing Peak driver, a CAN to Ethernet bridge Auto Discovery does not find, or a bit rate mismatch."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# CAN bus adapter troubleshooting

This page covers:

- The adapter status indicator.
- A Peak adapter that needs its driver.
- A CAN to Ethernet bridge that Auto Discovery does not find.
- The bit rate that every device on a CAN bus must share.

The adapters are listed on [CAN bus adapters](index.md).

## Adapter status

Once you add the adapter to the Profile, a coloured status indicator appears in the sidebar next to the device name.
Green is the state of a working adapter, and [How to add a component to your profile](../../../How_To_Guides/Add_Component_to_Profile.md#check-the-component-status) lists every colour.
An adapter that is connected but has no data arriving shows amber, and one that is stopped, or still making its first connection attempt, is outlined with no fill.

| What you see | Cause | What to do |
|---|---|---|
| An amber indicator | The adapter is connected, but no data is arriving. | Check that the bit rate matches the bus, that the bus is terminated and whether another device is transmitting. |
| A red indicator | An attempt to connect failed, or the connection was lost. | Read the Profinity System Logs for the reason. Common causes: a missing Peak driver, a wrong TCP bridge address or port, or a wrong SocketCAN interface name. |

## If a Peak adapter is not found

The Peak CAN to USB Adapter needs the Peak driver installed on the machine that runs Profinity, as set out in [CAN bus adapters](index.md).

| What you see | Cause | What to do |
|---|---|---|
| The adapter does not appear in the **Discovered** category, or an adapter in the Profile shows a red status with the message "The Peak driver is not installed. Install the latest Peak drivers from the Peak website, then restart Profinity." | The Peak driver is not installed. | Install the latest driver from the [Peak System website](https://www.peak-system.com/), confirm with the Peak tools that the adapter works, then restart Profinity. |
| The adapter is plugged in and still shows red | The driver is out of date, which stops the adapter connecting. | Update the driver. Peak updates its driver often. |

On Linux, a Peak adapter appears as a SocketCAN interface instead, so use the SocketCAN adapter and no Peak driver is needed.

## If a CAN to Ethernet bridge is not found

Profinity discovers a CAN to Ethernet bridge from the UDP heartbeat datagrams that the bridge sends periodically (refer to [Bridge Heartbeat](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/Bridge_Heartbeat.md)).
If the bridge does not appear in the **Discovered** category, check the causes in the following table.

| What you see | Cause | What to do |
|---|---|---|
| The bridge does not appear in the **Discovered** category. | The bridge and the PC are on different subnets, and Auto Discovery works only within one subnet. | Add the bridge manually with its IP address and the TCP protocol. |
| The bridge does not appear in the **Discovered** category. | A firewall blocks UDP and TCP port 4876 for the bridge. | Allow UDP and TCP port 4876 for the bridge. |
| The bridge does not appear in the **Discovered** category. | A WiFi router blocks broadcast UDP. | Check that the WiFi router passes broadcast UDP. |
| The SocketCANd adapter is not discovered, or does not connect. | A firewall blocks UDP port 42000 for discovery, or TCP port 29536 (or the configured **Port**) for the connection. | Allow those ports through the firewall. |

The bridge documentation covers further troubleshooting:

- [CAN to Ethernet bridges](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md)
- [Quickstart](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md)
- [Supported Network Setups](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)
- [Common Problems and Solutions](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md)

## Set the same bit rate on every CAN device

Every device on the CAN bus, including the adapter that connects Profinity, must operate at the same bit rate to communicate.
Prohelion devices ship with a factory default of 500 kbit/s.
This is also the default of the bridge, the Peak adapter and the CANdapter in Profinity.

Prohelion devices support 1 Mbit/s and 500, 250, 125, 100 and 50 kbit/s.
A device changed from the default constrains the rest of the network.

The CAN to Ethernet bridge does not terminate the bus, so terminate the CAN bus with 120 ohm resistors at each end.
Refer to the [bridge DB9 connector datasheet](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Datasheet/DB9_Connector.md).

For the parameters of each adapter, refer to [CAN bus adapter settings](CAN_Bus_Adapter_Settings.md).
