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

You need:

- A supported [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md), and its drivers where it needs them.
- A running Profinity with an active profile.
- The **Modify components** permission, as described in [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

## Prepare the adapter

### Peak USB adapters

Peak Universal Serial Bus (USB) adapters work on Windows and Linux.
These steps are for Windows.

1. Install the Peak drivers from PEAK-System before you start Profinity. As of November 2026, the drivers are on the [PEAK-System website](https://www.peak-system.com/).
2. Open PCAN-View, the Peak monitoring tool, and check that the adapter receives traffic.
3. On Windows, confirm that the adapter appears in Device Manager.

On Linux, a Peak adapter appears as a SocketCAN interface, so follow the SocketCAN steps instead.

### CANdapter

1. Plug the Ewert Energy CANdapter into a USB port.
2. Note its serial port, such as `COM3` in Device Manager on Windows or `/dev/ttyUSB0` on Linux and macOS. You choose it in **Candapter COM Port** when you add the adapter.

### SocketCAN

The SocketCAN adapter is available on Linux and Docker installations only, and it needs SocketCAN enabled in the kernel.

1. For remote SocketCAN, install socketcand, and allow User Datagram Protocol (UDP) port 42000 for discovery and the socketcand Transmission Control Protocol (TCP) port, 29536 by default, through the firewall.
2. Run `ip link show` and check that the CAN interface, such as `can0`, is listed.
3. Set the bit rate of the interface in the operating system, because Profinity uses the bit rate the interface already has. Replace `<interface>` with the interface name and `<bit rate>` with the bit rate of the bus, such as `500000`:

    ```bash
    sudo ip link set <interface> up type can bitrate <bit rate>
    ```

### CAN to Ethernet bridges

1. Power the bridge with 9 to 30 V direct current (DC), 13.8 V nominal, on pin 9 of its 9-pin D-subminiature (DB9) CAN connector, which is where the bridge takes its power from.
2. Allow UDP and TCP port 4876 through the firewall.
   On Windows, the Profinity installer adds this rule.
3. Place the PC and the bridge on the same subnet, ideally with a static Internet Protocol (IP) address on the bridge (refer to [Supported Network Setups](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md)).

## Cable the adapter

1. If you use a USB adapter, plug it into the computer's USB port.
2. If you use an Ethernet bridge, connect it to the network, or directly to the PC, with an Ethernet cable.
   Press the reset button if the bridge has previously been on another network.
3. Connect the adapter to the CAN bus network.
   The network needs a 120 ohm terminating resistor at each end, because the CAN to Ethernet bridge does not terminate the bus.
4. Confirm that the physical connections are secure.

## Add the adapter in Profinity

1. Select **ADD COMPONENT** in the side menu. The **ADD COMPONENT** page lists any adapters that Profinity discovered, above the component groups.
2. Select the discovered adapter. If it is not listed, select the adapter type and enter its settings, which [CAN bus adapter settings](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/CAN_Bus_Adapter_Settings.md) lists for each adapter.
3. Select **ADD COMPONENT** in the settings dialog. The adapter appears in the side menu.

## Connect the adapter and check for traffic

1. Select the adapter in the side menu.
2. If **Auto Connect** is off, select **Connect** on the adapter dashboard, and wait for the adapter to connect.
3. Check the status indicator next to the adapter in the side menu. A green indicator means the adapter is connected and data is arriving, and amber means it is connected with no data, as [Adapter status](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/CAN_Bus_Adapter_Troubleshooting.md#adapter-status) explains.
4. Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**, and check that messages appear in the CAN Activity panel. A user with only the **View CAN data** permission sees **RECEIVED CAN** instead.

| What you see | Cause | What to do |
|---|---|---|
| The adapter shows amber, and the CAN Activity panel stays empty | The adapter is connected, but no data arrives, because the bit rate differs from the bus, the bus is not terminated, or no device is transmitting. | Check the bit rate, the 120 ohm terminators, and that a device on the bus is sending. Refer to [CAN bus adapter troubleshooting](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/CAN_Bus_Adapter_Troubleshooting.md). |
| The adapter is not discovered | Discovery depends on the adapter type and the network. | Add the adapter by its type and enter its settings, as in step 2 of [Add the adapter in Profinity](#add-the-adapter-in-profinity). |
| The connection to the bridge fails | A bridge in TCP mode accepts one connection at a time, and one that was connected and disconnected rapidly rejects new TCP connections for a short time. | Check that no other program is connected to the bridge, wait 30 seconds to a minute, then select **Connect** on the adapter dashboard again. Refer to [Common Problems & Solutions](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md). |

Next, add the devices on the bus, such as a [Prohelion BMU](../Components/Battery_Management_Systems/Prohelion_BMU/index.md), and watch their messages as described in [How to send and receive CAN bus messages](./Send_Receive_CAN_Bus.md).
For the bridge manual and datasheet, refer to [CAN Bus to Ethernet Bridge](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md).
