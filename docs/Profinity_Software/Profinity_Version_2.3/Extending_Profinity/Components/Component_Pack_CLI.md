---
title: Component Pack CLI
---

# Component Pack CLI

The **`profinity-component-pack`** command-line tool ships next to the Profinity engine binary. It validates, packs, and installs **Custom Component file bundles** (YAML, scripts, maps) — **not** DLL plugins.

For DLL plugins use Plugin Manager — see [DLL plugins](../Plugins/index.md).

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

Run from the directory containing `profinity-component-pack` (install dir, not `Tools/`).

## When to use

- OEM distribution of Custom Component folders without manual copy/paste.
- CI pipelines that produce signed zip bundles for field engineers.
- Repeatable installs into staging `PROFINITY_HOME` trees.

## When not to use

- **DLL plugins** — use `dotnet pack` / SDK plugin authoring and Plugin Manager upload.
- **Dashboard-only components** — often sufficient to copy YAML via profile admin without a pack step.

## Related documentation

- [Component types](./Component_Types.md)
- [Custom Components](../Custom_Components/index.md)
- Engineering [A2 Advanced Custom Components](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A2-Advanced-Custom-Components.md)
