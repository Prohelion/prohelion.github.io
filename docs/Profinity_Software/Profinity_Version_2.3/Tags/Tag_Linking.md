---
title: Tag Linking
description: "Tag Explorer context menu flows to quickly create collections, rules, and dashboard bindings."
---

# Tag Linking from Tag Explorer

The Tag Explorer context menu in Profinity 2.3 creates [collections](./Collections.md), [rules](./Actions.md) and [dashboard](../Customising_Profinity/Dashboards/index.md) bindings from selected tags, so the selection does not need to be copied into the visual editors by hand.

## Prerequisites

Tag Explorer itself requires the **View tags** permission. Each context menu action then checks its own permission, and an action whose permission is missing is shown disabled, while the whole menu is hidden from a user who holds none of these permissions.

The permission for each action is listed under [Menu Actions](#menu-actions).

## Open the Context Menu

Open **TAG EXPLORER** from the side menu and right-click a leaf tag or a branch to open the context menu. Several leaf tags and branches can be selected together, and the table below shows which actions each kind of selection allows.

<figure markdown>
![Tag Explorer context menu on a leaf tag](../images/2.3-tag-explorer-context-menu.png)
<figcaption>Tag Explorer context menu</figcaption>
</figure>

## Menu Actions

| Action | Scope | Permission |
|--------|-------|------------|
| **Add tag(s) to dashboard…** | Leaf tags only | **Modify dashboards** |
| **Create collection from tag(s)…** | Branch, leaf, or root | **Modify tag collections** |
| **Create rule from tag(s)…** | Selected tags | **Modify tag rules** |
| **Rules on this Tag** | Selected tags | **View tag rules** |
| **Rules impacted by this tag** | Selected tags | **View tag rules** |

Selecting **Add tag(s) to dashboard…** opens a dashboard picker and creates a binding draft, and completing the bind still requires the dashboard editor. Selecting **Create collection from tag(s)…** opens a submenu for the primary filter (**Branch**, **Meta type**, **Unit**, **Value** or **Quality**), then an insert-location picker, and then the collections visual editor with a draft collection. Selecting **Create rule from tag(s)…** opens an insert-location picker and then the rules visual editor with a draft rule. **Rules on this Tag** lists the rules that reference the selection and opens the rules editor on the chosen rule source, **Rules impacted by this tag** lists the rules affected by the selection and opens the rules editor with that rule selected, and both show a disabled **No matching rules** entry when nothing matches.

Rules can also be started from two other places: right-clicking a dashboard element that is bound to tags offers **Create rule from this element…**, and right-clicking a collection in the collections editor offers **Create rule from collection…**.

After choosing an action, complete the configuration in the visual editor and save it.

The create-collection and create-rule flows generate the expressions automatically. A selection of leaf tags becomes a set of `tag.Is("…")` matches, a single selected branch becomes a scope prefix with the expression `tag.HasValue`, and several selected branches become `tag.MatchesPath("…")` matches joined with `||` and combined with `tag.HasValue`. For collections, a primary filter other than **Branch** replaces this with an expression built from the selected tags' metadata type, unit, value or quality. See [Tag expressions](Tag_Expressions.md).

## Related Documentation

- [Tag layer](index.md)
- [Tag expressions](Tag_Expressions.md)
- [Collections](Collections.md)
- [Rule actions and scripts](Actions.md)
- [Dashboard visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md)
