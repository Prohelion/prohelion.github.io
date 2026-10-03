---
title: Two-Factor Authentication
description: "Configure TOTP-based two-factor authentication policy for local users including recovery codes and device trust."
---

# Two-Factor Authentication

Profinity 2.3 supports **TOTP-based two-factor authentication (2FA)** for **local** users when site **Sign-in method** is **Local**. Policy is configured site-wide in **Config.yaml** under **Security Policy → Two-Factor Policy**.

The UI and the other security pages also use the term **MFA** (multi-factor authentication) for this feature. SSO users rely on their identity provider for MFA.

## Two-factor policy settings

Open **System Configuration** → **Security Policy** → **Two-Factor Policy**:

| Setting | Description |
|---------|-------------|
| **Require recovery codes on enrollment** | Users must save recovery codes when enrolling (default: enabled) |
| **Allow remember device** | Show "Remember this device" on MFA login step |
| **Remember device duration (days)** | Trusted device cookie lifetime (1–90 days when allow is enabled) |

Enabling **Enforce two-factor for local users** (Security Policy) requires all local users to complete enrollment.

<figure markdown>
![Two-factor policy configuration fields](../../../../assets/images/2.3/2.3-two-factor-policy-config.png)
<figcaption>Two-Factor Policy settings (screenshot placeholder — provide SS-13)</figcaption>
</figure>

## Enrollment flow

When MFA is required, users are directed to **`/two-factor-setup`** after password validation:

1. **Scan QR code** with an authenticator app.
2. **Verify** a one-time code.
3. **Save recovery codes** and acknowledge storage (when policy requires).

<figure markdown>
![Two-factor setup QR code step](../../../../assets/images/2.3/2.3-two-factor-setup-qr.png)
<figcaption>MFA enrollment QR step (screenshot placeholder — provide SS-14)</figcaption>
</figure>

<figure markdown>
![Recovery codes step with codes redacted](../../../../assets/images/2.3/2.3-two-factor-setup-recovery-codes.png)
<figcaption>Recovery codes on enrollment — redact codes in published screenshots (provide SS-15)</figcaption>
</figure>

## Login with MFA

After password validation, local users with enrolled MFA see the MFA step:

- Enter TOTP code from authenticator app.
- Optionally check **Remember this device** when policy allows.

<figure markdown>
![Login MFA step with TOTP field](../../../../assets/images/2.3/2.3-login-mfa-step.png)
<figcaption>MFA step during login (screenshot placeholder — provide SS-16)</figcaption>
</figure>

## Self-service MFA management

When **Enforce two-factor for local users** is enabled, signed-in local users can open **Two-factor authentication** from the **pill menu** to reset their authenticator or regenerate recovery codes. See [MFA account management](./MFA_Account_Management.md).

## Secrets storage

2FA secrets and recovery material are stored in **Security.yaml**, not Config.yaml. Config.yaml holds only **policy** (whether MFA is required and remember-device rules).

## Related documentation

- [SSO and sign-in method](./SSO_and_Sign_In.md)
- [MFA account management](./MFA_Account_Management.md)
- [Password policy](./Password_Policy.md)
