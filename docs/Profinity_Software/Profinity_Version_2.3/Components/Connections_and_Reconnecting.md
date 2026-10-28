---
title: Connections and reconnecting
description: How components that connect to a broker, device, server, or database start, show a problem, and recover, with retry timing and the Off, On, and Error status.
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Connections and reconnecting

Every component that holds a connection behaves the same way when it starts, when the other end is missing, and when a connection is lost.
This covers these components:

- The Message Queuing Telemetry Transport (MQTT) Publisher and Subscriber.
- The Tag Relay sender and receiver.
- The SQL and InfluxDB historians and loggers, and the Prometheus logger.
- The chargers.
- The CAN bus adapters.
- The Open Platform Communications Unified Architecture (OPC UA) server and client.
- The Modbus, BACnet, S7, and EtherNet/IP components.

A CAN bus adapter adds a warning when the bus is quiet, as described under [Status](#status).

## Turning connections on and off {#the-auto-connect-switch}

Every one of these components except the Elcon charger has the same **Auto Connect** setting.
The Elcon charger has no **Auto Connect** setting, because it communicates over CAN and has no connection step.
**Auto Connect** decides only whether the connection is made when the profile loads.
After that the component is a switch that you turn on with **Connect** (or **Start**) and off with **Disconnect** (or **Stop**).

- With **Auto Connect** on, the component connects when the profile loads.
- With **Auto Connect** off, the component stays **Off** and makes no connection attempt until you switch it on.
- Switched on, the component keeps trying until it is connected. Switched off, it stops trying and stays off, and loading or changing the profile does not switch it back on.

The default depends on the kind of component:

| Component | **Auto Connect** default |
| --- | --- |
| CAN bus adapters, loggers, historians, the MQTT Subscriber, and the Tag Relay sender and receiver | On |
| TDK and Siglent power supplies, and the Modbus, BACnet, S7, EtherNet/IP, and OPC UA components | Off |

For a component that defaults to off, turn **Auto Connect** on in its settings if it should connect whenever the profile loads.

## Starting when the other end is not there

A component starts even when what it connects to is not available.
It does not stop at start with an error.
It shows **Error**, writes the reason to the [Logs](../Administration/Logs_Config.md) once, and keeps trying.
The TDK and Siglent power supplies have an **Auto Reconnect** setting, and with it off they make one attempt and report a failure.
When the broker, device, server, or database appears, the component connects by itself and the status changes to **On**.

This includes a login that is rejected.
Profinity keeps trying and shows the reason, so fixing the credentials in the settings needs no restart.

## Recovering from a lost connection

If a connection is lost while the component is running, it goes to **Error** and tries again in the same way.
The log records the first connection failure of an outage at error level and the later attempts at debug level, so a long outage does not fill the log.
When the connection returns, the log records that it reconnected.

## When reads, writes, or sends keep failing

A component can be connected and still fail to read a value, write a point or send a message.
Profinity reports that once for each outage.
The first failure is written to the [Logs](../Administration/Logs_Config.md) as a warning that names what failed and why.
Later failures during the same outage are logged at debug level only, and the first success afterwards is logged at information level as the component working again.
The first success is the first poll in which every point reads correctly.
A long outage does not fill the log, and a new outage warns again.
This also applies to a poll that fails as a whole.

The Modbus, BACnet, S7, EtherNet/IP and OPC UA client components log failed point reads in this way.

## Retry timing

Profinity retries every 5 seconds unless the component has its own setting.

| Component | Retry interval |
| --- | --- |
| Chargers | **Reconnect Interval** setting (default 5000 ms), when **Auto Reconnect** is on |
| Modbus, BACnet, S7, EtherNet/IP, OPC UA client | **Reconnect delay (ms)** setting |
| Tag Relay sender | 1 second |
| All others | 5 seconds |

## Stopping

Stopping a component, or removing it, stops the retries and closes the connection.
A stopped component never reconnects by itself.

## Status

| Status | Meaning |
| --- | --- |
| **Off** | The component is stopped, or has just been switched on and is making its first connection attempt. |
| **On** | The connection is up. |
| **Error** | The component is running but cannot reach what it connects to. Check the [Logs](../Administration/Logs_Config.md) for the reason. |

A logger or historian shows **On** as soon as it is started, and changes to **Error** if it cannot reach its server.
A CAN bus adapter connects and retries in the same way, and adds a warning for a quiet bus.
While it is stopped, or still making its first connection attempt, it shows **Off**.
When a connection it was asked to make fails or is lost, it shows **Error** and keeps retrying.
Once connected, it shows **On** while CAN frames are arriving.
A Tritium bridge heartbeat is a CAN frame, so a bridge that is only sending heartbeats stays **On**.
A connected adapter that has never seen a frame, or whose last frame is more than 5 seconds old, shows a warning (amber).
Exactly 5 seconds since the last frame stays **On**.
Choosing **Disconnect** shows **Off**, and the adapter does not retry until you connect it again.
Check the [Logs](../Administration/Logs_Config.md) for the reason an adapter is not connecting.

To see how the protocol components use these settings, refer to [Industrial protocols](Industrial_Protocols/index.md).
