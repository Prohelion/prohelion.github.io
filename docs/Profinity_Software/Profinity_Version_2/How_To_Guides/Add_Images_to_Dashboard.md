---
title: How to Add Images to Your Dashboard
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
2. Image should appear in your dashboard
3. If image doesn't appear, check:
   - File is in `/Profile/Images/` directory
   - Filename matches exactly (case-sensitive)
   - File format is supported

## Image Format Recommendations

- **SVG** - Best for icons and logos (scales perfectly, smaller file size)
- **PNG** - Good for images with transparency
- **JPG** - Good for photographs
- **GIF** - For animated images

## Tips

- Use descriptive filenames for easy identification
- Optimize image file sizes for better performance
- Keep images organized in subdirectories if you have many files
- Test images in the dashboard editor before deploying

## Related Documentation

- [Profile Directories](../Extending_Profinity/Dashboards/Profile_Directories.md) - Complete guide to profile directories
- [Icon Component](../Extending_Profinity/Dashboards/Component_Reference/Interactive/Icon.md) - Icon component reference
- [Image Component](../Extending_Profinity/Dashboards/Component_Reference/Interactive/Image.md) - Interactive image component reference
