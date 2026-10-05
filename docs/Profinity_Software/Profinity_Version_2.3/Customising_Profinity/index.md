---
title: Customising Profinity
description: "Tailor how Profinity looks and behaves for your deployment with dashboards, theming, hosted web applications, and OEM white-label mobile builds."
---

# Customising Profinity

Profinity can be tailored to the deployment without writing a line of application code. Build [dashboards](./Dashboards/index.md) that show the system the way your operators think about it, apply your own [branding and theme](./Theming/index.md), [host a web application](./Hosting/index.md) alongside Profinity, or ship a branded app with [OEM white-label mobile builds](../Mobile/OEM_White_Label.md).

| Page | Use it to |
|------|-----------|
| [Dashboards](./Dashboards/index.md) | Build data-driven operator interfaces in the [visual dashboard editor](./Dashboards/Visual_Editor.md), with YAML behind it as a fallback. |
| [Theming](./Theming/index.md) | Apply branding and theme customisation through the engine Themes API. |
| [Hosting](./Hosting/index.md) | Serve a custom web application from Profinity's integrated web server, with SSL/TLS. |
| [OEM white-label mobile](../Mobile/OEM_White_Label.md) | Ship a branded Profinity mobile app to your customers. |

[Menu layout](../Administration/Menu_Layout.md) covers per-profile and per-component menu placement, and the [component catalog](../Administration/Components_and_Plugins.md) covers hiding component types, both under Administration.

## Dashboards

Profinity's [dashboard system](./Dashboards/index.md) creates dynamic, data-driven user interfaces. In 2.3 you build them in the [visual dashboard editor](./Dashboards/Visual_Editor.md), with YAML configuration files behind it as a fallback. Dashboards display real-time information from CAN bus systems and connect directly to Profinity's data sources.

Dashboards can be used in multiple contexts:

- **Custom Components**: component-specific interfaces, optionally with DBC files.
- **Profile Dashboards**: replace the standard home page with a custom dashboard.

Dashboards use a declarative YAML approach, so teams monitoring complex systems, building operator interfaces, or developing custom data visualisation can do so without a separate development effort. They support data displays, charts, status indicators, and interactive elements, all connected to live data through Profinity's data binding so they update as the system state changes.

## Hosting

Profinity includes an [integrated web server](./Hosting/index.md) that hosts custom applications, whether they use modern web technologies such as ReactJS or Angular, or traditional HTML and JavaScript. It supports SSL/TLS certificates so hosted applications are secured in production, which suits organisations deploying custom web applications as part of a single, unified Profinity experience.

## Where next

- Building something that needs code? See [Developing with Profinity](../Developing_with_Profinity/index.md).
- Connecting another system or an AI assistant? See [Integrating to Profinity](../Integrating_to_Profinity/index.md).
- Working with tags, rules and alerts? See [Tags](../Tags/index.md).
