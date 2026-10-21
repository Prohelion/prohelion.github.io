---
title: Unsupported expression spellings
description: Look up the expression spellings that fail validation in Profinity 2.3 and the supported spelling to use in their place in collections, rules, and derived tags.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Unsupported expression spellings

These spellings fail validation in Profinity 2.3.
Rewrite them as shown:

| Do not use | Use instead |
|------------|-------------|
| `tag.MatchesPathPrefix(…)` | `tag.MatchesPath(…)` |
| `tag.FullTagId` / `.Contains(…)` | `tag.Is(…)` or `tag.MatchesName("*…*")` |
| `tag.IsValueValid` | `tag.HasValue` |
| `Convert.…(tag.…)` | `tag.Value` / `tag.Text` / `tag.Bool` |
| `tag.Meta.Field(…)` | `tag.Meta.Text(…)` or `tag.Meta.Number(…)` |
| `tag.SampleAgeSeconds` / `SecondsSinceUpdate` | `tag.IsStale` |

The saved file is rejected with a message that points at the correct spelling.
For the supported members and worked examples, refer to [Tag expressions](Tag_Expressions.md).
