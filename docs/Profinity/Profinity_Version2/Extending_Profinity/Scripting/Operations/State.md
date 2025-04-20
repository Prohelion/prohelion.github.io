---
title: State
---

This documentation provides a comprehensive guide to using the ProfinityScriptState class for managing script state in Profinity applications. It covers all major functionality, including state storage, retrieval, and thread-safe operations, with examples in C#, IronPython, and JavaScript.

## Overview

The ProfinityScriptState class provides two distinct ways to manage state in Profinity scripts:

- `State` - Manages state that persists between invocations of the same script. When you run a script multiple times, the state stored using `State` will be maintained between runs of that specific script.

- `GlobalState` - Manages state that can be shared between different scripts. When you run multiple scripts, they can all access and modify the same global state, allowing for inter-script communication and data sharing.

Both provide a robust set of features for storing and retrieving script state data, including concurrent access support and atomic updates. This section gives you a high-level understanding of what these classes can do.

## Key Features

This section lists the core capabilities of the ProfinityScriptState class. These features represent the main functionality you'll use when working with script state management in your applications.

- Thread-safe state storage and retrieval
- Atomic state updates
- Support for any object type as state values
- Simple key-value storage interface
- Concurrent access support
- State persistence between script invocations (State)
- Cross-script state sharing (GlobalState)

## Usage

This section provides detailed examples of how to use both State and GlobalState in your applications. Each example is shown in C#, IronPython, and JavaScript to accommodate different development environments.

### Basic Operations

Basic operations cover the fundamental tasks you'll perform with both State and GlobalState, including storing and retrieving state values. These are the building blocks for more complex state management scenarios.

#### Storing State Values

Storing state values is a fundamental operation. This section shows how to save data to both local and global state stores, with examples of different value types and update scenarios.

___C# Example___

```csharp
// Store a value that persists between runs of this script
State.Set("scriptRunCount", 42);

// Store a value that can be shared with other scripts
GlobalState.Set("totalScriptsRun", "Shared data");

// Store complex objects
State.Set("lastRunConfig", new { Name = "Local", Value = 100 });
GlobalState.Set("sharedConfig", new { Name = "Global", Value = 200 });
```
___Python Example___

```python
# Store a value that persists between runs of this script
State.Set("scriptRunCount", 42)

# Store a value that can be shared with other scripts
GlobalState.Set("totalScriptsRun", "Shared data")

# Store complex objects
State.Set("lastRunConfig", {"Name": "Local", "Value": 100})
GlobalState.Set("sharedConfig", {"Name": "Global", "Value": 200})
```

___JavaScript Example___

```javascript
// Store a value that persists between runs of this script
State.Set("scriptRunCount", 42);

// Store a value that can be shared with other scripts
GlobalState.Set("totalScriptsRun", "Shared data");

// Store complex objects
State.Set("lastRunConfig", { Name: "Local", Value: 100 });
GlobalState.Set("sharedConfig", { Name: "Global", Value: 200 });
```

#### Retrieving State Values

Retrieving state values can be done for any stored key in both local and global state. This section shows how to access stored data and handle cases where values don't exist.

___C# Example___

```csharp
// Retrieve state from previous runs of this script
object runCount = State.Get("scriptRunCount");

// Retrieve state shared by other scripts
object totalRuns = GlobalState.Get("totalScriptsRun");

// Retrieve and cast to specific type
int lastRunValue = (int)State.Get("lastRunConfig");
var sharedConfig = GlobalState.Get("sharedConfig");
```

___Python Example___

```python
# Retrieve state from previous runs of this script
run_count = State.Get("scriptRunCount")

# Retrieve state shared by other scripts
total_runs = GlobalState.Get("totalScriptsRun")

# Retrieve and use values
last_run_config = State.Get("lastRunConfig")
shared_config = GlobalState.Get("sharedConfig")
```

___JavaScript Example___

