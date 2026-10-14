---
title: Profile Dashboard
description: "Create a custom home page dashboard for a profile in the visual editor or from a YAML file, and remove it again."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Profile Dashboard

A Profile Dashboard is a custom home page that replaces the standard Profinity home page whenever a [profile](./Profiles.md) is active.
It is built in the dashboard [visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md) and stored as a YAML file in the profile.
It uses the same dashboard system as [Custom Components](../Developing_with_Profinity/Custom_Components/index.md) dashboards, so the same dashboard components, data bindings and features are available.
The difference is scope: a Profile Dashboard is always shown as the home page, such as a system overview or an operator interface, while a Component Dashboard is reached through its component in the side menu.

Editing the profile settings requires the **Modify profiles** permission, and editing the dashboard itself requires **Modify dashboards**, as described in [Roles and Permissions](./Users_and_Access/Roles_and_Permissions.md).

## Creating a Profile Dashboard

To create a Profile Dashboard from the built-in template:

1. Select **ADMIN** in the side menu, open the **Profile** pill, select the profile and open its settings.
2. Switch on **Custom Home Dashboard** and leave **Dashboard YAML file (Optional)** empty.
3. Save the profile settings, which creates a starter dashboard from the built-in template.
4. Select the pencil (**Edit Dashboard**) icon on the home page to edit the dashboard in the visual editor, as described in [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md).

To use an existing dashboard YAML file instead, select it in **Dashboard YAML file (Optional)** in step 2, and it opens in the visual editor like any other dashboard.
Once configured, the Profile Dashboard is the home page whenever the profile is active.

Profile Dashboards are stored in the profile's `dashboards` directory, and the file is included when the profile is exported or shared.

A dashboard built in the visual editor meets the requirements automatically.
A dashboard uploaded or edited by hand must be valid YAML, must pass the dashboard schema and must have the `.yaml` extension, as described in the [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md).

## Removing a Profile Dashboard

!!! warning "Removing the dashboard deletes its file"
    Saving the profile with **Custom Home Dashboard** disabled deletes the dashboard YAML file from the profile's `dashboards` folder and clears the dashboard file setting, so keep a copy of the file if it is needed again.
    If the file cannot be deleted, the dashboard file setting is not cleared and the error is written to the log.

To remove a Profile Dashboard, open the profile settings, switch off **Custom Home Dashboard** and save.
The standard Profinity home page is then shown when the profile is active.
