---
title: How to publish data to MQTT or a webhook
description: "Add the MQTT Publisher or Webhook Publisher to push tag collections to a Message Queuing Telemetry Transport broker or an HTTP(S) endpoint."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to publish data to MQTT or a webhook

Configure the MQTT Publisher to push tag collections to a Message Queuing Telemetry Transport (MQTT) broker, or the Webhook Publisher to POST them to an HTTP(S) endpoint.
Both publishers need the **Data Relay** licensed feature, which the Server and Enterprise editions include, and the **Modify components** permission.
They push to a receiver that is listening at that moment, so the broker or webhook receiver must be running.

Refer to [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) and [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) for the full setting reference, including the Sparkplug B settings.
Sparkplug B is an MQTT payload format for industrial data.

## Configure the MQTT Publisher

1. Add the **MQTT Publisher**, as described in [How to configure data logging](./Configure_Data_Logging.md#add-the-component).
2. Set **Name** and configure the broker connection:
    1. **Server URL**: the MQTT broker address, using `mqtts://` for Transport Layer Security (TLS).
    2. **Username** and **Password**: if required.
    3. **Device ID**: the MQTT client ID.
3. Choose the **Payload**, which is JSON or Sparkplug B. For a JSON payload, set the **Destination Topic**, which is the topic the messages are published to.
4. Choose the **Logging mode** (`Snapshot`, `On Change` or `Everything`).
5. Select which tag collections to publish, as described in [How to configure data logging](./Configure_Data_Logging.md#select-tag-collections).
6. Select **ADD COMPONENT** at the bottom of the dialog.

## Configure the Webhook Publisher

1. Add the **Webhook Publisher**, as described in [How to configure data logging](./Configure_Data_Logging.md#add-the-component).
2. Set **Name** and configure the destination:
    1. **Destination URL**: the HTTP(S) endpoint to POST to.
    2. **Authentication**: None, Bearer token, API key header, or Basic auth.
3. Choose the **Logging mode** (`Snapshot`, `On Change` or `Everything`).
4. Select which tag collections to publish, as described in [How to configure data logging](./Configure_Data_Logging.md#select-tag-collections).
5. Select **ADD COMPONENT** at the bottom of the dialog.

To start the publisher and confirm that messages arrive, refer to [How to configure data logging](./Configure_Data_Logging.md#start-the-logger-or-publisher).
