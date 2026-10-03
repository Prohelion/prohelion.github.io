---
title: Lamps Component
description: "Grid of colour-coded status indicators for quick system state visualisation and error/warning displays."
---

# Lamps

Grid of status indicators. Lamps use colour and on/off state to communicate system status at a glance.

<figure markdown>
![Lamps component displaying a grid of status indicators with colour-coded states](../../images/lamps.png)
<figcaption>Lamps component displaying a grid of status indicators with colour-coded states</figcaption>
</figure>

**Best for:** Status indicators, error/warning displays, system state visualisation, quick status overview

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the lamps component |
| `class` | optional (string) | CSS class for styling |
| `items` | required (array) | Array of lamp groups |

**Lamp Group Parameters:**

Each item in `items` must contain a `lampgroup` object with:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the lamp group |
| `class` | optional (string) | CSS class for styling |
| `items` | required (array) | Array of lamps |

Each item in the lamp group's `items` must contain a `lamp` object with:

**Lamp Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the lamp |
| `class` | optional (string) | CSS class for styling |
| `color` | required (string) | Lamp colour, for example `green`, `red`, `amber`, `disabled` or `grey` |
| `label` | optional (string) | Display label |
| `value` | optional (number) | Lamp value, typically `0` or `1` |
| `enabled` | optional (boolean) | Whether the lamp is enabled |
| `visible` | optional (boolean) | Whether the lamp is visible |
| `bind` | optional (array) | Data binding configuration |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - lamps:
              items:
                - lampgroup:
                    items:
                      - lamp:
                          color: "green"
                          label: "Online"
                          value: 1
                          enabled: true
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Online'
                              toType: boolean
                      - lamp:
                          color: "red"
                          label: "Error"
                          value: 1
                          enabled: false
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Error'
                              toType: boolean
                      - lamp:
                          color: "amber"
                          label: "Warning"
                          value: 1
                          enabled: false
                          bind:
                            - target: enabled
                              source: '{COMPONENT_NAME}.Status.Warning'
                              toType: boolean
```
