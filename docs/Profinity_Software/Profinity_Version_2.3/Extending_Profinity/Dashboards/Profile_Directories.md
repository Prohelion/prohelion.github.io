---
title: Profile Directories
description: "Special profile directories for storing dashboard assets: images, stylesheets, and content files."
---

# Profile Directories

Profinity provides profile-specific directories for organising dashboard assets, which store the images, stylesheets, and content files that dashboard YAML configurations reference.

## Overview

Dashboards often reference external assets such as images, custom CSS styles, or HTML templates, and Profinity automatically serves files from three special directories in the profile:

- **`/Profile/Images`** - Store images used in dashboards (icons, interactive images, etc.)
- **`/Profile/Styles`** - Store custom CSS stylesheets
- **`/Profile/Content`** - Store general content files (HTML snippets, templates, etc.)

All assets in these directories are automatically served by Profinity. Component properties in dashboard YAML reference them by filename only (not full paths), while HTML component content uses the full path, as described in [File References in Dashboard YAML](#file-references-in-dashboard-yaml).

## Directory Structure

The profile directory structure is as follows:

```text
Profile/
├── Images/
│   ├── nav_custom_active.svg
│   ├── battery-icon.png
│   ├── device-diagram.png
│   └── custom-logo.svg
├── Styles/
│   ├── profile.css
│   ├── custom-dashboard.css
│   └── theme-override.css
└── Content/
    ├── header-template.html
    └── footer-snippet.html
```

## /Profile/Images

The `/Profile/Images` directory stores all image files used in dashboards, and component properties reference them by filename only.

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
  items:
    - pillgroup:
        items:
          - value:
              label: "Battery"
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
  image: device-diagram.png
  regions:
    - id: "battery-region"
      x: 20
      y: 25
      width: 30
      height: 20
      action:
        invoke: Navigate
        target: "/component?componentId=Battery%20Pack"
```

The background image is the `image` property of the `image` component, and it is a filename only. The `x`, `y`, `width`, and `height` of a region are percentages of the image size, and a region `action` is an object with an `invoke` value of `Navigate`, `Component`, `System`, or `Endpoint`.

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
    SVG files are recommended for icons because they scale to any size and are typically smaller than raster formats.

## /Profile/Styles

The `/Profile/Styles` directory is used to store custom CSS stylesheets that the web interface applies to dashboard elements through the `class` parameter and the `class` attribute of HTML content. The web interface loads only the file named `profile.css` from the directory, and that file can load other stylesheets in the directory with the CSS `@import` rule.

### What to Store in /Profile/Styles

- **Custom Dashboard Styles** - CSS to style specific dashboard sections or components
- **Theme Overrides** - Custom styles that override default Profinity styling
- **Component-Specific Styles** - CSS targeting specific component types or classes
- **Responsive Styles** - Media queries for different screen sizes

### Examples

**Loading Stylesheets:**

The HTML sanitiser removes a `link` element from the `content` of an HTML component, so a stylesheet is not linked from the HTML. Place the rules in `/Profile/Styles/profile.css`, which the web interface loads when the file is present, and import further files from it:

```css
/* /Profile/Styles/profile.css */
@import url("custom-dashboard.css");
@import url("theme-override.css");
```

Then apply the rules with the `class` attribute:

```yaml
html:
  content: |
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

Then in `/Profile/Styles/custom-dashboard.css`, which `profile.css` imports:

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

Files from `/Profile/Content` cannot be included directly in YAML, and the HTML sanitiser removes the `object`, `embed` and `script` elements, so an HTML component shows a content file in an `iframe` or links to it with an `a` element:

```yaml
html:
  content: |
    <div class="dashboard-header">
      <h1>Dashboard Title</h1>
      <iframe src="/Profile/Content/header-template.html" width="100%" height="120"></iframe>
      <a href="/Profile/Content/help-text.html" target="_blank">Open the help text</a>
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
# Avoid - do not use full paths in component properties
icon:
  image: /Profile/Images/nav_battery_active.svg
```

### Path Resolution

Profinity automatically resolves file references in component properties based on the file type, so files with image extensions (`.svg`, `.png`, `.jpg`, and so on) are looked up in `/Profile/Images`. Files referenced from within an HTML component, such as in `href` or `src` attributes, are not resolved this way and must use the full path (for example, `/Profile/Content/filename.html`).

**Full Paths in HTML:**
```yaml
html:
  content: |
    <img src="/Profile/Images/logo.png" alt="Logo" />
    <iframe src="/Profile/Content/template.html" width="100%" height="120"></iframe>
    <a href="/Profile/Content/help-text.html" target="_blank">Help</a>
```

**Filename Only in Component Properties:**
```yaml
pill:
  icon:
    image: nav_battery_active.svg  # Just the filename
  items:
    - pillgroup:
        items:
          - value:
              label: "Battery"
```

## Common Use Cases

### Custom Branding

Company logos and branding assets are stored in `/Profile/Images` and referenced in dashboards:

```yaml
html:
  content: |
    <div class="header">
      <img src="/Profile/Images/company-logo.svg" alt="Company Logo" />
      <h1>Custom Dashboard</h1>
    </div>
```

### Themed Dashboards

Custom CSS themes in `/Profile/Styles` match a dashboard to an organisation's brand, by importing the theme from `profile.css` with `@import url("brand-theme.css");` and applying its classes:

```yaml
html:
  content: |
    <div class="branded-panel">
      <!-- Themed content -->
    </div>
```

### Reusable Components

Reusable HTML templates in `/Profile/Content` give dashboard sections a consistent structure:

```yaml
html:
  content: |
    <div class="info-section">
      <!-- Include common header -->
      <iframe src="/Profile/Content/common-header.html" width="100%" height="80"></iframe>
      <div class="main-content">
        <!-- Dashboard content -->
      </div>
    </div>
```

## Tips and Best Practices

- **Organise Files Logically** - Use subdirectories within Images, Styles, and Content if there are many files
- **Use Descriptive Filenames** - Name files clearly so they are easy to identify and reference
- **Optimise File Sizes** - Compress images and minify CSS for better performance
- **Version Control** - Keep track of asset changes, especially when working in teams
- **Document Assets** - Maintain a README or documentation about what each asset is used for
- **Test References** - Verify all file references work after deploying dashboards

## Related Documentation

- [Core Elements](./Core_Elements.md) - Understanding dashboard structure
- [HTML Component](./Component_Reference/Interactive/HTML.md) - Using HTML components with profile assets
- [Icon Component](./Component_Reference/Interactive/Icon.md) - Displaying icons from /Profile/Images
- [Image Component](./Component_Reference/Interactive/Image.md) - Interactive images from /Profile/Images
