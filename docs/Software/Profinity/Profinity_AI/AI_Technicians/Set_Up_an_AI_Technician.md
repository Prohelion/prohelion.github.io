---
title: Set up an AI technician
description: Add an AI technician to a profile, give it a service account, instructions and a schedule, and check its first finding.
type: task
owner: Documentation
last_reviewed: 2026-11-11
---

# Set up an AI technician

This page adds an [AI Technician](./AI_Technician.md) to a profile, runs its first round, and schedules a daily review.

## Before you start

- [Profinity AI](../index.md) is licensed and configured under [Profinity AI settings](../../Administration/System_Configuration/AI_Settings.md), and the [MCP Server](../../Integrating_to_Profinity/MCP_Server/index.md) is turned on.
- You have the **Allow component actions** permission and the permission to change the profile.
- You have the **Security administration** permission, to create the role and service account in the next section.

## Create the service account

Each round signs in as a service account, so the account's roles decide what the technician can read.

1. Create a role for the technician, as described in [Create a role](../../Administration/Users_and_Access/Create_a_Role.md).
   Give it **MCP integration**, **View tags**, **View alerts**, and **View tag rules**.
   Leave out every permission that changes something.
2. Create a service account with that role, as described in [Service accounts](../../Administration/Users_and_Access/Service_Accounts.md).
   Note its user name.

## Add the technician

1. Add an **AI Technician** from the **AI Agents** group, as described in [How to add a component to a profile](../../How_To_Guides/Add_Component_to_Profile.md).
2. Give it a **Name** that says what it reviews, such as `DriveTechnician`.
   Rules use this name when they add the technician as an action.
3. On the **Settings** tab, set **Run as** to the service account.
   The list is the enabled users.
4. Open the **Instructions** tab and edit the example.
   Say how far back the review looks, and change the rest to match the site, as described in [Write instructions](./Write_Instructions.md).
5. Leave **Schedule** on **No schedule** for now, and save.

## Run the first round

1. Select **Run AI Technician** on the technician.
   The dashboard **STATUS** reads `running` until the round ends, and the **Last round** panel shows each step as it happens.
2. Open the **Findings** panel on the technician dashboard.
   **Outcome** reads `attention` or `clear`, and **Message** summarises the finding.
3. Open the `Report` tag in **TAG EXPLORER** and read the report.
   Check that the technician looked at the data the instructions asked for.

If **Outcome** reads `blocked`, **Message** gives the reason.
Refer to [Troubleshooting](./AI_Technician.md#troubleshooting) on the component page.

Each press of Run AI Technician counts towards **Daily limit**, which is in the **Limits** group of the technician's settings, so once that many presses and alert rounds have run today, further presses are dropped until midnight in the machine's local time.

## Schedule the review

1. On the **Settings** tab, set **Schedule** to **Run On CRON Schedule**.
2. Set **Cron Schedule** to a Quartz cron expression, such as `0 0 0 * * ?` for midnight every day.
   For a repeating gap instead, set **Schedule** to **Run On Time Interval**, set **Time Interval** to a whole number of at least 1, and set **Time Interval Unit** to **Seconds**, **Minutes**, **Hours** or **Days**.
3. Save, and check that the dashboard **NEXT** shows the next round in UTC.

## Send the findings on

The technician ships rules on its findings tags, with no actions attached.
To be told about a finding, add an action to **Findings message** with **Edit Rules** on the technician, such as an email.
That rule sends again when a new attention finding has different text, even at the same severity.
Refer to [Built-in rules](./AI_Technician.md#built-in-rules) on the component page, and to [Rule actions](../../Tags/Rules/Actions/index.md) for the actions available.

To have device alerts start a round, continue to [Investigate alerts with an AI technician](./Investigate_Alerts_with_an_AI_Technician.md).
