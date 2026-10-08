---
title: How to Send and Receive CAN Bus Messages
description: "Send and receive CAN bus messages using Profinity's built-in tools for manual and scheduled packet transmission."
---

# How to Send and Receive CAN Bus Messages

Send and receive CAN bus messages using Profinity's built-in CAN tools. Receiving shows the traffic on the bus, and sending transmits a packet once or on a schedule.

## Prerequisites

- Profinity V2 installed and running
- [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) connected and active
- A [role](../Administration/Users_and_Access/Roles_and_Permissions.md) that includes the **View CAN data** permission to receive and view CAN messages, and **Send CAN messages** to send them
- Active [profile](../Getting_Started/Profiles.md) with adapter configured

## Check User Permissions

On a Server or Enterprise installation, select **ADMIN** in the side menu, then **Users & Groups**, click your user account, and check that one of the **Assigned roles** includes **View CAN data**, which allows CAN messages to be received and viewed. To send messages, check that an assigned role includes **Send CAN messages**, which also includes **View CAN data**. Change the roles if needed and click **Save**. Changing a user's roles revokes their active sessions, so the user must sign in again for the change to take effect. A Desktop installation runs as a built-in user that holds every permission, so it needs no change (see [Licensing](../Administration/Licensing.md)).

## Receive CAN Messages

Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**, which opens the CAN Activity window showing all CAN messages currently on the network. A user who holds only **View CAN data** sees **RECEIVED CAN** instead and cannot send. The CAN Activity panel shows these columns:

| Column | Contents |
|--------|----------|
| **CAN ID** | The message identifier |
| **Data** | The message data bytes |
| **Direction** | Incoming or outgoing |
| **Count** | The number of times the message was seen |
| **Time** | The timestamp of the last message |

Two toggle icons change the view. **Spaced data** breaks the data into individual hex bytes and is on by default, and **Heatmap** highlights frequently changing bytes in warmer colours and relatively constant bytes in cooler colours and is also on by default. Click a column header to sort by that column, use the filters to show specific CAN IDs or data patterns, and click a message to see its details.

## Send a CAN Packet

1. Click the **+** icon in the scheduled packets panel at the bottom of the window, or double-click a message in the CAN Activity panel and click **+**, which opens the packet editor.
2. Enter the **CAN ID** (hex or decimal), and select the **Endian** byte order (little endian by default).
3. Choose the **Data Format**, which is **Bytes**, **Int16**, **Int32**, **Floats** or **Raw Data**, and enter the values. The raw data updates automatically as the values change. For example, in **Bytes** the values `0x01`, `0x02` and `0x03` go in bytes 0 to 2, and in **Int16** the values `1234` and `5678` go in `Int16[0]` and `Int16[1]` and are converted to bytes automatically.
4. Set the **Interval (ms)** to choose how often the packet is sent, for example 100 ms sends it 10 times per second, and leave it blank for manual send only.
5. Click **Save** to add the packet to the scheduled list, where it appears in the scheduled packets panel and, if an interval is set, starts sending at once.
6. To send a packet manually, select it in the scheduled packets panel and click the **Send** arrow button, or press the **Space** key, and the packet is sent immediately.
7. Check the CAN Activity panel, where the sent message appears with an outgoing direction, and confirm that the CAN ID and data match your configuration.

## Manage Scheduled Packets

A scheduled packet is saved with the profile. A packet with an interval starts sending when it is saved, and it keeps sending after the user signs out, so logging off does not stop it. Packets do not start automatically after a profile change or a restart of Profinity. To stop a packet, select it in the scheduled packets panel and delete it, by clicking **Delete** or pressing the **Delete** key, which removes it from the schedule. To change a packet, select it, click **Edit** or double-click it, modify the settings and click **Save**. Sending a packet manually before scheduling it, and checking that the CAN ID, data format and CAN bus bit rate match what the network expects, avoids sending unexpected traffic to a live bus.

## Troubleshooting

### A Packet Does Not Send

A scheduled packet that never appears in the CAN Activity panel has usually met one of four conditions: the adapter is not connected (its status indicator is not green), the signed-in user lacks the **Send CAN messages** permission, the CAN ID is not valid, or no interval is set, in which case the packet waits for a manual send. Work through them in that order, then select the packet and click the **Send** arrow to confirm it transmits before relying on the schedule.

### A Packet Does Not Appear in the Activity Panel

A packet that was sent but is missing from the CAN Activity panel is usually hidden by a filter, or the adapter is not receiving traffic back, or the CAN bus bit rate does not match the network. Clear the filters, check that the adapter is receiving traffic, and check the bit rate.

### The Data Is Wrong

Data that differs from what was entered usually has the wrong byte order or the wrong data format. Check that the **Endian** setting matches your system, check the conversion between bytes and integers, and review the raw data to confirm the values.

## Related Documentation

- [Send / Receive CAN](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md) - the full CAN utilities reference
- [Connect to CAN Bus](./Connect_to_CAN_Bus.md) - setting up CAN adapters
- [CAN Bus Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) - adapter documentation
