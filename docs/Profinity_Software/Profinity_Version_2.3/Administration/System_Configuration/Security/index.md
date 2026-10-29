---
title: Security
description: "Find the System Configuration Security tab pages for sign-in, passwords, two-factor, SCIM, SIEM, session lifetime, and login lockout."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Security

The **Security** tab of **System Configuration** holds the instance-wide authentication and access policy.
A user needs the **System administration** permission to open it.
Each group of settings has its own page, and the **Licensed feature** column in the following table shows the licence needed.

| Settings | Page | Licensed feature |
|----------|------|------------------|
| Sign-in method, local login and single sign-on (SSO) | [SSO and sign-in method](SSO_and_Sign_In.md) | **Enterprise Security** for **Sso** |
| Password rules for local users | [Password policy](Password_Policy.md) | None |
| Two-factor authentication and security-key sign-in | [Two-factor authentication](Two_Factor_Authentication/index.md) | **Two-Factor Authentication**; **Enterprise Security** for security keys |
| Enrolling an authenticator, signing in with a code, and registering a security key | [Sign in with two-factor authentication](Two_Factor_Authentication/Two_Factor_Sign_In.md) | As for the settings above |
| System for Cross-domain Identity Management (SCIM) provisioning and Security Information and Event Management (SIEM) export | [SCIM and SIEM](SCIM_and_SIEM.md) | **Enterprise Security** for SCIM |
| Session lifetime, idle timeout, concurrent sessions, and login lockout | [Session policy and login lockout](Session_Policy.md) | - |

Saving the tab restarts Profinity and interrupts active sessions, as described on the [System Configuration](../index.md) page.
