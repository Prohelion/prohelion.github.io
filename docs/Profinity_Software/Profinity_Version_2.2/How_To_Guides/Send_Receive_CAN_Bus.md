---
title: How to Send and Receive CAN Bus Messages
---

# How to Send and Receive CAN Bus Messages

Send and receive CAN bus messages using Profinity's built-in CAN tools.

## Prerequisites

- Profinity V2 installed and running
- CAN bus adapter connected and active
- User privileges to send/receive CAN messages
- Active profile with adapter configured

## Steps

### Step 1: Enable User Privileges

1. Navigate to **ADMIN** → **Users**
2. Select your user account
3. Ensure **Send CAN Messages** privilege is enabled
4. Ensure **Receive CAN Messages** privilege is enabled
5. Click **Save**

### Step 2: Open the Send & Receive CAN Window

1. Click on **SEND & RECEIVE CAN** in the menu
2. The CAN Activity window will open
3. You'll see all CAN messages currently on the network

### Step 3: View Received CAN Messages

The CAN Activity panel shows:

- **CAN ID**: Message identifier
- **Data**: Message data bytes
- **Direction**: Incoming or outgoing
- **Count**: Number of times message was seen
- **Time**: Timestamp of last message

**View Options:**
- **Spaced Data**: Breaks data into individual hex bytes (default: on)
- **Heatmap**: Highlights frequently changing bytes in warm colours (default: on)

### Step 4: Filter and Sort Messages

1. Click column headers to sort by that column
2. Use filters to show specific CAN IDs or data patterns
3. Click on a message to see details

### Step 5: Add a Scheduled CAN Packet

1. Click the **+** icon in the Scheduled CAN Packets panel (bottom of window)
2. Or double-click a message in the CAN Activity panel and click **+**

### Step 6: Configure the CAN Packet

1. **CAN ID**: Enter the CAN message ID (hex or decimal)
2. **Endian**: Select byte order (default: little endian)
3. **Data Format**: Choose how to enter data:
   - **Bytes**: Enter individual byte values
   - **Int16**: Enter 16-bit integer values
   - **Int32**: Enter 32-bit integer values
   - **Floats**: Enter floating-point values
   - **Raw Data**: Enter raw hex data

4. **Interval (ms)**: Set how often to send (e.g., 100ms = 10 times per second)
   - Leave blank for manual send only

### Step 7: Enter Message Data

**Example - Entering Bytes:**
- Byte 0: `0x01`
- Byte 1: `0x02`
- Byte 2: `0x03`
- Raw data updates automatically

**Example - Entering Int16:**
- Int16[0]: `1234`
- Int16[1]: `5678`
- Values are converted to bytes automatically

### Step 8: Save the Packet

1. Click **Save** to add packet to scheduled list
2. Packet appears in Scheduled CAN Packets panel
3. If interval is set, packet starts sending automatically

### Step 9: Send Packet Manually (if not scheduled)

1. Select the packet in Scheduled CAN Packets panel
2. Click the **Send** arrow button
3. Or select the packet and press **Space** key
4. Packet is sent immediately

### Step 10: Verify Packet Transmission

1. Check the CAN Activity panel
2. Your sent message should appear with outgoing direction
3. Verify the CAN ID and data match your configuration

## Managing Scheduled Packets

### Stop a Scheduled Packet

1. Select the packet in Scheduled CAN Packets panel
2. Delete the interval value or delete the packet
3. Packet stops sending

### Edit a Scheduled Packet

1. Select the packet in Scheduled CAN Packets panel
2. Click **Edit** or double-click
3. Modify settings
4. Click **Save**

### Delete a Scheduled Packet

1. Select the packet in Scheduled CAN Packets panel
2. Click **Delete** or press **Delete** key
3. Packet is removed from schedule

## Tips

- **Test First**: Send packets manually before scheduling
- **Monitor Activity**: Watch CAN Activity panel to see your messages
- **Check Bitrate**: Ensure CAN ID and data format match network expectations
- **Use Heatmap**: Heatmap helps identify active messages
- **Save Packets**: Scheduled packets are saved in your profile

## Important Notes

- **Scheduled Packets Continue**: Scheduled packets continue sending even after logging off
- **Profile-Based**: Scheduled packets are saved with your profile
- **Manual Restart**: Packets don't auto-start after profile change or restart

## Troubleshooting

**Packet Not Sending:**
- Check adapter is connected (green status)
- Verify user has send privileges
- Check CAN ID is valid
- Ensure interval is set or use manual send

**Packet Not Appearing in Activity:**
- Check filters aren't hiding your message
- Verify adapter is receiving traffic
- Check CAN bus bitrate matches

**Wrong Data Format:**
- Verify endian setting matches your system
- Check data format conversion (bytes vs. integers)
- Review raw data to confirm values

## Related Documentation

- [Send/Receive CAN Messages](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md) - Complete CAN utilities guide
- [Connect to CAN Bus](./Connect_to_CAN_Bus.md) - Setting up CAN adapters
- [CAN Bus Adapters](../Components/Adaptors/CAN_Bus_Adapters.md) - Adapter documentation
