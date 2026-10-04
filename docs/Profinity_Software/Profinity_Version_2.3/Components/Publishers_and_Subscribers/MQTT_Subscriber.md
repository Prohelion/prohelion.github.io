---
title: MQTT Subscriber
description: "Subscribe to external Sparkplug B sources via MQTT and write incoming metrics into the profile tag tree."
---

# MQTT Subscriber

The **MQTT Subscriber** connects to a broker, subscribes to a Sparkplug B namespace, and writes
the incoming metrics into the profile tag tree as read-only tags — the inbound counterpart to the
[MQTT Publisher](MQTT_Publisher.md), which only sends. It sits in the same **Publishers &
Subscribers** category. Use it to bring an external Sparkplug-speaking edge node or SCADA/IIoT
platform's data into Profinity as ordinary tags, so it can be viewed on a dashboard, logged,
included in a rule, or read by a script the same way any other tag can.

!!! info "Not the same feature as Tag Relay"
    [**Tag Relay**](../../Tags/Tag_Relay.md) (Profinity-to-Profinity)
    moves a snapshot of tags between two Profinity instances over its own proprietary protocol —
    it does not speak Sparkplug, and this component does not replace it. The MQTT Subscriber is
    specifically for an **external**, Sparkplug B source: a third-party edge device, gateway, or
    platform (for example Ignition) publishing Sparkplug over MQTT. Use Tag Relay when both ends
    are Profinity; use the MQTT Publisher and MQTT Subscriber pair when one end is not.

## Adding an MQTT Subscriber

Add an **MQTT Subscriber** component to your profile from the **Publishers & Subscribers**
category, then configure its settings.

### Connection settings

| Setting | Purpose |
|---|---|
| **Server URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS. |
| **Broker port** | The broker's port. Defaults to `1883`. |
| **Trust all server certificates** | Disables TLS server certificate validation. Enable only when connecting to a trusted broker that uses a self-signed certificate. |
| **Username** / **Password** | Credentials for broker authentication, when the broker requires them. Password is stored encrypted at rest. |
| **Client ID** | Optional MQTT client ID. Leave blank to generate one. |

### Sparkplug settings

| Setting | Purpose |
|---|---|
| **Topic filter** | The Sparkplug topic filter to subscribe to. Defaults to `spBv1.0/#` — the whole Sparkplug B namespace. Narrow it to a specific group, for example `spBv1.0/{group}/#`, to subscribe to only that group. |
| **Host ID** | The Sparkplug host ID this subscriber publishes on `spBv1.0/STATE/{hostId}`. Must not contain `+`, `#`, or `/`. |

### Tags settings

| Setting | Purpose |
|---|---|
| **Tag path prefix** | The profile subtree subscribed metrics are written under. Required — this subtree is owned by the subscriber; nothing else may mount tags there. |

## Where tags appear

An incoming metric is written to:

```
{prefix}/{groupId}/{edgeNodeId}/{deviceId}/{metric segments}
```

`{deviceId}` is omitted for a node-level metric (Sparkplug `NBIRTH`/`NDATA`) and present for a
device-level metric (`DBIRTH`/`DDATA`). A metric name that itself contains `/` adds further
segments underneath.

!!! warning "These tags are read-only"
    A tag the MQTT Subscriber creates cannot be written to from a dashboard, a script, or any
    other source — the write is rejected. The only thing that updates one of these tags is the
    next Sparkplug message for that metric. If you need to react to an incoming value and take
    some other action, use a **Run On Tag Change** script watching the tag (see
    [Script Types](../../Developing_with_Profinity/Scripting/Script_Types/index.md)) — the script reads
    the new sample the same way it would for any other tag change; it is not given the raw MQTT
    payload.

If an incoming metric's path is already occupied by something that is not one of this
subscriber's own tags — an existing device tag, a Tag Relay mirror, a script register, or a
derived tag — that one metric is skipped and logged; the rest of the message is still applied.

## Sparkplug behaviour

- **Messages applied:** `NBIRTH`, `NDATA`, `NDEATH`, `DBIRTH`, `DDATA`, `DDEATH`. Both node-level
  and device-level publishers are handled, so a subscriber watching only for node topics does not
  miss a platform that publishes at the device level.
- **Messages ignored as data:** `STATE`, `NCMD`, `DCMD` — even under the default `spBv1.0/#`
  filter, so the subscriber does not mistake its own published `STATE`/rebirth command for
  incoming data.
- **Host state:** The subscriber publishes its own online/offline state, retained, to
  `spBv1.0/STATE/{hostId}`: `{"online": true, "timestamp": <unix ms>}` while connected, and
  `{"online": false, ...}` on a graceful stop or via MQTT's Last Will if the connection drops
  unexpectedly. This retained message is not deleted when the subscriber goes offline — a
  reconnecting subscriber (or a Sparkplug-aware consumer) can see the last known state.
- **Sequence and rebirth:** Sparkplug's per-edge-node sequence number and alias map are tracked
  per edge node. A gap in the sequence triggers this subscriber to request a rebirth (`NCMD`/`DCMD`
  with `Node Control/Rebirth`) rather than applying the gapped payload as current values — so a
  dropped message cannot leave a stale value silently accepted as current.
- **Death, or a birth that omits a previously-known metric:** The tag is not deleted; its
  quality is set to **Stale** instead, so history and dashboard bindings against that tag path
  keep working, just flagged as no longer live.
- **Aliases:** A metric published by alias only (no name) after its birth resolves normally. An
  alias seen with no matching birth is skipped — it is not invented as a new tag.
- **Data types:** Scalar types only — boolean, string, integer widths, float, double, and
  DateTime. Sparkplug dataset, template, bytes, and property-set values are not supported and are
  skipped.
- **Malformed payloads:** A malformed payload is logged and dropped without tearing down the
  session, so one bad message does not disconnect the subscriber.
- **Reconnect:** Reconnection uses an exponential backoff starting at 1 second and capped at 60 seconds — a
  slower, more broker-friendly curve than the MQTT Publisher's fixed 5-second retry, appropriate
  for a subscriber that only needs to catch up on the current state once reconnected, not push on
  a schedule.

## Status

The MQTT Subscriber reports the **On** status while it is connected to the broker, **Error** while
it is running but not connected, and **Off** when it is stopped. While the connection is down, the
subscriber reconnects with the backoff described under Sparkplug behaviour. Check the
[Logs](../../Getting_Started/Profinity_Log.md) for the underlying error when it shows an **Error**
status.

## Related documentation

- [MQTT Publisher](MQTT_Publisher.md)
- [Webhook Publisher](Webhook_Publisher.md)
- [Script Types](../../Developing_with_Profinity/Scripting/Script_Types/index.md)
- [Tag Layer](../../Tags/index.md)
- [Tag Relay](../../Tags/Tag_Relay.md)
