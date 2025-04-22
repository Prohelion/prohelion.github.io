---
title: Run Scripts
---

Run scripts are the most flexible and commonly used script type in Profinity. They can be executed either manually by users or automatically on a schedule, making them ideal for a wide range of automation tasks. These scripts are perfect for operations that need to be performed either on-demand or if scheduled at specific intervals, such as data collection, testing, or system configuration tasks.

## Characteristics
- Can be executed manually or on a schedule
- Can interact with CAN bus, DBC files, and state management
- Support for console output
- Can be used for testing, data collection, and automation
- Support for cancellation handling

## Examples

The following examples demonstrate how to implement each script type in the supported programming languages. Each example shows the basic structure and key features of the script type, including proper initialization, execution flow, and cleanup. Note that while the examples are simple, they illustrate the essential patterns needed for each script type.

This example demonstrates a Run script that:

- Prints messages to the console
- Implements a loop that continues until the script is cancelled
- Shows how to handle script cancellation
- Demonstrates proper cleanup when the script ends

=== "C#"

    ```csharp
    using System;
    using Profinity.Scripting;
    using System.Threading;

    public class CSharpCancelTest : ProfinityScript, IProfinityRunnableScript
    {
        public bool Run()
        {
            System.Console.WriteLine("This is a CSharp Message!");
            System.Console.WriteLine("Now sleeping");

            while (!Profinity.ScriptCancelled)
            {
                Thread.Sleep(100);
                System.Console.WriteLine("State " + Profinity.ScriptCancelled);
            }

            System.Console.WriteLine(Profinity.Message);
            return true;
        }
    }
    ```

=== "Javascript"

    ```javascript
    function sleepFor(sleepDuration) {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepDuration) {
            /* Do nothing */
        }
    }

    function loop() {
        log('This is a loop!');
        while (!Profinity.ScriptCancelled)
        {
            log('About to Javascript sleep');
            sleepFor(1000);
            log('Finished the sleep');
        }    
    };

    loop();
    log('Exiting Program');
    ```

=== "Python"

    ```python
    import time

    def Loop():
        print('This is a Python loop!')
        while not (Profinity.ScriptCancelled):
            print('About to sleep')
            time.sleep(1)
            print('Finished Sleeping')

    Loop()
    print('Exiting the Program')
    ```