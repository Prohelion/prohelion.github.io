---
title: Profile Directories
description: "Special profile directories for storing dashboard assets: images, 3D models, stylesheets, and content files, plus the other directories in a profile."
---

# Profile Directories

Profinity provides profile-specific directories for the images, 3D models, stylesheets and content files that dashboard YAML references. This page describes each directory, how dashboard YAML refers to the files in it, and the other directories in a profile.

Profinity serves files from four directories in the profile: **`/Profile/Images`** for images used in dashboards such as icons and interactive images, **`/Profile/Models`** for 3D model files used by the [Model](./Component_Reference/Interactive/Model.md) component, **`/Profile/Styles`** for custom CSS stylesheets, and **`/Profile/Content`** for general content files such as HTML snippets and templates. Component properties in dashboard YAML refer to these files by filename only, while HTML component content uses the full path, as described in [File References in Dashboard YAML](#file-references-in-dashboard-yaml).

## Directory Structure

The asset directories sit in the profile folder, which is `profiles/<profile name>` in the [artefacts directory](../../Installation/Artifacts_Directory.md):

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

Files are added by copying them into these folders on the Profinity host. The Example Profile that ships with Profinity contains `images`, `styles` and `dashboards`, so create the `models` or `content` folder beside them before adding files to either. Profinity stores the directories with lowercase names (`images`, `models`, `styles`, `content`) and serves them from the capitalised URL paths `/Profile/Images`, `/Profile/Models`, `/Profile/Styles` and `/Profile/Content`, which are the paths used throughout this page.

## /Profile/Images

The `/Profile/Images` directory holds icons, base images for interactive images, logos, system diagrams and background images for HTML components, and component properties reference them by filename only. SVG suits icons and logos because it scales to any size.

The image library of the profile lists and uploads files with the extensions `.svg`, `.png`, `.jpg`, `.jpeg` and `.webp`, and an uploaded image can be up to 2 MB. When a dashboard names an image, the web interface looks for it first among the images built into Profinity and only then in `/Profile/Images`, so a profile image with the same name as a built-in image, such as the `nav_*` navigation icons, is never used. Give profile images unique names.

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

The background image is the `image` property of the `image` component, and it is a filename only. The `x`, `y`, `width`, and `height` of a region are percentages of the image size, and a region `action` is an object with an `invoke` value of `Navigate`, `Component`, `System`, or `Endpoint`. For a step-by-step procedure see [How to Add Images to a Dashboard](../../How_To_Guides/Add_Images_to_Dashboard.md).

An HTML component uses the full path instead:

```yaml
html:
  content: |
    <div class="info-box">
      <img src="/Profile/Images/system-diagram.svg" alt="System Diagram" />
      <p>System overview diagram</p>
    </div>
```

## /Profile/Models

The `/Profile/Models` directory holds the 3D model files, in `.glb`, `.gltf`, `.stl` or `.obj` format, that the [Model](./Component_Reference/Interactive/Model.md) component displays. The component references a model by its filename relative to the directory, including any subfolder, for example `engine.glb`. A model that uses external texture files needs them stored beside it with the same folder structure, or the textures do not load.

```yaml
model:
  models:
    - model: engine.glb
```

The [Model](./Component_Reference/Interactive/Model.md) page lists the full set of parameters, overlays and a complete example.

## /Profile/Styles

The `/Profile/Styles` directory holds custom CSS stylesheets that the web interface applies to dashboard elements through the `class` parameter and the `class` attribute of HTML content. The web interface loads only the file named `profile.css` from the directory, and that file can load other stylesheets in the directory with the CSS `@import` rule. The HTML sanitiser removes a `link` element from the `content` of an HTML component, so a stylesheet cannot be linked from the HTML.

```css
/* /Profile/Styles/profile.css */
@import url("custom-dashboard.css");
@import url("theme-override.css");
```

A dashboard then applies the rules with the `class` attribute, on an HTML component or on any component that takes a `class`:

```yaml
html:
  content: |
    <div class="custom-panel">
      <h2>Custom Styled Content</h2>
      <p>This content uses custom CSS from /Profile/Styles</p>
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

The rule for the group goes in `/Profile/Styles/custom-dashboard.css`, which `profile.css` imports:

```css
.custom-info-box {
  background-color: #f0f0f0;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 1rem;
}
```

## /Profile/Content

The `/Profile/Content` directory holds HTML snippets and templates that an HTML component shows. Files from this directory cannot be included directly in YAML, and the HTML sanitiser removes the `object`, `embed`, `script` and `form` elements. An HTML component therefore shows a content file in an `iframe` or links to it with an `a` element, and a Markdown file shown this way is not rendered as formatted text, because Profinity has no Markdown renderer for dashboards.

```yaml
html:
  content: |
    <div class="dashboard-header">
      <h1>Dashboard Title</h1>
      <iframe src="/Profile/Content/header-template.html" width="100%" height="120"></iframe>
      <a href="/Profile/Content/help-text.html" target="_blank">Open the help text</a>
    </div>
```

## Other Profile Directories

A profile holds further directories that are not served as dashboard assets. They are managed through the web interface and the API, and they are listed here so that the whole profile layout is in one place. Profinity also serves the `/Profile/CANLogs` and `/Profile/TagLogs` paths for logged data, which are access controlled and are not used by dashboards.

| Directory | Contents | More information |
|-----------|----------|------------------|
| `dashboards` | Dashboard YAML for the profile and its components | [Dashboards](./index.md) |
| `components` | One subfolder for each component, holding that component's `rules.yaml` and dashboard files | [Custom Components](../../Developing_with_Profinity/Custom_Components/index.md) |
| `rules` | Alert rules | [Alerts](../../Tags/Alerts.md) |
| `collections` | Tag collections | [Collections](../../Tags/Collections.md) |
| `scripts` | Scripts that run in the profile | [Scripting](../../Developing_with_Profinity/Scripting/index.md) |
| `firmware` | Firmware files and firmware settings | Not applicable to dashboards |
| `dbc` | DBC files that describe CAN messages | Not applicable to dashboards |

## File References in Dashboard YAML

A component property such as `image` takes the filename only, and Profinity resolves it by file type, so a name with an image extension is looked up as described under [/Profile/Images](#profileimages). Use the filename alone in a component property:

```yaml
icon:
  image: custom-icon.svg   # Correct: the filename only
```

```yaml
# Avoid - do not use full paths in component properties
icon:
  image: /Profile/Images/custom-icon.svg
```

Files referenced from within an HTML component, such as in `href` or `src` attributes, are not resolved this way and must use the full path, for example `/Profile/Content/filename.html`. Subfolders can organise a large number of files within a directory.
