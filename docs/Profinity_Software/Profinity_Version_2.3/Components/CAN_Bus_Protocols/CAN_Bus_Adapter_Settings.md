---
title: CAN bus adapter settings
description: "Look up the parameters and defaults for each CAN bus adapter: Tritium CAN to Ethernet bridge, SocketCANd, Peak, CANdapter, and native SocketCAN."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# CAN bus adapter settings

These are the parameters that Profinity asks for when a [CAN bus adapter](CAN_Bus_Adapters.md) is added manually.

## Adapter manual configuration

Manual configuration follows the same process as other components.
First [add the adapter](../../How_To_Guides/Add_Component_to_Profile.md) to the Profile.
Profinity then prompts for the following information about the device, and the **Change Settings** button at the top-right of the adapter dashboard changes these details later.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Name** | The name of the component. Must be unique. | The adapter name |
| **Auto Connect** | Enables the device automatically when the profile loads. | On |
| **Allow Loopback Traffic** | Echoes traffic back to the system itself, so the bridge receives the traffic that it sent. Only the Tritium adapters support this option, and only when the **Network Protocol** is UDP. | Off |

The remaining parameters depend on the type of adapter.

### Tritium CAN to Ethernet bridge

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Network Protocol** | `UDP` or `TCP`. | `UDP` |
| **Tritium Protocol Version** | `V1` or `V2`, which must match the protocol of the bridge. | `V1` |
| **IP Address** | The IP address of the bridge. Required for TCP and ignored for UDP. | `127.0.0.1` |
| **Bus Number** | The virtual bus number of the bridge, which lets several bridges on one Ethernet segment form separate virtual CAN buses. | 13 |
| **UDP TTL** | The time to live of the UDP packets that Profinity transmits. | 128 (1 to 1024) |
| **Forward Address** | For TCP only, the lowest CAN identifier that the bridge forwards over the TCP connection. | `0x0` |
| **Forward Address Range** | For TCP only, the size of the identifier range that the bridge forwards. | All CAN identifiers |

UDP is the default protocol of the bridge.
It uses the multicast group 239.255.60.60 on port 4876 and lets several clients share one bridge.
TCP is a reliable point-to-point connection to the IP address of the bridge on port 4876, and a physical bridge accepts only one TCP connection.
The forwarding settings are described in [CAN-TCP Bridging](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_TCP_Bridging.md).

The **Tritium Protocol Version** must match the bridge, because firmware V1 and V2 speak different protocols and V2 widens the bus identifier from 4 bits to 16 bits (refer to [CAN-UDP Bridging](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_UDP_Bridging.md) and [Fundamentals](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Fundamentals.md)).
Auto Discovery detects the version and sets it correctly, and refreshing the firmware of a V1 bridge updates it to V2.
Version 1 bridges support bus numbers 0 to 15, and Profinity accepts 0 to 13 for V1.
Version 2 bridges use a 16-bit bus number, and Profinity accepts 0 to 32767.
A profile can hold only one Tritium or Virtual adapter for each bus number.

Two bridges that share a bus number on one Ethernet network relay traffic between their CAN buses, so use this deliberately to join two CAN buses into one virtual bus (refer to [Network Topologies](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Network_Topologies.md)).
Give every other bridge a unique bus number, otherwise a message sent to one bridge is received by both.

A bridge adapter has no CAN bit rate parameter, because the bridge holds the bit rate (default 500 kbit/s).
The bridge firmware settings change the bit rate and also hold the static IP address option, the virtual bus number and the firmware version, as described in [CAN Bridge Configuration](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md).
A static IP address on the same subnet as the PC is the most reliable arrangement (refer to [Supported Network Setups](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

### SocketCANd

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Bus Name** | The name of the SocketCAN bus to connect to, such as `can0`. | `can0` |
| **IP Address** | The IP address of the machine running the socketcand daemon. | `127.0.0.1` |
| **Port** | The port the socketcand daemon listens on, from 1 to 65535. | 29536 |
| **Timeout** | The TCP timeout of the adapter in milliseconds, from 0 to 60000. | 2000 |

### Peak, CANdapter, and native SocketCAN

| Adapter | Parameters | Defaults |
|---------|------------|----------|
| Peak Systems | **PCAN Channel ID**, as shown by Auto Discovery, and **PCAN BaudRate** | `500K` |
| Peak Systems CAN FD | **Connect With CAN FD** and, when it is on, **PCAN BaudRate FD** (J2284_4 at 500 kbit/s with 2 Mbit/s data, or J2284_5 at 500 kbit/s with 5 Mbit/s data) | CAN FD off, J2284_4 |
| Ewert Energy CANdapter | **Candapter COM Port** and **Candapter BaudRate** | `500K` |
| Native SocketCAN | **Bus Name** of the interface, such as `can0`. The operating system sets the bit rate, not Profinity. | `can0` |

For the status colours of an adapter and the bit rate that every device on the bus must share, refer to [CAN bus adapter troubleshooting](CAN_Bus_Adapter_Troubleshooting.md).
