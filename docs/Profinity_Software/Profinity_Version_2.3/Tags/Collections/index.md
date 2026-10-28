---
title: Tag collections
description: "Group tags for filtering, dashboards, and rules using the visual editor and membership expressions."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Tag collections

*Collections* group tags for filtering, [dashboards](../../Customising_Profinity/Dashboards/index.md), and [rules](../Rules/index.md).
You build and manage them in the visual editor, and [Create a collection](Create_a_Collection.md) walks through an example.

<figure markdown>
![A collection defined by a membership expression and scope automatically matches tags in the tree, stays current as new matching tags appear, and is reused by dashboards, rules, and reports](../../images/diagram-collections.png)
<figcaption>A collection matching tags in the tree by membership expression and scope</figcaption>
</figure>

## Open the collections editor

Select **COLLECTIONS** under **TAG UTILITIES** in the side menu.
The collections editor opens as a window over the current page.
The entry appears for users who hold the **View tags** and **View tag collections** permissions while a profile is loaded.
Saving needs the **Modify tag collections** permission.

<figure markdown>
![The Editing Collections dialog in Design view, with a collection named "Tag has a value greater than 0" selected and an Inspector showing its expression builder.](../../images/collections-visual-editor.png)
<figcaption>Collections visual editor</figcaption>
</figure>

## Groups and collections

The editor shows your collections as a tree, with the settings of the selected item beside it.
A group organises collections into a hierarchy and passes its scope down to every collection inside it.
A collection selects tags with a [membership expression](#membership-expression).

### Names and scope

Give each collection a display name, which you can change at any time.
Rules refer to a collection by its identifier, which stays the same when you rename it, so rules keep working after a rename.
The YAML is `collections.yaml` by default, in the `collections` folder of the profile directory, which is inside the [artefacts directory](../../Installation/Artifacts_Directory.md#default-locations), and Profinity reloads it when it changes.
Do not change an `id` in the YAML.
Profinity treats a changed `id` as a different collection, and rules that use the old `id` stop resolving.

The **Scope prefix**, shown under **Binding**, limits a collection to the tags beneath a path in the tag tree.
A scope on a collection is added to the scope of its group.
For example, a group scoped to `Vehicles/Car1` and a collection scoped to `Battery` together cover `Vehicles/Car1/Battery`.
To ignore the group's scope, start the collection's scope with `/`.

### Saving and security

A collection needs a display name and an expression before it can be saved.
A user who holds the **Security administration** permission can also limit who sees a collection, by choosing **Restricted** and listing the roles that are allowed to use it.
The built-in **(All Tags)** collection is read-only.

## Membership expression

Each collection filters candidate tags with a boolean expression over `tag`.
The guided builder, a form that assembles the expression for you, emits the published spellings.
Free text uses the same language.

Examples:

```text
tag.MatchesPath("Elmar Solar MPPT") && tag.MatchesName("OutputCurrent")
tag.Meta.Type == "dbc.signal" && tag.HasValue
tag.Value > 0
```

`tag.HasValue` is true for a stale tag as well as a good one.
To keep only tags with a current value, use `tag.HasValue && !tag.IsStale`.
A logger or publisher re-checks which tags match its collection once per interval, so a filter on staleness is approximate by up to one interval.

[Tag expressions](../Selecting_Tags/Tag_Expressions.md) describes the full expression vocabulary, covering path matching, values, metadata, and wildcards.
For the rest of the tag layer, refer to [Tag layer](../index.md), [Alerts Log](../Alerts.md), and [Derived tags](../Derived_Tags/index.md).
Integrators can use the [Endpoint reference](../../Integrating_to_Profinity/APIs/Endpoint_Reference.md#collections-and-derived-tags).
