---
title: Quick Start Guide
description: "Get started with Profinity V2 by installing on Windows or Linux, loading an example profile, replaying CAN logs, and editing your first dashboard."
---

# Quick Start Guide

This guide takes you from a fresh installation to a running system in five steps: installing Profinity, loading the example [profile](Profiles.md), replaying example CAN logs, editing your first dashboard, and looking at the rules and alerts.

## Step 1: Install Profinity on Windows

On Windows, follow the [Windows Installation Guide](../Installation/Windows_Installation.md) to install Profinity using the setup wizard.

!!! tip "Other Platforms"
    On macOS or Linux, see the [Linux and macOS Installation Guide](../Installation/Zip_Installation.md). For Docker deployments, see the [Docker Installation Guide](../Installation/Docker_Installation.md).

After installation, launch Profinity from the Start Menu, which opens the Profinity homepage.

The default login credentials are:

- Username: `admin`
- Password: `password`

!!! warning "Change Default Password"
    Change the default password after your first login, so that the system is not left running with publicly documented credentials.

## Step 2: Load the Example Profile

Profinity includes an **Example Profile** that demonstrates various dashboard features and component configurations, and it is installed automatically with Profinity.

To load the Example Profile:

1. Select **ADMIN** in the side menu
2. Select the **Profile** pill
3. Click **ACTIVATE** on the **Example Profile** row in the list to make it the active profile

The Example Profile includes the following pre-configured components:

- Prohelion 12v Battery
- Prohelion BMU (Battery Management Unit)
- Three Elmar Solar MPPT devices (6A0, 6B0 and 6C0)
- Two Prohelion WaveSculptor 22 Motor Controllers (Left and Right)

It also includes the following dashboard content:

- A **Custom Profile Dashboard** with status displays, data visualisations, and component monitoring
- **Custom styling** and images demonstrating dashboard capabilities
- **Data bindings** showing how to connect dashboard elements to component data

For more information about profiles, see the [Profiles Guide](./Profiles.md).

## Step 3: Run the Example CAN Log

The Example Profile works best with data flowing through the system, and Profinity includes an **Example Log** (`example_log.csv`) that can be replayed to simulate CAN bus traffic.

To replay the Example CAN Log:

1. Select **CAN UTILITIES** in the side menu
2. Select **CAN LOG REPLAY**
3. Select **example_log.csv** from the list of available log files, then click **Play** to start the replay

The log replays CAN bus messages, and data flows through the dashboards in the Example Profile.

!!! info "CAN Log Replay Features"
    The playback controls allow you to pause, resume, and move to a new position in the log. For more details, see [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md).

## Step 4: Edit Your First Dashboard

With the Example Profile running with data, an existing dashboard is the quickest way to learn how dashboards work.

To view and edit a dashboard's source:

1. With the Example Profile loaded, the **Profile Dashboard** is shown as the home page (this replaces the standard home page)
2. Locate the **pencil icon** in the top-right toolbar
3. Click the pencil icon to view the dashboard's YAML source code

Component-specific dashboards can be viewed in the same way:

1. Navigate to any component in the left sidebar (for example "Prohelion BMU" or "Prohelion WaveSculptor 22 - Left")
2. Click the pencil icon on that component's dashboard to view its source

Either route opens the dashboard editor, which allows you to:

- View the complete structure of the dashboard and edit it it visually or in YAML
- See how components are configured
- Understand data bindings and styling
- Make edits and see them reflected immediately

!!! tip "Learning from Examples"
    All dashboards in Profinity are built using the same dashboard system, so viewing existing dashboard source code is one of the most direct ways to learn how to create your own dashboards.

### Making Your First Edit

To make a simple change:

1. Find a text element or label in the dashboard
2. Change the text content, by clicking on the dashboard element and modifying it in the inspector
3. Save your changes
4. See the update reflected in the dashboard immediately

For more detailed information on creating and editing dashboards, see:

- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - the full guide to dashboard development
- [Core Elements](../Customising_Profinity/Dashboards/Core_Elements.md) - dashboard structure
- [Data Binding](../Customising_Profinity/Dashboards/Data_Binding.md) - connecting data to your dashboard
- [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md) - available dashboard components

## Step 5: Look at the Rules and Alerts

With data flowing, Profinity's rules watch your tags and raise alerts when something needs attention. Rules are defined in the profile, and the alerts they raise appear in the Alerts Log and as indicators across the UI.

To view the rules:

1. Select **TAG UTILITIES** in the side menu
2. Select **RULES** to open the rules editor
3. Expand the rule groups for the Example Profile's battery components

The Example Profile includes battery management system (BMS) alert rules for the Prohelion 12v Battery and the Prohelion BMU, arranged in groups such as **Cell limits** (cell over voltage, under voltage and over temperature) and **Critical status flags** (for example communications timeouts and emergency stop). Open a rule to see the tags it watches, its condition, its `level` and its description.

!!! note "Permissions"
    The **RULES** entry needs a loaded profile and the `TagRulesView` permission. Saving changes needs `TagRulesModify`. The default `admin` user can do both. Email, Slack, Webhook, MQTT, and rule-script actions need the **Tag Rule Actions** feature (Server and Enterprise).

To view the alerts:

1. Select **ALL ALERTS** in the side menu to open the Alerts Log
2. On the **Active** tab, see any alerts currently firing
3. Select the **History** tab to see earlier alerts, newest first
4. Select an alert to **Acknowledge** it, or **Silence** it for a set number of minutes

Alerts also show as a yellow triangle on dashboard widgets bound to the affected tag, and on the matching leaf in Tag Explorer. The web client refreshes these every four seconds, so they appear and clear as the data changes.

!!! tip "Learning from Examples"
    As with dashboards, the quickest way to learn rules is to read an existing one. Open a rule in the editor, note the condition it uses, then find the tag it watches in Tag Explorer to see what would make it fire.

For more detail, see:

- [Alerts Log](../Tags/Alerts.md) - alert levels, indicators, acknowledging and silencing
- [Rule actions and scripts](../Tags/Actions.md) - what happens when a rule fires
- [Tag expressions](../Tags/Tag_Expressions.md) - writing rule conditions
- [Tag layer](../Tags/index.md) - how tags, collections, rules and alerts fit together

## Next Steps

1. **Explore Components**: Learn about [Adding Components to Your Profile](./Adding_New_Components.md)
2. **Create Custom Dashboards**: Follow the [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) to build your own
3. **Visualise Data**: See how to [visualise data](./Visualising_Data.md) from your components
4. **Configure Logging**: Set up [CAN bus logging](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) for your system
5. **Manage Users**: [Create additional users](./Create_User.md) for your Profinity instance
6. **Write Your Own Rules**: Follow the [Tag layer](../Tags/index.md) guide to create rules and alerts for your system

## Getting Help

- The [Dashboard Troubleshooting Guide](../Customising_Profinity/Dashboards/Troubleshooting.md) covers common issues
- The [Dashboard FAQ](../Customising_Profinity/Dashboards/FAQ.md) answers frequently asked questions
- Contact Prohelion through the Feedback pill on the **ADMIN** page