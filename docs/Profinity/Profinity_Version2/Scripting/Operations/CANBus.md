---
title: CAN Bus
---

This documentation provides a comprehensive guide to using the CANClient class for CAN bus communication in Profinity applications. It covers all major functionality, including sending and receiving packets, buffering, and configuration options, with examples in C#, IronPython, and JavaScript.

## Overview

The CANClient class serves as the primary interface for CAN bus communication in Profinity applications. It provides a robust set of features for handling CAN packets, including buffering, asynchronous operations, and packet management. This section gives you a high-level understanding of what the class can do.

## Key Features

This section lists the core capabilities of the CANClient class. These features represent the main functionality you'll use when working with CAN bus communication in your applications.

- Send and receive CAN packets
- Packet buffering for specific CAN IDs
- Asynchronous packet reception
- Packet validity management
- Support for monitoring specific CAN ID ranges

## Usage

This section provides detailed examples of how to use the CANClient class in your applications. Each example is shown in C#, IronPython, and JavaScript to accommodate different development environments.

### Basic Operations

Basic operations cover the fundamental tasks you'll perform with the CANClient, including sending and receiving packets. These are the building blocks for more complex CAN bus communication scenarios.

#### Sending CAN Packets

Sending CAN packets is a fundamental operation. This section shows how to create and transmit CAN packets to the bus, with examples of proper packet construction and transmission handling.

___C# Example___

```csharp
// Create and send a CAN packet
var packet = new CanPacket(canId, data);
bool success = CAN.Send(packet);
```

___Python Example___

```python
# Create and send a CAN packet
packet = CanPacket(canId, data)
success = CAN.Send(packet)
```

___JavaScript Example___

```javascript
// Create and send a CAN packet
var packet = new CanPacket(canId, data);
var success = CAN.Send(packet);
```

#### Receiving CAN Packets

Receiving CAN packets can be done in several ways, depending on your application's needs. This section covers synchronous and asynchronous reception, as well as continuous packet monitoring.

##### Single Packet Reception

Single packet reception is useful when you need to receive one packet at a time, either immediately or with a timeout. This section shows how to handle these scenarios.

___C# Example___

```csharp
// Receive a single packet (synchronous)
CanPacket packet = CAN.Receive();

// Receive a single packet with timeout (in milliseconds)
CanPacket packet = CAN.Receive(1000); // 1 second timeout

// Receive a single packet for specific CAN ID
CanPacket packet = CAN.Receive(0x123); // Receive packet with ID 0x123
```

___Python Example___


```python
# Receive a single packet (synchronous)
packet = CAN.Receive()

# Receive a single packet with timeout (in milliseconds)
packet = CAN.Receive(1000) # 1 second timeout

# Receive a single packet for specific CAN ID
packet = CAN.Receive(0x123) # Receive packet with ID 0x123
```

___JavaScript Example___

```javascript
// Receive a single packet (synchronous)
var packet = CAN.Receive();

// Receive a single packet with timeout (in milliseconds)
var packet = CAN.Receive(1000); // 1 second timeout

// Receive a single packet for specific CAN ID
var packet = CAN.Receive(0x123); // Receive packet with ID 0x123
```

##### Asynchronous Reception

Asynchronous reception allows your application to continue processing while waiting for CAN packets. This section demonstrates how to use async/await patterns for non-blocking packet reception.

___C# Example___

```csharp
// Asynchronously receive a packet
CanPacket packet = await CAN.ReceiveAsync();

// Asynchronously receive a packet for specific ID
CanPacket packet = await CAN.ReceiveAsync(0x123);
```

___Python Example___

```python
# Asynchronously receive a packet
packet = await CAN.ReceiveAsync()

# Asynchronously receive a packet for specific ID
packet = await CAN.ReceiveAsync(0x123)
```

___JavaScript Example___

```javascript
// Asynchronously receive a packet
var packet = await CAN.ReceiveAsync();

// Asynchronously receive a packet for specific ID
var packet = await CAN.ReceiveAsync(0x123);
```

##### Continuous Packet Reception

Continuous packet reception is useful for monitoring the CAN bus over time. This section shows how to set up continuous reception for all packets or specific CAN IDs.

___C# Example___

```csharp
// Receive all packets
foreach (var packet in CAN.CANPackets())
{
    // Process packet
}

// Receive packets for specific ID
foreach (var packet in CAN.CANPackets(0x123))
{
    // Process packet
}
```

