---
title: Tag Linking
description: "Tag Explorer context menu flows to quickly create collections, rules, and dashboard bindings."
---

# Tag linking from Tag Explorer

Profinity 2.3 ships **Tag Explorer context menu** flows to create collections, rules, and dashboard bindings from selected tags, which reduces copying and pasting between Tag Explorer and the visual editors.

!!! note "Partial GA (A7)"
    **Shipped in 2.3:** context menu actions from Tag Explorer. **Not shipped:** reciprocal editors (for example adding a rule from the collections editor via context menu only), where-used panels, and collection↔rule cross-links from every editor surface.

## Prerequisites

- **`TagCollectionsModify`** for collection and some create flows.
- **`TagView`** for Tag Explorer.
- **`DashboardModify`** when adding tags to dashboards.

Use an account such as **demo.engineer** with the Engineer role template for authoring screenshots.

## Open the context menu

1. Open **TAG EXPLORER** (`/tags`).
2. Right-click a **leaf tag** or branch as appropriate.

<figure markdown>
![Tag Explorer context menu on a leaf tag](../../../../assets/images/2.3/2.3-tag-explorer-context-menu.png)
<figcaption>Tag Explorer context menu (screenshot placeholder — provide SS-41)</figcaption>
</figure>

## Shipped menu actions

| Action | Scope | Status | Result |
|--------|-------|--------|--------|
| **Add tag(s) to dashboard…** | Leaf tags only | Partial | Opens a dashboard picker and creates a binding draft; completing the bind still requires the dashboard editor |
| **Create collection from tag(s)…** | Branch, leaf, or root (submenu) | Complete | Opens collections visual editor with draft members |
| **Create rule from tag(s)…** | Selected tags | Complete | Opens rules visual editor with draft rule |

After choosing an action, complete configuration in the visual editor and **save**.

The create-collection and create-rule flows generate the membership and condition expressions automatically: leaf picks become `tag.Is("…")`, and branch picks become `tag.MatchesPath("…")`. See [Tag expressions](../Rules/Tag_Expressions.md).

## What is not available in 2.3 GA

The following are not available:

- Reciprocal "add to collection" from rules editor context menus only.
- Full where-used navigation across all tag consumers.
- Tag relay federation workflows (see [Tag layer](../Tag_Layer/index.md)).

## Related documentation

- [Tag layer](../Tag_Layer/index.md)
- [Tag expressions](../Rules/Tag_Expressions.md)
- [Collections](../Rules/Collections.md)
- [Rule actions and scripts](../Rules/Rule_Actions_And_Scripts.md)
- [Dashboard visual editor](../Dashboards/Visual_Editor.md)
