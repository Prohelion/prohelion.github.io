---
title: Webhook and MQTT rule actions
description: Send rule notifications to an HTTP endpoint or an MQTT broker, with the JSON message format, a guide to choosing between them, and the action settings.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Webhook and MQTT rule actions

A rule can fire a **Webhook** action or a Message Queuing Telemetry Transport (MQTT) action when it transitions.
The notification goes to a generic HTTP destination or an MQTT broker.
Both actions send the same message, so a subscriber sees an identical structure whichever one a rule uses.

The message is JSON with these properties:

- The property names are camelCase.
- `ruleId` is the stable identifier of the rule, and `ruleName` is its name.
- `triggerTagId` is the tag whose change caused this firing.
- `message` is the alert message with its placeholders expanded, which is the text the Slack and Email actions send. It is empty when the rule has no message.
- `transition` is one of `EnteredTrue`, `EnteredFalse`, `EnteredStep`, or `ExitedStep`.
- `triggeringTags` holds the same tags that a script receives as `TriggeredTags`, but each row carries `tagId`, `value`, and `quality` only.

For example:

```json
{
  "ruleId": "high-battery-temp",
  "ruleName": "High battery temperature",
  "transition": "EnteredTrue",
  "triggerTagId": "Vehicles/Car1/BatteryTemp",
  "message": "Battery temperature exceeded 60C",
  "triggeringTags": [
    { "tagId": "Vehicles/Car1/BatteryTemp", "value": 63.2, "quality": "Good" }
  ]
}
```

| Use the **Webhook** action when... | Use the **MQTT** action when... |
|---|---|
| The receiver is an ordinary HTTP service, such as an internal API, an integration platform, or a chat or incident tool with a generic webhook intake. | MQTT broker infrastructure is already in place, for example alongside an [MQTT Publisher](../../../Components/Publishers_and_Subscribers/MQTT_Publisher.md). |
| There is no MQTT broker to publish to. | Several systems need to subscribe to the same rule notifications through one broker topic. |

Each firing opens a connection, sends the message, and closes the connection.
An action that has not finished within 10 seconds is cancelled.
Profinity writes an error naming the action, the rule, and the tag to the Profinity log, and the other rules and actions keep running.
When a Webhook destination or MQTT broker cannot be reached, the alert still appears in the Alerts Log.
The failure appears only in the Profinity log.

## Webhook action settings

| Setting | Purpose |
|---|---|
| **Destination URL** | The HTTP or HTTPS endpoint the action posts to when the rule transitions. Stored encrypted. |
| **Auth mode** | **None**, **Bearer token**, **API key header** or **Basic auth**, the same four modes as the [Webhook Publisher](../../../Components/Publishers_and_Subscribers/Webhook_Publisher.md). |
| **Bearer token** | Shown when **Auth mode** is **Bearer token**. Sent as `Authorization: Bearer <token>`. |
| **API key header name** / **API key header value** | Shown when **Auth mode** is **API key header**. The header name and value sent on every request, for example `X-Api-Key`. |
| **Basic auth username** / **Basic auth password** | Shown when **Auth mode** is **Basic auth**. |

The **Destination URL** may embed a token, for example `https://host/hooks/<secret>`.
Saving without a bearer token reports "You must provide a bearer token when auth mode is Bearer token."
The other modes report a matching message for their missing fields.

## MQTT action settings

| Setting | Purpose |
|---|---|
| **Broker URL** | The broker's connection URL, with a scheme of `mqtt`, `mqtts`, `http`, or `https`. Use `mqtts://` to enable Transport Layer Security (TLS). |
| **Trust all server certificates** | Disables TLS server certificate validation for this action. Enable only for a trusted broker with a self-signed certificate. |
| **Username** / **Password** | Credentials for broker authentication. The password is required but may be empty, and is stored encrypted. |
| **Client ID** | Optional. Leave blank, and Profinity generates a new client identifier for every firing. |
| **Destination topic** | The topic the message is published to when the action fires. Required. |
| **Quality of service** | **At most once**, **At least once** (default) or **Exactly once**, the Quality of Service (QoS) level used for the publish. |

Both actions need the **Tag Rule Actions** licensed feature, as described in [Rule actions](index.md).
To add one to a profile so that a rule can select it, refer to [Making an action available](index.md#making-an-action-available).
For the Email and Slack actions, refer to [Email and Slack rule actions](Email_and_Slack_Rule_Actions.md).
