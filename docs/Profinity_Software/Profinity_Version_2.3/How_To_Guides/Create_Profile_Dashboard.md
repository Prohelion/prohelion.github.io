---
title: How to Create a Profile Dashboard
description: "Create a custom dashboard in the visual editor to replace the default Profinity home page for your profile, or upload a YAML file instead."
---

# How to Create a Profile Dashboard

Replace the default Profinity home page with a custom dashboard for your profile. You build it in the dashboard [visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md). If you already have a dashboard YAML file, you can upload it instead.

## Prerequisites

- An active profile in Profinity
- The `ProfileModify` permission, which allows profile settings to be changed
- The `DashboardModify` permission, which allows dashboards to be edited
- Optional: an existing dashboard YAML file to upload, if you are not starting from the starter dashboard

## Steps

### Step 1: Turn On the Custom Home Dashboard

1. Select **ADMIN** in the side menu
2. Select the **Profile** pill
3. Click on the name of your profile in the list to open its settings
4. Enable the **Custom Home Dashboard** option
5. Leave the **Dashboard YAML file (Optional)** field empty and save the profile settings

Profinity creates a starter dashboard from the built-in template.

### Step 2: Build the Dashboard in the Visual Editor

1. Navigate to the home page (click the home icon or refresh)
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar
3. In **DESIGN** mode, add rows, groups and widgets, set their properties and bind tags. See [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md) for the steps
4. Resolve anything listed under **Schema validation issues**, then select **SAVE**

### Step 3: Verify the Dashboard

1. Close the editor. DESIGN is an outline, not a live preview, so the home page behind the editor is where you see the result
2. Your custom dashboard displays instead of the default home page
3. The dashboard is active whenever this profile is active

### Alternative: Upload a YAML File

If you already have a dashboard YAML file, for example one written before 2.3 or shared from another profile, upload it instead of building a new one:

1. Open the profile settings and enable the **Custom Home Dashboard** option
2. In the **Dashboard YAML file (Optional)** field, select your dashboard YAML file (it must have the `.yaml` extension)
3. Save the profile settings

An uploaded dashboard opens in the visual editor like any other, so you can keep changing it there.

## Tips

- **Start Small**: begin from the starter dashboard and add one widget at a time
- **Backup**: keep a copy of your dashboard YAML file (the **YAML** tab shows it)
- **Validation**: the editor will not save a dashboard that fails schema validation, and invalid dashboards do not load
- **Profile-Specific**: each profile can have its own custom dashboard

## Removing a Profile Dashboard

To revert to the default home page:

1. Open the profile settings
2. Disable the **Custom Home Dashboard** option
3. Save the profile settings

!!! warning "Removing the dashboard deletes its file"
    Saving the profile with **Custom Home Dashboard** disabled deletes the dashboard YAML file from the profile's `dashboards` folder and clears the dashboard file setting, so the file cannot be recovered from Profinity afterwards. Download or copy the dashboard YAML before saving the profile if it is needed again. If the file cannot be deleted, for example because of a file permission problem, the dashboard file setting is not cleared and the error is written to the log.

## Related Documentation

- [Profile Dashboard](../Administration/Profile_Dashboard.md) - the full reference for profile dashboards
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - the dashboard development reference
