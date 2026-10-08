---
title: Modbus
description: "Configure the Modbus Device component to poll coils and registers from a Modbus TCP or RTU slave into Profinity tags."
---

# Modbus

The **Modbus Device** component is a Modbus master. It connects to one Modbus slave over Transmission Control Protocol (TCP) or over a serial line using Remote Terminal Unit (RTU) framing, and polls the coils and registers you list in its point map, publishing each one as a Profinity tag. Modbus is used for industrial devices and distributed input/output (I/O).

!!! info "Licence Required"
    The Modbus plugin is not part of the standard installation. Prohelion supplies it on request, you install it like any other [DLL plugin](../../Administration/Components_and_Plugins.md), and it requires the **Industrial Protocols** licensed component group, an add-on to your edition. See [Licensing](../../Administration/Licensing.md), or [Industrial Protocols](index.md) for an overview.

You add a Modbus Device to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [Adding Components to Your Profile](../../Getting_Started/Adding_New_Components.md). Add one component for each slave you want to read. The settings below can be changed later from the component's **Change Settings** menu action.

!!! info "Profinity 2.3 Supports Modbus Master Only"
    Profinity acts as a Modbus master. It does not act as a Modbus slave or server.

## Communications Settings

Which settings apply depends on the **Connection Mode**.

| Setting | Applies to | Description |
|---|---|---|
| **Name** | Both | The name of the component. Must be unique within the profile. |
| **Connection Mode** | Both | `TCP` (the default) or `RTU`. |
| **Host** | TCP | The IP address of the slave. Required. The default is `127.0.0.1`. |
| **Port** | TCP | The TCP port. Between `1` and `65535`. The default is `502`. |
| **Serial Port** | RTU | The serial port the slave is connected to. Required for RTU. |
| **Baud Rate** | RTU | The serial baud rate. The default is `9600`. |
| **Parity** | RTU | The serial parity. The default is `None`. |
| **Data Bits** | RTU | `7` or `8`. The default is `8`. |
| **Stop Bits** | RTU | The number of stop bits. The default is `One`. |
| **Unit ID** | Both | The Modbus unit (slave) address. Between `0` and `255`. The default is `1`. |
| **Poll interval (ms)** | Both | How often the point map is read, in milliseconds. Between `50` and `600000`. The default is `1000`. |
| **Request timeout (ms)** | Both | How long Profinity waits for the slave to answer a request, in milliseconds. Between `50` and `60000`. The default is `1000`. |
| **Reconnect delay (ms)** | Both | How long Profinity waits before trying to reconnect after a connection is lost, in milliseconds. Between `0` and `600000`. The default is `2000`. |
| **Auto Connect** | Both | Connects automatically when the profile is loaded. Off by default. |

Match the serial settings to those configured on the slave. If they differ, the slave does not answer.

## Point Map

The point map lists the coils and registers to read. Each row becomes one tag.

| Column | Description |
|---|---|
| **Name** | The name of the tag, published under the component's `Points` tags. Use a unique name for each row. |
| **Table** | The Modbus table to read: `Coil`, `DiscreteInput`, `HoldingRegister` (the default) or `InputRegister`. |
| **Address** | The zero-based protocol address. Register `40001` in a manufacturer's manual is address `0` of the holding registers when the manual uses one-based numbering. |
| **Data type** | How the value is decoded: `Boolean`, `Word` (the default), `SignedWord`, `Dword`, `SignedDword` or `Real`. |
| **Scale** | A factor that reads are multiplied by. Writes are divided by the same factor. The default is `1`. |
| **Writable** | Allows Profinity to write the value from the tag. Off by default. |
| **Unit** | An optional unit label for the tag. |

Registers are read as big-endian values. `Word` and `SignedWord` use one register, and `Dword`, `SignedDword` and `Real` use two consecutive registers starting at the address, with the first register holding the high word. The component has no word-swap option, so a device that sends the low word first returns wrong 32-bit values. `Real` is a 32-bit floating point value.

The **Scale** suits devices that report fixed-point values: a temperature held as tenths of a degree uses a scale of `0.1`.

A `Coil` or `DiscreteInput` row always reads a single on/off bit, and its **Data type** is not used. A `Boolean` row on a `HoldingRegister` or `InputRegister` table reads one register and is true when the register is not zero.

Only the `HoldingRegister` and `Coil` tables can be written. `DiscreteInput` and `InputRegister` points are always read-only, even if **Writable** is on.

!!! warning "Writing to a Device"
    Leave **Writable** off for any point that Profinity should only monitor, because a write changes the device.

## Dashboard

The component dashboard shows the connection **STATUS** (Connected or Disconnected), whether the device is **CONNECTED**, and the number of messages **RECEIVED** and **SENT**. Use the **Connect / Disconnect** menu action to start or stop polling manually. Viewing the dashboard requires the **Security administration** permission, described under [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

Polled values behave like any other tag, so they can be shown on a [dashboard](../Dashboard/index.md), logged, watched by a rule, or read by a script.

## If a Point Shows Bad Quality

If a point cannot be read, its tag is marked as bad quality. The usual causes are an address that is one higher or lower than the device manual states, a **Unit ID** that differs from the slave, serial settings that differ from the slave, and a **Data type** that does not match the register. Check these before reading the [Log](../../Getting_Started/Profinity_Log.md) for the reason.
