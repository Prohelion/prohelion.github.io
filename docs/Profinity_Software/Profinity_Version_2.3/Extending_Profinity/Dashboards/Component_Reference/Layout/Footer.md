---
title: Footer Component
description: "Bottom section with navigation menus providing additional navigation and system information."
---

# Footer

Bottom section of the dashboard. The web interface displays the footer bar and can show and hide it, although it does not display the content of the `menu` parameter.

<figure markdown>
![Dashboard footer component with navigation menus and controls](../../images/footer.png)
<figcaption>Dashboard footer component with navigation menus and controls</figcaption>
</figure>

**Best for:** Showing or hiding the footer bar of a dashboard from a data binding

**When not to use:** To provide navigation links, help links or actions, because the web interface does not display `menu` items in the footer. Use the [Titlebar](Titlebar.md) menu or an [Action](../Interactive/Actions.md) component instead

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | No | None | Not used by the web interface |
| `class` | string | No | None | Not used by the web interface |
| `visible` | boolean | No | `true` | When `false`, or when bound to `false`, the footer is hidden |
| `menu` | object | No | None | Not used by the web interface. The footer is displayed without the menu content |
| `bind` | array | No | None | Data binding. The `visible` target shows and hides the footer |

**Example:**

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
