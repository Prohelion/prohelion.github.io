---
title: Firmware actions
description: "Name the load, save, and extra firmware scripts, and the buttons those scripts put on the firmware page."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Firmware actions

The firmware page of a [Custom Component](index.md) shows **LOAD SETTINGS**, **SAVE SETTINGS**, and any extra buttons the author declares, and `firmware.yaml` names the scripts behind those buttons.
The fields they read and write come from `firmware_map.yaml`.
Refer to [Firmware maps](Firmware_Maps.md).

```yaml
version: "2.3"
loadScript: scripts/load_firmware.py
saveScript: scripts/save_firmware.py
actions:
  - id: updateFirmware
    displayName: Update firmware
    icon: Update
    script: scripts/update_firmware.py
    uploadFileType: Firmware
    uploadFileExtension: .bin
```

`scripts/load_firmware.py`, `scripts/save_firmware.py`, and `scripts/update_firmware.py` are paths inside the component folder.

The upload field is **Firmware Actions YAML file (Optional)**, under **Pack files** and **Firmware**, and on the **Scripts** tab **Firmware scripts** lists the paths from this file.
Until the file is attached, that note reads: "Load, save, and flash scripts are named in firmware.yaml under Pack files → Firmware. Attach that file to see the script paths here."
Refer to [Custom Component files](Files.md).
The buttons are on the **Firmware Utilities** tab, in the **Firmware** group.
They are shown to users whose role includes the **Allow firmware actions** permission.
Refer to [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md) for how to grant it.

| Key | Button the user gets |
|-----|--------------------------|
| `loadScript` | **LOAD SETTINGS**. Runs once and, on success, marks the firmware as loaded |
| `saveScript` | **SAVE SETTINGS**. Runs once |
| `actions` | One button per entry. The label is `displayName` in capitals |

**LOAD SETTINGS** and **SAVE SETTINGS** are fixed labels, and either key can be omitted.
A path is relative to the component folder and must end in `.cs`, `.py`, or `.lua`.
A different extension fails with `firmware.loadScript must reference a .cs, .py, or .lua script.`
For the save script, the message names `firmware.saveScript` instead.

## Extra buttons

Each entry under `actions` needs an `id`, a `displayName`, and a `script`, and `displayName: Update firmware` is shown as **UPDATE FIRMWARE**.
`name` is also accepted in place of `displayName`, and `icon` follows the same rules as a [menu action](Menu_Actions.md) icon.
An action that does not ask for a file asks the user to confirm before it runs.
The prompt reads: "This writes a firmware binary to the device and cannot be undone. Continue only if you intend to flash."

| Key | Meaning |
|-----|---------|
| `id` | Identifier for the entry. The validation message names this id |
| `displayName` | Words on the button, shown in capitals |
| `script` | Path of the script, relative to the component folder, ending in `.cs`, `.py`, or `.lua` |
| `icon` | Icon on the button. When omitted, the button uses the custom icon |
| `uploadFileType` | Asks the user to choose a file before the button runs. The usual firmware flash uses `Firmware` |
| `uploadFileExtension` | Required with `uploadFileType`. The extension the chosen file must have, such as `.bin` |
| `requiresFirmwareLoaded` | `true` hides the button until **LOAD SETTINGS** has succeeded |
| `requiresActiveDevice` | `true` shows the button only when the component status is on, idle, warning, or error |

The usual firmware flash uses `Firmware` with `.bin`.
`uploadFileType` also accepts `Certificate`, `Collections`, `Content`, `Dashboard`, `DBC`, `DerivedTags`, `FirmwareSettings`, `Images`, `MenuLayout`, `Models`, `ProfileDashboard`, `Rules`, `Script`, `SettingsMap`, and `Styles`.

| Problem | Message |
|---------|---------|
| Missing `id` | `Each firmware action requires a non-empty 'id'.` |
| Missing `displayName` | `Firmware action '<id>' requires a non-empty 'displayName' (or legacy 'name').` |
| Missing `script` | `Firmware action '<id>' requires a 'script' path.` |
| Unrecognised `uploadFileType` | `Firmware action '<id>' has unsupported uploadFileType '<type>'.` |
| `uploadFileType` without `uploadFileExtension` | `Firmware action '<id>' requires uploadFileExtension when uploadFileType is set.` |

`profinity-component-pack validate` reports the same messages.
Refer to [Component Pack CLI](../SDK/Component_Pack_CLI.md).

The load script opens the device with values from `Profinity.ComponentSettings`, such as a COM port and a baud rate.
How the load and save scripts use `Profinity.FirmwareSettings` is on [Firmware maps](Firmware_Maps.md#index-and-scale).
Only an entry under `actions` receives `Profinity.Action`, including the uploaded file and progress.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md) and [Action context](../Scripting/Script_Operations/Action.md).
