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
You need Profinity V2 installed and running, and the **Modify profiles** permission, which allows profiles to be added and switched ([Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md)).

1. In the side menu, select **ADMIN**, then the **Profile** pill.
   The profile list opens.
2. Select **Add profile**.
3. Enter a unique **Profile Name** that identifies the site or purpose, for example "Production Site" or "Test Rig".
4. Optional: Add a description.
5. Save the profile.
6. In the list, select **ACTIVATE** on the row of the new profile.
   The new profile becomes the active profile immediately, without a restart of Profinity.

To import a Profile Pack from another Profinity instance instead, use **Upload Profile Pack**.
Each profile keeps its own components, so a component added to one profile does not appear in another.
**ACTIVATE** on any row switches to that profile.

With the new profile active, add components to it and configure their settings, as [How to add a component to your profile](./Add_Component_to_Profile.md) describes.
Profinity saves changes to the profile, such as components added to it, with the profile.
A profile can also have its own home dashboard, which [How to create a profile dashboard](./Create_Profile_Dashboard.md) describes.

[Profiles](../Administration/Profiles.md) is the full profile reference, including renaming, Profile Packs, and Kiosk Mode.
[Profile Dashboard](../Administration/Profile_Dashboard.md) covers profile dashboard configuration.
