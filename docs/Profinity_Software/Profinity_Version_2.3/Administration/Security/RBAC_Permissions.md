---
title: RBAC and Permissions
description: "Assign and manage security roles with 27 granular permissions to control user access across Profinity."
---

# RBAC and Permissions

Profinity 2.3 uses **role-based access control (RBAC)** with **27 granular permissions**. Users are assigned one or more **roles**; each role holds a list of permissions. There are no per-user permission lists and no legacy security **groups**.

Permissions control what appears in the side menu, admin pills, and which `/api/v2` endpoints a user may call.

## Where to manage roles

1. Open the **pill menu** (top-right) as a user with **SecurityAdmin** permission.
2. Select **Users & Groups** (`/admin?view=users`).
3. Use the **Users** tab to assign **Assigned roles** to each user.
4. Use the **Roles** tab to create or edit roles and their permission toggles.

<figure markdown>
![Pill menu showing Users and Groups and System Configuration](../../../../assets/images/2.3/2.3-admin-users-groups-pill.png)
<figcaption>Admin pill menu with Users & Groups entry (screenshot placeholder — provide SS-01)</figcaption>
</figure>

<figure markdown>
![User settings showing assigned roles](../../../../assets/images/2.3/2.3-users-assigned-roles.png)
<figcaption>Assigned roles on a user account (screenshot placeholder — provide SS-02)</figcaption>
</figure>

<figure markdown>
![Roles tab with permission category toggles expanded](../../../../assets/images/2.3/2.3-roles-permission-toggles.png)
<figcaption>Role permission toggles by category (screenshot placeholder — provide SS-03)</figcaption>
</figure>

## Roles-only model (2.3)

| Term | Meaning |
|------|---------|
| **Role** | Named bundle of permissions (formerly called a security group in 2.2) |
| **Assigned role** | Role membership on a user |
| **Permission** | Atomic capability (for example `TagView`, `CANSend`) |

On upgrade from 2.2.x, Profinity migrates Security.yaml automatically:

- `SecurityGroups` → `Roles`
- User `SecurityGroups` → `AssignedRoles`
- Group `SecurityRoles` → role `Permissions`
- Document stamp becomes `Version: "2.3"` (missing version is treated as legacy `"1"`)

Example Security.yaml fragment:

```yaml
Version: "2.3"
Roles:
  Operators:
    Description: DBC and CAN operators
    Permissions:
      - DBCView
      - CANView
      - TagView
      - AlertsView
Users:
  demo.operator:
    Enabled: true
    AssignedRoles:
      - Operators
```

!!! warning "Session revocation"
    When you change a user's **Assigned roles** or edit a role's **Permissions**, active sessions for affected users are **revoked**. Users must sign in again.

## Permission quick reference

| Permission | Typical use |
|------------|-------------|
| `SecurityAdmin` | Users & Groups admin; user and role CRUD |
| `SystemAdmin` | System Configuration (Config.yaml) |
| `ProfileModify` | Profiles admin; add/switch/delete profiles |
| `ComponentModify` | Add/remove components; component settings |
| `ComponentAllowActions` | Run component actions (scripts, firmware actions) |
| `DashboardModify` | Save dashboard layout and templates |
| `FirmwareView` / `FirmwareModify` / `FirmwareAllowActions` | Firmware status and multistep actions |
| `CANView` / `CANSend` | CAN utilities (send implies view) |
| `CANReplay` | CAN LOG REPLAY side-menu entry |
| `DBCView` | DBC messages and signals screen |
| `ChargingView` / `ChargingControl` | Charger dashboards and control |
| `TagView` | Tag Explorer |
| `TagReplay` | TAG LOG REPLAY side-menu entry |
| `TagRulesView` / `TagRulesModify` | Rules editor (modify implies view) |
| `TagCollectionsView` / `TagCollectionsModify` | Collections editor (modify implies view) |
| `AlertsView` | ALL ALERTS; ack, unack, silence |
| `PluginView` / `PluginModify` | Components & Plugins admin |
| `McpView` | MCP endpoint (`/api/v2/Ai/Mcp`) — included in the default Administrators bundle |
| `ReceiveExternalTags` | Accept tags received from external sources |
| `AiAssistant` | Profinity AI side-menu entry |

**Implied permissions:** `CANSend` includes `CANView`; `TagRulesModify` includes `TagRulesView` and `TagView`; `PluginModify` includes `PluginView`; and similar pairs documented in the engineering reference.

## Default role templates

When creating roles, these templates are a useful starting point:

| Template | Permissions |
|----------|-------------|
| **Read-only** | `CANView`, `DBCView`, `TagView`, `TagRulesView`, `TagCollectionsView`, `AlertsView`, `ChargingView` |
| **Operator** | Read-only + `ComponentAllowActions`, `CANSend`, `ChargingControl` |
| **Engineer** | Operator + `ProfileModify`, `ComponentModify`, `DashboardModify`, `FirmwareView`, `FirmwareModify`, `FirmwareAllowActions`, `TagRulesModify`, `TagCollectionsModify` |
| **Security admin** | `SecurityAdmin` |
| **System admin** | `SystemAdmin` |
| **Administrators** | Full bundle, including `McpView` |

!!! tip "Principle of least privilege"
    Create dedicated accounts such as `demo.operator` with only the **Operator** template for day-to-day monitoring. Reserve **Administrators** for break-glass administration.

## Side menu and admin visibility

Permissions gate UI entries. For example:

- **ALL ALERTS** requires `AlertsView`.
- **TAG EXPLORER** requires `TagView`.
- **Components & Plugins** requires `PluginView` (not SecurityAdmin alone).
- **System Configuration** requires `SystemAdmin`.

<figure markdown>
![Side menu comparison between operator and administrator accounts](../../../../assets/images/2.3/2.3-side-menu-operator-vs-admin.png)
<figcaption>Side menu entries differ by assigned roles (screenshot placeholder — provide SS-04)</figcaption>
</figure>

## API integrators

- Role CRUD: `/api/v2/Roles` (replaces legacy `/api/v2/SecurityGroups`).
- JWT claims use granular permission names (`TagView`, `SecurityAdmin`, etc.).

For a full endpoint matrix, see the Profinity engineering [Secured Functionality Reference](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Security/Secured-Functionality-Reference.md).

## Pitfalls

- Do not refer to legacy **groups** in new documentation or YAML — use **roles**.
- There is no single `Admin` super-permission in 2.3; use **Administrators** role or assign specific permissions.

## Related documentation

- [Managing users](../Manage_Users.md)
- [Password policy](./Password_Policy.md)
- [Component and collection security](./Component_And_Collection_Security.md)
- [Service accounts](./Service_Accounts.md)
- [SSO and sign-in method](./SSO_and_Sign_In.md)
- [Two-factor authentication](./Two_Factor_Authentication.md)
- [Security guide](../../Installation/Security.md)
- [Release notes 2.3.10](../../Release_Notes/2.3.10.md)
