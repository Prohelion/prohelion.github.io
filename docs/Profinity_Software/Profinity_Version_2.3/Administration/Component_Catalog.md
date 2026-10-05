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

OEM deployments using OEM packaging can supply additional overrides in **`Custom.yaml`**. config.yaml is the operator-facing source of which components are available, and Custom.yaml can restrict that list further for branded builds.

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

- [Component types](../Developing_with_Profinity/Custom_Components/Component_Types.md)
- [DLL plugins](Plugins.md)
