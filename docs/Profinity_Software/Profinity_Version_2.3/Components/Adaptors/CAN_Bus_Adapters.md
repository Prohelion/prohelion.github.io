---
title: CAN bus Adapters
description: "Add and configure CAN bus adapters including Prohelion bridges, Peak USB, SocketCAN, and EwertEnergy."
---

# CAN bus Adapters

An adapter is the technology used to connect Profinity to your CAN bus network.

Profinity on Windows supports the [Prohelion and Tritium CAN bus bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md), SocketCAN using the [SocketCanD](https://github.com/linux-can/socketcand) technology, the [Peak CAN to USB Adapter](https://www.peak-system.com/PCAN-USB.199.0.html?&L=1), and the EwertEnergy Candapter.

!!! info "When running the Peak CAN to USB Adapter"
    It is necessary to install the driver for the device before starting Profinity. Use the supplied Peak tools to ensure your adapter is working as expected before starting Profinity, and then autodiscover the adapter as normal.

When running Profinity on [Docker](../../Installation/Docker_Installation.md) or on [macOS / Unix](../../Installation/Zip_Installation.md), additional support is also provided for the native [SocketCAN adapter](https://docs.kernel.org/networking/can.html).

Adapters can be added in one of two ways, either via Auto Discovery or manually.

## Adapter Auto Discovery

In many cases the supported CAN bus adapters can be found automatically via the Auto Discovery mechanism.

If an adapter is defined and visible on the network but is not currently associated with the current Profile, then a `Discovered` category will appear in the `ADD COMPONENT` window. The `Discovered` category lists all of the adapters that are currently visible to Profinity. If an adapter does not appear there, it either has configuration issues that need to be addressed [manually](#adapter-manual-configuration) or is not currently discoverable.

<figure markdown>
![Add an Adapter via AutoDiscovery](../../images/add_adapter_autodiscovery.png)
<figcaption>Add an Adapter via AutoDiscovery</figcaption>
</figure>

!!! info "CAN over Ethernet bridge not found by Auto Discovery"
    The CAN over Ethernet bridges have a number of configuration options and at times do not behave as expected. See the documentation on the [CAN to Ethernet bridges](../../../../Solar_Car_Racing/CAN_Ethernet_Bridge/index.md) for troubleshooting advice.

## Adapter Manual Configuration

Configuring a CAN bus adapter manually follows a very similar process to other components.

First, [add the adapter](../../Getting_Started/Adding_New_Components.md) to your Profile. When a CAN bus adapter is added, Profinity prompts for the following information about the device, and these details can be changed later with the `Change Settings` button at the top-right of the adapter dashboard.

| Parameter                | Description                                               |
|--------------------------|-----------------------------------------------------------|
| `Name`                   | The name of the component. Must be unique.                |
| `Auto Connect`           | Automatically enables the device when starting Profinity. |
| `Allow Loopback Traffic` | Allows loopback traffic, which echoes traffic back to the system itself. Only the Tritium adapters support this option. |

## Adapter Status

Once your adapter has been added to the Profile, a coloured status indicator is displayed in the sidebar next to the device name, and a green circle is the expected state. The colour signals for the adapters are as follows:

| Colour   | Meaning                                               |
| -------- | ----------------------------------------------------- |
| `Green`  | Good, adapter is connected and data is arriving       |
| `Yellow` | Warning, adapter is connected but no data is arriving |
| `Red`    | Error, see the logs for more details                  |
| `Grey`   | N/A, adapter is not connected                         |

!!! info "CAN bus bitrate"
    In order for all of the devices on your CAN bus to communicate, they must all be operating at the same bitrate, including the CAN bus adapter that connects Profinity to your CAN bus. Some devices allow the bitrate to be configured through the component configuration menus, but some devices only offer a specific bitrate, which constrains the other devices in the network and should be considered when designing your system.
