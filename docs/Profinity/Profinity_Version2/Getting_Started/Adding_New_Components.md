---
title: Adding Components
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# Adding new Components to your Profile

Components can be added to your Profile by selecting the `+ ADD COMPONENT` button from the sidebar or homepage. 

A page with all the currently supported components is presented, including hardware devices, data loggers, custom scripts, etc., allowing you to select the component that you wish to add. The page also includes filter options to help locate the correct component.

Some CANBus adapters in Profinity can be auto-discovered.  If a discovered adapter is available in your configuration it will be shown at the top of the screen.  You can filter the devices to show by selecting a filter on the left hand side of the screen.

!!! info "Generally you want to add a CAN Adapter first"
    By adding a CAN Adapter you are able to receive CAN traffic from the devices connected to your CAN Bus network.  Without CAN traffic Profinity is limited in what it is able to show and do.

<figure markdown>
![Add a new component to the Profile](../images/add_adapter_autodiscovery.png)
<figcaption>Add a new component to the Profile</figcaption>
</figure>

Each component in the Profile has a set of properties that define the configuration of the component. Upon selecting a component, you will be prompted to fill in the necessary configuration properties for the component. The information required will vary greatly by component and can be modified later by opening the `Change Setting` menu from the component's dashboard. More information about specific component properties and how to correctly configure each component can be found in the dedicated component sections.

<figure markdown>
![Adjust component properties](../images/add_component_properties.png)
<figcaption>Example of defining component properties</figcaption>
</figure>

!!! info "Duplicate component names"
    You can add multiple components of the same type to your profile, but they must have unique names and the base address of the component is also generally unique. If the profile already has an component with the same name as what you are proposing, then a digit will be added to the component name to keep the profile component names unique.

Once you have added the component to your profile, an icon will appear in the sidebar to represent the new component. Hovering your mouse over a component icon in the sidebar will present a list of all devices associated with the current profile that match that component type. 

Each component will also have an coloured indicator to display the operational status of the device. The possible device statuses are summarised below.   

| Colour   | Meaning                                                                       |
|----------|-------------------------------------------------------------------------------|
| `Green`  | The device is available, sending valid data and is a valid state              |
| `Yellow` | The device is available, but is either not sending data or is a warning state |
| `Red`    | The device is in an error state                                               |
| `Grey`   | The device is not available, connected or not visible on the network          |


# Removing Components from you Profile

If you no longer require a component you can remove it by going to the component settings (top right three bar icon on the component dashboard below) and selecting delete.

<figure markdown>
![Adjust component properties](../images/wavesculptor.png)
<figcaption>A dashboard showing the three bar setting icon (top right)</figcaption>
</figure>