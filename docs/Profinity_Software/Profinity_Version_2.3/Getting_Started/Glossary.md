---
title: Glossary
description: "Look up the Profinity terms, product names and acronyms used in the documentation, each with a one-sentence meaning and a link to the page that explains it."
type: reference
owner: Documentation
last_reviewed: 2026-10-21
---

# Glossary

This page defines the terms and acronyms that the Profinity 2.3 documentation uses.
Each entry gives a one-sentence meaning and links to the page that explains it in full.

## Profinity terms

| Term | Meaning |
|------|---------|
| Action | What a rule does when it fires, such as writing to the Profinity log or sending an email. Refer to [Rule actions](../Tags/Rules/Actions/index.md). |
| Alert | A record that a rule raised because a tag value went out of range. Refer to [Alerts Log](../Tags/Alerts.md). |
| Collection | A named group of tags chosen by a membership expression. Refer to [Tag collections](../Tags/Collections/index.md). |
| Component | A device, protocol adapter, logger, or other item that you add to a profile. Refer to [How to add a component to your profile](../How_To_Guides/Add_Component_to_Profile.md). |
| Dashboard | A screen of readouts, charts, and controls that shows component data. Refer to [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md). |
| Derived tag | A tag whose value is calculated from other tags with an expression. Refer to [Derived tags](../Tags/Derived_Tags/index.md). |
| Home dashboard | The dashboard that replaces the standard home page when **Custom Home Dashboard** is enabled for a profile. Refer to [Profile Dashboard](../Administration/Profile_Dashboard.md). |
| Pill | A labelled selector on the **ADMIN** page, such as **Profile** or **License**. |
| Profile | The saved configuration of a system: its components, dashboards, and settings. Refer to [Profinity profiles](Profiles.md). |
| Rule | A condition on tags that raises an alert when it holds. Refer to [Tag rules](../Tags/Rules/index.md). |
| Server licence | The licence that includes the **Profinity Server** feature, which gives user accounts, roles, and sign-in from other machines. Refer to [Licensing](../Licensing.md). |
| Tag | A single value with an address, a quality flag and metadata, whatever protocol it came from. Refer to [Tag layer](../Tags/index.md). |
| Tag expression | The language used to select tags and write conditions in collections, rules, and derived tags. Refer to [Tag expressions](../Tags/Selecting_Tags/Tag_Expressions.md). |

## Acronyms

| Acronym | Meaning |
|---------|---------|
| 2FA | Two-factor authentication, a second proof of identity at sign-in. Refer to [Two-factor authentication](../Administration/System_Configuration/Security/Two_Factor_Authentication.md). |
| BMS | Battery Management System. Refer to [Battery management systems](../Components/Battery_Management_Systems/index.md). |
| BMU | Battery Management Unit, the controller of a Prohelion BMS. Refer to [Prohelion BMU](../Components/Battery_Management_Systems/Prohelion_BMU.md). |
| CAN | Controller Area Network, the vehicle and industrial bus that Profinity reads. Refer to [CAN bus adapters](../Components/CAN_Bus_Protocols/index.md). |
| CMU | Cell Management Unit, a module that measures the cells it monitors and reports to the BMU. Refer to [Prohelion BMU](../Components/Battery_Management_Systems/Prohelion_BMU.md). |
| DBC | The CAN database file format that describes the messages and signals on a CAN bus. Refer to [CAN bus DBC](../CAN_Utilities/CAN_Bus_DBC.md). |
| DLL | Dynamic-link library, the compiled file format of a C# plugin |
| MCP | Model Context Protocol, the standard that lets AI tools connect to Profinity. Refer to [MCP Server](../Integrating_to_Profinity/MCP_Server/index.md). |
| MFA | Multi-factor authentication, a sign-in that needs more than a password. Refer to [Two-factor authentication](../Administration/System_Configuration/Security/Two_Factor_Authentication.md). |
| MPPT | Maximum Power Point Tracker, a solar charge controller. Refer to [Elmar Solar MPPT](../Components/MPPT/Elmar_Solar_MPPT.md). |
| MQTT | Message Queuing Telemetry Transport, a messaging protocol for sending data through a broker. Refer to [Publishers and Subscribers](../Components/Publishers_and_Subscribers/index.md). |
| OPC UA | Open Platform Communications Unified Architecture, an industrial data protocol. Refer to [OPC UA Client](../Components/Industrial_Protocols/OPC_UA_Client.md). |
| PLC | Programmable Logic Controller |
| SCIM | System for Cross-domain Identity Management, a standard for provisioning users from an identity provider. Refer to [SCIM and SIEM](../Administration/System_Configuration/Security/SCIM_and_SIEM.md). |
| SDK | Software development kit, the libraries used to build Profinity plugins and components. Refer to [Profinity SDK](../Developing_with_Profinity/SDK/index.md). |
| SFTP | Secure Shell (SSH) File Transfer Protocol, a protocol for copying files over a secure connection. Refer to [File logger rotation, archive, and SFTP settings](../Components/Loggers/File_Logger_Rotation_Archive_and_SFTP.md). |
| SIEM | Security information and event management, a system that collects security events from Profinity. Refer to [SCIM and SIEM](../Administration/System_Configuration/Security/SCIM_and_SIEM.md). |
| SOC | State of charge, the charge remaining in a battery as a percentage |
| SSO | Single sign-on, signing in through an external identity provider. Refer to [SSO and sign-in method](../Administration/System_Configuration/Security/SSO_and_Sign_In.md). |
| Swagger | The interactive API page on a Profinity instance, which lists every endpoint. Refer to [Profinity REST APIs](../Integrating_to_Profinity/APIs/index.md). |
| TOTP | Time-based one-time password, the six-digit code an authenticator app generates for two-factor sign-in. Refer to [Two-factor authentication](../Administration/System_Configuration/Security/Two_Factor_Authentication.md). |
| UDP | User Datagram Protocol, a network protocol that sends messages without a connection |

To return to the section start, refer to [Getting started with Profinity](index.md).
