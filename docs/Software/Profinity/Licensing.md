---
title: Licensing
description: "Find which features each Profinity edition includes, what each licence state means, and how the 14-day trial and machine fingerprint work."
type: reference
owner: Documentation
last_reviewed: 2026-10-31
---

# Licensing

Profinity uses a signed licence file to control which commercial features and components are available on an instance.
Profinity checks the file's signature on the instance itself, so licensing works offline.
To apply a licence file, refer to [Apply a licence](Installation/Applying_a_Licence.md), and to read the licence state of an instance, refer to [License manager](Administration/License_Manager.md) or the licence summary in [System Information](Administration/System_Info.md).

A licence sets the most that an instance can use, and configuration can switch parts of it off.
A licensed feature, such as Profinity AI, is available whenever the licence includes it, with one exception: the [site configuration](Administration/System_Configuration/index.md) (`config.yaml`) can also switch scripting off.

Components work differently.
A component is available only when the licence, the original equipment manufacturer (OEM) customisation file (`custom.yaml`), and `config.yaml` all allow it, so either file can hide a component group or type that the licence includes.
Data Relay is a licensed feature that works through components (Tag Relays, the MQTT Publisher and Subscriber, the Webhook Publisher and the Cloud Dashboard), so these components follow the component rule.
Refer to [Choose available components](Administration/Choose_Available_Components.md).

## What each edition includes

The features an instance can use depend on its edition.
Some features are included in every edition, and a licence adds the rest.
In the tables in this section:

- :material-check-circle:{ .edition-icon .edition-icon--yes aria-hidden="true" } means the feature is included.
- :material-close-circle-outline:{ .edition-icon .edition-icon--no aria-hidden="true" } means it is not included.
- :material-plus-circle:{ .edition-icon .edition-icon--addon aria-hidden="true" } **Add-on** means it is licensed separately.

### Features by edition

The rows from Local web UI to Loggers are included in every edition.
Each edition also includes everything in the edition before it.
The remaining rows differ by edition:

- No licence: only the rows included in every edition.
- Desktop: adds Scripting, Custom components, Custom plugins, Historians, and Themes and branding, and has Industrial Protocols and the Profinity software development kit (SDK) as separately licensed extras.
- Server: adds Tag Rule Actions, Data Relay, Two-Factor Authentication, Profinity AI, and Profinity Server, and has the same two separately licensed extras.
- Enterprise: adds Enterprise Security, so only the two separately licensed extras remain.

