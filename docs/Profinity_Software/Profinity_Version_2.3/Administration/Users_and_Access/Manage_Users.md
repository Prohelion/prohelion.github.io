---
title: Managing users
description: "Create user accounts, give each person the roles they need, and find the password and two-factor settings that apply to them."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Managing users

Every person who signs in to Profinity through the Web or the API has a user account, and what that person can see and do is decided by the **roles** assigned to the account.
A role is a named set of permissions such as viewing tags, sending CAN messages, or editing profiles, so setting up a new person means creating the account and choosing the role that matches their job, and nothing more.
The roles themselves, and the permissions inside them, are described in [Roles and permissions](./Roles_and_Permissions.md).

All of this is done from **Users & Groups**, which requires the **Security administration** permission and is shown only when the licence includes the Profinity Server feature, as described in [Licensing](../Licensing.md).
A Windows Desktop installation without a Server licence does not use user accounts, because it signs in automatically with a built-in administrator account that can do everything.
User accounts and roles exist on a Desktop host only when a Server licence is applied, and they are needed only when Profinity is used through the Web or the API.

## Creating a new user

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select **Add user**.
3. Fill in the fields in the table that follows.
4. Choose one or more roles under **Assigned roles**, and save.

| Field | Description |
|-------|-------------|
| **Profinity Username** | A unique name for the account, up to 256 characters, using only letters, numbers, periods, hyphens, underscores, and `@`. A name with any other character is rejected. |
| **Password** | The initial password for local sign-in, which must meet the [password policy](../System_Configuration/Security/Password_Policy.md). When editing an existing user, leave it blank to keep the current password. |
| **Is the user currently enabled** | Only enabled users can sign in or use the API. Switching it off blocks a person's access without deleting the account. |
| **Service Account** | Marks an account that exists for automation and produces a token that never expires, as described in [Service accounts](./Service_Accounts.md). |
| **Require password change on next login** | Makes the person choose their own password the first time they sign in. |
| **Assigned roles** | The roles that decide what the user can do. |

<figure markdown>
![The Add user panel with the username, password, and Assigned roles fields](../../images/add_user.png)
<figcaption>New user creation form</figcaption>
</figure>

Sites that use single sign-on (SSO) create the user in the same way and then add an external identity link, as described in [SSO and Sign-In Method](../System_Configuration/Security/SSO_and_Sign_In.md).

## Giving a user the right access

Each user can hold several roles, and holds the combined permissions of all of them, so the usual approach is to give each person one role that matches their job and add a second role only when they have a second job.
Profinity provides a single built-in role, **Administrators**, which holds every permission and is assigned to the default `admin` account, so every other role is created by an administrator from the **Roles** tab to suit the site.
[Roles and permissions](./Roles_and_Permissions.md) explains how to build a role, lists every permission, and suggests starting points such as a viewer role for people who only watch the system and an operator role for people who run it each day.

Because **Administrators** includes managing users and changing the system configuration, it is best kept for initial setup and emergencies, with named individuals using narrower roles the rest of the time.

To change the access of an existing user, click the user's row in **Users & Groups** to open their settings dialog and edit **Assigned roles**.

!!! warning "Changing roles signs people out"
    Changing a user's **Assigned roles** ends that user's active sessions, and they must sign in again.
    Make the change when the person is not part-way through a task.

The same dialog contains a **User Actions** tab for the administrator tasks in the following table.

| Task | Where to find it |
|------|------------------|
| Require a user to choose a new password, and sign out their sessions | **User Actions** tab, then **Reset Password**. Refer to [MFA account management](./MFA_Account_Management.md) |
| Clear a user's authenticator so they enrol again | **User Actions** tab, then **Reset MFA**. Refer to [MFA account management](./MFA_Account_Management.md) |
| Create or view an API token for a service account | **User Actions** tab, then **Generate Token** or **View Token**. Refer to [Service accounts](./Service_Accounts.md) |
| Link a user to an identity provider account | **User Actions** tab, in **External identities (SSO)**. Refer to [SSO and Sign-In Method](../System_Configuration/Security/SSO_and_Sign_In.md#linking-sso-users-to-profinity-accounts) |

## Disabling a user

To stop a person signing in without deleting their account:

1. Open the user's settings dialog.
2. Switch off **Is the user currently enabled**.
3. Save.

To end sessions that are already open, use **Reset Password** on the **User Actions** tab for a local user, which signs out the user's active sessions, or change the user's **Assigned roles**, which has the same effect.

## Password and sign-in rules

Password length, age, and complexity are set site-wide in the [Password Policy](../System_Configuration/Security/Password_Policy.md), and [Two-Factor Authentication](../System_Configuration/Security/Two_Factor_Authentication.md) describes how the second sign-in step is enabled and what users see.
How long a sign-in lasts and when repeated failures lock a user out are set in [Session Policy and Login Lockout](../System_Configuration/Security/index.md#session-policy-and-login-lockout).

## After creating a user

Share the sign-in details securely when the user signs in locally, and enable **Require password change on next login** so that the person chooses their own password the first time.
Then sign in as, or ask, the new user to confirm that the side menu shows the entries expected for their roles, since a missing entry almost always means a missing permission, and the table in [Roles and permissions](./Roles_and_Permissions.md#when-a-person-cannot-see-something) shows which one to check.

!!! warning "Change the default administrator password"
    A new installation includes an `admin` account with the password `password`, and the first sign-in as `admin` forces a password change.
    Choose a strong password at that point, and follow your organisation's policies when creating and sharing credentials.

## Related documentation

- [Security Guide](../../Installation/Security.md)
- [Kiosk Mode](../Kiosk_Mode.md)
