---
title: Rule Scripts
---

# Rule scripts

**Rule Script** components execute in the **rules engine action context** — not as general component Run scripts. Use them from the rule action picker when a rule fires.

## Languages

- **C#**
- **Python**
- **Lua**

Each language has its own **Rule Script** component (**C# Rule Script**, **Python Rule Script**, **Lua Rule Script**), and all three run against the same rule action context. Enable scripting in [System Configuration](../../Administration/System_Config.md) before using script actions.

## Action context

Rule scripts receive context including **`TriggeredTags`** — tags that caused the rule evaluation to fire. Use this for logging, conditional actions, or driving built-in follow-up actions. The context is populated identically regardless of the script's language.

=== "C#"

    ```csharp
    if (Profinity.Rule != null)
    {
        Profinity.Console.WriteLine($"Rule {Profinity.Rule.RuleName} ({Profinity.Rule.RuleLevel})");
        Profinity.Console.WriteLine($"Trigger tag: {Profinity.Rule.TriggerTagId}");
        foreach (var row in Profinity.Rule.TriggeredTags)
        {
            Profinity.Console.WriteLine($"  {row.TagId} = {row.Value} ({row.Quality})");
        }
    }
    ```

=== "Python"

    ```python
    if Profinity.Rule is not None:
        print(f"Rule {Profinity.Rule.RuleName} ({Profinity.Rule.RuleLevel})")
        print(f"Trigger tag: {Profinity.Rule.TriggerTagId}")
        for row in Profinity.Rule.TriggeredTags:
            print(f"  {row.TagId} = {row.Value} ({row.Quality})")
    ```

=== "Lua"

    ```lua
    if Profinity.Rule ~= nil then
        print('Rule ' .. tostring(Profinity.Rule.RuleName) .. ' (' .. tostring(Profinity.Rule.RuleLevel) .. ')')
        print('Trigger tag: ' .. tostring(Profinity.Rule.TriggerTagId))
        for i = 0, Profinity.Rule.TriggeredTags.Count - 1 do
            local row = Profinity.Rule.TriggeredTags[i]
            print('  ' .. tostring(row.TagId) .. ' = ' .. tostring(row.Value) .. ' (' .. tostring(row.Quality) .. ')')
        end
    end
    ```

`Profinity.Rule` is `nil` (Lua), `None` (Python), or `null` (C#) when the script is not running as a rule action, for example when it is run manually or on a schedule.

See [Rule actions and scripts](../Rules/Rule_Actions_And_Scripts.md).

## Built-in actions

Rules may also use built-in actions such as:

- **ProfinityLog** — write to Profinity log with rule context.
- **None** — no-op placeholder while developing.

## General scripting surface

Component scripts access the `Profinity` script variable surface documented under [Script Operations](./Script_Operations/index.md). Only document APIs exposed on **`ProfinityScriptVariables`** — do not assume internal engine types are available.

Engineering reference: [CSharp Script References](https://github.com/Prohelion/Profinity/blob/feature/Profinity_2_3/Docs/Scripting/CSharp-Script-References-and-Dependencies.md).

## Examples and validation

Spot-check examples against:

- `Profinity-Test/Scripts/TestScripts/` in the Profinity repo.
- `Default-Profinity-Dir/Example Scripts/` templates.

There is **no** automated doc validator for script fences — manually verify compile and runtime behaviour after upgrades.

## Advanced topics

- **Subprocess compile** and in-memory compile paths exist for C# scripts — mention only in advanced OEM guides.
- Rule scripts vs receive/run/service scripts — see [Script types](./Script_Types/index.md).

## Related documentation

- [Rule actions and scripts](../Rules/Rule_Actions_And_Scripts.md)
- [Profinity scripting](../index.md)
- [Write your first script](../../How_To_Guides/Write_Your_First_Script.md)
