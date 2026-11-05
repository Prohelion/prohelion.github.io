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

!!! info "Licence required"
    The OPC UA plugin requires the **Industrial Protocols** licensed component group, and [Install an industrial protocol plugin](Install_an_Industrial_Protocol_Plugin.md) explains how to obtain, install, and licence it.

Add the server to your [Profile](../../Getting_Started/Profiles.md) from the **Industrial Protocols** group in the component catalogue, as described in [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md).
You can change the settings in the Settings section later from the component's **Change Settings** menu action.

## Quick start

You need the **Industrial Protocols** licensed component group and the OPC UA plugin installed. [Install an industrial protocol plugin](Install_an_Industrial_Protocol_Plugin.md) explains how.

1. Add an **OPC UA Server** from the **Industrial Protocols** group, as described in [How to add a component to your profile](../../How_To_Guides/Add_Component_to_Profile.md).
2. Check that **Name** is unique within the profile. The default is `OPC UA Server`.
3. Leave **Bind URL** as `opc.tcp://127.0.0.1:4840/Profinity` to accept clients on this computer only. To accept other computers, change the host as described in the Listening address section.
4. Select **ADD COMPONENT** at the bottom of the dialog.
5. If **Auto Connect** is off, which is its default, switch the server on with the **Start / Stop** menu action.
6. On the component dashboard, check that **STATUS** shows **Listening** and **LISTENING** is true.

## Settings

| Setting | Default | Description |
|---|---|---|
| **Name** | `OPC UA Server` | The name of the component. Must be unique within the profile. |
| **Bind URL** | `opc.tcp://127.0.0.1:4840/Profinity` | The endpoint address that the server listens on, and the address clients connect to. Required, and must start with `opc.tcp://`. The default accepts clients on this computer only. |
| **Auto Connect** | Off | Starts the server automatically when the profile is loaded, as described in [Connections and reconnecting](../Connections_and_Reconnecting.md#the-auto-connect-switch). |
| **Trust all client certificates** | Off | When on, any client certificate is accepted. When off, certificates that are not in `trusted` are refused and stored in `rejected`. Turn it on only on a trusted network. |

For where the server keeps its certificates and how to trust one explicitly, refer to [OPC UA certificates](OPC_UA_Certificates.md).

## Example

This example is for illustration only.
Add this list item under the existing `components:` key in the profile file, and replace `SERVER_HOST` with an IP address of the Profinity computer that your OPC UA clients can reach.

```yaml
- component:
    type: OpcUaServer
    id: OpcUaServer1
    name: Plant OPC UA Server
    tagTreeParentPath: /
    bindUrl: opc.tcp://SERVER_HOST:4840/Profinity
    autoConnect: true
    trustAllClientCertificates: false
```

Clients then connect to the **Bind URL** and read tags at `ns=2;s=` followed by the full tag ID.

## What the server exposes

The server publishes the readable scalar values in the profile's tag tree.
Each tag appears as a node with the NodeId `ns=2;s=` followed by the tag's full tag ID, which is the tag's [tag tree path](../../Tags/Selecting_Tags/Tag_Tree_Path.md).

Clients have read-only access to the address space, so the server can be used only to view values in Profinity.
The server accepts anonymous connections without message security only.

The server builds the address space once, when it starts, from the tags that are readable at that moment:

- Tags added to the profile after that appear only after you restart the server.
- A tag with no sample or a null value reads as `BadNoData` to the client.

## Listening address

With the default **Bind URL**, the server listens on the loopback address `127.0.0.1` only, so only clients on the Profinity computer can connect.
The server offers no message security (None only), so messages are not signed or encrypted, and it accepts anonymous clients.
Allow other computers only on a network you trust.

When the server starts, Profinity deletes the old server certificate and its private key if the certificate does not name the host in the **Bind URL**, such as after you change the **Bind URL** to another address. To keep them, copy the `own` folder first. Each connecting client must then trust the new certificate.

To accept remote clients, replace the host in the **Bind URL** with the IP address or host name of the Profinity computer that those clients can reach, for example `opc.tcp://192.168.1.20:4840/Profinity`:

- An IP address listens on that address only.
- A host name other than `localhost` listens on every address of the computer.
- When the address changes, Profinity replaces the server certificate if it does not name the new address. A connecting client then refuses the new certificate. On that client, move the new certificate from `rejected` to `trusted`, as in [OPC UA certificates](OPC_UA_Certificates.md).

A **Bind URL** with a host of `0.0.0.0` or `localhost` is treated in the same way as the default and listens on `127.0.0.1` only.

## Dashboard

The component has a dashboard showing its **STATUS**, whether it is **LISTENING**, and the number of client requests **RECEIVED** and responses **SENT** since the server last started listening.
To check that the server works, look for the status **Listening** and **LISTENING** true.

Then connect a client to the **Bind URL** and browse **Objects > Profinity**, which is the `Profinity` folder with NodeId `ns=2;s=Profinity`.
Read a tag at `ns=2;s=` followed by its full tag ID.
Viewing the dashboard requires the **Security administration** permission, described under [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

## If a client cannot read a tag

Check the usual causes in this table before reading the [Log](../../Administration/Logs_Config.md) for the reason.

| Symptom | Cause | Fix |
|---|---|---|
| A client on another computer cannot connect. | The default **Bind URL** listens on `127.0.0.1` only. | Replace the host in the **Bind URL** with an address the clients can reach, as described under Listening address. |
| A tag added to the profile is missing from the address space. | The server builds the address space once, when it starts. | Stop the server, then start it again from the component's menu. |
| A tag reads as `BadNoData`. | The tag has no sample or a null value. | Check that the tag has a value in Profinity. |
| A client cannot write a value. | The address space is read-only. | Change the value at its source in Profinity instead. |
| A connection fails on a certificate. | The refused certificate is in the `rejected` folder. | Move the certificate into `trusted` once you have confirmed it, as described in [OPC UA certificates](OPC_UA_Certificates.md). |
