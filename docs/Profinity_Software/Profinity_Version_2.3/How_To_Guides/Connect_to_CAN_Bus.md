---
title: How to connect to CAN bus
description: "Connect Profinity to a CAN bus network with a Peak USB, SocketCAN, Ewert Energy CANdapter, or Prohelion or Tritium CAN to Ethernet bridge adapter."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# How to connect to CAN bus

Connect Profinity to a CAN bus network with a supported adapter, and check that messages arrive.
You prepare and cable the adapter, add it to the profile, connect it, and look for traffic.

You need a supported [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md), the adapter's drivers where it needs them, a running Profinity with an active profile, and the **Modify components** permission ([Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).

## Prepare the adapter

### Peak USB adapters

1. Install the Peak drivers before starting Profinity.
2. Use the Peak tools to verify that the adapter is working.
3. On Windows, confirm that the adapter appears in Device Manager.

On Linux, a Peak adapter appears as a SocketCAN interface, so follow the SocketCAN steps instead.

### SocketCAN

The SocketCAN adapter is available on Linux and Docker installations only, and it needs SocketCAN enabled in the kernel.

1. For remote SocketCAN, install socketcand and allow UDP port 42000 for discovery and the socketcand TCP port, 29536 by default, through the firewall.
2. Confirm that the CAN interfaces are available.
3. Set the bit rate of the interface in the operating system, because Profinity does not set it.
   On Linux, for example, run `sudo ip link set can0 up type can bitrate 500000`.

### CAN to Ethernet bridges

1. Power the bridge with 9 to 30 V DC on pin 9 of the DB9 connector (13.8 V nominal).
   The bridge takes its power from the CAN connector.
2. Allow UDP and TCP port 4876 through the firewall.
   On Windows, the Profinity installer adds this rule.
3. Place the PC and the bridge on the same subnet, ideally with a static IP address on the bridge (refer to [Supported Network Setups](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

## Cable the adapter

1. If you use a USB adapter, plug it into the computer's USB port.
2. If you use an Ethernet bridge, connect it to the network, or directly to the PC, with an Ethernet cable.
   Press the reset button if the bridge has previously been on another network.
3. Connect the adapter to the CAN bus network.
   The network needs a 120 ohm terminating resistor at each end, because the CAN to Ethernet bridge does not terminate the bus.
4. Confirm that the physical connections are secure.

## Add the adapter in Profinity

1. Select **ADD COMPONENT** in the side menu.
   Profinity shows discovered adapters at the top of the screen.
2. If the adapter is listed, select it to add it.
   Otherwise, select the adapter type and enter its settings, which [CAN bus adapter settings](../Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Settings.md) lists for each adapter.
3. Select **ADD COMPONENT** at the bottom of the dialog.

## Connect the adapter and check for traffic

1. Select the adapter in the sidebar.
2. If **Auto Connect** is off, select **Connect** on the adapter dashboard, and wait for the adapter to connect.
3. Check the status indicator, which [CAN bus adapter troubleshooting](../Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Troubleshooting.md#adapter-status) explains.
   Green means the adapter is connected and data is arriving.
4. Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**, and confirm that messages appear in the CAN Activity panel.
   A user who holds only the **View CAN data** permission sees **RECEIVED CAN** instead.
   [How to send and receive CAN bus messages](./Send_Receive_CAN_Bus.md) describes the panel.

If the adapter is not discovered, shows amber or red, or the panel stays empty, refer to [CAN bus adapter troubleshooting](../Components/CAN_Bus_Protocols/CAN_Bus_Adapter_Troubleshooting.md).

A bridge in TCP mode accepts one connection at a time, and one that was connected and disconnected rapidly rejects new TCP connections for a short time.
If the connection fails, confirm that no other client holds the bridge, wait 30 seconds to a minute (refer to [Common Problems & Solutions](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md)), and restart Profinity if it still fails.

For the bridge user manual, datasheet, and troubleshooting, refer to [CAN Bus to Ethernet Bridge](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md).
To relay traffic with a virtual adapter, refer to [Prohelion Virtual CAN Bus Adapter](../Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md).
