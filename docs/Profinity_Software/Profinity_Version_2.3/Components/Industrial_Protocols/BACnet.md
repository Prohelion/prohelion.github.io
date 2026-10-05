---
title: BACnet
description: "Configure the BACnet Device component to poll BACnet/IP object present-values from a building automation device into Profinity tags."
---

# BACnet

The **BACnet Device** component is a BACnet/IP client. It connects to one BACnet device on your network and polls the present-value of the objects you list in its point map, publishing each one as a Profinity tag. It is typically used for building automation and HVAC systems.

!!! info "Licence required"
    The BACnet plugin is not part of the standard installation. Prohelion supplies it on request, you install it like any other [DLL plugin](../../Administration/Components_and_Plugins.md), and it requires the **Industrial Protocols** licensed component group, an add-on to your edition. See [Licensing](../../Administration/Licensing.md), or [Industrial protocols](index.md) for an overview.

You add a BACnet Device to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [Adding Components to Your Profile](../../Getting_Started/Adding_New_Components.md). Add one component for each BACnet device you want to read. The settings below can be changed later from the component's `Change Settings` menu.

!!! info "What this version supports"
    The component supports BACnet/IP only, not BACnet MS/TP. It talks to a device you configure by address and device instance, and it does not discover devices on the network with Who-Is.

## Communications settings

| Setting | Description |
|---|---|
| `Name` | The name of the component. Must be unique within the profile. |
| `Local UDP port` | The UDP port Profinity uses locally. Between `1` and `65535`. The default is `47808` (BACnet's standard port, `0xBAC0`). |
| `Remote host` | The IP address of the BACnet device. Required. The default is `127.0.0.1`. |
| `Device instance` | The BACnet device instance number of the device. Between `0` and `4194303`. The default is `0`. |
| `Poll interval (ms)` | How often the point map is read. Between `50` and `600000`. The default is `1000`. |
| `Request timeout (ms)` | How long Profinity waits for the device to answer a request. Between `50` and `60000`. The default is `1000`. |
| `Reconnect delay (ms)` | How long Profinity waits before trying to reconnect after a connection is lost. Between `0` and `600000`. The default is `2000`. |
| `Auto Connect` | Connects to the device automatically when the profile is loaded. Off by default. |

## Point map

The point map lists the BACnet objects to read. Each row becomes one tag.

| Column | Description |
|---|---|
| `Name` | The name of the tag, published under the component's `Points` tags. Use a unique name for each row. |
| `Object type` | The type of BACnet object: `AnalogInput`, `AnalogOutput`, `AnalogValue` (the default), `BinaryInput`, `BinaryOutput` or `BinaryValue`. |
| `Instance` | The BACnet object instance number. |
| `Writable` | Allows Profinity to write to the object's present-value from the tag. Off by default. |
| `Unit` | An optional unit label for the tag. |

Analog objects are published as number tags, and binary objects are published as boolean tags. Profinity reads and writes the object's `present-value` property.

!!! warning "Writing to a device"
    A write is only accepted when the point's `Writable` option is on. Leave it off for any point that Profinity should only monitor, and consider whether a write could change how the building plant behaves before enabling it.

## Dashboard

The component dashboard shows the connection `STATUS`, whether the device is `CONNECTED`, and the number of messages `RECEIVED` and `SENT`. Use the `Connect / Disconnect` control to start or stop polling manually. Viewing the dashboard requires the Security Admin permission.

Polled values behave like any other tag, so they can be shown on a [dashboard](../Dashboard/index.md), logged, watched by a rule, or read by a script. If a point cannot be read, its tag is marked as bad quality. Check the [Logs](../../Getting_Started/Profinity_Log.md) for the reason.

## Related documentation

- [Industrial protocols](index.md)
- [DLL plugins](../../Administration/Components_and_Plugins.md)
