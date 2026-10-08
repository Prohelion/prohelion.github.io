---
title: Footer Component
description: "Bar at the bottom of a dashboard that the web interface shows or hides from a data binding, without displaying menu content."
---

# Footer

The footer is the bar at the bottom of a dashboard. The web interface displays the bar and can show and hide it from a [data binding](../../Data_Binding.md), but it does not display the content of the `menu` parameter.

<figure markdown>
![Dashboard footer bar](../../images/footer.png)
<figcaption>Dashboard footer bar</figcaption>
</figure>

## When to Use

Use the footer to show or hide the bar at the bottom of a dashboard from a data binding. Do not use it for navigation links, help links or actions, because the web interface does not display `menu` items in the footer. Use the [Titlebar](Titlebar.md) menu or an [Action](../Interactive/Actions.md) component instead.

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `visible` | boolean | No | `true` | When `false`, or when bound to `false`, the footer is hidden |
| `menu` | object | No | None | Not used by the web interface. The footer is displayed without the menu content |
| `bind` | array | No | None | Data binding. The `visible` target shows and hides the footer |

!!! info "Footer Menu Content Is Not Displayed"
    A footer that has a `menu` appears as an empty bar, because the web interface does not display menu items in the footer.

## Example

``` yaml
dashboard:
  items:
    - footer:
        visible: true
        bind:
          - target: visible
            source: 'DBC/Settings/ShowFooter'
            toType: boolean
```
