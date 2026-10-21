---
title: Set up a tag relay
description: "Set up a first Tag Relay between two Profinity instances over HTTPS or MQTT, from the tag collection on the sender to the relayed tags on the receiver."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Set up a tag relay

This page sets up a first Tag Relay, so that tags on a sending Profinity instance appear on a receiving instance.
The relay uses HTTPS or Message Queuing Telemetry Transport (MQTT).
Both components require the **Data Relay** licensed feature on the instance they run on, as described in [Licensing](../../Licensing.md).
The HTTPS protocol also needs a user with the **Receive external tags** permission on the receiving instance.

1. On the sending instance, create a tag collection that holds the tags to share, as described in [Collections](../../Tags/Collections/index.md).
2. On the receiving instance, add a **Tag Relay Receiver** and choose the protocol.
3. Set a unique **Receiver tag path prefix**.
4. If you use MQTT, enter the **MQTT broker URL** and the **MQTT subscribe topic**.
5. If you use HTTPS, create a user on the receiving instance with the **Receive external tags** permission.
   Note a JSON Web Token (JWT) for that user.
6. On the sending instance, add a **Tag Relay Sender** and choose the same protocol.
7. In **Collections**, select the collection from step 1.
8. If you use HTTPS, enter the receiver's address in **Remote base URL** and the token in **Bearer token**.
9. If you use MQTT, enter the **MQTT broker URL** and the **MQTT snapshot topic**. The snapshot topic must match the receiver's subscribe topic.
10. If **Auto Connect** is off, select **Start Sender**.
11. Wait for one **Snapshot interval (seconds)**, then open Tag Explorer. The tags appear under the receiver's prefix.

If the tags do not appear, refer to the troubleshooting sections on the [sender](Tag_Relay_Sender.md#troubleshooting) and [receiver](Tag_Relay_Receiver.md#troubleshooting) pages.
