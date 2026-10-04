---
title: Tag Tree Path
description: "Mount components at nested locations in the tag tree hierarchy instead of at the root level."
---

# Tag Tree Path

Every component in a profile mounts a branch in the Profinity tag tree, and by default that branch sits at the root of the tree under the component's own name. The **Tag tree path** setting (wire name `tagTreeParentPath`) enables nested component mounting: it changes where a component mounts by giving it a parent folder, so that its tags nest under another location in the tree instead of standing alone at the root.

## Why nest a component

Nesting is intended for profiles that model a hierarchy of physical or logical groupings rather than a flat list of components — for example, several components representing subsystems of the same vehicle, or several instances of the same component type representing different bays, strings or vehicles in a fleet. Setting a **Tag tree path** groups those components under a shared namespace folder in the tag tree and in the Tag Explorer catalogue, so an integrator or operator can navigate the tree the same way the physical system is organised, rather than reading a flat, unstructured list of component roots.

The composed mount point at runtime is the parent path combined with the component name — for example, a component named `Charger` with a **Tag tree path** of `Vehicles/Car1` mounts at `Vehicles/Car1/Charger`, while the same component with the default path of `/` mounts at `Charger`. Every component's composed mount point must be unique: if two components would resolve to the same or an overlapping tag root, Profinity rejects the settings change and reports which paths overlap, so it is not possible to save a configuration that would collide with another component's branch or a tag relay receiver's owned prefix.

## Setting the Tag tree path field

The **Tag tree path** field sits in the **Component Identifier** section of a component's settings dialog, directly below **Name**. It accepts a slash-separated path to the parent folder only — it must not include the component's own name, which Profinity appends automatically at runtime. The default value is `/`, meaning the component mounts at the root of the tag tree; leaving the field at its default is equivalent to the pre-2.3 behaviour, where every component's tags sat directly under its own name.

<figure markdown>
![Component settings dialog showing the Tag tree path field under Component Identifier](../images/2.3-tag-tree-path-setting.png)
<figcaption>Tag tree path field in the component settings dialog</figcaption>
</figure>

## Absolute versus relative dashboard binds

Once a component is nested, the distinction between an absolute and a relative dashboard bind determines whether a `source:` value in a `bind:` entry follows the component if it moves.

A **relative bind** has no leading slash and is resolved against the component's own composed mount point (its `ComponentTagRoot`) at dashboard load time — for example, `DBC/BMSInfo/Flag` on a dashboard belonging to a component mounted at `Vehicles/Car1/Charger` resolves to `Vehicles/Car1/Charger/DBC/BMSInfo/Flag`. Use a relative bind for any dashboard that only references its own component's tags, which is the normal case for a component's own dashboard. Because the reference is resolved against whatever the component's current mount point is, a relative bind continues to resolve correctly if the component's **Tag tree path** later changes.

An **absolute bind** carries a leading slash and is not qualified against any component root — for example, `/Vehicles/Car1/Charger/DBC/BMSInfo/Flag` on the profile home dashboard or on a different component's dashboard, referencing a tag that belongs to another component entirely. Use an absolute bind whenever a dashboard needs to read a tag that belongs to a different component than the one the dashboard is attached to. Because the path is a literal string rather than a reference resolved against a moving root, an absolute bind is tied to the exact tag tree path in effect when it was written.

The legacy `{COMPONENT_NAME}` placeholder, documented in [Data Binding](../Customising_Profinity/Dashboards/Data_Binding.md), still loads correctly and is expanded to whichever path form applies, but it is a load-only shim: Profinity rewrites it to an explicit relative or absolute path the next time the dashboard is saved.

## Changing the path on an already-deployed component

!!! warning
    Changing an already-deployed component's **Tag tree path** (or renaming it) automatically patches `rules.yaml`, `collections.yaml` scopes, and the profile home dashboard's `source:` bindings to point at the new composed path — Profinity resolves each candidate path against the live tag tree before rewriting it, so an unrelated branch that happens to share a name is never touched. This automatic patching does not extend to absolute binds inside other components' own dashboards that reference the moved component — those references are literal strings pointing at the old path and are left unchanged, so they stop resolving until someone finds and updates them by hand. Historian data recorded against the component's old tag path is also not migrated and is orphaned at the point of the move, appearing as a break in historical trends rather than a continuous series. Relative binds inside the moved component's own dashboard are unaffected either way, because they resolve against the component's current mount point rather than a stored literal path.

Before relocating a component that other dashboards reference by absolute path, search those dashboards for the component's old composed path and update any matching `source:` values by hand, and treat any historian chart spanning the move as having a discontinuity at the relocation point.

## Related documentation

- [Component types](../Developing_with_Profinity/Custom_Components/Component_Types.md)
- [Tag Layer](index.md)
- [Dashboards](../Customising_Profinity/Dashboards/index.md)
