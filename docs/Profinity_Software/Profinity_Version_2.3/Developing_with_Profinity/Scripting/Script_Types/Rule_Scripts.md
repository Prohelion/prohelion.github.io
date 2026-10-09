---
title: Rule Scripts
description: "Scripts set to Run On Alert mode that execute when rules fire with alert context."
---

# Rule Scripts

!!! info "Licence Required"
    A script set to **Run On Alert** needs the **Scripting** licensed feature, included in the **Desktop**, **Server**, and **Enterprise** editions. An unlicensed instance cannot add or run scripts. See [Licensing](../../../Administration/Licensing.md).

A rule script is a script component with **Script Mode** set to **Run On Alert**. There is no separate rule script component to add, and the rule passes its firing context directly as a parameter to the method the script implements.

## Setting a Script to Run On Alert

Enable scripting in [System Configuration](../../../Administration/System_Configuration/Application_Config.md) first, because every script trigger requires it. Then add a **CSharp Script**, **Python Script** or **Lua Script** component (or use an existing one), set **Script Mode** to **Run On Alert**, and name that component in the `actions` list of a rule, in the same way any other rule action is referenced by component name. The rule below calls a script component named `PackTempScript` when the pack temperature passes 45:

```yaml
version: "2.3"
rules:
  scope:
    prefix: Vehicles/Car1
  rules:
    - rule:
        id: pack_temperature_high
        level: Warning
        scope:
          prefix: Battery/PackTemperature
        expression: tag.Value > 45
        actions:
          - action: PackTempScript
```

## The Alert Context

When the rule fires, Profinity calls the script's alert method once, passing the firing context as a parameter. This is the same context every other rule action receives (see [Rule Actions and Scripts](../../../Tags/Actions.md)): the rule id, name and level, the edge that fired, the triggering tag, and `TriggeredTags`, which holds every tag in the rule's scope that is currently true. The context object has the properties `RuleId`, `RuleName`, `RuleDisplayName`,
`RuleDescription`, `RuleLevel`, `Transition`, `TriggerTagId`, `Value`, `Quality`, `MetaType`,
`Message`, `ExpandedMessage` and `TriggeredTags`, with the same names in C#, Python and Lua. `RuleLevel`
is one of `Trace`, `Debug`, `Info`, `Warning`, `Error` or `Fatal` (see
[Alert level](../../../Tags/Actions.md#alert-level)), `Transition` is one of `EnteredTrue`,
`EnteredFalse`, `EnteredStep` or `ExitedStep`, and each row in `TriggeredTags` has `TagId`, `Value`,
`Quality` and `MetaType`.

=== "C#"

    ```csharp
    using Profinity.Sdk.Abstractions.Scripting;
    using Profinity.Sdk.Components.Scripting;

    public class CSharpAlertExample : ProfinityScript, IProfinityAlertScript
    {
        public void OnAlert(ProfinityScriptRuleContext context)
        {
            Profinity.Console.WriteLine("CSharp Alert : " + context.RuleName + " (" + context.RuleLevel + ")");
            Profinity.Console.WriteLine("Trigger tag: " + context.TriggerTagId);
            Profinity.Console.WriteLine("Triggered tags: " + context.TriggeredTags.Count);
            foreach (ProfinityScriptRuleTriggeredTag row in context.TriggeredTags)
            {
                Profinity.Console.WriteLine("  " + row.TagId + " = " + row.Value + " (" + row.Quality + ")");
            }
        }
    }
    ```

=== "Python"

    ```python
    def on_alert(context):
        print("Python Alert : " + str(context.RuleName) + " (" + str(context.RuleLevel) + ")")
        print("Trigger tag: " + str(context.TriggerTagId))
        print("Triggered tags: " + str(context.TriggeredTags.Count))
        for row in context.TriggeredTags:
            print("  " + str(row.TagId) + " = " + str(row.Value) + " (" + str(row.Quality) + ")")
    ```

=== "Lua"

    ```lua
    function on_alert(context)
        print('Lua Alert : ' .. tostring(context.RuleName) .. ' (' .. tostring(context.RuleLevel) .. ')')
        print('Trigger tag: ' .. tostring(context.TriggerTagId))
        print('Triggered tags: ' .. tostring(context.TriggeredTags.Count))
        for i = 0, context.TriggeredTags.Count - 1 do
            local row = context.TriggeredTags[i]
            print('  ' .. tostring(row.TagId) .. ' = ' .. tostring(row.Value) .. ' (' .. tostring(row.Quality) .. ')')
        end
    end
    ```

The full files `CSharpAlertTemplate.cs`, `PythonAlertTemplate.py` and `LuaAlertTemplate.lua` are built into Profinity as the templates it offers when you create a script of that type.

!!! warning "Running the Script by Hand Does Not Call This Method"
    The **Run Script** action on a component menu, and the Run On Demand and scheduled paths, do not call
    `OnAlert` or `on_alert`. Only a rule firing does, so the alert method is tested by driving the rule's condition true.

## Trigger Overlap

If the alert method is still running when the rule fires again, **Trigger Overlap** decides what happens. It is the same setting that **Run On Tag Change** and **Run On Receipt of CAN Message** use:

- **Drop** (the default): discards the new firing while the current one is still running.
- **Queue**: holds a bounded backlog, up to **Queue Depth** (1 to 100, default 8), and runs it once the current firing completes.

The alert method should stay fast, because a slow script under **Queue** builds a backlog and under **Drop** silently misses firings.

## Status While Running as a Rule Action

**Run On Alert** has no start and stop lifecycle, because a rule invokes the script and the script does not sit watching. Between firings its status reads **Not Run** or **Run N times**, and the status shows **Running** while `OnAlert` or `on_alert` is executing. The component's menu in this mode is **Edit Script** only.

## Related Documentation

- [Rule Actions and Scripts](../../../Tags/Actions.md)
- [Script Types](./index.md)
- [Profinity Scripting](../index.md)
- [Write Your First Script](../../../How_To_Guides/Write_Your_First_Script.md)
