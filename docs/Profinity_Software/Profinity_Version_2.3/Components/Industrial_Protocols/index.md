---
title: Industrial Protocols
description: "Overview of Profinity's industrial protocol plugins — BACnet, EtherNet/IP, Modbus, OPC UA, and S7."
---

# Industrial protocols

Profinity connects to the industrial systems a site already runs through a set of protocol
plugins. These plugins are not included in the standard Profinity installation. They are
available on request, so [contact Prohelion](https://www.prohelion.com/contact-us/) to
arrange access to the protocols you need. Prohelion supplies each one as a plugin, which is then
installed like any other [DLL plugin](../../Administration/Components_and_Plugins.md).

<figure markdown>
![BACnet, EtherNet/IP, Modbus, OPC UA, and S7 protocol plugins, each polling values into Profinity tags or exposing Profinity's tag tree to third-party clients](../../images/2.3-diagram-protocol-plugins.png)
<figcaption>Plug into the systems your site already runs</figcaption>
</figure>

!!! info "Licence required"
    The protocol plugins also require the **Industrial Protocols** licensed component group, an add-on to your Desktop, Server or Enterprise edition. Installing a plugin does not make its components available without it. See [Licensing](../../Administration/Licensing.md) to check your instance, where the group is listed as **Industrial Protocols** under **Licensed component groups**.

Each plugin has its own page describing its settings and point map, linked from the table below. [DLL plugins](../../Administration/Components_and_Plugins.md) explains how to install and enable a plugin once you have it.

## Available protocol plugins (from Prohelion)

| Plugin | Role | Typical use |
|---|---|---|
| [**BACnet**](BACnet.md) | BACnet/IP client — polls values into Profinity tags | Building automation and HVAC systems |
| [**EtherNet/IP**](EtherNet_IP.md) | CIP tag client — polls values into Profinity tags | Rockwell PLCs (CompactLogix, ControlLogix) |
| [**Modbus**](Modbus.md) | TCP/RTU master — polls values into Profinity tags | Industrial devices, distributed I/O |
| [**OPC UA**](OPC_UA.md) | Client (polls values in) and a read-only server (exposes Profinity's tag tree out) | Enterprise and SCADA system integration |
| [**S7**](S7.md) | S7comm client — polls values into Profinity tags | Siemens PLCs (S7-1200, S7-1500) |

Each plugin brings data in as ordinary Profinity tags — once polled, a value from any
of these protocols behaves the same as a tag from a CAN device: it can be shown on a
[dashboard](../../Customising_Profinity/Dashboards/index.md), included in a [collection](../../Tags/Collections.md), watched by a rule, or read by a [script](../../Developing_with_Profinity/Scripting/index.md).

## Related documentation

- [Licensing](../../Administration/Licensing.md) — checking and applying a licence
- [DLL plugins](../../Administration/Components_and_Plugins.md) — installing, enabling, and disabling any plugin
- [Component types](../../Developing_with_Profinity/Custom_Components/Component_Types.md) — compiled plugin vs Custom Component pack
- [Component Pack CLI](../../Developing_with_Profinity/Custom_Components/Component_Pack_CLI.md)
