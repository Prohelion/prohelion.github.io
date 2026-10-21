---
title: Managing users
description: "Create user accounts, give each person the roles they need, and find the password and two-factor settings that apply to them."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Managing users

Every person who signs in to Profinity through the Web or the API has a user account, and what that person can see and do is decided by the **roles** assigned to the account.
A role is a named set of permissions such as viewing tags, sending CAN messages, or editing profiles.
Setting up a new person means creating the account and choosing the role that matches their job.
[Roles and permissions](./Roles_and_Permissions.md) describes the roles and the permissions inside them.

You manage users from **Users & Groups**.
It needs the **Security administration** permission and a Server licence.
Refer to [Who can sign in, by installation type](../../Installation/Applying_a_Licence.md#who-can-sign-in) for which installations use user accounts.

## Creating a new user

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select **Add user**.
3. Fill in the fields in the table that follows.
4. Choose one or more roles under **Assigned roles**, and save.

| Field | Description |
|-------|-------------|
| **Profinity Username** | A unique name for the account, up to 256 characters, using only letters, numbers, periods, hyphens, underscores, and `@`. A name with any other character is rejected. |
| **Password** | The initial password for local sign-in, which must meet the [Password policy](../System_Configuration/Security/Password_Policy.md). When editing an existing user, leave it blank to keep the current password. |
| **Is the user currently enabled** | Only enabled users can sign in or use the API. Switching it off blocks a person's access without deleting the account. |
| **Service Account** | Marks an account that exists for automation and produces a token that never expires, as described in [Service accounts](./Service_Accounts.md). |
| **Require password change on next login** | Makes the person choose their own password the first time they sign in. |
| **Assigned roles** | The roles that decide what the user can do. |

<figure markdown>
![The Add user panel with the username, password, and Assigned roles fields](../../images/add_user.png)
<figcaption>New user creation form</figcaption>
</figure>

Sites that use single sign-on (SSO) create the user in the same way, then add an external identity link, as described in [SSO and sign-in method](../System_Configuration/Security/SSO_and_Sign_In.md).

## Giving a user the right access

Each user holds the combined permissions of all their roles.
Give each person one role that matches their job, and add a second role only when they have a second job.

Profinity provides a single built-in role, **Administrators**, which holds every permission and is assigned to the default `admin` account.
An administrator creates every other role from the **Roles** tab to suit the site.
[Roles and permissions](./Roles_and_Permissions.md) explains how to build a role, lists every permission, and suggests starting points.
Examples are a viewer role for people who only watch the system and a role for people who run it each day.

Because **Administrators** includes managing users and changing the system configuration, keep it for initial setup and emergencies.
Named individuals use narrower roles the rest of the time.

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

The [Password policy](../System_Configuration/Security/Password_Policy.md) sets password length, age, and complexity for the whole site.
[Two-factor authentication](../System_Configuration/Security/Two_Factor_Authentication.md) describes how the second sign-in step is enabled and what users see.
How long a sign-in lasts and when repeated failures lock a user out are set in [Session policy and login lockout](../System_Configuration/Security/index.md#session-policy-and-login-lockout).

## After creating a user

If the user signs in locally, share the sign-in details securely and enable **Require password change on next login**.
The person then chooses their own password the first time.

Sign in as the new user, or ask them, to confirm that the side menu shows the entries expected for their roles.
A missing entry almost always means a missing permission.
The table in [Roles and permissions](./Roles_and_Permissions.md#when-a-person-cannot-see-something) shows which permission to check.

!!! warning "Change the default administrator password"
    Where an installation has the default `admin` account, its password is `password`, and the first sign-in forces a password change.
    Choose a strong password at that point, and follow your organisation's policies when creating and sharing credentials.
    Refer to [Who can sign in, by installation type](../../Installation/Applying_a_Licence.md#who-can-sign-in) to check whether your installation has the account.

## Related documentation

- [Security guide](../../Installation/Security.md)
- [Kiosk Mode](../Kiosk_Mode.md)
