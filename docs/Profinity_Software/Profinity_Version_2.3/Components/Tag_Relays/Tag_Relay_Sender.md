---
title: Tag Relay Sender
description: "Publish a snapshot of selected tag collections to a remote Profinity instance over HTTPS or MQTT."
---

# Tag Relay Sender

The **Tag Relay Sender** exports the [tags](../../Tags/index.md) that belong to the [collections](../../Tags/Collections.md) you select and sends them, as a full snapshot at a fixed interval, to a remote Profinity instance running a [Tag Relay Receiver](Tag_Relay_Receiver.md). It sits in the **Tag Relays** category and requires the **Data Relay** licensed feature. The position of each tag in the exported tree is its [tag tree path](../../Tags/Tag_Tree_Path.md), and the concept of sender and receiver roles is covered in [Tag Relay](../../Tags/Tag_Relay.md).

## Adding a Tag Relay Sender

Add a **Tag Relay Sender** component to your profile from the **Tag Relays** category, choose the protocol, and select the collections to export. Only the member tags of the selected collections are sent, so create the collections first, as described in [Collections](../../Tags/Collections.md). The sender does not start until at least one collection is selected and every selected collection exists in the profile.

### Tag Relay Settings

| Setting | Purpose |
|---|---|
| **Protocol** | **HTTPS** posts the snapshot to the remote instance's relay API, and **MQTT** publishes it as a JSON payload on a broker. Defaults to HTTPS. |
| **Sender tag path prefix** | Optional. Prepended as outer path segments on the exported tree, and placed beneath the receiver's own **Receiver tag path prefix**. A sender prefix of `Vehicle12` relayed to a receiver prefix of `Fleet` appears at `Fleet/Vehicle12/...`. |
| **Exclude relay-managed nodes** | Excludes tags that were themselves received from another Tag Relay, so that mirrored data is not sent on again in a loop. Enabled by default. |
| **Snapshot interval (seconds)** | How often a snapshot is published or posted, from 5 to 86400 seconds. Defaults to 60. Each snapshot carries every tag in the selected collections, so a short interval with a large collection produces a large payload. |
| **Auto Connect** | Starts sending automatically when the profile is loaded. Enabled by default. |
| **Collections** | The profile tag collections to export. Add one or more. |

### HTTPS Settings

| Setting | Purpose |
|---|---|
| **Remote base URL** | The remote Profinity base URL, for example `https://receiver:443/`. The path `/api/v2/Relay/snapshot` is appended. Required when the protocol is HTTPS. |
| **Bearer token** | A JSON Web Token (JWT) for a user on the remote instance with the **Receive external tags** permission (or Admin). Use the token of a service account created on the receiving instance for this, so the relay keeps working without anyone signing in again. Required to start the sender when the protocol is HTTPS, and stored encrypted. |
| **Trust all server certificates** | Disables Transport Layer Security (TLS) server certificate validation. Enable only when connecting to a trusted receiver that uses a self-signed certificate. |

### MQTT Settings

| Setting | Purpose |
|---|---|
| **MQTT broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS. Required when the protocol is MQTT. |
| **MQTT broker port** | The broker's port. Defaults to `1883`. A port written in the broker URL takes precedence, and with an `mqtts://` URL that has no port, leaving this at `1883` connects on `8883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **MQTT username** / **MQTT password** | Credentials for broker authentication, when the broker requires them. The password is stored encrypted. |
| **MQTT client id** | Optional MQTT client ID. Leave blank to generate one, and give each client on the broker a different ID. |
| **MQTT snapshot topic** | The topic the UTF-8 JSON snapshot is published on, for example `profinity/relay/site1`. Required to start the sender when the protocol is MQTT, and the receiver must subscribe to the same topic. |

## Running the Sender

The component shows **On** while it is running and **Off** when it is stopped. **Start Sender** and **Stop Sender** actions, and a toggle combining the two, are available on the component, and the component's dashboard shows its status and the total number of messages sent. The status reflects whether the sender is running and not whether the last snapshot was delivered, so a sender that shows **On** can still be failing to deliver. The total number of messages sent increases only when a snapshot is delivered.

## Troubleshooting

If the sender shows **Error**, it is running but cannot reach its broker, so it retries every second and the log records the reason once. If the sender does not start at all, check the [Logs](../../Getting_Started/Profinity_Log.md). The sender refuses to start, and logs the reason, when no collection is selected, when a selected collection does not exist, when the HTTPS protocol is missing the **Remote base URL** or **Bearer token**, or when the MQTT protocol is missing the **MQTT broker URL** or **MQTT snapshot topic**.

If the sender shows **On** but the total number of messages sent stays at zero, the log holds a warning for each failed snapshot. Over HTTPS the warning carries the response code from the receiver, where 401 or 403 points to a missing or invalid token or a user without the **Receive external tags** permission, 409 means the receiver rejected the batch because of a [collision](../../Tags/Tag_Relay.md#collision-rules) with a tag that relay does not own, and 400 means the receiver rejected the request, which includes a request body over 5 MB. Over MQTT, the sender retries a lost broker connection every second and logs each failed connection, so check the broker URL, port, credentials and TLS settings.

If the sender delivers but nothing appears on the receiver, confirm that the receiver uses the same protocol and, for MQTT, subscribes to the same topic as the **MQTT snapshot topic**.

## Related Documentation

- [Tag Relays](index.md), including how to set up a first relay.
- [Tag Relay Receiver](Tag_Relay_Receiver.md)
- [Tag Relay](../../Tags/Tag_Relay.md)
- [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md), for granting the **Receive external tags** permission.
