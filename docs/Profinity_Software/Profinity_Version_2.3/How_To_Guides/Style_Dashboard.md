---
title: How to Style Your Dashboard
description: "Apply custom CSS styling to Profinity dashboard elements for branding and visual customisation."
---

# How to Style Your Dashboard

Apply custom CSS styling to your dashboard elements for branding and visual customisation.

## Prerequisites

- Profinity V2 installed
- A dashboard to style
- Basic CSS knowledge
- Access to the [profile](../Getting_Started/Profiles.md) directory's `Styles` folder

## Steps

### Step 1: Create CSS File

1. Navigate to your profile directory
2. Go to the `Styles` folder (create it if needed)
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

### Step 3: Load the CSS

The HTML sanitiser removes `link` elements from the `content` of an [HTML](../Customising_Profinity/Dashboards/Component_Reference/Interactive/HTML.md) component, so a stylesheet cannot be linked from the dashboard. Instead, import it from `/Profile/Styles/profile.css`, which the web interface loads when the file is present:

```css
/* /Profile/Styles/profile.css */
@import url("custom-dashboard.css");
```

### Step 4: Apply CSS Classes

Use the `class` property in dashboard [components](../Customising_Profinity/Dashboards/Component_Reference/index.md):

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
2. Verify the CSS file is loaded
3. Check elements are styled correctly
4. Test on different screen sizes

## Tips

- **Use Descriptive Class Names**: name classes clearly
- **Keep Styles Modular**: use separate CSS files for different purposes
- **Test Responsive**: ensure styles work on different screen sizes
- **Use CSS Variables**: use them for consistent theming

## Related Documentation

- [Profile Directories](../Customising_Profinity/Dashboards/Profile_Directories.md) - the full profile directories reference
- [HTML Component](../Customising_Profinity/Dashboards/Component_Reference/Interactive/HTML.md) - HTML component reference
- [Conditional Styling](../Customising_Profinity/Dashboards/Conditional_Styling.md) - styling driven by data values
