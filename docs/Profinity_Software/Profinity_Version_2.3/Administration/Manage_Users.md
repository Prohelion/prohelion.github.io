---
title: Managing Users
description: "Create user accounts, give each person the roles they need, and find the password and two-factor settings that apply to them."
---

# Managing Users

!!! info "Desktop Mode"
    When using Profinity in Windows Desktop Mode no user is required as a special admin user is used for this environment that has full permissions. Only when accessing Profinity via the Web or API interface are user profiles required.

## Overview

Every person who signs in to Profinity through the Web or the API has a user account, and what that person can see and do is decided by the **roles** assigned to the account. A role is a named set of permissions such as viewing tags, sending CAN messages or editing profiles, so setting up a new person means creating the account and choosing the role that matches their job, and nothing more. The roles themselves, and the permissions inside them, are described in [Roles and permissions](./Roles_and_Permissions.md).

All of this is done from **Users & Groups**, which requires the **SecurityAdmin** permission and is shown only when the licence includes the Profinity Server feature.

## Creating a new user

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Click **+ Add user**.
3. Enter a username and an initial password for local sign-in.
4. Choose one or more roles under **Assigned roles**.
5. Save.

<figure markdown>
![Add user interface showing the new user creation form](../images/add_user.png)
<figcaption>New user creation form</figcaption>
</figure>

Sites that use single sign-on create the user in the same way and then add **External identity links**, as described in [SSO and sign-in method](./Security/SSO_and_Sign_In.md). An account that exists for automation rather than a person is created by enabling **Service account**, which produces an API token, as described in [Service accounts](./Security/Service_Accounts.md).

## Giving a user the right access

Each user can hold several roles, and holds the combined permissions of all of them, so the usual approach is to give each person one role that matches their job and add a second role only when they have a second job. Profinity provides a single built-in role, **Administrators**, which holds every permission and is assigned to the default `admin` account, so every other role is created by an administrator from the **Roles** tab to suit the site. [Roles and permissions](./Roles_and_Permissions.md) explains how to build a role, lists every permission, and suggests starting points such as a viewer role for people who only watch the system and an operator role for people who run it each day.

Because **Administrators** includes managing users and changing the system configuration, it is best kept for initial setup and emergencies, with named individuals using narrower roles the rest of the time.

!!! warning "Changes sign people out"
    Changing a user's **Assigned roles** ends that user's active sessions, and they must sign in again. Do this when the person is not part-way through a task.

To change the access of an existing user, click the user's row in Users & Groups to open their settings dialog and edit **Assigned roles**. The same dialog contains a **User Actions** tab for the administrator tasks below.

| Task | Where to find it |
|------|------------------|
| Reset a user's password | **User Actions** tab, then **Reset Password**. See [MFA account management](./Security/MFA_Account_Management.md) |
| Reset a user's two-factor authentication | **User Actions** tab, then **Reset MFA**. See [MFA account management](./Security/MFA_Account_Management.md) |
| Create or view an API token for a service account | **User Actions** tab, then **Generate Token** or **View Token**. See [Service accounts](./Security/Service_Accounts.md) |

## Password and sign-in rules

Password length, age and complexity are set site-wide in the [Password policy](./Security/Password_Policy.md), and [Two-factor authentication](./Security/Two_Factor_Authentication.md) describes how the second sign-in step is enabled and what users see.

## After creating a user

Share the sign-in details securely when the user signs in locally, and enable **Require password change on next login** so that the person chooses their own password the first time. Then sign in as, or ask, the new user to confirm that the side menu shows the entries expected for their roles, since a missing entry almost always means a missing permission, and the table in [Roles and permissions](./Roles_and_Permissions.md#when-a-person-cannot-see-something) shows which one to check.

!!! warning "Change the default administrator password"
    A new installation includes an `admin` account with the password `password`. Change it immediately, and follow your organisation's policies when creating and sharing credentials.

## Related documentation

- [Roles and permissions](./Roles_and_Permissions.md)
- [Security guide](../Installation/Security.md)
- [Kiosk Mode](./Kiosk_Mode.md)
