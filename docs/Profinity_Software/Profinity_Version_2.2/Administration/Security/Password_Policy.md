---
title: Password Policy
---

# Password policy

Profinity 2.3 enforces **password policy** for **local** sign-in (when site **Sign-in method** is **Local**). Policy is configured in **Config.yaml** under **Security Policy → Password Policy**.

SSO users authenticate through the identity provider; local password rules do not apply to them.

## Configure password policy

1. Sign in as a user with **SystemAdmin** permission.
2. Open the pill menu → **System Configuration**.
3. Open **Security Policy** → **Password Policy**.

| Setting | Description |
|---------|-------------|
| **Minimum length** | Minimum password character count |
| **Require uppercase** | At least one uppercase letter |
| **Require lowercase** | At least one lowercase letter |
| **Require digit** | At least one numeric character |
| **Require special character** | At least one non-alphanumeric character |
| **Maximum age (days)** | Password expiry; leave the field empty to disable expiry |

Saving Config.yaml restarts the Profinity engine.

<figure markdown>
![Password policy settings in System Configuration](../../../../assets/images/2.3/2.3-password-policy-config.png)
<figcaption>Password policy fields in Security Policy (screenshot placeholder — provide SS-05)</figcaption>
</figure>

## Forced password change

Administrators can require a user to change password on next login:

1. Open **Users & Groups** → select the user.
2. Enable **Require password change**.

The default `admin` account may be configured to require password change on first login after a fresh install.

When a user with this flag signs in, Profinity shows a **change password** dialog before granting access to the application.

<figure markdown>
![Forced password change dialog on login](../../../../assets/images/2.3/2.3-forced-password-change-dialog.png)
<figcaption>Password change required before continuing (screenshot placeholder — provide SS-06)</figcaption>
</figure>

## Changing password when logged in

Users with local accounts can change password from **`/change-password`** when signed in (if your deployment exposes that route in the UI or bookmarks).

## Best practices

- Change default `admin` / `password` credentials immediately after install.
- Align **Maximum age** with your organisation's identity policy.
- Use **Require password change** when resetting a compromised account instead of sharing temporary passwords in plain text.

## Related documentation

- [SSO and sign-in method](./SSO_and_Sign_In.md)
- [MFA account management](./MFA_Account_Management.md)
- [Managing users](../Manage_Users.md)
- [Security guide](../../Installation/Security.md)
