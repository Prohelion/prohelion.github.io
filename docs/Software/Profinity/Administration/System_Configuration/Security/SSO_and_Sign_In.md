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

Choosing the method needs the **System administration** permission.
**Sso** also needs the **Enterprise Security** licensed feature, which only the Enterprise edition includes, and without it Profinity keeps **Local** sign-in.
Refer to [Licensing](../../../Licensing.md).

Choosing **Sso** replaces local sign-in for every user, so prepare before you change it:

- Check that an administrator account with a local password exists. It is the way back, as described in [Recovering from a misconfigured provider](#recovering-from-a-misconfigured-provider).
- Register Profinity with the identity provider, and have its values for the settings in [Configuring the identity provider](#configuring-the-identity-provider).
- Choose a maintenance window, because saving the **Security** tab restarts Profinity and interrupts active sessions.

To change the method:

1. Select **ADMIN** in the side menu, then **System Configuration**.
2. Open the **Security** tab.
3. Set **Sign-in method** to **Local** or **Sso**.
4. For **Sso**, fill in the **SSO** group, as described in [Configuring the identity provider](#configuring-the-identity-provider).
5. Select **SAVE**. Profinity restarts.

After a change to **Sso**, link each person's account as described in [Linking SSO users to Profinity accounts](#linking-sso-users-to-profinity-accounts), then check that a linked person can sign in with the **Sign in with** button.
Profinity keeps `config.yaml.bak`, a copy of the configuration as it was before the save, in the `config` folder of the [artefacts directory](../../../Installation/Artifacts_Directory.md).

The security policy is stored in `config.yaml` under `securityPolicy`.
The **Sign-in method** setting is stored as `authenticationMode` in that section, with the values `Local` or `Sso`.

With **Local** selected, the tab also offers **Enforce two-factor for local users** and **Allow security-key sign-in**.
Refer to [Two-factor authentication](./Two_Factor_Authentication/index.md) for both.
With **Sso** selected, the **SSO** and **SCIM Provisioning** groups appear.

## Configuring the identity provider

When **Sign-in method** is **Sso**, the **SSO** group holds the values taken from the application registration in the identity provider.

| Setting | Type | Default | Effect |
|---------|------|---------|--------|
| **Display name** | Text, up to 128 characters | Empty | The text on the login button, which reads **Sign in with** followed by this name, for example `Corporate SSO`. When the name is empty, the button reads only **Sign in with**. |
| **Authority URL (IdP issuer)** | URL (`http` or `https`) | Empty | Required. The issuer URL from the identity provider's metadata. This is the issuer, not the address of the provider's login page. |
| **Client ID** | Text | Empty | Required. The application (client) identifier from the identity provider's app registration. |
| **Client secret** | Text, masked | Empty | The confidential client secret from the app registration. Leave it empty only when the identity provider allows public clients without a secret. |
| **Redirect URIs (ACS URL)** | Comma-separated URLs | Empty | Required for sign-in. A comma-separated allow list of Profinity callback addresses. It must include the callback address, or sign-in stops with `InvalidRedirectUri` before the identity provider is contacted. |
| **End session endpoint (IdP logout URL)** | URL (`http` or `https`) | Empty | The identity provider's logout URL, used to end the identity provider session when the user signs out. When empty, Profinity discovers it from the authority metadata. |
| **Post-logout redirect URI (SP return URL)** | URL (`http` or `https`) | Empty | The Profinity address the identity provider returns the user to after logout. When empty, the user returns to the login page. |
| **Group claim name** | Text | `groups` | The name of the claim that carries group or role membership from the identity provider. |

The identity provider must accept the Profinity callback address, `https://<your-host>/api/v2/Auth/External/Callback`.
Replace `<your-host>` with the address users type to reach Profinity.
Register that address as a redirect uniform resource identifier (URI) in the identity provider, and enter the same address in **Redirect URIs (ACS URL)**.
Some products call a redirect URI the Assertion Consumer Service (ACS) URL.

The app registration must allow the `openid`, `profile` and `email` scopes, which Profinity requests.

Profinity builds the callback address from the address the user used to reach the sign-in page.
A site served over HTTPS registers an `https` address, as described in [Profinity Web](../Profinity_Web.md).

Profinity refuses to save **Sso** while **Authority URL (IdP issuer)** is empty, with the message "SSO must be enabled with a valid authority URL when sign-in method is SSO."

## What users see at sign-in

When **Sign-in method** is **Local**, the login page shows the username and password fields.
When it is **Sso** and the provider is configured, the login page shows a **Sign in with** button carrying the **Display name**, and no password form is shown.

If sign-in does not complete, no session is created, and the login page shows one of these messages.

| What you see | Cause | What to do |
|---|---|---|
| `SSO login failed: TokenExchangeFailed` | The identity provider requires a secret and **Client secret** is empty. | Enter the **Client secret** from the app registration. |
| `SSO login failed: InvalidRedirectUri` | The callback address is not in **Redirect URIs (ACS URL)**. | Add `https://<your-host>/api/v2/Auth/External/Callback` to **Redirect URIs (ACS URL)**. |
| `SSO login failed: MetadataUnavailable` | The **Authority URL (IdP issuer)** is the login page address, or the identity provider cannot be reached. | Enter the issuer URL from the identity provider's metadata. |
| An error page from the identity provider | The callback address is not registered with the identity provider. | Register the callback address in the identity provider. |
| `SSO login failed: ExternalUserNotLinked` | The user has no external identity link, or their Profinity account is disabled. | Link the user as described in [Linking SSO users to Profinity accounts](#linking-sso-users-to-profinity-accounts), or enable the account. |

## Linking SSO users to Profinity accounts

Profinity matches an identity provider user to a Profinity account through an external identity link on the account.
Each person needs an account before their first SSO sign-in.
Linking needs the **Security administration** permission.
The **External identities (SSO)** field is on the **User Actions** tab of each account while **Sign-in method** is **Sso**, except on service accounts, which keep signing in with their tokens.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select the user, or create the user as described in [Managing users](../../Users_and_Access/Manage_Users.md).
3. Open the **User Actions** tab and find **External identities (SSO)**.
4. Enter `default` as the **Provider ID**. This is the identifier Profinity gives its single identity provider.
5. In **Subject ID**, enter the identity provider's unique identifier for the person, which the provider sends as the `sub` claim.
6. Optional: enter the person's email address as **Email**.
7. Select **LINK IDENTITY**.

To check, ask the person to sign in with the **Sign in with** button.
A person whose sign-in succeeds at the identity provider but who has no link, or whose Profinity account is disabled, returns to the login page with an error.
Profinity records a failed sign-in in the Profinity log when the person has no external identity link or their account is disabled.
Administrators read it from the **Logs** pill on the **ADMIN** page, and when security information and event management (SIEM) export is on, the same events go to the SIEM collector, as described in [SCIM and SIEM](./SCIM_and_SIEM.md).

## Recovering from a misconfigured provider

A site cannot mix **Local** and **Sso**, so a misconfigured or unreachable identity provider stops every user signing in.

If Profinity starts with **Sso** selected and no **Authority URL (IdP issuer)**, it reverts to **Local** sign-in so that users can still sign in. The **Security** tab refuses to save **Sso** without an authority. A hand-edited `config.yaml` that selects **Sso** without one takes this start-up path.
When the authority is set but wrong, set the **Sign-in method** back to **Local** in the configuration file, by changing `authenticationMode` under `securityPolicy` in `config.yaml`.

To sign in afterwards you need an administrator account with a local password, because Profinity accepts password sign-in only while the method is **Local**.
Stop and start Profinity the way you normally run it: with the commands in [Run Profinity as a service](../../../Installation/Run_as_a_Service/index.md) for a service, or by closing and reopening the desktop application.

1. Stop Profinity if it is running.
2. Open the `config` folder of the [Artefacts directory](../../../Installation/Artifacts_Directory.md).
3. Copy the `config.yaml` file to a safe location outside that folder.
4. Open the `config.yaml` file.
5. Under the `securityPolicy` section, change `authenticationMode` to `Local`.
6. Save the file and restart Profinity.
7. Sign in as an administrator with a local password.

If Profinity fails to start after the edit, replace `config.yaml` with the copy from step 3 and restart Profinity.
Profinity also keeps `config.yaml.bak` in the same folder, a copy of the file as it was before the last save made by Profinity.

The sign-in page now shows the username and password fields.

With **Sso** selected, the identity provider enforces multi-factor authentication, and Profinity's [two-factor policy](./Two_Factor_Authentication/index.md) applies to **Local** sign-in only.
To create and deactivate users from the identity provider, refer to [SCIM and SIEM](./SCIM_and_SIEM.md), and for the permissions that roles grant, refer to [Roles and permissions](../../Users_and_Access/Roles_and_Permissions.md).
