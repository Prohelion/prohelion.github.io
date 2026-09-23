---
title: How to Style Your Dashboard
---

# How to Style Your Dashboard

Apply custom CSS styling to your dashboard elements for branding and visual customization.

## Prerequisites

- Profinity V2 installed
- A dashboard to style
- Basic CSS knowledge
- Access to `/Profile/Styles` directory

## Steps

### Step 1: Create CSS File

1. Navigate to your profile directory
2. Go to `Styles` folder (create if needed)
3. Create a CSS file (e.g., `custom-dashboard.css`)

### Step 2: Write Your CSS

Example CSS file:

```css
.custom-panel {
    background-color: #f0f0f0;
    border: 2px solid #007bff;
    border-radius: 8px;
    padding: 1rem;
}

.custom-readout {
    font-size: 1.2em;
    color: #333;
    font-weight: bold;
}

.status-indicator {
    background-color: #28a745;
    color: white;
    padding: 0.5rem;
}
```

### Step 3: Link CSS in Dashboard

**Using HTML Component:**

```yaml
- html:
    content: |
      <link rel="stylesheet" href="/Profile/Styles/custom-dashboard.css" />
      <div class="custom-panel">
        <h2>Styled Content</h2>
      </div>
```

### Step 4: Apply CSS Classes

Use `class` property in dashboard components:

```yaml
- group:
    class: "custom-panel"
    items:
      - readouts:
          items:
            - readout:
                label: "Temperature"
                class: "custom-readout"
```

### Step 5: Verify Styling

1. Save your dashboard
2. Verify CSS file is loaded
3. Check elements are styled correctly
4. Test on different screen sizes

## Tips

- **Use Descriptive Class Names**: Name classes clearly
- **Keep Styles Modular**: Separate CSS files for different purposes
- **Test Responsive**: Ensure styles work on different screen sizes
- **Use CSS Variables**: For consistent theming

## Related Documentation

- [Profile Directories](../Extending_Profinity/Dashboards/Profile_Directories.md) - Complete profile directories guide
- [HTML Component](../Extending_Profinity/Dashboards/Component_Reference/Interactive/HTML.md) - HTML component reference
