---
title: Nest a component in the tag tree
description: Set the Tag tree path of a component so its tags mount inside a parent folder, resolve overlapping paths, and change the path of a deployed component safely.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Nest a component in the tag tree

By default each component mounts at the root of the tag tree under its own name.
The **Tag tree path** setting gives it a parent folder, so that its tags nest under that location instead.
To see what nesting does to scopes and dashboard binds, refer to [Tag tree paths and dashboard binds](Tag_Tree_Path.md).

To nest a component:

1. In the **Component Identifier** section of the component's settings dialog, go to **Tag tree path**.
2. Enter the parent folder as a slash-separated path, for example `Vehicles/Car1`.
3. Save the settings. The component's tags now appear under that folder in Tag Explorer.

The path must not include the component's own name, which Profinity appends automatically.
The default value of `/` mounts the component at the root.

A component named `Charger` with a **Tag tree path** of `Vehicles/Car1` mounts at `Vehicles/Car1/Charger`, and its tags appear in Tag Explorer under that folder.

Every mount point must be unique.
Profinity rejects the change if two components would resolve to the same or an overlapping location.
It also rejects the change if a component would resolve to a location published by a [Tag relay](../Tag_Relay.md) receiver.
The message reports which paths overlap, in the form `Tag destination 'A' overlaps 'B'. Choose a unique destination.`
Change the **Tag tree path** or the name of one of the two components until the paths no longer overlap.

## Change the path on a deployed component

!!! warning "Moving a component breaks absolute binds in other dashboards"
    Absolute binds in other components' dashboards stop resolving when the component they reference is moved, and history recorded by the [TAG SQL Historian](../../Components/Historians/TAG_SQL_Historian.md) under the old path is not carried across.

Changing a deployed component's **Tag tree path**, or renaming it, automatically updates the [rules](../Rules/index.md) and [collections](../Collections/index.md) that refer to it, along with the home dashboard's `source:` bindings.
Only paths that refer to the moved component are updated, and an unrelated branch with the same name is left alone.
The same updates appear in `rules.yaml` and `collections.yaml` for anyone who edits those files directly.

Absolute binds inside other components' dashboards are not updated, because they are literal paths to the old location.
This includes binds that use the `[TimeSeries]` and `[TimeSeries_Delta]` source prefixes as well as those that begin with a slash.
History recorded by the TAG SQL Historian under the old path is not migrated, so a trend from it spanning the move shows a break at that point.
The InfluxDB historians and loggers and the Prometheus logger identify a tag by its component, message, and signal, not by its path.
Moving a component therefore does not start a new series in them.
Renaming a component does, in every historian and logger, because the component name is part of how history is identified.
Relative binds inside the moved component's own dashboard are unaffected.

Before relocating a component that other dashboards reference by absolute path, search those dashboards for its old path and update any matching `source:` values by hand.
