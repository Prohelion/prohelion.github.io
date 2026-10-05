---
title: Kiosk Mode
description: "Configure automatic user authentication for kiosk displays and unattended systems, bypassing login for specific profiles."
---

# Kiosk Mode

Kiosk Mode is a Profinity feature that enables automatic user authentication, bypassing the login page for specific profiles. When enabled, anyone accessing Profinity is automatically authenticated as the configured kiosk user, which allows access to the system without a manual login.

!!! warning "A kiosk session inherits the kiosk user's permissions"
    Anyone who can reach a kiosk display or the Profinity web address of a kiosk profile acts as the kiosk user, with every permission that user holds. Profinity lists any enabled user in the Kiosk Mode User dropdown, including administrators, so assign a user with the minimum permissions required, such as a read-only role built from view permissions only. See [Security Best Practices](#security-best-practices).

## What is Kiosk Mode?

Kiosk Mode automatically authenticates users when a profile is active, eliminating the need for manual login. It is particularly useful for:

- **Kiosk displays**: public-facing terminals or displays that should log in automatically.
- **Public terminals**: shared workstations that need automatic access.
- **Automated access**: systems that require unattended access without user interaction.
- **Dedicated monitoring stations**: displays that stay logged in to a specific profile.

## Enabling Kiosk Mode

To enable Kiosk Mode for a profile:

1. Select **ADMIN** in the side menu.
2. Open the **Profile** pill.
3. Select or create the profile you want to configure.
4. Open the profile settings.
5. Enable **Kiosk Mode**.
6. Select a **Kiosk Mode User** from the dropdown, which lists the enabled users.
7. Save the profile settings.

Profinity rejects the save if Kiosk Mode is enabled without a Kiosk Mode User, or if the selected user does not exist or is disabled.

!!! info "Profile Must Be Active"
    Kiosk Mode only applies to the active profile. When a profile with Kiosk Mode enabled becomes active, users are automatically authenticated. When a profile without Kiosk Mode becomes active, normal login is required.

## How Kiosk Mode Works

Kiosk Mode uses automatic authentication without requiring user credentials:

1. **Status Check**: when Profinity is accessed, the login page first checks whether Kiosk Mode is enabled for the active profile.
2. **Automatic Authentication**: if Kiosk Mode is enabled, the frontend waits about three seconds and then requests authentication with no username or password.
3. **Backend Processing**: the backend recognises a request with empty credentials as a Kiosk Mode authentication request and authenticates as the configured kiosk user.
4. **Continuous Validation**: once authenticated, the frontend checks every five seconds that Kiosk Mode is still enabled, and logs the user out automatically if it has been disabled.

### Login Page Behaviour

When Kiosk Mode is enabled:

- The login page checks the Kiosk Mode status when it loads.
- If Kiosk Mode is enabled, the login page attempts automatic authentication after a brief delay, and users bypass the login page entirely when authentication succeeds.
- If a user explicitly logs out, Profinity does not re-authenticate automatically. The login page stays on the credentials form so the operator can sign in as a different account, and a **Return to kiosk** button is shown to resume the kiosk session.

## Requirements

Kiosk Mode places the following requirements on the selected user account:

- **Must exist**: the user must be defined in Profinity.
- **Must be enabled**: disabled users cannot be selected and cannot authenticate in Kiosk Mode.

Profinity does not restrict which roles the kiosk user holds. The kiosk session carries the full permissions of the selected user, so the choice of user is the control that limits what an unattended display can do.

## Use Cases

### Kiosk Displays

Kiosk displays in public areas can log in automatically to display system information without requiring user interaction, which suits monitoring stations, information displays, and public-facing terminals.

### Dedicated Monitoring Stations

Dedicated monitoring stations that run continuously can use Kiosk Mode to authenticate and display system data without manual login, which keeps system information available without interruption.

### Automated Systems

Automated systems that require programmatic access can use Kiosk Mode to obtain consistent authentication without manual intervention.

## Token Management

Kiosk Mode tokens work in the same way as regular user tokens:

- **Standard Tokens**: by default, Kiosk Mode tokens expire according to the normal token expiration policy.
- **Service Accounts**: if the kiosk user is configured as a service account, the token never expires, which suits long-running automated systems.
- **Token Refresh**: Kiosk Mode tokens can be refreshed like regular tokens, preserving the `kiosk_mode` claim if Kiosk Mode is still enabled.
- **Automatic Revocation**: when Kiosk Mode is disabled, when the kiosk user is changed, or when the profile is switched, all tokens for the previous kiosk user are revoked automatically.

## Security Best Practices

When using Kiosk Mode:

- **Use dedicated kiosk user accounts**: create specific user accounts for Kiosk Mode rather than using regular user accounts, which makes kiosk access easier to track and manage.
- **Limit user permissions**: assign the kiosk user only the minimum permissions required, for example a read-only role built from view permissions only, as suggested in [Roles and permissions](./Users_and_Access/Roles_and_Permissions.md#which-roles-to-create). Never select an administrator or a user holding high-risk permissions such as `CANSend`, because Profinity does not prevent it and anyone at the kiosk would inherit them.
- **Service accounts for automation**: if Kiosk Mode is used for automated systems, consider marking the kiosk user as a service account to enable non-expiring tokens, and treat that token with the same care as any long-lived credential.
- **Review kiosk users regularly**: periodically review kiosk user configurations to confirm they remain appropriate and enabled.
- **Monitor access**: monitor Kiosk Mode usage through the system logs to confirm it is used as intended.
- **Disable when not needed**: disable Kiosk Mode when it is not required, to reduce security exposure.
- **Profile awareness**: Kiosk Mode is profile-specific, so normal login is required after switching to a profile without Kiosk Mode.

## Related Documentation

- [Profiles](./Profiles.md) - profile configuration and management
- [Managing Users](./Users_and_Access/Manage_Users.md) - user accounts, roles, and permissions
- [System Configuration](./System_Configuration/index.md) - system-wide configuration settings
