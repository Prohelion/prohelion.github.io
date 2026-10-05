---
title: Components & Plugins
description: "Install and manage plugins, and choose which component types engineers can add to a Profile, from Components & Plugins in the admin UI."
---

# Components & Plugins

**Components & Plugins** is where administrators control which components Profinity offers. A **plugin** adds compiled components to Profinity, such as support for a device or protocol that does not ship in the box, and the **component catalogue** lists every component type that is available and decides which of them engineers see when they add a component to a Profile. The screen has two halves, **INSTALLED PLUGINS** at the top for installing and switching plugins on and off, and **COMPONENT CATALOGUE** below it for hiding or showing individual component types.

Select **ADMIN** in the side menu and open the **Components & Plugins** pill. Opening the screen requires the **`PluginView`** permission, and uploading, enabling, disabling, deleting or changing the catalogue requires **`PluginModify`**, without which the tables are shown without action buttons. See [Roles and permissions](Users_and_Access/Roles_and_Permissions.md).

Plugins are different from **Custom Components**, which are bundles of YAML and scripts. To build a plugin yourself, see [DLL plugins](../Developing_with_Profinity/Plugins/index.md) in Developing with Profinity.

## Installing a plugin

You need a plugin package (a `.nupkg` or zip file) from the plugin's author. Plugins that ship with Profinity are listed alongside the ones you install.

1. Open **Components & Plugins**.
2. **Upload** the package. Uploading also requires the **Custom Plugins** licensed feature. See [Licensing](Licensing.md).
3. **Enable** the plugin.

Where supported, hot reload picks up enabled plugins without a restart. The plugin id is taken from the package file name without its extension, so `my_plugin.zip` installs as `my_plugin`, and it may contain only letters, digits, hyphens and underscores.

## Disabling or removing a plugin

**Disable** a plugin to stop its components loading without removing it, and **Delete** it to remove it. The components of a disabled plugin do not appear in the component catalogue at all, so enable the plugin again before trying to manage its components there.

## Choosing which components are available

The **COMPONENT CATALOGUE** table lists every component type in Profinity, grouped by family. Disabling a component type or a whole group removes it from the **ADD COMPONENT** list without uninstalling anything, which keeps the choices short for a deployment that only uses a few device types, and enabling it again brings it straight back.

Each group can be expanded to show its component types, and the search box above the table filters by name. The **Status** column shows whether each row is currently available, and the **Actions** column holds the button that changes it:

- **Disable** hides a single component type, and **Enable** makes it available again.
- **Disable group** hides every component type in a group at once, and **Enable group** restores them.

The change takes effect as soon as you select the button and the engine does not need to be restarted. Enabling one component type inside a disabled group enables the group and leaves the other types in it disabled, so you can bring back a single device without exposing the rest of its family.

### Rows that cannot be enabled

A row with no action button is locked, and the **Status** column says why:

| Status | Meaning |
| --- | --- |
| Not licensed | The component is not covered by your licence. See [Licensing](Licensing.md). |
| Disabled (Custom.yaml) | The component was hidden by the supplier of your Profinity build, and it cannot be enabled from this screen. |

If an attempt to change a row fails, a message explains the reason.

## Where plugins are stored

Installed plugins live under:

```text
{Artifacts}/plugins/{pluginId}/
```

Registry metadata is stored in `{Artifacts}/config/plugins.yaml`. Both names are lowercase, which matters on Linux where the file system is case-sensitive. An upgrade from an earlier release renames the older `Plugins` and `Config/Plugins.yaml` names automatically. Plugins that ship with Profinity are loaded from `plugins/core` under the engine install folder.

## Related documentation

- [Licensing](Licensing.md)
- [Roles and permissions](Users_and_Access/Roles_and_Permissions.md)
- [Industrial protocols](../Components/Industrial_Protocols/index.md) — BACnet, EtherNet/IP, Modbus, OPC UA and S7
- [DLL plugins (developer guide)](../Developing_with_Profinity/Plugins/index.md)
