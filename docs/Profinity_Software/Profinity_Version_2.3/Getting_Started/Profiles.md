---
title: Profinity Profiles
description: "Understand how Profinity profiles organise system configuration, components, dashboards, and settings for different setups."
---

# Profinity Profiles

A Profile is the core mechanism that Profinity uses to maintain the configuration of your system. Any component that you add to your system becomes associated with the active Profile, and the configuration for each device is retained after Profinity is shut down.

Profinity keeps track of your Profiles and loads the most recently used one each time you start Profinity.

## Managing Profiles

Profiles are managed from the **ADMIN** section of Profinity. Selecting **ADMIN** in the side menu and then the **Profile** pill lists every profile, and **ACTIVATE** on a row makes that profile the active profile, which is useful when working with different system configurations or testing different setups. **Add profile** creates a new profile, which keeps its own set of components, dashboards and settings, and **Upload Profile Pack** imports a profile from another Profinity instance. Each row can also be viewed, edited or deleted. [How to Create a New Profile](../How_To_Guides/Create_New_Profile.md) gives the steps for creating one.

<figure markdown>
![Profinity Profiles selector showing the list of profiles, with ACTIVATE buttons and the currently active profile marked ACTIVE](../images/profiles_menu.png)
<figcaption>The Profinity Profiles selector (ADMIN, then Profile), where the active profile is marked ACTIVE</figcaption>
</figure>

## More Information

[Profiles](../Administration/Profiles.md) in the Administration section covers creating and managing Profiles in full.
