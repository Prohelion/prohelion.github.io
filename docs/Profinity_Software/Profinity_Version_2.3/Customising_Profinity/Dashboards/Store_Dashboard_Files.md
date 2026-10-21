---
title: Store dashboard files in a profile
description: "Find where to store dashboard images, 3D models, stylesheets, and content files in a profile, and how dashboard YAML refers to them."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Store dashboard files in a profile

Profinity provides four folders in a profile for the images, 3D models, stylesheets, and content files that dashboard YAML references.
This page describes each folder and how dashboard YAML refers to the files in it.

- `images` holds icons, logos, and other images used in dashboards.
- `models` holds 3D model files for the [3D model](./Component_Reference/Images_and_Models/Model.md) component.
- `styles` holds custom CSS stylesheets.
- `content` holds general content files such as HTML snippets and templates.

Component properties in dashboard YAML refer to these files by filename only, while HTML component content uses the full path, as described in [File references in dashboard YAML](#file-references-in-dashboard-yaml).

## Folder structure

The folders sit in the profile folder, which is `profiles/<profile name>` in the [artefacts directory](../../Installation/Artifacts_Directory.md).
For the other folders in a profile, refer to [Profile folders](../../Administration/Profile_Folders.md).

```text
<profile>/
├── images/
│   ├── custom-icon.svg
│   ├── battery-icon.png
│   ├── device-diagram.png
│   └── custom-logo.svg
├── models/
│   ├── engine.glb
│   └── textures/
│       └── engine-body.png
├── styles/
│   ├── profile.css
│   ├── custom-dashboard.css
│   └── theme-override.css
└── content/
    ├── header-template.html
    └── footer-snippet.html
```

Add files by copying them into these folders on the Profinity host.
Profinity creates the four folders for a new profile.
The Example Profile that ships with Profinity contains only `images` and `styles`, so in that profile create the `models` or `content` folder beside them before adding files to either.

The folder names are lowercase, and Profinity serves each folder at a capitalised URL path: `/Profile/Images`, `/Profile/Models`, `/Profile/Styles` and `/Profile/Content`.
Dashboard YAML uses the URL path only inside HTML component content.

## Images

The `images` folder holds icons, base images for interactive images, logos, system diagrams, and background images for HTML components.
Component properties refer to them by filename only.
Scalable Vector Graphics (SVG) suits icons and logos because it scales to any size.

The image library of the profile lists and uploads files with the extensions `.svg`, `.png`, `.jpg`, `.jpeg` and `.webp`.
An uploaded image can be up to 2 MB.
When a dashboard names an image, the web interface looks for it first among the images built into Profinity and only then in the `images` folder.
A profile image with the same name as a built-in image, such as the `nav_*` navigation icons, is never used, so give profile images unique names.

An icon in a pill, an icon component and an interactive image refer to a file like this:

```yaml
pill:
  icon:
    image: battery-icon.svg
    recess: false
  items:
    - pillgroup:
        items:
          - value:
              label: "Battery"
```

```yaml
icon:
  image: custom-icon.svg
  label: "Motor Controller"
  recess: false
```

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

The background image is the `image` property of the `image` component, and it is a filename only.
The `x`, `y`, `width`, and `height` of a region are percentages of the image size.
A region `action` is an object with an `invoke` value of `Navigate`, `Component`, `System`, or `Endpoint`.
For a step-by-step procedure, refer to [How to add images to your dashboard](../../How_To_Guides/Add_Images_to_Dashboard.md).

An HTML component uses the full path instead:

```yaml
html:
  content: |
    <div class="info-box">
      <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
      <p>System overview diagram</p>
    </div>
```

## Models

The `models` folder holds the 3D model files, in `.glb`, `.gltf`, `.stl` or `.obj` format, that the [3D model](./Component_Reference/Images_and_Models/Model.md) component displays.
The component references a model by its filename relative to the folder, including any subfolder, for example `engine.glb`.
A model that uses external texture files needs them stored beside it with the same folder structure, or the textures do not load.

```yaml
model:
  models:
    - model: engine.glb
```

The [3D model](./Component_Reference/Images_and_Models/Model.md) page lists the parameters, overlays and a complete example.

## Styles

The `styles` folder holds custom CSS stylesheets.
The web interface applies them to dashboard elements through the `class` parameter and the `class` attribute of HTML content.
It loads only the file named `profile.css` from the folder, and that file can load other stylesheets in the folder with the CSS `@import` rule.
The HTML sanitiser removes a `link` element from the `content` of an HTML component, so a stylesheet cannot be linked from the HTML.

```css
/* styles/profile.css */
@import url("custom-dashboard.css");
@import url("theme-override.css");
```

A dashboard applies the rules with the `class` attribute, on an HTML component or on any component that takes a `class`:

```yaml
html:
  content: |
    <div class="custom-panel">
      <h2>Custom Styled Content</h2>
      <p>This content uses custom CSS from the styles folder</p>
    </div>
```

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

The rule for the group goes in `styles/custom-dashboard.css`, which `profile.css` imports:

```css
.custom-info-box {
  background-color: #f0f0f0;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 1rem;
}
```

## Content

The `content` folder holds HTML snippets and templates that an HTML component shows.
Files from this folder cannot be included directly in YAML, and the HTML sanitiser removes the `object`, `embed`, `script` and `form` elements.
An HTML component therefore shows a content file in an `iframe` or links to it with an `a` element.
A Markdown file shown this way is not rendered as formatted text, because dashboards have no Markdown renderer.

```yaml
html:
  content: |
    <div class="dashboard-header">
      <h1>Dashboard Title</h1>
      <iframe src="/Profile/Content/header-template.html" width="100%" height="120"></iframe>
      <a href="/Profile/Content/help-text.html" target="_blank">Open the help text</a>
    </div>
```

## File references in dashboard YAML

A component property such as `image` takes the filename only, and Profinity resolves it by file type.
A name with an image extension is looked up as described under [Images](#images).
Use the filename alone in a component property:

```yaml
icon:
  image: custom-icon.svg   # Correct: the filename only
```

```yaml
# Avoid - do not use full paths in component properties
icon:
  image: /Profile/Images/custom-icon.svg
```

Files referenced from within an HTML component, such as in `href` or `src` attributes, are not resolved this way and must use the full URL path, for example `/Profile/Content/filename.html`.
Subfolders can organise a large number of files within a folder.
