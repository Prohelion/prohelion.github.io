---
title: Rule scripts
description: "Run a script when a tag rule fires by setting Script Mode to Run On Alert, and read the alert context the rule passes to it."
type: reference
owner: Documentation
last_reviewed: 2026-11-10
---

# Rule scripts

A rule script is a script component with **Script Mode** set to **Run On Alert**, which a [tag rule](../../../Tags/Rules/index.md) runs as one of its actions.
The rule passes the details of the alert to the method the script implements.

A rule runs the script only with both the **Scripting** and **Tag Rule Actions** licensed features, which the Server and Enterprise editions include.
A Desktop edition can add the script, but a rule does not run it.
Refer to [Licensing](../../../Licensing.md).

## Set up a rule script

A rule script needs these settings in place:

- The language is turned on in **Optional Capabilities** in [Application Config](../../../Administration/System_Configuration/Application_Config.md): **Enable C# Scripting**, **Enable Python Scripting**, or **Enable Lua Scripting**. Changing Application Config needs the **System administration** permission.
- A **CSharp Script**, **Python Script**, or **Lua Script** component has **Script Mode** set to **Run On Alert**. The component's script holds the alert method shown in [Example](#example), which you edit with **Edit Script** on the component's menu.
- A rule names the script component in its `actions` list, in the same way as any other rule action. Create the rule in `rules.yaml` or in the rules visual editor, which is under **TAG UTILITIES** > **RULES & ACTIONS**, as described in [Complete rules.yaml example](../../../Tags/Rules/Rules_YAML_Example.md).

This rule runs a script component named `PackTempScript` when the pack temperature passes 45:

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
            parameters:
              setpoint: 45
              unit: C
              source:
                tag: Vehicles/Car1/Battery/PackTemperature
```

## The alert context

When the rule fires, Profinity calls the script's alert method once, and passes it a context object that describes the alert.
Every other rule action receives the same context, as described in [Rule actions](../../../Tags/Rules/Actions/index.md).
The properties have the same names in C#, Python, and Lua.

| Property | Type | Holds |
|---|---|---|
| `RuleId` | Text | The rule's `id`. |
| `RuleName`, `RuleDisplayName` | Text | The rule's name, and its display name when it has one. |
| `RuleDescription` | Text | The rule's description, when it has one. |
| `RuleLevel` | Text | The alert level: `Trace`, `Debug`, `Info`, `Warning`, `Error`, or `Fatal`, as described in [Alert levels](../../../Tags/Alerts.md#alert-levels). |
| `Transition` | Text | The change that fired the rule, listed after this table. |
| `TriggerTagId` | Text | The full path of the tag that fired the rule. |
| `Value`, `Quality`, `MetaType` | Value, text, text | The triggering tag's value, its quality, and its value type. |
| `Message`, `ExpandedMessage` | Text | The rule's message, as written and with its placeholders filled in. |
| `TriggeredTags` | List | Every tag in the rule's scope whose condition is true now. Each row has `TagId`, `Value`, `Quality`, and `MetaType`. |
| `Parameters` | Dictionary | The named inputs from the action entry, as described after this table. |

`Transition` is one of these values:

- `EnteredTrue` and `EnteredFalse`: a boolean rule tripped or cleared.
- `EnteredStep` and `ExitedStep`: the value entered or left a threshold step, which is one band of a threshold rule with its own level and actions.
- `Updated`: the value changed while the alert stayed tripped, as described under [On update](../../../Tags/Rules/Rule_Settings.md#on-update).

`Parameters` is a dictionary keyed by the names written under `parameters` on the action entry.
A number or boolean literal arrives as its value, a text literal arrives with its [message placeholders](../../../Tags/Rules/Actions/index.md#message-placeholders) filled in, such as `{TagId}`, and a tag variable arrives as that tag's current value.
Read an entry by name, for example `context.Parameters["setpoint"]` in C# and Python, or `context.Parameters['setpoint']` in Lua.

## Example

Each example is a complete alert script, which goes in the script component's editor, opened with **Edit Script**.
It writes the alert details to the script output, which the reader sees in the script's log, and in the Profinity log at the Info level when **Log Script Output** is on.

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
            if (context.Parameters.TryGetValue("setpoint", out object? setpoint))
            {
                Profinity.Console.WriteLine("Setpoint: " + setpoint);
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
        if context.Parameters.ContainsKey('setpoint'):
            print("Setpoint: " + str(context.Parameters['setpoint']))
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
        local setpoint = context.Parameters['setpoint']
        if setpoint ~= nil then
            print('Setpoint: ' .. tostring(setpoint))
        end
    end
    ```

When you create a script component, its editor starts with a template that already holds an alert method in the same form.

## Behaviour

!!! warning "Running the script by hand does not call this method"
    Only a rule that fires calls `OnAlert` or `on_alert`, and the **Run Script** action, **Run On Demand**, and a schedule do not.
    To test the method, make the rule's condition true, for example by lowering its threshold for a while, or by replaying a log that holds the alert, as described in [How to replay CAN bus logs](../../../How_To_Guides/Replay_CAN_Logs.md).

In **Run On Alert** mode the script is idle until a rule runs it, so it has no start or stop.
Between firings its status reads **Not Run** or **Run N times**, and the status shows **Running** while `OnAlert` or `on_alert` is executing.

The component's menu in this mode is **Edit Script** only.

### Trigger overlap

If the alert method is still running when the rule fires again, **Trigger Overlap** decides what happens, as described under [Script settings](./index.md#script-settings).

A threshold rule can start several of those firings in one evaluation.
Moving up runs the actions of each step it enters, from the lower step to the higher one.
Moving down runs the [clear actions](../../../Tags/Rules/Actions/index.md#actions-inherited-down-the-rule-tree) of each step it leaves, starting at the step it was on and stopping before the step it lands on.

Profinity starts the next action without waiting for the script to finish.
With **Drop**, a script that is still running discards that next action, and the rule does not try it again, because the step has already changed.
The side effect then stays on a step the value has already left.

Set **Trigger Overlap** to **Queue** when the script must carry out every step, including the step the value lands on.
Actions beyond **Queue Depth** are still discarded.
The same choice applies when one step names the script more than once, because those actions also start one after another.

For example, an indicator script with green, yellow, and red steps uses the clear action of each step to set the colour of the step below.
A drop from red straight to green starts the yellow action and then the green action.
**Drop** can leave the indicator yellow.
**Queue** runs yellow and then green, so the indicator finishes on green.

The alert method should stay fast, because a slow script under **Queue** builds a backlog and under **Drop** misses firings.

For the other script modes, refer to [Script types](./index.md).
For the scripting overview and a worked first script, refer to [Profinity Scripting](../index.md) and [How to write your first script](../../../How_To_Guides/Write_Your_First_Script.md).
