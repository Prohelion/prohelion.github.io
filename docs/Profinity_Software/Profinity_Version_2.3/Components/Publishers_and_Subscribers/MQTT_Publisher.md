---
title: MQTT Publisher
description: "Publish profile tag collections to MQTT brokers in JSON or Sparkplug B format on interval or change."
---

# MQTT Publisher

The **MQTT Publisher** pushes the current values of one or more profile [tag collections](../../Tags/Collections.md) to an
MQTT broker, either on a fixed interval or whenever a member tag's value changes. It sits in the
**Publishers & Subscribers** category rather than **Loggers**: a logger writes to a queryable
store — a file, a database, a time-series engine — for later, disconnected retrieval, whereas a
publisher pushes to a subscriber that is actively listening right now, the same distinction that
also separates the [Webhook Publisher](./Webhook_Publisher.md) from the file and database loggers
under [Loggers](../Loggers/File_Loggers.md). A component configured under its previous name,
**MQTT Logger**, is unaffected: no configuration or wire behaviour has changed, only the
category and component name.

!!! info "Licence required"
    The MQTT Publisher requires the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

To go in the other direction, subscribing to an external MQTT/Sparkplug source and bringing
its values into Profinity as tags, see the [MQTT Subscriber](MQTT_Subscriber.md), the
publisher's inbound counterpart.

## About MQTT

MQTT is a publish-subscribe messaging protocol built for low-bandwidth, high-latency networks,
which makes it well suited to Internet of Things (IoT) and telemetry use cases. A broker sits between publishers and
subscribers and handles message delivery, so Profinity does not need a direct connection to every
downstream consumer — it publishes once to the broker, and every subscriber to that topic
receives the update.

## Setting up an MQTT broker

The MQTT Publisher connects to a broker you provide — Profinity does not run one itself. Options
include:

- **A local or self-hosted broker**, such as [Mosquitto](https://mosquitto.org/) or
  [HiveMQ](https://www.hivemq.com/).
- **A managed cloud MQTT service**, such as [AWS IoT](https://aws.amazon.com/iot/) or
  [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/).

## Adding an MQTT Publisher

Add an **MQTT Publisher** component to your profile from the **Publishers & Subscribers**
category, then configure its settings.

### Connection settings

| Setting | Purpose |
|---|---|
| **Server URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS; use `mqtt://` for an unencrypted connection. |
| **Trust all server certificates** | Disables TLS server certificate validation for this connection. Enable only when connecting to a trusted broker using a self-signed certificate. |
| **Username** / **Password** | Credentials for broker authentication, when the broker requires them. Password is stored encrypted at rest and can be left empty for username-only authentication. |
| **Device ID** | The MQTT client ID this publisher connects with. Also used as the Sparkplug **Edge Node ID** when that field is left empty. |
| **Payload** | **JSON** publishes a flat object to the destination topic; **Sparkplug B** publishes `NBIRTH`/`NDATA`/`NDEATH` messages on `spBv1.0` node topics. See [Payload formats](#payload-formats) below. |
| **Destination Topic** | The topic the flat JSON payload is published to. Shown only when **Payload** is set to **JSON**. |

### Sparkplug settings

Shown only when **Payload** is set to **Sparkplug B**:

| Setting | Purpose |
|---|---|
| **Group ID** | The Sparkplug `group_id` used in the `spBv1.0` topic path. |
| **Edge Node ID** | The Sparkplug `edge_node_id`. Defaults to **Device ID** when left empty. |

### Logger settings

| Setting | Purpose |
|---|---|
| **Auto Start** | Starts the publisher automatically when the profile is loaded, and is enabled by default. |
| **Logging mode** | **Snapshot** publishes every collection member on each interval tick, regardless of whether the value changed; **On Change** publishes only when a member's value has changed since the last publish; **Everything** publishes every sample that arrives, including unchanged ones. |
| **Update Interval (Seconds)** | For **Snapshot** mode, how often a full publish runs. For **On Change**/**Everything**, how often accumulated changes are flushed. |

## Payload formats

**JSON** publishes a flat object of tag key to numeric value — for example, `Vehicles/Car1/Speed`
becomes the key `Vehicles_Car1_Speed` — with no timestamp, quality, or metadata alongside it.
This shape is intentionally minimal and matches what brokers such as ThingsBoard expect out of
the box. Only samples with good quality and a recent timestamp are included; a sample that fails
either check is silently dropped from that publish rather than sent with a stale or bad value.

**Sparkplug B** publishes the industry-standard Sparkplug topic and payload convention: a birth
certificate (`NBIRTH`) on connect, data messages (`NDATA`) on each publish, and a broker-delivered
death certificate (`NDEATH`) via MQTT's Last Will and Testament if the connection drops
unexpectedly. The publisher also subscribes to a Sparkplug command topic and republishes a birth certificate on
request, matching how a Sparkplug-aware SCADA or IIoT platform expects an edge node to behave.
Sparkplug B is not offered on the [Webhook Publisher](./Webhook_Publisher.md): it is a
topic-namespace and session convention specific to MQTT, not a serialisation format that has any
meaning over a stateless HTTP POST.

## Status

The MQTT Publisher reports **Error** status if the connection to the broker fails or a publish
attempt fails, and returns to its normal running status on the next successful publish, the same
status behaviour as every other logger and publisher component. While the connection is down, the
publisher tries to reconnect to the broker every 5 seconds. Check the
[Logs](../../Getting_Started/Profinity_Log.md) for the underlying error when a publisher shows an
error state.

## Related documentation

- [Webhook Publisher](./Webhook_Publisher.md)
- [MQTT Subscriber](MQTT_Subscriber.md)
- [File and Tag Loggers](../Loggers/File_Loggers.md)
- [Rule actions and scripts](../../Tags/Actions.md)
