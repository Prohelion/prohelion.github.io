---
title: DLL Plugins
---

# DLL plugins (Plugin Manager)

Profinity 2.3 supports **external DLL plugins** — author-compiled assemblies packaged as **`.nupkg`** or **zip** and installed through **Components & Plugins** in the admin UI.

This is **distinct** from **Custom Component packs** (zip/nupkg of YAML and scripts via `profinity-component-pack`). See [Component Pack CLI](../Components/Component_Pack_CLI.md).

## Where to manage plugins

1. Open the pill menu → **Components & Plugins** (`/admin?view=plugins`).
2. Requires **`PluginView`** to open; **`PluginModify`** to upload, enable, disable, or delete.

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
4. Hot reload picks up enabled plugins without a full reinstall when supported.

Sample: [Rinstrum Scale Plugin](https://github.com/Prohelion/Profinity/tree/feature/Profinity_2_3/Rinstrum-Scale-Plugin) with Linux systemd deploy notes.

## REST API

Base path: `/api/v2/plugins` — list, upload, enable/disable, delete. Requires matching `PluginView` / `PluginModify` permissions.

## NuGet feed

**Local package install only** for 2.3 GA — Profinity does not document a public NuGet **feed** publish workflow in this release. See [Profinity SDK](../SDK.md) for how to get `Profinity.Sdk` itself.

## Related documentation

- [Profinity SDK](../SDK.md)
- [Component types](../Components/Component_Types.md)
- [Component Pack CLI](../Components/Component_Pack_CLI.md)
- [Component catalog disable](../Components/Component_Catalog.md)
- [RBAC and permissions](../../Administration/Security/RBAC_Permissions.md)
