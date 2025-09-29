---
title: Profinity Dashboard Conditional Styling
---

# Conditional Styling

Profinity has the ability to conditionally style elements of your dashboard based on the current state of data.

## Conditional Display

Use binding to show/hide components based on data:

``` yaml
group:
  class: "conditional-panel"
  items:
    - readouts:
        items:
          - label: "Special Value"
            value: 0
            bind:
              - target: "value"
                source: "data.special_value"
                toType: "number"
```

## Dynamic Styling

Bind CSS classes based on data:

``` yaml
row:
  class: "status-row"
  items:
    - group:
        class: "status-panel"
        bind:
          - target: "class"
            source: "data.status"
            mapToText:
              true: "status-panel online"
              false: "status-panel offline"
```