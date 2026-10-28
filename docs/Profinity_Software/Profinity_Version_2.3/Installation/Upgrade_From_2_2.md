---
title: Upgrade from Profinity 2.2
description: "Upgrade a Profinity 2.2 installation to 2.3 in order: back up, install, check the licence, roles, dashboards, firmware passcodes, and integrations."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Upgrade from Profinity 2.2

Upgrade a production system by following the numbered steps in order.
Profinity 2.3 changes:

- Where data is stored.
- How security is configured.
- Which features need a licence.
- How the Representational State Transfer (REST) API reports errors.

Read the [breaking changes](../Release_Notes/Breaking_Changes_2_3.md) first.

Before you start, take the backup in step 1, and test the upgrade on a non-production instance if you can.

1. Back up the `config/` and `profiles/` folders of the [artefacts directory](./Artifacts_Directory.md), together with `license/` and `certificates/`.
   These folders are named `Config` and `Profiles` until 2.3 starts for the first time.
   On a 2.2 system the artefacts directory is `%LOCALAPPDATA%\Prohelion\Profinity` on Windows, `~/Library/Application Support/Prohelion/Profinity` on macOS, and `~/.local/share/Prohelion/Profinity` on Linux.
2. Install Profinity 2.3 and start it once.
   The first start moves data from older locations into the 2.3 artefacts directory.
   It renames `Config`, `Profiles`, and `Logs` to lowercase.
   It rewrites `security.yaml` and `profile.yaml` in the 2.3 camelCase format when it loads them.
   It rewrites `config.yaml` on that first load when the file still has legacy Pascal keys or an older version stamp.
   Before it rewrites a file, it keeps the file it replaces beside it as `<file>.bak`.
   Profinity 2.3 reads a profile only from `profile.yaml`, so refer to [Profile files](../Release_Notes/Breaking_Changes_2_3.md#profile-files) if a profile uses another file name.
   Profinity does not move data when `PROFINITY_HOME` is set, so copy anything you need into that location yourself.
3. Open **ADMIN > License** and confirm the state and the edition.
   A 2.2 installation upgraded without a licence file is unlicensed once any trial ends.
   These features then stop being available until you upload a licence:

    - Remote web access.
    - User and role administration.
    - Two-factor authentication.
    - Profinity AI.
    - The Email, Slack, Webhook, and Message Queuing Telemetry Transport (MQTT) rule actions.

    Refer to [Apply a licence](./Applying_a_Licence.md) and [Licensing](../Licensing.md).
4. Sign in as an administrator, open **ADMIN > Users & Groups**, and check the **Roles** tab and each user's assigned roles.
   Existing passwords keep working, because Profinity converts them to one-way hashes at first start.
   Change the default `admin` password if you have not already.
   A default `admin` account that Profinity creates must change its password at first sign-in.
5. Open **ADMIN > System Configuration** and confirm these settings:
   - The **Sign-in method**.
   - The password policy.
   - The settings for single sign-on (SSO), System for Cross-domain Identity Management (SCIM), and Security Information and Event Management (SIEM).
6. Open **ADMIN > Logs** and read the messages from first start.
   On Linux, the migration messages name each file that moved.
7. Open each custom dashboard.
   Profinity 2.3 does not convert dashboards written for 2.2.
   A dashboard that no longer matches the current format shows **This dashboard no longer matches the schema**.
   Select **Reset from Template** to replace it with the latest template, or open **Edit Dashboard** and repair the file.

    !!! warning "Reset removes customisations"
        Resetting removes any customisations, so save a copy of the dashboard first.

    A user who cannot modify dashboards sees a message to contact an administrator instead.
    Binds written in the dotted 2.2 form, such as `Component.Message.Signal`, return no data, so change them to [slash paths](../Tags/Selecting_Tags/Tag_Tree_Path.md).
8. Unlock the firmware of each Gen2 battery management system once, and enter its passcode again, because 2.3 does not keep passcodes in the profile.
9. Run every integration that calls `/api/v2` against a test instance, because error responses changed.
   Check that each integration reads the HTTP status code and the problem body, and not a `success` flag or a `message` field.
   Integrations that call the older data endpoints must move to the tag, collection, rule, and alert endpoints.
   Refer to [REST API errors](../Release_Notes/Breaking_Changes_2_3.md#rest-api-errors).
10. Open each Building Automation and Control Networks (BACnet) component and set **Device instance** to the instance number of its device.
    Profinity now checks this number against the device, and stops reading points from a device that reports a different number.
    Refer to [BACnet device instance](../Release_Notes/Breaking_Changes_2_3.md#bacnet-device-instance).

To return to 2.2, reinstall 2.2 and restore the backup you took in step 1.

## Linux and Docker data locations

On Linux, 2.3 moves data from `~/.local/share/Prohelion/Profinity`, the 2.2 location, to `/var/lib/prohelion/profinity` the first time it starts.
A Docker container follows the same rule unless `PROFINITY_HOME` is set, and the Docker compose file Prohelion publishes sets it to the container path that holds your mounted data.

For a Docker upgrade, set `PROFINITY_HOME` to the container path of your existing mount and keep that mount.
Copy any legacy `Config` and `Profiles` folders into it before you start the 2.3 image.
Refer to [Install Profinity with Docker](./Docker_Installation.md).
