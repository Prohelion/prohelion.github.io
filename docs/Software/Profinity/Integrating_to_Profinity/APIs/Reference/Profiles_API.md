---
title: Profiles API
description: "Look up the REST API endpoints that list, create, delete, import, and export profiles, and read and save their settings."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Profiles API

The Profiles API, the Profiles group in Swagger, lists, creates, and deletes [profiles](../../../Administration/Profiles.md), reads and saves their settings, and moves them between instances as profile packs.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

Refer to the [Active profile API](Active_Profile_API.md) for the endpoints that switch the active profile and add, configure, and update its components.

In every endpoint on this page, `{profile}` is the profile name as the profile list shows it, such as `Pump Station`.
A name with a space or another reserved character is URL encoded, so `Pump Station` becomes `Pump%20Station`.

## Profile list

These endpoints match the table of profiles on the **Profile** pill of the **ADMIN** page.
Refer to [Manage profiles](../../../Administration/Manage_Profiles.md) for the same work on screen.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Profiles` | No permission beyond signing in | Lists every profile on the instance. |
| DELETE | `/api/v2/Profiles/{profile}` | **Modify profiles** | Deletes a profile and its folder. |

Each entry in the list has `name`, `description`, `version`, and `active`, which is `true` for the active profile.
An entry also has `loadWarning`, which holds a message when Profinity cannot read the profile's `profile.yaml` file.
Refer to [Invalid configuration files](../../../Administration/System_Configuration/Invalid_Configuration_Files.md) for what the message means.

To keep a copy of a profile, download its profile pack before you delete it, with the endpoint in [Profile packs](#profile-packs).
The delete endpoint returns `204` once the profile is deleted, and it accepts any profile except the active one.

## Profile creation and settings

These endpoints match **Add profile** and the **Profile Settings** tabs.
Refer to [How to create a new profile](../../../How_To_Guides/Create_New_Profile.md) and [Manage profiles](../../../Administration/Manage_Profiles.md#edit-profile-settings) for the same work on screen.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Profiles/Settings` | **Modify profiles** | Returns the settings of a new profile, with their default values. |
| POST | `/api/v2/Profiles/Settings` | **Modify profiles** | Creates a profile and makes it the active profile. |
| GET | `/api/v2/Profiles/{profile}/Settings` | **Modify profiles** | Returns the settings of a profile and its current revision. |
| PUT | `/api/v2/Profiles/{profile}/Settings` | **Modify profiles** | Saves changed settings to a profile, which can be the active profile. |

A settings response holds `tabs` that match the tabs of **Profile Settings**, and each tab holds `sections` of `fields`.
Each field has an `id`, such as `SETTINGS.Name` or `SETTINGS.Description`, a `label` as the product shows it, and its current `value`.
The **Kiosk mode** and **Kiosk mode user** fields are on the **Home** tab, and [Kiosk Mode](../../../Administration/Kiosk_Mode.md) explains them.

The create and save endpoints take a JSON array with an object for each setting to change:

| Field | Type | Default | Effect |
|---|---|---|---|
| `src` | Text | None | The `id` of the field to set, taken from a settings response. Required. |
| `val` | The type of the field | None | The value to save, such as text for `SETTINGS.Name`. Required. |

The create endpoint takes `SETTINGS.Name`, which must be unique on the instance, and `SETTINGS.Description` from the body, and gives every other setting its default value.
It unloads the current active profile and returns `201`.
To change the other settings of the new profile, send them to the save endpoint afterwards.

The save endpoint needs an `If-Match` header that holds the revision from the `ETag` header of `GET /api/v2/Profiles/{profile}/Settings`, sent as it arrived.
A successful save returns `settingsRevision`, which is also in the `ETag` header of the response.
A new value for `SETTINGS.Name` renames the profile, and renaming the active profile reloads it, so its components restart briefly.

## Profile packs

