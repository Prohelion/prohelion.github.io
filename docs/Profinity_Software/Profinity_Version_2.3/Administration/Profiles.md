---
title: Profiles
description: "Understand profile packs, the Example Profile, and the features a profile supports, such as Kiosk Mode, a custom home dashboard, and a menu layout."
type: concept
owner: Documentation
last_reviewed: 2026-10-14
---

# Profiles

A profile is the core mechanism by which Profinity maintains the configuration of your system, and this page explains what an administrator can do with one beyond holding components.
Refer to [Profinity profiles](../Getting_Started/Profiles.md) for what a profile is and how Profinity loads it.
Profinity shows the **Profile** pill on the **ADMIN** page to users with the **Modify profiles** permission, as described in [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md).

## Profile packs

A profile pack packages everything related to an instance of Profinity, so that several machines can be configured to run the same system.
You download it as a ZIP file and upload it to a different instance to share a configuration.
Depending on the system, a profile pack contains:

- The profile and its configured devices
- CAN database ([DBC](../CAN_Utilities/CAN_Bus_DBC.md)) files
- [Scripts](../Developing_with_Profinity/Scripting/index.md)
- CAN logs

A profile pack built on another site can carry component and collection security grants that name roles which do not exist on this site.
These appear as unresolved roles that never grant access, as described in [Component and collection security](Users_and_Access/Component_And_Collection_Security.md#unresolved-roles-after-a-profile-import).
A pack that contains script content needs the **Scripting** feature on the licence, as described in [Licensing](../Licensing.md).

## Shipped example

Profinity ships with an example profile called the Example Profile.
It contains a Prohelion 12v battery, a Prohelion Battery Management Unit (BMU), three Elmar Solar maximum power point tracker (MPPT) devices, and two Prohelion WaveSculptor 22 Motor Controllers, as described in the [Quick start guide](../Getting_Started/Quick_Start.md).
Copy it to a new profile before using it as a basis for your own work, because Profinity overwrites the file each time a new version is installed.

## Profile features

Profiles support three features:

- [Kiosk Mode](./Kiosk_Mode.md) signs a display in automatically, and bypasses the login page.
- [Profile Dashboard](./Profile_Dashboard.md) provides a custom home page from a dashboard YAML file.
- [Menu Layout](./Menu_Layout.md) sets up the side menu.

You can change the Kiosk Mode settings of a profile when it is not the active profile.
Anyone at a kiosk inherits the permissions of its Kiosk Mode User, so choose a user with only the permissions the display needs, as described in [Kiosk Mode](./Kiosk_Mode.md#choosing-the-kiosk-user).
The steps are in [How to set up Profinity as a kiosk application](../How_To_Guides/Set_Up_Profinity_as_Kiosk.md).

To activate, rename, import, or download a profile, refer to [Manage profiles](./Manage_Profiles.md).
To find the files a profile holds on disk, refer to [Profile folders](./Profile_Folders.md).
