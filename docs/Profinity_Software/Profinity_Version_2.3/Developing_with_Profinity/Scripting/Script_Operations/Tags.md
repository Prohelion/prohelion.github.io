---
title: Tags
description: "Script operations for reading, writing and describing tags in the Profinity tag tree."
---

# Tags

The `Tags` object lets a script read tag values, publish values to tags, and describe the tags it publishes. It is provided automatically in every script, in every script mode, and works the same way in C#, Python and Lua.

Access to tags varies by language:

- C#: `Profinity.Tags.SetValue(...)`
- Python: `Profinity.Tags.SetValue(...)`
- Lua: `Profinity.Tags:SetValue(...)` (note the colon)

## Tag paths

Paths passed to `Profinity.Tags` can address any tag in the tag tree. How a path is written decides where it starts:

| Path | Starts at | Example (script on a component named `Inverter`) |
|------|-----------|---------------------------------------------------|
| No leading `/` | The script's **host component** | `SpeedKmh` is the tag `Inverter/SpeedKmh`. |
| Leading `/` | The **root of the tag tree** | `/Battery/Voltage` is the tag `Battery/Voltage`, on another component. |

A leading `/` means the same as it does in dashboards and rules: the root of the tag tree. A relative path that has several segments, such as `Battery/Voltage` or `position/latitude`, is still placed under the host component, so `Battery/Voltage` on `Inverter` is `Inverter/Battery/Voltage`. A relative path that already starts with the host component's name is used as it is, so `Inverter/SpeedKmh` and `SpeedKmh` are the same tag.

Use a relative path for a script's own component, which keeps the script working if the component is renamed or copied, and a leading `/` to read or write tags that belong to other components. If the component is mounted in a folder using a [Tag tree path](../../../Tags/Tag_Tree_Path.md), a relative path still starts at the component, and a path with a leading `/` starts at the root of the whole tree, so it includes that folder.

!!! note "Paths are not a security boundary"
    Resolving relative paths under the host component is for convenience. It is not a sandbox or an authorisation check, and a script can reach any tag in the tree, so treat scripts as trusted code that runs inside the Profinity engine.

Tag ids passed to a [Tag Change script](../Script_Types/TagChangeScripts.md) are full tag ids. To use one with `Profinity.Tags`, add a leading `/`, for example `Profinity.Tags.GetSample("/" + tagId)`, and to compare one, match on the end of the id, as the examples there do.

## Key Features

- Read the current sample for a tag, including its quality and timestamp
- Publish a value to a tag, creating the tag path if it does not exist
- Clear a value or mark a tag stale
- Attach catalogue metadata to a tag
- Browse the tag catalogue

## Reading tag values

`GetSample` returns a sample for the tag. If the tag cannot be found, the sample has a `Quality` of `Unavailable` rather than throwing, so check the quality before using the value. `ReadSample` returns `true` and fills in the sample only when the tag exists.

A sample has these properties:

| Property | Description |
|----------|-------------|
| `Value` | The scalar reading, or null when unavailable. Enumeration values are returned as their name. |
| `Quality` | `Good`, `Unavailable`, `Stale` or `Bad`. |
| `UtcTimestamp` | The source timestamp in UTC. |
| `Reason` | A machine-readable reason for the quality. |
| `Message` | Optional detail for errors and diagnostics. |

=== "C#"

    ```csharp
    var sample = Profinity.Tags.GetSample("SpeedKmh");

    if (sample.Quality == TagQuality.Good)
    {
        Profinity.Console.WriteLine("Speed is " + sample.Value + " at " + sample.UtcTimestamp);
    }
    else
    {
        Profinity.Console.WriteLine("Speed unavailable: " + sample.Reason);
    }
    ```

=== "Python"

    ```python
    sample = Profinity.Tags.GetSample("SpeedKmh")

    if str(sample.Quality) == "Good":
        print("Speed is " + str(sample.Value) + " at " + str(sample.UtcTimestamp))
    else:
        print("Speed unavailable: " + str(sample.Reason))
    ```

=== "Lua"

    ```lua
    local sample = Profinity.Tags:GetSample('SpeedKmh')

    if tostring(sample.Quality) == 'Good' then
        print('Speed is ' .. tostring(sample.Value) .. ' at ' .. tostring(sample.UtcTimestamp))
    else
        print('Speed unavailable: ' .. tostring(sample.Reason))
    end
    ```

