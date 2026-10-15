---
title: Components & Plugins
description: "Install and manage plugins, and choose which component types engineers can add to a Profile, from Components & Plugins in the admin UI."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Components & Plugins

Use **Components & Plugins** to install plugins and to choose which component types engineers see when they add a component to a [Profile](Profiles.md).
A **plugin** adds compiled components to Profinity, such as support for a device or protocol that does not ship in the box.
The **component catalogue** lists every component type that is available.
The screen has two halves: **INSTALLED PLUGINS** at the top for installing and switching plugins on and off, and **COMPONENT CATALOGUE** below it for hiding or showing individual component types.

Opening the screen requires the **View plugins** permission.
Uploading, enabling, disabling, deleting, or changing the catalogue requires **Modify plugins**, without which the tables are shown without action buttons.
Refer to [Roles and Permissions](Users_and_Access/Roles_and_Permissions.md) for the permissions.

Plugins are different from **Custom Components**, which are bundles of YAML and scripts.
To build a plugin yourself, refer to [dynamic-link library (DLL) plugins](../Developing_with_Profinity/Plugins/index.md) in Developing with Profinity.

## Installing a plugin

You need a plugin package, a `.nupkg` or `.zip` file from the plugin's author.
Plugins that ship with Profinity are listed alongside the ones you install.

1. Select **ADMIN** in the side menu and open the **Components & Plugins** pill.
2. In the **UPLOAD PLUGIN (.ZIP OR .NUPKG)** panel, upload the package.
3. Enable the plugin once it is listed. Enabling a plugin that you uploaded also needs the **Custom Plugins** licensed feature, available from the Desktop edition upwards and not when unlicensed (refer to [Licensing](Licensing.md)).

The plugin id is taken from the package file name without its extension, so `my_plugin.zip` installs as `my_plugin`.
It may contain only letters, digits, hyphens, and underscores.

If no file is chosen, Profinity answers "You must provide a plugin archive (.zip or .nupkg).".
A file with any other extension is rejected with "Plugin archive must use a .zip or .nupkg extension.".
Rename the package or choose the correct file and upload it again.
If the components of an enabled plugin do not appear in the catalogue, restart Profinity so that the plugin loads.

## Disabling or removing a plugin

**Disable** a plugin to stop its components loading without removing it, and **Delete** it to remove it.
The components of a disabled plugin do not appear in the component catalogue at all, so enable the plugin again before trying to manage its components there.

## Choosing which components are available

The **COMPONENT CATALOGUE** table lists every component type in Profinity, grouped by family.
Disabling a component type or a whole group removes it from the **ADD COMPONENT** list without uninstalling anything, which keeps the choices short for a deployment that only uses a few device types.
Enabling it again brings it straight back.

Expand a group to show its component types, and use the search box above the table to filter by name.
The **Status** column shows whether each row is currently available, and the **Actions** column holds the button that changes it:

- **Disable** hides a single component type, and **Enable** makes it available again.
- **Disable group** hides every component type in a group at once, and **Enable group** restores them.

The change takes effect as soon as you select the button, and the engine does not need to be restarted.
Enabling one component type inside a disabled group enables the group and leaves the other types in it disabled, so you can bring back a single device without exposing the rest of its family.

### Rows that cannot be enabled

A row with no action button is locked, and the **Status** column says why.
**Not licensed** means your licence does not cover the component.
Refer to [Licensing](Licensing.md).
**Disabled (Custom.yaml)** means the supplier of your Profinity build hid the component, and it cannot be enabled from this screen.
If an attempt to change a row fails, a message explains the reason.

## Where plugins are stored

Installed plugins live in a `plugins/{pluginId}/` folder, and the registry of installed plugins is `config/plugins.yaml`, both inside the [artefacts directory](../Installation/Artifacts_Directory.md), which gives the location for each operating system.
Both names are lowercase, which matters on Linux where the file system is case-sensitive.
Plugins that ship with Profinity are loaded from `plugins/core` under the engine install folder.

For the industrial protocol components, refer to [Industrial Protocols](../Components/Industrial_Protocols/index.md), which covers BACnet, EtherNet/IP, Modbus, Open Platform Communications Unified Architecture (OPC UA) and S7.
