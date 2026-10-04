---
title: Modal Component
description: "Menu entry that opens a dialog for component settings, a file editor, a password change, two-factor authentication or the Profinity AI chat."
---

# Modal

A modal is a menu entry that opens a dialog when it is clicked. A modal is placed in the `menu` of a [Titlebar](../Layout/Titlebar.md), as an item beside `menuitem` and `action` entries, and it is also the `modal` of a pill menu item. A modal contains exactly one dialog definition, which is one of `settings`, `editor`, `changePassword`, `twoFactorAuthentication` or `aiChat`.

**Best for:** A settings dialog for a component, an editor for a profile file, and self-service dialogs for the signed-in user

**When not to use:** To show content inside the dashboard (use a [Panel](../Layout/Panel.md))

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Identifier of the modal context, used to open the dialog |
| `label` | string | No | None | Caption shown beside the icon of the menu entry. The titlebar displays icons without captions |
| `image` | string | No | None | Icon of the menu entry, given as a Carbon icon name or a legacy icon filename such as `dash_config.svg` |
| `imageAlt` | string | Yes | None | Accessible name of the icon |
| `settings` | object | Conditional | None | Opens a settings dialog. See [Settings Parameters](#settings-parameters) |
| `editor` | object | Conditional | None | Opens a file editor dialog. See [Editor Parameters](#editor-parameters) |
| `changePassword` | object | Conditional | None | Opens the change password dialog. The object accepts `id` and `class`, which are not used by the web interface |
| `twoFactorAuthentication` | object | Conditional | None | Opens the two-factor authentication dialog. The object accepts `id` and `class`, which are not used by the web interface |
| `aiChat` | object | Conditional | None | Opens the Profinity AI chat dialog. The object accepts an `id` and a `class` |

Exactly one of `settings`, `editor`, `changePassword`, `twoFactorAuthentication` and `aiChat` is required.

## Settings Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | CSS class added to the root of the settings dialog |
| `urlSettings` | string | Yes | None | Settings API address that the dialog reads and saves |
| `urlDelete` | string | No | None | Address that the delete button of the dialog calls to delete the component |
| `create` | boolean | No | None | Shows the Add button in the footer of the dialog |
| `update` | boolean | No | None | Shows the Save button in the footer of the dialog |
| `delete` | boolean | No | None | Shows the Delete button in the footer of the dialog |
| `send` | boolean | No | None | Shows the Send button in the footer of the dialog |
| `reload` | boolean | No | None | Shows the Reload button in the footer of the dialog |
| `showTabs` | boolean | No | None | Not used by the web interface, because the tabs of the dialog are always shown |
| `refreshOnClose` | boolean | No | None | Refreshes the dashboard when the dialog closes |
| `navigateOnClose` | string | No | None | Location that the web interface navigates to when the dialog closes |
| `restartingOnSuccess` | boolean | No | None | Starts the restart wait flow after a successful save |

## Editor Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `filename` | string | Yes | None | Name of the file to edit, which also forms the path of the download and upload API |
| `filetype` | string | Yes | None | Kind of file, which selects the editor and the upload type |
| `language` | string | Yes | None | Language mode of the code editor |
| `contents` | string | No | None | Not used by the web interface, because the content is loaded from the API or the template |
| `template` | string | No | None | Content used when the file fails to load, or when the user resets the file |
| `schema` | string | No | None | Schema passed to the code editor for validation and auto-completion |
| `componentName` | string | No | None | Component whose dashboard API path is used to load and save the file |
| `delete` | boolean | No | None | Shows a delete button when the file is a dashboard |
| `loadMessage` | string | No | None | HTML message shown once in an information dialog after the file first loads |
| `nearFullscreen` | boolean | No | None | Displays the editor with small margins, near full screen |
| `rulesHub` | boolean | No | None | Opens the rules visual editor in a mode that combines rules from several sources |
| `componentIdFilter` | string | No | None | Restricts the sources of the rules editor to one component |

**Example:**

``` yaml
dashboard:
  items:
    - titlebar:
        menu:
          items:
            - modal:
                id: default
                image: dash_config.svg
                imageAlt: Change Settings
                settings:
                  create: false
                  update: true
                  delete: true
                  send: false
                  reload: true
                  refreshOnClose: false
                  navigateOnClose: /
                  urlSettings: /api/v2/ActiveProfile/Component/Prohelion%20BMU/settings
                  urlDelete: /api/v2/ActiveProfile/Component/Prohelion%20BMU
```
