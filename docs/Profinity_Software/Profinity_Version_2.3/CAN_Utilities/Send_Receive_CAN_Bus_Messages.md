---
title: Send / receive CAN bus messages
description: "Monitor CAN bus traffic, send a CAN packet on demand, and schedule packets to send at a fixed interval."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Send / receive CAN bus messages

Profinity can monitor Controller Area Network (CAN) bus traffic on your network.
It can also transmit messages back on to the CAN network, using the **SEND & RECEIVED CAN** window that this page describes.
The [CAN Data Log Replayer](Logging_Replaying_CAN_Bus_Messages.md#can-data-log-replayer) is a separate tool that plays recorded messages into Profinity, and it never transmits them on to the bus.

Before you send or receive any CAN packets, check that the current user holds the associated permission.
Receiving needs **View CAN data**, and sending needs **Send CAN messages**, which includes **View CAN data**.
The replayer requires **Replay CAN logs**.
A user with only **View CAN data** sees the menu item as **RECEIVED CAN** instead of **SEND & RECEIVED CAN**.
Refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

!!! warning "A sent packet can command connected hardware"
    A packet sent from Profinity goes on to the live CAN bus, and every connected device acts on it.
    Check what is connected to the bus, and what the packet means, before you send it.
    The full warning is in [How to send and receive CAN bus messages](../How_To_Guides/Send_Receive_CAN_Bus.md#send-a-can-packet).

## Receive CAN packets

Select **CAN UTILITIES** in the side menu, then **SEND & RECEIVED CAN**.
The window shows all the CAN bus messages currently travelling across your network.

<figure markdown>
![The Receive CAN Packets window with the CAN Activity table of messages travelling across the network](../images/receive_can_packets.png)
<figcaption>Receive CAN Packets</figcaption>
</figure>

The **CAN Activity** table has these columns:

| Column | Contents |
|--------|----------|
| **CAN ID** | The message identifier |
| **Data** | The message data bytes |
| **Direction** | Incoming or outgoing |
| **Count** | The number of times the message was seen |
| **Time** | The timestamp of the last message |

Select the **CAN Activity** table headers to filter or sort the messages by CAN ID, direction, flags, and so on.
Adapters that support them also show endian representation and local traffic filtering in the same header, as [CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md) describes.

Two toggle buttons sit at the top of the window:

- The **Spaced data** button, which has a column-insert icon, breaks the CAN traffic data into individual hex bytes to make it easier to read.
- The **Heatmap** button, which has a heat map icon, colours each byte by how often it changes. Bytes that change value frequently show in warmer colours, and bytes that stay relatively constant show in cooler colours.

Both options are on by default, and you can switch them off.

## Schedule editor

The Scheduled CAN Packets list at the bottom of the screen shows every scheduled packet, and the `+` icon opens the schedule editor to define a packet.
To send, schedule, stop, and restore packets, refer to [How to send and receive CAN bus messages](../How_To_Guides/Send_Receive_CAN_Bus.md).

The default byte order is little endian, which most Prohelion devices use.
This includes the WaveSculptor, which sends its data fields least significant byte first (refer to [Appendix C - CAN Comms Protocol](../../../Motor_Controllers/WaveSculptor22/User_Manual/Appendix_C.md)).

<figure markdown>
![The Send CAN Packet schedule editor with fields for CAN ID, endian, Bytes, Int16, Int32, Floats, raw data and interval](../images/send_can_packet.png)
<figcaption>Send CAN Packet</figcaption>
</figure>

The schedule editor transmits messages back on to the CAN bus network from Profinity.
In this tool you can set the CAN ID and endian, and the values for either Bytes, Int16, Int32, Floats, or the raw packet data.
When you change one of these values, the raw data updates to match.
When you change the raw data, the values update to match.

Setting an interval causes Profinity to send your CAN packet at your chosen loop rate, so setting **Interval [ms]** to 100 sends the packet every 100 ms.
The interval must be a whole number from 1 to 4,294,967,295 milliseconds.
Leave it blank, or enter 0, to send the packet once only.
When **Interval [ms]** is blank or 0, the primary button reads **SEND** and sends the packet once.
When it is above 0, the button reads **START**, and the schedule must be saved first.
The editor shows "Value must be an integer greater or equal to zero" or "Value must not exceed 4,294,967,295 milliseconds (maximum for uint)" beside the field when the value is not valid.

For step-by-step guidance, refer to [How to send and receive CAN bus messages](../How_To_Guides/Send_Receive_CAN_Bus.md) and [How to connect to CAN bus](../How_To_Guides/Connect_to_CAN_Bus.md).
To play back recorded messages, refer to [Log / replay CAN bus messages](Logging_Replaying_CAN_Bus_Messages.md).
