---
title: Collections
description: "Group tags for filtering, dashboards, and rules using the visual editor and membership expressions."
---

# Tag Collections

**Collections** group tags for filtering, [dashboards](../Customising_Profinity/Dashboards/index.md), and [rules](./Rules.md). You build and manage them in the visual editor.

<figure markdown>
![A collection defined by a membership expression and scope automatically matches tags in the tree, stays current as new matching tags appear, and is reused by dashboards, rules, and reports](../images/2.3-diagram-collections.png)
<figcaption>A collection matching tags in the tree by membership expression and scope</figcaption>
</figure>

## Open the Collections Editor

Select **COLLECTIONS** under **TAG UTILITIES** in the side menu, which opens the collections editor as a window over the current page. The entry appears for users who hold the **View tags** and **View tag collections** permissions while a profile is loaded, and saving needs the **Modify tag collections** permission.

<figure markdown>
![Collections visual editor with member list](../images/2.3-collections-visual-editor.png)
<figcaption>Collections visual editor</figcaption>
</figure>

## Groups and Collections

The editor shows your collections as a tree on one side and the settings of the selected item on the other. The tree holds two kinds of item.

| Item | Purpose |
|------|---------|
| Group | Organises collections into a hierarchy, and passes its scope down to every collection inside it |
| Collection | Selects tags with a [membership expression](#membership-expression) |

### Names and Scope

Give each collection a display name, which you can change at any time. Rules refer to a collection by its identifier, which stays the same when you rename it, so rules keep working after a rename.

The **Scope prefix**, shown under **Binding**, limits a collection to the tags beneath a path in the tag tree. A scope on a collection is added to the scope of its group, so a group scoped to `Vehicles/Car1` and a collection scoped to `Battery` together cover `Vehicles/Car1/Battery`. To ignore the group's scope, start the collection's scope with `/`.

### Saving and Security

A collection needs a display name and an expression before it can be saved. A user who holds the **Security administration** permission can also limit who sees a collection, by choosing **Restricted** and listing the roles that are allowed to use it. The built-in **(All Tags)** collection is read-only.

## A Worked Collections Example

To give the engineers on Car 1 a collection of its cell voltages that nobody else can see:

1. Create a group called **Car 1** with the scope `Vehicles/Car1`.
2. Inside it, create a collection called **Cell voltages** with the scope `Battery`.
3. Set its expression to `tag.Meta.Type == "dbc.signal" && tag.MatchesName("*Voltage") && tag.HasValue`.
4. Set its security to **Restricted**, and allow the **Engineers** role.

The collection now selects every cell voltage signal under `Vehicles/Car1/Battery`. A rule can use it, as in the `cell_over_voltage` rule in [A Complete rules.yaml Example](./Rules.md#a-complete-rulesyaml-example).

## Create Collections from Tag Explorer

A collection can be started from the Tag Explorer context menu with **Create collection from tag(s)…**, as described in [Tag linking](./Tag_Linking.md), and a rule can be started by right-clicking a collection in the editor and choosing **Create rule from collection…**.

## Membership Expression

Each collection filters candidate tags with a boolean expression over `tag`. The guided builder emits the published spellings, and free text uses the same language.

Examples:

```text
tag.MatchesPath("Elmar Solar MPPT") && tag.MatchesName("OutputCurrent")
tag.Meta.Type == "dbc.signal" && tag.HasValue
tag.Value > 0
```

The full expression vocabulary, covering path matching, values, metadata and wildcards, is described in [Tag expressions](./Tag_Expressions.md).

## Related Documentation

- [Tag expressions](./Tag_Expressions.md)
- [Tag layer](index.md)
- [Tag linking](./Tag_Linking.md)
- [Alerts Log](./Alerts.md)
- [Derived tags](./Derived_Tags.md)
- [Endpoint reference](../Integrating_to_Profinity/APIs/Endpoint_Reference.md#collections-and-derived-tags), for integrators
