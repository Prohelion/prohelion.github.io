---
title: Component Pack CLI
description: "Command-line tool for validating, packing, and installing custom component bundles (YAML, scripts, and DBC files)."
---

# Component Pack CLI

The **`profinity-component-pack`** command-line tool ships as part of the [Profinity SDK](../SDK.md) developer kit, not with the engine install itself. It validates, packs, and installs **[Custom Component](index.md) file bundles** (YAML, scripts, maps) — **not** DLL plugins.

DLL plugins are installed through Plugin Manager instead — see [DLL plugins](../Plugins/index.md).

## Commands

```bash
profinity-component-pack validate --component-dir <path>
profinity-component-pack pack --component-dir <path> --output bundle.zip
profinity-component-pack install --package bundle.zip --profinity-dir <Artifacts> --profile <name> --engine-dir <engine-bin>
```

| Command | Purpose |
|---------|---------|
| **validate** | Check component folder structure and required files |
| **pack** | Create a bundle for distribution, as a `.zip` or a `.nupkg` according to the extension of `--output` (a `.nupkg` also needs `pluginVersion` and a non-empty `author` in `component_metadata.yaml`) |
| **install** | Extract the bundle into the `components` folder of the named profile, at `{profinity-dir}/profiles/{profile}/components` |

`--component-dir`, `--output`, `--package` (or `--zip`), `--profinity-dir`, `--engine-dir` and `--profile` each take a value and may be given once, and the first positional argument is accepted in place of `--component-dir` (or `--package` for **install**), with the second positional argument in place of `--output` for **pack**. `--engine-dir <engine-bin>` is required on **install** — the tool uses it to validate the bundle against the installed SDK version. `--zip` is an alias for `--package` and is mutually exclusive with it.

Run the tool from the kit's `profinity-component-pack` subfolder (see [Profinity SDK](../SDK.md) for how to get the kit).

## When to use

- **Distributing a script-based Custom Component as a plugin.** Pack the component folder into a `.nupkg` that an administrator uploads in [Components and Plugins](../../Administration/Components_and_Plugins.md), instead of copying files into each profile by hand.
- OEM distribution of Custom Component folders without manual copying.
- CI pipelines that produce versioned bundles for field engineers.
- Repeatable installs into staging `PROFINITY_HOME` trees.

## When not to use

- **DLL plugins** — use `dotnet pack` with SDK plugin authoring, then upload through Plugin Manager.
- **Dashboard-only components** — copying the YAML through profile administration is often sufficient, without a pack step.

## Related documentation

- [Profinity SDK](../SDK.md)
- [Component types](./Component_Types.md)
- [Custom Components](index.md)
