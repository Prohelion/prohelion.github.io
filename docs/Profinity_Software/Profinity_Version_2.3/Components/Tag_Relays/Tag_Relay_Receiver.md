---
title: Tag Relay Receiver
description: "Receive tags from remote Profinity instances and mount them as read-only tags under a per-site prefix."
---

# Tag Relay Receiver

The **Tag Relay Receiver** ingests the snapshots published by one or more [Tag Relay Senders](Tag_Relay_Sender.md) and mounts the incoming tags in the local tag tree as read-only tags beneath a prefix that identifies where they came from. It sits in the **Tag Relays** category and requires the **Data Relay** licensed feature.

A **tag** is Profinity's common data model for a signal, with an address, a value, a quality flag and metadata, as described in the [Tag layer](../../Tags/index.md) documentation. Once relayed tags are mounted on the receiver they behave like any other tag, so they can be browsed in Tag Explorer, placed in [collections](../../Tags/Collections.md), shown on a dashboard, logged, and used in rules and scripts. The concept, collision rules and limitations are covered in [Tag relay](../../Tags/Tag_Relay.md).

## Adding a Tag Relay Receiver

Add a **Tag Relay Receiver** component to your profile from the **Tag Relays** category and configure its settings.

### Tag relay settings

| Setting | Purpose |
|---|---|
| **Protocol** | **MQTT** subscribes to a broker topic and applies each snapshot it receives. **HTTPS** uses the local relay API on this instance, so this component makes no outbound connection. Defaults to MQTT. |
| **Receiver tag path prefix** | Required. The profile subtree that every ingest batch is applied under, so it must be unique to this receiver. A prefix supplied in the payload is appended beneath it, and the result is the site prefix described in [Tag tree path](../../Tags/Tag_Tree_Path.md). |

### MQTT settings

| Setting | Purpose |
|---|---|
| **MQTT broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS. Required when the protocol is MQTT. |
| **MQTT broker port** | The broker's port. Defaults to `1883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **MQTT username** / **MQTT password** | Credentials for broker authentication, when the broker requires them. The password is stored encrypted at rest. |
| **MQTT client id** | Optional MQTT client ID. |
| **MQTT subscribe topic** | The topic carrying the JSON snapshot envelopes. Required when the protocol is MQTT, and it must match the sender's snapshot topic. |

### Receiving over HTTPS

When the protocol is HTTPS the sender posts directly to this instance's relay API at `/api/v2/Relay/snapshot`, using a JWT for a user with the `ReceiveExternalTags` permission (or Admin), and the Tag Relay Receiver component only reports the receiving state. See [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md) for how to grant the permission.

!!! warning "Relayed tags are read-only"
    A tag created by the receiver cannot be written to from a dashboard, a script or any other source, and the only thing that updates it is the next snapshot from the sender. A path already occupied by a tag that relay does not own, such as a local device tag, causes the whole batch to be rejected, which is explained in [Collision rules](../../Tags/Tag_Relay.md#collision-rules).

## Monitoring the receiver

The component reports **STATE_ON** while it is receiving and **STATE_OFF** when it is stopped, and its dashboard shows its status and the total number of messages received.

## Related documentation

- [Tag Relays](index.md)
- [Tag Relay Sender](Tag_Relay_Sender.md)
- [Tag relay](../../Tags/Tag_Relay.md)
- [Tag layer](../../Tags/index.md)
- [Tag tree path](../../Tags/Tag_Tree_Path.md)
