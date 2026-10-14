---
title: Script-driven derived tags
description: "Compute derived tags with a script when one expression is not enough, including multi-step logic, state, and several output tags."
type: task
owner: Documentation
last_reviewed: 2026-10-14
---

# Script-driven derived tags

A computation that does not fit one expression, such as multiple steps, state carried between runs, or publishing several tags from one computation, is written as a script instead of an expression-based [derived tag](./Derived_Tags.md).
To set one up:

1. Add a **CSharp Script**, **Python Script** or **Lua Script** component, or use an existing one.
2. Set its mode to **Run On Tag Change**.
3. Select the source tags in its **Collections** setting, as described in [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md).
4. In the script, publish the computed result with `Profinity.Tags.SetValue(...)`.

Tag paths passed to `Profinity.Tags` are relative to the script's own host component, so a script is naturally suited to computing a derived value from, and publishing back to, tags on the same component.
A path with a leading `/` starts at the root of the tag tree instead, which reaches tags on other components (refer to [Tags in scripts](../Developing_with_Profinity/Scripting/Script_Operations/Tags.md#tag-paths)).

=== "C#"

    ```csharp
    using Profinity.Sdk.Abstractions.Scripting;
    using Profinity.Sdk.Models.Tags;

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

Profinity offers a full starter template for each language when you create a script of that type.

Reading the published tag returns the last value the script published, and a read never re-runs the script.
If nothing has triggered the script yet, the tag has no value rather than a freshly computed one.

Other trigger modes are available too, namely **Run On Time Interval**, **Run On CRON Schedule** and **Run as Service**, for a computation that is not purely reactive to a tag change.
Refer to [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md) for each mode.
For the expression-based alternative, refer to [Derived tags](./Derived_Tags.md) and [Tag expressions](./Tag_Expressions.md).
