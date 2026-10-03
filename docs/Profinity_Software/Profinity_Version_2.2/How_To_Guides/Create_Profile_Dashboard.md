---
title: How to Create a Profile Dashboard
---

# How to Create a Profile Dashboard

Replace the default Profinity home page with a custom dashboard for your profile.

## Prerequisites

- An active profile in Profinity
- A dashboard YAML file ready to upload
- Admin access to profile settings

## Steps

### Step 1: Create Your Dashboard YAML

1. Create a dashboard YAML file in the dashboard editor or a text editor
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
3. Select your profile from the list
4. Click on the profile to open its settings

### Step 3: Upload the Dashboard

1. In profile settings, find **"Upload Default Dashboard"**
2. Click **Choose File** or **Browse**
3. Select your dashboard YAML file
4. Click **Upload** or **Save**

### Step 4: Verify the Dashboard

1. Navigate to the home page (click home icon or refresh)
2. Your custom dashboard should display instead of the default home page
3. Dashboard is active whenever this profile is loaded

## Tips

- **Test First**: Test your dashboard in the Dashboard Editor before uploading
- **Backup**: Keep a copy of your dashboard YAML file
- **Validation**: Ensure your YAML is valid - invalid dashboards won't load
- **Profile-Specific**: Each profile can have its own custom dashboard

## Removing a Profile Dashboard

To revert to the default home page:

1. Go to Profile settings
2. Remove or clear the uploaded dashboard file
3. Save the profile

## Related Documentation

- [Profile Dashboard](../Administration/Profile_Dashboard.md) - Detailed information about profile dashboards
- [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) - Complete dashboard development reference
