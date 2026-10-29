---
title: Restrict a component or collection
description: "Limit which roles can see a profile component or a tag collection by setting its Security mode and Allowed roles."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Restrict a component or collection

Restrict a profile component or a tag collection so that only users holding certain roles can see it.
You need the **Security administration** permission, and the roles you want to allow must already exist.
Any other user, including one with **Modify components**, does not see the **Security** tab or panel at all.
[Component and collection security](./index.md) explains what a restriction hides, who bypasses it, and what **Mode** and **Allowed roles** mean.
To create a role first, refer to [Create a role](../Create_a_Role.md).

## Restrict a component

To restrict a component:

1. Open the component's settings dialog from the profile menu or the component list.
2. Select the **Security** tab, which sits beside **Settings** and **Firmware** (when present).
3. Set **Mode** to **Restricted**.
4. Add one or more roles to **Allowed roles**.
5. Save the tab.

The component is now visible only to users who hold one of the allowed roles, plus the users described in [Who bypasses a restriction](./index.md#who-bypasses-a-restriction).
To check, sign in as a user without an allowed role and confirm the component no longer appears.
Setting **Mode** back to **All** removes the restriction.

<figure markdown>
![The Security tab of a component settings dialog, with the Mode dropdown and the Allowed roles list](../../../images/component-security-tab.png)
<figcaption>Security tab on a component settings dialog</figcaption>
</figure>

## Restrict a collection

To restrict a collection:

1. Open the **Collections** editor.
2. Select the collection in the tree.
3. Open the **Security** panel in the inspector.
4. Set **Mode** to **Restricted**.
5. Add one or more roles to **Allowed roles**.

The panel is the same for the built-in **(All Tags)** collection and for every custom collection.
Changes save with the rest of the collection's settings.

<figure markdown>
![The Security panel in the Collections editor inspector, with the Mode dropdown and the Allowed roles list](../../../images/collection-security-panel.png)
<figcaption>Security panel on a collection in the Collections editor</figcaption>
</figure>
