---
title: Tag Relays
description: "Share live tags between Profinity instances with a Tag Relay Sender and a Tag Relay Receiver, over HTTPS or MQTT."
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag Relays

Tag Relays let one Profinity instance show live tags from other instances, so a head office can watch many sites from one place.
Each site, vehicle, or installation runs a **[Tag Relay Sender](Tag_Relay_Sender.md)**, which publishes the tags you choose, and a central instance runs a **[Tag Relay Receiver](Tag_Relay_Receiver.md)**, which shows them alongside its own.
Dashboards, alerts, and rules on the central instance work on the relayed tags as they do on local ones.

<figure markdown>
![Diagram of Tag Relay. Site instances each run a Tag Relay Sender that publishes live tags over HTTPS with a JSON Web Token (JWT) or over MQTT. A central instance runs a Tag Relay Receiver that shows the tags of each site under its own prefix, for example SiteA/System1/Battery/PackVoltage](../../images/2.3-diagram-tag-relay.png)
<figcaption>Sender and receiver roles, with per-site tag prefixes on the receiving instance</figcaption>
</figure>

## How the components fit together

| Component | Runs on | Role |
|---|---|---|
| [Tag Relay Sender](Tag_Relay_Sender.md) | The site instance that owns the tags | Exports a snapshot of the tags in selected [collections](../../Tags/Collections.md) at a fixed interval, over HTTPS or MQTT. |
| [Tag Relay Receiver](Tag_Relay_Receiver.md) | The central instance | Mounts the incoming tags as read-only tags under a prefix that identifies the sending site. |

A receiving instance can ingest many senders, because each tag is mounted beneath the receiver's own prefix followed by the sender's prefix.
A sender with the prefix `Vehicle12` relayed to a receiver with the prefix `Fleet` appears at `Fleet/Vehicle12/...`, so give each sender a distinct **Sender tag path prefix**.
Relayed tags are read-only on the receiver, although local collections, rules, alerts, dashboards, and scripts on the receiver can use them in the same way as any other tag.
The [Tag tree path](../../Tags/Tag_Tree_Path.md) page describes how paths are built.

Tag Relay works between Profinity instances only and uses its own snapshot format, so it does not use Sparkplug.
If the other end is a third-party Sparkplug B source, use the [MQTT Subscriber](../Publishers_and_Subscribers/MQTT_Subscriber.md) instead.

Both components are added to a profile from the **Tag Relays** category.

!!! info "Licence required"
    Both components require the **Data Relay** licensed feature on the instance they run on, included in the **Server** and **Enterprise** editions. Refer to [Licensing](../../Administration/Licensing.md) to check whether it is available.

To set up a first relay, refer to [Set up a tag relay](Set_Up_a_Tag_Relay.md).
The [Tag Relay](../../Tags/Tag_Relay.md) page covers the concept, collision rules and known limitations.
