---
title: Lamp component
description: "Single colour-coded status indicator with a label, driven by a value, an enabled state and a colour."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Lamp component

A lamp is a single status indicator, a coloured dot with an optional caption that communicates system status through its colour and its on or off state.
The same lamp definition is used inside [Lamps](Lamps.md) groups, in the header of a [Tab](../Interactive/Tabs.md), in the [Titlebar](../Layout/Titlebar.md) and on a menu item, and a lamp can also be placed directly in a row, group, or panel.

Use a lamp for a single status indicator beside other components, and for titlebar and tab header status.
Use [Lamps](Lamps.md) for a set of related indicators, and [Readouts](Readouts.md) when the value itself must be read.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `color` | string | Yes | None | Colour of the lit lamp, one of `red`, `green`, `amber`, `grey`, `on`, `off`, `disabled` or `unknown`. The colour can be bound with the `color` target. Refer to [Colour names](#colour-names) |
| `value` | number | No | `0` | On or off state. `0` shows the lamp as off (grey) and any other number lights the lamp in its colour. A boolean binding is converted to `1` or `0`. Bind the `value` target to drive the state from data |
| `label` | string | No | None | Caption shown beside the lamp. Each `[-]` sequence in the caption becomes a soft hyphen, so that long words can break at that point. The caption can be bound with the `label` target |
| `enabled` | boolean | No | `true` | When `false`, the lamp is displayed in the disabled style and the caption is dimmed. Bind the `enabled` target to drive the state from data |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | [Data binding](../../Data_Binding.md). The `value`, `enabled`, `color` and `label` targets are handled. A binding with no `target` binds `value` |

### Colour names

| Colour | Appearance |
|--------|------------|
| `green` | Green lamp for a healthy or active state |
| `amber` | Amber lamp for a warning |
| `red` | Red lamp for an error or fault |
| `grey` | Grey lamp |
| `disabled` | Pale lamp in the disabled style |
| `off` | Recessed lamp with an inset border, without a colour fill of its own |
| `on` | Has no colour fill of its own, so the lamp shows no colour when it is lit |
| `unknown` | The lamp indicator is not drawn and only the caption is shown |

## Example

A lamp that a binding on `enabled` turns on and off:

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamp:
              color: green
              label: Online
              value: 1
              bind:
                - target: enabled
                  source: 'DBC/Status/Online'
                  toType: boolean
```

A lamp whose colour comes from a binding:

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamp:
              color: grey
              value: 1
              label: Prohelion BMU
              bind:
                - target: color
                  source: /Prohelion BMU/Properties/StatusColourText
                  toType: string
```

## Display rules

A lamp is displayed in grey when it has no data, when `enabled` is `false` or when its value is `0`, whatever its `color`.
A lamp that has a `color` and no `value` therefore stays grey, so a lamp that is driven by an `enabled` binding or by a `color` binding must also have `value: 1`.
When a bound source has no data, the lamp is displayed in the disabled style.
