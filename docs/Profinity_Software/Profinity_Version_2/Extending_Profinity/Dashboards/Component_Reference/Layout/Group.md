---
title: Group Component
---

# Group

A group is a container that organizes related components. Groups help create visual and logical groupings within rows, making dashboards more organized and easier to understand.

**Best for:** Grouping related data displays, creating visual sections, organizing components with similar functions

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the group |
| `class` | optional (string) | CSS class for styling |
| `direction` | optional (string) | Layout direction - "vertical" or "horizontal" (default: "vertical") |
| `items` | required (array) | Array of components within the group |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - group:
              class: "sensor-panel"
              direction: "vertical"
              items:
                - readouts:
                    items:
                      - readout:
                          label: "Pressure"
                          value: 1013.25
                          unit: "hPa"
                          precision: 2
                - chart:
                    type: "line"
                    value:
                      labels: ["00:00", "06:00", "12:00", "18:00"]
                      datasets:
                        - label: "Pressure Trend"
                          data: [1010, 1012, 1015, 1013]
```
