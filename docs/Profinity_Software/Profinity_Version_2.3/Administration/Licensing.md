---
title: Licensing
description: "Find which features each Profinity edition includes and how a licence, the custom.yaml file and site configuration combine to decide what is available."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Licensing

Profinity uses an offline, signed licence file to control which commercial features and components are available on an instance.
There is no activation service and no online licence check: Profinity is designed to run on remote or air-gapped edge machines, so licensing works entirely from a file placed on the instance and a signature that Profinity validates locally.
To apply a licence file, refer to [Apply a licence](../Installation/Applying_a_Licence.md), and to read the licence state of an instance, refer to [License page](License_Page.md).

A licence sets the commercial **ceiling** for the instance.
The set of available components is the combination of the licence, the OEM customisation file (`custom.yaml`), and the site configuration (`config.yaml`), and a component is only available when all three allow it (refer to [Choose available components](Choose_Available_Components.md)).
A licensed feature is controlled by the licence alone, apart from scripting, which `config.yaml` can also switch off.
Config-level toggles can narrow what the licence permits, but never grant more than the licence allows.

## What each edition includes

Not every feature described in this documentation is available on every instance.
The core product is substantial: the features marked **Yes** in every column are available in every edition, including an unlicensed instance, and a licence adds the rest.
In the table, **Yes** means the feature is included, **No** means it is not included, and **Add-on** means it is licensed separately.

### Features by edition

