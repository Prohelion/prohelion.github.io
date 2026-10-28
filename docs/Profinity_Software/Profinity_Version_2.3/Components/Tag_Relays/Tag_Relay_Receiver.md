---
title: Tag Relay Receiver
description: "Receive tags from remote Profinity instances over MQTT or HTTPS and mount them as read-only tags under a per-site prefix."
type: component
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag Relay Receiver

The **Tag Relay Receiver** ingests the snapshots published by one or more [Tag Relay Senders](Tag_Relay_Sender.md).
It mounts the incoming [tags](../../Tags/index.md) in the local tag tree as read-only tags, beneath a prefix that identifies where they came from.
It sits in the **Tag Relays** category and receives over Message Queuing Telemetry Transport (MQTT) or HTTPS.
Once relayed tags are mounted they behave like any other tag.
You can browse them in Tag Explorer, place them in [collections](../../Tags/Collections/index.md), show them on a [dashboard](../../Customising_Profinity/Dashboards/index.md), log them, and use them in rules and scripts.
The [Tag relay](../../Tags/Tag_Relay.md) page covers the concept, collision rules and limitations.

<figure markdown>
```mermaid
flowchart LR
    subgraph Sending["Sending instance"]
        Collections["Tag collections"] --> Sender["Tag Relay Sender"]
    end
    subgraph Receiving["Receiving instance"]
        Receiver["Tag Relay Receiver"] --> Tags["Read-only tags"]
    end
    Sender --> Receiver
```
<figcaption>The Tag Relay Sender in the sending instance sends a snapshot of its tag collections to the Tag Relay Receiver in the receiving instance, directly over HTTPS or through an MQTT broker, and the receiver mounts them as read-only tags</figcaption>
</figure>

<figure markdown>
![Diagram of Tag Relay. Site instances each run a Tag Relay Sender that publishes live tags over HTTPS with a JSON Web Token (JWT) or over MQTT. A central instance runs a Tag Relay Receiver that shows the tags of each site under its own prefix, for example SiteA/System1/Battery/PackVoltage](../../images/diagram-tag-relay.png)
<figcaption>Sender and receiver roles, with per-site tag prefixes on the receiving instance</figcaption>
</figure>

!!! info "Licence required"
    The Tag Relay Receiver requires the **Data Relay** licensed feature. Refer to [Licensing](../../Licensing.md) for the editions that include it.

## Quick start {#adding-a-tag-relay-receiver}

To set up a first relay end to end, refer to [Set up a tag relay](Set_Up_a_Tag_Relay.md).

