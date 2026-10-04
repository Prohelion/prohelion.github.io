---
title: Icon Component
description: "Display an icon from the Carbon icon set or the profile images directory."
---

# Icon

Icon component for displaying an icon. The icon is a Carbon icon, a legacy icon filename, or an image from the `/Profile/Images` directory.

<figure markdown>
![Icon component displaying an icon from the Profile Images directory](../../images/icon.png)
<figcaption>Icon component displaying an icon from the Profile Images directory</figcaption>
</figure>

**Best for:** Displaying icons, status indicators, visual elements

**When not to use:** When interactive buttons are needed (use [Actions](Actions.md)) or when icons are needed within other components (use component-specific icon properties)

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Prefix of a legacy sprite CSS class (`{class}_{suffix}`), used only when `image` does not resolve to an icon. It is not a general styling class |
| `label` | string | No | None | Not used by the web interface |
| `image` | string | Yes | None | Carbon icon name, a legacy icon filename such as `nav_motorcontrollers_active.svg`, or the filename of an image in the `/Profile/Images` directory. A name that matches no known icon is loaded as an image file |
| `recess` | boolean | No | `false` | When `true`, the icon is displayed in a recessed (inset) frame at a larger size |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Data binding. Only the `value` target is handled, and the value is limited to the range `0` to `1`. The value has no visible effect on an icon that is drawn from `image` |

**Basic Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              recess: false
```

**Carbon Icon Example:**

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: BatteryCharging
```

**Profile Image Example:**

An image that is not a known icon is loaded from the `/Profile/Images` directory:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: custom-logo.png
```

**Recessed Icon Example:**

Recessed icons appear inset in a larger frame:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              recess: true
```
