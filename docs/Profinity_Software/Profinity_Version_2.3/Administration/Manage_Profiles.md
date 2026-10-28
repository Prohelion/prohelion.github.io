---
title: Manage profiles
description: "Activate a profile, rename it or edit its description, import a profile pack from another instance, and download a profile pack as a ZIP file."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Manage profiles

Use the **Profile** pill on the **ADMIN** page to activate, rename, import, and download profiles.
You need the **Modify profiles** permission, as described in [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md).
To create a profile, refer to [How to create a new profile](../How_To_Guides/Create_New_Profile.md), which covers the steps from **Add profile** to adding components.

<figure markdown>
![Profinity Profiles page with an Add profile button, an Upload Profile Pack area, and a table of profiles with Activate, download, and delete actions](../images/profiles_menu.png)
<figcaption>Profinity Profiles Menu</figcaption>
</figure>

## Change the active profile

Only one profile can be active at a time.
To change the active profile:

1. Select **ADMIN** in the side menu and open the **Profile** pill.
2. On the row of the profile you want, select **ACTIVATE**.

The profile becomes active immediately and Profinity loads the configuration associated with it.
The active profile carries the **ACTIVE** marker on its row.

## Edit profile settings

To edit a profile's name and description:

1. Select **ADMIN** in the side menu and open the **Profile** pill.
2. Select the name of the profile, which opens a dialog with **Profile Name** and **Description**.
3. Edit the fields and select **Save**.

**Profile Name** must be unique across all profiles.
**Description** is optional text that describes the profile's purpose.

The active profile cannot be renamed.
To rename it:

1. Select **ACTIVATE** on a different profile.
2. Select the name of the profile to rename, edit the name, and save.
3. Optional: select **ACTIVATE** on the renamed profile again.

If you created a different profile only so that you could rename the active one, you can delete it afterwards.

## Import a profile pack

To import a profile pack prepared on another instance of Profinity:

1. Open the **Profile** pill.
2. Select **UPLOAD PROFILE PACK**.
3. Choose the ZIP file.

Profinity imports the profile with all of its associated configuration, and it appears in the table of profiles.

Profinity refuses a pack whose `profile.yaml` is not valid, for example one that has a setting name Profinity does not define or that cannot be read as YAML.
It shows "Failed to unpack the Profile Pack. The file may be corrupted or invalid. Check the logs for more details." and imports nothing, and the log names the reason.
Correct the file in the pack and upload it again.

Profinity rejects an uploaded profile pack that contains script content when the licence does not include the **Scripting** feature, and shows the message "Profile pack contains script content, which requires Scripting on the license."
Refer to [Licensing](../Licensing.md).

## Download a profile pack

To download a profile pack, open the **Profile** pill and select the download icon beside the profile.
Profinity saves a ZIP file containing the profile and its related files.

Refer to [Profiles](./Profiles.md) for what a profile pack contains and the roles it can carry from another site.
For the files a profile holds on disk, refer to [Profile folders](./Profile_Folders.md).
