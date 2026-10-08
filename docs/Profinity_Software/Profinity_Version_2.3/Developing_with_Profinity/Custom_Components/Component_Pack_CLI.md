---
title: Component Pack CLI
description: "Command-line tool for validating, packing, and installing custom component bundles (YAML, scripts, and DBC files)."
---

# Component Pack CLI

The `profinity-component-pack` command-line tool ships as part of the [Profinity SDK](../SDK.md) developer kit, not with the engine install itself. It validates, packs and installs [Custom Component](index.md) file bundles (YAML, scripts and maps), and it does not handle DLL plugins, which are installed through **Components & Plugins** (see [DLL Plugins](../Plugins/index.md)). The tool runs from the kit's `profinity-component-pack` subfolder.

## Commands

```bash
profinity-component-pack validate --component-dir <path>
profinity-component-pack pack --component-dir <path> --output bundle.zip
profinity-component-pack install --package bundle.zip --profinity-dir <Artifacts> --profile <name> --engine-dir <engine-bin>
```

`<Artifacts>` is the [Artifacts directory](../../Installation/Artifacts_Directory.md), and `<engine-bin>` is the `bin` folder of the Profinity engine install.

| Command | Purpose |
|---------|---------|
| `validate` | Checks the component folder and reports the first problem found |
| `pack` | Creates a bundle for distribution, as a `.zip` or a `.nupkg` according to the extension of `--output` |
| `install` | Extracts the bundle into the `components` folder of the named profile, at `{profinity-dir}/profiles/{profile}/components` |

| Flag | Used by | Required | Meaning |
|------|---------|----------|---------|
| `--component-dir` | `validate`, `pack` | Yes | The component folder |
| `--output` | `pack` | Yes | The bundle to write, which must end in `.zip` or `.nupkg` |
| `--package` or `--zip` | `install` | Yes | The bundle to install, ending in `.zip` or `.nupkg`. The two flags are aliases and cannot be combined |
| `--profinity-dir` | `install` | Yes | The Artifacts directory |
| `--engine-dir` | `install` | Yes | The engine `bin` folder, used to validate the bundle against the installed SDK version |
| `--profile` | `install` | Yes | The name of the profile to install into |

Each flag takes one value and may be given once. The first positional argument can replace `--component-dir` (or `--package` for `install`), and the second positional argument can replace `--output` for `pack`.

## What Validation Requires

`validate` and `pack` require `component_metadata.yaml`, `settings_map.yaml`, `firmware_map.yaml` and `actions.yaml` in the component folder, and report `Missing required file:` followed by the name when one is absent. The `name` in `component_metadata.yaml` must be usable as a folder name (`Component name is not a valid folder name` otherwise), and a `.nupkg` also needs a valid semantic `pluginVersion` and a non-empty `author`. Messages from `actions.yaml` that name a menu entry, such as an unsupported `kind` or `icon`, are described on [Custom Components](index.md#menu-actions-in-actionsyaml).

## When to Use the Tool

Use the tool when the same Custom Component is installed on more than one system, for example from a continuous integration (CI) pipeline that produces versioned bundles for field engineers, so that an administrator uploads one `.nupkg` in [Components & Plugins](../../Administration/Components_and_Plugins.md) instead of copying files into each profile by hand. A DLL plugin is packed as described on [DLL Plugins](../Plugins/index.md), and a dashboard-only component can be copied through profile administration without a pack step.

## Related Documentation

- [Profinity SDK](../SDK.md)
- [Component Types](./Component_Types.md)
- [Custom Components](index.md)
