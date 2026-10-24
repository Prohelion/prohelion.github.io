---
title: Menu Layout
description: "Arrange the components and groups in the top section of the side menu, including group names, icons, and order, using the Menu Layout editor."
type: reference
owner: Documentation
last_reviewed: 2026-10-24
---

# Menu Layout

The top section of the side menu holds the components of the active profile, grouped by type.
The **Menu Layout** editor changes which group each component sits in, the order of groups and components, and the name and icon of each group.
Only this top section can be customised.
The bottom system section of the menu (CAN utilities, Tags, and Admin) is fixed and cannot be rearranged.
Its entries appear according to the user's permissions and in a fixed order.

## Opening the editor

Select **ADMIN** in the side menu and open the **Menu Layout** pill.
This opens the **Editing Menu Layout** window.
The pill is shown to a user with the **Modify profiles** permission while a profile is loaded, as described in [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md).
A [profile](./Profiles.md) uses the layout as soon as it is saved, so no setting needs to be switched on.

<figure markdown>
![Menu Layout editor showing the menu structure tree and the inspector for a group](../images/profile-menu-layout-editor.png)
<figcaption>Menu Layout Editor Showing a Group Selected</figcaption>
</figure>

## Arranging groups and components

The **Menu structure** list shows each group with its components beneath it.
Drag the handle beside a group or a component to move it.
You can drag a component into a different group or to a new position in the same group.
You can also drag a component out of its group to the top level of the menu, where it appears on its own and not inside any group.
A component at the top level stays there when you edit or rename it.

- The search box filters the list by group or component name.
- **NEW MENU GROUP** adds a custom group.
- **DELETE** removes the selected custom group.
- **RESET LOCATION** returns the selected component to the group it belongs to by default.

Selecting a group opens its settings in the **Inspector**.
**Name** sets the label shown in the menu.
The **Appearance** section sets the icon, either a standard icon or an image from the profile.
Groups take their icon from the component type unless one is set.
Selecting a component shows its name.

<figure markdown>
![Menu Layout editor with the Prohelion 12v component being dragged to a new position in the menu structure](../images/component-menu-placement.png)
<figcaption>Dragging a Component Into Another Group</figcaption>
</figure>

When the arrangement is right, select **SAVE** to apply it to the side menu.
**RELOAD** discards unsaved changes and reloads the saved layout.
**NEW FROM TEMPLATE** loads a template layout.
The **YAML** tab next to the **DESIGN** tab shows the same layout as text, for users who prefer to edit it directly.

## Groups that collect components by type

A group that came from a component type keeps collecting components of that type, even after you rename it or change its icon.
A group you add with **NEW MENU GROUP** is a custom group and only holds what you put in it.
When a component has no place in the saved layout, it appears in the group for its type.
If no group for that type exists, Profinity shows a temporary group for it after your own groups.
The temporary group becomes a real group the next time you save.

## When components change

Editing a component never moves it in the menu.
Renaming a component never moves it either, because the menu refers to the component and not to its name.
A component you add to the profile appears in the menu without any change to the layout.
When you delete a component, it is removed from the layout in the same save.
Any group it was in stays, even if it is now empty, because you may have created it on purpose.
Loading a profile never changes the layout or the profile file.

## When a saved layout cannot be used

If the saved layout is not valid, Profinity ignores the whole layout and shows every component in its default group.
A layout can be invalid when it was written by hand and contains a mistake, or when it uses an older format.
Profinity writes one message to the log that names the problem.
The profile file is not changed, and the ignored layout is kept as it is until you save a new one.
The **Menu Layout** editor shows a notice with the reasons.
Saving from the editor replaces the ignored layout.

