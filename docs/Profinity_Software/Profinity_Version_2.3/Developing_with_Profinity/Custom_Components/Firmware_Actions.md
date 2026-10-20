---
title: Firmware actions
description: "Name the load, save, and other firmware scripts for a Custom Component in firmware.yaml."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Firmware actions

`firmware.yaml` names the scripts behind firmware actions on a [Custom Component](index.md).
It does not store the firmware values.
Those fields come from `firmware_map.yaml`.
Refer to [Settings and firmware maps](Settings_and_Firmware_Maps.md).

The upload field is **Firmware Actions YAML file (Optional)**.
Until this file is set, the **Scripts** tab points back at **Pack files** and **Firmware**.
Refer to [Custom Component files](Files.md).

| Key | Meaning |
|-----|---------|
| `loadScript` | Runs once when the operator loads firmware. Writes the values it read from the device into firmware settings |
| `saveScript` | Runs once when the operator saves firmware. Reads firmware settings and sends them to the device |
| `actions` | Further firmware operations. Each entry has an `id`, a `displayName`, and a `script` |

A script reads and writes those values with `Profinity.FirmwareSettings`.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).

An entry under `actions` can require an upload before it runs.
Set `uploadFileType` and `uploadFileExtension` on that entry.
The script reads `Profinity.Action` for the action name, the uploaded file, and the user who started it.
It reports progress with `ReportProgress`.

`Profinity.Action` is set only for an entry under `actions`.
Refer to [Action context](../Scripting/Script_Operations/Action.md).

```yaml
version: "2.3"
loadScript: scripts/load_firmware.py
saveScript: scripts/save_firmware.py
actions:
  - id: updateFirmware
    displayName: Update firmware
    script: scripts/update_firmware.py
    uploadFileType: Firmware
    uploadFileExtension: .bin
```

Each `script` path is relative to the component folder.
`updateFirmware`, `Update firmware`, and `scripts/update_firmware.py` are example values.

New in Profinity 2.3.
