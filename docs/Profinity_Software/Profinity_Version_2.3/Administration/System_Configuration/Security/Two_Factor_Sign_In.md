---
title: Sign in with two-factor authentication
description: "Enrol an authenticator app, sign in with a one-time or recovery code, remember a device, and register a security key when two-factor is enforced."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Sign in with two-factor authentication

When a site enforces two-factor authentication, a local user enrols an authenticator app at the next sign-in and then enters a six-digit code after the password.
An administrator turns this on with the settings described in [Two-factor authentication](./Two_Factor_Authentication.md), which also lists the licence each feature needs.

## Enrol an authenticator

When two-factor authentication is required and a user has no authenticator, Profinity opens the two-factor setup screen after the user enters a valid password.
To enrol:

1. Scan the QR code with an authenticator app.
2. Enter a one-time code from the app to verify that it is working.
3. When the policy requires it, save the recovery codes and confirm that they are stored.

## Sign in with a code

On later sign-ins, Profinity asks for the authenticator code after it accepts the password, with a **6-Digit MFA Code** field and an alternative **Recovery Code** field.
A user who selects **Remember this device** on a site that allows it skips this step on that browser until the remember duration ends.

Repeated incorrect codes are rate limited, so a user who keeps entering wrong codes must wait before trying again.
A locked-out user waits for the **Login lockout duration (minutes)** described in [Session policy and login lockout](./Session_Policy.md).

If a code is rejected although it was typed correctly, the usual cause is the clock on the phone, because authenticator codes depend on the device time being correct.
If the phone is lost and the recovery codes are not available, an administrator resets the user's authenticator from the **User Actions** tab.
The user then enrols again at the next sign-in.
Refer to [MFA account management](../../Users_and_Access/MFA_Account_Management.md) for the reset.

While **Enforce two-factor for local users** is on, a signed-in local user manages their own authenticator from the **Two-Factor Authentication** pill on the **ADMIN** page, as described in [MFA account management](../../Users_and_Access/MFA_Account_Management.md#self-service-management).

## Register a security key

You need a site that allows security-key sign-in and has **Enforce two-factor for local users** switched on, because Profinity shows the **Two-Factor Authentication** dialog only while the enforcement setting is on.
You also need a browser that supports Web Authentication (WebAuthn) and a page served over HTTPS or from localhost.

To register a key:

1. Select **ADMIN** in the side menu, then the **Two-Factor Authentication** pill.
2. In the **SECURITY KEYS (WEBAUTHN)** panel, select **Begin security key registration**.
3. Follow the browser prompt.

Profinity shows "Security key registered successfully."
If registration is cancelled or times out, Profinity shows "Security key registration was cancelled or timed out." and the user can select **Begin security key registration** again.

When a site allows security keys and the browser supports them, the login page shows a **Sign in with security key** button under the password form.

To see which settings control these screens, refer to [Two-factor authentication](./Two_Factor_Authentication.md).
