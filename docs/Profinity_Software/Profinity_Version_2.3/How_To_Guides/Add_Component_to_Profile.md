---
title: How to add a component to your profile
description: "Add a CAN bus device, adapter, logger, or other component to the active Profinity profile, check its status colour, connect it, and remove it."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# How to add a component to your profile

Add a component to the active [profile](../Getting_Started/Profiles.md) from the sidebar or homepage to monitor a CAN bus device, then check its status and connect it.
You need Profinity running, an active profile, and the **Modify components** permission, which allows components to be added ([Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).
Some component types also need a licensed feature, such as a historian.
A component type that is not licensed shows as unavailable.
[Licensing](../Licensing.md) lists which features each edition includes.

A component shows data only when data arrives.
For live data, add a protocol adapter first, because an adapter lets Profinity receive data from external systems.
To see data without any hardware, replay a CAN log as described in the [Quick start guide](../Getting_Started/Quick_Start.md#step-3-replay-the-example-can-log).
For CAN bus networks, [CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md) describes the supported adapters, including the Prohelion and Tritium CAN to Ethernet bridges.
[How to connect to CAN bus](./Connect_to_CAN_Bus.md) gives the steps.
For industrial systems, Profinity also supports BACnet, EtherNet/IP, Modbus, Open Platform Communications Unified Architecture (OPC UA), and S7, described in [Industrial protocols](../Components/Industrial_Protocols/index.md).

## Add the component

The **ADD COMPONENT** page groups the component types by category.
The **COMPONENT TYPES** filter limits the list to one category:

- **Adapters**, including the [CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md), which are also shown at the top of the screen when discovered
- **Battery Management Systems**, **Chargers & Power Supplies**, **Motor Controllers**, and **MPPTs**, for devices such as:
    - A Battery Management Unit (BMU).
    - A motor controller.
    - A Maximum Power Point Tracker (MPPT).
- **[Custom Component](../Components/Custom_Components/Using_a_Custom_Component.md)** to create a new component
- **[Loggers](../Components/Loggers/index.md)** (CAN File, TAG File, InfluxDB v1, and Prometheus)
- **[Historians](../Components/Historians/index.md)** (InfluxDB v2, InfluxDB v3, and TAG SQL)
- **[Publishers & Subscribers](../Components/Publishers_and_Subscribers/MQTT_Publisher.md)** (Message Queuing Telemetry Transport (MQTT) and Webhook)
- **Scripts**, for scripts that run inside Profinity

To add a component:

1. Select **ADD COMPONENT** on the homepage or at the bottom of the sidebar.
   The homepage tile is not shown when the home screen has Add Component turned off.
   A page opens that lists every component type that can be added, including hardware devices, data loggers, and custom scripts.
   Profinity can auto-discover some CAN bus adapters, and it shows a discovered adapter at the top of the page.
2. Select the type to add.
   Profinity prompts for these settings, and the settings that are specific to the component type differ for each component:
    - A **Component Name**, which must be unique in the profile.
    - A **CAN ID** or address, where the device needs one.
    - The **Auto Connect** setting, which starts the component automatically (explained after these steps).
3. Select **ADD COMPONENT** at the bottom of the dialog.
   The button reads **SAVE** when you change the settings of an existing component.
   The component's icon appears in the sidebar.

<figure markdown>
![The Available components page with a filter box, component type buttons, a Discovered Components section at the top and followed by an Adapters section](../images/add_adapter_autodiscovery.png)
<figcaption>Add a new component to the profile</figcaption>
</figure>

<figure markdown>
![The component settings dialog for a Prohelion Virtual CAN to Ethernet Bridge, with Settings and Security tabs, an ADD COMPONENT button and a RELOAD button](../images/add_component_properties.png)
<figcaption>Example of defining component properties</figcaption>
</figure>

The start setting is **Auto Connect** on every component that connects to a broker, device, server, or database, and each component type has its own default, listed in [Connections and reconnecting](../Components/Connections_and_Reconnecting.md).
With it on, the component connects when the profile loads.
With it off, the component waits until you switch it on with its **Connect** or **Start** action, and it stays off until you do.

Hovering the mouse over a component icon in the sidebar presents a list of all devices associated with the current profile that match that component type.
You can change the properties later by opening the **Change Settings** menu from the component's dashboard.
The dedicated component pages describe the properties of each component and how to configure it.

Multiple components of the same type can be added to a profile, but each must have a unique name.
Profinity refuses a device that listens on a range of CAN addresses if the range overlaps the range of another such device in the profile.
Some component types can be added to a profile only once.
If the profile already has a component with the same name, Profinity adds a digit to the new component name to keep the names unique.

## Check the component status

Each component has a coloured indicator on its icon that displays the operational status of the device.

| Colour | Status | Meaning |
|---|---|---|
| Green | On | The device is available, sending valid data and is in a valid state |
| Amber | Warning | The device is available, but is either not sending data or is in a warning state |
| Red | Error | The device is in an error state |
| Grey | Idle | The device is idle |
| Outlined, no fill | Off | The device can be contacted but is switched off |
| Empty (white) | N/A | The device is not available or cannot be contacted |

A red indicator means an error state, so check the [logs](../Administration/Logs_Config.md).
A component that stays red, or shows an outlined or empty lamp, after you add it usually has an adapter that is not connected.
The CAN bus may also not be delivering data.
[CAN bus adapter troubleshooting](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters/CAN_Bus_Adapter_Troubleshooting.md) covers the usual causes and fixes for an adapter.

## Connect the component

A component that holds a connection, such as an adapter, shows a **Connect** button on its dashboard.
A component that starts automatically needs no click.
To connect the component:

1. Select the component in the sidebar.
2. Select **Connect**.
3. Wait for the status to turn green, then confirm that data is appearing.

## Remove a component

To remove a component that is no longer required:

1. Open the component settings, which is the three bar settings icon in the menu of the component dashboard.
2. Select **DELETE COMPONENT** at the bottom of the settings dialog, then confirm in the Delete component dialog.
   If rules use the component as an action, Profinity removes those actions from the affected rules.

<figure markdown>
![A component dashboard with the three bar settings icon in its menu](../images/wavesculptor.png)
<figcaption>A dashboard showing the three bar settings icon</figcaption>
</figure>
