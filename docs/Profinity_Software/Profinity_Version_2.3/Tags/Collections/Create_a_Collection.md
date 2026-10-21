---
title: Create a collection
description: Create a group and a restricted collection of cell voltages in the collections editor, using a scope, a membership expression, and role-based security.
type: task
owner: Documentation
last_reviewed: 2026-10-15
---

# Create a collection

This procedure gives the engineers on Car 1 a collection of its cell voltages that nobody else can see.
Open the collections editor first, as described in [Tag collections](index.md#open-the-collections-editor), which lists the permissions it needs.
Choosing **Restricted** also needs the **Security administration** permission, as described under [Saving and security](index.md#saving-and-security).

1. Create a group called **Car 1** with the scope `Vehicles/Car1`.
2. Inside it, create a collection with the **Display name** **Cell voltages** and the scope `Battery`.
3. Set its expression to `tag.Meta.Type == "dbc.signal" && tag.MatchesName("*Voltage") && tag.HasValue`.
4. Set its security to **Restricted**, and allow the **Engineers** role.

To check it worked, open the collection picker in Tag Explorer.
The collection appears there under its display name, and it selects every cell voltage signal under `Vehicles/Car1/Battery`.

The editor generates the collection id itself (`Collection1`, `Collection2`, and so on).
The **Collection id** field is read-only, so the id is not taken from the name.
Rules refer to the collection by its id, not its display name.
The `cell_over_voltage` rule in [Complete rules.yaml example](../Rules/Rules_YAML_Example.md) uses the id shown in the editor.

You can also start a collection from the Tag Explorer context menu with **Create collection from tag(s)…**.
Refer to [Create collections, rules, and dashboard bindings from tags](../Create_Collections_Rules_and_Bindings_from_Tags.md) for the steps.
To start a rule, right-click a collection in the editor and choose **Create rule from collection…**.
