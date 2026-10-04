---
title: Settings Registry
description: "Centralised system settings in config.yaml with structured sections for security, app settings, and server discovery."
---

# Settings registry and configuration files

Profinity 2.3 centralises many system settings in **config.yaml** through the **settings registry**. Structured sections support validation, admin UI tabs, and selective realtime reload.

**Profile.yaml** retains profile-scoped fields that are not promoted to the global registry.

## Two-file security model

| File | Holds |
|------|-------|
| **config.yaml** | Security **policy** (sign-in method, password policy, 2FA policy, session policy), Security **Config** (OIDC, SCIM, SIEM), application settings, component catalog, server discovery |
| **security.yaml** | Users, **roles**, 2FA secrets, external identity links (`Version: "2.3"`) |

Saving the **System Configuration** settings form restarts the engine, and a valid external edit to **config.yaml** on disk also restarts it once the engine has validated the file; an invalid file is ignored and the engine keeps running with its current configuration. Internal saves made by the engine itself, such as the component catalog toggles, user changes and profile changes, write **config.yaml** or **security.yaml** without a restart.

## config.yaml sections

| Tab / section | Keys operators should know |
|---------------|------------------------------|
| **Security Policy** | `AuthenticationMode`, `EnforceTwoFactorForLocalUsers`, `PasswordPolicy`, `SessionPolicy`, `TwoFactorPolicy` |
| **Security Config** | `OidcSso`, `ScimProvisioning`, `SiemExport` |
| **App Settings → Component catalog** | `DisabledComponents` |
| **Server Discovery** | Heartbeat name, port (49025), interval |

## Profile.yaml

Profile-only settings remain on the profile legacy path — for example profile menu layout and profile-scoped feature flags not yet in the registry.

## Realtime reload

The settings registry does not hot-reload config.yaml sections: a change made through the System Configuration form or by editing the file takes effect through the engine restart described above, while the internal saves listed above apply to the running engine without one.

A reload is picked up the next time the relevant settings dialog is opened, or when an operator triggers an explicit reload action. It is not a live push: a settings dialog that is already open when the registry changes keeps the snapshot it loaded at open (or at its last reload) and does not refresh while it remains open.

## Related documentation

- [System configuration](../../Administration/System_Config.md)
- [SSO and sign-in method](../../Administration/Security/SSO_and_Sign_In.md)
- [Component catalog](../Components/Component_Catalog.md)
- [Artifacts directory](../../Installation/Artifacts_Directory.md)
