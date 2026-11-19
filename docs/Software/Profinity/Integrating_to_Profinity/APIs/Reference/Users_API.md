---
title: Users API
description: "Look up the REST API endpoints that sign a client in, complete two-factor sign-in, renew a token, and reset another user's password or MFA."
type: reference
owner: Documentation
last_reviewed: 2026-11-19
---

# Users API

The Users API, the Users group in Swagger, signs a client in with a username and password, renews its token, and lets an administrator reset another user's password or authenticator.

Refer to [Authenticate to the Profinity REST API](../API_Authentication.md) for how to get and pass a token.

## Sign-in

These endpoints get and renew a sign-in token.
Refer to [Make your first API call](../../First_API_Call.md#get-a-token) for the sign-in command for each operating system.

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/Users/Authenticate` | None | Signs in with a username and password, and returns a token. |
| POST | `/api/v2/Users/Authenticate/TwoFactor` | No permission beyond signing in | Completes a sign-in that needs two-factor authentication, with the `preAuthToken` as the Bearer token. |
| POST | `/api/v2/Users/Current/ChangePassword` | No permission beyond signing in | Changes the signed-in user's password, and completes a sign-in that needs a password change when the `preAuthToken` is the Bearer token. |
| GET | `/api/v2/Users/Refresh` | No permission beyond signing in | Renews a sign-in token before it expires. |

A successful sign-in returns the access `token`, a `refreshToken`, the `username`, an `id`, and the user's `permissions`.
A user who must complete two-factor authentication or change a password first receives a `preAuthToken` in place of a `token`, with `requiresTwoFactor`, `requiresPasswordChange`, or `requiresTwoFactorSetup` set to `true`.
`requiresTwoFactor` leads to `POST /api/v2/Users/Authenticate/TwoFactor`, and `requiresPasswordChange` leads to `POST /api/v2/Users/Current/ChangePassword`.
For `requiresTwoFactorSetup`, the user enrols an authenticator in the web interface and the client signs in again, as described in [Sign-in responses](../API_Authentication.md#sign-in-responses).
Each of the two continuation endpoints returns a `token` and a `refreshToken` when it succeeds.

The Refresh endpoint takes the current token as the Bearer token, and returns a new `token` and a new `refreshToken`.
Each refresh token works once, so send the newest one each time, because an older one returns `401`.
The endpoint needs a token that is still valid, so sign in again once a token has expired.
With a service account token, the endpoint returns the same token and no `refreshToken`.

| Field | Type | Default | Effect |
|-------|------|---------|--------|
| `username` | Text, body | Required | Authenticate only. The user's sign-in name. |
| `password` | Text, body | Required | Authenticate only. The user's password. |
| `totpCode` | Text, body | None | TwoFactor only. The six-digit code from the user's authenticator app. Send this or `recoveryCode`. |
| `recoveryCode` | Text, body | None | TwoFactor only. One of the user's recovery codes, in place of `totpCode`. |
| `currentPassword` | Text, body | Required | ChangePassword only. The user's current password. |
| `newPassword` | Text, body | Required | ChangePassword only. The new password. |
| `confirmPassword` | Text, body | Required | ChangePassword only. The new password again. |
| `X-Refresh-Token` | Text, header | Required | Refresh only. The `refreshToken` from the sign-in or the last refresh. |

Refer to [Fix 401 and 403 responses](../API_Authentication.md#fix-401-and-403-responses) for what to do when Profinity refuses a token.

## Account resets

These endpoints match the **Reset MFA** (multi-factor authentication) and **Reset Password** actions in [Managing users](../../../Administration/Users_and_Access/Manage_Users.md).

| Method | Endpoint | Permission | Purpose |
|--------|----------|------------|---------|
| POST | `/api/v2/Users/{username}/TwoFactor/Reset` | **Security administration** | Clears the user's authenticator enrolment. |
| POST | `/api/v2/Users/{username}/Password/Reset` | **Security administration** | Requires a password change at the next sign-in and signs out active sessions. |
