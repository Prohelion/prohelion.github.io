---
title: CAN Bus
description: "Script operations for sending, receiving, and working with CAN bus packets and data."
---

# CAN Bus

The CAN bus operations let a script work with Controller Area Network (CAN) traffic: send CAN packets, read the latest received packets, and look packets up by CAN ID. They are reached through two script variables. `Profinity.CAN` is the script's own CAN client, which suits waiting for and buffering the packets one script cares about, and `Profinity.CANBus` is the shared cache of the latest packet for every CAN ID that the Profinity engine has seen. For real-time packet reception, [Receive Scripts](../Script_Types/ReceiveScripts.md) run automatically when matching CAN packets are received.

## Usage

The examples below show the CAN bus operations in C#, Python and Lua.

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

`Profinity.CAN.Send()` returns `true` when the packet was sent. `Profinity.CANBus.SendMessage()` returns the number of interfaces the packet was sent on (one for each CAN adapter the packet went out on, so more than one when several CAN adapters are configured).

### Accessing Latest Received Packets

Profinity maintains a cache of the latest received CAN packets, from which a script can read the most recent packet or query packets by CAN ID. `Profinity.CAN.LatestValidPacketReceivedByID()` returns the latest packet for a CAN ID only while it is still valid (a packet is expired once it is older than the script's **Milliseconds Valid** setting, which defaults to 5000 and accepts 0 to 60000, where 0 means packets never expire). **Milliseconds Valid** is shown only in Run On Receipt of CAN Message mode, and returns null (`None` in Python, `nil` in Lua) when no valid packet exists.

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

=== "Lua"

    ```lua
    -- Get the latest valid packet for a specific CAN ID
    local validPacket = Profinity.CAN:LatestValidPacketReceivedByID(0x123)

    -- Get the most recently received packet (any CAN ID) from the CAN bus service
    local latestPacket = Profinity.CANBus.LatestCanBusPacketReceived

    -- Get the latest packet for a specific CAN ID from the CAN bus service
    local packetById = Profinity.CANBus:LatestReceivedCanBusPacketById(0x123)

    if packetById ~= nil then
        print('Latest packet for 0x123: ' .. packetById.CanIdAsHex)
    end
    ```

## Receiving CAN Packets in Real-Time

For real-time CAN packet reception, use [Receive Scripts](../Script_Types/ReceiveScripts.md). Receive scripts automatically execute when matching CAN packets are received, which suits real-time monitoring and processing.

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

=== "Lua"

    ```lua
    -- Send a request packet
    local requestPacket = CanBusPacket(0x100)
    requestPacket.BytePos0 = 0x01
    requestPacket.BytePos1 = 0x02
    local sent = Profinity.CANBus:SendMessage(requestPacket)
    print('Sent on ' .. tostring(sent) .. ' interface(s)')

    -- Wait a bit for response
    sleep(0.1)

    -- Check for response packet
    local response = Profinity.CANBus:LatestReceivedCanBusPacketById(0x101)
    if response ~= nil then
        print('Received response: ' .. response.CanIdAsHex)
    else
        print('No response received')
    end
    ```

## Notes on Receiving and Sending

Receive Scripts are the better choice for real-time packet reception than polling `LatestCanBusPacketReceived`. The `LatestCanBusPacketsReceived` dictionary stores only the most recent packet for each CAN ID, so an older packet is overwritten by a newer one. A script should check for null, `None` or `nil` before it reads packet properties, because no packet may exist for a given CAN ID. The `SendMessage()` return value is the number of interfaces the packet was sent on, which helps when debugging a multi-adapter configuration.
