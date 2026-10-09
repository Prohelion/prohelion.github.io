---
title: Console
description: "Script operations for console output and logging messages to the Profinity log."
---

# Console

Console output is available in every script and writes to two streams. Standard output reaches the Profinity log at the `Info` level only when the script's **Log Script Output** setting is on, and the setting is off by default, so a script whose `print()` output does not appear in the log needs that setting switched on. Error output and script exceptions always reach the Profinity log at the `Error` level, whatever the setting.

Each language writes to the console in its own way. In C# the console is `Profinity.Console`. In Python, `print()` writes standard output and `print(..., file=sys.stderr)` writes error output. In Lua, `print(...)` writes standard output and the `stderr(...)` global writes error output.

## Example Usage

The examples below show standard output and error stream usage in each language.

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
        print(f"Error occurred: {ex}", file=sys.stderr)
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

The standard output stream is for normal program output and the error stream is for error messages and warnings. Output is held in memory, so a script should limit how much it writes.