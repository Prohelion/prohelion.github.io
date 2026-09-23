---
title: How to Connect to CAN Bus
---

# How to Connect to CAN Bus

Connect Profinity to your CAN bus network using a supported adapter.

## Prerequisites

- Profinity V2 installed
- A supported CAN bus adapter (Peak USB, SocketCAN, CAN-Ethernet Bridge, etc.)
- Adapter drivers installed (if required)
- Access to create components in Profinity

## Steps

### Step 1: Install Adapter Drivers (if required)

**For Peak USB Adapters:**
1. Install the Peak drivers before starting Profinity
2. Use Peak tools to verify the adapter is working
3. Verify the adapter appears in device manager (Windows)

**For SocketCAN (Linux/macOS):**
1. Ensure SocketCAN is enabled in your kernel
2. Install socketcand if using remote SocketCAN
3. Verify CAN interfaces are available

### Step 2: Connect Your Adapter

1. Connect your CAN bus adapter to your computer
   - USB adapter: Plug into USB port
   - Ethernet bridge: Connect to network
   - SocketCAN: Configure CAN interface
2. Connect the adapter to your CAN bus network
3. Verify physical connections are secure

### Step 3: Auto-Discover the Adapter

1. Navigate to the **ADD COMPONENT** window
2. Look for the **Discovered** category
3. Your adapter should appear in the discovered list
4. Click on your adapter to add it

If your adapter doesn't appear in the discovered list, proceed to manual configuration.

### Step 4: Add Adapter Manually (if needed)

1. Click **ADD COMPONENT** in Profinity
2. Select **CAN Bus Adapter** or your specific adapter type
3. Enter adapter details:
   - **Name**: Give your adapter a unique name
   - **Type**: Select your adapter type
   - **Network Interface**: Select the network interface (for Ethernet bridges)
   - **CAN Interface**: Select CAN interface (for SocketCAN)
4. Click **Add** or **Save**

### Step 5: Configure Adapter Settings

1. Click on your adapter in the sidebar
2. Open **Change Settings** (gear icon)
3. Configure settings:
   - **Auto Connect**: Enable to auto-connect on startup
   - **Allow Loopback Traffic**: Enable if needed (Tritium adapters only)
   - **Bitrate**: Set CAN bus bitrate (must match network)
4. Click **Save**

### Step 6: Connect the Adapter

1. Click the **Connect** button on your adapter dashboard
2. Wait for the adapter to connect
3. Check the status indicator:
   - **Green**: Connected and receiving data
   - **Yellow**: Connected but no data arriving
   - **Red**: Connection error (check logs)
   - **Grey**: Not connected

### Step 7: Verify Connection

1. Check that the status indicator turns green
2. Open the **SEND & RECEIVE CAN** window
3. Verify CAN messages are appearing in the activity panel
4. If no messages appear, check:
   - CAN bus bitrate matches network
   - Physical connections are correct
   - Adapter is properly powered

## Troubleshooting

**Adapter Not Discovered:**
- Check adapter is powered and connected
- Verify network connectivity (for Ethernet bridges)
- Check firewall settings
- Verify drivers are installed

**No Data Arriving:**
- Verify CAN bus bitrate matches all devices
- Check physical CAN bus connections
- Ensure devices on CAN bus are powered
- Check adapter status for errors

**Connection Errors:**
- Check adapter logs in Profinity
- Verify adapter is not in use by another application
- Restart Profinity and try again
- Check adapter documentation for specific issues

## Related Documentation

- [CAN Bus Adapters](../Components/Adaptors/CAN_Bus_Adapters.md) - Complete adapter documentation
- [Adding New Components](../Getting_Started/Adding_New_Components.md) - General component setup
- [Virtual CAN Adapter](../Components/Adaptors/Virtual_CAN_Adapter.md) - Using virtual adapters
