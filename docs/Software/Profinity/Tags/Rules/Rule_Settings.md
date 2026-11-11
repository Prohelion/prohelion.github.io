---
title: Rule settings
description: Look up evaluation settings for a tag rule, including on update and related tags, how it publishes its state, and the permissions it needs.
type: reference
owner: Documentation
last_reviewed: 2026-11-11
---

# Rule settings

The settings on this page control when a [tag rule](index.md) trips and clears, how it publishes its state, and who can view and edit rules.
Each setting is in the rules visual editor and in the `rules.yaml` file, except `dwellMinutes`, which is in `rules.yaml` only.
[Complete rules.yaml example](Rules_YAML_Example.md) shows most of them in one file.

## Settings

| Setting in the editor | YAML key | Type | Default | Effect |
|---|---|---|---|---|
| **Rule type** | `type` | Choice | `boolean`, or `threshold` when the rule has threshold steps | A boolean rule trips on one expression, and a threshold rule moves between steps. |
| **Rule level** | `level` | Choice | Info | The alert level of a boolean rule. |
| **Dwell seconds** | `dwellSeconds` | Whole number | None | How long the condition must hold before the rule trips. Refer to [Dwell and deadband](#dwell-and-deadband). |
| None | `dwellMinutes` | Whole number | None | The dwell in minutes, in place of `dwellSeconds`. |
| **Throttle minutes** | `throttleMinutes` | Whole number | None | The minutes before the rule's actions can run again for the same tag. Refer to [Throttle and more information links](#throttle-and-more-information-links). |
| **On update** | `onUpdate` | On or off | Off | Runs the true actions again when the value changes while the rule stays tripped. Refer to [On update](#on-update). |
| **Related tags** | `relatedTags` | Alias and tag path pairs | None | Other tags that the expression and the action message can read. Refer to [Related tags](#related-tags). |
| **More information links** | `moreInformation` | Description and `https://` address pairs | None | Links shown with the alert in the Alerts Log. |
| **When the tag is unreadable** | `onUnreadable` | Choice: `hold` or `evaluate` | `hold` | Whether the rule keeps its state or runs while its tag has no value. Refer to [Unreadable tags](#unreadable-tags). |
| **Clear value (deadband)** | `clearValue` | Decimal number | None | On a threshold step with a condition, the value where the step clears, when that differs from where it tripped. A step takes `clearValue` or `clearExpression`, not both. |
| **Clear expression (deadband)** | `clearExpression` | Text | None | On a threshold step or a boolean rule, the expression that clears the alert, when that differs from where it tripped. |
| **Publish state tag path** | `publishStateTagPath` | Tag path | None | A tag that mirrors the rule's state. Refer to [Rule state publishing](#rule-state-publishing). |
| **Evaluation tick (seconds)** | `evaluationTickSeconds` | Whole number, 1 to 3600 | None | An extra evaluation pass at this interval, set on the rule source of a profile or component. Refer to [Evaluation tick](#evaluation-tick). |

## Dwell and deadband

Dwell and deadband stop an alert flickering on and off.

- *Dwell* makes the condition hold for a set time before the alert trips. Set `dwellSeconds` or `dwellMinutes` on a rule, not both, because a rule with both is an error when the rules load.
- *Deadband* makes the alert clear at a different point from where it tripped. Set `clearValue` or `clearExpression` on a threshold step, or `clearExpression` on a boolean rule, which has no `clearValue`.

## On update

When **On update** is on, the rule runs its true actions again each time the watched value changes while the alert stays tripped, or while a threshold rule stays on the same step.
The Alerts Log records each of these as an `Updated` transition.
The change that first trips the rule, and a change to another threshold step, run the usual trip and clear actions only.

A value that is the same as the last one sent does not send again.
A throttle, a silence that a user sets on the alert in the Alerts Log, or the licence check can each hold back a send, and the next change that is allowed then sends.
A rule with a dwell sends updates only after it has tripped.

After Profinity restarts, it restores each active alert and treats the current value as already sent, so the rule sends again when the value next changes.
The [AI Technician](../../Profinity_AI/AI_Technicians/AI_Technician.md#built-in-rules) **Findings message** rule uses **On update**, so two attention findings with different text each send.

## Related tags

**Related tags** is a map of alias to tag path, in the same form as the dependencies of a derived tag.
The expression and the clear expression can read an alias with the same members as a derived-tag alias: `Value`, `Text`, `Bool`, `HasValue`, `Quality`, and `IsStale`.
The action message can use the alias as a `{alias}` placeholder, as described in [Message placeholders](Actions/index.md#message-placeholders), and the Alerts Log detail dialog lists the paths under **RELATED TAGS**.

A path that starts with `/` is a full path from the tag tree root.
A path without a leading `/` is relative to the component in a component rules file, and is a full path in the profile rules file.

The rule runs when its own scope tag changes, so a change to a related tag alone leaves the rule as it is.
An alias tag that has no value has `HasValue` false in the expression, and is empty text in the message.

An alias starts with a letter or underscore, followed by letters, digits, and underscores only.
Profinity refuses an empty alias, a duplicate alias, and an alias that matches `tag` or a built-in message placeholder such as `Value` or `TagId`.

## Throttle and more information links

**Throttle minutes** holds back the actions of one rule on one tag for that many minutes after they run, for both the trip and the clear.

**More information links** adds links to a rule.
Each link has a `description` and an `https://` `url`, and the Alerts Log detail dialog lists them under **DOCUMENTATION**.

## Unreadable tags

A tag is unreadable while it has no value, for example while its device is offline.
With the default `hold`, a rule keeps its state while its tag is unreadable, so an active alert stays active and a clear alert stays clear until the tag can be read again.
A short dropout therefore leaves the alert as it was.

A rule that alerts on a lost reading, such as `!tag.HasValue`, needs `evaluate`, because with `hold` it never runs while the tag is unreadable and so cannot trip.
In YAML:

```yaml
- rule:
    id: temperature_sensor_lost
    expression: "!tag.HasValue"
    onUnreadable: evaluate
```

The entry goes in the list of rules inside a rules source, in the same place as the rules in [Complete rules.yaml example](Rules_YAML_Example.md).
A value other than `hold` or `evaluate` skips that rule, and the other rules in the file still load.
After a rules file is saved or reloaded, every tag starts as unreadable until it is read again, so each rule holds its alert state until then.

## Evaluation tick

Rules run whenever a tag in their scope changes, and **Evaluation tick (seconds)** adds a pass at a fixed interval.
The tick is the only way a `tag.IsStale` rule fires for a tag that has stopped changing, so a rule that tests for stale or missing data needs the tick set in at least one loaded rules file.

When several rules files set a tick, the smallest applies to the whole profile, so a low value in one file changes how often every file runs.
Profinity refuses a value outside 1 to 3600 when you save rules or upload a rules file, and it does not check a value edited into `rules.yaml` by hand, so keep a hand-edited value within that range.

## Condition examples

Conditions use the same `tag` expression language as collections.
A numeric trip at 4.2, with a clear expression at 4.0:

```text
tag.Value > 4.2
tag.Value < 4.0
```

A sensor that has no data or has gone stale, which needs `onUnreadable: evaluate` as described in [Unreadable tags](#unreadable-tags):

```text
!tag.HasValue || tag.IsStale
```

`!tag.HasValue` is true while a tag has no value, including while its device is offline.

## Rule state publishing

With **Publish state tag path** set in the **Rule State** group of a rule, Profinity mirrors the rule's state to that tag whenever it changes.
A boolean rule publishes `true` or `false`, and a threshold rule publishes the zero-based number of its active step, or `-1` when no step is active.

The tag is read-only, so only the rule writes to it.
When the rules load, the tag takes the rule's last state from the alert log, or `false` (`-1` for a threshold rule) when the rule has no history.

A rule has one state tag, even when its scope matches many tags, so the tag shows the state of whichever matching tag changed most recently.
Where the state of each tag matters, define one rule per tag, each with its own path.
Two rules cannot share a path: Profinity refuses to load the rules, and the error names both.

## Permissions

| Task | Permission |
|------|------------|
| View rules | **View tag rules** |
| Edit rules | **Modify tag rules** |
| View alerts | **View alerts** |
