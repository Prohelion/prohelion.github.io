---
title: Build an expression with the guided builder
description: Use the guided builder in the collections and rules editors to assemble a tag expression from a form, preview the matching tags, and check that it is valid.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Build an expression with the guided builder

The guided builder assembles a [tag expression](Tag_Expressions.md) from a form, so you do not need to type the syntax.
This procedure builds a condition in the expression panel of a collection or a rule, with the collection or rule open in its visual editor.
Derived tag formulas are written as free text, because the builder cannot express them.

1. Expand the expression panel, which is titled **Expression** by default.
2. In the first row, select a facet from **Condition facet**. The row shows the fields for that facet. Refer to [Tag expressions](Tag_Expressions.md#guided-builder-facets) for what each facet writes.
3. Enter the values for the facet, such as an operator and a number for **Numeric value**.
4. To add a condition, select **Add**. The new row is joined to the previous row with **AND**.
5. Optional: To join a row with **OR**, change **Join with previous condition** on that row.
6. Optional: To remove a condition, select the bin button at the end of its row.
7. Optional: Select **Preview** to list the tags that match. The button changes to **Hide**, which closes the list.

The **Expression** field shows the expression that the rows produce, with a check mark beside it when the expression is valid.
A warning icon means the expression is not valid, and pointing at it shows the reason.
Save the collection or rule in the editor to keep the expression.

## When the builder cannot show an expression

When an expression uses syntax that the builder cannot represent, the panel shows "This expression cannot be shown in the guided builder, so it can only be edited as text", and **Add** is unavailable.
Edit the **Expression** field directly in that case.
The same applies when the condition needs a path by name, an exact path, a numeric metadata field, or a complex `&&` / `||` combination.

For the members you can type, refer to [Tag expressions](Tag_Expressions.md).
To put the expression to use, refer to [Create a collection](../Collections/Create_a_Collection.md) or [Create a rule](../Rules/Create_a_Rule.md).
