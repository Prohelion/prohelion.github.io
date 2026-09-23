---
title: Service Accounts
---

# Service accounts

Profinity 2.3 supports **service accounts** — dedicated user records with long-lived **API tokens** for automation, integrations, and **MCP** clients. Service accounts are managed in **Users & Groups** by users with **SecurityAdmin** permission.

## Create a service account

1. Open **Users & Groups** → **+ Add user** (or edit an existing automation user).
2. Enable the **Service account** toggle.
3. Save the user, then click the user's row to open their settings dialog.
4. Select the **User Actions** tab.
5. Click **Generate Token** (or **View Token** for an existing service account). The token dialog appears, showing the bearer token.

<figure markdown>
![Service account toggle and token dialog with token redacted](../../../../assets/images/2.3/2.3-service-account-token-dialog.png)
<figcaption>Service account token dialog (redact token string — provide SS-46)</figcaption>
</figure>

!!! danger "Copy the token once"
    Store the token in a secrets manager. Profinity may not display the full token again after the dialog closes.

## Permissions

Assign **roles** to the service account the same as interactive users. Common patterns:

| Use case | Suggested permissions |
|----------|----------------------|
| Read-only monitoring | Read-only role template |
| Tag/query automation | `TagView` plus any required read APIs |
| MCP access | `McpView` (assign explicitly — not in default Administrators bundle) |

See [RBAC and permissions](./RBAC_Permissions.md).

## Using the token

Pass the token as a bearer token on `/api/v2` requests:

```http
Authorization: Bearer {your-service-token}
```

For MCP setup and testing, see [MCP Server](../../Extending_Profinity/MCP_Server.md) and the engineering [MCP Testing guide](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Guides/MCP-Testing.md).

## Revoke access

- **Disable** the service account user in Users & Groups, or
- Change roles (revokes sessions), or
- Rotate the token by opening the user's settings dialog, selecting the **User Actions** tab, and clicking **Regenerate** in the token dialog to issue a new token.

## Related documentation

- [Managing users](../Manage_Users.md)
- [MCP Server](../../Extending_Profinity/MCP_Server.md)
- [RBAC and permissions](./RBAC_Permissions.md)
