---
title: OPC UA
description: "Configure the OPC UA Client to poll NodeIds into Profinity tags, and the OPC UA Server to expose Profinity's tag tree as a read-only address space."
---

# OPC UA

The Open Platform Communications Unified Architecture (OPC UA) plugin provides two components, which can be used on their own or together. This page describes the **OPC UA Client** first and the **OPC UA Server** second, and the Certificates and Dashboard sections at the end apply to both.

| Component | Role |
|---|---|
| **OPC UA Client** | Connects to a remote OPC UA server and polls the nodes you list into Profinity tags. |
| **OPC UA Server** | Listens for OPC UA clients and exposes this profile's tag tree to them as a read-only address space. |

!!! info "Licence Required"
    The OPC UA plugin is not part of the standard installation. Prohelion supplies it on request, you install it like any other [DLL plugin](../../Administration/Components_and_Plugins.md), and it requires the **Industrial Protocols** licensed component group, an add-on to your edition. See [Licensing](../../Administration/Licensing.md), or [Industrial Protocols](index.md) for an overview.

Both components are added to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [Adding Components to Your Profile](../../Getting_Started/Adding_New_Components.md). The settings below can be changed later from the component's **Change Settings** menu action.

## OPC UA Client

Use the client to bring values from a programmable logic controller (PLC), a supervisory control and data acquisition (SCADA) system or another OPC UA server into Profinity. Add one client for each server you want to read.

!!! tip "Read Symbolic S7 Tags with the OPC UA Client"
    For a Siemens S7-1200 or S7-1500, the OPC UA Client against the PLC's built-in OPC UA server lets you read symbolic tags by name, which the [S7](S7.md) component cannot do.

### Client Settings

| Setting | Description |
|---|---|
| **Name** | The name of the component. Must be unique within the profile. |
| **Endpoint URL** | The address of the server. Required, and must start with `opc.tcp://`. The default is `opc.tcp://127.0.0.1:4840`. |
| **Use security** | When off (the default), the client connects without message security. Turn it on to connect to a secured endpoint that the server offers. |
| **Username** | An optional user name. Leave it empty to connect anonymously. |
| **Password** | The password for the user name. It is stored encrypted. |
| **Trust all server certificates** | Skips validation of the server's certificate. Off by default. Turn it on only when connecting to a trusted endpoint that uses a self-signed certificate. |
| **Poll interval (ms)** | How often the node map is read, in milliseconds. Between `50` and `600000`. The default is `1000`. |
| **Request timeout (ms)** | How long Profinity waits for the server to answer a request, in milliseconds. Between `50` and `60000`. The default is `5000`. |
| **Reconnect delay (ms)** | How long Profinity waits between connection attempts, in milliseconds. Profinity keeps trying when the device is down at start and after a connection is lost. Between `0` and `600000`. The default is `2000`. |
| **Auto Connect** | Connects to the server automatically when the profile is loaded. Off by default. |

### Point Map

The point map lists the OPC UA nodes to read. Each row becomes one tag.

| Column | Description |
|---|---|
| **Name** | The name of the tag, published under the component's `Points` tags. Use a unique name for each row. |
| **NodeId** | The OPC UA NodeId of the node, for example `ns=2;s=Temp`. |
| **Writable** | Allows Profinity to write the node from the tag. Off by default, so every node is read-only unless you turn this on. |
| **Unit** | An optional unit label for the tag. |

!!! warning "Trusting Certificates"
    **Trust all server certificates** removes the check that proves you are talking to the server you intended. Use it only on a trusted network, and where you can, place the server's certificate in the `trusted` folder instead, as described under Certificates.

## OPC UA Server

Use the server to let third-party OPC UA clients, such as a SCADA or historian system, read the live values held in this Profinity profile.

### Server Settings

| Setting | Description |
|---|---|
| **Name** | The name of the component. Must be unique within the profile. |
| **Bind URL** | The endpoint address that the server listens on, and the address clients connect to. Required, and must start with `opc.tcp://`. The default is `opc.tcp://0.0.0.0:4840/Profinity`. |
| **Auto Connect** | Starts the server automatically when the profile is loaded. Off by default. |
| **Trust all client certificates** | Skips validation of connecting clients' certificates. Off by default. Turn it on only on a trusted network. |

### What the Server Exposes

The server publishes the readable scalar values in the profile's tag tree. Each tag appears as a node with the NodeId `ns=2;s=` followed by the tag's full tag ID, which is the tag's [tag tree path](../../Tags/Tag_Tree_Path.md). Clients cannot write to the address space, so the server cannot be used to change values in Profinity. The server accepts anonymous connections without message security only.

### Listening Address

With the default **Bind URL**, the server listens on `localhost` only, because Profinity replaces a host of `0.0.0.0` with `localhost` when it starts the server. Clients on other machines cannot connect with the default. To accept remote clients, replace `0.0.0.0` in the **Bind URL** with the IP address or host name of the Profinity machine that those clients can reach, for example `opc.tcp://192.168.1.20:4840/Profinity`.

## Certificates

Both components keep their OPC UA application certificates in the `opcua_pki` folder inside the Profinity data folder of the account that runs Profinity, in the `own`, `trusted`, `issuer` and `rejected` sub-folders. On Windows the folder is `%LocalAppData%\Prohelion\Profinity\opcua_pki`, and on Linux it is `~/.local/share/Prohelion/Profinity/opcua_pki`. To trust a certificate explicitly, rather than trusting all, place it in `trusted`. Certificates that are refused are placed in `rejected`, so a connection that fails on a certificate leaves the refused certificate there to move into `trusted` once you have confirmed it.

## Dashboard

Each component has a dashboard showing its **STATUS**, and the number of messages **RECEIVED** and **SENT**. The client dashboard shows whether it is **CONNECTED** to the server, and the server dashboard shows whether it is **LISTENING**. The client has a **Connect / Disconnect** menu action. Viewing a dashboard requires the **Security administration** permission, described under [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

Values polled by the client behave like any other tag, so they can be shown on a [dashboard](../Dashboard/index.md), logged, watched by a rule, or read by a script. If a node cannot be read, its tag is marked as bad quality. The usual causes are a **NodeId** that the server does not have, an **Endpoint URL** that does not start with `opc.tcp://` or cannot be reached, and a server certificate in the `rejected` folder, so check these before reading the [Log](../../Getting_Started/Profinity_Log.md) for the reason.
