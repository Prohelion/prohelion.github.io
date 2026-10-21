---
title: Pack a Custom Component for other installations
description: "Validate and pack a working Custom Component with profinity-component-pack, then upload it so it appears in ADD COMPONENT on another installation."
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# Pack a Custom Component for other installations

As of Profinity 2.3, a Custom Component that works in one profile can be packed and installed on other systems, with no rebuild of the component.
The pack is a bundle of the component's own files (DBC, dashboard, scripts, and maps), not a compiled DLL plugin.

You need:

- A working [Custom Component](Using_a_Custom_Component.md), with its files in one folder.
- The [Profinity SDK](../../Developing_with_Profinity/SDK/index.md), which includes `profinity-component-pack`. The SDK is available from Prohelion.
- A `component_metadata.yaml` file in the folder, which sets the name that the component has in the catalogue. Refer to [Component metadata](../../Developing_with_Profinity/Custom_Components/Component_Metadata.md).
- An administrator on the other installation who can upload packages, as described in [Install and manage plugins](../../Administration/Install_and_Manage_Plugins.md).

1. On the machine that has the SDK, run `profinity-component-pack` with the `validate` command on the component folder.
   The tool reports the first problem it finds.
   Fix each problem and validate again until it reports none.
2. Run `profinity-component-pack` with the `pack` command to create a `.zip` or a `.nupkg` file.
   Refer to [Component Pack CLI](../../Developing_with_Profinity/SDK/Component_Pack_CLI.md) for the commands and flags.
3. On the other installation, an administrator selects **ADMIN**, then **Components & Plugins**, and uploads the package.
4. Open the profile and select **ADD COMPONENT**.
   The component is listed under the name that `component_metadata.yaml` gives it.

When the component is added, it behaves as described in [Using a Custom Component](Using_a_Custom_Component.md).
