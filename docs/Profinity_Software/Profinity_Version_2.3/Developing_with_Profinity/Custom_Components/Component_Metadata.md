---
title: Component metadata
description: "Look up the keys of component_metadata.yaml, which names a Custom Component in the catalogue and binds the files in the folder."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Component metadata

`component_metadata.yaml` names a [Custom Component](index.md) in the catalogue and binds the files in the folder.
It is written in the component folder; it is not an upload on the settings dialog.
A pack also needs `settings_map.yaml`, `firmware_map.yaml`, and `actions.yaml`.
Refer to [Custom Component files](Files.md).
The [Component Pack CLI](../SDK/Component_Pack_CLI.md) in the [Profinity SDK](../SDK/index.md) validates that folder and writes the bundle.

| Key | Meaning |
|-----|---------|
| `version` | Document stamp. Set it to `"2.3"` |
| `name` | Catalogue name. It must be usable as a folder name, or validation fails with `Component name is not a valid folder name` |
| `description` | Catalogue description |
| `author` | Author. A `.nupkg` requires a non-empty author |
| `pluginVersion` | Semantic version. A `.nupkg` requires one |
| `requiredSdkVersion` | SDK version the pack needs, such as `">=1.0.0"` |
| `componentType` | `CustomComponent` |
| `componentGroup` | Catalogue group. The sample uses `Custom` |
| `allowMultiple` | `true` lets a profile hold more than one instance |
| `mainScript` | Path of the main script, relative to the component folder |
| `dbcFile` | DBC file name |
| `dashboardFile` | Dashboard file name |
| `rebaseDbc` | Same as **Rebase DBC** on the component |
| `rebaseAddress` | Same as **Rebase Address** on the component |
| `deviceIdFilter` | Device identifier, as a hex value such as `0x1000` |

```yaml
version: "2.3"
name: Hello
description: First Custom Component tutorial
author: Prohelion
pluginVersion: 1.0.0
requiredSdkVersion: ">=1.0.0"
componentGroup: Custom
componentType: CustomComponent
allowMultiple: true
mainScript: scripts/hello.py
dbcFile: hello.dbc
dashboardFile: hello.yaml
```

That file is the metadata from the [Hello component pack](First_Custom_Component.md).
After an administrator uploads the bundle under **ADMIN** > **Components & Plugins**, **ADD COMPONENT** lists the `name` from this file.
Refer to [Install and manage plugins](../../Administration/Install_and_Manage_Plugins.md) for the upload screen, and to [Using a Custom Component](../../Components/Custom_Components/Using_a_Custom_Component.md) for the instance that results.
A compiled plugin is a different bundle.
Refer to [Developing Plugins](../SDK/Developing_Plugins.md).
