---
title: Profiles API
description: "Look up the REST API endpoints that list, create, delete, import, and export profiles, and read and save their settings."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Profiles API

The Profiles API, the Profiles group in Swagger, lists, creates, and deletes [profiles](../../../../Administration/Profiles.md), reads and saves their settings, and moves them between instances as profile packs.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

Refer to the [Active profile API](Active_Profile_API.md) for the endpoints that switch the active profile and add, configure, and update its components.

In every endpoint on this page, `{profile}` is the profile name as the profile list shows it, such as `Pump Station`.
A name with a space or another reserved character is URL encoded, so `Pump Station` becomes `Pump%20Station`.

## Profile list

These endpoints match the table of profiles on the **Profile** pill of the **ADMIN** page.
Refer to [Manage profiles](../../../../Administration/Manage_Profiles.md) for the same work on screen.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Profiles` | No permission beyond signing in | Lists every profile on the instance. |
| DELETE | `/api/v2/Profiles/{profile}` | **Modify profiles** | Deletes a profile and its folder. |

### `GET /api/v2/Profiles`

Lists every profile on the instance.
Any signed-in user can read the list, and it returns `200` with one entry for each profile.
Each entry has `name`, `description`, `version`, and `active`, which is `true` for the active profile.
An entry also has `loadWarning`, which holds a message when Profinity cannot read the profile's `profile.yaml` file.
Refer to [Invalid configuration files](../../../../Administration/System_Configuration/Invalid_Configuration_Files.md) for what the message means.

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

Replace `<token>` with a token from any signed-in user, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response lists each profile, shortened here to two fields:

```json
[
  { "name": "Pump Station", "active": true },
  { "name": "Test Rig", "active": false }
]
```

`GET /api/v2/Profiles` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | The instance has no profiles. | Create a profile with `POST /api/v2/Profiles/Settings`, or import a profile pack. |

### `DELETE /api/v2/Profiles/{profile}`

Deletes a profile and its folder.
It needs the **Modify profiles** permission, and returns `204` with no body once the profile is deleted.
It accepts any profile except the active profile.
To keep a copy of a profile, download its profile pack before you delete it, with `GET /api/v2/Profiles/{profile}/ProfilePack` in [Profile packs](#profile-packs).

=== "macOS or Linux"

    ```bash
    curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Profiles/<profile-name>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Delete -Uri http://localhost:18080/api/v2/Profiles/<profile-name> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<profile-name>` with the profile's name, URL encoded, such as `Test%20Rig`.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The delete worked when the response is `204`, and the profile no longer appears in `GET /api/v2/Profiles`.

`DELETE /api/v2/Profiles/{profile}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You cannot work on the Active Profile with these APIs" | The profile is the active profile, whatever the case of the name you send. | Activate another profile, then delete this one. |
| `400` with "Pass only the profile name, not a path" | The name has a path in it, or ends in `.yaml`. | Send only the profile name, as `GET /api/v2/Profiles` shows it. |
| `404` | No profile of that name exists, or its folder could not be deleted. | Check the name against `GET /api/v2/Profiles`. If the name is right, check the Profinity log for the reason. |

## Profile settings format

Settings responses and settings saves use the same field identifiers, so the settings endpoints below share this format.
A settings response holds `tabs` that match the tabs of **Profile Settings**, and each tab holds `sections` of `fields`.
Each field has an `id`, such as `SETTINGS.Name` or `SETTINGS.Description`, a `label` as the product shows it, and its current `value`.
A response from a named profile also has `settingsRevision`, which is the revision that a save must send back.
The **Kiosk mode** and **Kiosk mode user** fields are on the **Home** tab, and [Kiosk Mode](../../../../Administration/Kiosk_Mode.md) explains them.

The create and save endpoints take a JSON array with an object for each setting to change:

| Field | Type | Default | Effect |
|---|---|---|---|
| `src` | Text | None | The `id` of the field to set, taken from a settings response. Required. |
| `val` | The type of the field | None | The value to save, such as text for `SETTINGS.Name`. Required. |

A value that fails the checks for its field returns `422`, with each field's message in `errors`, and nothing is saved.

## Profile creation and settings

These endpoints match **Add profile** and the **Profile Settings** tabs.
Refer to [How to create a new profile](../../../../How_To_Guides/Create_New_Profile.md) and [Manage profiles](../../../../Administration/Manage_Profiles.md#edit-profile-settings) for the same work on screen.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Profiles/Settings` | **Modify profiles** | Returns the settings of a new profile, with their default values. |
| POST | `/api/v2/Profiles/Settings` | **Modify profiles** | Creates a profile and makes it the active profile. |
| GET | `/api/v2/Profiles/{profile}/Settings` | **Modify profiles** | Returns the settings of a profile and its current revision. |
| PUT | `/api/v2/Profiles/{profile}/Settings` | **Modify profiles** | Saves changed settings to a profile, which can be the active profile. |

