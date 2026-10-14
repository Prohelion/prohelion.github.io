---
title: Adding components to your profile
description: "Add hardware devices, data loggers and protocol adapters to the active Profinity profile, read component status colours, and remove a component."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Adding components to your profile

Add a component to the active [profile](./Profiles.md) from the sidebar or homepage.
You need a loaded profile and the **Modify components** permission.
A component type that needs a licensed feature, such as a historian, shows as unavailable without it, and [Licensing](../Administration/Licensing.md) lists which features each edition includes.

Add a protocol adapter first.
A protocol adapter allows Profinity to receive data from external systems, and without incoming data Profinity is limited in what it is able to show and do.
For CAN bus networks, the supported adapters, including the Prohelion and Tritium CAN to Ethernet bridges, are described in [CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md), and a step-by-step procedure is given in [How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md).
For industrial systems, Profinity also supports BACnet, EtherNet/IP, Modbus, OPC UA, and S7, described in [Industrial protocols](../Components/Industrial_Protocols/index.md).

## Add a component

To add a component:

1. Select the **+ ADD COMPONENT** button from the sidebar or homepage.
    A page shows all the currently supported components, including hardware devices, data loggers and custom scripts.
    The page includes filter options on the left-hand side of the screen to help locate the correct component.
    Some CAN bus adapters in Profinity can be auto-discovered, and a discovered adapter that is available in your configuration is shown at the top of the screen.
2. Select the component on that page.
    Profinity prompts for the configuration properties, and the properties required differ for each component.

<figure markdown>
![The Available components page with a filter box, component type buttons, a Discovered Components section at the top and an Adapters section below](../images/add_adapter_autodiscovery.png)
<figcaption>Add a new component to the profile</figcaption>
</figure>

<figure markdown>
![The component settings dialog for a Prohelion Virtual CAN to Ethernet Bridge, with Settings and Security tabs, an ADD COMPONENT button and a RELOAD button](../images/add_component_properties.png)
<figcaption>Example of defining component properties</figcaption>
</figure>

Once the component is added to the profile, an icon appears in the sidebar to represent the new component.
Hovering the mouse over a component icon in the sidebar presents a list of all devices associated with the current profile that match that component type.
You can change the properties later by opening the **Change Settings** menu from the component's dashboard.
More information about specific component properties and how to correctly configure each component is in the dedicated component sections.

Multiple components of the same type can be added to a profile, but each must have a unique name.
A device that listens on a range of CAN addresses must not use a range that overlaps the range of another such device in the profile, because Profinity refuses the component otherwise.
Some component types can be added to a profile only once.
If the profile already has a component with the same name as the one being added, a digit is added to the new component name to keep the component names in the profile unique.

## Component status colours

Each component also has a coloured indicator that displays the operational status of the device.

| Colour   | Meaning                                                                          |
|----------|----------------------------------------------------------------------------------|
| Green    | The device is available, sending valid data and is in a valid state              |
| Yellow   | The device is available, but is either not sending data or is in a warning state |
| Red      | The device is in an error state                                                  |
| Grey     | The device is not available, not connected or not visible on the network         |

A component that stays red or grey after it is added usually has an adapter that is not connected or a CAN bus that is not delivering data.
The [troubleshooting section of How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md#troubleshooting) covers the usual causes and fixes.

## Removing components from your profile

If a component is no longer required, you can remove it:

1. Open the component settings, which is the three bar icon at the top right of the component dashboard.
2. Select delete.

<figure markdown>
![A component dashboard with the three bar settings icon at the top right](../images/wavesculptor.png)
<figcaption>A dashboard showing the three bar settings icon (top right)</figcaption>
</figure>
