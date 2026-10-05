---
title: Migration from V1 to V2
description: "Understand the key differences and recommended approach for migrating from Profinity V1 to V2, which requires clean installation."
---

# Migration from Profinity V1 to V2

!!! info "Profinity V2 Overview"
    Profinity V2 is a significant architectural upgrade from V1. V2 retains the functionality of V1 and adds new capabilities, but the two versions are **not backwards compatible**.

Because V2 is **not backwards compatible** with Profinity V1:

- **V2 profiles cannot be opened in V1**: profile formats have changed and V1 cannot read V2 profile files.
- **V1 and V2 configurations are incompatible**: system configuration formats differ between versions.
- **API changes**: the API structure and endpoints have changed significantly.
- **No downgrade path**: once profiles or configurations are migrated to V2, they cannot be reverted to V1.

## Functionality Preservation

Although the formats are incompatible, V2 includes:

- All core functionality from V1.
- Enhanced features and capabilities.
- Improved architecture and performance.
- A modern web-based interface.
- Expanded API capabilities.

## Migration Recommendations

### Recommended Approach: Clean Installation

!!! tip "Recommended: Clean Installation"
    Prohelion recommends a **clean installation** of Profinity V2, removing V1 before installing V2.

1. **Back up V1 data**: before uninstalling, back up the V1 profiles, configurations, and any custom scripts or data.
2. **Document configuration**: document any custom V1 settings to be replicated in V2.
3. **Uninstall V1**: remove Profinity V1 using the standard uninstallation procedure.
4. **Install V2**: install Profinity V2 following the installation guide for the target platform ([Windows](./Windows_Installation.md), [macOS and Linux](./Zip_Installation.md) or [Docker](./Docker_Installation.md)).
5. **Recreate configuration**: set up the V2 installation and recreate the profiles using V2 tools.

### Co-Existence (Not Recommended)

While it is technically possible to run both V1 and V2 on the same machine, this is **not recommended** because:

- Port conflicts occur if both versions try to use the same network ports.
- Profiles can be confused between versions.
- Running both systems increases resource usage.
- Data can fall out of synchronisation between the versions.

If both versions must run temporarily:

- Use different ports for each version.
- Run each version under different user accounts.
- Keep profiles and configurations clearly separated.
- Plan to migrate completely to V2 as soon as practical.

## Migration Steps

### 1. Pre-Migration Planning

- Review the current V1 setup and document all components.
- Identify all profiles in use.
- Document any custom scripts or configurations.
- Decide which V2 features to adopt.

### 2. Backup Existing Data

- Export all V1 profiles and save copies.
- Back up configuration files.
- Document component settings and addresses.
- Save any custom DBC files or scripts.

### 3. Uninstall V1 and Install V2

- Use the V1 installer to uninstall V1, and remove all files in the V1 Profile directory.
- Follow the appropriate installation guide for the platform ([Windows](./Windows_Installation.md), [macOS and Linux](./Zip_Installation.md) or [Docker](./Docker_Installation.md)), installing V2 as a new installation rather than an upgrade of V1.
- Verify V2 is running correctly before proceeding.

### 4. Recreate Configuration

- Create new profiles in V2.
- Add components using the V2 interface.
- Import or recreate DBC files as needed.
- Configure system settings for the target environment.

### 5. Verify and Test

- Verify all components are detected and configured correctly.
- Test critical functionality before putting the system into production.
- Review security settings and user accounts, starting with the default administrator password described in the [Security Guide](./Security.md#default-credentials).
- Ensure all expected features are working.

## Getting Help

If issues occur during migration:

- Review the installation guide for the platform ([Windows](./Windows_Installation.md), [macOS and Linux](./Zip_Installation.md) or [Docker](./Docker_Installation.md)).
- Check the [System Configuration](../Administration/System_Configuration/index.md) documentation for configuration guidance.
- Contact [Prohelion Support](https://prohelion.atlassian.net/servicedesk/customer/portals) for assistance.
- Use the [Feedback](../Administration/Feedback.md) feature in Profinity to report issues.

## Related Documentation

- [Windows Installation](./Windows_Installation.md) - Installing V2 on Windows
- [Docker Installation](./Docker_Installation.md) - Installing V2 using Docker
- [Linux and macOS Installation](./Zip_Installation.md) - Installing V2 on macOS/Linux
- [Profiles](../Administration/Profiles.md) - Working with profiles in V2
- [Security Guide](./Security.md) - Security considerations for V2
