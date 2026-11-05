---
title: Create a role
description: "Create a role, choose which permissions it holds, give it to a person, and decide which roles your site needs."
type: task
owner: Documentation
last_reviewed: 2026-10-28
---

# Create a role

Create a role when you want a person to do only what their job needs.
You need the **Security administration** permission and a Server licence.
Roles need a Server licence on every type of installation.

Refer to [Who can sign in, by installation type](../../Installation/Applying_a_Licence.md#who-can-sign-in) for what each installation signs in with.
Roles are managed from **Users & Groups**, the same place used to [create users](./Manage_Users.md).
[Roles and permissions](./Roles_and_Permissions.md) lists every permission and what it allows.

## Which roles to create

Profinity comes with one role, **Administrators**, which allows everything and is given to the default `admin` account.
The default `admin` account exists only on some installations; refer to [Who can sign in, by installation type](../../Installation/Applying_a_Licence.md#who-can-sign-in).
Because it includes managing users and changing the system configuration, keep it for setting up a site and for emergencies.
Give everyone else a narrower role of your own.

Most sites need only a handful of roles, and the roles in the following table are a good place to start.
They are suggestions to build yourself, and none of them exists until you create it.

| Role | For people who | Switch on |
|------|----------------|-----------|
| **Viewer** | Watch the system but never change it | **View CAN data**, **View DBC definitions**, **View tags**, **View tag rules**, **View tag collections**, **View alerts**, **View charging** |
| **Operator** | Run a vehicle, bench, or pack each day | Everything in Viewer, plus **Allow component actions**, **Send CAN messages**, and **Control charging** |
| **Engineer** | Set up and tune a system | Everything in Operator, plus **Modify profiles**, **Modify components**, **Modify dashboards**, **View firmware**, **Modify firmware**, **Allow firmware actions**, **Modify tag rules**, and **Modify tag collections** |
| **User manager** | Look after accounts | **Security administration** only |
| **Site administrator** | Look after the installation | **System administration** only |

Keeping **User manager** and **Site administrator** to a single permission each means someone who looks after accounts and also runs the system holds two roles.
The alternative is one role that is much wider than either job needs.

Give each person the smallest role that lets them do their job and widen it when a real need appears.
A person who loses access they relied on notices straight away.
A person who has quietly held too much access may never be noticed.

## Create the role

1. Select **ADMIN** in the side menu, then **Users & Groups**, and open the **Roles** tab.
2. Select **+ Add role**.
3. Enter a **Role name**, and a **Description** that says who the role is for, since that description is what the next administrator relies on.
4. Switch on each permission the role should include.
   The permissions are grouped under headings such as **Administration**, **Components**, **CAN & DBC**, and **Tags**, and each has a one-line explanation beside it.
5. Select **SAVE**.

Some permissions need another one to be useful, so Profinity switches the second one on for you and locks it while the first remains on.
Turning on **Send CAN messages**, for example, also turns on **View CAN data**, because a person who can send messages needs to see the bus.
To clear the locked permission, switch off the one that requires it.
The permissions that work this way are marked in the [permission list](./Roles_and_Permissions.md#what-each-permission-allows).

The new role appears in the **Roles** tab.

## Give the role to a person

1. Open the **Users** tab of **Users & Groups** and select the person's row.
2. Choose one or more roles under **Assigned roles**.
3. Save.

To remove a role from a person, clear it under **Assigned roles** and select **SAVE**.

A new user is given roles in the same way while the account is being created, as described in [Managing users](./Manage_Users.md#creating-a-new-user).
The person's row now lists the role under **Assigned roles**.

!!! warning "When a role change applies"
    Changing someone's **Assigned roles** signs that person out, and they must sign in again.
    Changing what a role allows does not sign anyone out. Each person's current access token keeps the previous permissions until it expires, which is 120 minutes by default (refer to [Session policy](../System_Configuration/Security/Session_Policy.md)), or until the session refreshes.
    A permission that you remove therefore keeps working until then. To apply the change sooner, ask the person to sign out and sign in again.
    Make the change when nobody is part-way through something that matters, such as a firmware update or a logging session.

## Change or delete a role

To change a role later, open the **Roles** tab and select the role.
Before you delete a role, write down its name, description and permissions, so you can create it again. Refer to [Create the role](#create-the-role).

To delete a role, open it on the **Roles** tab, select **DELETE ROLE** and confirm. The button is disabled while users hold the role, so remove the role from each of those users first. Profinity keeps the previous `security.yaml` as `security.yaml.bak`, which still holds the deleted role until the next save of security settings replaces it.

To limit which roles can see a particular component or collection, refer to [Restrict a component or collection](Component_And_Collection_Security/Restrict_a_Component_or_Collection.md).
