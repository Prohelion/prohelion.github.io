---
title: Component Types
description: "Comparison of two Profinity extension models: Custom Components and DLL plugins."
---

# Custom Component and DLL plugins

A custom component is how you add something to a Profinity profile that Profinity does not already ship: a third-party device, a screen built from existing tags, or a new component type of your own. Once it is in a profile, it is monitored, graphed, logged, and used by rules and scripts in the same way as a built-in component.

There are two ways to create one:

- **Custom Component** — for a device you can describe with files. You supply a DBC, a dashboard, scripts, and menu actions, and Profinity runs them on its built-in `CustomComponent` type. No compiling is needed.
- **DLL plugin** — for a component that needs compiled code. You build an assembly against the SDK and install it through Plugin Manager, and it registers a new component type.

Choose a Custom Component first, and a DLL plugin only when files and scripts are not enough.

<figure markdown>
![Package a device's comms protocol, tags, rules, and dashboards as one plugin — shippable as Python + YAML or compiled — then install it so it behaves like a native device: build, package, install, reuse across every site](../../images/2.3-diagram-build-your-own-plugin.png)
<figcaption>Package your device as a plugin</figcaption>
</figure>

## Comparison

| | **Custom Component** | **DLL plugin** |
|--|----------------------|----------------|
| **Type** | Built-in `CustomComponent` | Author-compiled assembly |
| **DBC** | Optional | Varies by plugin |
| **Primary files** | DBC, dashboard YAML, `actions.yaml`, scripts, maps | `.dll` plus an optional `dependencies/` folder, in a nupkg or zip |
| **Packaging** | Optional `profinity-component-pack` zip/nupkg | Plugin Manager `.nupkg`/zip |
| **Install path** | Profile component folder | `{Artifacts}/plugins/{id}/` |
| **Example** | G-STAR IV custom sample | Rinstrum Scale Plugin |

## Custom Component (advanced)

The files behind that row — DBC, dashboard, rules, `actions.yaml`, the main script, `settings_map.yaml`, `firmware_map.yaml`, `firmware.yaml`, and `component_metadata.yaml` on a pack — are documented in [Custom Components](index.md). Packing is optional and uses the [Component Pack CLI](./Component_Pack_CLI.md). The [Profinity SDK](../SDK.md) is the kit that contains the pack tool.

## DLL plugin

A DLL plugin is a C# (or other SDK-supported) assembly packed as a `.nupkg` or zip and installed through Plugin Manager (see [DLL plugins](../Plugins/index.md)). Plugins register new component types at runtime.

## Related documentation

- [Custom Components](index.md)
- [Component Pack CLI](./Component_Pack_CLI.md)
- [DLL plugins](../Plugins/index.md)
- [Dashboard visual editor](../../Customising_Profinity/Dashboards/Visual_Editor.md)
