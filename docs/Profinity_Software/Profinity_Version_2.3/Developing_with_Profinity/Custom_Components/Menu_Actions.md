---
title: Menu actions
description: "Declare Custom Component menu actions in actions.yaml: a button, a service toggle, or Connect / Disconnect."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Menu actions

`actions.yaml` declares the menu entries that run scripts on a [Custom Component](index.md).
The upload field is **Actions YAML file (Optional)**.
A pack requires this file.
Refer to [Custom Component files](Files.md).

| `kind` | What the operator gets |
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
| `icon` | No | One of the built-in names. An omitted icon is shown as `Custom` |
| `iconPath` | No | An image in the component folder, used instead of a built-in icon |

Built-in icon names:

- `Accounts`
- `AddComponent`
- `Adapters`
- `Admin`
- `AiAssistant`
- `Alerts`
- `Battery`
- `Cancel`
- `Chargers`
- `Clipboard`
- `Cloud`
- `Config`
- `Custom`
- `Dashboard`
- `Discover`
- `Download`
- `Edit`
- `Feedback`
- `Hamburger`
- `Historians`
- `Information`
- `Login`
- `Loggers`
- `Logout`
- `MotorControllers`
- `None`
- `Password`
- `Pause`
- `PowerTrackers`
- `Profiles`
- `ProfinityLogs`
- `RuleActions`
- `Scripts`
- `Send`
- `Setup`
- `Start`
- `Stop`
- `Tags`
- `Update`
- `Upload`
- `Utilities`

An entry with an unsupported `kind` or `icon` fails validation.
A `button` or `toggle` without a `script` fails in the same way.
The message names the entry, for example `Menu action 'zero' has unsupported kind`.

`profinity-component-pack validate` runs the same check.
Refer to [Component Pack CLI](../SDK/Component_Pack_CLI.md).

```yaml
version: "2.3"
menuActions:
  - id: connect
    displayName: Connect / Disconnect
    icon: Start
    kind: mainScriptToggle
  - id: zero
    displayName: Zero Calibration
    icon: Start
    kind: button
    script: scripts/calibrate_zero.py
```

Rule actions are a separate mechanism.
Refer to [DBC, dashboard, and rules](DBC_Dashboard_and_Rules.md#rules).

New in Profinity 2.3.
