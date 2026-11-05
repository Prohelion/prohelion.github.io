---
title: Upgrade from Profinity 2.2
description: "Upgrade a Profinity 2.2 system to 2.3: back up the data folder, start 2.3 once, apply the licence, and update integrations and dashboards."
type: task
owner: Documentation
last_reviewed: 2026-11-04
---

# Upgrade from Profinity 2.2

Upgrade a Profinity 2.2 system to Profinity 2.3 by following these steps in order.
Profinity 2.3 migrates the 2.2 data when it first starts, and existing users, roles, and passwords carry over.
For the default `admin` account and the password, session, and two-factor settings, refer to [User account security](../Security.md#user-account-security) in the Security guide.
Read the [Profinity 2.3 breaking changes](../../Release_Notes/Breaking_Changes_2_3.md) before you start, and test the upgrade on a non-production instance first.

You need:

- The username and password of an administrator account on the 2.2 system
- A list of the integrations, scripts, and tools that call `/api/v2`, for step 4
- A Profinity licence file from Prohelion, ready before you start, because Profinity 2.3 starts without one and step 3 applies it
- Access to the machine that runs Profinity, to copy its data folder in step 1

If you run Profinity in Docker, mount the host folder that holds the 2.2 data at `/var/lib/prohelion/profinity` in the 2.3 compose file, and do not set `PROFINITY_HOME`.
The 2.2 image kept its data in a `Profinity` folder inside the folder you mounted at `/app/Prohelion`, so mount that `Profinity` folder.
[Docker ports and data directory](../Docker/Docker_Ports_and_Data_Directory.md#artefacts-directory) describes the mount.

1. Back up the 2.2 data folder:

    a. Stop Profinity 2.2, so that no file changes while you copy it.

    b. Copy the whole data folder to a backup location.

    === "Windows"

        The 2.2 data folder is `%LOCALAPPDATA%\Prohelion\Profinity` for the desktop application. A Windows service keeps its data in the same folder name under the local application data folder of the account it runs as.
        Copy it in PowerShell:

        ```powershell
        Copy-Item -Recurse "$env:LOCALAPPDATA\Prohelion\Profinity" "<backup-folder>"
        ```

    === "macOS"

        The 2.2 data folder is `~/Library/Application Support/Prohelion/Profinity`.
        Copy it in Terminal:

        ```bash
        cp -a "$HOME/Library/Application Support/Prohelion/Profinity" "<backup-folder>"
        ```

    === "Linux"

        The 2.2 data folder is `~/.local/share/Prohelion/Profinity`, in the home folder of the account that runs Profinity.
        Copy it as that account:

        ```bash
        cp -a "$HOME/.local/share/Prohelion/Profinity" "<backup-folder>"
        ```

    === "Docker"

        The 2.2 data folder is the host folder that the compose file mounts into the container.
        Copy it on the host:

        ```bash
        cp -a "<host-data-folder>" "<backup-folder>"
        ```

        Replace `<host-data-folder>` with the host side of the volume entry in the compose file.

    Replace `<backup-folder>` with a new folder outside the data folder, such as one on another drive.

2. Install Profinity 2.3 and start it once, following [Install Profinity on Windows](../Windows_Installation.md), [Install Profinity on Linux and macOS](../Linux_and_macOS_Installation.md), or, for Docker, [Update the Profinity Docker image](../Docker/Update_Docker_Image.md).
    On a Windows desktop installation the application window opens.
    On Linux, macOS and Docker, open `http://localhost:18080` to reach the sign-in page.
    The first start migrates the 2.2 data into the 2.3 [artefacts directory](../Artifacts_Directory.md), and keeps the original of each file it rewrites beside it as `<file>.bak`.
    Profinity 2.3 reads a profile only from `profile.yaml`, so if a profile uses another file name, rename it as described in [Profile files](../../Release_Notes/Breaking_Changes_2_3.md#profile-files).
    When `PROFINITY_HOME` is set, Profinity skips the move from the 2.2 locations, so copy the 2.2 data into that location yourself. The users, roles and passwords in it are then converted in place.

3. On **ADMIN > License**, apply the licence file, as described in [Apply a licence](../Applying_a_Licence.md).
    The **State** shows `Valid`, or `Expiring` when 30 days or fewer remain.
    The licensed features stay off until the licence is applied, and [Features by edition](../../Licensing.md#features-by-edition) lists them.

4. Update each integration that calls one of these 2.2 data routes, which Profinity 2.3 removes, so that it uses the tag, tag collection, tag rule, and alert routes:

    - `GET /api/v2/Data`
    - `GET /api/v2/Data/AllInfo`
    - `GET /api/v2/Data/{component}`
    - `GET /api/v2/Data/{component}/AllInfo`
    - `GET /api/v2/Data/{component}/{message}/{signal}`
    - `POST /api/v2/Data/Query`
    - `GET /api/v2/Data/QueryDelta/{sourceSet}`

    To read tag values, refer to [Read real-time and historical tag data](../../Integrating_to_Profinity/APIs/Read_Tag_Data.md), and for the collection and alert routes, refer to the [Endpoint Reference](../../Integrating_to_Profinity/APIs/Endpoint_Reference.md).
    The Swagger page on the 2.3 instance lists every route, including the tag rule routes.
    Change any integration that reads a `success` flag or a `message` field to read the HTTP status code and the `application/problem+json` body instead, as described in [REST API errors](../../Release_Notes/Breaking_Changes_2_3.md#rest-api-errors).

5. Check each custom dashboard:

    a. Open the dashboard.
    A dashboard that opens without the message **This dashboard no longer matches the schema** needs no change.

    !!! warning "Reset from Template removes customisations"
        **Reset from Template** replaces the whole dashboard with the latest template, and every customisation is lost.
        To keep a copy first, select **Edit Dashboard** in the dashboard title bar, select **YAML**, then copy all the YAML into a text file and save it.

    b. If the message appears, select **Reset from Template** and confirm.
    The dashboard opens without the message.
    To keep the customisations instead, repair the dashboard as described in [Dashboard does not load](../../Customising_Profinity/Dashboards/Troubleshooting.md#dashboard-does-not-load).

    Profinity 2.3 does not accept a bind written in the dotted 2.2 form, such as `Component.Message.Signal`, so change it to a [slash path](../../Tags/Selecting_Tags/Tag_Tree_Path.md).

6. If you change the firmware configuration of an M48 Gen2, C48 Gen2, or D1000 Gen2 battery management system (BMS), enter its **Firmware Configuration Key** first, as described in [Unlock administration firmware parameters](../../Components/Battery_Management_Systems/Prohelion_BMU/Update_BMU_Configuration_and_Firmware.md#unlock-administration-firmware-parameters).
    Profinity 2.3 holds the key for a limited session of 30 minutes by default and never saves it in the profile, so enter it in each session in which you change the firmware configuration.

7. In the **Change Settings** dialog of each Building Automation and Control Networks (BACnet) component, set **Device instance** to the instance number of the device at **Remote host**.
    The number is the instance of the device's own Device object, which the device's configuration shows. If you do not know it, the **Error** message on the component names the number to use.
    A component whose **Device instance** differs from the device shows **Error** with a message that states the number to use:
    `The device at <host> reports Device instance <actual>, but Device instance is set to <n>. Set Device instance to <actual>, or correct the Remote host.`
    Refer to [BACnet](../../Components/Industrial_Protocols/BACnet.md).

To check the upgrade, sign in and open each custom dashboard.
Each dashboard loads without the message **This dashboard no longer matches the schema**.

To return to 2.2, reinstall 2.2 and restore the backup you took in step 1.

## If the upgrade fails

| What you see | Cause | What to do |
|--------------|-------|------------|
| Profinity stops at the first start, with a message that names `config.yaml` or `security.yaml` | The file holds a key or value that 2.3 does not accept | Follow [Recover when Profinity will not start](../../Administration/System_Configuration/Invalid_Configuration_Files.md#recover-when-profinity-will-not-start) |
| The profile is empty after the first start | `PROFINITY_HOME` is set, so Profinity skipped the migration | Copy the 2.2 data from the backup into the folder that `PROFINITY_HOME` names |
| The side menu shows only **ADMIN** and **LOGOUT** | The server installation runs in [restricted mode](../../Licensing.md#when-a-licence-is-missing-or-has-expired), with no licence that includes **Profinity Server** | Apply the licence, as described in [Apply a licence](../Applying_a_Licence.md) |

Next, work through the [production deployment checklist](../Security.md#production-deployment-checklist) in the Security guide.
