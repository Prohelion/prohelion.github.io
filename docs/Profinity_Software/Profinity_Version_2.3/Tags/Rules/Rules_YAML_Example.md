---
title: Complete rules.yaml example
description: Read a complete rules.yaml with file and group actions, a threshold rule with dwell and deadband, and a boolean rule that uses a collection.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Complete rules.yaml example

The [rules visual editor](index.md#rules-visual-editor) writes rules to a file, and you can also edit the file directly.
The file is `rules.yaml` by default, in the `rules` folder of the profile directory, which is inside the [artefacts directory](../../Installation/Artifacts_Directory.md#default-locations), and Profinity reloads it when it changes.
This page shows one file that uses most rule settings.
It does not show `dwellMinutes`, a step-level `expression`, or rule state publishing, which [Rule settings](Rule_Settings.md) and the text below describe.
The file has:

- One rules source with a file-level scope.
- Actions inherited by every rule beneath it.
- A group with its own action.
- A threshold rule.
- A boolean rule that uses a collection.

The example assumes two things:

- A collection with the id `Collection1`, which is the id the editor generated for the collection in [Create a collection](../Collections/Create_a_Collection.md).
- Two actions named `OpsSlack` and `OpsEmail`, added as described under [Making an action available](Actions/index.md#making-an-action-available).

```yaml
version: "2.3"
rules:
  displayName: Vehicle alerts
  enabled: true
  evaluationTickSeconds: 30
  scope:
    prefix: Vehicles/Car1
  actions:
    - action: ProfinityLog
      triggerLevel: Info
    - action: OpsSlack
      triggerLevel: Error
  clearActions:
    - action: ProfinityLog
      triggerLevel: Info
  groups:
    - group:
        id: battery
        displayName: Battery
        scope:
          prefix: Battery
        actions:
          - action: OpsEmail
            triggerLevel: Fatal
        rules:
          - rule:
              id: pack_temperature
              displayName: Pack temperature
              type: threshold
              description: >
                Pack temperature is above its normal range. Check the coolant
                pump and fan before the next drive.
              moreInformation:
                - description: Battery cooling guide
                  url: https://docs.example.com/battery-cooling
              relatedTags:
                - Vehicles/Car1/Battery/CoolantTemperature
              scope:
                prefix: PackTemperature
              expression: tag.HasValue
              dwellSeconds: 10
              throttleMinutes: 15
              thresholds:
                - condition: { operator: ">", value: 45 }
                  clearValue: 42
                  level: Warning
                  message: Pack temperature above 45 C
                  clearMessage: Pack temperature back below 42 C
                - condition: { operator: ">", value: 55 }
                  clearValue: 52
                  level: Fatal
                  message: Pack temperature above 55 C
  rules:
    - rule:
        id: cell_over_voltage
        displayName: Cell over voltage
        level: Error
        description: A cell voltage is above 4.2 V.
        scope:
          collection: Collection1
        expression: tag.Value > 4.2
        clearExpression: tag.Value < 4.1
        throttleMinutes: 5
        disableActions:
          - profile/ProfinityLog
        actions:
          - action: OpsEmail
            message: "Cell {TagId} is at {Value} V"
        clearActions:
          - action: OpsEmail
            message: "Cell {TagId} is back to {Value} V"
```

The `scope.prefix` of `Vehicles/Car1` is the default for every rule.
A `prefix` written without a leading `/` in a group or rule joins beneath its parent, so `pack_temperature` watches `Vehicles/Car1/Battery/PackTemperature`.
A prefix with a leading `/` replaces the inherited one, and `/` alone covers the whole tag tree.
Every rule must end up with a `prefix`, a `collection`, or both.
When both are present, a tag has to satisfy both.
A rules file that belongs to a component is written relative to that component, so its prefixes start from the component's own place in the tag tree.

The `pack_temperature` rule is a threshold rule.
It holds an ordered list of steps in `thresholds`.
Each step has a `level` and a `message`, and either a structured `condition` or an `expression`.
The operators for a `condition` are `==`, `!=`, `>`, `>=`, `<`, `<=`, and `between`.

A rule trips when its condition becomes true and raises the alert.
It clears when the alert ends.
Deadband and dwell control when each happens:

- The `clearValue` on a step is its deadband, so the Warning step stays active until the value falls below 42. The `clearExpression` does the same job for a step that uses an `expression`.
- The `dwellSeconds` value makes the condition hold continuously before the first step activates. Use `dwellMinutes` instead for minutes, but never set both.
- The `throttleMinutes` value holds back repeat actions, as described under [Throttle and more information links](Rule_Settings.md#throttle-and-more-information-links).

A rule holds its state while its tag is unreadable, unless it sets `onUnreadable: evaluate`.
The example does not set it, because neither rule alerts on a lost reading.
See [Unreadable tags](Rule_Settings.md#unreadable-tags).

A threshold rule still needs a rule-level `expression`, and `tag.HasValue` is the usual choice.
It takes its level from each step, so it must not set a rule-level `level`, `actions`, or `clearActions`.
When one evaluation crosses more than one step, those steps' actions run in order.
A script named by the actions needs **Trigger Overlap** set to **Queue**, or the action for the step the value lands on is discarded.
See [Trigger overlap](../../Developing_with_Profinity/Scripting/Script_Types/Rule_Scripts.md#trigger-overlap).

The `cell_over_voltage` rule is a boolean rule.
It has a single `level`, and its own `actions` and `clearActions`.
Its `clearExpression` clears the alert even while the main `expression` is still true.

The `description` is the text the user reads in the detail dialog of the [Alerts Log](../Alerts.md), and it supports Markdown.
The `moreInformation` list adds links, as described under [Throttle and more information links](Rule_Settings.md#throttle-and-more-information-links).
The `relatedTags` list holds tag paths that help diagnose the alert.
A rule, group, or file also takes `enabled: false` to switch everything beneath it off.

For which actions each step in this example runs, refer to [Actions inherited down the rule tree](Actions/index.md#actions-inherited-down-the-rule-tree).

For the editor, evaluation settings and permissions, refer to [Rule settings](Rule_Settings.md).
