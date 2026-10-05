---
title: CAN bus Adapters
description: "Add and configure CAN bus adapters including Prohelion and Tritium CAN to Ethernet bridges, Peak USB, SocketCAN, SocketCANd and Ewert Energy CANdapter."
---

# CAN bus Adapters

An adapter is the technology used to connect Profinity to your CAN bus network.

Profinity on Windows supports the [Prohelion and Tritium CAN to Ethernet bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) (listed as `Tritium Can to Ethernet Bridge`, with the `Prohelion Virtual CAN to Ethernet Bridge` covered on the [Virtual CAN Adapter](Virtual_CAN_Adapter.md) page), SocketCAN via native SocketCAN on Unix and over TCP by using the [SocketCanD](https://github.com/linux-can/socketcand) technology, the [Peak CAN to USB Adapter](https://www.peak-system.com/PCAN-USB.199.0.html?&L=1) (including a Peak adapter running CAN FD), and the Ewert Energy CANdapter.

!!! info "When running the Peak CAN to USB Adapter"
    It is necessary to install the driver for the device before starting Profinity. Use the supplied Peak tools to ensure your adapter is working as expected before starting Profinity, and then autodiscover the adapter as normal.

When running Profinity on [Docker](../../Installation/Docker_Installation.md) or on [macOS / Unix](../../Installation/Zip_Installation.md), additional support is also provided for the native [SocketCAN adapter](https://docs.kernel.org/networking/can.html), which is not available on Windows.

Adapters can be added in one of two ways, either via Auto Discovery or manually.

## Adapter Auto Discovery

In many cases the supported CAN bus adapters can be found automatically via the Auto Discovery mechanism.

If an adapter is defined and visible on the network but is not currently associated with the current Profile, then a `Discovered` category will appear in the `ADD COMPONENT` window. The `Discovered` category lists all of the adapters that are currently visible to Profinity. If an adapter does not appear there, it either has configuration issues that need to be addressed [manually](#adapter-manual-configuration) or is not currently discoverable.

<figure markdown>
![Add an Adapter via AutoDiscovery](../../images/add_adapter_autodiscovery.png)
<figcaption>Add an Adapter via AutoDiscovery</figcaption>
</figure>

!!! info "CAN over Ethernet bridge not found by Auto Discovery"
    A CAN to Ethernet bridge is discovered from the UDP heartbeat datagrams that the bridge sends periodically (see [Bridge Heartbeat](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/Bridge_Heartbeat.md)), so the bridge and the PC must be on the same subnet, any firewall must allow UDP and TCP port 4876 (and UDP port 42000 for SocketCanD, which Profinity opens when it is installed), and a WiFi router must pass broadcast UDP. Auto Discovery does not work across subnets, in which case the bridge is added manually with its IP address and the TCP protocol. The bridges have a number of configuration options and at times do not behave as expected, so see the documentation on the [CAN to Ethernet bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md), the [Quickstart](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md), the [Supported Network Setups](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md) and [Common Problems and Solutions](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md) for troubleshooting advice.

## Adapter Manual Configuration

Configuring a CAN bus adapter manually follows a very similar process to other components.

First, [add the adapter](../../Getting_Started/Adding_New_Components.md) to your Profile. When a CAN bus adapter is added, Profinity prompts for the following information about the device, and these details can be changed later with the `Change Settings` button at the top-right of the adapter dashboard.

| Parameter                | Description                                               |
|--------------------------|-----------------------------------------------------------|
| `Name`                   | The name of the component. Must be unique.                |
| `Auto Connect`           | Automatically enables the device when starting Profinity. |
| `Allow Loopback Traffic` | Allows loopback traffic, which echoes traffic back to the system itself. Only the Tritium adapters support this option, and only when the Network Protocol is UDP, in which case the bridge receives the traffic that it has sent itself. |

The remaining parameters depend on the type of adapter. A Tritium CAN to Ethernet bridge adapter asks for the following.

| Parameter                 | Description                                                                                  |
|---------------------------|----------------------------------------------------------------------------------------------|
| `Network Protocol`        | `UDP` or `TCP`. UDP is the default protocol of the bridge, uses the multicast group 239.255.60.60 on port 4876, and allows several clients to share one bridge, whereas TCP is a point-to-point connection to the IP address of the bridge on port 4876, is reliable, and is limited to one TCP connection per physical bridge. |
| `Tritium Protocol Version` | `V1` or `V2`, which must match the protocol of the bridge (see the version note below). |
| `IP Address`              | The IP address of the bridge, which is required for a TCP connection and ignored for UDP.    |
| `Bus Number`              | The virtual bus number of the bridge, which allows several bridges on one Ethernet segment to form separate virtual CAN buses. Version 1 bridges support bus numbers 0 to 15 (Profinity accepts 0 to 13 for V1), and version 2 bridges use a 16-bit bus number. |
| `UDP TTL`                 | The time to live of the UDP packets that Profinity transmits, which defaults to 128. |
| `Forward Address` and `Forward Address Range` | For a TCP connection only, the lowest CAN identifier that the bridge forwards over the TCP connection and the size of the identifier range that is forwarded, which by default cover every CAN identifier (see [CAN-TCP Bridging](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_TCP_Bridging.md)). |

The `Tritium Protocol Version` must match the bridge because the bridge firmware has two major releases, V1 and V2, which speak different protocols, where V2 widens the bus identifier from 4 bits to 16 bits (see [CAN-UDP Bridging](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Ethernet_Interface/CAN_UDP_Bridging.md) and [Fundamentals](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Fundamentals.md)). A V1 bridge can be updated to V2 by refreshing its firmware, Auto Discovery identifies the version of the bridge and sets it correctly, and Profinity works with both versions provided that the version is correct in the adapter settings. Two bridges that share a bus number on one Ethernet network relay traffic between their CAN buses, which is intended only when two CAN buses are joined into one virtual bus (see [Network Topologies](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Network_Topologies.md)), so every other bridge needs a unique bus number, otherwise a message sent to one bridge is received by both.

A bridge adapter does not have a CAN bit rate parameter, because the bit rate is held in the bridge itself (default 500 kbit/s) and is changed through the bridge firmware settings, which also hold the static IP address option, the virtual bus number and the firmware version, as described in [CAN Bridge Configuration](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md). Setting the bridge to a static IP address on the same subnet as the PC is the most reliable arrangement (see [Supported Network Setups](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

A Peak Systems adapter asks for the `PCAN Channel ID` shown by Auto Discovery and a `PCAN BaudRate` (default 500K), a Peak Systems CANFD adapter adds the `Connect With CAN FD` option and an FD bit rate, an Ewert Energy CANdapter asks for the `Candapter COM Port` and `Candapter BaudRate` (default 500K), and a SocketCAN adapter asks for the `Bus Name` of the interface (for example `can0`), whose bit rate is set in the operating system rather than in Profinity.

## Adapter Status

Once your adapter has been added to the Profile, a coloured status indicator is displayed in the sidebar next to the device name, and a green circle is the expected state. The colour signals for the adapters are as follows:

| Colour   | Meaning                                               |
| -------- | ----------------------------------------------------- |
| `Green`  | Good, adapter is connected and data is arriving       |
| `Yellow` | Warning, adapter is connected but no data is arriving |
| `Red`    | Error, see the logs for more details                  |
| `Grey`   | N/A, adapter is not connected                         |

!!! info "CAN bus bitrate"
    In order for all of the devices on your CAN bus to communicate, they must all be operating at the same bitrate, including the CAN bus adapter that connects Profinity to your CAN bus. Prohelion devices ship with a factory default of 500 kbit/s, which is the default of the bridge, the Peak adapter and the CANdapter in Profinity, and the Prohelion devices support 1 Mbit/s, 500, 250, 125, 100 and 50 kbit/s, so a device that is changed from the default constrains the other devices in the network and should be considered when designing your system. The CAN to Ethernet bridge does not terminate the bus, so the CAN bus must be terminated with 120 ohm resistors at each end (see the [bridge DB9 connector datasheet](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Datasheet/DB9_Connector.md)).
