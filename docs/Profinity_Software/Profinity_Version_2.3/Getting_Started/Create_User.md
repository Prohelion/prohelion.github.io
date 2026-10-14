---
title: Creating a User
description: "Create new Profinity users and assign security roles to control access and functionality for different users."
---

# Creating a User

!!! info "Licence Required"
    Creating users needs the **Profinity Server** licensed feature, included in the **Server** and **Enterprise** editions, and the **Security administration** permission. Without the feature there are no user accounts or roles: a Desktop installation runs as a single built-in admin user, and **Users & Groups** shows that user and group administration requires a Server licence. See [Licensing](../Administration/Licensing.md) for what each edition includes.

Create a new user after installing Profinity, with further users for each type of operator. To create a new user, select **ADMIN** in the side menu, then **Users & Groups** and then **+ Add user**, enter a username and an initial password for local sign-in, choose one or more roles under **Assigned roles**, and save, which creates the account and its login details.

<figure markdown>
![Add user](../images/add_user.png)
<figcaption>New user menu</figcaption>
</figure>

## Choosing Roles

A role is a named set of permissions, and a person can hold more than one. A user can only do what their roles allow, so give each person the smallest set that lets them do their job. A good starting point is three roles:

| Role | For people who | Typical access |
|------|----------------|----------------|
| **Viewer** | Watch the system but never change it | View data, tags, alerts and dashboards |
| **Operator** | Run a vehicle, bench or pack each day | Everything a Viewer can do, plus running component actions and controlling charging |
| **Engineer** | Set up and tune a system | Everything an Operator can do, plus changing profiles, components, dashboards and firmware |

The default **Administrators** role includes every permission, so assigning it gives that person the access of every other role. Keep it for the few people who manage the installation. [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) explains how to create these roles and lists every permission.

## More Information

[Managing Users](../Administration/Users_and_Access/Manage_Users.md) covers creating and managing users, including password resets and service accounts, and [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) lists the full permission catalogue.
