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

Each user is also assigned one or more [roles](../Administration/Users_and_Access/Roles_and_Permissions.md), which bundle the permissions that allow or restrict particular Profinity functionality for that user. The default Administrators role includes the full permission bundle, so assigning it grants the permissions of every other role.

## More Information

[Managing Users](../Administration/Users_and_Access/Manage_Users.md) covers creating and managing users, including password resets and service accounts, and [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) lists the full permission catalogue.
