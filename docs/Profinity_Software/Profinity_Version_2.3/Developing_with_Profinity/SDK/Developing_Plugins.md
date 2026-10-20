---
title: Developing Plugins
description: "A plugin adds a compiled component, built on the same framework as Prohelion's own components."
type: concept
owner: Documentation
last_reviewed: 2026-10-20
---

# Developing Plugins

A plugin adds a component type that Profinity does not ship.
It is compiled with the [Profinity SDK](./index.md), and an administrator installs it through **Components & Plugins**.
Installing, enabling, and removing a plugin is covered on [Components & Plugins](../../Administration/Install_and_Manage_Plugins.md).

A plugin is separate from a Custom Component, which is a bundle of files and scripts and needs no compiling.
A plugin is the choice when the component needs compiled code.
[Component Types](../Custom_Components/Component_Types.md) compares the two.

## What the framework provides

The plugin framework is the same one Prohelion uses for its own components.
A component built on it can:

- Show a settings screen, a status, and a status message.
- Publish tags that a profile can graph, log, and use in rules and scripts.
- Offer actions on the component.
- Connect to a device, broker, or server, show an error when the other end is down, and connect again when it appears. Refer to [Connections and reconnecting](../../Components/Connections_and_Reconnecting.md).

The kit Prohelion sends to approved developers includes examples of this framework, and documentation that goes further than this page.
For a copy of the SDK, or for more information, [contact Prohelion](https://www.prohelion.com/contact-us/).

Uploading a plugin needs the **Modify plugins** permission, described in [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md), and the **Custom Plugins** feature.
That feature is available from the Desktop edition upwards, and not when unlicensed.
Refer to [Licensing](../../Licensing.md).
