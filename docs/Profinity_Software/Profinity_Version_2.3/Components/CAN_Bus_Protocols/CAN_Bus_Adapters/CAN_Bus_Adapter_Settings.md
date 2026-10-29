---
title: CAN bus adapter settings
description: "Look up the parameters and defaults for each CAN bus adapter: Tritium CAN to Ethernet bridge, SocketCANd, Peak, CANdapter, and native SocketCAN."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# CAN bus adapter settings

These are the parameters that Profinity asks for when a [CAN bus adapter](index.md) is added manually.

## Adapter manual configuration

An adapter is added to a Profile in the same way as any other component, as described in [Add a component to a profile](../../../How_To_Guides/Add_Component_to_Profile.md).
Profinity prompts for the parameters on this page when the adapter is added.
The **Change Settings** button on the adapter dashboard changes them later.

Every adapter has the parameters in the following table.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Name** | The name of the component. Must be unique. | The adapter name |
| **Auto Connect** | Connects to the adapter when the profile loads. Refer to [Connections and reconnecting](../../Connections_and_Reconnecting.md). | On |

The remaining parameters depend on the type of adapter.

### Tritium CAN to Ethernet bridge

The **Tritium Can to Ethernet Bridge** adapter connects to a Prohelion or Tritium CAN to Ethernet bridge.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Network Protocol** | `UDP` or `TCP`. | `UDP` |
| **Tritium Protocol Version** | `V1` or `V2`. Must match the firmware of the bridge. | `V1` |
| **IP Address** | The IP address of the bridge. TCP only. | `127.0.0.1` |
| **Bus Number** | The virtual bus number of the bridge, from 0 to 13 for `V1` and 0 to 32767 for `V2`. | 13 |
| **UDP TTL** | The time to live of the UDP packets that Profinity transmits, from 1 to 1024. | 128 |
| **Forward Address** | The lowest CAN identifier that the bridge forwards. TCP only. | `0x0` |
| **Forward Address Range** | The size of the identifier range that the bridge forwards. TCP only. | All CAN identifiers |
| **Allow Loopback Traffic** | Shows the packets that the bridge receives back from its own transmissions. UDP only. | Off |

UDP uses the multicast group 239.255.60.60 on port 4876, so several clients can share one bridge.
TCP connects to the IP address of the bridge on port 4876, and a physical bridge accepts only one TCP connection.
The forwarding range is described in [CAN-TCP Bridging](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_TCP_Bridging.md).

Auto Discovery sets the **Tritium Protocol Version** to match the bridge firmware.
A profile can hold only one Tritium or Virtual adapter for each bus number.
Two bridges that share a bus number on one Ethernet network join their CAN buses into one virtual bus.
Give every bridge a unique bus number unless you are joining two buses deliberately.
Refer to [Network Topologies](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Network_Topologies.md).

The bridge holds the CAN bit rate (default 500 kbit/s), so this adapter has no bit rate parameter.
The bit rate, static IP address, and bus number of the bridge itself are set in the bridge firmware, as described in [CAN Bridge Configuration](../../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md).

### SocketCANd

The **SocketCANd Adapter** connects over TCP to the socketcand daemon on another machine.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Bus Name** | The SocketCAN interface on the machine running socketcand, such as `can0`. | `can0` |
| **IP Address** | The IP address of the machine running socketcand. | `127.0.0.1` |
| **Port** | The port that socketcand listens on, from 1 to 65535. | 29536 |
| **Timeout** | The TCP timeout in milliseconds, from 0 to 60000. | 2000 |

The machine running socketcand sets the bit rate of the interface, not Profinity.

### Peak CAN adapter

The **Peak Systems CAN Adapter** connects to a Peak CAN to USB adapter through the Peak driver.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **PCAN Channel ID** | The channel of the adapter: USB 01 to USB 16, LAN 01 to LAN 16, or PCI 01 to PCI 16, where PCI is Peripheral Component Interconnect. Auto Discovery fills it in. | USB 01 |
| **PCAN BaudRate** | 5K, 10K, 20K, 33K, 47K, 50K, 83K, 95K, 100K, 125K, 250K, 500K, 800K, or 1M Baud. | 500K Baud |

On Linux, a Peak adapter appears as a SocketCAN interface, so use the SocketCAN adapter instead (refer to [CAN bus adapters](index.md)).

### Peak CAN FD adapter

The **Peak Systems CANFD Adapter** connects to a Peak adapter that supports CAN with Flexible Data-rate (CAN FD).
It has the same **PCAN Channel ID** as the Peak CAN adapter, and the bit rate parameters in the following table.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Connect With CAN FD** | Runs the adapter in CAN FD mode. | Off |
| **PCAN BaudRate** | The classic CAN bit rate, used when **Connect With CAN FD** is off. Same values as the Peak CAN adapter. | 500K Baud |
| **PCAN BaudRate FD** | The CAN FD bit rate, used when **Connect With CAN FD** is on: J2284_4 (500 kbit/s, data 2 Mbit/s) or J2284_5 (500 kbit/s, data 5 Mbit/s). | J2284_4 |

### Ewert CANdapter

The **Ewert CANdapter** adapter connects to an Ewert Energy CANdapter over its USB serial port.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Candapter COM Port** | The USB serial port, such as `COM3` on Windows or `/dev/ttyUSB0` on Linux and macOS. Required. | None |
| **Candapter BaudRate** | 10K, 20K, 50K, 100K, 125K, 250K, 500K, 800K, or 1M Baud. | 500K Baud |

### Native SocketCAN

SocketCAN is the CAN interface of the Linux kernel.
The **SocketCAN Adapter** connects to a SocketCAN interface on the machine running Profinity, and is available on Docker and Linux installations only.

| Parameter | Description | Default |
|-----------|-------------|---------|
| **Bus Name** | The SocketCAN interface, such as `can0`. | `can0` |

The operating system sets the bit rate of the interface, not Profinity.

For the adapter status colours and the bit rate that every device on the bus must share, refer to [CAN bus adapter troubleshooting](CAN_Bus_Adapter_Troubleshooting.md).
