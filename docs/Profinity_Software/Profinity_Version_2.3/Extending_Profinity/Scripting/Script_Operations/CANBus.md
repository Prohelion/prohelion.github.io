---
title: CAN bus
description: "Script operations for sending, receiving, and working with CAN bus packets and data."
---

# CAN bus

The CANBus functionality in Profinity provides tools for working with CAN (Controller Area Network) bus communication. Scripts can send CAN packets and access the latest received packets, through two script variables: `Profinity.CAN`, the script's own CAN client, and `Profinity.CANBus`, the CAN bus service of the Profinity engine. For real-time packet reception, use [Receive Scripts](../Script_Types/ReceiveScripts.md) which automatically execute when matching CAN packets are received.

## Key Features

The CANBus functionality provides the following core capabilities.

- Send CAN packets to the bus
- Access the latest received CAN packets
- Query packets by CAN ID

## Usage

The following examples show how to use the CANBus functionality in scripts. Each example is shown in C# and Python, and the sending and receiving examples also have a Lua version.

### Sending CAN Packets

The following examples create a CAN packet and transmit it to the bus. A packet is created from its CAN ID and then filled using the typed data properties such as `Int32Pos0` and `Int32Pos1`, and in C# a packet can also be created directly from a byte array.

=== "C#"

    ```csharp
    // Create a packet with CAN ID 0x100 and fill it using typed properties
    var packet = new CanBusPacket(0x100)
    {
        Int32Pos0 = 100,
        Int32Pos1 = 200
    };
    bool sent = Profinity.CAN.Send(packet);

    // Or create a packet from a byte array and send it through the CAN bus service
    var bytePacket = new CanBusPacket(0x123, new byte[] { 0x01, 0x02, 0x03, 0x04 });
    int packetsSent = Profinity.CANBus.SendMessage(bytePacket);
    ```

=== "Python"

    ```python
    from Profinity.Sdk.Models.CANBus import CanBusPacket

    # Create a packet with CAN ID 0x100 and fill it using typed properties
    packet = CanBusPacket(0x100)
    packet.Int32Pos0 = 100
    packet.Int32Pos1 = 200
    sent = Profinity.CAN.Send(packet)
    ```

=== "Lua"

    ```lua
    -- Create a packet with CAN ID 0x100 and fill it using typed properties
    local packet = CanBusPacket(0x100)
    packet.Int32Pos0 = 100
    packet.Int32Pos1 = 200
    local sent = Profinity.CAN:Send(packet)
    ```

`Profinity.CAN.Send()` returns `true` when the packet was sent. `Profinity.CANBus.SendMessage()` returns the number of interfaces the packet was sent on (typically 1, but may be more if multiple CAN adapters are configured).

### Accessing Latest Received Packets

Profinity maintains a cache of the latest received CAN packets, from which a script can read the most recent packet or query packets by CAN ID. `Profinity.CAN.LatestValidPacketReceivedByID()` returns the latest packet for a CAN ID only while it is still valid (packets older than 5 seconds by default are treated as expired), and returns null (`None` in Python, `nil` in Lua) when no valid packet exists.

=== "C#"

    ```csharp
    // Get the latest valid packet for a specific CAN ID
    CanBusPacket validPacket = Profinity.CAN.LatestValidPacketReceivedByID(0x123);

    // Get the most recently received packet (any CAN ID) from the CAN bus service
    CanBusPacket latestPacket = Profinity.CANBus.LatestCanBusPacketReceived;

    // Get the latest packet for a specific CAN ID from the CAN bus service
    CanBusPacket packetById = Profinity.CANBus.LatestReceivedCanBusPacketById(0x123);

    // Or access the dictionary of latest packets keyed by CAN ID
    if (Profinity.CANBus.LatestCanBusPacketsReceived.TryGetValue(0x123, out CanBusPacket packet))
    {
        Profinity.Console.WriteLine($"Latest packet for 0x123: {packet.CanIdAsHex}");
    }
    ```

=== "Python"

    ```python
    # Get the latest valid packet for a specific CAN ID
    valid_packet = Profinity.CAN.LatestValidPacketReceivedByID(0x123)

    # Get the most recently received packet (any CAN ID) from the CAN bus service
    latest_packet = Profinity.CANBus.LatestCanBusPacketReceived

    # Get the latest packet for a specific CAN ID from the CAN bus service
    packet_by_id = Profinity.CANBus.LatestReceivedCanBusPacketById(0x123)

    if packet_by_id is not None:
        print(f"Latest packet for 0x123: {packet_by_id.CanIdAsHex}")
    ```

## Receiving CAN Packets in Real-Time

For real-time CAN packet reception, use [Receive Scripts](../Script_Types/ReceiveScripts.md). Receive scripts automatically execute when matching CAN packets are received, making them ideal for real-time monitoring and processing.

=== "C#"

    ```csharp
    using System;
    using Profinity.Sdk.Models.CANBus;

    public class MyReceiverScript : ProfinityScript, IProfinityReceiverScript
    {
        public void Receive(CanBusPacket canPacket)
        {
            Profinity.Console.WriteLine($"Received packet: {canPacket.CanIdAsHex}");
            // Process the packet in real-time
        }
    }
    ```

=== "Python"

    ```python
    def receive(canPacket):
        print(f"Received packet: {canPacket.CanIdAsHex}")
        # Process the packet in real-time
    ```

=== "Lua"

    ```lua
    function receive(canPacket)
        print('Received packet: ' .. canPacket.CanIdAsHex)
        -- Process the packet in real-time
    end
    ```

## Complete Example

The following example sends a packet and then checks for a response.

=== "C#"

    ```csharp
    using System;
    using Profinity.Sdk.Models.CANBus;

    public class CanExample : ProfinityScript, IProfinityRunnableScript
    {
        public bool Run()
        {
            // Send a request packet
            var requestPacket = new CanBusPacket(0x100, new byte[] { 0x01, 0x02 });
            int sent = Profinity.CANBus.SendMessage(requestPacket);
            Profinity.Console.WriteLine($"Sent on {sent} interface(s)");

            // Wait a bit for response
            System.Threading.Thread.Sleep(100);

            // Check for response packet
            CanBusPacket response = Profinity.CANBus.LatestReceivedCanBusPacketById(0x101);
            if (response != null)
            {
                Profinity.Console.WriteLine($"Received response: {response.CanIdAsHex}");
                return true;
            }

            Profinity.Console.WriteLine("No response received");
            return false;
        }
    }
    ```

=== "Python"

    ```python
    import time
    from Profinity.Sdk.Models.CANBus import CanBusPacket

    # Send a request packet
    request_packet = CanBusPacket(0x100)
    request_packet.BytePos0 = 0x01
    request_packet.BytePos1 = 0x02
    sent = Profinity.CANBus.SendMessage(request_packet)
    print(f"Sent on {sent} interface(s)")

    # Wait a bit for response
    time.sleep(0.1)

    # Check for response packet
    response = Profinity.CANBus.LatestReceivedCanBusPacketById(0x101)
    if response is not None:
        print(f"Received response: {response.CanIdAsHex}")
    else:
        print("No response received")
    ```

## Best Practices

The following practices apply to scripts that use the CAN bus.

1. For real-time packet reception, use Receive Scripts rather than polling `LatestCanBusPacketReceived`.
2. The `LatestCanBusPacketsReceived` dictionary only stores the most recent packet for each CAN ID - older packets are overwritten.
3. Always check for null/None/nil when accessing packet properties, as packets may not exist for a given CAN ID.
4. The `SendMessage()` return value indicates how many interfaces the packet was sent on, which is useful for debugging multi-adapter configurations.
