---
title: Component Pack CLI
description: "Validate, pack, and install Custom Component bundles with profinity-component-pack, with every command, flag, and validation rule."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Component Pack CLI

The `profinity-component-pack` command-line interface (CLI) tool ships as part of the [Profinity SDK](index.md) download, not with the engine install itself.
It validates [Custom Components](../Custom_Components/index.md) file bundles (YAML, scripts, and maps), packs them as a `.zip` or a `.nupkg`, and installs that package into a profile.
It does not handle DLL plugins, which are installed through **Components & Plugins** (refer to [Developing Plugins](Developing_Plugins.md)).
`component_metadata.yaml` names the pack in the catalogue and binds the files in the folder.
Refer to [Component metadata](../Custom_Components/Component_Metadata.md).
The tool runs from the `profinity-component-pack` subfolder of the SDK download.

## Commands

```bash
profinity-component-pack validate --component-dir <path>
profinity-component-pack pack --component-dir <path> --output bundle.zip
profinity-component-pack install --package bundle.zip --profinity-dir <Artifacts> --profile <name> --engine-dir <engine-bin>
```

`<Artifacts>` is the [Artefacts directory](../../Installation/Artifacts_Directory.md), and `<engine-bin>` is the `bin` folder of the Profinity engine install.

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

Each flag takes one value and may be given once.
The first positional argument can replace `--component-dir` (or `--package` for `install`), and the second positional argument can replace `--output` for `pack`.

## What validation requires

`validate` and `pack` require `component_metadata.yaml`, `settings_map.yaml`, `firmware_map.yaml` and `actions.yaml` in the component folder, and report `Missing required file:` followed by the name when one is absent.
The `name` in `component_metadata.yaml` must be usable as a folder name.
Otherwise the tool reports `Component name is not a valid folder name`.
A `.nupkg` also needs a valid semantic `pluginVersion` and a non-empty `author`.
Messages from `actions.yaml` that name a menu entry, such as an unsupported `kind`, are described on [Menu actions](../Custom_Components/Menu_Actions.md).

## When to use the tool

Use the tool when the same Custom Component is installed on more than one system.
An example is a continuous integration (CI) pipeline that produces versioned bundles for field engineers.
An administrator then uploads one `.nupkg` in **Components & Plugins** instead of copying files into each profile by hand.
Refer to [Install and manage plugins](../../Administration/Install_and_Manage_Plugins.md).
A DLL plugin is packed as described on [Developing Plugins](Developing_Plugins.md).
A dashboard-only component can be copied through profile administration without a pack step.
[Custom Components](../Custom_Components/index.md) compares Custom Components with Dashboard Components and DLL plugins.
