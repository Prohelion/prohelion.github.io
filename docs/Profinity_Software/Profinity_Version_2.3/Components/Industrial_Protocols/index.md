---
title: Industrial protocols
description: Find the Profinity plugin for BACnet, EtherNet/IP, Modbus, OPC UA or S7, and what you need to install and licence it before you add its components.
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Industrial protocols

Profinity connects to the industrial systems a site already runs through a set of protocol plugins.
Each plugin brings data in as ordinary Profinity tags, and the Open Platform Communications Unified Architecture (OPC UA) plugin can also expose Profinity's tag tree to third-party clients.
The plugins are not included in the standard Profinity installation, and they need the **Industrial Protocols** licensed component group.

- [Install an industrial protocol plugin](Install_an_Industrial_Protocol_Plugin.md): obtain a plugin from Prohelion, install it, and add its components.
- [Industrial protocol components](Industrial_Protocol_Components.md): compare what each component connects to and how a point map row identifies a value.
- [BACnet](BACnet.md): poll objects from a BACnet/IP device, for building automation and heating, ventilation, and air conditioning (HVAC) systems.
- [EtherNet/IP](EtherNet_IP.md): poll tags from a Rockwell programmable logic controller (PLC).
- [Modbus](Modbus.md): poll coils and registers from a Modbus TCP or Remote Terminal Unit (RTU) slave.
- [OPC UA Client](OPC_UA_Client.md): poll nodes from a remote OPC UA server.
- [OPC UA Server](OPC_UA_Server.md): expose Profinity's tag tree to third-party OPC UA clients as a read-only address space.
- [OPC UA certificates](OPC_UA_Certificates.md): find the certificate folders both OPC UA components use, and trust a certificate.
- [S7](S7.md): poll addresses from a Siemens S7 PLC.

To build your own component instead, refer to [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md) for how a compiled plugin compares with a Custom Component pack, and to [Component Pack CLI](../../Developing_with_Profinity/SDK/Component_Pack_CLI.md).
