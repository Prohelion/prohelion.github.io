# RS1 review: Tags/Rules, Actions, Alerts, Derived_Tags (wave 3 moves)

Overall: no high severity findings. Three low or medium points, listed per page.

Lint: `node scripts/lint-docs.js docs/Profinity_Software/Profinity_Version_2.3` gives 0 errors, 0 warnings (66 notes elsewhere); the four pages alone give 0/0/0. No Links errors.

## 1. Fact ledger

### Move 1: Rules "Actions inherited down the rule tree" to Actions.md. PASS
All 11 sentences are byte-identical in Actions.md (lines 52 to 66 of the new file), under the same heading text, so the old anchor is kept. Only change: "In the example above," became "In the [complete rules.yaml example](Rules.md#a-complete-rulesyaml-example),". Link resolves. Nothing altered or lost. Inline items present: `triggerLevel`, local vs parent actions, `clearActions`, `disableActions`, `disableClearActions`, `profile/ProfinityLog`, component-name parent id, group `id`, one listing per parent, thresholds cannot have rule-level actions, `message`, `level`, `tagId`, `value`, `references unknown component`.

### Move 2: Alerts "Rule evaluation: dwell and deadband" to Rules.md. PASS
Heading, figure (path, alt text, caption), dwell and deadband paragraph, the "Both are configured..." sentence (link changed to in-page `#a-complete-rulesyaml-example`, valid), both code blocks and their two introducing sentences are all verbatim in Rules.md lines 47 to 73. The Alerts-only tick sentences are covered in section 2. The two trailing paragraph lines on Alerts (expression language, tag layer) stayed on Alerts (lines 83 to 84).
Note: Rules.md already had `tag.Value > 4.2` ... `tag.IsStale` in prose (line 32), so those now appear twice on Rules (prose example and code blocks). Harmless, same page, no contradiction.

### Move 3: Derived_Tags "Rule state publishing" to Rules.md. PASS with one low finding
Seven sentences moved verbatim (Rules.md lines 38 to 44): publish path, `true`/`false`, zero-based step index, `-1`, read-only, restore from the alert log, `false` or `-1` default, single state tag per rule, one rule per tag, duplicate path stops loading and the error names both rules.
Low (1): the last sentence changed. Original: "Refer to [Rules](./Rules.md) and [Actions](./Actions.md) for the rules that publish state and the actions they run." New (Rules.md line 45): "Refer to [Actions](./Actions.md) for the actions a rule runs." The Rules link was correctly dropped (self link). The wording change is reasonable, no fact lost. Brief permits only link and intro changes, so mention it to the lead.
Derived_Tags keeps one sentence and a link (line 73): "A rule can publish its own current state to a tag, as described under [Rule state publishing](./Rules.md#rule-state-publishing)." Accurate, resolves. Its heading was removed with no inbound links to it (grep found none).

### Move 4: Rules "Alert level" to Alerts.md. PASS with one medium finding
The section is verbatim in Alerts.md lines 46 to 55, but under the heading "Alerts Log > Alert levels", which already existed.
Medium (2): the pre-existing Alerts "Alert levels" body was replaced. Original text now gone: "Every rule and threshold step carries a `level`, and the six permitted values in ascending severity are `Trace`, `Debug`, `Info`, `Warning`, `Error` and `Fatal`." and "The valid names, their aliases and the defaults are described under [Alert level](./Rules.md#alert-level), and the level filter on the Active and History queries is not case-sensitive." Substance is all covered by the moved text (six levels, aliases, default, set on rule or step), and the level-filter fact is kept as its own sentence (Alerts line 56: "The level filter on the Active and History queries is not case-sensitive."). Only the "Every rule and threshold step carries a level" statement is gone, but "Set `level` on a rule, or on each threshold step" covers it. Acceptable. The merge of two versions was not requested in the assignment as a "move", so confirm the lead is happy that the Alerts-only wording was dropped, not relocated.
Rules.md keeps one sentence and a link (line 31): "The valid alert levels, their aliases and the default are described under [Alert levels](Alerts.md#alert-levels)." Accurate, resolves.

## 2. Merged `evaluationTickSeconds` text. PASS

