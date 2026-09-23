---
title: Session Firmware Credentials
---

# Session firmware credentials

Profinity 2.3 stores **firmware unlock secrets in the user session**, not on disk. Gen2 BMS **admin configuration keys** and Rinstrum scale **setup passcodes** are entered in the component **Settings** dialog after login and are **cleared on logout**.

This replaces persisting sensitive passcodes in component YAML.

## Why session-based credentials

- Prevents long-term storage of high-privilege firmware keys in profile files or backups.
- Aligns unlock authority with the signed-in operator.
- Supports audit and rotation without editing component YAML.

## Where to unlock

1. Open the component (Gen2 BMS or Rinstrum scale) in the active profile.
2. Open **Settings**.
3. On the firmware-related tab, locate the **session credential** field at the top.
4. Enter the credential and **Apply** to unlock firmware actions for this session.

<figure markdown>
![Session credential field before unlock](../../../assets/images/2.3/2.3-session-credential-locked.png)
<figcaption>Session credential field before unlock (screenshot placeholder — provide SS-31)</figcaption>
</figure>

<figure markdown>
![Session credential field after successful unlock](../../../assets/images/2.3/2.3-session-credential-unlocked.png)
<figcaption>Firmware settings after unlock — redact passcode values (provide SS-32)</figcaption>
</figure>

Required permission: **`ComponentModify`** (and component access as configured).

## Device families

| Family | Credential | Without session unlock |
|--------|------------|------------------------|
| **Gen2 BMS** | Firmware Configuration Key | User key `0x1234` only; admin key `0x789F` requires unlock |
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

`timeoutMinutes` is optional.

Secrets are **not** accepted via ordinary component settings PATCH.

## Session lifetime

- Credentials remain until **logout** or session expiry.
- Timeout policies follow site **Session policy** in Config.yaml.
- Plan operator workflows so firmware tasks complete within one signed-in session.

## Pitfalls

- Do not document saving admin keys in component YAML — that pattern is removed.
- Backup files from 2.2.x may contain old persisted keys; review and remove after upgrade.
- Engineering may need to provide a Gen2 or Rinstrum component on a demo profile for screenshots.

## Related documentation

- [RBAC and permissions](./Security/RBAC_Permissions.md)
- [Release notes 2.3.10](../Release_Notes/2.3.10.md)
- Engineering reference: [A12 Session Firmware Credentials](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A12-Session-Firmware-Credentials.md)
