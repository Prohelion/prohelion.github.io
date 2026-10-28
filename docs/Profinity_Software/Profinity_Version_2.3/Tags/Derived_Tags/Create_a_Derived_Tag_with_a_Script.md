---
title: Create a derived tag with a script
description: "Compute derived tags with a script when one expression is not enough, including multi-step logic, state, and several output tags."
type: task
owner: Documentation
last_reviewed: 2026-10-20
---

# Create a derived tag with a script

This procedure computes a derived tag with a script, which suits a computation that does not fit one expression.
Examples are a computation with multiple steps, state carried between runs, or several tags published from one computation.
For a single expression, use an expression-based [derived tag](index.md) instead.

!!! info "Licence required"
    A derived tag computed by a script needs the **Scripting** licensed feature, included from the Desktop edition upward, and scripting enabled in [Application Config](../../Administration/System_Configuration/Application_Config.md).
    Expression-based derived tags work on every edition.

To set one up:

1. Add a **CSharp Script**, **Python Script**, or **Lua Script** component, or use an existing one.
2. Set its **Script Mode** to **Run On Tag Change**.
3. Select the source tags in its **Collections** setting, as described in [Script types](../../Developing_with_Profinity/Scripting/Script_Types/index.md).
4. In the component's actions, select **Edit Script**. The script editor opens with the starter template for the component's language.
5. Replace the template with the example for your language, which publishes the computed result with `Profinity.Tags.SetValue(...)`.

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

Tag paths passed to `Profinity.Tags` are relative to the script's own host component.
A script therefore suits computing a derived value from, and publishing back to, tags on the same component.
A path with a leading `/` starts at the root of the tag tree instead, which reaches tags on other components.
Refer to [Tags in scripts](../../Developing_with_Profinity/Scripting/Script_Operations/Tags.md#tag-paths) for the path rules.

To check it worked, save the script, then change the source tag, `SpeedMph` in the example.
Open **Tag Explorer** and confirm that the published tag, `SpeedKmh` in the example, shows the converted value.
Reading the published tag returns the last value the script published, and a read never re-runs the script.
If nothing has triggered the script yet, the tag has no value.

Next, choose how the script is triggered.
A computation that is not purely reactive to a tag change can use another trigger mode: **Run On Time Interval**, **Run On CRON Schedule**, or **Run as Service**.
Refer to [Script types](../../Developing_with_Profinity/Scripting/Script_Types/index.md) for each mode.
For the expression-based alternative, refer to [Create a derived tag](Create_a_Derived_Tag.md) and [Tag expressions](../Selecting_Tags/Tag_Expressions.md).
