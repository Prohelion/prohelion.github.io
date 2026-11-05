---
title: How to Add a Component to Your Profile
---

# How to Add a Component to Your Profile

Add and configure components in your active profile to monitor CAN bus devices.

## Prerequisites

- Profinity V2 installed and running
- An active profile
- Access to create components

## Steps

### Step 1: Access Add Component

1. Click **ADD COMPONENT** button in the sidebar
2. Or right-click on your profile and select **Add Component**

### Step 2: Select Component Type

1. Choose the component type you want to add:
   - **Prohelion Components** (BMU, Motor Controller, MPPT, etc.)
   - **Custom Component**
   - **CAN Bus Adapters**
   - **Loggers** (File, InfluxDB, MQTT)
   - **Discovered** (auto-discovered devices)

### Step 3: Configure Component Settings

1. Enter a **Component Name** (must be unique)
2. Configure **CAN ID** or address (if required)
3. Set **Auto Connect** (enable to auto-connect on startup)
4. Configure component-specific settings
5. Click **Add** or **Save**

### Step 4: Verify Component Added

1. Component appears in the sidebar
2. Check status indicator:
   - **Green**: Connected and working
   - **Yellow**: Connected but no data
   - **Red**: Error (check logs)
   - **Grey**: Not connected

### Step 5: Connect Component (if needed)

1. Click on the component in the sidebar
2. Click **Connect** button
3. Wait for status to turn green
4. Verify data is appearing

## Related Documentation

- [Adding New Components](../Getting_Started/Adding_New_Components.md) - Detailed component setup guide
- [CAN Bus Adapters](../Components/Adaptors/CAN_Bus_Adapters.md) - Adapter configuration
