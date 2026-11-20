---
title: Active profile API
description: "Look up the REST API endpoints that switch the active profile, manage its images, add, configure, and remove its components, and upload their files."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Active profile API

The Active profile API, the ActiveProfile group in Swagger, works on the profile that Profinity is running: it switches the active profile, returns its configuration and images, lists the component types, adds, configures, and removes [components](../../../../Components/index.md), and uploads their files.

Refer to [Authenticate to the Profinity REST API](../../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

Refer to the [Profiles API](Profiles_API.md) for the endpoints that list, create, and delete profiles.

Use these links to go to a section.

- [Active profile](#active-profile)
- [Profile images](#profile-images)
- [Kiosk status](#kiosk-status)
- [Components](#components)
- [Component settings](#component-settings)
- [File upload](#file-upload)

In an endpoint, `{profileName}` is the profile name as the profile list shows it, and `{component}` is the component's name as the side menu shows it.
Both are URL encoded, so `Pump Station` becomes `Pump%20Station` and `Pump 1` becomes `Pump%201`.

## Active profile

These endpoints work on the profile that Profinity is running, which **ACTIVATE** on the **Profile** pill also sets.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile` | No permission beyond signing in | Returns the name of the active profile as plain text. |
| POST | `/api/v2/ActiveProfile/{profileName}` | **Modify profiles** | Loads the named profile and makes it the active profile. |
| GET | `/api/v2/ActiveProfile/Config` | No permission beyond signing in | Returns the active profile as a JSON document. |

### `GET /api/v2/ActiveProfile`

Returns the name of the active profile as plain text.
Any signed-in user can read it.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace `<token>` with a token from any signed-in user, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is the profile name, such as `Pump Station`.

`GET /api/v2/ActiveProfile` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No profile is active. | Activate a profile with `POST /api/v2/ActiveProfile/{profileName}`. |

### `POST /api/v2/ActiveProfile/{profileName}`

Loads the named profile and makes it the active profile.
It needs the **Modify profiles** permission, and returns `200` with `true` once the profile has loaded.
A switch also changes what a kiosk display shows, which [Kiosk Mode](../../../../Administration/Kiosk_Mode.md#what-the-display-does) explains.
Refer to the [Profile switch example](Profiles_API.md#profile-switch-example) for the commands that list the profiles, switch to one, and check the result.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/<profile-name>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/ActiveProfile/<profile-name> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<profile-name>` with the profile name alone, URL encoded, such as `Pump%20Station`.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The switch worked when the response is `true`.

`POST /api/v2/ActiveProfile/{profileName}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "To change the profile, pass just the profile name, no path or .yaml extension" | `{profileName}` holds a path or ends in `.yaml`. | Send the profile name alone, as the profile list shows it. |
| `400` | The profile needs a later release of Profinity, or uses a component whose plugin is missing or failed to load. | Upgrade Profinity, or install the plugin. Refer to [Install and manage plugins](../../../../Administration/Install_and_Manage_Plugins.md). |
| `404` | No profile has that name. | Use a `name` from the profile list. |
| `500` | The profile could not be loaded for another reason. | Check the logs, then switch again. |

### `GET /api/v2/ActiveProfile/Config`

Returns the active profile as a JSON document.
The document holds only the components that the caller can see under [component and collection security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).
Any signed-in user can read it.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/Config
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile/Config -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the document as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from any signed-in user, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a JSON document.

`GET /api/v2/ActiveProfile/Config` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No profile is active. | Activate a profile with `POST /api/v2/ActiveProfile/{profileName}`. |

## Profile images

These endpoints manage the images in the `images` folder of the active profile, which [Profile folders](../../../../Administration/Profile_Folders.md) describes.
The [Menu Layout](../../../../Administration/Menu_Layout.md) editor offers these images as menu icons.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/Images` | No permission beyond signing in | Lists the images in the active profile. |
| POST | `/api/v2/ActiveProfile/Images` | **Modify profiles** | Adds an image to the active profile. |

### `GET /api/v2/ActiveProfile/Images`

Lists the images in the active profile.
Each entry has `fileName`, `mediaType`, `size` in bytes, and `url`, the address that Profinity serves the image from.
Any signed-in user can read the list.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/Images
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile/Images -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows each entry as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from any signed-in user, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a list of entries, which is empty when the profile has no images.

`GET /api/v2/ActiveProfile/Images` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No profile is active. | Activate a profile, then list the images. |

### `POST /api/v2/ActiveProfile/Images`

Adds an image to the active profile.
It needs the **Modify profiles** permission, and returns `201` with the new entry.

The body is JSON:

| Field | Type | Default | Effect |
|---|---|---|---|
| `fileName` | Text | None | The file name, ending in `.svg`, `.png`, `.jpg`, `.jpeg`, or `.webp`. Required. |
| `mediaType` | Text | None | The media type that matches the file name: `image/svg+xml`, `image/png`, `image/jpeg`, or `image/webp`. Required. |
| `contentBase64` | Text | None | The image file, Base64 encoded, up to 2,097,152 bytes (2 MiB) before encoding. Required. |

=== "macOS or Linux"

    ```bash
    CONTENT=$(base64 < <image-file> | tr -d '\n')
    curl -X POST http://localhost:18080/api/v2/ActiveProfile/Images \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d "{\"fileName\": \"<file-name>\", \"mediaType\": \"<media-type>\", \"contentBase64\": \"$CONTENT\"}"
    ```

=== "Windows"

    Run these commands in PowerShell:

    ```powershell
    $content = [Convert]::ToBase64String([IO.File]::ReadAllBytes("<image-file>"))
    $body = @{ fileName = "<file-name>"; mediaType = "<media-type>"; contentBase64 = $content } | ConvertTo-Json
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/ActiveProfile/Images -ContentType "application/json" -Headers @{ Authorization = "Bearer <token>" } -Body $body
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<file-name>` with the name to store, such as `pump.png`.
- `<image-file>` with the path of the image on your computer.
- `<media-type>` with the media type that matches the file name, such as `image/png`.
- `<token>` with a token from a user who has **Modify profiles**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The add worked when the response has `fileName`, `mediaType`, `size`, and `url` for the new image.

`POST /api/v2/ActiveProfile/Images` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The media type does not match the file name, the content is not valid Base64, or the image is empty or larger than 2 MiB. | Correct the field the message names and send the image again. |
| `404` | No profile is active. | Activate a profile, then add the image. |
| `409` | The profile already has an image of that name. | Choose another `fileName`. |

## Kiosk status

The kiosk status endpoint tells a display whether the active profile signs it in automatically with [Kiosk Mode](../../../../Administration/Kiosk_Mode.md).
The sign-in page calls it before anyone has signed in, so it needs no token.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/KioskStatus` | None | Reports whether Kiosk Mode is in effect for the active profile. |

### `GET /api/v2/ActiveProfile/KioskStatus`

Reports whether Kiosk Mode is in effect for the active profile.
It needs no token and no permission, and returns `200`.
In the response, `kioskModeEnabled` is `true` when **Kiosk mode** is on for the active profile and its **Kiosk mode user** exists and is enabled.
`profileLoaded` is `false` when no profile is active.
The response also holds `engineGeneration`, a text value that names the running engine.

=== "macOS or Linux"

    ```bash
    curl http://localhost:18080/api/v2/ActiveProfile/KioskStatus
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile/KioskStatus
    ```

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response has `kioskModeEnabled`, `profileLoaded`, and `engineGeneration`.

This endpoint has no errors of its own beyond sign-in and permission.

## Components

These endpoints list the component types, add a component, read a component's settings, save changes to them, and remove a component.
Refer to [How to add a component to your profile](../../../../How_To_Guides/Add_Component_to_Profile.md) for the same work on screen.
The [Component settings](#component-settings) section describes the settings that the add, read, and save endpoints share.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/ComponentTypes` | No permission beyond signing in | Lists the component types that the active profile can add. |
| POST | `/api/v2/ActiveProfile/ComponentType/{componentType}/Settings` | **Modify components** | Adds a component of a type, with the settings in the body. |
| GET | `/api/v2/ActiveProfile/Component/{component}/Settings` | No permission beyond signing in | Returns the settings of a component and the current revision. |
| PUT | `/api/v2/ActiveProfile/Component/{component}/Settings` | **Modify components** | Saves changed settings for a component. |
| DELETE | `/api/v2/ActiveProfile/Component/{component}` | **Modify components** | Removes a component from the active profile. |

### `GET /api/v2/ActiveProfile/ComponentTypes`

Lists the component types that the active profile can add.
Each entry has `name` and `description` as the **ADD COMPONENT** page shows them, `componentGroup`, and `componentType`, which is the value for `{componentType}`.
The list holds the types that the licence includes and that the component catalogue on the **Components & Plugins** pill makes available.
Refer to [Choose available components](../../../../Administration/Choose_Available_Components.md) and [Licensing](../../../../Licensing.md) for how each one limits the list.
For a packed [Custom Component](../../../../Components/Custom_Components/Pack_a_Custom_Component.md), `{componentType}` is `CustomComponent`.
Any signed-in user can read the list, and the call returns `200`.

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/ComponentTypes
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile/ComponentTypes -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows each entry as a list of fields rather than as JSON, with the same field names.

Replace `<token>` with a token from any signed-in user, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response is a list of entries with `name`, `description`, `componentGroup`, and `componentType`.

`GET /api/v2/ActiveProfile/ComponentTypes` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No component types are available. | Check the licence and the component catalogue, as [Choose available components](../../../../Administration/Choose_Available_Components.md) describes. |

### `POST /api/v2/ActiveProfile/ComponentType/{componentType}/Settings`

Adds a component of a type, with the settings in the body.
It needs the **Modify components** permission, and returns `201` with "Successfully created the component".
The body is the array of settings that [Component settings](#component-settings) describes, and it must hold at least one setting, including `SETTINGS.Name`.

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/ActiveProfile/ComponentType/<component-type>/Settings \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '[{"src": "SETTINGS.Name", "val": "<name>"}]'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/ActiveProfile/ComponentType/<component-type>/Settings -ContentType "application/json" -Headers @{ Authorization = "Bearer <token>" } -Body '[{"src": "SETTINGS.Name", "val": "<name>"}]'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component-type>` with a `componentType` from `GET /api/v2/ActiveProfile/ComponentTypes`.
- `<name>` with the name for the new component, such as `Pump 1`.
- `<token>` with a token from a user who has **Modify components**.

Add more objects to the array for the other settings that the component type needs.
Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The add worked when the response has the message "Successfully created the component".

`POST /api/v2/ActiveProfile/ComponentType/{componentType}/Settings` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "This component type is disabled or unavailable." | The component catalogue hides the type, or the licence lacks it. | Refer to [Choose available components](../../../../Administration/Choose_Available_Components.md). |
| `400` with "You must provide settings to set to the component" | The body holds no settings. | Send the array of settings that [Component settings](#component-settings) describes. |
| `404` | No component type matches `{componentType}`. | Use a `componentType` from `GET /api/v2/ActiveProfile/ComponentTypes`. |
| `409` about the name | Another component in the profile has that name. | Choose another `SETTINGS.Name`. |
| `409` about one instance per profile | The type allows one component per profile, and the profile has one. | Change the existing component instead. |
| `409` about the CAN address range | The CAN address range overlaps another component. | Choose a free CAN address range. |
| `409` about the tag destination | The tag destination overlaps another component's. | Change the name or the **Tag tree path**. |
| `409` with "There is already a Tritium or Virtual adapter in this profile using this bus number." | Another Tritium or Virtual adapter in the profile uses that bus number. | Choose a bus number that no other adapter uses. |
| `422` with an `errors` object | A setting fails its check, or the tag destination overlaps another component's. | Correct each field that `errors` names. |
| `500` with "The component could not be started, so it was not added." | The component failed to start with these settings. | Check the settings and the logs, then add it again. |

### `GET /api/v2/ActiveProfile/Component/{component}/Settings`

Returns the settings of a component, and the revision of the profile in the `ETag` header and in `settingsRevision`.
Any signed-in user who can see the component can read it, and the call returns `200`.
The example under the save endpoint shows the revision in use.

=== "macOS or Linux"

    ```bash
    curl -i -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/Component/<component>/Settings
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/ActiveProfile/Component/<component>/Settings -Headers @{ Authorization = "Bearer <token>" }
    ```

    PowerShell shows the settings as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component>` with the component's name, URL encoded, such as `Pump%201`.
- `<token>` with a token from any signed-in user who can see the component.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The call worked when the response holds `tabs` and `settingsRevision`, and the headers include `ETag`.

`GET /api/v2/ActiveProfile/Component/{component}/Settings` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No component has that name, or [component and collection security](../../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md) hides it from the caller. | Use the name as the side menu shows it. |

### `PUT /api/v2/ActiveProfile/Component/{component}/Settings`

Saves changed settings for a component.
It needs the **Modify components** permission and an `If-Match` header that holds the revision from the `ETag` header of the read endpoint, sent as it arrived.
The revision covers the whole active profile, so a save to any component moves it on.
A new value for `SETTINGS.Name` renames the component.
A successful save returns `200` with "Settings successfully saved" and the new `settingsRevision`.
The body is the array of settings that [Component settings](#component-settings) describes.

This example changes one setting of a component, using the revision from a read to guard the save.

1. Read the component's settings and note the `ETag` header:

    === "macOS or Linux"

        ```bash
        curl -i -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/Component/<component>/Settings
        ```

    === "Windows"

        Run these commands in PowerShell:

        ```powershell
        $response = Invoke-WebRequest -UseBasicParsing -Uri http://localhost:18080/api/v2/ActiveProfile/Component/<component>/Settings -Headers @{ Authorization = "Bearer <token>" }
        $response.Headers.ETag
        ```

        PowerShell prints the value of the header alone, such as `"42"`.

    The headers include the revision, such as:

    ```text
    ETag: "42"
    ```

2. Send the change, with the revision in `If-Match`:

    === "macOS or Linux"

        ```bash
        curl -X PUT http://localhost:18080/api/v2/ActiveProfile/Component/<component>/Settings \
          -H "Authorization: Bearer <token>" \
          -H "Content-Type: application/json" \
          -H 'If-Match: "<revision>"' \
          -d '[{"src": "<setting-id>", "val": "<value>"}]'
        ```

    === "Windows"

        Run this command in PowerShell:

        ```powershell
        Invoke-RestMethod -Method Put -Uri http://localhost:18080/api/v2/ActiveProfile/Component/<component>/Settings -ContentType "application/json" -Headers @{ Authorization = "Bearer <token>"; "If-Match" = '"<revision>"' } -Body '[{"src": "<setting-id>", "val": "<value>"}]'
        ```

        PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<component>` with the component's name, URL encoded, such as `Pump%201`.
- `<revision>` with the number from the `ETag` header in step 1, such as `42`.
- `<setting-id>` with the `id` of a field in the response from step 1, such as `SETTINGS.Name`.
- `<token>` with a token from a user who has **Modify components**.
- `<value>` with the new value, such as `Pump 2`.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.

The save worked when the response looks like this, shortened:

```json
{
  "message": "Settings successfully saved",
  "settingsRevision": "43"
}
```

`PUT /api/v2/ActiveProfile/Component/{component}/Settings` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` about security fields | The body holds the component's security fields. | Leave those fields out, and set the component's security on its **Security** tab, as [Restrict a component or collection](../../../../Administration/Users_and_Access/Component_And_Collection_Security/Restrict_a_Component_or_Collection.md) describes. |
| `400` with "You must provide settings to set to the component" | The body holds no settings. | Send the array of settings that [Component settings](#component-settings) describes. |
| `404` with "No active profile is loaded" | No profile is active. | Activate a profile, then send the change. |
| `404` with "No component was found" | No component has that name, or security hides it from the caller. | Use the name as the side menu shows it. |
| `409` about the revision | Another save to the active profile moved the revision on after your read. | Read the settings again and send the change once more. |
| `409` about the name | Another component in the profile has the new `SETTINGS.Name`. | Choose another name. |
| `409` about the CAN address range | The CAN address range overlaps another component. | Choose a free CAN address range. |
| `409` about the tag destination | The tag destination overlaps another component's. | Change the name or the **Tag tree path**. |
| `409` with "There is already a Tritium or Virtual adapter in this profile using this bus number." | Another Tritium or Virtual adapter in the profile uses that bus number. | Choose a bus number that no other adapter uses. |
| `422` with an `errors` object | A setting fails its check, or the tag destination overlaps another component's. | Correct each field that `errors` names. |
| `422` with "Unable to set the firmware settings on the device" | The device refused the firmware settings that `errors` names. | Correct those settings and send the change again. |
| `428` | The request has no `If-Match` header. | Send the revision from the `ETag` header of the read endpoint. |
| `500` with "Unable to set the firmware settings on the device" | The device refused the firmware settings and reported no setting by name. | Check that the device is connected, read the settings again, and send the change once more. |

### `DELETE /api/v2/ActiveProfile/Component/{component}`

Removes a component from the active profile.
To keep a copy of a component's files, download the profile pack before you delete the component, with the endpoint in [Profile packs](Profiles_API.md#profile-packs).
Deleting a component removes its settings from the profile and deletes its folder, which holds its dashboard, scripts, and other files.
It needs the **Modify components** permission, and returns `204` with no body.

=== "macOS or Linux"

    ```bash
    curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/ActiveProfile/Component/<component>
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Delete -Uri http://localhost:18080/api/v2/ActiveProfile/Component/<component> -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<component>` with the component's name, URL encoded, such as `Pump%201`.
- `<token>` with a token from a user who has **Modify components**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The delete worked when the response is `204` and the component is gone from the side menu.

`DELETE /api/v2/ActiveProfile/Component/{component}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `404` | No component has that name. | Use the name as the side menu shows it. |
| `500` | Profinity could not remove the component. | Check the logs, then delete it again. |

## Component settings

The settings endpoints use the same fields as the component's settings dialog.
A settings response holds `tabs`, each tab holds `sections`, and each section holds `fields`.
Each field has an `id`, a `label` as the dialog shows it, a `type`, and its current `value`.
A field whose `id` starts with `SETTINGS.`, such as `SETTINGS.Name`, is a setting that Profinity saves in the profile.

An endpoint that adds or changes settings takes a JSON array with an object for each setting:

| Field | Type | Default | Effect |
|---|---|---|---|
| `src` | Text | None | The `id` of the field to set, such as `SETTINGS.Name`. Required. |
| `val` | The type of the field | None | The value to set. Required. |

## File upload

This endpoint puts a file in the folder of a component, such as a DBC file, a script, or a dashboard.
Add the component first, because an upload to a component that is not in the profile fails.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| POST | `/api/v2/ActiveProfile/Upload/{filetype}` | **Modify profiles** | Uploads a file of a type to a component. |

### `POST /api/v2/ActiveProfile/Upload/{filetype}`

Uploads a file of a type to a component.
It needs the **Modify profiles** permission, and returns `200` with the `path` of the stored file.
`{filetype}` is `DBC`, `Script`, `Cell`, `Dashboard`, `Firmware`, `FirmwareSettings`, or `Images`.
Uploading a DBC file also needs **View DBC definitions**, and uploading a firmware file needs **Allow firmware actions**.
Uploading a script needs a licence that includes scripting.

| Field | Type | Default | Effect |
|---|---|---|---|
| `uploadFile` | File, multipart form field | None | The file to upload. Required, and not empty. |
| `componentName` | Text, query | None | The component that owns the file. A file type that belongs to a component needs it. |

=== "macOS or Linux"

    ```bash
    curl -X POST "http://localhost:18080/api/v2/ActiveProfile/Upload/<filetype>?componentName=<component>" \
      -H "Authorization: Bearer <token>" \
      -F "uploadFile=@<file>"
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    curl.exe -X POST "http://localhost:18080/api/v2/ActiveProfile/Upload/<filetype>?componentName=<component>" -H "Authorization: Bearer <token>" -F "uploadFile=@<file>"
    ```

Replace these placeholders:

- `<component>` with the component's name, URL encoded, such as `Pump%201`.
- `<file>` with the path of the file to upload.
- `<filetype>` with one of the file types named earlier, such as `DBC`.
- `<token>` with a token from a user who has **Modify profiles**, and the permission that the file type needs.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The upload worked when the response has the `path` of the stored file.
After a DBC upload, set the component's `SETTINGS.DBCFilename` to the file name alone, such as `DriverControl.dbc`, and after a dashboard upload set `SETTINGS.DashboardFilename`, with the [settings endpoints](#components).

`POST /api/v2/ActiveProfile/Upload/{filetype}` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` | The file is empty, `{filetype}` is not in the list, the file type needs a `componentName`, or the content fails its check. | Correct the file, the type, or the query value that the message names. |
| `401` with "DBC View permission is required to upload DBC files" | The token lacks **View DBC definitions**. | Use a token from a user who has the permission. |
| `403` with "Firmware Allow Actions permission is required to upload firmware files" | The token lacks **Allow firmware actions**. | Use a token from a user who has the permission. |
| `403` about the licence | The file type is `Script` and the licence does not include scripting. | Refer to [Licensing](../../../../Licensing.md). |
| `404` | The component is not in the active profile. | Add the component first, then upload. |
| `500` | Profinity could not write the file in the profile folder. | Check the logs and the folder permissions, then upload again. |
