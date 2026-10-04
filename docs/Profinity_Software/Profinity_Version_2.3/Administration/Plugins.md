---
title: Plugins
description: "Install, enable, disable and remove DLL plugins from Components & Plugins in the admin UI."
---

# Plugins

A **plugin** adds compiled components to Profinity, such as support for a device or protocol that does not ship in the box. Administrators install, enable, disable and remove plugins from **Components & Plugins** in the admin UI.

Plugins are different from **Custom Components**, which are bundles of YAML and scripts. To build a plugin yourself, see [DLL plugins](../Developing_with_Profinity/Plugins/index.md) in Developing with Profinity.

## Where to manage plugins

Select **ADMIN** in the side menu and open the **Components & Plugins** pill. Opening the screen requires the **`PluginView`** permission. Uploading, enabling, disabling or deleting a plugin requires **`PluginModify`**. See [Roles and permissions](Roles_and_Permissions.md).

Plugins that ship with Profinity are listed alongside the ones you install.

## Install a plugin

You need a plugin package (a `.nupkg` or zip file) from the plugin's author.

1. Open **Components & Plugins**.
2. **Upload** the package. Uploading also requires the **Custom Plugins** licensed feature. See [Licensing](Licensing.md).
3. **Enable** the plugin.

Where supported, hot reload picks up enabled plugins without a restart.

The plugin id is taken from the package file name without its extension, so `my_plugin.zip` installs as `my_plugin`. It may contain only letters, digits, hyphens and underscores.

## Disable or remove a plugin

**Disable** a plugin to stop its components loading without removing it. **Delete** it to remove it. To hide individual components from the catalogue without touching the plugin, see [Component catalogue](Component_Catalog.md).

## Where plugins are stored

Installed plugins live under:

```text
{Artifacts}/plugins/{pluginId}/
```

Registry metadata is stored in `{Artifacts}/config/plugins.yaml`. Both names are lowercase, which matters on Linux where the file system is case-sensitive. An upgrade from an earlier release renames the older `Plugins` and `Config/Plugins.yaml` names automatically. Plugins that ship with Profinity are loaded from `plugins/core` under the engine install folder.

## Related documentation

- [Component catalogue](Component_Catalog.md)
- [Roles and permissions](Roles_and_Permissions.md)
- [Industrial protocols](../Components/Industrial_Protocols/index.md) — BACnet, EtherNet/IP, Modbus, OPC UA and S7
- [DLL plugins (developer guide)](../Developing_with_Profinity/Plugins/index.md)
