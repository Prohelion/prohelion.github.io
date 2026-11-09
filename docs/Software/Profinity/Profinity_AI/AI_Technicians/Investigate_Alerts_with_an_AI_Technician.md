---
title: Investigate alerts with an AI technician
description: Add an AI technician as a rule action so a device alert starts a review, and read the technician's finding as a second alert.
type: task
owner: Documentation
last_reviewed: 2026-11-09
---

# Investigate alerts with an AI technician

An [AI Technician](./AI_Technician.md) can be a [rule action](../../Tags/Rules/Actions/index.md), so an alert on a device starts a round.
The device alert is raised straight away, and the technician's finding follows as a second alert from its own **Findings severity** rule when the round ends.

## Before you start

- The technician is set up and its first round has finished, as described in [Set up an AI technician](./Set_Up_an_AI_Technician.md).
- The instructions say what to look at when an alert wakes the technician, as in the alert investigation example in [Write instructions](./Write_Instructions.md#example-an-alert-investigation).
- The profile has the **Tag Rule Actions** licensed feature, included in the **Server** and **Enterprise** editions.
- You can edit the device's rules, as described in [Rule settings](../../Tags/Rules/Rule_Settings.md#permissions).

## Add the technician to a device rule

1. Open the device rule in the rules visual editor, as described in [Create a rule](../../Tags/Rules/Create_a_Rule.md).
2. In the action picker, choose the technician by its component name, such as `MotorTechnician`.
3. Add it to the rule's actions, or to the threshold step that should start a review.
   Do not add it to the clear actions, because the technician starts a round each time it runs, including when an alert clears.
4. Save the rules.

The technician is told which alert woke it: the rule, the level, the tag, its value, and the alert message.
For a rule that watches many tags, it is given up to 20 of the tags that were true when the rule fired, and how many there were in all.
The round report starts with the rule, transition, and tag that woke it.

## Example

This example raises a Warning when the motor temperature passes 80 °C and wakes `MotorTechnician`, and raises an Error above 95 °C without waking it again.
It is written in the same form as the [Complete rules.yaml example](../../Tags/Rules/Rules_YAML_Example.md).

```yaml
version: "2.3"
rules:
  displayName: Motor alerts
  enabled: true
  scope:
    prefix: Vehicles/Car1/Motor
  rules:
    - rule:
        id: motor_temperature
        displayName: Motor temperature
        type: threshold
        scope:
          prefix: MotorTemperature
        expression: tag.HasValue
        throttleMinutes: 15
        thresholds:
          - condition: { operator: ">", value: 80 }
            clearValue: 75
            level: Warning
            message: Motor temperature above 80 C
            actions:
              - action: ProfinityLog
              - action: MotorTechnician
          - condition: { operator: ">", value: 95 }
            clearValue: 90
            level: Error
            message: Motor temperature above 95 C
            actions:
              - action: ProfinityLog
```

The `throttleMinutes` on the device rule and the technician's **Alert cooldown (minutes)** both limit how often the alert starts a round.
A device that alerts often should rely on the throttle, so the technician's **Daily limit** is left for the alerts that matter.

## Read the finding

When the round ends:

1. The technician's findings tags update, and **Findings severity** raises or clears its alert in the [Alerts Log](../../Tags/Alerts.md).
2. The `Wake` findings tag reads `alert`.
3. The `Report` tag starts with `source=Rule motor_temperature`, followed by the transition, the tag, and the alert message.

If no finding follows the device alert, the wake was dropped.
Refer to [Troubleshooting](./AI_Technician.md#troubleshooting) to find the reason in the Profinity log.
