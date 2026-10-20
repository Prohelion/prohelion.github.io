---
title: Rule scripts
description: "Run a script when a tag rule fires by setting Script Mode to Run On Alert, and read the alert context the rule passes to it."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Rule scripts

!!! info "Licence required"
    A script set to **Run On Alert** needs both the **Scripting** and **Tag Rule Actions** licensed features, so the **Server** or **Enterprise** edition. A Desktop licence can add the script, but a rule does not run it. An unlicensed instance cannot add or run scripts. Refer to [Licensing](../../../Licensing.md).

A rule script is a script component with **Script Mode** set to **Run On Alert**.
There is no separate rule script component to add, and the rule passes its firing context directly as a parameter to the method the script implements.

## Settings

Enable scripting in [Application Config](../../../Administration/System_Configuration/Application_Config.md) first, because every script trigger requires it.
Then add a **CSharp Script**, **Python Script** or **Lua Script** component (or use an existing one), set **Script Mode** to **Run On Alert**, and name that component in the `actions` list of a rule, in the same way any other rule action is referenced by component name.
The rule below calls a script component named `PackTempScript` when the pack temperature passes 45:

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

## The alert context

When the rule fires, Profinity calls the script's alert method once, passing the firing context as a parameter.
This is the same context every other rule action receives (refer to [Actions](../../../Tags/Rules/Actions/index.md)): the rule id, name and level, the edge that fired, the triggering tag, and `TriggeredTags`, which holds every tag in the rule's scope that is currently true.
The context object has the properties `RuleId`, `RuleName`, `RuleDisplayName`, `RuleDescription`, `RuleLevel`, `Transition`, `TriggerTagId`, `Value`, `Quality`, `MetaType`, `Message`, `ExpandedMessage` and `TriggeredTags`, with the same names in C#, Python and Lua.
`RuleLevel` is one of `Trace`, `Debug`, `Info`, `Warning`, `Error` or `Fatal` (refer to [Alert levels](../../../Tags/Alerts.md#alert-levels)).
`Transition` is one of `EnteredTrue`, `EnteredFalse`, `EnteredStep` or `ExitedStep`.
Each row in `TriggeredTags` has `TagId`, `Value`, `Quality` and `MetaType`.

## Example

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

## Behaviour

!!! warning "Running the script by hand does not call this method"
    The **Run Script** action on a component menu, and the Run On Demand and scheduled paths, do not call `OnAlert` or `on_alert`.
    Only a rule firing does, so the alert method is tested by driving the rule's condition true.

**Run On Alert** has no start and stop lifecycle, because a rule invokes the script and the script does not sit watching.
Between firings its status reads **Not Run** or **Run N times**, and the status shows **Running** while `OnAlert` or `on_alert` is executing.
The component's menu in this mode is **Edit Script** only.

### Trigger overlap

If the alert method is still running when the rule fires again, **Trigger Overlap** decides what happens.
It is the same setting that **Run On Tag Change** and **Run On Receipt of CAN Message** use:

| Trigger Overlap | Effect |
|-----------------|--------|
| **Drop** (default) | Discards the new firing while the current one is still running. |
| **Queue** | Holds a bounded backlog, up to **Queue Depth** (1 to 100, default 8), and runs it once the current firing completes. |

The alert method should stay fast, because a slow script under **Queue** builds a backlog and under **Drop** silently misses firings.

For the other script modes, refer to [Script types](./index.md).
For the scripting overview and a worked first script, refer to [Profinity Scripting](../index.md) and [How to Write Your First Script](../../../How_To_Guides/Write_Your_First_Script.md).
