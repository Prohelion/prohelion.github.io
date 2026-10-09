---
title: Kiosk Mode
description: "Configure automatic sign-in for kiosk displays and unattended monitoring stations, bypassing the login page for a specific profile."
---

# Kiosk Mode

Kiosk Mode signs a display in automatically as a user you choose, so that the login page is never shown on kiosk displays, public terminals and dedicated monitoring stations that need to stay signed in without anyone at the keyboard. It is set per [profile](Profiles.md) and applies whenever that profile is the active profile.

!!! warning "A Kiosk Session Inherits the Kiosk User's Permissions"
    Anyone who can reach a kiosk display, or the Profinity web address of a kiosk profile, acts as the kiosk user with every permission that user holds. Profinity lists any enabled user in the Kiosk Mode User dropdown, including administrators, so choose a dedicated user with the minimum permissions required. See [Choosing the Kiosk User](#choosing-the-kiosk-user).

## Enabling Kiosk Mode

To enable Kiosk Mode, select **ADMIN** in the side menu, open the **Profile** pill, select or create the profile and open its settings, then:

1. Enable **Kiosk Mode**.
2. Select a **Kiosk Mode User** from the dropdown, which lists the enabled users.
3. Save the profile settings.

Profinity rejects the save if Kiosk Mode is enabled without a Kiosk Mode User, or if the selected user no longer exists or has been disabled. Kiosk Mode only applies to the active profile, so a display signs in automatically when a profile with Kiosk Mode enabled is active, and normal login is required when a profile without Kiosk Mode becomes active.

For the browser and operating system setup that opens Profinity full screen on the display, see [How to Set Up Profinity as a Kiosk Application](../How_To_Guides/Set_Up_Profinity_as_Kiosk.md).

## What the Display Does

When a browser opens Profinity on a profile with Kiosk Mode enabled, the login page appears briefly and then signs in as the kiosk user, which takes a few seconds and needs no username or password from anyone at the display.

If someone signs out on purpose, Profinity does not sign the display back in automatically, so that an operator can log in as a different user. The login page stays on the credentials form and shows a **Return to kiosk** button, which resumes the kiosk session.

Kiosk Mode is checked continuously while the display is signed in. If an administrator disables Kiosk Mode, changes the Kiosk Mode User or switches to a profile without Kiosk Mode, the display is signed out within a few seconds and the normal login page is shown, and the previous kiosk session can no longer be used.

## Choosing the Kiosk User

The kiosk user must exist and must be enabled, and Profinity does not restrict which roles that user holds. The permissions of the selected user are therefore the only control over what an unattended display can do, so create a dedicated account for the purpose, such as `kiosk-display`, rather than reusing a person's account, which also makes kiosk access easy to identify in the system logs. A dedicated user is created in **Users & Groups**, which needs the Profinity Server feature, as described in [Licensing](Licensing.md).

Assign the dedicated account a read-only role built from view permissions only, as described in [Roles and Permissions](./Users_and_Access/Roles_and_Permissions.md#which-roles-to-create). Never select an administrator or a user holding a high-risk permission such as **Send CAN messages**, because anyone at the display would inherit it. On an unlicensed Desktop host, where the built-in administrator is the only user, Kiosk Mode can technically use that administrator, but this is not recommended: a kiosk user should be a low-power, read-only user.

A kiosk session expires after the **Access token lifetime (minutes)** set in [Session Policy and Login Lockout](System_Configuration/Security/index.md#session-policy-and-login-lockout), which is 120 minutes by default. A display that runs for months without attention can use a kiosk user marked as a service account, whose session never expires, provided the account is treated with the same care as any long-lived credential. Review the kiosk user from time to time to confirm it is still appropriate and enabled, and disable Kiosk Mode on any profile that no longer needs it.

## Troubleshooting

- **The login page is shown instead of signing in:** confirm that the profile is the active profile, that Kiosk Mode is enabled on it and that a valid, enabled user is selected as the Kiosk Mode User. If the display was signed out on purpose, select **Return to kiosk**.
- **The display shows the wrong profile:** Kiosk Mode signs in to the active profile only, so make the intended profile active.
- **The display was signed out unexpectedly:** Kiosk Mode was disabled, the Kiosk Mode User was changed or a different profile was made active. Check the profile settings and sign the display in again.
- **A user is missing from the Kiosk Mode User dropdown:** only enabled users are listed, so enable the user in [Managing Users](./Users_and_Access/Manage_Users.md).
- **The save is rejected:** select an existing, enabled user before saving, as Kiosk Mode cannot be enabled without one.

## Related Documentation

- [Profiles](./Profiles.md): profile configuration and management
- [Managing Users](./Users_and_Access/Manage_Users.md): user accounts, roles and permissions
- [How to Set Up Profinity as a Kiosk Application](../How_To_Guides/Set_Up_Profinity_as_Kiosk.md): browser and operating system setup for a kiosk display
