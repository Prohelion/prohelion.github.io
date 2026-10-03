---
title: Console
description: "Script operations for console output and logging messages to the Profinity log."
---

# Console

The Console class provides output operations for Profinity scripts. The Console object is automatically provided in all scripts and offers a simple interface for writing to the standard output and error streams.

The Console class is a wrapper around the Profinity Log. It handles both streams with automatic encoding support and stream management, sending standard output to the Profinity log at the `Info` level and error output at the `Error` level.

Access to console functionality varies by language:

- C#: Access through `Profinity.Console`
- Python: Use the built-in `print()` function. For error output, use `print(..., file=sys.stderr)`
- Lua: Use the built-in `print(...)` function. For error output, use the `stderr(...)` global

## Key Features

The Console class provides the following core capabilities.

- Write text to the console output stream
- Write text to the error stream
- Automatic stream encoding support
- Automatic stream management and disposal

## Example Usage

The following examples show standard output and error stream usage in each language.

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
    import sys

    # Write normal program output
    print("Starting script execution...")

    try:
        # Perform some operation
        print("Operation completed successfully")
    except Exception as ex:
        # Write error to error stream
        print(f"Error occurred: {ex.Message}", file=sys.stderr)
    ```

=== "Lua"

    ```lua
    -- Write normal program output
    print('Starting script execution...')

    local ok, err = pcall(function()
        -- Perform some operation
        print('Operation completed successfully')
    end)

    if not ok then
        -- Write error to error stream
        stderr('Error occurred: ' .. tostring(err))
    end
    ```

## Best Practices

1. Use the standard output stream for normal program output and the error stream for error messages and warnings.
2. Limit the amount of output a script generates, because the output is stored in memory.