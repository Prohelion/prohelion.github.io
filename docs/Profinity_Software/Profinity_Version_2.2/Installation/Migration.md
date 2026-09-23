---
title: Migration from V1 to V2
---

# Migration from Profinity V1 to V2

!!! info "Profinity V2 Overview"
    Profinity V2 represents a significant architectural upgrade from V1. While V2 maintains all the functionality of V1 and adds many new capabilities, the systems are **not backwards compatible**.

Profinity V2 is **not backwards compatible** with Profinity V1. This means:

- **V2 profiles cannot be opened in V1**: Profile formats have changed and V1 cannot read V2 profile files
- **V2 configurations are incompatible**: System configuration formats differ between versions
- **API changes**: The API structure and endpoints have changed significantly
- **No downgrade path**: Once you migrate to V2, you cannot revert profiles or configurations back to V1

### Functionality Preservation

While the formats are incompatible, V2 includes:

- All core functionality from V1
- Enhanced features and capabilities
- Improved architecture and performance
- Modern web-based interface
- Expanded API capabilities

## Migration Recommendations

### Recommended Approach: Clean Installation

!!! tip "Recommended: Clean Installation"
    We recommend performing a **clean installation** of Profinity V2, removing V1 before installing V2. 

1. **Backup V1 Data**: Before uninstalling, backup your V1 profiles, configurations, and any custom scripts or data
2. **Document Configuration**: Document any custom V1 settings you want to replicate in V2
3. **Uninstall V1**: Remove Profinity V1 using standard uninstallation procedures
4. **Install V2**: Install Profinity V2 following the [installation guides](./Windows_Installation.md)
5. **Recreate Configuration**: Set up your V2 installation and recreate your profiles using V2 tools

### Co-Existence (Not Recommended)

While it is technically possible to run both V1 and V2 on the same machine, this is **not recommended** because:

- Port conflicts may occur if both try to use the same network ports
- Profile confusion between versions
- Resource usage from running both systems
- Potential data synchronization issues

If you must run both versions temporarily:

- Use different ports for each version
- Run each version under different user accounts
- Keep profiles and configurations clearly separated
- Plan to migrate completely to V2 as soon as practical

## Migration Steps

### 1. Pre-Migration Planning

- Review your current V1 setup and document all components
- Identify all profiles in use
- Document any custom scripts or configurations
- Plan which V2 features you want to adopt

### 2. Backup Existing Data

- Export all V1 profiles (save copies)
- Backup configuration files
- Document component settings and addresses
- Save any custom DBC files or scripts

### 3. Uninstall V1 and Install V2

- Follow the appropriate [installation guide](./Windows_Installation.md) for your platform
- Use your V1 installer to Uninstall V1 and remove all files in your Profile directory
- Install V2 as a new installation (not upgrading V1)
- Verify V2 is running correctly before proceeding

### 4. Recreate Configuration

- Create new profiles in V2
- Add components using V2's improved interface
- Import or recreate DBC files as needed
- Configure system settings for your environment

### 5. Verify and Test

- Verify all components are detected and configured correctly
- Test critical functionality before putting into production
- Review security settings and user accounts
- Ensure all expected features are working

## Getting Help

If you encounter issues during migration:

- Review the [Installation Guides](./Windows_Installation.md) for your platform
- Check the [Administration](../Administration/System_Config.md) documentation for configuration guidance
- Contact [Prohelion Support](https://prohelion.atlassian.net/servicedesk/customer/portals) for assistance
- Use the [Feedback](../Administration/Feedback.md) feature in Profinity to report issues

## Related Documentation

- [Windows Installation](./Windows_Installation.md) - Installing V2 on Windows
- [Docker Installation](./Docker_Installation.md) - Installing V2 using Docker
- [Zip Installation](./Zip_Installation.md) - Installing V2 on macOS/Linux
- [Profiles](../Administration/Profiles.md) - Working with profiles in V2
- [Security Guide](./Security.md) - Security considerations for V2
