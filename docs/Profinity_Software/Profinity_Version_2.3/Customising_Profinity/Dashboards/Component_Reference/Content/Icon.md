---
title: Icon component
description: "Display an icon from the Carbon icon set or the profile images directory."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Icon component

An icon is a single graphic that displays an icon from the [Carbon icon library](https://carbondesignsystem.com/elements/icons/library/), an icon filename, or an image from the `/Profile/Images` directory.

<figure markdown>
![A small grey car icon with a signal-bars symbol above its roof.](../../images/icon.png)
<figcaption>Icon component displaying an icon from the Profile Images directory</figcaption>
</figure>

Use an icon to display a graphic, a status indicator, or another visual element.
Use [Actions](../Interactive/Actions.md) when the icon must be a button, and the `image` parameter of the component itself when an icon is needed inside another component.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not normally needed. The value is used only when `image` does not resolve to an icon, and it is not a general styling class |
| `label` | string | No | None | Not used by the web interface |
| `image` | string | Yes | None | Icon name such as `BatteryCharging`, an icon filename such as `nav_motorcontrollers_active.svg`, or the filename of an image in the `/Profile/Images` directory |
| `recess` | boolean | No | `false` | When `true`, the icon is displayed in a recessed (inset) frame at a larger size |
| `enabled` | boolean | No | `true` | Not used by the web interface |
| `visible` | boolean | No | `true` | Not used by the web interface |
| `bind` | array | No | None | Data binding. Only the `value` target is handled, and the value is limited to the range `0` to `1`. The value has no visible effect on an icon that is drawn from `image` |

A name that matches no known icon is loaded as an image file, so a misspelt icon name does not show the icon.

## Example

A basic icon from an icon filename:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: nav_motorcontrollers_active.svg
              recess: false
```

A Carbon icon by name:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: BatteryCharging
```

An image that is not a known icon is loaded from the `/Profile/Images` directory:

``` yaml
dashboard:
  items:
    - row:
        items:
          - icon:
              image: custom-logo.png
```

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
