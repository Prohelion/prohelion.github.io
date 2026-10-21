---
title: Settings
description: "Look up the keys, field types, and layout of settings_map.yaml, the extra fields on a Custom Component settings dialog."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Settings

`settings_map.yaml` adds extra fields to the settings dialog of a [Custom Component](index.md).
Each *section* is drawn as a tab, each *category* as a headed group on that tab, and each *field* as a control in that group.
The upload field is **Settings Map YAML file (Optional)**.
Refer to [Custom Component files](Files.md).
The file must contain at least one field.
A map with no fields fails with `Settings map contains no field definitions.`
The [Component Pack CLI](../SDK/Component_Pack_CLI.md) (`profinity-component-pack validate`) reports the same failure as `Failed to parse settings_map.yaml:` followed by that message.
A script reads a saved value with `Profinity.ComponentSettings` and the field identifier, such as `comPort`.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).
Firmware fields use this same layout in `firmware_map.yaml`.
Refer to [Firmware maps](Firmware_Maps.md).

## Layout

The file starts with `version: "2.3"`, then a `sections` list.
Sections, categories, and fields are drawn in the order they appear in the file.
`displayName` is the heading the user sees.
The older key `label` is still accepted.

This is a complete map for a serial device that can also publish on CAN.

```yaml
version: "2.3"
sections:
  - id: comms
    displayName: Communications
    categories:
      - id: serial
        displayName: Serial Settings
        fields:
          comPort:
            name: COM Port
            type: STRING
            default: COM1
            required: true
            description: Serial port the device is connected to.
          baudRate:
            name: Baud Rate
            type: LIST
            default: "9600"
            values:
              "4800": "4800"
              "9600": "9600"
              "57600": "57600"
      - id: canExport
        displayName: CAN Export
        fields:
          publishTelemetryToCan:
            name: Publish Telemetry To CAN
            type: BOOL
            default: false
          canExportMessageId:
            name: CAN Export Message ID
            type: UINT32
            default: 1280
            dependsOn:
              publishTelemetryToCan: true
```

`COM1` is an example port name.
Replace it with the port on the machine that runs Profinity.
That file adds a **Communications** tab.
**Serial Settings** heads **COM Port** and **Baud Rate**.
**CAN Export** heads **Publish Telemetry To CAN** and **CAN Export Message ID**.
**CAN Export Message ID** is shown only while **Publish Telemetry To CAN** is ticked.

| Key | On a section | On a category |
|-----|--------------|---------------|
| `id` | Identifier for the tab | Identifier for the group |
| `displayName` | Tab name. `label` is still accepted | Group heading. `label` is still accepted |
| `categories` | The groups on the tab | |
| `fields` | | The controls in the group |

An older file that uses a flat `config` map instead of `sections` is still read.
Those fields are shown on a **Configuration Settings** tab, in a group named **Settings**.

## Fields

The key under `fields`, such as `comPort`, is the identifier a script passes to `GetValue`.
`name` is the label on the control.
When `name` is omitted, the identifier is used as the label.

| Key | Meaning |
|-----|---------|
| `name` | Label on the control |
| `description` | Help text shown with the field |
| `type` | Which control is drawn. The type names are in the field types table |
| `default` | Value shown until the user saves another |
| `values` | Choices for a `LIST` field. The text on the right is what the list shows, and that text is what is saved |
| `required` | `true` means the field must have a value |
| `readOnly` | `true` means the value is visible and the user cannot change it |
| `min`, `max` | Smallest and largest numbers the field accepts. Write them in the units the user types |
| `units` | Unit printed beside a number |
| `scale` | Multiplies the number shown on a firmware field. A save stores that on-screen number |
| `index` | Firmware maps only. Device parameter address the load and save scripts use |
| `dependsOn` | The field is shown when every named field has the given value. The name is another field identifier in this file |
| `gridSpanX` | How many columns the control spans. `2` draws it across two columns |
| `gridSpanY` | How many rows the control spans |
| `requiresFeature` | The field is shown only when the licence includes this feature |

For a `LIST` field, set `default` to one of the texts on the right.
The baud rate in the example does this with `"9600"`.
A script then reads that same text.
When the two sides differ, for example `"1": NMEA`, the list shows `NMEA` and `GetValue` returns `NMEA` after the user picks that row.

`units` is shown for `V`, `mV`, `A`, `Ah`, `W`, `Wh`, `Ms`, `Seconds`, `°C`, `kb/s`, `%`, `Ohms`, `Ohm`, `J`, `kPa`, `RH %`, and `Bitfield`.
Any other text is ignored.

`scale` applies to firmware fields.
It multiplies the number the firmware page shows.
`min` and `max` are checked against that number, so write them in the units the user types.

```yaml
balanceUp:
  name: Balance Up
  type: UINT16
  default: 4100
  units: V
  scale: 0.001
  min: 0
  max: 4.4
  index: 0x35
```

**Balance Up** opens as 4.1 V, because 4100 multiplied by 0.001 is 4.1.
A value above 4.4 is rejected.
`4100` is the stored default, and `4.4` is the largest number the user can type.
`index: 0x35` is the device parameter address, as described on [Firmware maps](Firmware_Maps.md).

!!! warning "A save stores the number on screen"
    `scale` changes the number drawn on the firmware page.
    A save stores that on-screen number.
    After a user saves the Balance Up example, the stored value is 4.1, not 4100.

## Field types

| `type` | Control |
|--------|---------|
| `STRING` | Text box. An omitted or unrecognised type is also a text box |
| `BOOL`, `BOOLEAN` | Tick box |
| `LIST` | Drop-down of the `values` entries |
| `UINT8`, `UINT16`, `UINT32`, `UINT64`, `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`, `DECIMAL`, `NUMBER` | Number |
| `HEX`, `HEXVALUE` | Hexadecimal number |
| `IPADDRESS` | IP address |
| `PASSWORD` | Masked text |
| `EMAIL` | Email address |
| `INFORMATION` | Text only, with no value to edit |

The calls a script uses to read these values are on [Component and firmware settings](../Scripting/Script_Operations/Settings.md).
The service that uses them is on [Main script](Main_Script.md).
