---
title: Active profile API
description: "Look up the REST API endpoints that switch the active profile, add and configure its components, check tag destinations, and update firmware."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Active profile API

The Active profile API, the ActiveProfile group in Swagger, works on the profile that Profinity is running: it switches the active profile, returns its configuration and images, adds, configures, and removes its [components](../../../Components/index.md), and updates their firmware.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

Refer to the [Profiles API](Profiles_API.md) for the endpoints that list, create, and delete profiles.

Use these links to go to a section.

- [Active profile](#active-profile)
- [Profile images](#profile-images)
- [Kiosk status](#kiosk-status)
- [Settings requests and responses](#settings-requests-and-responses)
- [Component types](#component-types)
- [Tag destinations](#tag-destinations)
- [Component settings](#component-settings)
- [Session credentials](#session-credentials)
- [Firmware](#firmware)
- [Error responses](#error-responses)
- [Component settings change example](#component-settings-change-example)

In an endpoint, `{profileName}` is the profile name as the profile list shows it, and `{component}` is the component's name as the side menu shows it.
Both are URL encoded, so `Pump Station` becomes `Pump%20Station` and `Pump 1` becomes `Pump%201`.

## Active profile

These endpoints work on the profile that Profinity is running, which **ACTIVATE** on the **Profile** pill also sets.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile` | No permission beyond signing in | Returns the name of the active profile as plain text. |
| POST | `/api/v2/ActiveProfile/{profileName}` | **Modify profiles** | Loads the named profile and makes it the active profile. |
| GET | `/api/v2/ActiveProfile/Config` | No permission beyond signing in | Returns the active profile as a JSON document. |

The switch endpoint returns `true` once the profile has loaded.
A switch also changes what a kiosk display shows, which [Kiosk Mode](../../../Administration/Kiosk_Mode.md#what-the-display-does) explains.
Refer to the [Profile switch example](Profiles_API.md#profile-switch-example) for the commands that list the profiles, switch to one, and check the result.

The configuration endpoint holds only the components that the caller can see under [component and collection security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).

## Profile images

These endpoints manage the images in the `images` folder of the active profile, which [Profile folders](../../../Administration/Profile_Folders.md) describes.
The [Menu Layout](../../../Administration/Menu_Layout.md) editor offers these images as menu icons.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/Images` | No permission beyond signing in | Lists the images in the active profile. |
| POST | `/api/v2/ActiveProfile/Images` | **Modify profiles** | Adds an image to the active profile. |

Each entry in the list has `fileName`, `mediaType`, `size` in bytes, and `url`, the address that Profinity serves the image from.

The add endpoint takes a JSON body:

| Field | Type | Default | Effect |
|---|---|---|---|
| `fileName` | Text | None | The file name, ending in `.svg`, `.png`, `.jpg`, `.jpeg`, or `.webp`. Required. |
| `mediaType` | Text | None | The media type that matches the file name: `image/svg+xml`, `image/png`, `image/jpeg`, or `image/webp`. Required. |
| `contentBase64` | Text | None | The image file, Base64 encoded, up to 2,097,152 bytes (2 MiB) before encoding. Required. |

The add endpoint returns `201` with the new entry.

## Kiosk status

The kiosk status endpoint tells a display whether the active profile signs it in automatically with [Kiosk Mode](../../../Administration/Kiosk_Mode.md).
The sign-in page calls it before anyone has signed in, so it needs no token.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/KioskStatus` | None | Reports whether Kiosk Mode is in effect for the active profile. |

In the response, `kioskModeEnabled` is `true` when **Kiosk mode** is on for the active profile and its **Kiosk mode user** exists and is enabled.
`profileLoaded` is `false` when no profile is active.

## Settings requests and responses

The component settings endpoints use the same fields as the component's settings dialog.
A settings response holds `tabs`, each tab holds `sections`, and each section holds `fields`.
Each field has an `id`, a `label` as the dialog shows it, a `type`, and its current `value`.

A field whose `id` starts with `SETTINGS.`, such as `SETTINGS.Name`, is a setting that Profinity saves in the profile.
A field whose `id` starts with `FIRMWARE.` is a firmware setting, which Profinity writes to the device.

An endpoint that adds, changes, or checks settings takes a JSON array with an object for each setting:

| Field | Type | Default | Effect |
|---|---|---|---|
| `src` | Text | None | The `id` of the field to set, taken from a settings response. Required. |
| `val` | The type of the field | None | The value to set, such as text for `SETTINGS.Name`. Required. |

A setting that fails its check returns `422`, with an `errors` object that names each field and gives its message.

## Component types

These endpoints match the **ADD COMPONENT** page.
Refer to [How to add a component to your profile](../../../How_To_Guides/Add_Component_to_Profile.md) for the same work on screen.
To add a component, read the settings of a new component of the type, change the values you need, and send them back.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/ComponentTypes` | No permission beyond signing in | Lists the component types that the active profile can add. |
| GET | `/api/v2/ActiveProfile/ComponentType/{componentType}/Settings` | **Modify components** | Returns the settings of a new component of a type, with default values and a name that is free in the profile. |
| POST | `/api/v2/ActiveProfile/ComponentType/{componentType}/Settings` | **Modify components** | Adds a component of a type, with the settings in the body. |
| GET | `/api/v2/ActiveProfile/ComponentType/{componentType}/Catalog/{catalogKey}/Settings` | **Modify components** | Returns the settings of a new packed Custom Component. |
| POST | `/api/v2/ActiveProfile/ComponentType/{componentType}/Catalog/{catalogKey}/Settings` | **Modify components** | Adds a packed Custom Component. |
| GET | `/api/v2/ActiveProfile/DiscoveredComponents/{component}/Settings` | **Modify components** | Returns the settings of a new component for an adapter that Profinity discovered. |
| POST | `/api/v2/ActiveProfile/DiscoveredComponents/{component}/Settings` | **Modify components** | Adds a discovered adapter as a component. |

Each entry in the list of component types has `name` and `description` as the **ADD COMPONENT** page shows them, `componentGroup`, and `componentType`, which is the value for `{componentType}`.
The list holds the types that the licence includes and that the component catalogue on the **Components & Plugins** pill makes available.
Refer to [Choose available components](../../../Administration/Choose_Available_Components.md) and [Licensing](../../../Licensing.md) for how each one limits the list.

For a packed [Custom Component](../../../Components/Custom_Components/Pack_a_Custom_Component.md), `{componentType}` is `CustomComponent`.
`{catalogKey}` is the plugin ID of the packed component, which is the file name of its package without the extension.

For a discovered adapter, `{component}` is the name that the **ADD COMPONENT** page shows for the adapter.
Refer to [How to connect to CAN bus](../../../How_To_Guides/Connect_to_CAN_Bus.md) for how Profinity discovers adapters.
A discovered adapter leaves the list when Profinity stops seeing it.

An add endpoint returns `201` with "Successfully created the component".
The errors it returns are in [Error responses](#error-responses).

## Tag destinations

A *tag destination* is the place in the tag tree where a component publishes its tags.
For most components the **Tag tree path** and the component's name set it, as [Nest a component in the tag tree](../../../Tags/Selecting_Tags/Nest_a_Component_in_the_Tag_Tree.md) explains.
For a [Tag Relay Receiver](../../../Components/Tag_Relays/Tag_Relay_Receiver.md), the **Receiver tag path prefix** sets it.
Each destination in a profile must be unique, and one destination cannot sit inside another.

These endpoints check a set of settings against the other components in the active profile and save nothing.
The settings dialog uses them to report an overlap while you change the component's name or **Tag tree path**.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| POST | `/api/v2/ActiveProfile/Component/{component}/Settings/ValidateTagDestinations` | **Modify components** | Checks changed settings for a component in the profile. |
| POST | `/api/v2/ActiveProfile/ComponentType/{componentType}/Settings/ValidateTagDestinations` | **Modify components** | Checks the settings of a new component of a type. |
| POST | `/api/v2/ActiveProfile/ComponentType/{componentType}/Catalog/{catalogKey}/Settings/ValidateTagDestinations` | **Modify components** | Checks the settings of a new packed Custom Component. |
| POST | `/api/v2/ActiveProfile/DiscoveredComponents/{component}/Settings/ValidateTagDestinations` | **Modify components** | Checks the settings of a new component for a discovered adapter. |

Each endpoint takes the same array of settings as the add and change endpoints.
The endpoints for a new component also check each value, and the endpoint for a component in the profile reads only the `SETTINGS.` fields.

An endpoint returns `200` with "Tag destinations are valid." when the destination is free.
Otherwise it returns `422`, and the `errors` object names the fields.
The message has the form `Tag destination 'A' overlaps 'B'. Choose a unique destination.`
The add and change endpoints run the same check before they save, so a separate check is optional.

## Component settings

These endpoints match the component's **Change Settings** dialog, which opens from its dashboard menu.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/Component/{component}/Settings` | No permission beyond signing in | Returns the settings of a component and the current revision. |
| PUT | `/api/v2/ActiveProfile/Component/{component}/Settings` | **Modify components** | Saves changed settings and firmware settings for a component. |
| DELETE | `/api/v2/ActiveProfile/Component/{component}` | **Modify components** | Removes a component from the active profile. |

The read and save endpoints return `404` for a component that the caller cannot see under [component and collection security](../../../Administration/Users_and_Access/Component_And_Collection_Security/index.md).
The read endpoint includes a component's firmware settings once Profinity has read them from the device.

The save endpoint needs an `If-Match` header that holds the revision from the `ETag` header of the read endpoint, sent as it arrived.
The revision covers the whole active profile, so a save to any component moves it on.

The save endpoint writes the `FIRMWARE.` settings to the device first, and saves the `SETTINGS.` settings only when the device accepts them.
A new value for `SETTINGS.Name` renames the component.
A successful save returns "Settings successfully saved" and the new `settingsRevision`.

To keep a copy of a component's files, download the profile pack before you delete the component, with the endpoint in [Profile packs](Profiles_API.md#profile-packs).
Deleting a component removes its settings from the profile and deletes its folder, which holds its dashboard, scripts, and other files.
The delete endpoint returns `204`.

## Session credentials

A *session credential* is a secret that a device needs before Profinity can change its protected firmware settings.
Profinity holds it for one sign-in session only and never saves it to the profile.
In Profinity 2.3, the components that ship with Profinity have one session credential, the **Firmware configuration key** of a D1000 Gen2, M48 Gen2, or C48 Gen2 Battery Management Unit (BMU).
It unlocks the Admin firmware parameters, as [Update BMU configuration and firmware](../../../Components/Battery_Management_Systems/Prohelion_BMU/Update_BMU_Configuration_and_Firmware.md#unlock-administration-firmware-parameters) describes.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| POST | `/api/v2/ActiveProfile/Component/{component}/SessionCredential` | **Modify components** | Applies a session credential to a component for the caller's session. |
| DELETE | `/api/v2/ActiveProfile/Component/{component}/SessionCredential/{credentialId}` | **Modify components** | Ends the caller's session credential on a component. |

A settings response shows a session credential as a field whose `type` is `SessionCredentialValue`.
Its `sessionCredential` object gives the `credentialId`, `isActive`, `expiresAtUtc`, and `defaultTimeoutMinutes`.
For a Gen2 BMU, the `credentialId` is `FirmwareKey`.

The apply endpoint takes a JSON body:

| Field | Type | Default | Effect |
|---|---|---|---|
| `credentialId` | Text | None | The credential to apply, from `sessionCredential.credentialId` in the settings response. Required. |
| `value` | Text | None | The secret. A Gen2 BMU key is hexadecimal from `0` to `FFFF`, with or without the `0x` prefix. Required. |
| `timeoutMinutes` | Integer | The component's default, which is 30 for a Gen2 BMU | The number of minutes before the session ends. A value of `0` or less uses the default. |

Both endpoints return the component's settings in the same form as the read endpoint, reloaded with the credential applied or cleared.
The credential applies only to calls made with the same token, and it ends when the timeout passes, when that session signs out, or when Profinity restarts.

## Firmware

These endpoints download a component's firmware settings and update its firmware.

!!! danger "A firmware update cannot be undone"
    An update replaces the firmware on the device.
    Download the firmware settings of the component before you start, so that you keep a record of the values the device held.

| Method | Endpoint | Permission | Purpose |
|---|---|---|---|
| GET | `/api/v2/ActiveProfile/Component/{component}/Settings/Firmware/Download` | **View firmware** | Downloads the firmware settings of a component as a YAML file. |
| GET | `/api/v2/ActiveProfile/FirmwareUpdates` | **View firmware** | Lists the components that Profinity can update from a firmware feed, with the firmware status of each. |
| POST | `/api/v2/ActiveProfile/FirmwareUpdates/Check` | **View firmware** | Reads each firmware feed again, then returns the same list. |
| POST | `/api/v2/ActiveProfile/FirmwareUpdates/{component}/Upgrade` | **Allow firmware actions** | Starts a firmware update of one component. |
| POST | `/api/v2/ActiveProfile/FirmwareUpdates/UpgradeAll` | **Allow firmware actions** | Updates each component that has later firmware available, one after another. |
| GET | `/api/v2/ActiveProfile/FirmwareUpdates/Progress/{actionId}` | **Allow firmware actions** | Reports the progress of a firmware update. |

To flash a single device from its own settings dialog instead, refer to [Update BMU configuration and firmware](../../../Components/Battery_Management_Systems/Prohelion_BMU/Update_BMU_Configuration_and_Firmware.md) and [Update WaveSculptor configuration and firmware](../../../Components/Motor_Controller/WaveSculptor/Update_WaveSculptor_Configuration_and_Firmware.md).

A *firmware feed* is a web address that publishes the latest firmware for a device.
Profinity holds the feed for each component type that it can update this way, and the list and check endpoints show only those components.
Both endpoints take one optional query value:

| Field | Type | Default | Effect |
|---|---|---|---|
| `online` | Boolean | `true` | Reads each firmware feed. Set it to `false` to skip the feeds, so each connected component shows as `offlineReady`. |

The response holds `components`, and each entry in it has these fields:

| Field | Type | Effect |
|---|---|---|
| `componentName` | Text | The component's name, the value for `{component}`. |
| `deviceVersion` | Text | The firmware version on the device. |
| `availableVersion` | Text | The latest version on the feed. |
| `status` | Text | One of `updateAvailable`, `upToDate`, `notConnected`, `offlineReady`, `versionConflict`, or `error`. |
| `statusLine` | Text | The status in words, as the product shows it. |
| `requiresAdminSession` | `true` or `false` | `true` for a component that needs its session credential applied before an update. |
| `sessionCredentialId` | Text | The `credentialId` to apply, for a component that needs one. |
| `adminSessionActive` | `true` or `false` | `true` when the component needs no session credential, or has one applied for the caller's token. |

When `adminSessionActive` is `false`, apply the component's session credential with the same token before the update, as [Session credentials](#session-credentials) describes.

The update endpoint for one component takes a JSON body:

| Field | Type | Default | Effect |
|---|---|---|---|
| `overrideImageFile` | Text | None | The file name of a `.bin` firmware file to use in place of the feed's latest. Profinity uses the copy in the profile's `firmware` folder, and otherwise downloads it from the feed. Required when `online` is `false`. |
| `online` | Boolean | `true` | Reads the feed for the firmware file. Set it to `false` to use `overrideImageFile` without reading the feed. |

The update endpoint for every component takes a JSON body:

| Field | Type | Default | Effect |
|---|---|---|---|
| `stopOnError` | Boolean | `false` | Stops the run at the first component whose update fails. |
| `online` | Boolean | `true` | Reads each feed for the firmware file. With `false`, the run also takes in each component whose status is `offlineReady`, and each of those updates fails, because this endpoint takes no firmware file. |

To update a component without reading its feed, use the endpoint for one component with `overrideImageFile`.

The endpoint for one component returns one result, and the endpoint for every component returns a result for each component in `results`.
Each result has `componentName`, `succeeded`, `message`, and `actionId`.
Pass `actionId` to the progress endpoint, which returns a number from `0` to `1`, where `1` means the update has finished and `-1` means it failed.

## Error responses

The endpoints on this page return these errors when Profinity refuses a request.

| What you see | Cause | What to do |
|---|---|---|
| `404` from `POST /api/v2/ActiveProfile/{profileName}` | No profile has that name. | Use a `name` from the profile list. |
| `400` from `POST /api/v2/ActiveProfile/{profileName}` | The profile needs a later release of Profinity, or uses a component whose plugin is missing or failed to load. | Upgrade Profinity, or install the plugin. Refer to [Install and manage plugins](../../../Administration/Install_and_Manage_Plugins.md). |
| `404` from `GET /api/v2/ActiveProfile` or `GET /api/v2/ActiveProfile/Config` | No profile is active. | Activate a profile with `POST /api/v2/ActiveProfile/{profileName}`. |
| `409` from `POST /api/v2/ActiveProfile/Images` | The profile already has an image of that name. | Choose another `fileName`. |
| `400` from `POST /api/v2/ActiveProfile/Images` | The media type does not match the file name, the content is not valid Base64, or the image is empty or larger than 2 MiB. | Correct the field the message names and send the image again. |
| `400` with "This component type is disabled or unavailable." from an add endpoint | The component catalogue hides the type, or the licence lacks it. | Refer to [Choose available components](../../../Administration/Choose_Available_Components.md). |
| `404` from a discovered adapter endpoint | Profinity no longer sees the adapter. | Check the adapter's connection, then list the component types again. |
| `409` from an add or save endpoint about the CAN address range | The CAN address range overlaps another component. | Choose a free CAN address range. |
| `409` from an add or save endpoint about the name | Another component in the profile has that name. | Choose another `SETTINGS.Name`. |
| `409` from an add or save endpoint about a tag destination | The tag destination overlaps another, as [Tag destinations](#tag-destinations) explains. | Change the name or the **Tag tree path**. |
| `409` with "There is already a Tritium or Virtual adapter in this profile using this bus number." | Another Tritium or Virtual adapter in the profile uses that bus number. | Choose a bus number that no other adapter uses. |
| `409` from an add endpoint for a type that allows one per profile | The profile already has a component of that type. | Change the existing component instead. |
| `422` with an `errors` object | A setting fails its check, or a tag destination overlaps another. | Correct each field that `errors` names. |
| `428` from the save endpoint | The request has no `If-Match` header. | Send the revision from the `ETag` header of the read endpoint. |
| `409` from the save endpoint with a revision | Another save to the active profile moved the revision on after your read. | Read the settings again and send the change once more. |
| `422` with "Unable to set the firmware settings on the device" | The device refused the firmware settings that `errors` names. | Correct those settings and send the change again. |
| `500` with "Unable to set the firmware settings on the device" | The device refused the firmware settings and reported no setting by name. | Check that the device is connected, read the settings again, and send the change once more. |
| `400` from the save endpoint about security fields | The body holds the component's security fields. | Leave those fields out, and set the component's security on its **Security** tab, as [Restrict a component or collection](../../../Administration/Users_and_Access/Component_And_Collection_Security/Restrict_a_Component_or_Collection.md) describes. |
| `400` from the apply endpoint for a session credential | The component has no credential with that `credentialId`, or the `value` is outside the allowed range. | Take `credentialId` from the settings response, and check the value. |
| `400` from the firmware settings download endpoint | The component has no firmware settings. | Download from a component whose settings response has `FIRMWARE.` fields. |
| `succeeded` is `false` with "Firmware configuration key session is required before upgrading." | The component needs its session credential, and none is applied for this token. | Apply the credential with the same token, then start the update again. |
| `succeeded` is `false` with "Offline upgrade requires a firmware package (.bin) file." | `online` is `false` and the request names no firmware file. | Use the endpoint for one component, with `overrideImageFile`. |

## Component settings change example

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
