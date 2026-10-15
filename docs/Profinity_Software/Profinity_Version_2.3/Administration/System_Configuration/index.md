---
title: System Configuration
description: "Find the System Configuration tab for application, logging, discovery, web, extensions web, tags, security, and AI settings."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# System Configuration

The **System Configuration** pill is located on the **ADMIN** page, which is opened by selecting **ADMIN** in the side menu, and contains the configuration options for the core Profinity instance.
The settings are grouped into tabs, and each tab has its own page, listed in the table.

!!! warning "Saving changes restarts Profinity"
    Saving changes in **System Configuration** restarts Profinity and interrupts all active sessions, whereas enabling or disabling components on the [Choose available components](../Choose_Available_Components.md) page applies immediately without a restart.
    After the save, Profinity shows a "Restarting, please wait..." message and checks the engine every two seconds, then refreshes the settings automatically once the engine is running again, so the page does not need to be reloaded manually.
    If the engine has not returned to the running state within 60 seconds, Profinity reports that the restart is taking longer than expected, and the [System Information](../System_Info.md) page shows the current engine state.

## Tabs at a glance

| Tab                | What it controls | Page |
|--------------------|------------------|------------|
| Application Config| Packet retention, updates, tag history window and scripting| [Application Config](Application_Config.md) |
| AI| The Profinity AI assistant and the Model Context Protocol (MCP) server| [AI Settings](AI_Settings.md) |
| Logging| Log level, rollover size and retained logs| [Logging](Logging.md) |
| Discovery| The local area network (LAN) heartbeat that lets Profinity Mobile find this server| [Discovery](Discovery.md) |
| Web| The main HTTP and HTTPS web server and its certificates| [Profinity Web](Profinity_Web.md) |
| Extensions Web| A second web server for custom applications and the API| [Extensions Web](Extensions_Web.md) |
| Tags| Limits for the in-memory tag history buffer| [Tags](Tags.md) |
| Security| Sign-in, passwords, sessions and lockout, two-factor, single sign-on (SSO), System for Cross-domain Identity Management (SCIM) and Security Information and Event Management (SIEM)| [Security](Security/index.md) |
