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

You need the **System administration** permission to choose the method. To choose **Sso**, you also need the **Enterprise Security** licensed feature, included in the **Enterprise** edition only.

Choosing **Sso** replaces local sign-in for every user.
Before you choose it, confirm the callback address and the issuer with a test account, as described in [Configuring the identity provider](#configuring-the-identity-provider).

Saving the **Security** tab restarts Profinity and interrupts active sessions.
Profinity keeps `config.yaml.bak`, a copy of the configuration as it was before the save, in the `config` folder of the [Artefacts directory](../../../Installation/Artifacts_Directory.md).
If sign-in fails after the change, follow [Recovering from a misconfigured provider](#recovering-from-a-misconfigured-provider).

Before you choose **Sso**, check that a local administrator account with a password exists. It is the way back if sign-in through the identity provider fails.

1. Select **ADMIN** in the side menu, then **System Configuration**.
2. Open the **Security** tab.
3. Set **Sign-in method** to **Local** or **Sso**.
4. Select **SAVE**.

The security policy is stored in `config.yaml` under `securityPolicy`.
The **Sign-in method** setting is stored as `authenticationMode` in that section, with the values `Local` or `Sso`.

With **Local** selected, the tab also offers **Enforce two-factor for local users** and **Allow security-key sign-in**.
Refer to [Two-factor authentication](./Two_Factor_Authentication/index.md) for both.
With **Sso** selected, the **SSO** and **SCIM Provisioning** groups appear.

!!! note "Licence required"
    The **Sso** choice takes effect only with the **Enterprise Security** licensed feature; otherwise Profinity keeps **Local** sign-in.
    Refer to [Licensing](../../../Licensing.md) for what each edition includes.

## Configuring the identity provider

When **Sign-in method** is **Sso**, the **SSO** group holds the values taken from the application registration in the identity provider.

| Setting | Type | Default | Effect |
|---------|------|---------|--------|
| **Display name** | Text, up to 128 characters | Empty | The text on the login button, which reads **Sign in with** followed by this name, for example `Corporate SSO`. When the name is empty, the button reads only **Sign in with**. |
| **Authority URL (IdP issuer)** | URL (`http` or `https`) | Empty | Required. The issuer URL from the identity provider's metadata. This is the issuer, not the address of the provider's login page. |
| **Client ID** | Text | Empty | Required. The application (client) identifier from the identity provider's app registration. |
| **Client secret** | Text, masked | Empty | The confidential client secret from the app registration. Leave it empty only when the identity provider allows public clients without a secret. |
| **Redirect URIs (ACS URL)** | Comma-separated URLs | Empty | A comma-separated allow list of Profinity callback addresses. It must include the callback address, or sign-in stops with `InvalidRedirectUri` before the identity provider is contacted. |
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

!!! warning "Saving restarts Profinity"
    Saving the **Security** tab restarts Profinity and interrupts active sessions, as described in [System Configuration](../index.md).
    Plan the cutover to **Sso** for a maintenance window.
    Profinity does not save **Sso** as the sign-in method while **Authority URL (IdP issuer)** is empty.
    It rejects the save with the message "SSO must be enabled with a valid authority URL when sign-in method is SSO."

## What users see at sign-in

When **Sign-in method** is **Local**, the login page shows the username and password fields.
When it is **Sso** and the provider is configured, the login page shows a **Sign in with** button carrying the **Display name**, and no password form is shown.

If sign-in does not complete, no session is created. Find the message or symptom in the table to see its cause and fix.

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
You need the **Security administration** permission to link an identity. The **External identities (SSO)** field appears on the **User Actions** tab only when **Sign-in method** is **Sso**, and not for service accounts.

1. Select **ADMIN** in the side menu, then **Users & Groups**.
2. Select the user, or create the user as described in [Managing users](../../Users_and_Access/Manage_Users.md).
3. On the **User Actions** tab, in **External identities (SSO)**, fill in the fields in steps 4 to 6.
4. Enter `default` as the **Provider ID**. This is the identifier Profinity gives its single identity provider.
5. Enter the identity provider's unique identifier for the person (the OIDC `sub` claim) as the **Subject ID**.
6. Optional: enter the person's email address as **Email**.
7. Select **LINK IDENTITY**.

To check, ask the person to sign in with the **Sign in with** button.
A person whose sign-in succeeds at the identity provider but who has no link, or whose Profinity account is disabled, returns to the login page with an error.
Profinity records a failed sign-in in the Profinity log when the person has no external identity link or their account is disabled.
Administrators view it from the **Logs** pill on the **ADMIN** page, and when SIEM export is on the same events go to your SIEM.
Service accounts are not linked to identity providers and keep using their tokens, as described in [Service accounts](../../Users_and_Access/Service_Accounts.md).

## Recovering from a misconfigured provider

A site cannot mix **Local** and **Sso**, so a misconfigured or unreachable identity provider prevents every user from signing in.
Confirm the callback address and the issuer with a test account before you rely on **Sso**.

If Profinity starts with **Sso** selected and no **Authority URL (IdP issuer)**, it reverts to **Local** sign-in so that users can still sign in. The **Security** tab refuses to save **Sso** without an authority. A hand-edited `config.yaml` that selects **Sso** without one takes this start-up path.
When the authority is set but wrong, set the **Sign-in method** back to **Local** in the configuration file, by changing `authenticationMode` under `securityPolicy` in `config.yaml`.

You need an administrator account with a local password to sign in afterwards, because Profinity accepts password sign-in only when the method is **Local**.
Check that this account exists before you choose **Sso**.
Then follow these steps.
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

## Multi-factor authentication and SCIM

With **Sso** selected, multi-factor authentication is enforced by the identity provider and Profinity's local [two-factor policy](./Two_Factor_Authentication/index.md) does not apply.
Automated user provisioning from the identity provider is described in [SCIM and SIEM](./SCIM_and_SIEM.md).

## Related pages

Refer to [Roles and permissions](../../Users_and_Access/Roles_and_Permissions.md) and to the [Profinity 2.3 release notes](../../../Release_Notes/2.3.1.md) for the 2.3 security changes.
