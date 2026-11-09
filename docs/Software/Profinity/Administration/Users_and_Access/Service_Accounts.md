---
title: Service accounts
description: "Create service accounts with API tokens that never expire, for automation and external Model Context Protocol (MCP) client access."
type: task
owner: Documentation
last_reviewed: 2026-10-27
---

# Service accounts

Create a service account for an integration or Model Context Protocol (MCP) client, so the integration signs in with an API token instead of a password.
A service account is a user record that exists for automation rather than a person, and it signs in with a long-lived **API token**.
A user with the **Security administration** permission manages service accounts in **Users & Groups**, which needs a Server licence. MCP access also needs the **AI** licensed feature, which the **Server** and **Enterprise** editions include. Refer to [Licensing](../../Licensing.md) for details.

A service account token never expires, unlike the sign-in of an ordinary user.
The token stays valid until an administrator generates a new one or disables the account.
Changing the account's roles does not change the token.
Treat the token like a password, store it in a secrets manager, and give the account only the permissions its integration needs.

## Creating a service account

!!! danger "Generating a token stops the old one working"
    **Generate Token** issues a new token, and the previous token stops working immediately.
    On an account that already has a token, select **View Token** on the **User Actions** tab and copy the current token before you generate a new one.
    Every integration that uses the old token fails until you update it with the new one, so plan to update the integration straight after you generate the token.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select **Add user**, or select an existing automation user.
3. Switch on **Service Account**.
4. Assign the roles the account needs under **Assigned roles**, then select **ADD USER**. On an existing account, select **SAVE** instead.
5. Select the user's row to open its settings dialog.
6. Select the **User Actions** tab.
7. Select **Generate Token**, then confirm. The **Service Account Token** dialog shows the bearer token in the **Token** box. Then do the following:

   a. Select **Copy**. The button reads **Copied** for a moment.

   b. Store the token in a secrets manager.

   c. Select **Close**.

To check the new token, send a `GET` request to `/api/v2/Users/Current` with it, as described under Using the token. A successful response returns status `200` and the account's details, with `isServiceAccount` set to `true`.

On an account that already has a token, **View Token** also appears and displays the current token again.

<figure markdown>
![The Service Account Token dialog over the User Actions tab, with the token in a read-only Token box, a Copy button beside the Token label and a Close button](../../images/service-account-token-dialog.png)
<figcaption>Service account token dialog</figcaption>
</figure>

## Permissions

A service account is given roles in the same way as an interactive user.
The following table shows common patterns.

| Use case | Suggested permissions |
|----------|----------------------|
| Read-only monitoring | A role holding view permissions only, as suggested in [Create a role](Create_a_Role.md#which-roles-to-create) |
| Tag and query automation | **View tags**, plus any other view permission the integration reads |
| MCP access | **MCP integration**, or the **Profinity AI** permission, which implies it. The default **Administrators** role has both. |

## Run an AI technician

An [AI technician](../../Profinity_AI/AI_Technicians/index.md) names a user in its **Run as** setting, and each round signs in as that user.
A service account is the usual choice, because its roles can be limited to reading.
The round signs in with its own session, so it does not use the account's token, and **Generate Token** does not affect it.
That session expires two minutes after the technician's **Round timeout (seconds)**, so it cannot be used once the round is over.

Give the account a role that holds **MCP integration**, **View tags**, **View alerts**, and **View tag rules**, and no permission that changes anything.
Restricted components and collections apply to the account in the same way as to any user, so the technician cannot see a device the account cannot see.
Disabling the account stops the technician, and each round then ends with a `blocked` finding.

## Using the token

Send the token as a bearer token on `/api/v2` requests:

```http
Authorization: Bearer <your-service-token>
```

Replace `<your-service-token>` with the token from **Generate Token** or **View Token**.

For MCP setup and testing, refer to [Prepare Profinity for an MCP client](../../Integrating_to_Profinity/MCP_Server/Prepare_Profinity.md).

## Revoking access

To revoke a service account's access, disable the account in **Users & Groups**. Requests with its token are then refused.

To stop one token working without disabling the account, select **Generate Token** on its **User Actions** tab. The old token stops working, and the account keeps access with the new token.

## Related documentation

- [Managing users](Manage_Users.md)
- [Component and collection security](./Component_And_Collection_Security/index.md), which describes how restricted components and collections apply to service accounts
