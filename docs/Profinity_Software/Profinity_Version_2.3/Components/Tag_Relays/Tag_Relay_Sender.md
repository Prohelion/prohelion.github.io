---
title: Tag Relay Sender
description: "Publish a snapshot of selected tag collections to a remote Profinity instance over HTTPS or MQTT at a fixed interval."
type: component
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag Relay Sender

The **Tag Relay Sender** exports the [tags](../../Tags/index.md) that belong to the [collections](../../Tags/Collections/index.md) you select.
It sends them, as a full snapshot at a fixed interval, to a remote Profinity instance running a [Tag Relay Receiver](Tag_Relay_Receiver.md).
It sends over HTTPS or Message Queuing Telemetry Transport (MQTT) and sits in the **Tag Relays** category.
The position of each tag in the exported tree is its [tag tree path](../../Tags/Selecting_Tags/Tag_Tree_Path.md).
The [Tag relay](../../Tags/Tag_Relay.md) page covers the concept of sender and receiver roles.

<figure markdown>
![Diagram of Tag Relay. Site instances each run a Tag Relay Sender that publishes live tags over HTTPS with a JSON Web Token (JWT) or over MQTT. A central instance runs a Tag Relay Receiver that shows the tags of each site under its own prefix, for example SiteA/System1/Battery/PackVoltage](../../images/diagram-tag-relay.png)
<figcaption>Sender and receiver roles, with per-site tag prefixes on the receiving instance</figcaption>
</figure>

!!! info "Licence required"
    The Tag Relay Sender requires the **Data Relay** licensed feature. Refer to [Licensing](../../Licensing.md) for the editions that include it.

## Quick start {#adding-a-tag-relay-sender}

Add a **Tag Relay Sender** to your profile from the **Tag Relays** category, choose the protocol, and select the collections to export.
Only the member tags of the selected collections are sent, so create the collections first, as described in [Collections](../../Tags/Collections/index.md).
The sender does not start until at least one collection is selected and every selected collection exists in the profile.
To set up a first relay end to end, refer to [Set up a tag relay](Set_Up_a_Tag_Relay.md).

## Settings

### Tag Relay settings

| Setting | Purpose |
|---|---|
| **Protocol** | **HTTPS** posts the snapshot to the remote instance's relay API, and **MQTT** publishes it as a JSON payload on a broker. Defaults to HTTPS. |
| **Sender tag path prefix** | Optional. Added as outer path segments on the exported tree, beneath the receiver's own **Receiver tag path prefix**. A sender prefix of `Vehicle12` relayed to a receiver prefix of `Fleet` appears at `Fleet/Vehicle12/...`. |
| **Exclude relay-managed nodes** | Excludes tags that were received from another Tag Relay, so that mirrored data is not sent on again in a loop. Enabled by default. |
| **Snapshot interval (seconds)** | How often a snapshot is sent, from 5 to 86400 seconds. Defaults to 60. Each snapshot carries every tag in the selected collections, so a short interval with a large collection produces a large payload. |
| **Auto Connect** | Starts sending when the profile loads. Enabled by default. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |
| **Collections** | The profile tag collections to export. Add one or more. |

### HTTPS settings

| Setting | Purpose |
|---|---|
| **Remote base URL** | The remote Profinity base URL, for example `https://receiver:443/`. Required when the protocol is HTTPS. |
| **Bearer token** | A JSON Web Token (JWT) for a user on the remote instance with the **Receive external tags** permission, or for an Admin user. Use the token of a service account created on the receiving instance, so the relay keeps working without anyone signing in again. Required when the protocol is HTTPS, and stored encrypted. |
| **Trust all server certificates** | Disables Transport Layer Security (TLS) server certificate validation. Enable only when connecting to a trusted receiver that uses a self-signed certificate. |

### MQTT settings

| Setting | Purpose |
|---|---|
| **MQTT broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS. Required when the protocol is MQTT. |
| **MQTT broker port** | The broker's port. Defaults to `1883`. A port in the broker URL takes precedence. With an `mqtts://` URL that has no port, leaving this at `1883` connects on `8883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **MQTT username** / **MQTT password** | Credentials for broker authentication, when the broker requires them. The password is stored encrypted. |
| **MQTT client id** | Optional. Leave blank to generate a client ID. Each client on the broker needs a different ID. |
| **MQTT snapshot topic** | The topic the UTF-8 JSON snapshot is published on, for example `profinity/relay/site1`. Required when the protocol is MQTT. The receiver must subscribe to the same topic. |

## Running the sender

The component shows **On** while it is running and **Off** when it is stopped.
The component has **Start Sender** and **Stop Sender** actions, and a toggle that combines the two.
Its dashboard shows its status and the total number of messages sent.
The status shows whether the sender is running, not whether the last snapshot was delivered, so a sender that shows **On** can still be failing to deliver.
The total number of messages sent increases only when a snapshot is delivered.

## Troubleshooting

If the sender shows **Error**, it is running but cannot reach its MQTT broker.
It retries every second, and the log records the first failure of the outage as an error.
Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md) for how components report an outage.
Check the broker URL, port, credentials, and TLS settings.

If the sender does not start at all, check the [Logs](../../Administration/Logs_Config.md).
The sender refuses to start, and logs the reason, in any of these cases:

- No collection is selected.
- A selected collection does not exist.
- The HTTPS protocol is missing the **Remote base URL** or **Bearer token**.
- The MQTT protocol is missing the **MQTT broker URL** or **MQTT snapshot topic**.

If the sender shows **On** but the total number of messages sent stays at zero, its snapshots are failing, over either protocol.
The log holds a warning for the first failed snapshot of an outage, and records later failures in the same outage at debug level only.
Over HTTPS the warning carries the response code from the receiver:

- 401 or 403 points to a missing or invalid token, or a user without the **Receive external tags** permission.
- 409 means the receiver rejected the batch because of a [collision](../../Tags/Tag_Relay.md#collision-rules) with a tag that relay does not own.
- 400 means the receiver rejected the request, which includes a request body over 5 MB.

If the sender delivers but nothing appears on the receiver, confirm that the receiver uses the same protocol and, for MQTT, subscribes to the same topic as the **MQTT snapshot topic**.

To grant the **Receive external tags** permission that the HTTPS receiver needs, refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
