---
title: Adding Components to Your Profile
description: "Add components like hardware devices and protocol adapters to your Profinity profile by using the dashboard interface."
---

# Adding Components to Your Profile

Components are added to the active [Profile](./Profiles.md) by selecting the **+ ADD COMPONENT** button from the sidebar or homepage, which needs a loaded profile and the **Modify components** permission. A component type that needs a licensed feature, such as a historian, shows as unavailable without it, and [Licensing](../Administration/Licensing.md) lists which features each edition includes.

A page with all the currently supported components is presented, including hardware devices, data loggers and custom scripts, and selecting a component on that page adds it. The page also includes filter options on the left-hand side of the screen to help locate the correct component.

Some CAN bus adapters in Profinity can be auto-discovered, and a discovered adapter that is available in your configuration is shown at the top of the screen.

!!! info "Add a Protocol Adapter First"
    Adding a protocol adapter allows Profinity to receive data from external systems, and without incoming data Profinity is limited in what it is able to show and do. For CAN bus networks, the supported adapters, including the Prohelion and Tritium CAN to Ethernet bridges, are described in [CAN bus Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md), and a step-by-step procedure is given in [How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md). For industrial systems, Profinity also supports BACnet, EtherNet/IP, Modbus, OPC UA and S7, described in [Industrial Protocols](../Components/Industrial_Protocols/index.md).

<figure markdown>
![Add a new component to the Profile](../images/add_adapter_autodiscovery.png)
<figcaption>Add a new component to the Profile</figcaption>
</figure>

Each component in the Profile has a set of properties that define its configuration. Selecting a component prompts for the necessary configuration properties, and the properties required differ for each component. They can be modified later by opening the **Change Settings** menu from the component's dashboard. More information about specific component properties and how to correctly configure each component is in the dedicated component sections.

<figure markdown>
![Adjust component properties](../images/add_component_properties.png)
<figcaption>Example of defining component properties</figcaption>
</figure>

!!! info "Duplicate Component Names"
    Multiple components of the same type can be added to a profile, but each must have a unique name, and a device that listens on a range of CAN addresses must not use a range that overlaps the range of another such device in the profile, because Profinity refuses the component otherwise. Some component types can be added to a profile only once. If the profile already has a component with the same name as the one being added, a digit is added to the new component name to keep the component names in the profile unique.

Once the component is added to the profile, an icon appears in the sidebar to represent the new component. Hovering the mouse over a component icon in the sidebar presents a list of all devices associated with the current profile that match that component type.

Each component also has a coloured indicator that displays the operational status of the device. The possible device statuses are summarised below.

| Colour   | Meaning                                                                          |
|----------|----------------------------------------------------------------------------------|
| Green    | The device is available, sending valid data and is in a valid state              |
| Yellow   | The device is available, but is either not sending data or is in a warning state |
| Red      | The device is in an error state                                                  |
| Grey     | The device is not available, not connected or not visible on the network         |

A component that stays red or grey after it is added usually has an adapter that is not connected or a CAN bus that is not delivering data, and the [troubleshooting section of How to Connect to CAN Bus](../How_To_Guides/Connect_to_CAN_Bus.md#troubleshooting) covers the usual causes and fixes.

## Removing Components from Your Profile

If a component is no longer required, it can be removed by opening the component settings (the three bar icon at the top right of the component dashboard shown below) and selecting delete.

<figure markdown>
![A component dashboard with the three bar setting icon at the top right](../images/wavesculptor.png)
<figcaption>A dashboard showing the three bar setting icon (top right)</figcaption>
</figure>
