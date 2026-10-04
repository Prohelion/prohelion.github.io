---
title: Tag Relay
description: "Share live tags between Profinity instances — sender and receiver roles, transport, and per-site tag prefixes."
---

# Tag relay

Tag relay shares live tag data between two Profinity instances. One instance runs as a
**sender**, publishing a snapshot of its own tags; another runs as a **receiver**,
ingesting that snapshot as remote, read-only tags under a prefix that identifies where
they came from. It is the mechanism behind a fleet or head-office view spanning
multiple sites, vehicles, or installations.

<figure markdown>
![At each site, a local Tags → Collections → Rules → Actions and Alerts pipeline runs on its own; Tag Relay lifts that up to a central fleet instance with its own fleet-wide collections, rules, and alerts spanning every site](../images/2.3-diagram-fleet-overview.png)
<figcaption>Each site keeps running independently — relay only adds a shared view on top</figcaption>
</figure>

!!! info "Not the same feature as the MQTT Subscriber"
    **Tag relay** is Profinity-to-Profinity only, over its own snapshot format — it does
    not speak Sparkplug. If the other end is a third-party Sparkplug B source (an edge
    gateway, or a platform such as Ignition) rather than another Profinity instance, use
    the [MQTT Subscriber](../Components/Publishers_and_Subscribers/MQTT_Subscriber.md) instead. See
    that page's own note for the reverse comparison.

## How it works

<figure markdown>
![Site instances run a Tag Relay Sender publishing live tags over HTTPS with JWT or MQTT; a central instance runs a Tag Relay Receiver, showing each site's tags under its own prefix, e.g. SiteA/System1/Battery/PackVoltage](../images/2.3-diagram-tag-relay.png)
<figcaption>Sender and receiver roles, with per-site tag prefixes on the receiving instance</figcaption>
</figure>

- **Sender.** A Profinity instance configured as a Tag Relay Sender publishes a
  snapshot of its own tags, then streams incremental updates as they change.
- **Receiver.** A Profinity instance configured as a Tag Relay Receiver connects to one
  or more senders and mounts each sender's tags under a prefix identifying that site
  (for example `SiteA/…`), so a single receiving instance can ingest many senders at
  once without their tag trees colliding.
- **Transport.** A sender can be reached over HTTPS with a JWT, or over MQTT — both are
  supported in the same release, and the choice is per sender.
- **Read-only mirrors.** Relayed tags on the receiver are read-only — the receiving
  instance cannot write back to a site through relay. Local tags, collections, rules,
  and alerts on the receiver can still reference relayed tags the same way they
  reference any other tag.
- **Conflict handling.** The receiver validates a whole batch against its live tag tree before it changes anything, and a single collision rejects the entire batch, so nothing is partially applied (see [Collision rules](#collision-rules)).

## Collision rules

A batch is rejected whole, with no tags created or updated, when any item in it meets one of these conditions:

- The path is already occupied by a tag that relay does not own, such as a local device tag, a script register or a derived tag.
- A relay-owned leaf already exists where the batch needs a branch, or a relay-owned branch already exists where the batch needs a leaf.
- The batch itself asks for both a branch and a leaf at the same path.

A relay-owned leaf that already exists where the batch carries a leaf is not a collision, and its sample is updated. Over HTTPS the sender receives a `409 Conflict` response carrying the reason, and a malformed batch (for example an unsupported relay version) receives `400 Bad Request`. Over MQTT the receiver logs a warning and discards the batch. A path occupied by a tag relay does not own is never skipped on its own while the rest of the batch is applied.

## Known limitations

- Relay currently exports a sender's full tag tree to its peers — there is no
  field-level filtering of what gets published to a given receiver yet.
- A collision on a single path rejects the whole batch for that sender, so a naming clash
  stops updates from that sender until the clash is removed or the receiver prefix is changed.

## Licensing

Tag relay requires the **Data Relay** licensed feature on both the sending and
receiving instance. See [Licensing](../Administration/Licensing.md) to check
whether it is licensed and available on a given instance.

## Related documentation

- [Tag layer](./index.md)
- [MQTT Subscriber](../Components/Publishers_and_Subscribers/MQTT_Subscriber.md) — for ingesting an external, non-Profinity Sparkplug source instead
- [Licensing](../Administration/Licensing.md)
- [Roles and permissions](../Administration/Roles_and_Permissions.md)
