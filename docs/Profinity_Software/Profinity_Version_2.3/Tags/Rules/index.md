---
title: Tag rules
description: Understand how tag rules watch tags, raise alerts at set levels, and run actions, and where to write rules, configure them, and attach actions.
type: concept
owner: Documentation
last_reviewed: 2026-10-15
---

# Tag rules

A tag rule watches the tags in its scope and, when its condition changes, records an alert in the [Alerts Log](../Alerts.md) and runs the actions attached to it.
This page explains how rules work.
[Create a rule](Create_a_Rule.md) walks through an example, [Rule settings](Rule_Settings.md) looks up evaluation settings and permissions, and [Complete rules.yaml example](Rules_YAML_Example.md) shows a full `rules.yaml` that uses most of the settings.
[Rule actions](Actions/index.md) covers the actions that a rule can run, such as Email, Slack, Webhook, and Message Queuing Telemetry Transport (MQTT).

!!! info "Rules need no licence"
    Rules and the Alerts Log work on every edition.
    The Email, Slack, Webhook, MQTT, and script actions need the **Tag Rule Actions** licensed feature, as described in [Rule actions](Actions/index.md).
    Refer to [Licensing](../../Licensing.md) for what each edition includes.

## How a rule works

A rule has a scope that says which tags it watches, a condition, an alert level, and optional actions.
Rules evaluate whenever a tag in their scope changes.

A threshold rule holds ordered steps, and one evaluation can cross more than one of them.
Profinity then runs an action for each step it enters or leaves, in order, and starts the next action without waiting for a [rule script](../../Developing_with_Profinity/Scripting/Script_Types/Rule_Scripts.md) to finish.
Set **Trigger Overlap** to **Queue** on that script when the action for the step the value lands on must still run.
**Drop**, the default, discards an action that arrives while the script is still running, and that action is not tried again.
The setting is described under [Trigger overlap](../../Developing_with_Profinity/Scripting/Script_Types/Rule_Scripts.md#trigger-overlap).

The condition is written in the [tag expression](../Selecting_Tags/Tag_Expressions.md) language.
For example, `tag.Value > 4.2` trips the rule (raises the alert) and `tag.Value < 4.0` clears it, while `tag.IsStale` catches a sensor that has stopped reporting.
A `tag.IsStale` rule fires for a tag that has stopped changing only when an evaluation tick is set, as described under [Evaluation tick](Rule_Settings.md#evaluation-tick).
The valid alert levels, their aliases and the default are described under [Alert levels](../Alerts.md#alert-levels).
Each rule also has a `description` that the Alerts Log shows to the user.

<figure markdown>
![A rule evaluated continuously over time, with dwell and deadband shown against a rising value, severity tiers from Warning through Fatal, and the same rule fanning out to raise one alert per tag in a collection](../../images/diagram-rules.png)
<figcaption>Dwell, deadband and severity levels on a rule</figcaption>
</figure>

Two settings stop an alert flickering on and off.
Dwell holds the alert back until the condition has lasted a set time, and deadband clears the alert at a different point from where it tripped.
A rule can also mirror its current state to a read-only tag, so that dashboards and other rules can use it.
[Rule settings](Rule_Settings.md) describes dwell, deadband, the evaluation tick and rule state publishing.

## Rules visual editor

Select **RULES & ACTIONS** under **TAG UTILITIES** in the side menu, which needs the **View tag rules** permission.
Alternatively, choose **Edit Rules** on a component that ships default rules, such as the Elmar Solar MPPT (Maximum Power Point Tracker) and the C48 Gen2.
The editor lists the profile's rules first and then each component's rules.
It shows every rule with its level, scope, thresholds, and actions.

<figure markdown>
![The Editing Rules dialog with a rule set list, groups of rules such as Cell limits, and an Inspector showing the selected rule set's scope prefix, collection and enabled setting.](../../images/rules-visual-editor.png)
<figcaption>Rules visual editor with an expanded rule</figcaption>
</figure>

The editor writes the same `rules.yaml` document that can be edited directly.
To build a rule in the editor, refer to [Create a rule](Create_a_Rule.md).
For the rest of the tag layer, refer to [Tag expressions](../Selecting_Tags/Tag_Expressions.md), [Collections](../Collections/index.md), [Derived tags](../Derived_Tags/index.md) and [Tag layer](../index.md).
