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
It uses the same dashboard system as [Custom Components](../Developing_with_Profinity/Custom_Components/index.md) dashboards, so the same dashboard components, data bindings, and features are available.
The difference is scope.
A Profile Dashboard is always shown as the home page, such as a system overview or a control interface.
A Component Dashboard is reached through its component in the side menu.

Editing the profile settings needs the **Modify profiles** permission.
Editing the dashboard itself needs **Modify dashboards**.
Refer to [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md).

## Creating a Profile Dashboard

To create a Profile Dashboard from the built-in template:

1. Select **ADMIN** in the side menu, then open the **Profile** pill.
2. Select the profile and open its settings.
3. Switch on **Custom Home Dashboard** and leave **Dashboard YAML file (Optional)** empty.
4. Save the profile settings. Profinity creates a starter dashboard from the built-in template.
5. Select the pencil (**Edit Dashboard**) icon on the home page to edit the dashboard in the visual editor, as described in [Build a dashboard in the Visual Editor](../Customising_Profinity/Dashboards/Build_a_Dashboard.md).

To use an existing dashboard YAML file instead, select it in **Dashboard YAML file (Optional)** in step 3.
It opens in the visual editor like any other dashboard.
Once configured, the Profile Dashboard is the home page whenever the profile is active.

Profile Dashboards are stored in the profile's `dashboards` directory.
The file is included when the profile is exported or shared.

A dashboard built in the visual editor meets the file requirements automatically.
A dashboard uploaded or edited by hand has three requirements:

- It must be valid YAML.
- It must pass the dashboard schema.
- It must have the `.yaml` extension.

Profinity checks an uploaded dashboard when you upload it.
If the dashboard does not load, Profinity refuses the upload and reports the reason, and the dashboard you already have is left as it is.
When a valid upload replaces a dashboard, Profinity keeps the file it replaced as `<file>.bak` in the same folder, for example `dashboard.yaml.bak`.

Refer to the [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md).

## Removing a Profile Dashboard

!!! warning "Removing the dashboard deletes its file"
    Saving the profile with **Custom Home Dashboard** disabled deletes the dashboard YAML file from the profile's `dashboards` folder and clears the dashboard file setting.
    Keep a copy of the file if you need it again.
    If Profinity cannot delete the file, it does not clear the dashboard file setting, and it writes the error to the log.

To remove a Profile Dashboard, open the profile settings, switch off **Custom Home Dashboard** and save.
The standard Profinity home page is then shown when the profile is active.
