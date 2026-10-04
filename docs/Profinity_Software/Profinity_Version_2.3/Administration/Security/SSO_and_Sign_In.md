---
title: SSO and Sign-In Method
description: "Configure OpenID Connect single sign-on as the site-wide sign-in method for all Profinity users."
---

# SSO and Sign-In Method

Profinity 2.3 uses a **site-wide sign-in method** configured in **config.yaml**. Every user on the site signs in the same way: either **Local** (username and password) or **Sso** (OpenID Connect, OIDC, with an identity provider, IdP).

Hybrid local and SSO on the same site is **not** supported. Per-user authentication mode from earlier releases is removed.

## Choose sign-in method

1. Select **ADMIN** in the side menu, then **System Configuration**, and open **Security Policy**.
2. Set **Sign-in method** to **Local** or **Sso**.
3. When using Local, optionally enable **Enforce two-factor for local users** (see [Two-factor authentication](./Two_Factor_Authentication.md)).

<figure markdown>
![Sign-in method set to Local with enforce two-factor toggle visible](../../../../assets/images/2.3/2.3-config-sign-in-method-local.png)
<figcaption>Sign-in method Local (screenshot placeholder — provide SS-07)</figcaption>
</figure>

<figure markdown>
![Sign-in method set to Sso with Security Config SSO section visible](../../../../assets/images/2.3/2.3-config-sign-in-method-sso.png)
<figcaption>Sign-in method Sso (screenshot placeholder — provide SS-08)</figcaption>
</figure>

## Configure OIDC SSO

!!! note "Licensing"
    Enabling SSO (`SecurityOidcSso.Enabled`) requires the **EnterpriseSecurity** product feature. Without this licence, the toggle is unavailable.

When sign-in method is **Sso**, configure a single **`OidcSso`** block under **Security Config**:

| Field | Purpose |
|-------|---------|
| **Authority** | OIDC issuer URL |
| **Client ID** | Application client identifier |
| **Client secret** | Confidential client secret (store securely) |
| **Redirect URIs** | Display-only helper — register these URIs in your IdP |
| **End session endpoint** | IdP logout URL, used to end the identity provider session on sign-out |
| **Post-logout redirect URI** | Profinity URL (the service provider side) that the IdP returns the user to after logout |

<figure markdown>
![OIDC SSO settings expanded in Security Config](../../../../assets/images/2.3/2.3-oidc-sso-settings.png)
<figcaption>OIDC provider settings (redact client secret in screenshots — provide SS-09)</figcaption>
</figure>

!!! warning "Engine restart"
    Saving config.yaml restarts Profinity. Plan SSO cutover during a maintenance window.

## Login experience

### Local sign-in

When **Sign-in method** is **Local**, `/login` shows username and password fields only.

<figure markdown>
![Login page with username and password fields](../../../../assets/images/2.3/2.3-login-local-form.png)
<figcaption>Local login form (screenshot placeholder — provide SS-10)</figcaption>
</figure>

### SSO sign-in

When **Sign-in method** is **Sso** and the provider is configured, `/login` shows **Sign in with {provider}** button(s). No password form is shown.

If SSO is enabled but the provider is misconfigured, the login page may show an empty or error state — verify `OidcSso` fields and IdP registration.

<figure markdown>
![Login page with SSO provider button](../../../../assets/images/2.3/2.3-login-sso-buttons.png)
<figcaption>SSO login button (screenshot placeholder — provide SS-11)</figcaption>
</figure>

## Link SSO users to Profinity accounts

SSO users are matched using **External identity links** on the Profinity user record:

1. Select **ADMIN** in the side menu, then **Users & Groups**, and select or create the user.
2. Add an **External identity link** with provider and subject identifier from your IdP.

<figure markdown>
![External identity links on an SSO user](../../../../assets/images/2.3/2.3-user-external-identity-links.png)
<figcaption>External identity links for SSO user matching (screenshot placeholder — provide SS-12)</figcaption>
</figure>

## MFA and SSO

When sign-in method is **Sso**, multi-factor authentication is enforced by the **identity provider**, not by Profinity's local [two-factor policy](./Two_Factor_Authentication.md).

## SCIM provisioning

SCIM uses the same OIDC site configuration. See [SCIM and SIEM](./SCIM_and_SIEM.md).

## Pitfalls

- Only **one** SSO provider block is supported (not a multi-provider picker).
- Do not store OIDC client secrets in profile YAML — they belong in config.yaml Security Config.
- **`security.yaml`** holds users and identity links; **`config.yaml`** holds SSO policy.

## Related documentation

- [Two-factor authentication](./Two_Factor_Authentication.md)
- [SCIM and SIEM](./SCIM_and_SIEM.md)
- [RBAC and permissions](./RBAC_Permissions.md)
- [Release notes 2.3.10](../../Release_Notes/2.3.10.md)
