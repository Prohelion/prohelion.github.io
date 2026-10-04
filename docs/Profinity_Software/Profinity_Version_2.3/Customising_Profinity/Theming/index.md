---
title: Themes and Branding
description: "Customise Profinity appearance with themes, colours, logos, and light and dark mode support."
---

# Themes and branding

Profinity 2.3 applies theme and branding settings from a `theme.yaml` file in the `themes` folder of the [artefacts directory](../../Installation/Artifacts_Directory.md), and the web client reads the result so that OEM colours, logos and the application title replace the defaults.

## Where the theme is defined

The theme is a file-based setting, and the engine has no administration screen or write API for it. The engine creates the `themes` folder and its `assets` sub-folder at start-up, loads `themes/theme.yaml` when it starts, and reloads it when the file's last-write time changes. A missing file leaves the built-in defaults in place, and a file that fails validation is logged and also falls back to the defaults. The file holds a `version` plus three optional groups.

| Group | Keys |
|-------|------|
| `app` | `title` |
| `colors` | `navBackground`, `navForeground`, `primary`, `secondary`, `success`, `warning`, `error` |
| `assets` | `logo`, `loginLogo`, `favicon` |

Each asset is a single file name that must exist in `themes/assets` with one of the extensions `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` or `.ico`, so large binary assets stay in that folder and never in `config.yaml`.

## API

The engine exposes the theme read-only. `GET /api/v2/Themes` is anonymous, so the sign-in page can use it before a user has authenticated, and returns `appTitle`, `hasCustomTheme` and a `logos` object with `main`, `login` and `favicon` URLs. The generated stylesheet is served from `/Themes/theme.css`, and each asset from `/Themes/Assets/{file}`. No endpoint creates or updates theme assets, so changes are made by editing `theme.yaml` and the `assets` folder on the engine host, which requires file-system access to that host rather than the `SystemAdmin` role.

## Related documentation

- [System configuration](../../Administration/System_Config.md)
- [Component catalog](../../Administration/Component_Catalog.md) — OEM builds may combine hidden catalogue entries with custom themes
