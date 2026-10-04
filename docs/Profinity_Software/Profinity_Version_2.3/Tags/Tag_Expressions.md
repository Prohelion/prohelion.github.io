---
title: Tag Expressions
description: "Expression language for collections, rules, and derived tags to filter and compute tag values."
---

# Tag expressions

Collections, rules, and derived tags share one small expression language. Collections and rules write a **boolean** expression over a single parameter named `tag`. Derived tags write a **value formula** over the aliases they declare (`a`, `b`, …). The reading names (`Value`, `Text`, `Bool`, and so on) are the same in both places.

Expressions are edited in the visual editors (guided builder or free text), and an invalid member fails validation with a message that points at the correct spelling.

## Picking tags

Use these only on `tag` (collections and rules). A derived alias already chose its tag, so path methods are rejected there.

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

Everything belonging to one component (whole segment match — does **not** match `Elmar Solar MPPT 2`):

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

Do **not** add a trailing `*` to mean "under this component". `tag.MatchesPath("Elmar Solar MPPT")` already includes the subtree. A trailing `*` means the **segment** may continue (`Elmar Solar MPPT*`), which also matches a neighbouring component whose name merely starts with that text.

## Wildcards

One `*` dialect for path segments and leaf names:

| Pattern | Matches |
|---------|---------|
| `OutputCurrent` | Exact segment (case-insensitive) |
| `Output*` | Starts with |
| `*Current` | Ends with |
| `*putCurr*` | Contains |
| `*` | Any segment |

An interior `*` such as `Out*Current` is a **validation error**. Wildcards may only sit at the start or end of a pattern token.

## Values and quality

Pick the member that matches the comparison you mean. Numeric coercion is built into `Value` — do not wrap a reading in a conversion helper.

| Member | Use for |
|--------|---------|
| `Value` | Numeric compares (`tag.Value > 5`) |
| `Text` | String identity (`tag.Text == "RUN"`) |
| `Bool` | Boolean flags (`tag.Bool == true`) |
| `HasValue` | Quality is Good or Stale |
| `Quality` | `"Good"`, `"Stale"`, `"Bad"`, `"Unavailable"` |
| `IsStale` | Quality is Stale (preferred for no-data rules) |

Examples:

```text
tag.Value > 5
tag.Value >= 2.0 && tag.Value <= 4.2
tag.Text == "RUN"
tag.HasValue
tag.IsStale
tag.MatchesPath("Elmar Solar MPPT") && tag.IsStale
```

Sample age in seconds is **not** part of the language. Use `tag.IsStale` with the rules evaluation tick.

## Metadata

Catalogue fields on `tag` only:

```text
tag.Meta.Type == "dbc.signal"
tag.Meta.Text("unit") == "A"
tag.Meta.Number("limits/min") <= 100
```

## Derived formulas

Aliases expose only the reading members (`Value`, `Text`, `Bool`, `HasValue`, `Quality`, `IsStale`). Path methods and the wrong parameter name (`tag.…`) are rejected.

```text
a.Value * 1.60934
a.Value - b.Value
(a.Value + b.Value) / 2
Math.Abs(a.Value - b.Value)
Math.Round(a.Value * 100, 2)
```

The only allowed static helpers are `Math.Abs`, `Math.Min`, `Math.Max`, and `Math.Round`.

## Guided builder

| Facet | Emits |
|-------|-------|
| Path | `tag.MatchesPath("…")` |
| Name | `tag.MatchesName("…")` |
| Numeric | `tag.Value` compared to a number |
| Has value | `tag.HasValue` / `!tag.HasValue` |
| Quality / stale | `tag.Quality` / `tag.IsStale` |
| Meta type / text | `tag.Meta.Type` / `tag.Meta.Text("…")` |

Use **Free text** when the builder cannot express the predicate (complex `&&` / `||`, unusual meta keys, or derived formulas).

## Unsupported spellings

These spellings, used in early builds, fail validation. Rewrite them as shown:

| Do not use | Use instead |
|------------|-------------|
| `tag.MatchesPathPrefix(…)` | `tag.MatchesPath(…)` |
| `tag.FullTagId` / `.Contains(…)` | `tag.Is(…)` or `tag.MatchesName("*…*")` |
| `tag.IsValueValid` | `tag.HasValue` |
| `Convert.…(tag.…)` | `tag.Value` / `tag.Text` / `tag.Bool` |
| `tag.Meta.Field(…)` | `tag.Meta.Text(…)` or `tag.Meta.Number(…)` |
| `tag.SampleAgeSeconds` / `SecondsSinceUpdate` | `tag.IsStale` |

## Related documentation

- [Collections](./Collections.md)
- [ALL ALERTS](./Alerts.md)
- [Rule actions and scripts](./Actions.md)
- [Derived tags](./Derived_Tags.md)
- [Tag linking](Tag_Linking.md)
- [Tag layer](index.md)
