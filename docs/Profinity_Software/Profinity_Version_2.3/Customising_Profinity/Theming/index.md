---
title: Themes and branding
description: "Apply your own colours, logos, and application title to the Profinity web client with a theme.yaml file in the themes folder."
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Themes and branding

Profinity 2.3 applies theme and branding settings from a `theme.yaml` file in the `themes` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), and the web client shows the colours, logos, and application title from that file in place of the defaults.

!!! warning "Themes need a commercial licence"
    Themes and branding are included in the Desktop licence and above.
    Contact Prohelion about white-label rights before you ship Profinity under your own brand, for example as an original equipment manufacturer (OEM).
    An unlicensed instance keeps its `theme.yaml` file but shows the default Profinity appearance.
    Contact Prohelion about licensing before you apply a custom theme.

## Where the theme is defined

The theme is a file-based setting, so there is no administration screen for it.
Edit `themes/theme.yaml` on the Profinity host, and put logos and icons in the `assets` sub-folder.
Profinity applies the file when it starts and again whenever the file changes.
A missing file leaves the built-in defaults in place, and a file with errors is reported in the [Profinity log](../../Administration/Logs_Config.md) and also falls back to the defaults.
The file holds a `version` plus three optional groups.

| Group | Keys | What they set |
|-------|------|---------------|
| `app` | `title` | The application title shown by the web client. |
| `colors` | `navBackground`, `navForeground`, `primary`, `secondary`, `success`, `warning`, `error` | The navigation colours, and the colours that charts and status displays draw from. |
| `assets` | `logo`, `loginLogo`, `favicon` | The main logo, the logo on the sign-in page, and the browser tab icon. |

Each asset is a single file name that must exist in `themes/assets` with one of the extensions `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, or `.ico`.
Colours are hex values, and the three-digit form such as `"#abc"` is expanded to `"#AABBCC"`.
A value that is not a valid colour is reported in the log and the theme falls back to the defaults.

## Example `theme.yaml`

This example rebrands Profinity for a fictional OEM.
Place it at `themes/theme.yaml`, and put `acme-logo.svg`, `acme-login.svg`, and `acme-favicon.ico` in `themes/assets`.
Every group and key is optional, so include only what you want to override.

```yaml
version: "2.3"

app:
  title: Acme Monitor

colors:
  navBackground: "#111827"
  navForeground: "#FFFFFF"
  primary: "#0F6CBD"
  secondary: "#5B6770"
  success: "#1E8E3E"
  warning: "#F29900"
  error: "#D93025"

assets:
  logo: acme-logo.svg
  loginLogo: acme-login.svg
  favicon: acme-favicon.ico
```

An OEM build can combine custom themes with hidden catalogue entries, as described in [Components and Plugins](../../Administration/Install_and_Manage_Plugins.md), and the settings that control the rest of the system are in [System Configuration](../../Administration/System_Configuration/index.md).
Integrators can read the theme through the [API](../../Integrating_to_Profinity/APIs/Endpoint_Reference.md#themes).