### `GET /api/v2/Profiles/Settings`

Returns the settings of a new profile, with their default values, in the [settings format](#profile-settings-format).
It needs the **Modify profiles** permission, and returns `200`.
Use it to see the field identifiers that the create endpoint accepts.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Profiles/Settings
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Profiles/Settings -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from a user who has **Modify profiles**, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response holds `tabs`.

This endpoint has no errors of its own beyond sign-in and permission.

### `POST /api/v2/Profiles/Settings`

Creates a profile and makes it the active profile.
It needs the **Modify profiles** permission, and returns `201` with a `message`, and the address of the new profile in the `Location` header.
The body is the array in the [settings format](#profile-settings-format).
The endpoint takes `SETTINGS.Name`, which must be unique on the instance, and `SETTINGS.Description` from the body, and gives every other setting its default value.
It unloads the current active profile.
To change the other settings of the new profile, send them to `PUT /api/v2/Profiles/{profile}/Settings` afterwards.

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Profiles/Settings \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '[{"src": "SETTINGS.Name", "val": "<profile-name>"}, {"src": "SETTINGS.Description", "val": "<description>"}]'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Profiles/Settings -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '[{"src": "SETTINGS.Name", "val": "<profile-name>"}, {"src": "SETTINGS.Description", "val": "<description>"}]'
    ```

Replace these placeholders:

- `<profile-name>` with a name that no profile on the instance has.
- `<description>` with the profile's description.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The create worked when the response is `201`, and `GET /api/v2/Profiles` lists the new profile as the active profile.

`POST /api/v2/Profiles/Settings` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The request has no body. | Send the array of settings. |
| `409` | A profile of that name already exists. Names are the same whatever their case, so `Pump` and `pump` are one name. | Choose another `SETTINGS.Name`. |
| `422` | A value fails the checks for its field. | Correct the field that `errors` names. |
| `500` | Profinity could not create the profile. | Check the Profinity log for the reason. |

### `GET /api/v2/Profiles/{profile}/Settings`

Returns the settings of a profile and its current revision, in the [settings format](#profile-settings-format).
It needs the **Modify profiles** permission, and returns `200`.
The revision is in `settingsRevision` and in the `ETag` header, and a save needs it.

=== "macOS or Linux"

    ```bash
    curl -i -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Profiles/<profile-name>/Settings
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Profiles/<profile-name>/Settings -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<profile-name>` with the profile's name, URL encoded, such as `Pump%20Station`.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response holds `tabs` and `settingsRevision`.

`GET /api/v2/Profiles/{profile}/Settings` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The name has a path in it, or ends in `.yaml`. | Send only the profile name, as `GET /api/v2/Profiles` shows it. |
| `404` | No profile of that name exists, or Profinity cannot load it. | Check the name against `GET /api/v2/Profiles`. |

### `PUT /api/v2/Profiles/{profile}/Settings`

Saves changed settings to a profile, which can be the active profile.
It needs the **Modify profiles** permission, and returns `200` with a `message` and `settingsRevision`, which is also in the `ETag` header of the response.
The body is the array in the [settings format](#profile-settings-format), and it must hold at least one setting.
The request needs an `If-Match` header that holds the revision from the `ETag` header of `GET /api/v2/Profiles/{profile}/Settings`, sent as it arrived.
A new value for `SETTINGS.Name` renames the profile, and renaming the active profile reloads it, so its components restart briefly.
A name that differs from the profile's own name only in case changes its spelling.
Names are the same whatever their case, so a name that matches another profile in any case is refused.

=== "macOS or Linux"

    ```bash
    curl -X PUT http://localhost:18080/api/v2/Profiles/<profile-name>/Settings \
      -H "Authorization: Bearer <token>" \
      -H "If-Match: <revision>" \
      -H "Content-Type: application/json" \
      -d '[{"src": "SETTINGS.Description", "val": "<description>"}]'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/Profiles/<profile-name>/Settings -Headers @{ Authorization = "Bearer <token>"; "If-Match" = "<revision>" } -ContentType "application/json" -Body '[{"src": "SETTINGS.Description", "val": "<description>"}]'
    ```

Replace these placeholders:

- `<profile-name>` with the profile's name, URL encoded, such as `Pump%20Station`.
- `<revision>` with the revision from the `ETag` header of the read endpoint, with its quotation marks, such as `"3"`.
- `<description>` with the new description.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The save worked when the response is `200` with a new `settingsRevision`.

`PUT /api/v2/Profiles/{profile}/Settings` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The body holds no settings. | Send at least one setting. |
| `404` | The profile is not the active profile, and Profinity cannot load it. | Check the name against `GET /api/v2/Profiles`. |
| `409` with "Settings were modified by another session. Reload and try again." | Another session saved the profile after your read, or the `If-Match` value is not a revision. | Read the settings again and send the change once more. |
| `422` | A value fails the checks for its field. | Correct the field that `errors` names. |
| `428` | The request has no `If-Match` header. | Send the revision from the `ETag` header of the read endpoint. |
| `500` | Profinity could not save or rename the profile, including a rename to the name of another profile in any case. | Choose a name no other profile has, or check the Profinity log for the reason. |

## Profile packs

These endpoints match **UPLOAD PROFILE PACK** and the download icon on the **Profile** pill.
A [profile pack](../../../../Administration/Profiles.md#profile-packs) is a ZIP file of a profile's folder, which moves a configuration to another instance.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/Profiles/{profile}/ProfilePack` | **Modify profiles** | Downloads a profile as a profile pack. |
| POST | `/api/v2/Profiles/ProfilePack` | **Modify profiles** | Imports a profile pack as a new profile. |

### `GET /api/v2/Profiles/{profile}/ProfilePack`

Downloads a profile as a profile pack.
It needs the **Modify profiles** permission, and returns `200` with the pack as a file download.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" -OJ http://localhost:18080/api/v2/Profiles/<profile-name>/ProfilePack
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Profiles/<profile-name>/ProfilePack -Headers @{ Authorization = "Bearer <token>" } -OutFile <file-name>
    ```

Replace these placeholders:

- `<profile-name>` with the profile's name, URL encoded, such as `Pump%20Station`.
- `<file-name>` with the name to save the pack as, such as `Pump Station.ppack`.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The download worked when the response is `200` and the saved file is a ZIP file.

`GET /api/v2/Profiles/{profile}/ProfilePack` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "Pass only the profile name, not a path" | The name has a path in it, or ends in `.yaml`. | Send only the profile name, as `GET /api/v2/Profiles` shows it. |
| `400` with "Unable to create Profile package for that Profile" | Profinity could not build the pack. | Check the Profinity log for the reason. |
| `404` | No profile of that name exists. | Check the name against `GET /api/v2/Profiles`. |

### `POST /api/v2/Profiles/ProfilePack`

Imports a profile pack as a new profile.
It needs the **Modify profiles** permission, and returns `200`.
The imported profile joins the list of profiles, and the active profile stays the same.
The file goes in a `multipart/form-data` body:

| Field | Type | Default | Effect |
|---|---|---|---|
| `profilePack` | File | None | The profile pack ZIP file. The new profile takes its name from the file name, without the extension. Required. |

The response holds `profileName` and `securityWarnings`.
Each entry in `securityWarnings` names a component or collection, in `resourceKind` and `resourceId`, whose security lists roles that this instance does not have, in `unresolvedRoles`.
Refer to [Component and collection security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md#unresolved-roles-after-a-profile-import) for how to resolve them.

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Profiles/ProfilePack \
      -H "Authorization: Bearer <token>" \
      -F "profilePack=@<pack-file>"
    ```

=== "Windows"

    Run this command in PowerShell. Use `curl.exe`, because `curl` is an alias for another command there.

    ```powershell
    curl.exe -X POST http://localhost:18080/api/v2/Profiles/ProfilePack -H "Authorization: Bearer <token>" -F "profilePack=@<pack-file>"
    ```

Replace these placeholders:

- `<pack-file>` with the path of the profile pack, such as `Pump Station.ppack`.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The import worked when the response is `200` and holds the `profileName` of the new profile.

`POST /api/v2/Profiles/ProfilePack` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The request has no file, or the file is not a valid profile pack. | Download the profile pack again from the instance it came from. |
| `403` with "Profile pack contains script content, which requires Scripting on the license." | The pack holds scripts, and the licence lacks the **Scripting** feature. | Refer to [Licensing](../../../../Licensing.md) for the editions that include **Scripting**. |
| `409` | A profile with the file's name already exists, in any case. | Rename the file and import it again. |

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
