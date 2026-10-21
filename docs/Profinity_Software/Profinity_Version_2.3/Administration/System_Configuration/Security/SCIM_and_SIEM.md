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

!!! note "Licence required"
    SCIM provisioning requires the **Enterprise Security** licensed feature, included in the **Enterprise** edition only.
    Without it, **Enable SCIM user provisioning** does not take effect.
    Refer to [Licensing](../../../Licensing.md) for what each edition includes.

The **SCIM Provisioning** group appears only when **Sign-in method** is **Sso**, because provisioned users sign in through the identity provider configured in [SSO and sign-in method](./SSO_and_Sign_In.md).

To enable provisioning:

1. Switch on **Enable SCIM user provisioning**.
2. Enter a **SCIM bearer token**.
3. Optional: enter **Default assigned roles**.
4. Save the tab.

Profinity refuses to save in two cases:

- The token is empty. It shows "SCIM bearer token is required when SCIM provisioning is enabled."
- The SSO group has no **Authority URL (IdP issuer)**. It shows "SSO must be configured when SCIM provisioning is enabled."

| Setting | Description |
|---------|-------------|
| **Enable SCIM user provisioning** | Allows the identity provider to create and deactivate users through the SCIM 2.0 interface. Off by default. |
| **SCIM bearer token** | The long-lived secret the identity provider presents as `Authorization: Bearer`. Treat it like a password. To replace it, enter a new value here, save, and enter the same value in the identity provider. |
| **Default assigned roles** | A comma-separated list of Profinity roles given to every user that SCIM creates. Names that do not match an existing role are ignored. An empty list creates users with no role. |

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

Profinity does not support replacing a user with `PUT`, deleting a user, or SCIM groups.
Group membership in the identity provider therefore does not create or change Profinity roles.
The **Default assigned roles** setting is the only role assignment SCIM provides.
Attribute mapping is configured in the identity provider, so follow its SCIM setup guide.

Choose **Default assigned roles** with care, because every provisioned user receives them.
Avoid assigning **Administrators**.
Role permissions are listed in [Roles and permissions](../../Users_and_Access/Roles_and_Permissions.md).

## SIEM export

When **Enable SIEM export** is on, Profinity forwards its security audit events, such as sign-ins, failed sign-ins, and licence changes, to the collector configured in the **SIEM Export** group.
The other settings appear only after you switch on **Enable SIEM export**.

| Setting | Default | Description |
|---------|---------|-------------|
| **Enable SIEM export** | Off | Forwards security audit events to the SIEM collector. |
| **SIEM host** | Empty | The host name or IP address of the SIEM collector. |
| **SIEM port** | 0 (unset) | The collector port, from 0 to 65535. Enter the port the collector listens on, because 0 means no port is set. |
| **Protocol** | UDP | The transport used to send events, either `UDP` (User Datagram Protocol) or `TCP` (Transmission Control Protocol). |
| **Minimum log level** | Info | Only audit events at this level or higher are exported. The options are `Trace`, `Debug`, `Info`, `Warn`, `Error` and `Fatal`. |
| **Format** | Syslog | The message format. Syslog is the only option. |

Profinity sends each event as the plain text line described in [Event format](#event-format), without a syslog priority or header.
Set the collector to accept a plain line over UDP or TCP.

The firewall between the Profinity host and the collector must allow outbound traffic on the chosen protocol and port.
Raising **Minimum log level** reduces the volume sent, which matters when the level is set low enough to forward every event.

## Event format

Each event is one line of text.
It starts with `SECURITY|` and the event name, followed by `name=value` fields separated by `|`, in this order when they apply: `username`, `actor`, `target`, `ip`, `authMode`, `reason`, `from`, `to`, `backup`, and then one `change.<field>` entry for each changed field.
Profinity replaces a `|`, carriage return, or line feed inside a value with `_`.
It never writes passwords or tokens.
For example, a failed local sign-in looks like this:

```text
SECURITY|LoginFailure|username=admin|ip=192.168.1.10|authMode=Local|reason=BadPassword
```

The event names include `LoginSuccess`, `LoginFailure`, `TokenRefresh`, `TokenRejected`, `UserCreated`, `UserUpdated`, `UserDeleted`, `PasswordChanged`, `GroupCreated`, `GroupUpdated`, `GroupDeleted`, `TwoFactorEnabled`, `TwoFactorDisabled`, `TwoFactorVerified`, `TwoFactorFailed`, `ExternalLoginSuccess`, `ExternalLoginFailure`, `SessionRevoked`, `SessionRevokeAll`, `ScimUserProvisioned`, `ScimUserDeactivated` and `LicenseApplied`.

## Securing the integration

Restrict access to the site configuration backups that contain the SCIM bearer token.
Serve Profinity over HTTPS, as described in [Profinity Web](../Profinity_Web.md), so that sign-in and provisioning traffic is not exposed on the network.
