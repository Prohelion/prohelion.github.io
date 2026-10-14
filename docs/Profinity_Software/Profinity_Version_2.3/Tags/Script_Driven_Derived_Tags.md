---
title: Script-Driven Derived Tags
description: "Compute derived tags with a script when one expression is not enough, including multi-step logic, state and several output tags."
---

# Script-Driven Derived Tags

A computation that does not fit one expression, such as multiple steps, state carried between runs, or publishing several tags from one computation, is written as a script instead. Add a **CSharp Script**, **Python Script** or **Lua Script** component, or use an existing one, set its mode to **Run On Tag Change** with the source tags selected in its **Collections** setting (see [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md)), and publish the computed result from the script with `Profinity.Tags.SetValue(...)`.

Tag paths passed to `Profinity.Tags` are relative to the script's own host component, so a script is naturally suited to computing a derived value from, and publishing back to, tags on the same component. A path with a leading `/` starts at the root of the tag tree instead, which reaches tags on other components (see [Tags in scripts](../Developing_with_Profinity/Scripting/Script_Operations/Tags.md#tag-paths)).

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

!!! warning "A Read Never Re-Runs the Script"
    Reading the published tag returns the last value the script published. If nothing has triggered the script yet, the tag has no value rather than a freshly computed one.

Other trigger modes are available too, namely **Run On Time Interval**, **Run On CRON Schedule** and **Run as Service**, for a computation that is not purely reactive to a tag change. See [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md).

## Related Documentation

- [Derived Tags](./Derived_Tags.md), for expression-based derived tags and the choice between an expression and a script
- [Script Types](../Developing_with_Profinity/Scripting/Script_Types/index.md)
- [Tag expressions](./Tag_Expressions.md)
