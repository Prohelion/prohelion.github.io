---
title: SSO and sign-in method
description: "Choose the site-wide sign-in method, configure OpenID Connect single sign-on, link users to accounts and recover from a misconfigured provider."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# SSO and sign-in method

Profinity uses one **Sign-in method** for the whole site, so every user signs in the same way.
**Local** uses a username and password held by Profinity.
**Sso** uses single sign-on (SSO) through an OpenID Connect (OIDC) identity provider (IdP).
A site cannot mix the two.
Profinity 2.3 supports one identity provider for the whole site, so every SSO user signs in through the same **Authority URL (IdP issuer)**.

## Choosing the sign-in method

You need the **System administration** permission to choose the method.

1. Select **ADMIN** in the side menu, then **System Configuration**.
2. Open the **Security** tab.
3. Set **Sign-in method** to **Local** or **Sso**.

With **Local** selected, the tab also offers **Enforce two-factor for local users** and **Allow security-key sign-in**.
Refer to [Two-factor authentication](./Two_Factor_Authentication.md) for both.
With **Sso** selected, the **SSO** and **SCIM Provisioning** groups appear.

!!! note "Licence required"
    Choosing **Sso** as the **Sign-in method** requires the **Enterprise Security** licensed feature, included in the **Enterprise** edition only.
    Without it Profinity keeps **Local** sign-in and the **Sso** choice does not take effect.
    Refer to [Licensing](../../../Licensing.md) for what each edition includes.

## Configuring the identity provider

When **Sign-in method** is **Sso**, the **SSO** group holds the values taken from the application registration in the identity provider.

| Setting | What to enter |
|---------|---------------|
| **Display name** | The text on the login button, which reads **Sign in with** followed by this name, for example `Corporate SSO`. Up to 128 characters. |
| **Authority URL (IdP issuer)** | Required. The issuer URL from the identity provider's metadata, as an absolute `http` or `https` URL. This is the issuer, not the address of the provider's login page. |
| **Client ID** | Required. The application (client) identifier from the identity provider's app registration. |
| **Client secret** | The confidential client secret from the app registration. Leave it empty only when the identity provider allows public clients without a secret. |
| **Redirect URIs (ACS URL)** | A comma-separated allow list of Profinity callback addresses. It should include the address registered in the identity provider. |
| **End session endpoint (IdP logout URL)** | The identity provider's logout URL, used to end the identity provider session when the user signs out. When empty, Profinity discovers it from the authority metadata. |
| **Post-logout redirect URI (SP return URL)** | The Profinity address the identity provider returns the user to after logout. When empty, the user returns to the login page. |
| **Group claim name** | The name of the claim that carries group or role membership from the identity provider. The default is `groups`. |

If the identity provider requires a secret and **Client secret** is empty, sign-in fails on the login page with "SSO login failed: TokenExchangeFailed".

The identity provider must accept the Profinity callback address, `https://<your-host>/api/v2/Auth/External/Callback`.
Replace `<your-host>` with the address users type to reach Profinity.
Register that address as a redirect uniform resource identifier (URI) in the identity provider, and enter the same address in **Redirect URIs (ACS URL)**.
Some products call a redirect URI the Assertion Consumer Service (ACS) URL.
The app registration must allow the `openid`, `profile` and `email` scopes, which Profinity requests.
Profinity builds the callback address from the address the user used to reach the sign-in page.
A site served over HTTPS registers an `https` address, as described in [Profinity Web](../Profinity_Web.md).

!!! warning "Saving restarts Profinity"
    Saving the **Security** tab restarts Profinity and interrupts active sessions, as described in [System Configuration](../index.md).
    Plan the cutover to **Sso** for a maintenance window.
    Profinity does not save **Sso** as the sign-in method while **Authority URL (IdP issuer)** is empty.
    It rejects the save with the message "SSO must be enabled with a valid authority URL when sign-in method is SSO."

## What users see at sign-in

When **Sign-in method** is **Local**, the login page shows the username and password fields.
When it is **Sso** and the provider is configured, the login page shows a **Sign in with** button carrying the **Display name**, and no password form is shown.

If the sign-in does not complete, the user returns to the login page with an error and no session is created.
The usual causes are:

- An **Authority URL (IdP issuer)** that is the login page address instead of the issuer.
- A callback address that is not registered with the identity provider.
- A user who has no matching external identity, as described in [Linking SSO users to Profinity accounts](#linking-sso-users-to-profinity-accounts).

## Linking SSO users to Profinity accounts

Profinity matches an identity provider user to a Profinity account through an external identity link on the account.
Each person needs an account before their first SSO sign-in.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Click the user, or create the user as described in [Managing users](../../Users_and_Access/Manage_Users.md).
3. On the **User Actions** tab, in **External identities (SSO)**, add a link.
4. Enter `default` as the **Provider ID**. This is the identifier Profinity gives its single identity provider.
5. Enter the identity provider's unique identifier for the person (the OIDC `sub` claim) as the **Subject ID**.
6. Optional: enter the person's email address as **Email**.
7. Save.

To check, ask the person to sign in with the **Sign in with** button.
A person whose sign-in succeeds at the identity provider but who has no link, or whose Profinity account is disabled, returns to the login page with an error.
Profinity records the failed sign-in in the security audit events.
Service accounts are not linked to identity providers and keep using their tokens, as described in [Service accounts](../../Users_and_Access/Service_Accounts.md).

## Recovering from a misconfigured provider

A site cannot mix **Local** and **Sso**, so a misconfigured or unreachable identity provider prevents every user from signing in.
Confirm the callback address and the issuer with a test account before you rely on **Sso**.

If Profinity starts with **Sso** selected and no **Authority URL (IdP issuer)**, it reverts to **Local** sign-in so that the site is not locked out.
When the authority is set but wrong, set the **Sign-in method** back to **Local** in the configuration file:

1. Stop Profinity if it is running.
2. Open the `config.yaml` file in the `config` folder of the [Artefacts directory](../../../Installation/Artifacts_Directory.md).
3. Under the `securityPolicy` section, change `authenticationMode` to `Local`.
4. Save the file and restart Profinity.
5. Sign in as an administrator with a local password.

The sign-in page now shows the username and password fields.

## Multi-factor authentication and SCIM

With **Sso** selected, multi-factor authentication is enforced by the identity provider and Profinity's local [two-factor policy](./Two_Factor_Authentication.md) does not apply.
Automated user provisioning from the identity provider is described in [SCIM and SIEM](./SCIM_and_SIEM.md).

## Related pages

Refer to [Roles and permissions](../../Users_and_Access/Roles_and_Permissions.md) and to the [Profinity 2.3 release notes](../../../Release_Notes/2.3.1.md) for the 2.3 security changes.
