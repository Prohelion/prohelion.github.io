---
title: Menu Component
description: "Menu structure used by the titlebar, panel and footer, with menu items, submenus, logos, toggles, actions and modals."
---

# Menu

A menu is a list of items that the titlebar, the panel and the footer accept in their `menu` parameter. Each entry in the list is an object that contains exactly one item type, which is one of `menuitem`, `submenu`, `logo`, `toggle`, `modal` or `action`.

**Best for:** Adding icon links, actions, switches and settings dialogs to the toolbar of a titlebar

**When not to use:** In a panel or footer, because the web interface does not display menu items there (see the table below)

**Where the web interface displays a menu:**

| Component | Behaviour |
|-----------|-----------|
| [Titlebar](Titlebar.md) | Each item is displayed as an icon in the toolbar at the right of the titlebar, without its caption |
| Side menu | Displays `menuitem`, `modal`, `logo` and `submenu` entries, and does not display `action` or `toggle` entries. A `submenu` is placed in the top or bottom zone of the side menu by its `location` |
| [Panel](Panel.md) | A static menu icon is displayed in the panel header, and the items are not displayed |
| [Footer](Footer.md) | Not used by the web interface |

**Menu Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Set as the `id` attribute of the menu element |
| `class` | string | No | `menu` | CSS class of the menu element |
| `items` | array | Yes | None | Array of menu entries, where each entry contains one item type |

**Item Types:**

| Item type | Purpose |
|-----------|---------|
| `menuitem` | Icon or caption that navigates to a location when clicked |
| `submenu` | Parent entry that contains further items and expands them when clicked |
| `logo` | Logo image that navigates to a location when clicked |
| `toggle` | Switch that runs an action when clicked. See [Toggles](../Interactive/Toggles.md) for the parameters |
| `modal` | Icon that opens a dialog when clicked. See [Modal](../Interactive/Modal.md) for the parameters |
| `action` | Button that runs an action when clicked. See [Actions](../Interactive/Actions.md) for the parameters, noting that the web interface displays a menu action as an icon, so `image` is the visible part of the item |

**Menu Item Parameters (`menuitem`):**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `label` | string | No | None | Visible caption of the entry. The titlebar displays icons without captions |
| `image` | string | No | None | Icon of the entry, given as a Carbon icon name or a legacy icon filename such as `nav_custom_active.svg` |
| `imageAlt` | string | No | None | Accessible label for the icon, used when the entry has no `label` |
| `navigate` | string | No | None | Path or address opened when the entry is clicked. A path that starts with `/` stays inside the web interface |
| `lamp` | object | No | None | Lamp displayed beside the caption. See [Lamp](../Data/Lamp.md) |
| `bind` | array | No | None | Not used by the web interface |

**Submenu Parameters (`submenu`):**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | `id` attribute applied when the submenu is displayed as a nested menu |
| `class` | string | No | None | CSS class applied when the submenu is displayed as a nested menu |
| `label` | string | No | None | Caption of the parent entry |
| `image` | string | No | None | Icon of the parent entry |
| `location` | string | No | None | Zone of the side menu that holds the submenu, one of `top`, `right`, `bottom` or `left`. The side menu typically uses `top` or `bottom` |
| `items` | array | Yes | None | Child entries, shown when the submenu is expanded |

**Logo Parameters (`logo`):**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `image` | string | Yes | None | Logo image or icon |
| `navigate` | string | Yes | None | Navigation target when the logo is clicked |

**Example:**

``` yaml
dashboard:
  items:
    - titlebar:
        menu:
          items:
            - menuitem:
                image: nav_custom_active.svg
                imageAlt: Messages and Signals
                navigate: dbc?view=messages&componentIdFilter=Prohelion+BMU
            - action:
                mode: icon
                image: Renew
                imageAlt: Refresh
                invoke: Component
                actionId: Refresh
            - modal:
                id: default
                image: dash_config.svg
                imageAlt: Change Settings
                settings:
                  update: true
                  reload: true
                  urlSettings: /api/v2/ActiveProfile/Component/Prohelion%20BMU/settings
```
