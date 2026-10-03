---
title: CAN bus
---

# CAN bus

The CANBus functionality in Profinity provides tools for working with CAN (Controller Area Network) bus communication. Scripts can send CAN packets and access the latest received packets. For real-time packet reception, use [Receive Scripts](../Script_Types/ReceiveScripts.md) which automatically execute when matching CAN packets are received.

## Key Features

This section lists the core capabilities of the CANBus functionality. These features represent the main functionality you'll use when working with CAN bus communication in your scripts.

- Send CAN packets to the bus
- Access the latest received CAN packets
- Inject CAN packets for testing (simulates receiving a packet)
- Query packets by CAN ID

## Usage

This section provides detailed examples of how to use the CANBus functionality in your scripts. Each example is shown in C# and Python to accommodate different development environments.

### Sending CAN Packets

Sending CAN packets is a fundamental operation. This section shows how to create and transmit CAN packets to the bus.

=== "C#"

    ```csharp
    using Profinity.Comms.CANBus;

    // Create and send a CAN packet
    var packet = new CanPacket(0x123, new byte[] { 0x01, 0x02, 0x03, 0x04 });
    int packetsSent = Profinity.CANBus.SendMessage(packet);
    ```

=== "Python"

    ```python
    from Profinity.Comms.CANBus import CanPacket

    # Create and send a CAN packet
    packet = CanPacket(0x123, [0x01, 0x02, 0x03, 0x04])
    packets_sent = Profinity.CANBus.SendMessage(packet)
    ```

The `SendMessage()` method returns the number of interfaces the packet was sent on (typically 1, but may be more if multiple CAN adapters are configured).

### Accessing Latest Received Packets

Profinity maintains a cache of the latest received CAN packets. You can access the most recent packet or query packets by CAN ID.

=== "C#"

    ```csharp
    using Profinity.Comms.CANBus;

    // Get the most recently received packet (any CAN ID)
    CanPacket latestPacket = Profinity.CANBus.LatestCanPacketReceived;

    // Get the latest packet for a specific CAN ID
    CanPacket packetById = Profinity.CANBus.LatestReceivedCanPacketById(0x123);

    // Or access via the dictionary
    if (Profinity.CANBus.LatestCanPacketsReceived.TryGetValue(0x123, out CanPacket packet))
    {
        Profinity.Console.WriteLine($"Latest packet for 0x123: {packet.CanIdAsHex}");
    }
    ```

=== "Python"

    ```python
    from Profinity.Comms.CANBus import CanPacket

    # Get the most recently received packet (any CAN ID)
    latest_packet = Profinity.CANBus.LatestCanPacketReceived

    # Get the latest packet for a specific CAN ID
    packet_by_id = Profinity.CANBus.LatestReceivedCanPacketById(0x123)

    # Or access via the dictionary
    if 0x123 in Profinity.CANBus.LatestCanPacketsReceived:
        packet = Profinity.CANBus.LatestCanPacketsReceived[0x123]
        print(f"Latest packet for 0x123: {packet.CanIdAsHex}")
    ```

### Injecting Packets for Testing

For testing purposes, you can inject CAN packets into the system as if they were received from the bus. This is useful for testing scripts without requiring actual CAN hardware.

=== "C#"

    ```csharp
    using Profinity.Comms.CANBus;

    // Create a test packet
    var testPacket = new CanPacket(0x123, new byte[] { 0x01, 0x02, 0x03 });
    
    // Inject it as if it was received
    Profinity.CANBus.InjectReceivedCanPacket(testPacket);
    ```

=== "Python"

    ```python
    from Profinity.Comms.CANBus import CanPacket

    # Create a test packet
    test_packet = CanPacket(0x123, [0x01, 0x02, 0x03])
    
    # Inject it as if it was received
    Profinity.CANBus.InjectReceivedCanPacket(test_packet)
    ```

## Receiving CAN Packets in Real-Time

For real-time CAN packet reception, use [Receive Scripts](../Script_Types/ReceiveScripts.md). Receive scripts automatically execute when matching CAN packets are received, making them ideal for real-time monitoring and processing.

=== "C#"

    ```csharp
    using System;
    using Profinity.Scripting;
    using Profinity.Comms.CANBus;

    public class MyReceiverScript : ProfinityScript, IProfinityReceiverScript
    {
        public void Receive(CanPacket canPacket)
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

## Complete Example

This section provides a complete example showing how to send a packet and then check for a response.

=== "C#"

    ```csharp
    using System;
    using Profinity.Scripting;
    using Profinity.Comms.CANBus;

    public class CanExample : ProfinityScript, IProfinityRunnableScript
    {
        public bool Run()
        {
            // Send a request packet
            var requestPacket = new CanPacket(0x100, new byte[] { 0x01, 0x02 });
            int sent = Profinity.CANBus.SendMessage(requestPacket);
            Profinity.Console.WriteLine($"Sent {sent} packet(s)");

            // Wait a bit for response
            System.Threading.Thread.Sleep(100);

            // Check for response packet
            CanPacket response = Profinity.CANBus.LatestReceivedCanPacketById(0x101);
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
    from Profinity.Comms.CANBus import CanPacket

    # Send a request packet
    request_packet = CanPacket(0x100, [0x01, 0x02])
    sent = Profinity.CANBus.SendMessage(request_packet)
    print(f"Sent {sent} packet(s)")

    # Wait a bit for response
    time.sleep(0.1)

    # Check for response packet
    response = Profinity.CANBus.LatestReceivedCanPacketById(0x101)
    if response:
        print(f"Received response: {response.CanIdAsHex}")
    else:
        print("No response received")
    ```

## Best Practices

Following these best practices will help you create robust and efficient CAN bus applications.

1. For real-time packet reception, use Receive Scripts rather than polling `LatestCanPacketReceived`.
2. The `LatestCanPacketsReceived` dictionary only stores the most recent packet for each CAN ID - older packets are overwritten.
3. Use `InjectReceivedCanPacket()` only for testing - it simulates receiving a packet without actual CAN hardware.
4. Always check for null/None when accessing packet properties, as packets may not exist for a given CAN ID.
5. The `SendMessage()` return value indicates how many interfaces the packet was sent on, which is useful for debugging multi-adapter configurations.
