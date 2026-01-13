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

## Requirements

Kiosk Mode has specific requirements for the selected user account:

### User Requirements

- **Must be a non-administrator user**: Administrator users cannot be used for Kiosk Mode
- **Must be enabled**: The user account must be enabled in the system
- **Must have kiosk-safe security roles**: The user must have security roles that are safe for kiosk mode

### Security Considerations

Kiosk Mode is designed with security in mind. Only non-administrator users can be selected as kiosk users, and users must have kiosk-safe security roles that are appropriate for unattended access. Kiosk Mode is validated when the profile is loaded, and if the user is invalid, disabled, or not suitable, Kiosk Mode will be automatically disabled. Token revocation is handled automatically when Kiosk Mode is disabled or changed.

## Use Cases

### Kiosk Displays

Kiosk displays in public areas can automatically log in to display system information without requiring user interaction. This is ideal for monitoring stations, information displays, or public-facing terminals.

### Dedicated Monitoring Stations

Dedicated monitoring stations that run continuously can use Kiosk Mode to automatically authenticate and display system data without manual login, ensuring uninterrupted access to system information.

### Automated Systems

Automated systems that require programmatic access can use Kiosk Mode to ensure consistent authentication without manual intervention.

## Security Best Practices

When using Kiosk Mode:

- **Use dedicated kiosk user accounts**: Create specific user accounts for kiosk mode rather than using regular user accounts
- **Limit user permissions**: Configure kiosk users with the minimum permissions required for their intended use
- **Regularly review kiosk users**: Periodically review and update kiosk user configurations to ensure they remain appropriate
- **Monitor access**: Monitor kiosk mode usage to ensure it's being used as intended
- **Disable when not needed**: Disable Kiosk Mode when it's not required to reduce security exposure

## Troubleshooting

### Kiosk Mode Not Working

If Kiosk Mode is not working:

1. **Check the profile is active**: Kiosk Mode only applies to the active profile
2. **Verify the user is enabled**: The kiosk user must be enabled in the system
3. **Check user permissions**: The kiosk user must have appropriate security roles
4. **Review the logs**: Check the Profinity logs for any kiosk mode related errors

### Kiosk User Not Available

If the desired kiosk user is not available in the dropdown:

- **Check user is enabled**: Only enabled users are available for selection
- **Verify user is not administrator**: Administrator users cannot be used for Kiosk Mode
- **Check security roles**: The user must have kiosk-safe security roles

## Related Documentation

- [Profiles](./Profiles.md) - Profile configuration and management
- [User Management](./Manage_Users.md) - User account management and security roles
