---
title: Tag rules
description: "Write tag rules in rules.yaml or the visual editor, set alert levels and thresholds, and attach actions that run when a rule fires."
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Tag rules

A tag rule watches the tags in its scope and, when its condition changes, records an alert in the [Alerts Log](Alerts.md) and runs the actions attached to it.
This page covers writing rules, and [Complete rules.yaml example](Rules_YAML_Example.md) shows a full `rules.yaml` with every setting in one place.
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
Both are configured in the rules visual editor or in `rules.yaml`, and a complete example of each is shown in [Complete rules.yaml example](Rules_YAML_Example.md).

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

## Permissions

| Task | Permission |
|------|------------|
| View rules | **View tag rules** |
| Edit rules | **Modify tag rules** |
| View alerts | **View alerts** |

For the rest of the tag layer, refer to [Tag expressions](./Tag_Expressions.md), [Collections](./Collections.md), [Derived tags](./Derived_Tags.md) and [Tag layer](index.md).
