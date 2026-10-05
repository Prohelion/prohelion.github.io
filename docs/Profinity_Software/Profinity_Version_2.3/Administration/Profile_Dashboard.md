---
title: Profile Dashboard
description: "Create custom home page dashboards for profiles with the dashboard visual editor, with YAML upload as an alternative."
---

# Profile Dashboard

A Profile Dashboard is a custom home page that replaces the standard Profinity home page when a [profile](./Profiles.md) is active. Profile Dashboards allow you to create a personalised landing page for your profile using the same dashboard system used for component dashboards.

## What is a Profile Dashboard?

A Profile Dashboard is a custom dashboard that serves as the home page for a profile. You build it in the dashboard [visual editor](../Customising_Profinity/Dashboards/Visual_Editor.md), and it is stored as a YAML file in the profile. When a profile with a Profile Dashboard configured is active, the dashboard replaces the standard Profinity home page, providing a custom interface for your system.

Profile Dashboards use the same dashboard system as Custom Component dashboards, so the same dashboard components, data bindings, and features are available. The difference is that Profile Dashboards are profile-level (home page) rather than component-specific.

## Creating a Profile Dashboard

To create a Profile Dashboard for a profile:

1. **Select ADMIN in the side menu** and open the **Profile** pill
2. **Select the profile** you want to configure
3. **Open the profile settings**
4. **Enable the Custom Home Dashboard option** and leave the "Dashboard YAML file (Optional)" field empty
5. **Save the profile settings**. Profinity creates a starter dashboard from the built-in template
6. **Edit the dashboard in the visual editor** by selecting the pencil (**Edit Dashboard**) icon on the home page, as described in [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md)

Once configured, the Profile Dashboard is displayed as the home page when the profile is active.

**Already have a dashboard YAML file?** Select it in the "Dashboard YAML file (Optional)" field in step 4 instead. It opens in the visual editor like any other dashboard.

!!! info "Dashboard Location"
    Profile Dashboards are stored in the profile's `dashboards` directory. The dashboard file is part of the profile and is included when the profile is exported or shared.

## Dashboard Requirements

Profile Dashboards built in the visual editor meet these automatically. They apply when you upload or hand-edit a YAML file. Profile Dashboards must:

- **Be valid YAML files**: the dashboard file must use valid YAML syntax.
- **Comply with the dashboard schema**: the dashboard must pass schema validation.
- **Use the `.yaml` extension**: the dashboard file must have a `.yaml` extension.

For more information on creating dashboards, see the [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md) and the [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md).

## Use Cases

Profile Dashboards are useful for:

- **Custom home pages**: personalised landing pages for different profiles.
- **System overview dashboards**: system-wide information and status.
- **Monitoring interfaces**: detailed monitoring interfaces for your system.
- **Operator interfaces**: custom interfaces designed for operators and users.

## Profile Dashboard vs Component Dashboard

Profile Dashboards and Component Dashboards use the same dashboard system but serve different purposes:

- **Profile Dashboard**: profile-level home page that replaces the standard home page.
- **Component Dashboard**: component-specific interface accessed via the component sidebar.

Both use the same visual editor, YAML format and dashboard components, but Profile Dashboards are always displayed as the home page, while Component Dashboards are accessed through individual components.

## Removing a Profile Dashboard

To remove a Profile Dashboard from a profile:

1. Select **ADMIN** in the side menu and open the **Profile** pill
2. Select the profile you want to modify
3. Open the profile settings
4. Disable the **Custom Home Dashboard** option
5. Save the profile settings

When the Profile Dashboard is removed, the standard Profinity home page is displayed when the profile is active.

!!! warning "Removing the dashboard deletes its file"
    Saving the profile with **Custom Home Dashboard** disabled deletes the dashboard YAML file from the profile's `dashboards` folder and clears the dashboard file setting, so keep a copy of the file if it is needed again. If the file cannot be deleted, the dashboard file setting is not cleared and the error is written to the log.

## Related Documentation

- [Profiles](./Profiles.md) - profile configuration and management
- [Dashboard Visual Editor](../Customising_Profinity/Dashboards/Visual_Editor.md) - how to build dashboards
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - the dashboard YAML reference
- [Custom Components](../Developing_with_Profinity/Custom_Components/index.md) - Custom Components overview
