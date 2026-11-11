---
title: ThingsBoard Logger
description: "Send Profinity tag values to a ThingsBoard device with the ThingsBoard Logger, including settings, licensing, and network requirements."
type: component
owner: Documentation
last_reviewed: 2026-11-09
---

# ThingsBoard Logger

The ThingsBoard Logger publishes the values of selected [tag collections](../../Tags/Collections/index.md) from a Profile to a device in ThingsBoard.
In Snapshot mode it sends the current value of each member at each Update Interval (Seconds).
In On Change and Everything modes, the Update Interval sets the flush timing.
It appears under **Loggers** in **ADD COMPONENT** after the ThingsBoard Logger plugin is installed.
A Profile holds only one.

The logger needs the Data Relay licensed feature.
Refer to [Install and manage plugins](../../Administration/Install_and_Manage_Plugins.md) to install the plugin, and to [Licensing](../../Licensing.md) for the editions that include Data Relay.

<figure markdown>
```mermaid
flowchart LR
    subgraph Server["Profinity server"]
        Tags --> Collections["Tag collections"] --> Component["ThingsBoard Logger"]
    end
    subgraph Cloud["ThingsBoard"]
        Device
    end
    Component --> Device
```
<figcaption>The ThingsBoard Logger sends tag collections from the Profinity server to a ThingsBoard device over Message Queuing Telemetry Transport (MQTT)</figcaption>
</figure>

!!! info "Licence required"
    The ThingsBoard Logger requires the **Data Relay** licensed feature, included in the **Server** and **Enterprise** editions.
    Without it the component is unavailable.
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

## Quick start

You need the Data Relay licensed feature, the ThingsBoard Logger plugin installed, and the access token and device ID for the ThingsBoard device.

1. Install the ThingsBoard Logger plugin. Refer to [Install and manage plugins](../../Administration/Install_and_Manage_Plugins.md).
2. Add **ThingsBoard Logger** from **ADD COMPONENT**, under **Loggers**. A Profile holds only one.
3. Enter the device's access token in **ThingsBoard Access Token**.
4. Enter the device ID in **ThingsBoard Device ID**.
5. Under **Collections**, select at least one tag collection. The component cannot start without one.
6. Select **ADD COMPONENT** at the bottom of the dialog.
7. Check that the component status shows **On**. If it shows **Error**, read the Profinity System Logs for the reason.

## Add the component

Only one ThingsBoard Logger can exist in a Profile.
Add it from **ADD COMPONENT** (refer to [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md)) and choose **ThingsBoard Logger** under **Loggers**.
Complete the settings in the following table.

| Setting | Type | Default | Notes |
|---|---|---|---|
| **Name** | Text | ThingsBoard Logger | The name shown in the Profile. |
| **ThingsBoard Access Token** | Secret | None | The access token for the device. Required, and stored encrypted. |
| **ThingsBoard Device ID** | Text | None | The device ID in ThingsBoard. Required. Profinity also uses it as the MQTT client ID. |
| **Update Interval (Seconds)** | Time | 60 | Seconds between samples sent to ThingsBoard, from 1 to 86400. |
| **Collections** | Choice | None | The tag collections to send. At least one is required. |
| **Logging mode** | Choice | Snapshot | Chooses between **Snapshot**, **On Change** and **Everything**. Refer to [Logging modes](../Logging_Modes.md) for what each mode sends. |
| **Auto Connect** | On or off | On | Starts sending when the Profile loads. Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md). |

A collection must be selected before the component can start.
It connects out from the Profinity server to thingsboard.cloud using MQTT on TCP port 1883, so the firewall or network must allow that outbound connection.
No inbound port is needed.

A Profile saved with the earlier component type `ProhelionCloudDashboard` loads as this logger once the plugin is installed.

## Example

This example sends one tag collection to ThingsBoard every 60 seconds.
Add this list item under the existing `components:` key in the `profile.yaml` file of the Profile, in the `profiles` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), with the same indentation as the other items.

```yaml
- component:
    type: ThingsBoardLogger
    name: ThingsBoard Logger
    accessToken: YOUR_ACCESS_TOKEN
    deviceID: YOUR_DEVICE_ID
    intervalSec: 60
    logType: Snapshot
    collections:
    - collectionName: YOUR_COLLECTION_ID
    autoConnect: true
```

Replace the placeholders as follows:

- `YOUR_ACCESS_TOKEN` is the access token for the device.
  Profinity encrypts it when it saves the Profile.
- `YOUR_DEVICE_ID` is the device ID in ThingsBoard.
- `YOUR_COLLECTION_ID` is the id of a [tag collection](../../Tags/Collections/index.md) in the Profile.

After the example runs, the component status shows **On**.
If the send fails, it shows **Error**, and the reason is in the Profinity System Logs.

## Troubleshooting

The component can be saved only with an access token and a device ID.

| What you see | Cause | What to do |
|---|---|---|
| The message "You must provide a device access token." | The access token is empty. | Enter the access token. |
| The message "You must provide a device ID." | The device ID is empty. | Enter the device ID. |
| ThingsBoard Logger is not in **ADD COMPONENT** | The plugin is not installed, or Data Relay is not licensed. | Install the plugin and check the licence for the Profile. |
| No data reaches ThingsBoard after the component is added | The token and device ID do not match the device in ThingsBoard. | Check the token and device ID against the device in ThingsBoard. |
| No data reaches ThingsBoard after the component is added | No collection is selected. | Select at least one collection. |
| No data reaches ThingsBoard after the component is added | Outbound traffic on port 1883 is blocked. | Allow outbound traffic on port 1883. |

Then read the Profinity logs for the connection error.
For the shared settings of MQTT components, refer to [MQTT Publisher](../Publishers_and_Subscribers/MQTT_Publisher.md).
