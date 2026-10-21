---
title: Tag relay
description: Share live tags between Profinity instances using sender and receiver roles, a choice of HTTPS or MQTT transport, and per-site tag prefixes.
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag relay

Tag relay shares live tag data between two Profinity instances.
One instance runs as a sender and publishes periodic snapshots of the [tag collections](Collections/index.md) it is set to export.
Another instance runs as a receiver and ingests those snapshots as remote, read-only tags.
The tags sit under a prefix that identifies where they came from.
It supports a fleet or head-office view spanning multiple sites, vehicles, or installations.
Tag relay requires the **Data Relay** licensed feature on both the sending and receiving instance.
[Licensing](../Licensing.md) shows whether it is licensed and available on a given instance.

Tag relay has no field-level filtering.
A sender exports every tag that belongs to its selected collections, so create a collection that contains only the tags a receiver should see.

<figure markdown>
![At each site, a local Tags to Collections to Rules to Actions and Alerts pipeline runs on its own; Tag Relay lifts that up to a central fleet instance with its own fleet-wide collections, rules, and alerts spanning every site](../images/diagram-fleet-overview.png)
<figcaption>Each site runs its own tag pipeline, and relay adds a shared view at the central instance</figcaption>
</figure>

Tag relay works only between Profinity instances, and it does not use Sparkplug, a Message Queuing Telemetry Transport (MQTT) payload format for industrial data.
If the other end is a third-party Sparkplug B source, such as an edge gateway or a third-party Supervisory Control and Data Acquisition (SCADA) platform, use the [MQTT Subscriber](../Components/Publishers_and_Subscribers/MQTT_Subscriber.md) instead.
Refer to that page for the reverse comparison.

## How it works

<figure markdown>
![Site instances run a Tag Relay Sender publishing live tags over HTTPS with a JSON Web Token (JWT) or over MQTT; a central instance runs a Tag Relay Receiver, showing each site's tags under its own prefix, for example SiteA/System1/Battery/PackVoltage](../images/diagram-tag-relay.png)
<figcaption>Sender and receiver roles, with per-site tag prefixes on the receiving instance</figcaption>
</figure>

A Profinity instance with a [Tag Relay Sender](../Components/Tag_Relays/Tag_Relay_Sender.md) component exports the member tags of the collections selected in the sender.
It sends them as a complete snapshot at a fixed interval, which defaults to 60 seconds.
The receiver therefore always holds the values from the most recent snapshot rather than a stream of individual changes.
Tags outside the selected collections are never sent.

A [Tag Relay Receiver](../Components/Tag_Relays/Tag_Relay_Receiver.md) component connects to one or more senders.
It mounts each sender's tags under a prefix that identifies that site, for example `SiteA/…`.
A single receiving instance can then ingest many senders without their tag trees colliding.
A sender is reached over HTTPS with a JSON Web Token (JWT) or over MQTT, and the choice is made per sender.

Relayed tags on the receiver are read-only, so the receiving instance cannot write back to a site through relay.
Local tags, [collections](Collections/index.md), [rules](Rules/index.md), and [alerts](./Alerts.md) on the receiver can reference relayed tags the same way they reference any other tag.

## Collision rules

The receiver checks a whole snapshot against its live tag tree before it changes anything.
A single collision rejects the entire snapshot, so nothing is partially applied.
A snapshot is rejected whole, with no tags created or updated, when any item in it meets one of these conditions:

- The path is already occupied by a tag that did not come from relay, such as a local device tag, a script register or a [derived tag](Derived_Tags/index.md).
- A tag that came from relay already exists as a leaf where the snapshot needs a branch, or as a branch where the snapshot needs a leaf.
- The snapshot itself asks for both a branch and a leaf at the same path.

A relayed leaf that already exists where the snapshot carries a leaf is not a collision, and its sample is updated.
A path occupied by a tag that did not come from relay is never skipped on its own while the rest of the snapshot is applied.

### Troubleshooting a sender that stops updating

When the tags from one sender stop updating on the receiver, a path in that sender's latest snapshot clashes with a tag already on the receiver.
The receiver rejects the whole snapshot.
Over HTTPS the sender receives a `409 Conflict` response carrying the reason.
A malformed snapshot, for example one with an unsupported relay version, receives `400 Bad Request`.
Over MQTT the receiver writes a warning to the Profinity log and discards the snapshot.

To fix the clash, remove the local tag that occupies the path or change the receiver prefix.
The receiver then accepts the next snapshot from that sender.

For the settings of each role, refer to [Tag Relay Sender](../Components/Tag_Relays/Tag_Relay_Sender.md) and [Tag Relay Receiver](../Components/Tag_Relays/Tag_Relay_Receiver.md).
Refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) for the permissions involved.
Refer to [Tag layer](./index.md) for the rest of the tag pipeline.