These endpoints match **UPLOAD PROFILE PACK** and the download icon on the **Profile** pill.
A [profile pack](../../../Administration/Profiles.md#profile-packs) is a ZIP file of a profile's folder, which moves a configuration to another instance.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Profiles/{profile}/ProfilePack` | **Modify profiles** | Downloads a profile as a profile pack. |
| POST | `/api/v2/Profiles/ProfilePack` | **Modify profiles** | Imports a profile pack as a new profile. |

The import endpoint takes the file as `multipart/form-data`:

| Field | Type | Default | Effect |
|---|---|---|---|
| `profilePack` | File | None | The profile pack ZIP file. The new profile takes its name from the file name, without the `.zip` extension. Required. |

The imported profile joins the list of profiles, and the active profile stays the same.
The response holds `profileName` and `securityWarnings`.
Each entry in `securityWarnings` names a component or collection, in `resourceKind` and `resourceId`, whose security lists roles that this instance does not have, in `unresolvedRoles`.
Refer to [Component and collection security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md#unresolved-roles-after-a-profile-import) for how to resolve them.

## Error responses

The endpoints on this page return these errors when Profinity refuses a request.

| What you see | Cause | What to do |
|---|---|---|
| `404` from `GET /api/v2/Profiles` | The instance has no profiles. | Create a profile with `POST /api/v2/Profiles/Settings`, or import a profile pack. |
| `400` from `DELETE /api/v2/Profiles/{profile}` | The profile is the active profile. | Activate another profile, then delete this one. |
| `409` from `POST /api/v2/Profiles/Settings` | A profile of that name already exists. | Choose another `SETTINGS.Name`. |
| `428` from `PUT /api/v2/Profiles/{profile}/Settings` | The request has no `If-Match` header. | Send the revision from the `ETag` header of the read endpoint. |
| `409` with "Settings were modified by another session. Reload and try again." | Another session saved the profile after your read. | Read the settings again and send the change once more. |
| `409` from `POST /api/v2/Profiles/ProfilePack` | A profile with the file's name already exists. | Rename the ZIP file and import it again. |
| `400` from `POST /api/v2/Profiles/ProfilePack` | The file is not a valid profile pack. | Download the profile pack again from the instance it came from. |
| `403` with "Profile pack contains script content, which requires Scripting on the license." | The pack holds scripts, and the licence lacks the **Scripting** feature. | Refer to [Licensing](../../../Licensing.md) for the editions that include **Scripting**. |

## Profile switch example

This example finds the profiles on an instance, makes one of them the active profile with the [Active profile API](Active_Profile_API.md#active-profile), and checks the result.

1. List the profiles:

    === "macOS or Linux"

        ```bash
        curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Profiles
        ```

    === "Windows"

        Run this command in PowerShell:

        ```powershell
        Invoke-RestMethod -Uri http://localhost:18080/api/v2/Profiles -Headers @{ Authorization = "Bearer <token>" }
        ```

        PowerShell shows the response as a table of fields rather than as JSON, with the same field names.

    The response lists each profile, with `active` set on the one that is running, shortened here to two fields:

    ```json
    [
      { "name": "Pump Station", "active": true },
      { "name": "Test Rig", "active": false }
    ]
    ```

2. Switch to another profile:

    === "macOS or Linux"

        ```bash
        curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/<profile-name>
        ```

    === "Windows"

        Run this command in PowerShell:

        ```powershell
        Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/ActiveProfile/<profile-name> -Headers @{ Authorization = "Bearer <token>" }
        ```

    The response is `true` once the profile has loaded.

3. Check the active profile:

    === "macOS or Linux"

        ```bash
        curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile
        ```

    === "Windows"

        Run this command in PowerShell:

        ```powershell
        Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile -Headers @{ Authorization = "Bearer <token>" }
        ```

    The response is the name of the profile you switched to:

    ```text
    Test Rig
    ```

Replace `<token>` with a token from a user who has **Modify profiles**, and `<profile-name>` with a `name` from the list in step 1, URL encoded, such as `Test%20Rig`.
Use the address that users type to reach Profinity in place of `http://localhost:18080`.

The switch worked when step 2 returns `true` and step 3 returns the new name.
