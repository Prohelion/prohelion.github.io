---
title: How to Create a Custom Component
description: "Create custom CAN bus components in Profinity using an optional DBC file and optional dashboard YAML for any device."
---

# How to Create a Custom Component

Add any CAN bus device to Profinity by creating a Custom Component with an optional DBC file and an optional dashboard.

## Prerequisites

- (Optional) A DBC file for your CAN bus device, which is needed only for CAN-bound dashboard data or the Messages & Signals viewer
- (Optional) A dashboard YAML file
- The `ComponentModify` permission, which allows components to be added

## Steps

### Step 1: Create a New Custom Component

1. Navigate to **ADMIN** → **Components**
2. Click **Add Component**
3. Select **Custom Component**

### Step 2: Configure Basic Settings

1. Enter a **Component Name** (e.g., "My CAN Device")
2. Set the **CAN ID** if required
3. Configure connection settings

### Step 3: Add Your DBC File (if required)

**Option A - Using DBC Editor:**

1. Click the **DBC Editor** icon in the toolbar
2. Paste your DBC content or upload a DBC file
3. Editor validates your DBC syntax
4. Save the DBC configuration

**Option B - Upload DBC File:**

1. Find the DBC file upload option in settings
2. Click **Browse** and select your `.dbc` file
3. Upload the file
4. Profinity parses and validates the DBC file

### Step 4: (Optional) Add a Custom Dashboard

If no dashboard is provided, Profinity provides a default one.

1. Click the **Dashboard Editor** icon
2. Start with "Hello World" template or upload existing YAML
3. Create dashboard with data bindings:
   ```yaml
   bind:
     - target: value
       source: '{COMPONENT_NAME}.YourMessage.YourSignal'
   ```
4. Save the dashboard

### Step 5: Save and Activate

1. Click **Save** to save your Custom Component
2. Component appears in your component list
3. Add it to your active profile if needed

### Step 6: Verify the Component

1. Check component appears in the sidebar
2. View component dashboard to see data
3. Verify CAN messages are being received
4. Check signals are displaying correctly

## Using Your Custom Component

Once created, your Custom Component:

- **Receives CAN messages** defined in your DBC file
- **Displays signals** in the dashboard (if configured)
- **Can be logged** to InfluxDB, Prometheus, or files
- **Can be monitored** in real time
- **Can be used in scripts** via the Profinity API

## Tips

- **Test with CAN Log Replay**: use the [CAN log replay](./Replay_CAN_Logs.md) feature to test your component with recorded messages
- **Start Simple**: begin with a basic dashboard and add complexity gradually
- **Validate DBC**: ensure your DBC file is valid before uploading
- **Use Examples**: look at existing component dashboards for reference

## Troubleshooting

- **No data appearing**: Check that CAN messages are being received and match your DBC definitions
- **Dashboard not loading**: Validate your YAML syntax in the dashboard editor
- **Signals not found**: Verify signal names match exactly (case-sensitive)

## Related Documentation

- [Custom Components](../Extending_Profinity/Custom_Components/index.md) - the full Custom Component reference
- [DBC Documentation](../CAN_Utilities/CAN_Bus_DBC.md) - understanding DBC files
- [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) - creating dashboards
- [Data Binding](../Extending_Profinity/Dashboards/Data_Binding.md) - Connecting data to dashboards
