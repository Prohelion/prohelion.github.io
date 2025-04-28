---
title: CAN Bus
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the documentation public.  To get access to the Profinity V2 installers, please log a support request at the [Prohelion Support Portal](https://prohelion.atlassian.net/servicedesk/customer/portals) requesting access to the Early Adopter release.

# CAN Bus

The CANClient class serves as the primary interface for CAN bus communication in Profinity applications. It provides a robust set of features for handling CAN packets, including buffering, asynchronous operations, and packet management. This section gives you a high-level understanding of what the class can do.

## Key Features

This section lists the core capabilities of the CANClient class. These features represent the main functionality you'll use when working with CAN bus communication in your applications.

- Send and receive CAN packets
- Packet buffering for specific CAN IDs
- Asynchronous packet reception
- Packet validity management
- Support for monitoring specific CAN ID ranges

## Usage

This section provides detailed examples of how to use the CANClient class in your applications. Each example is shown in C#, Python, and JavaScript to accommodate different development environments.

### Basic Operations

Basic operations cover the fundamental tasks you'll perform with the CANClient, including sending and receiving packets. These are the building blocks for more complex CAN bus communication scenarios.

#### Sending CAN Packets

Sending CAN packets is a fundamental operation. This section shows how to create and transmit CAN packets to the bus, with examples of proper packet construction and transmission handling.

=== "C#"

    ```csharp
    // Create and send a CAN packet
    var packet = new CanPacket(canId, data);
    bool success = CAN.Send(packet);
    ```

=== "Python"

    ```python
    # Create and send a CAN packet
    packet = CanPacket(canId, data)
    success = CAN.Send(packet)
    ```

=== "Javascript"

    ```javascript
    // Create and send a CAN packet
    var packet = new CanPacket(canId, data);
    var success = CAN.Send(packet);
    ```

#### Receiving CAN Packets

Receiving CAN packets can be done in several ways, depending on your application's needs. This section covers synchronous and asynchronous reception, as well as continuous packet monitoring.

##### Single Packet Reception

Single packet reception is useful when you need to receive one packet at a time, either immediately or with a timeout. This section shows how to handle these scenarios.

=== "C#"

    ```csharp
    // Receive a single packet (synchronous)
    CanPacket packet = CAN.Receive();

    // Receive a single packet with timeout (in milliseconds)
    CanPacket packet = CAN.Receive(1000); // 1 second timeout

    // Receive a single packet for specific CAN ID
    CanPacket packet = CAN.Receive(0x123); // Receive packet with ID 0x123

    // Receive a single packet for specific CAN ID with a timeout (in milliseconds)
    CanPacket packet = CAN.Receive(0x123,1000); // Receive packet with ID 0x123, 1 second timeout

    ```

=== "Python"

    ```python
    # Receive a single packet (synchronous)
    packet = CAN.Receive()

    # Receive a single packet with timeout (in milliseconds)
    packet = CAN.Receive(1000) # 1 second timeout

    # Receive a single packet for specific CAN ID
    packet = CAN.Receive(0x123) # Receive packet with ID 0x123

    # Receive a single packet for specific CAN ID with a timeout (in milliseconds)
    packet = CAN.Receive(0x123, 1000) # Receive packet with ID 0x123, 1 second timeout

    ```

=== "Javascript"

    ```javascript
    // Receive a single packet (synchronous)
    var packet = CAN.Receive();

    // Receive a single packet with timeout (in milliseconds)
    var packet = CAN.Receive(1000); // 1 second timeout

    // Receive a single packet for specific CAN ID
    var packet = CAN.Receive(0x123); // Receive packet with ID 0x123

    // Receive a single packet for specific CAN ID with a timeout (in milliseconds)
    var packet = CAN.Receive(0x123, 1000); // Receive packet with ID 0x123, 1 second timeout
    ```

##### Asynchronous Reception

Asynchronous reception allows your application to continue processing while waiting for CAN packets. This section demonstrates how to use async/await patterns for non-blocking packet reception.

=== "C#"

    ```csharp
    // Asynchronously receive a packet
    CanPacket packet = await CAN.ReceiveAsync();

    // Asynchronously receive a packet with timeout (in milliseconds)
    CanPacket packet = await CAN.ReceiveAsync(1000); // 1 second timeout

    // Asynchronously receive a packet for specific ID
    CanPacket packet = await CAN.ReceiveAsync(0x123);

    // Asynchronously receive a packet for specific ID with timeout (in milliseconds)
    CanPacket packet = await CAN.ReceiveAsync(0x123, 1000);  // Receive packet with ID 0x123, 1 second timeout
    ```

=== "Python"

    ```python
    # Asynchronously receive a packet
    packet = await CAN.ReceiveAsync()

    # Asynchronously receive a packet with timeout (in milliseconds)
    packet = await CAN.ReceiveAsync(1000) # 1 second timeout

    # Asynchronously receive a packet for specific ID
    packet = await CAN.ReceiveAsync(0x123)

    # Asynchronously receive a packet for specific ID with timeout (in milliseconds)
    packet = await CAN.ReceiveAsync(0x123, 1000) #  Receive packet with ID 0x123, 1 second timeout
    ```

=== "Javascript"

    ```javascript
    // Asynchronously receive a packet
    var packet = await CAN.ReceiveAsync();

    // Asynchronously receive a packet with timeout (in milliseconds)
    var packet = await CAN.ReceiveAsync(1000); // 1 second timeout

    // Asynchronously receive a packet for specific ID
    var packet = await CAN.ReceiveAsync(0x123);

    // Asynchronously receive a packet for specific ID with timeout (in milliseconds)
    var packet = await CAN.ReceiveAsync(0x123, 1000);  // Receive packet with ID 0x123, 1 second timeout
    ```

##### Continuous Packet Reception

Continuous packet reception is useful for monitoring the CAN bus over time. This section shows how to set up continuous reception for all packets or specific CAN IDs.

=== "C#"

    ```csharp
    // Receive all packets
    foreach (var packet in CAN.Bus())
    {
        // Process packet
    }

    // Receive all packets with timeout (in milliseconds)
    foreach (var packet in CAN.Bus(1000)) // 1 second timeout
    {
        // Process packet
    }

    // Receive packets for specific ID
    foreach (var packet in CAN.Bus(0x123))
    {
        // Process packet
    }

    // Receive packets for specific ID with timeout (in milliseconds)
    foreach (var packet in CAN.Bus(0x123, 1000)) // Receive packets with ID 0x123, 1 second timeout
    {
        // Process packet
    }
    ```

=== "Python"

    ```python
    # Receive all packets
    for packet in CAN.Bus():
        # Process packet
        pass

    # Receive all packets with timeout (in milliseconds)
    for packet in CAN.Bus(1000): # 1 second timeout
        # Process packet
        pass

    # Receive packets for specific ID
    for packet in CAN.Bus(0x123):
        # Process packet
        pass

    # Receive packets for specific ID with timeout (in milliseconds)
    for packet in CAN.Bus(0x123, 1000): # Receive packets with ID 0x123, 1 second timeout
        # Process packet
        pass
    ```

=== "Javascript"

    ```javascript
    // Receive all packets
    for (var packet of CAN.Bus()) {
        // Process packet
    }

    // Receive all packets with timeout (in milliseconds)
    for (var packet of CAN.Bus(1000)) { // 1 second timeout
        // Process packet
    }

    // Receive packets for specific ID
    for (var packet of CAN.Bus(0x123)) {
        // Process packet
    }

    // Receive packets for specific ID with timeout (in milliseconds)
    for (var packet of CAN.Bus(0x123, 1000)) { // Receive packets with ID 0x123, 1 second timeout
        // Process packet
    }
    ```

### Packet Buffering

Packet buffering is essential for handling high-frequency CAN messages or when you need to process multiple packets at once. Enabling buffering allows you to store packets for specific CAN IDs, ensuring you don't miss any messages during high-traffic periods.

=== "C#"

    ```csharp
    // Enable buffering for specific CAN ID
    CAN.BufferCANPackets(0x123);
    ```

=== "Python"

    ```python
    # Enable buffering for specific CAN ID
    CAN.BufferCANPackets(0x123)
    ```

=== "Javascript"

    ```javascript
    // Enable buffering for specific CAN ID
    CAN.BufferCANPackets(0x123);
    ```

### Disable Packet Buffering

When you no longer need to buffer packets for a specific CAN ID, you can disable buffering to free up resources.

=== "C#"

    ```csharp
    // Disable buffering for specific CAN ID
    CAN.StopBufferingCANPackets(0x123);
    ```

=== "Python"

    ```python
    # Disable buffering for specific CAN ID
    CAN.StopBufferingCANPackets(0x123)
    ```

=== "Javascript"

    ```javascript
    // Disable buffering for specific CAN ID
    CAN.StopBufferingCANPackets(0x123);
    ```

## Full Send Receive Example

This section provides complete, real-world examples showing how to use the CANClient class in typical scenarios. The examples demonstrate proper initialization, packet handling, and error checking.

=== "C#"

    ```csharp
    // Enable buffering for specific ID
    CAN.BufferCANPackets(0x123);

    // Send a packet
    var packet = new CanPacket(0x123, new byte[] { 0x01, 0x02, 0x03 });
    bool success = CAN.Send(packet);

    // Receive packets for specific ID with timeout (in milliseconds)
    foreach (var receivedPacket in CAN.Bus(0x123, 1000)) // Receive packets with ID 0x123, 1 second timeout
    {
        // Process received packet
        Console.WriteLine($"Received packet with ID: {receivedPacket.CanId}");
    }

    // Disable buffering for specific ID
    CAN.StopBufferingCANPackets(0x123);
    ```

=== "Python"

    ```python
    # Enable buffering for specific ID
    CAN.BufferCANPackets(0x123)

    # Send a packet
    packet = CanPacket(0x123, [0x01, 0x02, 0x03])
    success = CAN.Send(packet)

    # Receive packets for specific ID with timeout (in milliseconds)
    for received_packet in CAN.Bus(0x123, 1000): # Receive packets with ID 0x123, 1 second timeout
        # Process received packet
        print(f"Received packet with ID: {received_packet.CanId}")

    # Disable buffering for specific ID
    CAN.StopBufferingCANPackets(0x123)
    ```

=== "Javascript"

    ```javascript
    // Enable buffering for specific ID
    CAN.BufferCANPackets(0x123);

    // Send a packet
    var packet = new CanPacket(0x123, [0x01, 0x02, 0x03]);
    var success = CAN.Send(packet);

    // Receive packets for specific ID with timeout (in milliseconds)
    for (var receivedPacket of CAN.Bus(0x123, 1000)) { // Receive packets with ID 0x123, 1 second timeout
        // Process received packet
        console.log(`Received packet with ID: ${receivedPacket.CanId}`);
    }

    // Disable buffering for specific ID
    CAN.StopBufferingCANPackets(0x123);
    ```

## Best Practices

Following these best practices will help you create robust and efficient CAN bus applications. This section provides guidelines for proper usage and common pitfalls to avoid.

1. Use appropriate timeouts when receiving packets to prevent indefinite blocking.
2. Consider using the buffering feature when dealing with high-frequency CAN messages.
3. For critical applications, implement proper error handling around packet transmission and reception.
4. When working with specific CAN IDs, use the ID-specific methods for better performance and reliability.