Rules.md original (lines 33 to 36), unchanged in the new Rules.md lines 57 to 60:
"The **Evaluation tick (seconds)** setting, `evaluationTickSeconds` in YAML, takes a whole number from 1 to 3600. Rules evaluate whenever a tag in their scope changes, and the tick adds a periodic extra pass, which is the only way a `tag.IsStale` rule can fire for a tag that has stopped changing. When several rules files set a tick, the smallest value applies to the whole profile, so a low value in one file changes the evaluation cadence of every file. A rule that tests for stale or missing data needs the tick to be set in at least one loaded rules file."

Alerts.md original (lines 85 to 87), now removed:
"Rules evaluate whenever a tag in their scope changes. The `evaluationTickSeconds` setting adds a periodic extra pass, takes a whole number from 1 to 3600, and is required for a rule that detects stale data with `tag.IsStale`, because a stale tag does not change. When several rules files set it, the smallest value applies to the whole profile."

Merged = the Rules.md original, untouched. Every Alerts fact (evaluate on change, periodic extra pass, 1 to 3600, required for `tag.IsStale`, reason: stale tag does not change, smallest value wins profile-wide) is present in the Rules wording ("only way ... for a tag that has stopped changing", "needs the tick to be set in at least one loaded rules file"). The Rules version adds the cadence consequence, which was already Rules-only. No statement true of one context is now stated of both. Alerts.md now has a pointer at line 82 ("including dwell, deadband, and the evaluation tick") to `Rules.md#rule-evaluation-dwell-and-deadband`, which resolves.

## 3. Duplicate worked-numbers sentence. ACCEPTABLE
Rules.md line 170: "Actions written on the file or on a group are inherited by the rules beneath them, as described under [Actions inherited down the rule tree](Actions.md#actions-inherited-down-the-rule-tree), so in the example a Warning on `pack_temperature` runs only **Profinity Log**, an Error runs **Profinity Log** and `OpsSlack`, and the Fatal step also runs `OpsEmail` from the group."
Actions.md line 55 has the same numbers. They are consistent with each other and with the YAML (ProfinityLog Info, OpsSlack Error, OpsEmail Fatal in the group). No contradiction. Reasonable duplication, since Rules is the page with the YAML. Low (3): Rules.md now shows `disableActions: profile/ProfinityLog` and an action `message` in the YAML with no explanation on the page, only the one link to Actions. Optional: the sentence could also name `disableActions` as explained there. Not required.
Strict wording: this is a second statement of one fact, so Wave 3 rule 1 ("exactly one page") is technically bent; the lead should accept it deliberately.

## 4. Old homes and links. PASS
- Alerts to Rules (dwell and deadband): present, resolves.
- Rules to Alerts levels: present, resolves.
- Derived_Tags to Rules state publishing: present, resolves. Rules line 34 in-page link `#rule-state-publishing` resolves.
- Rules to Actions inherited: present (line 170), resolves.
- Inbound links into the moved headings across the whole docs tree: only Rule_Scripts.md:44 (already changed to `Alerts.md#alert-levels`, valid). Collections.md:60 links `Rules.md#a-complete-rulesyaml-example` (unchanged heading). No other links to `#alert-level`, `#actions-inherited-down-the-rule-tree`, `#rule-state-publishing` or `#rule-evaluation-dwell-and-deadband` exist outside the four pages. Inbound links to fix: none. Note the Rule_Scripts.md link text still says "Alert level" while the heading is "Alert levels" (low, cosmetic).
- Rule_Scripts.md line 44 and Alerts.md line 55 agree that `RuleLevel` is a string.

## 5. Unchanged items. PASS
The diff of Actions.md has a single added hunk (plus `last_reviewed`). "Profinity 2.3 offers two built-in actions, ..." (line 12), "In YAML the two built-in actions are written `ProfinityLog` and `None`." (line 36) and the PagerDuty alt text (line 23) are unchanged from HEAD.

## 6. Page types
All four stay `reference`. Rules (settings, YAML, permissions), Actions (action settings), Alerts (UI fields and indicators), Derived_Tags (settings and a worked example, with a comparison) are lookup content with no numbered procedure. Fit is fine. Low (4): Rules.md is now a long mix of editor, evaluation, state publishing and a YAML walk-through, but that is the product owner's approved structure.

## Findings summary
High: none.
Medium: (2) Alerts "Alert levels" lead sentence "Every rule and threshold step carries a `level`..." dropped without being relocated; covered in substance.
Low: (1) rewording of the final sentence of Rule state publishing; (3) `disableActions` unexplained on Rules; (4) Rule_Scripts link text "Alert level" vs heading "Alert levels".
