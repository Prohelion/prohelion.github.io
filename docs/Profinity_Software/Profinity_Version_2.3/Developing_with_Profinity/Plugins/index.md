---
title: DLL Plugins
description: "Build and package external DLL plugins against Profinity.Sdk."
---

# DLL Plugins

Profinity 2.3 supports external dynamic-link library (DLL) plugins: assemblies compiled by the author and packaged as a `.nupkg` or zip file. Administrators install them through **Components & Plugins**, and installing, enabling and removing them is covered on [Components and Plugins](../../Administration/Components_and_Plugins.md) in Administration. DLL plugins are separate from Custom Component packs, which are zip or `.nupkg` bundles of YAML and scripts built with `profinity-component-pack` and covered on [Component Pack CLI](../Custom_Components/Component_Pack_CLI.md).

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
