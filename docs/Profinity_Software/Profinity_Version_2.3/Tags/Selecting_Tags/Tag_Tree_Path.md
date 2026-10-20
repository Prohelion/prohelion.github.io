---
title: Tag tree paths and dashboard binds
description: Learn how the Tag tree path setting nests a component in the tag tree, and how nesting affects scopes and dashboard binds.
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Tag tree paths and dashboard binds

A component can be placed inside a folder of the tag tree rather than at its root.
By default each component mounts at the root under its own name, and the **Tag tree path** setting gives it a parent folder so that its tags nest under that location instead.
The setting is stored as `tagTreeParentPath` in the component's YAML.

Nesting suits profiles that model physical or logical groupings, such as several subsystems of one vehicle, or several instances of one component type representing the bays, strings, or vehicles in a fleet.
The shared folder appears in the tag tree and in the Tag Explorer, so an integrator or operator can navigate the tree the way the physical system is organised.

The following sketch shows the effect of giving two components a **Tag tree path** of `Vehicles/Car1`:

```text
Without a Tag tree path          With a Tag tree path of Vehicles/Car1
Charger/                         Vehicles/
Inverter/                          Car1/
                                     Charger/
                                     Inverter/
```

The Tag Explorer shows the same structure for a full profile.
In the example below, each component appears as a branch under the root of the tree, and the tags within it are grouped into folders such as `DBC`, so a component with a **Tag tree path** set would appear in the same way inside its parent folders instead of at the root.

<figure markdown>
![Tag Explorer tree showing each component as a branch under the root, with its tags grouped in folders such as DBC](../../images/tag-explorer-tree.png)
<figcaption>Full Tag Explorer example with components mounted at the root, the default</figcaption>
</figure>

To set the path, refer to [Nest a component in the tag tree](Nest_a_Component_in_the_Tag_Tree.md).

## Scopes in collections and rules

In the profile's collections and rules, write a scope as the full path from the root of the tag tree, so the tags of a `Charger` component with a **Tag tree path** of `Vehicles/Car1` are scoped with `Vehicles/Car1/Charger`.
A component's own `rules.yaml` is different: its relative scopes start at where the component is mounted, so a `scope.prefix` of `DBC` in the `Charger` component's rules resolves to `Vehicles/Car1/Charger/DBC`, and a component at the root resolves it to `Charger/DBC`.

## Absolute and relative dashboard binds

Once a component is nested, the form of a `source:` value in a dashboard `bind:` entry decides whether it follows the component if it moves.

| | Relative bind | Absolute bind |
|---|---|---|
| Form | No leading slash | Leading slash |
| Example | `DBC/BMSInfo/Flag` | `/Vehicles/Car1/Charger/DBC/BMSInfo/Flag` |
| Resolved | Against the component's own mount point when the dashboard loads | Used exactly as written |
| Use for | A dashboard reading its own component's tags, which is the normal case | A dashboard reading another component's tags, such as the profile home dashboard |
| If the component moves | Continues to resolve | Stops resolving until updated |

On a dashboard belonging to that `Charger` component, the relative bind `DBC/BMSInfo/Flag` resolves to `Vehicles/Car1/Charger/DBC/BMSInfo/Flag`.

Dashboards that use the `{COMPONENT_NAME}` placeholder, documented in [Data Binding](../../Customising_Profinity/Dashboards/Data_Binding/index.md), keep working, and Profinity replaces the placeholder with an explicit relative or absolute path the next time the dashboard is saved.

For the component types that carry this setting, refer to [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md), and for the dashboards that bind to these paths, refer to [Dashboards](../../Customising_Profinity/Dashboards/index.md).
The [Tag layer](../index.md) page lists the rest of the tag pages.
