---
title: How to Create a New Profile
description: "Create new Profinity profiles to manage different configurations for different setups, locations, or testing scenarios."
---

# How to Create a New Profile

Create a new profile to manage different configurations for different setups or locations.

## Prerequisites

- Profinity V2 installed and running
- The `ProfileModify` permission, which allows profiles to be added and switched

## Steps

### Step 1: Access Profile Management

1. Select **ADMIN** in the side menu, then **Profile**
2. The profile list opens

### Step 2: Create New Profile

1. Click the **+ ADD PROFILE** button
2. Enter a unique **Profile Name** (for example "Production Site" or "Test Rig") and an optional description
3. Save the profile

Alternatively, click **UPLOAD PROFILE PACK** to import a Profile Pack from another Profinity instance.

### Step 3: Load the Profile

1. Locate your new profile in the list
2. Click **ACTIVATE** on the profile row
3. The profile becomes the active profile immediately

### Step 4: Configure Profile

1. Add components to your new profile (see [Add Component to Profile](./Add_Component_to_Profile.md))
2. Configure component settings
3. (Optional) Upload a custom dashboard (see [Create Profile Dashboard](./Create_Profile_Dashboard.md))

### Step 5: Save Profile Settings

1. Profile settings are saved automatically
2. Switch between profiles by selecting **ADMIN** in the side menu and opening the **Profile** pill
3. Each profile maintains its own configuration

## Tips

- **Use Descriptive Names**: name profiles clearly (for example "Site A - Production")
- **Profile-Specific Dashboards**: each profile can have its own custom dashboard
- **Component Isolation**: components in one profile do not affect another profile
- **Profile Switching**: switch profiles without restarting Profinity

## Related Documentation

- [Profiles](../Administration/Profiles.md) - the full profile reference, including renaming, Profile Packs and Kiosk Mode
- [Profinity Profiles](../Getting_Started/Profiles.md) - profile concepts
- [Profile Dashboard](../Administration/Profile_Dashboard.md) - profile dashboard configuration
