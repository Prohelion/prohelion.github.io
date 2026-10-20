---
title: Install and manage plugins
description: "Upload, enable, disable, and delete plugins on the Components & Plugins page, and find where Profinity stores installed plugins."
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Install and manage plugins

Use the **INSTALLED PLUGINS** half of **Components & Plugins** to install plugins and to switch them on and off.
A **plugin** adds compiled components to Profinity, such as support for a device or protocol that does not ship in the box.
The other half of the screen, **COMPONENT CATALOGUE**, hides or shows individual component types, as described in [Choose available components](Choose_Available_Components.md).

Opening the screen requires the **View plugins** permission.
Uploading, enabling, disabling, deleting, or changing the catalogue requires **Modify plugins**, without which the tables are shown without action buttons.
Refer to [Roles and Permissions](Users_and_Access/Roles_and_Permissions.md) for the permissions.

Plugins are different from **Custom Components**, which are bundles of YAML and scripts.
To build a plugin yourself, refer to [dynamic-link library (DLL) plugins](../Developing_with_Profinity/Plugins/index.md) in Developing with Profinity.

## Install a plugin

You need a plugin package, a `.nupkg` or `.zip` file from the plugin's author.
Plugins that ship with Profinity are listed alongside the ones you install.

1. Select **ADMIN** in the side menu and open the **Components & Plugins** pill.
2. In the **UPLOAD PLUGIN (.ZIP OR .NUPKG)** panel, upload the package.
3. Enable the plugin once it is listed. Enabling a plugin that you uploaded also needs the **Custom Plugins** licensed feature, available from the Desktop edition upwards and not when unlicensed (refer to [Licensing](../Licensing.md)).

The plugin id is taken from the package file name without its extension, so `my_plugin.zip` installs as `my_plugin`.
It may contain only letters, digits, hyphens, and underscores.

If no file is chosen, Profinity answers "You must provide a plugin archive (.zip or .nupkg).".
A file with any other extension is rejected with "Plugin archive must use a .zip or .nupkg extension.".
Rename the package or choose the correct file and upload it again.
If the components of an enabled plugin do not appear in the catalogue, restart Profinity so that the plugin loads.

## Disable or remove a plugin

**Disable** a plugin to stop its components loading without removing it, and **Delete** it to remove it.
The components of a disabled plugin do not appear in the component catalogue at all, so enable the plugin again before trying to manage its components there.

## Where plugins are stored

Installed plugins live in a `plugins/{pluginId}/` folder, and the registry of installed plugins is `config/plugins.yaml`, both inside the [artefacts directory](../Installation/Artifacts_Directory.md), which gives the location for each operating system.
Both names are lowercase, which matters on Linux where the file system is case-sensitive.
Plugins that ship with Profinity are loaded from `plugins/core` under the engine install folder.

For the industrial protocol components, refer to [Industrial Protocols](../Components/Industrial_Protocols/index.md), which covers BACnet, EtherNet/IP, Modbus, Open Platform Communications Unified Architecture (OPC UA) and S7.