| Feature | No licence (personal use only) | Desktop | Server | Enterprise |
|---------|:----------:|:-------:|:------:|:----------:|
| Local web UI (reachable from the same computer only) and the Representational State Transfer (REST) [API](Integrating_to_Profinity/APIs/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Tags: [tag tree](Tags/index.md), [derived tags](Tags/Derived_Tags/index.md), [expressions](Tags/Selecting_Tags/Tag_Expressions.md), [linking](Tags/Create_Collections_Rules_and_Bindings_from_Tags.md), [collections](Tags/Collections/index.md), and [logging and replay](Tags/Tag_Logs/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Dashboards](Customising_Profinity/Dashboards/index.md) and the [Dashboard component](Components/Dashboard/Dashboard_Component.md), plus [kiosk mode](Administration/Kiosk_Mode.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Rules](Tags/index.md), the [Alerts Log](Tags/Alerts.md) and the built-in Profinity Log [action](Tags/Rules/Actions/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Device components: [battery management systems](Components/Battery_Management_Systems/index.md), [motor controllers](Components/Motor_Controller/index.md), [chargers and power](Components/Chargers_and_Power/index.md), and [maximum power point trackers (MPPTs)](Components/MPPT/Elmar_Solar_MPPT.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| CAN adapters: [CAN bus adapters](Components/CAN_Bus_Protocols/CAN_Bus_Adapters/index.md) and the [virtual CAN adapter](Components/CAN_Bus_Protocols/Virtual_CAN_Adapter.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| CAN utilities: [send and receive](CAN_Utilities/Send_Receive_CAN_Bus_Messages.md), [logging and replay](CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md), and [DBC files](CAN_Utilities/CAN_Bus_DBC.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Loggers: [file and SSH File Transfer Protocol (SFTP) loggers](Components/Loggers/index.md), and the [InfluxDB v1 and Prometheus loggers](Components/Loggers/index.md) | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Scripting](Developing_with_Profinity/Scripting/index.md) in [C#, Lua and Python](Developing_with_Profinity/Scripting/Supported_Languages/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Custom components](Components/Custom_Components/Using_a_Custom_Component.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Custom plugins: [custom plugins](Developing_with_Profinity/SDK/Developing_Plugins.md) and [dynamic-link library (DLL) plugins](Administration/Install_and_Manage_Plugins.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Historians: [InfluxDB v2](Components/Historians/InfluxDB_Historians.md), [InfluxDB v3](Components/Historians/InfluxDB_Historians.md) and [TAG SQL](Components/Historians/TAG_SQL_Historian.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Themes and branding](Customising_Profinity/Theming/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Tag Rule Actions: Email, Slack, Webhook, and Message Queuing Telemetry Transport (MQTT) [rule actions](Tags/Rules/Actions/index.md), and the C#, Python and Lua rule scripts that run when an alert fires, which also need Scripting | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Data Relay: [Tag Relays](Components/Tag_Relays/index.md) ([sender](Components/Tag_Relays/Tag_Relay_Sender.md), [receiver](Components/Tag_Relays/Tag_Relay_Receiver.md)), [MQTT Publisher](Components/Publishers_and_Subscribers/MQTT_Publisher.md), [MQTT Subscriber](Components/Publishers_and_Subscribers/MQTT_Subscriber/index.md), [Webhook Publisher](Components/Publishers_and_Subscribers/Webhook_Publisher.md) and the [Cloud Dashboard](Components/Cloud_Dashboard/Prohelion_Cloud_Dashboard.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Two-Factor Authentication](Administration/System_Configuration/Security/Two_Factor_Authentication/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Profinity AI: [AI Chat](Profinity_AI/AI_Chat.md), [AI settings](Administration/System_Configuration/AI_Settings.md) and the Model Context Protocol (MCP) [server](Integrating_to_Profinity/MCP_Server/index.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Profinity Server: [Users & Groups](Administration/Users_and_Access/Manage_Users.md), [Roles](Administration/Users_and_Access/Roles_and_Permissions.md), remote (non-localhost) web access and the [Extensions Web](Administration/System_Configuration/Extensions_Web.md) server | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| Enterprise Security: [single sign-on (SSO)](Administration/System_Configuration/Security/SSO_and_Sign_In.md), [System for Cross-domain Identity Management (SCIM) provisioning](Administration/System_Configuration/Security/SCIM_and_SIEM.md) and [security-key sign-in](Administration/System_Configuration/Security/Two_Factor_Authentication/index.md#security-key-sign-in) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-check-circle:{ .edition-icon .edition-icon--yes title="Included" role="img" aria-label="Included" } |
| [Industrial Protocols](Components/Industrial_Protocols/index.md): [BACnet](Components/Industrial_Protocols/BACnet.md), [EtherNet/IP](Components/Industrial_Protocols/EtherNet_IP.md), [Modbus](Components/Industrial_Protocols/Modbus.md), [Open Platform Communications Unified Architecture (OPC UA)](Components/Industrial_Protocols/index.md) and [S7](Components/Industrial_Protocols/S7.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on |
| [Profinity SDK](Developing_with_Profinity/SDK/index.md): the `Profinity.Sdk` library, [`profinity-component-pack`](Developing_with_Profinity/SDK/Component_Pack_CLI.md) and [`profinity-script`](Developing_with_Profinity/SDK/Test_a_Script.md) | :material-close-circle-outline:{ .edition-icon .edition-icon--no title="Not included" role="img" aria-label="Not included" } | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on | :material-plus-circle:{ .edition-icon .edition-icon--addon title="Licensed separately" aria-hidden="true" } Add-on |

- A Desktop installation is free for personal, non-commercial use, under the [Desktop free-use policy](#desktop-free-use-policy).
  Every other installation starts with the [14-day local trial](#the-14-day-local-trial), unless an OEM-customised build leaves the trial out or the machine has already used it.
- User accounts, roles, and the **Users & Groups** page come with the Profinity Server feature.
  For who can sign in on each installation type, refer to [Who can sign in, by installation type](Installation/Applying_a_Licence.md#who-can-sign-in).
- Kiosk Mode is included in every edition, but setting it up needs Profinity Server.
  It signs a display in as an enabled Profinity user, and you create that dedicated kiosk user in **Users & Groups**, which comes with Profinity Server.
  Refer to [Kiosk Mode](Administration/Kiosk_Mode.md).
- Themes and branding need a Desktop or higher licence.
  Until one is installed, the instance keeps its `theme.yaml` file and shows the default Profinity appearance.
- The 14-day local trial and evaluation licences from Prohelion include everything in the **Server** edition.
- **Add-on** means something licensed separately from the edition, available on any commercial edition.
  Industrial Protocols is a component group that needs the matching plugin installed as well, and the partner hardware component packs are licensed in the same way as component groups.
  The Profinity SDK is a developer kit that Prohelion supplies on request.
- Pages for licence-dependent features carry a **Licence required** note at the top.
  The **License** page is always the authority for your instance, because `custom.yaml` and `config.yaml` can hide components that the licence includes.

!!! info "Remote web access needs a Server licence"
    Until it has a Server licence, a Desktop host listens for web connections on `127.0.0.1` only, so the web interface and API work from the same computer only.
    Profinity does this whatever is entered under [**Profinity Web**](Administration/System_Configuration/Profinity_Web.md), and records a message beginning "Remote web access requires a Server license" in the [Profinity log](Administration/Logs_Config.md).

    If you cannot reach Profinity from another computer, check the licence on the **License** page before you change the address or the firewall.

Opening the web interface from another computer, and creating user accounts and roles, need the Profinity Server feature, which the Server and Enterprise editions and the 14-day local trial include.
Every edition includes access from the same computer.
Production use of Profinity Server on Windows, Docker, Linux, or macOS needs a licence from Prohelion, which you can request through the [Prohelion contact page](https://www.prohelion.com/contact-us/).

## The 14-day local trial

A new server installation, meaning a Linux, macOS, or Docker installation, starts a one-time, 14-day trial the first time it runs with no licence installed.
Desktop hosts, including the Windows service, follow the [Desktop free-use policy](#desktop-free-use-policy) instead, and an OEM-customised build leaves the trial out when its `config/custom.yaml` sets `trialEligible` to `false` under `license`. A `custom.yaml` that Profinity cannot read also leaves the trial out.
The trial:

- Works offline.
- Runs for 14 days from first startup.
- Grants the Server features, the same set as a standard `Commercial` Server licence.
- Runs once per installation.
  Upgrading or reinstalling Profinity over an existing installation keeps the original trial, because the trial is recorded against the [machine fingerprint](#the-machine-fingerprint).
- Reports the state `Trial` while more than 7 days remain, and `Expiring` for the last 7 days.
  A signed trial licence file from Prohelion reports `Trial` while more than 30 days remain.

Before the trial ends, the Home screen shows an expiry notice that links to the **License** page under **ADMIN**.
When it ends, the state becomes `Expired`, and the installation runs in [restricted mode](#when-a-licence-is-missing-or-has-expired) until you apply a licence that includes the Server feature, such as a Server or Enterprise licence.

## When a licence is missing or has expired

The **State** on the [License manager](Administration/License_Manager.md) page shows whether a licence is in force.
In these three states, every feature the licence includes works:

| State | What it means |
|---|---|
| `Valid` | A commercial or evaluation licence from Prohelion is applied and current |
| `Trial` | The 14-day local trial, or a signed trial licence from Prohelion, is running, with the Server features |
| `Expiring` | 30 days or fewer remain on a licence, or 7 days or fewer on the local trial, and the Home screen shows the days remaining |

An expiry date is final: the licensed features stop on that date.
Profinity checks the date while it runs, so it notices the expiry as soon as the date passes.
It then restarts itself once and starts with the state `Expired`.
Scripting, AI, custom plugins, and the [Extensions Web](Administration/System_Configuration/Extensions_Web.md) server are among the features that stop.

In these five states, the instance falls back to the features every edition includes, shown in [Features by edition](#features-by-edition):

| State | What it means |
|---|---|
| `Expired` | The licence's expiry date has passed |
| `Missing` | The instance has no licence file and no trial running, which is the usual state of a Desktop host under the free-use policy |
| `Invalid` | The licence file fails its signature check, has a start date in the future, or has an unrecognised type |
| `WrongInstance` | The licence file was issued for a different installation |
| `UnsupportedVersion` | The licence covers only earlier releases of Profinity |

A server installation in any of these five states runs in *restricted mode*:

- It stays reachable on its configured address, so you can still replace the licence from a browser.
- A banner on every page says why.
- Users with the **Security administration** permission can sign in, open the **License** page to upload a new licence, read the **Logs**, and change their own password.
  The side menu shows only **ADMIN** and **LOGOUT**.
- Other users can sign in and see only a message that the licence needs renewing.
- Profinity refuses every other page and API request until you apply a licence that includes the Server feature.
  A Desktop licence does not include it, so it does not end restricted mode on a server installation.

To leave restricted mode, apply a licence as described in [Apply a licence](Installation/Applying_a_Licence.md).
Profinity restarts, the **License** page waits for it to come back, and then it reloads with everything available again.

!!! warning "Use HTTPS where you can"
    Over plain HTTP, sign-in details are sent without encryption.
    Restricted mode works over HTTP, so a server that can only be reached that way can still be renewed, but the **License** page warns you.

A Desktop host in these states keeps working with the features every edition includes, as described in [Desktop free-use policy](#desktop-free-use-policy).

## Desktop free-use policy

A Desktop installation is free for personal, non-commercial use, and commercial use needs a Desktop licence from Prohelion.
It runs with the features every edition includes for as long as you use it.
The Home screen shows a notice that explains the personal-use limit and directs commercial users to contact Prohelion.

A signed trial or commercial `license.yaml` installed on a Desktop host is validated and applied in the same way as on a server host.
With a Server licence, a Desktop host also accepts connections from other computers and creates the default `admin` account, as a server host does.
The built-in desktop sign-in used by the application window still works from the same computer only.

Do not put a reverse proxy on the same computer in front of a Desktop host.
Requests that come through the proxy look as if they came from the computer itself, so Profinity refuses the desktop sign-in on any request that carries forwarding headers.
To use a reverse proxy, run Profinity as a server host behind it instead.

## The machine fingerprint

The fingerprint is the identity of one Profinity installation, and the **License** page shows it with a button to copy it.
It is a random value that Profinity creates on first startup and keeps in the `license` folder of the [artefacts directory](Installation/Artifacts_Directory.md).
It has two purposes:

- It ties a signed `license.yaml` to one installation, so a licence file works only on the installation it was issued for.
- It is the only information an administrator sends to Prohelion to request a licence or evaluation, so an offline instance can be licensed too.

The fingerprint travels with the artefacts directory.
It stays the same when the computer's name changes, when a Docker container is recreated, and when the artefacts directory is moved.
Back up the artefacts directory with the rest of your Profinity data.
If the `license` folder is lost, Profinity creates a new fingerprint, and you need a new licence from Prohelion for it.

Profinity rejects an upload of a licence issued for a different installation, and reports the state `WrongInstance` if such a file is copied into the `license` folder.
