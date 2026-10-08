---
title: How to Create a New Profile
description: "Create new Profinity profiles to manage different configurations for different setups, locations, or testing scenarios."
---

# How to Create a New Profile

Create a new [profile](../Getting_Started/Profiles.md) to manage different configurations for different setups or locations. A profile is created by adding one, or by importing a Profile Pack from another Profinity instance.

## Prerequisites

- Profinity V2 installed and running
- The **Modify profiles** permission (see [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)), which allows profiles to be added and switched

## Create the Profile

Select **ADMIN** in the side menu, then the **Profile** pill, which opens the profile list, and click **Add profile**. Enter a unique **Profile Name** that identifies the site or purpose, for example "Production Site" or "Test Rig", add an optional description, and save the profile. To import a Profile Pack from another Profinity instance instead, use **Upload Profile Pack**.

## Activate the Profile

Locate the new profile in the list and click **ACTIVATE** on its row, and it becomes the active profile immediately without restarting Profinity. Each profile keeps its own components, so a component added to one profile does not appear in another, and **ACTIVATE** on any row switches to that profile.

## Configure the Profile

With the new profile active, add [components](../Getting_Started/Adding_New_Components.md) to it as described in [How to Add a Component to Your Profile](./Add_Component_to_Profile.md), and configure their settings. A profile can also have its own home dashboard, which [How to Create a Profile Dashboard](./Create_Profile_Dashboard.md) describes. Changes to the profile, such as components added to it, are saved with the profile.

## Related Documentation

- [Profiles](../Administration/Profiles.md) - the full profile reference, including renaming, Profile Packs and Kiosk Mode
- [Profinity Profiles](../Getting_Started/Profiles.md) - profile concepts
- [Profile Dashboard](../Administration/Profile_Dashboard.md) - profile dashboard configuration
