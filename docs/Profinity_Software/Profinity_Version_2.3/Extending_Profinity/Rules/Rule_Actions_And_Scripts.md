---
title: Rule Actions and Scripts
---

# Rule actions and scripts

Profinity 2.3 rules can run **built-in actions**, **Webhook**/**MQTT** actions, and a **script**
set to **Run On Alert** mode. Every action receives an **action context** that includes
**`TriggeredTags`** — the tags that caused the rule to fire.

## Rules visual editor

Open rules from:

- Side menu → **RULES** (`/tags?view=tag_rules`) when the profile exposes tag rules, or
- Component/profile **rules** settings and visual editor.

<figure markdown>
![Rules visual editor with expanded rule showing threshold and dwell fields](../../../../assets/images/2.3/2.3-rules-visual-editor.png)
<figcaption>Rules visual editor (screenshot placeholder — provide SS-26)</figcaption>
</figure>

Configure:

- Thresholds and conditions on tag values.
- **Dwell** and **deadband** for stable alerting.
- **`description`** — text shown in ALL ALERTS.
- **`level`** — severity for filtering and display.
- **`evaluationTickSeconds`** — engine evaluation interval.

## Action picker

When editing a rule, add actions from the action picker:

- Built-in actions: **ProfinityLog** and **None**.
- **Webhook** and **MQTT** actions — see [Webhook and MQTT actions](#webhook-and-mqtt-actions) below.
- Component actions such as **Slack** and **Email**.
- Any **C#**, **Python**, or **Lua Script** component set to **Run On Alert** mode.

<figure markdown>
![Rule action picker showing built-in, Webhook/MQTT, and script actions](../../../../assets/images/2.3/2.3-rule-action-picker.png)
<figcaption>Rule action picker (screenshot placeholder — provide SS-27)</figcaption>
</figure>

!!! info "Dedicated Rule Script components are gone"
    Earlier 2.3 builds had dedicated **C# Rule Script**/**Python Rule Script**/**Lua Rule Script**
    components and a `Profinity.Rule` script variable. Those are removed (2026-09-25). A rule
    action is now **Run On Alert**, a mode on the same general script component used for every
    other trigger — see [Rule scripts](../Scripting/Rule_Scripts.md).

## TriggeredTags

Every rule action — built-in, Webhook, MQTT, component, or script — receives the same firing
context, which includes **`TriggeredTags`**: every tag in the rule's scope currently evaluating
true. Use this to log, branch logic, or pass values to downstream actions.

For the script action's version of this context, see [Rule scripts](../Scripting/Rule_Scripts.md).
Engineering reference: [rules engine documentation](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/Tag-Layer/02.7-rules-engine.md) (sections 9.7–9.8).

## Alert level

Set **`level`** on a rule to classify alert severity. ALL ALERTS and indicators respect active rule state combined with level.

## Webhook and MQTT actions

Alongside the built-in actions above, a rule can fire a **Webhook** action or an **MQTT** action
when it transitions — the same "push a notification out" role Slack and Email actions already
fill, just to a generic HTTP destination or MQTT broker instead of a vendor API. Both send the
same message shape, so a subscriber sees identical structure regardless of which one a rule uses:

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

**Choosing between them:**

| Use the **Webhook** action when... | Use the **MQTT** action when... |
|---|---|
| The receiver is an ordinary HTTP service (an internal API, an integration platform, a chat/incident tool with a generic webhook intake) | You already have MQTT broker infrastructure in place, for example alongside an [MQTT Publisher](../../Components/Publishers/MQTT_Publisher.md) |
| There is no existing MQTT broker to publish to | Multiple systems need to subscribe to the same rule notifications via one broker topic |

Both actions connect, send, and disconnect once per firing — they do not hold a connection open
between rule firings, the same stateless per-call pattern the existing Email action already uses
for its SMTP connection. Both honour the rule engine's per-action timeout: an action that does not
complete in time is cancelled and logged without blocking evaluation of other rules, the same
behaviour any other slow action already has today.

### Webhook action settings

| Setting | Purpose |
|---|---|
| **Destination URL** | The HTTP(S) endpoint the action POSTs to when the rule transitions. May embed a token (for example `https://host/hooks/<secret>`); stored encrypted at rest the same way a Slack webhook URL already is. |
| **Auth mode** | **None**, **Bearer token**, **API key header**, or **Basic auth** — same four modes as the [Webhook Publisher](../../Components/Publishers/Webhook_Publisher.md). |
| **Bearer token** | Shown when **Auth mode** is **Bearer token**. Sent as `Authorization: Bearer <token>`. |
| **API key header name** / **API key header value** | Shown when **Auth mode** is **API key header**. The header name and value sent on every request, for example `X-Api-Key`. |
| **Basic auth username** / **Basic auth password** | Shown when **Auth mode** is **Basic auth**. |

### MQTT action settings

| Setting | Purpose |
|---|---|
| **Broker URL** | The broker's connection URL. Use an `mqtts://` scheme to enable TLS. |
| **Trust all server certificates** | Disables TLS server certificate validation for this action. Enable only when connecting to a trusted broker using a self-signed certificate. |
| **Username** / **Password** | Credentials for broker authentication, when the broker requires them. Password is stored encrypted at rest. |
| **Client ID** | Optional MQTT client id. Leave blank — a fresh random id is generated on every firing, which avoids two overlapping firings racing each other off the broker under a fixed id. |
| **Destination topic** | The topic the rule-context message is published to when the action fires. |
| **Quality of service** | **At most once**, **At least once** (default), or **Exactly once** — the QoS level used for the publish. |

## Permissions

| Task | Permission |
|------|------------|
| View rules | `TagRulesView` |
| Edit rules | `TagRulesModify` |
| View alerts | `AlertsView` |

## Related documentation

- [ALL ALERTS](./Alerts.md)
- [Scripting rule scripts](../Scripting/Rule_Scripts.md)
- [Tag layer](../Tag_Layer/index.md)
- [Derived tags](./Derived_Tags.md)
- [Webhook Publisher](../../Components/Publishers/Webhook_Publisher.md)
- [MQTT Publisher](../../Components/Publishers/MQTT_Publisher.md)
