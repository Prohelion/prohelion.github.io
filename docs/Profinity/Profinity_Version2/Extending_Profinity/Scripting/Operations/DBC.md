---
title: DBC
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# DBC

The DBC functionality in Profinity provides tools for working with CAN bus database files. These files define the structure of CAN messages, including signals, message IDs, and data formats. This section gives you a high-level understanding of what the DBC functionality can do.

Use the [DBC viewer](../../../Components/DBC_Files/index.md) in Profinity to get the Component, Message and Signal names that you want to track

## Key Features

This section lists the core capabilities of the DBC functionality. These features represent the main functionality you'll use when working with DBC files in your applications.

- Load and parse DBC files
- Access message definitions
- Access signal definitions
- Convert between raw CAN data and physical values
- Support for different DBC file formats

## Usage

This section provides detailed examples of how to use the DBC functionality in your applications. Each example is shown in C#, Python, and JavaScript to accommodate different development environments.

### Basic Operations

Basic operations cover the fundamental tasks you'll perform with DBC files, including loading and accessing message definitions.

## GetDbcSignal Method

The `GetDbcSignal` method retrieves a signal definition from the loaded DBC file using the component name, message name, and signal name.

### Syntax

=== "C#"

    ```csharp
    DbcSignal signal = DBC.GetDbcSignal(string component, string message, string signal);
    ```

=== "Python"

    ```python
    signal = DBC.GetDbcSignal(component, message, signal)
    ```

=== "Javascript"

    ```javascript
    var signal = DBC.GetDbcSignal(component, message, signal);
    ```

### Parameters

- `component`: The name of the component that sends/receives the message
- `message`: The name of the CAN message containing the signal
- `signal`: The name of the signal to retrieve

### Return Value

Returns a `DbcSignal` object containing the signal definition, or `null` if the signal is not found.

### Value Property

The most important property of the returned `DbcSignal` object is the `Value` property, which returns the current physical value of the signal.

=== "C#"

    ```csharp
    // Get a signal definition
    var signal = DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed");
    if (signal != null)
    {
        // Get the current physical value of the signal
        double currentValue = signal.Value;
        Console.WriteLine($"Current engine speed: {currentValue} {signal.Unit}");
    }
    ```

=== "Python"

    ```python
    # Get a signal definition
    signal = DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed")
    if signal:
        # Get the current physical value of the signal
        current_value = signal.Value
        print(f"Current engine speed: {current_value} {signal.Unit}")
    ```

=== "Javascript"

    ```javascript
    // Get a signal definition
    var signal = DBC.GetDbcSignal("ECU", "EngineData", "EngineSpeed");
    if (signal) {
        // Get the current physical value of the signal
        var currentValue = signal.Value;
        console.log(`Current engine speed: ${currentValue} ${signal.Unit}`);
    }
    ```

### Important Notes

1. The component, message, and signal names are case-sensitive
2. Returns null if any of the parameters don't match definitions in the DBC file
3. The `Value` property automatically converts the raw CAN data to the physical value using the signal's factor and offset