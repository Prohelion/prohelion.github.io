---
title: Webhook Publisher
description: "Push profile tag collections to HTTP endpoints via POST with JSON payloads on interval or change."
---

# Webhook Publisher

The **Webhook Publisher** pushes the current values of one or more profile [tag collections](../../Tags/Collections.md) to a
configured HTTP(S) URL, either on a fixed interval or whenever a member tag's value changes — the
same two trigger modes the [MQTT Publisher](./MQTT_Publisher.md) provides, over a plain
HTTP POST instead of an MQTT broker. It sits in the **Publishers & Subscribers** category: a
publisher pushes to a subscriber that is actively listening right now (an HTTP receiver, or a
broker's subscribed clients), which is a different consumption model from a **Logger**, which
writes to a queryable store such as a file or database for later, disconnected retrieval. Use the
Webhook Publisher when the consumer is an ordinary HTTP service rather than an MQTT-aware one, or
when there is no existing MQTT infrastructure in place to publish to.

!!! info "Licence required"
    The Webhook Publisher requires the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

## Adding a Webhook Publisher

Add a **Webhook Publisher** component to your profile from the **Publishers & Subscribers**
category, then configure its settings.

### Connection settings

| Setting | Purpose |
|---|---|
| **Destination URL** | The HTTP(S) endpoint the publisher POSTs to on each publish. |
| **Authentication** | **None**, **Bearer token**, **API key header**, or **Basic auth** — see [Authentication](#authentication) below. Selecting a mode reveals its matching credential field(s) (bearer token; API key header name and value; Basic auth username and password). |

### Logger settings

| Setting | Purpose |
|---|---|
| **Logging mode** | **Snapshot** publishes every collection member on each interval tick, regardless of whether the value changed; **On Change** publishes only when a member's value has changed since the last publish; **Everything** publishes every sample that arrives, including unchanged ones — the same three modes the MQTT Publisher provides. |
| **Update Interval (Seconds)** | For **Snapshot** mode, how often a full publish runs. For **On Change**/**Everything**, how often accumulated changes are flushed. |
| **Auto Start** | Starts the publisher automatically when the profile is loaded, and is enabled by default. |

## Authentication

The Webhook Publisher supports four authentication modes, applied as a header on every outbound
request:

| Mode | Behaviour |
|---|---|
| **None** | No authentication header is added. |
| **Bearer token** | Adds `Authorization: Bearer <token>`. |
| **API key header** | Adds a header with a configured name and value, for example `X-Api-Key: <value>`. |
| **Basic auth** | Adds `Authorization: Basic <base64(username:password)>`. |

Whichever mode you choose, the credential is stored encrypted at rest, the same way a Slack
webhook URL or an SMTP password is elsewhere in Profinity, and it is masked in the UI in the same
way as those settings.

!!! warning "No destination address restriction"
    Profinity does not restrict which addresses a Webhook Publisher's destination URL can point
    to. Configuring a webhook destination requires the same profile-edit access as editing
    `rules.yaml`/`collections.yaml` directly, so this is treated as the existing trust boundary,
    not a new one — restrict who can edit the profile if this destination should not be
    operator-configurable.

## Payload format

Each publish sends a JSON array of the batch's samples. Unlike the MQTT Publisher's flat
numeric-only format, the Webhook Publisher's payload is intended to match the shape a consumer
integrating via the REST API already sees — so a webhook receiver does not need to learn a second,
different shape from the one `GET /api/v2/Tags/Sample/{path}` returns.

```json
[
  {
    "fullTagId": "Vehicles/Car1/Speed",
    "utcTimestamp": "2026-09-24T04:12:03Z",
    "quality": "Good",
    "value": 87.4
  }
]
```

Only samples with good quality and a recent timestamp are ever included — the same filtering the
MQTT Publisher applies — so `quality` in this payload is always `"Good"`; a sample that fails that
check is dropped from the batch rather than sent with a stale or bad value. The richer fields the
REST API can return for a tag sample (`reason`, `message`, `metadata`) are not part of this
payload — only `fullTagId`, `utcTimestamp`, `quality`, and `value` are included.

One POST is sent per interval tick (or per drained on-change batch) — never one POST per sample —
so a fast-changing collection does not produce a storm of individual requests.

## Delivery health

A delivery that fails, because the destination returns a status other than a success code or because the request cannot connect or times out after 10 seconds, is attempted up to three times in total, with a wait of 1 second before the second attempt and 2 seconds before the third, before the publisher reports failure. These values are fixed defaults of the Webhook transport and there is no setting for the attempt count or backoff in this release.
Beyond the standard **Error** status that every other publisher and logger component provides,
the Webhook Publisher exposes two properties for a dashboard or the component panel:

| Property | Meaning |
|---|---|
| **LastDeliverySuccess** | `true` when the most recent delivery attempt succeeded, `false` otherwise. |
| **LastDeliveryError** | `null` when healthy; a fixed advisory message when the most recent attempt failed. Check the [Logs](../../Getting_Started/Profinity_Log.md) for the underlying error detail. |

## Related documentation

- [MQTT Publisher](./MQTT_Publisher.md)
- [MQTT Subscriber](MQTT_Subscriber.md)
- [File and Tag Loggers](../Loggers/File_Loggers.md)
- [Rule actions and scripts](../../Tags/Actions.md)
