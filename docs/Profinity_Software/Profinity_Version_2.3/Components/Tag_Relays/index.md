---
title: Tag Relays
description: "Share live tags between Profinity instances with a Tag Relay Sender and a Tag Relay Receiver, over HTTPS or MQTT."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag Relays

The **Tag Relays** category contains the two components that share tags between Profinity instances, so a head office can watch many sites, vehicles, or installations from one central instance.
Both require the **Data Relay** licensed feature on the instance they run on, as described in [Licensing](../../Licensing.md).
For what a relay is, how tags are mounted, collision rules and known limitations, refer to the [Tag relay](../../Tags/Tag_Relay.md) concept page.

- [Tag Relay Sender](Tag_Relay_Sender.md) runs on the site instance that owns the tags and sends a snapshot of the tags in selected [collections](../../Tags/Collections/index.md) at a fixed interval.
- [Tag Relay Receiver](Tag_Relay_Receiver.md) runs on the central instance and mounts the incoming tags as read-only tags under a prefix that identifies the sending site.
- [Set up a tag relay](Set_Up_a_Tag_Relay.md) connects a first sender and receiver over HTTPS or Message Queuing Telemetry Transport (MQTT).

Tag Relay works between Profinity instances only and does not use Sparkplug.
If the other end is a third-party Sparkplug B source, use the [MQTT Subscriber](../Publishers_and_Subscribers/MQTT_Subscriber.md) instead.
