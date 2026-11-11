---
title: Nest a component in the tag tree
description: Set the Tag tree path of a component so its tags mount inside a parent folder, resolve overlapping paths, and change the path of a deployed component safely.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Nest a component in the tag tree

By default each component mounts at the root of the tag tree under its own name, and the **Tag tree path** setting nests its tags under a parent folder instead.
To see what nesting does to scopes and dashboard binds, refer to [Tag tree paths and dashboard binds](Tag_Tree_Path.md).

Editing the **Tag tree path** needs **Modify components**.

If the component is already deployed, read [Change the path on a deployed component](#change-the-path-on-a-deployed-component) and back up the files it names before you start.

To nest a component:

1. In the **Component Identifier** section of the component's settings dialog, go to **Tag tree path**.
2. Enter the parent folder as a slash-separated path, for example `Vehicles/Car1`.
3. Select **SAVE**. The component's tags now appear under that folder in **Tag Explorer**.

The path must not include the component's own name, which Profinity appends automatically.
The default value of `/` mounts the component at the root.

A component named `Charger` with a **Tag tree path** of `Vehicles/Car1` mounts at `Vehicles/Car1/Charger`, and its tags appear in **Tag Explorer** under that folder.

Every mount point must be unique.

| What you see | Cause | What to do |
|---|---|---|
| Profinity rejects the change, with a message in the form `Tag destination 'A' overlaps 'B'. Choose a unique destination.` that reports which paths overlap. | Two components would resolve to the same or an overlapping location. | Change the **Tag tree path** or the name of one of the two components until the paths no longer overlap. |
| Profinity rejects the change to the **Tag tree path**. | The component would resolve to a location published by a [Tag relay](../Tag_Relay.md) receiver. | Not stated. |

## Change the path on a deployed component

!!! warning "Moving a component breaks absolute binds in other dashboards"
    Absolute binds in other components' dashboards stop resolving when the component they reference is moved, and Profinity does not update them.

Before you change the path, copy the `rules.yaml`, `collections.yaml` and dashboard files from the profile folder, which is the folder named after the profile inside the `profiles` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), to a safe place. The profile folder is `profiles/<profile name>` in the artefacts directory, and each file sits in its own subfolder: `rules`, `collections` or `dashboards`.
Profinity also keeps one safety copy, `<file>.bak`, beside each of these files it updates, holding the version before the latest save.
A later save replaces that safety copy, so your own copy is the reliable one.

Renaming or moving a deployed component updates the [rules](../Rules/index.md) and [collections](../Collections/index.md) that refer to it, and the home dashboard's `source:` bindings. Rule actions that name the component update only when it sits at the root of the Tag tree; otherwise update them by hand in the rules visual editor or in `rules.yaml`.
Only paths that refer to the moved component are updated, and an unrelated branch with the same name is left alone.
The same updates appear in `rules.yaml` and `collections.yaml` for anyone who edits those files directly.
Relative binds inside the moved component's own dashboard are unaffected.
Setting the **Tag tree path**, or the name, back to its earlier value applies the same update in reverse, so references that Profinity updated return to their original paths.
References you edited by hand after the move, and absolute binds in other components' dashboards, stay as they are.

Absolute binds in other components' dashboards are literal paths to the old location, so they are not updated.
This includes binds that use the `[TimeSeries]` and `[TimeSeries_Delta]` source prefixes as well as those that begin with a slash.
[Tag tree paths and dashboard binds](Tag_Tree_Path.md#absolute-and-relative-dashboard-binds) explains the two forms.
Before relocating a component that other dashboards reference by absolute path, search those dashboards for its old path and update any matching `source:` values by hand.

History recorded by the [TAG SQL Historian](../../Components/Historians/TAG_SQL_Historian.md) under the old path is not migrated, so a trend from it spanning the move shows a break at that point.
The InfluxDB historians and loggers and the Prometheus logger identify a tag by its component, message, and signal, not by its path.
Moving a component therefore keeps its existing history in them, because a tag's series is set by its component and its path within that component, not by its position in the tag tree.
Renaming a component does, in every historian and logger, because the component name is part of how history is identified.

Next, refer to [Tag collections](../Collections/index.md) to select the tags of a nested component.