1. Add a **Tag Relay Receiver** to your profile from the **Tag Relays** category.
2. Set **Protocol** to **MQTT** or **HTTPS**.
3. Set a **Receiver tag path prefix** that is not the tag path of a component, and does not contain or sit inside the tag path of a component or of another receiver's prefix.
4. Enter the settings for your protocol.
   For MQTT, enter the **MQTT broker URL** and **MQTT subscribe topic** from [MQTT settings](#mqtt-settings).
   For HTTPS, follow [Receiving over HTTPS](#receiving-over-https).
5. Save the settings.
   If a prefix clashes, the save reports "Tag destination ... overlaps ... Choose a unique destination." and you choose a different prefix.
   With the **MQTT** protocol and **Auto Connect** on, which is the default, the receiver connects when the profile loads and its status shows **On**.

To check that it works, wait for a snapshot from the sender and open Tag Explorer.
The relayed tags appear under the **Receiver tag path prefix**.

## Settings

### Tag Relay settings

| Setting | Purpose |
|---|---|
| **Protocol** | **MQTT** subscribes to a broker topic and applies each snapshot it receives. **HTTPS** uses the relay API on this instance, so the component makes no outbound connection. Defaults to MQTT. |
| **Receiver tag path prefix** | Required. The profile subtree that every ingest batch is applied under. It must not equal or overlap the tag path of any component or the prefix of another receiver in the profile. The sender's prefix is appended beneath it, as shown in [Set up a tag relay](Set_Up_a_Tag_Relay.md). Refer to [Tag tree paths and dashboard binds](../../Tags/Selecting_Tags/Tag_Tree_Path.md). |

### MQTT settings

| Setting | Purpose |
|---|---|
| **Auto Connect** | With the **MQTT** protocol, connects to the broker when the profile loads. On by default. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |
| **MQTT broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable Transport Layer Security (TLS). Required when the protocol is MQTT. |
| **MQTT broker port** | The broker's port. Defaults to `1883`. A port in the broker URL takes precedence. With an `mqtts://` URL that has no port, leaving this at `1883` connects on `8883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **MQTT username** / **MQTT password** | Credentials for broker authentication, when the broker requires them. The password is stored encrypted. |
| **MQTT client id** | Optional. Leave blank to generate a client ID. Each client on the broker needs a different ID. |
| **MQTT subscribe topic** | The topic carrying the JSON snapshots, for example `profinity/relay/site1`. Required when the protocol is MQTT. It must match the sender's **MQTT snapshot topic**. |

### Receiving over HTTPS

When the protocol is HTTPS, the sender posts directly to this instance.
It uses a JSON Web Token (JWT) for a user with the **Receive external tags** permission, or for an Admin user.
Create a service account on this instance with that permission and give its token to the sender.
Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md) for how to grant the permission.
The Tag Relay Receiver component supplies the receiver prefix and only displays the receiving state.
An instance accepts a relay post for only one Tag Relay Receiver set to HTTPS, so add a single HTTPS receiver per instance.
To call the relay API directly, refer to the [Endpoint Reference](../../Integrating_to_Profinity/APIs/Endpoint_Reference.md#tag-relay).

!!! warning "Relayed tags are read-only"
    A tag created by the receiver cannot be written to from a dashboard, a script or any other source.
    Only the next snapshot from the sender updates it.
    A path already used by a tag that relay does not own, such as a local device tag, causes the whole batch to be rejected.
    Refer to [Collision rules](../../Tags/Tag_Relay.md#collision-rules).

## Monitoring the receiver

The component shows **On** while it is receiving and **Off** when it is stopped.
Saving the settings of a running receiver stops it, so check that it shows **On** afterwards and start it again if it shows **Off**.
Its dashboard shows its status and the total number of messages received.
The status shows whether the receiver is running, not whether the broker connection is established.

## Broker connection messages in the log

A receiver set to MQTT connects to the broker in the background, and starting never fails because the broker is down.
When the broker cannot be reached, the log records the problem like this:

- The first failed connection attempt of an outage is written at error level, with the reason and the retry interval of 5 seconds.
- Later failed attempts during the same outage are written at debug level only.
- A broker that disconnects a running receiver is written as a warning each time it happens.
- When the connection returns, the log records that the Tag Relay subscriber reconnected.

When the broker drops a running receiver, the relayed tags keep their last value and are marked **Stale** until the sender's next snapshot arrives.

A snapshot that cannot be applied is not collapsed in the same way.
Each snapshot that is not valid JSON, has the wrong format, or conflicts with an existing tag is written to the log as a warning.

## Troubleshooting

If no tags appear, check the [Logs](../../Administration/Logs_Config.md) first.
A receiver set to MQTT that has no **MQTT broker URL** or **MQTT subscribe topic** does not start and logs the reason.

A receiver that shows **On** but receives nothing has one of two problems:

- A broker connection problem. The receiver keeps retrying every 5 seconds, and the log records it as described under [Broker connection messages in the log](#broker-connection-messages-in-the-log).
- An **MQTT subscribe topic** that differs from the sender's **MQTT snapshot topic**.

If snapshots arrive but the tags do not update, a path in the batch may already be used by a tag that relay does not own.
The receiver then rejects the whole batch.
The log of an MQTT receiver then shows an ingest conflict warning, and a sender using HTTPS receives a 409 response.
The receiver writes this warning for every rejected snapshot, so it repeats for as long as the conflict lasts.
Change the **Receiver tag path prefix** or the sender's **Sender tag path prefix** so that the relayed tags mount in an empty subtree.

Over HTTPS, a 401 or 403 response at the sender means the token is missing, invalid, or belongs to a user without the **Receive external tags** permission.
A 409 response can also mean that more than one Tag Relay Receiver set to HTTPS is active on this instance.
