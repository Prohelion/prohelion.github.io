---
title: DBC
description: "Script operations for loading, parsing, and working with DBC files and CAN message definitions."
---

# DBC

The DBC functionality in Profinity provides tools for reading signals defined in the CAN bus database (DBC) files that are loaded by the components in a profile. These files define the structure of CAN messages, including signals, message IDs, and data formats. A script does not load or parse a DBC file itself, because the DBC file is loaded by the component that owns it, and the script looks up that component's signals by name through `Profinity.DBC`. The [DBC viewer](../../../CAN_Utilities/CAN_Bus_DBC.md) shows the Component, Message and Signal names that a script needs to track.

A script can look up a signal definition from a component's loaded DBC file by component, message and signal name, read signal properties such as the unit, minimum, maximum and comment, and read the current physical value of a signal, converted from the latest raw CAN data using the signal's factor and offset.

## Usage

The examples below show the DBC operations in C#, Python and Lua.

### The GetDbcSignal Method

The `GetDbcSignal` method retrieves a signal definition from a component's loaded DBC file using the component name, message name and signal name.

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

| Parameter | Meaning |
|-----------|---------|
| `component` | The name of the component in the profile that owns the DBC file |
| `message` | The name of the CAN message containing the signal |
| `signal` | The name of the signal to retrieve |

#### Return Value

Returns a `DbcSignal` object containing the signal definition. The method throws an `ArgumentException` when the component, message or signal cannot be found, so a script that could reference a missing name wraps the call in `try`/`catch` (C#), `try`/`except` (Python) or `pcall` (Lua).

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

#### Names and Conversion

`GetDbcSignal` throws an `ArgumentException` (`Component not found:` followed by the name, when the component is the one that does not match) if any of the parameters do not match the profile or the DBC file. The `Value` property converts the raw CAN data to the physical value using the signal's factor and offset, and returns `NaN` when the device is not valid or no current packet is available.
