---
title: Endpoint Reference
description: "Look up REST API routes for alerts, collections, derived tags, Profinity AI chat, component security, account resets, tag relay and themes."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Endpoint Reference

This page lists REST API routes that complement the screens described elsewhere in the documentation.
The Swagger page, the interactive API page on your Profinity instance, lists every route and the parameters it accepts.
Refer to [Profinity REST APIs](index.md) for how to authenticate.
Each route needs the same permission as the matching screen.

## Alerts

Routes under `/api/v2/Alerts` return and manage the alerts shown in the [Alerts Log](../../Tags/Alerts.md).

| Method | Route | Body |
|--------|-------|------|
| GET | `/api/v2/Alerts/Active` | None. Optional query values `componentId`, `tagPrefix`, `unacknowledgedOnly` and `level`. |
| GET | `/api/v2/Alerts/History` | None. Optional query values `componentId`, `tagPrefix`, `pageIndex`, `pageSize`, `level`, `fromUtc`, and `toUtc`. |
| POST | `/api/v2/Alerts/Ack` | `{ "ruleId": "...", "tagId": "..." }` |
| POST | `/api/v2/Alerts/Unack` | `{ "ruleId": "...", "tagId": "..." }` |
| POST | `/api/v2/Alerts/Silence` | `{ "ruleId": "...", "tagId": "...", "durationMinutes": 60 }` |

Through the API a silence can last from 1 to 1440 minutes (24 hours).
A request outside that range is refused with "durationMinutes must be between 1 and 1440."
The `Unack` route is the same revert that the **Unacknowledge alert** button uses.

## Collections and derived tags

| Method | Route | Purpose |
|--------|-------|---------|
| GET, PUT | `/api/v2/Tags/Collections` | Reads or saves the [collections](../../Tags/Collections/index.md) document, with JSON request and response bodies. Reading needs **View tag collections** and saving needs **Modify tag collections**. |
| GET, PUT | `/api/v2/Tags/DerivedTags` | Reads or saves the [derived tags](../../Tags/Derived_Tags/index.md) document, with the same permissions as collections. |

## Profinity AI

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Ai/Chat` | Streams a chat response for the calling user, using the instance's [Profinity AI](../../Administration/System_Configuration/AI_Settings.md) configuration. |

## Component and collection security

The component and collection security routes work on the active profile only.
There is no route to edit security for a profile that is not currently loaded.
A GET response includes an `unresolvedRoles` list alongside `mode` and `allowedRoles`.
A PUT accepts only `mode` and `allowedRoles`.
Refer to [Component and collection security](../../Administration/Users_and_Access/Component_And_Collection_Security.md) for the policy itself.

| Method | Route | Permission | Purpose |
|--------|-------|------------|---------|
| GET, PUT | `/api/v2/ActiveProfile/components/{componentName}/security` | **Security administration** | Reads or writes the security policy for a component on the active profile. `{componentName}` is the component's display name. |
| GET, PUT | `/api/v2/ActiveProfile/collections/{collectionId}/security` | **Security administration** | Reads or writes the security policy for a collection on the active profile, including the reserved `All` collection. |

## Account resets

These routes need the **Security administration** permission.
They match the **Reset MFA** (multi-factor authentication) and **Reset Password** actions in [Managing users](../../Administration/Users_and_Access/Manage_Users.md).

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Users/{username}/TwoFactor/Reset` | Clears the user's authenticator enrolment. |
| POST | `/api/v2/Users/{username}/Password/Reset` | Requires a password change at the next sign-in and signs out active sessions. |

## Tag Relay

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Relay/snapshot` | Receives a snapshot from a [Tag Relay Sender](../../Components/Tag_Relays/Tag_Relay_Sender.md) that uses HTTPS. Rules for this route follow the table. |

The rules for the snapshot route are:

- The caller needs a JSON Web Token (JWT) for a user with the **Receive external tags** permission, or for an Admin.
- The request body can be up to 5 MB.
- An instance accepts relay posts for only one [Tag Relay Receiver](../../Components/Tag_Relays/Tag_Relay_Receiver.md) set to HTTPS.

## Themes

The theme is read-only through the API.
`GET /api/v2/Themes` is anonymous, so the sign-in page can use it before a user has authenticated.
It returns `appTitle`, `hasCustomTheme` and a `logos` object with `main`, `login` and `favicon` URLs.
The generated stylesheet is served from `/Themes/theme.css`, and each asset from `/Themes/Assets/{file}`.
Changes are made by editing the theme file, as described in [Themes and branding](../../Customising_Profinity/Theming/index.md).
