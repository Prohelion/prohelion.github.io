---
title: Panels Component
description: "Grid layout of multiple panel containers for organising complex information into separate sections."
---

# Panels

Panels create a grid layout of individual panel components, where each panel can contain different types of content and data visualisations.

<figure markdown>
![Panels component showing a grid layout of multiple panel containers](../../images/panels.png)
<figcaption>Panels component showing a grid layout of multiple panel containers</figcaption>
</figure>

**Best for:** Creating dashboard sections with multiple data views, organising complex information into separate panels

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | CSS class added to the grid element, alongside `panels__grid` |
| `height` | string | No | None | Height in CSS format, applied directly to the grid and overriding any height the grid would otherwise take |
| `minHeight` | string | No | None | Minimum height in CSS format. The grid grows to fit its content and never shrinks below this value, and the value never stretches the grid to fill space |
| `items` | array | Yes | None | Array of objects that each contain a single `panel`, which the grid lays out as zones |

**Example:**

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
