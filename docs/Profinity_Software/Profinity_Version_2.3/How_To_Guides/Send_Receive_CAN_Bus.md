---
title: How to send and receive CAN bus messages
description: "Use the Profinity CAN tools to view traffic on the bus, send a CAN packet once, and schedule packets to send at an interval."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# How to send and receive CAN bus messages

Send and receive CAN bus messages using Profinity's built-in CAN tools.
Receiving shows the traffic on the bus, and sending transmits a packet once or on a schedule.
The [Send / receive CAN bus messages](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md) page is the full CAN utilities reference.

Before you start, you need:

- Profinity V2 installed and running.
- A [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) connected and active. To set one up, refer to [Connect to CAN Bus](./Connect_to_CAN_Bus.md).
- A [role](../Administration/Users_and_Access/Roles_and_Permissions.md) that includes the **View CAN data** permission to receive and view CAN messages, and **Send CAN messages** to send them.
- An active [profile](../Getting_Started/Profiles.md) with the adapter configured.

## Check user permissions

On a Server or Enterprise installation:

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select your user account.
3. Check that one of the **Assigned roles** includes **View CAN data**, which allows CAN messages to be received and viewed. To send messages, check that an assigned role includes **Send CAN messages**, which also includes **View CAN data**.
4. Change the roles if needed and select **Save**.

Changing a user's roles revokes their active sessions, so the user must sign in again for the change to take effect.
A Desktop installation runs as a built-in user that holds every permission, so it needs no change (refer to [Licensing](../Administration/Licensing.md)).

## Receive CAN messages

Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**.
This opens the CAN Activity window showing all CAN messages currently on the network.
A user who holds only **View CAN data** sees **RECEIVED CAN** instead and cannot send.
The CAN Activity panel shows these columns:

| Column | Contents |
|--------|----------|
| **CAN ID** | The message identifier |
| **Data** | The message data bytes |
| **Direction** | Incoming or outgoing |
| **Count** | The number of times the message was seen |
| **Time** | The timestamp of the last message |

Two toggle icons change the view.
**Spaced data** breaks the data into individual hex bytes and is on by default.
**Heatmap** highlights frequently changing bytes in warmer colours and relatively constant bytes in cooler colours, and is also on by default.
Select a column header to sort by that column, use the filters to show specific CAN IDs or data patterns, and select a message to see its details.

## Send a CAN packet

!!! warning "A sent packet can command connected hardware"
    A packet sent from Profinity goes on to the live CAN bus and is acted on by every connected device, so a packet can start a motor controller, open a contactor or change a device setting. Check what is connected to the bus and what the packet's CAN ID and data mean before sending it, and be especially careful with a scheduled packet, which keeps sending until it is deleted.

A packet can be sent once, or saved so that Profinity adds it to the Scheduled CAN Packets list and continues to send it in the background.
To send a packet:

1. Select the **+** icon in the Scheduled CAN Packets list at the bottom of the screen. To start from a received packet instead, double-click it or select it in the CAN Activity panel, then select the **Open in Schedule Editor** **+** icon at the top of the page. This opens the packet editor.
2. Enter the **CAN ID** (hex or decimal), and select the **Endian** byte order (little endian by default). The [schedule editor reference](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md#schedule-editor) explains why little endian is the default.
3. Choose the **Data Format**, which is **Bytes**, **Int16**, **Int32**, **Floats** or **Raw Data**, and enter the values. The raw data updates automatically as the values change. For example, in **Bytes** the values `0x01`, `0x02` and `0x03` go in bytes 0 to 2, and in **Int16** the values `1234` and `5678` go in `Int16[0]` and `Int16[1]` and are converted to bytes automatically.
4. Set the **Interval (ms)** to choose how often the packet is sent, for example 100 ms sends it 10 times per second. Leave it blank for manual send only.
5. Select **Save** to add the packet to the scheduled list. The packet appears in the scheduled packets panel and, if an interval is set, starts sending at once.
6. To send a packet manually at any time, including a packet that is not set up on a schedule, select it in the Scheduled CAN Packets list and select the **Send** arrow button, or press the **Space** key. The packet is sent immediately.
7. Check the CAN Activity panel, where the sent message appears with an outgoing direction, and confirm that the CAN ID and data match your configuration.

## Manage scheduled packets

The Scheduled CAN Packets list at the bottom of the screen shows every scheduled packet.
A scheduled packet is saved with the profile, so if you change profile or restart Profinity the saved packets are not lost, and they are restored.
A packet with an interval starts sending when it is saved, and it keeps sending after the user signs out, so logging off does not stop it.
Packets do not start automatically after a profile change or a restart of Profinity, and you need to restart them manually.

To stop a packet, select it in the scheduled packets panel and delete it by selecting **Delete** or pressing the **Delete** key, which removes it from the schedule.
To change a packet, select it, select **Edit** or double-click it, modify the settings and select **Save**.
Sending a packet manually before scheduling it, and checking that the CAN ID, data format and CAN bus bit rate match what the network expects, avoids sending unexpected traffic to a live bus.

## Troubleshooting

### A packet does not send

A scheduled packet that never appears in the CAN Activity panel has usually met one of four conditions: the adapter is not connected (its status indicator is not green), the signed-in user lacks the **Send CAN messages** permission, the CAN ID is not valid, or no interval is set, in which case the packet waits for a manual send.
Work through them in that order, then select the packet and select the **Send** arrow to confirm it transmits before relying on the schedule.

### A packet does not appear in the activity panel

A packet that was sent but is missing from the CAN Activity panel is usually hidden by a filter, or the adapter is not receiving traffic back, or the CAN bus bit rate does not match the network.
Clear the filters, check that the adapter is receiving traffic, and check the bit rate.

### The data is wrong

Data that differs from what was entered usually has the wrong byte order or the wrong data format.
Check that the **Endian** setting matches your system, check the conversion between bytes and integers, and review the raw data to confirm the values.
