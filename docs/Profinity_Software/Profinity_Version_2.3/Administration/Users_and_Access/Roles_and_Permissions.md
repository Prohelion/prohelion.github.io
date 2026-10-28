---
title: Roles and permissions
description: "Look up every Profinity permission, what it allows and which others it switches on, and find the permission a person is missing."
type: reference
owner: Documentation
last_reviewed: 2026-10-28
---

# Roles and permissions

Profinity decides what each person can see and do through **roles**.
A role is a named list of things that people holding it are allowed to do, such as viewing tags, sending CAN messages, or editing profiles.
Each user is given one or more roles when the account is set up.
A person who holds two roles can do everything either role allows.
You cannot give a single user an extra permission without a role, so to find out who can do something, check only the roles.

Refer to [Create a role](./Create_a_Role.md) to create a role, give it to a person, and choose which roles your site needs.
This page lists every permission and helps you work out why someone cannot see something they expect to.
You need the **Security administration** permission and a Server licence to manage roles.

## What each permission allows

The permission tables follow the headings in the role editor and use the names shown there.
A note in the **What it allows** column means that switching the permission on also switches on the one named.

### Administration

| Permission | What it allows |
|------------|----------------|
| **Security administration** | Opening **License** and **Users & Groups** to manage users, roles, two-factor authentication, external identity links and session revoking, using **Restart Profinity**, and changing the **Security** settings of components and tag collections |
| **System administration** | Changing **System Configuration**, including single sign-on (SSO), System for Cross-domain Identity Management (SCIM) provisioning, Security Information and Event Management (SIEM) export and the security policy |
| **Modify profiles** | Creating, changing, and deleting profiles, and opening the **Profile** and **Menu Layout** pills on the **ADMIN** page |

### Components, dashboards, and firmware

| Permission | What it allows |
|------------|----------------|
| **Modify components** | Adding and removing components and changing their settings |
| **Allow component actions** | Running the action menu items of components and scripts |
| **Modify dashboards** | Editing dashboard layouts and bindings |
| **View firmware** | Seeing firmware information and status |
| **Modify firmware** | Uploading and configuring firmware. Also turns on **View firmware** |
| **Allow firmware actions** | Running multi-step firmware actions, such as an update |

### CAN and DBC

| Permission | What it allows |
|------------|----------------|
| **View CAN data** | Seeing received CAN traffic |
| **Send CAN messages** | Sending CAN messages from Profinity. Also turns on **View CAN data** |
| **Replay CAN logs** | Uploading and replaying CAN log files, and the **CAN LOG REPLAY** menu entry. Also turns on **View CAN data** |
| **View DBC definitions** | Seeing CAN database (DBC) message and signal definitions. Also turns on **View tags** |

!!! warning "Send CAN messages is high-risk"
    A person who can send CAN messages can place frames directly onto the bus, which on a vehicle or battery system can command real hardware.
    Give it only to people trusted to operate that equipment.

### Charging

| Permission | What it allows |
|------------|----------------|
| **View charging** | Seeing charging status and the charger dashboards |
| **Control charging** | Starting and stopping charging. Also turns on **View charging** |

### Tags

| Permission | What it allows |
|------------|----------------|
| **View tags** | Browsing and querying tags, including **TAG EXPLORER** |
| **Replay tag changes** | Uploading and replaying tag change logs, and the **TAG LOG REPLAY** menu entry. Also turns on **View tags** |
| **View tag rules** | Seeing tag rules and expressions. Also turns on **View tags** |
| **Modify tag rules** | Creating, changing, and deleting tag rules. Also turns on **View tag rules** and **View tags** |
| **View tag collections** | Seeing tag collections. Also turns on **View tags** |
| **Modify tag collections** | Creating, changing, and deleting tag collections. Also turns on **View tag collections** and **View tags** |

### Alerts and plugins

| Permission | What it allows |
|------------|----------------|
| **View alerts** | Seeing the alerts dashboard and history in **Alerts Log**, and acknowledging, unacknowledging, and silencing alerts |
| **View plugins** | Seeing installed plugins in **Components & Plugins** |
| **Modify plugins** | Uploading, enabling, and disabling plugins. Also turns on **View plugins** |

### Integrations

| Permission | What it allows |
|------------|----------------|
| **Profinity AI** | Using the **Profinity AI** chat assistant, described in [Profinity AI Settings](../System_Configuration/AI_Settings.md). Also turns on **MCP integration** |
| **MCP integration** | Connecting tools that use the Model Context Protocol (MCP) endpoint to read live data from Profinity |
| **Receive external tags** | Accepting tag snapshots and updates sent from another Profinity system |

## When a person cannot see something

A missing menu entry or admin page means the person's roles lack the matching permission.
The exceptions are a licence that does not include the feature and an item that is restricted to certain roles.
Open the person in **Users & Groups**, note their **Assigned roles**, and check those roles for the permission in the following table.

| The person cannot see | The role needs |
|-----------------------|----------------|
| **Users & Groups** | **Security administration**, and a licence that includes the Profinity Server feature |
| **System Configuration** | **System administration** |
| **License** or **Restart Profinity** | **Security administration** |
| **Profile** or **Menu Layout** | **Modify profiles** |
| **Components & Plugins** | **View plugins**, which **Security administration** does not include |
| **TAG EXPLORER** | **View tags** |
| **ALL ALERTS** | **View alerts** |
| **CAN LOG REPLAY** or **TAG LOG REPLAY** | **Replay CAN logs** or **Replay tag changes** |
| **Profinity AI** | **Profinity AI** |

If the permission is present and the person still cannot see a particular component or tag collection, that item is restricted to certain roles.
Check its allowed roles as described in [Component and collection security](./Component_And_Collection_Security.md).

Profinity has no single administrator permission.
Someone who needs broad access is given the **Administrators** role, or a role with the specific permissions they need.

## Related documentation

- [Create a role](./Create_a_Role.md)
- [Managing users](./Manage_Users.md)
- [Password policy](../System_Configuration/Security/Password_Policy.md)
- [Two-factor authentication](../System_Configuration/Security/Two_Factor_Authentication.md)
- [Service accounts](./Service_Accounts.md)
- [SSO and sign-in method](../System_Configuration/Security/SSO_and_Sign_In.md)
- [Component and collection security](./Component_And_Collection_Security.md)
- [Security guide](../../Installation/Security.md)
