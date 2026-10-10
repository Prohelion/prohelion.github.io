---
title: BACnet
description: "Configure the BACnet Device component to poll BACnet/IP object present-values from a building automation device into Profinity tags."
---

# BACnet

The **BACnet Device** component is a Building Automation and Control Networks (BACnet) over IP client. It connects to one BACnet device on your network and polls the present-value of the objects you list in its point map, publishing each one as a Profinity tag. BACnet is used for building automation and heating, ventilation and air conditioning (HVAC) systems.

!!! info "Licence Required"
    The BACnet plugin is not part of the standard installation. Prohelion supplies it on request, you install it like any other [DLL plugin](../../Administration/Components_and_Plugins.md), and it requires the **Industrial Protocols** licensed component group, an add-on to your edition. See [Licensing](../../Administration/Licensing.md), or [Industrial Protocols](index.md) for an overview.

You add a BACnet Device to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [Adding Components to Your Profile](../../Getting_Started/Adding_New_Components.md). Add one component for each BACnet device you want to read. The settings below can be changed later from the component's **Change Settings** menu action.

!!! info "Profinity 2.3 Supports BACnet/IP Only"
    The component supports BACnet/IP only, not BACnet MS/TP (Master-Slave/Token-Passing). It reads and writes the device at the **Remote host** address you configure, and it does not discover devices on the network with Who-Is.

## Communications Settings

| Setting | Description |
|---|---|
| **Name** | The name of the component. Must be unique within the profile. |
| **Local UDP port** | The User Datagram Protocol (UDP) port Profinity uses locally. Between `1` and `65535`. The default is `47808`, the standard BACnet/IP port (`0xBAC0` in hexadecimal). |
| **Remote host** | The IP address of the BACnet device. Required, and it is the address Profinity sends every request to. The default is `127.0.0.1`. |
| **Device instance** | The BACnet device instance number of the device, which is the instance in the device's own Device object. Between `0` and `4194302`. The default is `0`. Profinity still sends every request to the **Remote host**, but it reads the Device object of the device at that address each time it connects and compares the two numbers, and it does not connect while they differ, so that a changed address never leads to another device being read. Set this to the instance of the device you are connecting to, which a BACnet configuration tool or the device's own display shows, even when that instance is `0`. |
| **Poll interval (ms)** | How often the point map is read, in milliseconds. Between `50` and `600000`. The default is `1000`. |
| **Request timeout (ms)** | How long Profinity waits for the device to answer a request, in milliseconds. Between `50` and `60000`. The default is `1000`. |
| **Reconnect delay (ms)** | How long Profinity waits between connection attempts, in milliseconds. Profinity keeps trying when the device is down at start and after a connection is lost. Between `0` and `600000`. The default is `2000`. |
| **Auto Connect** | Connects to the device automatically when the profile is loaded. Off by default. |

## Point Map

The point map lists the BACnet objects to read. Each row becomes one tag.

| Column | Description |
|---|---|
| **Name** | The name of the tag, published under the component's `Points` tags. Use a unique name for each row. |
| **Object type** | The type of BACnet object: `AnalogInput`, `AnalogOutput`, `AnalogValue` (the default), `BinaryInput`, `BinaryOutput` or `BinaryValue`. |
| **Instance** | The BACnet object instance number. |
| **Writable** | Allows Profinity to write to the object's present-value from the tag. Off by default. |
| **Unit** | An optional unit label for the tag. |

Analog objects are published as number tags, and binary objects are published as boolean tags. Profinity reads and writes the object's `present-value` property, and it polls each object on the **Poll interval (ms)** rather than subscribing to changes.

!!! warning "Writing to a Device"
    A write can change how the building plant behaves, so turn **Writable** on only for points that must be controlled from Profinity.

## Dashboard

The component dashboard shows the connection **STATUS**, whether the device is **CONNECTED**, and the number of messages **RECEIVED** and **SENT**. Use the **Connect / Disconnect** menu action to start or stop polling manually. Viewing the dashboard requires the **Security administration** permission, described under [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

Polled values behave like any other tag, so they can be shown on a [dashboard](../Dashboard/index.md), logged, watched by a rule, or read by a script.

## If a Point Shows Bad Quality

If a point cannot be read, its tag is marked as bad quality. The usual causes are a wrong **Remote host**, an **Object type** or **Instance** that the device does not have, and a device that does not answer within the **Request timeout (ms)**. Check these before reading the [Log](../../Getting_Started/Profinity_Log.md), which records point read failures at debug level.

A **Device instance** that differs from the device at the **Remote host** puts the component in the **Error** status, marks every point as bad quality, and shows and logs a message of the form `The device at 192.168.1.20 reports Device instance 1234, but Device instance is set to 0`. Profinity tries again every **Reconnect delay**, so correcting the setting or the device connects it without a restart. Set **Device instance** to the number in the message, or correct the **Remote host** if the address now belongs to a different device. Profinity reads the identity with the standard "wildcard" read of the Device object (instance 4194303), which BACnet requires every device to answer from protocol revision 4 (2004) onwards. A device older than that, or one that does not allow its Device object to be read, answers with a BACnet error, and the component shows that error as the reason. A device that does not answer the identity read, or that does not allow its Device object to be read, puts the component in **Error** in the same way, with a message that the device did not answer, and Profinity tries again every **Reconnect delay**. A device that is replaced on the same address after it was connected is caught at the next failed read, and the component then shows **Error** until the instance matches.
