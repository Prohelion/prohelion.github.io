---
title: Profinity 2.3 breaking changes
description: "Check what Profinity 2.3 changes for existing installations, integrations, and plugins: security, profiles, licensing, REST API errors, and data locations."
type: reference
owner: Documentation
last_reviewed: 2026-11-05
---

# Profinity 2.3 breaking changes

These changes in Profinity 2.3 can affect an installation, integration, or plugin that works on 2.2.
Read them with [Upgrade from Profinity 2.2](../Installation/Upgrading/Upgrade_From_2_2.md) before you upgrade a production system.
The [Profinity 2.3 release notes](2.3.1.md) describe the new features and known issues.
If you already run a 2.3 patch release, the [Profinity 2.3.2 release notes](2.3.2.md) and the [Profinity 2.3.3 release notes](2.3.3.md) list the later changes.

Each section says who is affected, what changed, and what to do.
The sections start with the changes that affect every installation and end with the changes that affect plugin authors.

## Invalid settings files stop Profinity

All installations are affected.

Profinity 2.3 stops at startup when `config.yaml` or `security.yaml` has one of these problems:

- The file is empty.
- The file cannot be read as settings.
- The file has a key that Profinity 2.3 does not define.
- The file refers to an unset environment variable.

Profinity writes nothing, and the message names the file and the reason.
In 2.2, Profinity copied a damaged file aside and started with default settings, and with a default administrator for `security.yaml`.

Profinity 2.3 ignores these keys, which 2.2 wrote to `config.yaml` and 2.3 no longer uses:

- `adminRole`
- `appSettings.scripts.enabled`
- `bmsCalibration`
- `canReceiveRole`
- `canSendRole`
- `chargingRole`
- `cmuCalibration`
- `dbcViewerRole`
- `enableScripting`
- `internalUrls`
- `mcp`
- `securityRoles`
- `systemUpdateRole`
- `urls`
- `webSite`

Any other key that 2.3 does not define stops Profinity.

Run the preflight check before you upgrade a production system, especially if you edit settings files by hand or other tools generate them.
The check reads the data folder named in `PROFINITY_HOME`, and it writes nothing.
Replace `<data-folder>` with the path of the Profinity data folder.

=== "Linux"

    Run this command from the install folder:

    ```bash
    PROFINITY_HOME=<data-folder> Profinity --preflight-only
    ```

=== "Windows"

    Run these commands in Command Prompt, from the install folder:

    ```bat
    set PROFINITY_HOME=<data-folder>
    Profinity.exe --preflight-only
    ```

=== "Docker"

    Run this command with the same volume mount as the running container:

    ```bash
    docker run --rm -v "<host-folder>:/app/Prohelion" -e PROFINITY_HOME=/app/Prohelion <image> --preflight-only
    ```

    Replace `<host-folder>` with the host folder that the running container mounts, and `<image>` with the Profinity image.

Exit code 0 means the check passed, and exit code 2 means a file needs fixing.

If Profinity stops at startup, recover the file that the message names.

!!! warning "Deleting security.yaml resets its users, roles, and two-factor secrets"
    Copy the file to a safe place before you delete it.

1. Copy the file to a safe place.
2. Fix the file, or restore the safety copy by copying `<file>.bak` over it.
3. If neither works, delete the file to reset it.
4. Start Profinity again.

A container that restarts automatically repeats the message until the file is fixed.
Refer to [When a configuration file is invalid](../Administration/System_Configuration/Invalid_Configuration_Files.md).

Other settings files fall back to a default and record it in the log:

- `custom.yaml`: a damaged file turns off the trial.
- `plugins.yaml`: Profinity starts with an empty plugin list and registers plugin folders as disabled.
- `theme.yaml`: Profinity uses the default theme.

Every save of these settings files keeps one safety copy, `<file>.bak`.
Profinity records the last sign-in time in `user_activity.yaml`, so signing in leaves `security.yaml` unchanged.

## Security file format

All installations that upgrade from 2.2 are affected.

