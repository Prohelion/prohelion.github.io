---
title: DLL Plugins
description: "Build and package external DLL plugins against Profinity.Sdk."
---

# DLL Plugins

Profinity 2.3 supports external dynamic-link library (DLL) plugins: assemblies compiled by the author and packaged as a `.nupkg` or zip file. Administrators install them through **Components & Plugins**, and installing, enabling and removing them is covered on [Components and Plugins](../../Administration/Components_and_Plugins.md) in Administration. DLL plugins are separate from Custom Component packs, which are zip or `.nupkg` bundles of YAML and scripts built with `profinity-component-pack` and covered on [Component Pack CLI](../Custom_Components/Component_Pack_CLI.md).

## What a Plugin Contains

A plugin is a .NET assembly that references `Profinity.Sdk` and defines one or more components. Each component is made of three types, and the built-in Modbus plugin is a worked example of all three.

| Type | Base type | What it does |
|---|---|---|
| **Component** | `ProfinityComponentBase`, usually with `IProfinityAdapter` | The component itself: its status, status message, actions and the tags it publishes. A component that publishes a table of points implements `IMappedPointTagSource`, and one that accepts writes also implements `IMappedPointTagWriter`. |
| **Settings** | `ProfinitySettingsBase` | The settings dialog. Each property is a setting, and attributes such as `DisplayName`, `ProhelionCategory`, `ProhelionSection` and `ProhelionConfigOption` set its label, grouping and choices. A component that keeps a connection implements `IAutoConnect`, which adds the standard **Auto Connect** switch. |
| **Metadata** | `ComponentVersionedMetadataBase` | Tells Profinity about the component: its `Name`, `Description`, `PluginVersion`, `Author`, `RequiredSdkVersion`, `ComponentType`, `ComponentSettingsType` and `ComponentGroup`. It needs a public constructor that takes `IEngineServices`. |

Profinity checks every plugin when it is uploaded, and rejects it with a message that names the problem when:

- the assembly does not reference `Profinity.Sdk`;
- the SDK version in `RequiredSdkVersion` (a range such as `>=1.0.0`) is not met by the Profinity that runs the plugin;
- the assembly defines no metadata type;
- a settings type is not named after its component type with `Settings` added, so a component class `ModbusDevice` needs a settings class `ModbusDeviceSettings`.

### Connections

A component that connects to a device, broker or server uses the `ManagedConnection` class in `Profinity.Utilities.Threading` so that it starts even when the other end is down, shows **Error** with the reason, and connects by itself when the device appears. See [Connections and Reconnecting](../../Components/Connections_and_Reconnecting.md) for what users see.

### Devices That Are Read by Polling

A device whose points are read on an interval, such as a PLC or a register map, derives its controller from `PolledDeviceController<TPoint>` in `Profinity.Sdk.Components`. The base class provides the connection, the poll loop, the latest value and quality of every point, writes, the message counters and the failure reporting. The controller supplies only these members:

- `OpenTransport`, `CloseTransport` and `DisposeTransport`, which open, close and release the connection;
- `ReadPoint` and `WritePoint`, which read and write one point;
- `Describe`, which says whether a point is writable and gives its data type and unit;
- `PointName`, `Points`, `PollIntervalMilliseconds`, `ReconnectDelayMilliseconds`, `DeviceName` and `TransportIsConnected`, which read the matching values from the settings.

It may also override `VerifyDevice`, which runs when the connection opens and again after a failed read, to confirm the device is the one configured, and `IsPollable`, to skip a point that cannot be read. A plugin built against an earlier SDK keeps its own copy of this logic until it is rebuilt.

## Build and Package a Plugin

A plugin is built against `Profinity.Sdk`, which comes with the [Profinity SDK](../SDK.md) kit, and is then packed and handed to an administrator.

1. Build the plugin against `Profinity.Sdk`.
2. Pack it as a `.nupkg` or zip. A zip holds the plugin DLL and an optional `dependencies/` folder at its root, as in the layout below. A `.nupkg` holds its files under `content/`, or its DLLs under `lib/`.
3. Name the package after the plugin. The plugin id is taken from the archive file name without its extension, so `my_plugin.zip` installs as `my_plugin`, and it may contain only letters, digits, hyphens and underscores.
4. Hand the package to an administrator to upload and enable.

```text
my_plugin.zip
  my_plugin.dll
  dependencies/
    helper-library.dll
```

Uploading a plugin needs the **Modify plugins** permission, and the **Custom Plugins** feature, which is available in every edition (see [Licensing](../../Administration/Licensing.md)).

## Where Plugins Come From

In Profinity 2.3 plugins install from a `.nupkg` or zip file only, and there is no public NuGet feed for them. The [Profinity SDK](../SDK.md) page explains how to get `Profinity.Sdk` itself.

## Related Documentation

- [Components and Plugins](../../Administration/Components_and_Plugins.md)
- [Profinity SDK](../SDK.md)
- [Component Types](../Custom_Components/Component_Types.md)
- [Component Pack CLI](../Custom_Components/Component_Pack_CLI.md)
- [Industrial Protocols](../../Components/Industrial_Protocols/index.md), which covers BACnet, EtherNet/IP, Modbus, OPC UA and S7
- [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md)
