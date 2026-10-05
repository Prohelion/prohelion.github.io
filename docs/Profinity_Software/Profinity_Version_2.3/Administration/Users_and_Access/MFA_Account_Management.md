---
title: MFA Account Management
description: "Reset TOTP-based multi-factor authentication for users or manage self-service MFA settings."
---

# MFA Account Management

Profinity 2.3 separates **self-service MFA** (the **ADMIN** page) from **administrator reset** actions (the **User Actions** tab of a user's settings dialog). These flows apply to **local** users when site sign-in method is **Local**.

## Self-service: ADMIN page

When the site sign-in method is **Local** and **Enforce two-factor for local users** is enabled, signed-in users see a **Two-Factor Authentication** pill in the **Account** group on the **ADMIN** page, alongside **Change My Password**. Open the **ADMIN** page by selecting **ADMIN** in the side menu. The pill is not shown in kiosk mode.

From this dialog users can:

- View MFA enrolment status.
- **Reset Authenticator** (re-enrol TOTP).
- **Regenerate recovery codes**.

## Administrator: Reset MFA

Users with **SecurityAdmin** can reset another user's MFA:

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Click the target user's row (not your own) to open their settings dialog.
3. Select the **User Actions** tab.
4. Click **Reset MFA** and confirm.

API: `POST /api/v2/Users/{username}/TwoFactor/Reset`

After reset, the user must complete two-factor setup on next login when MFA is enforced.

!!! note "Cannot reset your own MFA"
    **Reset MFA** is hidden on the administrator's **own User Actions** tab. Use the **Two-Factor Authentication** pill on the **ADMIN** page for self-service.

## Administrator: Reset password

**Reset Password**, also on the **User Actions** tab of the target user's settings dialog, sets a temporary password and typically flags **Require password change on next login** so the user sets a new password on next login.

API: `POST /api/v2/Users/{username}/Password/Reset`

## SSO users

SSO users are out of scope for Profinity MFA reset — manage credentials and MFA in the identity provider.

## Related documentation

- [Two-factor authentication](../System_Configuration/Security/Two_Factor_Authentication.md)
- [Password policy](../System_Configuration/Security/Password_Policy.md)
- [Managing users](Manage_Users.md)
- [Roles and permissions](Roles_and_Permissions.md)
