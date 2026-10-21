---
title: Firmware maps
description: "Look up firmware_map.yaml, the firmware fields on a Custom Component, which use the same layout as a settings map."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Firmware maps

`firmware_map.yaml` adds the firmware tabs on a [Custom Component](index.md).
It uses the same sections, categories, and fields as [Settings](Settings.md).
A section is a tab, a category is a group on that tab, and a field is a control.
The upload field is **Firmware Map YAML file (Optional)**.
The file must contain at least one field.
A map with no fields fails with `Settings map contains no field definitions.`
The [Component Pack CLI](../SDK/Component_Pack_CLI.md) (`profinity-component-pack validate`) reports the same failure as `Failed to parse firmware_map.yaml:` followed by that message.
Refer to [Custom Component files](Files.md).
The scripts that load and save the values are named in `firmware.yaml`.
Refer to [Firmware actions](Firmware_Actions.md).

An older file that uses a flat `config` map instead of `sections` is still read.
Those fields are shown on a **Firmware Settings** tab, in a group named **Firmware**.

## Index and scale

`index` is the device parameter address.
A load script and a save script use it when they read or write that field on the device.
Write it on the field next to `type` and `scale`.
`scale` multiplies the number shown on the firmware page.
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
            index: 0x35
          cellBalancingVoltage:
            name: Balance Down
            type: UINT16
            default: 4050
            units: V
            scale: 0.001
            min: 0
            max: 4.4
            index: 0x36
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
            index: 0x50
          shuntRatedAt:
            name: Current Shunt Rated @
            type: LIST
            default: 2
            values:
              "2": 50mv
              "4": 100mv
```

That file adds a **BMS Settings** tab.
**Cell Limits** heads **Balance Up** and **Balance Down**.
**Current Shunt** heads **Current Shunt Rating** and **Current Shunt Rated @**.
**Balance Up** opens as 4.1 V, because 4100 multiplied by 0.001 is 4.1.
A value above 4.4 is rejected.
`index: 0x35` is the slot the load and save scripts send on the bus for **Balance Up**.
**Current Shunt Rated @** has no `index`, so it is not a device parameter.
It is a companion list that exists only in the UI.

!!! warning "A save stores the number on screen"
    `scale` changes the number drawn on the firmware page.
    A save stores that on-screen number.
    After a user saves **Balance Up** in the example map, the stored value is 4.1, not 4100.

A script reads a saved value with `Profinity.FirmwareSettings` and the field identifier, such as `balanceUp`.
A load script writes those values after it reads the device.
A save script reads them and sends them to the device.
Refer to [Component and firmware settings](../Scripting/Script_Operations/Settings.md).
