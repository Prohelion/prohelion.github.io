---
title: Choose available components
description: "Hide or show component types, or whole groups, in the Add Component list from the component catalogue on the Components & Plugins page."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Choose available components

The **COMPONENT CATALOGUE** half of **Components & Plugins** lists every component type that is available and lets you choose which ones engineers see when they add a component to a [Profile](Profiles.md).
Opening the screen requires the **View plugins** permission, and changing the catalogue requires **Modify plugins**, as described in [Install and manage plugins](Install_and_Manage_Plugins.md).

The **COMPONENT CATALOGUE** table lists every component type in Profinity, grouped by family.
Disabling a component type or a whole group removes it from the **ADD COMPONENT** list without uninstalling anything, which keeps the choices short for a deployment that only uses a few device types.
Enabling it again brings it straight back.

Expand a group to show its component types, and use the search box above the table to filter by name.
The **Status** column shows whether each row is currently available, and the **Actions** column holds the button that changes it:

- **Disable** hides a single component type, and **Enable** makes it available again.
- **Disable group** hides every component type in a group at once, and **Enable group** restores them.

The change takes effect as soon as you select the button, and the engine does not need to be restarted.
Enabling one component type inside a disabled group enables the group and leaves the other types in it disabled, so you can bring back a single device without exposing the rest of its family.
The components of a disabled plugin do not appear in the catalogue at all, so enable the plugin again first, as described in [Install and manage plugins](Install_and_Manage_Plugins.md#disable-or-remove-a-plugin).

## Why a component can be unavailable

A component type is available only when the licence, the `custom.yaml` file and the site configuration (`config.yaml`) all allow it.
Profinity checks the licence first, then `custom.yaml`, then `config.yaml`.

## Rows that cannot be enabled

A row with no action button is locked, and the **Status** column says why.
**Not licensed** means your licence does not cover the component.
Refer to [Licensing](Licensing.md).
**Disabled (Custom.yaml)** means the supplier of your Profinity build hid the component through the `custom.yaml` file in the `config` folder, which Profinity only reads, so it cannot be enabled from this screen.
A component disabled in the site configuration shows **Disabled**, **Disabled (group)** or **Disabled (component)** instead.
If an attempt to change a row fails, a message explains the reason.
