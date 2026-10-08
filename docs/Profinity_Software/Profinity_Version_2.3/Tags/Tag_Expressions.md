---
title: Tag Expressions
description: "Expression language for collections, rules, and derived tags to filter and compute tag values."
---

# Tag Expressions

Collections, rules, and derived tags share one small expression language. Collections and rules write a **boolean** expression over a single parameter named `tag`. Derived tags write a **value formula** over the aliases they declare (`a`, `b`, …). The reading names (`Value`, `Text`, `Bool`, and so on) are the same in both places.

Expressions are typed in the [collections](./Collections.md), [rules](./Actions.md) and [derived tags](./Derived_Tags.md) editors, using either the guided builder or free text, and an invalid member fails validation when the file is saved, with a message that points at the correct spelling.

## Picking Tags

Path matching is available only on `tag`, so collections and rules can select tags by their position in the tree, whereas a derived alias has already chosen its tag and Profinity rejects path methods there. A leading `/` in the path given to `Is` or `MatchesPath` is ignored, so `/Vehicles/Car1` and `Vehicles/Car1` match the same tags.

| Member | Meaning |
|--------|---------|
| `tag.Is("…")` | Exact full path, this node only |
| `tag.MatchesPath("…")` | Path segments from the start, plus everything underneath |
| `tag.MatchesName("…")` | Last path segment only |

### Worked Examples

One exact tag:

```text
tag.Is("Elmar Solar MPPT/DBC/PowerOutput/OutputCurrent")
```

Everything belonging to one component, which matches whole segments and therefore does not match `Elmar Solar MPPT 2`:

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

`tag.MatchesPath("Elmar Solar MPPT")` already includes everything beneath that component, so a trailing `*` is not needed. A trailing `*` lets the last segment continue, so `Elmar Solar MPPT*` also matches a neighbouring component whose name starts with the same text.

## Wildcards

One `*` dialect for path segments and leaf names:

| Pattern | Matches |
|---------|---------|
| `OutputCurrent` | Exact segment (case-insensitive) |
| `Output*` | Starts with |
| `*Current` | Ends with |
| `*putCurr*` | Contains |
| `*` | Any segment |

An interior `*` such as `Out*Current` fails validation, because wildcards may only sit at the start or end of a pattern token.

## Values and Quality

Each member suits one kind of comparison, and `Value` converts to a number itself, so a reading needs no conversion helper. `Value` is empty when the tag quality is Bad or Unavailable, so a comparison such as `tag.Value > 5` is false rather than an error for such a tag, and `Text` is empty for a numeric tag.

| Member | Use for |
|--------|---------|
| `Value` | Numeric compares (`tag.Value > 5`) |
| `Text` | String identity (`tag.Text == "RUN"`) |
| `Bool` | Boolean flags (`tag.Bool == true`) |
| `HasValue` | Quality is Good or Stale |
| `Quality` | `"Good"`, `"Stale"`, `"Bad"`, `"Unavailable"` |
| `IsStale` | Quality is Stale, which is how to detect missing data |

Examples:

```text
tag.Value > 5
tag.Value >= 2.0 && tag.Value <= 4.2
tag.Text == "RUN"
tag.HasValue
tag.IsStale
tag.MatchesPath("Elmar Solar MPPT") && tag.IsStale
```

Sample age in seconds is not part of the language, so use `tag.IsStale` together with the rules evaluation tick, `evaluationTickSeconds`, described in [Rule actions and scripts](./Actions.md).

## Metadata

Tag metadata fields are available on `tag` only:

```text
tag.Meta.Type == "dbc.signal"
tag.Meta.Text("unit") == "A"
tag.Meta.Number("limits/min") <= 100
```

## Derived Formulas

Aliases expose only the reading members (`Value`, `Text`, `Bool`, `HasValue`, `Quality`, `IsStale`). Path methods and the wrong parameter name (`tag.…`) are rejected.

```text
a.Value * 1.60934
a.Value - b.Value
(a.Value + b.Value) / 2
Math.Abs((a.Value ?? 0) - (b.Value ?? 0))
Math.Round((a.Value ?? 0) * 100, 2)
a.Value != null ? Math.Abs(a.Value ?? 0) : null
```

Static members of `Math` are available in formulas. A tag's `Value` can be empty, because a tag has no value until it has produced one, and `Math` functions need a number, so give them one with the `??` operator, as in `Math.Abs(a.Value ?? 0)`. `??` uses the right-hand number when the tag has no value, so the result is `0` in that case. To get no value instead, test first, as in `a.Value != null ? Math.Abs(a.Value ?? 0) : null`. A formula that passes `a.Value` straight to a `Math` function, such as `Math.Abs(a.Value)`, is rejected when the derived tag is saved, with the message "No applicable method 'Abs' exists in type 'Math'"; add `?? 0` to fix it. The same applies to `tag.Value` in collection and rule expressions.

## Guided Builder

| Facet | Emits |
|-------|-------|
| Path | `tag.MatchesPath("…")` |
| Name | `tag.MatchesName("…")` |
| Numeric | `tag.Value` compared to a number |
| Has value | `tag.HasValue` / `!tag.HasValue` |
| Quality / stale | `tag.Quality` / `tag.IsStale` |
| Meta type / text | `tag.Meta.Type` / `tag.Meta.Text("…")` |

Use **Free text** when the builder cannot express the predicate (complex `&&` / `||`, unusual meta keys, or derived formulas).

## Unsupported Spellings

These spellings fail validation in Profinity 2.3. Rewrite them as shown:

| Do not use | Use instead |
|------------|-------------|
| `tag.MatchesPathPrefix(…)` | `tag.MatchesPath(…)` |
| `tag.FullTagId` / `.Contains(…)` | `tag.Is(…)` or `tag.MatchesName("*…*")` |
| `tag.IsValueValid` | `tag.HasValue` |
| `Convert.…(tag.…)` | `tag.Value` / `tag.Text` / `tag.Bool` |
| `tag.Meta.Field(…)` | `tag.Meta.Text(…)` or `tag.Meta.Number(…)` |
| `tag.SampleAgeSeconds` / `SecondsSinceUpdate` | `tag.IsStale` |

## Related Documentation

- [Collections](./Collections.md)
- [Alerts Log](./Alerts.md)
- [Rule actions and scripts](./Actions.md)
- [Derived tags](./Derived_Tags.md)
- [Tag linking](Tag_Linking.md)
- [Tag layer](index.md)
