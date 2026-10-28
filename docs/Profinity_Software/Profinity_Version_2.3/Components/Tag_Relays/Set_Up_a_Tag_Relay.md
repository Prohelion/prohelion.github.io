---
title: Set up a tag relay
description: "Set up a first Tag Relay between two Profinity instances over HTTPS or MQTT, from the tag collection on the sender to the relayed tags on the receiver."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Set up a tag relay

This page sets up a first Tag Relay, so that tags on a sending Profinity instance appear on a receiving instance.
The relay uses one of two protocols: HTTPS or Message Queuing Telemetry Transport (MQTT).
The HTTPS procedure comes first, and the MQTT procedure follows it.
Both components require the **Data Relay** licensed feature on the instance they run on, as described in [Licensing](../../Licensing.md).
The HTTPS protocol also needs a user with the **Receive external tags** permission on the receiving instance.

!!! warning "The default protocols differ"
    A new **Tag Relay Sender** defaults to **HTTPS**, and a new **Tag Relay Receiver** defaults to **MQTT**.
    Set the **Protocol** of both components explicitly, so that they match.

## Set up a relay over HTTPS

1. On the sending instance, create a tag collection that holds the tags to share, as described in [Collections](../../Tags/Collections/index.md).
2. On the receiving instance, add a **Tag Relay Receiver** and set **Protocol** to **HTTPS**.
3. Set a unique **Receiver tag path prefix**, for example `Fleet`.
4. Create a user on the receiving instance with the **Receive external tags** permission.
   Note a JSON Web Token (JWT) for that user.
5. On the sending instance, add a **Tag Relay Sender** and set **Protocol** to **HTTPS**.
6. In **Collections**, select the collection from step 1.
7. Optional: set a **Sender tag path prefix**, for example `Vehicle12`.
   With the receiver prefix from step 3, the tags then appear at `Fleet/Vehicle12/...`.
8. Enter the receiver's address in **Remote base URL** and the token in **Bearer token**.
9. If **Auto Connect** is off, select **Start Sender**.
   The sender shows **On**.

Wait for one **Snapshot interval (seconds)**, then open Tag Explorer.
The tags appear under the receiver's prefix.

## Set up a relay over MQTT

1. On the sending instance, create a tag collection that holds the tags to share, as described in [Collections](../../Tags/Collections/index.md).
2. On the receiving instance, add a **Tag Relay Receiver** and set **Protocol** to **MQTT**.
3. Set a unique **Receiver tag path prefix**, for example `Fleet`.
4. Enter the **MQTT broker URL** and the **MQTT subscribe topic**.
5. On the sending instance, add a **Tag Relay Sender** and set **Protocol** to **MQTT**.
6. In **Collections**, select the collection from step 1.
7. Optional: set a **Sender tag path prefix**, for example `Vehicle12`.
   With the receiver prefix from step 3, the tags then appear at `Fleet/Vehicle12/...`.
8. Enter the **MQTT broker URL** and the **MQTT snapshot topic**.
   The snapshot topic must match the receiver's subscribe topic.
9. If **Auto Connect** is off, select **Start Sender**.
   The sender shows **On**.

Wait for one **Snapshot interval (seconds)**, then open Tag Explorer.
The tags appear under the receiver's prefix.

If the tags do not appear, refer to the troubleshooting sections on the [sender](Tag_Relay_Sender.md#troubleshooting) and [receiver](Tag_Relay_Receiver.md#troubleshooting) pages.
