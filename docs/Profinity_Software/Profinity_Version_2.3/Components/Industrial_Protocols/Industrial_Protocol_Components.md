---
title: Industrial protocol components
description: Compare the BACnet, EtherNet/IP, Modbus, OPC UA and S7 components, what each connects to, and how a point map row identifies a value.
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Industrial protocol components

This page lists each industrial protocol plugin, the components it provides and how each component identifies a value.
Each plugin has its own page describing its settings and point map, and each page lists every supported device family.

## Plugins

| Plugin | Role | Typical use |
|---|---|---|
| [BACnet](BACnet.md) | Building Automation and Control Networks (BACnet) over IP client that polls values into Profinity tags | Building automation and heating, ventilation, and air conditioning (HVAC) systems |
| [EtherNet/IP](EtherNet_IP.md) | Common Industrial Protocol (CIP) tag client that polls values into Profinity tags | Rockwell programmable logic controllers (PLCs) such as ControlLogix, CompactLogix, Micro800, PLC-5 and SLC |
| [Modbus](Modbus.md) | TCP and Remote Terminal Unit (RTU) master that polls values into Profinity tags | Industrial devices and distributed input/output (I/O) |
| [OPC UA Client](OPC_UA_Client.md) | Client that polls values from a remote OPC UA server into Profinity tags | Enterprise and supervisory control and data acquisition (SCADA) system integration |
| [OPC UA Server](OPC_UA_Server.md) | Read-only server that exposes Profinity's tag tree to third-party OPC UA clients | Enterprise and SCADA system integration |
| [S7](S7.md) | S7comm (Siemens S7 communication) client that polls values into Profinity tags | Siemens PLCs such as S7-300, S7-400, S7-1200 and S7-1500 |

The Open Platform Communications Unified Architecture (OPC UA) plugin has one page for each component, and [OPC UA certificates](OPC_UA_Certificates.md) covers the certificate folders that both components use.

## Components

Every protocol component has **Auto Connect** off by default.
The components, what they connect to, and how a point map row identifies a value are:

| Plugin | Component | Connects to | A point map row identifies a value by |
|---|---|---|---|
| BACnet | **BACnet Device** | One BACnet device, over BACnet/IP only and not BACnet Master-Slave/Token-Passing (MS/TP) | **Object type** and **Instance** |
| EtherNet/IP | **EtherNet/IP PLC** | One PLC | **PLC tag** |
| Modbus | **Modbus Device** | One Modbus slave, over TCP or over a serial line using RTU framing | **Table** and **Address** |
| OPC UA | **OPC UA Client** | A remote OPC UA server | **NodeId** |
| OPC UA | **OPC UA Server** | Listens for OPC UA clients | Not applicable, because it exposes the readable scalar tags in the profile's tag tree |
| S7 | **S7 PLC** | One PLC | **Area** and **Offset**, and **DB number** when the area is `DataBlock` |

For a Siemens S7-1200 or S7-1500, the S7 plugin reads absolute addresses, and the OPC UA client reads symbolic tags by name from the PLC's own OPC UA server.

## How polled values behave

Once polled, a value from any of these protocols behaves the same as a tag from a CAN device.
It can be shown on a [dashboard](../../Customising_Profinity/Dashboards/index.md) that you build, included in a [collection](../../Tags/Collections/index.md), watched by a rule, or read by a [script](../../Developing_with_Profinity/Scripting/index.md).
The dashboard each component shows for itself is described on its own page, and viewing it needs the **Security administration** permission, which is set under [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
The polling components of all five plugins connect, retry, and log failures in the way described in [Connections and reconnecting](../Connections_and_Reconnecting.md).
