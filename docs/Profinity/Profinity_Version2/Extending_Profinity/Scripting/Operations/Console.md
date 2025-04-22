---
title: Console
---

This documentation provides a comprehensive guide to using the Console class for output and input operations in Profinity scripts. The Console object is automatically provided in all scripts and provides a simple interface for console operations.

## Overview

The Console class serves as a wrapper around the Profinity Log. It handles both standard output and error streams, with automatic encoding support and stream management, log message are sent to the Profinity log at the `Info` level and Error messages at the `Error` level.

Access to console functionality varies by language:

- C#: Access through `Profinity.Console`
- Python: Use the built-in `print()` and `eprint()` functions
- JavaScript: Use the built-in `log()` and `error()` functions

## Key Features

This section lists the core capabilities of the Console class. These features represent the main functionality you'll use when working with console operations in your scripts.

- Write text to the console output stream
- Write text to the error stream
- Automatic stream encoding support
- Automatic stream management and disposal

## Example Usage

This section provides complete, real-world examples showing how to use the Console class in typical scenarios. The examples demonstrate proper console output handling and error stream usage.

=== "C#"

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

=== "Python"

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

=== "Javascript"

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

## Best Practices

Following these best practices will help you create robust and efficient console output in your scripts. This section provides guidelines for proper usage and common pitfalls to avoid.

1. Use the standard output stream for normal program output and the error stream for error messages and warnings.
2. Be mindful of the amount of output you generate, as it will be stored in memory.
3. Consider using appropriate error stream output for error conditions and warnings.