---
title: MQTT Publisher
description: "Publish profile tag collections to MQTT brokers in JSON or Sparkplug B format on interval or change."
---

# MQTT Publisher

The **MQTT Publisher** pushes the current values of one or more profile [tag collections](../../Tags/Collections.md) to a Message Queuing Telemetry Transport (MQTT) broker, either on a fixed interval or whenever a member tag's value changes, so that any system subscribed to the broker receives the data as it is published. It sits in the **Publishers & Subscribers** category rather than **Loggers** because a publisher pushes to a subscriber that is listening now, whereas a [logger](../Loggers/File_Loggers.md) writes to a file or database for later retrieval. To bring data from an external MQTT or Sparkplug source into Profinity instead, use the [MQTT Subscriber](MQTT_Subscriber.md). Profinity 2.3 renamed the component from **MQTT Logger**, and existing MQTT Logger configurations keep working unchanged.

!!! info "Licence Required"
    The MQTT Publisher requires the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

## Setting Up an MQTT Broker

The MQTT Publisher connects to a broker you provide, because Profinity does not run one itself. Use a self-hosted broker such as [Mosquitto](https://mosquitto.org/) or [HiveMQ](https://www.hivemq.com/), or a managed cloud MQTT service.

## Adding an MQTT Publisher

Add an **MQTT Publisher** component to your profile from the **Publishers & Subscribers** category, then configure its settings. The publisher does not start until at least one collection is selected and every selected collection exists in the profile.

### Connection Settings

| Setting | Required | Purpose |
|---|---|---|
| **Server URL** | Yes | The broker's connection URL, for example `mqtt://broker.example.com:1883`. The accepted schemes are `mqtt`, `mqtts`, `http` and `https`. Use `mqtts://` to enable Transport Layer Security (TLS) and `mqtt://` for an unencrypted connection. The port is taken from the URL, and when the URL has no port the publisher uses 1883 for `mqtt://` and 8883 for `mqtts://`. |
| **Trust all server certificates** | No | Disables TLS server certificate validation for this connection. Enable only when connecting to a trusted broker using a self-signed certificate. |
| **Username** / **Password** | No | Credentials for broker authentication, when the broker requires them. The password is stored encrypted and can be left empty for username-only authentication. |
| **Device ID** | Yes | The MQTT client ID this publisher connects with, which must be unique among the clients connected to the broker. It is also used as the Sparkplug **Edge Node ID** when that field is left empty. |
| **Payload** | No | **JSON** publishes a flat object to the destination topic, and **Sparkplug B** publishes node birth, data and death messages on Sparkplug topics. Defaults to **JSON**. See [Payload Formats](#payload-formats). |
| **Destination Topic** | Yes, for JSON | The topic the flat JSON payload is published to, for example `profinity/site1/tags`. Shown only when **Payload** is **JSON**. A save without it fails with "You must provide a destination topic." |

### Sparkplug Settings

Shown only when **Payload** is **Sparkplug B**:

| Setting | Required | Purpose |
|---|---|---|
| **Group ID** | Yes | The Sparkplug group ID used in the topic path. A save without it fails with "You must provide a Sparkplug Group ID." |
| **Edge Node ID** | No | The Sparkplug edge node ID. Defaults to **Device ID** when left empty. |

### Logger Settings

| Setting | Default | Purpose |
|---|---|---|
| **Collections** | None | The tag collections to publish. Add one or more, and choose each by name in the **Collection** field. An empty entry fails validation with "You must select a collection." |
| **Auto Start** | On | Starts the publisher automatically when the profile is loaded. |
| **Logging mode** | **Snapshot** | **Snapshot** publishes every collection member on each interval tick, regardless of whether the value changed. **On Change** publishes only when a member's value has changed since the last publish. **Everything** publishes every sample that arrives, including unchanged ones. |
| **Update Interval (Seconds)** | 10 | From 10 to 86400 seconds. In **Snapshot** mode this is how often a full publish runs, and in **On Change** and **Everything** modes it is how often accumulated changes are sent. |

## Payload Formats

**JSON** publishes a flat object of tag key to numeric value with no timestamp, quality or metadata alongside it. Each key is the tag path with every character other than a letter or digit replaced by an underscore, so `Vehicles/Car1/Speed` becomes the key `Vehicles_Car1_Speed`. A sample is included only when it has good quality, is no more than 5 seconds old by default, and holds a finite number. A tag that is not updating, or whose value is not numeric, therefore does not appear in the payload.

**Sparkplug B** follows the [Sparkplug](https://sparkplug.eclipse.org/) topic and payload convention. The publisher sends a birth message (`NBIRTH`) on connect, data messages (`NDATA`) on each publish, and a death message (`NDEATH`) that the broker delivers if the connection drops unexpectedly. Topics take the form `spBv1.0/{group}/NDATA/{edgeNode}`. The publisher also subscribes to the node command topic and republishes its birth message when a Sparkplug-aware platform requests a rebirth. Sparkplug B is available on the MQTT Publisher only, not on the [Webhook Publisher](Webhook_Publisher.md).

## Status

The MQTT Publisher shows **On** while it is running, **Off** when it is stopped, and **Error** when the connection to the broker fails or a publish fails. The status returns to **On** after the next successful publish.

In Sparkplug B mode the publisher retries a lost connection every 5 seconds. In JSON mode the publisher connects when it starts, so a broker that is unreachable at that point leaves the component in **Error** and publishing stops until the publisher is started again with **Start Logger**.

If the status shows **Error**, check the [Logs](../../Getting_Started/Profinity_Log.md) for the underlying message, then confirm that the **Server URL** scheme and port match the broker, that the **Username** and **Password** are accepted, and that a **Device ID** is not already in use by another client. A broker with a self-signed certificate also needs **Trust all server certificates** enabled.

## Related Documentation

- [Webhook Publisher](Webhook_Publisher.md) and [MQTT Subscriber](MQTT_Subscriber.md), the other Publishers & Subscribers components.
- [File and Tag Loggers](../Loggers/File_Loggers.md), for writing to a file or database.
- [Rule actions and scripts](../../Tags/Actions.md), where a rule can also send a one-off MQTT message or webhook. Rule actions need the **Tag Rule Actions** licensed feature.