___Python Example___

```python
# Receive all packets
for packet in CAN.CANPackets():
    # Process packet
    pass

# Receive packets for specific ID
for packet in CAN.CANPackets(0x123):
    # Process packet
    pass
```

___JavaScript Example___

```javascript
// Receive all packets
for (var packet of CAN.CANPackets()) {
    // Process packet
}

// Receive packets for specific ID
for (var packet of CAN.CANPackets(0x123)) {
    // Process packet
}
```

### Packet Buffering

Packet buffering is essential for handling high-frequency CAN messages or when you need to process multiple packets at once. This section explains how to enable and manage packet buffering.  Enabling buffering allows you to store packets for specific CAN IDs, ensuring you don't miss any messages during high-traffic periods.

___C# Example___

```csharp
// Enable buffering for specific CAN ID
CAN.BufferCANPackets(0x123);
```

___Python Example___

```python
# Enable buffering for specific CAN ID
CAN.BufferCANPackets(0x123)
```

___JavaScript Example___

```javascript
// Enable buffering for specific CAN ID
CAN.BufferCANPackets(0x123);
```

### Disable Packet Buffering

When you no longer need to buffer packets for a specific CAN ID, you can disable buffering to free up resources.

___C# Example___

```csharp
// Disable buffering for specific CAN ID
CAN.StopBufferingCANPackets(0x123);
```

```python
# Disable buffering for specific CAN ID
CAN.StopBufferingCANPackets(0x123)
```

___JavaScript Example___

```javascript
// Disable buffering for specific CAN ID
CAN.StopBufferingCANPackets(0x123);
```

## Important Notes

This section highlights critical information you should be aware of when using the CANClient class. These notes cover thread safety, packet validity, monitoring ranges, and resource management considerations.

1. **Thread Safety**: The class is designed to be thread-safe and can be used in multi-threaded environments.

2. **Packet Validity**: Packets have a configurable validity period. By default, packets are considered valid for 5000 milliseconds (5 seconds).

3. **Monitoring Range**: The class automatically adjusts its monitoring range based on the CAN IDs you're working with.

4. **Error Handling**: Always check the return value of the `Send` method to ensure the packet was transmitted successfully.

5. **Resource Management**: When using `CANPackets()` enumerable, be aware that it will continue to receive packets until explicitly stopped or a timeout occurs.

## Best Practices

Following these best practices will help you create robust and efficient CAN bus applications. This section provides guidelines for proper usage and common pitfalls to avoid.

1. Use appropriate timeouts when receiving packets to prevent indefinite blocking.

2. Consider using the buffering feature when dealing with high-frequency CAN messages.

3. For critical applications, implement proper error handling around packet transmission and reception.

4. When working with specific CAN IDs, use the ID-specific methods for better performance and reliability.


## More Complex Examples

This section provides complete, real-world examples showing how to use the CANClient class in typical scenarios. The examples demonstrate proper initialization, packet handling, and error checking.

___C# Example___

```csharp
// Enable buffering for specific ID
CAN.BufferCANPackets(0x123);

// Send a packet
var packet = new CanPacket(0x123, new byte[] { 0x01, 0x02, 0x03 });
bool success = CAN.Send(packet);

// Receive packets for specific ID
foreach (var receivedPacket in CAN.CANPackets(0x123))
{
    // Process received packet
    Console.WriteLine($"Received packet with ID: {receivedPacket.CanId}");
}
```

___Python Example___

```python
# Enable buffering for specific ID
CAN.BufferCANPackets(0x123)

# Send a packet
packet = CanPacket(0x123, [0x01, 0x02, 0x03])
success = CAN.Send(packet)

# Receive packets for specific ID
for received_packet in CAN.CANPackets(0x123):
    # Process received packet
    print(f"Received packet with ID: {received_packet.CanId}")
```

___JavaScript Example___

```javascript
// Enable buffering for specific ID
CAN.BufferCANPackets(0x123);

// Send a packet
var packet = new CanPacket(0x123, [0x01, 0x02, 0x03]);
var success = CAN.Send(packet);

// Receive packets for specific ID
for (var receivedPacket of CAN.CANPackets(0x123)) {
    // Process received packet
    console.log(`Received packet with ID: ${receivedPacket.CanId}`);
}
```


