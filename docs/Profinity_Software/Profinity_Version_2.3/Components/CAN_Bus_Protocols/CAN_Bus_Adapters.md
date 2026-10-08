---
title: CAN Bus Adapters
description: "Add and configure CAN bus adapters including Prohelion and Tritium CAN to Ethernet bridges, Peak USB, SocketCAN, SocketCANd and Ewert Energy CANdapter."
---

# CAN Bus Adapters

An adapter connects Profinity to a Controller Area Network (CAN) bus. Profinity supports the following adapters.

| Adapter | Connection |
|---------|------------|
| [Prohelion and Tritium CAN to Ethernet bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md), listed as **Tritium Can to Ethernet Bridge** | Ethernet, over UDP or TCP |
| **Prohelion Virtual CAN to Ethernet Bridge**, covered on the [Virtual CAN Adapter](Virtual_CAN_Adapter.md) page | Ethernet, relaying to another adapter |
| SocketCANd, using the [socketcand](https://github.com/linux-can/socketcand) daemon | Ethernet, over TCP |
| [Peak CAN to USB Adapter](https://www.peak-system.com/PCAN-USB.199.0.html?&L=1), including a Peak adapter running CAN FD | USB |
| Ewert Energy CANdapter | USB (COM port) |
| Native [SocketCAN](https://docs.kernel.org/networking/can.html) | The local operating system, on Docker and Linux installs only |

Native SocketCAN is available when Profinity runs in [Docker](../../Installation/Docker_Installation.md) or on a Unix [zip installation](../../Installation/Zip_Installation.md), and is not available on Windows. SocketCAN is a Linux kernel feature.

!!! warning "Install the Peak Driver Before Starting Profinity"
    The Peak CAN to USB Adapter needs its driver installed before Profinity starts. Use the supplied Peak tools to confirm the adapter works, then add the adapter with Auto Discovery as normal.

Adapters are added in one of two ways, through Auto Discovery or manually.

## Adapter Auto Discovery

Auto Discovery finds the supported CAN bus adapters that are visible to Profinity. If an adapter is visible on the network but is not yet in the current Profile, a **Discovered** category appears in the **ADD COMPONENT** window and lists every adapter that Profinity can currently see. An adapter that is missing from the list has configuration issues that need [manual configuration](#adapter-manual-configuration), or is not discoverable.

<figure markdown>
![Add an adapter through Auto Discovery from the Discovered category](../../images/add_adapter_autodiscovery.png)
<figcaption>Add an Adapter via AutoDiscovery</figcaption>
</figure>

!!! info "Check the Network When a CAN to Ethernet Bridge Is Not Found"
    Profinity discovers a CAN to Ethernet bridge from the UDP heartbeat datagrams that the bridge sends periodically (see [Bridge Heartbeat](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/Bridge_Heartbeat.md)). If the bridge does not appear in the **Discovered** category, check the following.

    - The bridge and the PC are on the same subnet, because Auto Discovery does not work across subnets. Across subnets, add the bridge manually with its IP address and the TCP protocol.
    - Any firewall allows UDP and TCP port 4876 for the bridge. For SocketCANd, the firewall must allow UDP port 42000 for discovery and TCP port 29536 (or the configured `Port`) for the connection.
    - A WiFi router passes broadcast UDP.

    The bridge documentation covers further troubleshooting: the [CAN to Ethernet bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md), the [Quickstart](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md), the [Supported Network Setups](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md) and [Common Problems and Solutions](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md).

## Adapter Manual Configuration

Manual configuration follows the same process as other components. First [add the adapter](../../Getting_Started/Adding_New_Components.md) to the [Profile](../../Getting_Started/Profiles.md). Profinity then prompts for the following information about the device, and the **Change Settings** button at the top-right of the adapter dashboard changes these details later.

| Parameter                | Description                                               | Default |
|--------------------------|-----------------------------------------------------------|---------|
| `Name`                   | The name of the component. Must be unique.                | The adapter name |
| `Auto Connect`           | Enables the device automatically when Profinity starts.   | On |
| `Allow Loopback Traffic` | Echoes traffic back to the system itself, so the bridge receives the traffic that it sent. Only the Tritium adapters support this option, and only when the `Network Protocol` is UDP. | Off |

The remaining parameters depend on the type of adapter.

### Tritium CAN to Ethernet Bridge

| Parameter                 | Description                                                                                  | Default |
|---------------------------|----------------------------------------------------------------------------------------------|---------|
| `Network Protocol`        | `UDP` or `TCP`. | `UDP` |
| `Tritium Protocol Version` | `V1` or `V2`, which must match the protocol of the bridge. | `V1` |
| `IP Address`              | The IP address of the bridge. Required for TCP and ignored for UDP. | `127.0.0.1` |
| `Bus Number`              | The virtual bus number of the bridge, which lets several bridges on one Ethernet segment form separate virtual CAN buses. | 13 |
| `UDP TTL`                 | The time to live of the UDP packets that Profinity transmits. | 128 (1 to 1024) |
| `Forward Address` | For TCP only, the lowest CAN identifier that the bridge forwards over the TCP connection. | `0x0` |
| `Forward Address Range` | For TCP only, the size of the identifier range that the bridge forwards. | All CAN identifiers |

UDP is the default protocol of the bridge. It uses the multicast group 239.255.60.60 on port 4876 and lets several clients share one bridge. TCP is a reliable point-to-point connection to the IP address of the bridge on port 4876, and a physical bridge accepts only one TCP connection. The forwarding settings are described in [CAN-TCP Bridging](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_TCP_Bridging.md).

The `Tritium Protocol Version` must match the bridge, because firmware V1 and V2 speak different protocols and V2 widens the bus identifier from 4 bits to 16 bits (see [CAN-UDP Bridging](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_UDP_Bridging.md) and [Fundamentals](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Fundamentals.md)). Auto Discovery detects the version and sets it correctly, and refreshing the firmware of a V1 bridge updates it to V2. Version 1 bridges support bus numbers 0 to 15, and Profinity accepts 0 to 13 for V1. Version 2 bridges use a 16-bit bus number.

Two bridges that share a bus number on one Ethernet network relay traffic between their CAN buses, so use this deliberately to join two CAN buses into one virtual bus (see [Network Topologies](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Network_Topologies.md)). Give every other bridge a unique bus number, otherwise a message sent to one bridge is received by both.

A bridge adapter has no CAN bit rate parameter, because the bridge holds the bit rate (default 500 kbit/s). The bridge firmware settings change the bit rate and also hold the static IP address option, the virtual bus number and the firmware version, as described in [CAN Bridge Configuration](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md). A static IP address on the same subnet as the PC is the most reliable arrangement (see [Supported Network Setups](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

### SocketCANd

| Parameter    | Description                                                         | Default |
|--------------|---------------------------------------------------------------------|---------|
| `Bus Name`   | The name of the SocketCAN bus to connect to, such as `can0`.        | `can0` |
| `IP Address` | The IP address of the machine running the socketcand daemon.        | `127.0.0.1` |
| `Port`       | The port the socketcand daemon listens on, from 1 to 65535.         | 29536 |
| `Timeout`    | The TCP timeout of the adapter in milliseconds, from 0 to 60000.    | 2000 |

### Peak, CANdapter and Native SocketCAN

| Adapter | Parameters | Defaults |
|---------|------------|----------|
| Peak Systems | `PCAN Channel ID`, as shown by Auto Discovery, and `PCAN BaudRate` | `500K` |
| Peak Systems CAN FD | `Connect With CAN FD` and, when it is on, `PCAN BaudRate FD` (J2284_4 at 500 kbit/s with 2 Mbit/s data, or J2284_5 at 500 kbit/s with 5 Mbit/s data) | CAN FD off, J2284_4 |
| Ewert Energy CANdapter | `Candapter COM Port` and `Candapter BaudRate` | `500K` |
| Native SocketCAN | `Bus Name` of the interface, such as `can0`. The operating system sets the bit rate, not Profinity. | `can0` |

## Adapter Status

Once the adapter is added to the Profile, a coloured status indicator appears in the sidebar next to the device name. Green is the state of a working adapter.

| Colour | Meaning                                               |
| ------ | ----------------------------------------------------- |
| Green  | Good: the adapter is connected and data is arriving.       |
| Yellow | Warning: the adapter is connected but no data is arriving. |
| Red    | Error: the [Profinity log](../../Getting_Started/Profinity_Log.md) has the details. |
| Grey   | Not applicable: the adapter is not connected.                         |

If the indicator is yellow, check that the bit rate matches the bus, that the bus is terminated and that another device is transmitting. If it is red, read the Profinity log, then check the Peak driver, the IP address and port of a TCP bridge or the interface name of a SocketCAN adapter.

!!! info "Set the Same Bit Rate on Every CAN Device"
    Every device on the CAN bus, including the adapter that connects Profinity, must operate at the same bit rate to communicate. Prohelion devices ship with a factory default of 500 kbit/s, which is also the default of the bridge, the Peak adapter and the CANdapter in Profinity. Prohelion devices support 1 Mbit/s and 500, 250, 125, 100 and 50 kbit/s, so a device changed from the default constrains the rest of the network. The CAN to Ethernet bridge does not terminate the bus, so terminate the CAN bus with 120 ohm resistors at each end (see the [bridge DB9 connector datasheet](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Datasheet/DB9_Connector.md)).
