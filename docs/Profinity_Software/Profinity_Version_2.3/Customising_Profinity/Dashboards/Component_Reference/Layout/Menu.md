---
title: Menu Component
description: "Menu structure used by the titlebar and side menu, with menu items, submenus, logos, toggles, dialogs and actions."
---

# Menu

A menu is a list of items that the [titlebar](Titlebar.md) and the side menu display, where each entry is an object that contains exactly one item type: `menuitem`, `submenu`, `logo`, `toggle`, `modal` or `action`.

## When to Use

Use a menu to add icon links, actions, switches and dialog buttons to the toolbar of a titlebar, and to define the entries of the side menu. Do not use a menu in a panel or a footer, because the web interface does not display menu items there.

## Where Menus Appear

| Component | Behaviour |
|-----------|-----------|
| [Titlebar](Titlebar.md) | Each item is displayed as an icon in the toolbar at the right of the titlebar, without its caption |
| Side menu | Displays `menuitem`, `modal`, `logo` and `submenu` entries, and does not display `action` or `toggle` entries. A `submenu` is placed in the top or bottom zone of the side menu by its `location` |
| [Panel](Panel.md) | A static menu icon is displayed in the panel header, and the items are not displayed |
| [Footer](Footer.md) | The footer bar is displayed empty, because the web interface does not display menu items there |

## Parameters

### Menu Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Set as the `id` attribute of the menu element |
| `class` | string | No | `menu` | CSS class of the menu element |
| `items` | array | Yes | None | Array of menu entries, where each entry contains one item type |

### Item Types

| Item type | Purpose |
|-----------|---------|
| `menuitem` | Icon or caption that navigates to a location when clicked |
| `submenu` | Parent entry that contains further items and expands them when clicked |
| `logo` | Logo image that navigates to a location when clicked |
| `toggle` | Switch that runs an action when clicked. See [Toggles](../Interactive/Toggles.md) for the parameters |
| `modal` | Icon that opens a dialog when clicked, such as a settings dialog or an editor. See [Modal Parameters](#modal-parameters) |
| `action` | Button that runs an action when clicked. See [Actions](../Interactive/Actions.md) for the parameters, noting that a menu action is displayed as an icon, so `image` is the visible part of the item |

### Menu Item Parameters (`menuitem`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `label` | string | No | None | Visible caption of the entry. The titlebar displays icons without captions |
| `image` | string | No | None | Icon of the entry, given as an icon name or an icon filename such as `nav_custom_active.svg` |
| `imageAlt` | string | No | None | Accessible label for the icon, used when the entry has no `label` |
| `navigate` | string | No | None | Path or address opened when the entry is clicked. A path that starts with `/` stays inside the web interface |
| `lamp` | object | No | None | Lamp displayed beside the caption or icon. See [Lamp](../Data/Lamp.md) |
| `bind` | array | No | None | Not used by the web interface |

### Submenu Parameters (`submenu`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | `id` attribute applied when the submenu is displayed as a nested menu |
| `class` | string | No | None | CSS class applied when the submenu is displayed as a nested menu |
| `label` | string | No | None | Caption of the parent entry |
| `image` | string | No | None | Icon of the parent entry |
| `location` | string | No | None | Zone of the side menu that holds the submenu, `top` or `bottom`. The values `right` and `left` are accepted, and the side menu does not use them |
| `items` | array | Yes | None | Child entries, shown when the submenu is expanded |

### Logo Parameters (`logo`)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `image` | string | Yes | None | Logo image or icon |
| `navigate` | string | Yes | None | Navigation target when the logo is clicked |

### Modal Parameters

A `modal` item opens a dialog window when it is clicked. The item takes the common parameters in the first table and exactly one dialog parameter from the second table.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | Conditional | None | Identifier of the dialog window, for example `default`. Required for the item to work, because an item without an `id` does nothing when it is clicked |
| `label` | string | No | None | Visible caption of the entry. The titlebar displays icons without captions |
| `image` | string | No | None | Icon of the entry, given as an icon name or an icon filename such as `dash_config.svg` |
| `imageAlt` | string | Yes | None | Accessible label for the icon |

| Dialog parameter | Opens |
|------------------|-------|
| `settings` | A settings dialog for a component. See [Opening a Settings Dialog](#opening-a-settings-dialog) |
| `editor` | A file editor dialog. See [Opening an Editor Dialog](#opening-an-editor-dialog) |
| `changePassword` | The Change Password dialog. Set the parameter to an empty object, `changePassword: {}` |
| `twoFactorAuthentication` | The Two-Factor Authentication dialog. Set the parameter to an empty object, `twoFactorAuthentication: {}` |
| `aiChat` | The Profinity AI chat. Set the parameter to an empty object, `aiChat: {}` |

#### Opening a Settings Dialog

A `settings` payload opens the settings dialog of a component, which loads the settings from the address in `urlSettings`. The payload chooses which footer buttons the dialog offers and what happens when the dialog closes.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `urlSettings` | string | Yes | None | Address that the dialog loads the settings from and saves them to, for example `/api/v2/ActiveProfile/Component/Prohelion%20BMU/settings` |
| `urlDelete` | string | No | None | Address that the **Delete** button sends the delete request to |
| `create` | boolean | No | None | When `true`, the dialog shows the **Add** button |
| `update` | boolean | No | None | When `true`, the dialog shows the **Save** button |
| `delete` | boolean | No | None | When `true`, the dialog shows the **Delete** button |
| `send` | boolean | No | None | When `true`, the dialog shows the **Send** button |
| `reload` | boolean | No | None | When `true`, the dialog shows the **Reload** button |
| `refreshOnClose` | boolean | No | None | When `true`, the dashboard refreshes when the dialog closes |
| `navigateOnClose` | string | No | None | Location that the web interface navigates to when the dialog closes |
| `restartingOnSuccess` | boolean | No | None | When `true`, the restart sequence starts after a successful save |
| `class` | string | No | None | CSS class added to the dialog |
| `id` | string | No | None | Not used by the web interface |
| `showTabs` | boolean | No | None | Not used by the web interface. The dialog always shows its tabs |

#### Opening an Editor Dialog

An `editor` payload opens a file in the code editor dialog.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `filename` | string | Yes | None | File that the editor opens and saves |
| `filetype` | string | Yes | None | Kind of file that the editor edits and uploads |
| `language` | string | Yes | None | Language that the editor uses for syntax highlighting |
| `template` | string | No | None | YAML that the editor loads when the file cannot be loaded or when the operator resets the file |
| `schema` | string | No | None | YAML or JSON schema that the editor uses for validation and autocompletion |
| `delete` | boolean | No | None | When `true`, shows the **Delete** button for a dashboard file |

## Example

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
                  navigateOnClose: /
                  urlSettings: /api/v2/ActiveProfile/Component/Prohelion%20BMU/settings
```
