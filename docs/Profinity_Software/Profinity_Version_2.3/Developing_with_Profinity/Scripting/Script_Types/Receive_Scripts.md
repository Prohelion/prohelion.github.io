---
title: Receive scripts
description: "Run a script each time a matching CAN packet arrives, choose which packets reach it, and keep the handler fast."
type: reference
owner: Documentation
last_reviewed: 2026-10-14
---

# Receive scripts

Receive scripts handle incoming CAN (Controller Area Network) messages in real time.
A script in Run On Receipt of CAN Message mode runs automatically when a matching CAN packet is received, and gets the packet as an argument.
This suits CAN bus monitoring, protocol implementation, and any case where an immediate response to a CAN message is needed.
The script implements a `Receive` method (C#) or a `receive` function (Python and Lua).

## Settings

Three settings decide which packets reach the script.

| Setting | Meaning |
|---------|---------|
| **Base Address** | The base CAN address of the device, entered in hexadecimal. |
| **Address Range** | The range of packet addresses the device sends, entered in hexadecimal. |
| **Milliseconds Valid** | How long traffic from the device counts as valid before the connection is assumed lost. The default is 5000, and -1 means traffic never expires. |

<figure markdown>
![The script editor for a Python Run On Receipt script, showing the Python receive template with its comments and the receive function](../../../images/python_run_on_receipt_script.png)
<figcaption>Receive Script Editor</figcaption>
</figure>

## Example

The example is the minimum implementation of a Receive script in each supported language.
It implements the `Receive` handler, reads the CAN ID of the incoming packet in hexadecimal format with `CanIdAsHex`, and writes it to the Profinity console.

=== "C#"

    ```csharp
    using System;
    using Profinity.Sdk.Models.CANBus;

    public class CSharpReceiveExample : ProfinityScript, IProfinityReceiverScript
    {
        public void Receive(CanBusPacket canPacket)
        {
            Profinity.Console.WriteLine("CSharp CanBusId Received : " + canPacket.CanIdAsHex);
        }
    }
    ```

=== "Python"

    ```python
    def receive(canPacket):
        print("Python CanPacket Id Received : " + canPacket.CanIdAsHex)
    ```

=== "Lua"

    ```lua
    function receive(canPacket)
        print('Lua CanPacket Id Received : ' .. canPacket.CanIdAsHex)
    end
    ```

## Behaviour

Receive scripts run synchronously for each matching CAN packet, which on a busy bus can mean many invocations per second.
Keep the `Receive` or `receive` handler short, because a slow handler delays other work.
Avoid blocking calls such as `time.sleep` in Python and `Thread.Sleep` in C#, and avoid long calculations, locks, and slow input or output.

The **Trigger Overlap** setting decides what happens to a packet that arrives while the handler is still running, as described under [Script settings](./index.md#script-settings).
The shipped receive templates recommend **Queue**.

Heavier processing belongs in a [Service scripts](./Service_Scripts.md), with the handler passing a small amount of data to a queue.
