---
title: Tag Relays
description: "Tag Relay Sender and Tag Relay Receiver components, which share live tags between Profinity instances."
---

# Tag Relays

The **Tag Relays** category contains the two components that share [tags](../../Tags/index.md) between Profinity instances: the [Tag Relay Sender](Tag_Relay_Sender.md) on the instance that owns the data, and the [Tag Relay Receiver](Tag_Relay_Receiver.md) on the instance that wants to see it. Together they let a head-office instance show the tags of many sites, vehicles or installations.

## How the Components Fit Together

| Component | Runs on | Role |
|---|---|---|
| [Tag Relay Sender](Tag_Relay_Sender.md) | The site instance that owns the tags | Exports a snapshot of the tags in selected [collections](../../Tags/Collections.md) at a fixed interval, over HTTPS or MQTT. |
| [Tag Relay Receiver](Tag_Relay_Receiver.md) | The central instance | Mounts the incoming tags as read-only tags under a prefix that identifies the sending site. |

A receiving instance can ingest many senders, because each tag is mounted beneath the receiver's own prefix followed by the sender's prefix. A sender with the prefix `Vehicle12` relayed to a receiver with the prefix `Fleet` appears at `Fleet/Vehicle12/...`, so give each sender a distinct **Sender tag path prefix**. Relayed tags are read-only on the receiver, although local collections, rules, alerts, dashboards and scripts on the receiver can use them in the same way as any other tag. The [tag tree path](../../Tags/Tag_Tree_Path.md) page describes how paths are built.

Both components are added to a profile from the **Tag Relays** category, and both require the **Data Relay** licensed feature on the instance they run on, included in the **Server** and **Enterprise** editions. See [Licensing](../../Administration/Licensing.md) to check whether it is available.

## Setting Up a Relay

1. On the sending instance, create a tag collection that holds the tags to share, as described in [Collections](../../Tags/Collections.md).
2. On the receiving instance, add a **Tag Relay Receiver**, choose the protocol and set a unique **Receiver tag path prefix**. For HTTPS, create a user on the receiving instance with the **Receive external tags** permission, and note a JSON Web Token (JWT) for that user.
3. On the sending instance, add a **Tag Relay Sender**, choose the same protocol, select the collection, and enter the receiver's address (HTTPS) or the broker and snapshot topic (MQTT). For HTTPS, enter the token as the **Bearer token**.
4. Start the sender with **Start Sender** if **Auto Connect** is off, wait for one **Snapshot interval (seconds)**, and confirm that the tags appear under the receiver's prefix in Tag Explorer.

If the tags do not appear, see the troubleshooting sections on the [sender](Tag_Relay_Sender.md#troubleshooting) and [receiver](Tag_Relay_Receiver.md#troubleshooting) pages.

!!! info "Not the Same Feature as the MQTT Subscriber"
    Tag Relay is Profinity-to-Profinity only and uses its own snapshot format, so it does not speak Sparkplug. If the other end is a third-party Sparkplug B source, use the [MQTT Subscriber](../Publishers_and_Subscribers/MQTT_Subscriber.md) instead.

## Related Documentation

- [Tag Relay](../../Tags/Tag_Relay.md), covering the concept, collision rules and known limitations.
- [Tag tree path](../../Tags/Tag_Tree_Path.md)
