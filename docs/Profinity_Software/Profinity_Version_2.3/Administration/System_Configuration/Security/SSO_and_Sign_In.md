---
title: SSO and Sign-In Method
description: "Choose the site-wide sign-in method and configure OpenID Connect single sign-on for all Profinity users."
---

# SSO and Sign-In Method

Profinity uses one **Sign-in method** for the whole site, so every user signs in the same way: either **Local**, with a username and password held by Profinity, or **Sso**, with single sign-on (SSO) through an OpenID Connect (OIDC) identity provider (IdP). A site cannot mix the two, and Profinity 2.3 supports a single identity provider for the whole site, so every SSO user signs in through the same **Authority URL (IdP issuer)**.

## Choosing the Sign-In Method

To choose the method, select **ADMIN** in the side menu, then **System Configuration**, open the **Security** tab and set **Sign-in method** to **Local** or **Sso**, which requires the **System administration** permission. With **Local** selected, the tab also offers **Enforce two-factor for local users**, described in [Two-Factor Authentication](./Two_Factor_Authentication.md), and **Allow security-key sign-in**. With **Sso** selected, the **SSO** and **SCIM Provisioning** groups appear.

!!! note "Licence Required"
    Choosing **Sso** as the **Sign-in method** requires the **Enterprise Security** licensed feature, included in the **Enterprise** edition only. Without it Profinity keeps **Local** sign-in and the **Sso** choice does not take effect. See [Licensing](../../Licensing.md) for what each edition includes.

## Configuring the Identity Provider

When **Sign-in method** is **Sso**, the **SSO** group holds the values taken from the application registration in the identity provider.

| Setting | What to enter |
|---------|---------------|
| **Display name** | The text on the login button, which reads **Sign in with** followed by this name, for example `Corporate SSO`. Up to 128 characters. |
| **Authority URL (IdP issuer)** | The issuer URL from the identity provider's metadata, which is required and must be an absolute `http` or `https` URL. This is the issuer, not the address of the provider's login page. |
| **Client ID** | The application (client) identifier, which is required, from the identity provider's app registration. |
| **Client secret** | The confidential client secret from the app registration, which can be left empty only when the identity provider allows public clients without a secret. |
| **Redirect URIs (ACS URL)** | A comma-separated allow list of Profinity callback addresses, which should include the address registered in the identity provider. |
| **End session endpoint (IdP logout URL)** | The identity provider's logout URL, used to end the identity provider session when the user signs out. When empty, Profinity discovers it from the authority metadata. |
| **Post-logout redirect URI (SP return URL)** | The Profinity address the identity provider returns the user to after logout. When empty, the user returns to the login page. |
| **Group claim name** | The name of the claim that carries group or role membership from the identity provider. The default is `groups`. |

The identity provider must be told to accept the Profinity callback address, which is `https://{your-host}/api/v2/Auth/External/Callback`, where `{your-host}` is the address users type to reach Profinity. Register that address as a redirect URI (called the Assertion Consumer Service URL in some products) in the identity provider, and enter the same address in **Redirect URIs (ACS URL)**. Profinity requests the `openid`, `profile` and `email` scopes, so the app registration must allow them. Profinity builds the callback address from the address the user used to reach the sign-in page, so a site served over HTTPS (see [Profinity Web](../Profinity_Web.md)) registers an `https` address.

!!! warning "Saving Restarts Profinity"
    Saving the **Security** tab restarts Profinity and interrupts active sessions, so plan the cutover to **Sso** for a maintenance window. Profinity does not save **Sso** as the sign-in method while **Authority URL (IdP issuer)** is empty, and rejects the save with the message "SSO must be enabled with a valid authority URL when sign-in method is SSO."

## What Users See at Sign-In

When **Sign-in method** is **Local**, the login page shows the username and password fields. When it is **Sso** and the provider is configured, the login page shows a **Sign in with** button carrying the **Display name**, and no password form is shown.

If the sign-in does not complete, the user returns to the login page with an error and no session is created. The usual causes are an **Authority URL (IdP issuer)** that is the login page address instead of the issuer, a callback address that is not registered with the identity provider, and a user who has no matching external identity, as described below.

## Linking SSO Users to Profinity Accounts

Profinity matches an identity provider user to a Profinity account through an external identity link on the account, so each person needs an account before their first SSO sign-in. Select **ADMIN** in the side menu, then **Users & Groups**, and click the user, or create the user as described in [Managing Users](../../Users_and_Access/Manage_Users.md). On the **User Actions** tab, in **External identities (SSO)**, add a link with these values:

1. Enter `default` as the **Provider ID**, which is the identifier Profinity gives its single identity provider.
2. Enter the identity provider's unique identifier for the person (the OIDC `sub` claim) as the **Subject ID**.
3. Optionally enter the person's email address as **Email**, then save.

A person whose sign-in succeeds at the identity provider but who has no link, or whose Profinity account is disabled, returns to the login page with an error, and the failed sign-in is recorded in the security audit events. Service accounts are not linked to identity providers and keep using their tokens, as described in [Service Accounts](../../Users_and_Access/Service_Accounts.md).

## Recovering from a Misconfigured Provider

Because a site cannot mix **Local** and **Sso**, a misconfigured or unreachable identity provider prevents every user from signing in, so confirm the callback address and the issuer with a test account before relying on **Sso**. If Profinity starts with **Sso** selected and no **Authority URL (IdP issuer)**, it reverts to **Local** sign-in so that the site is not locked out. When the authority is set but wrong, the **Sign-in method** has to be set back to **Local** by editing the `config.yaml` file in the `config` folder of the [Artifacts directory](../../../Installation/Artifacts_Directory.md) and restarting Profinity, after which an administrator can sign in with a local password.

## Multi-Factor Authentication and SCIM

With **Sso** selected, multi-factor authentication is enforced by the identity provider and Profinity's local [two-factor policy](./Two_Factor_Authentication.md) does not apply. Automated user provisioning from the identity provider is described in [SCIM and SIEM](./SCIM_and_SIEM.md).

## Related Documentation

- [Two-Factor Authentication](./Two_Factor_Authentication.md)
- [SCIM and SIEM](./SCIM_and_SIEM.md)
- [Roles and Permissions](../../Users_and_Access/Roles_and_Permissions.md)
- [Release notes 2.3](../../../Release_Notes/2.3.1.md)
