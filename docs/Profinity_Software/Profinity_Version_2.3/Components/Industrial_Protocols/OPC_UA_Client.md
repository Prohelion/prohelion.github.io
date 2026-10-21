---
title: OPC UA Client
description: Poll the nodes of a remote OPC UA server into Profinity tags, with a point map of NodeIds, optional user name and password, and certificate trust settings.
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# OPC UA Client

The **OPC UA Client** connects to a remote Open Platform Communications Unified Architecture (OPC UA) server and polls the nodes you list into Profinity tags.
Use it to bring values from a programmable logic controller (PLC), a supervisory control and data acquisition (SCADA) system or another OPC UA server into Profinity.
Add one client for each server you want to read.
The OPC UA plugin also provides the [OPC UA Server](OPC_UA_Server.md), and the two components can be used on their own or together.

For a Siemens S7-1200 or S7-1500, the OPC UA Client against the PLC's built-in OPC UA server lets you read symbolic tags by name, which the [S7](S7.md) component cannot do.

<figure markdown>
```mermaid
flowchart LR
    Source["Remote OPC UA server"] --> Client["OPC UA Client"] --> Tags
```
<figcaption>The OPC UA Client polls nodes from a remote OPC UA server into Profinity tags</figcaption>
</figure>

!!! info "Licence required"
    The OPC UA plugin requires the **Industrial Protocols** licensed component group, and [Industrial protocols](index.md) explains how to obtain, install, and licence it.

Add the client to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md).
You can change the settings in the Settings section later from the component's **Change Settings** menu action.

## Settings

| Setting | Description |
|---|---|
| **Name** | The name of the component. Must be unique within the profile. |
| **Endpoint URL** | The address of the server. Required, and must start with `opc.tcp://`. The default is `opc.tcp://127.0.0.1:4840`. |
| **Use security** | When off (the default), the client connects without message security. Turn it on to connect to an endpoint that uses security (message signing or encryption) when the server offers one. |
| **Username** | An optional user name. Leave it empty to connect anonymously. |
| **Password** | The password for the user name. It is stored encrypted. |
| **Trust all server certificates** | Skips validation of the server's certificate. Off by default. Turn it on only when connecting to a trusted endpoint that uses a self-signed certificate. |
| **Poll interval (ms)** | How often the node map is read, in milliseconds. Between `50` and `600000`. The default is `1000`. |
| **Request timeout (ms)** | How long Profinity waits for the server to answer a request, in milliseconds. Between `50` and `60000`. The default is `5000`. |
| **Reconnect delay (ms)** | How long Profinity waits between connection attempts, in milliseconds. Between `0` and `600000`. The default is `2000`. |
| **Auto Connect** | Connects to the server automatically when the profile is loaded. Off by default, as described in [Connections and reconnecting](../Connections_and_Reconnecting.md#the-auto-connect-switch). |

Profinity keeps trying to connect when the server is down at start and after a connection is lost, as described in [Connections and reconnecting](../Connections_and_Reconnecting.md).

!!! warning "Trusting certificates"
    **Trust all server certificates** removes the check that proves you are talking to the server you intended.
    Use it only on a trusted network, and where you can, place the server's certificate in the `trusted` folder instead, as described in [OPC UA certificates](OPC_UA_Certificates.md).

## Point map

The point map lists the OPC UA nodes to read.
Each row becomes one tag.

| Column | Description |
|---|---|
| **Name** | The name of the tag, published under the component's `Points` tags. Use a unique name for each row. |
| **NodeId** | The identifier of the node on the server, for example `ns=2;s=Temp`. |
| **Writable** | Allows Profinity to write the node from the tag. Off by default, so every node is read-only unless you turn this on. |
| **Unit** | An optional unit label for the tag. |

## Dashboard

The component has a dashboard showing its **STATUS** and whether it is **CONNECTED** to the server.
It also shows the number of values read (**RECEIVED**) and values written (**SENT**).
The client has a **Connect / Disconnect** menu action.
Viewing the dashboard requires the **Security administration** permission, described under [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

Values polled by the client behave like any other tag, so they can be shown on a [dashboard](../Dashboard/Dashboard_Component.md), logged, watched by a rule, or read by a script.

To check that the client works, look for the status **Connected**, **CONNECTED** true, and tags under the component's `Points` tags with Good quality and a changing value.

## If a point shows bad quality

Each point's tag is created as soon as its row exists and shows **Unavailable** quality until the first poll reads it.
After that a successful read gives Good quality, and a node that cannot be read is marked as Bad quality.
The usual causes are:

- A **NodeId** that the server does not have.
- An **Endpoint URL** that does not start with `opc.tcp://` or cannot be reached.
- A server certificate in the `rejected` folder.

Check these before reading the [Log](../../Administration/Logs_Config.md) for the reason.
Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md) for how the Log records failed reads and recovery.
To move a refused certificate into `trusted`, refer to [OPC UA certificates](OPC_UA_Certificates.md).
