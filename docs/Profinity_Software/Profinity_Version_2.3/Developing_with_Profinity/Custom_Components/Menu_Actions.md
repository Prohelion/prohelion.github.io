---
title: Menu actions
description: "Declare Custom Component menu actions in actions.yaml: a button, a service toggle, or Connect / Disconnect."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Menu actions

`actions.yaml` adds items to the menu of a [Custom Component](index.md).
Each item is one of three kinds:

- A button that runs a script once.
- A toggle that starts and stops a service.
- **Connect / Disconnect** for the main script.

```yaml
version: "2.3"
menuActions:
  - id: connect
    displayName: Connect / Disconnect
    icon: Start
    kind: mainScriptToggle
  - id: zero
    displayName: Zero Calibration
    icon: Play
    kind: button
    script: scripts/calibrate_zero.py
```

The upload field is **Actions YAML file (Optional)**.
Refer to [Custom Component files](Files.md).

| `kind` | What the user gets |
|--------|------------------------|
| `button` | Runs `script` once when the menu item is chosen |
| `toggle` | Starts and stops a service `script`, and publishes that running state on the component |
| `mainScriptToggle` | Connect / Disconnect for **Main Script**. The script is the **Main Script** field on the **Scripts** tab |

Refer to [Main script](Main_Script.md) for the service behind `mainScriptToggle`.

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | Yes | Unique name for the entry |
| `displayName` | Yes | Label on the menu item. The older key `name` is still accepted |
| `kind` | Yes | `button`, `toggle`, or `mainScriptToggle` |
| `script` | For `button` and `toggle` | A path relative to the component folder, such as `scripts/calibrate.cs`. A path that leaves the component folder is rejected |
| `icon` | No | A [Carbon icon](https://carbondesignsystem.com/elements/icons/library/) name, such as `Play` or `BatteryCharging`. A Profinity name such as `Start` is still accepted. A file name such as `icons/logo.svg` is a custom icon. An omitted icon is shown as `Custom` |
| `iconPath` | No | An image in the component folder, used instead of `icon` |

An entry with an unsupported `kind`, or a `button` or `toggle` without a `script`, fails validation.
The message names the entry, for example `Menu action 'zero' has unsupported kind`.
`profinity-component-pack validate` runs the same check.
Refer to [Component Pack CLI](../SDK/Component_Pack_CLI.md).

A tag rule can also run an action when a condition fires, which is not this file.
Refer to [DBC, dashboard, and rules](DBC_Dashboard_and_Rules.md#rules).
