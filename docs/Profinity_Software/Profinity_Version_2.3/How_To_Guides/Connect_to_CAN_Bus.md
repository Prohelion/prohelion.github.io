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
- The **Modify components** permission, which allows components to be added ([Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md))

## Prepare the adapter

### Peak USB adapters

1. Install the Peak drivers before starting Profinity.
2. Use the Peak tools to verify that the adapter is working.
3. On Windows, confirm that the adapter appears in Device Manager.

### SocketCAN

The SocketCAN adapter is not available on Windows, and it needs SocketCAN enabled in the kernel.

1. For remote SocketCAN, install socketcand and allow UDP port 42000 through the firewall.
   Profinity discovers SocketCANd adapters on that port.
2. Confirm that the CAN interfaces are available.
3. Set the bit rate of the interface in the operating system, because Profinity does not set it.
   On Linux, for example, run `sudo ip link set can0 up type can bitrate 500000`.

[CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) gives the details of each adapter.

### CAN to Ethernet bridges

1. Power the bridge with 9 to 30 V DC on pin 9 of the DB9 connector (13.8 V nominal).
   The bridge takes its power from the CAN connector.
2. Allow UDP and TCP port 4876 through the firewall.
   The Profinity installer does this automatically.
3. Place the PC and the bridge on the same subnet, ideally with a static IP address on the bridge (refer to [Supported Network Setups](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

## Cable the adapter

1. If you use a USB adapter, plug it into the computer's USB port.
2. If you use an Ethernet bridge, connect it to the network, or directly to the PC, with an Ethernet cable.
   Press the reset button if the bridge has previously been on another network.
3. If you use SocketCAN, make sure the CAN interface is up, as described in the [SocketCAN](#socketcan) section.
4. Connect the adapter to the CAN bus network.
   The network must have a 120 ohm terminating resistor at each end, because the CAN to Ethernet bridge does not terminate the bus.
5. Confirm that the physical connections are secure.

## Add the adapter in Profinity

1. Select **ADD COMPONENT** in the side menu.
   Profinity shows discovered adapters at the top of the screen.
2. If the adapter is listed, select it to add it.
3. If the adapter is not listed, select **CAN Bus Adapter** or the specific adapter type, and enter the adapter details.
4. Select **ADD COMPONENT** at the bottom of the dialog to add the adapter to the profile.

A manually added adapter asks for these settings:

- **Name**: a unique name for the adapter
- **Type**: the adapter type
- For a Tritium CAN to Ethernet bridge:
    - **Network Protocol**: UDP or TCP
    - **Tritium Protocol Version**: V1 or V2, to match the bridge
    - **IP Address**: the IP address of the bridge (TCP only)
    - **Bus Number**: the bus number of the bridge
- **Network Adapter**: the network interface, for the Virtual CAN to Ethernet Bridge
- **PCAN Channel ID** and **PCAN BaudRate**: for a Peak adapter
- **Candapter COM Port** and **Candapter BaudRate**: for an Ewert Energy CANdapter
- **Bus Name**: the CAN interface, for SocketCAN

## Set the adapter up and connect it

1. Select the adapter in the sidebar.
2. Open **Change Settings** at the top right of the adapter dashboard, and save the adapter settings.
3. Select **Connect** on the adapter dashboard, and wait for the adapter to connect.
4. Check that the status indicator turns green, as the colour table in [How to add a component to your profile](Add_Component_to_Profile.md) defines.
   An adapter that is connected but receives no packets for more than 5 seconds shows amber, except a Peak adapter, which stays green on a quiet bus.
   An adapter that is not connected shows **Off**, and a Peak adapter shows red when its connection fails.
   In either case, check the [logs](../Administration/Logs_Config.md).
5. Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**, and confirm that messages appear in the CAN Activity panel.
   A user who holds only the **View CAN data** permission sees **RECEIVED CAN** instead.
   [How to send and receive CAN bus messages](./Send_Receive_CAN_Bus.md) describes the panel.

The adapter settings are:

- **Auto Connect**: enable to connect the adapter when the profile loads.
- **Allow Loopback Traffic**: enable where needed, which applies to Tritium adapters in UDP mode only.
- The bit rate, where the adapter has one.
  The **PCAN BaudRate** and **Candapter BaudRate** settings default to 500 kbit/s and must match the network.
  A CAN to Ethernet bridge holds its bit rate (default 500 kbit/s) in the bridge firmware settings, as [CAN Bridge Configuration](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md) describes.

## Troubleshooting

### The adapter is not discovered

An adapter that does not appear at the top of the **ADD COMPONENT** screen has one of these causes:

- It is unpowered or disconnected.
- It is in a different subnet, or a firewall blocks it.
- Its driver is missing.

Check that the adapter is powered and connected, and that the drivers are installed.
Check that the firewall allows UDP and TCP port 4876 for bridges and UDP port 42000 for SocketCANd.
Most bridge problems come from the PC and the bridge being in different subnets (refer to the [Quickstart](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md)).
For a bridge over WiFi, check that the router passes broadcast UDP.
For a bridge across subnets, add it manually over TCP, because Auto Discovery relies on UDP heartbeats.

### No data arrives

An adapter that is green or amber with an empty CAN Activity panel usually has one of these causes:

- The bit rate does not match the network.
- A connection is loose or broken.
- Devices on the bus are not powered.

Confirm that the bit rate matches every device on the bus.
Check the physical CAN bus connections, and make sure the devices are powered.
Look at the adapter status for errors.

### The connection fails

An adapter that stays **Off**, or a Peak adapter that turns red, after **Connect** means another application holds the adapter, or the bridge refuses the connection.
Check the adapter logs in Profinity, and confirm that no other application is using the adapter.
For a bridge in TCP mode, also confirm that no other client holds the single TCP connection that a bridge accepts.
A bridge that was connected and disconnected rapidly rejects TCP connections for a short time.
Wait 30 seconds to a minute (refer to [Common Problems & Solutions](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md)), and restart Profinity if the connection still fails.

## Related pages

- [Prohelion Virtual CAN Bus Adapter](../Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md): using virtual adapters
- [CAN Bus to Ethernet Bridge](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md): the bridge user manual, datasheet, and troubleshooting
