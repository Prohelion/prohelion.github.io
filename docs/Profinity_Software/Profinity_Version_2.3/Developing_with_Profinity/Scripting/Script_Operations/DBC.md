---
title: DBC
description: "Script operations for loading, parsing, and working with DBC files and CAN message definitions."
---

# DBC

The DBC functionality in Profinity provides tools for reading signals defined in the CAN bus database (DBC) files that are loaded by the components in a profile. These files define the structure of CAN messages, including signals, message IDs, and data formats. A script does not load or parse a DBC file itself, because the DBC file is loaded by the component that owns it, and the script looks up that component's signals by name through `Profinity.DBC`. Use the DBC viewer in Profinity to find the Component, Message and Signal names that a script needs to track.

## Key Features

The DBC functionality provides the following core capabilities.

- Look up a signal definition from a component's loaded DBC file by component, message and signal name
- Read signal properties such as the unit, minimum, maximum and comment
- Read the current physical value of a signal, converted from the latest raw CAN data using the signal's factor and offset

## Usage

The following examples show how to use the DBC functionality in scripts. Each example is shown in C#, Python and Lua.

### Basic Operations

Basic operations cover the fundamental tasks performed with DBC signals, such as accessing signal definitions and reading their current values.

### GetDbcSignal Method

The `GetDbcSignal` method retrieves a signal definition from a component's loaded DBC file using the component name, message name, and signal name.

#### Syntax

=== "C#"

    ```csharp
    DbcSignal signal = Profinity.DBC.GetDbcSignal(string component, string message, string signal);
    ```

=== "Python"

    ```python
    signal = Profinity.DBC.GetDbcSignal(component, message, signal)
    ```

=== "Lua"

    ```lua
    local signal = Profinity.DBC:GetDbcSignal(component, message, signal)
    ```

#### Parameters

- `component`: The name of the component that sends/receives the message
- `message`: The name of the CAN message containing the signal
- `signal`: The name of the signal to retrieve

#### Return Value

Returns a `DbcSignal` object containing the signal definition. The method throws an `ArgumentException` when the component, message or signal cannot be found, so a script that may reference a missing name should wrap the call in `try`/`catch` (C#), `try`/`except` (Python) or `pcall` (Lua).

#### Value Property

The most important property of the returned `DbcSignal` object is the `Value` property, which returns the current physical value of the signal, or `NaN` (not a number) when no valid value is available, for example when no packet has been received for the message yet or the last packet is older than the DBC validity period.

=== "C#"

    ```csharp
    try
    {
        // Get a signal definition
        var signal = Profinity.DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed");

        // Get the current physical value of the signal
        double currentValue = signal.Value;
        if (double.IsNaN(currentValue))
        {
            Profinity.Console.WriteLine("No valid value for EngineSpeed yet");
        }
        else
        {
            Profinity.Console.WriteLine($"Current engine speed: {currentValue} {signal.Unit}");
        }
    }
    catch (Exception ex)
    {
        Profinity.Console.WriteLine($"Error reading DBC signal: {ex.Message}");
    }
    ```

=== "Python"

    ```python
    import math

    try:
        # Get a signal definition
        signal = Profinity.DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed")

        # Get the current physical value of the signal
        current_value = signal.Value
        if math.isnan(current_value):
            print("No valid value for EngineSpeed yet")
        else:
            print(f"Current engine speed: {current_value} {signal.Unit}")
    except Exception as ex:
        print(f"Error reading DBC signal: {ex}")
    ```

=== "Lua"

    ```lua
    local ok, signal = pcall(function()
        return Profinity.DBC:GetDbcSignal('ECU', 'EngineData', 'EngineSpeed')
    end)

    if ok then
        local currentValue = signal.Value
        -- NaN is the only value that is not equal to itself
        if currentValue ~= currentValue then
            print('No valid value for EngineSpeed yet')
        else
            print('Current engine speed: ' .. tostring(currentValue) .. ' ' .. tostring(signal.Unit))
        end
    else
        print('Error reading DBC signal: ' .. tostring(signal))
    end
    ```

#### Important Notes

1. The component, message, and signal names are case-sensitive
2. Throws an `ArgumentException` if any of the parameters do not match definitions in the DBC file
3. The `Value` property automatically converts the raw CAN data to the physical value using the signal's factor and offset, and returns `NaN` when the device is not valid or no current packet is available