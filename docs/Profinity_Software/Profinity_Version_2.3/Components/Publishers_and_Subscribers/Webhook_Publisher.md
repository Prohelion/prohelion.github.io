---
title: Webhook Publisher
description: "Push profile tag collections to HTTP endpoints via POST with JSON payloads on interval or change."
---

# Webhook Publisher

The **Webhook Publisher** pushes the current values of one or more profile [tag collections](../../Tags/Collections.md) to a configured HTTP or HTTPS address with an HTTP POST, either on a fixed interval or whenever a member tag's value changes, using the same trigger modes as the [MQTT Publisher](MQTT_Publisher.md). Use it when the consumer is an ordinary web service rather than an MQTT broker. It sits in the **Publishers & Subscribers** category rather than **Loggers** because a publisher pushes to a receiver that is listening now, whereas a [logger](../Loggers/File_Loggers.md) writes to a file or database for later retrieval.

!!! info "Licence Required"
    The Webhook Publisher requires the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions. Without it the feature is unavailable. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

## Adding a Webhook Publisher

Add a **Webhook Publisher** component to your profile from the **Publishers & Subscribers** category, then configure its settings. The publisher does not start until at least one collection is selected and every selected collection exists in the profile.

### Connection Settings

| Setting | Required | Purpose |
|---|---|---|
| **Destination URL** | Yes | The HTTP or HTTPS address the publisher POSTs to on each publish. The URL is stored encrypted and masked on screen, because webhook URLs often embed an access token. A save without it fails with "You must provide a webhook destination URL." |
| **Authentication** | No | **None**, **Bearer token**, **API key header** or **Basic auth**. Defaults to **None**. See [Authentication](#authentication). Selecting a mode shows its credential fields, and each field is required for that mode. |

### Logger Settings

| Setting | Default | Purpose |
|---|---|---|
| **Collections** | None | The tag collections to publish. Add one or more, and choose each by name in the **Collection** field. An empty entry fails validation with "You must select a collection." |
| **Logging mode** | **Snapshot** | **Snapshot** publishes every collection member on each interval tick, regardless of whether the value changed. **On Change** publishes only when a member's value has changed since the last publish. **Everything** publishes every sample that arrives, including unchanged ones. |
| **Update Interval (Seconds)** | 10 | From 10 to 86400 seconds. In **Snapshot** mode this is how often a full publish runs, and in **On Change** and **Everything** modes it is how often accumulated changes are sent. |
| **Auto Start** | On | Starts the publisher automatically when the profile is loaded. |

## Authentication

The Webhook Publisher adds the selected credential as a header on every request.

| Mode | Fields | Behaviour |
|---|---|---|
| **None** | None | No authentication header is added. |
| **Bearer token** | **Bearer token** | Adds `Authorization: Bearer <token>`. |
| **API key header** | **API key header name**, **API key header value** | Adds a header with the configured name and value, for example `X-Api-Key: <value>`. |
| **Basic auth** | **Basic auth username**, **Basic auth password** | Adds `Authorization: Basic <base64(username:password)>`. |

Whichever mode you choose, the credential is stored encrypted and masked on screen.

!!! warning "Destination Addresses Are Not Restricted"
    Anyone who can edit the profile can point a Webhook Publisher at any address the Profinity server can reach, including internal services. Restrict profile editing accordingly.

## Payload Format

Each publish sends one POST containing a JSON array of the samples in that batch, never one POST per sample. Each entry has the same fields that `GET /api/v2/Tags/Sample/{path}` returns for a tag sample, limited to `fullTagId`, `utcTimestamp`, `quality` and `value`. The API's `reason`, `message` and `metadata` fields are not sent.

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

Only samples with good quality, no more than 5 seconds old by default, and holding a finite number are included, so `quality` is always `"Good"`. A tag that is not updating, or whose value is not numeric, does not appear in the batch.

## Delivery Health

When the destination returns a status other than a success code, cannot be reached, or takes longer than 10 seconds to respond, the publisher makes up to three attempts in total, waiting 1 second before the second attempt and 2 seconds before the third. The attempt count, timeout and waits cannot be changed in Profinity 2.3. If all three attempts fail, the batch is not retried further and the publisher reports **Error** until a later publish succeeds.

The publisher shows **On** while it is running, **Off** when it is stopped, and **Error** after a failed delivery. It also exposes two tags for a dashboard or rule:

| Tag | Meaning |
|---|---|
| `LastDeliverySuccess` | `true` when the most recent delivery succeeded, and `false` otherwise. |
| `LastDeliveryError` | Empty when healthy. After a failed delivery it reads "Webhook delivery failed - see log for details." |

If the status shows **Error**, check the [Logs](../../Getting_Started/Profinity_Log.md) for the underlying message, then confirm that the **Destination URL** is correct, that the receiver accepts the selected **Authentication** (a 401 or 403 response points to a wrong credential), and that the receiver returns a success status. An HTTPS destination must present a certificate that the Profinity server trusts, because the Webhook Publisher has no option to skip certificate validation.

## Related Documentation

- [MQTT Publisher](MQTT_Publisher.md) and [MQTT Subscriber](MQTT_Subscriber.md), the other Publishers & Subscribers components.
- [File and Tag Loggers](../Loggers/File_Loggers.md), for writing to a file or database.
- [Rule actions and scripts](../../Tags/Actions.md), where a rule can also send a one-off webhook or MQTT message. Rule actions need the **Tag Rule Actions** licensed feature.
