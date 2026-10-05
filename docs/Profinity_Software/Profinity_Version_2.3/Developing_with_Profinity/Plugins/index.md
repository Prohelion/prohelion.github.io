---
title: DLL Plugins
description: "Build and package external DLL plugins against Profinity.Sdk, and the REST API that manages them."
---

# DLL plugins

Profinity 2.3 supports **external DLL plugins**: author-compiled assemblies packaged as **`.nupkg`** or **zip**. Administrators install them through **Components & Plugins**. See [Plugins](../../Administration/Components_and_Plugins.md) in Administration for installing, enabling and removing them.

DLL plugins are **distinct** from **Custom Component packs** (zip or nupkg bundles of YAML and scripts built with `profinity-component-pack`), which are covered in [Component Pack CLI](../Custom_Components/Component_Pack_CLI.md).

## Build and package a plugin

1. Build the plugin against `Profinity.Sdk` from the [Profinity SDK](../SDK.md) kit.
2. Pack it as a `.nupkg` or zip:
    - A zip holds the plugin DLL and an optional `dependencies/` folder at its root.
    - A `.nupkg` holds its files under `content/`, or its DLLs under `lib/`.
3. Name the package after the plugin. The plugin id is taken from the archive file name without its extension (for example `my_plugin.zip` installs as `my_plugin`) and may contain only letters, digits, hyphens and underscores.
4. Hand the package to an administrator to upload and enable. Uploading requires the **Custom Plugins** licensed feature.

## NuGet feed

Plugins are installed from **local packages only** in this release, and Profinity does not document a public NuGet **feed** publishing workflow in this release. See [Profinity SDK](../SDK.md) for how to get `Profinity.Sdk` itself.

## Related documentation

- [Plugins (administration)](../../Administration/Components_and_Plugins.md)
- [Profinity SDK](../SDK.md)
- [Component types](../Custom_Components/Component_Types.md)
- [Component Pack CLI](../Custom_Components/Component_Pack_CLI.md)
- [Industrial protocols](../../Components/Industrial_Protocols/index.md) — BACnet, EtherNet/IP, Modbus, OPC UA and S7
- [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md)
