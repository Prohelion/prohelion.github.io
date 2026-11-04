---
title: Email and Slack rule actions
description: Configure the Email Rule Action and Slack Rule Action settings, including the SMTP server, recipients, Slack webhook URL, channel, and message templates.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Email and Slack rule actions

The Email and Slack actions send a notification each time a [tag rule](../index.md) transitions.
Both need the **Tag Rule Actions** licensed feature, as described in [Rule actions](index.md).
To add one to a profile so that a rule can select it, refer to [Making an action available](index.md#making-an-action-available).

## Email action settings

The **Email Rule Action** sends a message over Simple Mail Transfer Protocol (SMTP) each time a rule transitions.

| Setting | Default | Purpose |
|---|---|---|
| **SMTP host** | `localhost` | The mail server host name. Required. |
| **SMTP port** | 587 | The mail server port, from 1 to 65535. |
| **Use SSL** | Enabled | Enables Transport Layer Security (TLS) for the SMTP connection. |
| **Username** / **Password** | None | Optional SMTP credentials. The password is stored encrypted. |
| **From address** | `alerts@localhost` | The sender address. Required. |
| **To addresses** | Empty | One or more recipient addresses separated by commas or semicolons. Required. |
| **Subject template** | None | Optional subject line, which may use the [placeholders](index.md#message-placeholders). A default subject is used when empty. |
| **Message prefix** | None | Optional text placed before the alert message in the body, which may use the placeholders. |

## Slack action settings

The **Slack Rule Action** posts a message to a Slack channel through an incoming webhook.
Each Slack action can target a different workspace.

| Setting | Default | Purpose |
|---|---|---|
| **Webhook URL** | Empty | The Slack incoming webhook URL. Required, must be an absolute URL, and is stored encrypted. |
| **Slack channel** | `#alerts` | The channel name. Required. |
| **Title template** | None | Optional message title, which may use the [placeholders](index.md#message-placeholders). A default title is used when empty. |
| **Message prefix** | None | Optional text placed before the alert message, which may use the placeholders. |

For the Webhook and Message Queuing Telemetry Transport (MQTT) actions, refer to [Webhook and MQTT rule actions](Webhook_and_MQTT_Rule_Actions.md).
