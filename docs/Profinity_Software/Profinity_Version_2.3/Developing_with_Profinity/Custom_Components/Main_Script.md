---
title: Main script
description: "Run a Custom Component main script as a service that publishes tags for the component dashboard."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Main script

**Main Script** is a [service script](../Scripting/Script_Types/Service_Scripts.md), in C#, Python, or Lua, on a [Custom Component](index.md).
It keeps running until **Disconnect** or until the component shuts down.
**Auto Start Main Script** starts it when the profile loads.
With auto start left off, the operator starts and stops it from **Connect / Disconnect**.

That menu item is a `mainScriptToggle` entry in `actions.yaml`.
Refer to [Menu actions](Menu_Actions.md).

The script owns its telemetry.
It creates branches and leaves under the component in the tag tree.
It publishes with `SetValue`, `ClearValue`, and `MarkStale`.
The dashboard binds those paths directly.

On **Disconnect** the current values are cleared and marked stale, and the branches stay in place so the dashboard bindings remain valid.
Refer to [Tags](../Scripting/Script_Operations/Tags.md) for the tag calls, and to [Profinity Scripting](../Scripting/index.md) for the service lifecycle.

The upload field is **Main Script (Optional)** on the **Scripts** tab.
Refer to [Custom Component files](Files.md).

New in Profinity 2.3.
