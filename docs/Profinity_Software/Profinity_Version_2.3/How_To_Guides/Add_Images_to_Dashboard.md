---
title: How to add images to your dashboard
description: "Add SVG, PNG, JPG, WEBP, or GIF images to a Profinity dashboard by placing them in the images folder of the profile directory and referencing them by name."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to add images to your dashboard

Add custom images to your dashboards by placing them in the `images` folder of the profile directory, which Profinity serves at `/Profile/Images`.
You need access to the `images` folder of your [profile's](../Getting_Started/Profiles.md) directory, image files in a supported format (SVG, PNG, JPG, WEBP, or GIF), and a dashboard to edit.

## Place the image file

Each profile has its own directory, which is `profiles/<profile name>` inside the [artefacts directory](../Installation/Artifacts_Directory.md), so the images for a profile named `Example Profile` are in `<artefacts directory>/profiles/Example Profile/images`.
The artefacts directory is:

- `%LOCALAPPDATA%\Prohelion\Profinity` on Windows
- `~/Library/Application Support/Prohelion/Profinity` on macOS
- `/var/lib/prohelion/profinity` on Linux
- On Docker, the path inside the container named by `PROFINITY_HOME`, so on Docker the image must be copied into the mounted volume that holds that directory

To place the file:

1. Open the `images` folder of the profile directory. If the folder does not exist, create it, using the lowercase name, because Linux and Docker file systems are case-sensitive and Profinity serves only the lowercase folder (refer to [Store dashboard files in a profile](../Customising_Profinity/Dashboards/Store_Dashboard_Files.md)).
2. Copy the image file into the folder.

```text
<profile name>/
└── images/
    ├── company-logo.svg
    ├── device-icon.png
    └── custom-banner.jpg
```

Profinity serves the folder of the active profile when a browser requests a file, so a new image does not need a restart.

## Reference the image in a component

In an [Icon](../Customising_Profinity/Dashboards/Component_Reference/Content/Icon.md) component, or the icon of a pill component, set `image` to the filename only:

```yaml
icon:
  image: device-icon.png  # Use filename only
```

In an HTML component, reference the file by its full path, which uses the capitalised URL form `/Profile/Images`:

```yaml
html:
  content: |
    <img src="/Profile/Images/custom-banner.jpg" alt="Banner" />
```

In an [Image](../Customising_Profinity/Dashboards/Component_Reference/Images_and_Models/Image.md) component, which shows an interactive image, set `value.image` to the filename only:

```yaml
image:
  value:
    image: device-diagram.png  # Use filename only
```

## Check the image

Save the dashboard, and the image appears in it.
If the image area stays empty, one of these causes applies:

- The filename in the dashboard differs from the file in the `images` folder, because the match is case-sensitive.
- The file format is not one of SVG, PNG, JPG, WEBP, or GIF.
- The file is in a folder other than the active profile's `images` folder.

Correct the name, convert the file or move it, and save again.

## Image format recommendations

- SVG is best for icons and logos, because it scales without loss of quality and has a smaller file size.
- PNG suits images with transparency.
- JPG suits photographs.
- WEBP suits photographs and images with transparency at a smaller file size.
- GIF suits animated images. A GIF copied into the `images` folder is served and displays in a dashboard, but the image library in the visual editor lists and uploads only SVG, PNG, JPG, and WEBP files, so place GIF files in the folder by hand.
