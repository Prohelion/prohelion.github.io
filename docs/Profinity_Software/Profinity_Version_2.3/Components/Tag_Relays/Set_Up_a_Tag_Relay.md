---
title: Set up a tag relay
description: "Set up a first Tag Relay between two Profinity instances over HTTPS or MQTT, from the tag collection on the sender to the relayed tags on the receiver."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Set up a tag relay

This page sets up a first Tag Relay, so that tags on a sending Profinity instance appear on a receiving instance.
Both components require the **Data Relay** licensed feature on the instance they run on, and the HTTPS protocol needs a user with the **Receive external tags** permission on the receiving instance.

1. On the sending instance, create a tag collection that holds the tags to share, as described in [Collections](../../Tags/Collections/index.md).
2. On the receiving instance, add a **Tag Relay Receiver**, choose the protocol and set a unique **Receiver tag path prefix**.
3. For HTTPS, create a user on the receiving instance with the **Receive external tags** permission, and note a JSON Web Token (JWT) for that user.
4. On the sending instance, add a **Tag Relay Sender**, choose the same protocol, select the collection, and enter the receiver's address (HTTPS) or the broker and snapshot topic (MQTT).
5. For HTTPS, enter the token as the **Bearer token**.
6. If **Auto Connect** is off, select **Start Sender**.
7. Wait for one **Snapshot interval (seconds)**, then confirm that the tags appear under the receiver's prefix in Tag Explorer.

If the tags do not appear, refer to the troubleshooting sections on the [sender](Tag_Relay_Sender.md#troubleshooting) and [receiver](Tag_Relay_Receiver.md#troubleshooting) pages.
