---
title: Rules
description: "Write tag rules in rules.yaml or the visual editor, set alert levels and thresholds, and attach actions that run when a rule fires."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag rules

A tag rule watches the tags in its scope and, when its condition changes, records an alert in the [Alerts Log](Alerts.md) and runs the actions attached to it.
This page covers writing rules.
The [Actions](Actions.md) page covers the actions that a rule can run, such as Email, Slack, Webhook, and MQTT.

!!! info "Licence required"
    Rules and the Alerts Log work on every edition.
    Without the **Tag Rule Actions** licensed feature a rule still evaluates and the alert is still recorded, and only the Email, Slack, Webhook, MQTT, and script actions are skipped.
    Refer to [Licensing](../Administration/Licensing.md) for what each edition includes.

## Rules visual editor

Select **RULES & ACTIONS** under **TAG UTILITIES** in the side menu, which needs the **View tag rules** permission, or choose **Edit Rules** on a component that ships default rules, such as the Elmar MPPT and the C48 Gen2.
The editor lists the profile's rules first and then each component's rules, and shows every rule with its level, scope, thresholds, and actions.

<figure markdown>
![Rules visual editor with an expanded rule showing threshold and dwell fields](../images/2.3-rules-visual-editor.png)
<figcaption>Rules visual editor with an expanded rule</figcaption>
</figure>

The editor writes the same `rules.yaml` document that can be edited directly, and it exposes the settings that control how a rule is evaluated: **Rule level** and **Rule type** for each rule, **Dwell seconds**, **Throttle minutes** and the **More information links**, and the **Evaluation tick (seconds)** on the rules source.
Each rule also has a `description` that the Alerts Log shows to the operator, and a condition written in the [tag expression](./Tag_Expressions.md) language, for example `tag.Value > 4.2` to trip with `tag.Value < 4.0` to clear, or `tag.IsStale` for a sensor that has stopped reporting.

The **Evaluation tick (seconds)** setting, `evaluationTickSeconds` in YAML, takes a whole number from 1 to 3600.
Rules evaluate whenever a tag in their scope changes, and the tick adds a periodic extra pass, which is the only way a `tag.IsStale` rule can fire for a tag that has stopped changing.
When several rules files set a tick, the smallest value applies to the whole profile, so a low value in one file changes the evaluation cadence of every file.
A rule that tests for stale or missing data needs the tick to be set in at least one loaded rules file.

Setting **Publish state tag path** on a rule, in its **Rule State** group, mirrors the rule's current state to a read-only tag, as described in [Rule state publishing](./Derived_Tags.md#rule-state-publishing).

## A complete rules.yaml example

The visual editor writes rules to a file, shown here in full so that every setting is in one place, and the file can also be edited directly.
It has one rules source with a file-level scope, actions inherited by every rule beneath it, a group with its own action, a threshold rule and a boolean rule that uses a collection.
It assumes a collection with the id `CellVoltages`, as in the example under [Collections](./Collections.md#a-worked-collections-example), and two actions named `OpsSlack` and `OpsEmail` that were added as described under [Making an action available](Actions.md#making-an-action-available).

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
          collection: CellVoltages
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

The `description` is the text the operator reads in the detail dialog of the [Alerts Log](Alerts.md) and supports Markdown.
The `moreInformation` list adds links, each with a `description` label and an `https://` `url`, which the dialog lists under **DOCUMENTATION**, and `relatedTags` stores tag paths that help diagnose the alert with the rule.
Beyond the example, a rule, group or file takes `enabled: false` to switch everything beneath it off.

## Actions inherited down the rule tree

Actions written on the file or on a group are parent actions, and each one needs a `triggerLevel`.
A parent action runs for every rule beneath it whose alert level is at or above the `triggerLevel`, taking the level from the rule or, for a threshold rule, from the step that fired.
In the example above, a Warning on `pack_temperature` runs only **Profinity Log**, an Error runs **Profinity Log** and `OpsSlack`, and the Fatal step also runs `OpsEmail` from the group.
Actions written on a rule or on a threshold step are local, take no `triggerLevel` and always run when that rule or step fires.

The `clearActions` lists work the same way when the alert clears.
Each side can be switched off for one rule with `disableActions` and `disableClearActions`, which list an inherited action as the id of its parent, a slash and its name, as in `profile/ProfinityLog`.
For a rules file that belongs to a component, the parent id is the component name instead of `profile`, and for a group it is the group `id`.
Each parent can list a given action name only once, and a rule with `thresholds` cannot also have rule-level `actions` or `clearActions`, so its actions go on the steps.

An action entry may be a bare name or an object with `action` and optionally `message` and `level`, where `message` replaces the text sent for this rule and `level` sets the level that **Profinity Log** writes at.
The `tagId` and `value` fields substitute a different tag path and value for those reported to the action.
An action that is not found, or is not an action component, is reported as `references unknown component` when the rules file loads, and the rule file is not loaded until the name is corrected.

## Alert level

Set `level` on a rule, or on each threshold step, to classify alert severity, and the Alerts Log and the alert indicators combine the active rule state with that level.

The valid levels, from least to most severe, are `Trace`, `Debug`, `Info`, `Warning`, `Error` and `Fatal`.
Level names are not case-sensitive, `Information` is accepted as `Info` and `Warn` as `Warning`, and a rule with no level is treated as `Info`.
An unrecognised level on a rule, threshold step or `triggerLevel` stops the rules file loading and names the rule that holds it, so correct the spelling and save again.
The same names are used as the `triggerLevel` of an action configured on a parent rule file or group.

A script receives the level as the string `RuleLevel`, and the Webhook and MQTT JSON message does not include the level.

## Permissions

| Task | Permission |
|------|------------|
| View rules | **View tag rules** |
| Edit rules | **Modify tag rules** |
| View alerts | **View alerts** |

For the rest of the tag layer, refer to [Tag expressions](./Tag_Expressions.md), [Collections](./Collections.md), [Derived tags](./Derived_Tags.md) and [Tag layer](index.md).
