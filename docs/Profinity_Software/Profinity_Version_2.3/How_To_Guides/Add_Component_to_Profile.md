---
title: How to Add a Component to Your Profile
description: "Add and configure CAN bus components like Prohelion devices, adapters, and loggers to your Profinity profile."
---

# How to Add a Component to Your Profile

Add and configure components in your active profile to monitor CAN bus devices.

## Prerequisites

- Profinity V2 installed and running
- An active profile
- The `ComponentModify` permission, which allows components to be added

## Steps

### Step 1: Access Add Component

1. Click **ADD COMPONENT** button in the sidebar
2. Or right-click on your profile and select **Add Component**

### Step 2: Select Component Type

1. Choose the component type you want to add:
   - **Prohelion Components** (BMU, Motor Controller, MPPT, etc.)
   - **Custom Component**
   - **CAN Bus Adapters**
   - **Loggers** (CAN File, TAG File, InfluxDB, Prometheus)
   - **Publishers & Subscribers** (MQTT, Webhook)
   - Auto-discovered adapters, which are shown at the top of the screen

### Step 3: Configure Component Settings

1. Enter a **Component Name** (must be unique)
2. Configure **CAN ID** or address (if required)
3. Set **Auto Connect** (enable to auto-connect on startup)
4. Configure component-specific settings
5. Click **Add** or **Save**

### Step 4: Verify Component Added

1. Confirm the component appears in the sidebar
2. Check the status indicator:
   - **Green**: The device is available, sending valid data and in a valid state
   - **Yellow**: The device is available, but is either not sending data or in a warning state
   - **Red**: The device is in an error state (check the [logs](../Getting_Started/Profinity_Log.md))
   - **Grey**: The device is not available, not connected or not visible on the network

### Step 5: Connect Component (if needed)

1. Click on the component in the sidebar
2. Click **Connect** button
3. Wait for the status to turn green
4. Verify data is appearing

## Related Documentation

- [Adding Components to Your Profile](../Getting_Started/Adding_New_Components.md) - the full component setup reference
- [CAN Bus Adapters](../Components/Adapters/CAN_Bus_Adapters.md) - Adapter configuration
