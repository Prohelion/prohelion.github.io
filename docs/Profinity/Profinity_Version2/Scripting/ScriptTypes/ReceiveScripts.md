---
title: Receive Scripts
---

Receive scripts are specialized scripts designed to handle incoming CAN (Controller Area Network) messages in real-time. They automatically execute when a matching CAN packet is received, making them essential for CAN bus monitoring, protocol implementation, and real-time data processing. These scripts are particularly useful in automotive and industrial applications where immediate response to CAN messages is required.

## Characteristics
- Automatic execution when matching CAN packets are received
- Implement the `Receive` method (C#) or `receive` function (JavaScript/Python)
- Can be configured to match specific CAN IDs, message types, and data patterns
- Full access to the received CAN packet data
- Can interact with other Profinity features

## Examples

The following examples demonstrate how to implement Receive scripts in each supported language. Each example shows how to handle incoming CAN packets, with a focus on accessing the CAN ID in hexadecimal format. These examples represent the minimum implementation needed for a functional Receive script.

### C Sharp
This example demonstrates a Receive script that:
- Implements the required Receive method
- Shows how to access the CAN ID in hexadecimal format
- Uses the Profinity console for output
- Handles incoming CAN packets

```csharp
using System;
using Profinity.Scripting;
using Profinity.Comms.CANBus;

public class CSharpRunTest : ProfinityScript, IProfinityReceiverScript
{
    public void Receive(CanPacket canPacket)
    {
        Profinity.Console.WriteLine("CSharp CanId Received : " + canPacket.CanIdAsHex);                
    }
}
```

### JavaScript
This example demonstrates a Receive script that:
- Implements the required receive function
- Shows how to access the CAN ID in hexadecimal format
- Uses the Profinity log function for output
- Handles incoming CAN packets

```javascript
function receive(canPacket) {
    log("Javascript CanPacket Received : " + canPacket.CanIdAsHex);    
};
```

### Python
This example demonstrates a Receive script that:
- Implements the required receive function
- Shows how to access the CAN ID in hexadecimal format
- Uses Python's print function for output
- Handles incoming CAN packets

```python
def receive(canPacket):
    print("Python CanPacket Id Received : " + canPacket.CanIdAsHex)
```