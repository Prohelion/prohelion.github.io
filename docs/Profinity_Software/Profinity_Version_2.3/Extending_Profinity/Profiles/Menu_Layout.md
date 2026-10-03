---
title: Menu Layout
description: "Customize profile and component menu placement using drag-and-drop layout editor."
---

# Profile and component menu layout

Profinity 2.3 lets engineers customise the **top section** of the side menu — which components appear and in what order. The bottom system section (CAN utilities, Tags, Admin) remains **system-defined**.

## Profile menu layout

1. Open **Admin** → **Profiles**.
2. Edit a profile.
3. Open the **Menu Layout** tab.
4. Drag to reorder menu groups and assign components.

<figure markdown>
![Profile menu layout editor with drag list](../../../../assets/images/2.3/2.3-profile-menu-layout-editor.png)
<figcaption>Profile menu layout editor (screenshot placeholder — provide SS-38)</figcaption>
</figure>

Requires **`ProfileModify`**.

The **custom menu** is always enabled for profiles that use the layout editor — there is no separate "enable custom menu" toggle in 2.3.

## Per-component placement

Each component can override placement using the same drag/reorder editor as the profile **Menu Layout** tab (both tabs share the underlying `MenuLayoutManager` component):

1. Open the component **Settings**.
2. Open the **Menu** tab.
3. Drag to reorder menu groups and assign the component's placement within the menu tree.

<figure markdown>
![Component menu placement editor with drag list](../../../../assets/images/2.3/2.3-component-menu-placement.png)
<figcaption>Component menu placement editor (screenshot placeholder — provide SS-39)</figcaption>
</figure>

## Limitations

- Only the **top** menu section is customisable.
- Bottom entries (CAN, Tag utilities, Admin hub) follow permission gates and fixed ordering.

## Related documentation

- [Profiles](../../Administration/Profiles.md)
- [RBAC and permissions](../../Administration/Security/RBAC_Permissions.md)
- Engineering [A4 Profile Menu Layout](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A4-Profile-Menu-Layout.md)
