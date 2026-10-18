---
title: Caption component
description: "Show a line of text on a dashboard from a static string or a bound value, such as a status message or mapped text."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Caption component

A caption is a line of text that displays a static string or a string from a [data binding](../../Data_Binding/index.md), such as a status message or a mapped text value.

Use a caption for status messages, mapped text such as `Online` and `Offline`, and short headings that depend on data.
Use [Readouts](Readouts.md) for a measurement with a unit and precision, and [HTML](../Content/HTML.md) for formatted content.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `color` | string | Yes | None | Required, and ignored: the web interface does not use the colour of a caption, so set any valid colour name such as `grey` |
| `value` | string | No | None | Static text shown when no `value` binding supplies the text. When no data is available, the caption shows `--` and is displayed as stale |
| `label` | string | No | None | Not used by the web interface |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Data binding. Only the `value` target is handled, and the bound value is displayed as a string |

## Example

``` yaml
dashboard:
  items:
    - row:
        items:
          - caption:
              color: grey
              value: Unknown
              bind:
                - target: value
                  source: 'DBC/Status/Online'
                  toType: boolean
                  mapToText:
                    trueValue: Online
                    falseValue: Offline
```

The `mapToText` binding property converts the boolean value into the text that the caption displays.
The [Data Binding](../../Data_Binding/index.md) page describes the property.
