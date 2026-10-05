---
title: Session Firmware Credentials
description: "Store firmware unlock keys and passcodes in the user session instead of persisting them on disk."
---

# Session firmware credentials

Profinity 2.3 stores **firmware unlock secrets in the user session**, not on disk. Gen2 Battery Management System (BMS) **admin configuration keys** and Rinstrum scale **setup passcodes** are entered in the component **Settings** dialog after login and are **cleared on logout**.

This replaces persisting sensitive passcodes in component YAML.

## Why session-based credentials

- It prevents long-term storage of high-privilege firmware keys in profile files or backups.
- It aligns unlock authority with the signed-in operator.
- It supports audit and rotation without editing component YAML.

## Where to unlock

1. Open the component (Gen2 BMS or Rinstrum scale) in the active profile.
2. Open **Settings**.
3. On the firmware-related tab, locate the **session credential** field at the top.
4. Enter the credential and **Apply** to unlock firmware actions for this session.

Required permission: **`ComponentModify`** (and component access as configured).

## Device families

| Family | Credential | Without session unlock |
|--------|------------|------------------------|
| **Gen2 BMS** | Firmware Configuration Key | User key `0x1234` only; admin key `0x789F` requires unlock (the configuration parameters that require the admin key are marked with the Admin permission in the [Firmware V1.2 Configuration Parameters](../../../Battery_Management_Systems/Prohelion_BMS_D1000_Gen2/Firmware/V1.2/Configuration_Parameters.md)) |
| **Rinstrum scale** | Safe Setup Passcode, Full Setup Passcode | No setup passcodes until session is set |

## API

Integrators can set session credentials programmatically:

| Method | Route |
|--------|-------|
| POST | `/api/v2/ActiveProfile/Component/{component}/SessionCredential` |
| DELETE | `/api/v2/ActiveProfile/Component/{component}/SessionCredential/{credentialId}` |

The POST body takes the following shape:

```json
{
  "credentialId": "string",
  "value": "string",
  "timeoutMinutes": 30
}
```

`timeoutMinutes` is optional. Secrets are **not** accepted through an ordinary component settings `PATCH` request.

## Session lifetime

- Credentials remain until **logout** or session expiry.
- Timeout policies follow site **Session policy** in config.yaml.
- Plan operator workflows so firmware tasks complete within one signed-in session.

## Pitfalls

- Admin keys can no longer be saved in component YAML — that pattern is removed.
- Backup files from 2.2.x may contain old persisted keys; review and remove after upgrade.

## Related documentation

- [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
