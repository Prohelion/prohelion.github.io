---
title: Quick Start Guide
---

# Quick Start Guide

Welcome to Profinity! This guide will help you get up and running quickly. In just a few steps, you'll have Profinity installed, running an example profile, replaying example CAN logs, and editing your first dashboard.

## Step 1: Install Profinity on Windows

If you're using Windows, follow the [Windows Installation Guide](../Installation/Windows_Installation.md) to install Profinity using the setup wizard.

!!! tip "Other Platforms"
    If you're using macOS or Linux, see the [Zip Installation Guide](../Installation/Zip_Installation.md). For Docker deployments, see the [Docker Installation Guide](../Installation/Docker_Installation.md).

After installation, launch Profinity from the Start Menu. You'll be taken to the Profinity homepage.

**Default Login Credentials:**

- Username: `admin`
- Password: `password`

!!! warning "Change Default Password"
    Remember to change the default password after your first login for security purposes.

## Step 2: Load the Example Profile

Profinity comes with an **Example Profile** that demonstrates various dashboard features and component configurations. This profile is automatically installed with Profinity.

To load the Example Profile:

1. Navigate to the **ADMIN** tab
2. Click on **Profiles**
3. Select **Example Profile** from the list
4. Click **Load Profile** or set it as the active profile

The Example Profile includes:

**Pre-configured components:**

- Prohelion 12v Battery
- Prohelion BMU (Battery Management Unit)
- 3 Elmar Solar MPPT devices (6A0, 6B0, 6C0)
- 2 Prohelion WaveSculptor 22 Motor Controllers (Left and Right)

- **Custom Profile Dashboard** with status displays, data visualizations, and component monitoring
- **Custom styling** and images demonstrating dashboard capabilities
- **Data bindings** showing how to connect dashboard elements to component data

For more information about profiles, see the [Profiles Guide](./Profiles.md).

## Step 3: Run the Example CAN Log

The Example Profile works best when you have data flowing through the system. Profinity includes an **Example Log** (Example Log.csv) that you can replay to simulate CAN bus traffic.

To replay the Example CAN Log:

1. Navigate to the **CAN Bus** section in the left sidebar
2. Click on **CAN Log Replay** (or navigate to the CAN Log Replay view)
3. Select **Example Log.csv** from the list of available log files
4. Click **Play** to start replaying the log

The log will begin replaying CAN bus messages, and you'll see data flowing through the dashboards in the Example Profile.

!!! info "CAN Log Replay Features"
    You can pause, resume, and scrub through the log using the playback controls. For more details, see the [Logging and Replaying CAN Bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) guide.

## Step 4: Edit Your First Dashboard

Now that you have the Example Profile running with data, you can learn how dashboards work by editing an existing one.

To view and edit a dashboard's source:

1. With the Example Profile loaded, you'll see the **Profile Dashboard** as the home page (this replaces the standard home page)
2. Look for the **pencil icon** (✏️) in the top-right toolbar
3. Click the pencil icon to view the dashboard's YAML source code

Alternatively, you can view component-specific dashboards:

1. Navigate to any component in the left sidebar (e.g., "Prohelion BMU" or "Prohelion WaveSculptor 22 - Left")
2. Click the pencil icon on that component's dashboard to view its source

This will open the dashboard editor where you can:

- View the complete YAML structure of the dashboard
- See how components are configured
- Understand data bindings and styling
- Make edits and see them reflected immediately

!!! tip "Learning from Examples"
    All dashboards in Profinity are built using the same dashboard system. Viewing existing dashboard source code is one of the best ways to learn how to create your own dashboards.

### Making Your First Edit

Try making a simple change:

1. Find a text element or label in the dashboard YAML
2. Change the text content
3. Save your changes
4. See the update reflected in the dashboard immediately

For more detailed information on creating and editing dashboards, see:

- [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) - Complete guide to dashboard development
- [Core Elements](../Extending_Profinity/Dashboards/Core_Elements.md) - Understanding dashboard structure
- [Data Binding](../Extending_Profinity/Dashboards/Data_Binding.md) - Connecting data to your dashboard
- [Component Reference](../Extending_Profinity/Dashboards/Component_Reference/index.md) - Available dashboard components

## What's Next?

Now that you've completed the quick start:

1. **Explore Components**: Learn about [Adding New Components](./Adding_New_Components.md) to your profile
2. **Create Custom Dashboards**: Follow the [Dashboard Development Guide](../Extending_Profinity/Dashboards/index.md) to build your own
3. **Visualize Data**: See how to [Visualize Data](./Visualising_Data.md) from your components
4. **Configure Logging**: Set up [CAN Bus Logging](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) for your system
5. **Manage Users**: [Create additional users](./Create_User.md) for your Profinity instance

## Need Help?

- Check the [Troubleshooting Guide](../Extending_Profinity/Dashboards/Troubleshooting.md) for common issues
- Review the [FAQ](../Extending_Profinity/Dashboards/FAQ.md) for frequently asked questions
- Contact support through the Feedback form in the Profinity Admin menu

Welcome to Profinity V2!