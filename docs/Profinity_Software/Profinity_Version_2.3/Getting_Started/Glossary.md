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
| Component | A device, protocol adapter, logger or other item that you add to a profile. Refer to [How to add a component to your profile](../How_To_Guides/Add_Component_to_Profile.md). |
| Dashboard | A screen of readouts, charts and controls that shows component data. Refer to [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md). |
| Derived tag | A tag whose value is calculated from other tags with an expression. Refer to [Derived tags](../Tags/Derived_Tags/index.md). |
| Home dashboard | The dashboard that replaces the standard home page when **Custom Home Dashboard** is enabled for a profile. Refer to [How to create a profile dashboard](../How_To_Guides/Create_Profile_Dashboard.md). |
| Pill | A labelled selector on the **ADMIN** page, such as **Profile** or **License**. |
| Profile | The saved configuration of a system: its components, dashboards and settings. Refer to [Profinity profiles](Profiles.md). |
| Rule | A condition on tags that raises an alert when it holds. Refer to [Tag rules](../Tags/Rules/index.md). |
| Server licence | The licence that includes the **Profinity Server** feature, which gives user accounts, roles and sign-in from other machines. Refer to [Licensing](../Licensing.md). |
| Tag | A single value with an address, a quality flag and metadata, whatever protocol it came from. Refer to [Tag layer](../Tags/index.md). |
| Tag expression | The language used to select tags and write conditions in collections, rules and derived tags. Refer to [Tag expressions](../Tags/Selecting_Tags/Tag_Expressions.md). |

## Acronyms

| Acronym | Meaning |
|---------|---------|
| BMS | Battery Management System |
| BMU | Battery Management Unit, the controller of a Prohelion BMS |
| CAN | Controller Area Network, the vehicle and industrial bus that Profinity reads |
| CMU | Cell Management Unit, a module that measures the cells it monitors and reports to the BMU |
| DBC | The CAN database file format that describes the messages and signals on a CAN bus. Refer to [CAN bus DBC](../CAN_Utilities/CAN_Bus_DBC.md). |
| MCP | Model Context Protocol, the standard that lets AI tools connect to Profinity. Refer to [MCP Server](../Integrating_to_Profinity/MCP_Server/index.md). |
| MPPT | Maximum Power Point Tracker, a solar charge controller |
| MQTT | Message Queuing Telemetry Transport, a messaging protocol for sending data through a broker |
| OPC UA | Open Platform Communications Unified Architecture, an industrial data protocol |
| PLC | Programmable Logic Controller |
| SFTP | Secure File Transfer Protocol |
| SOC | State of charge, the charge remaining in a battery as a percentage |
| SSO | Single sign-on, signing in through an external identity provider. Refer to [SSO and sign-in method](../Administration/System_Configuration/Security/SSO_and_Sign_In.md). |
| Swagger | The interactive API page on a Profinity instance, which lists every endpoint |

To return to the section start, refer to [Getting started with Profinity](index.md).
