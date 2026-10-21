---
title: Migrate from Profinity V1 to V2
description: "Move from Profinity V1 to V2 with a clean installation, because the two versions are not compatible and there is no downgrade path."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Migrate from Profinity V1 to V2

Profinity V2 is a significant architectural upgrade from V1.
It keeps the functionality of V1 and adds a web-based interface and an expanded API, but the two versions are not compatible.
The incompatibilities are:

- V2 [profiles](../Administration/Profiles.md) cannot be opened in V1.
- V1 and V2 system configurations cannot be used by the other version.
- The API structure and endpoints have changed significantly.

There is no downgrade path, so keep your V1 backups.
To upgrade from Profinity 2.2 to Profinity 2.3, refer to [Upgrade from Profinity 2.2](./Upgrade_From_2_2.md).

Prohelion recommends a clean installation of V2, removing V1 before you install V2.

1. Back up the V1 profiles, configuration files, CAN database (DBC) files, and any custom scripts or data.
   Write down the component settings and addresses, and any custom V1 settings you want to replicate in V2.
2. Uninstall V1 with the standard uninstallation procedure, and remove the files in the V1 profile directory.
3. Install V2 as a new installation, not as an upgrade of V1, for your platform: [Windows](./Windows_Installation.md), [Linux and macOS](./Linux_and_macOS_Installation.md), or [Docker](./Docker_Installation.md).
   Confirm that V2 is running.
4. Recreate the configuration.
   Create new profiles, add components in the V2 interface, import or recreate the DBC files, and set the system settings for your environment.
5. Check that every component is detected and configured correctly, and test the critical functions before you put the system into production.
6. Review the security settings and user accounts, starting with the default administrator password described in the [Security guide](./Security.md#default-credentials).

## Run V1 and V2 on one machine

Running both versions on one machine causes port conflicts, mixed-up profiles, and unsynchronised data, so Prohelion does not recommend it.
If both versions must run for a while, give each version different ports and a different user account, and keep their profiles and configurations separate.
Complete the move to V2 as soon as practical.

## Get help

If something goes wrong during migration, check the installation page for your platform and the [System configuration](../Administration/System_Configuration/index.md) documentation.
You can also contact [Prohelion Support](https://prohelion.atlassian.net/servicedesk/customer/portals), or report the issue with the [Feedback](../Administration/Feedback.md) feature in Profinity.
