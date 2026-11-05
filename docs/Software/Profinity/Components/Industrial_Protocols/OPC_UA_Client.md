---
title: OPC UA Client
description: Poll the nodes of a remote OPC UA server into Profinity tags, with a point map of NodeIds, optional user name and password, and certificate trust settings.
type: component
owner: Documentation
last_reviewed: 2026-11-02
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
    The OPC UA plugin requires the **Industrial Protocols** licensed component group, and [Install an industrial protocol plugin](Install_an_Industrial_Protocol_Plugin.md) explains how to obtain, install, and licence it.

Add the client to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md).
You can change the settings in the Settings section later from the component's **Change Settings** menu action.

Viewing the dashboard requires the **Security administration** permission, described under [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

## Quick start

1. Set **Endpoint URL** to the address of the server, starting with `opc.tcp://`.
2. Check that **Name** is unique within the profile. The default is `OPC UA Client`.
3. Add one row to the point map, with a **Name** and a **NodeId**.
4. Select **Save**.
5. On the component dashboard, check that **STATUS** shows **Connected** and **CONNECTED** is true. The tags under the component's `Points` tags show Good quality and a changing value.

## Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| **Name** | Text | `OPC UA Client` | The name of the component. Must be unique within the profile. |
| **Endpoint URL** | Text | `opc.tcp://127.0.0.1:4840` | The address of the server. Required, and must start with `opc.tcp://`. |
| **Use security** | True or false | Off | When off, the client connects without message security. Turn it on to connect to an endpoint that uses security (message signing or encryption) when the server offers one. |
| **Username** | Text | Empty | An optional user name. Leave it empty to connect anonymously. |
| **Password** | Text (encrypted) | Empty | The password for the user name. It is stored encrypted. |
| **Trust all server certificates** | True or false | Off | Skips validation of the server's certificate. Turn it on only when connecting to a trusted endpoint that uses a self-signed certificate. |
| **Poll interval (ms)** | Whole number (ms) | `1000` | How often the node map is read, in milliseconds. Between `50` and `600000`. |
| **Request timeout (ms)** | Whole number (ms) | `5000` | How long Profinity waits for the server to answer a request, in milliseconds. Between `50` and `60000`. |
| **Reconnect delay (ms)** | Whole number (ms) | `2000` | How long Profinity waits between connection attempts, in milliseconds. Between `0` and `600000`. |
| **Auto Connect** | True or false | Off | Connects to the server automatically when the profile is loaded, as described in [Connections and reconnecting](../Connections_and_Reconnecting.md#the-auto-connect-switch). |

With **Auto Connect** on, Profinity keeps trying to connect when the server is down at start and after a connection is lost, as described in [Connections and reconnecting](../Connections_and_Reconnecting.md). With **Auto Connect** off, it connects only after you switch the component on.

!!! warning "Trusting certificates"
    **Trust all server certificates** removes the check that proves you are talking to the server you intended.
    Use it only on a trusted network, and where you can, place the server's certificate in the `trusted` folder instead, as described in [OPC UA certificates](OPC_UA_Certificates.md).

## Point map

The point map lists the OPC UA nodes to read.
Each row becomes one tag.

Folders and **Browse** are described in [Industrial protocol components](Industrial_Protocol_Components.md#point-map).
Browse the server once the client is connected:

1. Select **Save**.
2. On the component dashboard, check that **STATUS** shows **Connected** and **CONNECTED** is true.
3. Select **Browse**. It lists the saved server one folder at a time, using the endpoint last saved. If the client is not connected, **Browse** shows "OPC UA client is not connected."

| Column | Type | Default | Description |
|---|---|---|---|
| **Name** | Text | Empty | The name of the tag under the component's `Points` tags. It must be unique in its folder. The same name can be used in another folder. |
| **NodeId** | Text | Empty | The identifier of the node on the server, for example `ns=2;s=Temp`. |
| **Writable** | True or false | Off | Allows Profinity to write the node from the tag. Nodes stay read-only unless you turn this on. |
| **Unit** | Text | Empty | An optional unit label for the tag. |

## Example

This example is for illustration only.
Add this list item under the existing `components:` key in the `profile.yaml` file of the profile, and replace `OPC_SERVER_HOST` with the address of your OPC UA server.

```yaml
- component:
    name: Plant OPC UA Client
    type: OpcUaClient
    endpointUrl: opc.tcp://OPC_SERVER_HOST:4840
    useSecurity: false
    pollIntervalMilliseconds: 1000
    requestTimeoutMilliseconds: 5000
    reconnectDelayMilliseconds: 2000
    autoConnect: true
    points:
      - name: Temp
        nodeId: ns=2;s=Temp
        writable: false
```

This client reads the node `ns=2;s=Temp` once a second and publishes it as the tag `Temp` under the component's `Points` tags.

## Dashboard

The component has a dashboard showing its **STATUS** and whether it is **CONNECTED** to the server.
It also shows the number of values read (**RECEIVED**) and values written (**SENT**).
The client has a **Connect / Disconnect** menu action.

Values polled by the client behave like any other tag, so they can be shown on a [dashboard](../Dashboard/Dashboard_Component.md), logged, watched by a rule, or read by a script.

## If a point shows bad quality

Each point's tag is created as soon as its row exists and shows **Unavailable** quality until the first poll reads it.
After that a successful read gives Good quality, and a node that cannot be read is marked as Bad quality.
Check the usual causes in this table before reading the [Log](../../Administration/Logs_Config.md) for the reason.

| What you see | Cause | What to do |
|---|---|---|
| A point shows Bad quality | The server does not have the **NodeId**. | Correct the point map row to a node that exists on the server. |
| **STATUS** does not show **Connected** | The **Endpoint URL** does not start with `opc.tcp://`, or cannot be reached. | Enter the server's address starting with `opc.tcp://`, and check that Profinity can reach it. |
| **STATUS** does not show **Connected** | The server certificate is in the `rejected` folder. | Move the certificate into `trusted` once you have confirmed it, as described in [OPC UA certificates](OPC_UA_Certificates.md). |

Refer to [Connections and reconnecting](../Connections_and_Reconnecting.md) for how the Log records failed reads and recovery.
