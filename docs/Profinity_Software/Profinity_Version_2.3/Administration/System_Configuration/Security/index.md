---
title: Security
description: "The instance-wide authentication and access policy on the System Configuration Security tab, including sign-in method, session policy and login lockout."
---

# Security

The **Security** tab of **System Configuration** holds the instance-wide authentication and access policy, and a user needs the **System administration** permission to open it. Each group of settings has its own page, and the licence needed is shown in the right-hand column.

| Settings | Page | Licensed feature |
|----------|------|------------------|
| Sign-in method, local login and single sign-on (SSO) | [SSO and Sign-In Method](SSO_and_Sign_In.md) | **Enterprise Security** for **Sso** |
| Password rules for local users | [Password Policy](Password_Policy.md) | None |
| Two-factor authentication and security-key sign-in | [Two-Factor Authentication](Two_Factor_Authentication.md) | **Two-Factor Authentication**; **Enterprise Security** for security keys |
| System for Cross-domain Identity Management (SCIM) provisioning and Security Information and Event Management (SIEM) export | [SCIM and SIEM](SCIM_and_SIEM.md) | **Enterprise Security** for SCIM |

Saving the tab restarts Profinity and interrupts active sessions, as described on the [System Configuration](../index.md) page.

## Session Policy and Login Lockout

The **Session Policy** group sets how long a sign-in lasts and how Profinity responds to repeated failed sign-ins. Each setting applies to every user on the site.

| Setting | Default | Range | Effect |
|---------|---------|-------|--------|
| **Access token lifetime (minutes)** | 120 | 1 to 10080 (one week) | How long a sign-in remains valid, regardless of activity. When it ends the user signs in again. |
| **Session idle timeout (minutes)** | Empty (no idle timeout) | 1 to 10080 | When set, a session ends after this period without activity, even if its access token is still valid. |
| **Maximum concurrent sessions** | Empty (no limit) | 1 to 1000 | When set, limits how many active sessions one user can hold. |
| **Maximum login attempts** | 10 | 1 to 100 | The number of sign-in attempts allowed in one minute before the user is locked out. |
| **Login lockout duration (minutes)** | 15 | 1 to 1440 | How long a locked-out user must wait before signing in again. |

A locked-out user who keeps trying receives a "Too many attempts. Try later." response, and the response carries the number of seconds that remain before another attempt is accepted. The lockout applies to the username, so it ends on its own once the lockout duration has passed, and an administrator does not need to unlock the account. Service accounts and kiosk sessions use tokens that follow the rules described in [Service Accounts](../../Users_and_Access/Service_Accounts.md) and [Kiosk Mode](../../Kiosk_Mode.md).

A site with strict requirements combines these settings with a [password policy](Password_Policy.md) and [two-factor authentication](Two_Factor_Authentication.md).
