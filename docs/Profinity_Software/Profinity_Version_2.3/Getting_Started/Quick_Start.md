---
title: Quick start guide
description: "Install Profinity 2.3, load the Example Profile, replay a CAN log, edit your first dashboard and look at rules and alerts, with no hardware or licence."
type: tutorial
owner: Documentation
last_reviewed: 2026-10-28
---

# Quick start guide

By the end of this guide, Profinity 2.3 is running with live example data on its dashboards, and you have edited a dashboard.
You do not need a licence, a CAN bus adapter or any hardware.

You need the Profinity installer or image from Prohelion, on Windows, Linux, macOS, or Docker.

## Step 1: Install Profinity and sign in

1. Install Profinity, as described in [Install Profinity on Windows](../Installation/Windows_Installation.md), [Install Profinity on Linux and macOS](../Installation/Linux_and_macOS_Installation.md), or [Install Profinity with Docker](../Installation/Docker/index.md).
2. On Windows, start Profinity from the Start menu.
   The Windows desktop application signs you in automatically, so you do not need a username or password.
3. On Linux, macOS, and Docker, open `http://localhost:18080` in a browser and sign in as `admin` with the password `password`.
   Profinity asks you to set a new password at the first sign-in.

The Profinity homepage opens.
An unlicensed Windows desktop installation is limited to personal, non-commercial use.
For licences, refer to [Apply a licence](../Installation/Applying_a_Licence.md) and [Licensing](../Licensing.md).

## Step 2: Load the example profile

Profinity includes an **Example Profile** that holds pre-configured components, a dashboard, styling, and images.
To make it the active [profile](Profiles.md):

1. Select **ADMIN** in the side menu.
2. Select the **Profile** pill, a tab on the **ADMIN** page.
3. Select **ACTIVATE** on the **Example Profile** row.

The side menu now lists the Example Profile components, such as **Prohelion BMU** and **Prohelion WaveSculptor 22 - Left**.
The profile also includes:

- A Prohelion 12v.
- A Prohelion Battery Management Unit (BMU).
- Three Elmar Solar Maximum Power Point Tracker (MPPT) devices (6A0, 6B0 and 6C0).
- Two Prohelion WaveSculptor 22 Motor Controllers (Left and Right).

## Step 3: Replay the example CAN log

The components have no data until CAN bus traffic arrives.
Profinity includes an example log, `example_log.csv`, that replays recorded traffic, so you do not need a CAN bus adapter.

1. Select **CAN UTILITIES** in the side menu.
2. Select **CAN LOG REPLAY**.
3. Select **example_log.csv** in the list of log files.
4. Select **Play**.

The dashboards of the Example Profile components now show moving data.
Open **Prohelion BMU** in the side menu to check.
The playback controls pause, resume, and move to a new position in the log.
For the full set of controls, refer to [Log / replay CAN bus messages](../CAN_Utilities/Logging_Replaying_CAN_Bus_Messages.md).

## Step 4: Edit your first dashboard

You need the **Modify dashboards** permission, which the desktop user and the `admin` account hold.
Every dashboard in Profinity is built the same way, so the source of an existing dashboard shows the format for a new one.

1. Select **Prohelion BMU** in the side menu.
2. Select the pencil (**Edit Dashboard**) icon in the menu at the right of the dashboard title bar.
   The dashboard editor opens in **DESIGN** mode, the visual editor.
3. Select the **YAML** tab to see the dashboard source.
4. Select the **DESIGN** tab again, then select the label of any readout.
5. Change the label text in the inspector.
6. Select **SAVE**, then close the editor.

The dashboard now shows your new label.
**DESIGN** mode shows an outline, not a live preview, so the change is visible only after you close the editor.

The home page is still the standard home page, because the Example Profile home dashboard is off until **Custom Home Dashboard** is enabled.
To edit the home page, refer to [Profile Dashboard](../Administration/Profile_Dashboard.md).

## Step 5: Look at the rules and alerts

With data flowing, Profinity rules watch your tags and raise alerts when something needs attention.
The Example Profile includes battery alert rules for the Prohelion 12v and the Prohelion BMU.

1. Select **TAG UTILITIES** in the side menu.
2. Select **RULES & ACTIONS**.
3. Expand a rule group, such as **Cell limits** or **Critical status flags**.
4. Open a rule to see the tags it watches, its condition, its `level` and its description.

To see alerts, select **ALL ALERTS** in the side menu to open the Alerts Log.
The **Active** tab lists alerts that are firing now, and the **History** tab lists earlier alerts, newest first.
Select an alert to **Acknowledge** it, or to **Silence** it for a set number of minutes.

The desktop user and the `admin` account can view and change rules.
Actions that send an email, Slack message, webhook, or Message Queuing Telemetry Transport (MQTT) message need the Tag Rule Actions licensed feature, as described in [Rule actions](../Tags/Rules/Actions/index.md).

## Next steps

You now have a running system with data, a dashboard you have edited, and a view of its alerts.
Choose the next job:

- To add your own device, refer to [How to add a component to your profile](../How_To_Guides/Add_Component_to_Profile.md).
- To build a dashboard of your own, refer to the [Profinity dashboard development guide](../Customising_Profinity/Dashboards/index.md).
- To write your own rule conditions, refer to [Tag expressions](../Tags/Selecting_Tags/Tag_Expressions.md) and the [Alerts Log](../Tags/Alerts.md).
- To give other people access, refer to [Create a user](./Create_User.md), which needs a Server licence.

If a dashboard does not work as described, refer to the dashboard [Troubleshooting guide](../Customising_Profinity/Dashboards/Troubleshooting.md) or the dashboard [Frequently asked questions](../Customising_Profinity/Dashboards/FAQ.md).
To contact Prohelion, use the **Feedback** pill on the **ADMIN** page.
