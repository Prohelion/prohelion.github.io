---
title: Profinity 2.3 breaking changes
description: "Check what Profinity 2.3 changes for existing installations, integrations, and plugins: security files, licensing, REST API errors, data locations and defaults."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Profinity 2.3 breaking changes

These changes in Profinity 2.3 can affect an installation, integration, or plugin that works on 2.2.
Read them with [Upgrade from Profinity 2.2](../Installation/Upgrade_From_2_2.md) before you upgrade a production system, and refer to the [Profinity 2.3 release notes](2.3.1.md) for the new features and known issues.
If you already run 2.3.1, read the [Profinity 2.3.2 release notes](2.3.2.md) for the changes in that patch.

## Security file format

All installations that upgrade from 2.2 are affected.
Security groups are removed: users receive assigned roles, and each role holds a list of permissions.
Profinity migrates `security.yaml` automatically when it loads the file and writes `version: "2.3"` back.
The default **Administrators** role holds every permission, including **MCP integration**.

Hand-edited `security.yaml` files, such as those kept in source control, need the new keys.
On disk the keys are camelCase: `securityGroups` becomes `roles`, a user's `securityGroups` becomes `assignedRoles`, a group's `securityRoles` becomes the role's `permissions`, and `Version` becomes `version: "2.3"`.
Check that `roles` and `assignedRoles` are present before you start Profinity, and review role assignments afterwards.
Passwords that 2.2 stored are converted to one-way hashes when the file first loads, and users sign in with the same password.
Refer to [Roles and Permissions](../Administration/Users_and_Access/Roles_and_Permissions.md).

## Settings in config.yaml

Administrators who configured OIDC single sign-on, SCIM provisioning or SIEM export in `security.yaml` now set them in `config.yaml`, under **ADMIN > System Configuration** in the **Security** section.
`security.yaml` keeps users, roles, two-factor secrets and external identity links.
Saving System Configuration restarts Profinity.

## Site sign-in method

The per-user sign-in mode and the per-role two-factor setting are replaced by one site policy: an administrator chooses Local or SSO, and on a Local site can require two-factor authentication for every local user.
SSO users sign in through the identity provider and link their account under **External identities (SSO)** in user settings.
A site cannot mix Local and SSO sign-in.
Refer to [SSO and Sign-In](../Administration/System_Configuration/Security/SSO_and_Sign_In.md).

## Licensing

