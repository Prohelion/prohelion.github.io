---
title: Service Accounts
description: "Create service accounts with API tokens that never expire, for automation and external Model Context Protocol (MCP) client access."
---

# Service Accounts

A service account is a user record that exists for automation rather than a person, and it signs in with a long-lived **API token** instead of a password, which suits integrations and Model Context Protocol (MCP) clients. A user with the **Security administration** permission manages service accounts in **Users & Groups**, and the page is shown only when the licence includes the Profinity Server feature.

A service account token never expires, which differs from the sign-in of an ordinary user, so the token stays valid until an administrator generates a new one or disables the account. Treat the token like a password, store it in a secrets manager, and give the account only the permissions its integration needs.

## Creating a Service Account

To create one, select **ADMIN** in the side menu, then **Users & Groups**, select **Add user** (or click an existing automation user), switch on **Service Account**, assign the roles it needs under **Assigned roles** and save. Click the user's row to open its settings dialog, select the **User Actions** tab and select **Generate Token**, which shows the bearer token in a dialog. On an account that already has a token, **View Token** also appears and displays the current token again.

<figure markdown>
![Service account toggle and token dialog with token redacted](../../images/2.3-service-account-token-dialog.png)
<figcaption>Service Account Token Dialog</figcaption>
</figure>

!!! danger "Generating a Token Stops the Old One Working"
    **Generate Token** issues a new token and the previous token stops working immediately, so every integration that uses the old token fails until it is updated with the new one. Copy the token into a secrets manager when it is shown, so that it is available to configure the integration.

## Permissions

A service account is given roles in the same way as an interactive user, and the table shows common patterns.

| Use case | Suggested permissions |
|----------|----------------------|
| Read-only monitoring | A role holding view permissions only, as suggested in [Roles and Permissions](Roles_and_Permissions.md#which-roles-to-create) |
| Tag and query automation | **View tags**, plus any other view permission the integration reads |
| MCP access | **MCP integration**, which the default **Administrators** role includes and which any other role must be given explicitly |

MCP access also needs the **AI** licensed feature, included in the **Server** and **Enterprise** editions, as described in [Licensing](../Licensing.md).

## Using the Token

The token is passed as a bearer token on `/api/v2` requests:

```http
Authorization: Bearer {your-service-token}
```

For MCP setup and testing, see [MCP Server](../../Integrating_to_Profinity/MCP_Server.md).

## Revoking Access

To revoke a service account's access, disable the account in **Users & Groups**, change its roles, which ends its sessions, or select **Generate Token** on its **User Actions** tab, which stops the old token working.

## Related Documentation

- [Managing Users](Manage_Users.md)
- [MCP Server](../../Integrating_to_Profinity/MCP_Server.md)
- [Roles and Permissions](Roles_and_Permissions.md)
- [Component and Collection Security](./Component_And_Collection_Security.md), which describes how restricted components and collections apply to service accounts
