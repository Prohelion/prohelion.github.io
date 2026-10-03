---
title: DBC
description: "Script operations for loading, parsing, and working with DBC files and CAN message definitions."
---

# DBC

The DBC functionality in Profinity provides tools for working with CAN bus database files. These files define the structure of CAN messages, including signals, message IDs, and data formats. Use the DBC viewer in Profinity to find the Component, Message and Signal names that a script needs to track.

## Key Features

The DBC functionality provides the following core capabilities.

- Load and parse DBC files
- Access message definitions
- Access signal definitions
- Convert between raw CAN data and physical values
- Support for different DBC file formats

## Usage

The following examples show how to use the DBC functionality in scripts. Each example is shown in C# and Python.

### Basic Operations

Basic operations cover the fundamental tasks performed with DBC files, such as accessing message and signal definitions.

### GetDbcSignal Method

The `GetDbcSignal` method retrieves a signal definition from the loaded DBC file using the component name, message name, and signal name.

#### Syntax

=== "C#"

    ```csharp
    DbcSignal signal = Profinity.DBC.GetDbcSignal(string component, string message, string signal);
    ```

=== "Python"

    ```python
    signal = Profinity.DBC.GetDbcSignal(component, message, signal)
    ```

#### Parameters

- `component`: The name of the component that sends/receives the message
- `message`: The name of the CAN message containing the signal
- `signal`: The name of the signal to retrieve

#### Return Value

Returns a `DbcSignal` object containing the signal definition, or `null` if the signal is not found.

#### Value Property

The most important property of the returned `DbcSignal` object is the `Value` property, which returns the current physical value of the signal.

=== "C#"

    ```csharp
    // Get a signal definition
    var signal = Profinity.DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed");
    if (signal != null)
    {
        // Get the current physical value of the signal
        double currentValue = signal.Value;
        Profinity.Console.WriteLine($"Current engine speed: {currentValue} {signal.Unit}");
    }
    ```

=== "Python"

    ```python
    # Get a signal definition
    signal = Profinity.DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed")
    if signal:
        # Get the current physical value of the signal
        current_value = signal.Value
        print(f"Current engine speed: {current_value} {signal.Unit}")
    ```

#### Important Notes

1. The component, message, and signal names are case-sensitive
2. Returns `null` if any of the parameters do not match definitions in the DBC file
3. The `Value` property automatically converts the raw CAN data to the physical value using the signal's factor and offset