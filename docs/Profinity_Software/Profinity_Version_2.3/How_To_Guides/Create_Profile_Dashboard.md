---
title: How to Create a Profile Dashboard
description: "Create a custom dashboard in the visual editor to replace the default Profinity home page for your profile, or upload a YAML file instead."
---

# How to Create a Profile Dashboard

Replace the default Profinity home page with a custom dashboard for your profile. The dashboard is built in the dashboard [visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md), or an existing dashboard YAML file can be uploaded instead.

## Prerequisites

- An active [profile](../Getting_Started/Profiles.md) in Profinity
- The **Modify profiles** permission (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which allows profile settings to be changed
- The **Modify dashboards** permission, which allows dashboards to be edited
- Optional: an existing dashboard YAML file to upload, if you are not starting from the starter dashboard

## Steps

### Turn On the Custom Home Dashboard

1. Select **ADMIN** in the side menu
2. Select the **Profile** pill
3. Click on the name of your profile in the list to open its settings
4. Enable the **Custom Home Dashboard** option
5. Leave the **Dashboard YAML file (Optional)** field empty and save the profile settings

Profinity creates a starter dashboard from the built-in template.

### Build the Dashboard in the Visual Editor

1. Navigate to the home page (click the home icon or refresh)
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar
3. In **DESIGN** mode, add rows, groups and widgets, set their properties and bind tags. See [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md) for the steps
4. Resolve anything listed under **Schema validation issues**, then select **SAVE**

### Check the Dashboard

Close the editor to see the result, because **DESIGN** is an outline and not a live preview: the custom dashboard now replaces the default home page, and it stays in place whenever this profile is the active profile.

## Upload a YAML File

A dashboard YAML file that already exists, for example one written outside the editor or shared from another profile, can be uploaded instead of building a new one:

1. Open the profile settings and enable the **Custom Home Dashboard** option
2. In the **Dashboard YAML file (Optional)** field, select your dashboard YAML file (it must have the `.yaml` extension)
3. Save the profile settings

An uploaded dashboard opens in the visual editor like any other, so it can be changed there, and the **YAML** tab shows the source, which can be copied as a backup. The editor does not save a dashboard that fails schema validation, and an invalid dashboard does not load.

## Removing a Profile Dashboard

To revert to the default home page:

1. Open the profile settings
2. Disable the **Custom Home Dashboard** option
3. Save the profile settings

!!! warning "Removing the Dashboard Deletes Its File"
    Saving the profile with **Custom Home Dashboard** disabled deletes the dashboard YAML file from the profile's `dashboards` folder and clears the dashboard file setting, so the file cannot be recovered from Profinity afterwards. Download or copy the dashboard YAML before saving the profile if it is needed again. If the file cannot be deleted, for example because of a file permission problem, the dashboard file setting is not cleared and the error is written to the [log](../Getting_Started/Profinity_Log.md).

## Related Documentation

- [Profile Dashboard](../Administration/Profile_Dashboard.md) - the full reference for profile dashboards
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - the dashboard development reference
