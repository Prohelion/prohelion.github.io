---
title: Main script
description: "Publish live tags from a Custom Component main script, started on profile load or from Connect / Disconnect."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Main script

A [Custom Component](index.md) needs a main script when live values come from the script rather than from a DBC file, or when the script publishes extra tags beside the DBC signals.
**Main Script** is a [service script](../Scripting/Script_Types/Service_Scripts.md) in C#, Python, or Lua, and it keeps running until **Disconnect** or until the component shuts down.
**Auto Start Main Script** starts it when the profile loads, and with auto start left off the operator starts and stops it from **Connect / Disconnect**, which is a `mainScriptToggle` entry in `actions.yaml`.
Refer to [Menu actions](Menu_Actions.md).

The script creates branches and leaves under the component in the tag tree, publishes with `SetValue`, `ClearValue`, and `MarkStale`, and the dashboard binds those paths directly.
On **Disconnect** the current values are cleared and marked stale, and the branches stay in place so the dashboard bindings remain valid.
Refer to [Tags](../Scripting/Script_Operations/Tags.md) for the tag calls, and to [Profinity Scripting](../Scripting/index.md) for the service lifecycle.

The upload field is **Main Script (Optional)** on the **Scripts** tab.
Refer to [Custom Component files](Files.md).
