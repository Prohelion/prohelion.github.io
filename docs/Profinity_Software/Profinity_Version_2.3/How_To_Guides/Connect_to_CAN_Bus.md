---
title: How to connect to CAN bus
description: "Connect Profinity to a CAN bus network with a Peak USB, SocketCAN, Ewert Energy CANdapter, or Prohelion or Tritium CAN to Ethernet bridge adapter."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to connect to CAN bus

Connect Profinity to your CAN bus network using a supported adapter.
The work has two halves: preparing and cabling the adapter, and adding the adapter to the profile, setting it up, connecting it and checking that messages arrive.

## Prerequisites

- Profinity V2 installed
- A supported [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) (Peak USB, SocketCAN, SocketCANd, Ewert Energy CANdapter, or a Prohelion or Tritium CAN to Ethernet bridge)
- Adapter drivers installed, where the adapter needs them
- The **Modify components** permission, which allows components to be added ([Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md))

## Prepare the adapter

### Peak USB adapters

1. Install the Peak drivers before starting Profinity.
2. Use the Peak tools to verify that the adapter is working.
3. On Windows, confirm that the adapter appears in Device Manager.

### SocketCAN

The SocketCAN adapter is not available on Windows, and it needs SocketCAN enabled in the kernel.

1. For remote SocketCAN, install socketcand and allow UDP port 42000 through the firewall, because SocketCANd adapters are discovered on that port.
2. Confirm that the CAN interfaces are available.
3. Set the bit rate of the interface in the operating system, because Profinity does not set it, for example `sudo ip link set can0 up type can bitrate 500000` on Linux.

The [CAN Bus Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) page gives the details of each adapter.

### CAN to Ethernet bridges

1. Power the bridge with 9 to 30 V DC on pin 9 of the DB9 connector (13.8 V nominal), because the bridge takes its power from the CAN connector.
2. Allow UDP and TCP port 4876 through the firewall, which the Profinity installer does automatically.
3. Place the PC and the bridge on the same subnet, ideally with a static IP address on the bridge (refer to [Supported Network Setups](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

## Cable the adapter

1. If you use a USB adapter, plug it into the computer's USB port.
2. If you use an Ethernet bridge, connect it to the network, or directly to the PC, with an Ethernet cable. Press the reset button if the bridge has previously been on another network.
3. If you use SocketCAN, configure the CAN interface as described in SocketCAN.
4. Connect the adapter to the CAN bus network, which must be terminated with a 120 ohm resistor at each end because the CAN to Ethernet bridge does not terminate the bus.
5. Confirm that the physical connections are secure.

## Add the adapter in Profinity

1. Select **ADD COMPONENT** in the side menu, and look for the adapter among the discovered adapters, which are shown at the top of the screen. If the adapter is listed, click it to add it.
2. If the adapter is not listed, select **CAN Bus Adapter** or the specific adapter type, and enter the adapter details.
3. Select **ADD COMPONENT** at the bottom of the dialog to add the adapter to the profile.

A manually added adapter asks for the following:

- **Name**: a unique name for the adapter
- **Type**: the adapter type
- **Network Protocol**, **Tritium Protocol Version**, **IP Address** and **Bus Number**: for a Tritium CAN to Ethernet bridge, select UDP or TCP, select V1 or V2 to match the bridge, enter the IP address of the bridge (TCP only) and enter the bus number of the bridge
- **Network Adapter**: the network interface, for the Virtual CAN to Ethernet Bridge
- **PCAN Channel ID** and **PCAN BaudRate**: for a Peak adapter
- **Candapter COM Port** and **Candapter BaudRate**: for an Ewert Energy CANdapter
- **Bus Name**: the CAN interface, for SocketCAN

## Set the adapter up and connect it

1. Click the adapter in the sidebar, open **Change Settings** (top right of the adapter dashboard), and save the adapter settings.
2. Click **Connect** on the adapter dashboard, and wait for the adapter to connect.
3. Check that the status indicator turns green, as defined in the colour table in [Adding Components to Your Profile](Add_Component_to_Profile.md). An adapter that is connected but sees no traffic shows yellow, and a red indicator means a connection error, so check the [logs](../Administration/Logs_Config.md).
4. Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN** (a user who holds only the **View CAN data** permission sees **RECEIVED CAN** instead), and confirm that messages appear in the CAN Activity panel. [How to Send and Receive CAN Bus Messages](./Send_Receive_CAN_Bus.md) describes the panel.

The adapter settings are:

- **Auto Connect**: enable to connect the adapter when the profile loads.
- **Allow Loopback Traffic**: enable where needed, which applies to Tritium adapters in UDP mode only.
- The bit rate, where the adapter has one: the **PCAN BaudRate** and **Candapter BaudRate** settings default to 500 kbit/s and must match the network. A CAN to Ethernet bridge holds its bit rate (default 500 kbit/s) in the bridge firmware settings, as described in [CAN Bridge Configuration](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md).

## Troubleshooting

### The adapter is not discovered

An adapter that does not appear at the top of the **ADD COMPONENT** screen is usually unpowered, disconnected, in a different subnet or blocked by a firewall, or its driver is missing.
Check that the adapter is powered and connected, that the drivers are installed, and that the firewall allows UDP and TCP port 4876 for bridges and UDP port 42000 for SocketCANd.
Most bridge problems come from the PC and the bridge being in different subnets (refer to the [Quickstart](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md)).
For a bridge over WiFi, check that the router passes broadcast UDP, and for a bridge across subnets add it manually over TCP, because Auto Discovery relies on UDP heartbeats.

### No data arrives

An adapter that is green or yellow with an empty CAN Activity panel usually has a bit rate that does not match the network, a loose or broken connection, or devices on the bus that are not powered.
Confirm that the bit rate matches every device on the bus, check the physical CAN bus connections, make sure the devices are powered, and look at the adapter status for errors.

### The connection fails

A red indicator after **Connect** means the adapter is held by another application, or the bridge refuses the connection.
Check the adapter logs in Profinity, and confirm that no other application is using the adapter and, for a bridge in TCP mode, that no other client holds the single TCP connection that a bridge accepts.
A bridge that was rapidly connected and disconnected rejects TCP connections temporarily, so wait 30 seconds to a minute (refer to [Common Problems and Solutions](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md)), and restart Profinity if the connection still fails.

## Related pages

- [Virtual CAN Adapter](../Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md): using virtual adapters
- [CAN to Ethernet Bridge documentation](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md): the bridge user manual, datasheet, and troubleshooting
