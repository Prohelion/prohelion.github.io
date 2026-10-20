---
title: Packing a Custom Component
description: "Write component_metadata.yaml and pack a Custom Component so another installation can add it by name."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Packing a Custom Component

A [Custom Component](index.md) that stays in one profile runs from the files uploaded on the component.
`component_metadata.yaml` turns that same folder into a bundle another installation can add by name.
A pack requires this file, plus `settings_map.yaml`, `firmware_map.yaml`, and `actions.yaml`.
Refer to [Custom Component files](Files.md).

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

The file also accepts:

- `deviceIdFilter`
- `displayName`
- `firmwareFeed`
- `firmwareFeedLocal`
- `firmwareManifest`
- `iconPath`
- `id`
- `licenseComponent`
- `licenseFeature`
- `licenseRequirement`
- `productImagePath`
- `rebaseAddress`
- `rebaseDbc`

```yaml
version: "2.3"
name: G-STAR IV Python
description: SiRFstar IV G-STAR IV GPS reference component (Python scripts)
author: Profinity
pluginVersion: 1.0.0
requiredSdkVersion: ">=1.0.0"
componentGroup: Custom
componentType: CustomComponent
allowMultiple: true
mainScript: scripts/gps_main.py
dbcFile: GStarIV.dbc
dashboardFile: gstar_iv.yaml
```

[`profinity-component-pack`](../SDK/Component_Pack_CLI.md) validates that folder and writes a `.zip`.
When the output name ends in `.nupkg`, the tool writes a content package instead.
The bundle is still a Custom Component plus these files.

A compiled assembly installed through **Components & Plugins** is covered on [Developing Plugins](../SDK/Developing_Plugins.md).
The two are packed and installed separately.

A content pack can be uploaded under **ADMIN** → **Components & Plugins**.
**ADD COMPONENT** then lists the `name` from `component_metadata.yaml`.
Adding that entry creates a profile instance with **Pack files** and **Scripts** hidden.
Refer to [Install and manage plugins](../../Administration/Install_and_Manage_Plugins.md) for the upload screen.

The same bundle can be installed on the Profinity machine with `profinity-component-pack install`.
The command extracts it into the profile's `components` folder.
The tool ships in the [Profinity SDK](../SDK/index.md) kit.

New in Profinity 2.3.
