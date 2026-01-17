---
title: Profile Directories
---

# Profile Directories

Profinity provides profile-specific directories for organizing dashboard assets. These directories allow you to store images, stylesheets, and content files that can be referenced in your dashboard YAML configurations.

## Overview

When working with dashboards, you'll often need to reference external assets like images, custom CSS styles, or HTML templates. Profinity automatically serves files from three special directories in your profile:

- **`/Profile/Images`** - Store images used in dashboards (icons, interactive images, etc.)
- **`/Profile/Styles`** - Store custom CSS stylesheets
- **`/Profile/Content`** - Store general content files (HTML snippets, templates, etc.)

All assets in these directories are automatically served by Profinity and can be referenced in your dashboard YAML files by filename only (not full paths).

## Directory Structure

Your profile directory structure will look like this:

```text
Profile/
├── Images/
│   ├── nav_custom_active.svg
│   ├── battery-icon.png
│   ├── device-diagram.png
│   └── custom-logo.svg
├── Styles/
│   ├── custom-dashboard.css
│   └── theme-override.css
└── Content/
    ├── header-template.html
    └── footer-snippet.html
```

## /Profile/Images

The `/Profile/Images` directory is used to store all image files that you want to use in your dashboards. Images are referenced by filename only in your YAML configuration.

### What to Store in /Profile/Images

- **Icons** - SVG or PNG files for component icons, navigation icons, status indicators
- **Interactive Images** - Base images for interactive image components with regions and data overlays
- **Logos and Branding** - Company logos, device images, system diagrams
- **Background Images** - Custom backgrounds for dashboard sections (when using HTML components)

### Examples

**Using Icons in Pill Components:**

```yaml
pill:
  icon:
    image: nav_battery_active.svg
    recess: false
```

**Using Icons in Icon Components:**

```yaml
icon:
  image: nav_motorcontrollers_active.svg
  label: "Motor Controller"
  recess: false
```

**Using Images in Interactive Image Components:**

```yaml
image:
  value:
    image: device-diagram.png
    regions:
      - id: "battery-region"
        coordinates: "xywh=100,100,200,150"
        action: "navigate"
        target: "/component?componentId=Battery%20Pack"
```

**Using Images in HTML Components:**

```yaml
html:
  content: |
    <div class="info-box">
      <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
      <p>System overview diagram</p>
    </div>
```

### Image Formats

Profinity supports common image formats:
- **SVG** - Vector graphics (recommended for icons and logos)
- **PNG** - Raster graphics with transparency support
- **JPG/JPEG** - Raster graphics for photographs
- **GIF** - Animated or static raster graphics

!!! tip "SVG for Icons"
    SVG files are recommended for icons as they scale perfectly at any size and are typically smaller than raster formats.

## /Profile/Styles

The `/Profile/Styles` directory is used to store custom CSS stylesheets that can be linked in your HTML components or applied to dashboard elements.

### What to Store in /Profile/Styles

- **Custom Dashboard Styles** - CSS to style specific dashboard sections or components
- **Theme Overrides** - Custom styles that override default Profinity styling
- **Component-Specific Styles** - CSS targeting specific component types or classes
- **Responsive Styles** - Media queries for different screen sizes

### Examples

**Linking Stylesheets in HTML Components:**

```yaml
html:
  content: |
    <link rel="stylesheet" href="/Profile/Styles/custom-dashboard.css" />
    <div class="custom-panel">
      <h2>Custom Styled Content</h2>
      <p>This content uses custom CSS from /Profile/Styles</p>
    </div>
```

**Using Styles with CSS Classes:**

In your dashboard YAML, you can apply classes that reference styles in your CSS file:

```yaml
group:
  class: "custom-info-box"
  items:
    - readouts:
        items:
          - readout:
              label: "Temperature"
              value: 25.5
```

Then in `/Profile/Styles/custom-dashboard.css`:

```css
.custom-info-box {
  background-color: #f0f0f0;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 1rem;
}

.custom-info-box .readout {
  font-size: 1.2em;
  color: #333;
}
```

### CSS Best Practices

- Use descriptive class names that clearly indicate their purpose
- Keep styles modular - create separate CSS files for different purposes
- Use CSS variables for consistent theming across multiple stylesheets
- Test styles on different screen sizes to ensure responsive design

## /Profile/Content

