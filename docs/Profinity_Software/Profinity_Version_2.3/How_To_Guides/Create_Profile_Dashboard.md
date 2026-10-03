---
title: How to Create a Profile Dashboard
description: "Create and upload custom dashboards to replace the default Profinity home page for your profile."
---

# How to Create a Profile Dashboard

Replace the default Profinity home page with a custom dashboard for your profile.

## Prerequisites

- An active profile in Profinity
- A dashboard YAML file ready to upload
- The `ProfileModify` permission, which allows profile settings to be changed

## Steps

### Step 1: Create Your Dashboard YAML

1. Create a dashboard YAML file in the dashboard editor or a text editor, using the `.yaml` extension
2. Your dashboard should start with:

```yaml
dashboard:
  items:
    - titlebar:
        # Your titlebar configuration
    - row:
        items:
          # Your dashboard content
```
3. For examples, see the [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md)

### Step 2: Access Profile Settings

1. Navigate to the **ADMIN** tab
2. Click on **Profiles**
3. Click on the name of your profile in the list to open its settings

### Step 3: Upload the Dashboard

1. In the profile settings, enable the **Custom Home Dashboard** option
2. In the **Dashboard YAML file (Optional)** field, select your dashboard YAML file
3. Save the profile settings

If the field is left empty when the settings are saved, Profinity creates a starter dashboard from the built-in template, which can be replaced later with your own file.

### Step 4: Verify the Dashboard

1. Navigate to the home page (click home icon or refresh)
2. Your custom dashboard should display instead of the default home page
3. The dashboard is active whenever this profile is active

## Tips

- **Test First**: test your dashboard in the Dashboard Editor before uploading
- **Backup**: keep a copy of your dashboard YAML file
- **Validation**: ensure your YAML is valid and passes schema validation, because invalid dashboards do not load
- **Profile-Specific**: each profile can have its own custom dashboard

## Removing a Profile Dashboard

To revert to the default home page:

1. Open the profile settings
2. Disable the **Custom Home Dashboard** option
3. Save the profile settings

## Related Documentation

- [Profile Dashboard](../Administration/Profile_Dashboard.md) - the full reference for profile dashboards
- [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) - the dashboard development reference