| Feature | Unlicensed (Personal use only) | Desktop | Server | Enterprise |
|---------|:----------:|:-------:|:------:|:----------:|
| Local web UI (reachable from the same computer only) and the Representational State Transfer (REST) [API](../Integrating_to_Profinity/APIs/index.md) | Yes | Yes | Yes | Yes |
| Tags: [tag tree](../Tags/index.md), [derived tags](../Tags/Derived_Tags/index.md), [expressions](../Tags/Selecting_Tags/Tag_Expressions.md), [linking](../Tags/Create_Collections_Rules_and_Bindings_from_Tags.md), [collections](../Tags/Collections/index.md), and [logging and replay](../Tags/Tag_Logs/index.md) | Yes | Yes | Yes | Yes |
| [Dashboards](../Customising_Profinity/Dashboards/index.md) and the [Dashboard component](../Components/Dashboard/Dashboard_Component.md), plus [kiosk mode](Kiosk_Mode.md) | Yes | Yes | Yes | Yes |
| [Rules](../Tags/index.md), the [Alerts Log](../Tags/Alerts.md) and the built-in Profinity Log [action](../Tags/Rules/Actions/index.md) | Yes | Yes | Yes | Yes |
| Device components: [battery management systems](../Components/Battery_Management_Systems/index.md), [motor controllers](../Components/Motor_Controller/index.md), [chargers and power](../Components/Chargers_and_Power/index.md), and [MPPTs](../Components/MPPT/Elmar_Solar_MPPT.md) | Yes | Yes | Yes | Yes |
| CAN adapters: [CAN bus adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) and the [virtual CAN adapter](../Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md) | Yes | Yes | Yes | Yes |
| CAN utilities: [send and receive](../CAN_Utilities/Send_Receive_CAN_Bus_Messages.md), [logging and replay](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md), and [DBC files](../CAN_Utilities/CAN_Bus_DBC.md) | Yes | Yes | Yes | Yes |
| Loggers: [file and SFTP loggers](../Components/Loggers/index.md), and the [InfluxDB (v1) and Prometheus loggers](../Components/Loggers/index.md) | Yes | Yes | Yes | Yes |
| [Scripting](../Developing_with_Profinity/Scripting/index.md) in [C#, Lua and Python](../Developing_with_Profinity/Scripting/Supported_Languages/index.md) | No | Yes | Yes | Yes |
| [Custom components](../Components/Custom_Components/Using_a_Custom_Component.md) | No | Yes | Yes | Yes |
| Custom plugins: [custom plugins](../Developing_with_Profinity/Plugins/index.md) and [dynamic-link library (DLL) plugins](Install_and_Manage_Plugins.md) | No | Yes | Yes | Yes |
| Historians: [InfluxDB v2](../Components/Historians/InfluxDB_Historians.md), [InfluxDB v3](../Components/Historians/InfluxDB_Historians.md) and [TAG SQL](../Components/Historians/TAG_SQL_Historian.md) | No | Yes | Yes | Yes |
| [Themes and branding](../Customising_Profinity/Theming/index.md) | No | Yes | Yes | Yes |
| Tag Rule Actions: Email, Slack, Webhook, and Message Queuing Telemetry Transport (MQTT) [rule actions](../Tags/Rules/Actions/index.md), and the C#, Python and Lua rule scripts that run when an alert fires | No | No | Yes | Yes |
| Data Relay: [Tag Relays](../Components/Tag_Relays/index.md) ([sender](../Components/Tag_Relays/Tag_Relay_Sender.md), [receiver](../Components/Tag_Relays/Tag_Relay_Receiver.md)), [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md), [MQTT Subscriber](../Components/Publishers_and_Subscribers/MQTT_Subscriber.md), [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) and the [Cloud Dashboard](../Components/Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | No | No | Yes | Yes |
| [Two-Factor Authentication](System_Configuration/Security/Two_Factor_Authentication.md) | No | No | Yes | Yes |
| Profinity AI: [AI Chat](../Profinity_AI/AI_Chat.md), [AI settings](System_Configuration/AI_Settings.md) and the Model Context Protocol (MCP) [server](../Integrating_to_Profinity/MCP_Server/index.md) | No | No | Yes | Yes |
| Profinity Server: [Users & Groups](Users_and_Access/Manage_Users.md), [Roles](Users_and_Access/Roles_and_Permissions.md), remote (non-localhost) web access and the [Extensions Web](System_Configuration/Extensions_Web.md) server | No | No | Yes | Yes |
| Enterprise Security: [single sign-on (SSO)](System_Configuration/Security/SSO_and_Sign_In.md), [System for Cross-domain Identity Management (SCIM) provisioning](System_Configuration/Security/SCIM_and_SIEM.md) and [security-key sign-in](System_Configuration/Security/Two_Factor_Authentication.md#security-key-sign-in) | No | No | No | Yes |
| [Industrial Protocols](../Components/Industrial_Protocols/index.md): [BACnet](../Components/Industrial_Protocols/BACnet.md), [EtherNet/IP](../Components/Industrial_Protocols/EtherNet_IP.md), [Modbus](../Components/Industrial_Protocols/Modbus.md), [Open Platform Communications Unified Architecture (OPC UA)](../Components/Industrial_Protocols/index.md) and [S7](../Components/Industrial_Protocols/S7.md) | No | Add-on | Add-on | Add-on |
| [Profinity software development kit (SDK)](../Developing_with_Profinity/SDK.md): the `Profinity.Sdk` library, [`profinity-component-pack`](../Developing_with_Profinity/Custom_Components/Component_Pack_CLI.md) and `profinity-script` | No | Add-on | Add-on | Add-on |

- **Unlicensed** is the state of a Desktop installation with no licence file, and of any instance after its 14-day local trial expires.
  Unlicensed Desktop use is limited to personal, non-commercial purposes, as described in [Desktop free-use policy](Trial_Desktop_Use_and_Fingerprint.md#desktop-free-use-policy).
- Without Profinity Server there are no user accounts or roles, and **Users & Groups** is not shown.
  A Desktop installation runs as a single built-in admin user.
- Kiosk Mode is included in every edition, but it signs a display in as an enabled Profinity user, and a dedicated kiosk user is created in **Users & Groups**, which needs Profinity Server.
  Refer to [Kiosk Mode](Kiosk_Mode.md).
- Themes and branding show **No** for an unlicensed instance.
  The instance keeps its `theme.yaml` file but shows the default Profinity appearance until a Desktop or higher licence is installed.
- The 14-day local trial and sales evaluation licences include everything in the **Server** edition, but not **Enterprise Security**.
  Refer to [The 14-day local trial](Trial_Desktop_Use_and_Fingerprint.md#the-14-day-local-trial).
- **Add-on** means something licensed separately from the edition, available on any commercial edition.
  Industrial Protocols is a component group that needs the matching plugin installed as well, and the partner hardware component packs are licensed in the same way as component groups.
  The Profinity SDK is a developer kit that Prohelion supplies on request.
- Pages for licence-dependent features carry a **Licence required** note at the top.
  The [License page](License_Page.md) in the product is always the authority for your instance, because configuration can further narrow what a licence allows.

!!! warning "Remote web access needs Profinity Server"
    Without a **Profinity Server** licence, including on a Desktop host, Profinity listens for web connections on `127.0.0.1` only, which means the web interface and API can be reached from the same computer and not from another one.
    This applies to an unlicensed instance and to an instance whose 14-day local trial has expired.
    When the web server starts, Profinity forces any HTTP or HTTPS address that is not a loopback address, such as `0.0.0.0`, to `127.0.0.1`, whatever is entered under [Profinity Web](System_Configuration/Profinity_Web.md) and even if `Config.yaml` holds another value, and records a message beginning "Remote web access requires a Server license" in the [Profinity log](Logs_Config.md).
    A user who cannot reach Profinity from another computer should check the licence on the **License** page before changing the address or the firewall.

Opening the Profinity web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include.
Local access on the same machine needs no licence.
A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features, and then drops to the unlicensed feature set, so remote access and user accounts stop working until a licence file is applied under **ADMIN > License**.
Production use of Profinity Server on Windows, Docker, Linux, or macOS needs a licence from Prohelion; contact Prohelion through the [Prohelion contact page](https://www.prohelion.com/contact-us/).

## Hardware requirements {#hardware-requirements-and-remote-access}

Profinity Server does not require any additional Prohelion hardware to run.
It can be used as a general-purpose development framework for building web UIs for CAN bus based architectures, or for providing a server interface to CAN infrastructure with cloud connectivity.

When not using Prohelion hardware, a way to connect to the CAN bus network is still required; refer to [CAN Adapters](../Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) for supported CAN bus adapters.

Refer to [Trial licence, Desktop use and machine fingerprint](Trial_Desktop_Use_and_Fingerprint.md) for how the local trial, Desktop use and the fingerprint work, and to [Apply a licence](../Installation/Applying_a_Licence.md) for the steps to install a licence file.

## Related documentation

- [System Information](System_Info.md): instance version and licence summary shown alongside other system details.
- [Roles and Permissions](Users_and_Access/Roles_and_Permissions.md): assigning the **Security administration** permission needed to manage licences.
- [System Configuration](System_Configuration/index.md): the site-level configuration layer that can narrow, but never exceed, what the licence permits.
