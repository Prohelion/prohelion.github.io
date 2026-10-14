---
title: How to create a new profile
description: "Create a Profinity profile for a site, location, or test setup, then activate it and add components to it."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# How to create a new profile

Create a new [profile](../Getting_Started/Profiles.md) to manage different configurations for different setups or locations.
You create a profile by adding one, or by importing a Profile Pack from another Profinity instance.
You need Profinity V2 installed and running, and the **Modify profiles** permission, which allows profiles to be added and switched ([Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).

1. In the side menu, select **ADMIN**, then the **Profile** pill. The profile list opens.
2. Click **Add profile**.
3. Enter a unique **Profile Name** that identifies the site or purpose, for example "Production Site" or "Test Rig".
4. Optional: Add a description.
5. Save the profile.
6. In the list, click **ACTIVATE** on the row of the new profile. It becomes the active profile immediately, without restarting Profinity.

To import a Profile Pack from another Profinity instance instead, use **Upload Profile Pack**.
Each profile keeps its own components, so a component added to one profile does not appear in another, and **ACTIVATE** on any row switches to that profile.

With the new profile active, add [components](../Getting_Started/Adding_New_Components.md) to it as described in [How to add a component to your profile](./Add_Component_to_Profile.md), and configure their settings.
A profile can also have its own home dashboard, which [How to Create a Profile Dashboard](./Create_Profile_Dashboard.md) describes.
Changes to the profile, such as components added to it, are saved with the profile.

Refer to [Profiles](../Administration/Profiles.md) for the full profile reference, including renaming, Profile Packs and Kiosk Mode, and to [Profile Dashboard](../Administration/Profile_Dashboard.md) for profile dashboard configuration.
