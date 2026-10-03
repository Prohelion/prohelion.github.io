---
title: Settings Registry
description: "Centralised system settings in Config.yaml with structured sections for security, app settings, and server discovery."
---

# Settings registry and configuration files

Profinity 2.3 centralises many system settings in **Config.yaml** through the **settings registry**. Structured sections support validation, admin UI tabs, and selective realtime reload.

**Profile.yaml** retains profile-scoped fields that are not promoted to the global registry.

## Two-file security model

| File | Holds |
|------|-------|
| **Config.yaml** | Security **policy** (sign-in method, password policy, 2FA policy, session policy), Security **Config** (OIDC, SCIM, SIEM), application settings, component catalog, server discovery |
| **Security.yaml** | Users, **roles**, 2FA secrets, external identity links (`Version: "2.3"`) |

Saving **Config.yaml** from System Configuration **restarts the engine**. Most **Security.yaml** and profile YAML changes do **not** require restart.

## Config.yaml sections (writer reference)

| Tab / section | Keys operators should know |
|---------------|------------------------------|
| **Security Policy** | `AuthenticationMode`, `EnforceTwoFactorForLocalUsers`, `PasswordPolicy`, `SessionPolicy`, `TwoFactorPolicy` |
| **Security Config** | `OidcSso`, `ScimProvisioning`, `SiemExport` |
| **App Settings → Component catalog** | `DisabledComponents` |
| **Server Discovery** | Heartbeat name, port (49025), interval |

## Profile.yaml

Profile-only settings remain on the profile legacy path — for example profile menu layout and profile-scoped feature flags not yet in the registry.

## Realtime reload

Some Config.yaml sections reload without a full restart where the engine supports live reload; security integration blocks still require restart when documented in the admin UI warning.

This reload happens the next time the relevant settings dialog is opened, or when an operator triggers an explicit reload action. It is not a live push: a settings dialog already open when the registry changes keeps the snapshot it loaded at open (or last reload) and does not automatically refresh while it remains open.

Engineering reference: [settings-registry-architecture.md](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/System/settings-registry-architecture.md).

## Related documentation

- [System configuration](../../Administration/System_Config.md)
- [SSO and sign-in method](../../Administration/Security/SSO_and_Sign_In.md)
- [Component catalog](../Components/Component_Catalog.md)
- [Artifacts directory](../../Installation/Artifacts_Directory.md)
