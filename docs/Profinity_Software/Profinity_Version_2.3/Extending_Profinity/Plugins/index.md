---
title: DLL Plugins
description: "External DLL plugins packaged as .nupkg or zip and installed through Plugin Manager."
---

# DLL plugins (Plugin Manager)

Profinity 2.3 supports **external DLL plugins** — author-compiled assemblies packaged as **`.nupkg`** or **zip** and installed through **Components & Plugins** in the admin UI.

DLL plugins are **distinct** from **Custom Component packs** (zip or nupkg bundles of YAML and scripts built with `profinity-component-pack`), which are covered in [Component Pack CLI](../Components/Component_Pack_CLI.md).

## Where to manage plugins

Plugins are managed from the pill menu → **Components & Plugins** (`/admin?view=plugins`). Opening the screen requires **`PluginView`**, and uploading, enabling, disabling, or deleting a plugin requires **`PluginModify`**.

<figure markdown>
![Plugin Manager upload control and plugin list](../../../../assets/images/2.3/2.3-plugin-manager-upload.png)
<figcaption>Plugin Manager with upload (screenshot placeholder — provide SS-40)</figcaption>
</figure>

## On-disk layout

Installed plugins live under:

```text
{Artifacts}/plugins/{pluginId}/
```

Registry metadata is stored in `{Artifacts}/Config/plugins.yaml`.

## Install a plugin

1. Build a plugin against `Profinity.Sdk` from the [Profinity SDK](../SDK.md) kit, following the [SDK Plugin Authoring guide](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/SDK/SDK-Plugin-Authoring.md), and pack it as a `.nupkg` or zip.
2. In Plugin Manager, **upload** the package.
3. **Enable** the plugin.
4. Where supported, hot reload picks up enabled plugins without a full reinstall.

The [Rinstrum Scale Plugin](https://github.com/Prohelion/Profinity/tree/feature/Profinity_2_3/Rinstrum-Scale-Plugin) is a sample plugin that includes Linux systemd deploy notes.

## REST API

The base path is `/api/v2/plugins`, which lists, uploads, enables, disables, and deletes plugins, and requires the matching `PluginView` or `PluginModify` permission.

## NuGet feed

Plugins are installed from **local packages only** for 2.3 GA, and Profinity does not document a public NuGet **feed** publishing workflow in this release. See [Profinity SDK](../SDK.md) for how to get `Profinity.Sdk` itself.

## Related documentation

- [Protocol plugins](./Protocol_Plugins.md) — BACnet, EtherNet/IP, Modbus, OPC UA, and S7
- [Profinity SDK](../SDK.md)
- [Component types](../Components/Component_Types.md)
- [Component Pack CLI](../Components/Component_Pack_CLI.md)
- [Component catalog disable](../Components/Component_Catalog.md)
- [RBAC and permissions](../../Administration/Security/RBAC_Permissions.md)
