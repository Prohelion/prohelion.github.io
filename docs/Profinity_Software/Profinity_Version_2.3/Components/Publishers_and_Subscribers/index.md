---
title: Publishers and Subscribers
description: "Choose a publisher or subscriber to move tag values between Profinity and MQTT brokers, web services or Sparkplug B sources, or use a logger or Tag Relay."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Publishers and Subscribers

The **Publishers & Subscribers** category holds the components that move tag values between Profinity and other systems while both ends are running.
A publisher pushes the current values of one or more profile [tag collections](../../Tags/Collections/index.md) to a receiver that is listening now.
A subscriber brings data from an external source into the profile tag tree as ordinary read-only tags.
You can show those tags on a [dashboard](../../Customising_Profinity/Dashboards/index.md), log them, use them in a rule or read them from a script.

| Component | Direction | Connects to | Use it when |
|---|---|---|---|
| [MQTT Publisher](MQTT_Publisher.md) | Out of Profinity | A Message Queuing Telemetry Transport (MQTT) broker, in JSON or Sparkplug B format. Sparkplug B is an MQTT payload format for industrial data. | Other systems already subscribe to a broker for your data. |
| [Webhook Publisher](Webhook_Publisher.md) | Out of Profinity | An HTTP or HTTPS address, with an HTTP POST and a JSON payload | The consumer is an ordinary web service rather than a broker. |
| [MQTT Subscriber](MQTT_Subscriber.md) | Into Profinity | A Sparkplug B namespace on an MQTT broker | The data comes from an external edge node, gateway, or industrial IoT platform. |

All three components have **Auto Connect** on by default.
The data format and the retry behaviour differ.
The [Webhook Publisher](Webhook_Publisher.md) page lists what counts as a failed attempt.

| Component | Selects data by | Data format | Retries |
|---|---|---|---|
| MQTT Publisher | Tag collections | JSON, a flat object of tag key to numeric value, or Sparkplug B | Keeps trying to connect every 5 seconds |
| Webhook Publisher | Tag collections | A JSON array of samples, in one POST for each publish | Makes up to three attempts for each publish, and does not retry a batch after the third failure |
| MQTT Subscriber | **Topic filter** | Sparkplug B metrics, scalar types only, written as read-only tags | Keeps trying to connect every 5 seconds |

All three components require the **Data Relay** licensed feature.
Refer to [Licensing](../../Licensing.md) for the editions that include it.

## Choosing between a publisher, a logger and a Tag Relay

A publisher pushes to a receiver that is listening now, whereas a [logger](../Loggers/index.md) writes to a file or database for later retrieval.
To share tags between two Profinity instances, use [Tag Relay](../Tag_Relays/index.md) instead, which has its own snapshot format and does not use Sparkplug.

The two publishers share the **Logging mode** setting, described in [Logging modes](../Logging_Modes.md).
Neither starts until at least one collection is selected and every selected collection exists in the profile.
