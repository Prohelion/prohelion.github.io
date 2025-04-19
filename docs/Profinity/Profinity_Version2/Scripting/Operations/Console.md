---
title: Console
---

This documentation provides a comprehensive guide to using the Console class for output and input operations in Profinity scripts. The Console object is automatically provided in all scripts and provides a simple interface for console operations.

## Overview

The Console class serves as a wrapper around the underlying `ProfinityScriptConsole` class, providing a simplified interface for console operations in Profinity scripts. It handles both standard output and error streams, with automatic encoding support and stream management.

Access to console functionality varies by language:
- C#: Access through `Profinity.Console`
- IronPython: Use the built-in `print()` and `eprint()` functions
- JavaScript: Use the built-in `log()` and `error()` functions

## Key Features

This section lists the core capabilities of the Console class. These features represent the main functionality you'll use when working with console operations in your scripts.

- Write text to the console output stream
- Write text to the error stream
- Automatic stream encoding support
- Automatic stream management and disposal

## Usage

This section provides detailed examples of how to use the Console object in your scripts. Each example is shown in C#, IronPython, and JavaScript to accommodate different development environments.

### Basic Operations

Basic operations cover the fundamental tasks you'll perform with the Console, including writing output.

#### Writing to Console

Writing to the console is a fundamental operation. This section shows how to output text to both standard output and error streams.

___C# Example___

```csharp
// Write to standard output
Profinity.Console.WriteLine("This is a normal message");

// Write to error stream
Profinity.Console.Error.WriteLine("This is an error message");
```

___Python Example___

```python
# Write to standard output
print("This is a normal message")

# Write to error stream
eprint("This is an error message")
```

___JavaScript Example___

```javascript
// Write to standard output
log("This is a normal message");

// Write to error stream
error("This is an error message");
```

## Important Notes

This section highlights critical information you should be aware of when using the Console class. These notes cover stream management, encoding, and resource handling considerations.

1. **Stream Management**: The Console class automatically manages both output and error streams, including proper disposal when the script completes.

2. **Encoding Support**: The Console class supports different encodings for output and error streams, configured during initialization.

3. **AutoFlush**: Both output and error streams are configured with AutoFlush enabled by default.

4. **Resource Management**: Streams are automatically disposed when the script completes or when the Console object is disposed.

5. **Thread Safety**: The Console class is designed to be thread-safe and can be used in multi-threaded environments.

## Best Practices

Following these best practices will help you create robust and efficient console output in your scripts. This section provides guidelines for proper usage and common pitfalls to avoid.

1. Use the standard output stream for normal program output and the error stream for error messages and warnings.

2. Be mindful of the amount of output you generate, as it will be stored in memory.

3. Consider using appropriate error stream output for error conditions and warnings.

## Dependencies

This section lists the required namespaces and components needed to use the Console class. Make sure these dependencies are properly referenced in your project.

The Console class requires the following namespaces:
- System.IO
- System.Text
- Profinity.Scripting.ScriptEngines

## Example Usage

This section provides complete, real-world examples showing how to use the Console class in typical scenarios. The examples demonstrate proper console output handling and error stream usage.

___C# Example___

```csharp
// Write normal program output
Profinity.Console.WriteLine("Starting script execution...");

try
{
    // Perform some operation
    Profinity.Console.WriteLine("Operation completed successfully");
}
catch (Exception ex)
{
    // Write error to error stream
    Profinity.Console.Error.WriteLine($"Error occurred: {ex.Message}");
}
```

___Python Example___

```python
# Write normal program output
print("Starting script execution...")

try:
    // Perform some operation
    print("Operation completed successfully")
except Exception as ex:
    // Write error to error stream
    eprint(f"Error occurred: {ex.Message}")
```

___JavaScript Example___

```javascript
// Write normal program output
log("Starting script execution...");

try {
    // Perform some operation
    log("Operation completed successfully");
} catch (ex) {
    // Write error to error stream
    error(`Error occurred: ${ex.message}`);
}
```
