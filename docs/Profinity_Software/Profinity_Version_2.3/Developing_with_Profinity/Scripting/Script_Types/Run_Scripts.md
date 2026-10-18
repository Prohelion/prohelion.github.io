---
title: Run scripts
description: "Run a script on demand, at a fixed interval or on a Quartz cron schedule, and learn how a Run script reports success or failure."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Run scripts

Run scripts are the general-purpose script type: they run when an operator starts them or on a schedule, which suits data collection, testing, and system configuration.
A Run script can use the CAN bus, DBC, State, Console, and Tags operations, can write to the console, and can stop early when it checks `Profinity.ScriptCancelled`.

## Settings

A Run script has three modes, chosen with **Script Mode**.

| Script Mode | Behaviour |
|-------------|-----------|
| **Run On Demand** | Runs the script when an operator selects **Run Script** from the script component's menu. **Cancel Script** stops a run that is still going. |
| **Run On Time Interval** | Runs the script automatically at a fixed interval set with **Time Interval** and **Time Interval Unit**. |
| **Run On CRON Schedule** | Runs the script from a [Quartz cron expression](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) entered in **Cron Schedule**. |

The scheduled modes use these settings.

| Setting | Description |
|---------|-------------|
| **Time Interval** | The interval between runs in **Run On Time Interval** mode, for example every 5 minutes or every hour. |
| **Time Interval Unit** | The unit of the interval: Seconds, Minutes, Hours, or Days. |
| **Cron Schedule** | A Quartz cron expression for **Run On CRON Schedule** mode. |
| **Auto Start Script** | When on, a scheduled script starts by itself. Otherwise it is started with **Start Scheduled Script** and stopped with **Stop Scheduled Script**. |

A Quartz expression has six or seven fields that start with seconds, which differs from a standard five-field cron expression, so `0 0 6 ? * MON-FRI` runs the script at 06:00 on every weekday.

<figure markdown>
![The script editor for a Python Run Script, showing the Python run template with the RunMe function](../../../images/python_run_script.png)
<figcaption>Run Script Editor</figcaption>
</figure>

## Example

The example shows the basic structure of a Run script in each supported language.
It writes two messages to the console, one fixed and one taken from `Profinity.Message`, and reports success.
The interfaces used by the C# sample are available to a script by default, so the sample needs no `using` line for them.

=== "C#"

    ```csharp
    using System;

    public class CSharpRunExample : ProfinityScript, IProfinityRunnableScript
    {
        public bool Run()
        {
            Profinity.Console.WriteLine("This is a CSharp Message!");
            Profinity.Console.WriteLine(Profinity.Message);
            return true;
        }
    }
    ```

=== "Python"

    ```python
    def RunMe():
        print('This is a Python message!')
        print(Profinity.Message)

    RunMe()
    ```

=== "Lua"

    ```lua
    function RunMe()
        print('This is a Lua message!')
        print(Profinity.Message)
    end

    RunMe()
    ```

## Behaviour

In C# the `Run()` method returns a boolean, where `true` reports success and `false` reports failure.
Python and Lua Run scripts have no return value: the script file runs from the top, so the sample defines a function and then calls it.
A Python or Lua script reports failure by raising an error (or, in Python, by calling `sys.exit()` with a non-zero exit code, where `sys.exit(0)` is treated as success).

Python scripts run on [IronPython](https://ironpython.net/) with Python 3 syntax, as described on [Supported Languages](../Supported_Languages/index.md).
