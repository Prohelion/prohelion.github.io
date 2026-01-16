---
title: Kiosk Mode
---

!!! tip "Profinity V2 IS NOW IN GENERAL RELEASE"
    Profinity V2 is available now in General Release.  If you are having any issues or feedback please report it via our support portal or via the Feedback form in the Profinity Admin menu.

# Kiosk Mode

Kiosk Mode is a Profinity feature that enables automatic user authentication, bypassing the login page for specific profiles. When enabled, users accessing Profinity will be automatically authenticated as the configured kiosk user, allowing seamless access to the system without manual login.

## What is Kiosk Mode?

Kiosk Mode automatically authenticates users when a profile is active, eliminating the need for manual login. This feature is particularly useful for:

- **Kiosk displays**: Public-facing terminals or displays that should automatically log in
- **Public terminals**: Shared workstations that need automatic access
- **Automated access**: Systems that require unattended access without user interaction
- **Dedicated monitoring stations**: Displays that are always logged in to a specific profile

When Kiosk Mode is enabled for a profile, users accessing Profinity will be automatically authenticated as the selected kiosk user, bypassing the login page entirely.

## Enabling Kiosk Mode

To enable Kiosk Mode for a profile:

1. Navigate to the **ADMIN** tab
2. Open **Profiles**
3. Select or create the profile you want to configure
4. Open the profile settings
5. Enable **Kiosk Mode Enabled**
6. Select a **Kiosk Mode User** from the dropdown (only non-administrator, enabled users are available)
7. Save the profile settings

!!! info "Profile Must Be Active"
    Kiosk Mode only applies to the active profile. When a profile with Kiosk Mode enabled becomes active, users will be automatically authenticated. When a profile without Kiosk Mode becomes active, normal login is required.

## How Kiosk Mode Works

Kiosk Mode uses automatic authentication without requiring user credentials:

1. **Status Check**: When accessing Profinity, the system first checks if kiosk mode is enabled for the active profile
2. **Automatic Authentication**: If kiosk mode is enabled, the frontend automatically attempts authentication with empty credentials (no username or password)
3. **Backend Processing**: The backend recognizes empty credentials as a kiosk mode authentication request and authenticates as the configured kiosk user
4. **Continuous Validation**: Once authenticated, the system periodically validates that kiosk mode is still enabled (every 5 seconds). If kiosk mode is disabled, the user is automatically logged out

### Login Page Behavior

When kiosk mode is enabled:

- The login page automatically checks kiosk mode status
- If enabled, it attempts automatic authentication after a brief check
- If authentication succeeds, users bypass the login page entirely
- If a user explicitly logs out (via the LOGIN menu button in kiosk mode), they see a modal for 3 seconds before being automatically re-authenticated in kiosk mode

## Requirements

Kiosk Mode has specific requirements for the selected user account:

### User Requirements

- **Must be a non-administrator user**: Administrator users cannot be used for Kiosk Mode. This is a security restriction to prevent unattended access with full administrative privileges
- **Must be enabled**: The user account must be enabled in the system. Disabled users cannot authenticate
- **Must have kiosk-safe security roles**: The user must only have security roles that are marked as safe for kiosk mode

### Kiosk-Safe Security Roles

Only specific security roles are considered safe for unattended kiosk mode access:

- **SystemRead**: Implicitly granted to all authenticated users. Allows reading system settings and viewing dashboards
- **CANReceive**: Marked as kiosk-safe. Allows viewing received CAN bus messages
- **DBCViewer**: Marked as kiosk-safe. Allows viewing DBC message and signal definitions

Security roles that are **NOT** kiosk-safe (and therefore cannot be used in kiosk mode):

- **Administrator**: Full system access (explicitly excluded)
- **SystemUpdate**: Ability to modify system settings
- **Charging**: Ability to control battery charging
- **CANSend**: Ability to send CAN bus messages

Users with any non-kiosk-safe roles (including Admin) will not appear in the kiosk user dropdown and cannot be used for kiosk mode.

## Use Cases

### Kiosk Displays

Kiosk displays in public areas can automatically log in to display system information without requiring user interaction. This is ideal for monitoring stations, information displays, or public-facing terminals.

### Dedicated Monitoring Stations

Dedicated monitoring stations that run continuously can use Kiosk Mode to automatically authenticate and display system data without manual login, ensuring uninterrupted access to system information.

### Automated Systems

Automated systems that require programmatic access can use Kiosk Mode to ensure consistent authentication without manual intervention.

## Token Management

Kiosk mode tokens work similarly to regular user tokens:

- **Standard Tokens**: By default, kiosk mode tokens expire according to the normal token expiration policy
- **Service Accounts**: If the kiosk user is configured as a service account, the token will never expire, which is useful for long-running automated systems
- **Token Refresh**: Kiosk mode tokens can be refreshed like regular tokens, preserving the kiosk_mode claim if kiosk mode is still enabled
- **Automatic Revocation**: When kiosk mode is disabled, when the kiosk user is changed, or when the profile is switched, all tokens for the previous kiosk user are automatically revoked

## Security Best Practices

When using Kiosk Mode:

- **Use dedicated kiosk user accounts**: Create specific user accounts for kiosk mode rather than using regular user accounts. This makes it easier to track and manage kiosk access
- **Limit user permissions**: Configure kiosk users with only the minimum permissions required (SystemRead, CANReceive, DBCViewer). Never assign admin or other powerful roles
- **Service accounts for automation**: If using kiosk mode for automated systems, consider marking the kiosk user as a service account to enable non-expiring tokens
- **Regularly review kiosk users**: Periodically review and update kiosk user configurations to ensure they remain appropriate and enabled
- **Monitor access**: Monitor kiosk mode usage through system logs to ensure it's being used as intended
- **Disable when not needed**: Disable Kiosk Mode when it's not required (e.g., when profiles are not active) to reduce security exposure
- **Profile awareness**: Remember that kiosk mode is profile-specific. When switching to a profile without kiosk mode, normal login will be required

## Related Documentation

- [Profiles](./Profiles.md) - Profile configuration and management
- [User Management](./Manage_Users.md) - User account management and security roles
- [System Configuration](./System_Config.md) - System-wide configuration settings
