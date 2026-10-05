---
title: Tag Relay Sender
description: "Publish a snapshot of selected tag collections to a remote Profinity instance over HTTPS or MQTT."
---

# Tag Relay Sender

The **Tag Relay Sender** exports the tags that belong to the collections you select and sends them, at a fixed interval, to a remote Profinity instance running a [Tag Relay Receiver](Tag_Relay_Receiver.md). It sits in the **Tag Relays** category and requires the **Data Relay** licensed feature.

Everything the sender exports is a **tag**, Profinity's common data model for a signal, which is described in the [Tag layer](../../Tags/index.md) documentation. The position of each tag in the exported tree is its [tag tree path](../../Tags/Tag_Tree_Path.md), and the concept of sender and receiver roles is covered in [Tag relay](../../Tags/Tag_Relay.md).

## Adding a Tag Relay Sender

Add a **Tag Relay Sender** component to your profile from the **Tag Relays** category, choose the protocol, and select the collections to export. Only the member tags of the selected collections are sent, so create the collections first, as described in [Collections](../../Tags/Collections.md).

### Tag relay settings

| Setting | Purpose |
|---|---|
| **Protocol** | **HTTPS** posts the snapshot to the remote instance's relay API, and **MQTT** publishes it as a JSON payload on a broker. Defaults to HTTPS. |
| **Sender tag path prefix** | Optional. Prepended as outer path segments on the exported tree. |
| **Exclude relay-managed nodes** | Excludes tags that were themselves received from another Tag Relay, so that mirrored data is not sent on again in a loop. Enabled by default. |
| **Snapshot interval (seconds)** | How often a snapshot is published or posted, from 5 to 86400 seconds. Defaults to 60. |
| **Auto Start** | Starts sending automatically when the profile is loaded. Enabled by default. |
| **Collections** | The profile tag collections to export. Add one or more. |

### HTTPS settings

| Setting | Purpose |
|---|---|
| **Remote base URL** | The remote Profinity base URL, for example `https://receiver:443/`. The path `/api/v2/Relay/snapshot` is appended. Required when the protocol is HTTPS. |
| **Bearer token** | A JWT for a user on the remote instance with the `ReceiveExternalTags` permission (or Admin). Stored encrypted at rest. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted receiver that uses a self-signed certificate. |

### MQTT settings

| Setting | Purpose |
|---|---|
| **MQTT broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS. Required when the protocol is MQTT. |
| **MQTT broker port** | The broker's port. Defaults to `1883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **MQTT username** / **MQTT password** | Credentials for broker authentication, when the broker requires them. The password is stored encrypted at rest. |
| **MQTT client id** | Optional MQTT client ID. |
| **MQTT snapshot topic** | The topic the UTF-8 JSON snapshot envelope is published on. The receiver must subscribe to the same topic. |

## Running the sender

The component reports **STATE_ON** while it is sending and **STATE_OFF** when it is stopped. **Start Sender** and **Stop Sender** actions, and a toggle combining the two, are available on the component, and the component's dashboard shows its status and the total number of messages sent.

## Related documentation

- [Tag Relays](index.md)
- [Tag Relay Receiver](Tag_Relay_Receiver.md)
- [Tag relay](../../Tags/Tag_Relay.md)
- [Tag layer](../../Tags/index.md)
- [Collections](../../Tags/Collections.md)
