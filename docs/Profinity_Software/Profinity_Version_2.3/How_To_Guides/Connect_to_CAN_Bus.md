---
title: How to Connect to CAN Bus
description: "Connect Profinity to your CAN bus network using supported adapters like Peak USB, SocketCAN, Ewert Energy CANdapter, or Prohelion and Tritium CAN to Ethernet bridges."
---

# How to Connect to CAN Bus

Connect Profinity to your CAN bus network using a supported adapter.

## Prerequisites

- Profinity V2 installed
- A supported CAN bus adapter (Peak USB, SocketCAN, SocketCANd, Ewert Energy CANdapter, or a Prohelion or Tritium CAN to Ethernet bridge)
- Adapter drivers installed (if required)
- The `ComponentModify` permission, which allows components to be added

## Steps

### Step 1: Install Adapter Drivers (if required)

**For Peak USB Adapters:**

1. Install the Peak drivers before starting Profinity
2. Use Peak tools to verify the adapter is working
3. Verify the adapter appears in Device Manager (Windows)

**For SocketCAN (Linux/macOS):**

1. Ensure SocketCAN is enabled in your kernel (the SocketCAN adapter is not available on Windows)
2. Install socketcand if using remote SocketCAN, and allow UDP port 42000 through the firewall because SocketCANd adapters are discovered on that port
3. Verify CAN interfaces are available, and set the bit rate of the interface in the operating system because Profinity does not set it

**For CAN to Ethernet bridges:**

1. Power the bridge with 9 to 30 V DC on pin 9 of the DB9 connector (13.8 V nominal), because the bridge takes its power from the CAN connector
2. Allow UDP and TCP port 4876 through the firewall, which the Profinity installer does automatically
3. Place the PC and the bridge on the same subnet, ideally with a static IP address on the bridge (see [Supported Network Setups](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Supported_Network_Setups.md))

### Step 2: Connect Your Adapter

1. Connect your CAN bus adapter to your computer
   - USB adapter: Plug into USB port
   - Ethernet bridge: Connect to the network (or directly to the PC) with an Ethernet cable and press the reset button if the bridge has previously been on another network
   - SocketCAN: Configure CAN interface
2. Connect the adapter to your CAN bus network, which must be terminated with a 120 ohm resistor at each end because the CAN to Ethernet bridge does not terminate the bus
3. Verify physical connections are secure

### Step 3: Auto-Discover the Adapter

1. Navigate to the **ADD COMPONENT** window
2. Look for your adapter among the discovered adapters, which are shown at the top of the screen
3. Click on your adapter to add it

If your adapter does not appear among the discovered adapters, proceed to manual configuration.

### Step 4: Add Adapter Manually (if needed)

1. Click **ADD COMPONENT** in Profinity
2. Select **CAN Bus Adapter** or your specific adapter type
3. Enter adapter details:
   - **Name**: Give your adapter a unique name
   - **Type**: Select your adapter type
   - **Network Protocol**, **Tritium Protocol Version**, **IP Address** and **Bus Number**: For a Tritium CAN to Ethernet bridge, select UDP or TCP, select V1 or V2 to match the bridge, enter the IP address of the bridge (TCP only) and enter the bus number of the bridge
   - **Network Adapter**: Select the network interface (for the Virtual CAN to Ethernet Bridge)
   - **PCAN Channel ID** and **PCAN BaudRate**: For a Peak adapter
   - **Candapter COM Port** and **Candapter BaudRate**: For an Ewert Energy CANdapter
   - **Bus Name**: Select the CAN interface (for SocketCAN)
4. Click **Add** or **Save**

### Step 5: Configure Adapter Settings

1. Click on your adapter in the sidebar
2. Open **Change Settings** (top-right of the adapter dashboard)
3. Configure settings:
   - **Auto Connect**: Enable to auto-connect on startup
   - **Allow Loopback Traffic**: Enable if needed (Tritium adapters in UDP mode only)
   - **Bitrate**: Set the CAN bus bitrate where the adapter has one (the Peak and CANdapter baud rate settings, which default to 500 kbit/s), and match it to the network. A CAN to Ethernet bridge holds its bit rate (default 500 kbit/s) in the bridge firmware settings, as described in [CAN Bridge Configuration](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/User_Manual/Bridge_Configuration.md)
4. Click **Save**

### Step 6: Connect the Adapter

1. Click the **Connect** button on your adapter dashboard
2. Wait for the adapter to connect
3. Check the status indicator:
   - **Green**: Connected and receiving data
   - **Yellow**: Connected but no data arriving
   - **Red**: Connection error (check the [logs](../Getting_Started/Profinity_Log.md))
   - **Grey**: Not connected

### Step 7: Verify Connection

1. Check that the status indicator turns green
2. Open the **SEND & RECEIVED CAN** window under **CAN UTILITIES** in the side menu
3. Verify CAN messages are appearing in the activity panel
4. If no messages appear, check:
   - CAN bus bitrate matches network
   - Physical connections are correct
   - Adapter is properly powered

## Troubleshooting

**Adapter Not Discovered:**

- Check adapter is powered and connected
- Verify network connectivity (for Ethernet bridges), including that the PC and the bridge are in the same subnet, which causes most bridge issues (see the [Quickstart](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Quickstart.md))
- Check firewall settings (UDP and TCP port 4876 for bridges, and UDP port 42000 for SocketCANd)
- For a bridge over WiFi, check that the router passes broadcast UDP, and for a bridge across subnets add it manually over TCP because Auto Discovery relies on UDP heartbeats
- Verify drivers are installed

**No Data Arriving:**

- Verify CAN bus bitrate matches all devices
- Check physical CAN bus connections
- Ensure devices on CAN bus are powered
- Check adapter status for errors

**Connection Errors:**

- Check adapter logs in Profinity
- Verify adapter is not in use by another application, and for a bridge in TCP mode that no other client holds the single TCP connection that a bridge accepts
- Wait 30 seconds to a minute if the bridge was rapidly connected and disconnected, because the bridge then rejects TCP connections temporarily (see [Common Problems and Solutions](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/Common_Problems_And_Solutions.md))
- Restart Profinity and try again
- Check adapter documentation for specific issues

## Related Documentation

- [CAN Bus Adapters](../Components/Adaptors/CAN_Bus_Adapters.md) - the full adapter reference
- [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md) - general component setup
- [Virtual CAN Adapter](../Components/Adaptors/Virtual_CAN_Adapter.md) - using virtual adapters
- [CAN to Ethernet Bridge documentation](../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) - the bridge user manual, datasheet and troubleshooting
