---
title: Tabs Component
description: "Tabbed interface with header lamps and body content for organising multiple data views."
---

# Tabs

Tabbed interface with header lamps and body content. Tabs organise information into separate views that users switch between.

<figure markdown>
![Tabs component displaying a tabbed interface with header lamps and body content](../../images/tabs.png)
<figcaption>Tabs component displaying a tabbed interface with header lamps and body content</figcaption>
</figure>

**Best for:** Organising multiple data views, separating different information types, creating multi-page interfaces within a single dashboard

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | required (array) | Array of tab objects |

**Tab Parameters:**

Each item in `items` must contain a `tab` object with:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the tab |
| `class` | optional (string) | CSS class for styling |
| `enabled` | optional (boolean) | Whether the tab is enabled |
| `visible` | optional (boolean) | Whether the tab is visible |
| `bind` | optional (array) | Data binding configuration |
| `header` | required (array) | Tab header items (typically lamps) |
| `items` | required (array) | Tab panel content, typically panels (the legacy name `body` is converted to `items` by the dashboard editor) |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - tabs:
              items:
                - tab:
                    enabled: true
                    visible: true
                    header:
                      - lamp:
                          color: disabled
                          value: 1
                          label: INFO
                    items:
                      - panels:
                          items:
                            - panel:
                                title: Low Voltage
                                items:
                                  - readouts:
                                      items:
                                        - readout:
                                            label: 15v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail15VMeasurement.Supply15V'
                                        - readout:
                                            label: 1.9v RAIL
                                            precision: 1
                                            bind:
                                              - target: value
                                                source: '{COMPONENT_NAME}.VoltageRail3V31V9Measurement.Supply1V9'
```
