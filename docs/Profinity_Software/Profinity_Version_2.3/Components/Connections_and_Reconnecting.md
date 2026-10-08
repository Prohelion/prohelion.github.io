---
title: Connections and Reconnecting
description: "How components that connect to a broker, device, server or database start, show a problem, and recover."
---

# Connections and Reconnecting

Every component that holds a connection behaves the same way. This covers the MQTT Publisher and Subscriber, the Tag Relay sender and receiver, the SQL and InfluxDB historians and loggers, the Prometheus logger, the chargers, the CAN bus adapters (see the note on adapter status below), the OPC UA server and client, and the Modbus, BACnet, S7, EtherNet/IP and Rinstrum components.

## The Auto Connect Switch

Every one of these components has the same **Auto Connect** setting. It decides only whether the connection is made when the profile loads. After that the component is a switch that you turn on with **Connect** (or **Start**) and off with **Disconnect** (or **Stop**).

- With **Auto Connect** on, the component connects when the profile loads.
- With **Auto Connect** off, the component stays **Off** and makes no connection attempt until you switch it on.
- Switched on, the component keeps trying until it is connected. Switched off, it stops trying and stays off, and loading or changing the profile does not switch it back on.

## Starting When the Other End Is Not There

A component starts even when what it connects to is not available. It does not stop at start with an error. It shows **Error**, writes the reason to the [Logs](../Getting_Started/Profinity_Log.md) once, and keeps trying. When the broker, device, server or database appears, the component connects by itself and the status changes to **On**.

This includes a login that is rejected. Profinity keeps trying and shows the reason, so fixing the credentials in the settings needs no restart.

## Recovering From a Lost Connection

If a connection is lost while the component is running, it goes to **Error** and tries again in the same way. The log records the first failure of an outage at error level and the later attempts at debug level, so a long outage does not fill the log. When the connection returns, the log records that it reconnected.

## When Reads, Writes or Sends Keep Failing

A component can be connected and still fail to read a value, write a point or send a message. Profinity reports that once for each outage. The first failure is written to the [Logs](../Getting_Started/Profinity_Log.md) as a warning that names what failed and why, later failures during the same outage are logged at debug level only, and the first success afterwards is logged as the component working again. A long outage does not fill the log, and a new outage warns again.

## Retry Timing

Profinity retries every 5 seconds unless the component has its own setting.

| Component | Retry interval |
| --- | --- |
| Chargers | **Reconnect Interval** setting (default 5000 ms), when **Auto Reconnect** is on |
| Modbus, BACnet, S7, EtherNet/IP, OPC UA client | **Reconnect delay (ms)** setting |
| Rinstrum | **Reconnect Interval** setting (default 5000 ms) |
| Tag Relay sender | 1 second |
| All others | 5 seconds |

## Stopping

Stopping a component, or removing it, stops the retries and closes the connection. A stopped component never reconnects by itself.

## Status

| Status | Meaning |
| --- | --- |
| **Off** | The component is stopped, or is making its first connection attempt. |
| **On** | The connection is up. |
| **Error** | The component is running but cannot reach what it connects to. Check the [Logs](../Getting_Started/Profinity_Log.md) for the reason. |

!!! note "CAN Bus Adapters Report Bus Status"
    A CAN bus adapter connects and retries in the same way, but its status describes the bus, not the connection attempt. While the adapter is not connected it shows **Off**, and once connected it shows the state of the traffic on the bus. Check the [Logs](../Getting_Started/Profinity_Log.md) for the reason an adapter is not connecting.
