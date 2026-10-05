---
title: Themes and Branding
description: "Customise Profinity appearance with themes, colours, logos, and light and dark mode support."
---

# Themes and branding

!!! warning "Licensed feature"
    Themes and branding is a licensed feature. It is for customers who hold the rights to white-label and distribute Profinity, such as OEM partners who ship Profinity under their own brand. If you do not hold those rights, keep the default Profinity appearance and contact Prohelion about licensing before you apply a custom theme.

Profinity 2.3 applies theme and branding settings from a `theme.yaml` file in the `themes` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), and the web client reads the result so that OEM colours, logos and the application title replace the defaults.

## Where the theme is defined

The theme is a file-based setting, so there is no administration screen for it. Edit `themes/theme.yaml` on the Profinity host, and put logos and icons in the `assets` sub-folder. Profinity applies the file when it starts and again whenever the file changes. A missing file leaves the built-in defaults in place, and a file with errors is reported in the log and also falls back to the defaults. The file holds a `version` plus three optional groups.

| Group | Keys |
|-------|------|
| `app` | `title` |
| `colors` | `navBackground`, `navForeground`, `primary`, `secondary`, `success`, `warning`, `error` |
| `assets` | `logo`, `loginLogo`, `favicon` |

Each asset is a single file name that must exist in `themes/assets` with one of the extensions `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` or `.ico`, so large binary assets stay in that folder and never in `config.yaml`.

## Example `theme.yaml`

This example rebrands Profinity for a fictional OEM. Place it at `themes/theme.yaml`, and put `acme-logo.svg`, `acme-login.svg` and `acme-favicon.ico` in `themes/assets`. Every group and key is optional, so include only what you want to override.

```yaml
Version: "2.3"

App:
  Title: Acme Monitor

Colors:
  NavBackground: "#111827"
  NavForeground: "#FFFFFF"
  Primary: "#0F6CBD"
  Secondary: "#5B6770"
  Success: "#1E8E3E"
  Warning: "#F29900"
  Error: "#D93025"

Assets:
  Logo: acme-logo.svg
  LoginLogo: acme-login.svg
  Favicon: acme-favicon.ico
```

Colours are hex values, and the three-digit form such as `"#abc"` is expanded to `"#AABBCC"`. A value that is not a valid colour is reported in the log and the theme falls back to the defaults.

## API

The engine exposes the theme read-only. `GET /api/v2/Themes` is anonymous, so the sign-in page can use it before a user has authenticated, and returns `appTitle`, `hasCustomTheme` and a `logos` object with `main`, `login` and `favicon` URLs. The generated stylesheet is served from `/Themes/theme.css`, and each asset from `/Themes/Assets/{file}`. Changes are made by editing `theme.yaml` and the `assets` folder on the Profinity host, so they need file-system access to that host.

## Related documentation

- [System configuration](../../Administration/System_Configuration/index.md)
- [Component catalog](../../Administration/Components_and_Plugins.md) — OEM builds may combine hidden catalogue entries with custom themes
