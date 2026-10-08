---
title: Receive Scripts
description: "Scripts that automatically execute when matching CAN bus packets are received."
---

# Receive Scripts

Receive scripts handle incoming CAN (Controller Area Network) messages in real time. A script in Run On Receipt of CAN Message mode runs automatically when a matching CAN packet is received, and gets the packet as an argument, which suits CAN bus monitoring, protocol implementation and any case where an immediate response to a CAN message is needed. The script implements a `Receive` method (C#) or a `receive` function (Python and Lua).

## Choosing Which Packets Arrive

Three settings decide which packets reach the script. **Base Address** is the base CAN address of the device and **Address Range** is the range of packet addresses the device sends, and both are entered in hexadecimal. **Milliseconds Valid** is how long traffic from the device counts as valid before the connection is assumed lost, with a default of 5000 and a range of 0 to 60000.

## Performance

Receive scripts run synchronously for each matching CAN packet, which on a busy bus can mean many invocations per second. The `Receive` or `receive` handler should stay short and avoid blocking calls such as `time.sleep` in Python, `Thread.Sleep` in C#, long calculations, locks and slow input or output, because a slow handler delays other work. The **Trigger Overlap** setting decides what happens to a packet that arrives while the handler is still running: **Drop** (the default) discards the packet, and **Queue** keeps a short backlog of up to **Queue Depth** packets (a default of 8, from 1 to 100) and runs them afterwards, which is the setting the shipped receive templates recommend. Heavier processing belongs in a [Service Script](ServiceScripts.md), with the handler passing a small amount of data to a queue.

<figure markdown>
![Receive script configuration](../../../images/python_run_on_receipt_script.png)
<figcaption>Receive Script Editor and CAN Packet Trigger Configuration</figcaption>
</figure>

## Examples

The example is the minimum implementation of a Receive script in each supported language. It implements the `Receive` handler, reads the CAN ID of the incoming packet in hexadecimal format with `CanIdAsHex`, and writes it to the Profinity console.

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
