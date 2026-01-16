---
title: Readouts Component
---

# Readouts

Display of numerical or text values. Readouts are the primary way to show sensor data, measurements, and other numerical information from your system.

**Best for:** Sensor readings, measurements, numerical data display, text information, real-time values

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the readouts component |
| `class` | optional (string) | CSS class for styling |
| `items` | required (array) | Array of readout items |

**Readout Item Structure:**

Each item in `items` must contain a `readout` object with:

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the readout |
| `class` | optional (string) | CSS class for styling |
| `label` | required (string) | Display label |
| `value` | optional (number/string) | Static value |
| `unit` | optional (string) | Unit of measurement |
| `precision` | optional (number) | Decimal precision for numerical values |
| `min` | optional (number) | Minimum value |
| `max` | optional (number) | Maximum value |
| `enabled` | optional (boolean) | Whether the readout is enabled |
| `visible` | optional (boolean) | Whether the readout is visible |
| `bind` | optional (array) | Data binding configuration |
| `action` | optional (string) | Action to perform on click |
| `param` | optional (string) | Parameter for the action |

**Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - readouts:
              items:
                - readout:
                    label: "Temperature"
                    value: 25.5
                    unit: "°C"
                    precision: 1
                    enabled: true
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.TemperatureMeasurement.Value'
                - readout:
                    label: "Pressure"
                    value: 1013.25
                    unit: "hPa"
                    precision: 2
                    enabled: true
                    bind:
                      - target: value
                        source: '{COMPONENT_NAME}.PressureMeasurement.Value'
```
