---
title: Migrate from Profinity V1 to V2
description: "Move from Profinity V1 to V2 with a clean installation, because the two versions are not compatible and there is no downgrade path."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Migrate from Profinity V1 to V2

Profinity V2 is a significant architectural upgrade from V1, which ran on Windows only.
It keeps the functionality of V1 and adds a web-based interface and an expanded API, but the two versions are not compatible.
The incompatibilities are:

- V2 [profiles](../../Administration/Profiles.md) cannot be opened in V1.
- V1 and V2 system configurations cannot be used by the other version.
- The API structure and endpoints have changed significantly.

Migration has no downgrade path, so keep your V1 backups.
To upgrade from Profinity 2.2 to Profinity 2.3, refer to [Upgrade from Profinity 2.2](./Upgrade_From_2_2.md).

Prohelion recommends a clean installation of V2, removing V1 before you install V2.

Before you begin, have the V2 installer for your platform, and administrator rights on the Windows computer for the V2 install. Confirm the rights the V1 uninstall needs.

1. Copy the V1 profiles, configuration files, CAN database (DBC) files, and any custom scripts or data to a location outside the V1 installation and its profile directory.
   Write down the component settings and addresses, and any custom V1 settings you want to replicate in V2.
2. Confirm that the copies from step 1 open correctly.
    Then uninstall V1 by running the V1 Windows installer and choosing its uninstall option, and remove the files in the V1 profile directory, `Documents\Prohelion\Profinity`.

    !!! warning "There is no downgrade path"
        Keep your V1 backups.

3. Install V2 as a new installation, not as an upgrade of V1, for your platform: [Windows](../Windows_Installation.md), [Linux and macOS](../Linux_and_macOS_Installation.md), or [Docker](../Docker/index.md).
   Confirm that V2 is running.
4. Recreate the configuration.
   Create new profiles, add components in the V2 interface, upload each DBC file in the **Upload DBC File (Optional)** setting of its Custom Component, and set the system settings for your environment.
5. Check that every component is detected and configured correctly, and test the critical functions before you put the system into production.
6. Review the security settings and user accounts, starting with the default administrator password described in the [Security guide](../Security.md#default-credentials).

## Run V1 and V2 on one machine

Running both versions on one machine causes port conflicts, mixed-up profiles, and unsynchronised data, so Prohelion does not recommend it.
If both versions must run for a while, give each version different ports and a different user account, and keep their profiles and configurations separate. For V2, set the ports in **IP Port for Http** and **IP Port for Https** on the Profinity Web tab, as described in [Profinity Web](../../Administration/System_Configuration/Profinity_Web.md).
Complete the move to V2 as soon as practical.

## Get help

If something goes wrong during migration, check the installation page for your platform and the [System configuration](../../Administration/System_Configuration/index.md) documentation.
You can also contact [Prohelion Support](https://prohelion.atlassian.net/servicedesk/customer/portals), or report the issue with the [Feedback](../../Administration/Feedback.md) feature in Profinity.
