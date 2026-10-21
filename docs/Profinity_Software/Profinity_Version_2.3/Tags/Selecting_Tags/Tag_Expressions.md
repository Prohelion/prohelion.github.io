---
title: Tag expressions
description: Look up the expression language that collections, rules, and derived tags use to select tags, compare values and compute derived values.
type: reference
owner: Documentation
last_reviewed: 2026-10-15
---

# Tag expressions
Collections, rules, and derived tags share one small expression language.
Collections and rules write a boolean expression over a single parameter named `tag`.
Derived tags write a value formula over the aliases they declare (`a`, `b`, …).
The reading names (`Value`, `Text`, `Bool`, and so on) are the same in both places.

You enter expressions in the [collections](../Collections/index.md), [rules](../Rules/index.md), and [derived tags](../Derived_Tags/index.md) editors.
Use either the guided builder, which assembles an expression from a form, or free text.
An invalid member fails validation when the file is saved, with a message that points at the correct spelling.

## Picking tags

Path matching is available only on `tag`, so collections and rules can select tags by their position in the tree.
A derived alias has already chosen its tag, so Profinity rejects path methods there.
A leading `/` in the path given to `Is` or `MatchesPath` is ignored, so `/Vehicles/Car1` and `Vehicles/Car1` match the same tags.

| Member | Meaning |
|--------|---------|
| `tag.Is("…")` | Exact full path, this node only |
| `tag.MatchesPath("…")` | Path segments from the start, plus everything underneath |
| `tag.MatchesName("…")` | Last path segment only |

### Worked examples

One exact tag:

```text
tag.Is("Elmar Solar MPPT/DBC/PowerOutput/OutputCurrent")
```

Everything belonging to one component.
This matches whole segments, so it does not match `Elmar Solar MPPT 2`:

```text
tag.MatchesPath("Elmar Solar MPPT")
```

One subtree:

```text
tag.MatchesPath("Elmar Solar MPPT/DBC/PowerOutput")
```

That component's output current leaf:

```text
tag.MatchesPath("Elmar Solar MPPT") && tag.MatchesName("OutputCurrent")
```

The leaf name anywhere:

```text
tag.MatchesName("OutputCurrent")
```

Leaf name contains (case-insensitive):

```text
tag.MatchesName("*Current*")
```

`tag.MatchesPath("Elmar Solar MPPT")` already includes everything beneath that component, so a trailing `*` is not needed.
A trailing `*` lets the last segment continue.
For example, `Elmar Solar MPPT*` also matches a neighbouring component whose name starts with the same text.

## Wildcards

Path segments and leaf names use one `*` wildcard dialect:

| Pattern | Matches |
|---------|---------|
| `OutputCurrent` | Exact segment (case-insensitive) |
| `Output*` | Starts with |
| `*Current` | Ends with |
| `*putCurr*` | Contains |
| `*` | Any segment |

An interior `*` such as `Out*Current` fails validation, because wildcards may only sit at the start or end of a pattern token.

## Values and quality

Each member suits one kind of comparison.
`Value` converts to a number itself, so a reading needs no conversion helper.
`Value` is empty when the tag quality is Bad or Unavailable.
A comparison such as `tag.Value > 5` is then false rather than an error, and `Text` is empty for a numeric tag.

| Member | Use for |
|--------|---------|
| `Value` | Numeric compares (`tag.Value > 5`) |
| `Text` | String identity (`tag.Text == "RUN"`) |
| `Bool` | Boolean flags (`tag.Bool == true`) |
| `HasValue` | The tag has a value (quality is Good or Stale) |
| `Quality` | `"Good"`, `"Stale"`, `"Bad"`, `"Unavailable"` |
| `IsStale` | Quality is Stale, so the tag's data has stopped arriving |

A tag that has timed out still has a value, so `HasValue` stays true.
For a value that is current, use `tag.HasValue && !tag.IsStale`.
A stale tag has a last value, but its data has stopped arriving, for example a CAN signal that timed out.
A tag that has never had a value is not stale, so for "no data" use `!tag.HasValue || tag.IsStale`.

Examples:

```text
tag.Value > 5
tag.Value >= 2.0 && tag.Value <= 4.2
tag.Text == "RUN"
tag.HasValue
tag.IsStale
tag.MatchesPath("Elmar Solar MPPT") && tag.IsStale
```

Sample age in seconds is not part of the language.
Use `tag.IsStale` together with the rules evaluation tick, `evaluationTickSeconds`, described in [Tag rules](../Rules/index.md).

## Metadata

Tag metadata fields are available on `tag` only:

```text
tag.Meta.Type == "dbc.signal"
tag.Meta.Text("unit") == "A"
tag.Meta.Number("limits/min") <= 100
```

## Derived formulas

Aliases expose only the reading members (`Value`, `Text`, `Bool`, `HasValue`, `Quality`, `IsStale`).
Path methods and the wrong parameter name (`tag.…`) are rejected.

```text
a.Value * 1.60934
a.Value - b.Value
(a.Value + b.Value) / 2
Math.Abs((a.Value ?? 0) - (b.Value ?? 0))
Math.Round((a.Value ?? 0) * 100, 2)
a.Value != null ? Math.Abs(a.Value ?? 0) : null
```

Static members of `Math` are available in formulas.
A tag's `Value` can be empty, because a tag has no value until it has produced one.
`Math` functions need a number, so give them one with the `??` operator, as in `Math.Abs(a.Value ?? 0)`.
The `??` operator uses the right-hand number when the tag has no value, so the result is `0` in that case.
To get no value instead, test first, as in `a.Value != null ? Math.Abs(a.Value ?? 0) : null`.

A formula that passes `a.Value` straight to a `Math` function, such as `Math.Abs(a.Value)`, is rejected when the derived tag is saved.
The message is "No applicable method 'Abs' exists in type 'Math'".
Add `?? 0` to fix it.
The same applies to `tag.Value` in collection and rule expressions.

## Guided builder

The guided builder offers these facets, each of which writes the expression shown:

| Facet | Emits |
|-------|-------|
| Path | `tag.MatchesPath("…")` |
| Name | `tag.MatchesName("…")` |
| Numeric | `tag.Value` compared to a number |
| Has value | `tag.HasValue` / `!tag.HasValue` |
| Quality / stale | `tag.Quality` / `tag.IsStale` |
| Meta type / text | `tag.Meta.Type` / `tag.Meta.Text("…")` |

Use **Free text** when the builder cannot express the condition.
Examples are a complex `&&` / `||` combination, unusual meta keys, or derived formulas.

## Unsupported spellings

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

For the places these expressions are used, refer to [Tag collections](../Collections/index.md), [Alerts Log](../Alerts.md), [Tag rules](../Rules/index.md), [Rule actions](../Rules/Actions/index.md), [Derived tags](../Derived_Tags/index.md), and [Create collections, rules, and dashboard bindings from tags](../Create_Collections_Rules_and_Bindings_from_Tags.md).
To return to the overview, refer to [Tag layer](../index.md).
