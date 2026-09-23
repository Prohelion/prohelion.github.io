---
title: Rule Actions and Scripts
---

# Rule actions and scripts

Profinity 2.3 rules can run **built-in actions** and **Rule Script** components (C# or Python). Rule scripts receive an **action context** that includes **`TriggeredTags`** — the tags that caused the rule to fire.

## Rules visual editor

Open rules from:

- Side menu → **RULES** (`/tags?view=tag_rules`) when the profile exposes tag rules, or
- Component/profile **rules** settings and visual editor.

<figure markdown>
![Rules visual editor with expanded rule showing threshold and dwell fields](../../../../assets/images/2.3/2.3-rules-visual-editor.png)
<figcaption>Rules visual editor (screenshot placeholder — provide SS-26)</figcaption>
</figure>

Configure:

- Thresholds and conditions on tag values.
- **Dwell** and **deadband** for stable alerting.
- **`description`** — text shown in ALL ALERTS.
- **`level`** — severity for filtering and display.
- **`evaluationTickSeconds`** — engine evaluation interval.

## Action picker

When editing a rule, add actions from the action picker:

- Built-in actions such as **ProfinityLog** and **None**.
- **Rule Script** components (C# or Python) authored for rule context.

<figure markdown>
![Rule action picker showing built-in and Rule Script options](../../../../assets/images/2.3/2.3-rule-action-picker.png)
<figcaption>Rule action picker (screenshot placeholder — provide SS-27)</figcaption>
</figure>

!!! tip "Rule scripts vs component scripts"
    **Rule Script** components are designed for the rules engine action context. General component **Run scripts** are not interchangeable — prefer Rule Script for rule actions.

## TriggeredTags in rule scripts

In rule script context, access tags that triggered the evaluation via **`TriggeredTags`**. Use this to log, branch logic, or pass values to downstream actions.

Example patterns are in the Profinity test script library and engineering [rules engine documentation](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Architecture/Tag-Layer/02.7-rules-engine.md) (sections 9.7–9.8).

## Alert level

Set **`level`** on a rule to classify alert severity. ALL ALERTS and indicators respect active rule state combined with level.

## Permissions

| Task | Permission |
|------|------------|
| View rules | `TagRulesView` |
| Edit rules | `TagRulesModify` |
| View alerts | `AlertsView` |

## Related documentation

- [ALL ALERTS](./Alerts.md)
- [Scripting rule scripts](../Scripting/Rule_Scripts.md)
- [Tag layer](../Tag_Layer/index.md)
