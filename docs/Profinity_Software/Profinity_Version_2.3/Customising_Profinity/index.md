---
title: Customising Profinity
description: "Tailor how Profinity looks and behaves for a deployment with dashboards, theming, hosted web applications, and OEM white-label mobile builds."
type: index
owner: Documentation
last_reviewed: 2026-10-14
---

# Customising Profinity

Profinity can be tailored to a deployment without application code.
Dashboards show the system in the terms your users know, a theme applies branding, and a hosted web application runs alongside Profinity.
White-label mobile builds let an original equipment manufacturer (OEM) ship a branded app.

- [Dashboards](./Dashboards/index.md) builds user interfaces that show live data from Profinity tags in the [visual dashboard editor](./Dashboards/Visual_Editor.md), with YAML behind it as a fallback.
- [Themes and branding](./Theming/index.md) applies branding and theme customisation from a `theme.yaml` file.
- [Hosting custom applications](./Hosting/index.md) serves a custom web application from Profinity's integrated web server, with Secure Sockets Layer / Transport Layer Security (SSL/TLS) certificates.
- [OEM white-label mobile](../Mobile/OEM_White_Label.md) ships a branded Profinity mobile app to customers.

A dashboard can be the page of a [Custom Component](../Developing_with_Profinity/Custom_Components/index.md), the home page of a profile, or a standalone [Dashboard Component](../Components/Dashboard/Dashboard_Component.md) that binds to existing tags.
Two Administration pages also change what users see.
[Menu Layout](../Administration/Menu_Layout.md) covers per-profile and per-component menu placement.
[Install and manage plugins](../Administration/Install_and_Manage_Plugins.md) covers hiding component types.

Developers who need code should start with [Developing with Profinity](../Developing_with_Profinity/index.md).
For integrations with other systems and AI assistants, refer to [Integrating to Profinity](../Integrating_to_Profinity/index.md).
For tags, rules, and alerts, refer to [Tag layer](../Tags/index.md).
