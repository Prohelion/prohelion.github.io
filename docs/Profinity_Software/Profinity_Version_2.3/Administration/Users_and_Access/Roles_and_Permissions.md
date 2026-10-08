---
title: Roles and Permissions
description: "Control what each person can see and do in Profinity by creating roles and assigning them to users."
---

# Roles and Permissions

Profinity decides what each person can see and do through **roles**. A role is a named list of things that people holding it are allowed to do, such as viewing tags, sending CAN messages or editing profiles, and each user is given one or more roles when the account is set up. A person who holds two roles can do everything either role allows, and there is no way to give a single user an extra permission without a role, so to find out who can do something only the roles need to be checked.

This page shows how to create a role, give it to a person, and work out why someone cannot see something they expect to. Roles are managed from **Users & Groups**, the same place used to [create users](./Manage_Users.md), which requires the **Security administration** permission and a licence that includes the Profinity Server feature, as described in [Licensing](../Licensing.md).

!!! info "Desktop Mode"
    Profinity in Windows Desktop Mode does not use roles, because it signs in automatically with a built-in account that can do everything. The rest of this page applies when Profinity is used through the Web or the API.

## Create a Role

1. Select **ADMIN** in the side menu, then **Users & Groups**, and open the **Roles** tab.
2. Click **+ Add role**.
3. Enter a **Role name**, and a **Description** that says who the role is for, since that description is what the next administrator will rely on.
4. Switch on each permission the role should include. The permissions are grouped under headings such as **Administration**, **Components**, **CAN & DBC** and **Tags**, and each has a one-line explanation beside it.
5. Save the role.

Some permissions need another one to be useful, so Profinity switches the second one on for you and locks it while the first remains on. Turning on **Send CAN messages**, for example, also turns on **View CAN data**, because a person who can send messages needs to see the bus. To clear the locked permission, switch off the one that requires it. The permissions that work this way are marked in the [permission list](#what-each-permission-allows).

To change a role later, open the **Roles** tab and click the role. A role that is still given to one or more users cannot be deleted, so remove it from those users first.

## Give a Role to a Person

1. Open the **Users** tab of **Users & Groups** and click the person's row.
2. Choose one or more roles under **Assigned roles**.
3. Save.

A new user is given roles in the same way while the account is being created, as described in [Managing Users](./Manage_Users.md#creating-a-new-user).

!!! warning "The Person Is Signed Out"
    Changing someone's **Assigned roles**, or changing what a role allows, signs out everyone affected, and they must sign in again. Make the change when nobody is part-way through something that matters, such as a firmware update or a logging session.

## Which Roles to Create

Profinity comes with one role, **Administrators**, which allows everything and is given to the default `admin` account on a new installation. Because it includes managing users and changing the system configuration, keep it for setting up a site and for emergencies, and give everyone else a narrower role of your own.

Most sites need only a handful of roles, and the ones below are a good place to start. They are suggestions to build yourself, and none of them exists until you create it.

| Role | For people who | Switch on |
|------|----------------|-----------|
| **Viewer** | Watch the system but never change it | **View CAN data**, **View DBC definitions**, **View tags**, **View tag rules**, **View tag collections**, **View alerts**, **View charging** |
| **Operator** | Run a vehicle, bench or pack each day | Everything in Viewer, plus **Allow component actions**, **Send CAN messages** and **Control charging** |
| **Engineer** | Set up and tune a system | Everything in Operator, plus **Modify profiles**, **Modify components**, **Modify dashboards**, **View firmware**, **Modify firmware**, **Allow firmware actions**, **Modify tag rules** and **Modify tag collections** |
| **User manager** | Look after accounts | **Security administration** only |
| **Site administrator** | Look after the installation | **System administration** only |

Keeping the last two to a single permission means someone who looks after accounts and also runs the system holds two roles, instead of one role that is much wider than either job needs.

!!! tip "Start Narrow"
    Give each person the smallest role that lets them do their job and widen it when a real need appears. A person who loses access they relied on notices straight away, whereas a person who has quietly held too much access may never be noticed.

## What Each Permission Allows

The tables follow the headings in the role editor, using the names shown there. A note in the right-hand column means that switching the permission on also switches on the one named.

### Administration

| Permission | What it allows |
|------------|----------------|
| **Security administration** | Opening **License** and **Users & Groups** to manage users, roles, two-factor authentication, external identity links and session revoking, using **Restart Profinity**, and changing the **Security** settings of components and tag collections |
| **System administration** | Changing **System Configuration**, including single sign-on (SSO), System for Cross-domain Identity Management (SCIM) provisioning, Security Information and Event Management (SIEM) export and the security policy |
| **Modify profiles** | Creating, changing and deleting profiles, and opening the **Profile** and **Menu Layout** pills on the **ADMIN** page |

### Components, Dashboards and Firmware

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
| **View DBC definitions** | Seeing DBC message and signal definitions. Also turns on **View tags** |

!!! warning "Send CAN Messages Is High-Risk"
    A person who can send CAN messages can place frames directly onto the bus, which on a vehicle or battery system can command real hardware. Give it only to people trusted to operate that equipment.

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
| **Modify tag rules** | Creating, changing and deleting tag rules. Also turns on **View tag rules** and **View tags** |
| **View tag collections** | Seeing tag collections. Also turns on **View tags** |
| **Modify tag collections** | Creating, changing and deleting tag collections. Also turns on **View tag collections** and **View tags** |

### Alerts and Plugins

| Permission | What it allows |
|------------|----------------|
| **View alerts** | Seeing the alerts dashboard and history in **Alerts Log**, and acknowledging, unacknowledging and silencing alerts |
| **View plugins** | Seeing installed plugins in **Components & Plugins** |
| **Modify plugins** | Uploading, enabling and disabling plugins. Also turns on **View plugins** |

### Integrations

| Permission | What it allows |
|------------|----------------|
| **Profinity AI** | Using the **Profinity AI** chat assistant, described in [Profinity AI Settings](../System_Configuration/AI_Settings.md). Also turns on **MCP integration** |
| **MCP integration** | Connecting tools that use the Model Context Protocol (MCP) endpoint to read live data from Profinity |
| **Receive external tags** | Accepting tag snapshots and updates sent from another Profinity system |

## When a Person Cannot See Something

A missing menu entry or admin page means the person's roles lack the matching permission, unless the licence does not include the feature or the item is restricted to certain roles. Open the person in **Users & Groups**, note their **Assigned roles**, and check those roles for the permission below.

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

If the permission is present and the person still cannot see a particular component or tag collection, that item is restricted to certain roles, so check its allowed roles as described in [Component and collection security](./Component_And_Collection_Security.md).

There is no single administrator permission. Someone who needs broad access is given the **Administrators** role, or a role with the specific permissions they need.

## Related Documentation

- [Managing Users](./Manage_Users.md)
- [Password policy](../System_Configuration/Security/Password_Policy.md)
- [Two-factor authentication](../System_Configuration/Security/Two_Factor_Authentication.md)
- [Service accounts](./Service_Accounts.md)
- [SSO and sign-in method](../System_Configuration/Security/SSO_and_Sign_In.md)
- [Component and collection security](./Component_And_Collection_Security.md)
- [Security guide](../../Installation/Security.md)
