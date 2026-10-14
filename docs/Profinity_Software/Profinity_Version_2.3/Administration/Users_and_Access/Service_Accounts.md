---
title: Service accounts
description: "Create service accounts with API tokens that never expire, for automation and external Model Context Protocol (MCP) client access."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Service accounts

A service account is a user record that exists for automation rather than a person, and it signs in with a long-lived **API token** instead of a password, which suits integrations and Model Context Protocol (MCP) clients.
A user with the **Security administration** permission manages service accounts in **Users & Groups**, and the page is shown only when the licence includes the Profinity Server feature.

A service account token never expires, which differs from the sign-in of an ordinary user, so the token stays valid until an administrator generates a new one, changes the account's roles, or disables the account.
Treat the token like a password, store it in a secrets manager, and give the account only the permissions its integration needs.

## Creating a service account

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select **Add user**, or click an existing automation user.
3. Switch on **Service Account**.
4. Assign the roles the account needs under **Assigned roles**, and save.
5. Click the user's row to open its settings dialog.
6. Select the **User Actions** tab.
7. Select **Generate Token**. The bearer token appears in a dialog.

On an account that already has a token, **View Token** also appears and displays the current token again.

<figure markdown>
![The Service Account toggle and the token dialog, with the token redacted](../../images/2.3-service-account-token-dialog.png)
<figcaption>Service account token dialog</figcaption>
</figure>

!!! danger "Generating a token stops the old one working"
    **Generate Token** issues a new token and the previous token stops working immediately, so every integration that uses the old token fails until it is updated with the new one.
    Copy the token into a secrets manager when it is shown, so that it is available to configure the integration.

## Permissions

A service account is given roles in the same way as an interactive user, and the table shows common patterns.

| Use case | Suggested permissions |
|----------|----------------------|
| Read-only monitoring | A role holding view permissions only, as suggested in [Roles and permissions](Roles_and_Permissions.md#which-roles-to-create) |
| Tag and query automation | **View tags**, plus any other view permission the integration reads |
| MCP access | **MCP integration**, which the default **Administrators** role includes and which any other role must be given explicitly |

MCP access also needs the **AI** licensed feature, included in the **Server** and **Enterprise** editions, as described in [Licensing](../Licensing.md).

## Using the token

The token is passed as a bearer token on `/api/v2` requests:

```http
Authorization: Bearer {your-service-token}
```

For MCP setup and testing, refer to [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md).

## Revoking access

To revoke a service account's access, disable the account in **Users & Groups**, change its roles, which also issues a new token and stops the old one working, or select **Generate Token** on its **User Actions** tab, which stops the old token working.

## Related documentation

- [Managing users](Manage_Users.md)
- [Component and collection security](./Component_And_Collection_Security.md), which describes how restricted components and collections apply to service accounts
