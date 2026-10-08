---
title: How to Add a Component to Your Profile
description: "Add and configure CAN bus components like Prohelion devices, adapters, and loggers to your Profinity profile."
---

# How to Add a Component to Your Profile

Add and configure components in your active profile to monitor CAN bus devices.

## Prerequisites

- Profinity V2 installed and running
- An active profile
- The **Modify components** permission, which allows components to be added (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md))
- A licence that includes the feature behind the component type, where it needs one, because a component type that is not licensed shows as unavailable (see [Licensing](../Administration/Licensing.md))

## Add the Component

Select **ADD COMPONENT** in the sidebar, which opens a page that lists every component type that can be added, with any adapters that Profinity has discovered shown at the top of the screen. The component types are grouped by category, and the **COMPONENT TYPES** filter limits the list to one category:

- **Adapters**, including the [CAN Bus Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md), which are also shown at the top of the screen when discovered
- **Battery Management Systems**, **Chargers & Power Supplies**, **Motor Controllers** and **MPPTs** for devices such as a Battery Management Unit (BMU), a motor controller or a Maximum Power Point Tracker (MPPT)
- **[Custom Component](../Components/Custom_Components/index.md)** for a device that Profinity does not already ship
- **[Loggers](../Components/Loggers/File_Loggers.md)** (CAN File, TAG File, InfluxDB v1 and Prometheus)
- **[Historians](../Components/Historians/index.md)** (InfluxDB v2, InfluxDB v3 and TAG SQL)
- **[Publishers & Subscribers](../Components/Publishers_and_Subscribers/MQTT_Publisher.md)** (Message Queuing Telemetry Transport (MQTT) and Webhook)
- **Scripts**, for scripts that run inside Profinity

Select the type to add, and Profinity prompts for a **Component Name**, which must be unique in the profile, a **CAN ID** or address where the device needs one, the setting that starts the component automatically, and any settings specific to that component type. The start setting is **Auto Connect** on adapters and some devices, which connects the component when Profinity starts, and **Auto Start** on loggers and publishers. Select **ADD COMPONENT** at the bottom of the dialog, which reads **SAVE** when the settings of an existing component are being changed, and the component's icon appears in the sidebar.

## Check the Component Status

The icon's status indicator shows the state of the component. It is green when the device is available, sending valid data and in a valid state, and the colour table in [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md#adding-components-to-your-profile) defines yellow, red and grey. A red indicator means an error state, so check the [logs](../Getting_Started/Profinity_Log.md).

## Connect the Component

A component that holds a connection, such as an adapter, shows a **Connect** button on its dashboard. Click the component in the sidebar, click **Connect**, and wait for the status to turn green, then confirm that data is appearing. A component that starts automatically needs no click.

## Related Documentation

- [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md) - the full component setup reference
- [CAN Bus Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) - adapter configuration
