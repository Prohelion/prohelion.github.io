---
title: Customising Profinity
description: "Tailor how Profinity looks and behaves for a deployment with dashboards, theming, hosted web applications, and OEM white-label mobile builds."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Customising Profinity

Profinity can be tailored to a deployment without application code.
Dashboards show the system in the terms operators use, a theme applies branding, a hosted web application runs alongside Profinity, and white-label mobile builds let an original equipment manufacturer (OEM) ship a branded app.

- [Dashboards](./Dashboards/index.md) builds operator interfaces that show live data from Profinity tags in the [visual dashboard editor](./Dashboards/Visual_Editor.md), with YAML behind it as a fallback.
- [Themes and branding](./Theming/index.md) applies branding and theme customisation from a `theme.yaml` file.
- [Hosting custom applications](./Hosting/index.md) serves a custom web application from Profinity's integrated web server, with Secure Sockets Layer / Transport Layer Security (SSL/TLS) certificates.
- [OEM white-label mobile](../Mobile/OEM_White_Label.md) ships a branded Profinity mobile app to customers.

A dashboard can be the page of a [Custom Component](../Developing_with_Profinity/Custom_Components/index.md), a profile home page, or a standalone [Dashboard Component](../Components/Dashboard/Dashboard_Component.md) that binds to existing tags.
[Menu Layout](../Administration/Menu_Layout.md) covers per-profile and per-component menu placement, and [Components and Plugins](../Administration/Install_and_Manage_Plugins.md) covers hiding component types, both under Administration.

Developers who need code should start with [Developing with Profinity](../Developing_with_Profinity/index.md).
Integrations with other systems and AI assistants are covered in [Integrating to Profinity](../Integrating_to_Profinity/index.md), and tags, rules, and alerts are covered in [Tags](../Tags/index.md).
