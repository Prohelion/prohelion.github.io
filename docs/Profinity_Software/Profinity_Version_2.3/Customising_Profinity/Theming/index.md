---
title: Themes and Branding
description: "Customise Profinity appearance with themes, colours, logos, and light and dark mode support."
---

# Themes and Branding

!!! warning "Themes Need a Commercial Licence"
    Themes and branding are included in the Desktop licence and above, which carry white-label rights, such as the rights held by an original equipment manufacturer (OEM) that ships Profinity under its own brand. An unlicensed instance keeps its `theme.yaml` file but shows the default Profinity appearance. Contact Prohelion about licensing before you apply a custom theme.

Profinity 2.3 applies theme and branding settings from a `theme.yaml` file in the `themes` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), and the web client shows the colours, logos and application title from that file in place of the defaults.

## Where the Theme Is Defined

The theme is a file-based setting, so there is no administration screen for it. Edit `themes/theme.yaml` on the Profinity host, and put logos and icons in the `assets` sub-folder. Profinity applies the file when it starts and again whenever the file changes. A missing file leaves the built-in defaults in place, and a file with errors is reported in the [Profinity log](../../Getting_Started/Profinity_Log.md) and also falls back to the defaults. The file holds a `version` plus three optional groups, written with camelCase keys.

| Group | Keys | What they set |
|-------|------|---------------|
| `app` | `title` | The application title shown by the web client. |
| `colors` | `navBackground`, `navForeground`, `primary`, `secondary`, `success`, `warning`, `error` | The navigation colours, and the colours that charts and status displays draw from. |
| `assets` | `logo`, `loginLogo`, `favicon` | The main logo, the logo on the sign-in page, and the browser tab icon. |

Each asset is a single file name that must exist in `themes/assets` with one of the extensions `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` or `.ico`.

A theme file written for an earlier version may use capitalised keys such as `Version`, `App` and `Colors`. Profinity still reads such a file and rewrites it with the camelCase keys used on this page.

## Example `theme.yaml`

This example rebrands Profinity for a fictional OEM. Place it at `themes/theme.yaml`, and put `acme-logo.svg`, `acme-login.svg` and `acme-favicon.ico` in `themes/assets`. Every group and key is optional, so include only what you want to override.

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

Colours are hex values, and the three-digit form such as `"#abc"` is expanded to `"#AABBCC"`. A value that is not a valid colour is reported in the log and the theme falls back to the defaults.

## API

The theme is read-only through the API. `GET /api/v2/Themes` is anonymous, so the sign-in page can use it before a user has authenticated, and returns `appTitle`, `hasCustomTheme` and a `logos` object with `main`, `login` and `favicon` URLs. The generated stylesheet is served from `/Themes/theme.css`, and each asset from `/Themes/Assets/{file}`. Changes are made by editing `theme.yaml` and the `assets` folder, which needs file-system access to the Profinity host.

## Related Documentation

An OEM build can combine custom themes with hidden catalogue entries, as described in [Components and Plugins](../../Administration/Components_and_Plugins.md), and the settings that control the rest of the system are in [System Configuration](../../Administration/System_Configuration/index.md).
