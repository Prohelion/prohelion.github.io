---
title: Session policy and login lockout
description: "Settings that control how long a Profinity sign-in lasts, the idle timeout, concurrent session limit, and login lockout, with defaults and ranges."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Session policy and login lockout

The **Session Policy** group sets how long a sign-in lasts and how Profinity responds to repeated failed sign-ins.
Each setting applies to every user on the site, and none of them needs a licensed feature.

| Setting | Default | Range | Effect |
|---------|---------|-------|--------|
| **Access token lifetime (minutes)** | 120 | 1 to 10080 (one week) | How long a sign-in remains valid, regardless of activity. When it ends the user signs in again. |
| **Session idle timeout (minutes)** | Empty (no idle timeout) | 1 to 10080 | When set, a session ends after this period without activity, even if its access token is still valid. |
| **Maximum concurrent sessions** | Empty (no limit) | 1 to 1000 | When set, limits how many active sessions one user can hold. Signing in beyond the limit ends the user's oldest session. |
| **Maximum login attempts** | 10 | 1 to 100 | The number of sign-in attempts allowed in one minute before the user is locked out. |
| **Login lockout duration (minutes)** | 15 | 1 to 1440 | How long a locked-out user must wait before signing in again. |

When Profinity ends a session because of the concurrent session limit, that session can no longer refresh its sign-in.
It stops working when its current access token expires.

A locked-out user who keeps trying receives a "Too many attempts. Try later." response.
The response carries the number of seconds that remain before another attempt is accepted.
The lockout applies to the username, so it ends on its own once the lockout duration has passed.
An administrator does not need to unlock the account.
Service accounts and kiosk sessions use tokens that follow the rules described in [Service accounts](../../Users_and_Access/Service_Accounts.md) and [Kiosk Mode](../../Kiosk_Mode.md).

A site with strict requirements combines these settings with the [Password policy](Password_Policy.md) and [Two-factor authentication](Two_Factor_Authentication.md).
