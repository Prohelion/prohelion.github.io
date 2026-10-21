---
title: State
description: "Keep values between runs of one script with State, or share them between scripts with GlobalState, in C#, Python and Lua."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# State

Scripts in Profinity run and then stop, so information that must survive between invocations of a script, or be shared between different scripts, needs to be held in state.
Profinity provides two key-value stores for this, with examples in C#, Python and Lua.
`State` holds values that persist between runs of the same script, so a script that runs several times finds the values it stored on the earlier runs.
`GlobalState` holds values that every script can read and change, which allows scripts to pass data to each other.
Either store accepts any object type as a value, and each individual call is thread-safe, so several scripts can use the stores at the same time.

## Storing state values

The examples in this section save data to both the local and global state stores, using different value types.

=== "C#"

    ```csharp
    // Store a value that persists between runs of this script
    Profinity.State.Set("scriptRunCount", 42);

    // Store a value that can be shared with other scripts
    Profinity.GlobalState.Set("totalScriptsRun", "Shared data");

    // Store complex objects
    Profinity.State.Set("lastRunConfig", new { Name = "Local", Value = 100 });
    Profinity.GlobalState.Set("sharedConfig", new { Name = "Global", Value = 200 });
    ```

=== "Python"

    ```python
    # Store a value that persists between runs of this script
    Profinity.State.Set("scriptRunCount", 42)

    # Store a value that can be shared with other scripts
    Profinity.GlobalState.Set("totalScriptsRun", "Shared data")

    # Store complex objects
    Profinity.State.Set("lastRunConfig", {"Name": "Local", "Value": 100})
    Profinity.GlobalState.Set("sharedConfig", {"Name": "Global", "Value": 200})
    ```

=== "Lua"

    ```lua
    -- Store a value that persists between runs of this script
    Profinity.State:Set('scriptRunCount', 42)

    -- Store a value that can be shared with other scripts
    Profinity.GlobalState:Set('totalScriptsRun', 'Shared data')
    ```

## Retrieving state values

Any stored key can be retrieved from both the local and global state stores, and a key that does not exist returns null.

=== "C#"

    ```csharp
    // Retrieve state from previous runs of this script
    object runCount = Profinity.State.Get("scriptRunCount");

    // Retrieve state shared by other scripts
    object totalRuns = Profinity.GlobalState.Get("totalScriptsRun");

    // Retrieve and test for a specific type, because Get returns object
    if (Profinity.State.Get("scriptRunCount") is int lastRunValue)
    {
        Profinity.Console.WriteLine($"Previous value: {lastRunValue}");
    }
    object sharedConfig = Profinity.GlobalState.Get("sharedConfig");
    ```

=== "Python"

    ```python
    # Retrieve state from previous runs of this script
    run_count = Profinity.State.Get("scriptRunCount")

    # Retrieve state shared by other scripts
    total_runs = Profinity.GlobalState.Get("totalScriptsRun")

    # Retrieve and use values
    last_run_config = Profinity.State.Get("lastRunConfig")
    shared_config = Profinity.GlobalState.Get("sharedConfig")
    ```

=== "Lua"

    ```lua
    -- Retrieve state from previous runs of this script
    local runCount = Profinity.State:Get('scriptRunCount')

    -- Retrieve state shared by other scripts
    local totalRuns = Profinity.GlobalState:Get('totalScriptsRun')

    print('Run count: ' .. tostring(runCount))
    print('Total runs: ' .. tostring(totalRuns))
    ```

## More complete examples

The examples in this section show both `State` and `GlobalState` in typical scenarios, including a run counter and shared configuration.
The C# and Python versions are shown.
Lua uses the `Profinity.State:Get` and `Profinity.State:Set` calls from the Storing state values and Retrieving state values sections for the same pattern.

=== "C#"

    ```csharp
    // Store configuration that persists between runs of this script
    Profinity.State.Set("scriptConfig", new {
        Timeout = 5000,
        RetryCount = 3,
        LogLevel = "Debug"
    });

    // Store configuration that can be shared with other scripts
    Profinity.GlobalState.Set("sharedConfig", new {
        MaxConnections = 100,
        DefaultTimeout = 10000
    });

    // Track number of times this script has run
    int runCount = Profinity.State.Get("runCount") is int previousCount ? previousCount : 0;
    Profinity.State.Set("runCount", runCount + 1);

    // Share data between scripts
    Profinity.GlobalState.Set("sharedData", new {
        LastRunTime = DateTime.Now,
        TotalProcessed = 1000
    });
    ```

=== "Python"

    ```python
    from datetime import datetime

    # Store configuration that persists between runs of this script
    Profinity.State.Set("scriptConfig", {
        "Timeout": 5000,
        "RetryCount": 3,
        "LogLevel": "Debug"
    })

    # Store configuration that can be shared with other scripts
    Profinity.GlobalState.Set("sharedConfig", {
        "MaxConnections": 100,
        "DefaultTimeout": 10000
    })

    # Track number of times this script has run
    run_count = Profinity.State.Get("runCount")
    if run_count is None:
        run_count = 0
    Profinity.State.Set("runCount", run_count + 1)

    # Share data between scripts
    Profinity.GlobalState.Set("sharedData", {
        "LastRunTime": datetime.now(),
        "TotalProcessed": 1000
    })
    ```

## Thread safety and limits

Each store has three methods: `Get(key)`, `Set(key, value)` and `Clear()`, which removes every value in the store.
The individual calls are thread-safe, but a sequence of calls is not atomic.
A read followed by a write can lose an update when two scripts run it at the same time on the same `GlobalState` key.
The run counter in the More complete examples section is one case.
Neither store survives a Profinity restart, and both keep their values in memory, so a script should store only the data it needs.

`Get` returns null for a key that has not been set, so every `Get` should be checked for null.
Name each key for its purpose.
Store one value type under each key.
Prefix the keys written to `GlobalState` with the script name, so that two scripts do not overwrite each other.
