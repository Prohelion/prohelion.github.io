---
title: Component Pack CLI
description: "Command-line tool for validating, packing, and installing custom component bundles (YAML, scripts, and DBC files)."
---

# Component Pack CLI

The **`profinity-component-pack`** command-line tool ships as part of the [Profinity SDK](../SDK.md) developer kit, not with the engine install itself. It validates, packs, and installs **Custom Component file bundles** (YAML, scripts, maps) — **not** DLL plugins.

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
| **pack** | Create zip or content nupkg bundle for distribution |
| **install** | Extract bundle into a profile under the artifacts directory |

`--engine-dir <engine-bin>` is required on **install** — the tool uses it to validate the bundle against the installed SDK version. `--zip` is an alias for `--package` and is mutually exclusive with it.

Run the tool from the kit's `profinity-component-pack` subfolder (see [Profinity SDK](../SDK.md) for how to get the kit).

## When to use

- OEM distribution of Custom Component folders without manual copying.
- CI pipelines that produce signed zip bundles for field engineers.
- Repeatable installs into staging `PROFINITY_HOME` trees.

## When not to use

- **DLL plugins** — use `dotnet pack` with SDK plugin authoring, then upload through Plugin Manager.
- **Dashboard-only components** — copying the YAML through profile administration is often sufficient, without a pack step.

## Related documentation

- [Profinity SDK](../SDK.md)
- [Component types](./Component_Types.md)
- [Custom Components](../Custom_Components/index.md)
- Engineering [A2 Advanced Custom Components](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A2-Advanced-Custom-Components.md)
