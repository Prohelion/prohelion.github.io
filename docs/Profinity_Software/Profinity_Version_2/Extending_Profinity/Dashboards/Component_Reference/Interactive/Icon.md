---
title: Icon Component
---

# Icon

Icon component for displaying icons from the /Profile/Images directory.

**Best for:** Displaying icons, status indicators, visual elements

**When not to use:** When you need interactive buttons (use Action instead) or when you need icons within other components (use component-specific icon properties)

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the icon |
| `class` | optional (string) | CSS class for styling |
| `label` | optional (string) | Display label |
| `image` | required (string) | Icon image filename from /Profile/Images directory |
| `recess` | optional (boolean) | Whether icon is recessed |
| `enabled` | optional (boolean) | Whether the icon is enabled |
| `visible` | optional (boolean) | Whether the icon is visible |
| `bind` | optional (array) | Data binding configuration |

**Basic Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              recess: false
              label: "Motor Controller"
              enabled: true
```

**Data Binding Example:**

Icons can bind to data sources to dynamically update their appearance and state:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              label: "Motor Controller"
              enabled: true
              bind:
                - target: enabled
                  source: '{COMPONENT_NAME}.Status.Online'
                  toType: boolean
                - target: image
                  source: '{COMPONENT_NAME}.Status.IconFile'
                  toType: string
```

**Conditional Visibility Example:**

Control icon visibility based on system state or conditions:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: warning_icon.svg
              label: "Warning Indicator"
              visible: true
              bind:
                - target: visible
                  source: '{COMPONENT_NAME}.Status.HasWarning'
                  toType: boolean
          - icon:
              image: error_icon.svg
              label: "Error Indicator"
              visible: false
              bind:
                - target: visible
                  source: '{COMPONENT_NAME}.Status.HasError'
                  toType: boolean
                - target: enabled
                  source: '{COMPONENT_NAME}.Status.Online'
                  toType: boolean
```

**Recessed Icon Example:**

Recessed icons have a different visual appearance (appearing inset). Use recessed icons for inactive or secondary states:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              label: "Active Motor Controller"
              recess: false
              enabled: true
          - icon:
              image: nav_motorcontrollers_active.svg
              label: "Inactive Motor Controller"
              recess: true
              enabled: false
```

**Recessed Icon with Data Binding:**

Dynamically control whether an icon is recessed based on component state:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              label: "Motor Controller Status"
              enabled: true
              bind:
                - target: recess
                  source: '{COMPONENT_NAME}.Status.IsActive'
                  toType: boolean
                  transform: |
                    function(value) {
                      return !value; // Recessed when not active
                    }
                - target: enabled
                  source: '{COMPONENT_NAME}.Status.Online'
                  toType: boolean
```

**Complete Example with All Features:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              id: "main-icon"
              class: "status-icon"
              image: nav_motorcontrollers_active.svg
              label: "Motor Controller"
              recess: false
              enabled: true
              visible: true
              bind:
                - target: enabled
                  source: '{COMPONENT_NAME}.Status.Online'
                  toType: boolean
                - target: visible
                  source: '{COMPONENT_NAME}.Status.IsVisible'
                  toType: boolean
                - target: recess
                  source: '{COMPONENT_NAME}.Status.IsActive'
                  toType: boolean
                  transform: |
                    function(value) {
                      return !value;
                    }
```
