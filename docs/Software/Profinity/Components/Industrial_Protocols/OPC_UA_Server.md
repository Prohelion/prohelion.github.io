---
title: OPC UA Server
description: Expose the readable scalar tags of a Profinity profile to third-party OPC UA clients as a read-only address space, and set the address the server listens on.
type: component
owner: Documentation
last_reviewed: 2026-11-11
---

# OPC UA Server

The **OPC UA Server** lets Open Platform Communications Unified Architecture (OPC UA) clients, such as a supervisory control and data acquisition (SCADA) or historian system, read the live values in a Profinity profile.
It publishes the profile's tags as a read-only address space, which is the tree of nodes that an OPC UA client browses.
It sits in the **Industrial Protocols** group, and the same plugin provides the [OPC UA Client](OPC_UA_Client.md), which can run on its own or beside the server.

<figure markdown>
```mermaid
flowchart LR
    Tags --> Server["OPC UA Server"] --> Consumer["Third-party OPC UA client"]
```
<figcaption>The OPC UA Server publishes the Profinity tag tree to third-party OPC UA clients as a read-only address space</figcaption>
</figure>

## Quick start

You need:

- An edition with the **Industrial Protocols** licensed component group, and the OPC UA plugin installed, as described in [Install an industrial protocol plugin](Install_an_Industrial_Protocol_Plugin.md).
- The **Security administration** permission to view the component dashboard in step 5.

1. Select **ADD COMPONENT**, then select **OPC UA Server** in the **Industrial Protocols** group.
2. Keep **Bind URL** as `opc.tcp://127.0.0.1:4840/Profinity`, which accepts clients on this computer only. To accept other computers, change it as described in [Listening address](#listening-address).
3. Select **ADD COMPONENT**.
4. Select **Start / Stop** from the component's menu. **Auto Connect** is off by default.
5. On the component dashboard, check that **STATUS** shows **Listening** and **LISTENING** is true.

To check from a client, connect it to the **Bind URL** and browse **Objects** > **Profinity**.

## Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| **Name** | Text | `OPC UA Server` | The name of the component. Must be unique within the profile. |
| **Bind URL** | Text | `opc.tcp://127.0.0.1:4840/Profinity` | The address the server listens on, which is also the address clients connect to. Required, and must start with `opc.tcp://`. |
| **Auto Connect** | On or off | Off | Starts the server when the profile loads, as described in [Connections and reconnecting](../Connections_and_Reconnecting.md#the-auto-connect-switch). |
| **Trust all client certificates** | On or off | Off | When on, the server accepts any client certificate. When off, it refuses a certificate that is not in its `trusted` folder and stores it in `rejected`. Turn it on only on a trusted network. |

To change the settings later, select **Change Settings** from the component's menu.
For where the server keeps its certificates, refer to [OPC UA certificates](OPC_UA_Certificates.md).

## Tags

The server reads every tag in the profile that holds a single readable value, and publishes no tags of its own.
In the address space, the tags sit under **Objects** > **Profinity**, the folder with the NodeId `ns=2;s=Profinity`.
Each tag is a node whose NodeId is `ns=2;s=` followed by the tag's [tag tree path](../../Tags/Selecting_Tags/Tag_Tree_Path.md), so the tag `Inverter/DBC/Status/Speed` is `ns=2;s=Inverter/DBC/Status/Speed`.

The address space is read-only, so clients can view values and cannot change them.
The server builds it when it starts, from the tags that are readable then, so a tag added to the profile later appears after the server restarts.
A tag with no sample, or with a null value, reads as `BadNoData`.

## Example

This example accepts clients on the network at one address of the Profinity computer.
Add it under `components:` in the `profile.yaml` file of the profile.

```yaml
- component:
    type: OpcUaServer
    id: OpcUaServer1
    name: Plant OPC UA Server
    tagTreeParentPath: /
    bindUrl: opc.tcp://SERVER_ADDRESS:4840/Profinity
    autoConnect: true
    trustAllClientCertificates: false
```

Replace `SERVER_ADDRESS` with an IP address of the Profinity computer that your OPC UA clients can reach.

## Listening address

With the default **Bind URL**, the server listens on the loopback address `127.0.0.1`, so only clients on the Profinity computer can connect.
A **Bind URL** with the host `0.0.0.0` or `localhost` also listens on `127.0.0.1` only.

To accept clients on other computers, replace the host in the **Bind URL**, for example `opc.tcp://192.168.1.20:4840/Profinity`:

- An IP address listens on that address only.
- A host name other than `localhost` listens on every address of the computer.

!!! warning "The server accepts anonymous clients without message security"
    Messages are not signed or encrypted, and any client can connect.
    Accept clients from other computers only on a network you trust.

The server certificate names the host in the **Bind URL**.
When the server starts with a host that the certificate does not name, such as after you change the **Bind URL**, Profinity deletes the old certificate and its private key and creates new ones.
To keep the old certificate, copy the `own` folder from the `opcua_pki` folder first, as described in [OPC UA certificates](OPC_UA_Certificates.md).
Each client then refuses the new certificate until you trust it on the client.

## Dashboard

The dashboard shows the server **STATUS**, whether it is **LISTENING**, and the number of client requests **RECEIVED** and responses **SENT** since it last started listening.
Viewing it needs the **Security administration** permission, as described in [Roles and permissions](../../Administration/Users_and_Access/Roles_and_Permissions.md).

## Troubleshooting

For the reason behind a failure, read the [Logs](../../Administration/Logs_Config.md) page under **ADMIN**.

| What you see | Cause | What to do |
|---|---|---|
| A client on another computer cannot connect | The **Bind URL** listens on `127.0.0.1` only. | Set the host in the **Bind URL** to an address those clients can reach, as described in [Listening address](#listening-address). |
| A tag added to the profile is missing from the address space | The server builds the address space when it starts. | Select **Start / Stop** from the component's menu to stop the server, then select it again to start it. |
| A tag reads as `BadNoData` | The tag has no sample, or its value is null. | Check in **TAG EXPLORER** that the tag has a value. |
| A client cannot write a value | The address space is read-only. | Change the value at its source in Profinity. |
| A client refuses to connect after the **Bind URL** changes | Profinity created a new server certificate for the new host. | Trust the new certificate on the client. |
| The server refuses a client certificate | The certificate is not in the server's `trusted` folder, so the server stored it in `rejected`. | Check the certificate, then move it from `rejected` to `trusted`, as described in [OPC UA certificates](OPC_UA_Certificates.md). |
