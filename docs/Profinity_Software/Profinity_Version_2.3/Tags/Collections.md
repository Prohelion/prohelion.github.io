---
title: Collections
description: "Group tags for filtering, dashboards, and rules using visual editor and membership expressions."
---

# Tag collections

**Collections** group tags for filtering, dashboards, and rules. Profinity 2.3 stamps collections YAML with **`version: "2.3"`**; each entry carries a plain `id` field so the visual editor can round-trip edits without losing identity.

<figure markdown>
![A collection defined by a membership expression and scope automatically matches tags in the tree, stays current as new matching tags appear, and is reused by dashboards, rules, and reports](../images/2.3-diagram-collections.png)
<figcaption>Groups defined by rules, not lists</figcaption>
</figure>

## Open the collections editor

Side menu → **TAG UTILITIES** → **COLLECTIONS**, which opens the collections editor as a window over the current page. The entry appears for users who hold **`TagView`** and **`TagCollectionsView`** while a profile is loaded.

<figure markdown>
![Collections visual editor with member list](../images/2.3-collections-visual-editor.png)
<figcaption>Collections visual editor</figcaption>
</figure>

Requires **`TagCollectionsView`** to view and **`TagCollectionsModify`** to save.

## Groups, scope and the editor layout

The editor shows the collections as a tree on one side and an inspector for the selected node on the other, and a `collections.yaml` document can also be edited as YAML with a schema. The `collections` list holds two kinds of node.

| Node | Fields | Purpose |
|------|--------|---------|
| Group | `group.id`, `displayName`, `scope`, `items` | Organises collections into a hierarchy, and passes its `scope` down to every collection beneath it |
| Collection | `collection.id`, `displayName`, `scope`, `expression`, `security` | Selects tags with a membership expression |

The `id` of a collection is immutable and is the value that rules use in their `scope.collection` references. A `scope` is either a path prefix string or an object with a `prefix`, and the inspector shows it as **Scope prefix** under **Binding** for a collection. A relative scope on a collection joins beneath the scope of its group, whereas an absolute scope replaces the inherited one. The inspector requires a display name and a non-empty expression before a collection can be saved, and a user who holds the security administration permission can also set a collection's `security` policy (`mode` of `All` or `Restricted`, with `allowedRoles`). The built-in **(All Tags)** collection with the id `All` is owned by the engine, is shown read-only in the tree and is never written to the file.

## Create collections from Tag Explorer

A collection can be started from the Tag Explorer context menu, as described in [Tag linking](Tag_Linking.md).

## Membership expression

Each collection filters candidate tags with a boolean expression over `tag`. The guided builder emits the published spellings; free text uses the same language.

Examples:

```text
tag.MatchesPath("Elmar Solar MPPT") && tag.MatchesName("OutputCurrent")
tag.Meta.Type == "dbc.signal" && tag.HasValue
tag.Value > 0
```

Full vocabulary (path matching, values, metadata, wildcards): [Tag expressions](./Tag_Expressions.md).

## API

Collections are managed via `/api/v2` tag collections controllers with JSON request and response bodies. Permissions follow `TagCollectionsView` / `TagCollectionsModify`.

## Related documentation

- [Tag expressions](./Tag_Expressions.md)
- [Tag layer](index.md)
- [Tag linking](Tag_Linking.md)
- [Alerts Log](./Alerts.md)
- [Derived tags](./Derived_Tags.md)
