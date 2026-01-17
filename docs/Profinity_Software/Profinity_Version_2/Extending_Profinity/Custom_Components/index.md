---
title: Custom Components
---

# Custom Components

Profinity provides the ability to create custom components that use your DBC files and custom dashboard definitions to include any component that you may have in your system that runs CAN bus into your profile, to monitor those components and graph or log the data.

## What is a Custom Component?

A **Custom Component** in Profinity consists of two essential files:

### DBC File

A DBC (Database CAN) file defines the CAN bus messages and signals that your component will use. This file is required for data communication between your dashboard and the CAN network.

For more information about DBC files, see the [DBC documentation](../../CAN_Utilities/CAN_Bus_DBC.md).

### Dashboard File (YAML)

A Dashboard file defines the user interface layout and component bindings using YAML configuration. The dashboard determines how data from the DBC file is displayed and visualized.

If you don't provide a dashboard, Profinity will provide a default one.

For more information about creating dashboards, see the [Dashboard documentation](../Dashboards/index.md).

## Creating a Custom Component

To create a Custom Component in Profinity:

1. **Add a Custom Component** to your [Profile](../../Administration/Profiles.md)
2. **Upload or create a DBC file** that defines your device's CAN messages and signals
   - Use the **DBC Editor** in the Custom Component editor
   - Or upload an existing DBC file
3. **Create or upload a Dashboard** that defines your user interface
   - Use the **Dashboard Editor** in the Custom Component editor
   - Or upload an existing dashboard YAML file
4. **Validate your configuration** - the system will check against the schema
5. **Deploy your component** - once valid, your component will be available for use

The Custom Component editor provides dedicated editors for both files, accessible by clicking the editor icon on the toolbar.

## Related Documentation

- [Dashboard Development Guide](../Dashboards/index.md) - Learn how to create dashboards
- [DBC Documentation](../../CAN_Utilities/CAN_Bus_DBC.md) - Learn about DBC files
- [Custom Components (Components)](../../Components/Custom/index.md) - Component overview
