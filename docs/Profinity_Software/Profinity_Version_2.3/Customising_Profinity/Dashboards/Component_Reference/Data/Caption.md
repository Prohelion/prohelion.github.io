---
title: Caption component
description: "Show a line of text on a dashboard from a static string or a bound value, such as a status message or mapped text."
type: reference
owner: Documentation
last_reviewed: 2026-10-18
---

# Caption component

A caption is a line of text that displays a static string or a string from a [data binding](../../Data_Binding/index.md), such as a status message or a mapped text value.

Use a caption for status messages, mapped text such as `Online` and `Offline`, and short headings that depend on data.
Use [Readouts](Readouts.md) for a measurement with a unit and precision, and [HTML](../Content/HTML.md) for formatted content.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Extra CSS class names added to the caption |
| `color` | string | No | None | Status colour of the text: `red`, `green`, `amber` or `grey`, the same colours as a [Lamp](Lamp.md). Can be bound with the `color` target |
| `value` | string | No | None | Static text shown when no `value` binding supplies the text. When no data is available, the caption shows `--` and is displayed as stale |
| `label` | string | No | None | Not used by the web interface |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Data binding. The `value` target supplies the text, which is displayed as a string, and the `color` target supplies the colour |

A `color` value other than the four listed is ignored, and the text keeps its normal colour.

## Example

``` yaml
dashboard:
  items:
    - row:
        items:
          - caption:
              value: Unknown
              bind:
                - target: value
                  source: 'DBC/Status/LimitBusCurrent'
                  toType: boolean
                  mapToText:
                    trueValue: Limiting
                    falseValue: Normal
                - target: color
                  source: 'DBC/Status/LimitBusCurrent'
                  toType: boolean
                  mapToText:
                    trueValue: amber
                    falseValue: green
```

The `mapToText` binding property converts the boolean value into the text that the caption displays, and into the colour name that the `color` binding supplies.
The [Text mapping](../../Data_Binding/Transform_and_Map_Values.md#text-mapping) section describes the property.