Features that were available without limit in 2.2 now depend on the edition (refer to [Editions and licensing](2.3.1.md#editions-and-licensing)).
A 2.2 installation without a licence file loses remote web access, users and roles, two-factor authentication, Profinity AI, scripting, the InfluxDB v2, InfluxDB v3 and TAG SQL historians, themes, and the Email, Slack, Webhook, and MQTT rule actions and rule scripts that run on alert.
Upload a licence before you upgrade a production system that relies on any of them.

## REST API errors

Every `/api/v2` endpoint now reports failure with the HTTP status code and an RFC 7807 `application/problem+json` body, and no longer returns `200 OK` with `{"success": false}`.
Validation failures on settings return `422` or `400` with an `errors` object whose keys are dotted setting paths, creating a resource returns `201 Created` with a `Location` header, and deleting one returns `204 No Content` with no body.
The users and roles endpoints return a fixed set of fields rather than the whole stored user or role.
Integrations that read a `success` flag or a `message` field from the response body must read the status code and the problem body instead.
SCIM keeps its own RFC 7644 error format, and the MCP tools are unchanged.
The older data endpoints are no longer available under `/api/v2`, so integrations that call them must move to the tag, collection, rule, and alert endpoints.
Refer to [REST APIs](../Integrating_to_Profinity/APIs/index.md).

## Data locations

Linux moves from `~/.local/share/Prohelion/Profinity` to `/var/lib/prohelion/profinity`.
Windows stays at `%LOCALAPPDATA%\Prohelion\Profinity` and macOS stays at `~/Library/Application Support/Prohelion/Profinity`, and on those platforms Profinity also moves data from `~/Documents/Prohelion/Profinity`, `~/Prohelion/Profinity` and the opposite-casing folder under the application-data location.
Update backups, automation, and Docker volume mounts that refer to the old Linux path.
Refer to [Artefacts Directory](../Installation/Artifacts_Directory.md).

## YAML documents

Profinity writes every YAML document it owns with camelCase keys, lowercase file and folder names, and `version: "2.3"`.
Older PascalCase files still load.
Profinity rewrites an older `security.yaml`, `profile.yaml` or `config.yaml` in the new format when it loads it, and rewrites other documents when it saves them, so only tooling that reads these files directly needs to change.
Before it rewrites a file on load, Profinity saves a copy beside it with `.bak.` and a timestamp added to the name, such as `security.yaml.bak.20261024-101500123`, and keeps the three most recent copies.
If Profinity cannot save the copy, it leaves the file unchanged and writes an error to the log.
Re-save collections and rules in the visual editors after the upgrade if you edit their YAML by hand.

## Tag paths

Tag addresses are slash paths, such as `Component/DBC/Message/Signal`.
Profinity 2.3 no longer accepts the dotted form that 2.2 dashboards and scripts used, such as `Component.Message.Signal`, the `[TimeSeries].` prefix, or dotted patterns that contain `*`.
The `{COMPONENT_NAME}` placeholder is also removed, so a bind that began with it must use a path relative to the component instead, such as `DBC/Message/Signal`.
Dashboards, scripts, and integrations that pass these addresses must switch to the slash form.
Profinity 2.3 does not convert dashboards written for 2.2, so check each one after the upgrade (refer to step 7 of [Upgrade from Profinity 2.2](../Installation/Upgrade_From_2_2.md)).
Refer to [Tag tree paths and dashboard binds](../Tags/Selecting_Tags/Tag_Tree_Path.md).

## Firmware passcodes

Gen2 battery management systems no longer keep the firmware configuration key or setup passcodes in the profile.
Users enter them in the component's settings dialog, and Profinity holds them only for that sign-in session, so anything that relied on a stored passcode must be unlocked again after each sign-in.

## BACnet device instance

The BACnet component now reads the Device object of the device at its **Remote host** and compares the instance with **Device instance**, and it does not connect to, or read any point of, a device that reports a different number: the component shows **Error** with the reason and retries.
A BACnet component that left **Device instance** at its default of `0` stops reading points until the setting is changed to the real instance of the device.
The allowed range is now `0` to `4194302`.
Refer to [BACnet](../Components/Industrial_Protocols/BACnet.md).

## Auto Connect replaces Auto Start

The setting that connects a component when the profile loads is now called **Auto Connect** on every component that holds a connection.
Loggers, historians, publishers, the Tag Relay sender and the OPC UA server previously called it **Auto Start**, and the old setting is no longer read, so a profile that turned **Auto Start** off must have **Auto Connect** turned off.
The MQTT Subscriber and Tag Relay receiver gain **Auto Connect**, on by default, and a **Connect** / **Disconnect** switch.
Script components keep **Auto Start Script**.

## Connections start in Error instead of failing

A component that connects to a broker, device, server, or database no longer refuses to start when the other end is unavailable.
It starts, shows **Error**, and retries every 5 seconds, or at its own reconnect setting.
A component that used to show **Off** after a failed start now shows **Error**, and anything that relied on a start failure to detect a missing device should watch the status instead.
The MQTT and Tag Relay subscribers retry at a steady interval instead of backing off to 60 seconds.
For plugin authors, `ManagedConnection` in `Profinity.Sdk` replaces the need for a plugin to keep its own reconnect scheduler, and `PolledDeviceController<TPoint>` in `Profinity.Sdk.Components` provides the whole connect, poll, sample, and write lifecycle for a device that is read by polling, so a protocol plugin supplies only how to open its transport and read and write one point.
Refer to [Connections and Reconnecting](../Components/Connections_and_Reconnecting.md).

## Default series window is now ten minutes

`DataSource.DefaultLocalSeriesTimeRangeStart` in the plugin SDK changed from `-5m` to `-10m`, so a data source that asks for a local series without its own range now starts ten minutes back.
The value is a compile-time constant, so a plugin built against an earlier SDK keeps `-5m` until you rebuild it against the 2.3 SDK.

## Windows install with a Server licence accepts remote connections

A Windows installation, including the Windows service that `ProfinityService.cmd` registers, used to serve its web interface to the local computer only, whatever licence it held.
With a Server licence it now uses the address configured under **Profinity Web**, and it creates the default `admin` account (password change required at first sign-in) so people on other computers can sign in.
Without a Server licence nothing changes.
The built-in sign-in used by the application window is refused when it arrives from another computer.
An engine restart, for example after you apply a licence, now keeps a desktop installation a desktop installation, where before it started behaving as a server host.

## OPC UA server listens on this computer only by default

The OPC UA server now listens on `127.0.0.1` only unless you give it another address.
An earlier build listened on every network interface by default while the documentation said localhost only, and the server uses no security policy and accepts anonymous clients.
A **Bind URL** saved as `0.0.0.0` or `localhost` is treated as `127.0.0.1`.
If other computers connect to your OPC UA server, set the **Bind URL** to the IP address or host name of the Profinity computer, such as `opc.tcp://192.168.1.20:4840/Profinity`.
