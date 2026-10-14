---
title: Tag Relays
description: "Tag Relay Sender and Tag Relay Receiver components, which share live tags between Profinity instances."
---

# Tag Relays

Tag Relays let one Profinity instance show live tags from other instances. Each site, vehicle or installation runs a **[Tag Relay Sender](Tag_Relay_Sender.md)**, which publishes the tags you choose, and a central instance runs a **[Tag Relay Receiver](Tag_Relay_Receiver.md)**, which shows them alongside its own. A head office can then watch many sites from one place, with dashboards, alerts and rules working on the relayed tags as they do on local ones.

<figure markdown>
![Site instances run a Tag Relay Sender publishing live tags over HTTPS with a JSON Web Token (JWT) or over MQTT; a central instance runs a Tag Relay Receiver, showing each site's tags under its own prefix, for example SiteA/System1/Battery/PackVoltage](../../images/2.3-diagram-tag-relay.png)
<figcaption>Sender and receiver roles, with per-site tag prefixes on the receiving instance</figcaption>
</figure>

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
