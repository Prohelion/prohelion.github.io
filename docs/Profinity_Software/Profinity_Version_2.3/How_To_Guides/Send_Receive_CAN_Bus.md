---
title: How to Send and Receive CAN Bus Messages
description: "Send and receive CAN bus messages using Profinity's built-in tools for manual and scheduled packet transmission."
---

# How to Send and Receive CAN Bus Messages

Send and receive CAN bus messages using Profinity's built-in CAN tools.

## Prerequisites

- Profinity V2 installed and running
- CAN bus adapter connected and active
- A role that includes the `CANView` permission to receive and view CAN messages, and `CANSend` to send them
- Active profile with adapter configured

## Steps

### Step 1: Check User Permissions

1. Open the pill menu (top-right) and select **Users & Groups**
2. Click your user account
3. Ensure one of the **Assigned roles** includes `CANView`, which allows CAN messages to be received and viewed
4. To send messages, ensure an assigned role includes `CANSend`, which also includes `CANView`
5. Click **Save**

Changing a user's roles revokes their active sessions, so the user must sign in again for the change to take effect.

### Step 2: Open the Send & Receive CAN Window

1. Click on **SEND & RECEIVE CAN** in the menu
2. The CAN Activity window opens
3. All CAN messages currently on the network are shown

### Step 3: View Received CAN Messages

The CAN Activity panel shows:

- **CAN ID**: Message identifier
- **Data**: Message data bytes
- **Direction**: Incoming or outgoing
- **Count**: Number of times message was seen
- **Time**: Timestamp of last message

**View Options:**

- **Spaced Data**: breaks data into individual hex bytes (default: on)
- **Heatmap**: highlights frequently changing bytes in warmer colours and relatively constant bytes in cooler colours (default: on)

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

4. **Interval (ms)**: Set how often to send (for example, 100 ms sends the packet 10 times per second)
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
2. Delete the packet, as logging off does not stop a scheduled packet
3. The packet stops sending

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

- **Test First**: send packets manually before scheduling
- **Monitor Activity**: watch the CAN Activity panel to see your messages
- **Check Network Expectations**: ensure the CAN ID, data format and CAN bus bitrate match what the network expects
- **Use Heatmap**: the heatmap helps identify active messages
- **Save Packets**: scheduled packets are saved in your profile

## Important Notes

- **Scheduled Packets Continue**: scheduled packets continue sending even after logging off, so delete the packet to stop it
- **Profile-Based**: scheduled packets are saved with your profile
- **Manual Restart**: packets do not start automatically after a profile change or restart

## Troubleshooting

**Packet Not Sending:**

- Check adapter is connected (green status)
- Verify the user has the `CANSend` permission
- Check CAN ID is valid
- Ensure interval is set or use manual send

**Packet Not Appearing in Activity:**

- Check filters are not hiding your message
- Verify adapter is receiving traffic
- Check CAN bus bitrate matches

**Wrong Data Format:**

- Verify endian setting matches your system
- Check data format conversion (bytes vs. integers)
- Review raw data to confirm values

## Related Documentation

- [Send / Receive CAN](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md) - the full CAN utilities reference
- [Connect to CAN Bus](./Connect_to_CAN_Bus.md) - Setting up CAN adapters
- [CAN Bus Adapters](../Components/Adaptors/CAN_Bus_Adapters.md) - Adapter documentation
