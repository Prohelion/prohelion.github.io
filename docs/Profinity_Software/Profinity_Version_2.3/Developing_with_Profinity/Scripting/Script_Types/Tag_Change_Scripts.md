---
title: Tag change scripts
description: "Run a script each time a watched tag changes, choose the tags to watch, and publish computed tags without polling."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Tag change scripts

A Tag Change script runs each time the value of a watched tag changes.
It suits reacting to another component's output, computing values that need more than a single expression, and chaining automation, without polling the tag on a timer.

A script becomes a Tag Change script by setting its **Script Mode** to **Run On Tag Change**.
It implements the `OnTagChange` method (C#) or the `on_tag_change` function (Python and Lua), which receives the tag's id and a sample holding the new value, quality, and timestamp.
The script can read and write other tags with [Tags](../Script_Operations/Tags.md) and keep earlier values between calls with [State](../Script_Operations/State.md).

## Settings {#choosing-what-to-watch}

Enable scripting in [Application Config](../../../Administration/System_Configuration/Application_Config.md) first, as every script type requires it.
Then add a **CSharp Script**, **Python Script** or **Lua Script** component.
Set **Script Mode** to **Run On Tag Change**, and choose the tags to watch in the **Tag Change Settings** category:

| Setting | Description |
|---------|-------------|
| **Tag Paths** | Explicit full tag paths to watch. |
| **Collections** | Tag [Collections](../../../Tags/Collections/index.md) to watch. Members are resolved from the collections file. |

The script watches the union of the two lists, and at least one tag path or collection is required.

## The method and its arguments

Profinity calls the method once for each tag that changes, passing:

| Argument | Description |
|----------|-------------|
| `tagId` | The id of the tag that changed. |
| `sample` | The new reading: `Value`, `Quality` (`Good`, `Unavailable`, `Stale` or `Bad`), `UtcTimestamp`, `Reason` and `Message`. |

=== "C#"

    ```csharp
    using Profinity.Sdk.Abstractions.Scripting;
    using Profinity.Sdk.Models.Tags;

    public class CSharpTagChangeExample : ProfinityScript, IProfinityTagChangeScript
    {
        public void OnTagChange(string tagId, DataTagSample sample)
        {
            object previous = Profinity.State.Get(tagId);
            Profinity.Console.WriteLine("CSharp Tag Change : " + tagId + " = " + sample.Value + " (was " + previous + ")");
            Profinity.State.Set(tagId, sample.Value);
        }
    }
    ```

=== "Python"

    ```python
    def on_tag_change(tagId, sample):
        previous = Profinity.State.Get(tagId)
        print("Python Tag Change : " + str(tagId) + " = " + str(sample.Value) + " (was " + str(previous) + ")")
        Profinity.State.Set(tagId, sample.Value)
    ```

=== "Lua"

    ```lua
    function on_tag_change(tagId, sample)
        local previous = Profinity.State:Get(tagId)
        print('Lua Tag Change : ' .. tostring(tagId) .. ' = ' .. tostring(sample.Value) .. ' (was ' .. tostring(previous) .. ')')
        Profinity.State:Set(tagId, sample.Value)
    end
    ```

The full files `CSharpTagChangeTemplate.cs`, `PythonTagChangeTemplate.py` and `LuaTagChangeTemplate.lua` are built into Profinity as the templates it offers when you create a script of that type.

!!! warning "One call per tag"
    The `sample` argument is only the tag that changed.
    Reading any other tag returns its live value at that moment, not the value published together with this change.
    A frame, a payload, or several tags written as one update are already separate changes before the method runs.
    Sibling tags are therefore not guaranteed to be consistent with each other.

To read the tag that fired, including its quality and timestamp, pass its tag ID back to [`Profinity.Tags`](../Script_Operations/Tags.md) with a leading `/`, which is the root of the tag tree.
In C# and Python, write `Profinity.Tags.GetSample("/" + tagId)`.
In Lua, write `Profinity.Tags:GetSample('/' .. tagId)`.
Without the `/`, the id would be treated as relative to the script's host component.

## Publishing a computed tag

A common use is computing one tag from another.
This example follows the `CSharpDerivedTagTemplate.cs`, `PythonDerivedTagTemplate.py` and `LuaDerivedTagTemplate.lua` templates built into Profinity.
It converts a speed in miles per hour into kilometres per hour whenever the source tag changes, and publishes the result with [`Profinity.Tags.SetValue`](../Script_Operations/Tags.md#writing-tag-values).
Refer to [Derived tags](../../../Tags/Derived_Tags/index.md) for when to choose this over an expression-based derived tag.

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

            double speedKmh = Convert.ToDouble(sample.Value) * 1.60934;
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

        speed_kmh = float(sample.Value) * 1.60934
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

        local speedKmh = tonumber(sample.Value) * 1.60934
        Profinity.Tags:SetValue(PUBLISHED_TAG_PATH, speedKmh)
    end
    ```

Paths without a leading `/` are relative to the script's host component, so this script is meant to run on the component that owns both tags.
To publish to a tag on another component, start the path with `/`, as described in [Tag paths](../Script_Operations/Tags.md#tag-paths).
Reading the published tag never re-runs the script.
It returns the last value the script wrote.

## Behaviour

!!! warning "Running the script by hand does not call this method"
    Run On Demand and scheduled runs do not call `OnTagChange` or `on_tag_change`.
    Only a change to a watched tag does, so test by changing the tag.

The method runs when a watched tag's value changes.
Writing the same value again does not call it, and neither does a change of quality alone, such as a tag going stale while it keeps its last value.

### Trigger overlap

If the method is still running when another change arrives, **Trigger Overlap** decides what happens.
It is the same setting used by Run On Alert and Run On Receipt of CAN Message:

| Trigger Overlap | Effect |
|-----------------|--------|
| **Drop** (default) | Discards the new change while the current one is still running. |
| **Queue** | Holds a bounded backlog, up to **Queue Depth** (1 to 100), and runs it once the current call completes. |

Keep the method fast.
A slow script under **Queue** builds a backlog, and under **Drop** silently misses changes.
Store previous values in [State](../Script_Operations/State.md) rather than recomputing them.
If a run must be bounded, set **Maximum Run Time (seconds)**.
The handler stops only when the script checks `Profinity.ScriptCancelled`.

For the other script modes, refer to [Script types](./index.md), and for a worked first script, refer to [How to write your first script](../../../How_To_Guides/Write_Your_First_Script.md).
