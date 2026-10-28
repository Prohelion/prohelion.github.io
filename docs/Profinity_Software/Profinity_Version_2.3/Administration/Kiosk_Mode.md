---
title: Kiosk Mode
description: "Set up automatic sign-in for kiosk displays and unattended monitoring stations, bypassing the login page for a specific profile."
type: concept
owner: Documentation
last_reviewed: 2026-10-28
---

# Kiosk Mode

Kiosk Mode signs a display in automatically as a user you choose, so nobody at the display has to sign in.
It suits kiosk displays, public terminals, and dedicated monitoring stations that stay signed in without anyone at the keyboard.
You set it per [profile](Profiles.md), and it applies whenever that profile is the active profile.

!!! warning "A kiosk session inherits the kiosk user's permissions"
    Anyone who can reach a kiosk display, or the Profinity web address of a kiosk profile, acts as the kiosk user with every permission that user holds.
    Profinity lists any enabled user in the Kiosk Mode User dropdown, including administrators, so choose a dedicated user with the minimum permissions required.
    Refer to [Choosing the kiosk user](#choosing-the-kiosk-user).

## Enabling Kiosk Mode

To set Kiosk Mode for a profile, enable **Kiosk Mode** in the profile settings and select a **Kiosk Mode User**.
The user must be enabled, as described in [Choosing the kiosk user](#choosing-the-kiosk-user).
The steps, together with the browser and operating system setup that opens Profinity full screen on the display, are in [How to set up Profinity as a kiosk application](../How_To_Guides/Set_Up_Profinity_as_Kiosk.md).

Profinity rejects the save if Kiosk Mode is enabled without a Kiosk Mode User.
It also rejects the save if the selected user no longer exists or has been disabled.

Kiosk Mode applies only to the active profile.
A display signs in automatically when a profile with Kiosk Mode enabled is active.
Normal login is required when a profile without Kiosk Mode becomes active.

## What the display does

When a browser opens Profinity on a profile with Kiosk Mode enabled, the login page appears briefly and then signs in as the kiosk user.
This takes a few seconds and needs no username or password from anyone at the display.

If someone signs out on purpose, Profinity does not sign the display back in automatically, so that a person can log in as a different user.
The login page stays on the credentials form and shows a **Return to kiosk** button, which resumes the kiosk session.

Profinity checks Kiosk Mode continuously while the display is signed in.
The display is signed out within a few seconds, and the normal login page is shown, if an administrator does any of these:

- Disables Kiosk Mode.
- Changes the Kiosk Mode User.
- Switches to a profile without Kiosk Mode.

The previous kiosk session can no longer be used.

## Choosing the kiosk user

The kiosk user must exist and must be enabled.
Profinity does not restrict which roles that user holds, so the user's permissions are the only control over what an unattended display can do.
Create a dedicated account for the purpose, such as `kiosk-display`, rather than reusing a person's account.
A dedicated account also makes kiosk access easy to identify in the system logs.
You create users in **Users & Groups**, which needs a Server licence, as described in [Licensing](../Licensing.md).

Assign the dedicated account a read-only role built from view permissions only, as described in [Create a role](./Users_and_Access/Create_a_Role.md#which-roles-to-create).
Never select an administrator or a user holding a high-risk permission such as **Send CAN messages**, because anyone at the display would inherit it.
On a Windows desktop installation without a Server licence there are no user accounts to select, so Kiosk Mode needs a Server licence and a dedicated user first.

A kiosk session expires after the **Access token lifetime (minutes)** set in [Session policy and login lockout](System_Configuration/Security/Session_Policy.md).
The default is 120 minutes.
A display that runs for months without attention can use a kiosk user marked as a service account, whose session never expires.
Treat that account with the same care as any long-lived credential.
Review the kiosk user from time to time to confirm it is still appropriate and enabled.
Disable Kiosk Mode on any profile that no longer needs it.

## Troubleshooting

- If the login page is shown instead of signing in, confirm all of the following:
  - The profile is the active profile.
  - Kiosk Mode is enabled on the profile.
  - A valid, enabled user is selected as the Kiosk Mode User.
  If the display was signed out on purpose, select **Return to kiosk**.
- If the display shows the wrong profile, make the intended profile active, because Kiosk Mode signs in to the active profile only.
- If the display was signed out unexpectedly, Kiosk Mode was disabled, the Kiosk Mode User was changed, or a different profile was made active.
  Check the profile settings and sign the display in again.
- If a user is missing from the Kiosk Mode User dropdown, enable the user in [Managing users](./Users_and_Access/Manage_Users.md), because only enabled users are listed.
- If the save is rejected, select an existing, enabled user before saving, as Kiosk Mode cannot be enabled without one.
