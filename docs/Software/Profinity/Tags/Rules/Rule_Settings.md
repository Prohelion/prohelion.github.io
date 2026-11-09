---
title: Rule settings
description: Look up evaluation settings for a tag rule, including on update and related tags, how it publishes its state, and the permissions it needs.
type: reference
owner: Documentation
last_reviewed: 2026-11-10
---

# Rule settings

This page lists the settings that control how a [tag rule](index.md) is evaluated and published, and the permissions that control who can view and edit rules.
Every setting except `dwellMinutes` is available in the rules visual editor.
Set `dwellMinutes` in `rules.yaml` only.
[Complete rules.yaml example](Rules_YAML_Example.md) shows most of them in one file.

## Settings in the rules editor

The editor exposes these settings for evaluation:

- **Rule level** and **Rule type** for each rule.
- **Dwell seconds**, **Throttle minutes**, **On update**, **Related tags**, and the **More information links** for each rule.
- **When the tag is unreadable** for each rule.
- **Clear value (deadband)** and **Clear expression (deadband)** for each threshold step, and **Clear expression (deadband)** for a boolean rule.
- **Evaluation tick (seconds)** on the rule source of a profile or component.
- **Publish state tag path** in the **Rule State** group of each rule.

Dwell, throttle and the evaluation tick are off unless you set them. A rule's level is Info unless you set it.

## Dwell and deadband

Rules support two settings that stop an alert flickering on and off:

- *Dwell*: the condition must hold for a set time before the alert trips. Set it with `dwellSeconds` or `dwellMinutes`, and use only one of them on a rule, because setting both is an error when the rules load.
- *Deadband*: the alert clears at a different point from where it tripped. Set it with `clearValue` or `clearExpression` on a threshold step, and with `clearExpression` on a boolean rule.

## On update

**On update**, `onUpdate` in YAML, is off unless you set it.
When it is on, the rule re-runs its true actions if the watched value changes while the alert stays true, or while a threshold rule stays on the same step.
The Alerts Log records that as an `Updated` transition.
A change that first trips the rule, or that moves to another threshold step, still uses the usual enter or leave behaviour and does not also fire as an update.

The same value does not send again.
Throttle, silence, and the licence check still suppress the send.
A suppressed send is not treated as already sent, so the next allowed change can still send.
A rule with dwell only updates after it has activated.

After Profinity restarts, an active alert is restored.
The first evaluation takes the current value as already sent, so the rule does not send again until the value changes.

The [AI Technician](../../Profinity_AI/AI_Technicians/AI_Technician.md#built-in-rules) **Findings message** rule uses **On update** so two attention findings with different text each send.

## Related tags

**Related tags**, `relatedTags` in YAML, is a map of alias to tag path, in the same shape as a derived tag's dependencies.
An alias is available in the rule `expression` and `clearExpression`, with the same reading members as a derived-tag alias (`Value`, `Text`, `Bool`, `HasValue`, `Quality`, `IsStale`).
The same alias is a `{alias}` token in the action message, as described under [Message placeholders](Actions/index.md#message-placeholders).

A path with no leading `/` joins under the component's tag root on a component rules file, and is a path from the tag tree root on the profile file.
A path that starts with `/` is from the tag tree root.
The Alerts Log detail dialog lists the related tag paths under **RELATED TAGS**.

The rule still evaluates only when its own scope tag changes.
A change to an alias tag alone does not re-run the rule.

An alias must start with a letter or underscore and then contain only letters, digits, and underscores.
Profinity refuses an empty alias, a duplicate alias, and an alias that collides with `tag` or with a built-in message placeholder such as `Value` or `TagId`.
An alias tag that has no value has `HasValue` false in the expression and expands to empty text in the message.

## Throttle and more information links

- **Throttle minutes**, `throttleMinutes` in YAML, stops the actions of one rule on one tag from running again within that number of minutes. It applies to both the trip and the clear.
- **More information links**, `moreInformation` in YAML, adds links to a rule. Each has a `description` label and an `https://` `url`, and the Alerts Log detail dialog lists them under **DOCUMENTATION**.

## Unreadable tags

A tag is unreadable when it has no value, for example while a device is offline.
By default a rule holds its current state while its tag is unreadable.
An alert that is active stays active, and an alert that is clear stays clear, until the tag can be read again.
A short dropout therefore keeps an alert in its current state, because a missing reading leaves open whether the condition has passed.

A rule that alerts on a lost reading, such as `!tag.HasValue`, must be evaluated while the tag is unreadable, or it cannot trip once the tag has been read.
Set **When the tag is unreadable** to **Evaluate the rule** for that rule, or set `onUnreadable: evaluate` in YAML:

```yaml
- rule:
    id: temperature_sensor_lost
    expression: "!tag.HasValue"
    onUnreadable: evaluate
```

The setting takes `hold` (the default) or `evaluate`.
Any other value skips that rule, and the other rules in the file still load.
Add `onUnreadable: evaluate` to any rule from an earlier release whose expression reads `HasValue` or `Quality`, because those rules stop running while the tag is unreadable, unless you ask.
After a rules file is saved or reloaded, a tag that was readable before the save is still treated as one that has dropped out, so its rules hold their current alert state until it is read again.

## Evaluation tick

The **Evaluation tick (seconds)** setting, `evaluationTickSeconds` in YAML, takes a whole number from 1 to 3600.
Profinity refuses an evaluation tick outside 1 to 3600 when you save the rules or upload a rules file. A value that you edit into `rules.yaml` by hand is not range-checked on load, so keep it within 1 to 3600.
Rules evaluate whenever a tag in their scope changes.
The tick adds a periodic extra pass.

This is the only way a `tag.IsStale` rule can fire for a tag that has stopped changing.
A rule that tests for stale or missing data needs the tick to be set in at least one loaded rules file.
When several rules files set a tick, the smallest value applies to the whole profile.
A low value in one file therefore changes how often every file is evaluated.

## Condition examples

Conditions use the same `tag` expression language as collections, so a numeric trip and clear pair is written as follows.
The first line trips the rule and the second line clears it, as its `clearExpression`:

```text
tag.Value > 4.2
tag.Value < 4.0
```

A no-data or stale sensor condition is written as follows.
The term `!tag.HasValue` is true while a tag has no value, including when its device is offline.
Set the rule to evaluate while the tag is unreadable, as described under [Unreadable tags](#unreadable-tags):

```text
!tag.HasValue || tag.IsStale
```

## Rule state publishing

A rule can publish its own current state to a tag.
Set **Publish state tag path** in the **Rule State** group of a rule in the Rules editor.
Profinity then mirrors the rule's state to that tag path whenever it changes:

- A boolean rule publishes `true` or `false`.
- A threshold rule publishes the zero-based index of its active step, or `-1` when no step is active.

The tag is read-only, so only the rule can write to it.
When the rules load, the tag takes the state the rule last had, which Profinity restores from the alert log.
If the rule has no history, the tag starts at `false` (`-1` for a threshold rule).

A rule has a single state tag, even when its scope matches many tags.
Every matching tag writes to the same state tag, so the value shown is that of whichever matching tag changed state most recently.
It is not a summary of all of them.

Where the state of each tag matters, define one rule per tag, each with its own **Publish state tag path**.
Do not give two rules the same path.
Profinity does not load the rules when two of them share a path, and the error names both rules.

## Permissions

| Task | Permission |
|------|------------|
| View rules | **View tag rules** |
| Edit rules | **Modify tag rules** |
| View alerts | **View alerts** |

To attach actions to a rule, refer to [Rule actions](Actions/index.md).
