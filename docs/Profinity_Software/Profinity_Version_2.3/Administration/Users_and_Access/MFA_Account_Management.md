---
title: MFA account management
description: "Reset a user's multi-factor authentication or password as an administrator, and manage your own authenticator from the ADMIN page."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# MFA account management

A user manages their own authenticator from the **ADMIN** page.
An administrator resets another user's authenticator or password from the **User Actions** tab of that user's settings dialog.
Both apply to **local** users when the site **Sign-in method** is **Local**.
The policy that requires multi-factor authentication (MFA) is described in [Two-factor authentication](../System_Configuration/Security/Two_Factor_Authentication.md).

Users who sign in through single sign-on (SSO) manage MFA and credentials in the identity provider.
**Reset MFA** and **Reset Password** are not used for them, so reset their authenticator or password in the identity provider.

## Self-service management

When the site **Sign-in method** is **Local** and **Enforce two-factor for local users** is on, a signed-in user sees a **Two-Factor Authentication** pill in the **Account** group of the **ADMIN** page, next to **Change My Password**.
The pill is not shown in a kiosk session.
It appears only while two-factor authentication is enforced, so a user cannot enrol voluntarily on a site that does not enforce it.
To open it, select **ADMIN** in the side menu and then the pill.

The dialog states whether two-factor authentication is enabled and how many recovery codes remain.
It offers **Reset authenticator** and **Regenerate recovery codes**.
**Reset authenticator** asks for a code from the current authenticator app before it issues a new one.
A user who has lost the app cannot use it, and asks an administrator for a reset instead.
Where the site allows security keys, the dialog also holds the panel for registering one, as described in [Two-factor authentication](../System_Configuration/Security/Two_Factor_Authentication.md#security-key-sign-in).

## Administrator reset of MFA

A user with the **Security administration** permission can clear another user's authenticator when the site enforces two-factor authentication and the licence includes the **Two-Factor Authentication** feature.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Click the other user's row to open their settings dialog.
3. Select the **User Actions** tab.
4. Select **Reset MFA** and confirm.

The user must then set up two-factor authentication again at their next sign-in.

**Reset MFA** is hidden on the administrator's own **User Actions** tab, and on the tab of a service account.
An administrator manages their own authenticator with the **Two-Factor Authentication** pill on the **ADMIN** page.

## Administrator reset of a password

**Reset Password** is also on the **User Actions** tab of the other user's settings dialog.
It requires the user to choose a new password at the next sign-in and signs out the user's active sessions, as described in [Password policy](../System_Configuration/Security/Password_Policy.md#forced-password-change).
Like **Reset MFA**, it is hidden on the administrator's own account.
It is shown only when the site **Sign-in method** is **Local**.

## Related documentation

- [Managing users](Manage_Users.md)
- [Roles and permissions](Roles_and_Permissions.md)
- [Endpoint Reference](../../Integrating_to_Profinity/APIs/Endpoint_Reference.md#account-resets), the matching routes for integrators