Profinity 2.3 replaces security groups with roles.
Each user holds assigned roles, and each role holds a list of permissions.
The default **Administrators** role holds every permission, including the Model Context Protocol (MCP) permission **MCP integration**.
[Roles and permissions](../Administration/Users_and_Access/Roles_and_Permissions.md) describes each role and permission.

Profinity checks the version of `security.yaml` when it loads the file, and writes `version: "2.3"` back.
It hashes the passwords that 2.2 stored when it first loads the file, and users sign in with the same password.

Hand-edited `security.yaml` files, such as those kept in source control, need the new keys.
The keys are camelCase on disk:

| 2.2 key | 2.3 key |
|---|---|
| The top-level `securityGroups` | `roles` |
| A user's `securityGroups` | `assignedRoles` |
| A group's `securityRoles` | The role's `permissions` |
| `Version` | `version: "2.3"` |

A file without `roles` loads with no error, and its users then hold no roles.
To keep each user's access:

1. Before you start Profinity 2.3, check that `security.yaml` holds `roles` and each user holds `assignedRoles`.
2. After Profinity starts, review the roles assigned to each user.

## Licensing

Installations that upgrade from 2.2 without a licence file are affected.

Features that were available without limit in 2.2 now depend on the edition.
A 2.2 installation without a licence file loses these features:

- Custom components
- Custom plugins
- Email, Slack, Webhook, and Message Queuing Telemetry Transport (MQTT) rule actions, and rule scripts that run on alert
- Extensions Web server
- InfluxDB v2, InfluxDB v3, TAG SQL, and TAG Local historians
- Profinity AI
- Remote web access
- Scripting
- Themes
- Two-factor authentication
- Users and roles

