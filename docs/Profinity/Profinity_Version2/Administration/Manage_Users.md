---
title: Managing Users
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the product available to our Early Adopter Community.  If you have any issues or feedback please report it via our support portal or via the Feedback form in the Profinity Admin menu.

# Managing Users

!!! info "Desktop Mode"
    When using Profinity in Windows Desktop Mode no user is required as a special admin user is used for this environment that has full permissions.  Only when accessing Profinity via the Web or API interface are user profiles required.

## Overview

Before using Profinity, it's recommended to create a new user account tailored to your specific needs. This guide will walk you through the process of creating a user and assigning appropriate security roles.

## Creating a New User

1. Navigate to the user management section:
    - Click the `ADMIN` tab
    - Select `Users`
    - Click `+ ADD USER`
2. Fill in the user details in the form that appears

<figure markdown>
![Add user interface showing the new user creation form](../images/add_user.png)
<figcaption>New User Creation Form</figcaption>
</figure>

## Security Roles

!!! info "Administrator Privileges"
    Users with the administrator role automatically receive all other role privileges.

### Available Roles

Profinity supports different security roles to control access to system functionality, note this mainly controls what APIs the user is able to call, so if you are using the APIs these security restrictions also apply there.

- **Administrator**: Full system access
- **Read System Settings**: Use can read the system settings but can't change things
- **Change System Settings**: Use can modify system settings and update component settings
- **Charge Battery Packs**: Users require special permissions to be able to control the charging of battery packs
- **Send and Receive CAN**: Users can send and receive CAN bus packets at in individual packet level.  This is not required to see the dashboards etc, only **Read System Settings** is required

### Role Selection Guidelines

Consider these factors when assigning roles:

- User's technical expertise
- Required access level
- System security requirements

!!! warning "Send and Receive CAN is Powerful and can be Dangerous"
    A user with the ability to send and receive CAN Packets can inject CAN Packets in to your network, use this setting carefully.

!!! tip "Best Practice"
    Create dedicated 'Read System Settings' accounts for monitoring purposes. These accounts can view system information without the risk of accidental configuration changes.

## Next Steps

After creating a user:

1. Share the login credentials securely with the intended user
2. Have them change their password on first login
3. Verify they can access the required functionality

!!! warning "Security Notice"
    Always follow your organization's security policies when creating and sharing user credentials.