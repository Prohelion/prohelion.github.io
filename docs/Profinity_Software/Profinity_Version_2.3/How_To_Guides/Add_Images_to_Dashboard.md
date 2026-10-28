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

Each profile has its own directory, which is `profiles/<profile name>` inside the [artefacts directory](../Installation/Artifacts_Directory.md#default-locations), so the images for a profile named `Example Profile` are in `<artefacts directory>/profiles/Example Profile/images`.
On Docker, copy the image into the mounted volume that holds the artefacts directory.

To place the file:

1. Open the `images` folder of the profile directory.
   If the folder does not exist, create it with the lowercase name `images`.
   Linux and Docker file systems are case-sensitive, and Profinity serves only the lowercase folder (refer to [Store dashboard files in a profile](../Customising_Profinity/Dashboards/Store_Dashboard_Files.md)).
2. Copy the image file into the folder.

The folder then looks like this:

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

In an HTML component, reference the file by its full path, which starts with `/Profile/Images`, with capital letters:

```yaml
html:
  content: |
    <img src="/Profile/Images/custom-banner.jpg" alt="Banner" />
```

In an [Image](../Customising_Profinity/Dashboards/Component_Reference/Images_and_Models/Image.md) component, which shows an interactive image, set `image` to the filename only:

```yaml
image:
  image: device-diagram.png  # Use filename only
```

## Check the image

Save the dashboard, and the image appears in it.
If the image area stays empty, check these causes:

- The filename in the dashboard differs from the file in the `images` folder, because the match is case-sensitive.
- The file format is not one of SVG, PNG, JPG, WEBP, or GIF.
- The file is in a folder other than the active profile's `images` folder.

Correct the name, convert the file or move it, and save again.

## Image format recommendations

- SVG is best for icons and logos, because it scales without loss of quality and has a smaller file size.
- PNG suits images with transparency.
- JPG suits photographs.
- WEBP suits photographs and images with transparency at a smaller file size.
- GIF suits animated images.
  A GIF in the `images` folder displays in a dashboard.
  The image library in the visual editor lists and uploads only SVG, PNG, JPG, and WEBP files, so place GIF files in the folder by hand.
  [Store dashboard files in a profile](../Customising_Profinity/Dashboards/Store_Dashboard_Files.md#images) describes the library and the size limit.