The `/Profile/Content` directory is used to store HTML snippets, templates, or other content files that can be referenced or included in your dashboard HTML components.

### What to Store in /Profile/Content

- **HTML Templates** - Reusable HTML structures for common dashboard sections
- **Content Snippets** - Small HTML fragments that can be included in multiple places
- **Markdown Content** - Documentation or help text (if using markdown parsers in HTML)
- **Configuration Templates** - HTML forms or configuration interfaces

### Examples

**Referencing Content Files:**

While you can't directly include files from `/Profile/Content` in YAML, you can reference them in HTML components:

```yaml
html:
  content: |
    <div class="dashboard-header">
      <!-- Reference external content -->
      <object data="/Profile/Content/header-template.html" type="text/html"></object>
      <h1>Dashboard Title</h1>
    </div>
```

**Using Content for Dynamic Loading:**

```yaml
html:
  content: |
    <div id="content-container">
      <script>
        // Load content from Profile/Content directory
        fetch('/Profile/Content/help-text.html')
          .then(response => response.text())
          .then(html => {
            document.getElementById('content-container').innerHTML = html;
          });
      </script>
    </div>
```

### Content File Best Practices

- Keep content files small and focused on a single purpose
- Use semantic HTML for better accessibility
- Include proper encoding declarations if using special characters
- Document the expected structure if templates are meant to be reused

## File References in Dashboard YAML

### Referencing by Filename Only

When referencing files from these directories in your YAML configuration, use only the filename:

**Correct:**
```yaml
icon:
  image: nav_battery_active.svg
```

**Incorrect:**
```yaml
icon:
  image: /Profile/Images/nav_battery_active.svg  # Don't use full paths
```

### Path Resolution

Profinity automatically resolves file references based on the file type:

- Files with image extensions (`.svg`, `.png`, `.jpg`, etc.) are looked up in `/Profile/Images`
- Files referenced in HTML `href` or `src` attributes should use the full path (`/Profile/Styles/filename.css`)
- Files in HTML components that reference external resources should use the full path

**Full Paths in HTML:**
```yaml
html:
  content: |
    <link rel="stylesheet" href="/Profile/Styles/custom.css" />
    <img src="/Profile/Images/logo.png" alt="Logo" />
    <object data="/Profile/Content/template.html"></object>
```

**Filename Only in Component Properties:**
```yaml
pill:
  icon:
    image: nav_battery_active.svg  # Just the filename
```

## Common Use Cases

### Custom Branding

Store your company logo and branding assets in `/Profile/Images` and reference them in dashboards:

```yaml
html:
  content: |
    <div class="header">
      <img src="/Profile/Images/company-logo.svg" alt="Company Logo" />
      <h1>Custom Dashboard</h1>
    </div>
```

### Themed Dashboards

Create custom CSS themes in `/Profile/Styles` to match your organization's brand:

```yaml
html:
  content: |
    <link rel="stylesheet" href="/Profile/Styles/brand-theme.css" />
    <div class="branded-panel">
      <!-- Themed content -->
    </div>
```

### Reusable Components

Store reusable HTML templates in `/Profile/Content` for consistent dashboard sections:

```yaml
html:
  content: |
    <div class="info-section">
      <!-- Include common header -->
      <iframe src="/Profile/Content/common-header.html" frameborder="0"></iframe>
      <div class="main-content">
        <!-- Dashboard content -->
      </div>
    </div>
```

## Tips and Best Practices

1. **Organize Files Logically** - Use subdirectories within Images, Styles, and Content if you have many files
2. **Use Descriptive Filenames** - Name files clearly so they're easy to identify and reference
3. **Optimize File Sizes** - Compress images and minify CSS for better performance
4. **Version Control** - Keep track of asset changes, especially when working in teams
5. **Document Assets** - Maintain a README or documentation about what each asset is used for
6. **Test References** - Verify all file references work after deploying dashboards

## Related Documentation

- [Core Elements](./Core_Elements.md) - Understanding dashboard structure
- [HTML Component](./Component_Reference/Interactive/HTML.md) - Using HTML components with profile assets
- [Icon Component](./Component_Reference/Interactive/Icon.md) - Displaying icons from /Profile/Images
- [Image Component](./Component_Reference/Interactive/Image.md) - Interactive images from /Profile/Images
