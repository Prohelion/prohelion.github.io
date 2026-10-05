---
title: Tag Relays
description: "Tag Relay Sender and Tag Relay Receiver components, which share live tags between Profinity instances."
---

# Tag Relays

The **Tag Relays** category contains the two components that share live tag data between Profinity instances: the [Tag Relay Sender](Tag_Relay_Sender.md) on the instance that owns the data, and the [Tag Relay Receiver](Tag_Relay_Receiver.md) on the instance that wants to see it. Together they are the mechanism behind a fleet or head-office view spanning multiple sites, vehicles or installations.

## What is a tag?

A **tag** is Profinity's single data model for a signal. A CAN or DBC signal, a device property, a register and a firmware field all become a tag with an address in the tag tree, a value, a quality flag and metadata, and each can be read as an instantaneous value or as time-series history. [Dashboards](../../Customising_Profinity/Dashboards/index.md), loggers, [collections](../../Tags/Collections.md), rules, [alerts](../../Tags/Alerts.md) and scripts all work with tags, so anything that has been made available as a tag can be used in any of them.

Each tag is identified by its position in the tag tree, for example `System1/Battery/PackVoltage`, which is described in [Tag tree path](../../Tags/Tag_Tree_Path.md). The full background is in the [Tag layer](../../Tags/index.md) documentation, and the collections that a sender uses to choose what to export are covered in [Collections](../../Tags/Collections.md).

## How the components fit together

| Component | Runs on | Role |
|---|---|---|
| [Tag Relay Sender](Tag_Relay_Sender.md) | The site instance that owns the tags | Exports a snapshot of the tags in selected collections at a fixed interval, over HTTPS or MQTT. |
| [Tag Relay Receiver](Tag_Relay_Receiver.md) | The central instance | Mounts the incoming tags as read-only tags under a prefix that identifies the sending site. |

A receiving instance can ingest many senders at once, because each sender's tags are mounted under their own prefix (for example `SiteA/…`) and so the tag trees do not collide. Relayed tags are read-only on the receiver, although local collections, rules, alerts, dashboards and scripts on the receiver can use them in the same way as any other tag.

Both components are added to a profile from the **Tag Relays** category, and both require the **Data Relay** licensed feature on the instance they run on, included in the **Server** and **Enterprise** editions. See [Licensing](../../Administration/Licensing.md) to check whether it is available.

!!! info "Not the same feature as the MQTT Subscriber"
    Tag relay is Profinity-to-Profinity only and uses its own snapshot format, so it does not speak Sparkplug. If the other end is a third-party Sparkplug B source, use the [MQTT Subscriber](../Publishers_and_Subscribers/MQTT_Subscriber.md) instead.

## Related documentation

- [Tag relay](../../Tags/Tag_Relay.md) — the concept, collision rules and known limitations
- [Tag layer](../../Tags/index.md)
- [Tag tree path](../../Tags/Tag_Tree_Path.md)
- [Collections](../../Tags/Collections.md)
