---
title: SCIM and SIEM
description: "Enable SCIM user provisioning from identity providers and configure SIEM export of security audit events, including the event line format."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# SCIM and SIEM

System for Cross-domain Identity Management (SCIM) provisioning lets an identity provider create and deactivate Profinity users automatically.
Security Information and Event Management (SIEM) export forwards Profinity's security audit events to a collector.
You set both on the **Security** tab of [System Configuration](../index.md), which needs the **System administration** permission.
Saving the tab restarts Profinity and interrupts active sessions.

## SCIM provisioning

SCIM provisioning needs the **Enterprise Security** licensed feature, which only the Enterprise edition includes, as described in [Licensing](../../../Licensing.md).
The **SCIM provisioning** group appears while **Sign-in method** is **Sso**, because provisioned users sign in through the single sign-on (SSO) identity provider set up in [SSO and sign-in method](./SSO_and_Sign_In.md).

To turn on provisioning:

1. Turn on **Enable SCIM user provisioning**.
2. In **SCIM bearer token**, enter a long, random value of your choice. Profinity accepts any length and format, and the field is required while provisioning is on.
3. Optional: enter **Default assigned roles**.
4. Select **SAVE**. Profinity restarts.
5. Enter the same token in the identity provider's SCIM settings, with the address in [Endpoint and supported operations](#endpoint-and-supported-operations).

To check the connection, run this command, replacing `<your-host>` with the Profinity address and `<token>` with the token:

```bash
curl -H "Authorization: Bearer <token>" https://<your-host>/scim/v2/ServiceProviderConfig
```

