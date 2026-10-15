---
title: Upgrade from Profinity 2.2
description: "Upgrade a Profinity 2.2 installation to 2.3 in order: back up, install, check the licence, roles, dashboards, firmware passcodes, and integrations."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Upgrade from Profinity 2.2

Upgrade a production system in the order below.
Profinity 2.3 changes where data is stored, how security is configured, which features need a licence, and how the REST API reports errors, so read the [breaking changes](../Release_Notes/Breaking_Changes_2_3.md) first.

Before you start, take the backup in step 1, and test the upgrade on a non-production instance if you can.

1. Back up the `config/` and `profiles/` folders of the [artefacts directory](./Artifacts_Directory.md), together with `license/` and `certificates/`.
   These folders are named `Config` and `Profiles` until 2.3 starts for the first time.
   On a 2.2 system the artefacts directory is `%LOCALAPPDATA%\Prohelion\Profinity` on Windows, `~/Library/Application Support/Prohelion/Profinity` on macOS, and `~/.local/share/Prohelion/Profinity` on Linux.
2. Install Profinity 2.3 and start it once.
   The first start moves data from older locations into the 2.3 artefacts directory, renames `Config`, `Profiles`, and `Logs` to lowercase, and rewrites `security.yaml` and `profile.yaml` in the 2.3 camelCase format when it loads them.
   It rewrites `config.yaml` the next time it is saved.
   Profinity does not move data when `PROFINITY_HOME` is set, so copy anything you need into that location yourself.
3. Open **ADMIN > License** and confirm the state and the edition.
   A 2.2 installation upgraded without a licence file is unlicensed once any trial ends, and remote web access, user and role administration, two-factor authentication, Profinity AI, and the Email, Slack, Webhook, and MQTT rule actions stop being available until you upload a licence.
   Refer to [Apply a licence](./Applying_a_Licence.md) and [Licensing](../Administration/Licensing.md).
4. Sign in as an administrator, open **ADMIN > Users & Groups**, and check the **Roles** tab and each user's assigned roles.
   Change the default `admin` password if you have not already. A default `admin` account that Profinity creates must change its password at first sign-in.
5. Open **ADMIN > System Configuration** and confirm the **Sign-in method**, the password policy, and the SSO, SCIM, and SIEM settings.
6. Open **ADMIN > Logs** and read the messages from first start.
   On Linux, the migration messages name each file that moved.
7. Open each custom dashboard in the dashboard editor and confirm it loads without schema errors.
8. Unlock the firmware of each Gen2 and Rinstrum component once, and enter its passcode again, because 2.3 does not keep passcodes in the profile.
9. Run every integration that calls `/api/v2` against a test instance, because error responses changed.
   Refer to [REST API errors](../Release_Notes/Breaking_Changes_2_3.md#rest-api-errors).
10. Open each BACnet component and set **Device instance** to the instance of its device, because Profinity now checks it.
    Refer to [BACnet device instance](../Release_Notes/Breaking_Changes_2_3.md#bacnet-device-instance).

To return to 2.2, reinstall 2.2 and restore the backup you took in step 1.

## Linux and Docker data locations

On Linux, 2.3 moves data from `~/.local/share/Prohelion/Profinity`, the 2.2 location, to `/var/lib/prohelion/profinity` the first time it starts.
A Docker container follows the same rule unless `PROFINITY_HOME` is set, and the Docker compose file Prohelion publishes sets it to the container path that holds your mounted data.

For a Docker upgrade, set `PROFINITY_HOME` to the container path of your existing mount, keep that mount, and copy any legacy `Config` and `Profiles` folders into it before you start the 2.3 image.
Refer to [Docker installation](./Docker_Installation.md).
