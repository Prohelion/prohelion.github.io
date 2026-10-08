---
title: MFA Account Management
description: "Reset a user's multi-factor authentication or password as an administrator, and manage your own authenticator from the ADMIN page."
---

# MFA Account Management

A user manages their own authenticator from the **ADMIN** page, and an administrator resets another user's authenticator or password from the **User Actions** tab of that user's settings dialog. Both apply to **local** users when the site **Sign-in method** is **Local**, and the policy that requires multi-factor authentication (MFA) is described in [Two-Factor Authentication](../System_Configuration/Security/Two_Factor_Authentication.md). For users who sign in through single sign-on (SSO), MFA and credentials are managed in the identity provider.

## Self-Service Management

When the site **Sign-in method** is **Local** and **Enforce two-factor for local users** is on, a signed-in user sees a **Two-Factor Authentication** pill in the **Account** group of the **ADMIN** page, alongside **Change My Password**. The pill is not shown in a kiosk session, and because it appears only while two-factor authentication is enforced, a user cannot enrol voluntarily on a site that does not enforce it. To open it, select **ADMIN** in the side menu and then the pill.

The dialog states whether two-factor authentication is enabled and how many recovery codes remain, and it offers **Reset authenticator** and **Regenerate recovery codes**. **Reset authenticator** asks for a code from the current authenticator app before it issues a new one, so a user who has lost the app cannot use it and asks an administrator for a reset instead. Where the site allows security keys, the dialog also holds the panel for registering one, as described in [Two-Factor Authentication](../System_Configuration/Security/Two_Factor_Authentication.md#security-key-sign-in).

## Administrator Reset of MFA

A user with the **Security administration** permission can clear another user's authenticator when the site enforces two-factor authentication and the licence includes the **Two-Factor Authentication** feature. Select **ADMIN** in the side menu, then **Users & Groups**, click the other user's row to open their settings dialog, select the **User Actions** tab, select **Reset MFA** and confirm. The user must then set up two-factor authentication again at their next sign-in.

!!! note "Cannot Reset Your Own MFA"
    **Reset MFA** is hidden on the administrator's own **User Actions** tab, and on the tab of a service account. An administrator manages their own authenticator with the **Two-Factor Authentication** pill on the **ADMIN** page.

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Users/{username}/TwoFactor/Reset` | Clears the user's authenticator enrolment. |

## Administrator Reset of a Password

**Reset Password**, also on the **User Actions** tab of the other user's settings dialog, sets **Require password change on next login** and signs out the user's active sessions, so the user chooses a new password at the next sign-in and no temporary password has to be shared. Like **Reset MFA**, it is hidden on the administrator's own account, and it is shown only when the site **Sign-in method** is **Local**. The effect on the user is described in [Password Policy](../System_Configuration/Security/Password_Policy.md#forced-password-change).

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/v2/Users/{username}/Password/Reset` | Requires a password change at the next sign-in and signs out active sessions. |

## SSO Users

For users who sign in through SSO, **Reset MFA** and **Reset Password** are not used, because the identity provider holds the credentials. Reset their authenticator or password in the identity provider.

## Related Documentation

- [Two-Factor Authentication](../System_Configuration/Security/Two_Factor_Authentication.md)
- [Password Policy](../System_Configuration/Security/Password_Policy.md)
- [Managing Users](Manage_Users.md)
- [Roles and Permissions](Roles_and_Permissions.md)
