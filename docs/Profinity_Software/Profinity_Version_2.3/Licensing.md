---
title: Licensing
description: "Find which features each Profinity edition includes, how licence and site settings combine, and how the 14-day trial and machine fingerprint work."
type: reference
owner: Documentation
last_reviewed: 2026-10-20
---

# Licensing

Profinity uses an offline, signed licence file to control which commercial features and components are available on an instance.
Profinity has no activation service and makes no online licence check, because it is designed to run on remote or air-gapped edge machines.
Licensing works from a file placed on the instance, and Profinity validates the file's signature locally.
To apply a licence file, refer to [Apply a licence](Installation/Applying_a_Licence.md), and to read the licence state of an instance, refer to [License manager](Administration/License_Manager.md).

A licence sets the most that an instance can use.
A component is available only when the licence, the original equipment manufacturer (OEM) customisation file (`custom.yaml`), and the site configuration (`config.yaml`) all allow it.
Refer to [Choose available components](Administration/Choose_Available_Components.md).
A licensed feature is controlled by the licence alone, apart from scripting, which `config.yaml` can also switch off.
Configuration toggles can narrow what the licence permits, but never grant more.

## What each edition includes

Not every feature described in this documentation is available on every instance.
The features ticked in every column are available in every edition, including an unlicensed instance, and a licence adds the rest.
In the table, :material-check-circle:{ .edition-icon .edition-icon--yes aria-hidden="true" } means the feature is included, :material-close-circle-outline:{ .edition-icon .edition-icon--no aria-hidden="true" } means it is not included, and :material-plus-circle:{ .edition-icon .edition-icon--addon aria-hidden="true" } **Add-on** means it is licensed separately.

### Features by edition

The first eight rows are included in every edition.
Each edition also includes everything in the edition before it.
The remaining rows differ by edition:

- Unlicensed: none of the remaining rows are included.
- Desktop: adds Scripting, Custom components, Custom plugins, Historians, and Themes and branding, and has Industrial Protocols and the SDK as separately licensed extras.
- Server: adds Tag Rule Actions, Data Relay, Two-Factor Authentication, Profinity AI, and Profinity Server, and has the same two separately licensed extras.
- Enterprise: adds Enterprise Security, so only the two separately licensed extras remain.