A valid token returns status `200` and the service provider settings as `application/scim+json`.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| **Enable SCIM user provisioning** | On or off | Off | Allows the identity provider to create and deactivate users through the SCIM 2.0 interface. |
| **SCIM bearer token** | Secret | None | The long-lived secret that the identity provider sends as `Authorization: Bearer`. Treat it like a password. To change it, follow [Replace the SCIM bearer token](#replace-the-scim-bearer-token). |
| **Default assigned roles** | Text | Empty | A comma-separated list of Profinity roles given to every user that SCIM creates. Names that match an existing role are assigned, and any other name is ignored. An empty list creates users with no role. |

### Replace the SCIM bearer token

Requests with the old token return `401` from the moment you save the new one, so make both changes in one sitting.

1. Keep a copy of the current token in a password manager, so that you can go back to it. Profinity does not show the saved token again, so keep the copy before you enter the new value.
2. Enter the new value in **SCIM bearer token**, then select **SAVE**.
3. Enter the same value in the identity provider's SCIM settings.
4. Check the connection with the command in [SCIM provisioning](#scim-provisioning).

To go back, enter the old token in **SCIM bearer token** and select **SAVE**.

### Troubleshooting SCIM

| What you see | Cause | What to do |
|---|---|---|
| "SCIM bearer token is required when SCIM provisioning is enabled." when you save | **SCIM bearer token** is empty. | Enter a token. |
| "SSO must be configured when SCIM provisioning is enabled." when you save | The **SSO** group has no **Authority URL (IdP issuer)**. | Set up SSO first, as described in [Configuring the identity provider](./SSO_and_Sign_In.md#configuring-the-identity-provider). |
| The check returns `401` | The token in the request differs from **SCIM bearer token**. | Send the token exactly as entered, or enter a new one in both places. |
| The check returns `404` | **Enable SCIM user provisioning** is off, or the licence has no **Enterprise Security** feature. | Turn on **Enable SCIM user provisioning**, and check the edition in [Licensing](../../../Licensing.md). |

### Endpoint and supported operations

The identity provider calls the following address, authenticating with the bearer token:

```text
https://<your-host>/scim/v2/Users
```

Replace `<your-host>` with the address users type to reach Profinity.

Profinity supports three operations:

- Creating a user (`POST`).
- Listing users and reading one user by ID (`GET`).
- Updating a user (`PATCH`).

It publishes its capabilities at `/scim/v2/ServiceProviderConfig`.
Deprovisioning deactivates the user in Profinity (the identity provider sends `active: false`) and does not delete the account.

Replacing a user with `PUT`, deleting a user, and SCIM groups are not supported, so group membership in the identity provider leaves Profinity roles unchanged.
**Default assigned roles** is the only role assignment that SCIM makes.
Attribute mapping is configured in the identity provider, so follow its SCIM setup guide.

Choose **Default assigned roles** with care, because every provisioned user receives them.
Avoid assigning **Administrators**.
Role permissions are listed in [Roles and permissions](../../Users_and_Access/Roles_and_Permissions.md).

## SIEM export

When **Enable SIEM export** is on, Profinity forwards its security audit events, such as sign-ins, failed sign-ins, and licence changes, to the collector configured in the **SIEM export** group.
The other settings appear only after you switch on **Enable SIEM export**. Set **SIEM host** and a real **SIEM port** before you rely on export. Profinity does not refuse a save with port 0. With a host filled in, it sends to port 0, and with a blank host it sends nothing.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| **Enable SIEM export** | On or off | Off | Forwards security audit events to the SIEM collector. |
| **SIEM host** | Text | Empty | The host name or Internet Protocol (IP) address of the SIEM collector. |
| **SIEM port** | Whole number | 0 | The collector port, from 0 to 65535. Enter the port the collector listens on, because Profinity sends to port 0 when export is on and you leave the default. |
| **Protocol** | Choice | UDP | The transport used to send events, either `UDP` (User Datagram Protocol) or `TCP` (Transmission Control Protocol). |
| **Minimum log level** | Choice | Info | Only audit events at this level or higher are exported. The options are `Trace`, `Debug`, `Info`, `Warn`, `Error` and `Fatal`. |
| **Format** | Choice | Syslog | The message format. Syslog is the only option, and each event is the plain text line described in [Event format](#event-format), not a Request for Comments (RFC) syslog message. |

Profinity sends each event as the plain text line described in [Event format](#event-format), without a syslog priority or header.
Set the collector to accept a plain line over UDP or TCP.

The firewall between the Profinity host and the collector must allow outbound traffic on the chosen protocol and port.
Raising **Minimum log level** reduces the volume sent, which matters when the level is set low enough to forward every event.

## Event format

Each event is one line of text.
It starts with `SECURITY|` and the event name, followed by `name=value` fields separated by `|`.
The fields appear in this order when they apply: `username`, `actor`, `target`, `ip`, `authMode`, `reason`, `from`, `to`, and `backup`, then one `change.<field>` entry for each changed field.

Profinity replaces a `|`, carriage return, or line feed inside a value with `_`.
It never writes passwords or tokens.
For example, a failed local sign-in looks like this:

```text
SECURITY|LoginFailure|username=admin|ip=192.168.1.10|authMode=Local|reason=BadPassword
```

The event names are:

| Area | Events |
|---|---|
| Sign-in and sessions | `LoginSuccess`, `LoginFailure`, `ExternalLoginSuccess`, `ExternalLoginFailure`, `TokenRefresh`, `TokenRejected`, `SessionRevoked`, `SessionRevokeAll` |
| Users and roles | `UserCreated`, `UserUpdated`, `UserDeleted`, `PasswordChanged`, `PasswordResetRequestedByAdmin`, `GroupCreated`, `GroupUpdated`, `GroupDeleted`, `ServiceAccountTokenViewed` |
| Two-factor authentication | `TwoFactorEnabled`, `TwoFactorDisabled`, `TwoFactorVerified`, `TwoFactorFailed`, `TwoFactorResetByAdmin`, `TwoFactorEnforcementCarriedForward`, `RecoveryCodesPendingGenerated`, `RecoveryCodesPendingConfirmed`, `RecoveryCodesPendingDiscarded` |
| SCIM | `ScimUserProvisioned`, `ScimUserDeactivated` |
| Licence | `LicenseApplied`, `LicenseRejected`, `LicenseExpired`, `LicenseModifiedExternally`, `LicenseClockRollbackDetected`, `LicenseInstanceIdRegenerated` |
| Firmware | `FirmwareManifestChecked`, `FirmwareImageDownloaded`, `FirmwareUpgradeStarted`, `FirmwareUpgradeCompleted`, `FirmwareUpgradeFailed` |
| Upgrade | `MigrationCompleted` |

## Securing the integration

The SCIM bearer token is stored encrypted in `config.yaml`, in the `config` folder of the [Artefacts directory](../../../Installation/Artifacts_Directory.md). Restrict access to that file, to its `config.yaml.bak` copy, and to any backup of the folder. Profinity writes `config.yaml.bak` itself when it saves `config.yaml` over a valid file, copying the file as it was before the save.
Serve Profinity over HTTPS, as described in [Profinity Web](../Profinity_Web.md), so that sign-in and provisioning traffic is encrypted on the network.
