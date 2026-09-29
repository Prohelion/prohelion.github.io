---
title: Derived Tags
---

# Derived (virtual) tags

A **derived tag** is a value Profinity computes automatically, once, that then behaves exactly
like a real tag to every consumer — dashboards, the historian, rules, and the API all see the
same quality/timestamp envelope and can subscribe to it the same way. You configure the
computation once; Profinity keeps it current.

Profinity 2.3 supports two ways to compute a derived tag's value:

- **Expression-based** — a formula referencing one or more source tags, recomputed automatically
  whenever a source changes. No scripting required.
- **Script-driven** — a script publishes a computed value using existing scripting capabilities.
  Use this when the computation needs more than a single expression.

See [Expression vs script](#expression-vs-script-which-to-use) below for which one fits your case.

## Open the Derived Tags editor

- Side menu → **DERIVED TAGS**, at the same level as **COLLECTIONS** and **RULES**, or
- Component/profile settings → derived tags visual editor.

Derived tags are organised into **groups**, the same tree structure [Collections](./Collections.md)
already uses — the Derived Tags editor uses the same tree-and-inspector interaction pattern as the
Collections editor, so if you already know that editor, this one works the same way.

<figure markdown>
![Derived Tags editor showing a group and a derived tag with its expression](../../../../assets/images/2.3/2.3-derived-tags-editor.png)
<figcaption>Derived Tags editor (screenshot placeholder — provide SS-58)</figcaption>
</figure>

## Expression-based derived tags

An expression-based derived tag names one or more **dependencies** — short aliases mapped to
source tag paths — and a formula that combines them. It recomputes the moment any dependency
changes.

Derived tags can be organised into **groups**, purely for organisation, the same way Collections
groups are. A group can optionally set a **mount path**: a derived tag with a *relative* mount
path mounts underneath its group's mount path; a derived tag that gives its own *absolute* path
mounts there instead, overriding the group. A nested group's own mount path narrows further under
its parent's, exactly like a Collections group's scope does.

### Worked example

A derived tag that converts a vehicle's speed from mph to km/h, grouped under that vehicle:

```yaml
derivedTags:
  - group:
      id: vehicle-conversions
      displayName: Vehicle unit conversions
      mountPath: Vehicles/Car1
      items:
        - derivedTag:
            id: car1-speed-kmh
            mountPath: SpeedKmh                      # relative -> Vehicles/Car1/SpeedKmh
            dependsOn: { a: Vehicles/Car1/SpeedMph }
            expression: "a.Value * 1.60934"
```

Each alias exposes only the reading members (`Value`, `Text`, `Bool`, `HasValue`, `Quality`,
`IsStale`). Path methods such as `MatchesPath` belong in collections and rules, not here — see
[Tag expressions](./Tag_Expressions.md).

`Vehicles/Car1/SpeedKmh` is now a real tag: it shows up in Tag Explorer, in the rules engine, and
can be queried for history like any other tag — with **no extra configuration** for history to
work.

<figure markdown>
![Derived tag inspector showing dependencies and expression with a live preview value](../../../../assets/images/2.3/2.3-derived-tag-expression-inspector.png)
<figcaption>Derived tag inspector with live preview (screenshot placeholder — provide SS-59)</figcaption>
</figure>

### Deleting a derived tag that's depended on

If another derived tag's expression or a rule expression depends on the tag you're deleting, the
editor names the dependent(s) before letting the delete go through — the same protection
Collections already gives you before deleting a collection a rule references.

## Script-driven derived tags

For a computation that doesn't fit one expression — multiple steps, state carried between runs,
or publishing several tags from one computation — write a script instead. This uses **existing**
scripting capabilities; there's no separate "derived tag script" concept to learn.

1. Add a **Script** component (or use an existing one) and set its mode to **Run On Tag Change**
   (see [Script Types](../Scripting/Script_Types/index.md)), watching the source tag(s).
2. In the script, read the triggering value and publish the computed result with
   `Profinity.Tags.SetValue(...)`.

Tag paths passed to `Profinity.Tags` are relative to the script's own host component, so a script
is naturally suited to computing a derived value from — and publishing back to — tags on the same
component.

=== "C#"

    ```csharp
    using Profinity.ComponentSdk.Abstractions.Scripting;
    using Profinity.ComponentSdk.Models.Tags;

    public class CSharpDerivedTagExample : ProfinityScript, IProfinityTagChangeScript
    {
        private const string SourceTagPath = "SpeedMph";
        private const string PublishedTagPath = "SpeedKmh";

        public void OnTagChange(string tagId, DataTagSample sample)
        {
            if (!tagId.EndsWith(SourceTagPath, StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            double speedMph = Convert.ToDouble(sample.Value);
            double speedKmh = speedMph * 1.60934;

            Profinity.Tags.SetValue(PublishedTagPath, speedKmh);
        }
    }
    ```

=== "Python"

    ```python
    SOURCE_TAG_PATH = "SpeedMph"
    PUBLISHED_TAG_PATH = "SpeedKmh"

    def on_tag_change(tagId, sample):
        if not str(tagId).lower().endswith(SOURCE_TAG_PATH.lower()):
            return

        speed_mph = float(sample.Value)
        speed_kmh = speed_mph * 1.60934

        Profinity.Tags.SetValue(PUBLISHED_TAG_PATH, speed_kmh)
    ```

=== "Lua"

    ```lua
    local SOURCE_TAG_PATH = 'SpeedMph'
    local PUBLISHED_TAG_PATH = 'SpeedKmh'

    function on_tag_change(tagId, sample)
        if not tostring(tagId):lower():find(SOURCE_TAG_PATH:lower() .. '$') then
            return
        end

        local speedMph = tonumber(sample.Value)
        local speedKmh = speedMph * 1.60934

        Profinity.Tags:SetValue(PUBLISHED_TAG_PATH, speedKmh)
    end
    ```

Full source: [`CSharpDerivedTagTemplate.cs`](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Default-Profinity-Dir/example_scripts/CSharp/CSharpDerivedTagTemplate.cs) ·
[`PythonDerivedTagTemplate.py`](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Default-Profinity-Dir/example_scripts/Python/PythonDerivedTagTemplate.py) ·
[`LuaDerivedTagTemplate.lua`](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Default-Profinity-Dir/example_scripts/Lua/LuaDerivedTagTemplate.lua) —
all three shipped as templates alongside Profinity's other example scripts.

!!! warning "A read never re-runs the script"
    Reading the published tag returns the **last value the script pushed** — the same cache
    semantics every tag already has. If nothing has triggered the script yet, the tag has no
    value, not a freshly computed one.

Other trigger modes are available too — **Time Interval**, **Cron Schedule**, and **Run On
Demand** — for a computation that isn't purely reactive to a tag change. See
[Script Types](../Scripting/Script_Types/index.md).

## Expression vs script — which to use

| Use an **expression** when... | Use a **script** when... |
|---|---|
| The computation is simple real-time math, a unit conversion, or combining a handful of tags | The logic needs multiple steps, branching, or state carried between runs |
| You want automatic history with no extra setup | You need a timed/on-demand trigger rather than pure tag-change reactivity |
| | You want to populate several tags from one computation |

## Rule state publishing

A rule can also publish its own current state to a tag — this is a property on the **rule
itself**, not a derived tag, since it's the rules engine surfacing its own output rather than a
value derived from other tags. Set **`publishStateTagPath`** on a rule (in the Rules editor) to
mirror that rule's current state to the given tag path whenever it changes. See
[Rule actions and scripts](./Rule_Actions_And_Scripts.md).

## Permissions

Derived tags follow the same access model as Collections and Rules — see
[RBAC and permissions](../../Administration/Security/RBAC_Permissions.md).

## Engineering reference

Normative design: [A33 — Virtual (derived) tags](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/plans/2.3/A33-Derived-Virtual-Tags.md).

## Related documentation

- [Tag expressions](./Tag_Expressions.md)
- [Tag layer](../Tag_Layer/index.md)
- [Collections](./Collections.md)
- [Rule actions and scripts](./Rule_Actions_And_Scripts.md)
- [Script Types](../Scripting/Script_Types/index.md)
