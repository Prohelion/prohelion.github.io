---
title: Publishers and Subscribers
description: "Publish profile tag collections to MQTT brokers or web services, or subscribe to external Sparkplug B sources, and choose between a publisher, a logger and a Tag Relay."
---

# Publishers and Subscribers

The **Publishers & Subscribers** category holds the components that move tag values between Profinity and other systems while both ends are running. A publisher pushes the current values of one or more profile [tag collections](../../Tags/Collections.md) to a receiver that is listening now, and a subscriber brings data from an external source into the profile tag tree as ordinary read-only tags, which can then be shown on a [dashboard](../../Customising_Profinity/Dashboards/index.md), logged, used in a rule or read by a script.

| Component | Direction | Connects to | Use it when |
|---|---|---|---|
| [MQTT Publisher](MQTT_Publisher.md) | Out of Profinity | A Message Queuing Telemetry Transport (MQTT) broker, in JSON or Sparkplug B format | Other systems already subscribe to a broker for your data. |
| [Webhook Publisher](Webhook_Publisher.md) | Out of Profinity | An HTTP or HTTPS address, with an HTTP POST and a JSON payload | The consumer is an ordinary web service rather than a broker. |
| [MQTT Subscriber](MQTT_Subscriber.md) | Into Profinity | A Sparkplug B namespace on an MQTT broker | The data comes from an external edge node, gateway or industrial IoT platform. |

!!! info "Licence Required"
    All three components require the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions. Without it the components are unavailable. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

## Choosing Between a Publisher, a Logger and a Tag Relay

A publisher sits in this category rather than with the [loggers](../Loggers/File_Loggers.md) because a publisher pushes to a receiver that is listening now, whereas a logger writes to a file or database for later retrieval. To share tags between two Profinity instances, use [Tag Relay](../Tag_Relays/index.md) instead, which has its own snapshot format and does not use Sparkplug.

The two publishers share the same trigger modes, either on a fixed interval or whenever a member tag's value changes, and neither starts until at least one collection is selected and every selected collection exists in the profile.
