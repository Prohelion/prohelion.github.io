---
title: Profiles
description: "Create and manage profiles to organise device configurations, with support for kiosk mode and custom dashboards."
---

# Profiles

A Profile is the core mechanism by which Profinity maintains the configuration of your system. Any component that you add to your system becomes associated with the active Profile, and the configuration for each device is retained after Profinity is shut down. Profinity keeps track of your Profiles and loads the most recently used one each time you start the tool.

The **Profile** pill is located on the **ADMIN** page, which is opened by selecting **ADMIN** in the side menu, and it is shown to users with the **Modify profiles** permission, as described in [Roles and Permissions](./Users_and_Access/Roles_and_Permissions.md).

<figure markdown>
![Profinity Profile menu](../images/profiles_menu.png)
<figcaption>Profinity Profiles Menu</figcaption>
</figure>

## Changing the Active Profile

To change the active profile, select **ADMIN** in the side menu, open the **Profile** pill and select **ACTIVATE** on the row of the profile you want, which makes it active immediately and loads the configuration associated with it. The active profile carries the **ACTIVE** marker on its row, and only one profile can be active at a time.

## Editing Profile Settings

To edit a profile's name and description, select **ADMIN** in the side menu, open the **Profile** pill and click the name of the profile, which opens a dialog with **Profile Name**, which must be unique across all profiles, and **Description**, an optional text that describes the profile's purpose. Select **Save** to apply the changes.

!!! warning "The Active Profile Cannot Be Renamed"
    To rename the active profile, change to a different profile with **ACTIVATE**, click the name of the profile to rename, edit the name and save, and then activate the renamed profile again if needed. A temporary profile created for this purpose can be deleted afterwards.

## Creating a New Profile

To create a profile, open the **Profile** pill, select **+ ADD PROFILE**, enter a unique profile name and an optional description, and then build the system configuration by adding components. To import a profile pack prepared on another instance of Profinity instead, select **UPLOAD PROFILE PACK** and choose the ZIP file, and the profile is imported with all of its associated configuration.

!!! note "Profile Packs With Scripts Need the Scripting Feature"
    Profinity rejects an uploaded profile pack that contains script content when the licence does not include the **Scripting** feature, and shows the message "Profile pack contains script content, which requires Scripting on the license." See [Licensing](Licensing.md).

A profile pack built on another site can carry component and collection security grants that name roles which do not exist on this site, and these appear as unresolved roles that never grant access, as described in [Component and Collection Security](Users_and_Access/Component_And_Collection_Security.md#unresolved-roles-after-a-profile-import).

## Setting Kiosk Mode in a Profile

Kiosk Mode signs a display in automatically for a profile, bypassing the login page, which suits kiosk displays, monitoring stations and automated systems. To enable it, open the **Profile** pill, select the profile (it does not need to be active), open its settings, switch on **Kiosk Mode**, choose a **Kiosk Mode User** from the list of enabled users and select **Save**. Kiosk Mode applies only while the profile is active, and normal login is required when a profile without it becomes active.

!!! warning "Anyone at the Kiosk Inherits Its User's Permissions"
    Profinity does not restrict which enabled user can be selected, including administrators, so choose a user with only the permissions the display needs. Requirements, security practice and troubleshooting are in [Kiosk Mode](./Kiosk_Mode.md).

## Downloading Profile Packs

To download a profile pack, open the **Profile** pill and click the download icon beside the profile, which saves a ZIP file containing the profile and its related files.

Profinity ships with an example profile called the Example Profile, which contains a Prohelion 12v battery, a Prohelion BMU, three Elmar Solar MPPT devices and two Prohelion WaveSculptor 22 Motor Controllers, as described in the [Quick Start Guide](../Getting_Started/Quick_Start.md). Prohelion recommends copying it to a new profile before using it as a basis for your own work, because the file is overwritten each time a new version of Profinity is installed.

## Profile Packs

A profile pack packages everything related to an instance of Profinity, so that several machines can be configured to run the same system, and it is downloaded as a ZIP file and uploaded to a different instance to share a configuration. Depending on the system, a profile pack contains the [profile](#profiles) and its configured devices, [DBC](../CAN_Utilities/CAN_Bus_DBC.md) files, [scripts](../Developing_with_Profinity/Scripting/index.md) and CAN logs.

## Profile Files

Profinity stores profiles and their related files in the `profiles` folder of the [artefacts directory](../Installation/Artifacts_Directory.md), which gives the location for each operating system. Editing a profile file directly in a text editor is possible but not recommended, and Profinity reloads the file once the change is saved.

Each profile directory has three folders that serve dashboard assets. The `images` folder holds images such as icons, device diagrams, logos and status indicators, which a dashboard references by file name alone (for example `image: "my-icon.svg"`) and which Profinity serves from `/Profile/Images/{filename}`. The `styles` folder holds custom CSS stylesheets for colour schemes and layout overrides, which are referenced by file name (for example `Profile.css`) and served from `/Profile/Styles/{filename}`. The `content` folder holds general files such as HTML templates and Markdown files, referenced by file name and served from `/Profile/Content/{filename}`.

## Profile Features

Profiles support [Kiosk Mode](./Kiosk_Mode.md), which signs a display in automatically, a [Profile Dashboard](./Profile_Dashboard.md), which provides a custom home page from a dashboard YAML file, and a [Menu Layout](./Menu_Layout.md) for the side menu.
