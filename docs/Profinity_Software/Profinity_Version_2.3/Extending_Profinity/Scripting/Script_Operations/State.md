---
title: State
description: "Thread-safe state management for persistence between script invocations and inter-script communication."
---

# State

Scripts in Profinity have a lifecycle in which they run and then stop, so information that must survive between invocations of a script, or be shared between different scripts, needs to be held in state. Profinity provides a state management mechanism for this, covering state storage, retrieval, and thread-safe operations, with examples in C#, Python and Lua.

Profinity provides two distinct ways to manage state in scripts:

- `State` - Manages state that persists between invocations of the same script. When you run a script multiple times, the state stored using `State` will be maintained between runs of that specific script.

- `GlobalState` - Manages state that can be shared between different scripts. When you run multiple scripts, they can all access and modify the same global state, allowing for inter-script communication and data sharing.

Both support storing and retrieving script state data, including concurrent access and atomic updates.

## Key Features

The `ProfinityScriptState` class provides the following core capabilities.

- Thread-safe state storage and retrieval
- Atomic state updates
- Support for any object type as state values
- Simple key-value storage interface
- Concurrent access support
- State persistence between script invocations (State)
- Cross-script state sharing (GlobalState)

## Basic Usage

The following examples show how to use both `State` and `GlobalState` in scripts, each in C#, Python and Lua. Storing and retrieving values are the building blocks for more complex state management.

### Storing State Values

The following examples save data to both the local and global state stores, using different value types.

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

### Retrieving State Values

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

## More Complete Examples

The following examples show both `State` and `GlobalState` in typical scenarios, including a run counter and shared configuration.

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

## Important Notes

The following notes cover thread safety, value types, and state management considerations.

1. **Thread Safety**: Both State and GlobalState are designed to be thread-safe and can be used in multi-threaded environments. All operations are atomic and concurrent access is supported.

2. **Value Types**: Both state stores can hold any object type, but you should be consistent with the types you store and retrieve for each key.

3. **Null Values**: The `Get` method returns null for non-existent keys. Always check for null when retrieving values.

4. **State Persistence**: 
   - `State` maintains values between different runs of the same script
   - `GlobalState` maintains values that can be accessed by any script
   - Neither persists between Profinity application restarts

5. **Memory Usage**: Be mindful of the amount of data you store in both local and global state, as it remains in memory.

## Best Practices

The following practices avoid common state management problems.

1. Use descriptive keys that clearly indicate the purpose of the stored value.

2. Always check for null when retrieving values to handle cases where the key does not exist.

3. Be consistent with the types of values you store under each key to avoid type-related issues.

4. Consider using a naming convention for your state keys to avoid conflicts and improve code readability.

5. Use `GlobalState` for data that needs to be shared between different scripts.

6. Use `State` for data that should persist between runs of the same script.

7. When using `GlobalState`, consider using script-specific prefixes in your keys to avoid conflicts between different scripts.


