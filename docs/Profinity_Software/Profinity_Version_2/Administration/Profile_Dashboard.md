---
title: Profile Dashboard
---

!!! tip "Profinity V2 IS NOW IN GENERAL RELEASE"
    Profinity V2 is available now in General Release.  If you are having any issues or feedback please report it via our support portal or via the Feedback form in the Profinity Admin menu.

# Profile Dashboard

A Profile Dashboard is a custom home page that replaces the standard Profinity home page when a profile is active. Profile Dashboards allow you to create a personalized landing page for your profile using the same dashboard system used for component dashboards.

## What is a Profile Dashboard?

A Profile Dashboard is a custom YAML dashboard file that serves as the home page for a profile. When a profile with a Profile Dashboard configured is active, the dashboard replaces the standard Profinity home page, providing a custom interface for your system.

Profile Dashboards use the same dashboard system as Custom Component dashboards, allowing you to use all the same dashboard components, data bindings, and features. The difference is that Profile Dashboards are profile-level (home page) rather than component-specific.

## Creating a Profile Dashboard

To create a Profile Dashboard for a profile:

1. **Create a dashboard YAML file** using the [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md)
2. **Navigate to the ADMIN tab** and open **Profiles**
3. **Select the profile** you want to configure
4. **Open the profile settings**
5. **Upload the dashboard file** using the "Upload Default Dashboard" option
6. **Save the profile settings**

Once configured, the Profile Dashboard will be displayed as the home page when the profile is active.

!!! info "Dashboard Location"
    Profile Dashboards are stored in the profile's `Dashboards` directory. The dashboard file is part of the profile and will be included when the profile is exported or shared.

## Dashboard Requirements

Profile Dashboards must:

- **Be valid YAML files**: The dashboard file must be valid YAML syntax
- **Comply with the dashboard schema**: The dashboard must pass schema validation
- **Use the `.yaml` extension**: The dashboard file must have a `.yaml` extension

For more information on creating dashboards, see the [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md).

## Use Cases

Profile Dashboards are useful for:

- **Custom home pages**: Create personalized landing pages for different profiles
- **System overview dashboards**: Display system-wide information and status
- **Monitoring interfaces**: Create comprehensive monitoring interfaces for your system
- **Operator interfaces**: Design custom interfaces for operators and users

## Profile Dashboard vs Component Dashboard

Profile Dashboards and Component Dashboards use the same dashboard system but serve different purposes:

- **Profile Dashboard**: Profile-level home page that replaces the standard home page
- **Component Dashboard**: Component-specific interface accessed via the component sidebar

Both use the same YAML format and dashboard components, but Profile Dashboards are always displayed as the home page, while Component Dashboards are accessed through individual components.

## Removing a Profile Dashboard

To remove a Profile Dashboard from a profile:

1. Navigate to the **ADMIN** tab and open **Profiles**
2. Select the profile you want to modify
3. Open the profile settings
4. Remove the dashboard file from the "Upload Default Dashboard" option
5. Save the profile settings

When the Profile Dashboard is removed, the standard Profinity home page will be displayed when the profile is active.

## Related Documentation

- [Profiles](./Profiles.md) - Profile configuration and management
- [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) - Learn how to create dashboards
- [Custom Components](../Extending_Profinity/Custom_Components/index.md) - Custom Components overview