To read a tag on another component, start the path with `/`:

=== "C#"

    ```csharp
    var voltage = Profinity.Tags.GetSample("/Battery/Voltage");
    ```

=== "Python"

    ```python
    voltage = Profinity.Tags.GetSample("/Battery/Voltage")
    ```

=== "Lua"

    ```lua
    local voltage = Profinity.Tags:GetSample('/Battery/Voltage')
    ```

## Writing tag values

`SetValue` publishes a value to a tag. It creates the tag path first if it does not exist, and returns `true` when the write succeeds. Values must be scalar (a number, string or true/false value). Other types are rejected.

`SetValue` also accepts a quality as a third argument. `ClearValue` sets the value to null, and `MarkStale` flags the existing value as stale without changing it.

=== "C#"

    ```csharp
    // Publish a value
    Profinity.Tags.SetValue("SpeedKmh", 88.5);

    // Publish a value with an explicit quality
    Profinity.Tags.SetValue("SpeedKmh", 88.5, TagQuality.Stale);

    // Remove the value, or mark it as out of date
    Profinity.Tags.ClearValue("SpeedKmh");
    Profinity.Tags.MarkStale("SpeedKmh");
    ```

=== "Python"

    ```python
    # Publish a value
    Profinity.Tags.SetValue("SpeedKmh", 88.5)

    # Remove the value, or mark it as out of date
    Profinity.Tags.ClearValue("SpeedKmh")
    Profinity.Tags.MarkStale("SpeedKmh")
    ```

=== "Lua"

    ```lua
    -- Publish a value
    Profinity.Tags:SetValue('SpeedKmh', 88.5)

    -- Remove the value, or mark it as out of date
    Profinity.Tags:ClearValue('SpeedKmh')
    Profinity.Tags:MarkStale('SpeedKmh')
    ```

!!! warning "Avoid loops"
    A script that writes a tag it is also watching in a [Tag Change script](../Script_Types/TagChangeScripts.md) can trigger itself. Watch the source tag and publish to a different tag.

## Creating tags and adding metadata

`EnsurePath` creates a writable tag path without writing a value, and can attach catalogue metadata at the same time. `SetMeta` adds or updates metadata on an existing tag, either one key at a time or as a dictionary. Each returns `true` on success.

=== "C#"

    ```csharp
    Profinity.Tags.EnsurePath("SpeedKmh", new Dictionary<string, object> { { "unit", "km/h" } });
    Profinity.Tags.SetMeta("SpeedKmh", "description", "Vehicle speed in kilometres per hour");
    ```

=== "Python"

    ```python
    Profinity.Tags.EnsurePath("SpeedKmh", {"unit": "km/h"})
    Profinity.Tags.SetMeta("SpeedKmh", "description", "Vehicle speed in kilometres per hour")
    ```

=== "Lua"

    ```lua
    Profinity.Tags:SetMeta('SpeedKmh', 'description', 'Vehicle speed in kilometres per hour')
    ```

## Browsing the tag catalogue

`GetCatalog` returns the tag tree as a nested JSON object, and `GetFlatCatalog` returns it as a flat JSON array of tags. Both take an optional `includeLeafSamples` argument. Pass `true` to include each leaf tag's current sample, which is more expensive on large trees.

## Method summary

| Method | Purpose |
|--------|---------|
| `GetSample(path)` | Returns the current sample, with `Unavailable` quality if the tag does not exist. |
| `ReadSample(path, out sample)` | Returns `true` and the sample only when the tag exists. |
| `SetValue(path, value [, quality])` | Publishes a value, creating the path if needed. |
| `ClearValue(path)` | Sets the value to null. |
| `MarkStale(path)` | Flags the current value as stale. |
| `EnsurePath(path [, meta])` | Creates a writable tag path, optionally with metadata. |
| `SetMeta(path, key, value)` or `SetMeta(path, meta)` | Adds or updates catalogue metadata. |
| `GetCatalog([includeLeafSamples])` | Returns the tag tree as nested JSON. |
| `GetFlatCatalog([includeLeafSamples])` | Returns the tag tree as a flat JSON array. |

## Related documentation

- [Tag Change scripts](../Script_Types/TagChangeScripts.md)
- [Derived tags](../../../Tags/Derived_Tags.md)
- [Tag tree path](../../../Tags/Tag_Tree_Path.md)
- [State](./State.md)
