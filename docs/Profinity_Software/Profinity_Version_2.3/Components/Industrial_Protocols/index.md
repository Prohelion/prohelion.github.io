---
title: Industrial Protocols
description: "Overview of Profinity's industrial protocol plugins: BACnet, EtherNet/IP, Modbus, OPC UA, and S7."
---

# Industrial Protocols

Profinity connects to the industrial systems a site already runs through a set of protocol plugins. These plugins are not included in the standard Profinity installation. Prohelion supplies them on request, so [contact Prohelion](https://www.prohelion.com/contact-us/) to arrange access to the protocols you need, install each one like any other [DLL plugin](../../Administration/Components_and_Plugins.md), and then add its components from the **Industrial Protocols** group, as described in [Adding Components to Your Profile](../../Getting_Started/Adding_New_Components.md).

<figure markdown>
![BACnet, EtherNet/IP, Modbus, OPC UA, and S7 protocol plugins, each polling values into Profinity tags or exposing Profinity's tag tree to third-party clients](../../images/2.3-diagram-protocol-plugins.png)
<figcaption>Protocol Plugins and Profinity Tags</figcaption>
</figure>

!!! info "Licence Required"
    The protocol plugins also require the **Industrial Protocols** licensed component group, an add-on to your Desktop, Server or Enterprise edition. Installing a plugin does not make its components available without it. See [Licensing](../../Administration/Licensing.md) to check your instance, where the group is listed as **Industrial Protocols** under **Licensed component groups**.

## Available Protocol Plugins

Each plugin has its own page describing its settings and point map. The Typical Use column gives examples, and each page lists every supported device family.

| Plugin | Role | Typical use |
|---|---|---|
| [BACnet](BACnet.md) | BACnet/IP client that polls values into Profinity tags | Building automation and heating, ventilation and air conditioning (HVAC) systems |
| [EtherNet/IP](EtherNet_IP.md) | Common Industrial Protocol (CIP) tag client that polls values into Profinity tags | Rockwell programmable logic controllers (PLCs) such as ControlLogix, CompactLogix, Micro800, PLC-5 and SLC |
| [Modbus](Modbus.md) | TCP and RTU master that polls values into Profinity tags | Industrial devices and distributed input/output (I/O) |
| [OPC UA](OPC_UA.md) | Client that polls values in, and a read-only server that exposes Profinity's tag tree out | Enterprise and supervisory control and data acquisition (SCADA) system integration |
| [S7](S7.md) | S7comm client that polls values into Profinity tags | Siemens PLCs such as S7-300, S7-400, S7-1200 and S7-1500 |

For a Siemens S7-1200 or S7-1500, the S7 plugin reads absolute addresses, and the OPC UA client reads symbolic tags by name from the PLC's own OPC UA server.

Each plugin brings data in as ordinary Profinity tags. Once polled, a value from any of these protocols behaves the same as a tag from a CAN device: it can be shown on a [dashboard](../../Customising_Profinity/Dashboards/index.md) that you build, included in a [collection](../../Tags/Collections.md), watched by a rule, or read by a [script](../../Developing_with_Profinity/Scripting/index.md). The dashboard each component shows for itself is described on its own page, and viewing it needs the **Security administration** permission, which is set under [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

## Related Documentation

- [Component Types](../../Developing_with_Profinity/Custom_Components/Component_Types.md): compiled plugin compared with a Custom Component pack
- [Component Pack CLI](../../Developing_with_Profinity/Custom_Components/Component_Pack_CLI.md)