```javascript
// Retrieve state from previous runs of this script
var runCount = State.Get("scriptRunCount");

// Retrieve state shared by other scripts
var totalRuns = GlobalState.Get("totalScriptsRun");

// Retrieve and use values
var lastRunConfig = State.Get("lastRunConfig");
var sharedConfig = GlobalState.Get("sharedConfig");
```

## Important Notes

This section highlights critical information you should be aware of when using the ProfinityScriptState class. These notes cover thread safety, value types, and state management considerations.

1. **Thread Safety**: Both State and GlobalState are designed to be thread-safe and can be used in multi-threaded environments. All operations are atomic and concurrent access is supported.

2. **Value Types**: Both state stores can hold any object type, but you should be consistent with the types you store and retrieve for each key.

3. **Null Values**: The `Get` method returns null for non-existent keys. Always check for null when retrieving values.

4. **State Persistence**: 
   - `State` maintains values between different runs of the same script
   - `GlobalState` maintains values that can be accessed by any script
   - Neither persists between Profinity application restarts

5. **Memory Usage**: Be mindful of the amount of data you store in both local and global state, as it remains in memory.

## Best Practices

Following these best practices will help you create robust and efficient state management in your scripts. This section provides guidelines for proper usage and common pitfalls to avoid.

1. Use descriptive keys that clearly indicate the purpose of the stored value.

2. Always check for null when retrieving values to handle cases where the key doesn't exist.

3. Be consistent with the types of values you store under each key to avoid type-related issues.

4. Consider using a naming convention for your state keys to avoid conflicts and improve code readability.

5. Use `GlobalState` for data that needs to be shared between different scripts.

6. Use `State` for data that should persist between runs of the same script.

7. When using `GlobalState`, consider using script-specific prefixes in your keys to avoid conflicts between different scripts.

## Dependencies

This section lists the required namespaces and components needed to use the ProfinityScriptState class. Make sure these dependencies are properly referenced in your project.

The ProfinityScriptState class requires the following namespaces:
- System.Collections.Concurrent
- Profinity.Scripting

## Example Usage

This section provides complete, real-world examples showing how to use both State and GlobalState in typical scenarios. The examples demonstrate proper state management, error handling, and type safety.

___C# Example___

```csharp
// Store configuration that persists between runs of this script
State.Set("scriptConfig", new {
    Timeout = 5000,
    RetryCount = 3,
    LogLevel = "Debug"
});

// Store configuration that can be shared with other scripts
GlobalState.Set("sharedConfig", new {
    MaxConnections = 100,
    DefaultTimeout = 10000
});

// Track number of times this script has run
int runCount = (int)(State.Get("runCount") ?? 0);
State.Set("runCount", runCount + 1);

// Share data between scripts
GlobalState.Set("sharedData", new {
    LastRunTime = DateTime.Now,
    TotalProcessed = 1000
});
```

___Python Example___

```python
# Store configuration that persists between runs of this script
State.Set("scriptConfig", {
    "Timeout": 5000,
    "RetryCount": 3,
    "LogLevel": "Debug"
})

# Store configuration that can be shared with other scripts
GlobalState.Set("sharedConfig", {
    "MaxConnections": 100,
    "DefaultTimeout": 10000
})

# Track number of times this script has run
run_count = State.Get("runCount")
if run_count is None:
    run_count = 0
State.Set("runCount", run_count + 1)

# Share data between scripts
GlobalState.Set("sharedData", {
    "LastRunTime": datetime.now(),
    "TotalProcessed": 1000
})
```

___JavaScript Example___

```javascript
// Store configuration that persists between runs of this script
State.Set("scriptConfig", {
    Timeout: 5000,
    RetryCount: 3,
    LogLevel: "Debug"
});

// Store configuration that can be shared with other scripts
GlobalState.Set("sharedConfig", {
    MaxConnections: 100,
    DefaultTimeout: 10000
});

// Track number of times this script has run
var runCount = State.Get("runCount") || 0;
State.Set("runCount", runCount + 1);

// Share data between scripts
GlobalState.Set("sharedData", {
    LastRunTime: new Date(),
    TotalProcessed: 1000
});
```