| Feature | Unlicensed (Personal use only) | Desktop | Server | Enterprise |
|---------|:----------:|:-------:|:------:|:----------:|
| Local web UI (reachable from the same computer only) and the Representational State Transfer (REST) [API](Integrating_to_Profinity/APIs/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Tags: [tag tree](Tags/index.md), [derived tags](Tags/Derived_Tags/index.md), [expressions](Tags/Selecting_Tags/Tag_Expressions.md), [linking](Tags/Create_Collections_Rules_and_Bindings_from_Tags.md), [collections](Tags/Collections/index.md), and [logging and replay](Tags/Tag_Logs/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Dashboards](Customising_Profinity/Dashboards/index.md) and the [Dashboard component](Components/Dashboard/Dashboard_Component.md), plus [kiosk mode](Administration/Kiosk_Mode.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Rules](Tags/index.md), the [Alerts Log](Tags/Alerts.md) and the built-in Profinity Log [action](Tags/Rules/Actions/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Device components: [battery management systems](Components/Battery_Management_Systems/index.md), [motor controllers](Components/Motor_Controller/index.md), [chargers and power](Components/Chargers_and_Power/index.md), and [maximum power point trackers (MPPTs)](Components/MPPT/Elmar_Solar_MPPT.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| CAN adapters: [CAN bus adapters](Components/CAN_Bus_Protocols/CAN_Bus_Adapters.md) and the [virtual CAN adapter](Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| CAN utilities: [send and receive](CAN_Utilities/Send_Receive_CAN_Bus_Messages.md), [logging and replay](CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md), and [DBC files](CAN_Utilities/CAN_Bus_DBC.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Loggers: [file and SFTP loggers](Components/Loggers/index.md), and the [InfluxDB (v1) and Prometheus loggers](Components/Loggers/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Scripting](Developing_with_Profinity/Scripting/index.md) in [C#, Lua and Python](Developing_with_Profinity/Scripting/Supported_Languages/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Custom components](Components/Custom_Components/Using_a_Custom_Component.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Custom plugins: [custom plugins](Developing_with_Profinity/SDK/Developing_Plugins.md) and [dynamic-link library (DLL) plugins](Administration/Install_and_Manage_Plugins.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Historians: [InfluxDB v2](Components/Historians/InfluxDB_Historians.md), [InfluxDB v3](Components/Historians/InfluxDB_Historians.md) and [TAG SQL](Components/Historians/TAG_SQL_Historian.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Themes and branding](Customising_Profinity/Theming/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Tag Rule Actions: Email, Slack, Webhook, and Message Queuing Telemetry Transport (MQTT) [rule actions](Tags/Rules/Actions/index.md), and the C#, Python and Lua rule scripts that run when an alert fires | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Data Relay: [Tag Relays](Components/Tag_Relays/index.md) ([sender](Components/Tag_Relays/Tag_Relay_Sender.md), [receiver](Components/Tag_Relays/Tag_Relay_Receiver.md)), [MQTT Publisher](Components/Publishers_and_Subscribers/MQTT_Publisher.md), [MQTT Subscriber](Components/Publishers_and_Subscribers/MQTT_Subscriber.md), [Webhook Publisher](Components/Publishers_and_Subscribers/Webhook_Publisher.md) and the [Cloud Dashboard](Components/Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Two-Factor Authentication](Administration/System_Configuration/Security/Two_Factor_Authentication.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Profinity AI: [AI Chat](Profinity_AI/AI_Chat.md), [AI settings](Administration/System_Configuration/AI_Settings.md) and the Model Context Protocol (MCP) [server](Integrating_to_Profinity/MCP_Server/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Profinity Server: [Users & Groups](Administration/Users_and_Access/Manage_Users.md), [Roles](Administration/Users_and_Access/Roles_and_Permissions.md), remote (non-localhost) web access and the [Extensions Web](Administration/System_Configuration/Extensions_Web.md) server | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Enterprise Security: [single sign-on (SSO)](Administration/System_Configuration/Security/SSO_and_Sign_In.md), [System for Cross-domain Identity Management (SCIM) provisioning](Administration/System_Configuration/Security/SCIM_and_SIEM.md) and [security-key sign-in](Administration/System_Configuration/Security/Two_Factor_Authentication.md#security-key-sign-in) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Industrial Protocols](Components/Industrial_Protocols/index.md): [BACnet](Components/Industrial_Protocols/BACnet.md), [EtherNet/IP](Components/Industrial_Protocols/EtherNet_IP.md), [Modbus](Components/Industrial_Protocols/Modbus.md), [Open Platform Communications Unified Architecture (OPC UA)](Components/Industrial_Protocols/index.md) and [S7](Components/Industrial_Protocols/S7.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on |
| [Profinity software development kit (SDK)](Developing_with_Profinity/SDK/index.md): the `Profinity.Sdk` library, [`profinity-component-pack`](Developing_with_Profinity/SDK/Component_Pack_CLI.md) and [`profinity-script`](Developing_with_Profinity/SDK/Test_a_Script.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on |

- **Unlicensed** is the state of a Desktop installation with no licence file, and of any instance after its 14-day local trial expires.
  Unlicensed Desktop use is limited to personal, non-commercial purposes, as described in [Desktop free-use policy](#desktop-free-use-policy).
- Without Profinity Server there are no user accounts or roles, and **Users & Groups** is not shown.
  A Desktop installation runs as a single built-in admin user.
- Kiosk Mode is included in every edition, but it signs a display in as an enabled Profinity user, and a dedicated kiosk user is created in **Users & Groups**, which needs Profinity Server.
  Refer to [Kiosk Mode](Administration/Kiosk_Mode.md).
- Themes and branding are not included for an unlicensed instance.
  The instance keeps its `theme.yaml` file but shows the default Profinity appearance until a Desktop or higher licence is installed.
- The 14-day local trial and sales evaluation licences include everything in the **Server** edition, but not **Enterprise Security**.
  Refer to [The 14-day local trial](#the-14-day-local-trial).
- **Add-on** means something licensed separately from the edition, available on any commercial edition.
  Industrial Protocols is a component group that needs the matching plugin installed as well, and the partner hardware component packs are licensed in the same way as component groups.
  The Profinity SDK is a developer kit that Prohelion supplies on request.
- Pages for licence-dependent features carry a **Licence required** note at the top.
  The [License manager](Administration/License_Manager.md) in the product is always the authority for your instance, because configuration can further narrow what a licence allows.

!!! warning "Remote web access needs a Server licence"
    Without a Server licence, including on a Desktop host, Profinity listens for web connections on `127.0.0.1` only.
    The web interface and API can then be reached from the same computer and not from another one.
    This applies to an unlicensed instance and to an instance whose 14-day local trial has expired.
    When the web server starts, Profinity forces any HTTP or HTTPS address that is not a loopback address, such as `0.0.0.0`, to `127.0.0.1`.
    It does this whatever is entered under [Profinity Web](Administration/System_Configuration/Profinity_Web.md), and even if `Config.yaml` holds another value.
    It also records a message beginning "Remote web access requires a Server license" in the [Profinity log](Administration/Logs_Config.md).
    If you cannot reach Profinity from another computer, check the licence on the **License** page before you change the address or the firewall.

Opening the web interface from another machine, and creating user accounts and roles, need the **Profinity Server** licensed feature, which the Server and Enterprise editions include.
Local access on the same machine needs no licence.
A new installation that is not a Desktop host starts a one-time 14-day local trial with the Server features, and then drops to the unlicensed feature set.
Remote access and user accounts stop working until you apply a licence file under **ADMIN > License**.
For who can sign in on each installation type, refer to [Who can sign in, by installation type](Installation/Applying_a_Licence.md#who-can-sign-in).
Production use of Profinity Server on Windows, Docker, Linux, or macOS needs a licence from Prohelion; contact Prohelion through the [Prohelion contact page](https://www.prohelion.com/contact-us/).

## The 14-day local trial

A Profinity instance that has never had a licence applied issues itself a one-time, 14-day trial on first startup.
The installer build must have trial issuance enabled, and some OEM-customised builds do not offer the local trial.
The trial:

- Needs no network access and no request to Prohelion.
- Runs for a maximum of 14 days from first startup.
- Grants the Server features, the same set as a standard `Commercial` Server licence, but not the Enterprise-only features.
- Is issued once per installation.
  Reinstalling or resetting the instance does not restart it, because Profinity records the trial against the instance fingerprint.
- Reports the state `Trial` while more than 7 days remain, and `Expiring` for the last 7 days.
  A signed trial licence file reports `Trial` while more than 30 days remain.
- Is not available on Desktop hosts, which have a separate free-use policy ([Desktop free-use policy](#desktop-free-use-policy)).

When the trial ends, Profinity drops the instance to the unlicensed feature set that a Desktop installation uses.
It shows an expiry notice on the Home screen that links to the **License** pill on the **ADMIN** page.
Profinity does not stop, lock users out, or switch to a read-only mode, and the engine keeps running.
Features and components outside the unlicensed set become unavailable until you upload a suitable commercial or extended evaluation licence.

## Desktop free-use policy

An unlicensed Desktop installation is provided for personal, non-commercial use only and must not be used for commercial purposes.
Commercial use requires a purchased Desktop licence from Prohelion.
A Desktop installation does not need a licence for personal use, and does not issue or consume the automatic local trial described in [The 14-day local trial](#the-14-day-local-trial).
It keeps the unlicensed entitlement set indefinitely and shows a notice on the Home screen explaining the non-commercial-use restriction and directing commercial users to contact Prohelion to purchase a Desktop licence.
If a trial or commercial `license.yaml` is installed on a Desktop host manually, Profinity validates and applies it in the same way as on a server host.
A Desktop host that holds a Server licence also accepts connections from other machines and creates the default `admin` account, as a server host does.
The built-in desktop sign-in used by the application window still works from the same computer only.
Do not put a reverse proxy on the same computer in front of a Desktop host, because requests that come through it look as if they came from the computer itself.
Profinity refuses the desktop sign-in on a request that carries forwarding headers.
The safe set-up is to run Profinity as a server host behind the proxy instead.

## The machine fingerprint

The fingerprint is a value computed from the installation itself, unique to that machine and Profinity install.
It has two purposes:

- It ties a signed `license.yaml` to one specific installation, so a licence file cannot be copied to another machine and reused.
- It is the only piece of information an administrator needs to send to Prohelion to request a licence or evaluation, which keeps the process usable for edge machines with no internet access.

A licence is signed for one machine's fingerprint.
A licence issued for one instance does not apply to another, and Profinity rejects an upload of a licence issued for a different machine, reporting the state `WrongInstance` if such a file is placed directly in the licence folder.
The fingerprint is shown on the [License manager](Administration/License_Manager.md), with a button to copy it.

## Related documentation

- [Apply a licence](Installation/Applying_a_Licence.md): upload or place a licence file on an instance.
- [License manager](Administration/License_Manager.md): read the licence state, fingerprint, and licensed features of an instance.
- [System Information](Administration/System_Info.md): instance version and licence summary shown alongside other system details.
- [Roles and Permissions](Administration/Users_and_Access/Roles_and_Permissions.md): assigning the **Security administration** permission needed to manage licences.
- [System Configuration](Administration/System_Configuration/index.md): the site-level configuration layer that can narrow, but never exceed, what the licence permits.
