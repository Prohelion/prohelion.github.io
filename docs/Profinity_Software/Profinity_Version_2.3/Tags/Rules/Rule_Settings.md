---
title: Rule settings
description: Look up how a rule is evaluated, including dwell, deadband, and the evaluation tick, how a rule publishes its state to a tag, and the permissions rules need.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Rule settings

This page lists the settings that control how a [tag rule](index.md) is evaluated and published, and the permissions that control who can view and edit rules.
Each setting is available in the rules visual editor and in `rules.yaml`.
[Complete rules.yaml example](Rules_YAML_Example.md) shows a complete example of each.

## Settings in the rules editor

The editor exposes these settings for evaluation:

- **Rule level** and **Rule type** for each rule.
- **Dwell seconds**, **Throttle minutes**, and the **More information links** for each rule.
- **Evaluation tick (seconds)** on the rules source.
- **Publish state tag path** in the **Rule State** group of each rule.

## Dwell and deadband

Rules support two settings that stop an alert flickering on and off:

- **Dwell**: the condition must hold for a set time before the alert trips. Set it with `dwellSeconds` or `dwellMinutes`, and use only one of them on a rule, because setting both is an error when the rules load.
- **Deadband**: the alert clears at a different point from where it tripped. Set it with `clearValue` or `clearExpression` on a threshold step, and with `clearExpression` on a boolean rule.

## Evaluation tick

The **Evaluation tick (seconds)** setting, `evaluationTickSeconds` in YAML, takes a whole number from 1 to 3600.
A value outside that range fails schema validation, and a value of 0 or below runs no periodic pass.
Rules evaluate whenever a tag in their scope changes.
The tick adds a periodic extra pass.
This is the only way a `tag.IsStale` rule can fire for a tag that has stopped changing.
A rule that tests for stale or missing data needs the tick to be set in at least one loaded rules file.
When several rules files set a tick, the smallest value applies to the whole profile.
A low value in one file therefore changes how often every file is evaluated.

## Condition examples

Conditions use the same `tag` expression language as collections, so a numeric trip and clear pair is written as follows.
The first line trips the rule and the second line clears it:

```text
tag.Value > 4.2
tag.Value < 4.0
```

A no-data or stale sensor condition is written as follows.
The term `!tag.HasValue` catches a tag that has never had a value:

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
