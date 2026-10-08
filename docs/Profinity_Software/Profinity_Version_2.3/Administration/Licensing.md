---
title: Licensing
description: "Manage Profinity licensing with offline signed licence files, check feature entitlements, and configure trial licences."
---

# Licensing

Profinity uses an offline, signed licence file to control which commercial features and components are available on an instance. There is no activation service and no online licence check: Profinity is designed to run on remote or air-gapped edge machines, so licensing works entirely from a file placed on the instance and a signature that Profinity validates locally.

A licence sets the commercial **ceiling** for the instance. The final set of available features and components is the combination of the licence, the OEM customisation file (`Custom.yaml`), and the site configuration (`config.yaml`); a feature is only available when all three allow it, with the exception of themes and branding, which are a contractual term and are not blocked technically (see [Themes and Branding](../Customising_Profinity/Theming/index.md)). Config-level toggles can narrow what the licence permits, but never grant more than the licence allows.

## What Each Edition Includes

Not every feature described in this documentation is available on every instance. The core product is substantial: the features marked **Yes** in every column are available in every edition, including an unlicensed instance, and a licence adds the rest. In the table, **Yes** means the feature is included, **No** means it is not included, and **Add-on** means it is licensed separately.

### Features by Edition

| Feature | Unlicensed (Personal use only) | Desktop | Server | Enterprise |
|---------|:----------:|:-------:|:------:|:----------:|
| Local web UI (reachable from the same computer only) and the Representational State Transfer (REST) [API](../Integrating_to_Profinity/APIs/index.md) | Yes | Yes | Yes | Yes |
| Tags: [tag tree](../Tags/index.md), [derived tags](../Tags/Derived_Tags.md), [expressions](../Tags/Tag_Expressions.md), [linking](../Tags/Tag_Linking.md), [collections](../Tags/Collections.md), [logging and replay](../Tags/Logging_Replaying_Tags.md) | Yes | Yes | Yes | Yes |
| [Dashboards](../Customising_Profinity/Dashboards/index.md) and the [Dashboard component](../Components/Dashboard/index.md), plus [kiosk mode](Kiosk_Mode.md) | Yes | Yes | Yes | Yes |
| [Rules](../Tags/index.md), the [Alerts Log](../Tags/Alerts.md) and the built-in Profinity Log [action](../Tags/Actions.md) | Yes | Yes | Yes | Yes |
| Device components: [battery management systems](../Components/Battery_Management_Systems/index.md), [motor controllers](../Components/Motor_Controller/index.md), [chargers and power](../Components/Chargers_and_Power/index.md) and [MPPTs](../Components/MPPT/index.md) | Yes | Yes | Yes | Yes |
| CAN adapters: [CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) and the [virtual CAN adapter](../Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md) | Yes | Yes | Yes | Yes |
| CAN utilities: [send and receive](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md), [logging and replay](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) and [DBC files](../CAN_Utilities/CAN_Bus_DBC.md) | Yes | Yes | Yes | Yes |
| Loggers: [file and SFTP loggers](../Components/Loggers/File_Loggers.md), and the [InfluxDB (v1) and Prometheus loggers](../Components/Loggers/InfluxDB_Prometheus_Logger.md) | Yes | Yes | Yes | Yes |
| [Scripting](../Developing_with_Profinity/Scripting/index.md) in [C#, Lua and Python](../Developing_with_Profinity/Scripting/Supported_Languages/index.md) | No | Yes | Yes | Yes |
| Custom extensions: [custom plugins](../Developing_with_Profinity/Plugins/index.md), [dynamic-link library (DLL) plugins](Components_and_Plugins.md) and [custom components](../Components/Custom_Components/index.md) | Yes | Yes | Yes | Yes |
| Historians: [InfluxDB v2](../Components/Historians/InfluxDB_v2_Historian.md), [InfluxDB v3](../Components/Historians/InfluxDB_v3_Historian.md) and [TAG SQL](../Components/Historians/TAG_SQL_Historian.md) | No | Yes | Yes | Yes |
| [Themes and branding](../Customising_Profinity/Theming/index.md) | No | Yes | Yes | Yes |
| Tag Rule Actions: Email, Slack, Webhook and Message Queuing Telemetry Transport (MQTT) [rule actions](../Tags/Actions.md), and the C#, Python and Lua rule scripts that run when an alert fires | No | No | Yes | Yes |
| Data Relay: [Tag Relays](../Components/Tag_Relays/index.md) ([sender](../Components/Tag_Relays/Tag_Relay_Sender.md), [receiver](../Components/Tag_Relays/Tag_Relay_Receiver.md)), [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md), [MQTT Subscriber](../Components/Publishers_and_Subscribers/MQTT_Subscriber.md), [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) and the [Cloud Dashboard](../Components/Cloud_Dashboard/index.md) | No | No | Yes | Yes |
| [Two-Factor Authentication](System_Configuration/Security/Two_Factor_Authentication.md) | No | No | Yes | Yes |
| Profinity AI: [AI Chat](../Profinity_AI/AI_Chat.md), [AI settings](System_Configuration/AI_Settings.md) and the Model Context Protocol (MCP) [server](../Integrating_to_Profinity/MCP_Server.md) | No | No | Yes | Yes |
| Profinity Server: [Users & Groups](Users_and_Access/Manage_Users.md), [Roles](Users_and_Access/Roles_and_Permissions.md), remote (non-localhost) web access and the [Extensions Web](System_Configuration/Extensions_Web.md) server | No | No | Yes | Yes |
| Enterprise Security: [single sign-on (SSO)](System_Configuration/Security/SSO_and_Sign_In.md), [System for Cross-domain Identity Management (SCIM) provisioning](System_Configuration/Security/SCIM_and_SIEM.md) and [security-key sign-in](System_Configuration/Security/Two_Factor_Authentication.md#security-key-sign-in) | No | No | No | Yes |
| [Industrial Protocols](../Components/Industrial_Protocols/index.md): [BACnet](../Components/Industrial_Protocols/BACnet.md), [EtherNet/IP](../Components/Industrial_Protocols/EtherNet_IP.md), [Modbus](../Components/Industrial_Protocols/Modbus.md), [Open Platform Communications Unified Architecture (OPC UA)](../Components/Industrial_Protocols/OPC_UA.md) and [S7](../Components/Industrial_Protocols/S7.md) | No | Add-on | Add-on | Add-on |
| [Profinity software development kit (SDK)](../Developing_with_Profinity/SDK.md): the `Profinity.Sdk` library, [`profinity-component-pack`](../Developing_with_Profinity/Custom_Components/Component_Pack_CLI.md) and `profinity-script` | No | Add-on | Add-on | Add-on |

- **Unlicensed** is the state of a Desktop installation with no licence file, and of any instance after its 14-day local trial expires. Unlicensed Desktop use is limited to personal, non-commercial purposes, as described in [Desktop Free-Use Policy](#desktop-free-use-policy).
- Without Profinity Server there are no user accounts or roles, and **Users & Groups** is not shown. A Desktop installation runs as a single built-in admin user.
- Kiosk Mode is included in every edition, but it signs a display in as an enabled Profinity user, and a dedicated kiosk user is created in **Users & Groups**, which needs Profinity Server. See [Kiosk Mode](Kiosk_Mode.md).
- Themes and branding show **No** for an unlicensed instance because they need a commercial licence with white-label rights, although Profinity does not block the theme technically.
- The 14-day local trial and sales evaluation licences include everything in the **Server** edition, but not **Enterprise Security**.
- **Add-on** means something licensed separately from the edition, available on any commercial edition. Industrial Protocols is a component group that needs the matching plugin installed as well, and the Rinstrum and Vaulta hardware component packs are licensed in the same way as component groups. The Profinity SDK is a developer kit that Prohelion supplies on request.
- Pages for licence-dependent features carry a **Licence required** note at the top. The **License** page in the product is always the authority for your instance, because configuration can further narrow what a licence allows.

!!! warning "Remote Web Access Needs Profinity Server"
    Without a **Profinity Server** licence, and on every Desktop host, Profinity listens for web connections on `127.0.0.1` only, which means the web interface and API can be reached from the same computer and not from another one. This applies to an unlicensed instance and to an instance whose 14-day local trial has expired. When the web server starts, Profinity forces any HTTP or HTTPS address that is not a loopback address, such as `0.0.0.0`, to `127.0.0.1`, whatever is entered under [Profinity Web](System_Configuration/Profinity_Web.md), and records the message "Remote web access requires a Server license." in the [Profinity log](Logs_Config.md). A user who cannot reach Profinity from another computer should check the licence on the **License** page before changing the address or the firewall.

## Check Licence Status

Select **ADMIN** in the side menu, then **License**. A user needs the **Security administration** permission to view or change this page.

The page shows:

- **State**: `Valid`, `Trial`, `Expiring`, `Expired`, `Invalid`, `WrongInstance`, `UnsupportedVersion`, or `Missing`. A licence file whose expiry is 30 days or less away is reported as `Expiring` instead of `Valid` or `Trial`.
- **Type**: `Commercial`, `Trial`, or `LocalTrial` (the automatic in-product trial).
- **Edition**: the commercial edition name, shown for information only, because availability follows the individual features and components in the licence.
- **Customer**: the customer name or ID recorded on the licence.
- **Expires**: the expiry date and, where applicable, the number of days remaining.
- **Fingerprint**: the unique identifier for this installation, with a button to copy it.
- **Licensed features**: a table of every product feature, whether it is licensed, whether it is currently available (licensed **and** not blocked by configuration), and, if unavailable, what is blocking it.
- **Licensed component groups**: the same status for licensed component groups, such as protocol or hardware-integration bundles.

<figure markdown>
![License page showing state, edition, expiry, fingerprint, and the licensed features and component tables](../images/2.3-license-status-entitlements.png)
<figcaption>ADMIN, Then License: Status, Entitlements and Fingerprint</figcaption>
</figure>

Component groups are licensed separately from product features. For example, the BACnet, EtherNet/IP, Modbus, OPC UA and S7 [industrial protocol plugins](../Components/Industrial_Protocols/index.md) all require the **Industrial Protocols** component group, whereas [Tag Relays](../Components/Tag_Relays/index.md) require the **Data Relay** feature. Without the matching entitlement the components show as unavailable, even when the plugin is installed.

!!! info "Available Versus Licensed"
    A feature can be licensed but still unavailable, for example when it has been turned off in site configuration. The **Licensed** column always reflects the licence file; the **Available** column reflects the actual runtime state and names the layer responsible when it is blocked.

## Upload a New Licence

To apply a commercial or evaluation licence:

1. Select **ADMIN** in the side menu, then **License**.
2. Copy the fingerprint shown on the page and send it to Prohelion through the normal sales or support channel.
3. On the **License** page, use **Update license file** and select the `license.yaml` file that Prohelion returns.

Prohelion signs a `license.yaml` file for that fingerprint and returns it, and if the instance has no network access the file is transferred to the machine running Profinity, for example by USB drive or secure file copy, before step 3.

Profinity validates the file's signature and expiry, and checks that its fingerprint matches the instance, before applying it. If validation fails, Profinity rejects the upload and the existing licence, if any, remains in effect. A `license.yaml` file can also be installed without using the UI, by copying it directly into the instance's licence folder; this is the usual path for headless or scripted deployments.

!!! warning "The Fingerprint Is Instance-Specific"
    A licence is signed for one machine's fingerprint. A licence issued for one instance does not apply to another, and Profinity reports the state as `WrongInstance` if an administrator uploads a licence issued for a different machine.

## The 14-Day Local Trial

A Profinity instance that has never had a licence applied issues itself a one-time, 14-day, server-tier trial automatically on first startup, provided the installer build has trial issuance enabled; some OEM-customised builds may not offer this local trial. This local trial:

- Requires no network access and no request to Prohelion.
- Runs for a maximum of 14 days from first startup.
- Grants server-tier entitlements (the same feature set as a standard `Commercial` server licence), not enterprise-only features.
- Is issued once per installation. Reinstalling or resetting the instance does not restart the trial, because the trial is recorded against the instance fingerprint.
- Reports the state `Expiring` for its whole duration rather than `Trial`, because Profinity marks any local trial with 30 days or less remaining as `Expiring` and the local trial never lasts longer than 14 days. The `Trial` state appears only for a signed trial licence file with more than 30 days remaining.
- Is not available on Desktop hosts, which have a separate free-use policy (see below).

!!! warning "When the Local Trial Expires"
    When the 14-day trial ends, Profinity drops the instance to the same unlicensed entitlement set a Desktop installation uses, and shows an expiry notice on the Home screen linking to the **License** pill on the **ADMIN** page. Profinity does not stop, lock users out, or switch to a read-only mode: the engine keeps running, and features and components outside the unlicensed set become unavailable until a suitable commercial or extended evaluation licence is uploaded.

## Desktop Free-Use Policy

An unlicensed Desktop installation is provided for personal, non-commercial use only and must not be used for commercial purposes. Commercial use requires a purchased Desktop licence from Prohelion. A Desktop installation does not need a licence for personal use, and does not issue or consume the automatic local trial described above. It keeps the unlicensed entitlement set indefinitely and shows a notice on the Home screen explaining the non-commercial-use restriction and directing commercial users to contact Prohelion to purchase a Desktop licence. If a trial or commercial `license.yaml` is installed on a Desktop host manually, Profinity validates and applies it in the same way as on a server host.

## The Machine Fingerprint

The fingerprint is a value computed from the installation itself, unique to that machine and Profinity install. It has two purposes:

- It ties a signed `license.yaml` to one specific installation, so a licence file cannot be copied to another machine and reused.
- It is the only piece of information an administrator needs to send to Prohelion to request a licence or evaluation, which keeps the process usable for edge machines with no internet access.

## REST API

| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/v2/License` | Returns licence status and the entitled features and components lists. Requires **Security administration**. |
| GET | `/api/v2/License/Fingerprint` | Returns the instance fingerprint used to request a licence. Requires **Security administration**. |
| PUT | `/api/v2/License` | Uploads and applies a `license.yaml` document, validating signature, expiry, and fingerprint before saving it. Requires **Security administration**. |
| GET | `/api/v2/Availability/Features` | Returns the current availability of every product feature, with the blocking layer named where a feature is unavailable. Requires an authenticated user. |

## Related Documentation

- [System Information](System_Info.md): instance version and licence summary shown alongside other system details.
- [Roles and Permissions](Users_and_Access/Roles_and_Permissions.md): assigning the **Security administration** permission needed to manage licences.
- [System Configuration](System_Configuration/index.md): the site-level configuration layer that can narrow, but never exceed, what the licence permits.
