---
title: Component Types
description: "Comparison of three Profinity extension models: Custom Components, Dashboard Components, and DLL plugins."
---

# Custom Component, Dashboard Component, and DLL plugins

Profinity 2.3 distinguishes three extension models. Using the wrong packaging path is a common integration mistake.

<figure markdown>
![Package a device's comms protocol, tags, rules, and dashboards as one plugin — shippable as Python + YAML or compiled — then install it so it behaves like a native device: build, package, install, reuse across every site](../../../../assets/images/2.3/2.3-diagram-build-your-own-plugin.png)
<figcaption>Package your device as a plugin</figcaption>
</figure>

## Comparison

| | **Custom Component** | **Dashboard Component** | **DLL plugin** |
|--|----------------------|-------------------------|----------------|
| **Type** | Built-in `CustomComponent` | Built-in `DashboardComponent` | Author-compiled assembly |
| **DBC** | Optional | No | Varies by plugin |
| **Primary files** | DBC, dashboard YAML, `actions.yaml`, scripts, maps | Dashboard YAML only | `.dll` + manifest in nupkg/zip |
| **Packaging** | Optional `profinity-component-pack` zip/nupkg | N/A (profile YAML) | Plugin Manager `.nupkg`/zip |
| **Install path** | Profile component folder | Profile component folder | `{Artifacts}/plugins/{id}/` |
| **Example** | G-STAR IV custom sample | Profile YAML dashboard-only component | Rinstrum Scale Plugin |

## Custom Component (advanced)

Beyond basic DBC + dashboard, Custom Components support:

- **`actions.yaml`** — firmware and operator actions.
- **`MainScriptFilename`** and firmware scripts.
- **`settings_map.yaml`** / **`firmware_map.yaml`** — structured settings binding.
- **`component_metadata.yaml`** — display metadata.

<figure markdown>
![Custom Component settings showing script and actions fields](../../../../assets/images/2.3/2.3-custom-component-settings.png)
<figcaption>Custom Component advanced settings (screenshot placeholder — provide SS-47)</figcaption>
</figure>

Optional packaging: [Component Pack CLI](./Component_Pack_CLI.md).

Authoring reference: [SDK Plugin Authoring](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/SDK/SDK-Plugin-Authoring.md) and [Custom Components](../Custom_Components/index.md).

## Dashboard Component

A **Dashboard Component** is a built-in profile component that renders **YAML-only** dashboards — **no DBC**. Use it for HMI-style screens that bind to existing tags without defining CAN messages.

Distinct from:

- **Profile home dashboard** — `UseCustomProfileDashboard` on the profile replaces the profile home page.
- **Custom Component** — may include DBC and firmware scripts.

## DLL plugin

Author C# (or SDK-supported) assemblies, pack as `.nupkg` or zip, install via [DLL plugins](../Plugins/index.md). Plugins register new component types at runtime.

## Related documentation

- [Custom Components](../Custom_Components/index.md)
- [Component Pack CLI](./Component_Pack_CLI.md)
- [DLL plugins](../Plugins/index.md)
- [Dashboard visual editor](../Dashboards/Visual_Editor.md)
