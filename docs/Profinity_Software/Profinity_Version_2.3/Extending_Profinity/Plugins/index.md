---
title: DLL Plugins
description: "External DLL plugins packaged as .nupkg or zip and installed through Plugin Manager."
---

# DLL plugins (Plugin Manager)

Profinity 2.3 supports **external DLL plugins** — author-compiled assemblies packaged as **`.nupkg`** or **zip** and installed through **Components & Plugins** in the admin UI.

DLL plugins are **distinct** from **Custom Component packs** (zip or nupkg bundles of YAML and scripts built with `profinity-component-pack`), which are covered in [Component Pack CLI](../Components/Component_Pack_CLI.md).

## Where to manage plugins

Plugins are managed by selecting **ADMIN** in the side menu and opening the **Components & Plugins** pill (`/admin?view=plugins`). Opening the screen requires **`PluginView`**, and uploading, enabling, disabling, or deleting a plugin requires **`PluginModify`**.

<figure markdown>
![Plugin Manager upload control and plugin list](../../../../assets/images/2.3/2.3-plugin-manager-upload.png)
<figcaption>Plugin Manager with upload (screenshot placeholder — provide SS-40)</figcaption>
</figure>

## On-disk layout

Installed plugins live under:

```text
{Artifacts}/plugins/{pluginId}/
```

Registry metadata is stored in `{Artifacts}/config/plugins.yaml`. Both folder names are lowercase, which matters on Linux where the file system is case-sensitive, and an upgrade from an earlier release renames the older `Plugins` and `Config/Plugins.yaml` names automatically. Plugins that ship with Profinity are loaded from `plugins/core` under the engine install folder and are listed alongside the installed ones.

## Install a plugin

1. Build a plugin against `Profinity.Sdk` from the [Profinity SDK](../SDK.md) kit, and pack it as a `.nupkg` or zip. A zip holds the plugin DLL and an optional `dependencies/` folder at its root, and a `.nupkg` holds its files under `content/` or its DLLs under `lib/`.
2. Name the package after the plugin, because the plugin id is taken from the archive file name without its extension (for example `my_plugin.zip` installs as `my_plugin`) and may contain only letters, digits, hyphens and underscores. In Plugin Manager, **upload** the package, which also requires the **Custom Plugins** licensed feature.
3. **Enable** the plugin.
4. Where supported, hot reload picks up enabled plugins without a full reinstall.

## REST API

The base path is `/api/v2/plugins`, which lists, uploads (`POST /api/v2/plugins/upload`, multipart field `pluginArchive`), enables, disables, and deletes plugins, and requires the matching `PluginView` or `PluginModify` permission. The listing, upload and delete operations also require the **Custom Plugins** licensed feature.

## NuGet feed

Plugins are installed from **local packages only** in this release, and Profinity does not document a public NuGet **feed** publishing workflow in this release. See [Profinity SDK](../SDK.md) for how to get `Profinity.Sdk` itself.

## Related documentation

- [Protocol plugins](./Protocol_Plugins.md) — BACnet, EtherNet/IP, Modbus, OPC UA, and S7
- [Profinity SDK](../SDK.md)
- [Component types](../Components/Component_Types.md)
- [Component Pack CLI](../Components/Component_Pack_CLI.md)
- [Component catalog disable](../Components/Component_Catalog.md)
- [RBAC and permissions](../../Administration/Security/RBAC_Permissions.md)
