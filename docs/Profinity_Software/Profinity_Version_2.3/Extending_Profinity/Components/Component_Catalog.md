---
title: Component Catalog
description: "Hide component types from the add-component catalog using glob patterns in Config.yaml or the admin UI."
---

# Disable components in the catalog

Administrators and OEMs can **hide component types** from the add-component catalog using glob patterns in configuration. Hidden types do not appear in **Available Components** or Plugin Manager availability lists.

## Configuration

### Admin UI toggle (primary)

1. Open **System Configuration**.
2. Navigate to **App Settings** → **Component catalog**.
3. Use the per-item enable/disable controls to hide or show component types and groups.

Each toggle calls a REST endpoint behind the scenes and updates the **`DisabledComponents`** / **`DisabledGroups`** lists in `Config.yaml`. The change applies immediately and does not restart the engine.

### Custom.yaml (OEM override)

OEM deployments may supply additional overrides in **`Custom.yaml`** when using OEM packaging. Precedence follows engine `ComponentCatalogAvailabilityService` — Config.yaml is the operator-facing source; Custom.yaml can further restrict for branded builds.

## Plugin Manager reflection

The **Components & Plugins** admin screen reflects which types are available vs hidden/disabled.

<figure markdown>
![Plugin Manager showing catalog enable or hidden type indicator](../../../../assets/images/2.3/2.3-plugin-manager-catalog-toggle.png)
<figcaption>Component catalog visibility in Plugin Manager (screenshot placeholder — provide SS-37)</figcaption>
</figure>

## Pattern syntax

The admin UI stores disabled types and groups as glob patterns matching component type ids — for example, disabling experimental types results in:

```yaml
DisabledComponents:
  - Experimental.*
  - LegacyCharger
```

Test with a non-admin engineer account to confirm hidden types do not appear under **ADD COMPONENT**.

## Related documentation

- [Component types](./Component_Types.md)
- [Settings registry](../Configuration/Settings_Registry.md)
- [DLL plugins](../Plugins/index.md)
