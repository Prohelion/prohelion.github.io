---
title: Write instructions
description: Write AI technician instructions that say what to check, what counts as attention, and which severity to give, with two worked examples.
type: task
owner: Documentation
last_reviewed: 2026-11-11
---

# Write instructions

The **Instructions** setting tells an [AI Technician](./AI_Technician.md) what to review and how to judge it.
The technician reads the same instructions every round, so clear instructions give the same verdict on the same data.

Add an [AI Technician](./AI_Technician.md) to the profile first, as described in [Set up an AI technician](./Set_Up_an_AI_Technician.md). Selecting **Run AI Technician** to check the instructions needs the **Allow component actions** permission.

## What to put in instructions

Write the instructions to a technician who knows nothing about the site:

1. Say what the device is and what it does.
2. List what to check, by tag or alert name.
3. Say what counts as `attention` and what counts as `clear`.
4. Give the severity for each kind of problem, from Info for something to note to Error for something that needs a person today.
5. Say how far back to look, such as the last 24 hours.
6. Ask for a short message a person can act on, naming the tag and the value.

Profinity tells the technician the previous finding, so the instructions do not need to repeat it.
A new technician starts with the midnight service check example.

## What to leave to rules

A fixed limit, such as a temperature above 45 °C, belongs in a [tag rule](../../Tags/Rules/index.md), which checks every value as it arrives and costs nothing.
Use instructions for judgements a rule cannot make: a trend over the time you named, a pattern across several tags, or whether a set of alerts points to one cause.

## Example: a midnight service check

This example suits a technician with **Schedule** set to **Run On CRON Schedule** and **Cron schedule** set to `0 0 0 * * ?`.
It is the text a new technician starts with.

```text
You review an industrial drive each night.
Look at the last 24 hours.
Check the motor temperature, the output current and the alerts in that time.

Give attention when:
- the motor temperature climbs through those 24 hours and does not settle (Warning)
- the output current stays above its usual band for the load (Warning)
- the same alert has fired more than five times in those 24 hours (Info)
- the motor temperature has gone above its limit (Error)

Give clear when none of these apply.

Write a message of one or two sentences that names the cell or tag and the values you saw.
In the report, list what you checked and what you found for each item.
```

## Example: an alert investigation

This example suits a technician that a tag rule wakes when an alert fires, as described in [Investigate alerts with an AI technician](./Investigate_Alerts_with_an_AI_Technician.md).

```text
You are woken when an alert fires on the motor controller.
Find out whether the alert is a single event or part of a wider problem.

Read the alert that woke you and the alerts on the motor controller from the last 24 hours.
Look at the motor temperature, the bus voltage and the bus current around the time of the alert.

Give attention when:
- the alert repeats a pattern from those 24 hours (Warning)
- other tags show the same fault at the same time (Error)

Give clear when the alert is a single event and the other tags are normal.

Write a message that says whether the alert is isolated or part of a pattern, and why.
```

## Check the instructions

After you change the instructions, select **Run AI Technician** and read the `Report` tag in **TAG EXPLORER**.
If the report skips a check, name that check more plainly.
If the verdict changes between rounds on the same data, make the line between `attention` and `clear` more exact.

## Troubleshooting

| What you see | Cause | What to do |
|---|---|---|
| The report skips one of the checks | The instructions name that check too loosely for the technician to find it | Name the check by tag or alert name, then select **Run AI Technician** and read the `Report` tag in **TAG EXPLORER**. |
| The verdict changes between rounds on the same data | The line between `attention` and `clear` is not exact enough | Make the conditions for `attention` and `clear` more exact, then run the technician again and compare the verdicts. |

