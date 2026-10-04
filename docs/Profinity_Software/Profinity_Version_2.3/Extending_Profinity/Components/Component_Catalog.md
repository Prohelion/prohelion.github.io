---
title: Component Catalog
description: "Hide component types from the add-component catalog using glob patterns in config.yaml or the admin UI."
---

# Disable components in the catalog

Administrators and OEMs can **hide component types** from the add-component catalog using glob patterns in configuration. Hidden types do not appear in **Available Components** or in the Plugin Manager availability lists.

## Configuration

### Admin UI toggle (primary)

1. Open **System Configuration**.
2. Navigate to **App Settings** → **Component catalog**.
3. Use the per-item enable/disable controls to hide or show component types and groups.

Each toggle calls a REST endpoint and updates the **`DisabledComponents`** / **`DisabledGroups`** lists in `config.yaml`. The change applies immediately and does not restart the engine.

### Custom.yaml (OEM override)

OEM deployments using OEM packaging can supply additional overrides in **`Custom.yaml`**. Precedence follows the engine's `ComponentCatalogAvailabilityService`: config.yaml is the operator-facing source, and Custom.yaml can restrict further for branded builds.

## Plugin Manager reflection

The **Components & Plugins** admin screen reflects which types are available and which are hidden or disabled.

## Pattern syntax

The admin UI stores disabled types and groups as glob patterns matching component type ids. For example, disabling experimental types results in:

```yaml
DisabledComponents:
  - Experimental.*
  - LegacyCharger
```

To confirm a change, sign in with a non-admin engineer account and check that hidden types do not appear under **ADD COMPONENT**.

## Related documentation

- [Component types](./Component_Types.md)
- [Settings registry](../Configuration/Settings_Registry.md)
- [DLL plugins](../Plugins/index.md)
