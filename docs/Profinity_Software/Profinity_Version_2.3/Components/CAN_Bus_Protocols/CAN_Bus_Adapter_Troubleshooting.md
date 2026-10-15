---
title: CAN bus adapter troubleshooting
description: "Fix a CAN bus adapter that shows a yellow or red status, a CAN to Ethernet bridge that Auto Discovery does not find, or a bit rate mismatch on the bus."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# CAN bus adapter troubleshooting

This page covers the adapter status indicator, a CAN to Ethernet bridge that Auto Discovery does not find, and the bit rate that every device on a CAN bus must share.
The adapters are listed on [CAN bus adapters](CAN_Bus_Adapters.md).

## Adapter status

Once the adapter is added to the Profile, a coloured status indicator appears in the sidebar next to the device name.
Green is the state of a working adapter.

| Colour | Meaning |
| ------ | ------- |
| Green | Good: the adapter is connected and data is arriving. |
| Yellow | Warning: the adapter is connected but no data is arriving. |
| Red | Error: the [Profinity System Logs](../../Administration/Logs_Config.md) have the details. |
| Grey | Not applicable: the adapter is not connected. |

If the indicator is yellow, check that the bit rate matches the bus, that the bus is terminated and that another device is transmitting.
If it is red, read the Profinity System Logs, then check the Peak driver, the IP address and port of a TCP bridge or the interface name of a SocketCAN adapter.

## If a CAN to Ethernet bridge is not found

Profinity discovers a CAN to Ethernet bridge from the UDP heartbeat datagrams that the bridge sends periodically (refer to [Bridge Heartbeat](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/Bridge_Heartbeat.md)).
If the bridge does not appear in the **Discovered** category, check the following:

- The bridge and the PC are on the same subnet, because Auto Discovery does not work across subnets. Across subnets, add the bridge manually with its IP address and the TCP protocol.
- Any firewall allows UDP and TCP port 4876 for the bridge. For SocketCANd, the firewall must allow UDP port 42000 for discovery and TCP port 29536 (or the configured **Port**) for the connection.
- A WiFi router passes broadcast UDP.

The bridge documentation covers further troubleshooting: the [CAN to Ethernet bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md), the [Quickstart](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md), the [Supported Network Setups](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md) and [Common Problems and Solutions](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md).

## Set the same bit rate on every CAN device

Every device on the CAN bus, including the adapter that connects Profinity, must operate at the same bit rate to communicate.
Prohelion devices ship with a factory default of 500 kbit/s, which is also the default of the bridge, the Peak adapter and the CANdapter in Profinity.
Prohelion devices support 1 Mbit/s and 500, 250, 125, 100 and 50 kbit/s, so a device changed from the default constrains the rest of the network.
The CAN to Ethernet bridge does not terminate the bus, so terminate the CAN bus with 120 ohm resistors at each end (refer to the [bridge DB9 connector datasheet](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Datasheet/DB9_Connector.md)).

For the parameters of each adapter, refer to [CAN bus adapter settings](CAN_Bus_Adapter_Settings.md).
