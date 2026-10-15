---
title: Tag rules
description: "Write tag rules in rules.yaml or the visual editor, set alert levels and thresholds, and attach actions that run when a rule fires."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
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
![The Editing Rules dialog with a rule set list, groups of rules such as Cell limits, and an Inspector showing the selected rule set's scope prefix, collection and enabled setting.](../images/2.3-rules-visual-editor.png)
<figcaption>Rules visual editor with an expanded rule</figcaption>
</figure>

The editor writes the same `rules.yaml` document that can be edited directly, and it exposes the settings that control how a rule is evaluated: **Rule level** and **Rule type** for each rule, **Dwell seconds**, **Throttle minutes** and the **More information links**, and the **Evaluation tick (seconds)** on the rules source.
The valid alert levels, their aliases and the default are described under [Alert levels](Alerts.md#alert-levels).
Each rule also has a `description` that the Alerts Log shows to the operator, and a condition written in the [tag expression](./Tag_Expressions.md) language, for example `tag.Value > 4.2` to trip with `tag.Value < 4.0` to clear, or `tag.IsStale` for a sensor that has stopped reporting.

Setting **Publish state tag path** on a rule, in its **Rule State** group, mirrors the rule's current state to a read-only tag, as described under [Rule state publishing](#rule-state-publishing).

## Rule state publishing

A rule can publish its own current state to a tag.
Set **Publish state tag path** in the **Rule State** group of a rule in the Rules editor, and Profinity mirrors the rule's state to that tag path whenever it changes: a boolean rule publishes `true` or `false`, and a threshold rule publishes the zero-based index of its active step, or `-1` when no step is active.
The tag is read-only, so only the rule can write to it.
When the rules load, the tag takes the state the rule last had, which Profinity restores from the alert log, or `false` (`-1` for a threshold rule) when the rule has no history, and it then changes whenever the rule changes state.

A rule has a single state tag even when its scope matches many tags, so every matching tag writes to the same state tag and the value shown is that of whichever matching tag changed state most recently, not a summary of all of them.
Where the state of each tag matters, define one rule per tag, each with its own **Publish state tag path**, and do not give two rules the same path, because Profinity does not load the rules when two of them share a path, and the error names both rules.
Refer to [Actions](./Actions.md) for the actions a rule runs.

## Rule evaluation: dwell and deadband

<figure markdown>
![A rule evaluated continuously over time, with dwell and deadband shown against a rising value, severity tiers from Warning through Fatal, and the same rule fanning out to raise one alert per tag in a collection](../images/2.3-diagram-rules.png)
<figcaption>Dwell, deadband and severity levels on a rule</figcaption>
</figure>

Rules support **dwell**, where the condition must hold for a duration set with `dwellSeconds` or `dwellMinutes`, and **deadband**, where the alert clears at a different point from where it tripped, set on a threshold step with `clearValue` or `clearExpression` and on a boolean rule with `clearExpression`.
Both are configured in the rules visual editor or in `rules.yaml`, and a complete example of each is shown under [A complete rules.yaml example](#a-complete-rulesyaml-example).

The **Evaluation tick (seconds)** setting, `evaluationTickSeconds` in YAML, takes a whole number from 1 to 3600.
Rules evaluate whenever a tag in their scope changes, and the tick adds a periodic extra pass, which is the only way a `tag.IsStale` rule can fire for a tag that has stopped changing.
When several rules files set a tick, the smallest value applies to the whole profile, so a low value in one file changes the evaluation cadence of every file.
A rule that tests for stale or missing data needs the tick to be set in at least one loaded rules file.

Conditions use the same `tag` expression language as collections, so a numeric trip and clear pair is written as follows:

```text
tag.Value > 4.2
tag.Value < 4.0
```

A no-data or stale sensor condition is written as follows:

```text
tag.IsStale
```

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

Actions written on the file or on a group are inherited by the rules beneath them, as described under [Actions inherited down the rule tree](Actions.md#actions-inherited-down-the-rule-tree), so in the example a Warning on `pack_temperature` runs only **Profinity Log**, an Error runs **Profinity Log** and `OpsSlack`, and the Fatal step also runs `OpsEmail` from the group.

## Permissions

| Task | Permission |
|------|------------|
| View rules | **View tag rules** |
| Edit rules | **Modify tag rules** |
| View alerts | **View alerts** |

For the rest of the tag layer, refer to [Tag expressions](./Tag_Expressions.md), [Collections](./Collections.md), [Derived tags](./Derived_Tags.md) and [Tag layer](index.md).
