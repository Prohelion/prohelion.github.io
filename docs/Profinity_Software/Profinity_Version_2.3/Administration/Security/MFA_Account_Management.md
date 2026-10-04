---
title: MFA Account Management
description: "Reset TOTP-based multi-factor authentication for users or manage self-service MFA settings."
---

# MFA Account Management

Profinity 2.3 separates **self-service MFA** (the **ADMIN** page) from **administrator reset** actions (the **User Actions** tab of a user's settings dialog). These flows apply to **local** users when site sign-in method is **Local**.

## Self-service: ADMIN page

When **Enforce two-factor for local users** is enabled, signed-in local users see a **Two-factor authentication** pill on the **ADMIN** page, which is opened by selecting **ADMIN** in the side menu.

<figure markdown>
![Pill menu with Two-factor authentication entry](../../../../assets/images/2.3/2.3-pill-two-factor-authentication.png)
<figcaption>Two-factor authentication in the pill menu (screenshot placeholder — provide SS-17)</figcaption>
</figure>

From this dialog users can:

- View MFA enrollment status.
- **Reset Authenticator** (re-enroll TOTP).
- **Regenerate recovery codes**.

<figure markdown>
![Two-factor authentication self-service dialog](../../../../assets/images/2.3/2.3-pill-two-factor-dialog.png)
<figcaption>Self-service MFA management dialog (screenshot placeholder — provide SS-18)</figcaption>
</figure>

## Administrator: Reset MFA

Users with **SecurityAdmin** can reset another user's MFA:

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Click the target user's row (not your own) to open their settings dialog.
3. Select the **User Actions** tab.
4. Click **Reset MFA** and confirm.

API: `POST /api/v2/Users/{username}/TwoFactor/Reset`

After reset, the user must complete **`/two-factor-setup`** on next login when MFA is enforced.

!!! note "Cannot reset your own MFA"
    **Reset MFA** is hidden on the administrator's **own User Actions** tab. Use the **Two-factor authentication** pill on the **ADMIN** page for self-service.

<figure markdown>
![User Actions tab in a user's settings dialog, showing Reset MFA and Reset Password actions](../../../../assets/images/2.3/2.3-users-reset-mfa-password-buttons.png)
<figcaption>Reset MFA and Reset Password actions on the User Actions tab of another user's settings dialog (screenshot placeholder — provide SS-19)</figcaption>
</figure>

<figure markdown>
![Reset MFA confirmation dialog](../../../../assets/images/2.3/2.3-users-reset-confirm-dialog.png)
<figcaption>Reset MFA confirmation (screenshot placeholder — provide SS-20)</figcaption>
</figure>

## Administrator: Reset password

**Reset Password**, also on the **User Actions** tab of the target user's settings dialog, sets a temporary password and typically flags **Require password change on next login** so the user sets a new password on next login.

API: `POST /api/v2/Users/{username}/Password/Reset`

## SSO users

SSO users are out of scope for Profinity MFA reset — manage credentials and MFA in the identity provider.

## Related documentation

- [Two-factor authentication](./Two_Factor_Authentication.md)
- [Password policy](./Password_Policy.md)
- [Managing users](../Manage_Users.md)
- [RBAC and permissions](./RBAC_Permissions.md)
