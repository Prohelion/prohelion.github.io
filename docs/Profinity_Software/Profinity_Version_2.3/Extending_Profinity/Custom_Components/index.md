---
title: Custom Components
description: "Create custom components using DBC files and YAML dashboards to monitor components on your CAN bus."
---

# Custom Components

Custom Components use DBC files and custom dashboard definitions to bring any CAN bus component in a system into a Profinity profile, so that the component can be monitored and its data graphed or logged.

## What is a Custom Component?

A **Custom Component** in Profinity consists of two files, a DBC file and a dashboard file, each described below.

### DBC File (optional)

A DBC (Database CAN) file defines the CAN bus messages and signals that the component uses. It is optional for a Custom Component in 2.3 and only needs to be provided if the component needs CAN-bound dashboard data or if the Messages & Signals viewer is to be used.

For more information about DBC files, see the [DBC documentation](../../CAN_Utilities/CAN_Bus_DBC.md).

### Dashboard File (YAML)

A Dashboard file defines the user interface layout and component bindings using YAML configuration. The dashboard determines how data from the DBC file is displayed and visualised.

If no dashboard is provided, Profinity provides a default one.

For more information about creating dashboards, see the [Dashboard documentation](../Dashboards/index.md).

## Creating a Custom Component

To create a Custom Component in Profinity:

1. **Add a Custom Component** to your [Profile](../../Administration/Profiles.md)
2. **Upload or create a DBC file** that defines your device's CAN messages and signals, if the component needs one
   - Use the **DBC Editor** in the Custom Component editor
   - Or upload an existing DBC file
3. **Create or upload a Dashboard** that defines your user interface
   - Use the **Dashboard Editor** in the Custom Component editor
   - Or upload an existing dashboard YAML file
4. **Validate your configuration** — Profinity checks it against the schema
5. **Deploy your component** — once the configuration is valid, the component is available for use

The Custom Component editor provides dedicated editors for both files, accessible by clicking the editor icon on the toolbar.

## Related documentation

- [Component types](../Components/Component_Types.md) — Custom Component compared with Dashboard Component and DLL plugins
- [Component Pack CLI](../Components/Component_Pack_CLI.md) — packing and installing Custom Component bundles
- [Dashboard Development Guide](../Dashboards/index.md) — creating dashboards
- [DBC Documentation](../../CAN_Utilities/CAN_Bus_DBC.md) — DBC files
- [Custom Components (Components)](../../Components/Custom_Components/index.md) — component overview
