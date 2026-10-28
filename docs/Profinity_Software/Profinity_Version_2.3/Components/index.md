---
title: Components
description: "Find the Profinity component for a CAN bus adapter, industrial protocol, battery, charger, or motor controller, or for logging, publishing, and sharing tags."
type: index
owner: Documentation
last_reviewed: 2026-10-28
---

# Components

A component connects Profinity to a device, a protocol or a destination for data, and you add each one to a [profile](../Administration/Profiles.md).
This section covers every component Profinity ships, grouped by what it connects to.
To add one, refer to [How to add a component to your profile](../How_To_Guides/Add_Component_to_Profile.md).

## Connect to devices and buses

- [CAN bus adapters](CAN_Bus_Protocols/index.md): connect Profinity to a CAN bus with a bridge, Peak USB, SocketCAN, SocketCANd, CANdapter, or the virtual adapter.
- [Industrial protocols](Industrial_Protocols/index.md): poll BACnet, EtherNet/IP, Modbus, Open Platform Communications Unified Architecture (OPC UA) or S7 devices into tags, or expose tags as an OPC UA server.
- [Battery management systems](Battery_Management_Systems/index.md): add a Prohelion Battery Management Unit (BMU), read its dashboard and update its firmware.
- [Chargers and power supplies](Chargers_and_Power/index.md): add a TDK, Siglent, or Elcon charger, set its limits and start a charge.
- [Motor controllers](Motor_Controller/index.md): add a WaveSculptor, read its dashboard and update its configuration and firmware.
- [Elmar Solar MPPT](MPPT/Elmar_Solar_MPPT.md): monitor an Elmar Solar maximum power point tracker.

## Store, send and share data

- [Loggers](Loggers/index.md): write tag collections or CAN messages to files, a Secure Shell (SSH) File Transfer Protocol (SFTP) server, InfluxDB v1 or Prometheus.
- [Historians](Historians/index.md): store tag history in InfluxDB v2, InfluxDB v3 or a SQL database.
- [Publishers and Subscribers](Publishers_and_Subscribers/index.md): move tag values to and from Message Queuing Telemetry Transport (MQTT) brokers and web services.
- [Tag Relays](Tag_Relays/index.md): share live tags between Profinity instances.
- [Prohelion Cloud Dashboard](Cloud_Dashboard/Prohelion_Cloud_Dashboard.md): send tag values to the Prohelion Cloud platform.

## Display and extend

- [Dashboard Component](Dashboard/Dashboard_Component.md): show a YAML dashboard bound to existing tags.
- [Using a Custom Component](Custom_Components/Using_a_Custom_Component.md): add a custom component to a profile.
- [Pack a Custom Component](Custom_Components/Pack_a_Custom_Component.md): pack a working component so another installation can add it.

## Behaviour shared by components

- [Connections and reconnecting](Connections_and_Reconnecting.md): how components that connect start, show a problem and recover.
- [Logging modes](Logging_Modes.md): what the Snapshot, On Change and Everything modes send.
