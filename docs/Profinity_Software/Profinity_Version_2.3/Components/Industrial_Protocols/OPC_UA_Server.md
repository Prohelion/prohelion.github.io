---
title: OPC UA Server
description: Expose the readable scalar tags of a Profinity profile to third-party OPC UA clients as a read-only address space, and set the address the server listens on.
type: component
owner: Documentation
last_reviewed: 2026-10-15
---

# OPC UA Server

The **OPC UA Server** listens for Open Platform Communications Unified Architecture (OPC UA) clients and exposes this profile's tag tree to them as a read-only address space.
Use it to let third-party OPC UA clients, such as a supervisory control and data acquisition (SCADA) or historian system, read the live values held in this Profinity profile.
The OPC UA plugin also provides the [OPC UA Client](OPC_UA_Client.md), and the two components can be used on their own or together.

<figure markdown>
```mermaid
flowchart LR
    Tags --> Server["OPC UA Server"] --> Consumer["Third-party OPC UA client"]
```
<figcaption>The OPC UA Server exposes the Profinity tag tree to third-party OPC UA clients as a read-only address space</figcaption>
</figure>

The server exposes the readable scalar tags in the profile's tag tree.

!!! info "Licence required"
    The OPC UA plugin is not part of the standard installation, and it requires the **Industrial Protocols** licensed component group.
    Refer to [Industrial Protocols](index.md) for how to obtain, install, and licence it.

Add the server to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [Adding Components to Your Profile](../../How_To_Guides/Add_Component_to_Profile.md).
The settings below can be changed later from the component's **Change Settings** menu action.

## Settings

| Setting | Description |
|---|---|
| **Name** | The name of the component. Must be unique within the profile. |
| **Bind URL** | The endpoint address that the server listens on, and the address clients connect to. Required, and must start with `opc.tcp://`. The default is `opc.tcp://127.0.0.1:4840/Profinity`, which accepts clients on this computer only. |
| **Auto Connect** | Starts the server automatically when the profile is loaded. Off by default. |
| **Trust all client certificates** | Skips validation of connecting clients' certificates. Off by default. Turn it on only on a trusted network. |

For where the server keeps its certificates and how to trust one explicitly, refer to [OPC UA certificates](OPC_UA_Certificates.md).

## What the server exposes

The server publishes the readable scalar values in the profile's tag tree.
Each tag appears as a node with the NodeId `ns=2;s=` followed by the tag's full tag ID, which is the tag's [tag tree path](../../Tags/Tag_Tree_Path.md).
Clients cannot write to the address space, so the server cannot be used to change values in Profinity.
The server accepts anonymous connections without message security only.

## Listening address

With the default **Bind URL**, the server listens on the loopback address `127.0.0.1` only, so only clients on the Profinity computer can connect.
The server uses no security policy and accepts anonymous clients, so allow other computers only on a network you trust.
To accept remote clients, replace the host in the **Bind URL** with the IP address or host name of the Profinity computer that those clients can reach, for example `opc.tcp://192.168.1.20:4840/Profinity`.
An IP address listens on that address only, and a host name listens on every address of the computer.
When the address changes, Profinity replaces the server certificate if it does not name the new address.

A **Bind URL** with a host of `0.0.0.0` or `localhost` is treated in the same way as the default and listens on `127.0.0.1` only.

## Dashboard

The component has a dashboard showing its **STATUS**, the number of messages **RECEIVED** and **SENT**, and whether it is **LISTENING**.
Viewing the dashboard requires the **Security administration** permission, described under [Roles and Permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).
