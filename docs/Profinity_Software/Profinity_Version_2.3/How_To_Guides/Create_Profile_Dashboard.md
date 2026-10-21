---
title: How to create a profile dashboard
description: "Replace the default Profinity home page with a custom profile dashboard, built in the visual editor or uploaded as a YAML file, and remove it again."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to create a profile dashboard

Replace the default Profinity home page with a custom dashboard for your profile.
Build the dashboard in the dashboard [visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md), or upload an existing dashboard YAML file instead.
The [Profile Dashboard](../Administration/Profile_Dashboard.md) page is the full reference for profile dashboards.

Before you start, you need:

- An active [profile](../Getting_Started/Profiles.md) in Profinity.
- The **Modify profiles** permission, which allows profile settings to be changed (refer to [Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).
- The **Modify dashboards** permission, which allows dashboards to be edited.
- Optional: an existing dashboard YAML file to upload, if you are not starting from the starter dashboard.

## Turn on the custom home dashboard

1. Select **ADMIN** in the side menu.
2. Select the **Profile** pill.
3. Select the name of your profile in the list to open its settings.
4. Enable the **Custom Home Dashboard** option.
5. Leave the **Dashboard YAML file (Optional)** field empty.
6. Save the profile settings.

Profinity creates a starter dashboard from the built-in template.

## Build the dashboard in the visual editor

1. Go to the home page (select the home icon or refresh).
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar.
3. In **DESIGN** mode, add rows, groups, and widgets, set their properties, and bind tags.
   [Dashboard visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md) gives the steps.
4. Resolve anything listed under **Schema validation issues**.
5. Select **SAVE**.

Close the editor to see the result, because **DESIGN** is an outline and not a live preview.
The custom dashboard now replaces the default home page, and it stays in place whenever this profile is the active profile.

## Upload a YAML file

You can upload a dashboard YAML file that already exists instead of building a new one, for example one written outside the editor or shared from another profile.

1. Open the profile settings and enable the **Custom Home Dashboard** option.
2. In the **Dashboard YAML file (Optional)** field, select your dashboard YAML file.
   The file must have the `.yaml` extension.
3. Save the profile settings.

An uploaded dashboard opens in the visual editor like any other, so you can change it there.
The **YAML** tab shows the source, which you can copy as a backup.
The editor does not save a dashboard that fails schema validation, and an invalid dashboard does not load.

## Remove a profile dashboard

To revert to the default home page:

1. Open the profile settings.
2. Disable the **Custom Home Dashboard** option.
3. Save the profile settings.

!!! warning "Removing the dashboard deletes its file"
    Saving the profile with **Custom Home Dashboard** disabled deletes the dashboard YAML file from the profile's `dashboards` folder and clears the dashboard file setting.
    You cannot recover the file from Profinity afterwards, so download or copy the dashboard YAML first if you need it again.
    If Profinity cannot delete the file, for example because of a file permission problem, it does not clear the dashboard file setting.
    It writes the error to the [log](../Administration/Logs_Config.md).

For more on dashboards, refer to the [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md).
