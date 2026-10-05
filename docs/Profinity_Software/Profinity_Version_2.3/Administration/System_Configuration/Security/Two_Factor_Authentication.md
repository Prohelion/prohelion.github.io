---
title: Two-Factor Authentication
description: "Configure TOTP-based two-factor authentication policy for local users including recovery codes and device trust."
---

# Two-Factor Authentication

Profinity 2.3 supports **TOTP-based two-factor authentication (2FA)** for **local** users when site **Sign-in method** is **Local**. Policy is configured site-wide in **config.yaml** under **Security Policy → Two-Factor Policy**.

The UI and the other security pages also use the term **MFA** (multi-factor authentication) for this feature. SSO users rely on their identity provider for MFA.

## Two-factor policy settings

Open **System Configuration** → **Security Policy** → **Two-Factor Policy**:

| Setting | Description |
|---------|-------------|
| **Require recovery codes on enrolment** | Users must save recovery codes when enrolling (default: enabled) |
| **Allow remember device** | Show "Remember this device" on MFA login step |
| **Remember device duration (days)** | Trusted device cookie lifetime (1–90 days when allow is enabled) |

Enabling **Enforce two-factor for local users** (Security Policy) requires all local users to complete enrolment.

## Enrolment flow

When MFA is required, users are taken to the two-factor setup screen after password validation:

1. **Scan QR code** with an authenticator app.
2. **Verify** a one-time code.
3. **Save recovery codes** and acknowledge storage (when policy requires).

## Login with MFA

After password validation, local users with enrolled MFA see the MFA step:

- Enter TOTP code from authenticator app.
- Optionally check **Remember this device** when policy allows.

## Self-service MFA management

When **Enforce two-factor for local users** is enabled, signed-in local users can open the **Two-factor authentication** pill on the **ADMIN** page to reset their authenticator or regenerate recovery codes. See [MFA account management](../../Users_and_Access/MFA_Account_Management.md).

## Secrets storage

2FA secrets and recovery material are stored in **security.yaml**, not config.yaml. config.yaml holds only **policy** (whether MFA is required and remember-device rules).

## Related documentation

- [SSO and sign-in method](./SSO_and_Sign_In.md)
- [MFA account management](../../Users_and_Access/MFA_Account_Management.md)
- [Password policy](./Password_Policy.md)
