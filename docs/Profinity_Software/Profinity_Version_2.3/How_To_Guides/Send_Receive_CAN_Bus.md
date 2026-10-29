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

- Profinity running, with an active [profile](../Getting_Started/Profiles.md) that has the adapter configured.
- A [CAN bus adapter](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md) connected and active. To set one up, refer to [How to connect to CAN bus](./Connect_to_CAN_Bus.md).
- A [role](../Administration/Users_and_Access/Roles_and_Permissions.md) that includes the **View CAN data** permission to receive and view CAN messages, and the **Send CAN messages** permission to send them.

## Check user permissions

On a Server or Enterprise installation:

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select your user account.
3. Check that one of the **Assigned roles** includes **View CAN data**, which allows CAN messages to be received and viewed.
   To send messages, check that an assigned role includes **Send CAN messages**, which also includes **View CAN data**.
4. Change the roles if needed, and select **Save**.

Changing a user's roles revokes their active sessions, so the user must sign in again for the change to take effect.
A Desktop installation runs as a built-in user that holds every permission, so it needs no change (refer to [Licensing](../Licensing.md)).

## Receive CAN messages

Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**.
The CAN Activity window opens and shows all CAN messages currently on the network.
Select a message to see its details.
The columns, the **Spaced data** and **Heatmap** toggles, and the sort and filter options are described in [Receive CAN packets](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md#receive-can-packets).

## Send a CAN packet

!!! warning "A sent packet can command connected hardware"
    A packet sent from Profinity goes on to the live CAN bus, and every connected device acts on it.
    A packet can start a motor controller, open a contactor, or change a device setting.
    Check what is connected to the bus, and what the packet's CAN ID and data mean, before you send it.
    Be especially careful with a scheduled packet, which keeps sending until you delete it.

A packet can be sent once, or saved so that Profinity adds it to the Scheduled CAN Packets list and continues to send it in the background.
To send a packet:

1. Select the **+** icon in the Scheduled CAN Packets list at the bottom of the screen.
   The packet editor opens.
   To start from a received packet instead, double-click it or select it in the CAN Activity panel.
   Then select the **Open in Schedule Editor** **+** icon at the top of the page.
2. Enter the **CAN ID** (hex or decimal).
3. Select the **Endian** byte order, which is little endian by default.
   The [schedule editor reference](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md#schedule-editor) explains why little endian is the default.
4. Choose the **Data Format**, which is **Bytes**, **Int16**, **Int32**, **Floats**, or **Raw Data**, and enter the values.
   The raw data updates automatically as the values change.
   For example, in **Bytes** the values `0x01`, `0x02`, and `0x03` go in bytes 0 to 2.
   In **Int16**, the values `1234` and `5678` go in `Int16[0]` and `Int16[1]`, and Profinity converts them to bytes.
5. Set the **Interval [ms]** to choose how often Profinity sends the packet.
   For example, 100 ms sends it 10 times per second.
   The value is a whole number from 1 to 4,294,967,295.
   Leave it blank, or enter 0, to send the packet once only.
   The primary button then reads **SEND** instead of **START**.
6. Select **Save** to add the packet to the scheduled list.
   The packet appears in the scheduled packets panel, and it starts sending at once if an interval is set.
7. To send a packet manually at any time, including a packet that is not on a schedule, select it in the Scheduled CAN Packets list.
   Then select the **Send** arrow button, or press the **Space** key.
   Profinity sends the packet immediately.
8. Check the CAN Activity panel, where the sent message appears with an outgoing direction.
   Confirm that the CAN ID and data match your configuration.

## Manage scheduled packets

The Scheduled CAN Packets list at the bottom of the screen shows every scheduled packet.
Profinity saves a scheduled packet with the profile, so the saved packets are restored after you change profile or restart Profinity.
A packet with an interval starts sending when you save it, and it keeps sending after the user signs out.
Packets do not start automatically after a profile change or a restart of Profinity, so restart them manually.

To stop a packet, select it in the scheduled packets panel, then select **Delete** or press the **Delete** key.
This removes the packet from the schedule.
To change a packet, select it, then select **Edit** or double-click it.
Change the settings, and select **Save**.

To avoid sending unexpected traffic to a live bus, send a packet manually before you schedule it.
Also check that the CAN ID, data format, and CAN bus bit rate match what the network expects.

## Troubleshooting

### A packet does not send

A scheduled packet that never appears in the CAN Activity panel usually has one of these causes:

- The adapter is not connected, so its status indicator is not green.
- The signed-in user lacks the **Send CAN messages** permission.
- The CAN ID is not valid.
- No interval is set, so the packet waits for a manual send.

Work through the causes in that order.
Then select the packet and select the **Send** arrow, to confirm that it transmits before you rely on the schedule.

### A packet does not appear in the activity panel

A packet that was sent but is missing from the CAN Activity panel is usually hidden by a filter.
The adapter may also not be receiving traffic back, or the CAN bus bit rate may not match the network.
Clear the filters, check that the adapter is receiving traffic, and check the bit rate.

### The data is wrong

Data that differs from what was entered usually has the wrong byte order or the wrong data format.
Check that the **Endian** setting matches your system.
Check the conversion between bytes and integers.
Review the raw data to confirm the values.
