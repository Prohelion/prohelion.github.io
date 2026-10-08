---
title: Integrating to Profinity
description: "Connect other systems, applications, and AI assistants to Profinity using its REST APIs and MCP server."
---

# Integrating to Profinity

Connected equipment feeds into Profinity, which hosts web apps and scripts on top of its core platform (Tags, Collections, Rules, Alerts) behind Security, and exposes that platform through [REST APIs](./APIs/index.md) to business systems and applications, and through the [Model Context Protocol (MCP)](./MCP_Server.md) to AI agents.

<figure markdown>
![Connected equipment feeds into Profinity, which exposes its platform through APIs to business systems and through MCP to AI agents](../images/2.3-diagram-extensibility.png)
<figcaption>Profinity as the Hub of a Solution</figcaption>
</figure>

## APIs

Profinity provides RESTful interfaces to integrate with and extend its functionality. The [APIs](./APIs/index.md) are secured with Bearer tokens and use JSON, so custom applications can be built on them, or existing applications extended with them. They expose both real-time and historical data, so Profinity can be connected to other systems, to custom dashboards and to new applications built on Profinity's data.

[Swagger](https://swagger.io/) documents the available APIs and how to call them, and the OpenAPI document that tools can import is at `/swagger/v2/swagger.json`.

## MCP Server

Profinity includes an [MCP server](./MCP_Server.md), which lets AI assistants (such as [AI Chat](../Profinity_AI/AI_Chat.md)) and other MCP-aware tools query system data and metadata. The server exposes ten read-only tools for tag discovery, tag values and history, and alert state, over Streamable HTTP at `/api/v2/Ai/Mcp`, and an MCP client can use it to answer questions about live tags and alerts, to pull history into an analysis tool, or to feed a monitoring or reporting system, all with the permissions of the account it authenticates as. See [MCP Server](./MCP_Server.md) for the full list of tools, authentication requirements and usage examples.

## Other Ways to Move Data

APIs and MCP are for systems that call Profinity. Data can also be pushed out of or into a Profinity instance without a custom client: [MQTT Publisher](../Components/Publishers_and_Subscribers/MQTT_Publisher.md) and [Webhook Publisher](../Components/Publishers_and_Subscribers/Webhook_Publisher.md) components send tag values to other systems, [MQTT Subscriber](../Components/Publishers_and_Subscribers/MQTT_Subscriber.md) brings values in, and [Tag Relay](../Tags/Tag_Relay.md) shares live tags between Profinity instances, where the receiving instance needs the **Receive external tags** permission.

## Scripting vs APIs

Profinity offers two ways to extend its capabilities to meet the requirements of an application: [Scripting](../Developing_with_Profinity/Scripting/index.md) and APIs. The table below compares them.

| Scripting                                                                | APIs                                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Scripts support C#, Python and Lua                                       | Any programming language that can call REST APIs and JSON can be used          |
| Scripts are built in to Profinity and need no external frameworks or hosting | APIs are called from outside Profinity, in a custom environment, app or cloud |
| Scripts can be developed quickly to solve simple problems                | Applications can be as rich and complex as required and still use Profinity    |
| Scripts can run headless, on a schedule or triggered by CAN              | The application supplies its own logic for how it uses the API                 |
| Scripts run inside Profinity                                             | Scripted API clients run outside Profinity and can be distributed              |

## Where Next

- Compiled integrations and packaged components: [Developing with Profinity](../Developing_with_Profinity/index.md).
- Sharing live tags between Profinity instances: [Tag Relay](../Tags/Tag_Relay.md).
