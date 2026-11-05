---
title: Panels component
description: "Reference for the Panels dashboard component: a grid of panel containers, with its parameters, height options and an example."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Panels component
A panels component is a grid that lays out several [panel](Panel.md) containers, where each panel holds its own content and data visualisations.
The panels sit side by side and wrap onto the next line when the row has no room left.

<figure markdown>
![Two panels side by side, CELL TEMPERATURE (°C) and NODE VOLTAGES (V), each holding a bar chart.](../../images/panels.png)
<figcaption>Panels component showing a grid layout of multiple panel containers</figcaption>
</figure>

## When to use

Use panels to divide a section of a dashboard into several titled areas that each show a different data view.
Use a [Row](Row.md) or a [Group](Group.md) when the components need no titles or panel frames.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `class` | string | No | None | CSS class added to the panel grid, for use with a profile style sheet |
| `height` | string | No | None | Height in CSS format, applied directly to the grid and overriding any height the grid would otherwise take |
| `minHeight` | string | No | None | Minimum height in CSS format. The grid grows with its content and stays at or above this value. The value sets a floor only, so the grid is as tall as its content or this value, whichever is taller |
| `items` | array | Yes | None | Array of objects that each contain a single `panel`. The grid displays the panels in the order listed |

`id` is accepted but has no effect.

## Example

Enter the example in the **YAML** tab of the dashboard editor, as described in [Build a dashboard](../../Build_a_Dashboard.md).

``` yaml
dashboard:
  items:
    - row:
        items:
          - panels:
              items:
                - panel:
                    title: "System Status"
                    items:
                      - lamps:
                          items:
                            - lampgroup:
                                items:
                                  - lamp:
                                      color: "green"
                                      label: "CPU"
                                      value: 1
                                      enabled: true
                - panel:
                    title: "Performance"
                    items:
                      - chart:
                          type: "bar"
                          value:
                            labels: ["CPU", "Memory", "Disk"]
                            datasets:
                              - label: "Usage %"
                                data: [45, 67, 23]
```
