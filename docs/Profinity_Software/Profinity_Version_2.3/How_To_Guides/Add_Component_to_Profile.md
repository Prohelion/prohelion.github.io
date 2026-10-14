---
title: How to add a component to your profile
description: "Add a CAN bus device, adapter, logger, or other component to the active Profinity profile, then check its status and connect it."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to add a component to your profile

Add a component to your active profile to monitor a CAN bus device.
You need Profinity V2 installed and running, an active profile, and the **Modify components** permission, which allows components to be added ([Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).
Some component types also need a licence that includes the feature behind them, because a component type that is not licensed shows as unavailable ([Licensing](../Administration/Licensing.md)).

## Add the component

The **ADD COMPONENT** page groups the component types by category, and the **COMPONENT TYPES** filter limits the list to one category:

- **Adapters**, including the [CAN Bus Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md), which are also shown at the top of the screen when discovered
- **Battery Management Systems**, **Chargers & Power Supplies**, **Motor Controllers** and **MPPTs** for devices such as a Battery Management Unit (BMU), a motor controller or a Maximum Power Point Tracker (MPPT)
- **[Custom Component](../Components/Custom_Components/index.md)** for a device that Profinity does not already ship
- **[Loggers](../Components/Loggers/File_Loggers.md)** (CAN File, TAG File, InfluxDB v1 and Prometheus)
- **[Historians](../Components/Historians/index.md)** (InfluxDB v2, InfluxDB v3 and TAG SQL)
- **[Publishers & Subscribers](../Components/Publishers_and_Subscribers/MQTT_Publisher.md)** (Message Queuing Telemetry Transport (MQTT) and Webhook)
- **Scripts**, for scripts that run inside Profinity

To add a component:

1. Select **ADD COMPONENT** in the sidebar. A page opens that lists every component type that can be added, with any adapters that Profinity has discovered shown at the top of the screen.
2. Select the type to add. Profinity prompts for a **Component Name**, which must be unique in the profile, a **CAN ID** or address where the device needs one, the setting that starts the component automatically, and any settings specific to that component type.
3. Select **ADD COMPONENT** at the bottom of the dialog, which reads **SAVE** when the settings of an existing component are being changed. The component's icon appears in the sidebar.

The start setting is **Auto Connect** on every component that connects to a broker, device, server, or database.
With it on, the component connects when the profile loads.
With it off, the component waits until you switch it on with its **Connect** or **Start** action, and it stays off until you do.

## Check the component status

The icon's status indicator shows the state of the component.
It is green when the device is available, sending valid data and in a valid state, and the colour table in [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md#adding-components-to-your-profile) defines yellow, red, and grey.
A red indicator means an error state, so check the [logs](../Getting_Started/Profinity_Log.md).

## Connect the component

A component that holds a connection, such as an adapter, shows a **Connect** button on its dashboard.
A component that starts automatically needs no click.
To connect the component:

1. Click the component in the sidebar.
2. Click **Connect**.
3. Wait for the status to turn green, then confirm that data is appearing.

Refer to [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md) for the full component setup reference.
