---
title: How to Add Images to Your Dashboard
description: "Add custom images (SVG, PNG, JPG, GIF) to your Profinity dashboards by storing them in the profile's Images directory."
---

# How to Add Images to Your Dashboard

Add custom images to your dashboards using the `/Profile/Images` directory.

## Prerequisites

- Access to your profile's Images directory
- Image files in supported formats (SVG, PNG, JPG, GIF)
- A dashboard to edit

## Steps

### Step 1: Place Your Image File

1. Locate your profile directory
2. Navigate to the `Images` folder (create it if needed)
3. Copy your image file into this directory

**Example structure:**
```
Profile/
└── Images/
    ├── company-logo.svg
    ├── device-icon.png
    └── custom-banner.jpg
```

### Step 2: Reference the Image in Components

**For Icons (Pill or Icon components):**
```yaml
icon:
  image: device-icon.png  # Use filename only
```

**For HTML Components:**
```yaml
html:
  content: |
    <img src="/Profile/Images/custom-banner.jpg" alt="Banner" />
```

**For Interactive Image Components:**
```yaml
image:
  value:
    image: device-diagram.png  # Use filename only
```

### Step 3: Verify the Image

1. Save your dashboard
2. The image should appear in your dashboard
3. If the image does not appear, check:
   - File is in `/Profile/Images/` directory
   - Filename matches exactly (case-sensitive)
   - File format is supported

## Image Format Recommendations

- **SVG** - best for icons and logos (scales without loss of quality, smaller file size)
- **PNG** - suited to images with transparency
- **JPG** - suited to photographs
- **GIF** - suited to animated images

## Tips

- Use descriptive filenames for easy identification
- Optimise image file sizes for better performance
- Keep images organised in subdirectories if you have many files
- Test images in the dashboard editor before deploying

## Related Documentation

- [Profile Directories](../Customising_Profinity/Dashboards/Profile_Directories.md) - the full reference for profile directories
- [Icon Component](../Customising_Profinity/Dashboards/Component_Reference/Interactive/Icon.md) - Icon component reference
- [Image Component](../Customising_Profinity/Dashboards/Component_Reference/Interactive/Image.md) - Interactive image component reference
