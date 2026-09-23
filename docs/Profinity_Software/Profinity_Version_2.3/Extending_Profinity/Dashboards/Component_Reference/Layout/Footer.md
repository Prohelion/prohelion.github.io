---
title: Footer Component
---

# Footer

Bottom section with navigation menus. The footer provides additional navigation options and system information.

<figure markdown>
![Dashboard footer component with navigation menus and controls](../../images/footer.png)
<figcaption>Dashboard footer component with navigation menus and controls</figcaption>
</figure>

**Best for:** Additional navigation, system information, help links, secondary actions

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | optional (string) | Unique identifier for the footer |
| `class` | optional (string) | CSS class for styling |
| `visible` | optional (boolean) | Whether the footer is visible |
| `menu` | optional (object) | Navigation menu |
| `bind` | optional (array) | Data binding configuration |

**Example:**

``` yaml
dashboard:
  items:
    - footer:
        menu:
          items:
            - menuitem:
                label: "About"
                navigate: "/about"
            - menuitem:
                label: "Contact"
                navigate: "/contact"
```
