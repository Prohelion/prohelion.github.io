---
title: RBAC and Permissions
description: "Assign and manage security roles with 27 granular permissions to control user access across Profinity."
---

# RBAC and Permissions

Profinity 2.3 uses **role-based access control (RBAC)** with **27 granular permissions**. Users are assigned one or more **roles**; each role holds a list of permissions. There are no per-user permission lists and no legacy security **groups**.

Permissions control what appears in the side menu, admin pills, and which `/api/v2` endpoints a user may call.

## Where to manage roles

1. Select **ADMIN** in the side menu as a user with **SecurityAdmin** permission.
2. Select **Users & Groups** (`/admin?view=users`).
3. Use the **Users** tab to assign **Assigned roles** to each user.
4. Use the **Roles** tab to create or edit roles and their permission toggles.

## Roles-only model (2.3)

| Term | Meaning |
|------|---------|
| **Role** | Named bundle of permissions (formerly called a security group in 2.2) |
| **Assigned role** | Role membership on a user |
| **Permission** | Atomic capability (for example `TagView`, `CANSend`) |

On upgrade from 2.2.x, Profinity migrates security.yaml automatically:

- `SecurityGroups` → `Roles`
- User `SecurityGroups` → `AssignedRoles`
- Group `SecurityRoles` → role `Permissions`
- Document stamp becomes `Version: "2.3"` (missing version is treated as legacy `"1"`)

Example security.yaml fragment:

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
| `SystemAdmin` | System Configuration (config.yaml) |
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

**Implied permissions:** granting the permission in the first column also grants every permission listed beside it, and the implication chains, so `TagRulesModify` also grants `TagView` by way of `TagRulesView`.

| Permission | Also grants |
|------------|-------------|
| `FirmwareModify` | `FirmwareView` |
| `CANSend` | `CANView` |
| `CANReplay` | `CANView` |
| `DBCView` | `TagView` |
| `TagReplay` | `TagView` |
| `ChargingControl` | `ChargingView` |
| `TagRulesModify` | `TagRulesView`, `TagView` |
| `TagCollectionsModify` | `TagCollectionsView`, `TagView` |
| `TagRulesView` | `TagView` |
| `TagCollectionsView` | `TagView` |
| `PluginModify` | `PluginView` |
| `AiAssistant` | `McpView` |

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

## API integrators

- Role CRUD: `/api/v2/Roles` (replaces legacy `/api/v2/SecurityGroups`).
- JWT claims use granular permission names (`TagView`, `SecurityAdmin`, etc.).

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
