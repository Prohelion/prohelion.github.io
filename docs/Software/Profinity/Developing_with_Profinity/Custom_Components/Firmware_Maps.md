---
title: Firmware maps
description: "Look up firmware_map.yaml, the firmware fields on a Custom Component, which use the same layout as a settings map."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Firmware maps

`firmware_map.yaml` adds the firmware tabs to the **Change Settings** dialog of a [Custom Component](index.md).
It uses the same sections, categories, and fields as [Settings](Settings.md).
A section is a tab, a category is a group on that tab, and a field is a control.

The upload field is **Firmware map YAML file (optional)**.
The file must contain at least one field.
A map with no fields fails with `Settings map contains no field definitions.`
The [Component Pack CLI](../SDK/Component_Pack_CLI.md) (`profinity-component-pack validate`) reports the same failure as `Failed to parse firmware_map.yaml:` followed by that message.

Refer to [Custom Component files](Files.md).
The scripts that load and save the values are named in `firmware.yaml`.
Refer to [Firmware actions](Firmware_Actions.md).

A file that uses a flat `config` map instead of `sections` is also read.
Those fields are shown on a **Firmware Settings** tab, in a group named **Firmware**.

## Scale

A script receives a field by its id only, so keep device addresses in the load and save scripts.

`scale` multiplies `default` to give the number shown on the firmware page.
`min` and `max` are checked against that number, so write them in the units the user types.
The other field keys are on [Settings](Settings.md).

This is a complete map for a battery management system (BMS).

```yaml
version: "2.3"
sections:
  - id: bms
    displayName: BMS Settings
    categories:
      - id: cell
        displayName: Cell Limits
        fields:
          balanceUp:
            name: Balance Up
            type: UINT16
            default: 4100
            units: V
            scale: 0.001
            min: 0
            max: 4.4
          cellBalancingVoltage:
            name: Balance Down
            type: UINT16
            default: 4050
            units: V
            scale: 0.001
            min: 0
            max: 4.4
      - id: shunt
        displayName: Current Shunt
        fields:
          currentShuntRating:
            name: Current Shunt Rating
            type: UINT16
            default: 500
            units: A
            min: 2
            max: 1999
          shuntRatedAt:
            name: Current Shunt Rated @
            type: LIST
            default: 50mv
            values:
              "2": 50mv
              "4": 100mv
```

That file adds a **BMS settings** tab.
**Cell limits** heads **Balance up** and **Balance down**.
**Current Shunt** heads **Current shunt rating** and **Current Shunt Rated @**.

**Balance up** opens as 4.1 V, because 4100 multiplied by 0.001 is 4.1.
A value above 4.4 is rejected.
`4100` is the `default` in the file, and `4.4` is the largest number the user can type.

**Current Shunt Rated @** is a list field that the map defines with the choices 50mv and 100mv.
The map gives it no device `index`, so Profinity does not read it from the device or write it to the device.

!!! warning "A save stores the number on screen"
    `scale` changes the number drawn on the firmware page.
    A save stores that on-screen number.
    After a user saves **Balance up** in the example map, the stored value is 4.1, not 4100.

A script reads a saved value with `Profinity.FirmwareSettings` and the field identifier, such as `balanceUp`.
A load script writes those values after it reads the device.
A save script reads them and sends them to the device.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).
