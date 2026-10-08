---
title: How to Add Images to Your Dashboard
description: "Add custom images (SVG, PNG, JPG, WEBP, GIF) to your Profinity dashboards by storing them in the images folder of the profile directory."
---

# How to Add Images to Your Dashboard

Add custom images to your dashboards by placing them in the `images` folder of the profile directory, which Profinity serves at `/Profile/Images`.

## Prerequisites

- Access to the `images` folder of your [profile's](../Getting_Started/Profiles.md) directory
- Image files in supported formats (SVG, PNG, JPG, WEBP, GIF)
- A dashboard to edit

## Place the Image File

Each profile has its own directory, which is `profiles/<profile name>` inside the [artefacts directory](../Installation/Artifacts_Directory.md), so the images for a profile named `Example Profile` are in `<artefacts directory>/profiles/Example Profile/images`. The artefacts directory is `%LOCALAPPDATA%\Prohelion\Profinity` on Windows, `~/.local/share/Prohelion/Profinity` on macOS and `/var/lib/prohelion/profinity` on Linux, and on Docker it is the path inside the container named by `PROFINITY_HOME`, so on Docker the image must be copied into the mounted volume that holds that directory. Create the `images` folder if it does not exist, using the lowercase name, because Linux and Docker file systems are case-sensitive and Profinity serves only the lowercase folder (see [Profile Directories](../Customising_Profinity/Dashboards/Profile_Directories.md)), and copy the image file into it:

```text
<profile name>/
└── images/
    ├── company-logo.svg
    ├── device-icon.png
    └── custom-banner.jpg
```

Profinity serves the folder of the active profile when a browser requests a file, so a new image does not need a restart.

## Reference the Image in a Component

In an [Icon](../Customising_Profinity/Dashboards/Component_Reference/Interactive/Icon.md) component, or the icon of a pill component, set `image` to the filename only:

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

In an [Image](../Customising_Profinity/Dashboards/Component_Reference/Interactive/Image.md) component, which shows an interactive image, set `value.image` to the filename only:

```yaml
image:
  value:
    image: device-diagram.png  # Use filename only
```

## Check the Image

Save the dashboard, and the image appears in it. If the image area stays empty, the filename in the dashboard differs from the file in the `images` folder, because the match is case-sensitive, or the file format is not one of SVG, PNG, JPG, WEBP or GIF, or the file is in a folder other than the active profile's `images` folder. Correct the name, convert the file or move it, and save again.

## Image Format Recommendations

- **SVG** is best for icons and logos, because it scales without loss of quality and has a smaller file size.
- **PNG** suits images with transparency.
- **JPG** suits photographs.
- **WEBP** suits photographs and images with transparency at a smaller file size.
- **GIF** suits animated images. A GIF copied into the `images` folder is served and displays in a dashboard, but the image library in the visual editor lists and uploads only SVG, PNG, JPG and WEBP files, so place GIF files in the folder by hand.

## Related Documentation

- [Profile Directories](../Customising_Profinity/Dashboards/Profile_Directories.md) - the full reference for profile directories
- [Icon Component](../Customising_Profinity/Dashboards/Component_Reference/Interactive/Icon.md) - Icon component reference
- [Image Component](../Customising_Profinity/Dashboards/Component_Reference/Interactive/Image.md) - interactive image component reference
