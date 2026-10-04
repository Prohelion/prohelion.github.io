---
title: Run Scripts
description: "Flexible scripts executed manually on-demand or automatically on a schedule."
---

# Run Scripts

Run scripts are the most flexible and commonly used script type in Profinity. They can be executed either manually by users or automatically on a schedule, which suits a wide range of automation tasks that need to be performed on demand or at specific intervals, such as data collection, testing, or system configuration.

Run scripts support three execution modes:

- **Run On Demand**: Scripts executed manually by users
- **Time Interval**: Scripts that run automatically at regular intervals (e.g., every 5 minutes, every hour)
- **Cron Schedule**: Scripts that run on a cron schedule using Quartz cron expressions

## Characteristics
- Can be executed manually or on a schedule
- Can interact with CAN bus, DBC files, and state management
- Support for console output
- Can be used for testing, data collection, and automation
- Support for cancellation handling
- Support for time-based scheduling (TimeInterval and CronSchedule modes)

<figure markdown>
![Run script configuration](../../../images/python_run_script.png)
<figcaption>Run script editor and scheduling options</figcaption>
</figure>

## Examples

The following example shows the basic structure of a Run script in each supported language. The example is simple, but it illustrates the essential pattern for the script type.

This example demonstrates a basic Run script that:

- Prints messages to the console
- Accesses the Profinity message property
- Reports success or failure, which differs by language

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

In C# the `Run()` method returns a boolean, where `true` reports success and `false` reports failure. Python and Lua Run scripts have no return value: the script file runs from the top, so the sample defines a function and then calls it, and a script reports failure by raising an error (or, in Python, by calling `sys.exit()` with a non-zero exit code, where `sys.exit(0)` is treated as success).

Profinity uses [IronPython](https://ironpython.net/) with Python 3 compatibility enabled. All Python scripts use Python 3 syntax, including `print()` as a function (not a statement) and f-strings.
