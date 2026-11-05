---
title: Selecting tags
description: Find the pages on tag tree paths, nesting a component in the tree, and the expression language that collections, rules, and derived tags use to pick tags.
type: index
owner: Documentation
last_reviewed: 2026-10-20
---

# Selecting tags

Collections, rules, dashboards, and derived tags all pick their tags by path, so where a component sits in the tag tree decides how its tags are selected.
The **Tag tree path** setting places a component in the tree, and tag expressions such as `tag.MatchesPath("Vehicles/Car1")` select tags by that path, value, or quality.

- [Tag tree paths and dashboard binds](Tag_Tree_Path.md): how nesting a component in a folder of the tag tree affects scopes and dashboard binds.
- [Nest a component in the tag tree](Nest_a_Component_in_the_Tag_Tree.md): set the **Tag tree path** of a component, and change it safely on a deployed component.
- [Tag expressions](Tag_Expressions.md): look up the expression language shared by collections, rules, and derived tags.
- [Build an expression with the guided builder](Build_an_Expression.md): assemble a tag expression from a form in the collections and rules editors.

To put a selection to use, refer to [Collections](../Collections/index.md) and [Tag rules](../Rules/index.md).
