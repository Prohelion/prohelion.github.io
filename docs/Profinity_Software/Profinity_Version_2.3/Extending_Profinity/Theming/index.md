---
title: Themes and Branding
description: "Customize Profinity appearance with themes, colors, logos, and light/dark mode support."
---

# Themes and branding

Profinity 2.3 exposes **theme and branding** settings through the engine **Themes API** and admin surfaces. Use themes to align Profinity with OEM colours, logos, and light/dark presentation where supported.

## Admin access

Theme management requires appropriate admin permissions (typically **`SystemAdmin`** or OEM deployment workflows). Exact UI entry points follow the active profile and build — open **System Configuration** or admin theme dialogs when enabled on your build.

## API

Integrators can read and update theme assets via **`ThemesController`** (`/api/v2` themes endpoints). Responses use JSON bodies per API design standards.

Store branding assets under the artifacts tree paths documented in engineering theme templates — do not embed large binary assets in Config.yaml.

## Documentation screenshots

Use the **default/light** theme for operator documentation screenshots unless this page explicitly requires dark-mode examples.

## Related documentation

- [System configuration](../../Administration/System_Config.md)
- [Component catalog](../Components/Component_Catalog.md) — OEM builds may combine hidden catalog entries with custom themes
- [Settings registry](../Configuration/Settings_Registry.md)
