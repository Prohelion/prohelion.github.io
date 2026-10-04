---
title: SCIM and SIEM
description: "Enable SCIM user provisioning from identity providers and configure SIEM log export for security monitoring."
---

# SCIM and SIEM

Profinity 2.3 configures **SCIM user provisioning** and **SIEM log export** in **config.yaml** under **Security Config**. These settings moved from security.yaml in earlier releases; saving config.yaml **restarts the engine**.

OIDC SSO configuration is covered in [SSO and sign-in method](./SSO_and_Sign_In.md). SCIM provisioning uses the same site OIDC provider context — there is no separate `OidcProviderId` selector.

## SCIM provisioning

### Configuration

1. Open **System Configuration** → **Security Config** → **SCIM**.
2. Enable **SCIM provisioning**.

    !!! note "Licensing"
        Enabling SCIM provisioning (`SecurityScimProvisioning.Enabled`) requires the **EnterpriseSecurity** product feature. Without this licence, the toggle is unavailable.

3. Set a **bearer token** for SCIM clients (store securely; rotate periodically).

### Endpoint

SCIM clients call:

```text
https://{your-host}/scim/v2/Users
```

Authenticate with the configured **bearer token** (HTTP `Authorization: Bearer ...`). Profinity implements the SCIM user resource operations required for provisioning integrations — refer to your IdP's SCIM setup guide for attribute mapping.

### Default roles for provisioned users

Map default **Assigned roles** for newly provisioned users in SCIM settings (config.yaml `DefaultAssignedRoles`). Ensure provisioned users receive appropriate permissions — avoid assigning **Administrators** by default.

## SIEM export

Configure **SIEM Export** under **Security Config**:

| Field | Purpose |
|-------|---------|
| **Host** | SIEM collector hostname or IP |
| **Port** | Collector port |
| **Protocol** | Transport (for example TCP, UDP — per deployment) |
| **Minimum log level** | Only events at or above this level are forwarded |

Verify firewall rules allow outbound traffic from the Profinity host to the SIEM collector.

## Security considerations

- Treat SCIM bearer tokens like passwords — restrict access to config.yaml backups.
- Use TLS for Profinity HTTPS so administrative changes and SSO flows are not exposed on the network.
- Review SIEM volume and minimum log level to avoid flooding the collector during debug logging.

## Related documentation

- [SSO and sign-in method](./SSO_and_Sign_In.md)
- [Roles and permissions](../Roles_and_Permissions.md)
- [System configuration](../System_Config.md)
