---
title: Quick Start Guide
description: "Get started with Profinity 2.3 by installing on Windows or Linux, loading an example profile, replaying CAN logs, editing your first dashboard and looking at rules and alerts."
---

# Quick Start Guide

This guide takes you from a fresh installation to a running system in five steps: installing Profinity, loading the example [profile](Profiles.md), replaying example CAN logs, editing your first dashboard, and looking at the rules and alerts.

## Step 1: Install Profinity on Windows

On Windows, follow the [Windows Installation Guide](../Installation/Windows_Installation.md) to install Profinity using the setup wizard.

!!! tip "Other Platforms"
    On macOS or Linux, see the [Linux and macOS Installation Guide](../Installation/Zip_Installation.md). For Docker deployments, see the [Docker Installation Guide](../Installation/Docker_Installation.md).

After installation, launch Profinity from the Start Menu, which opens the Profinity homepage. The Windows desktop application signs in automatically with a built-in account, so no login is needed to complete this guide, whereas installations that run Profinity as a web service, such as Docker and Linux, create an `admin` user with the password `password` and require a new password at the first sign in.

!!! warning "Change the Default Password"
    On Docker and Linux installations, change the default password at the first sign in, so that the system is not left running with publicly documented credentials. Select **ADMIN** in the side menu, then the **Change My Password** pill.

## Step 2: Load the Example Profile

Profinity includes an **Example Profile**, which is installed automatically and holds pre-configured components, a dashboard, styling and images that show how a profile fits together.

To load the Example Profile:

1. Select **ADMIN** in the side menu
2. Select the **Profile** pill
3. Click **ACTIVATE** on the **Example Profile** row in the list to make it the active profile

The Example Profile includes the following pre-configured components:

- Prohelion 12v
- Prohelion BMU (Battery Management Unit)
- Three Elmar Solar Maximum Power Point Tracker (MPPT) devices (6A0, 6B0 and 6C0)
- Two Prohelion WaveSculptor 22 Motor Controllers (Left and Right)

It also includes the following dashboard content:

- A home dashboard file with status displays, data visualisations and component monitoring, which the home page uses only after **Custom Home Dashboard** is enabled in the profile settings
- Custom styling and images used by the dashboards
- Data bindings that connect dashboard elements to component data

For more information about profiles, see [Profiles](./Profiles.md).

## Step 3: Run the Example CAN Log

The Example Profile works best with data flowing through the system, and Profinity includes an **Example Log** (`example_log.csv`) that can be replayed to simulate CAN bus traffic.

To replay the Example CAN Log:

1. Select **CAN UTILITIES** in the side menu
2. Select **CAN LOG REPLAY**
3. Select **example_log.csv** from the list of available log files, then click **Play** to start the replay

The log replays CAN bus messages, and data flows through the dashboards in the Example Profile.

!!! info "Replay Controls"
    The playback controls pause, resume and move to a new position in the log. See [How to Replay CAN Bus Logs](../How_To_Guides/Replay_CAN_Logs.md) for the steps and [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) for the full reference.

## Step 4: Edit Your First Dashboard

With the Example Profile running with data, an existing dashboard is the quickest way to learn how dashboards work. With the Example Profile active, the home page is still the standard home page, because the profile's home dashboard is switched off, so start from a component dashboard.

To view and edit a dashboard's source:

1. Select a component in the side menu, for example **Prohelion BMU** or **Prohelion WaveSculptor 22 - Left**
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, which opens the dashboard editor in **DESIGN** mode, the visual editor
3. Select the **YAML** tab to see the dashboard's source

The pencil icon needs the **Modify dashboards** permission. The editor shows the full structure of the dashboard, how each component is configured and how data bindings and styling apply, and it edits visually in **DESIGN** mode or as text in the **YAML** tab. The same pencil icon opens the home dashboard once **Custom Home Dashboard** is enabled, as described in [How to Create a Profile Dashboard](../How_To_Guides/Create_Profile_Dashboard.md).

!!! tip "Read an Existing Dashboard to Learn the Format"
    Every dashboard in Profinity is built with the same dashboard system, so the source of an existing dashboard shows the format that a new dashboard uses.

### Making Your First Edit

To make a simple change:

1. Find a text element or label in the dashboard
2. Change the text content by clicking on the dashboard element and modifying it in the inspector
3. Select **SAVE**, then close the editor

The edit appears on the dashboard behind the editor, because **DESIGN** is an outline and not a live preview. For more detailed information on creating and editing dashboards, see:

- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - the full guide to dashboard development
- [Core Elements](../Customising_Profinity/Dashboards/Core_Elements.md) - dashboard structure
- [Data Binding](../Customising_Profinity/Dashboards/Data_Binding.md) - connecting data to your dashboard
- [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md) - available dashboard components

## Step 5: Look at the Rules and Alerts

With data flowing, Profinity's rules watch your tags and raise alerts when something needs attention. Rules are defined in the profile, and the alerts they raise appear in the Alerts Log and as indicators across the UI.

To view the rules:

1. Select **TAG UTILITIES** in the side menu
2. Select **RULES & ACTIONS** to open the rules editor
3. Expand the rule groups for the Example Profile's battery components

The Example Profile includes battery management system (BMS) alert rules for the Prohelion 12v and the Prohelion BMU, arranged in groups such as **Cell limits** (cell over voltage, under voltage and over temperature) and **Critical status flags** (for example communications timeouts and emergency stop). Open a rule to see the tags it watches, its condition, its `level` and its description.

!!! note "Rules Editor Permissions"
    The **RULES & ACTIONS** entry needs the **View tag rules** permission, and saving changes needs **Modify tag rules**. A signed-in `admin` user holds both. Actions that send an email, Slack message, webhook or MQTT message need the Tag Rule Actions feature, as described in [Rule Actions and Scripts](../Tags/Actions.md).

To view the alerts:

1. Select **ALL ALERTS** in the side menu to open the Alerts Log
2. On the **Active** tab, see any alerts currently firing
3. Select the **History** tab to see earlier alerts, newest first
4. Select an alert to **Acknowledge** it, or **Silence** it for a set number of minutes

Alerts also show as a yellow triangle on dashboard widgets bound to the affected tag, and on the matching leaf in Tag Explorer. The web client refreshes these every four seconds, so they appear and clear as the data changes.

!!! tip "Read an Existing Rule to Learn the Format"
    Open a rule in the editor, note the condition it uses, then find the tag it watches in Tag Explorer to see what would make it fire.

For more detail, see:

- [Alerts Log](../Tags/Alerts.md) - alert levels, indicators, acknowledging and silencing
- [Rule Actions and Scripts](../Tags/Actions.md) - what happens when a rule fires
- [Tag Expressions](../Tags/Tag_Expressions.md) - writing rule conditions
- [Tags](../Tags/index.md) - how tags, collections, rules and alerts fit together

## Next Steps

From here, the following pages cover the usual next tasks:

- [Adding Components to Your Profile](./Adding_New_Components.md) - add further components
- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md) - build your own dashboard
- [Visualising Data](./Visualising_Data.md) - see data from your components
- [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) - set up CAN bus logging
- [Creating a User](./Create_User.md) - create additional users, which needs the Profinity Server feature
- [Tags](../Tags/index.md) - create rules and alerts for your system

## Getting Help

- The [Dashboard Troubleshooting Guide](../Customising_Profinity/Dashboards/Troubleshooting.md) covers common issues.
- The [Dashboard FAQ](../Customising_Profinity/Dashboards/FAQ.md) answers frequently asked questions.
- Contact Prohelion through the **Feedback** pill on the **ADMIN** page.
