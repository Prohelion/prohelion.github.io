---
title: Users API
description: "Look up the REST API endpoints that sign a client in, complete two-factor sign-in, renew a token, and reset another user's password or MFA."
type: reference
owner: Documentation
last_reviewed: 2026-11-20
---

# Users API

The Users API, the Users group in Swagger, signs a client in with a username and password, renews its token, and lets an administrator reset another user's password or authenticator.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

A `401` means the request has no valid token.
A `403` means the token's user lacks the permission in the **Permission** column.
A `403` also comes back from every endpoint on this page except sign-in, two-factor sign-in, and password change while a server installation runs in restricted mode, because its licence is missing or has expired.
The message names the licence state, and [Licensing](../../../Licensing.md#when-a-licence-is-missing-or-has-expired) explains how to leave restricted mode.
Each endpoint below lists only its other errors.

Refer to [Fix 401 and 403 responses](../API_Authentication.md#fix-401-and-403-responses) for what to do when Profinity refuses a token.

## Sign-in responses

The sign-in endpoints share these responses.
A successful sign-in returns the access `token`, a `refreshToken`, the `username`, an `id`, and the user's `permissions`.
A user who must complete two-factor authentication or change a password first receives a `preAuthToken` in place of a `token`, with `requiresTwoFactor`, `requiresPasswordChange`, or `requiresTwoFactorSetup` set to `true`.
A `preAuthToken` is short lived, and it works only on the sign-in endpoints.
`requiresTwoFactor` leads to `POST /api/v2/Users/Authenticate/TwoFactor`, and `requiresPasswordChange` leads to `POST /api/v2/Users/Current/ChangePassword`.
For `requiresTwoFactorSetup`, the user enrols an authenticator in the web interface and the client signs in again, as described in [Sign-in responses](../API_Authentication.md#sign-in-responses).
A service account has no `refreshToken`.

## Sign-in

These endpoints get and renew a sign-in token.
Refer to [Make your first API call](../First_API_Call.md#get-a-token) for the sign-in command for each operating system.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/Users/Authenticate` | None | Signs in with a username and password, and returns a token. |
| POST | `/api/v2/Users/Authenticate/TwoFactor` | No permission beyond signing in | Completes a sign-in that needs two-factor authentication, with the `preAuthToken` as the Bearer token. |
| POST | `/api/v2/Users/Current/ChangePassword` | No permission beyond signing in | Changes the signed-in user's password, and completes a sign-in that needs a password change when the `preAuthToken` is the Bearer token. |
| GET | `/api/v2/Users/Refresh` | No permission beyond signing in | Renews a sign-in token before it expires. |

### `POST /api/v2/Users/Authenticate`

Signs in with a username and password.
It needs no token, and returns `200` with the [sign-in response](#sign-in-responses).

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `username` | Text, body | Required | The user's sign-in name. |
| `password` | Text, body | Required | The user's password. |

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Users/Authenticate \
      -H "Content-Type: application/json" \
      -d '{"username": "<username>", "password": "<password>"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Users/Authenticate -ContentType "application/json" -Body '{"username": "<username>", "password": "<password>"}'
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace `<username>` and `<password>` with the user's sign-in name and password, and use the address that users type to reach Profinity in place of `http://localhost:18080`.
The sign-in worked when the response holds `token`.
A response with `preAuthToken` in its place means the user must complete a step first, as the [sign-in responses](#sign-in-responses) describe.

`POST /api/v2/Users/Authenticate` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `401` with "Invalid credentials" | The username or password is wrong. An empty username and password ask for kiosk sign-in, which also fails when **Kiosk mode** is off. | Check the username and password. |
| `401` with "This is a service account and cannot log in with a password." | The account is a service account. | Use the account's token, which an administrator shows with **View Token**. |
| `403` with "Local password login is disabled. Use an external identity provider." | The site **Sign-in method** is not **Local**. | Sign in through the identity provider. |
| `429` with "Too many attempts. Try later." | Too many sign-in attempts for this user or address. The `Retry-After` header and `retryAfterSeconds` give the wait in seconds. | Wait for that time, then try again. |

### `POST /api/v2/Users/Authenticate/TwoFactor`

Completes a sign-in that needs two-factor authentication.
Send the `preAuthToken` from `POST /api/v2/Users/Authenticate` as the Bearer token.
It returns `200` with the [sign-in response](#sign-in-responses), with a `token` and a `refreshToken`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `totpCode` | Text, body | None | The six-digit code from the user's authenticator app. Send this or `recoveryCode`. |
| `recoveryCode` | Text, body | None | One of the user's recovery codes, in place of `totpCode`. |

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Users/Authenticate/TwoFactor \
      -H "Authorization: Bearer <preAuthToken>" \
      -H "Content-Type: application/json" \
      -d '{"totpCode": "<code>"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Users/Authenticate/TwoFactor -Headers @{ Authorization = "Bearer <preAuthToken>" } -ContentType "application/json" -Body '{"totpCode": "<code>"}'
    ```

Replace these placeholders:

- `<preAuthToken>` with the `preAuthToken` from the sign-in response.
- `<code>` with the six-digit code from the user's authenticator app.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The sign-in worked when the response holds `token`.

`POST /api/v2/Users/Authenticate/TwoFactor` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `401` | The code or recovery code is wrong. | Send the current code from the authenticator app, or an unused recovery code. |
| `403` | The Bearer token is a normal token, not a `preAuthToken`. | Send the `preAuthToken` from `POST /api/v2/Users/Authenticate`. |
| `429` with "Too many verification attempts. Please try again later." | Too many wrong codes. | Wait, then try again. |

### `POST /api/v2/Users/Current/ChangePassword`

Changes the signed-in user's password.
It needs no permission beyond signing in, and returns `200` with `message`, `token`, `refreshToken`, `username`, and `id`.
The new password must meet the site password policy.
A successful change signs out the user's other sessions, and the new `token` is the one to use next.
When the sign-in response has `requiresPasswordChange`, send the `preAuthToken` as the Bearer token, which completes the sign-in.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `currentPassword` | Text, body | Required | The user's current password. |
| `newPassword` | Text, body | Required | The new password. |
| `confirmPassword` | Text, body | Required | The new password again. |

=== "macOS or Linux"

    ```bash
    curl -X POST http://localhost:18080/api/v2/Users/Current/ChangePassword \
      -H "Authorization: Bearer <token>" \
      -H "Content-Type: application/json" \
      -d '{"currentPassword": "<current-password>", "newPassword": "<new-password>", "confirmPassword": "<new-password>"}'
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Users/Current/ChangePassword -Headers @{ Authorization = "Bearer <token>" } -ContentType "application/json" -Body '{"currentPassword": "<current-password>", "newPassword": "<new-password>", "confirmPassword": "<new-password>"}'
    ```

Replace these placeholders:

- `<token>` with the user's token, or the `preAuthToken` when the sign-in response asked for a password change.
- `<current-password>` with the user's current password.
- `<new-password>` with the new password.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The change worked when the response is `200` with "Password changed successfully."

`POST /api/v2/Users/Current/ChangePassword` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `400` with a message | A field is empty, `newPassword` and `confirmPassword` differ, `currentPassword` is wrong, the new password breaks the site password policy, the site **Sign-in method** is not **Local**, or Profinity could not save the change. | Correct the part that the message names. |

### `GET /api/v2/Users/Refresh`

Renews a sign-in token before it expires.
Send the current token as the Bearer token.
It needs no permission beyond signing in, and returns `200` with a new `token` and a new `refreshToken`.
Each refresh token works once, so send the newest one each time.
The endpoint needs a token that is still valid, so sign in again once a token has expired.
With a service account token, the endpoint returns the same token and no `refreshToken`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `X-Refresh-Token` | Text, header | None | The `refreshToken` from the sign-in or the last refresh. Send it on every refresh. Without it the token is renewed but the old refresh token is not retired. |

=== "macOS or Linux"

    ```bash
    curl -H "Authorization: Bearer <token>" -H "X-Refresh-Token: <refresh-token>" http://localhost:18080/api/v2/Users/Refresh
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Uri http://localhost:18080/api/v2/Users/Refresh -Headers @{ Authorization = "Bearer <token>"; "X-Refresh-Token" = "<refresh-token>" }
    ```

    PowerShell shows the response as a list of fields rather than as JSON, with the same field names.

Replace these placeholders:

- `<token>` with the token that is about to expire.
- `<refresh-token>` with the `refreshToken` from the sign-in or the last refresh.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The renewal worked when the response holds a new `token` and `refreshToken`.

`GET /api/v2/Users/Refresh` returns this error:

| What you see | Cause | What to do |
|---|---|---|
| `401` | The refresh token was already used or is not valid, the user no longer exists, or the token is a kiosk token and kiosk mode is no longer valid for the active profile. | Sign in again. |

## Account resets

These endpoints match the **Reset MFA** (multi-factor authentication) and **Reset Password** actions in [Managing users](../../../Administration/Users_and_Access/Manage_Users.md).
In both, `{username}` is the user's sign-in name, and an administrator cannot reset their own account.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/Users/{username}/TwoFactor/Reset` | **Security administration** | Clears the user's authenticator enrolment. |
| POST | `/api/v2/Users/{username}/Password/Reset` | **Security administration** | Requires a password change at the next sign-in and signs out active sessions. |

### `POST /api/v2/Users/{username}/TwoFactor/Reset`

Clears the user's authenticator enrolment.
It needs the **Security administration** permission, and returns `200` with a message that the user must set up MFA at their next sign-in.
It also clears the user's recovery codes and signs out the user's active sessions.
It works only when the site **Sign-in method** is **Local**, the site enforces two-factor authentication, and the licence includes the **Two-Factor Authentication** feature.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Users/<username>/TwoFactor/Reset
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Users/<username>/TwoFactor/Reset -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<username>` with the user's sign-in name, URL encoded.
- `<token>` with a token from a user who has **Security administration**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The reset worked when the response is `200`.

`POST /api/v2/Users/{username}/TwoFactor/Reset` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You cannot reset two-factor authentication for your own account." | The username is the signed-in user's own. | Use **Two-Factor Authentication** in the menu, or ask another administrator. |
| `400` with "Two-factor reset is not available for service accounts." | The account is a service account. | Service accounts have no authenticator, so there is nothing to reset. |
| `403` | The site **Sign-in method** is not **Local**, the site does not enforce two-factor authentication, or the licence lacks the **Two-Factor Authentication** feature. | Check the site security settings and the licence. |
| `404` with "User not found." | No user has that name. | Check the name in **Users & Groups**. |
| `500` | Profinity could not save the change. | Check the Profinity log for the reason. |

### `POST /api/v2/Users/{username}/Password/Reset`

Requires a password change at the user's next sign-in and signs out the user's active sessions.
It needs the **Security administration** permission, and returns `200` with a message that the user must change their password at their next sign-in.
It works only when the site **Sign-in method** is **Local**.

=== "macOS or Linux"

    ```bash
    curl -X POST -H "Authorization: Bearer <token>" http://localhost:18080/api/v2/Users/<username>/Password/Reset
    ```

=== "Windows"

    Run this command in PowerShell:

    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:18080/api/v2/Users/<username>/Password/Reset -Headers @{ Authorization = "Bearer <token>" }
    ```

Replace these placeholders:

- `<username>` with the user's sign-in name, URL encoded.
- `<token>` with a token from a user who has **Security administration**.

Use the address that users type to reach Profinity in place of `http://localhost:18080`.
The reset worked when the response is `200`.

`POST /api/v2/Users/{username}/Password/Reset` returns these errors:

| What you see | Cause | What to do |
|---|---|---|
| `400` with "You cannot reset the password for your own account." | The username is the signed-in user's own. | Use **Change My Password** in the menu, or ask another administrator. |
| `403` | The site **Sign-in method** is not **Local**. | Reset the password at the identity provider. |
| `404` with "User not found." | No user has that name. | Check the name in **Users & Groups**. |
| `500` | Profinity could not save the change. | Check the Profinity log for the reason. |
