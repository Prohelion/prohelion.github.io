---
title: Migration from V1 to V2
description: "Understand the key differences and recommended approach for migrating from Profinity V1 to V2, which requires clean installation."
---

# Migration from Profinity V1 to V2

!!! info "V2 Is Not Backwards Compatible with V1"
    Profinity V2 is a significant architectural upgrade from V1. It retains the functionality of V1 and adds new capabilities, but the two versions are not compatible. This page covers moving from V1 to V2. To upgrade from Profinity 2.2 to Profinity 2.3, see [Upgrading From 2.2](../Release_Notes/2.3.1.md#upgrading-from-22).

Because the formats differ, V2 [profiles](../Administration/Profiles.md) cannot be opened in V1, V1 and V2 system configurations cannot be used by the other version, and the API structure and endpoints have changed significantly. There is no downgrade path: once profiles or configurations are migrated to V2, they cannot be reverted to V1, so keep your V1 backups. V2 includes all the core functionality of V1, with a web-based interface and an expanded API.

## Recommended Approach: Clean Installation

Prohelion recommends a clean installation of Profinity V2, removing V1 before installing V2.

1. Back up the V1 profiles, configuration files, DBC files and any custom scripts or data, and document the component settings and addresses and any custom V1 settings to replicate in V2.
2. Uninstall V1 using the standard uninstallation procedure, and remove the files in the V1 profile directory.
3. Install V2 as a new installation rather than an upgrade of V1, following the installation guide for the target platform ([Windows](./Windows_Installation.md), [macOS and Linux](./Zip_Installation.md) or [Docker](./Docker_Installation.md)), and verify that V2 is running.
4. Recreate the configuration: create new profiles, add components in the V2 interface, import or recreate DBC files, and configure system settings for the target environment.
5. Verify that all components are detected and configured correctly, test critical functionality before putting the system into production, and review security settings and user accounts, starting with the default administrator password described in the [Security Guide](./Security.md#default-credentials).

## Running V1 and V2 on One Machine

Running both versions on one machine causes port conflicts, mixed-up profiles and unsynchronised data, so Prohelion does not recommend it. If both versions must run temporarily, give each version different ports and a different user account, keep their profiles and configurations separate, and complete the move to V2 as soon as practical.

## Getting Help

If issues occur during migration, review the installation guide for the platform, check the [System Configuration](../Administration/System_Configuration/index.md) documentation for configuration guidance, contact [Prohelion Support](https://prohelion.atlassian.net/servicedesk/customer/portals), or use the [Feedback](../Administration/Feedback.md) feature in Profinity to report issues.

## Related Documentation

- [Windows Installation](./Windows_Installation.md): installing V2 on Windows.
- [Docker Installation](./Docker_Installation.md): installing V2 using Docker.
- [Linux and macOS Installation](./Zip_Installation.md): installing V2 on macOS and Linux.
- [Profiles](../Administration/Profiles.md): working with profiles in V2.
- [Security Guide](./Security.md): security considerations for V2.
- [Release Notes 2.3](../Release_Notes/2.3.1.md): what changed in Profinity 2.3 and how to upgrade from 2.2.