Apply a licence before you upgrade a production system that relies on any of these features, as described in [Apply a licence](../Installation/Applying_a_Licence.md).
[Features by edition](../Licensing.md#features-by-edition) lists the features in each edition.

## Data locations

Linux installations are affected, and so are backups, automation, and Docker volume mounts that refer to the 2.2 Linux path.

On Linux, the data folder changes from `~/.local/share/Prohelion/Profinity` to `/var/lib/prohelion/profinity`, unless `PROFINITY_HOME` is set.
Profinity moves existing data to the new folder on first start.
Profinity 2.3 ignores `XDG_DATA_HOME` on Linux.

Windows keeps `%LOCALAPPDATA%\Prohelion\Profinity`, and macOS keeps `~/Library/Application Support/Prohelion/Profinity`.
On those platforms, Profinity also moves data into that folder from three older locations:

- `~/Documents/Prohelion/Profinity`
- `~/Prohelion/Profinity`
- `prohelion/profinity`, the lowercase folder in the same application-data folder

On every platform, Profinity renames the `Profiles`, `Config`, and `Logs` folders to `profiles`, `config`, and `logs` on first start.

Update backups, automation, and Docker volume mounts that refer to the old Linux path.
Refer to [Artefacts directory](../Installation/Artifacts_Directory.md).

## Windows install with a Server licence accepts remote connections

Windows installations are affected, including the Windows service that `ProfinityService.cmd` registers.

In 2.2, a Windows installation served its web interface to the local computer only, whatever licence it held.
In 2.3, a Windows installation serves the local computer only until a Server licence is applied.
The Windows service is a desktop host, so it has no local trial.

With a Server licence, Profinity uses the address configured under **Profinity Web**.
It also creates the default `admin` account, so people on other computers can sign in.
The `admin` account must change its password at first sign-in.

The built-in sign-in that the desktop window uses is refused when it comes from another computer.
Restarting Profinity, for example after you apply a licence, keeps a desktop installation as a desktop installation.
Refer to [Who can sign in, by installation type](../Installation/Applying_a_Licence.md#who-can-sign-in).

## Profile files

Installations with a profile file under another name, a profile stored as a single file, or an unknown key in a profile are affected.

Profinity 2.3 reads a profile only from `profile.yaml` in the profile's folder.
Profinity 2.2 also accepted other profile file names, and at startup it turned a single profile file in the `profiles` folder into a profile folder.
Profinity 2.3 does neither.
It renames a `Profile.yaml` file to `profile.yaml` itself.

A key that Profinity does not define at the top level of a profile, such as a misspelt setting name, now stops the profile loading.
In 2.2, Profinity ignored the key.
When the active profile is invalid at startup, Profinity creates a new default profile, makes it the active profile, and writes the reason to the log.
The invalid file stays unchanged.

This check covers the top level of the profile only.
When Profinity saves the profile, it drops any setting that a component does not recognise.

To keep each profile loading:

1. Copy the profile's folder to a safe place, or download the profile as a pack, as described in [Download a profile pack](../Administration/Manage_Profiles.md#download-a-profile-pack).
2. If the profile file in the profile's folder has another name, rename that file to `profile.yaml`.
3. If the profile is a single file in the `profiles` folder, move it into a new folder in `profiles` named after the profile, and rename it `profile.yaml`.
4. If the log reports the profile as invalid, correct the key that the log names, then select the profile again in the **Profile** pill on the **ADMIN** page.

Refer to [When a configuration file is invalid](../Administration/System_Configuration/Invalid_Configuration_Files.md#profiles).

## Tag paths

Dashboards, scripts, and integrations that pass tag addresses are affected.

Tag addresses are slash paths, such as `Component/DBC/Message/Signal`.
Profinity 2.3 refuses these 2.2 forms:

- The dotted form that 2.2 dashboards and scripts used, such as `Component.Message.Signal`
- Dotted patterns that contain `*`
- The `[TimeSeries].` prefix
- The `{COMPONENT_NAME}` placeholder

Profinity 2.3 does not convert the addresses in dashboards written for 2.2, so change each address to the slash form.
Where a bind began with `{COMPONENT_NAME}`, use a path relative to the component, such as `DBC/Message/Signal`.

Check each dashboard after the upgrade, as described in the dashboard check in [Upgrade from Profinity 2.2](../Installation/Upgrading/Upgrade_From_2_2.md).
Refer to [Tag tree paths and dashboard binds](../Tags/Selecting_Tags/Tag_Tree_Path.md).

## Dashboard time range settings are renamed

Dashboards and API integrations that use `store`, `timeRangeStart`, or `timeRangeStop` are affected, and so are plugins that use the time range types.

Profinity 2.3 removes the `store` setting from dashboard bindings and from the `TagQuerySet` API.
It renames `timeRangeStart` and `timeRangeStop` to `start` and `stop`.
Profinity reads recent data from memory and older data from the designated historian, so a binding no longer names a store.

A dashboard that still uses `store`, `timeRangeStart`, or `timeRangeStop` is refused.
The message names the setting and says to use `start` and `stop`.
An API request that uses these names returns an error for that binding.

Profinity 2.3 does not convert these settings, so change each dashboard and integration after the upgrade.
Refer to [Binding settings reference](../Customising_Profinity/Dashboards/Data_Binding/Binding_Settings_Reference.md) for the settings that remain.

For plugin authors, the 2.3 software development kit (SDK) replaces `Store`, `TimeRangeStart`, and `TimeRangeStop` with `Start` and `Stop` on the `Bind`, `Chart`, `SourceBinding`, and `SourceValuePair` types.
It also removes `Store` and `DataStoreType`.
Rebuild each plugin against the 2.3 SDK.

## Rules, collections, and derived tags with an unknown key are skipped

All installations that use rules, collections, or derived tags are affected.

In 2.2, Profinity ignored a key that it did not define, and the rule, collection, or derived tag still worked.
In 2.3, Profinity skips an item with an unknown key, such as a misspelt setting name, and every other item still works.
A skipped rule is inactive, and a skipped collection or derived tag is unavailable for selection.
Profinity writes a line to the log for each skipped item, and the editors mark it with a red **Invalid** marker and the reason.

After the upgrade, open the rules, collections, and derived tags editors and correct each item marked **Invalid**.
Refer to [When a configuration file is invalid](../Administration/System_Configuration/Invalid_Configuration_Files.md#rules-collections-and-derived-tags).

## Uploads and imports are checked

Anyone who uploads dashboards or imports profile packs is affected.

Profinity checks an uploaded dashboard when you upload it, and refuses one that would fail to load.
It also refuses a profile pack whose `profile.yaml` is invalid, and removes anything it extracted.
In 2.2, Profinity accepted both, and the problem appeared later when the dashboard or profile loaded.
When a valid upload replaces a dashboard, rules file, or collections file, Profinity keeps the replaced file as `<file>.bak`.

If Profinity refuses an upload, correct the dashboard or pack and upload it again.
Refer to [Profile Dashboard](../Administration/Profile_Dashboard.md) and [Manage profiles](../Administration/Manage_Profiles.md).

## YAML documents

Tools that read or write Profinity YAML files directly are affected.

Profinity writes every YAML document it owns with camelCase keys, lowercase file and folder names, and `version: "2.3"`.
Older PascalCase files still load.
Profinity rewrites an older `security.yaml`, `profile.yaml`, or `config.yaml` in the new format when it loads the file.
It rewrites other documents when it saves them.

Before it rewrites a file on load, Profinity keeps the file it replaces beside it as `<file>.bak`, such as `security.yaml.bak`.
It keeps one copy per file.
If Profinity cannot save the copy, it leaves the file unchanged and writes an error to the log.

Profinity 2.3 ignores any other copy beside a settings file, such as a timestamped `.bak.` file, a `.corrupt-` copy, or a `.history` folder.
It leaves these copies in place, and excludes them from exported and imported profile packs.

Update any tool that reads these files directly to use the new key, file, and folder names.
Delete the older copies when you have finished with them.
If you edit the YAML of collections or rules by hand, re-save them in the visual editors after the upgrade.

## Settings in config.yaml

Administrators who configured single sign-on (SSO), provisioning, or event export in `security.yaml` are affected.

The OpenID Connect (OIDC) SSO settings are now in `config.yaml`.
So are the System for Cross-domain Identity Management (SCIM) provisioning settings and the security information and event management (SIEM) export settings.
`security.yaml` keeps users, roles, two-factor secrets, and external identity links.

Set them under **ADMIN > System Configuration**, in the **Security** section.
Saving System Configuration restarts Profinity.

## Site sign-in method

Sites that use SSO, per-user sign-in modes, or per-role two-factor settings are affected.

One site-wide **Sign-in method**, **Local** or **Sso**, replaces the per-user sign-in mode.
Every user on a site signs in with the same method.
On a **Local** site, **Enforce two-factor for local users** replaces the per-role two-factor setting, and applies to every local user.
SSO users sign in through the identity provider and link their account under **External identities (SSO)** in user settings.

Choose the sign-in method as described in [SSO and sign-in method](../Administration/System_Configuration/Security/SSO_and_Sign_In.md).

## REST API errors

Integrations that call the `/api/v2` REST API are affected.

Every `/api/v2` endpoint reports failure with the HTTP status code and an `application/problem+json` body, as defined in Request for Comments (RFC) 7807.
The `200 OK` response with `{"success": false}` is gone.
Other responses change as well:

| Request | Response |
|---|---|
| A setting fails validation | `422` or `400`, with an `errors` object whose keys are dotted setting paths |
| Create a resource | `201 Created`, with a `Location` header |
| Delete a resource | `204 No Content`, with an empty body |
| Read users or roles | A fixed set of fields, in place of the whole stored user or role |

SCIM keeps its own RFC 7644 error format, and the MCP tools are unchanged.

Profinity 2.3 removes the older data endpoints under `/api/v2/Data`:

| Removed endpoint | Use instead |
|---|---|
| `POST /api/v2/Data/Query` | `POST /api/v2/TagQuerySet` |
| `GET /api/v2/Data/QueryDelta/{sourceSet}` | `GET /api/v2/TagQuerySet/Delta/{sourceSet}` |
| `GET /api/v2/Data`, `/api/v2/Data/AllInfo`, `/api/v2/Data/{component}`, `/api/v2/Data/{component}/AllInfo`, and `/api/v2/Data/{component}/{message}/{signal}` | `GET /api/v2/Tags` for tag values |

Change any integration that reads a `success` flag or a `message` field to read the status code and the problem body instead.
Replace each call to a removed endpoint with the endpoint in the **Use instead** column.
Refer to [Profinity REST APIs](../Integrating_to_Profinity/APIs/index.md).

## Auto Connect replaces Auto Start

Profiles with loggers, historians, publishers, the Tag Relay sender, or the Open Platform Communications Unified Architecture (OPC UA) server are affected.

The setting that connects a component when the profile loads is now **Auto Connect** on every component that holds a connection.
In 2.2, loggers, historians, publishers, the Tag Relay sender, and the OPC UA server called it **Auto Start**.
Profinity 2.3 ignores the old setting.
The MQTT Subscriber and Tag Relay receiver gain **Auto Connect**, on by default, and a **Connect** / **Disconnect** switch.
Script components keep **Auto Start Script**.

If a profile turned **Auto Start** off for a component, turn **Auto Connect** off for that component.

## Connections start in Error instead of failing

Components that connect to a broker, device, server, or database are affected, and so is anything that relied on a failed start to detect a missing device.

A component that connects to another system now starts when that system is unavailable.
It shows **Error**, and retries every five seconds or at its own reconnect setting.
A component that showed **Off** after a failed start now shows **Error**.
The MQTT and Tag Relay subscribers retry at a steady interval, in place of backing off to 60 seconds.

To detect a missing device, watch for the **Error** status.

For plugin authors, `ManagedConnection` in `Profinity.Sdk` replaces a plugin's own reconnect scheduler.
`PolledDeviceController<TPoint>` in `Profinity.Sdk.Components` provides the connect, poll, sample, and write lifecycle for a device that is read by polling.
A protocol plugin then supplies only how to open its transport, and how to read and write one point.
Refer to [Connections and reconnecting](../Components/Connections_and_Reconnecting.md).

## Firmware passcodes

Users of Gen2 battery management systems (BMS) are affected.

Profinity holds the firmware configuration key and setup passcodes of a Gen2 BMS only for the current sign-in session, and keeps them out of the profile.

Enter the passcodes in the component's settings dialog, or when you unlock firmware on the firmware updates page.
Unlock again after each sign-in.
Refer to [Unlock administration firmware parameters](../Components/Battery_Management_Systems/Prohelion_BMU/Update_BMU_Configuration_and_Firmware.md#unlock-administration-firmware-parameters).

## BACnet device instance

Building Automation and Control Networks (BACnet) components are affected, especially those that left **Device instance** at its default of `0`.

The BACnet component reads the Device object of the device at its **Remote host**, and compares its instance with **Device instance**.
If the two numbers differ, the component neither connects to the device nor reads any of its points.
It shows **Error** with the reason, and retries.
The allowed range of **Device instance** is now `0` to `4194302`.

Set **Device instance** to the real instance of the device.
A component left at `0` needs this change before it can read points.
Refer to [BACnet](../Components/Industrial_Protocols/BACnet.md).

## OPC UA server listens on this computer only by default

OPC UA servers that other computers connect to are affected.

By default, the OPC UA server listens on `127.0.0.1` only.
A **Bind URL** saved as `0.0.0.0` or `localhost` is treated as `127.0.0.1`.
The server uses no security policy and accepts anonymous clients.

!!! warning "The OPC UA server accepts anonymous, unsecured connections"
    Set the **Bind URL** to the one network address that trusted clients use, and block the port (4840 by default) at the firewall for other networks.

If other computers connect to the server, set the **Bind URL** to the IP address or host name of the Profinity computer, such as `opc.tcp://192.168.1.20:4840/Profinity`.

## Default series window is now ten minutes

Plugins that ask for a local series without their own time range are affected.

`DataSource.DefaultLocalSeriesTimeRangeStart` in the plugin SDK changes from `-5m` to `-10m`.
A data source that asks for a local series without its own range now starts ten minutes back.
The value is a compile-time constant, so a plugin built against an earlier SDK keeps `-5m`.

Rebuild the plugin against the 2.3 SDK to use `-10m`.
