---
title: Quick start guide
description: "Install Profinity 2.3 on Windows, apply a licence, load an example profile, replay CAN logs, edit your first dashboard and look at rules and alerts."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-14
---

# Quick start guide

This guide takes you from a fresh installation to a running system in six steps: installing Profinity, applying a licence if one has been issued, loading the example [profile](Profiles.md), replaying example CAN logs, editing your first dashboard, and looking at the rules and alerts.
To install Profinity on Linux or macOS instead, refer to [Install Profinity on Linux and macOS](../Installation/Linux_and_macOS_Installation.md), and for Docker deployments, refer to [Install Profinity with Docker](../Installation/Docker_Installation.md).

## Step 1: Install Profinity on Windows

Follow [Install Profinity on Windows](../Installation/Windows_Installation.md) to install Profinity with the Setup Wizard.
After installation, launch Profinity from the Start menu, which opens the Profinity homepage.
The Windows desktop application signs in automatically with a built-in account, so no sign-in is needed to complete this guide.
Installations that run Profinity as a web service, such as Docker and Linux, and a Windows installation that holds a Server licence, create an `admin` user with the password `password` and require a new password at the first sign-in.

!!! warning "Change the default password"
    On Docker and Linux installations, and on any installation where you sign in as the default `admin` user, change the password at the first sign-in, so that the system is not left running with publicly documented credentials.
    Select **ADMIN** in the side menu, then the **Change My Password** pill.

## Step 2: Apply a licence

You do not need a licence to complete the rest of this guide, because an unlicensed Desktop installation runs for personal, non-commercial use and other installations start a 14-day local trial.
When Prohelion has issued a commercial or evaluation licence, apply it now:

1. Select **ADMIN** in the side menu, then the **License** pill.
2. Copy the **Fingerprint** and send it to Prohelion, which returns a signed `license.yaml` file for this installation.
3. Select **Update license file** and choose the `license.yaml` file, then check that **State** reads `Valid`.

The **License** pill needs the **Security administration** permission.
For Docker, Linux services, installations with no network access, and what to do when a licence is rejected, refer to [Applying a Licence](../Installation/Applying_a_Licence.md).
For what each edition includes, refer to [Licensing](../Licensing.md).

## Step 3: Load the example profile

Profinity includes an **Example Profile**, which is installed automatically and holds pre-configured components, a dashboard, styling, and images that show how a profile fits together.
To load the Example Profile:

1. Select **ADMIN** in the side menu.
2. Select the **Profile** pill.
3. Select **ACTIVATE** on the **Example Profile** row in the list to make it the active profile.

The Example Profile includes the following pre-configured components:

- Prohelion 12v
- Prohelion BMU (Battery Management Unit)
- Three Elmar Solar Maximum Power Point Tracker (MPPT) devices (6A0, 6B0 and 6C0)
- Two Prohelion WaveSculptor 22 Motor Controllers (Left and Right)

It also includes the following dashboard content:

- A home dashboard file with status displays, data visualisations and component monitoring, which the home page uses only after **Custom Home Dashboard** is enabled in the profile settings
- Custom styling and images used by the dashboards
- Data bindings that connect dashboard elements to component data

For more information about profiles, refer to [Profinity Profiles](./Profiles.md).

## Step 4: Run the example CAN log

The Example Profile works best with data flowing through the system.
Profinity includes an **Example Log** (`example_log.csv`) that you can replay to simulate CAN bus traffic.
To replay the Example Log:

1. Select **CAN UTILITIES** in the side menu.
2. Select **CAN LOG REPLAY**.
3. Select **example_log.csv** from the list of available log files, then select **Play** to start the replay.

The log replays CAN bus messages, and data flows through the dashboards in the Example Profile.
The playback controls pause, resume, and move to a new position in the log.
Refer to [How to Replay CAN Bus Logs](../How_To_Guides/Replay_CAN_Logs.md) for the steps and [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) for the full reference.

## Step 5: Edit your first dashboard

With the Example Profile running with data, an existing dashboard is the quickest way to learn how dashboards work.
With the Example Profile active, the home page is still the standard home page, because the profile's home dashboard is switched off, so start from a component dashboard.
To view and edit a dashboard's source:

1. Select a component in the side menu, for example **Prohelion BMU** or **Prohelion WaveSculptor 22 - Left**.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar, which opens the dashboard editor in **DESIGN** mode, the visual editor.
3. Select the **YAML** tab to see the dashboard's source.

