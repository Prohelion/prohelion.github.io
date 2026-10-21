---
title: Profiles
description: "Create, activate, rename, import, and download profiles that hold your device configurations, with Kiosk Mode and custom dashboard options."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Profiles

A Profile is the core mechanism by which Profinity maintains the configuration of your system.
Any component that you add to your system becomes associated with the active Profile, and the configuration for each device is retained after Profinity is shut down.
Profinity keeps track of your Profiles and loads the most recently used one each time you start the tool.

The **Profile** pill is on the **ADMIN** page, which you open by selecting **ADMIN** in the side menu.
Profinity shows it to users with the **Modify profiles** permission, as described in [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md).

<figure markdown>
![Profinity Profiles page with an Add Profile button, an Upload Profile Pack area, and a table of profiles with Activate, download, and delete actions](../images/profiles_menu.png)
<figcaption>Profinity Profiles Menu</figcaption>
</figure>

## Changing the active profile

Only one profile can be active at a time.
To change the active profile:

1. Select **ADMIN** in the side menu and open the **Profile** pill.
2. On the row of the profile you want, select **ACTIVATE**.

The profile becomes active immediately and Profinity loads the configuration associated with it.
The active profile carries the **ACTIVE** marker on its row.

## Editing profile settings

To edit a profile's name and description:

1. Select **ADMIN** in the side menu and open the **Profile** pill.
2. Click the name of the profile, which opens a dialog with **Profile Name** and **Description**.
3. Edit the fields and select **Save**.

**Profile Name** must be unique across all profiles.
**Description** is optional text that describes the profile's purpose.

The active profile cannot be renamed.
To rename it:

1. Select **ACTIVATE** on a different profile.
2. Click the name of the profile to rename, edit the name, and save.
3. Optional: select **ACTIVATE** on the renamed profile again.

You can delete a temporary profile created for this purpose afterwards.

## Creating a new profile

The steps to create a profile, from **+ ADD PROFILE** to adding components, are in [How to create a new profile](../How_To_Guides/Create_New_Profile.md).

To import a profile pack prepared on another instance of Profinity instead:

1. Open the **Profile** pill.
2. Select **UPLOAD PROFILE PACK**.
3. Choose the ZIP file.

Profinity imports the profile with all of its associated configuration, and it appears in the table of profiles.

!!! note "Profile packs with scripts need the Scripting feature"
    Profinity rejects an uploaded profile pack that contains script content when the licence does not include the **Scripting** feature, and shows the message "Profile pack contains script content, which requires Scripting on the license."
    Refer to [Licensing](../Licensing.md).

A profile pack built on another site can carry component and collection security grants that name roles which do not exist on this site.
These appear as unresolved roles that never grant access, as described in [Component and collection security](Users_and_Access/Component_And_Collection_Security.md#unresolved-roles-after-a-profile-import).

## Setting Kiosk Mode in a profile

[Kiosk Mode](./Kiosk_Mode.md) signs a display in automatically for a profile and bypasses the login page.
It suits kiosk displays, monitoring stations, and automated systems.
The profile does not need to be active when you change its settings.
The steps are in [How to set up Profinity as a kiosk application](../How_To_Guides/Set_Up_Profinity_as_Kiosk.md).

Anyone at a kiosk inherits the permissions of its Kiosk Mode User.
Choose a user with only the permissions the display needs, as described in [Kiosk Mode](./Kiosk_Mode.md#choosing-the-kiosk-user).

## Downloading profile packs

To download a profile pack, open the **Profile** pill and click the download icon beside the profile.
Profinity saves a ZIP file containing the profile and its related files.

Profinity ships with an example profile called the Example Profile.
It contains a Prohelion 12v battery, a Prohelion Battery Management Unit (BMU), three Elmar Solar maximum power point tracker (MPPT) devices, and two Prohelion WaveSculptor 22 Motor Controllers, as described in the [Quick start guide](../Getting_Started/Quick_Start.md).
Copy it to a new profile before using it as a basis for your own work, because Profinity overwrites the file each time a new version is installed.

## Profile packs

A profile pack packages everything related to an instance of Profinity, so that several machines can be configured to run the same system.
You download it as a ZIP file and upload it to a different instance to share a configuration.
Depending on the system, a profile pack contains:

- The profile and its configured devices
- CAN database ([DBC](../CAN_Utilities/CAN_Bus_DBC.md)) files
- [Scripts](../Developing_with_Profinity/Scripting/index.md)
- CAN logs

## Profile files

Profinity stores profiles and their related files in the `profiles` folder of the [artefacts directory](../Installation/Artifacts_Directory.md), which gives the location for each operating system.
You can edit a profile file directly in a text editor, but this is not recommended.
Profinity reloads the file once the change is saved.

Each profile directory has four folders: `images`, `models`, `styles` and `content`.

| Folder | Holds |
|---|---|
| `images` | Images such as icons, device diagrams, logos, and status indicators |
| `models` | 3D model files used by a `model` component, such as `.glb`, `.gltf`, `.stl` and `.obj` |
| `styles` | Custom CSS stylesheets for colour schemes and layout overrides |
| `content` | General files such as HTML templates and Markdown files |

For example, a dashboard references an image as `image: "my-icon.svg"` and a stylesheet as `profile.css`.

## Profile features

Profiles support three features:

- [Kiosk Mode](./Kiosk_Mode.md) signs a display in automatically.
- [Profile Dashboard](./Profile_Dashboard.md) provides a custom home page from a dashboard YAML file.
- [Menu Layout](./Menu_Layout.md) sets up the side menu.
