---
title: Rule Scripts
description: "Scripts set to Run On Alert mode that execute when rules fire with alert context."
---

# Rule Scripts

A script becomes a rule action by setting its **Script Mode** to **Run On Alert** — the same
component used for Run On Demand, Run On Tag Change, and every other trigger, just switched into
a different mode. There is no separate "rule script" component to add, and the rule passes its
firing context directly as a parameter to the method the script implements.

## Setting a script to Run On Alert

1. Add a **CSharp Script**, **Python Script**, or **Lua Script** component (or use an existing one).
2. Set **Script Mode** to **Run On Alert**.
3. Name that component in the rule's **`onTrue`**/**`onFalse`** action list, the same way any
   other rule action is referenced by component name.

Enable scripting in [System Configuration](../../../Administration/System_Config.md) before using
script actions, which every script trigger requires.

## The alert context

When the rule fires, Profinity calls the script's alert method once, passing the firing context
as a parameter — the same context every other rule action receives (see
[Rule actions and scripts](../../../Tags/Actions.md)): rule id/name/level, the edge
that fired, the triggering tag, and **`TriggeredTags`** — every tag in the rule's scope that is
currently true. The context object has the properties `RuleId`, `RuleName`, `RuleDisplayName`,
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

The full files `CSharpAlertTemplate.cs`, `PythonAlertTemplate.py` and `LuaAlertTemplate.lua` ship as templates in the `example_scripts` folder of the Profinity directory (in its `CSharp`, `Python` and `Lua` subfolders), alongside Profinity's other example scripts.

!!! warning "Manually running the script does not call this method"
    A component menu's **Run Script** action, and the Run On Demand/scheduled paths, do not call
    `OnAlert`/`on_alert` — only a rule firing does. There is no "run this manually to test" path
    for the alert method itself; test by driving the rule's condition true.

## Trigger overlap

If the alert method is still running when the rule fires again, **Trigger Overlap** decides what
happens — the same setting **Run On Tag Change** and **Run On Receipt of CAN Message** already
use:

- **Drop** (default) — discard the new firing while the current one is still running.
- **Queue** — hold a bounded backlog, up to **Queue Depth** (1–100, default 8), and run it once
  the current firing completes.

Keep the alert method fast: a slow script under **Queue** mode can build a backlog, and under
**Drop** mode can silently miss firings.

## Status while running as a rule action

**Run On Alert** has no Start/Stop lifecycle the way **Run On Tag Change** does — a rule invokes
it, it does not sit watching. Between firings its status reads **Not Run** or **Run N times**;
status shows **Running** only while `OnAlert`/`on_alert` is actually on the stack. The component's
menu in this mode is **Edit Script** only.

## Related documentation

- [Rule actions and scripts](../../../Tags/Actions.md)
- [Script Types](./index.md)
- [Profinity scripting](../index.md)
- [Write your first script](../../../How_To_Guides/Write_Your_First_Script.md)