The pencil icon needs the **Modify dashboards** permission.
The editor shows the full structure of the dashboard, how each component is configured and how data bindings and styling apply, and it edits visually in **DESIGN** mode or as text in the **YAML** tab.
The same pencil icon opens the home dashboard once **Custom Home Dashboard** is enabled, as described in [How to Create a Profile Dashboard](../How_To_Guides/Create_Profile_Dashboard.md).
Every dashboard in Profinity is built with the same dashboard system, so the source of an existing dashboard shows the format that a new dashboard uses.

### Make your first edit

To make a simple change:

1. Find a text element or label in the dashboard.
2. Change the text content by selecting the dashboard element and modifying it in the inspector.
3. Select **SAVE**, then close the editor.

The edit appears on the dashboard behind the editor, because **DESIGN** is an outline and not a live preview.
For more detailed information on creating and editing dashboards, refer to:

- [Dashboard Development Guide](../Customising_Profinity/Dashboards/index.md), the full guide to dashboard development
- [Core Elements](../Customising_Profinity/Dashboards/Core_Elements.md), which covers dashboard structure
- [Data Binding](../Customising_Profinity/Dashboards/Data_Binding/index.md), which connects data to your dashboard
- [Component Reference](../Customising_Profinity/Dashboards/Component_Reference/index.md), which lists the available dashboard components

## Step 6: Look at the rules and alerts

With data flowing, Profinity's rules watch your tags and raise alerts when something needs attention.
Rules are defined in the profile, and the alerts they raise appear in the Alerts Log and as indicators across the UI.
To view the rules:

1. Select **TAG UTILITIES** in the side menu.
2. Select **RULES & ACTIONS** to open the rules editor.
3. Expand the rule groups for the Example Profile's battery components.

The Example Profile includes battery management system (BMS) alert rules for the Prohelion 12v and the Prohelion BMU, arranged in groups such as **Cell limits** (cell over voltage, under voltage and over temperature) and **Critical status flags** (for example communications timeouts and emergency stop).
Open a rule to see the tags it watches, its condition, its `level` and its description.
To find what would make a rule fire, note the condition it uses, then find the tag it watches in Tag Explorer.

The **RULES & ACTIONS** entry needs the **View tag rules** permission, and saving changes needs **Modify tag rules**.
A signed-in `admin` user holds both.
Actions that send an email, Slack message, webhook, or MQTT message need the Tag Rule Actions feature, as described in [Rule Actions](../Tags/Rules/Actions/index.md).

To view the alerts:

1. Select **ALL ALERTS** in the side menu to open the Alerts Log.
2. On the **Active** tab, see any alerts currently firing.
3. Select the **History** tab to see earlier alerts, newest first.
4. Select an alert to **Acknowledge** it, or **Silence** it for a set number of minutes.

Alerts also show as a yellow triangle on dashboard widgets bound to the affected tag, and on the matching leaf in Tag Explorer.
The web client refreshes these every four seconds, so they appear and clear as the data changes.
For more detail, refer to:

- [Alerts Log](../Tags/Alerts.md), which covers alert levels, indicators, acknowledging, and silencing
- [Rule Actions](../Tags/Rules/Actions/index.md), which covers what happens when a rule fires
- [Tag Expressions](../Tags/Selecting_Tags/Tag_Expressions.md), which covers writing rule conditions
- [Tags](../Tags/index.md), which explains how tags, collections, rules, and alerts fit together

## Next steps

From here, the following pages cover the usual next tasks:

- [How to add a component to your profile](../How_To_Guides/Add_Component_to_Profile.md) adds further components.
- [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md) builds your own dashboard.
- [Log / Replay CAN bus Messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md) sets up CAN bus logging.
- [Create a user](./Create_User.md) creates additional users, which needs the Profinity Server feature.
- [Tags](../Tags/index.md) creates rules and alerts for your system.

Before you create users, read the **Choose roles** section of [Create a user](./Create_User.md#choose-roles), which explains how to decide what access each person needs.

## Getting help

- The [Dashboard Troubleshooting Guide](../Customising_Profinity/Dashboards/Troubleshooting.md) covers common issues.
- The [Dashboard FAQ](../Customising_Profinity/Dashboards/FAQ.md) answers frequently asked questions.
- Contact Prohelion through the **Feedback** pill on the **ADMIN** page.
