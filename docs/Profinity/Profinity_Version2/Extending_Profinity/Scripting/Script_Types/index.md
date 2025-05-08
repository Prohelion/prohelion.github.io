---
title: Script Types
---

!!! tip "Profinity V2 IS NOW IN EARLY ADOPTER RELEASE"
    Profinity V2 is available now in Early Adopter Release.  To support this release we are making the product available to our Early Adopter Community.  If you have any issues or feedback please report it via our support portal or via the Feedback form in the Profinity Admin menu.

# Script Types in Profinity

Profinity supports three basic types of scripts, each with specific use cases and execution contexts. This document explains the differences between these script types and when to use each one. Understanding these script types is crucial for developing effective automation and monitoring solutions in Profinity.

| Script Type                                   | Description| Best For                                                                                            | Not Recommended For        |
|-----------------------------------------------|-|-----------------------------------------------------------------------------------------------------|----------------------------|
| [Run](./RunScripts.md)            | A Run Script, can simply be run by the operator, or scheduled to be run on a regular basis.  They are typically used do jobs that are short, sharp and don't require a lot of state management | - One-time operations<br>- Manual tasks<br>- Testing<br>- Troubleshooting<br>- Scheduled tasks      | - Continuous monitoring<br>- Real-time responses |
| [Receive](./ReceiveScripts.md)    | Receive Scripts are scripts that can be setup to run each time a particular CAN Packet is received.  They are generally used to respond to the receipt of a packet with a reply message | - CAN message processing<br>- Real-time data handling<br>- Protocol implementation                  | - Long-running operations<br>- System configuration<br>- Manual tasks |
| [Service](./ServiceScripts.md)    | Service Scripts implement full lifecycle management and generally are designed for tasks that need to run for a long time | - Continuous monitoring<br>- Long-running tasks<br>- Critical services<br>- System-level operations |  - Quick responses<br>- One-time operations<br>- Manual tasks |

## Best Practices

!!! Info "Important Please Remember that"
    When you are using Profinity scripting you are adding functionality to the core of Profinity itself.  If you write inefficient code, leak memory or resources or just do some thing silly, that code is running inside Profinity.  Think about your code and if you see negative impacts on Profinity when your scripts are run, review your code.

Best Practice for Profinity Scripting, include:

___Choose the Right Type of Script Execution___

- Use Run scripts for manual or scheduled operations
- Use Receive scripts for CAN message processing
- Use service scripts for critical, long-running operations

___Be Efficient with Resource Management___

- Keep scripts efficient
- Monitor resource usage
- Clean up resources when scripts end
- Consider system load when scheduling tasks
- Implement proper service recovery mechanisms

___Use Error Handling___

- Implement proper error handling
- Log errors appropriately to the Profinity Logs
- Handle timeouts and resource limits
- Consider retry mechanisms for scheduled tasks
- Implement service health monitoring

___Use State Management With Required___

- Use appropriate state scope (State vs GlobalState)
- Clean up state when no longer needed
- Handle state conflicts in service scripts
- Consider state persistence for scheduled tasks
- Implement proper service state management