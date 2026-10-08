---
title: Titlebar Component
description: "Header bar of a dashboard with a status lamp and a toolbar of menu items for identification, navigation, actions and dialogs."
---

# Titlebar

The titlebar is the header bar of a dashboard, with a status lamp and a toolbar of menu items that provide dashboard identification, status information, navigation, component-specific actions and settings dialogs.

<figure markdown>
![Dashboard titlebar component showing a status lamp and a menu toolbar](../../images/titlebar.png)
<figcaption>Dashboard titlebar component showing a status lamp and a menu toolbar</figcaption>
</figure>

## When to Use

Use the titlebar for dashboard identification, a status indicator, navigation links, component-specific actions and settings dialogs. The `menu` of a titlebar can hold every [menu item type](Menu.md#item-types), including the `modal` item that opens a dialog.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | CSS class added to the titlebar element |
| `lamp` | object | No | None | Status lamp shown in the left group of the titlebar. See [Lamp](../Data/Lamp.md) |
| `menu` | object | No | None | Menu whose items are shown as icons in the toolbar at the right of the titlebar. See [Menu](Menu.md) |
| `showTitlebar` | boolean | No | `true` | When `false`, the titlebar background, the hamburger menu button and the lamp are hidden, and the toolbar remains visible on a transparent background |
| `showActions` | boolean | No | `true` | When `false`, the toolbar of menu items is hidden |

When both `showTitlebar` and `showActions` are `false`, the titlebar is not displayed and takes no space.

## Notes

### Menu Items in the Titlebar

The titlebar displays every item of its `menu` as an icon, without the item caption, and each item type behaves as follows:

| Item type | Behaviour in the titlebar |
|-----------|---------------------------|
| `menuitem` | Icon link that navigates to the `navigate` target when clicked. A `lamp` on the item is displayed beside the icon |
| `action` | Icon button that runs the action when clicked |
| `toggle` | Switch that runs the action when clicked |
| `modal` | Icon that opens a dialog when clicked: a settings dialog, an editor, the Change Password dialog, the Two-Factor Authentication dialog or the Profinity AI chat. See [Modal Parameters](Menu.md#modal-parameters) |
| `logo` | Displayed in the same way as a `menuitem`, as an icon link to the `navigate` target |
| `submenu` | Icon that expands its child `items` inline in the toolbar when clicked. The `location` parameter is not used |

A titlebar menu usually contains `menuitem`, `action`, `toggle` and `modal` items. The `logo` and `submenu` types suit the side menu, which displays `menuitem`, `modal`, `logo` and `submenu` entries and does not display `action` or `toggle` entries.

## Example

``` yaml
dashboard:
  items:
    - titlebar:
        lamp:
          color: grey
          value: 1
          label: Prohelion BMU
          enabled: true
          bind:
            - target: color
              source: /Prohelion BMU/Properties/StatusColourText
              toType: string
        menu:
          items:
            - menuitem:
                image: nav_custom_active.svg
                imageAlt: Messages and Signals
                navigate: dbc?view=messages&componentIdFilter=Prohelion+BMU
            - modal:
                id: default
                image: dash_config.svg
                imageAlt: Change Settings
                settings:
                  update: true
                  reload: true
                  urlSettings: /api/v2/ActiveProfile/Component/Prohelion%20BMU/settings
```
