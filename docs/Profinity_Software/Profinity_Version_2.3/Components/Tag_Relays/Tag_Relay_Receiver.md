---
title: Tag Relay Receiver
description: "Receive tags from remote Profinity instances and mount them as read-only tags under a per-site prefix."
---

# Tag Relay Receiver

The **Tag Relay Receiver** ingests the snapshots published by one or more [Tag Relay Senders](Tag_Relay_Sender.md) and mounts the incoming [tags](../../Tags/index.md) in the local tag tree as read-only tags beneath a prefix that identifies where they came from. It sits in the **Tag Relays** category and requires the **Data Relay** licensed feature. Once relayed tags are mounted they behave like any other tag, so they can be browsed in Tag Explorer, placed in [collections](../../Tags/Collections.md), shown on a [dashboard](../../Customising_Profinity/Dashboards/index.md), logged, and used in rules and scripts. The concept, collision rules and limitations are covered in [Tag Relay](../../Tags/Tag_Relay.md).

## Adding a Tag Relay Receiver

Add a **Tag Relay Receiver** component to your profile from the **Tag Relays** category and configure its settings.

### Tag Relay Settings

| Setting | Purpose |
|---|---|
| **Protocol** | **MQTT** subscribes to a broker topic and applies each snapshot it receives. **HTTPS** uses the local relay API on this instance, so this component makes no outbound connection. Defaults to MQTT. |
| **Receiver tag path prefix** | Required. The profile subtree that every ingest batch is applied under, so it must be unique to this receiver. A prefix supplied by the sender is appended beneath it, so a receiver prefix of `Fleet` and a sender prefix of `Vehicle12` give tags at `Fleet/Vehicle12/...`. See [Tag tree path](../../Tags/Tag_Tree_Path.md). |

### MQTT Settings

| Setting | Purpose |
|---|---|
| **Auto Connect** | With the **MQTT** protocol, connects to the broker when the profile is loaded. On by default. With it off, the receiver waits until you switch it on with **Connect**. |
| **MQTT broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable Transport Layer Security (TLS). Required when the protocol is MQTT. |
| **MQTT broker port** | The broker's port. Defaults to `1883`. A port written in the broker URL takes precedence, and with an `mqtts://` URL that has no port, leaving this at `1883` connects on `8883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **MQTT username** / **MQTT password** | Credentials for broker authentication, when the broker requires them. The password is stored encrypted. |
| **MQTT client id** | Optional MQTT client ID. Leave blank to generate one, and give each client on the broker a different ID. |
| **MQTT subscribe topic** | The topic carrying the JSON snapshots, for example `profinity/relay/site1`. Required when the protocol is MQTT, and it must match the sender's **MQTT snapshot topic**. |

### Receiving over HTTPS

When the protocol is HTTPS the sender posts directly to this instance's relay API at `/api/v2/Relay/snapshot`, using a JSON Web Token (JWT) for a user with the **Receive external tags** permission (or Admin). The Tag Relay Receiver component supplies the receiver prefix and only displays the receiving state. An instance accepts a relay post for only one Tag Relay Receiver set to HTTPS, so add a single HTTPS receiver per instance. The API accepts a request body of up to 5 MB. See [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md) for how to grant the permission.

!!! warning "Relayed Tags Are Read-Only"
    A tag created by the receiver cannot be written to from a dashboard, a script or any other source, and the only thing that updates it is the next snapshot from the sender. A path already occupied by a tag that relay does not own, such as a local device tag, causes the whole batch to be rejected, which is explained in [Collision rules](../../Tags/Tag_Relay.md#collision-rules).

## Monitoring the Receiver

The component shows **On** while it is receiving and **Off** when it is stopped, and its dashboard shows its status and the total number of messages received. The status reflects whether the receiver is running and not whether the broker connection is established.

## Troubleshooting

If no tags appear, check the [Logs](../../Getting_Started/Profinity_Log.md) first. A receiver set to MQTT that has no **MQTT broker URL** or **MQTT subscribe topic** does not start and logs the reason. A receiver that shows **On** but receives nothing usually has a broker connection problem, which the log reports as a disconnection or failed reconnect (the receiver keeps retrying), or a **MQTT subscribe topic** that differs from the sender's **MQTT snapshot topic**.

If snapshots arrive but the tags do not update, a path in the batch is already occupied by a tag that relay does not own, and the whole batch is rejected. The log of an MQTT receiver then shows an ingest conflict warning, and a sender using HTTPS receives a 409 response. Change the **Receiver tag path prefix** or the sender's **Sender tag path prefix** so that the relayed tags mount in an empty subtree.

Over HTTPS, a 401 or 403 response at the sender means the token is missing, invalid or belongs to a user without the **Receive external tags** permission, and a 409 response can also mean that more than one Tag Relay Receiver set to HTTPS is active on this instance.

## Related Documentation

- [Tag Relays](index.md), including how to set up a first relay.
- [Tag Relay Sender](Tag_Relay_Sender.md)
- [Tag Relay](../../Tags/Tag_Relay.md)
- [Tag tree path](../../Tags/Tag_Tree_Path.md)
