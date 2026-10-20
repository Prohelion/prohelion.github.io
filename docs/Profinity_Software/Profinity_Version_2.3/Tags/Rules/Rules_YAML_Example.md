---
title: Complete rules.yaml example
description: Read a complete rules.yaml with file and group actions, a threshold rule with dwell and deadband, and a boolean rule that uses a collection.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Complete rules.yaml example

The [rules visual editor](index.md#rules-visual-editor) writes rules to a file, shown here in full so that every setting is in one place, and the file can also be edited directly.
It has one rules source with a file-level scope, actions inherited by every rule beneath it, a group with its own action, a threshold rule and a boolean rule that uses a collection.
It assumes a collection with the id `Collection1`, which is the id the editor generated for the collection created in [Create a collection](../Collections/Create_a_Collection.md), and two actions named `OpsSlack` and `OpsEmail` that were added as described under [Making an action available](Actions/index.md#making-an-action-available).

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

Its `scope.prefix` of `Vehicles/Car1` is the default for every rule.
A `prefix` written without a leading `/` in a group or rule joins beneath its parent, so `pack_temperature` watches `Vehicles/Car1/Battery/PackTemperature`, while a prefix with a leading `/` replaces the inherited one and `/` alone covers the whole tag tree.
Every rule must end up with a `prefix`, a `collection` or both, and when both are present a tag has to satisfy both.
A rules file that belongs to a component is written relative to that component, so its prefixes start from the component's own place in the tag tree.

The `pack_temperature` rule is a threshold rule, which holds an ordered list of steps in `thresholds`, each with a `level` and a `message` and either a structured `condition` (the operators are `==`, `!=`, `>`, `>=`, `<`, `<=` and `between`) or an `expression`.
The `clearValue` on a step is its deadband, so the Warning step stays active until the value falls below 42, and `clearExpression` does the same job for a step that uses an `expression`.
A threshold rule still needs a rule-level `expression`, and `tag.HasValue` is the usual choice, but it takes its level from each step, so it must not set a rule-level `level`, `actions` or `clearActions`.
The `dwellSeconds` value (or `dwellMinutes`, never both) makes the condition hold continuously before the first step activates, and the `throttleMinutes` value stops the actions of one rule on one tag from running again within that number of minutes, on both the trip and the clear.
The `cell_over_voltage` rule is a boolean rule, which has a single `level`, a `clearExpression` that clears the alert even while the main `expression` is still true, and its own `actions` and `clearActions`.

The `description` is the text the operator reads in the detail dialog of the [Alerts Log](../Alerts.md) and supports Markdown.
The `moreInformation` list adds links, each with a `description` label and an `https://` `url`, which the dialog lists under **DOCUMENTATION**, and `relatedTags` stores tag paths that help diagnose the alert with the rule.
Beyond the example, a rule, group or file takes `enabled: false` to switch everything beneath it off.

Actions written on the file or on a group are inherited by the rules beneath them, as described under [Actions inherited down the rule tree](Actions/index.md#actions-inherited-down-the-rule-tree), so in the example a Warning on `pack_temperature` runs only **Profinity Log**, an Error runs **Profinity Log** and `OpsSlack`, and the Fatal step also runs `OpsEmail` from the group.

For the editor, evaluation settings and permissions, refer to [Tag rules](index.md).
