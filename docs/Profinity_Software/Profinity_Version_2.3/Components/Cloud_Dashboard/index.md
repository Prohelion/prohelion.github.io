---
title: Prohelion Cloud Dashboard
description: "Send Profinity tag values to the Prohelion Cloud platform with the Prohelion Cloud Dashboard component, including settings, licensing and network requirements."
---

# Prohelion Cloud Dashboard

Prohelion Cloud is an Internet of Things (IoT) platform that stores the data reported by field devices and lets an organisation monitor and manage those devices and assets remotely. The Prohelion Cloud Dashboard component publishes the values of selected [tag collections](../../Tags/Collections.md) from a Profile to a device in Prohelion Cloud at a fixed interval, where they can be viewed on cloud-hosted dashboards.

From Profinity 2.3, [Rules](../../Tags/index.md), [Dashboards](../../Customising_Profinity/Dashboards/index.md) and [Tag Relays](../Tag_Relays/index.md) cover many of the functions that Prohelion Cloud provides, so the Cloud Dashboard remains available for existing customers and new deployments are usually better served by those features.

!!! info "Licence Required"
    The Prohelion Cloud Dashboard component requires the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions. Without it the component is unavailable. See [Licensing](../../Administration/Licensing.md) for what each edition includes.

## Get Access to Prohelion Cloud

Access to Prohelion Cloud is by request. Raise an access request in the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals), and Prohelion support assists with device onboarding, dashboard set-up and integration with existing systems. The component needs an access token and a device ID for the device in Prohelion Cloud, so have both to hand before adding it.

## Add the Component

Only one Prohelion Cloud Dashboard component can exist in a Profile. Add it from **ADD COMPONENT** (see [Add a Component to a Profile](../../How_To_Guides/Add_Component_to_Profile.md)), choose **Prohelion Cloud Dashboard** and complete the following settings.

| Setting | Default | Notes |
|---|---|---|
| **Name** | Prohelion Cloud Dashboard | The name shown in the Profile. |
| **Prohelion Access Token** | None | The access token for the device. Required, and stored encrypted. |
| **Prohelion Device ID** | None | The device ID in Prohelion Cloud. Required. |
| **Update Interval (Seconds)** | 60 | Seconds between samples sent to Prohelion Cloud, from 10 to 86400. |
| **Collections** | None | The tag collections to send. At least one is required, because the component does not start until a collection is selected. |
| **Logging mode** | Snapshot | **Snapshot** sends every collection member at each interval, **On Change** sends only values that have changed, and **Everything** sends every sample, including unchanged ones. See [Logging Modes](../Loggers/InfluxDB_Prometheus_Logger.md#logging-modes). |
| **Auto Connect** | On | Starts sending when the Profile loads. |

The component connects out from the Profinity server to Prohelion Cloud using MQTT on TCP port 1883, so the firewall or network must allow that outbound connection. No inbound port is needed.

## Troubleshooting

The component cannot be saved without an access token and a device ID, and reports "You must provide a device access token." or "You must provide a device ID." when either is empty. If the component is added but no data reaches Prohelion Cloud, check that the Profile has the **Data Relay** feature licensed, that the token and device ID match the device in Prohelion Cloud, that at least one collection is selected, and that outbound traffic on port 1883 is allowed, then read the Profinity logs for the connection error. For the shared settings of MQTT components, see [MQTT Publisher](../Publishers_and_Subscribers/MQTT_Publisher.md).
