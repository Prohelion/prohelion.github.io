---
title: Settings and firmware maps
description: "Add component and firmware settings fields with settings_map.yaml and firmware_map.yaml on a Custom Component."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Settings and firmware maps

`settings_map.yaml` adds fields to the component settings on a [Custom Component](index.md).
Fields are grouped into sections and categories, and each field has a name, a type, and a default.
`firmware_map.yaml` uses the same layout for firmware settings.
An edit to either map shows up on the settings dialog.

A pack requires both files.
Refer to [Custom Component files](Files.md).

A script reads the saved values with `Profinity.ComponentSettings` for the settings map and `Profinity.FirmwareSettings` for the firmware map.
That is how a serial port, a baud rate, or a CAN export flag reaches the main script.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).

The scripts that load and save the firmware values are named in `firmware.yaml`, not in the map.
Refer to [Firmware actions](Firmware_Actions.md).

A serial device, for example, keeps its COM port and baud rate in `settings_map.yaml`.
This is the communications section from the G-STAR IV sample, and it is a complete file for a component that needs only those fields:

```yaml
version: "2.3"
sections:
  - id: comms
    label: Communications
    categories:
      - id: serial
        label: Serial Settings
        fields:
          comPort:
            name: COM Port
            type: STRING
            default: COM_PROFINITY_TEST_HARNESS
            required: true
          baudRate:
            name: Baud Rate
            type: LIST
            default: 4800
            values:
              "4800": "4800"
              "9600": "9600"
              "57600": "57600"
```

The key under `fields`, such as `comPort`, is the identifier a script passes to `GetValue`.
In this sample, `type` is one of:

- `STRING`
- `LIST`
- `BOOL`
- `UINT32`

A `LIST` field stores the selected key, such as `4800` for the entry `"4800": "4800"`.
The firmware page for the device's own configuration uses `firmware_map.yaml` with this same `sections` layout.

New in Profinity 2.3.
